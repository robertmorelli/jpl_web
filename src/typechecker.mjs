// ============================================================================
// JPL Typechecker
// ============================================================================

// ---------------------------------------------------------------------------
// Type constructors and helpers
// ---------------------------------------------------------------------------
const T_INT   = { kind: "int" };
const T_FLOAT = { kind: "float" };
const T_BOOL  = { kind: "bool" };
const T_VOID  = { kind: "void" };
const T_ERR   = { kind: "error" };   // sentinel — suppresses cascading errors

function arrayType(elem, rank) { return { kind: "array", elem, rank }; }
function namedType(name)       { return { kind: "named", name }; }

function typeEq(a, b) {
    if (a.kind !== b.kind) return false;
    if (a.kind === "array") return a.rank === b.rank && typeEq(a.elem, b.elem);
    if (a.kind === "named") return a.name === b.name;
    return true; // int, float, bool, void, error
}

function typeStr(t) {
    switch (t.kind) {
        case "int":   return "int";
        case "float": return "float";
        case "bool":  return "bool";
        case "void":  return "void";
        case "error": return "<error>";
        case "named": return t.name;
        case "array": return `${typeStr(t.elem)}[${ ",".repeat(t.rank - 1) }]`;
        default:      return "<?>";
    }
}

function isNumeric(t) { return t.kind === "int" || t.kind === "float"; }

// ---------------------------------------------------------------------------
// Environment (lexical scope chain)
// ---------------------------------------------------------------------------
class Env {
    constructor(parent = null) {
        this.parent  = parent;
        this.vars    = new Map();   // name → Type
        this.fns     = new Map();   // name → { params: Type[], ret: Type }
        this.structs = new Map();   // name → { name, type }[]
    }
    lookupVar(name)    { return this.vars.get(name)    ?? this.parent?.lookupVar(name)    ?? null; }
    lookupFn(name)     { return this.fns.get(name)     ?? this.parent?.lookupFn(name)     ?? null; }
    lookupStruct(name) { return this.structs.get(name) ?? this.parent?.lookupStruct(name) ?? null; }
    isVisible(name) {
        return this.vars.has(name) || this.fns.has(name) || this.structs.has(name)
            || (this.parent ? this.parent.isVisible(name) : false);
    }
    child()            { return new Env(this); }
}

// ---------------------------------------------------------------------------
// Bind an argument pattern against an inferred type
//   let a      = e   →  a : T     (dims=[])
//   let a[n]   = e   →  e must be T[], a : T[], n : int
//   let a[m,n] = e   →  e must be T[,], a : T[,], m : int, n : int
// ---------------------------------------------------------------------------
function bindArgument(arg, exprType, env, errors) {
    if (arg.dims.length === 0) {
        if (env.isVisible(arg.name)) errors.push(`Name '${arg.name}' already defined`);
        env.vars.set(arg.name, exprType);
        return;
    }
    if (exprType.kind === "error") { env.vars.set(arg.name, T_ERR); return; }
    if (exprType.kind !== "array") {
        errors.push(`Cannot destructure non-array type ${typeStr(exprType)} into ${arg.name}[...]`);
        env.vars.set(arg.name, T_ERR);
        return;
    }
    if (arg.dims.length !== exprType.rank) {
        errors.push(
            `Binding ${arg.name}[${arg.dims.join(",")}] has ${arg.dims.length} dim(s) ` +
            `but expression has rank ${exprType.rank}`
        );
    }
    if (env.isVisible(arg.name)) errors.push(`Name '${arg.name}' already defined`);
    env.vars.set(arg.name, exprType);
    for (const d of arg.dims) {
        if (env.isVisible(d)) errors.push(`Name '${d}' already defined`);
        env.vars.set(d, T_INT);
    }
}

