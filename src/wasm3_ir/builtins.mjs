import { T_FLOAT, T_INT } from "./constants.mjs";
import { valTypeForJPLType } from "./types.mjs";

export function registerBuiltins(module) {
    module.imports.push(
        { module: "host", name: "show_i64", as: "$host_show_i64", params: ["i64"], results: [] },
        { module: "host", name: "show_f64", as: "$host_show_f64", params: ["f64"], results: [] },
        { module: "host", name: "show_i32", as: "$host_show_i32", params: ["i32"], results: [] },
        { module: "host", name: "show_ref", as: "$host_show_ref", params: [{ ref: "any", nullable: true }], results: [] },
        { module: "host", name: "print_literal", as: "$host_print_literal", params: ["i64"], results: [] },
        { module: "host", name: "assert_fail", as: "$host_assert_fail", params: ["i64"], results: [] },
        { module: "host", name: "sqrt", as: "$sqrt", params: ["f64"], results: ["f64"] },
        { module: "host", name: "sin", as: "$sin", params: ["f64"], results: ["f64"] },
        { module: "host", name: "cos", as: "$cos", params: ["f64"], results: ["f64"] },
        { module: "host", name: "tan", as: "$tan", params: ["f64"], results: ["f64"] },
        { module: "host", name: "exp", as: "$exp", params: ["f64"], results: ["f64"] },
        { module: "host", name: "log", as: "$log", params: ["f64"], results: ["f64"] },
        { module: "host", name: "abs", as: "$abs", params: ["f64"], results: ["f64"] },
        { module: "host", name: "floor", as: "$floor", params: ["f64"], results: ["f64"] },
        { module: "host", name: "ceil", as: "$ceil", params: ["f64"], results: ["f64"] },
        { module: "host", name: "asin", as: "$asin", params: ["f64"], results: ["f64"] },
        { module: "host", name: "acos", as: "$acos", params: ["f64"], results: ["f64"] },
        { module: "host", name: "atan", as: "$atan", params: ["f64"], results: ["f64"] },
        { module: "host", name: "pow", as: "$pow", params: ["f64", "f64"], results: ["f64"] },
        { module: "host", name: "atan2", as: "$atan2", params: ["f64", "f64"], results: ["f64"] },
        { module: "host", name: "to_float", as: "$to_float", params: ["i64"], results: ["f64"] },
        { module: "host", name: "to_int", as: "$to_int", params: ["f64"], results: ["i64"] }
    );
}

export function predeclareTypesAndFunctions(ast, registry, fnSigs, structFields) {
    for (const cmd of ast.commands) {
        if (cmd.kind === "StructCmd") {
            structFields.set(cmd.name, cmd.fields);
            registry.ensureStruct(
                cmd.name,
                cmd.fields.map((f) => ({
                    name: f.name,
                    type: valTypeForJPLType(f.type, registry),
                    mutability: "mut",
                }))
            );
        }
    }

    fnSigs.set("sqrt", { params: [T_FLOAT], ret: T_FLOAT });
    fnSigs.set("sin", { params: [T_FLOAT], ret: T_FLOAT });
    fnSigs.set("cos", { params: [T_FLOAT], ret: T_FLOAT });
    fnSigs.set("tan", { params: [T_FLOAT], ret: T_FLOAT });
    fnSigs.set("exp", { params: [T_FLOAT], ret: T_FLOAT });
    fnSigs.set("log", { params: [T_FLOAT], ret: T_FLOAT });
    fnSigs.set("abs", { params: [T_FLOAT], ret: T_FLOAT });
    fnSigs.set("floor", { params: [T_FLOAT], ret: T_FLOAT });
    fnSigs.set("ceil", { params: [T_FLOAT], ret: T_FLOAT });
    fnSigs.set("asin", { params: [T_FLOAT], ret: T_FLOAT });
    fnSigs.set("acos", { params: [T_FLOAT], ret: T_FLOAT });
    fnSigs.set("atan", { params: [T_FLOAT], ret: T_FLOAT });
    fnSigs.set("pow", { params: [T_FLOAT, T_FLOAT], ret: T_FLOAT });
    fnSigs.set("atan2", { params: [T_FLOAT, T_FLOAT], ret: T_FLOAT });
    fnSigs.set("to_float", { params: [T_INT], ret: T_FLOAT });
    fnSigs.set("to_int", { params: [T_FLOAT], ret: T_INT });

    for (const cmd of ast.commands) {
        if (cmd.kind !== "FnCmd") continue;
        fnSigs.set(cmd.name, {
            params: cmd.params.map((p) => p.type),
            ret: cmd.retType,
        });
    }
}
