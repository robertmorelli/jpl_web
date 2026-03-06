export function addString(module, s) {
    const i = module.strings.indexOf(s);
    if (i >= 0) return i;
    module.strings.push(s);
    return module.strings.length - 1;
}

export function emitStringConst(module, s, out) {
    const index = addString(module, s);
    out.push({ op: "string.const", value: s, index });
}