// ---------------------------------------------------------------------------
// Expression type inference
// ---------------------------------------------------------------------------
function inferExpr(expr, env, errors) {
    switch (expr.kind) {
        case "IntLit":    return T_INT;
        case "FloatLit":  return T_FLOAT;
        case "BoolLit":   return T_BOOL;
        case "VoidLit":   return T_VOID;
        case "StringLit": return { kind: "string" };

        case "Var": {
            const t = env.lookupVar(expr.name);
            if (!t) errors.push(`Undefined variable: ${expr.name}`);
            return t ?? T_ERR;
        }

        case "BinOp": {
            const lt = inferExpr(expr.lhs, env, errors);
            const rt = inferExpr(expr.rhs, env, errors);
            return inferBinOp(expr.op, lt, rt, errors);
        }

        case "UnaryOp": {
            const t = inferExpr(expr.operand, env, errors);
            if (t.kind === "error") return T_ERR;
            if (expr.op === "-") {
                if (!isNumeric(t)) errors.push(`Unary - requires numeric operand, got ${typeStr(t)}`);
                return t;
            }
            if (expr.op === "!") {
                if (t.kind !== "bool") errors.push(`Unary ! requires bool, got ${typeStr(t)}`);
                return T_BOOL;
            }
            return T_ERR;
        }

        case "Index": {
            const baseT = inferExpr(expr.base, env, errors);
            for (const idx of expr.indices) {
                const idxT = inferExpr(idx, env, errors);
                if (idxT.kind !== "int" && idxT.kind !== "error")
                    errors.push(`Array index must be int, got ${typeStr(idxT)}`);
            }
            if (baseT.kind === "array") {
                if (expr.indices.length !== baseT.rank)
                    errors.push(`Rank-${baseT.rank} array indexed with ${expr.indices.length} index(es)`);
                return baseT.elem;
            }
            if (baseT.kind !== "error") errors.push(`Cannot index non-array type ${typeStr(baseT)}`);
            return T_ERR;
        }

        case "FieldAccess": {
            const baseT = inferExpr(expr.base, env, errors);
            if (baseT.kind === "named") {
                const fields = env.lookupStruct(baseT.name);
                if (!fields) { errors.push(`Unknown struct type: ${baseT.name}`); return T_ERR; }
                const f = fields.find(f => f.name === expr.field);
                if (!f) { errors.push(`Struct ${baseT.name} has no field '${expr.field}'`); return T_ERR; }
                return f.type;
            }
            if (baseT.kind !== "error") errors.push(`Field access on non-struct type ${typeStr(baseT)}`);
            return T_ERR;
        }

        case "Call": {
            const sig = env.lookupFn(expr.callee);
            if (!sig) { errors.push(`Undefined function: ${expr.callee}`); return T_ERR; }
            if (expr.args.length !== sig.params.length)
                errors.push(`${expr.callee} expects ${sig.params.length} arg(s), got ${expr.args.length}`);
            for (let i = 0; i < expr.args.length; i++) {
                const argT = inferExpr(expr.args[i], env, errors);
                if (i < sig.params.length && argT.kind !== "error" && !typeEq(argT, sig.params[i]))
                    errors.push(`Arg ${i+1} to ${expr.callee}: expected ${typeStr(sig.params[i])}, got ${typeStr(argT)}`);
            }
            return sig.ret;
        }

        case "StructCtor": {
            const fields = env.lookupStruct(expr.name);
            if (!fields) { errors.push(`Unknown struct type: ${expr.name}`); return T_ERR; }
            if (expr.args.length !== fields.length)
                errors.push(`Struct ${expr.name} has ${fields.length} field(s), got ${expr.args.length} value(s)`);
            for (let i = 0; i < expr.args.length; i++) {
                const argT = inferExpr(expr.args[i], env, errors);
                if (i < fields.length && argT.kind !== "error" && !typeEq(argT, fields[i].type))
                    errors.push(`Field ${fields[i].name} of ${expr.name}: expected ${typeStr(fields[i].type)}, got ${typeStr(argT)}`);
            }
            return namedType(expr.name);
        }

        case "IfExpr": {
            const condT = inferExpr(expr.cond, env, errors);
            if (condT.kind !== "bool" && condT.kind !== "error")
                errors.push(`If condition must be bool, got ${typeStr(condT)}`);
            const thenT = inferExpr(expr.then, env, errors);
            const elseT = inferExpr(expr.else, env, errors);
            if (thenT.kind !== "error" && elseT.kind !== "error" && !typeEq(thenT, elseT))
                errors.push(`If branches have mismatched types: ${typeStr(thenT)} vs ${typeStr(elseT)}`);
            return thenT.kind !== "error" ? thenT : elseT;
        }

        case "ArrayLit": {
            if (expr.elements.length === 0) return arrayType(T_ERR, 1);
            const elemTs = expr.elements.map(e => inferExpr(e, env, errors));
            const elemT = elemTs[0];
            for (let i = 1; i < elemTs.length; i++) {
                if (elemTs[i].kind !== "error" && !typeEq(elemTs[i], elemT))
                    errors.push(`Array literal element ${i}: expected ${typeStr(elemT)}, got ${typeStr(elemTs[i])}`);
            }
            return arrayType(elemT, 1);
        }

        case "ArrayExpr": {
            if (expr.bindings.length === 0) {
                errors.push("Array expression requires at least one binding");
                return T_ERR;
            }
            const inner = env.child();
            checkLoopBindings(expr.bindings, inner, errors);
            const bodyT = inferExpr(expr.body, inner, errors);
            return arrayType(bodyT, expr.bindings.length);
        }

        case "SumExpr": {
            if (expr.bindings.length === 0) {
                errors.push("Sum expression requires at least one binding");
                return T_ERR;
            }
            const inner = env.child();
            checkLoopBindings(expr.bindings, inner, errors);
            const bodyT = inferExpr(expr.body, inner, errors);
            if (bodyT.kind !== "error" && !isNumeric(bodyT))
                errors.push(`Sum body must be numeric, got ${typeStr(bodyT)}`);
            return bodyT.kind !== "error" ? bodyT : T_INT;
        }

        default:
            errors.push(`Unknown expression kind: ${expr.kind}`);
            return T_ERR;
    }
}

