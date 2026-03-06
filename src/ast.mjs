// ============================================================================
// JPL AST Builder — converts Chevrotain CST to a clean AST
// ============================================================================

// ---------------------------------------------------------------------------
// CST helpers
// ---------------------------------------------------------------------------
function ch(node, key) { return (node.children[key] || [])[0] || null; }
function all(node, key) { return node.children[key] || []; }

// Return sorted operator names from multiple token types (by source position)
function sortedOps(node, names) {
    return names
        .flatMap(name => all(node, name).map(t => ({ op: name, off: t.startOffset })))
        .sort((a, b) => a.off - b.off)
        .map(t => t.op);
}

// Smallest startOffset anywhere inside a CST node or token
function firstOffset(n) {
    if (!n) return Infinity;
    if (typeof n.startOffset === "number") return n.startOffset;
    return Object.values(n.children || {})
        .flat()
        .reduce((m, c) => Math.min(m, firstOffset(c)), Infinity);
}

// ---------------------------------------------------------------------------
// Type builders
// ---------------------------------------------------------------------------
function buildBaseType(node) {
    const c = node.children;
    if (c.Int)        return { kind: "int" };
    if (c.Bool)       return { kind: "bool" };
    if (c.Float)      return { kind: "float" };
    if (c.Void)       return { kind: "void" };
    return { kind: "named", name: c.Identifier[0].image };
}

// type = baseType ( "[" ","* "]" )*
// rank = Σ (1 + commas_in_group); commas are flat in CST so we approximate:
//   total_rank = LBracket.length + Comma.length
function buildType(node) {
    const base = buildBaseType(ch(node, "baseType"));
    const nbrackets = all(node, "LBracket").length;
    if (nbrackets === 0) return base;
    const rank = nbrackets + all(node, "Comma").length;
    return { kind: "array", elem: base, rank };
}

// ---------------------------------------------------------------------------
// Argument / lvalue / binding builders
// ---------------------------------------------------------------------------
// argument = Identifier ( "[" ( Identifier ("," Identifier)* )? "]" )?
// All Identifier tokens stored flat under "Identifier"; first = var, rest = dims
function buildArgument(node) {
    const ids = all(node, "Identifier");
    const hasBracket = all(node, "LBracket").length > 0;
    return {
        name: ids[0].image,
        dims: hasBracket ? ids.slice(1).map(t => t.image) : [],
    };
}

function buildBinding(node) {
    return {
        arg:  buildArgument(ch(node, "argument")),
        type: buildType(ch(node, "type")),
    };
}

// ---------------------------------------------------------------------------
// Expression builders
// ---------------------------------------------------------------------------
function buildExpr(node) {
    if (ch(node, "ifExpr"))    return buildIfExpr(ch(node, "ifExpr"));
    if (ch(node, "arrayExpr")) return buildArrayExpr(ch(node, "arrayExpr"));
    if (ch(node, "sumExpr"))   return buildSumExpr(ch(node, "sumExpr"));
    return buildOrExpr(ch(node, "orExpr"));
}

function buildIfExpr(node) {
    return {
        kind: "IfExpr",
        cond: buildExpr(all(node, "condition")[0]),
        then: buildExpr(all(node, "thenBranch")[0]),
        else: buildExpr(all(node, "elseBranch")[0]),
    };
}

function buildLoopBinding(node) {
    return {
        var:   all(node, "Identifier")[0].image,
        bound: buildExpr(ch(node, "expr")),
    };
}

function buildArrayExpr(node) {
    return {
        kind:     "ArrayExpr",
        bindings: all(node, "loopBinding").map(buildLoopBinding),
        body:     buildExpr(all(node, "body")[0]),
    };
}

function buildSumExpr(node) {
    return {
        kind:     "SumExpr",
        bindings: all(node, "loopBinding").map(buildLoopBinding),
        body:     buildExpr(all(node, "body")[0]),
    };
}

// Build left-associative binary chain from labeled lhs/rhs nodes + sorted ops
function buildBinChain(node, lhsKey, rhsKey, opNames, opSymbols, buildChild) {
    const ops = sortedOps(node, opNames);
    const rhs = all(node, rhsKey);
    let result = buildChild(all(node, lhsKey)[0]);
    for (let i = 0; i < rhs.length; i++) {
        result = { kind: "BinOp", op: opSymbols[ops[i]], lhs: result, rhs: buildChild(rhs[i]) };
    }
    return result;
}

function buildOrExpr(node) {
    return buildBinChain(node, "lhs", "rhs", ["OrOr"], { OrOr: "||" }, buildAndExpr);
}

function buildAndExpr(node) {
    return buildBinChain(node, "lhs", "rhs", ["AndAnd"], { AndAnd: "&&" }, buildCompExpr);
}

function buildCompExpr(node) {
    const SYM = { Less: "<", Greater: ">", LessEq: "<=", GreaterEq: ">=", EqEq: "==", BangEq: "!=" };
    return buildBinChain(node, "lhs", "rhs", Object.keys(SYM), SYM, buildAddExpr);
}

function buildAddExpr(node) {
    return buildBinChain(node, "lhs", "rhs", ["Plus", "Minus"], { Plus: "+", Minus: "-" }, buildMulExpr);
}

function buildMulExpr(node) {
    return buildBinChain(node, "lhs", "rhs", ["Star", "Slash", "Percent"],
        { Star: "*", Slash: "/", Percent: "%" }, buildUnaryExpr);
}

function buildUnaryExpr(node) {
    if (all(node, "Minus").length > 0)
        return { kind: "UnaryOp", op: "-", operand: buildUnaryExpr(all(node, "operand")[0]) };
    if (all(node, "Bang").length > 0)
        return { kind: "UnaryOp", op: "!", operand: buildUnaryExpr(all(node, "operand")[0]) };
    return buildPostfixExpr(ch(node, "postfixExpr"));
}

