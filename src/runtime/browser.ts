// ============================================================================
// BrowserRuntime — compile WAT → binary in-browser (via wabt) and execute.
//
// Architecture notes
// ──────────────────
// • Wasm execution is synchronous once main() is called. True mid-execution
//   suspension (for read image) requires either SharedArrayBuffer+Atomics or
//   Asyncify. Those are deferred to a later phase; image I/O currently throws
//   a clear user-facing error.
// • cancel() is effective before WebAssembly.instantiate. Once main() is
//   running the only way to stop it is a thrown exception.
// • wabt is lazy-loaded on first run to keep initial page load fast.
// ============================================================================

import type { CompileResult } from "../compiler/index.ts";
import type { HostIO } from "../host-io/types.ts";
import { encodeIR } from "./wasm_encoder.ts";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type RuntimeState =
  | "idle"
  | "running"
  | "suspended"
  | "completed"
  | "failed"
  | "cancelled";

export interface StateChangeEvent extends Event {
  detail: { state: RuntimeState };
}

// ---------------------------------------------------------------------------
// IR → binary (direct encoder, no wabt dependency)
// ---------------------------------------------------------------------------
// wabt npm 1.0.39 does not support WasmGC nullable refs or anyref in WAT text,
// so we encode directly from the IR instead of round-tripping through WAT.

// ---------------------------------------------------------------------------
// BrowserRuntime
// ---------------------------------------------------------------------------

export class BrowserRuntime extends EventTarget {
  private _state: RuntimeState = "idle";
  private _cancelFlag = false;

  get state(): RuntimeState {
    return this._state;
  }

  private _setState(next: RuntimeState): void {
    if (this._state === next) return;
    this._state = next;
    this.dispatchEvent(
      Object.assign(new Event("statechange"), { detail: { state: next } })
    );
  }

  /**
   * Compile and run a compiled JPL program.
   *
   * @param compiled  Result from compileProgram(). Must have ok === true.
   * @param hostIO    Callbacks for output, errors, and image I/O.
   */
  async run(compiled: CompileResult, hostIO: HostIO): Promise<void> {
    if (this._state === "running" || this._state === "suspended") {
      throw new Error("Runtime is already active — call cancel() first.");
    }

    this._cancelFlag = false;
    this._setState("running");

    try {
      if (!compiled.ok) {
        throw new Error("Cannot run: compilation failed.");
      }

      // ── Encode IR → binary ────────────────────────────────────────────
      const binary = encodeIR(compiled.ir);
      if (this._cancelFlag) {
        this._setState("cancelled");
        return;
      }

      // ── Build host imports ─────────────────────────────────────────────
      const strings = compiled.strings;
      let timeStart = 0;

      const toInt = (x: number): bigint => {
        if (Number.isNaN(x)) return 0n;
        if (x === Infinity) return BigInt(Number.MAX_SAFE_INTEGER);
        if (x === -Infinity) return BigInt(Number.MIN_SAFE_INTEGER);
        return BigInt(Math.trunc(x));
      };

      const host: Record<string, unknown> = {
        // Output
        show_i64: (v: bigint) => hostIO.onOutput(String(v)),
        show_f64: (v: number) => hostIO.onOutput(String(v)),
        show_i32: (v: number) => hostIO.onOutput(v ? "true" : "false"),
        show_ref: (_v: unknown) => hostIO.onOutput("<ref>"),
        print_literal: (idx: bigint) => hostIO.onOutput(strings[Number(idx)] ?? ""),
        assert_fail: (idx: bigint) => {
          throw new Error(`[abort] ${strings[Number(idx)] ?? ""}`);
        },
        // Timing
        time_start: () => { timeStart = Date.now(); },
        time_end: () => hostIO.onOutput(`Time: ${Date.now() - timeStart}ms`),
        // Math builtins
        sqrt: Math.sqrt, sin: Math.sin, cos: Math.cos, tan: Math.tan,
        exp: Math.exp,   log: Math.log, abs: Math.abs,
        floor: Math.floor, ceil: Math.ceil,
        asin: Math.asin, acos: Math.acos, atan: Math.atan,
        pow: Math.pow,   atan2: Math.atan2,
        // Numeric conversions
        to_float: (v: bigint) => Number(v),
        to_int: toInt,
      };

      // Image I/O: synchronous host imports cannot suspend for async user
      // input. A future phase will use SharedArrayBuffer + Worker for this.
      if (compiled.hasImageIO) {
        host.read_image = (_idx: bigint) => {
          throw new Error(
            "[abort] read image: image I/O requires the Worker-based runtime (not yet available in this preview)."
          );
        };
        host.write_image = (_img: unknown, _idx: bigint) => {
          throw new Error(
            "[abort] write image: image I/O requires the Worker-based runtime (not yet available in this preview)."
          );
        };
      }

      // ── Instantiate and run ────────────────────────────────────────────
      // Cast to ArrayBuffer to satisfy strict WebAssembly type signatures.
      const buf = binary.buffer.slice(
        binary.byteOffset,
        binary.byteOffset + binary.byteLength
      ) as ArrayBuffer;
      const { instance } = await WebAssembly.instantiate(buf, {
        host: host as WebAssembly.ModuleImports,
      });
      (instance.exports.main as () => void)();

      this._setState("completed");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      hostIO.onError(msg);
      this._setState(this._cancelFlag ? "cancelled" : "failed");
    }
  }

  /**
   * Request cancellation. If the runtime is between async operations it will
   * stop before the next one; it cannot interrupt synchronous Wasm execution.
   */
  cancel(): void {
    if (this._state === "running" || this._state === "suspended") {
      this._cancelFlag = true;
    }
  }

  /** Reset to idle so the runtime can be reused for another run. */
  reset(): void {
    if (this._state !== "running" && this._state !== "suspended") {
      this._setState("idle");
    }
  }
}
