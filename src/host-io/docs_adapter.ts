// ============================================================================
// DocsAdapter — HostIO implementation for the GitHub Pages / browser demo.
//
// This is a thin bridge between the runtime's HostIO interface and the UI
// callbacks registered by RunPage. It keeps the runtime decoupled from any
// specific DOM structure.
// ============================================================================

import type { HostIO, SuspendToken, ImagePayload } from "./types.ts";

export interface DocsAdapterCallbacks {
  onOutput: (text: string) => void;
  onError: (message: string) => void;
  onImageOutput: (image: ImagePayload, filenameHint?: string) => void;
  requestImageInput: (token: SuspendToken) => Promise<ImagePayload>;
}

export class DocsAdapter implements HostIO {
  constructor(private readonly cb: DocsAdapterCallbacks) {}

  onOutput(text: string): void {
    this.cb.onOutput(text);
  }

  onError(message: string): void {
    this.cb.onError(message);
  }

  onImageOutput(image: ImagePayload, filenameHint?: string): void {
    this.cb.onImageOutput(image, filenameHint);
  }

  requestImageInput(token: SuspendToken): Promise<ImagePayload> {
    return this.cb.requestImageInput(token);
  }
}
