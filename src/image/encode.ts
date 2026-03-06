// ============================================================================
// Browser image encoding: ImagePayload → PNG Blob / object URL
// ============================================================================

import type { ImagePayload } from "./types.ts";

/**
 * Encode an ImagePayload as a PNG Blob using OffscreenCanvas.
 * Works in modern browsers and Worker contexts.
 */
export async function encodeImageToPng(image: ImagePayload): Promise<Blob> {
  const canvas = new OffscreenCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not obtain OffscreenCanvas 2D context.");

  // ImageData requires an ArrayBuffer (not SharedArrayBuffer), so we copy.
  const clamped = new Uint8ClampedArray(image.rgba.length);
  clamped.set(image.rgba);
  const imageData = new ImageData(clamped, image.width, image.height);
  ctx.putImageData(imageData, 0, 0);

  return canvas.convertToBlob({ type: "image/png" });
}

/**
 * Encode an ImagePayload as a PNG and return a temporary object URL.
 * The caller is responsible for calling URL.revokeObjectURL() when done.
 */
export async function encodeToObjectUrl(image: ImagePayload): Promise<string> {
  const blob = await encodeImageToPng(image);
  return URL.createObjectURL(blob);
}
