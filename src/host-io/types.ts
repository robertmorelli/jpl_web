// ============================================================================
// HostIO — the interface between the runtime and the surrounding environment.
//
// Both the docs app and the VSCode web extension implement this interface.
// The runtime calls it; adapters wire it to the appropriate UI/message layer.
// ============================================================================

import type { ImagePayload } from "../image/types.ts";

export type { ImagePayload };

// ---------------------------------------------------------------------------
// Suspend / resume token
// ---------------------------------------------------------------------------

/**
 * Emitted by the runtime when the program calls `read image`.
 * The host must resolve the returned Promise with an ImagePayload, or
 * reject it to abort execution.
 */
export interface SuspendToken {
  /** Stable identifier for this request — pass back to runtime.resume(). */
  requestId: string;
  /** Filename hint from the source (e.g. `read image "photo.png"`). */
  filenameHint?: string;
}

// ---------------------------------------------------------------------------
// Diagnostic
// ---------------------------------------------------------------------------

export interface Diagnostic {
  kind: "lex" | "parse" | "type" | "runtime";
  message: string;
  line?: number;
  column?: number;
}

// ---------------------------------------------------------------------------
// HostIO interface
// ---------------------------------------------------------------------------

export interface HostIO {
  /** One line of text output from the program (show / print). */
  onOutput(text: string): void;

  /** Fatal error — assertion failure, runtime trap, or image I/O error. */
  onError(message: string): void;

  /**
   * Called when the program executes `read image`.
   * Return a Promise that resolves with the image the user provides,
   * or rejects to abort execution.
   */
  requestImageInput(token: SuspendToken): Promise<ImagePayload>;

  /**
   * Called when the program executes `write image`.
   * @param filenameHint  The filename from the source, if present.
   */
  onImageOutput(image: ImagePayload, filenameHint?: string): void;
}
