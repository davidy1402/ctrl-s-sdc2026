import type { IncomingMessage, ServerResponse } from "node:http"
import { createNewsLoader } from "../src/mvp/news.server.js"
import { isNewsScope } from "../src/mvp/news.js"

const loadNews = createNewsLoader()
export function createNewsHandler(loader = loadNews) {
  return async (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Cache-Control", "no-store")
    if (req.method !== "GET") {
      res.statusCode = 405
      res.setHeader("Allow", "GET")
      res.end(JSON.stringify({ error: "GET only" }))
      return
    }
    const scope =
      new URL(req.url ?? "/", "http://localhost").searchParams.get("scope") ??
      "global"
    if (!isNewsScope(scope)) {
      res.statusCode = 400
      res.end(JSON.stringify({ error: "Choose global or malaysia" }))
      return
    }
    try {
      const data = await loader(scope)
      res.statusCode = 200
      res.end(JSON.stringify(data))
    } catch {
      res.statusCode = 503
      res.end(
        JSON.stringify({
          error:
            "News source unavailable. No fresh news claimed; try again in a minute.",
        }),
      )
    }
  }
}
export default createNewsHandler()
