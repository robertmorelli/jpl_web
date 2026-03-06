import { typecheck } from "../index.mjs";

export function stageTypecheck(ast) {
    const errors = typecheck(ast);
    return {
        ok: errors.length === 0,
        errors,
    };
}