function checkLoopBindings(bindings, env, errors) {
    for (const b of bindings) {
        const boundT = inferExpr(b.bound, env, errors);
        if (boundT.kind !== "int" && boundT.kind !== "error")
            errors.push(`Loop bound must be int, got ${typeStr(boundT)}`);
        if (env.isVisible(b.var)) errors.push(`Name '${b.var}' already defined`);
        env.vars.set(b.var, T_INT);
    }
}

function inferBinOp(op, lt, rt, errors) {
    if (lt.kind === "error" || rt.kind === "error") return T_ERR;
    if (["+", "-", "*", "/", "%"].includes(op)) {
        if (isNumeric(lt) && typeEq(lt, rt)) return lt;
        errors.push(`Operator ${op} requires matching int/float, got ${typeStr(lt)} and ${typeStr(rt)}`);
        return T_ERR;
    }
    if (["<", ">", "<=", ">="].includes(op)) {
        if (isNumeric(lt) && typeEq(lt, rt)) return T_BOOL;
        errors.push(`Operator ${op} requires matching numeric operands, got ${typeStr(lt)} and ${typeStr(rt)}`);
        return T_BOOL;
    }
    if (["==", "!="].includes(op)) {
        if (!typeEq(lt, rt)) errors.push(`Operator ${op} requires same-type operands, got ${typeStr(lt)} and ${typeStr(rt)}`);
        return T_BOOL;
    }
    if (["&&", "||"].includes(op)) {
        if (lt.kind !== "bool") errors.push(`Left operand of ${op} must be bool, got ${typeStr(lt)}`);
        if (rt.kind !== "bool") errors.push(`Right operand of ${op} must be bool, got ${typeStr(lt)}`);
        return T_BOOL;
    }
    errors.push(`Unknown operator: ${op}`);
    return T_ERR;
}

// ---------------------------------------------------------------------------
// Statement checking
// ---------------------------------------------------------------------------
function checkStatement(stmt, env, retType, errors) {
    switch (stmt.kind) {
        case "LetStmt": {
            const t = inferExpr(stmt.expr, env, errors);
            bindArgument(stmt.lvalue, t, env, errors);
            break;
        }
        case "AssertStmt": {
            const t = inferExpr(stmt.cond, env, errors);
            if (t.kind !== "bool" && t.kind !== "error")
                errors.push(`Assert condition must be bool, got ${typeStr(t)}`);
            break;
        }
        case "ReturnStmt": {
            const t = inferExpr(stmt.expr, env, errors);
            if (t.kind !== "error" && !typeEq(t, retType))
                errors.push(`Return: expected ${typeStr(retType)}, got ${typeStr(t)}`);
            break;
        }
        default:
            errors.push(`Unknown statement kind: ${stmt.kind}`);
    }
}

