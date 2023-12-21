import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    Proxy: {
      "/api": "https://garbage-tracking-backend.onrender.com/",
    },
  },
  plugins: [react()],
});
