import { T_BOOL, T_ERR, T_FLOAT, T_INT, T_VOID, arrayType, namedType } from "./constants.mjs";
import { typeEq } from "./types.mjs";

export function inferExprType(expr, scope, fnSigs, structFields) {
    switch (expr.kind) {
        case "IntLit": return T_INT;
        case "FloatLit": return T_FLOAT;
        case "BoolLit": return T_BOOL;
        case "VoidLit": return T_VOID;
        case "StringLit": return namedType("extern_string");
        case "Var": {
            const v = scope.lookup(expr.name);
            return v?.type ?? T_ERR;
        }
        case "UnaryOp": {
            const t = inferExprType(expr.operand, scope, fnSigs, structFields);
            if (expr.op === "!") return T_BOOL;
            return t;
        }
        case "BinOp": {
            if (["&&", "||", "<", "<=", ">", ">=", "==", "!="].includes(expr.op)) return T_BOOL;
            const lt = inferExprType(expr.lhs, scope, fnSigs, structFields);
            const rt = inferExprType(expr.rhs, scope, fnSigs, structFields);
            if (lt.kind === "float" || rt.kind === "float") return T_FLOAT;
            return T_INT;
        }
        case "IfExpr": {
            const tt = inferExprType(expr.then, scope, fnSigs, structFields);
            const et = inferExprType(expr.else, scope, fnSigs, structFields);
            if (typeEq(tt, et)) return tt;
            return tt.kind !== "error" ? tt : et;
        }
        case "Call": {
            const sig = fnSigs.get(expr.callee);
            return sig?.ret ?? T_ERR;
        }
        case "StructCtor":
            return namedType(expr.name);
        case "FieldAccess": {
            const bt = inferExprType(expr.base, scope, fnSigs, structFields);
            if (bt.kind !== "named") return T_ERR;
            const fields = structFields.get(bt.name) || [];
            return fields.find((f) => f.name === expr.field)?.type ?? T_ERR;
        }
        case "ArrayLit": {
            if (expr.elements.length === 0) return arrayType(T_ERR, 1);
            return arrayType(inferExprType(expr.elements[0], scope, fnSigs, structFields), 1);
        }
        case "ArrayExpr": {
            const inner = scope.child();
            for (const b of expr.bindings) inner.set(b.var, { type: T_INT });
            const bodyType = inferExprType(expr.body, inner, fnSigs, structFields);
            return arrayType(bodyType, Math.max(1, expr.bindings.length));
        }
        case "SumExpr": {
            const inner = scope.child();
            for (const b of expr.bindings) inner.set(b.var, { type: T_INT });
            const bodyType = inferExprType(expr.body, inner, fnSigs, structFields);
            return bodyType;
        }
        case "Index": {
            const baseType = inferExprType(expr.base, scope, fnSigs, structFields);
            if (baseType.kind === "array") return baseType.elem;
            return T_ERR;
        }
        default:
            return T_ERR;
    }
}

export function opForNumericBin(binOp, type) {
    const f = type.kind === "float";
    switch (binOp) {
        case "+": return f ? "f64.add" : "i64.add";
        case "-": return f ? "f64.sub" : "i64.sub";
        case "*": return f ? "f64.mul" : "i64.mul";
        case "/": return f ? "f64.div" : "i64.div_s";
        case "%": return f ? "f64.rem" : "i64.rem_s";
        case "<": return f ? "f64.lt" : "i64.lt_s";
        case "<=": return f ? "f64.le" : "i64.le_s";
        case ">": return f ? "f64.gt" : "i64.gt_s";
        case ">=": return f ? "f64.ge" : "i64.ge_s";
        case "==": return f ? "f64.eq" : "i64.eq";
        case "!=": return f ? "f64.ne" : "i64.ne";
        default: return "i64.add";
    }
}
