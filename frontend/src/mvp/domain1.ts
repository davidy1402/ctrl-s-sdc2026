import { assess } from "./scoring"
import type { Trend } from "./trends"
import { decideTrend } from "./trendDecision"

export type ScenarioId = "assistive" | "accelerated"

export const adoptionScenarios = [
  {
    id: "assistive",
    name: "AI assists selected tasks",
    horizon: "Routine drafting and lookup are supported",
    summary:
      "Assume people retain workflow ownership while AI helps with selected routine steps. Role scores use the standard role weights; learning follows foundations and prerequisites.",
    limitation:
      "A qualitative planning assumption. Adoption differs by team and task; this is not a forecast.",
  },
  {
    id: "accelerated",
    name: "More task steps are automated",
    horizon: "Review and human decisions carry more weight",
    summary:
      "Assume more routine steps are automated. The matching rubric raises the relative weight of evidence checking and collaborative explanation, while reducing analytical-reasoning weight. Pathways prioritize verification and communication among steps whose prerequisites are ready.",
    limitation:
      "A deliberately contrasting scenario, not a prediction or probability. The rule is an editorial assumption about task priorities.",
  },
] as const

export type SkillDefinition = {
  id: string
  name: string
  description: string
  prerequisites: string[]
  hours: number
  task: string
  resource: string
  url: string
  sdg: {
    target: "4.4"
    reason: string
  }
  scenarioPriority: number
}

export type CareerDefinition = {
  id: "data" | "software" | "operations"
  title: string
  summary: string
  source: string
  sourceUrl: string
  sourceNote: string
  workExamples: string[]
  capstone: {
    task: string
    hours: number
  }
  weights: [number, number, number]
  skills: SkillDefinition[]
  sdgs: {
    target: "4.4" | "8.2" | "9.5"
    reason: string
  }[]
}

const technicalSkillSdg = (practice: string): SkillDefinition["sdg"] => ({
  target: "4.4",
  reason: `Practising ${practice} builds a technical capability that can be relevant to employment; this is a proposed learning contribution, not an employment outcome.`,
})

