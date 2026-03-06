// ============================================================================
// RunPage — self-contained run UI component (no framework dependencies).
//
// Creates and manages:
//   • A source editor (textarea)
//   • Run / Stop controls + status badge
//   • Tabbed output panels: stdout, WAT, images
//   • Image-upload modal for suspended read-image calls
// ============================================================================

import { compileProgram } from "../compiler/index.ts";
import { BrowserRuntime, type RuntimeState } from "../runtime/browser.ts";
import { DocsAdapter } from "../host-io/docs_adapter.ts";
import { WatPanel } from "./wat_panel.ts";
import { decodeImageFile } from "../image/decode.ts";
import { encodeToObjectUrl } from "../image/encode.ts";
import type { SuspendToken, ImagePayload } from "../host-io/types.ts";

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface RunPageOptions {
  /** Pre-fill the editor with this source. */
  initialSource?: string;
  /** Integer args baked into $main (mirrors CLI int args). */
  args?: number[];
  /** Called each time the runtime state changes. */
  onStateChange?: (state: RuntimeState) => void;
}

export class RunPage {
  private readonly runtime = new BrowserRuntime();
  private readonly watPanel: WatPanel;

  private readonly sourceEl: HTMLTextAreaElement;
  private readonly outputEl: HTMLElement;
  private readonly statusEl: HTMLElement;
  private readonly runBtn: HTMLButtonElement;
  private readonly stopBtn: HTMLButtonElement;
  private readonly imagesEl: HTMLElement;
  private readonly suspendOverlay: HTMLElement;

  private imageUrls: string[] = [];
  private readonly opts: RunPageOptions;

  constructor(container: HTMLElement, options: RunPageOptions = {}) {
    this.opts = options;
    this._buildDOM(container);

    // Grab elements (typed assertions — _buildDOM guarantees them)
    this.sourceEl     = container.querySelector<HTMLTextAreaElement>(".jpl-source")!;
    this.outputEl     = container.querySelector<HTMLElement>(".jpl-output")!;
    this.statusEl     = container.querySelector<HTMLElement>(".jpl-status")!;
    this.runBtn       = container.querySelector<HTMLButtonElement>("#jpl-run")!;
    this.stopBtn      = container.querySelector<HTMLButtonElement>("#jpl-stop")!;
    this.imagesEl     = container.querySelector<HTMLElement>(".jpl-images")!;
    this.suspendOverlay = container.querySelector<HTMLElement>(".jpl-suspend-overlay")!;

    this.watPanel = new WatPanel(
      container.querySelector<HTMLElement>(".jpl-wat-section")!
    );

    // Wire runtime state changes
    this.runtime.addEventListener("statechange", (e) => {
      const state = (e as Event & { detail: { state: RuntimeState } }).detail.state;
      this._onStateChange(state);
      options.onStateChange?.(state);
    });

    // Keyboard shortcut: ⌘/Ctrl + Enter to run
    this.sourceEl.addEventListener("keydown", (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        void this._run();
      }
    });

    this.runBtn.addEventListener("click", () => void this._run());
    this.stopBtn.addEventListener("click", () => this.runtime.cancel());

