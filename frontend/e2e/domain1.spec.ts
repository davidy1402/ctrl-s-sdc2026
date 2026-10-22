import { test, expect, type Page } from "@playwright/test"
import { newsSources } from "../src/mvp/news"

async function fitsViewport(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true)
}

test("synthetic assessment → career matches → role pathway → scenarios and profile changes", async ({
  page,
}, testInfo) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  // This test intentionally simulates a failed live fetch. It does not claim live data verification.
  await page.route("**/api/trends", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Simulated offline source" }),
    }),
  )
  const newsCalls = { global: 0, malaysia: 0 }
  await page.route("**/api/news?*", (route) => {
    const scope =
      new URL(route.request().url()).searchParams.get("scope") === "malaysia"
        ? "malaysia"
        : "global"
    newsCalls[scope]++
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        scope,
        source: newsSources[scope].name,
        feedUrl: newsSources[scope].url,
        retrievedAt: "2026-10-22T10:00:00.000Z",
        cacheStatus: newsCalls[scope] > 1 ? "stale" : "fresh",
        items:
          scope === "global"
            ? [
                {
                  title: "AI and skills — synthetic browser fixture",
                  url: "https://news.un.org/en/synthetic-test",
                  publishedAt: "2026-10-21T09:00:00.000Z",
                },
              ]
            : [],
      }),
    })
  })
  await page.goto("/")
  await page.getByRole("button", { name: "Begin your journey" }).click()
  await page.getByRole("button", { name: /Student Exploring/ }).click()
  await page.getByPlaceholder("e.g. Demo Explorer").fill("Synthetic Explorer")
  await page.getByRole("button", { name: "Continue", exact: true }).click()
  await page.getByRole("button", { name: "Skip for now" }).click()
  await page.getByRole("button", { name: "Start assessment" }).click()
  for (let question = 0; question < 4; question++) {
    await page.locator(".answer-list button").first().click()
    await page
      .getByRole("button", {
        name: question === 3 ? "Complete assessment" : "Next scenario",
      })
      .click()
  }
  await page.getByRole("button", { name: "View capability profile" }).click()
  await expect(
    page.getByRole("heading", { name: "Your response evidence" }),
  ).toBeVisible()
  await page.getByRole("button", { name: "Explore career matches" }).click()
  await expect(page.locator(".role-match-card")).toHaveCount(3)
  const data = page.locator(".role-match-card").filter({
    has: page.getByRole("heading", { name: "Data Analyst", exact: true }),
  })
  await data.getByText("Why this score · evidence and skills").click()
  await expect(data.getByText(/Low — self-described/)).toBeVisible()
  await expect(
    data.getByRole("link", { name: "Review occupation source" }),
  ).toHaveAttribute(
    "href",
    "https://www.onetonline.org/link/summary/15-2051.01",
  )
  await expect(page.locator(".sdg-mapping article")).toHaveCount(3)
  await page
    .locator(".sdg-mapping summary")
    .filter({ hasText: "Data Analyst" })
    .click()
  await expect(
    page.locator(".sdg-mapping").getByText(/Practising querying/),
  ).toBeVisible()
  await fitsViewport(page)
  await page.screenshot({
    path: testInfo.outputPath("matches.png"),
    fullPage: true,
  })
  const news = page.locator(".news-context")
  await expect(
    news.getByRole("link", {
      name: "AI and skills — synthetic browser fixture",
    }),
  ).toBeVisible()
  await expect(news).toContainText("Fetch time is not publication time")
  const scoresBeforeNews = await page
    .locator(".role-match-score")
    .allTextContents()
  await news
    .getByRole("combobox", { name: "News context" })
    .selectOption("malaysia")
  await expect(news).toContainText("No matching headlines")
  await expect(news).toContainText("not a hiring feed")
  await expect(news.getByRole("link", { name: /TalentCorp/ })).toBeVisible()
  await news
    .getByRole("combobox", { name: "News context" })
    .selectOption("global")
  await expect(news).toContainText("offline fallback")
  await expect(news.locator("time").first()).toHaveAttribute(
    "datetime",
    "2026-10-22T10:00:00.000Z",
  )
  expect(await page.locator(".role-match-score").allTextContents()).toEqual(
    scoresBeforeNews,
  )
  await fitsViewport(page)
  await news.screenshot({ path: testInfo.outputPath("news-context.png") })
  const initialScores = await page
    .locator(".role-match-score")
    .allTextContents()
  await page
    .getByRole("button", { name: /More task steps are automated/ })
    .click()
  expect(await page.locator(".role-match-score").allTextContents()).not.toEqual(
    initialScores,
  )
  await data.getByRole("button", { name: "Explore this pathway" }).click()
  await expect(
    page.getByRole("heading", { name: "Data Analyst", exact: true }),
  ).toBeVisible()
  await page.getByRole("button", { name: "Start beginner pathway" }).click()
  await expect(page.locator(".roadmap-phase")).toHaveCount(3)
  await expect(page.locator(".step-heading strong").first()).toHaveText(
    "Statistical reasoning",
  )
  await expect(
    page.locator(".roadmap-phase").last().getByRole("heading"),
  ).toHaveText("3. Capstone")
  await page.getByRole("button", { name: /AI assists selected tasks/ }).click()
  await expect(page.locator(".step-heading strong").first()).toHaveText(
    "SQL queries",
  )
  await page.getByText("Update skills you have tried", { exact: true }).click()
  await page.getByRole("checkbox", { name: /SQL queries/ }).check()
  await expect(page.locator(".step-heading strong").first()).toHaveText(
    "Statistical reasoning",
  )
  await page
    .getByRole("button", { name: "Mark practice complete", exact: true })
    .first()
    .click()
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "1",
  )
  await fitsViewport(page)
  await page.screenshot({
    path: testInfo.outputPath("pathway.png"),
    fullPage: true,
  })
  await page.getByRole("button", { name: "Change career" }).click()
  await page.getByRole("button", { name: "Refresh from BLS" }).click()
  await expect(
    page.getByRole("status").filter({ hasText: "Live refresh unavailable" }),
  ).toBeVisible()
  await expect(
    page.getByText("Dated reviewed snapshot; no live retrieval claimed."),
  ).toBeVisible()
  const software = page.locator(".role-match-card").filter({
    has: page.getByRole("heading", {
      name: "Software Developer",
      exact: true,
    }),
  })
  await software.getByRole("button", { name: "Explore this pathway" }).click()
  await page.getByRole("button", { name: "Start beginner pathway" }).click()
  await expect(page.locator(".pathway-context")).toContainText(
    "Software Developer",
  )
  await expect(page.locator(".step-heading strong").first()).toHaveText(
    "Programming foundations",
  )
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "0",
  )
  expect(errors).toEqual([])
})

test("preview cannot generate matches or enter an assessed pathway", async ({
  page,
}) => {
  await page.goto("/")
  await page
    .getByRole("button", { name: "Explore the app", exact: true })
    .click()
  await page.locator(".continue-card").click()
  await expect(
    page.getByRole("heading", { name: "Complete the assessment first" }),
  ).toBeVisible()
  await expect(page.locator(".role-match-card")).toHaveCount(0)
})

test("initial news outage shows insufficient context rather than invented headlines", async ({
  page,
}) => {
  await page.route("**/api/news?*", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Synthetic outage" }),
    }),
  )
  await page.goto("/")
  await page
    .getByRole("button", { name: "Explore the app", exact: true })
    .click()
  await page.locator(".continue-card").click()
  const news = page.locator(".news-context")
  await expect(news).toContainText(
    "News unavailable. No recent-news evidence can be shown.",
  )
  await expect(news.locator(".news-headlines li")).toHaveCount(0)
  await expect(news.getByRole("button", { name: "Refresh news" })).toBeEnabled()
  await expect(page.locator(".role-match-card")).toHaveCount(0)
  await fitsViewport(page)
})
