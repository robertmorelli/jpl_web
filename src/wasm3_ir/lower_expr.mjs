import { T_BOOL, T_ERR, T_FLOAT, T_INT, T_VOID, arrayType, namedType } from "./constants.mjs";
import { inferExprType, opForNumericBin } from "./infer.mjs";
import { buildNestedLoops, emitBoundAssertion } from "./loops.mjs";
import { valTypeForJPLType } from "./types.mjs";

export function lowerExpr(expr, out, fb, scope, ctx) {
    const { registry, fnSigs, structFields } = ctx;

    switch (expr.kind) {
        case "IntLit":
            out.push({ op: "i64.const", value: expr.value });
            return T_INT;
        case "FloatLit":
            out.push({ op: "f64.const", value: expr.value });
            return T_FLOAT;
        case "BoolLit":
            out.push({ op: "i32.const", value: expr.value ? 1 : 0 });
            return T_BOOL;
        case "VoidLit":
            return T_VOID;
        case "StringLit":
            out.push({ op: "string.const", value: expr.value });
            return namedType("extern_string");
        case "Var": {
            const bound = scope.lookup(expr.name);
            if (!bound) {
                out.push({ op: "i64.const", value: 0 });
                return T_ERR;
            }
            out.push({ op: "local.get", local: bound.local });
            return bound.type;
        }
        case "UnaryOp": {
            const operandType = lowerExpr(expr.operand, out, fb, scope, ctx);
            if (expr.op === "-") {
                if (operandType.kind === "float") {
                    out.push({ op: "f64.neg" });
                } else {
                    out.push({ op: "i64.const", value: -1 });
                    out.push({ op: "i64.mul" });
                }
                return operandType;
            }
            if (expr.op === "!") {
                out.push({ op: "i32.eqz" });
                return T_BOOL;
            }
            return T_ERR;
        }
        case "BinOp": {
            if (expr.op === "&&" || expr.op === "||") {
                const thenOps = [];
                const elseOps = [];

                lowerExpr(expr.lhs, out, fb, scope, ctx);
                if (expr.op === "&&") {
                    lowerExpr(expr.rhs, thenOps, fb, scope, ctx);
                    elseOps.push({ op: "i32.const", value: 0 });
                } else {
                    thenOps.push({ op: "i32.const", value: 1 });
                    lowerExpr(expr.rhs, elseOps, fb, scope, ctx);
                }

                out.push({ op: "if", result: "i32", then: thenOps, else: elseOps });
                return T_BOOL;
            }

            const lt = lowerExpr(expr.lhs, out, fb, scope, ctx);
            const rt = lowerExpr(expr.rhs, out, fb, scope, ctx);
            const t = lt.kind === "float" || rt.kind === "float" ? T_FLOAT : lt;
            out.push({ op: opForNumericBin(expr.op, t) });

            if (["<", "<=", ">", ">=", "==", "!="].includes(expr.op)) return T_BOOL;
            return t;
        }
        case "IfExpr": {
            const condOps = [];
            lowerExpr(expr.cond, condOps, fb, scope, ctx);
            out.push(...condOps);

            const branchType = inferExprType(expr.then, scope, fnSigs, structFields);
            const thenOps = [];
            const elseOps = [];
            lowerExpr(expr.then, thenOps, fb, scope, ctx);
            lowerExpr(expr.else, elseOps, fb, scope, ctx);

            out.push({
                op: "if",
                result: valTypeForJPLType(branchType, registry),
                then: thenOps,
                else: elseOps,
            });
            return branchType;
        }
        case "Call": {
            for (const arg of expr.args) lowerExpr(arg, out, fb, scope, ctx);
            out.push({ op: "call", func: `$${expr.callee}` });
            return fnSigs.get(expr.callee)?.ret ?? T_ERR;
        }
        case "StructCtor": {
            const structId = registry.structTypeId(expr.name);
            for (const arg of expr.args) lowerExpr(arg, out, fb, scope, ctx);
            out.push({ op: "struct.new", type: structId });
            return namedType(expr.name);
        }
        case "FieldAccess": {
            const baseType = lowerExpr(expr.base, out, fb, scope, ctx);
            if (baseType.kind !== "named") return T_ERR;

            const fields = structFields.get(baseType.name) || [];
            const idx = fields.findIndex((f) => f.name === expr.field);
            const structId = registry.structTypeId(baseType.name);

            out.push({
                op: "struct.get",
                type: structId,
                field: idx < 0 ? 0 : idx,
            });

            return fields[idx]?.type ?? T_ERR;
        }
        case "ArrayLit": {
            const elemType = expr.elements.length > 0
                ? inferExprType(expr.elements[0], scope, fnSigs, structFields)
                : T_INT;
            const bindingType = registry.ensureArrayBindingType(elemType, 1);
            const dataType = registry.ensureArrayDataType(elemType);

            for (const el of expr.elements) lowerExpr(el, out, fb, scope, ctx);
            out.push({ op: "array.new_fixed", type: dataType, length: expr.elements.length });
            const litDataLocal = fb.allocLocal("lit_data", { ref: dataType, nullable: false });
            out.push({ op: "local.set", local: litDataLocal });
            out.push({ op: "i64.const", value: expr.elements.length });
            out.push({ op: "local.get", local: litDataLocal });
            out.push({ op: "struct.new", type: bindingType });
            return arrayType(elemType, 1);
        }
        case "ArrayExpr": {
            return lowerArrayExpr(expr, out, fb, scope, ctx);
        }
        case "SumExpr": {
            return lowerSumExpr(expr, out, fb, scope, ctx);
        }
        case "Index": {
            return lowerIndexExpr(expr, out, fb, scope, ctx);
        }
        default:
            out.push({ op: "i64.const", value: 0 });
            return T_ERR;
    }
}

