import type { IncomingMessage, ServerResponse } from "node:http"
import { createTrendLoader, trendCacheMs } from "../src/mvp/trends.js"
const loadTrend = createTrendLoader()
// Fixed public upstream; assessment responses never leave the browser.
export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  res.setHeader("Content-Type", "application/json")
  if (req.method !== "GET") {
    res.statusCode = 405
    res.setHeader("Allow", "GET")
    res.end(JSON.stringify({ error: "GET only" }))
    return
  }
  try {
    const data = await loadTrend()
    const remainingSeconds=Math.max(0,Math.floor((Date.parse(data.retrievedAt!)+trendCacheMs-Date.now())/1000))
    res.setHeader(
      "Cache-Control",
      data.cacheStatus === "stale" ? "no-store" : `public, s-maxage=${remainingSeconds}`,
    )
    res.statusCode = 200
    res.end(JSON.stringify(data))
  } catch {
    res.statusCode = 503
    res.end(
      JSON.stringify({
        error: "Live source unavailable. Use the dated reviewed snapshot.",
      }),
    )
  }
}
