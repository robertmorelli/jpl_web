// ============================================================================
// VscodeAdapter — HostIO implementation for the VSCode.dev web extension.
//
// The webview and the extension host communicate via postMessage. This adapter
// translates HostIO calls into messages and wires incoming messages to pending
// image-input promises.
// ============================================================================

import type { HostIO, SuspendToken, ImagePayload } from "./types.ts";

/** Minimal subset of the acquireVsCodeApi() return value we need. */
export interface VscodeApi {
  postMessage(message: unknown): void;
}

// Message shapes sent to the extension host
type OutMessage =
  | { type: "output"; text: string }
  | { type: "error"; message: string }
  | { type: "image-output"; width: number; height: number; rgba: number[]; filename?: string }
  | { type: "request-image"; requestId: string; filenameHint?: string };

// Message shapes received from the extension host
export interface ImageReplyMessage {
  type: "image-reply";
  requestId: string;
  width: number;
  height: number;
  rgba: number[];
  filename?: string;
}

export class VscodeAdapter implements HostIO {
  private readonly pending = new Map<string, (img: ImagePayload) => void>();

  constructor(private readonly vscode: VscodeApi) {}

  onOutput(text: string): void {
    this._post({ type: "output", text });
  }

  onError(message: string): void {
    this._post({ type: "error", message });
  }

  onImageOutput(image: ImagePayload, filenameHint?: string): void {
    this._post({
      type: "image-output",
      width: image.width,
      height: image.height,
      rgba: Array.from(image.rgba),
      filename: filenameHint ?? image.filename,
    });
  }

  requestImageInput(token: SuspendToken): Promise<ImagePayload> {
    return new Promise((resolve) => {
      this.pending.set(token.requestId, resolve);
      this._post({
        type: "request-image",
        requestId: token.requestId,
        filenameHint: token.filenameHint,
      });
    });
  }

  /**
   * Call this from the webview's window.addEventListener("message", ...) handler
   * whenever an image-reply arrives from the extension host.
   */
  receiveImageReply(msg: ImageReplyMessage): void {
    const resolve = this.pending.get(msg.requestId);
    if (!resolve) return;
    this.pending.delete(msg.requestId);
    resolve({
      width: msg.width,
      height: msg.height,
      rgba: new Uint8Array(msg.rgba),
      filename: msg.filename,
    });
  }

  private _post(msg: OutMessage): void {
    this.vscode.postMessage(msg);
  }
}