function buildPostfixExpr(node) {
    let result = buildPrimaryExpr(ch(node, "primaryExpr"));

    const lbs    = all(node, "LBracket");
    const rbs    = all(node, "RBracket");
    const dots   = all(node, "Dot");
    const fields = all(node, "field");   // labeled Identifier tokens
    const idxs   = all(node, "index");   // labeled expr nodes

    // Reconstruct operation sequence in source order
    const ops = [];
    for (let i = 0; i < lbs.length; i++) {
        const lo = lbs[i].startOffset, ro = rbs[i].startOffset;
        const indices = idxs
            .filter(e => { const off = firstOffset(e); return off > lo && off < ro; })
            .map(buildExpr);
        ops.push({ kind: "index", indices, offset: lo });
    }
    for (let i = 0; i < dots.length; i++) {
        ops.push({ kind: "field", field: fields[i].image, offset: dots[i].startOffset });
    }
    ops.sort((a, b) => a.offset - b.offset);

    for (const op of ops) {
        result = op.kind === "index"
            ? { kind: "Index", base: result, indices: op.indices }
            : { kind: "FieldAccess", base: result, field: op.field };
    }
    return result;
}

function buildPrimaryExpr(node) {
    const c = node.children;
    if (c.IntegerLiteral) return { kind: "IntLit",   value: parseInt(c.IntegerLiteral[0].image, 10) };
    if (c.FloatLiteral)   return { kind: "FloatLit", value: parseFloat(c.FloatLiteral[0].image) };
    if (c.True)           return { kind: "BoolLit",  value: true };
    if (c.False)          return { kind: "BoolLit",  value: false };
    if (c.Void)           return { kind: "VoidLit" };
    if (c.StringLiteral)  return { kind: "StringLit", value: c.StringLiteral[0].image.slice(1, -1) };
    if (c.expr)           return buildExpr(c.expr[0]);   // parenthesized
    if (c.arrayLiteral)   return { kind: "ArrayLit", elements: all(c.arrayLiteral[0], "expr").map(buildExpr) };
    if (c.identExpr)      return buildIdentExpr(c.identExpr[0]);
    throw new Error("Unknown primaryExpr");
}

function buildIdentExpr(node) {
    const name = all(node, "Identifier")[0].image;
    if (all(node, "LBrace").length > 0)
        return { kind: "StructCtor", name, args: all(node, "expr").map(buildExpr) };
    if (all(node, "LParen").length > 0)
        return { kind: "Call", callee: name, args: all(node, "expr").map(buildExpr) };
    return { kind: "Var", name };
}

// ---------------------------------------------------------------------------
// Statement builders
// ---------------------------------------------------------------------------
function buildStatement(node) {
    const c = node.children;
    if (c.letStmt)    return buildLetLike(c.letStmt[0],    "LetStmt");
    if (c.assertStmt) return buildAssertLike(c.assertStmt[0], "AssertStmt");
    if (c.returnStmt) return {
        kind: "ReturnStmt",
        expr: buildExpr(ch(c.returnStmt[0], "expr")),
    };
    throw new Error("Unknown statement");
}

function buildLetLike(node, kind) {
    return {
        kind,
        lvalue: buildArgument(ch(ch(node, "lvalue"), "argument")),
        expr:   buildExpr(ch(node, "expr")),
    };
}

function buildAssertLike(node, kind) {
    return {
        kind,
        cond: buildExpr(ch(node, "expr")),
        msg:  all(node, "StringLiteral")[0].image.slice(1, -1),
    };
}

// ---------------------------------------------------------------------------
// Command builders
// ---------------------------------------------------------------------------
function buildCommand(node) {
    const c = node.children;
    if (c.letCmd)    return buildLetLike(c.letCmd[0], "LetCmd");
    if (c.assertCmd) return buildAssertLike(c.assertCmd[0], "AssertCmd");
    if (c.showCmd)   return { kind: "ShowCmd",  expr: buildExpr(ch(c.showCmd[0], "expr")) };
    if (c.printCmd)  return { kind: "PrintCmd", msg: all(c.printCmd[0], "StringLiteral")[0].image.slice(1, -1) };
    if (c.timeCmd)   return { kind: "TimeCmd",  cmd: buildCommand(ch(c.timeCmd[0], "command")) };
    if (c.readCmd)   return {
        kind:     "ReadCmd",
        filename: all(c.readCmd[0], "StringLiteral")[0].image.slice(1, -1),
        target:   buildArgument(ch(c.readCmd[0], "argument")),
    };
    if (c.writeCmd)  return {
        kind:     "WriteCmd",
        expr:     buildExpr(ch(c.writeCmd[0], "expr")),
        filename: all(c.writeCmd[0], "StringLiteral")[0].image.slice(1, -1),
    };
    if (c.structCmd) {
        const n = c.structCmd[0];
        return {
            kind:   "StructCmd",
            name:   all(n, "Identifier")[0].image,
            fields: all(n, "structField").map(f => ({
                name: all(f, "Identifier")[0].image,
                type: buildType(ch(f, "type")),
            })),
        };
    }
    if (c.fnCmd) {
        const n = c.fnCmd[0];
        return {
            kind:    "FnCmd",
            name:    all(n, "Identifier")[0].image,
            params:  all(n, "binding").map(buildBinding),
            retType: buildType(ch(n, "type")),
            body:    all(n, "statement").map(buildStatement),
        };
    }
    throw new Error("Unknown command");
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------
export function buildAST(cst) {
    return {
        kind:     "Program",
        commands: all(cst, "command").map(buildCommand),
    };
}
