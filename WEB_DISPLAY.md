# Web Display Implementation Plan

## 1. Goal

Run JPL programs in the browser with full image I/O support:
- Compile and run entirely in-browser via WasmGC.
- Suspend execution on `read image` so the user can upload a file.
- Render `write image` outputs inline with download support.
- Show syntax-highlighted WAT on every run.
- Share the same runtime and UI between a GitHub Pages demo and a VSCode.dev web extension.

## 2. Requirements

- One Wasm execution path everywhere — no separate browser vs. node codepaths in the runtime.
- `read image` suspends execution and prompts for file upload.
- `write image` renders the output image and offers download.
- WAT is always shown and highlighted.
- All shared code is browser-compatible TypeScript/ESM — no Node-only APIs in the compiler or runtime.
- The CLI keeps working by wrapping shared packages from a Node adapter.

## 3. File Structure

```
src/
  compiler/       # lexer, parser, AST, typechecker, IR, WAT emitter (TS/ESM, browser-safe)
  runtime/        # browser runtime: WAT -> binary, instantiate, execute, suspend/resume
  host-io/        # HostIO interface + docs adapter + vscode adapter
  ui/             # reusable run page components
  cli/            # Node CLI adapter (wraps compiler + a Node-side executor)
apps/
  docs/           # GitHub Pages demo (uses src/compiler, src/runtime, src/ui)
  vscode-web/     # VSCode.dev web extension (uses same packages)
tests/
  unit/
  integration/
  fixtures/
```

## 4. Plan

### Phase 0: Build Setup

1. Set up TypeScript with `strict: true` across all packages.
2. Add Vite (or equivalent) for browser bundle targets (docs + vscode webview).
3. Add shared test runner (Vitest) for unit and integration tests.
4. Add fixture directory for sample JPL programs (with and without image I/O).
5. Wire up build scripts: `build:web`, `test:unit`, `test:integration`.

### Phase 1: Extract Compiler for Browser Use

1. Move lexer/parser/AST/typechecker/IR/WAT emitter into `src/compiler/`.
2. Remove all Node-only imports (`fs`, `process`, `child_process`) from compiler paths.
3. Single entrypoint: `compileProgram(source, options) -> { ast, ir, wat, diagnostics }`.
4. Add a stable diagnostic format the UI and extension can both consume.
5. Keep the CLI working by wrapping `src/compiler/` from a Node adapter.

### Phase 2: Browser Runtime

1. `RuntimeWeb` class:
   - Compile WAT to Wasm binary in-browser (no `wasm-tools` subprocess).
   - Instantiate with host imports.
   - Execute exported `main`.
2. Runtime event stream: `stdout`, `stderr`, `suspend`, `resume`, `image-output`, `done`.
3. Simple state machine: `idle` → `running` → `suspended` → `completed` / `failed`.
4. Cancellation support (user stops run mid-execution).
5. Timeout for runaway programs.

### Phase 3: Suspend/Resume for Image Input

1. Define suspend token: request id, filename hint, call site info.
2. Define resume payload: request id, decoded image (width, height, RGBA bytes).
3. Host import for `read image` triggers `suspend` event.
4. `runtime.resume(requestId, payload)` API to unblock execution.
5. Validate request id and reject stale or duplicate resumes.
6. Queue model for programs with multiple sequential `read image` calls.

### Phase 4: Image Encoding/Decoding

1. In-memory image format: `{ width, height, rgba: Uint8Array, filename? }`.
2. Browser file decode: upload -> canvas -> RGBA buffer.
3. Encoder for output: RGBA -> PNG blob -> object URL for preview + download.
4. Size/dimension validation with clear error messages.

### Phase 5: HostIO Adapters

1. `HostIO` interface in `src/host-io/`:
   - `requestImageInput(token) -> Promise<ImagePayload>`
   - `publishImageOutput(image)`
   - `publishText(text)`
   - `publishDiagnostic(diag)`
2. `HostIODocsAdapter` — wires events to the docs app UI.
3. `HostIOVscodeAdapter` — wires events to the VSCode webview message API.
4. Both adapters are thin wrappers over the same runtime events.

