import { T_FLOAT, T_INT, arrayType, namedType } from "./constants.mjs";
import { predeclareTypesAndFunctions, registerBuiltins } from "./builtins.mjs";
import { FunctionBuilder } from "./function_builder.mjs";
import { lowerCommand } from "./lower_stmt_cmd.mjs";
import { lowerFunction } from "./lower_function.mjs";
import { TypeRegistry } from "./registry.mjs";
import { Scope } from "./scope.mjs";

export function buildWasm3IR(ast, opts = {}) {
    const module = {
        kind: "Wasm3ModuleIR",
        wasmVersion: "3.0",
        features: ["gc", "typed-function-references"],
        imports: [],
        types: [],
        funcs: [],
        strings: [],
    };

    registerBuiltins(module);

    const registry = new TypeRegistry(module);
    const fnSigs = new Map();
    const structFields = new Map();

    predeclareTypesAndFunctions(ast, registry, fnSigs, structFields);

    registry.ensureStruct("rgba", [
        { name: "r", type: "f64", mutability: "mut" },
        { name: "g", type: "f64", mutability: "mut" },
        { name: "b", type: "f64", mutability: "mut" },
        { name: "a", type: "f64", mutability: "mut" },
    ]);
    structFields.set("rgba", [
        { name: "r", type: T_FLOAT },
        { name: "g", type: T_FLOAT },
        { name: "b", type: T_FLOAT },
        { name: "a", type: T_FLOAT },
    ]);

    module.imports.push(
        { module: "host", name: "time_start", as: "$host_time_start", params: [], results: [] },
        { module: "host", name: "time_end", as: "$host_time_end", params: [], results: [] }
    );

    const hasImageIO = ast.commands.some(c => c.kind === "ReadCmd" || c.kind === "WriteCmd");
    module.hasImageIO = hasImageIO;
    if (hasImageIO) {
        const rgbaBindingType = registry.ensureArrayBindingType(namedType("rgba"), 2);
        module.imports.push(
            {
                module: "host",
                name: "read_image",
                as: "$host_read_image",
                params: ["i64"],
                results: [{ ref: rgbaBindingType, nullable: true }],
            },
            {
                module: "host",
                name: "write_image",
                as: "$host_write_image",
                params: [{ ref: rgbaBindingType, nullable: true }, "i64"],
                results: [],
            }
        );
    }

    const ctx = { registry, fnSigs, structFields, module };

    for (const cmd of ast.commands) {
        if (cmd.kind === "FnCmd") {
            lowerFunction(cmd, module, ctx);
        }
    }

    const mainFunc = {
        name: "$main",
        export: "main",
        params: [],
        results: [],
        locals: [],
        body: [],
    };

    const mainFb = new FunctionBuilder(mainFunc, registry);
    const mainScope = new Scope();

    const argValues = opts.args || [];
    const argsDataType = registry.ensureArrayDataType(T_INT);
    const argsBindingType = registry.ensureArrayBindingType(T_INT, 1);
    const argsDataLocal = mainFb.allocLocal("args_data", { ref: argsDataType, nullable: true });
    const argsLocal = mainFb.allocLocal("args", { ref: argsBindingType, nullable: true });
    const argnumLocal = mainFb.allocLocal("argnum", "i64");

    for (const v of argValues) mainFunc.body.push({ op: "i64.const", value: v });
    mainFunc.body.push({ op: "array.new_fixed", type: argsDataType, length: argValues.length });
    mainFunc.body.push({ op: "local.set", local: argsDataLocal });
    mainFunc.body.push({ op: "i64.const", value: argValues.length });
    mainFunc.body.push({ op: "local.get", local: argsDataLocal });
    mainFunc.body.push({ op: "struct.new", type: argsBindingType });
    mainFunc.body.push({ op: "local.set", local: argsLocal });

    mainFunc.body.push({ op: "i64.const", value: argValues.length });
    mainFunc.body.push({ op: "local.set", local: argnumLocal });

    mainScope.set("args", { local: argsLocal, type: arrayType(T_INT, 1) });
    mainScope.set("argnum", { local: argnumLocal, type: T_INT });

    for (const cmd of ast.commands) {
        if (cmd.kind === "FnCmd" || cmd.kind === "StructCmd") continue;
        lowerCommand(cmd, mainFunc.body, mainFb, mainScope, ctx);
    }

    module.funcs.push(mainFunc);
    return module;
}