// ---------------------------------------------------------------------------
// Command checking
// ---------------------------------------------------------------------------
function checkCommand(cmd, env, errors) {
    switch (cmd.kind) {
        case "LetCmd": {
            const t = inferExpr(cmd.expr, env, errors);
            bindArgument(cmd.lvalue, t, env, errors);
            break;
        }
        case "ShowCmd":
            inferExpr(cmd.expr, env, errors);
            break;
        case "PrintCmd":
            break;
        case "AssertCmd": {
            const t = inferExpr(cmd.cond, env, errors);
            if (t.kind !== "bool" && t.kind !== "error")
                errors.push(`Assert condition must be bool, got ${typeStr(t)}`);
            break;
        }
        case "ReadCmd": {
            // read image "f" to img[w,h]  →  img : rgba[,], w,h : int
            const imgT = arrayType(namedType("rgba"), 2);
            bindArgument(cmd.target, imgT, env, errors);
            break;
        }
        case "WriteCmd": {
            const t = inferExpr(cmd.expr, env, errors);
            const imgT = arrayType(namedType("rgba"), 2);
            if (t.kind !== "error" && !typeEq(t, imgT))
                errors.push(`write image expects rgba[,], got ${typeStr(t)}`);
            break;
        }
        case "TimeCmd":
            checkCommand(cmd.cmd, env, errors);
            break;
        case "StructCmd": {
            if (env.isVisible(cmd.name)) errors.push(`Name '${cmd.name}' already defined`);
            env.structs.set(cmd.name, cmd.fields.map(f => ({ name: f.name, type: f.type })));
            break;
        }
        case "FnCmd": {
            if (env.isVisible(cmd.name)) errors.push(`Name '${cmd.name}' already defined`);
            env.fns.set(cmd.name, {
                params: cmd.params.map(p => p.type),
                ret:    cmd.retType,
            });
            const inner = env.child();
            const retType = cmd.retType;
            for (const p of cmd.params)
                bindArgument(p.arg, p.type, inner, errors);
            for (const stmt of cmd.body)
                checkStatement(stmt, inner, retType, errors);
            if (retType.kind !== "void" && !cmd.body.some(s => s.kind === "ReturnStmt"))
                errors.push(`Function '${cmd.name}' must have at least one return statement`);
            break;
        }
        default:
            errors.push(`Unknown command kind: ${cmd.kind}`);
    }
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------
export function typecheck(ast) {
    const errors = [];
    const env = new Env();

    // Built-in math functions
    for (const name of ["sqrt", "sin", "cos", "tan", "exp", "log", "abs", "floor", "ceil", "asin", "acos", "atan"])
        env.fns.set(name, { params: [T_FLOAT], ret: T_FLOAT });
    env.fns.set("pow",      { params: [T_FLOAT, T_FLOAT], ret: T_FLOAT });
    env.fns.set("atan2",    { params: [T_FLOAT, T_FLOAT], ret: T_FLOAT });
    env.fns.set("to_float", { params: [T_INT],            ret: T_FLOAT });
    env.fns.set("to_int",   { params: [T_FLOAT],          ret: T_INT   });

    // Built-in rgba struct (pixel type for images)
    env.structs.set("rgba", [
        { name: "r", type: T_FLOAT }, { name: "g", type: T_FLOAT },
        { name: "b", type: T_FLOAT }, { name: "a", type: T_FLOAT },
    ]);

    // Pre-register program args
    env.vars.set("args",   arrayType(T_INT, 1));
    env.vars.set("argnum", T_INT);

    // Check all commands (registration integrated into checkCommand — no forward refs)
    for (const cmd of ast.commands)
        checkCommand(cmd, env, errors);

    return errors;
}
