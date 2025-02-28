import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
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
