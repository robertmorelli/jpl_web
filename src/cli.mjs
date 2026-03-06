#!/usr/bin/env node
// ============================================================================
// JPL CLI — compile and/or run JPL programs
//
// Usage: jpl [-l|-p|-t|-i|-s] [--named_vars] <file.jpl> [int args...]
//   -l  Lex only, print tokens
//   -p  Parse only, print AST as s-expressions
//   -t  Typecheck only
//   -i  Output IR as JSON
//   -s  Output WAT (IR JSON, pending a real WAT emitter)
//   --named_vars  Emit named params/locals in WAT (default is unnamed indices)
//   (none) Compile and run
// ============================================================================

import { readFileSync } from "fs";
import { lexJPL } from "./lexer.mjs";
import { parseJPL, formatErrors, buildAST, typecheck, buildWasm3IR } from "./index.mjs";
import { emitWasm3Wat } from "./wasm3/wat_emitter.mjs";
import { runWasmIR } from "./runtime/wasm_executor.mjs";

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------
const MODE_FLAGS = new Set(["-l", "-p", "-t", "-i", "-s"]);
const rawArgs = process.argv.slice(2);

let flag = null;
let namedVars = false;
let fileArg = null;
const programArgs = [];

for (const a of rawArgs) {
    if ((a === "--named_vars" || a === "named_vars") && fileArg === null) {
        namedVars = true;
        continue;
    }

    if (a.startsWith("-") && fileArg === null) {
        if (!MODE_FLAGS.has(a)) {
            console.error(`Unknown flag: ${a}`);
            console.error("Usage: jpl [-l|-p|-t|-i|-s] [--named_vars] <file.jpl> [int args...]");
            process.exit(1);
        }
        if (flag !== null) {
            console.error("Only one flag is allowed");
            process.exit(1);
        }
        flag = a;
    } else if (fileArg === null) {
        fileArg = a;
    } else {
        if (!/^-?\d+$/.test(a)) {
            console.error(`Program argument must be an integer: ${a}`);
            process.exit(1);
        }
        programArgs.push(parseInt(a, 10));
    }
}

if (!fileArg) {
    console.error("Usage: jpl [-l|-p|-t|-i|-s] [--named_vars] <file.jpl> [int args...]");
    process.exit(1);
}

let source;
try {
    source = readFileSync(fileArg, "utf8");
} catch (e) {
    console.error(`Cannot read file: ${fileArg}`);
    process.exit(1);
}

// ---------------------------------------------------------------------------
// Lex
// ---------------------------------------------------------------------------
const lexResult = lexJPL(source);
if (lexResult.errors.length > 0) {
    for (const e of lexResult.errors) console.log(`Lex error: ${e.message}`);
    console.log("Compilation failed: lex errors");
    process.exit(1);
}

if (flag === "-l") {
    for (const t of lexResult.tokens) {
        console.log(`${t.tokenType.name}(${JSON.stringify(t.image)})`);
    }
    console.log("Compilation succeeded: lexed");
    process.exit(0);
}

// ---------------------------------------------------------------------------
// Parse
// ---------------------------------------------------------------------------
const parseResult = parseJPL(source);
const parseErrors = formatErrors(parseResult);
if (parseErrors.length > 0) {
    for (const e of parseErrors) console.log(e);
    console.log("Compilation failed: parse errors");
    process.exit(1);
}

const ast = buildAST(parseResult.cst);

if (flag === "-p") {
    console.log(prettyPrintAST(ast));
    console.log("Compilation succeeded: parsed");
    process.exit(0);
}

// ---------------------------------------------------------------------------
// Typecheck
// ---------------------------------------------------------------------------
const tcErrors = typecheck(ast);
if (tcErrors.length > 0) {
    for (const e of tcErrors) console.log(e);
    console.log("Compilation failed: type errors");
    process.exit(1);
}

if (flag === "-t") {
    console.log("Compilation succeeded: type checked");
    process.exit(0);
}

// ---------------------------------------------------------------------------
// IR
// ---------------------------------------------------------------------------
const ir = buildWasm3IR(ast, { args: programArgs });

if (flag === "-i") {
    console.log(JSON.stringify(ir, null, 2));
    console.log("Compilation succeeded: IR generated");
    process.exit(0);
}

if (flag === "-s") {
    process.stdout.write(emitWasm3Wat(ir, { namedVars }));
    console.log("Compilation succeeded: WAT generated");
    process.exit(0);
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
try {
    const runResult = await runWasmIR(ir);
    for (const line of runResult.output) console.log(line);
    console.log("Compilation succeeded: executed");
} catch (e) {
    const msg = e.message || String(e);
    console.log(msg.startsWith("[abort]") ? msg : `Runtime error: ${msg}`);
    console.log("Compilation failed: runtime error");
    process.exit(1);
}

// ---------------------------------------------------------------------------
// AST pretty-printer (s-expression format)
// ---------------------------------------------------------------------------
function prettyPrintAST(node, indent = 0) {
    if (node === null || node === undefined) return "null";
    if (typeof node !== "object") return JSON.stringify(node);
    if (Array.isArray(node)) {
        if (node.length === 0) return "()";
        return node.map(item => prettyPrintAST(item, indent)).join("\n" + " ".repeat(indent));
    }

    const kind = node.kind ?? "?";
    const entries = Object.entries(node).filter(([k]) => k !== "kind");
    if (entries.length === 0) return `(${kind})`;

    const inner = indent + 2;
    const parts = entries.map(([k, v]) => {
        const vStr = prettyPrintAST(v, inner);
        return `${" ".repeat(inner)}:${k} ${vStr}`;
    });

    return `(${kind}\n${parts.join("\n")})`;
}
