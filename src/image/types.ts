// ============================================================================
// Image types shared across the compiler, runtime, and UI layers.
// ============================================================================

export interface ImagePayload {
  width: number;
  height: number;
  /** RGBA bytes, row-major, 4 bytes per pixel (Uint8Array view). */
  rgba: Uint8Array;
  /** Original filename, if known. */
  filename?: string;
}

/** Hard limits applied on decode to avoid hanging the main thread. */
export const MAX_IMAGE_DIMENSION = 4096;
export const MAX_PIXEL_COUNT = 16_000_000; // ~16 megapixels
