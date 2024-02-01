import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    Proxy: {
      "/api": "https://garbage-tracking-backend.onrender.com/",
      // "/api": "http://localhost:5500/",

      "/socket.io": {
        // target: "http://localhost:5500/", // Replace with your backend server URL
        target: "https://garbage-tracking-backend.onrender.com/", // Replace with your backend server URL
        changeOrigin: true,
        ws: true,
      },
    },
  },
  plugins: [react()],
});
