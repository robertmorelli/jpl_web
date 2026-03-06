function indent(level) {
    return "  ".repeat(level);
}

function quote(s) {
    return JSON.stringify(s);
}

function formatValType(t) {
    if (!t) return "";
    if (typeof t === "string") return t;
    if (t.ref) {
        return t.nullable ? `(ref null ${t.ref})` : `(ref ${t.ref})`;
    }
    return "i64";
}

function emitType(typeNode, level) {
    if (typeNode.kind === "array") {
        const elem = formatValType(typeNode.element);
        return `${indent(level)}(type ${typeNode.id} (array (${typeNode.mutability} ${elem})))`;
    }

    const fields = typeNode.fields
        .map((f) => `${indent(level + 1)}(field $${f.name} (${f.mutability} ${formatValType(f.type)}))`)
        .join("\n");

    if (fields.length === 0) {
        return `${indent(level)}(type ${typeNode.id} (struct))`;
    }

    return `${indent(level)}(type ${typeNode.id} (struct\n${fields}\n${indent(level)}))`;
}

function emitImport(imp, level) {
    const params = (imp.params || []).map((p) => `(param ${formatValType(p)})`).join(" ");
    const results = (imp.results || []).map((r) => `(result ${formatValType(r)})`).join(" ");
    const sig = [params, results].filter(Boolean).join(" ");
    return `${indent(level)}(import ${quote(imp.module)} ${quote(imp.name)} (func ${imp.as}${sig ? ` ${sig}` : ""}))`;
}

function emitInstruction(op, level, localIndexMap, namedVars) {
    const formatLocalRef = (local) => {
        if (namedVars) return local;
        const idx = localIndexMap.get(local);
        return idx ?? local;
    };

    switch (op.op) {
        case "i64.const":
        case "f64.const":
        case "i32.const":
            return `${indent(level)}${op.op} ${op.value}`;

        case "local.get":
        case "local.set":
            return `${indent(level)}${op.op} ${formatLocalRef(op.local)}`;

        case "call":
            return `${indent(level)}call ${op.func}`;

        case "br":
        case "br_if":
            return `${indent(level)}${op.op} ${op.label}`;

        case "return":
        case "unreachable":
        case "i64.add":
        case "i64.sub":
        case "i64.mul":
        case "i64.div_s":
        case "i64.rem_s":
        case "i64.lt_s":
        case "i64.le_s":
        case "i64.gt_s":
        case "i64.ge_s":
        case "i64.eq":
        case "i64.ne":
        case "f64.add":
        case "f64.sub":
        case "f64.mul":
        case "f64.div":
        case "f64.lt":
        case "f64.le":
        case "f64.gt":
        case "f64.ge":
        case "f64.eq":
        case "f64.ne":
        case "f64.neg":
        case "i32.eqz":
        case "i32.wrap_i64":
            return `${indent(level)}${op.op}`;

        case "f64.rem":
            return `${indent(level)};; non-standard op\n${indent(level)}f64.div`;

        case "ref.null":
            return `${indent(level)}ref.null ${op.type || "any"}`;

        case "struct.new":
            return `${indent(level)}struct.new ${op.type}`;

        case "struct.get":
            return `${indent(level)}struct.get ${op.type} ${op.field}`;

        case "array.new_fixed":
            return `${indent(level)}array.new_fixed ${op.type} ${op.length}`;

        case "array.new_default":
            return `${indent(level)}array.new_default ${op.type}`;

        case "array.get":
            return `${indent(level)}array.get ${op.type}`;

        case "array.set":
            return `${indent(level)}array.set ${op.type}`;

        case "string.const":
            return `${indent(level)}i64.const ${op.index}   ;; ${quote(op.value)}`;

        case "if": {
            const result = op.result ? ` (result ${formatValType(op.result)})` : "";
            const thenBody = (op.then || []).map((x) => emitInstruction(x, level + 1, localIndexMap, namedVars)).join("\n");
            const elseBody = (op.else || []).map((x) => emitInstruction(x, level + 1, localIndexMap, namedVars)).join("\n");
            const lines = [`${indent(level)}if${result}`];
            if (thenBody) lines.push(thenBody);
            lines.push(`${indent(level)}else`);
            if (elseBody) lines.push(elseBody);
            lines.push(`${indent(level)}end`);
            return lines.join("\n");
        }

        case "block": {
            const body = (op.body || []).map((x) => emitInstruction(x, level + 1, localIndexMap, namedVars)).join("\n");
            return `${indent(level)}block ${op.label}\n${body}\n${indent(level)}end`;
        }

        case "loop": {
            const body = (op.body || []).map((x) => emitInstruction(x, level + 1, localIndexMap, namedVars)).join("\n");
            return `${indent(level)}loop ${op.label}\n${body}\n${indent(level)}end`;
        }

        default:
            if ((op.op || "").startsWith("todo.")) {
                return `${indent(level)}nop ;; ${op.op}`;
            }
            return `${indent(level)}nop ;; unknown ${op.op}`;
    }
}

function emitFunc(fn, level, namedVars) {
    const headerParts = [`(func ${fn.name}`];
    const localIndexMap = new Map();
    let localIndex = 0;

    if (fn.export) headerParts.push(`(export ${quote(fn.export)})`);

    for (const p of fn.params || []) {
        localIndexMap.set(p.name, localIndex++);
        if (namedVars) headerParts.push(`(param ${p.name} ${formatValType(p.type)})`);
        else headerParts.push(`(param ${formatValType(p.type)})`);
    }
    for (const r of fn.results || []) {
        headerParts.push(`(result ${formatValType(r)})`);
    }

    const lines = [`${indent(level)}${headerParts.join(" ")}`];

    for (const l of fn.locals || []) {
        localIndexMap.set(l.name, localIndex++);
        if (namedVars) lines.push(`${indent(level + 1)}(local ${l.name} ${formatValType(l.type)})`);
        else lines.push(`${indent(level + 1)}(local ${formatValType(l.type)})`);
    }

    for (const op of fn.body || []) {
        lines.push(emitInstruction(op, level + 1, localIndexMap, namedVars));
    }

    lines.push(`${indent(level)})`);
    return lines.join("\n");
}

export function emitWasm3Wat(moduleIR, opts = {}) {
    const namedVars = !!opts.namedVars;
    const lines = ["(module"];
    lines.push(`${indent(1)};; generated from Wasm3ModuleIR`);
    lines.push(`${indent(1)};; features: ${(moduleIR.features || []).join(", ")}`);

    for (const t of moduleIR.types || []) lines.push(emitType(t, 1));
    for (const i of moduleIR.imports || []) lines.push(emitImport(i, 1));
    for (const f of moduleIR.funcs || []) lines.push(emitFunc(f, 1, namedVars));

    lines.push(")");
    return `${lines.join("\n")}\n`;
}
