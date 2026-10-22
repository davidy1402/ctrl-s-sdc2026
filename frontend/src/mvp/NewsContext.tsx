import { useEffect, useId, useState } from "react"
import {
  newsSources,
  parseNewsFeed,
  type NewsFeed,
  type NewsScope,
} from "./news"

function formatDate(value: string) {
  return (
    new Date(value).toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" }) +
    " MYT"
  )
}

export function NewsContext() {
  const heading = useId()
  const [scope, setScope] = useState<NewsScope>("global")
  const [attempt, setAttempt] = useState(0)
  const [records, setRecords] = useState<Partial<Record<NewsScope, NewsFeed>>>(
    {},
  )
  const [status, setStatus] = useState<"loading" | "ready" | "failed">(
    "loading",
  )
  useEffect(() => {
    const controller = new AbortController()
    setStatus("loading")
    void (async () => {
      try {
        const response = await fetch(`/api/news?scope=${scope}`, {
          cache: "no-store",
          signal: controller.signal,
        })
        if (!response.ok) throw new Error("News unavailable")
        const record = parseNewsFeed(await response.json(), scope)
        if (!controller.signal.aborted) {
          setRecords((previous) => ({ ...previous, [scope]: record }))
          setStatus("ready")
        }
      } catch {
        if (!controller.signal.aborted) setStatus("failed")
      }
    })()
    return () => controller.abort()
  }, [scope, attempt])
  const record = records[scope]
  const stale = status === "failed" || record?.cacheStatus === "stale"
  return (
    <section className="news-context" aria-labelledby={heading}>
      <h3 id={heading}>AI & skills news context</h3>
      <p>
        Read current source headlines alongside the occupation evidence. News
        does not change your fit score or verify a skill.
      </p>
      <div className="news-controls">
        <label>
          News context
          <select
            value={scope}
            onChange={(event) => {
              setScope(
                event.target.value === "malaysia" ? "malaysia" : "global",
              )
              setStatus("loading")
            }}
          >
            <option value="global">Global AI context</option>
            <option value="malaysia">Malaysia skills context</option>
          </select>
        </label>
        <button
          type="button"
          disabled={status === "loading"}
          onClick={() => setAttempt((value) => value + 1)}
        >
          Refresh news
        </button>
      </div>
      <p role="status">
        {status === "loading"
          ? "Checking the public news source…"
          : stale
            ? record
              ? "News refresh unavailable. Last successful headlines are shown with their original retrieval time."
              : "News unavailable. No recent-news evidence can be shown. Try Refresh news in a minute."
            : "Source retrieved. A 30-minute server cache may apply."}
      </p>
      <p>
        <a href={newsSources[scope].url} target="_blank" rel="noreferrer">
          {newsSources[scope].name}
        </a>
      </p>
      {record && (
        <>
          <p>
            Fetched{" "}
            <time dateTime={record.retrievedAt}>
              {formatDate(record.retrievedAt)}
            </time>{" "}
            ·{" "}
            {stale
              ? "offline fallback"
              : record.cacheStatus === "cached"
                ? "cached retrieval"
                : "fresh retrieval"}
            . Fetch time is not publication time.
          </p>
          {record.items.length ? (
            <ul className="news-headlines">
              {record.items.map((item) => (
                <li key={item.url}>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                  <small>
                    Published{" "}
                    <time dateTime={item.publishedAt}>
                      {formatDate(item.publishedAt)}
                    </time>
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              No matching headlines in this feed response. This does not mean
              there is no AI or skills activity.
            </p>
          )}
        </>
      )}
      <p>
        {newsSources[scope].limitation} Up to three dated headlines are shown.
        Sources may publish infrequently, and older items can remain in a fresh
        retrieval.
      </p>
      {scope === "malaysia" && (
        <p>
          For workforce research, see{" "}
          <a
            href="https://www.talentcorp.com.my/resources/press-releases/talentcorp-launches-landmark-study-on-workforce-impact-of-ai-digitalisation-and-green-economy/"
            target="_blank"
            rel="noreferrer"
          >
            TalentCorp’s Malaysian workforce impact study launch · 18 November
            2024
          </a>
          . This dated reference is separate from the live feed.
        </p>
      )}
    </section>
  )
}
