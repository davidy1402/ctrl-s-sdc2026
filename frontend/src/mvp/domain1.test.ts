import { test } from "node:test"
import assert from "node:assert/strict"
import { assess } from "./scoring"
import {
  adoptionScenarios,
  buildPathway,
  buildRoadmap,
  careerDefinitions,
  rankCareers,
} from "./domain1"

const exampleAnswers = [0, 0, 0, 0]

test("three evidence-backed roles produce deterministic explained scores and skill evidence", () => {
  assert.equal(careerDefinitions.length, 3)
  for (const role of careerDefinitions) {
    assert.match(role.sourceUrl, /^https:\/\//)
    assert.ok(role.source.length > 5)
  }
  const result = rankCareers(exampleAnswers, ["sql", "testing"], "assistive")
  assert.equal(result.kind, "complete")
  if (result.kind !== "complete") return
  assert.equal(result.rankings.length, 3)
  assert.deepEqual(
    result,
    rankCareers(exampleAnswers, ["sql", "testing"], "assistive"),
  )
  const data = result.rankings.find((item) => item.role.id === "data")
  assert.equal(data?.score, 76.1)
  assert.equal(data?.existingSkills[0].id, "sql")
  assert.ok(data?.missingSkills.some((skill) => skill.id === "visualization"))
  assert.match(data?.confidence ?? "", /Low/)
  assert.equal(
    data?.breakdown.reduce((sum, part) => sum + part.weight, 0).toFixed(8),
    "1.00000000",
  )
  assert.equal(rankCareers([0, 0, 0], [], "assistive").kind, "incomplete")
})

test("role and profile changes recalculate prerequisite-aware, source-linked pathways", () => {
  const data = buildPathway("data", [], "assistive")
  const software = buildPathway("software", [], "assistive")
  const triedSql = buildPathway("data", ["sql"], "assistive")
  assert.notDeepEqual(
    data.map((step) => step.id),
    software.map((step) => step.id),
  )
  assert.notDeepEqual(
    data.map((step) => step.id),
    triedSql.map((step) => step.id),
  )
  for (const role of careerDefinitions) {
    const ordered = buildPathway(role.id, [], "assistive")
    const indices = new Map(ordered.map((step, index) => [step.id, index]))
    for (const step of ordered) {
      assert.ok(step.hours > 0)
      assert.match(step.url, /^https:\/\//)
      for (const prerequisite of step.prerequisites)
        assert.ok(
          (indices.get(prerequisite) ?? Infinity) < indices.get(step.id)!,
        )
    }
    const phases = buildRoadmap(role.id, [], "assistive")
    assert.deepEqual(
      phases.map((phase) => phase.name),
      ["Foundation", "Specialization", "Capstone"],
    )
    assert.deepEqual(
      phases[2].steps[0].prerequisites,
      role.skills.map((skill) => skill.id),
    )
    assert.ok(phases[2].steps[0].task.includes("fictional"))
  }
})

test("every role and skill has a meaningful UN target mapping, labelled as proposed", () => {
  const targets = new Set(["4.4", "8.2", "9.5"])
  for (const role of careerDefinitions) {
    assert.ok(role.sdgs.length > 0)
    for (const mapping of role.sdgs) {
      assert.ok(targets.has(mapping.target))
      assert.ok(mapping.reason.length > 50)
      assert.match(mapping.reason, /proposed|may|can|when/i)
    }
    for (const skill of role.skills) {
      assert.equal(skill.sdg.target, "4.4")
      assert.ok(
        skill.sdg.reason.includes(skill.name.split(" ")[0].toLowerCase()) ||
          skill.sdg.reason.length > 70,
      )
    }
  }
})

test("scenario assumptions change score weights and learning priorities without changing assessment evidence", () => {
  assert.equal(adoptionScenarios.length, 2)
  const assistive = rankCareers(exampleAnswers, [], "assistive")
  const accelerated = rankCareers(exampleAnswers, [], "accelerated")
  assert.equal(assistive.kind, "complete")
  assert.equal(accelerated.kind, "complete")
  for (const entry of assistive.rankings) {
    const changed = accelerated.rankings.find(
      (item) => item.role.id === entry.role.id,
    )!
    assert.notEqual(entry.score, changed.score)
    assert.deepEqual(
      entry.breakdown.map((part) => part.signalScore),
      changed.breakdown.map((part) => part.signalScore),
    )
    assert.deepEqual(
      changed.breakdown.map((part) => part.signalScore),
      assess(exampleAnswers).signals.map((part) => part.score),
    )
  }
  assert.notDeepEqual(
    buildPathway("data", [], "assistive").map((step) => step.id),
    buildPathway("data", [], "accelerated").map((step) => step.id),
  )
  assert.equal(
    adoptionScenarios[1].limitation.includes("not a prediction"),
    true,
  )
})

test("all complete profiles and both scenarios produce bounded role scores; skill reports never verify ability", () => {
  for (let a = 0; a < 3; a++)
    for (let b = 0; b < 3; b++)
      for (let c = 0; c < 3; c++)
        for (let d = 0; d < 3; d++)
          for (const scenario of adoptionScenarios) {
            const noSkills = rankCareers([a, b, c, d], [], scenario.id)
            const reported = rankCareers(
              [a, b, c, d],
              careerDefinitions.flatMap((role) =>
                role.skills.map((skill) => skill.id),
              ),
              scenario.id,
            )
            for (const result of [noSkills, reported])
              for (const entry of result.rankings) {
                assert.ok(entry.score >= 0 && entry.score <= 100)
                assert.match(
                  entry.confidence,
                  /no task performance or verified proficiency/,
                )
              }
            assert.deepEqual(
              noSkills.rankings.map((item) => item.score),
              reported.rankings.map((item) => item.score),
            )
          }
})
