import { execFileSync } from "child_process";
import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { randomBytes } from "crypto";
import { emitWasm3Wat } from "../wasm3/wat_emitter.mjs";

export async function runWasmIR(moduleIR, opts = {}) {
    const wat = emitWasm3Wat(moduleIR);
    const id = randomBytes(4).toString("hex");
    const watFile = join(tmpdir(), `jpl_${id}.wat`);
    const wasmFile = join(tmpdir(), `jpl_${id}.wasm`);

    try {
        writeFileSync(watFile, wat);
        try {
            execFileSync("wasm-tools", ["parse", watFile, "-o", wasmFile]);
        } catch (e) {
            const detail = e.stderr?.toString().trim() || e.message;
            throw new Error(`WAT assembly failed:\n${detail}`);
        }

        const binary = readFileSync(wasmFile);
        const strings = moduleIR.strings || [];
        const output = [];
        let timeStart = 0;

        // i64 values arrive as BigInt in Node.js Wasm imports
        const toInt = (x) => {
            if (Number.isNaN(x)) return 0n;
            if (x === Infinity)  return BigInt(Number.MAX_SAFE_INTEGER);
            if (x === -Infinity) return BigInt(Number.MIN_SAFE_INTEGER);
            return BigInt(Math.trunc(x));
        };

        const imports = {
            host: {
                show_i64: (v) => { output.push(String(v)); },
                show_f64: (v) => { output.push(String(v)); },
                show_i32: (v) => { output.push(v ? "true" : "false"); },
                show_ref: (_v) => { output.push("<ref>"); },
                print_literal: (idx) => { output.push(strings[Number(idx)] ?? ""); },
                assert_fail: (idx) => {
                    throw new Error(`[abort] ${strings[Number(idx)] ?? ""}`);
                },
                time_start: () => { timeStart = Date.now(); },
                time_end: () => { output.push(`Time: ${Date.now() - timeStart}ms`); },
                // Math builtins (f64 params/results are plain JS numbers)
                sqrt: Math.sqrt, sin: Math.sin, cos: Math.cos, tan: Math.tan,
                exp: Math.exp,   log: Math.log, abs: Math.abs,
                floor: Math.floor, ceil: Math.ceil,
                asin: Math.asin, acos: Math.acos, atan: Math.atan,
                pow: Math.pow, atan2: Math.atan2,
                // Conversions: to_float takes BigInt i64, to_int returns BigInt i64
                to_float: (v) => Number(v),
                to_int: toInt,
            },
        };

        if (moduleIR.hasImageIO) {
            imports.host.read_image = (_filenameIdx) => {
                throw new Error("[abort] read image: image I/O requires the JS interpreter");
            };
            imports.host.write_image = (_img, _filenameIdx) => {
                throw new Error("[abort] write image: image I/O requires the JS interpreter");
            };
        }

        const { instance } = await WebAssembly.instantiate(binary, imports);
        instance.exports.main();

        return { output };
    } finally {
        try { unlinkSync(watFile); } catch (_) {}
        try { unlinkSync(wasmFile); } catch (_) {}
    }
}
