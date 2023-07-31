import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_BASE_API_URL || "http://localhost:3000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
