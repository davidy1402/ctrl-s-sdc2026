export type Trend = {
  schemaVersion: number
  source: string
  url: string
  published: string
  checked: string
  period: string
  growthPercent: number
  geography: string
  occupation: string
  limitation: string
  license: string
  retrievedAt?: string
  cacheStatus?: "fresh" | "cached" | "stale"
}
export function parseTrend(value: unknown): Trend {
  if (
    !value ||
    typeof value !== "object" ||
    !("schemaVersion" in value) ||
    value.schemaVersion !== 1 ||
    !("growthPercent" in value) ||
    typeof value.growthPercent !== "number" ||
    !Number.isFinite(value.growthPercent) ||
    value.growthPercent < -100 ||
    value.growthPercent > 1000
  )
    throw new Error("Invalid trend feed")
  for (const key of [
    "source",
    "url",
    "published",
    "checked",
    "period",
    "geography",
    "occupation",
    "limitation",
    "license",
  ]) {
    if (
      !(key in value) ||
      typeof Reflect.get(value, key) !== "string" ||
      !Reflect.get(value, key)
    )
      throw new Error("Invalid trend metadata")
  }
  // Reconstruct after validating every external field.
  const text = (key: string): string => Reflect.get(value, key)
  if (
    text("url") !== "https://www.bls.gov/ooh/math/data-scientists.htm" ||
    !/^\d{4}-\d{2}-\d{2}/.test(text("checked"))
  )
    throw new Error("Untrusted source")
  if (
    text("geography") !== "United States" ||
    text("occupation") !== "Data Scientists"
  )
    throw new Error("Invalid source scope")
  const retrievedAt = Reflect.get(value, "retrievedAt")
  if (
    retrievedAt !== undefined &&
    (typeof retrievedAt !== "string" ||
      !Number.isFinite(Date.parse(retrievedAt)))
  )
    throw new Error("Invalid retrieval time")
  const cacheStatus = Reflect.get(value, "cacheStatus")
  if (
    cacheStatus !== undefined &&
    !["fresh", "cached", "stale"].includes(cacheStatus)
  )
    throw new Error("Invalid cache status")
  return {
    schemaVersion: 1,
    growthPercent: value.growthPercent,
    source: text("source"),
    url: text("url"),
    published: text("published"),
    checked: text("checked"),
    period: text("period"),
    geography: text("geography"),
    occupation: text("occupation"),
    limitation: text("limitation"),
    license: text("license"),
    ...(retrievedAt ? { retrievedAt } : {}),
    ...(cacheStatus ? { cacheStatus } : {}),
  }
}
export function parseBls(html: string, retrievedAt = new Date()): Trend {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/\s+/g, " ")
  const match = text.match(
    /Employment of data scientists is projected to grow (\d+(?:\.\d+)?) percent from (\d{4}) to (\d{4})/i,
  )
  const modified = text.match(
    /Last Modified Date:\s*([A-Za-z]+ \d{1,2}, \d{4})/i,
  )
  if (!match || !modified)
    throw new Error("BLS page changed; manual review required")
  return parseTrend({
    schemaVersion: 1,
    source: "U.S. Bureau of Labor Statistics — Data Scientists",
    url: "https://www.bls.gov/ooh/math/data-scientists.htm",
    published: modified[1],
    checked: retrievedAt.toISOString().slice(0, 10),
    retrievedAt: retrievedAt.toISOString(),
    period: `${match[2]}–${match[3]}`,
    growthPercent: Number(match[1]),
    geography: "United States",
    occupation: "Data Scientists",
    limitation:
      "Related occupation proxy for Data Analyst; not Malaysian demand, an individual forecast, or a guarantee.",
    license:
      "U.S. federal government public information; attribution retained.",
  })
}

export const trendCacheMs = 30 * 60 * 1000
export function createTrendLoader(
  fetcher: typeof fetch = fetch,
  now: () => number = Date.now,
) {
  let cached: Trend | null = null
  let cachedAt = 0
  return async (): Promise<Trend> => {
    if (cached && now() - cachedAt < trendCacheMs)
      return { ...cached, cacheStatus: "cached" }
    try {
      const response = await fetcher(
        "https://www.bls.gov/ooh/math/data-scientists.htm",
        { signal: AbortSignal.timeout(8000) },
      )
      if (!response.ok) throw new Error("Upstream unavailable")
      const record = parseBls(await response.text(), new Date(now()))
      cached = record
      cachedAt = now()
      return { ...record, cacheStatus: "fresh" }
    } catch (error) {
      if (cached) return { ...cached, cacheStatus: "stale" }
      throw error
    }
  }
}