export const careerDefinitions: CareerDefinition[] = [
  {
    id: "data",
    title: "Data Analyst",
    summary:
      "Prepare, examine, and explain information so people can make better-informed decisions.",
    source: "O*NET OnLine · Business Intelligence Analysts (15-2051.01)",
    sourceUrl: "https://www.onetonline.org/link/summary/15-2051.01",
    sourceNote:
      "Related occupation evidence for this broad Data Analyst label: O*NET lists querying data repositories, preparing reports, analysing trends, and communicating findings. Job titles and local requirements vary.",
    workExamples: [
      "Query data and prepare reports for review.",
      "Identify patterns or trends in available information.",
      "Explain findings and possible actions to stakeholders.",
    ],
    capstone: {
      task: "Create a short report from fictional sales tables: include a checked query, a cleaning log, a chart, and a paragraph explaining uncertainty. Ask a teammate to review the checks.",
      hours: 4,
    },
    weights: [0.45, 0.4, 0.15],
    sdgs: [
      {
        target: "4.4",
        reason:
          "A role-specific learning pathway can build technical and vocational skills relevant to employment (Target 4.4). That contribution is proposed, not measured.",
      },
      {
        target: "8.2",
        reason:
          "When used by an organisation, analysis may inform productivity improvements and technology adoption; the role alone does not establish such an outcome.",
      },
    ],
    skills: [
      {
        id: "sql",
        name: "SQL queries",
        description:
          "Ask clear questions of a relational dataset and check the returned rows.",
        prerequisites: [],
        hours: 3,
        task: "Query a fictional orders table, filter by date, and join it to a fictional products table. Explain one check you used to validate the result.",
        resource: "PostgreSQL tutorial: querying a table",
        url: "https://www.postgresql.org/docs/current/tutorial-select.html",
        sdg: technicalSkillSdg("querying and validating tabular data"),
        scenarioPriority: 2,
      },
      {
        id: "excel",
        name: "Tabular data preparation",
        description:
          "Organize and clean tabular information before interpreting it.",
        prerequisites: ["sql"],
        hours: 3,
        task: "Use a synthetic CSV of the fictional orders from your SQL step. Clean it, record how you handled missing values, and compare the row count before and after cleaning.",
        resource: "LibreOffice Calc Guide: data preparation",
        url: "https://documentation.libreoffice.org/en/english-documentation/calc/",
        sdg: technicalSkillSdg("cleaning and documenting data"),
        scenarioPriority: 0,
      },
      {
        id: "statistics",
        name: "Statistical reasoning",
        description:
          "Describe variation and avoid conclusions the data cannot support.",
        prerequisites: [],
        hours: 4,
        task: "Use fictional values to compare a mean and median; state why the result does not by itself show causation.",
        resource: "OpenStax: Introductory Business Statistics",
        url: "https://openstax.org/details/books/introductory-business-statistics",
        sdg: technicalSkillSdg(
          "interpreting variation and communicating uncertainty",
        ),
        scenarioPriority: 1,
      },
      {
        id: "visualization",
        name: "Data visualization",
        description:
          "Choose and explain a chart that fits a question and its limits.",
        prerequisites: ["excel"],
        hours: 2,
        task: "Plot fictional monthly totals and write a caption describing the pattern and one limitation of the chart.",
        resource: "LibreOffice Calc Guide: charts",
        url: "https://documentation.libreoffice.org/en/english-documentation/calc/",
        sdg: technicalSkillSdg("presenting data clearly for decisions"),
        scenarioPriority: 0,
      },
    ],
  },
  {
    id: "software",
    title: "Software Developer",
    summary:
      "Design, build, test, and maintain software around user and system needs.",
    source:
      "U.S. Bureau of Labor Statistics · Software Developers, QA Analysts, and Testers",
    sourceUrl:
      "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
    sourceNote:
      "BLS describes needs analysis, software design and development, testing, maintenance, and documentation. The U.S. occupation profile is task evidence, not Malaysian demand or a guarantee of entry requirements.",
    workExamples: [
      "Analyse user needs before designing software.",
      "Design and build application or system components.",
      "Test, maintain, and document software.",
    ],
    capstone: {
      task: "Build a fictional task tracker from one written user need. Include input checks, automated tests, a component diagram, and a short explanation of one bug you fixed.",
      hours: 4,
    },
    weights: [0.4, 0.2, 0.4],
    sdgs: [
      {
        target: "4.4",
        reason:
          "A learning pathway can build technical skills relevant to employment (Target 4.4); participation or employment outcomes are not measured.",
      },
      {
        target: "9.5",
        reason:
          "Software practice can strengthen technological capability when applied in research or industry innovation; this is a conditional, proposed link.",
      },
    ],
    skills: [
      {
        id: "programming",
        name: "Programming foundations",
        description:
          "Turn a small requirement into readable, maintainable code.",
        prerequisites: [],
        hours: 5,
        task: "Build a small fictional task tracker with input validation, then explain one design choice.",
        resource: "MDN Learn Web Development",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
        sdg: technicalSkillSdg("writing and explaining software"),
        scenarioPriority: 2,
      },
      {
        id: "debugging",
        name: "Debugging",
        description:
          "Reproduce a problem, inspect evidence, and test a focused fix.",
        prerequisites: ["programming"],
        hours: 2,
        task: "Introduce a deliberate bug in a toy function, reproduce it, isolate the cause, and record the fix.",
        resource: "MDN: debugging JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong",
        sdg: technicalSkillSdg("investigating and correcting software faults"),
        scenarioPriority: 0,
      },
      {
        id: "testing",
        name: "Software testing",
        description: "Check expected behavior and important edge cases.",
        prerequisites: ["programming"],
        hours: 3,
        task: "Write checks for a toy function’s normal input, empty input, and an invalid value.",
        resource: "Node.js test runner documentation",
        url: "https://nodejs.org/api/test.html",
        sdg: technicalSkillSdg("testing software behavior and edge cases"),
        scenarioPriority: 0,
      },
      {
        id: "system-design",
        name: "System design basics",
        description:
          "Describe how a user request moves through a simple client-server system.",
        prerequisites: ["programming"],
        hours: 2,
        task: "Draw a simple client-server flow for a fictional app and identify one failure point and one privacy consideration.",
        resource: "MDN: how the Internet works",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work",
        sdg: technicalSkillSdg(
          "reasoning about software systems and their constraints",
        ),
        scenarioPriority: 1,
      },
    ],
  },
  {
    id: "operations",
    title: "Operations Research Analyst",
    summary:
      "Use data, mathematics, and models to compare options and support operational decisions.",
    source: "U.S. Bureau of Labor Statistics · Operations Research Analysts",
    sourceUrl: "https://www.bls.gov/ooh/math/operations-research-analysts.htm",
    sourceNote:
      "BLS describes using mathematics and logic to solve complex issues and help organisations make decisions. The profile is U.S.-based and describes the occupation, not local demand or individual fit.",
    workExamples: [
      "Frame an operational question as a bounded model.",
      "Use mathematical analysis to compare possible options.",
      "Explain constraints and limits before decision-makers act.",
    ],
    capstone: {
      task: "Compare two fictional staff schedules with a small model. Record the objective, constraints, a baseline, output checks, and a situation where the model would be unsuitable.",
      hours: 4,
    },
    weights: [0.5, 0.35, 0.15],
    sdgs: [
      {
        target: "4.4",
        reason:
          "A learning pathway can build mathematical and technical capabilities relevant to employment (Target 4.4); this does not measure employment outcomes.",
      },
      {
        target: "8.2",
        reason:
          "Operational analysis may inform productivity decisions when an organisation acts on it; the analysis itself is not proof of productivity gains.",
      },
    ],
    skills: [
      {
        id: "python",
        name: "Python for analysis",
        description:
          "Use a small script to inspect and transform fictional data.",
        prerequisites: [],
        hours: 4,
        task: "Read a synthetic CSV, calculate a summary, and explain how you checked the result.",
        resource:
          "CS50 Introduction to Programming with Python (free OpenCourseWare)",
        url: "https://cs50.harvard.edu/python/",
        sdg: technicalSkillSdg("programming for data analysis"),
        scenarioPriority: 2,
      },
      {
        id: "model-formulation",
        name: "Model formulation",
        description:
          "State a decision objective, variables, constraints, and assumptions.",
        prerequisites: ["python"],
        hours: 3,
        task: "Model a fictional staff-scheduling question with a clear objective and two constraints; state an assumption that could change the answer.",
        resource: "Google OR-Tools: employee scheduling",
        url: "https://developers.google.com/optimization/scheduling/employee_scheduling",
        sdg: technicalSkillSdg("formulating and analysing decision models"),
        scenarioPriority: 1,
      },
      {
        id: "model-validation",
        name: "Model validation",
        description:
          "Compare model output with constraints and a simple baseline.",
        prerequisites: ["model-formulation"],
        hours: 3,
        task: "Test a fictional schedule against every constraint and compare it with a simple baseline; document any failure.",
        resource: "Google OR-Tools: examples and guides",
        url: "https://developers.google.com/optimization",
        sdg: technicalSkillSdg("checking model assumptions and outputs"),
        scenarioPriority: 0,
      },
      {
        id: "optimization",
        name: "Optimization methods",
        description:
          "Explore how a solver handles a small constrained decision problem.",
        prerequisites: ["model-formulation"],
        hours: 4,
        task: "Solve a tiny fictional assignment problem and explain the objective, constraints, and one limitation of the model.",
        resource: "Google OR-Tools: linear optimization",
        url: "https://developers.google.com/optimization/lp",
        sdg: technicalSkillSdg(
          "using optimization methods for bounded decisions",
        ),
        scenarioPriority: 0,
      },
    ],
  },
]

