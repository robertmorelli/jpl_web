export const T_INT = { kind: "int" };
export const T_FLOAT = { kind: "float" };
export const T_BOOL = { kind: "bool" };
export const T_VOID = { kind: "void" };
export const T_ERR = { kind: "error" };

export function arrayType(elem, rank) {
    return { kind: "array", elem, rank };
}

export function namedType(name) {
    return { kind: "named", name };
}
