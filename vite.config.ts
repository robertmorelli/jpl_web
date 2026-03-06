import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [wasm(), topLevelAwait()],

  // Serve and build from the docs app directory
  root: "apps/docs",
  base: "./",

  server: {
    // Required for SharedArrayBuffer (future suspend/resume support)
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },

  build: {
    outDir: "../../docs",
    emptyOutDir: true,
  },

  optimizeDeps: {
    // Let Vite pre-bundle wabt so it gets proper CJS→ESM interop wrapping.
    // Without this, dynamic import('wabt') returns the raw CJS namespace
    // where .default is undefined instead of the factory function.
    include: ["wabt"],
  },
});
