import { buildAST } from "../index.mjs";

export function stageAST(cst) {
    return {
        ok: true,
        ast: buildAST(cst),
        errors: [],
    };
}