export function lowerIndexExpr(expr, out, fb, scope, ctx) {
    const { registry, fnSigs, structFields } = ctx;
    const baseType = inferExprType(expr.base, scope, fnSigs, structFields);
    if (baseType.kind !== "array") {
        out.push({ op: "i64.const", value: 0 });
        return T_ERR;
    }

    const bindingType = registry.ensureArrayBindingType(baseType.elem, baseType.rank);
    const dataType = registry.ensureArrayDataType(baseType.elem);

    const bindingLocal = fb.allocLocal("arr_binding", { ref: bindingType, nullable: true });
    const dataLocal = fb.allocLocal("arr_data", { ref: dataType, nullable: true });
    const idxLocal = fb.allocLocal("arr_idx", "i64");

    lowerExpr(expr.base, out, fb, scope, ctx);
    out.push({ op: "local.set", local: bindingLocal });

    if (expr.indices.length === 0) {
        out.push({ op: "i64.const", value: 0 });
    } else {
        lowerExpr(expr.indices[0], out, fb, scope, ctx);
        for (let i = 1; i < expr.indices.length; i++) {
            out.push({ op: "local.get", local: bindingLocal });
            out.push({ op: "struct.get", type: bindingType, field: i });
            out.push({ op: "i64.mul" });
            lowerExpr(expr.indices[i], out, fb, scope, ctx);
            out.push({ op: "i64.add" });
        }
    }
    out.push({ op: "local.set", local: idxLocal });

    out.push({ op: "local.get", local: bindingLocal });
    out.push({ op: "struct.get", type: bindingType, field: baseType.rank });
    out.push({ op: "local.set", local: dataLocal });

    out.push({ op: "local.get", local: dataLocal });
    out.push({ op: "local.get", local: idxLocal });
    out.push({ op: "i32.wrap_i64" });
    out.push({ op: "array.get", type: dataType });

    return baseType.elem;
}

