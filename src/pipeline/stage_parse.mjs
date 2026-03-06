import { parseJPL, formatErrors } from "../index.mjs";

export function stageParse(source) {
    const parsed = parseJPL(source);
    const errors = formatErrors(parsed);
    return {
        ok: errors.length === 0,
        cst: parsed.cst,
        errors,
    };
}
