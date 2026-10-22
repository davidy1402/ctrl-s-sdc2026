import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import trendHandler from "./api/trends.ts"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "public-trend-endpoint",
      configureServer(server) {
        server.middlewares.use("/api/trends", (req, res) => {
          void trendHandler(req, res)
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use("/api/trends", (req, res) => {
          void trendHandler(req, res)
        })
      },
    },
  ],
  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 5173,
  },
})
