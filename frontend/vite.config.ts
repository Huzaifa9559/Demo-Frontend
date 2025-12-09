import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@constants": fileURLToPath(new URL("./src/constants", import.meta.url)),
      "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
      "@services": fileURLToPath(new URL("./src/services", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@validators": fileURLToPath(
        new URL("./src/validators", import.meta.url)
      ),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "@routes": fileURLToPath(new URL("./src/routes", import.meta.url)),
      "@providers": fileURLToPath(new URL("./src/providers", import.meta.url)),
      "@mocks": fileURLToPath(new URL("./src/mocks", import.meta.url)),
    },
  },
});
