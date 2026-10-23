import {
  buildRoadmap,
  careerDefinitions,
  type ScenarioId,
  type CareerDefinition,
} from "./domain1"
import type { Trend } from "./trends"
import { decideTrend } from "./trendDecision"
import type {ReactNode} from 'react'

type Props = {
  trend: Trend | null
  trendControl: ReactNode
  roleId: CareerDefinition["id"]
  scenario: ScenarioId
  selected: string[]
  completed: string[]
  onToggle: (id: string) => void
  onProfileChange: (skills: string[]) => void
  scenarioControl: ReactNode
}
export function Pathway({
  roleId,
  trend,
  trendControl,
  scenario,
  selected,
  completed,
  onToggle,
  onProfileChange,
  scenarioControl,
}: Props) {
  const role =
    careerDefinitions.find((item) => item.id === roleId) ?? careerDefinitions[0]
  const phases = buildRoadmap(role.id, selected, scenario, trend)
  const steps = phases.flatMap((phase) => phase.steps)
  const done = steps.filter((step) => completed.includes(step.id)).length
  const next = steps.find((step) => !completed.includes(step.id))
  const estimatedHours = steps.reduce((sum, step) => sum + step.hours, 0)
  return (
    <div className="pathway-workspace">
      <header className="pathway-intro">
        <p className="pathway-context">
          {role.title} <span>Foundations</span>
        </p>
        <h1>
          {done === steps.length
            ? "A good start. Keep growing."
            : "One step closer."}
        </h1>
        <p>
          {next
            ? `Start with ${next.name}. A little practice makes the next step clearer.`
            : "You’ve checked off every step. Revisit your work and choose one artifact to improve."}
        </p>
        <p className="pathway-estimate">
          Suggested practice budget: {estimatedHours} hours, about{" "}
          {Math.ceil(estimatedHours / 3)} weeks at 3 hours/week. This is not the
          time needed to complete every linked course or become job-ready.
        </p>
      </header>
      {scenarioControl}
      <section className="mvp-panel"><h2>Evidence and learning priority</h2><p className="trend-decision">{role.id === "data" ? decideTrend(trend).explanation : "No current mapped trend evidence for this role. No direction inferred; scenario and prerequisite priorities apply."}</p></section>
      <details className="pathway-notes"><summary>Sources &amp; uncertainty</summary>{trendControl}</details>
      <details className="pathway-notes profile-editor">
        <summary>Update skills you have tried</summary>
        <p>
          Selections describe experience only. They do not verify proficiency or
          change your assessment evidence.
        </p>
        {role.skills.map((skill) => (
          <label key={skill.id}>
            <input
              type="checkbox"
              checked={selected.includes(skill.id)}
              onChange={() =>
                onProfileChange(
                  selected.includes(skill.id)
                    ? selected.filter((id) => id !== skill.id)
                    : [...selected, skill.id],
                )
              }
            />
            <span>
              {skill.name}
              <small>Self-reported</small>
            </span>
          </label>
        ))}
      </details>
      <section className="pathway-overview" aria-label="Learning progress">
        <div>
          <strong>
            {done} of {steps.length} complete
          </strong>
          <span>
            {done === steps.length ? "Ready for review" : "At your own pace"}
          </span>
        </div>
        <div
          className="pathway-track"
          role="progressbar"
          aria-label="Practice steps completed"
          aria-valuemin={0}
          aria-valuemax={steps.length}
          aria-valuenow={done}
        >
          <i style={{ transform: `scaleX(${done / steps.length})` }} />
        </div>
      </section>
      {phases.map((phase, phaseIndex) => {
        const startHours = phases
          .slice(0, phaseIndex)
          .flatMap((item) => item.steps)
          .reduce((sum, step) => sum + step.hours, 0)
        const phaseHours = phase.steps.reduce(
          (sum, step) => sum + step.hours,
          0,
        )
        return (
          <section className="roadmap-phase" key={phase.name}>
            <header>
              <h2>
                {phaseIndex + 1}. {phase.name}
              </h2>
              <p>
                Weeks {Math.floor(startHours / 3) + 1}–
                {Math.ceil((startHours + phaseHours) / 3)} · suggested{" "}
                {phaseHours} hours of practice
              </p>
            </header>
            <ol className="practice-steps">
              {phase.steps.map((step) => {
                const index = steps.indexOf(step)
                const complete = completed.includes(step.id)
                const current = next?.id === step.id
                return (
                  <li
                    key={step.id}
                    className={`${complete ? "is-complete" : ""} ${
                      current ? "is-current" : ""
                    }`}
                  >
                    <details
                      key={`${step.id}-${current}`}
                      open={current || undefined}
                    >
                      <summary>
                        <span className="step-number" aria-hidden="true">
                          {complete ? "✓" : index + 1}
                        </span>
                        <span className="step-heading">
                          <strong>{step.name}</strong>
                          <small>
                            {complete
                              ? "Completed"
                              : current
                                ? "Up next"
                                : selected.includes(step.id)
                                  ? "Review your experience"
                                  : "Build a foundation"}
                          </small>
                        </span>
                        <span className="step-chevron" aria-hidden="true">
                          ⌄
                        </span>
                      </summary>
                      <div className="practice-body">
                        <p>{step.description}</p>
                        <p>
                          <strong>Practice:</strong> {step.task}
                        </p>
                        <p>
                          <strong>Prerequisites:</strong>{" "}
                          {step.prerequisites.length
                            ? step.prerequisites
                                .map(
                                  (id) =>
                                    role.skills.find((item) => item.id === id)
                                      ?.name ?? id,
                                )
                                .join(", ")
                            : "None"}
                        </p>
                        {step.url ? (
                          <a
                            className="practice-resource"
                            href={step.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span>
                              {step.resource}
                              <small>
                                Free public material · estimated {step.hours}{" "}
                                hours for this practice task · checked 22
                                October 2026. Optional certificates or printed
                                books may cost extra.
                              </small>
                            </span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        ) : (
                          <p>{step.resource}. Keep the project fictional.</p>
                        )}
                        <p className="proficiency-note">
                          {selected.includes(step.id)
                            ? "You reported trying this skill. Proficiency is not verified; use this task to check your current level."
                            : "This is suggested practice. No proficiency has been verified."}
                        </p>
                        <button
                          className={`practice-complete ${
                            complete ? "complete" : ""
                          }`}
                          type="button"
                          aria-pressed={complete}
                          onClick={() => onToggle(step.id)}
                        >
                          {complete
                            ? "Mark as incomplete"
                            : "Mark practice complete"}
                          <span aria-hidden="true">{complete ? "↶" : "✓"}</span>
                        </button>
                      </div>
                    </details>
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}
      <details className="pathway-notes">
        <summary>How this plan is tailored</summary>
        <p>
          The selected role determines skills and prerequisite links. Your skill
          selections move tried topics behind gaps when prerequisites allow;
          reported skills remain unverified and receive a validation task.
          Completing a step is self-reported and does not change your match
          score or establish a qualification.
        </p>
        <p>
          {scenario === "accelerated"
            ? "This scenario prioritizes verification and communication steps when their prerequisites are ready."
            : "This scenario follows the role’s foundations and prerequisite order."}{" "}
          The rule is an editorial planning assumption, not a labor-market
          forecast. Use fictional practice data; progress clears when you
          reload.
        </p>
      </details>
    </div>
  )
}
