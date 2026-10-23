import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import trendHandler from "./api/trends.ts"
import newsHandler from "./api/news.ts"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "public-trend-endpoint",
      configureServer(server) {
        server.middlewares.use("/api/news", (req, res) => {
          void newsHandler(req, res)
        })
        server.middlewares.use("/api/trends", (req, res) => {
          void trendHandler(req, res)
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use("/api/news", (req, res) => {
          void newsHandler(req, res)
        })
        server.middlewares.use("/api/trends", (req, res) => {
          void trendHandler(req, res)
        })
      },
    },
  ],
  server: {
    host: "0.0.0.0",
    allowedHosts: process.env.REPLIT_DEV_DOMAIN
      ? [process.env.REPLIT_DEV_DOMAIN]
      : [],
    port: Number(process.env.PORT) || 5173,
  },
})