    if (options.initialSource) this.sourceEl.value = options.initialSource;
  }

  get source(): string      { return this.sourceEl.value; }
  set source(v: string)     { this.sourceEl.value = v; }

  // ---------------------------------------------------------------------------
  // DOM construction
  // ---------------------------------------------------------------------------

  private _buildDOM(container: HTMLElement): void {
    container.classList.add("jpl-run-page");
    container.innerHTML = `
      <div class="jpl-editor-section">
        <div class="jpl-toolbar">
          <button class="jpl-btn jpl-btn-primary" id="jpl-run" title="Run (⌘Enter)">▶ Run</button>
          <button class="jpl-btn" id="jpl-stop" disabled title="Stop">■ Stop</button>
          <span class="jpl-status jpl-status-idle">idle</span>
        </div>
        <textarea
          class="jpl-source"
          spellcheck="false"
          autocorrect="off"
          autocapitalize="off"
          placeholder="Write JPL here… (⌘Enter to run)"
        ></textarea>
      </div>

      <div class="jpl-panels">
        <div class="jpl-tab-bar" role="tablist">
          <button class="jpl-tab active" data-tab="output" role="tab">Output</button>
          <button class="jpl-tab" data-tab="wat" role="tab">WAT</button>
          <button class="jpl-tab" data-tab="images" role="tab">Images</button>
        </div>
        <div class="jpl-panel" data-panel="output">
          <div class="jpl-output"></div>
        </div>
        <div class="jpl-panel hidden" data-panel="wat">
          <div class="jpl-wat-section"></div>
        </div>
        <div class="jpl-panel hidden" data-panel="images">
          <div class="jpl-images"></div>
        </div>
      </div>

      <div class="jpl-suspend-overlay hidden" role="dialog" aria-modal="true">
        <div class="jpl-suspend-modal">
          <h3 class="jpl-suspend-title">Image Required</h3>
          <p class="jpl-suspend-hint"></p>
          <label class="jpl-file-label">
            Choose image…
            <input type="file" accept="image/*" class="jpl-file-input">
          </label>
          <button class="jpl-btn jpl-btn-cancel-upload">Cancel</button>
        </div>
      </div>
    `;

    // Tab switching
    container.querySelectorAll<HTMLElement>(".jpl-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const name = tab.dataset["tab"]!;
        container.querySelectorAll(".jpl-tab").forEach((t) => t.classList.remove("active"));
        container.querySelectorAll(".jpl-panel").forEach((p) => p.classList.add("hidden"));
        tab.classList.add("active");
        container.querySelector(`[data-panel="${name}"]`)!.classList.remove("hidden");
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Runtime lifecycle
  // ---------------------------------------------------------------------------

  private async _run(): Promise<void> {
    if (this.runtime.state === "running" || this.runtime.state === "suspended") return;

    // Reset output for new run
    this._clearOutput();
    for (const url of this.imageUrls) URL.revokeObjectURL(url);
    this.imageUrls = [];
    this.imagesEl.innerHTML = "";

    const source = this.sourceEl.value.trim();
    if (!source) return;

    // ── Compile ──────────────────────────────────────────────────────────
    const result = compileProgram(source, { args: this.opts.args });

    if (result.ok) {
      this.watPanel.wat = result.wat;
      this.watPanel.markFresh();
    } else {
      // Keep last WAT but dim it
      this.watPanel.markStale();
      for (const d of result.diagnostics) {
        const loc = d.line != null ? ` [${d.line}:${d.column ?? 0}]` : "";
        this._appendOutput(`${d.kind} error${loc}: ${d.message}`, "jpl-error");
      }
      return;
    }

    // ── Execute ──────────────────────────────────────────────────────────
    const adapter = new DocsAdapter({
      onOutput: (text) => this._appendOutput(text),
      onError: (msg) => this._appendOutput(msg, "jpl-error"),
      onImageOutput: async (image, filename) => {
        try {
          const url = await encodeToObjectUrl(image);
          this.imageUrls.push(url);
          this._addImageCard(url, filename ?? image.filename);
          // Switch to images tab automatically
          this._switchTab("images");
        } catch (e) {
          this._appendOutput(`Failed to display image: ${e}`, "jpl-error");
        }
      },
      requestImageInput: (token) => this._promptUpload(token),
    });

    await this.runtime.run(result, adapter);
    this.runtime.reset();
  }

  // ---------------------------------------------------------------------------
  // Output helpers
  // ---------------------------------------------------------------------------

  private _appendOutput(text: string, extraClass?: string): void {
    const line = document.createElement("div");
    line.className = "jpl-output-line" + (extraClass ? ` ${extraClass}` : "");
    line.textContent = text;
    this.outputEl.appendChild(line);
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  private _clearOutput(): void {
    this.outputEl.innerHTML = "";
  }

  private _addImageCard(url: string, filename?: string): void {
    const card = document.createElement("div");
    card.className = "jpl-image-card";

    const img = document.createElement("img");
    img.src = url;
    img.className = "jpl-image-preview";
    img.alt = filename ?? "output image";

    const footer = document.createElement("div");
    footer.className = "jpl-image-footer";

    const a = document.createElement("a");
    a.href = url;
    a.download = filename ?? "output.png";
    a.className = "jpl-btn jpl-btn-sm";
    a.textContent = "Download";

    if (filename) {
      const name = document.createElement("span");
      name.className = "jpl-image-name";
      name.textContent = filename;
      footer.appendChild(name);
    }
    footer.appendChild(a);

    card.appendChild(img);
    card.appendChild(footer);
    this.imagesEl.appendChild(card);
  }

  private _switchTab(name: string): void {
    const root = this.sourceEl.closest(".jpl-run-page")!;
    root.querySelectorAll(".jpl-tab").forEach((t) => t.classList.remove("active"));
    root.querySelectorAll(".jpl-panel").forEach((p) => p.classList.add("hidden"));
    root.querySelector(`[data-tab="${name}"]`)!.classList.add("active");
    root.querySelector(`[data-panel="${name}"]`)!.classList.remove("hidden");
  }

  // ---------------------------------------------------------------------------
  // Image upload modal
  // ---------------------------------------------------------------------------

  private _promptUpload(token: SuspendToken): Promise<ImagePayload> {
    return new Promise((resolve, reject) => {
      const hint = this.suspendOverlay.querySelector<HTMLElement>(".jpl-suspend-hint")!;
      const fileInput = this.suspendOverlay.querySelector<HTMLInputElement>(".jpl-file-input")!;
      const cancelBtn = this.suspendOverlay.querySelector<HTMLButtonElement>(".jpl-btn-cancel-upload")!;

      hint.textContent = token.filenameHint
        ? `Program is requesting: "${token.filenameHint}"`
        : "Program is requesting an image file.";

      // Reset so the change event fires even if the same file is re-selected
      fileInput.value = "";
      this.suspendOverlay.classList.remove("hidden");

      const cleanup = (): void => {
        this.suspendOverlay.classList.add("hidden");
        fileInput.onchange = null;
      };

      fileInput.onchange = async () => {
        const file = fileInput.files?.[0];
        if (!file) return;
        cleanup();
        try {
          resolve(await decodeImageFile(file));
        } catch (e) {
          reject(e instanceof Error ? e : new Error(String(e)));
        }
      };

      cancelBtn.addEventListener(
        "click",
        () => {
          cleanup();
          reject(new Error("Image upload cancelled by user."));
        },
        { once: true }
      );
    });
  }

  // ---------------------------------------------------------------------------
  // State change handler
  // ---------------------------------------------------------------------------

  private _onStateChange(state: RuntimeState): void {
    this.statusEl.textContent = state;
    this.statusEl.className = `jpl-status jpl-status-${state}`;
    this.runBtn.disabled = state === "running" || state === "suspended";
    this.stopBtn.disabled = state !== "running" && state !== "suspended";
  }
}
