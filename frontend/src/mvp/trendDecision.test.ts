import { test } from "node:test"
import assert from "node:assert/strict"
import { decideTrend } from "./trendDecision"
import { rankCareers, buildPathway } from "./domain1"
import { parseBls, type Trend } from "./trends"

const now = Date.parse("2026-10-23T04:00:00Z")
const fixture: Trend = {
  schemaVersion: 1, source: "Synthetic test evidence A — not actual BLS data",
  url: "https://www.bls.gov/ooh/math/data-scientists.htm", published: "August 27, 2026",
  checked: "2026-10-23", retrievedAt: "2026-10-23T03:00:00Z", period: "2025–2035",
  growthPercent: 12, geography: "United States", occupation: "Data Scientists",
  limitation: "Synthetic fixture only; no real projection claimed", license: "Test only", cacheStatus: "fresh",
}
test("dated proxy produces explicit direction and fails closed on stale, missing or invalid dates", () => {
  assert.equal(decideTrend(fixture, now).direction, "rising")
  assert.equal(decideTrend({...fixture, growthPercent:-8}, now).direction, "falling")
  assert.equal(decideTrend({...fixture, growthPercent:0}, now).direction, "flat")
  const variants: (Trend | null)[] = [null, {...fixture, cacheStatus:"stale"},
    {...fixture, retrievedAt:"2026-09-01T00:00:00Z"}, {...fixture,retrievedAt:"2026-10-24T00:00:00Z"},
    {...fixture,published:"unknown"}, {...fixture,published:"2024-01-01"},
    {...fixture,period:"2020–2025"}, {...fixture,period:"2027–2037"}]
  for (const value of variants) {
    const result=decideTrend(value,now)
    assert.equal(result.direction,"unavailable")
    assert.equal(result.priority,0)
    assert.deepEqual(result.prioritizedSkills,[])
  }
})
test("two synthetic evidence versions change exploration and practice while preserving scores and prerequisites", () => {
  // Use a recent fixture date for integration with the real application clock.
  const recent={...fixture, retrievedAt:new Date(Date.now()-1000).toISOString()}
  for (const scenario of ["assistive","accelerated"] as const) {
    const a=rankCareers([0,0,0,0],[],scenario,recent)
    const b=rankCareers([0,0,0,0],[],scenario,{...recent,growthPercent:-8})
    assert.equal(a.rankings[0].role.id,"data")
    assert.equal(b.rankings.at(-1)?.role.id,"data")
    for(const item of a.rankings) {
      assert.equal(item.score,b.rankings.find(other=>other.role.id===item.role.id)?.score)
      assert.deepEqual(item.breakdown,b.rankings.find(other=>other.role.id===item.role.id)?.breakdown)
    }
    for(const skills of [[],["sql"],["statistics"]]) {
      const plan=buildPathway("data",skills,scenario,recent)
      assert.equal(plan[0].id,"statistics")
      plan.forEach((skill,index)=>skill.prerequisites.forEach(id=>assert.ok(plan.slice(0,index).some(item=>item.id===id))))
    }
  }
  assert.equal(buildPathway("data",[],"assistive",{...recent,growthPercent:-8})[0].id,"sql")
  assert.match(rankCareers([0,0,0,0],[],"assistive",recent).rankings.find(x=>x.role.id==="software")!.trendExplanation,/unknown/)
})
test("BLS parser preserves direction rather than converting decline into growth", () => {
  const record=parseBls("Employment of data scientists is projected to decline by 8 percent from 2025 to 2035. Last Modified Date: August 27, 2026",new Date(now))
  assert.equal(record.growthPercent,-8)
})
