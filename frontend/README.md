# Aiversecity functional MVP

Preserves the Figma-integrated React/Vite interface from `codex/aiversecity-ui-integration`. This branch adds the first supported Data Analyst exploration flow. Product choices and the editorial rubric still require team review.

## Run

Node 22.12+ or 24, npm:

```sh
cd frontend
npm ci
npm run dev
npm test
npm run typecheck
npm run build
```

Use a fictional alias and synthetic answers only. Begin journey → choose context → optionally select tried skills → answer four questions → capability evidence → Data Analyst → learning pathway / AI outlook. Dashboard preview without answers must show insufficient evidence. Refreshing the page intentionally clears profile and progress.

## Scoring and recommendation

`src/mvp/scoring.ts` owns version 1.0 of an **editorial exploration rubric, not a validated skill or psychometric test**. Three scenario choices contribute fixed 0–3 dimension points. Q2 is motivation only and has zero weight. Each dimension is normalized against its possible maximum. Data Analyst alignment combines analytical reasoning (40%), evidence checking (40%), and collaborative explanation (20%), rounded to an integer. Each point contribution and the denominator are visible. Confidence is low for every profile because choices are self-described and no task performance has been observed. No latency measurement and no runtime AI scoring.

This is one-role exploration, not a claim to rank a career market. The recommendation requires a complete valid assessment and a valid dated trend record. Positive related growth yields “worth exploring”; zero/negative yields caution. The trend is context, never personal success probability. Changing the source does not change capability scores. Self-reported skills reorder learning topics only; no skill is treated as verified. Mission completion is self-reported and does not change scores.

## Updatable sources

`public/data/trend.json` is a reviewed BLS snapshot. The UI shows its publication/check dates, geography, attribution and limitation. **BLS Data Scientists is a related occupation proxy; it is not Malaysian Data Analyst demand.** `api/trends.ts` fetches the fixed public official BLS page on Vercel, extracts current projection/period/source update date, validates them and returns JSON. No secrets or assessment payloads are sent. A one-hour shared cache limits upstream requests. Failed refreshes preserve the last dated record and visibly report failure.

For a reviewed snapshot update:

```sh
npm run refresh:trends
```

The script fetches the actual BLS page and writes only after successful parsing. Review the diff, dates, geography and occupation before committing. If markup changes, parsing fails closed; do not replace missing data with guessed statistics. Local plain Vite does not run Vercel functions: refresh reports unavailable there; the bundled snapshot still works. `vercel dev` or a Vercel preview runs the endpoint.

Sources checked 21 October 2026:

- [BLS Data Scientists](https://www.bls.gov/ooh/math/data-scientists.htm): live projection and related work/qualities; U.S. federal public information. Metadata is stored with the record. A forecast, not measured future outcomes.
- [ILO Working Paper 140](https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure), 20 May 2025: global exposure context. Original summary/link only; no full-text redistribution. Exposure does not establish job loss.
- [SQLBolt](https://sqlbolt.com/) and [pandas tutorials](https://pandas.pydata.org/docs/getting_started/intro_tutorials/): external learning links; no course content copied, no completion/cost/accreditation promises.
- [UN Goal 4](https://sdgs.un.org/goals/goal4), target 4.4, and [Goal 8](https://sdgs.un.org/goals/goal8), target 8.2: proposed links to skills practice and evidence-informed work. No measured SDG impact.

Three adoption scenarios are qualitative team-review assumptions with no probabilities or invented forecasts. Source context is shared across them; scenario selection never changes underlying skill evidence. Original skill-card outlook copy remains explicitly illustrative; sourced context is in the AI outlook and recommendation panels.

## Deployment and disclosure

Deploy the `frontend` root to Vercel as Vite, output `dist`, Node 24, build `npm run build`. The API endpoint is `/api/trends`. No database/authentication is needed for this session-only synthetic demo. No runtime model, model API, GPU or RunPod work is used. Development assistance: OpenAI Codex (GPT-6 family; exact backend release not exposed), plus the existing Figma UI export. The team must review/understand this contribution and include actual tool use in both formal declarations. This implementation does not establish completed Replit usage, sponsor compliance, user research, validated skill scores, or submission readiness. Replit proof and the unresolved sponsor/API rule still need team follow-up.
