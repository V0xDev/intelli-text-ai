import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import deleteFilesPlugin from "./rollupPlugins";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash][extname]",
        chunkFileNames: "js/[name].[hash].js",
        entryFileNames: "js/[name].[hash].js",
      },
      plugins: [deleteFilesPlugin([".png", ".svg"])],
    },
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: [
          "mixed-decls",
          "color-functions",
          "global-builtin",
          "import",
        ],
        additionalData: `
          @use "sass:map";
          @use "@/assets/components/modal.scss" as *;
          @use "@/assets/basic/variables.scss" as *;
          @use "@/assets/basic/mixins.scss" as *;
          @use "@/assets/basic/extends.scss" as *;
        `,
      },
    },
  },
});
