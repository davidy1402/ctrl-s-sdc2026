export type NewsScope = "global" | "malaysia"
export type NewsItem = {
  title: string
  url: string
  publishedAt: string
}
export type NewsFeed = {
  scope: NewsScope
  source: string
  feedUrl: string
  retrievedAt: string
  cacheStatus: "fresh" | "cached" | "stale"
  items: NewsItem[]
}

export const newsSources = {
  global: {
    name: "UN News · global AI context",
    url: "https://news.un.org/feed/subscribe/en/news/topic/economic-development/feed/rss.xml",
    host: "news.un.org",
    limitation:
      "Global economic-development feed, filtered for AI in titles. It is a selected news sample, not a labour-market dataset or an AI adoption measure.",
  },
  malaysia: {
    name: "MOSTI · Malaysia science & skills context",
    url: "https://www.mosti.gov.my/en/feed/",
    host: "www.mosti.gov.my",
    limitation:
      "Official Malaysian science and technology feed, filtered for AI, digital learning, STEM, robotics, training or skills in English and Malay titles. It is not a hiring feed or a measure of Malaysian job demand.",
  },
} satisfies Record<NewsScope, {
  name: string
  url: string
  host: string
  limitation: string
}>

export function isNewsScope(value: unknown): value is NewsScope {
  return value === "global" || value === "malaysia"
}
export function isNewsUrl(value: unknown, scope: NewsScope): value is string {
  if (typeof value !== "string") return false
  try {
    const url = new URL(value)
    return (
      url.protocol === "https:" &&
      url.hostname === newsSources[scope].host &&
      !url.username &&
      !url.password &&
      !url.port
    )
  } catch {
    return false
  }
}
export function isNewsDate(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value))
}
export function parseNewsFeed(value: unknown, scope: NewsScope): NewsFeed {
  if (
    !value ||
    typeof value !== "object" ||
    !("scope" in value) ||
    value.scope !== scope ||
    !("source" in value) ||
    value.source !== newsSources[scope].name ||
    !("feedUrl" in value) ||
    value.feedUrl !== newsSources[scope].url ||
    !("retrievedAt" in value) ||
    !isNewsDate(value.retrievedAt) ||
    !("cacheStatus" in value) ||
    (value.cacheStatus !== "fresh" &&
      value.cacheStatus !== "cached" &&
      value.cacheStatus !== "stale") ||
    !("items" in value) ||
    !Array.isArray(value.items) ||
    value.items.length > 3
  )
    throw new Error("Invalid news metadata")
  const items = value.items.map((item: unknown): NewsItem => {
    if (
      !item ||
      typeof item !== "object" ||
      !("title" in item) ||
      typeof item.title !== "string" ||
      !item.title.trim() ||
      item.title.length > 300 ||
      !("url" in item) ||
      !isNewsUrl(item.url, scope) ||
      !("publishedAt" in item) ||
      !isNewsDate(item.publishedAt)
    )
      throw new Error("Invalid news item")
    return { title: item.title, url: item.url, publishedAt: item.publishedAt }
  })
  return {
    scope,
    source: value.source,
    feedUrl: value.feedUrl,
    retrievedAt: value.retrievedAt,
    cacheStatus: value.cacheStatus,
    items,
  }
}
