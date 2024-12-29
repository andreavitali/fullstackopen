import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3003",
        changeOrigin: true
      }
    },
    open: false
  },
  test: {
    css: false,
    environment: "jsdom",
    setupFiles: ["./src/__test__/setupTests.js"],
    globals: true
  }
});
