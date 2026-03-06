import { emitStringConst } from "./strings.mjs";

export function emitBoundAssertion(boundLocal, varName, module, out) {
    out.push({ op: "local.get", local: boundLocal });
    out.push({ op: "i64.const", value: 0 });
    out.push({ op: "i64.gt_s" });
    const elseOps = [];
    emitStringConst(module, `array bound for '${varName}' must be positive`, elseOps);
    elseOps.push({ op: "call", func: "$host_assert_fail" });
    elseOps.push({ op: "unreachable" });
    out.push({ op: "if", then: [], else: elseOps });
}

export function buildNestedLoops(bounds, depth, out, emitBody) {
    if (depth >= bounds.length) {
        emitBody(out);
        return;
    }

    const b = bounds[depth];
    const blockLabel = `$exit_${depth}_${b.var}`;
    const loopLabel = `$loop_${depth}_${b.var}`;

    const loopBody = [];
    loopBody.push({ op: "local.get", local: b.indexLocal });
    loopBody.push({ op: "local.get", local: b.boundLocal });
    loopBody.push({ op: "i64.ge_s" });
    loopBody.push({ op: "br_if", label: blockLabel });

    buildNestedLoops(bounds, depth + 1, loopBody, emitBody);

    loopBody.push({ op: "local.get", local: b.indexLocal });
    loopBody.push({ op: "i64.const", value: 1 });
    loopBody.push({ op: "i64.add" });
    loopBody.push({ op: "local.set", local: b.indexLocal });
    loopBody.push({ op: "br", label: loopLabel });

    out.push({
        op: "block",
        label: blockLabel,
        body: [
            { op: "loop", label: loopLabel, body: loopBody },
        ],
    });

    out.push({ op: "i64.const", value: 0 });
    out.push({ op: "local.set", local: b.indexLocal });
}
