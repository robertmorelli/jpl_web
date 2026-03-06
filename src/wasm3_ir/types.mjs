export function typeEq(a, b) {
    if (!a || !b) return false;
    if (a.kind !== b.kind) return false;
    if (a.kind === "array") return a.rank === b.rank && typeEq(a.elem, b.elem);
    if (a.kind === "named") return a.name === b.name;
    return true;
}

export function typeKey(t) {
    switch (t.kind) {
        case "int": return "i64";
        case "float": return "f64";
        case "bool": return "i32";
        case "void": return "void";
        case "named": return `named:${t.name}`;
        case "array": return `arr:${typeKey(t.elem)}:${t.rank}`;
        default: return "err";
    }
}

export function valTypeForJPLType(t, registry) {
    switch (t.kind) {
        case "int": return "i64";
        case "float": return "f64";
        case "bool": return "i32";
        case "void": return null;
        case "named": return { ref: registry.structTypeId(t.name), nullable: true };
        case "array": return { ref: registry.ensureArrayBindingType(t.elem, t.rank), nullable: true };
        default: return "i64";
    }
}
