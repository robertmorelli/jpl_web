// ============================================================================
// Compiler unit tests — exercises compileProgram() end-to-end.
// These tests run in Node (no browser APIs needed).
// ============================================================================

import { describe, it, expect } from "vitest";
import { compileProgram } from "../../src/compiler/index.ts";

// ---------------------------------------------------------------------------
// Successful compilation
// ---------------------------------------------------------------------------

describe("compileProgram — success", () => {
  it("compiles show integer", () => {
    const r = compileProgram("show 42");
    expect(r.ok).toBe(true);
    expect(r.diagnostics).toHaveLength(0);
    expect(r.wat).toContain("module");
    expect(r.strings).toBeInstanceOf(Array);
    expect(r.hasImageIO).toBe(false);
  });

  it("compiles show float", () => {
    const r = compileProgram("show 3.14");
    expect(r.ok).toBe(true);
    expect(r.wat).toContain("module");
  });

  it("compiles show bool", () => {
    const r = compileProgram("show true");
    expect(r.ok).toBe(true);
  });

  it("compiles print string", () => {
    const r = compileProgram(`print "hello"`);
    expect(r.ok).toBe(true);
    expect(r.strings).toContain("hello");
  });

  it("compiles arithmetic expression", () => {
    const r = compileProgram("show 1 + 2 * 3");
    expect(r.ok).toBe(true);
  });

  it("compiles let binding", () => {
    const r = compileProgram("let x = 42\nshow x");
    expect(r.ok).toBe(true);
  });

  it("compiles function definition + call", () => {
    const r = compileProgram("fn sq(x : int) : int {\n  return x * x\n}\nshow sq(5)");
    expect(r.ok).toBe(true);
  });

  it("compiles if-then-else", () => {
    const r = compileProgram("show if true then 1 else 0");
    expect(r.ok).toBe(true);
  });

  it("compiles array comprehension", () => {
    const r = compileProgram("let a = array[i : 5] i * i\nshow a[2]");
    expect(r.ok).toBe(true);
  });

  it("compiles sum loop", () => {
    const r = compileProgram("let n = 10\nshow sum[i : n] (i + 1)");
    expect(r.ok).toBe(true);
  });

  it("detects hasImageIO", () => {
    const r = compileProgram(`read image "in.png" to img\nwrite image img to "out.png"`);
    expect(r.ok).toBe(true);
    expect(r.hasImageIO).toBe(true);
  });

  it("program without image I/O has hasImageIO false", () => {
    const r = compileProgram("show 1");
    expect(r.hasImageIO).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Parse / lex errors
// ---------------------------------------------------------------------------

describe("compileProgram — parse errors", () => {
  it("reports lex error on invalid character", () => {
    const r = compileProgram("show @");
    expect(r.ok).toBe(false);
    expect(r.diagnostics.length).toBeGreaterThan(0);
    expect(r.diagnostics[0]!.kind).toMatch(/lex|parse/);
  });

  it("reports parse error on incomplete expression", () => {
    const r = compileProgram("show 1 +");
    expect(r.ok).toBe(false);
    expect(r.diagnostics[0]!.kind).toMatch(/lex|parse/);
  });

  it("returns empty ast, ir, wat on parse failure", () => {
    const r = compileProgram("show @@@");
    expect(r.ok).toBe(false);
    expect(r.wat).toBe("");
    expect(r.strings).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Type errors
// ---------------------------------------------------------------------------

describe("compileProgram — type errors", () => {
  it("reports type error on bad operand types", () => {
    const r = compileProgram(`fn f(x : int) : bool {\n  return x\n}`);
    expect(r.ok).toBe(false);
    expect(r.diagnostics.length).toBeGreaterThan(0);
    expect(r.diagnostics[0]!.kind).toBe("type");
  });

  it("has no WAT on type error", () => {
    const r = compileProgram(`fn f(x : int) : bool {\n  return x\n}`);
    expect(r.wat).toBe("");
  });
});

// ---------------------------------------------------------------------------
// CompileOptions
// ---------------------------------------------------------------------------

describe("compileProgram — options", () => {
  it("produces different WAT with namedVars", () => {
    const r1 = compileProgram("show 42", { namedVars: false });
    const r2 = compileProgram("show 42", { namedVars: true });
    expect(r1.ok).toBe(true);
    expect(r2.ok).toBe(true);
    // Named vars mode uses $-prefixed identifiers
    expect(r2.wat).toMatch(/\$[a-z]/);
  });

  it("accepts args option without throwing", () => {
    const r = compileProgram("let a[n] = args\nshow a[0]", { args: [42] });
    expect(r.ok).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// WAT content sanity checks
// ---------------------------------------------------------------------------

describe("compileProgram — WAT structure", () => {
  it("WAT starts with (module", () => {
    const r = compileProgram("show 1");
    expect(r.ok).toBe(true);
    expect(r.wat.trimStart()).toMatch(/^\(module/);
  });

  it("WAT contains $main export", () => {
    const r = compileProgram("show 1");
    expect(r.ok).toBe(true);
    expect(r.wat).toContain("main");
  });

  it("WAT contains host imports", () => {
    const r = compileProgram("show 1");
    expect(r.ok).toBe(true);
    expect(r.wat).toContain('"host"');
  });
});
