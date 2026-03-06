import { lexJPL } from "../src/lexer.mjs";
import { parseJPL, formatErrors, buildAST, typecheck, buildWasm3IR } from "../src/index.mjs";

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
function test(name, source) {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`TEST: ${name}`);
    console.log(`${"=".repeat(60)}`);
    console.log(`Source:\n${source}`);

    // Show tokens
    const lexResult = lexJPL(source);
    if (lexResult.errors.length > 0) {
        console.log("LEX ERRORS:", lexResult.errors.map(e => e.message));
        return false;
    }
    console.log(
        "Tokens:",
        lexResult.tokens.map((t) => `${t.tokenType.name}(${JSON.stringify(t.image)})`).join(" ")
    );

    // Parse
    const result = parseJPL(source);
    const errors = formatErrors(result);
    if (errors.length > 0) {
        console.log("PARSE ERRORS:");
        errors.forEach((e) => console.log("  ", e));
        return false;
    }
    console.log("✓ Parsed successfully");
    return true;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
let passed = 0;
let failed = 0;

function run(name, source) {
    if (test(name, source)) passed++;
    else failed++;
}

// Basic literals and show
run("show integer", `show 42`);
run("show float", `show 3.14`);
run("show bool", `show true`);
run("show void", `show void`);

// Let binding
run("let simple", `let x = 42`);
run("let with expression", `let x = 1 + 2 * 3`);

// Arithmetic precedence
run("precedence", `show 1 + 2 * 3 - 4 / 2`);

// Comparisons and booleans
run("comparison", `show 1 < 2 && 3 >= 3`);
run("boolean ops", `show true || false && !true`);

// Unary operators
run("unary minus", `show -42`);
run("unary bang", `show !false`);

// String and print
run("print string", `print "hello world"`);

// Array literal
run("array literal", `let a = [1, 2, 3]`);

// Array indexing
run("array index", `show a[0]`);

// Multi-dim array index
run("multi-dim index", `show m[i, j]`);

// Dot access
run("dot access", `show pixel.r`);

// Parenthesized expression
run("parens", `show (1 + 2) * 3`);

// If expression
run("if expr", `show if true then 1 else 0`);

// Nested if
run("nested if", `show if x < 0 then -x else x`);

// Array loop
run("array loop", `let a = array[i : 10] i * i`);

// Sum loop
run("sum loop", `show sum[i : n] a[i]`);

// Function call
run("function call", `show sqrt(2.0)`);

// Function call multi-arg
run("function call multi", `show pow(2.0, 3.0)`);

// Struct constructor
run("struct constructor", `let p = rgba { 1.0, 0.0, 0.0, 1.0 }`);

// Assert
run("assert", `assert x > 0, "x must be positive"`);

// Types
run("function definition", `fn square(x : int) : int {\nreturn x * x\n}`);

// Function with multiple args
run("fn multi args", `fn add(a : int, b : int) : int {\nreturn a + b\n}`);

// Struct definition
run("struct definition", `struct point {\nx : float\ny : float\n}`);

// Read/write image
run("read image", `read image "input.png" to img`);
run("write image", `write image result to "output.png"`);

// Time command
run("time command", `time show 42`);

// Let with array dimension binding
run("let array dims", `let a[n] = args`);

// Newline escape
run("newline escape", `let x = \\\n4 + \\\n5`);

// Line comment
run("line comment", `show 42 // this is a comment`);

// Block comment
run("block comment", `show /* inline */ 42`);

// Multiple statements separated by newlines
run("multi command", `let x = 1\nlet y = 2\nshow x + y`);

// Complex expression
run("complex expr", `show array[i : N] if !y[i] then 0 else 1 + 2 * x[i]`);

// Chained postfix
run("chained postfix", `show a[0].x`);

// Equality
run("equality", `show x == y`);
run("inequality", `show x != y`);

// Multiple newlines squash
run("newline squash", `show 1\n\n\nshow 2`);

// Float edge cases
run("float no leading", `show .5`);
run("float no trailing", `show 5.`);

// ---------------------------------------------------------------------------
// Typecheck tests
// ---------------------------------------------------------------------------
console.log(`\n${"=".repeat(60)}`);
console.log("TYPECHECK TESTS");
console.log(`${"=".repeat(60)}`);

function tc(name, source, expectErrors = false) {
    const result = parseJPL(source);
    if (result.lexErrors.length > 0 || result.parseErrors.length > 0) {
        console.log(`SKIP (parse failed): ${name}`);
        return;
    }
    const ast = buildAST(result.cst);
    const errors = typecheck(ast);
    const ok = expectErrors ? errors.length > 0 : errors.length === 0;
    if (ok) {
        console.log(`✓ ${name}`);
        passed++;
    } else {
        console.log(`✗ ${name}`);
        if (!expectErrors) errors.forEach(e => console.log("    error:", e));
        else console.log("    expected type errors but got none");
        failed++;
    }
}

