import { assess } from "./scoring"
import { NewsContext } from "./NewsContext"
import {
  adoptionScenarios,
  careerDefinitions,
  rankCareers,
  type ScenarioId,
  type CareerDefinition,
} from "./domain1"
import type { Trend } from "./trends"

export function Evidence({ answers }: { answers: number[] }) {
  const result = assess(answers)
  if (result.kind === "incomplete")
    return (
      <section className="mvp-panel">
        <h2>Insufficient evidence</h2>
        <p>
          Complete all four assessment responses before receiving a
          recommendation. This preview has no assessed profile.
        </p>
      </section>
    )
  return (
    <section className="mvp-panel">
      <h2>Your response evidence</h2>
      <p>
        These are exploration signals from an editorial rubric, not verified
        proficiency and not a probability of employment. Q2 is a motivation
        question and contributes no points.
      </p>
      {result.signals.map((signal) => (
        <article key={signal.name}>
          <h3>
            {signal.name} · {signal.score}/100
          </h3>
          <p>
            {signal.total} of {signal.maximum} possible points
          </p>
          <meter min="0" max="100" value={signal.score}>
            {signal.score}
          </meter>
          <p>{signal.evidence.join("; ")}</p>
          <small>{signal.confidence}</small>
        </article>
      ))}
    </section>
  )
}

export function ScenarioSelector({
  scenario,
  onChange,
}: {
  scenario: ScenarioId
  onChange: (value: ScenarioId) => void
}) {
  const selected = adoptionScenarios.find((item) => item.id === scenario)!
  return (
    <section className="scenario-control" aria-label="AI adoption assumptions">
      <h2>Compare AI adoption scenarios</h2>
      <div className="scenario-tabs">
        {adoptionScenarios.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={scenario === item.id}
            className={scenario === item.id ? "active" : ""}
            onClick={() => onChange(item.id)}
          >
            <strong>{item.name}</strong>
            <small>{item.horizon}</small>
          </button>
        ))}
      </div>
      <p role="status">{selected.summary}</p>
      <small>{selected.limitation}</small>
    </section>
  )
}

