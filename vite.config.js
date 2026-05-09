import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages base path
const base = process.env.GITHUB_PAGES ? '/justin-portfolio/' : '/';

export default defineConfig({
  base: base,
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
        },
      },
    },
  },
});
