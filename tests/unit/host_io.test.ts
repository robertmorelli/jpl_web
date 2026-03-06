// ============================================================================
// HostIO adapter unit tests.
// ============================================================================

import { describe, it, expect, vi } from "vitest";
import { DocsAdapter } from "../../src/host-io/docs_adapter.ts";
import { VscodeAdapter } from "../../src/host-io/vscode_adapter.ts";
import type { ImagePayload } from "../../src/host-io/types.ts";

const SAMPLE_IMAGE: ImagePayload = {
  width: 2,
  height: 2,
  rgba: new Uint8Array([255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255, 0, 0, 0, 255]),
};

// ---------------------------------------------------------------------------
// DocsAdapter
// ---------------------------------------------------------------------------

describe("DocsAdapter", () => {
  function makeCallbacks() {
    return {
      onOutput: vi.fn(),
      onError: vi.fn(),
      onImageOutput: vi.fn(),
      requestImageInput: vi.fn().mockResolvedValue(SAMPLE_IMAGE),
    };
  }

  it("forwards onOutput", () => {
    const cb = makeCallbacks();
    new DocsAdapter(cb).onOutput("hello");
    expect(cb.onOutput).toHaveBeenCalledWith("hello");
  });

  it("forwards onError", () => {
    const cb = makeCallbacks();
    new DocsAdapter(cb).onError("boom");
    expect(cb.onError).toHaveBeenCalledWith("boom");
  });

  it("forwards onImageOutput with hint", () => {
    const cb = makeCallbacks();
    new DocsAdapter(cb).onImageOutput(SAMPLE_IMAGE, "out.png");
    expect(cb.onImageOutput).toHaveBeenCalledWith(SAMPLE_IMAGE, "out.png");
  });

  it("forwards requestImageInput and resolves", async () => {
    const cb = makeCallbacks();
    const adapter = new DocsAdapter(cb);
    const token = { requestId: "r1", filenameHint: "photo.png" };
    const result = await adapter.requestImageInput(token);
    expect(cb.requestImageInput).toHaveBeenCalledWith(token);
    expect(result).toBe(SAMPLE_IMAGE);
  });
});

// ---------------------------------------------------------------------------
// VscodeAdapter
// ---------------------------------------------------------------------------

describe("VscodeAdapter", () => {
  function makeVscode() {
    return { postMessage: vi.fn() };
  }

  it("posts output message", () => {
    const vs = makeVscode();
    new VscodeAdapter(vs).onOutput("hello");
    expect(vs.postMessage).toHaveBeenCalledWith({ type: "output", text: "hello" });
  });

  it("posts error message", () => {
    const vs = makeVscode();
    new VscodeAdapter(vs).onError("oops");
    expect(vs.postMessage).toHaveBeenCalledWith({ type: "error", message: "oops" });
  });

  it("posts image-output with serialised rgba", () => {
    const vs = makeVscode();
    new VscodeAdapter(vs).onImageOutput(SAMPLE_IMAGE, "out.png");
    const msg = vs.postMessage.mock.calls[0]![0] as any;
    expect(msg.type).toBe("image-output");
    expect(msg.width).toBe(2);
    expect(msg.height).toBe(2);
    expect(Array.isArray(msg.rgba)).toBe(true);
    expect(msg.filename).toBe("out.png");
  });

  it("posts request-image and resolves via receiveImageReply", async () => {
    const vs = makeVscode();
    const adapter = new VscodeAdapter(vs);
    const token = { requestId: "req-1", filenameHint: "input.png" };

    const promise = adapter.requestImageInput(token);
    expect(vs.postMessage).toHaveBeenCalledWith({
      type: "request-image",
      requestId: "req-1",
      filenameHint: "input.png",
    });

    adapter.receiveImageReply({
      type: "image-reply",
      requestId: "req-1",
      width: 2,
      height: 2,
      rgba: Array.from(SAMPLE_IMAGE.rgba),
    });

    const result = await promise;
    expect(result.width).toBe(2);
    expect(result.height).toBe(2);
    expect(result.rgba).toBeInstanceOf(Uint8Array);
  });

  it("ignores reply with unknown requestId", async () => {
    const vs = makeVscode();
    const adapter = new VscodeAdapter(vs);
    // Should not throw
    adapter.receiveImageReply({
      type: "image-reply",
      requestId: "unknown",
      width: 1,
      height: 1,
      rgba: [0, 0, 0, 255],
    });
  });
});