export function lowerArrayExpr(expr, out, fb, scope, ctx) {
    const { registry, fnSigs, structFields } = ctx;
    const rank = Math.max(1, expr.bindings.length);

    const loopScope = scope.child();
    const bounds = [];

    for (const b of expr.bindings) {
        const boundLocal = fb.allocLocal(`${b.var}_bound`, "i64");
        lowerExpr(b.bound, out, fb, scope, ctx);
        out.push({ op: "local.set", local: boundLocal });
        emitBoundAssertion(boundLocal, b.var, ctx.module, out);

        const indexLocal = fb.allocLocal(`${b.var}_idx`, "i64");
        out.push({ op: "i64.const", value: 0 });
        out.push({ op: "local.set", local: indexLocal });

        loopScope.set(b.var, { local: indexLocal, type: T_INT });
        bounds.push({ var: b.var, boundLocal, indexLocal });
    }

    const bodyType = inferExprType(expr.body, loopScope, fnSigs, structFields);
    const bindingType = registry.ensureArrayBindingType(bodyType, rank);
    const dataType = registry.ensureArrayDataType(bodyType);

    const dataLocal = fb.allocLocal("array_data", { ref: dataType, nullable: false });
    const totalLenLocal = fb.allocLocal("array_total_len", "i64");
    const linearLocal = fb.allocLocal("array_linear", "i64");

    out.push({ op: "i64.const", value: 1 });
    for (const b of bounds) {
        out.push({ op: "local.get", local: b.boundLocal });
        out.push({ op: "i64.mul" });
    }
    out.push({ op: "local.set", local: totalLenLocal });
    out.push({ op: "local.get", local: totalLenLocal });
    out.push({ op: "i32.wrap_i64" });
    out.push({ op: "array.new_default", type: dataType });
    out.push({ op: "local.set", local: dataLocal });

    out.push({ op: "i64.const", value: 0 });
    out.push({ op: "local.set", local: linearLocal });

    const fillOps = [];
    buildNestedLoops(bounds, 0, fillOps, (innerOut) => {
        const cell = [];
        lowerExpr(expr.body, cell, fb, loopScope, ctx);

        innerOut.push({ op: "local.get", local: dataLocal });
        innerOut.push({ op: "local.get", local: linearLocal });
        innerOut.push({ op: "i32.wrap_i64" });
        innerOut.push(...cell);
        innerOut.push({ op: "array.set", type: dataType });

        innerOut.push({ op: "local.get", local: linearLocal });
        innerOut.push({ op: "i64.const", value: 1 });
        innerOut.push({ op: "i64.add" });
        innerOut.push({ op: "local.set", local: linearLocal });
    });
    out.push(...fillOps);

    for (const b of bounds) out.push({ op: "local.get", local: b.boundLocal });
    out.push({ op: "local.get", local: dataLocal });
    out.push({ op: "struct.new", type: bindingType });

    return arrayType(bodyType, rank);
}

export function lowerSumExpr(expr, out, fb, scope, ctx) {
    const { fnSigs, structFields } = ctx;

    const loopScope = scope.child();
    const bounds = [];
    for (const b of expr.bindings) {
        const boundLocal = fb.allocLocal(`${b.var}_bound`, "i64");
        lowerExpr(b.bound, out, fb, scope, ctx);
        out.push({ op: "local.set", local: boundLocal });
        emitBoundAssertion(boundLocal, b.var, ctx.module, out);

        const indexLocal = fb.allocLocal(`${b.var}_idx`, "i64");
        out.push({ op: "i64.const", value: 0 });
        out.push({ op: "local.set", local: indexLocal });

        loopScope.set(b.var, { local: indexLocal, type: T_INT });
        bounds.push({ var: b.var, boundLocal, indexLocal });
    }

    const bodyType = inferExprType(expr.body, loopScope, fnSigs, structFields);
    const accType = bodyType.kind === "float" ? "f64" : "i64";
    const accLocal = fb.allocLocal("sum_acc", accType);

    if (bodyType.kind === "float") out.push({ op: "f64.const", value: 0.0 });
    else out.push({ op: "i64.const", value: 0 });
    out.push({ op: "local.set", local: accLocal });

    buildNestedLoops(bounds, 0, out, (innerOut) => {
        innerOut.push({ op: "local.get", local: accLocal });
        lowerExpr(expr.body, innerOut, fb, loopScope, ctx);
        innerOut.push({ op: bodyType.kind === "float" ? "f64.add" : "i64.add" });
        innerOut.push({ op: "local.set", local: accLocal });
    });

    out.push({ op: "local.get", local: accLocal });
    return bodyType.kind === "float" ? T_FLOAT : T_INT;
}
