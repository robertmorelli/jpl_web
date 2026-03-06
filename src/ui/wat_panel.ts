// ============================================================================
// WatPanel — syntax-highlighted WAT viewer with copy / download controls.
// ============================================================================

// ---------------------------------------------------------------------------
// Syntax highlighting
// ---------------------------------------------------------------------------

/**
 * Convert raw WAT text to HTML with CSS-class spans for syntax highlighting.
 * Output is safe HTML: we escape first, then insert only our own spans.
 */
function highlightWat(wat: string): string {
  // 1. Escape HTML entities first so later regexes can't introduce XSS.
  let s = wat
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. Line comments (;; …)
  s = s.replace(/(;;[^\n]*)/g, '<span class="wat-comment">$1</span>');

  // 3. String literals
  s = s.replace(
    /("(?:[^"\\]|\\.)*")/g,
    '<span class="wat-string">$1</span>'
  );

  // 4. Type keywords
  s = s.replace(
    /\b(module|func|import|export|memory|table|global|type|start|elem|data|local|param|result|struct|array|field|ref|null|mut|final|sub|rec|anyref|eqref|i31ref|funcref|externref|nofunc|noextern|none)\b/g,
    '<span class="wat-keyword">$1</span>'
  );

  // 5. Value types
  s = s.replace(
    /\b(i32|i64|f32|f64|v128)\b/g,
    '<span class="wat-type">$1</span>'
  );

  // 6. Instructions (dotted names like i64.add, struct.new, etc.)
  s = s.replace(
    /\b([a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_.]*)+)\b/g,
    '<span class="wat-instr">$1</span>'
  );

  // 7. $identifiers
  s = s.replace(/(\$[A-Za-z0-9_$.]+)/g, '<span class="wat-ident">$1</span>');

  // 8. Numeric literals
  s = s.replace(
    /\b([-+]?(?:0x[0-9a-fA-F]+|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?))\b/g,
    '<span class="wat-number">$1</span>'
  );

  return s;
}

// ---------------------------------------------------------------------------
// WatPanel component
// ---------------------------------------------------------------------------

export interface WatPanelOptions {
  /** Show a "Copy" button (default: true). */
  copyButton?: boolean;
  /** Show a "Download" button (default: true). */
  downloadButton?: boolean;
}

export class WatPanel {
  private readonly pre: HTMLPreElement;
  private _wat = "";
  private _lastSuccessfulWat = "";

  constructor(container: HTMLElement, options: WatPanelOptions = {}) {
    container.classList.add("jpl-wat-panel");

    // Toolbar
    const toolbar = document.createElement("div");
    toolbar.className = "jpl-wat-toolbar";

    const title = document.createElement("span");
    title.className = "jpl-wat-title";
    title.textContent = "WAT";
    toolbar.appendChild(title);

    if (options.copyButton !== false) {
      const btn = this._makeBtn("Copy", () =>
        navigator.clipboard.writeText(this._wat).catch(() => {})
      );
      toolbar.appendChild(btn);
    }

    if (options.downloadButton !== false) {
      const btn = this._makeBtn("Download .wat", () => this._download());
      toolbar.appendChild(btn);
    }

    // Code block
    this.pre = document.createElement("pre");
    this.pre.className = "jpl-wat-code";
    this.pre.innerHTML = '<span class="jpl-placeholder">Run a program to see its WAT output.</span>';

    container.appendChild(toolbar);
    container.appendChild(this.pre);
  }

  /** Update the displayed WAT. Also caches it as the last successful WAT. */
  set wat(value: string) {
    this._wat = value;
    this._lastSuccessfulWat = value;
    this.pre.innerHTML = value
      ? highlightWat(value)
      : '<span class="jpl-placeholder">No WAT generated.</span>';
  }

  get wat(): string {
    return this._wat;
  }

  /**
   * Called when a compilation fails. The last successful WAT stays visible
   * but is dimmed to indicate it may be stale.
   */
  markStale(): void {
    this.pre.classList.add("jpl-stale");
  }

  /** Remove the stale indicator (e.g. on a new successful run). */
  markFresh(): void {
    this.pre.classList.remove("jpl-stale");
  }

  private _download(): void {
    if (!this._lastSuccessfulWat) return;
    const blob = new Blob([this._lastSuccessfulWat], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "program.wat";
    a.click();
    URL.revokeObjectURL(url);
  }

  private _makeBtn(label: string, onClick: () => void): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.className = "jpl-btn jpl-btn-sm";
    btn.textContent = label;
    btn.addEventListener("click", onClick);
    return btn;
  }
}