### Phase 6: Run Page UI

1. `RunPage` component in `src/ui/`:
   - Source editor container (host-provided or embedded).
   - Run / Stop / Reset controls.
   - Output panels: diagnostics, stdout, WAT, output images.
2. Image upload prompt (modal or inline) that fires on `suspend`.
3. Upload queue display for programs with multiple reads.
4. Output image gallery: preview, dimensions, filename, download button.
5. Keyboard shortcut for run/stop.

### Phase 7: WAT Panel

1. Generate WAT on every compile, regardless of whether the run succeeds.
2. Syntax highlight WAT in-browser.
3. Copy and download buttons.
4. Keep the last successful WAT visible if a later run fails typecheck.

### Phase 8: VSCode.dev Web Extension

1. Web extension entry point, activates on `.jpl` files.
2. Syntax highlighting grammar.
3. Formatting command backed by `src/compiler/`.
4. `Run JPL` command opens a webview panel using `src/ui/` + `src/runtime/`.
5. Upload prompt UX inside the webview for suspended reads.
6. Image output rendered inside the webview with download support.
7. No disallowed APIs — fully compatible with the `vscode.dev` web extension runtime.

### Phase 9: GitHub Pages Demo

1. Build `apps/docs/` using `src/ui/` + `src/runtime/`.
2. Include example JPL programs (with and without image I/O).
3. Drag-and-drop image upload.
4. Output gallery with download.
5. Static build output to `/docs`, deployed via GitHub Actions.

### Phase 10: Error Handling

1. Normalize compiler and runtime errors into a single user-facing diagnostic format.
2. Map runtime failures to source context where possible.
3. Clear messages for upload failures and invalid image formats.

### Phase 11: Hardening

1. Performance benchmarks: compile latency, run latency, image encode/decode by size.
2. Image size stress tests.
3. Suspend/resume soak tests (repeated start/stop/resume cycles).
4. Memory leak checks for object URL cleanup after image outputs.

## 5. Tests

### Compiler (target: ~60 tests)
- Lexer: keyword/operator/literal coverage, error tokens, escaped strings.
- Parser: precedence, associativity, command grammar, invalid syntax diagnostics.
- Typechecker: legal constructs, type mismatches, bad index, bad return.
- IR: arrays, sums, structs, function calls, image import generation, args.
- WAT emitter: named/unnamed var modes, instruction coverage snapshots.

### Browser Runtime (target: ~30 tests)
- State machine transitions.
- Suspend token generation and resume validation.
- Cancel while running and cancel while suspended.
- Timeout behavior.
- Output event ordering.
- Sequential run isolation.

### Image Helpers (target: ~20 tests)
- PNG decode correctness, alpha preservation.
- Width/height validation, large image rejection.
- Encode/decode round-trip.
- Corrupt file handling.
- Object URL cleanup.

### HostIO Contract (target: ~15 tests)
- Conformance suite applied to both the docs and vscode adapters.
- Suspend/resume callback ordering.
- Multi-upload queue.
- Error path parity between adapters.

### Integration (target: ~20 tests)
- Compile + run: no images, single read, multiple reads, image transform + write.
- Runtime assertion failure.
- Compile failure with diagnostics, no runtime start.
- Stop during suspended read.
- Re-run after failure, clean state.
- WAT panel preserved across runs.

## 6. Rollout Order

1. Compiler extraction + compiler tests.
2. Browser runtime + suspend/resume.
3. Image helpers.
4. Shared run page + WAT panel.
5. Docs app + deploy.
6. VSCode web extension.
7. Harden with full test pass and release.

## 7. Success Metrics

1. Any JPL program compiles and runs in-browser via Wasm.
2. `read image` always triggers a user upload via suspend/resume.
3. `write image` always renders output previews with download.
4. WAT is always shown and highlighted.
5. Same runtime and UI packages used by both the docs demo and the VSCode extension.
6. Compile + run under 2s for baseline programs on a modern desktop browser.
