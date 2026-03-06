// ============================================================================
// Integration tests — compile JPL programs and run them through the Node
// runtime (wasm_executor.mjs → wasm-tools → WebAssembly.instantiate).
//
// These tests are skipped automatically when wasm-tools is not available
// on the PATH (e.g. in CI environments without the tool installed).
// ============================================================================

import { describe, it, expect } from "vitest";
import { execFileSync } from "child_process";
import { compileProgram } from "../../src/compiler/index.ts";

// Import the Node runtime dynamically so TypeScript doesn't need to type it.
const { runWasmIR } = await import("../../src/runtime/wasm_executor.mjs");

// ---------------------------------------------------------------------------
// Guard: skip if wasm-tools is not on PATH
// ---------------------------------------------------------------------------

function hasWasmTools(): boolean {
  try {
    execFileSync("wasm-tools", ["--version"], { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

const WASM_TOOLS_AVAILABLE = hasWasmTools();

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

async function run(source: string, args?: number[]): Promise<string[]> {
  const result = compileProgram(source, { args });
  if (!result.ok) {
    throw new Error(
      "Compilation failed: " + result.diagnostics.map((d) => d.message).join("; ")
    );
  }
  const { output } = await (runWasmIR as any)(result.ir);
  return output as string[];
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe.skipIf(!WASM_TOOLS_AVAILABLE)("integration: basic programs", () => {
  it("show integer", async () => {
    expect(await run("show 42")).toEqual(["42"]);
  });

  it("show float", async () => {
    expect(await run("show 3.14")).toEqual(["3.14"]);
  });

  it("show bool true", async () => {
    expect(await run("show true")).toEqual(["true"]);
  });

  it("show bool false", async () => {
    expect(await run("show false")).toEqual(["false"]);
  });

  it("print string", async () => {
    expect(await run(`print "hello"`)).toEqual(["hello"]);
  });

  it("arithmetic", async () => {
    expect(await run("show 1 + 2 * 3")).toEqual(["7"]);
  });

  it("let binding + show", async () => {
    expect(await run("let x = 10\nshow x * x")).toEqual(["100"]);
  });

  it("if-then-else true branch", async () => {
    expect(await run("show if true then 1 else 2")).toEqual(["1"]);
  });

  it("if-then-else false branch", async () => {
    expect(await run("show if false then 1 else 2")).toEqual(["2"]);
  });
});

describe.skipIf(!WASM_TOOLS_AVAILABLE)("integration: functions", () => {
  it("factorial(5) = 120", async () => {
    const src = `fn fact(n : int) : int {\n  return if n <= 1 then 1 else n * fact(n - 1)\n}\nshow fact(5)`;
    expect(await run(src)).toEqual(["120"]);
  });

  it("fibonacci(10) = 55", async () => {
    const src = `fn fib(n : int) : int {\n  return if n <= 1 then n else fib(n - 1) + fib(n - 2)\n}\nshow fib(10)`;
    expect(await run(src)).toEqual(["55"]);
  });

  it("multi-arg function", async () => {
    const src = `fn add(a : int, b : int) : int {\n  return a + b\n}\nshow add(3, 4)`;
    expect(await run(src)).toEqual(["7"]);
  });
});

describe.skipIf(!WASM_TOOLS_AVAILABLE)("integration: arrays", () => {
  it("array comprehension + indexing", async () => {
    const src = "let a = array[i : 5] i * i\nshow a[4]";
    expect(await run(src)).toEqual(["16"]);
  });

  it("sum loop over array", async () => {
    const src = "let n = 5\nshow sum[i : n] (i + 1)";
    expect(await run(src)).toEqual(["15"]);
  });
});

describe.skipIf(!WASM_TOOLS_AVAILABLE)("integration: math builtins", () => {
  it("sqrt(4.0) = 2", async () => {
    const output = await run("show sqrt(4.0)");
    expect(parseFloat(output[0]!)).toBeCloseTo(2.0);
  });

  it("pow(2.0, 8.0) = 256", async () => {
    const output = await run("show pow(2.0, 8.0)");
    expect(parseFloat(output[0]!)).toBeCloseTo(256.0);
  });

  it("floor(3.9) = 3", async () => {
    const output = await run("show floor(3.9)");
    expect(parseFloat(output[0]!)).toBeCloseTo(3.0);
  });
});

describe.skipIf(!WASM_TOOLS_AVAILABLE)("integration: multiple outputs", () => {
  it("multiple show statements", async () => {
    const src = "show 1\nshow 2\nshow 3";
    expect(await run(src)).toEqual(["1", "2", "3"]);
  });

  it("print then show", async () => {
    const src = `print "count:"\nshow 42`;
    expect(await run(src)).toEqual(["count:", "42"]);
  });
});

describe.skipIf(!WASM_TOOLS_AVAILABLE)("integration: error handling", () => {
  it("assertion failure throws with [abort] prefix", async () => {
    const src = `assert false, "intentional"`;
    await expect(run(src)).rejects.toThrow(/\[abort\]/);
  });
});

describe.skipIf(!WASM_TOOLS_AVAILABLE)("integration: args", () => {
  it("passes integer args into the program", async () => {
    const src = "let a[n] = args\nshow a[0]";
    expect(await run(src, [99])).toEqual(["99"]);
  });
});