// Valid programs
tc("typecheck: let int",           `let x = 42`);
tc("typecheck: let float",         `let x = 3.14`);
tc("typecheck: let bool",          `let x = true`);
tc("typecheck: arithmetic",        `let x = 1 + 2 * 3`);
tc("typecheck: comparison",        `let b = 1 < 2`);
tc("typecheck: bool ops",          `let b = true && !false`);
tc("typecheck: if expr",           `let x = if true then 1 else 0`);
tc("typecheck: array literal",     `let a = [1, 2, 3]`);
tc("typecheck: array loop",        `let a = array[i : 10] i * i`);
tc("typecheck: sum loop",          `let s = sum[i : 10] i`);
tc("typecheck: unary minus",       `let x = -42`);
tc("typecheck: nested let",        `let x = 1\nlet y = x + 1`);
tc("typecheck: function def+call", `fn double(x : int) : int {\nreturn x + x\n}\nlet r = double(21)`);
tc("typecheck: struct def+ctor",   `struct pt {\nx : float\ny : float\n}\nlet p = pt { 1.0, 2.0 }`);
tc("typecheck: struct field",      `struct pt {\nx : float\ny : float\n}\nlet p = pt { 1.0, 2.0 }\nlet v = p.x`);
tc("typecheck: multi-dim array",   `let m = array[i : 3, j : 3] i + j`);
tc("typecheck: assert",            `assert 1 < 2, "ok"`);
tc("typecheck: show",              `show 42`);
tc("typecheck: array dim binding", `fn f(a[n] : int[]) : int {\nreturn a[0]\n}`);

// Type errors — these should produce errors
tc("error: type mismatch arith",   `let x = 1 + true`,             true);
tc("error: if branch mismatch",    `let x = if true then 1 else 2.0`, true);
tc("error: undefined var",         `show z`,                        true);
tc("error: undefined fn",          `show foo(1)`,                   true);
tc("error: wrong arg count",       `fn f(x : int) : int {\nreturn x\n}\nlet r = f(1, 2)`, true);
tc("error: bool not numeric",      `let x = true + 1`,              true);
tc("error: index non-array",       `let x = 1\nshow x[0]`,         true);
tc("error: assert non-bool",       `assert 42, "bad"`,              true);
tc("error: return type mismatch",  `fn f() : int {\nreturn true\n}`, true);
tc("error: undefined struct",      `let p = nope { 1.0 }`,          true);

// ---------------------------------------------------------------------------
// Wasm 3.0 IR tests
// ---------------------------------------------------------------------------
console.log(`\n${"=".repeat(60)}`);
console.log("WASM3 IR TESTS");
console.log(`${"=".repeat(60)}`);

function flattenOps(ops, out = []) {
    for (const op of ops) {
        out.push(op.op);
        if (op.then) flattenOps(op.then, out);
        if (op.else) flattenOps(op.else, out);
        if (op.body) flattenOps(op.body, out);
    }
    return out;
}

function irTest(name, source, check) {
    const result = parseJPL(source);
    if (result.lexErrors.length > 0 || result.parseErrors.length > 0) {
        console.log(`✗ ${name}`);
        console.log("    parse failed");
        failed++;
        return;
    }

    const ast = buildAST(result.cst);
    const ir = buildWasm3IR(ast);
    const ok = check(ir);
    if (ok) {
        console.log(`✓ ${name}`);
        passed++;
    } else {
        console.log(`✗ ${name}`);
        failed++;
    }
}

irTest(
    "ir: struct type + struct.new",
    `struct point {\n  x : float\n  y : float\n}\nlet p = point { 1.0, 2.0 }\nshow p.x`,
    (ir) => {
        const hasPointType = ir.types.some((t) => t.id === "$point" && t.kind === "struct");
        const main = ir.funcs.find((f) => f.name === "$main");
        const ops = flattenOps(main.body);
        return hasPointType && ops.includes("struct.new") && ops.includes("struct.get");
    }
);

irTest(
    "ir: array literal uses wasm gc array+struct",
    `let a = [1, 2, 3]\nshow a[0]`,
    (ir) => {
        const hasArrayType = ir.types.some((t) => t.kind === "array" && t.id.startsWith("$jpl_data_"));
        const hasArrayBinding = ir.types.some((t) => t.kind === "struct" && t.id.startsWith("$jpl_arr_r1_"));
        const main = ir.funcs.find((f) => f.name === "$main");
        const ops = flattenOps(main.body);
        return hasArrayType && hasArrayBinding &&
            ops.includes("array.new_fixed") &&
            ops.includes("array.get") &&
            ops.includes("struct.new");
    }
);

irTest(
    "ir: array loop uses array.new_default + array.set",
    `let a = array[i : 4] i * i\nshow a[2]`,
    (ir) => {
        const main = ir.funcs.find((f) => f.name === "$main");
        const ops = flattenOps(main.body);
        return ops.includes("array.new_default") &&
            ops.includes("array.set") &&
            ops.includes("block") &&
            ops.includes("loop");
    }
);

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log(`\n${"=".repeat(60)}`);
console.log(`Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);
console.log(`${"=".repeat(60)}`);

if (failed > 0) process.exit(1);
