import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Unit tests run in Node; image/UI tests that need DOM
    // are marked with @vitest-environment jsdom in the file itself.
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.mjs"],
    },
  },
  resolve: {
    // Allow TypeScript to import .mjs files from the existing compiler
    extensions: [".ts", ".mjs", ".js"],
  },
});
