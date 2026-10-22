import { test } from "node:test"
import assert from "node:assert/strict"
import { createServer } from "node:http"
import { once } from "node:events"
import { createNewsHandler } from "../../api/news"
import { createNewsLoader, parseNewsRss } from "./news.server"
import { newsSources, parseNewsFeed, type NewsScope } from "./news"
import { trendCacheMs } from "./trends"

const now = new Date("2026-10-22T12:00:00.000Z")
const article = (
  title: string,
  url = "https://news.un.org/en/story/synthetic",
  date = "Wed, 21 Oct 2026 12:00:00 GMT",
) =>
  `<item><title>${title}</title><link>${url}</link><pubDate>${date}</pubDate></item>`
const rss = (items: string, scope: NewsScope = "global") =>
  `<?xml version="1.0"?><rss><channel><link>https://${newsSources[scope].host}/</link>${items}</channel></rss>`
const globalXml = rss(article("AI and skills: synthetic fixture"))
const malaysiaXml = rss(
  article(
    "Latihan STEM: synthetic fixture",
    "https://www.mosti.gov.my/en/synthetic",
  ),
  "malaysia",
)

test("RSS retains dated AI/skills titles, deduplicates and sorts; descriptions and unrelated entries are excluded", () => {
  const data = parseNewsRss(
    rss(
      article("AI and skills", "https://news.un.org/en/one") +
        article("AI and skills", "https://news.un.org/en/one") +
        article(
          "Artificial intelligence: fixture",
          "https://news.un.org/en/two",
          "Thu, 22 Oct 2026 10:00:00 GMT",
        ) +
        article(
          "Unrelated synthetic headline",
          "https://news.un.org/en/three",
        ) +
        article("AI unsafe", "javascript:alert(1)") +
        article(
          "AI future",
          "https://news.un.org/en/future",
          "Thu, 22 Oct 2027 10:00:00 GMT",
        ) +
        article("AI missing date", "https://news.un.org/en/no-date", "unknown"),
    ),
    "global",
    now,
  )
  assert.equal(data.items.length, 2)
  assert.equal(data.items[0].url, "https://news.un.org/en/two")
  assert.equal(data.retrievedAt, now.toISOString())
  assert.equal(data.items[1].publishedAt, "2026-10-21T12:00:00.000Z")
  assert.deepEqual(parseNewsFeed(data, "global"), data)
  assert.equal(parseNewsRss(malaysiaXml, "malaysia", now).items.length, 1)
  assert.equal(
    parseNewsRss(rss(article("Unrelated topic")), "global", now).items.length,
    0,
  )
})

test("RSS rejects malformed XML, wrong publisher, entities and oversized documents; strips encoded HTML", () => {
  for (const xml of [
    "<rss>",
    "<!DOCTYPE rss><rss/>",
    "<!ENTITY x 'data'><rss/>",
    "x".repeat(1024 * 1024 + 1),
    rss(article("AI"), "malaysia"),
  ]) {
    assert.throws(() => parseNewsRss(xml, "global", now))
  }
  const parsed = parseNewsRss(
    rss(article("&lt;b&gt;AI &amp; skills&lt;/b&gt;")),
    "global",
    now,
  )
  assert.equal(parsed.items[0].title, "AI & skills")
  assert.throws(() => parseNewsFeed({ ...parsed, scope: "malaysia" }, "global"))
  assert.throws(() =>
    parseNewsFeed({ ...parsed, retrievedAt: "invalid" }, "global"),
  )
  assert.throws(() =>
    parseNewsFeed(
      {
        ...parsed,
        items: [{ ...parsed.items[0], url: "https://evil.example/" }],
      },
      "global",
    ),
  )
})

test("news cache is isolated by source, expires at 30 minutes and retains original dates on failure", async () => {
  let time = now.getTime()
  const urls: string[] = []
  let offline = false
  const load = createNewsLoader(
    async (input) => {
      urls.push(String(input))
      if (offline) throw new Error("Synthetic outage")
      return new Response(
        String(input) === newsSources.global.url ? globalXml : malaysiaXml,
      )
    },
    () => time,
  )
  const first = await load("global")
  assert.equal(first.cacheStatus, "fresh")
  assert.equal((await load("global")).cacheStatus, "cached")
  assert.equal((await load("malaysia")).scope, "malaysia")
  assert.equal(urls.length, 2)
  time += trendCacheMs
  offline = true
  const stale = await load("global")
  assert.equal(stale.cacheStatus, "stale")
  assert.equal(stale.retrievedAt, first.retrievedAt)
  assert.deepEqual(stale.items, first.items)
  await load("global")
  assert.equal(
    urls.length,
    3,
    "cooldown avoids repeated failed upstream fetches",
  )
  time += 60_000
  offline = false
  const recovered = await load("global")
  assert.equal(recovered.cacheStatus, "fresh")
  assert.notEqual(recovered.retrievedAt, first.retrievedAt)
})

test("simultaneous requests share one fetch and initial failure fabricates no cached headlines", async () => {
  let count = 0
  const load = createNewsLoader(
    async () => {
      count++
      return new Response(globalXml)
    },
    () => now.getTime(),
  )
  await Promise.all([load("global"), load("global")])
  assert.equal(count, 1)
  const unavailable = createNewsLoader(
    async () => new Response("unavailable", { status: 503 }),
  )
  await assert.rejects(unavailable("global"))
  await assert.rejects(unavailable("global"))
  const oversized = createNewsLoader(
    async () => new Response("x".repeat(1024 * 1024 + 1)),
  )
  await assert.rejects(oversized("global"))
})

test("HTTP endpoint validates scope/method, supplies no-store metadata and reports upstream unavailability", async () => {
  const requested: NewsScope[] = []
  const handler = createNewsHandler(async (scope) => {
    requested.push(scope)
    if (scope === "malaysia") throw new Error("Synthetic outage")
    return parseNewsRss(globalXml, scope, now)
  })
  const server = createServer((req, res) => {
    void handler(req, res)
  })
  server.listen(0, "127.0.0.1")
  await once(server, "listening")
  try {
    const address = server.address()
    assert.ok(address && typeof address === "object")
    const url = `http://127.0.0.1:${address.port}/api/news`
    const success = await fetch(url)
    assert.equal(success.status, 200)
    assert.equal(success.headers.get("cache-control"), "no-store")
    assert.equal(parseNewsFeed(await success.json(), "global").items.length, 1)
    const invalid = await fetch(url + "?scope=https://evil.example")
    assert.equal(invalid.status, 400)
    const wrongMethod = await fetch(url, { method: "POST" })
    assert.equal(wrongMethod.status, 405)
    assert.equal(wrongMethod.headers.get("allow"), "GET")
    assert.equal((await fetch(url + "?scope=malaysia")).status, 503)
    assert.deepEqual(requested, ["global", "malaysia"])
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    )
  }
})
