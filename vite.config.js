import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: "Mi PWA con Vite",
        short_name: "MiPWA",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4e2a00",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true, // Asegura que el SW funcione en modo desarrollo
        type: "module", // Usa ESM en lugar de importScripts
      },
    }),
  ],
});
