import { test } from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { parseTrend, parseBls, createTrendLoader, trendCacheMs } from "./trends"
test("reviewed snapshot validates and retains foreign geography and proxy caveat", async () => {
  const snapshot = parseTrend(
    JSON.parse(
      await readFile(
        new URL("../../public/data/trend.json", import.meta.url),
        "utf8",
      ),
    ),
  )
  assert.equal(snapshot.geography, "United States")
  assert.match(snapshot.limitation, /proxy/)
  for (const growthPercent of [null, "35", Infinity, -101])
    assert.throws(() => parseTrend({ ...snapshot, growthPercent }))
  assert.throws(() => parseTrend({ ...snapshot, url: "https://example.com" }))
})

test("live retrieval caches for 30 minutes and stale fallback preserves the successful timestamp", async () => {
  const html =
    "<p>Employment of data scientists is projected to grow 12 percent from 2026 to 2036</p><p>Last modified date: August 27, 2026</p>"
  let clock = Date.parse("2026-10-22T12:00:00Z"),
    calls = 0
  const load = createTrendLoader(
    async () => {
      calls++
      if (calls > 1) throw new Error("Offline")
      return new Response(html)
    },
    () => clock,
  )
  const fresh = await load()
  assert.equal(fresh.cacheStatus, "fresh")
  assert.equal(fresh.retrievedAt, "2026-10-22T12:00:00.000Z")
  clock += trendCacheMs - 1
  const cached = await load()
  assert.equal(cached.cacheStatus, "cached")
  assert.equal(calls, 1)
  clock += 2
  const stale = await load()
  assert.equal(stale.cacheStatus, "stale")
  assert.equal(stale.retrievedAt, fresh.retrievedAt)
  assert.equal(calls, 2)
  assert.equal(stale.growthPercent, 12)
  assert.equal(stale.geography, "United States")
  await assert.rejects(
    createTrendLoader(async () => {
      throw new Error("Offline")
    })(),
  )
  assert.throws(() => parseTrend({ ...fresh, geography: "Malaysia" }))
  assert.throws(() => parseTrend({ ...fresh, retrievedAt: "today" }))
})
test("upstream parser accepts a changed projection, fails closed on changed markup or absent date", () => {
  const html =
    "<p>Employment of data scientists is projected to grow <b>12</b> percent from 2026 to 2036</p><p>Last modified date: August 27, 2026</p>"
  const result = parseBls(html)
  assert.equal(result.growthPercent, 12)
  assert.equal(result.period, "2026–2036")
  assert.equal(result.published, "August 27, 2026")
  assert.throws(() => parseBls("<h1>Access Denied</h1>"))
  assert.throws(() => parseBls(html.split("<p>Last")[0]))
})