export function RoleMatches({
  answers,
  selectedSkills,
  scenario,
  onSelect,
}: {
  answers: number[]
  selectedSkills: string[]
  scenario: ScenarioId
  onSelect: (roleId: CareerDefinition["id"]) => void
}) {
  const result = rankCareers(answers, selectedSkills, scenario)
  if (result.kind === "incomplete")
    return (
      <section className="mvp-panel">
        <h2>Complete the assessment first</h2>
        <p>Role rankings need all four synthetic assessment responses.</p>
      </section>
    )
  return (
    <section className="role-match-list" aria-labelledby="role-match-heading">
      <div className="role-match-heading">
        <div>
          <span className="eyebrow">DETERMINISTIC EXPLORATION RUBRIC</span>
          <h2 id="role-match-heading">Career matches to explore</h2>
        </div>
        <p>
          Scores compare your response pattern with role-specific rubric
          weights. They are not employment probabilities, hiring odds, or
          forecasts.
        </p>
      </div>
      {result.rankings.map((item) => (
        <article
          className={`role-match-card ${item.role.id}`}
          key={item.role.id}
        >
          <div className="role-match-top">
            <span className="role-match-rank">
              {String(
                result.rankings.findIndex(
                  (other) => other.score === item.score,
                ) + 1,
              ).padStart(2, "0")}
            </span>
            <div>
              <h3>{item.role.title}</h3>
              <p>{item.role.summary}</p>
            </div>
            <strong className="role-match-score">
              {item.score}
              <small>/100</small>
            </strong>
          </div>
          <details className="role-match-details">
            <summary>Why this score · evidence and skills</summary>
            <p className="role-match-confidence">{item.confidence}</p>
            <p className="role-match-confidence">Each row shows signal × role weight = contribution. Display values are rounded; the score uses the unrounded contributions.</p>
            <ul className="score-breakdown">
              {item.breakdown.map((part) => (
                <li key={part.dimension}>
                  <span>{part.dimension}</span>
                  <b>
                    {part.signalScore} × {Math.round(part.weight * 100)}% ={" "}
                    {part.contribution.toFixed(1)}
                  </b>
                </li>
              ))}
            </ul>
            <div className="role-skill-evidence">
              <div>
                <h4>Skills you reported trying</h4>
                {item.existingSkills.length ? (
                  <ul>
                    {item.existingSkills.map((skill) => (
                      <li key={skill.id}>
                        {skill.name} <small>Self-reported; not verified</small>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    No matching skills reported. That is unknown evidence, not
                    proof of a gap.
                  </p>
                )}
              </div>
              <div>
                <h4>Skills to explore</h4>
                {item.missingSkills.length ? (
                  <ul>
                    {item.missingSkills.map((skill) => (
                      <li key={skill.id}>{skill.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    You reported trying each listed skill. A task is still
                    needed to check proficiency.
                  </p>
                )}
              </div>
            </div>
            <p className="role-source-note">
              {item.role.sourceNote}{" "}
              <a href={item.role.sourceUrl} target="_blank" rel="noreferrer">
                Review occupation source
              </a>
            </p>
          </details>
          <button
            className="role-match-action"
            type="button"
            onClick={() => onSelect(item.role.id)}
          >
            Explore this pathway<span aria-hidden="true">↗</span>
          </button>
        </article>
      ))}
      <p className="role-match-method">
        Scenario:{" "}
        <strong>
          {scenario === "assistive"
            ? "AI assists selected tasks"
            : "More task steps are automated"}
        </strong>
        . The scenario changes dimension weights and learning priorities. Role
        ordering may stay the same; equal scores share a rank. The underlying
        answer matrix stays fixed.
      </p>
    </section>
  )
}

export function TrendPanel({
  trend,
  status,
  refresh,
}: {
  trend: Trend | null
  status: string
  refresh: () => void
}) {
  return (
    <section className="mvp-panel">
      <h2>Job signal & source</h2>
      <p role="status">{status}</p>
      <button
        type="button"
        onClick={refresh}
        disabled={status.startsWith("Refreshing")}
      >
        Refresh from BLS
      </button>
      {trend ? (
        <>
          <p>
            <a href={trend.url} target="_blank" rel="noreferrer">
              {trend.source}
            </a>
          </p>
          <p>
            {trend.growthPercent}% projected employment growth · {trend.period}{" "}
            · geography: {trend.geography}
          </p>
          <p>
            Source updated {trend.published} · checked {trend.checked}
          </p>
          <p>
            {trend.retrievedAt
              ? `Fetched ${new Date(trend.retrievedAt).toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" })} MYT · ${trend.cacheStatus==='stale' ? 'offline fallback' : 'retrieval timestamp; cached responses may apply'}`
              : "Dated reviewed snapshot; no live retrieval claimed."}
          </p>
          <p>
            {trend.limitation} This series is background context for the Data
            Analyst exploration and does not supply employment probabilities or
            change the other roles’ scores.
          </p>
          <small>
            Live retrievals are cached for 30 minutes. {trend.license}
          </small>
        </>
      ) : (
        <p>Trend evidence unavailable; no demand conclusion can be made.</p>
      )}
      <p>
        <a
          href="https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure"
          target="_blank"
          rel="noreferrer"
        >
          ILO Working Paper 140 · 20 May 2025
        </a>{" "}
        · global task-exposure context; exposure does not establish job loss.
        Scenarios are qualitative assumptions without probabilities.
      </p>
      <NewsContext />
    </section>
  )
}

export function SdgMapping({roleId}:{roleId?:CareerDefinition['id']}) {
  const roles=roleId ? careerDefinitions.filter(role=>role.id===roleId) : careerDefinitions
  return (
    <section className="mvp-panel sdg-mapping">
      <h2>Proposed SDG connections</h2>
      <p>
        Each link describes a possible contribution pathway. These are not
        measured impacts, SDG endorsements, or outcomes from this demo.
      </p>
      {roles.map((role) => (
        <article key={role.id}>
          <details open={roleId ? true : undefined}><summary>{role.title}</summary>
          <ul>
            {role.sdgs.map((mapping) => (
              <li key={mapping.target}>
                <a
                  href={`https://sdgs.un.org/goals/goal${mapping.target.split(".")[0]}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Target {mapping.target}
                </a>
                : {mapping.reason}
              </li>
            ))}
          </ul>
          <h4>Skills in this pathway</h4>
          <ul>
            {role.skills.map((skill) => (
              <li key={skill.id}>
                <strong>{skill.name}</strong> ·{" "}
                <a
                  href="https://sdgs.un.org/goals/goal4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Target {skill.sdg.target}
                </a>
                : {skill.sdg.reason}
              </li>
            ))}
          </ul>
          </details>
        </article>
      ))}
      <small>
        Potential contribution only. No participation, employment, productivity,
        innovation, or SDG indicators have been measured.
      </small>
    </section>
  )
}
