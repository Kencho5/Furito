import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://staging.furito.com",
      dynamicRoutes: ["/", "/login", "/register"],
    }),
  ],
});
