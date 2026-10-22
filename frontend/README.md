# Aiversecity functional MVP

This branch keeps the Figma-integrated React/Vite interface and connects one synthetic explorer’s assessment, explainable career shortlist, role pathway, SDG mapping, and scenario comparison in one session. Use a fictional alias and synthetic answers only. The assessment and progress clear when the page reloads.

## Run

Node 22.12+ or 24, npm:

```sh
npm ci
npm run dev
npm test
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

The demo journey is: begin → choose context → mark skills tried → answer four workplace scenarios → inspect response evidence → compare three career matches → choose a role → follow the pathway. Scenario controls on the recommendation and pathway screens recalculate scores and learning order. Relative role ordering may remain the same. Self-reported skills remain unverified.

## Feature 3: role matching

`src/mvp/scoring.ts` remains the fixed editorial assessment matrix. Three response dimensions are normalized to 0–100; the motivation question (Q2) contributes no points. `src/mvp/domain1.ts` combines those same signals with role-specific weights and shows each signal, weight, and weighted contribution. The resulting 0–100 score is an **exploration alignment score**, never an employment probability, hiring chance, or forecast. Skills selected in the intake do not add score points; they appear as self-reported evidence and shape the pathway. Confidence is low because this demo observes choices only and does not validate performance.

Supported roles and occupational evidence:

- Data Analyst: task evidence from [O*NET Business Intelligence Analysts (15-2051.01)](https://www.onetonline.org/link/summary/15-2051.01), a related occupation. O*NET lists querying data repositories, reports, trend analysis, and stakeholder communication. This is a broad role label, not a claim that every Data Analyst job has identical requirements.
- Software Developer: [U.S. Bureau of Labor Statistics occupation profile](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm), including needs analysis, design, testing, maintenance, and documentation. The profile is U.S.-based.
- Operations Research Analyst: [U.S. Bureau of Labor Statistics occupation profile](https://www.bls.gov/ooh/math/operations-research-analysts.htm), including mathematical analysis for operational decisions. The profile is U.S.-based.

These sources support role task descriptions, not individual fit, Malaysian demand, or entry requirements for a specific employer.

The base weights below follow the existing matrix dimension order. They are editorial choices, not values estimated from the occupation sources. Scores are rounded to one decimal; equal scores share rank, with alphabetical display order.

| Role | Analytical reasoning | Evidence checking | Collaborative explanation |
| --- | --- | --- | --- |
| Data Analyst | 0.45 | 0.40 | 0.15 |
| Software Developer | 0.40 | 0.20 | 0.40 |
| Operations Research Analyst | 0.50 | 0.35 | 0.15 |

## Feature 4: reskilling pathways

The selected role determines its Foundation → Specialization → Capstone roadmap, prerequisite links, task prompts, and resource links. The selected skill profile moves tried topics later within a phase when prerequisites allow. Self-report does not bypass prerequisites or verify proficiency. The pathway has an inline skill editor and scenario controls, so either change immediately recalculates the plan. The capstone combines all role skills in one fictional project.

Time estimates budget selected practice tasks at a suggested three hours/week. They are local estimates, not course-provider durations, full course completion times, or promises of job readiness. Resources include free public material from PostgreSQL, LibreOffice, OpenStax, MDN, Node.js, Harvard CS50 OpenCourseWare, and Google OR-Tools. Certificates and printed books may cost extra. Resource access and terms can change. See the [evidence review](../docs/research/DOMAIN1-EVIDENCE-2026-10-22.md).

The demo uses fictional datasets in practice prompts. Completing a step is self-reported and does not change assessment scores or confirm mastery.

## Feature 5: SDG mapping

Every listed role and pathway skill has a target and an explanation in the interface. Role-level connections use [UN Target 4.4](https://sdgs.un.org/goals/goal4) for technical learning, [Target 8.2](https://sdgs.un.org/goals/goal8) for conditional productivity pathways, and [Target 9.5](https://sdgs.un.org/goals/goal9) for conditional technology and research capability. Every skill is mapped to Target 4.4 because the pathway practices technical abilities relevant to employment, with a reason specific to that skill.

All SDG statements are proposed contribution pathways. The demo measures no learning outcomes, employment, productivity, innovation, or SDG indicators and does not imply UN endorsement.

## Feature 6: uncertainty and scenarios

Two qualitative assumptions are implemented; neither is a forecast or probability:

- **AI assists selected tasks:** preserves each role’s base rubric weights and follows foundations/prerequisites.
- **More task steps are automated:** multiplies the role weights for analytical reasoning, evidence checking, and collaborative explanation by `0.75`, `1.15`, and `1.30`, then normalizes. Among pathway skills whose prerequisites are ready, the order favors verification and communication topics using documented `scenarioPriority` values.

This transparent weighting is an editorial decision about what to emphasize under a hypothetical, not empirical evidence that specific jobs or tasks will change. It can change scores and ranking but does not change the underlying answer evidence. The [ILO Working Paper 140](https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure) is included only as global task-exposure context; exposure does not establish job loss.

Pathway ordering always respects prerequisites and places Foundation before Specialization. Among ready steps in the same phase, the accelerated scenario first uses the priorities below, then favors skills without a self-report, then uses catalog order. In the assistive scenario, it uses self-report and catalog order without the scenario priority. Capstone follows all skill practice. Reported experience never bypasses a prerequisite.

| Role | Priority 0 | Priority 1 | Priority 2 |
| --- | --- | --- | --- |
| Data Analyst | Data preparation, visualization | Statistical reasoning | SQL queries |
| Software Developer | Debugging, testing | System design | Programming foundations |
| Operations Research Analyst | Model validation, optimization | Model formulation | Python for analysis |

## Trend integration and limitations

The dated [BLS Data Scientists snapshot](public/data/trend.json) and `/api/trends` refresh flow are retained. The endpoint now runs in Vite development/preview as well as Vercel, with a 30-minute cache. A successful response carries its original retrieval timestamp; stale fallback keeps that timestamp and reports the failed refresh. The source publication date and retrieval time are displayed separately. Vite binds to `0.0.0.0` and honors `PORT` for a hosted development environment.

**BLS is U.S. scope** and Data Scientists is a related-occupation proxy for Data Analyst; it is not Malaysian demand or an individual forecast. Trend data is separate context and does not change role scores or pathways. If no live record can be retrieved, the client retains the dated snapshot or reports insufficient trend evidence. This is an updatable source for long-range employment projections, not a real-time Malaysian AI labor index.

This is an unvalidated educational exploration prototype. The rubric and scenario assumptions have not been validated with users or employers. Only three role profiles are supported. Self-reported skills, task completion, estimated learning time, and free access are not independently certified. Sources describe occupations or learning content, not local hiring demand. There is no runtime AI model, personal CV, database, persistence, authentication, or GPU/RunPod workload. Product direction, scoring weights, accessibility with target users, and competition-specific platform compliance still need team review. No claims of Replit usage, user research, Malaysian demand, career success, or measured impact are made.

## Source and disclosure notes

Occupation, SDG, and learning references were checked 22 October 2026; duration values are local estimates. Rania’s proposed e-LATiH links returned HTTP 405 during verification, so their exact content, suitability, and price remain unconfirmed and are not presented as verified course evidence. No Python/Pandas backend, headline-derived disruption index, six-dimension assessment replacement, or RunPod placeholder has been added.

The team must review and understand this contribution and include the actual development assistance from OpenAI Codex (GPT-6 family) in the required declarations. No runtime model is used. See the repository’s competition notes for unresolved sponsor and deadline questions.
