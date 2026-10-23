import { test, expect, type Page } from "@playwright/test"
import type { Trend } from "../src/mvp/trends"

// Deliberately contradictory test evidence, not actual BLS releases or forecasts.
// Each test intercepts the source endpoints; real upstream checks are separate.
const evidenceA: Trend = {
  schemaVersion: 1,
  source: "Synthetic evidence version A — test only, BLS-shaped record",
  url: "https://www.bls.gov/ooh/math/data-scientists.htm",
  published: "October 20, 2026",
  checked: "2026-10-23",
  retrievedAt: "2026-10-23T03:00:00.000Z",
  period: "2025–2035",
  growthPercent: 12,
  geography: "United States",
  occupation: "Data Scientists",
  limitation: "SYNTHETIC TEST EVIDENCE ONLY. Related-occupation proxy; not Malaysian demand or an individual forecast.",
  license: "Fictional test fixture; no claim of a real source release.",
  cacheStatus: "fresh",
}
const evidenceB: Trend = {
  ...evidenceA,
  source: "Synthetic evidence version B — test only, BLS-shaped record",
  growthPercent: -8,
  retrievedAt: "2026-10-23T03:30:00.000Z",
}

async function enterMatches(page: Page) {
  await page.goto("/")
  await page.getByRole("button", { name: "Begin your journey" }).click()
  await page.getByRole("button", { name: /Student Exploring/ }).click()
  await page.getByPlaceholder("e.g. Demo Explorer").fill("Fictional Trend Explorer")
  await page.getByRole("button", { name: "Continue", exact: true }).click()
  await page.getByRole("button", { name: "Skip for now" }).click()
  await page.getByRole("button", { name: "Start assessment" }).click()
  for (let question = 0; question < 4; question++) {
    await page.locator(".answer-list button").first().click()
    await page.getByRole("button", {
      name: question === 3 ? "Complete assessment" : "Next scenario",
    }).click()
  }
  await page.getByRole("button", { name: "View capability profile" }).click()
  await page.getByRole("button", { name: "Explore career matches" }).click()
  await expect(page.locator(".role-match-card")).toHaveCount(3)
}

async function scoresByRole(page: Page) {
  return page.locator(".role-match-card").evaluateAll((cards) =>
    Object.fromEntries(cards.map((card) => [
      card.querySelector("h3")?.textContent,
      card.querySelector(".role-match-score")?.textContent,
    ])),
  )
}

async function fitsViewport(page: Page) {
  expect(await page.evaluate(() =>
    document.documentElement.scrollWidth <= window.innerWidth,
  )).toBe(true)
}

async function isolateNews(page: Page) {
  await page.route("**/api/news?*", (route) => route.fulfill({
    status: 503,
    contentType: "application/json",
    body: JSON.stringify({ error: "Synthetic isolated news outage" }),
  }))
}

test("two labelled test evidence versions change exploration order and learning priority while capability scores stay stable", async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.clock.setFixedTime(new Date("2026-10-23T04:00:00.000Z"))
  let currentEvidence = evidenceA
  await page.route("**/data/trend.json", (route) => route.fulfill({ json: evidenceA }))
  await page.route("**/api/trends", (route) => route.fulfill({ json: currentEvidence }))
  await isolateNews(page)
  await enterMatches(page)
  const cards = page.locator(".role-match-card")
  await expect(cards.first().getByRole("heading")).toHaveText("Data Analyst")
  const originalScores = await scoresByRole(page)
  await expect(cards.first().locator(".trend-decision")).toContainText("Rising proxy")
  await expect(cards.first().locator(".trend-decision")).toContainText("no Malaysian demand inference")
  await expect(page.getByRole("link", { name: evidenceA.source }).first()).toHaveAttribute("href", evidenceA.url)
  await expect(page.getByText(/Source updated October 20, 2026/)).toBeVisible()
  await expect(page.getByText(/12% projected employment change/)).toBeVisible()
  await fitsViewport(page)
  await page.screenshot({ path: testInfo.outputPath("synthetic-evidence-A-matches.png"), fullPage: true })

  currentEvidence = evidenceB
  await page.getByRole("button", { name: "Refresh from BLS" }).click()
  await expect(cards.last().getByRole("heading")).toHaveText("Data Analyst")
  await expect(cards.last().locator(".trend-decision")).toContainText("Falling proxy")
  await expect(page.getByText(/-8% projected employment change/)).toBeVisible()
  await expect(page.getByRole("link", { name: evidenceB.source }).first()).toHaveAttribute("href", evidenceB.url)
  expect(await scoresByRole(page)).toEqual(originalScores)
  await fitsViewport(page)
  await page.screenshot({ path: testInfo.outputPath("synthetic-evidence-B-matches.png"), fullPage: true })

  const data = cards.filter({ has: page.getByRole("heading", { name: "Data Analyst", exact: true }) })
  await data.getByRole("button", { name: "Explore this pathway" }).click()
  await expect(page.locator(".sdg-mapping")).toContainText("Target 4.4")
  await page.getByRole("button", { name: "Start beginner pathway" }).click()
  await expect(page.locator(".step-heading strong").first()).toHaveText("SQL queries")
  await expect(page.locator(".roadmap-phase")).toHaveCount(3)
  currentEvidence = evidenceA
  // The pathway keeps its own source controls so a user can replan in place.
  const refresh = page.getByRole("button", { name: "Refresh from BLS" })
  if (!(await refresh.isVisible())) {
    await page.getByText("Sources & uncertainty", { exact: true }).click()
  }
  await refresh.click()
  await expect(page.locator(".step-heading strong").first()).toHaveText("Statistical reasoning")
  await page.getByRole("button", { name: /More task steps are automated/ }).click()
  await expect(page.locator(".step-heading strong").first()).toHaveText("Statistical reasoning")
  await page.getByRole("button", { name: /AI assists selected tasks/ }).click()
  await page.getByText("Update skills you have tried", { exact: true }).click()
  await page.getByRole("checkbox", { name: /SQL queries/ }).check()
  await expect(page.locator(".step-heading strong").first()).toHaveText("Statistical reasoning")
  await page.getByRole("button", { name: "Mark practice complete", exact: true }).first().click()
  await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "1")
  await fitsViewport(page)
  await page.screenshot({ path: testInfo.outputPath("trend-replanned-pathway.png"), fullPage: true })
  expect(errors).toEqual([])
})

