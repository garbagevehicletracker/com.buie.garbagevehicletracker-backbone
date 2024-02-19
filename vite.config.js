import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    Proxy: {
      "/api": "http://52.63.51.138:5500/",
      // "/api": "http://localhost:5500/",

      "/socket.io": {
        // target: "http://localhost:5500/", // Replace with your backend server URL
        target: "http://52.63.51.138:5500/", // Replace with your backend server URL
        changeOrigin: true,
        ws: true,
      },
    },
  },
  plugins: [react()],
});