export const allSkills = careerDefinitions.flatMap((role) => role.skills)
export const findSkill = (id: string) =>
  allSkills.find((skill) => skill.id === id)

export type RoleMatch = {
  role: CareerDefinition
  score: number
  breakdown: {
    dimension: string
    signalScore: number
    weight: number
    contribution: number
  }[]
  existingSkills: SkillDefinition[]
  missingSkills: SkillDefinition[]
  confidence: string
  trendPriority: number
  trendExplanation: string
}
type RankingResult = {
  kind: "incomplete" | "complete"
  rankings: RoleMatch[]
}

export function rankCareers(
  answers: readonly number[],
  selectedSkills: readonly string[],
  scenario: ScenarioId,
  trend: Trend | null = null,
): RankingResult {
  const result = assess(answers)
  if (result.kind === "incomplete") return { kind: "incomplete", rankings: [] }
  const decision = decideTrend(trend)
  const scenarioFactors =
    scenario === "accelerated" ? [0.75, 1.15, 1.3] : [1, 1, 1]
  const rankings = careerDefinitions
    .map((role) => {
      const weighted = role.weights.map(
        (weight, index) => weight * scenarioFactors[index],
      )
      const denominator = weighted.reduce((sum, weight) => sum + weight, 0)
      const weights = weighted.map((weight) => weight / denominator)
      const breakdown = result.signals.map((signal, index) => ({
        dimension: signal.name,
        signalScore: signal.score,
        weight: weights[index],
        contribution: signal.score * weights[index],
      }))
      const existingSkills = role.skills.filter((skill) =>
        selectedSkills.includes(skill.id),
      )
      const missingSkills = role.skills.filter(
        (skill) => !selectedSkills.includes(skill.id),
      )
      return {
        role,
        trendPriority: role.id === "data" ? decision.priority : 0,
        trendExplanation: role.id === "data" ? decision.explanation : "No mapped current trend evidence for this role. Direction unknown; capability evidence remains available. No rise or decline inferred from another occupation’s projection.",
        score:
          Math.round(
            breakdown.reduce((sum, item) => sum + item.contribution, 0) * 10,
          ) / 10,
        breakdown,
        existingSkills,
        missingSkills,
        confidence:
          "Low — self-described choices only; no task performance or verified proficiency.",
      }
    })
    .sort(
      (left, right) =>
        right.trendPriority - left.trendPriority ||
        right.score - left.score ||
        left.role.title.localeCompare(right.role.title),
    )
  return { kind: "complete" as const, rankings }
}

