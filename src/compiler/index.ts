// ============================================================================
// JPL Compiler — browser-safe public entrypoint
//
// compileProgram(source, options) runs the full pipeline:
//   lex → parse → AST → typecheck → IR → WAT
//
// All underlying modules are Node-free; this file is safe to bundle for the
// browser. The only runtime dependency is chevrotain (also browser-safe).
// ============================================================================

// These JS modules have no TypeScript types, so we import them with `any`
// casts at the boundary. checkJs: false keeps the .mjs files untype-checked.
import { parseJPL, formatErrors, buildAST, typecheck, buildWasm3IR } from "../index.mjs";
import { emitWasm3Wat } from "../wasm3/wat_emitter.mjs";
import { prettyWat as _prettyWat } from "./pretty_wat.ts";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface Diagnostic {
  kind: "lex" | "parse" | "type";
  message: string;
  line?: number;
  column?: number;
}

export interface CompileOptions {
  /** Integer arguments baked as constants into $main (mirrors CLI int args). */
  args?: number[];
  /** Emit named params/locals in WAT instead of index references. */
  namedVars?: boolean;
}

export interface CompileResult {
  ok: boolean;
  /** Typed AST. Opaque outside the compiler — carry it through for IR gen. */
  ast: unknown;
  /** Wasm3 IR object produced by buildWasm3IR. Pass to runWasmIR. */
  ir: unknown;
  /** WAT text (flat stack format). Present only when ok === true. */
  wat: string;
  /** WAT text (fully-folded S-expression format). Present only when ok === true. */
  prettyWat: string;
  /** String table embedded in the module (indices map to print_literal calls). */
  strings: string[];
  /** True when the program contains read image / write image commands. */
  hasImageIO: boolean;
  diagnostics: Diagnostic[];
}

// ---------------------------------------------------------------------------
// compileProgram
// ---------------------------------------------------------------------------

export function compileProgram(
  source: string,
  options: CompileOptions = {}
): CompileResult {
  const empty: CompileResult = {
    ok: false,
    ast: null,
    ir: null,
    wat: "",
    prettyWat: "",
    strings: [],
    hasImageIO: false,
    diagnostics: [],
  };

  // ── Lex + Parse ──────────────────────────────────────────────────────────
  // parseJPL internally lexes then parses; formatErrors produces human strings.
  let parseResult: any;
  let parseErrors: string[];
  try {
    parseResult = (parseJPL as any)(source);
    parseErrors = (formatErrors as any)(parseResult) as string[];
  } catch (e: unknown) {
    return {
      ...empty,
      diagnostics: [{ kind: "parse", message: _msg(e) }],
    };
  }

  if (parseErrors.length > 0) {
    return {
      ...empty,
      diagnostics: parseErrors.map(_parseDiagnostic),
    };
  }

  // ── AST ──────────────────────────────────────────────────────────────────
  let ast: unknown;
  try {
    ast = (buildAST as any)(parseResult.cst);
  } catch (e: unknown) {
    return { ...empty, diagnostics: [{ kind: "parse", message: _msg(e) }] };
  }

  // ── Typecheck ─────────────────────────────────────────────────────────────
  let typeErrors: string[];
  try {
    typeErrors = (typecheck as any)(ast) as string[];
  } catch (e: unknown) {
    return { ...empty, ast, diagnostics: [{ kind: "type", message: _msg(e) }] };
  }

  if (typeErrors.length > 0) {
    return {
      ...empty,
      ast,
      diagnostics: typeErrors.map((msg) => ({ kind: "type" as const, message: msg })),
    };
  }

  // ── IR + WAT ──────────────────────────────────────────────────────────────
  let ir: any;
  let wat: string;
  let prettyWat: string;
  try {
    ir = (buildWasm3IR as any)(ast, { args: options.args ?? [] });
    wat = (emitWasm3Wat as any)(ir, { namedVars: options.namedVars ?? false }) as string;
    prettyWat = _prettyWat(ir);
  } catch (e: unknown) {
    return { ...empty, ast, diagnostics: [{ kind: "type", message: _msg(e) }] };
  }

  return {
    ok: true,
    ast,
    ir,
    wat,
    prettyWat,
    strings: (ir.strings as string[]) ?? [],
    hasImageIO: (ir.hasImageIO as boolean) ?? false,
    diagnostics: [],
  };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function _msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

/**
 * Parse a human-readable diagnostic string of the form:
 *   "Lex error at 3:12: unexpected character"
 *   "Parse error at 7:4: extraneous token"
 */
function _parseDiagnostic(msg: string): Diagnostic {
  const m = msg.match(/^(?:Lex|Parse) error at (\d+):(\d+): (.+)$/);
  if (m) {
    const kind: Diagnostic["kind"] = msg.startsWith("Lex") ? "lex" : "parse";
    return { kind, message: m[3]!, line: parseInt(m[1]!, 10), column: parseInt(m[2]!, 10) };
  }
  return { kind: "parse", message: msg };
}
