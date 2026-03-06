import { T_FLOAT, T_INT, arrayType, namedType } from "./constants.mjs";
import { lowerExpr } from "./lower_expr.mjs";
import { emitStringConst } from "./strings.mjs";
import { inferExprType } from "./infer.mjs";
import { typeEq, typeKey, valTypeForJPLType } from "./types.mjs";

export function lowerLetLike(node, out, fb, scope, ctx) {
    const t = inferExprType(node.expr, scope, ctx.fnSigs, ctx.structFields);
    const localType = valTypeForJPLType(t, ctx.registry) ?? "i64";
    const local = fb.allocLocal(node.lvalue.name, localType);

    lowerExpr(node.expr, out, fb, scope, ctx);
    out.push({ op: "local.set", local });

    scope.set(node.lvalue.name, { local, type: t });

    if (node.lvalue.dims.length > 0 && t.kind === "array") {
        const bindingType = ctx.registry.ensureArrayBindingType(t.elem, t.rank);
        for (let i = 0; i < node.lvalue.dims.length; i++) {
            const dName = node.lvalue.dims[i];
            const dLocal = fb.allocLocal(dName, "i64");
            out.push({ op: "local.get", local });
            out.push({ op: "struct.get", type: bindingType, field: i });
            out.push({ op: "local.set", local: dLocal });
            scope.set(dName, { local: dLocal, type: T_INT });
        }
    }
}

export function lowerAssertLike(node, out, fb, scope, ctx) {
    const condOps = [];
    lowerExpr(node.cond, condOps, fb, scope, ctx);
    out.push(...condOps);
    const elseOps = [];
    emitStringConst(ctx.module, node.msg, elseOps);
    elseOps.push({ op: "call", func: "$host_assert_fail" });
    elseOps.push({ op: "unreachable" });
    out.push({ op: "if", then: [], else: elseOps });
}

export function lowerCommand(cmd, out, fb, scope, ctx) {
    const { registry } = ctx;
    switch (cmd.kind) {
        case "LetCmd":
            lowerLetLike(cmd, out, fb, scope, ctx);
            break;
        case "ShowCmd": {
            const t = lowerExpr(cmd.expr, out, fb, scope, ctx);
            if (t.kind === "int") out.push({ op: "call", func: "$host_show_i64" });
            else if (t.kind === "float") out.push({ op: "call", func: "$host_show_f64" });
            else if (t.kind === "bool") out.push({ op: "call", func: "$host_show_i32" });
            else out.push({ op: "call", func: "$host_show_ref" });
            break;
        }
        case "PrintCmd":
            emitStringConst(ctx.module, cmd.msg, out);
            out.push({ op: "call", func: "$host_print_literal" });
            break;
        case "AssertCmd":
            lowerAssertLike(cmd, out, fb, scope, ctx);
            break;
        case "TimeCmd":
            out.push({ op: "call", func: "$host_time_start" });
            lowerCommand(cmd.cmd, out, fb, scope, ctx);
            out.push({ op: "call", func: "$host_time_end" });
            break;
        case "ReadCmd": {
            const imgT = arrayType(namedType("rgba"), 2);
            const rgbaBindingType = registry.ensureArrayBindingType(namedType("rgba"), 2);
            const bindingLocal = fb.allocLocal(cmd.target.name, { ref: rgbaBindingType, nullable: true });

            emitStringConst(ctx.module, cmd.filename, out);
            out.push({ op: "call", func: "$host_read_image" });
            out.push({ op: "local.set", local: bindingLocal });

            scope.set(cmd.target.name, { local: bindingLocal, type: imgT });

            for (let i = 0; i < cmd.target.dims.length; i++) {
                const dName = cmd.target.dims[i];
                const dLocal = fb.allocLocal(dName, "i64");
                out.push({ op: "local.get", local: bindingLocal });
                out.push({ op: "struct.get", type: rgbaBindingType, field: i });
                out.push({ op: "local.set", local: dLocal });
                scope.set(dName, { local: dLocal, type: T_INT });
            }
            break;
        }
        case "WriteCmd": {
            lowerExpr(cmd.expr, out, fb, scope, ctx);
            emitStringConst(ctx.module, cmd.filename, out);
            out.push({ op: "call", func: "$host_write_image" });
            break;
        }
        case "StructCmd":
            break;
        case "FnCmd":
            break;
        default:
            out.push({ op: "todo.unknown_command", kind: cmd.kind });
            break;
    }
}

export function lowerStatement(stmt, out, fb, scope, ctx, retType) {
    switch (stmt.kind) {
        case "LetStmt":
            lowerLetLike(stmt, out, fb, scope, ctx);
            break;
        case "AssertStmt":
            lowerAssertLike(stmt, out, fb, scope, ctx);
            break;
        case "ReturnStmt": {
            const t = lowerExpr(stmt.expr, out, fb, scope, ctx);
            if (!typeEq(t, retType) && retType.kind !== "void") {
                out.push({ op: "todo.return_type_mismatch", expected: typeKey(retType), got: typeKey(t) });
            }
            out.push({ op: "return" });
            break;
        }
        default:
            out.push({ op: "todo.unknown_statement", kind: stmt.kind });
            break;
    }
}
