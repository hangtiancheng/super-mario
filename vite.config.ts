import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import packageJson from "./package.json" with { type: "json" };
import { resolve } from "path";

const vendorChunkMap: ReadonlyArray<readonly [string, string]> = [
  ["pixi.js", "pixi"],
  ["howler", "howler"],
  ["gsap", "gsap"],
  ["@sentry", "sentry"],
];

const releaseId = `${packageJson.name}@${packageJson.version}`;

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string): string | undefined {
          if (!id.includes("node_modules")) {
            return undefined;
          }
          for (const [match, chunk] of vendorChunkMap) {
            if (id.includes(`/node_modules/${match}`)) {
              return chunk;
            }
          }
          return undefined;
        },
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(releaseId),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "src"),
    },
  },
});
