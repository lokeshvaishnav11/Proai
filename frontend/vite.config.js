import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
VitePWA({
  registerType: "autoUpdate",

  devOptions: {
    enabled: true
  },

  includeAssets: [
    "favicon.ico",
    "apple-touch-icon.png",
    "mask-icon.svg"
  ],

  manifest: {
    name: "A2Z Live",
    short_name: "A2Z",
    description: "A2Z Live",

    theme_color: "#0f172a",
    background_color: "#0f172a",

    display: "standalone",
    orientation: "portrait",

    start_url: "/",
    scope: "/",

    icons: [
      {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZeFxa1dXoMiDWNq9vide96iPqRU-bq6EG65Ola3uTg&s",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZeFxa1dXoMiDWNq9vide96iPqRU-bq6EG65Ola3uTg&s",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZeFxa1dXoMiDWNq9vide96iPqRU-bq6EG65Ola3uTg&s",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  }
})
  ]
});