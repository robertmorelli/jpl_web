// ============================================================================
// JPL Compiler Frontend — Main entry point
// ============================================================================

import { lexJPL } from "./lexer.mjs";
import { parser } from "./parser.mjs";
import { buildAST } from "./ast.mjs";
import { typecheck } from "./typechecker.mjs";
import { buildWasm3IR } from "./wasm3_ir.mjs";

export { buildAST, typecheck, buildWasm3IR };

/**
 * Parse JPL source code and return a CST (Concrete Syntax Tree).
 *
 * @param {string} source - JPL source code
 * @returns {{ cst: object, lexErrors: any[], parseErrors: any[] }}
 */
export function parseJPL(source) {
    // 1. Lex
    const lexResult = lexJPL(source);
    if (lexResult.errors.length > 0) {
        return {
            cst: null,
            lexErrors: lexResult.errors,
            parseErrors: [],
        };
    }

    // 2. Parse
    parser.input = lexResult.tokens;
    const cst = parser.program();

    return {
        cst,
        lexErrors: lexResult.errors,
        parseErrors: parser.errors,
    };
}

/**
 * Pretty-print lex errors and parse errors.
 */
export function formatErrors(result) {
    const msgs = [];
    for (const err of result.lexErrors) {
        msgs.push(`Lex error at ${err.line}:${err.column}: ${err.message}`);
    }
    for (const err of result.parseErrors) {
        const tok = err.token;
        const loc = tok ? `${tok.startLine}:${tok.startColumn}` : "?";
        msgs.push(`Parse error at ${loc}: ${err.message}`);
    }
    return msgs;
}
