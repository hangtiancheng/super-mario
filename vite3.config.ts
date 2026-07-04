import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    assetsInlineLimit: 100_000_000,
    copyPublicDir: false,
    cssCodeSplit: false,
    emptyOutDir: true,
    outDir: "dist3",
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo): string => getAssetFileName(assetInfo.name),
        entryFileNames: "app.js",
        inlineDynamicImports: true,
      },
    },
  },
  plugins: [react(), tailwindcss()],
});

function getAssetFileName(name: string | undefined): string {
  if (name !== undefined && name.endsWith(".css")) {
    return "style.css";
  }
  return "asset-[name][extname]";
}
