# Trend evidence → exploration → practice

Reviewed implementation: 23 October 2026 MYT. This is a deterministic educational rule, not a trained AI/ML model or an employment forecast. Team review and user validation remain necessary.

## Separate evidence channels

1. Four fictional assessment responses produce the existing three capability signals. Role weights and the selected qualitative adoption scenario produce a 0–100 exploration alignment score. Neither trend values nor headlines add points.
2. The live BLS Data Scientists page supplies a dated U.S. employment projection, used only as a related-occupation proxy for Data Analyst. The source URL, publication date, projection horizon, original retrieval time and limitation travel with the record. No Malaysian demand, individual hiring chance, causal AI effect or demand direction for the other two occupations is inferred.
3. UN News and MOSTI RSS are contextual reading. Headline counts and source selection never alter a score or trend decision. MOSTI announcements are not hiring observations. The two adoption scenarios remain explicit hypothetical assumptions, separate from refreshed evidence.

## Rule v1

A record is active only if its validated fixed source/scope matches the BLS endpoint, its retrieval time (or reviewed snapshot `checked` date) is at most 30 days old and not future dated, its publication is at most 550 days old and not future dated, the projection horizon includes the current UTC year, and its cache is not marked stale. The 30-day/550-day windows are conservative editorial review policies, not statistically calibrated confidence intervals. A dated local snapshot is clearly identified and can be active within these windows without claiming a live fetch.

| Active projection | Exploration order | Data Analyst practice |
| --- | --- | --- |
| Greater than zero | Investigate Data Analyst before the other options, then order the others by capability score | Prioritize Statistical reasoning among ready Foundation skills, to practise interpreting a projection and its uncertainty |
| Less than zero | Investigate Data Analyst after the other options; review proxy transferability before committing | Default prerequisite plan; no skill decline inferred |
| Zero | Capability order | Default prerequisite plan |
| Missing, stale, invalid or outside date/horizon window | Capability order; no trend direction inferred | Default prerequisite plan |

These ordinal choices are deliberately simple editorial investigation policies, not measured relative demand or role suitability. Scores remain visible and unchanged for a fixed answer/scenario. Number badges describe exploration order. A role with no mapped evidence is **unknown**, never automatically declining. This narrow proxy can warrant checking one option; it cannot support a comprehensive Malaysian labour ranking. Users can choose any of the three pathways regardless of order.

Skill priority is a pedagogical consequence of examining evidence, **not** an empirical claim that demand for statistical reasoning increased. Prerequisites and Foundation → Specialization → Capstone order always take precedence. Trend priority precedes scenario, self-report and catalog tie-breaks among ready skills. Self-reported skill experience never verifies competence or bypasses prerequisites. The UI explains the source-to-policy-to-output link next to each recommendation and in the pathway.

## Refresh and failure

Manual Refresh from BLS calls the real endpoint. A 30-minute process cache may return the same evidence: clicking refresh is not proof of a changed upstream projection. When validated evidence actually changes, React recalculates exploration order and learning priorities in the same session, including on the pathway screen. Capability signals, selected skills, scenario and practice completion remain independent. Cache expiry does not invent a new publication date.

A server stale fallback or failed browser request retains historical evidence for display, marks it inactive, and removes trend adjustments. Invalid payloads never replace trusted records. An unavailable snapshot yields no trend evidence. Source markup changes fail closed. The upstream parser accepts both growing and declining projections; unsupported wording requires manual review rather than guessed values. No background polling, scraping arbitrary URLs, paid API, GPU, persistent user storage or runtime LLM is introduced.

## Evidence and acceptance

`trendDecision.test.ts` exercises freshness, horizon, missing evidence, decline parsing, two synthetic evidence versions, unchanged capability scores and prerequisites. `e2e/trend-feedback.spec.ts` uses explicitly fictional A/B projections to show the full refresh interaction across mobile, tablet and desktop; these fixtures are **not** actual BLS revisions. Separate live HTTP checks must record the actual record and timestamp, and may show no change. See the submission evidence/status checklist for actual pass/fail results and unresolved platform/official steps.

Official baseline: Domain 1 PDF §3 (PDF page 4), §7 (page 7), and Feasibility of Build (page 8) require a traceable trend signal feeding role matching and visible output changes when evidence changes. They do not validate this editorial policy. The rule meets the narrow technical feedback requirement for team review; limited geography, proxy transfer and the absence of user/employer validation remain material limitations.
