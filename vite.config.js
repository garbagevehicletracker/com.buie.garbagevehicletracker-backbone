import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://garbage-tracking-backend.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/socket": {
        target: "https://production-backend-3olq.onrender.com", // Use the same target as /api
        changeOrigin: true,
        ws: true,
      },
    },
  },
  plugins: [react()],
});
