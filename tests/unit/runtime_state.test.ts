// ============================================================================
// BrowserRuntime state machine unit tests.
// We mock WebAssembly and wabt so these run in Node without a browser.
// ============================================================================

import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRuntime } from "../../src/runtime/browser.ts";
import type { CompileResult } from "../../src/compiler/index.ts";
import type { HostIO } from "../../src/host-io/types.ts";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

// Mock the IR encoder so tests don't need a real IR or wabt.
vi.mock("../../src/runtime/wasm_encoder.ts", () => ({
  encodeIR: () => new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0]),
}));

// Mock WebAssembly.instantiate to return a module with a no-op main export.
beforeEach(() => {
  globalThis.WebAssembly = {
    ...(globalThis.WebAssembly ?? {}),
    instantiate: vi.fn().mockResolvedValue({
      instance: { exports: { main: () => {} } },
      module: {},
    }),
  } as unknown as typeof WebAssembly;
});

// Helpers
function makeCompiled(overrides: Partial<CompileResult> = {}): CompileResult {
  return {
    ok: true,
    ast: {},
    ir: {},
    wat: "(module)",
    prettyWat: "(module)",
    strings: [],
    hasImageIO: false,
    diagnostics: [],
    ...overrides,
  };
}

function makeHostIO(overrides: Partial<HostIO> = {}): HostIO {
  return {
    onOutput: vi.fn(),
    onError: vi.fn(),
    onImageOutput: vi.fn(),
    requestImageInput: vi.fn(),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("BrowserRuntime — initial state", () => {
  it("starts idle", () => {
    expect(new BrowserRuntime().state).toBe("idle");
  });
});

describe("BrowserRuntime — successful run", () => {
  it("transitions idle → running → completed", async () => {
    const rt = new BrowserRuntime();
    const states: string[] = [];
    rt.addEventListener("statechange", (e) => {
      states.push((e as Event & { detail: { state: string } }).detail.state);
    });
    await rt.run(makeCompiled(), makeHostIO());
    expect(states).toEqual(["running", "completed"]);
    expect(rt.state).toBe("completed");
  });

  it("can be reset to idle after completion", async () => {
    const rt = new BrowserRuntime();
    await rt.run(makeCompiled(), makeHostIO());
    rt.reset();
    expect(rt.state).toBe("idle");
  });

  it("can run again after reset", async () => {
    const rt = new BrowserRuntime();
    await rt.run(makeCompiled(), makeHostIO());
    rt.reset();
    await rt.run(makeCompiled(), makeHostIO());
    expect(rt.state).toBe("completed");
  });
});

describe("BrowserRuntime — failed run", () => {
  it("transitions to failed when main() throws", async () => {
    globalThis.WebAssembly = {
      ...globalThis.WebAssembly,
      instantiate: vi.fn().mockResolvedValue({
        instance: {
          exports: {
            main: () => { throw new Error("runtime trap"); },
          },
        },
        module: {},
      }),
    } as unknown as typeof WebAssembly;

    const rt = new BrowserRuntime();
    const hostIO = makeHostIO();
    await rt.run(makeCompiled(), hostIO);

    expect(rt.state).toBe("failed");
    expect(hostIO.onError).toHaveBeenCalledWith(expect.stringContaining("runtime trap"));
  });

  it("calls onError with [abort] message on assertion failure", async () => {
    const compiled = makeCompiled({ strings: ["x must be positive"] });

    globalThis.WebAssembly = {
      ...globalThis.WebAssembly,
      instantiate: vi.fn().mockResolvedValue({
        instance: {
          exports: {
            main: () => { throw new Error("[abort] x must be positive"); },
          },
        },
        module: {},
      }),
    } as unknown as typeof WebAssembly;

    const hostIO = makeHostIO();
    const rt = new BrowserRuntime();
    await rt.run(compiled, hostIO);
    expect(rt.state).toBe("failed");
    expect(hostIO.onError).toHaveBeenCalledWith("[abort] x must be positive");
  });
});

describe("BrowserRuntime — compile failure guard", () => {
  it("reports error and goes to failed if compiled.ok is false", async () => {
    const rt = new BrowserRuntime();
    const hostIO = makeHostIO();
    await rt.run(makeCompiled({ ok: false }), hostIO);
    expect(rt.state).toBe("failed");
    expect(hostIO.onError).toHaveBeenCalled();
  });
});

describe("BrowserRuntime — concurrent run guard", () => {
  it("throws if run() is called while already running", async () => {
    const rt = new BrowserRuntime();
    // Patch instantiate to never resolve (simulates running)
    globalThis.WebAssembly = {
      ...globalThis.WebAssembly,
      instantiate: vi.fn().mockReturnValue(new Promise(() => {})),
    } as unknown as typeof WebAssembly;

    const first = rt.run(makeCompiled(), makeHostIO());
    await expect(rt.run(makeCompiled(), makeHostIO())).rejects.toThrow(/already active/);
    // Clean up the dangling promise
    first.catch(() => {});
  });
});

describe("BrowserRuntime — reset guard", () => {
  it("reset() does nothing while running", () => {
    const rt = new BrowserRuntime();
    globalThis.WebAssembly = {
      ...globalThis.WebAssembly,
      instantiate: vi.fn().mockReturnValue(new Promise(() => {})),
    } as unknown as typeof WebAssembly;
    rt.run(makeCompiled(), makeHostIO()).catch(() => {});
    rt.reset(); // should be a no-op
    expect(rt.state).toBe("running");
  });
});
