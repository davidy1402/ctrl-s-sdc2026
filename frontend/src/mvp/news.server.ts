import { XMLParser, XMLValidator } from "fast-xml-parser"
import {
  isNewsDate,
  isNewsUrl,
  newsSources,
  type NewsFeed,
  type NewsItem,
  type NewsScope,
} from "./news.js"
import { trendCacheMs } from "./trends.js"

const maxFeedBytes = 1024 * 1024
const keywords = {
  global: /\bAI\b|artificial intelligence/i,
  malaysia:
    /\bAI\b|artificial intelligence|kecerdasan|digital|\bSTEM\b|robot|latihan|kemahiran/i,
}

export function parseNewsRss(
  xml: string,
  scope: NewsScope,
  retrievedAt: Date,
): NewsFeed {
  if (
    Buffer.byteLength(xml) > maxFeedBytes ||
    /<!DOCTYPE|<!ENTITY/i.test(xml) ||
    XMLValidator.validate(xml) !== true
  )
    throw new Error("Invalid RSS")
  const parsed: unknown = new XMLParser({
    ignoreAttributes: true,
    parseTagValue: false,
    trimValues: true,
  }).parse(xml)
  if (
    !parsed ||
    typeof parsed !== "object" ||
    !("rss" in parsed) ||
    !parsed.rss ||
    typeof parsed.rss !== "object" ||
    !("channel" in parsed.rss) ||
    !parsed.rss.channel ||
    typeof parsed.rss.channel !== "object"
  )
    throw new Error("RSS channel missing")
  const channel = parsed.rss.channel
  if (!("link" in channel) || !isNewsUrl(channel.link, scope))
    throw new Error("Unexpected feed publisher")
  const entries: unknown[] = !("item" in channel)
    ? []
    : Array.isArray(channel.item)
      ? channel.item
      : [channel.item]
  const items: NewsItem[] = []
  const seen = new Set<string>()
  for (const entry of entries) {
    if (
      !entry ||
      typeof entry !== "object" ||
      !("title" in entry) ||
      typeof entry.title !== "string" ||
      !("link" in entry) ||
      !isNewsUrl(entry.link, scope) ||
      !("pubDate" in entry) ||
      !isNewsDate(entry.pubDate)
    )
      continue
    // Plain text metadata only; never render descriptions or article HTML.
    const title = entry.title
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim()
    const publishedAt = new Date(entry.pubDate)
    if (
      !title ||
      title.length > 300 ||
      !keywords[scope].test(title) ||
      publishedAt.getTime() > retrievedAt.getTime() ||
      seen.has(entry.link)
    )
      continue
    seen.add(entry.link)
    items.push({
      title,
      url: entry.link,
      publishedAt: publishedAt.toISOString(),
    })
  }
  items.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
  return {
    scope,
    source: newsSources[scope].name,
    feedUrl: newsSources[scope].url,
    retrievedAt: retrievedAt.toISOString(),
    cacheStatus: "fresh",
    items: items.slice(0, 3),
  }
}

async function readBounded(response: Response): Promise<string> {
  if (!response.body) throw new Error("Empty response")
  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let size = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > maxFeedBytes) throw new Error("Feed too large")
      chunks.push(value)
    }
    return Buffer.concat(chunks).toString("utf8")
  } finally {
    await reader.cancel()
    reader.releaseLock()
  }
}

export function createNewsLoader(
  fetcher: typeof fetch = fetch,
  now: () => number = Date.now,
) {
  const cache = new Map<NewsScope, NewsFeed>()
  const pending = new Map<NewsScope, Promise<NewsFeed>>()
  const retryAfter = new Map<NewsScope, number>()
  async function retrieve(scope: NewsScope): Promise<NewsFeed> {
    try {
      const response = await fetcher(newsSources[scope].url, {
        signal: AbortSignal.timeout(8000),
        redirect: "error",
      })
      if (!response.ok) throw new Error("News source unavailable")
      const record = parseNewsRss(
        await readBounded(response),
        scope,
        new Date(now()),
      )
      cache.set(scope, record)
      retryAfter.delete(scope)
      return record
    } catch (error) {
      retryAfter.set(scope, now() + 60_000)
      const previous = cache.get(scope)
      if (previous) return { ...previous, cacheStatus: "stale" }
      throw error
    }
  }
  return async (scope: NewsScope): Promise<NewsFeed> => {
    const previous = cache.get(scope)
    if (previous && now() - Date.parse(previous.retrievedAt) < trendCacheMs)
      return { ...previous, cacheStatus: "cached" }
    if (now() < (retryAfter.get(scope) ?? 0)) {
      if (previous) return { ...previous, cacheStatus: "stale" }
      throw new Error("Retry after source cooldown")
    }
    const current = pending.get(scope)
    if (current) return current
    const request = retrieve(scope)
    pending.set(scope, request)
    try {
      return await request
    } finally {
      pending.delete(scope)
    }
  }
}
