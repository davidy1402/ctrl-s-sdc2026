import type { Trend } from "./trends"

export type TrendDecision = {
  direction: "rising" | "falling" | "flat" | "unavailable"
  explanation: string
  priority: number
  prioritizedSkills: string[]
}

// These are conservative editorial exploration rules, never calibrated demand/fit scores.
export function decideTrend(trend: Trend | null, now = Date.now()): TrendDecision {
  const unavailable = (reason: string): TrendDecision => ({
    direction: "unavailable", priority: 0, prioritizedSkills: [],
    explanation: `${reason} No trend adjustment; capability order and prerequisite learning apply. No direction is inferred for the other two roles.`,
  })
  if (!trend) return unavailable("Insufficient trend evidence.")
  const retrieved = Date.parse(trend.retrievedAt ?? trend.checked)
  const published = Date.parse(trend.published)
  const period = /^(\d{4})[–-](\d{4})$/.exec(trend.period)
  const year = new Date(now).getUTCFullYear()
  const day = 86400000
  if (trend.cacheStatus === "stale") return unavailable("Refresh failed: retained evidence is inactive.")
  if (!Number.isFinite(retrieved) || retrieved > now || now - retrieved > 30 * day)
    return unavailable("Retrieval is missing, future-dated or older than 30 days.")
  if (!Number.isFinite(published) || published > now || now - published > 550 * day ||
      !period || Number(period[1]) > year || Number(period[2]) < year)
    return unavailable("Publication date or projection horizon is outside the reviewed window.")
  const context = `${trend.growthPercent}% projected U.S. Data Scientists employment change (${trend.period}); source updated ${trend.published}. Related-occupation proxy only; low transfer confidence for Data Analyst and no Malaysian demand inference.`
  if (trend.growthPercent > 0) return {
    direction: "rising", priority: 1, prioritizedSkills: ["statistics"],
    explanation: `${context} Rising proxy: investigate Data Analyst first; prioritize statistical reasoning among ready Foundation skills to practise interpreting projections. This is an editorial exploration choice, not evidence of rising demand for that skill.`,
  }
  if (trend.growthPercent < 0) return {
    direction: "falling", priority: -1, prioritizedSkills: [],
    explanation: `${context} Falling proxy: investigate Data Analyst after the other options and review transferability before committing. No skill decline is inferred; the normal prerequisite plan applies.`,
  }
  return { direction: "flat", priority: 0, prioritizedSkills: [],
    explanation: `${context} Flat proxy: no exploration-order or skill-priority adjustment.`, }
}
