// ============================================================================
// pretty_wat.ts — IR → fully-folded S-expression WAT
//
// Unlike emitWasm3Wat (which emits flat stack instructions), this printer
// maintains a value stack and folds arithmetic into nested S-expressions:
//
//   flat:   local.get 0 / i64.const 1 / i64.sub / call $fact / i64.mul
//   pretty: (i64.mul (local.get $n) (call $fact (i64.sub (local.get $n) (i64.const 1))))
//
// The IR is already tree-structured for block/loop/if, so only the linear
// arithmetic sequences need folding. The algorithm is a single forward pass
// with a string-valued virtual stack.
// ============================================================================

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function valTypeStr(t: unknown): string {
  if (typeof t === "string") return t;
  const rt = t as { ref: string; nullable: boolean };
  if (rt.ref === "any") return "anyref";
  return rt.nullable ? `(ref null ${rt.ref})` : `(ref ${rt.ref})`;
}

function indent(s: string, n: number): string {
  const pad = " ".repeat(n);
  return s
    .split("\n")
    .map((line) => (line ? pad + line : ""))
    .join("\n");
}

// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------

export function prettyWat(ir: any): string {
  const lines: string[] = ["(module"];

  // ── Type definitions ────────────────────────────────────────────────────
  for (const t of ir.types ?? []) {
    lines.push(indent(emitTypeDef(t), 2));
  }

  // ── Build lookup maps ────────────────────────────────────────────────────
  // funcSig: funcName → {params, results} for arity lookups
  const funcSig = new Map<string, { params: any[]; results: any[] }>();
  for (const imp of ir.imports ?? []) {
    funcSig.set(imp.as, { params: imp.params ?? [], results: imp.results ?? [] });
  }
  for (const fn of ir.funcs ?? []) {
    funcSig.set(fn.name, {
      params: (fn.params ?? []).map((p: any) => p.type),
      results: fn.results ?? [],
    });
  }

  // typeFieldCount: typeName → number of fields (for struct.new arity)
  const typeFieldCount = new Map<string, number>();
  for (const t of ir.types ?? []) {
    if (t.kind === "struct") typeFieldCount.set(t.id, (t.fields ?? []).length);
  }

  const ctx: Ctx = { funcSig, typeFieldCount };

  // ── Imports ─────────────────────────────────────────────────────────────
  lines.push("");
  for (const imp of ir.imports ?? []) {
    lines.push(indent(emitImport(imp), 2));
  }

  // ── User functions ───────────────────────────────────────────────────────
  for (const fn of ir.funcs ?? []) {
    lines.push("");
    lines.push(indent(emitFunc(fn, ctx), 2));
  }

  lines.push(")");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Type definition emitter
// ---------------------------------------------------------------------------

function emitTypeDef(t: any): string {
  if (t.kind === "array") {
    return `(type ${t.id} (array (mut ${valTypeStr(t.element)})))`;
  }
  // struct
  const fields = (t.fields ?? [])
    .map((f: any) => `(field ${f.name} (mut ${valTypeStr(f.type)}))`)
    .join(" ");
  return `(type ${t.id} (struct ${fields}))`;
}

// ---------------------------------------------------------------------------
// Import emitter
// ---------------------------------------------------------------------------

function emitImport(imp: any): string {
  const params = (imp.params ?? [])
    .map((p: any) => `(param ${valTypeStr(p)})`)
    .join(" ");
  const results = (imp.results ?? [])
    .map((r: any) => `(result ${valTypeStr(r)})`)
    .join(" ");
  const sig = [params, results].filter(Boolean).join(" ");
  return `(import "${imp.module}" "${imp.name}" (func ${imp.as}${sig ? " " + sig : ""}))`;
}

// ---------------------------------------------------------------------------
// Function emitter
// ---------------------------------------------------------------------------

interface Ctx {
  funcSig: Map<string, { params: any[]; results: any[] }>;
  typeFieldCount: Map<string, number>;
}

function emitFunc(fn: any, ctx: Ctx): string {
  // Build local variable name lookup: index → "$name"
  const localNames: string[] = [];
  for (const p of fn.params ?? []) localNames.push(p.name);
  for (const l of fn.locals ?? []) localNames.push(l.name);

  const params = (fn.params ?? [])
    .map((p: any) => `(param ${p.name} ${valTypeStr(p.type)})`)
    .join(" ");
  const results = (fn.results ?? [])
    .map((r: any) => `(result ${valTypeStr(r)})`)
    .join(" ");

  const header = [fn.name, params, results].filter(Boolean).join(" ");

  // Locals declarations
  const localDecls = (fn.locals ?? [])
    .map((l: any) => `(local ${l.name} ${valTypeStr(l.type)})`)
    .join("\n");

  // Fold body
  const resultArity = (fn.results ?? []).length;
  const stmts = foldInstrs(fn.body ?? [], localNames, resultArity, ctx);

  const bodyParts = [localDecls, ...stmts].filter(Boolean).join("\n");
  return `(func ${header}\n${indent(bodyParts, 2)}\n)`;
}

// ---------------------------------------------------------------------------
// Instruction folder — the core algorithm
//
// Maintains a stack of expression strings. Each instruction either:
//   • pushes a new expression (leaf ops, binary/unary folds, calls with result)
//   • pops from the stack and emits a statement (local.set, void calls, etc.)
//   • emits a structural statement (block, loop, if) after popping conditions
// ---------------------------------------------------------------------------

function foldInstrs(
  instrs: any[],
  localNames: string[],
  funcResultArity: number,
  ctx: Ctx
): string[] {
  const stack: string[] = []; // virtual value stack (string expressions)
  const out: string[] = []; // emitted statements

  function flush(): void {
    // Anything left on the stack is an implicit statement
    while (stack.length) out.push(stack.shift()!);
  }

  function pop(): string {
    if (stack.length === 0) throw new Error("Stack underflow during pretty-print");
    return stack.pop()!;
  }

  function popN(n: number): string[] {
    // Pop n args; last-pushed is last argument (rightmost)
    const args: string[] = [];
    for (let i = 0; i < n; i++) args.unshift(pop());
    return args;
  }

  for (const instr of instrs) {
    const op: string = instr.op;

    switch (op) {
      // ── Leaf expressions (push 1) ────────────────────────────────────────

      case "local.get": {
        const name = localNames[localNames.indexOf(instr.local)] ?? instr.local;
        stack.push(`(local.get ${name})`);
        break;
      }

      case "i64.const":
        stack.push(`(i64.const ${instr.value})`);
        break;

      case "f64.const":
        stack.push(`(f64.const ${instr.value})`);
        break;

      case "i32.const":
        stack.push(`(i32.const ${instr.value})`);
        break;

      case "string.const":
        // Display as a comment so readers can see the string value
        stack.push(`(i64.const ${instr.index} ;; "${instr.value}")`);
        break;

      // ── Unary ops (pop 1, push 1) ────────────────────────────────────────

      case "i32.eqz":
      case "i32.wrap_i64":
      case "f64.neg": {
        const a = pop();
        stack.push(`(${op} ${a})`);
        break;
      }

      // ── Binary ops (pop 2, push 1) ───────────────────────────────────────

      case "i64.add": case "i64.sub": case "i64.mul":
      case "i64.div_s": case "i64.rem_s":
      case "i64.eq": case "i64.ne":
      case "i64.lt_s": case "i64.gt_s": case "i64.le_s": case "i64.ge_s":
      case "f64.add": case "f64.sub": case "f64.mul": case "f64.div":
      case "f64.eq": case "f64.ne":
      case "f64.lt": case "f64.gt": case "f64.le": case "f64.ge": {
        const [lhs, rhs] = popN(2);
        stack.push(`(${op} ${lhs} ${rhs})`);
        break;
      }

      // ── local.set (pop 1, emit statement) ───────────────────────────────

      case "local.set": {
        const val = pop();
        const name = localNames[localNames.indexOf(instr.local)] ?? instr.local;
        out.push(`(local.set ${name} ${val})`);
        break;
      }

      // ── GC struct ops ────────────────────────────────────────────────────

      case "struct.new": {
        const n = ctx.typeFieldCount.get(instr.type) ?? 0;
        const args = popN(n);
        stack.push(`(struct.new ${instr.type} ${args.join(" ")})`);
        break;
      }

      case "struct.get": {
        const ref = pop();
        stack.push(`(struct.get ${instr.type} ${instr.field} ${ref})`);
        break;
      }

      case "struct.set": {
        const [ref, val] = popN(2);
        out.push(`(struct.set ${instr.type} ${instr.field} ${ref} ${val})`);
        break;
      }

      // ── GC array ops ─────────────────────────────────────────────────────

      case "array.new_default": {
        const len = pop();
        stack.push(`(array.new_default ${instr.type} ${len})`);
        break;
      }

      case "array.new_fixed": {
        const args = popN(instr.length as number);
        stack.push(`(array.new_fixed ${instr.type} ${instr.length}${args.length ? " " + args.join(" ") : ""})`);
        break;
      }

      case "array.get": {
        const [arr, idx] = popN(2);
        stack.push(`(array.get ${instr.type} ${arr} ${idx})`);
        break;
      }

      case "array.set": {
        const [arr, idx, val] = popN(3);
        out.push(`(array.set ${instr.type} ${arr} ${idx} ${val})`);
        break;
      }

      // ── Call ─────────────────────────────────────────────────────────────

      case "call": {
        const sig = ctx.funcSig.get(instr.func);
        const paramCount = sig?.params.length ?? 0;
        const resultCount = sig?.results.length ?? 0;
        const args = popN(paramCount);
        const expr = `(call ${instr.func}${args.length ? " " + args.join(" ") : ""})`;
        if (resultCount > 0) {
          stack.push(expr);
        } else {
          out.push(expr);
        }
        break;
      }

      // ── Control flow ──────────────────────────────────────────────────────

      case "return": {
        if (funcResultArity > 0) {
          const val = pop();
          out.push(`(return ${val})`);
        } else {
          out.push(`(return)`);
        }
        break;
      }

      case "unreachable":
        out.push("(unreachable)");
        break;

      case "br":
        out.push(`(br ${instr.label})`);
        break;

      case "br_if": {
        const cond = pop();
        out.push(`(br_if ${instr.label} ${cond})`);
        break;
      }

      case "block": {
        // Do NOT flush: pending stack values may be consumed by ops after this block.
        // Void blocks have no result, so they don't disturb the parent stack.
        const body = foldInstrs(instr.body ?? [], localNames, 0, ctx);
        out.push(`(block ${instr.label}\n${indent(body.join("\n"), 2)}\n)`);
        break;
      }

      case "loop": {
        const body = foldInstrs(instr.body ?? [], localNames, 0, ctx);
        out.push(`(loop ${instr.label}\n${indent(body.join("\n"), 2)}\n)`);
        break;
      }

      case "if": {
        const cond = pop();
        const result: unknown = instr.result; // string or ref-type object
        const resultStr = result ? ` (result ${valTypeStr(result)})` : "";

        const thenStmts = foldInstrs(instr.then ?? [], localNames, result ? 1 : 0, ctx);
        const elseStmts = foldInstrs(instr.else ?? [], localNames, result ? 1 : 0, ctx);

        const thenBlock = thenStmts.length
          ? `(then\n${indent(thenStmts.join("\n"), 2)}\n)`
          : "(then)";
        const elseBlock =
          elseStmts.length > 0
            ? `(else\n${indent(elseStmts.join("\n"), 2)}\n)`
            : "";

        const parts = [thenBlock, elseBlock].filter(Boolean).join("\n");
        const ifExpr = `(if${resultStr} ${cond}\n${indent(parts, 2)}\n)`;

        if (result) {
          stack.push(ifExpr);
        } else {
          // Do NOT flush: pending stack values may be consumed by ops after this if.
          out.push(ifExpr);
        }
        break;
      }

      default:
        throw new Error(`pretty_wat: unknown IR op: ${op}`);
    }
  }

  flush();
  return out;
}