export function buildPathway(
  roleId: CareerDefinition["id"],
  selectedSkills: readonly string[],
  scenario: ScenarioId,
  trend: Trend | null = null,
) {
  const role =
    careerDefinitions.find((candidate) => candidate.id === roleId) ??
    careerDefinitions[0]
  const remaining = [...role.skills]
  const ordered: SkillDefinition[] = []
  const scenarioFirst = scenario === "accelerated"
  const prioritySkills = role.id === "data" ? decideTrend(trend).prioritizedSkills : []
  while (remaining.length) {
    const ready = remaining.filter((skill) =>
      skill.prerequisites.every((id) =>
        ordered.some((prior) => prior.id === id),
      ),
    )
    if (!ready.length)
      throw new Error(`Invalid skill prerequisites for ${role.title}`)
    ready.sort((left, right) => {
      const scenarioDelta = scenarioFirst
        ? left.scenarioPriority - right.scenarioPriority
        : 0
      const phaseDelta =
        Number(left.prerequisites.length > 0) -
        Number(right.prerequisites.length > 0)
      return (
        phaseDelta ||
        Number(prioritySkills.includes(right.id)) - Number(prioritySkills.includes(left.id)) ||
        scenarioDelta ||
        Number(selectedSkills.includes(left.id)) -
          Number(selectedSkills.includes(right.id)) ||
        role.skills.indexOf(left) - role.skills.indexOf(right)
      )
    })
    const next = ready[0]
    ordered.push(next)
    remaining.splice(remaining.indexOf(next), 1)
  }
  return ordered
}

export function buildRoadmap(
  roleId: CareerDefinition["id"],
  selectedSkills: readonly string[],
  scenario: ScenarioId,
  trend: Trend | null = null,
) {
  const role =
    careerDefinitions.find((candidate) => candidate.id === roleId) ??
    careerDefinitions[0]
  const steps = buildPathway(role.id, selectedSkills, scenario, trend)
  return [
    {
      name: "Foundation",
      steps: steps.filter((skill) => skill.prerequisites.length === 0),
    },
    {
      name: "Specialization",
      steps: steps.filter((skill) => skill.prerequisites.length > 0),
    },
    {
      name: "Capstone",
      steps: [
        {
          id: `${role.id}:capstone`,
          name: `${role.title} practice project`,
          description:
            "Bring the pathway skills together in one reviewable artifact.",
          prerequisites: role.skills.map((skill) => skill.id),
          hours: role.capstone.hours,
          task: role.capstone.task,
          resource: "Revisit the linked resources from the previous phases",
          url: "",
          sdg: technicalSkillSdg(
            "combining technical skills in a reviewed project",
          ),
          scenarioPriority: 0,
        },
      ],
    },
  ]
}