test("expired, stale and failed trend evidence disable trend ordering without losing assessment or inventing decline", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-10-23T04:00:00.000Z"))
  let response: Trend | null = null
  const expired: Trend = {
    ...evidenceA,
    source: "Synthetic expired evidence — test only",
    checked: "2026-08-01",
    retrievedAt: "2026-08-01T03:00:00.000Z",
  }
  await page.route("**/data/trend.json", (route) => route.fulfill({ json: expired }))
  await page.route("**/api/trends", (route) => response
    ? route.fulfill({ json: response })
    : route.fulfill({ status: 503, json: { error: "Synthetic upstream failure" } }),
  )
  await isolateNews(page)
  await enterMatches(page)
  const originalOrder = await page.locator(".role-match-card h3").allTextContents()
  const originalScores = await scoresByRole(page)
  const data = page.locator(".role-match-card").filter({ has: page.getByRole("heading", { name: "Data Analyst", exact: true }) })
  await expect(data.locator(".trend-decision")).toContainText("No trend adjustment")
  await expect(data.locator(".trend-decision")).toContainText("older than 30 days")

  response = evidenceB
  await page.getByRole("button", { name: "Refresh from BLS" }).click()
  await expect(page.locator(".role-match-card").last().getByRole("heading")).toHaveText("Data Analyst")
  response = { ...evidenceA, cacheStatus: "stale" }
  await page.getByRole("button", { name: "Refresh from BLS" }).click()
  await expect.poll(() => page.locator(".role-match-card h3").allTextContents()).toEqual(originalOrder)
  expect(await scoresByRole(page)).toEqual(originalScores)
  await expect(data.locator(".trend-decision")).toContainText("retained evidence is inactive")

  response = evidenceA
  await page.getByRole("button", { name: "Refresh from BLS" }).click()
  await expect(page.locator(".role-match-card").first().getByRole("heading")).toHaveText("Data Analyst")
  response = null
  await page.getByRole("button", { name: "Refresh from BLS" }).click()
  await expect(page.getByRole("status").filter({ hasText: "Live refresh unavailable" })).toBeVisible()
  await expect.poll(() => page.locator(".role-match-card h3").allTextContents()).toEqual(originalOrder)
  expect(await scoresByRole(page)).toEqual(originalScores)
  await fitsViewport(page)
})

for (const refreshOutcome of ["success", "failure"]) {
  test(`delayed snapshot cannot overwrite an earlier live-refresh ${refreshOutcome}`, async ({ page }) => {
    await page.clock.setFixedTime(new Date("2026-10-23T04:00:00.000Z"))
    let releaseSnapshot: (() => void) | undefined
    const snapshotGate = new Promise<void>((resolve) => { releaseSnapshot = resolve })
    await page.route("**/data/trend.json", async (route) => {
      await snapshotGate
      await route.fulfill({ json: evidenceA })
    })
    await page.route("**/api/trends", (route) => refreshOutcome === "success"
      ? route.fulfill({ json: evidenceB })
      : route.fulfill({ status: 503, json: { error: "Synthetic race-test outage" } }),
    )
    await isolateNews(page)
    await enterMatches(page)
    const cards = page.locator(".role-match-card")
    const capabilityOrder = await cards.locator("h3").allTextContents()
    const scores = await scoresByRole(page)
    await page.getByRole("button", { name: "Refresh from BLS" }).click()
    if (refreshOutcome === "success") {
      await expect(page.getByRole("link", { name: evidenceB.source }).first()).toBeVisible()
      await expect(cards.last().getByRole("heading")).toHaveText("Data Analyst")
    } else {
      await expect(page.getByRole("status").filter({ hasText: "Live refresh unavailable" })).toBeVisible()
      await expect.poll(() => cards.locator("h3").allTextContents()).toEqual(capabilityOrder)
    }
    const snapshotResponse = page.waitForResponse((response) =>
      new URL(response.url()).pathname === "/data/trend.json",
    )
    expect(releaseSnapshot).toBeDefined()
    releaseSnapshot?.()
    await (await snapshotResponse).finished()
    // Wait for the fetched promise and React render to settle, without a timed sleep.
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())))
    await expect(page.getByRole("link", { name: evidenceA.source })).toHaveCount(0)
    if (refreshOutcome === "success") {
      await expect(page.getByRole("link", { name: evidenceB.source }).first()).toBeVisible()
      await expect(cards.last().getByRole("heading")).toHaveText("Data Analyst")
      await expect(cards.last().locator(".trend-decision")).toContainText("Falling proxy")
    } else {
      await expect(page.getByRole("status").filter({ hasText: "Live refresh unavailable" })).toBeVisible()
      await expect.poll(() => cards.locator("h3").allTextContents()).toEqual(capabilityOrder)
      await expect(cards.locator(".trend-decision").filter({ hasText: "Insufficient trend evidence" })).toHaveCount(1)
    }
    expect(await scoresByRole(page)).toEqual(scores)
    await fitsViewport(page)
  })
}
