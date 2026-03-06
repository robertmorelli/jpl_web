import { T_INT } from "./constants.mjs";
import { FunctionBuilder } from "./function_builder.mjs";
import { Scope } from "./scope.mjs";
import { lowerStatement } from "./lower_stmt_cmd.mjs";
import { valTypeForJPLType } from "./types.mjs";

export function lowerFunction(cmd, module, ctx) {
    const params = cmd.params.map((p) => ({
        name: `$${p.arg.name}`,
        type: valTypeForJPLType(p.type, ctx.registry),
        jplType: p.type,
    }));

    const resultType = valTypeForJPLType(cmd.retType, ctx.registry);

    const func = {
        name: `$${cmd.name}`,
        export: cmd.name,
        params: params.map((p) => ({ name: p.name, type: p.type })),
        results: resultType ? [resultType] : [],
        locals: [],
        body: [],
    };

    const fb = new FunctionBuilder(func, ctx.registry);
    const scope = new Scope();
    for (const p of params) {
        scope.set(p.name.slice(1), { local: p.name, type: p.jplType });

        if (p.jplType.kind === "array" && cmd.params.find((x) => x.arg.name === p.name.slice(1))?.arg?.dims?.length > 0) {
            const dims = cmd.params.find((x) => x.arg.name === p.name.slice(1)).arg.dims;
            const bindingType = ctx.registry.ensureArrayBindingType(p.jplType.elem, p.jplType.rank);
            for (let i = 0; i < dims.length; i++) {
                const dLocal = fb.allocLocal(dims[i], "i64");
                func.body.push({ op: "local.get", local: p.name });
                func.body.push({ op: "struct.get", type: bindingType, field: i });
                func.body.push({ op: "local.set", local: dLocal });
                scope.set(dims[i], { local: dLocal, type: T_INT });
            }
        }
    }

    for (const stmt of cmd.body) {
        lowerStatement(stmt, func.body, fb, scope, ctx, cmd.retType);
    }

    module.funcs.push(func);
}
