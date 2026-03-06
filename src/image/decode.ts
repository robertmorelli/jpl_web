// ============================================================================
// Browser image decoding: File / URL → ImagePayload (RGBA Uint8Array)
// ============================================================================

import type { ImagePayload } from "./types.ts";
import { MAX_IMAGE_DIMENSION, MAX_PIXEL_COUNT } from "./types.ts";

/**
 * Decode a browser File object (e.g. from an <input type="file">) into an
 * ImagePayload containing raw RGBA bytes.
 */
export async function decodeImageFile(file: File): Promise<ImagePayload> {
  if (file.size === 0) throw new Error("File is empty.");

  const url = URL.createObjectURL(file);
  try {
    return await _decodeUrl(url, file.name);
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Decode an image from a URL (data URL or object URL) into an ImagePayload.
 */
export async function decodeImageUrl(
  url: string,
  filename?: string
): Promise<ImagePayload> {
  return _decodeUrl(url, filename);
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

async function _decodeUrl(
  url: string,
  filename?: string
): Promise<ImagePayload> {
  const img = await _loadImg(url);

  const w = img.naturalWidth;
  const h = img.naturalHeight;

  if (w > MAX_IMAGE_DIMENSION || h > MAX_IMAGE_DIMENSION) {
    throw new Error(
      `Image too large: ${w}×${h} exceeds the ${MAX_IMAGE_DIMENSION}px dimension limit.`
    );
  }
  if (w * h > MAX_PIXEL_COUNT) {
    throw new Error(
      `Image too large: ${w * h} pixels exceeds the ${MAX_PIXEL_COUNT} pixel limit.`
    );
  }

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not obtain 2D canvas context.");
  ctx.drawImage(img, 0, 0);
  const { data } = ctx.getImageData(0, 0, w, h);

  return { width: w, height: h, rgba: new Uint8Array(data.buffer), filename };
}

function _loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image from: ${src}`));
    img.src = src;
  });
}
