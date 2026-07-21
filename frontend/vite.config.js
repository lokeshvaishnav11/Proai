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
    name: "Avitor Ai signal",
    short_name: "AI Signal",
    description: "Avitor Ai signal",

    theme_color: "#0f172a",
    background_color: "#0f172a",

    display: "standalone",
    orientation: "portrait",

    start_url: "/",
    scope: "/",

    icons: [
  {
    src: "https://ai-pro-bot.com/video/logo.jpeg",
    sizes: "192x192",
    type: "image/jpeg"
  },
  {
    src: "https://ai-pro-bot.com/video/logo.jpeg",
    sizes: "512x512",
    type: "image/jpeg"
  },
  {
    src: "https://ai-pro-bot.com/video/logo.jpeg",
    sizes: "512x512",
    type: "image/jpeg",
    purpose: "maskable"
  }
]
  }
})
  ]
});