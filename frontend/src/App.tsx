import { Pathway } from "./mvp/Pathway"
import { useEffect, useState } from "react"
import { assess } from "./mvp/scoring"
import { adoptionScenarios, careerDefinitions, findSkill, rankCareers, type ScenarioId } from "./mvp/domain1"
import { parseTrend, type Trend } from "./mvp/trends"
import { Evidence, RoleMatches, ScenarioSelector, TrendPanel, SdgMapping } from "./mvp/Evidence"

type Screen = "splash" | "welcome" | "onboarding" | "skills-intake" | "assessment-intro" | "assessment" | "analysis" | "capability" | "recommendations" | "career" | "pathway" | "dashboard" | "skills" | "skill" | "logo-system" | "impact"

type LogoState = "new" | "active" | "growing" | "milestone" | "inactive" | "welcome"

type IconName = "arrow" | "back" | "briefcase" | "chart" | "check" | "compass" | "grid" | "home" | "info" | "route" | "spark" | "user"

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    back: (
      <>
        <path d="M19 12H5" />
        <path d="m10 17-5-5 5-5" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
      </>
    ),
    chart: (
      <>
        <path d="M5 19V9" />
        <path d="M12 19V5" />
        <path d="M19 19v-7" />
      </>
    ),
    check: <path d="m5 12 4 4L19 7" />,
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9Z" />
      </>
    ),
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    home: (
      <>
        <path d="m4 10 8-7 8 7" />
        <path d="M6 9v11h12V9" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
        <path d="M8 18h2a2 2 0 0 0 2-2V8a2 2 0 0 1 2-2h2" />
      </>
    ),
    spark: <path d="M12 2 14 9.5 22 12l-8 2.5L12 22l-2-7.5L2 12l8-2.5Z" />,
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      >
        {paths[name]}
      </g>
    </svg>
  )
}

function LivingMark({
  state = "active",
  label,
}: {
  state?: LogoState
  label?: string
}) {
  return (
    <svg
      className={`living-mark ${state}`}
      viewBox="0 0 64 64"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
    >
      <rect className="mark-tile" x="2" y="2" width="60" height="60" rx="18" />
      <g className="growth-lines">
        <path d="M13 46c1-9 5-15 12-19M51 46c-1-9-5-15-12-19" />
        <circle cx="14" cy="43" r="2.5" />
        <circle cx="50" cy="43" r="2.5" />
      </g>
      <g className="welcome-halo">
        <path d="M13 19C20 7 42 4 52 18" />
        <path d="m12 14 1 5 5-1M47 14l5 4 2-5" />
      </g>
      <path
        className="mark-a"
        d="M11 47 26.6 12h8.8L53 47H42.8l-3-7.6H24.2L21.2 47H11Z"
      />
      <path className="mark-eye" d="M27.6 32h8.2L32 21.8 27.6 32Z" />
      <path className="rest-eye" d="M27 29c3 3 7 3 10 0" />
      <g className="orbit-companion">
        <circle className="mark-orbit-ring" cx="49" cy="15" r="7" />
        <circle className="orbit-dot" cx="49" cy="15" r="4.5" />
      </g>
      <g className="energy-rays">
        <path d="M49 5V2M58 9l2-2M58 19l3 1" />
      </g>
      <g className="milestone-crown">
        <path d="m23 10 4-6 5 5 5-5 4 6" />
        <path d="M24 11h16" />
      </g>
      <g className="rest-moon">
        <path d="M49 11a6 6 0 1 0 5 9 7 7 0 0 1-5-9Z" />
        <path d="M54 28h5l-5 5h5" />
      </g>
      <g className="mark-sparkles">
        <path d="m12 19 1.3 3.7L17 24l-3.7 1.3L12 29l-1.3-3.7L7 24l3.7-1.3L12 19Z" />
        <path d="m52 38 1 2.8 3 1.2-3 1.2-1 2.8-1-2.8-3-1.2 3-1.2 1-2.8Z" />
      </g>
    </svg>
  )
}

function Logo({
  compact = false,
  state = "active",
}: {
  compact?: boolean
  state?: LogoState
}) {
  return (
    <div className={`logo-lockup ${compact ? "compact" : ""}`}>
      <LivingMark state={state} />
      {!compact && <strong>Aiversecity</strong>}
    </div>
  )
}

const logoStates: {
  id: LogoState
  name: string
  subtitle: string
  trigger: string
  transition: string
}[] = [
  {
    id: "new",
    name: "New Explorer",
    subtitle: "Dormant, open, ready",
    trigger: "New account before the first assessment",
    transition: "A gentle fade-in; no urgency or pulse",
  },
  {
    id: "active",
    name: "Active Explorer",
    subtitle: "Curious energy",
    trigger: "Assessment complete or career explored this week",
    transition: "Orbit node brightens and makes one calm circuit",
  },
  {
    id: "growing",
    name: "Growing Potential",
    subtitle: "Capability taking shape",
    trigger: "First skill card collected or learning mission completed",
    transition: "Two growth nodes draw outward from the core",
  },
  {
    id: "milestone",
    name: "Milestone Achieved",
    subtitle: "A meaningful step",
    trigger: "All three missions on a skill card completed",
    transition: "One celebratory lift, glow, and sparkle sequence",
  },
  {
    id: "inactive",
    name: "Inactive Explorer",
    subtitle: "Resting, never regressing",
    trigger: "Suggested rule: no activity for 14 days",
    transition: "Color and motion soften; progress is fully preserved",
  },
  {
    id: "welcome",
    name: "Welcome Back",
    subtitle: "Warm return energy",
    trigger: "First session after an inactive period",
    transition: "Warm halo opens, then settles into the active state",
  },
]

const roles = [
  {
    id: "student",
    title: "Student",
    text: "Exploring what could fit",
    icon: "grid" as IconName,
  },
  {
    id: "graduate",
    title: "Recent graduate",
    text: "Finding a place to begin",
    icon: "spark" as IconName,
  },
  {
    id: "professional",
    title: "Working professional",
    text: "Growing with intention",
    icon: "briefcase" as IconName,
  },
  {
    id: "switcher",
    title: "Career switcher",
    text: "Translating existing strengths",
    icon: "route" as IconName,
  },
]

const questions = [
  {
    kicker: "SCENARIO 01",
    title: "The student society event is falling behind.",
    prompt:
      "Everyone has opinions, but no one knows what is actually causing the delays. What do you do first?",
    visual: "board",
    answers: [
      [
        "Map the bottlenecks",
        "Collect the timeline and find where work is getting stuck.",
      ],
      [
        "Talk to the team",
        "Hear each person’s perspective before making a plan.",
      ],
      ["Prototype a new flow", "Create a clearer system and test it quickly."],
    ],
  },
  {
    kicker: "ENERGY CHECK",
    title: "Which kind of win feels most satisfying?",
    prompt:
      "Choose the moment that would leave you most energized after a busy day.",
    visual: "energy",
    answers: [
      ["The pattern clicks", "Scattered details suddenly tell a clear story."],
      ["The team aligns", "Different people leave with a shared plan."],
      ["The process works", "A careful check prevents a costly mistake."],
    ],
  },
  {
    kicker: "PATTERN PLAY",
    title: "A weekly metric changes: 12, 18, 15, 22, 19…",
    prompt:
      "You do not need to calculate the next number. What catches your attention first?",
    visual: "pattern",
    answers: [
      [
        "The alternating movement",
        "I want to test whether the rise-and-dip pattern continues.",
      ],
      ["The reason behind it", "I want to know what changed in those weeks."],
      [
        "The data quality",
        "I want to confirm each value was measured consistently.",
      ],
    ],
  },
  {
    kicker: "TEAM MOMENT",
    title: "A teammate challenges your conclusion.",
    prompt: "How would you move the conversation forward?",
    visual: "team",
    answers: [
      [
        "Show the evidence",
        "Walk through the assumptions and source together.",
      ],
      [
        "Ask what they see",
        "Understand their perspective and look for common ground.",
      ],
      ["Run a small test", "Agree on a practical way to compare both ideas."],
    ],
  },
]

const conceptCareers = [
  {
    id: "data",
    rank: "01",
    title: "Data Analyst",
    domain: "INSIGHT & STRATEGY",
    accent: "cyan",
    summary: "Turn information into clear stories that guide better decisions.",
    why: "Your choices consistently favored finding patterns, checking evidence, and making complexity understandable.",
    sdgs: ["4 · Quality Education", "8 · Decent Work", "9 · Innovation"],
  },
  {
    id: "software",
    rank: "02",
    title: "Software Developer",
    domain: "PRODUCTS & SYSTEMS",
    accent: "violet",
    summary:
      "Build reliable digital products by turning ideas into working systems.",
    why: "You showed structured problem solving, curiosity about how systems work, and a preference for testing practical solutions.",
    sdgs: ["4 · Quality Education", "8 · Decent Work", "9 · Innovation"],
  },
  {
    id: "operations",
    rank: "03",
    title: "Operations Research Analyst",
    domain: "MODELLING & DECISIONS",
    accent: "orange",
    summary:
      "Use data, mathematics, and models to compare options and support operational decisions.",
    why: "Your response pattern shows signals that can be useful when framing and checking decision models.",
    sdgs: ["4 · Quality Education", "8 · Decent Work", "9 · Innovation"],
  },
]

const conceptSkills = [
  {
    id: "sql",
    name: "SQL",
    career: "data",
    careerName: "Data Analyst",
    accent: "cyan",
    icon: "grid" as IconName,
    description:
      "Ask structured questions of data stored in relational databases.",
    time: "6–8 hours",
    course: "PostgreSQL querying tutorial",
    pressure: "Moderate task pressure",
    trend:
      "Query generation is accelerating; validation and business context remain important.",
    adapt: ["Data modeling", "Query validation", "Business context"],
    missions: [
      "Filter and sort a sample table",
      "Join two small datasets",
      "Answer a business question with SQL",
    ],
  },
  {
    id: "excel",
    name: "Excel",
    career: "data",
    careerName: "Data Analyst",
    accent: "cyan",
    icon: "grid" as IconName,
    description:
      "Clean, organize, calculate, and inspect everyday business data.",
    time: "4–6 hours",
    course: "pandas getting-started tutorials",
    pressure: "Moderate task pressure",
    trend:
      "Automation supports formulas and cleanup; judgment about structure still matters.",
    adapt: ["Data hygiene", "Automation review", "Problem framing"],
    missions: [
      "Clean a messy worksheet",
      "Build a lookup between two sheets",
      "Summarize data with a pivot table",
    ],
  },
  {
    id: "visualization",
    name: "Data Visualization",
    career: "data",
    careerName: "Data Analyst",
    accent: "cyan",
    icon: "chart" as IconName,
    description: "Turn findings into clear visuals that support decisions.",
    time: "5–7 hours",
    course: "pandas plotting tutorial",
    pressure: "Lower task pressure",
    trend:
      "Tools can draft charts quickly; audience judgment and narrative remain differentiators.",
    adapt: ["Audience empathy", "Chart critique", "Narrative design"],
    missions: [
      "Match three questions to chart types",
      "Improve a misleading chart",
      "Build a one-page data story",
    ],
  },
  {
    id: "statistics",
    name: "Statistics",
    career: "data",
    careerName: "Data Analyst",
    accent: "cyan",
    icon: "compass" as IconName,
    description:
      "Reason about variation, uncertainty, and evidence without overclaiming.",
    time: "8–10 hours",
    course: "OpenStax Introductory Business Statistics",
    pressure: "Lower task pressure",
    trend:
      "AI can calculate quickly, while assumptions and interpretation need careful oversight.",
    adapt: [
      "Assumption checking",
      "Experiment design",
      "Uncertainty communication",
    ],
    missions: [
      "Describe a dataset’s center and spread",
      "Spot correlation versus causation",
      "Explain uncertainty in plain language",
    ],
  },
  {
    id: "programming",
    name: "Programming",
    career: "software",
    careerName: "Software Developer",
    accent: "violet",
    icon: "grid" as IconName,
    description:
      "Express solutions as readable, maintainable instructions for computers.",
    time: "10–12 hours",
    course: "MDN Learn Web Development",
    pressure: "High task assistance",
    trend:
      "Code generation is expanding; decomposition, review, and product judgment gain value.",
    adapt: ["Problem decomposition", "Code review", "Requirements clarity"],
    missions: [
      "Write a small command-line program",
      "Refactor repeated logic",
      "Explain code to another learner",
    ],
  },
  {
    id: "debugging",
    name: "Debugging",
    career: "software",
    careerName: "Software Developer",
    accent: "violet",
    icon: "compass" as IconName,
    description:
      "Find, isolate, and explain why software behaves unexpectedly.",
    time: "5–7 hours",
    course: "MDN debugging JavaScript",
    pressure: "Moderate task pressure",
    trend:
      "AI can suggest fixes; reproducible investigation and root-cause reasoning remain central.",
    adapt: ["Observability", "Hypothesis testing", "Root-cause analysis"],
    missions: [
      "Reproduce a simple bug",
      "Use logs to isolate a failure",
      "Write a short root-cause note",
    ],
  },
  {
    id: "system-design",
    name: "System Design",
    career: "software",
    careerName: "Software Developer",
    accent: "violet",
    icon: "route" as IconName,
    description:
      "Shape components and trade-offs into a dependable technical system.",
    time: "8–10 hours",
    course: "MDN how the web works",
    pressure: "Lower task pressure",
    trend:
      "Generated options increase; evaluating constraints and trade-offs becomes more important.",
    adapt: [
      "Trade-off analysis",
      "Security thinking",
      "Technical communication",
    ],
    missions: [
      "Map a familiar app’s components",
      "Compare two storage choices",
      "Sketch a resilient request flow",
    ],
  },
  {
    id: "testing",
    name: "Testing",
    career: "software",
    careerName: "Software Developer",
    accent: "violet",
    icon: "check" as IconName,
    description: "Design checks that make software behavior safer to change.",
    time: "4–6 hours",
    course: "Node.js test runner documentation",
    pressure: "Moderate task pressure",
    trend:
      "Test generation is improving; meaningful coverage and risk judgment still need people.",
    adapt: ["Risk analysis", "Test design", "Edge-case thinking"],
    missions: [
      "Write tests for a small function",
      "Identify three edge cases",
      "Turn a bug into a regression test",
    ],
  },
  {
    id: "python",
    name: "Python",
    career: "operations",
    careerName: "Operations Research Analyst",
    accent: "orange",
    icon: "grid" as IconName,
    description:
      "Build readable data and AI workflows in a widely used language.",
    time: "10–12 hours",
    course: "Python tutorial",
    pressure: "High task assistance",
    trend:
      "Use small scripts to inspect data and explain assumptions in a model.",
    adapt: ["Code review", "Data handling", "Workflow design"],
    missions: [
      "Transform a small CSV file",
      "Call a mock model function",
      "Package a reusable data helper",
    ],
  },
  {
    id: "model-formulation",
    name: "Model Formulation",
    career: "operations",
    careerName: "Operations Research Analyst",
    accent: "orange",
    icon: "spark" as IconName,
    description:
      "State a decision objective, variables, constraints, and assumptions.",
    time: "12–16 hours",
    course: "Google OR-Tools employee scheduling guide",
    pressure: "Moderate task pressure",
    trend:
      "Model formulation connects a clearly defined decision to its constraints.",
    adapt: ["Problem framing", "Data quality", "Baseline comparison"],
    missions: [
      "Define a fictional scheduling objective",
      "Write two explicit constraints",
      "Explain an assumption that could change the result",
    ],
  },
  {
    id: "model-validation",
    name: "Model Validation",
    career: "operations",
    careerName: "Operations Research Analyst",
    accent: "orange",
    icon: "chart" as IconName,
    description:
      "Check model outputs against constraints and a simple baseline.",
    time: "6–8 hours",
    course: "Google OR-Tools examples and guides",
    pressure: "Lower task pressure",
    trend:
      "Validation checks whether the proposed result follows the stated model.",
    adapt: ["Evaluation design", "Bias awareness", "Failure analysis"],
    missions: [
      "Check each fictional schedule constraint",
      "Compare a solver result with a simple baseline",
      "Document one case where the model is insufficient",
    ],
  },
  {
    id: "optimization",
    name: "Optimization Methods",
    career: "operations",
    careerName: "Operations Research Analyst",
    accent: "orange",
    icon: "route" as IconName,
    description:
      "Use a solver to compare options under explicit constraints.",
    time: "10–14 hours",
    course: "Google OR-Tools linear optimization guide",
    pressure: "Moderate task pressure",
    trend:
      "An optimization result is meaningful only under its chosen objective and constraints.",
    adapt: ["Monitoring", "Version control", "Incident response"],
    missions: [
      "Solve a tiny fictional assignment problem",
      "Explain the objective and constraints",
      "Describe one limitation of the model",
    ],
  },
]

const careers = conceptCareers.map(career => {
  const definition = careerDefinitions.find(item => item.id === career.id)!
  return {...career,title:definition.title,summary:definition.summary}
})
const skills = conceptSkills.map(skill => {
  const definition = findSkill(skill.id)!
  return {...skill,name:definition.name,description:definition.description,course:definition.resource,
    time:`Suggested practice: ${definition.hours} hours`,careerName:careerDefinitions.find(item=>item.id===skill.career)!.title}
})

function AppHeader({
  onBack,
  title,
  action,
  logoState = "active",
}: {
  onBack?: () => void
  title?: string
  action?: React.ReactNode
  logoState?: LogoState
}) {
  return (
    <header className="app-header">
      {onBack ? (
        <button
          className="icon-button"
          onClick={onBack}
          type="button"
          aria-label="Go back"
        >
          <Icon name="back" />
        </button>
      ) : (
        <Logo state={logoState} />
      )}
      {title && <span className="header-title">{title}</span>}
      <div className="header-action">
        {action ?? (onBack ? <Logo compact state={logoState} /> : null)}
      </div>
    </header>
  )
}

function PrimaryButton({
  children,
  onClick,
  disabled = false,
  secondary = false,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  secondary?: boolean
}) {
  return (
    <button
      className={`primary-button ${secondary ? "secondary" : ""}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
      <Icon name="arrow" size={19} />
    </button>
  )
}

function BottomNav({
  current,
  go,
}: {
  current: Screen
  go: (screen: Screen) => void
}) {
  const items: [Screen, IconName, string][] = [
    ["dashboard", "home", "Home"],
    ["recommendations", "compass", "Discover"],
    ["skills", "grid", "Skills"],
    ["pathway", "route", "My path"],
  ]
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {items.map(([screen, icon, label]) => (
        <button
          className={current === screen ? "active" : ""}
          key={screen}
          onClick={() => go(screen)}
          type="button"
        >
          <Icon name={icon} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

function QuestionVisual({ type }: { type: string }) {
  return (
    <div className={`question-visual ${type}`} aria-hidden="true">
      {type === "board" && (
        <>
          <div className="paper one">
            <i />
            <i />
            <i />
          </div>
          <div className="paper two">
            <i />
            <i />
          </div>
          <span className="visual-node n1" />
          <span className="visual-node n2" />
          <span className="visual-node n3" />
        </>
      )}
      {type === "energy" && (
        <>
          <div className="energy-orb">
            <Icon name="spark" size={34} />
          </div>
          <i className="orbit-ring r1" />
          <i className="orbit-ring r2" />
        </>
      )}
      {type === "pattern" && (
        <>
          <div className="mini-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className="pattern-lens">
            <Icon name="chart" size={25} />
          </span>
        </>
      )}
      {type === "team" && (
        <>
          <span className="person p1">
            <Icon name="user" size={25} />
          </span>
          <span className="person p2">
            <Icon name="user" size={25} />
          </span>
          <span className="bridge">
            <i />
            <i />
            <i />
          </span>
        </>
      )}
    </div>
  )
}

function CareerObject({ type }: { type: string }) {
  return (
    <div className={`career-object ${type === "operations" ? "ai" : type}`} aria-hidden="true">
      <div className="object-glow" />
      {type === "data" && (
        <>
          <div className="glass-chart">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className="object-medal">
            <Icon name="chart" size={25} />
          </span>
        </>
      )}
      {type === "software" && (
        <>
          <div className="object-tile tile-a" />
          <div className="object-tile tile-b" />
          <span className="object-medal">
            <Icon name="grid" size={25} />
          </span>
        </>
      )}
      {type === "operations" && (
        <>
          <div className="object-shield">
            <Icon name="check" size={29} />
          </div>
          <i className="scan-line" />
        </>
      )}
    </div>
  )
}

function SkillIllustration({
  skill,
  state,
}: {
  skill: typeof skills[number]
  state: string
}) {
  return (
    <div
      className={`skill-illustration ${skill.accent} ${state}`}
      aria-hidden="true"
    >
      <i className="skill-orbit orbit-a" />
      <i className="skill-orbit orbit-b" />
      <span className="skill-core">
        <Icon name={skill.icon} size={34} />
      </span>
      <span className="skill-gem gem-a" />
      <span className="skill-gem gem-b" />
      {state === "milestone" && (
        <span className="upgrade-star">
          <Icon name="spark" size={17} />
        </span>
      )}
    </div>
  )
}

function SkillCard({
  skill,
  completed,
  onClick,
}: {
  skill: typeof skills[number]
  completed: number
  onClick: () => void
}) {
  const state =
    completed === 3 ? "milestone" : completed > 0 ? "progress" : "discovered"
  const stateLabel =
    state === "milestone"
      ? "Milestone achieved"
      : state === "progress"
        ? "In progress"
        : "Discovered"
  return (
    <button
      className={`collectible-card ${skill.accent} ${state}`}
      onClick={onClick}
      type="button"
    >
      <span className="collectible-top">
        <span>{skill.careerName}</span>
        <b>{stateLabel}</b>
      </span>
      <SkillIllustration skill={skill} state={state} />
      <span className="collectible-copy">
        <small>SKILL CARD</small>
        <strong>{skill.name}</strong>
        <span>{skill.description}</span>
      </span>
      <span className="card-progress">
        <span>
          <b>{completed}</b> / 3 missions
        </span>
        <i>
          <em style={{ transform: `scaleX(${completed / 3})` }} />
        </i>
      </span>
    </button>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome")
  const [role, setRole] = useState("")
  const [name, setName] = useState("")
  const [question, setQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [selectedCareer, setSelectedCareer] = useState("data")
  const [careerReturn, setCareerReturn] = useState<Screen>("recommendations")
  const [pathwayProgress, setPathwayProgress] =
    useState<Record<string, string[]>>({
      data: [],
      software: [],
      operations: [],
    })
  const [selectedSkill, setSelectedSkill] = useState("sql")
  const [skillReturn, setSkillReturn] = useState<Screen>("skills")
  const [skillFilter, setSkillFilter] = useState("all")
  const [intakeSkills, setIntakeSkills] = useState<string[]>([])
  const [skillProgress, setSkillProgress] = useState<Record<string, number[]>>({
    sql: [],
    excel: [],
  })
  const [impactScenario, setImpactScenario] = useState<ScenarioId>("assistive")
  const [impactReturn, setImpactReturn] = useState<Screen>("dashboard")
  const [trend, setTrend] = useState<Trend | null>(null)
  const [trendStatus, setTrendStatus] = useState("Loading reviewed source snapshot…")
  const refreshTrend = async () => {
    setTrendStatus("Refreshing public BLS source…")
    try {
      const response = await fetch("/api/trends", {cache:"no-store"})
      if (!response.ok) throw new Error("Unavailable")
      const record=parseTrend(await response.json())
      setTrend(record)
      setTrendStatus(record.cacheStatus==='stale' ? 'Live refresh failed. Showing the last successful retrieval with its original timestamp.' : 'BLS source record received. A 30-minute cache may apply; the retrieval timestamp is shown below.')
    } catch {
      setTrendStatus("Live refresh unavailable. Keeping the dated snapshot or last successful source; no update claimed.")
    }
  }
  useEffect(() => {
    let active = true
    fetch("/data/trend.json", {cache:"no-store"}).then(r => {if(!r.ok) throw new Error(); return r.json()}).then(parseTrend).then(value => {
      if(active) {setTrend(value); setTrendStatus("Reviewed snapshot — use Refresh for a live source check.")}
    }).catch(() => {if(active) setTrendStatus("Source unavailable. Recommendation has insufficient trend evidence.")})
    return () => {active=false}
  }, [])
  const assessment = assess(answers)
  const supported = assessment.kind === "complete"
  const careerRankings = rankCareers(answers, intakeSkills, impactScenario)
  const selectedRanking = careerRankings.kind === "complete"
    ? careerRankings.rankings.find((item) => item.role.id === selectedCareer)
    : undefined
  const recommendation = selectedRanking
    ? `${selectedRanking.role.title} is one path to explore under the selected scenario, based on the response signals shown below. This score is not a probability of employment.`
    : "Complete the assessment to see explainable career matches."
  const [feedback, setFeedback] = useState("")

  const go = (next: Screen) => {
    setScreen((next === "career" || next === "pathway") && !supported ? "recommendations" : next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    if (screen !== "splash") return
    const timer = window.setTimeout(() => go("welcome"), 1800)
    return () => window.clearTimeout(timer)
  }, [screen])

  useEffect(() => {
    if (screen !== "analysis" || analysisStep >= 3) return
    const timer = window.setTimeout(
      () => setAnalysisStep((step) => step + 1),
      750,
    )
    return () => window.clearTimeout(timer)
  }, [screen, analysisStep])

  const nextQuestion = () => {
    if (selectedAnswer === null) return
    setAnswers((current) => {
      const updated = [...current]
      updated[question] = selectedAnswer
      return updated
    })
    setSelectedAnswer(null)
    if (question === questions.length - 1) {
      setAnalysisStep(0)
      go("analysis")
    } else {
      setQuestion((current) => current + 1)
    }
  }

  const openCareer = (careerId: string) => {
    setSelectedCareer(careerId)
    setCareerReturn(screen)
    go("career")
  }

  const openSkill = (skillId: string) => {
    setSelectedSkill(skillId)
    setSkillReturn(screen)
    go("skill")
  }

  const openImpact = () => {
    setImpactReturn(screen)
    go("impact")
  }

  const announce = (message: string) => {
    setFeedback(message)
    window.setTimeout(() => setFeedback(""), 2200)
  }

  const toggleSkillMission = (skillId: string, mission: number) => {
    const wasComplete = (skillProgress[skillId] ?? []).includes(mission)
    setSkillProgress((current) => {
      const completed = current[skillId] ?? []
      return {
        ...current,
        [skillId]: completed.includes(mission)
          ? completed.filter((item) => item !== mission)
          : [...completed, mission],
      }
    })
    announce(
      wasComplete
        ? "Mission marked incomplete"
        : (skillProgress[skillId]?.length ?? 0) === 2
          ? "Learning milestone achieved — card upgraded"
          : "Mission complete — progress saved",
    )
  }

  const activeCareer =
    careers.find((career) => career.id === selectedCareer) ?? careers[0]
  const activeRole = careerDefinitions.find((career) => career.id === selectedCareer) ?? careerDefinitions[0]
  const activeSkill =
    skills.find((skill) => skill.id === selectedSkill) ?? skills[0]
  const activeResource = findSkill(activeSkill.id) ?? careerDefinitions[0].skills[0]
  const activePathProgress = pathwayProgress[selectedCareer] ?? []
  const totalSkillMissions = Object.values(skillProgress).reduce(
    (total, missions) => total + missions.length,
    0,
  )
  const dashboardLogoState: LogoState = activePathProgress.length === 4 || Object.values(skillProgress).some(
    (missions) => missions.length === 3,
  )
    ? "milestone"
    : totalSkillMissions > 0 || activePathProgress.length > 0
      ? "growing"
      : answers.length === 4 ? "active" : "new"
  const mainScreens: Screen[] = [
    "dashboard",
    "recommendations",
    "pathway",
    "capability",
    "skills",
  ]

  return (
    <main className={`app-shell screen-${screen}`}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {screen === "splash" && (
        <section className="splash-screen">
          <div className="splash-logo">
            <Logo state="welcome" />
            <div className="splash-rings">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="splash-status">
            <span />
            <p>Mapping possible paths</p>
          </div>
        </section>
      )}

      {screen === "welcome" && (
        <section className="welcome-screen">
          <AppHeader />
          <div className="welcome-art" aria-hidden="true">
            <div className="path-card path-one">
              <Icon name="chart" size={29} />
              <span>INSIGHT</span>
            </div>
            <div className="path-card path-two">
              <Icon name="grid" size={29} />
              <span>SYSTEMS</span>
            </div>
            <div className="path-card path-three">
              <Icon name="route" size={29} />
              <span>QUALITY</span>
            </div>
            <div className="center-compass">
              <Icon name="compass" size={38} />
            </div>
          </div>
          <div className="welcome-copy">
            <span className="eyebrow">CAREER DISCOVERY, REIMAGINED</span>
            <h1>
              Find a direction
              <br />
              <em>that feels like you.</em>
            </h1>
            <p>
              Explore your capabilities through real-world scenarios, then turn
              your strongest signals into practical next steps.
            </p>
            <PrimaryButton onClick={() => go("onboarding")}>
              Begin your journey
            </PrimaryButton>
            <button
              className="text-button"
              type="button"
              onClick={() => go("dashboard")}
            >
              Explore the app
            </button>
          </div>
        </section>
      )}

      {screen === "onboarding" && (
        <section className="flow-screen">
          <AppHeader onBack={() => go("welcome")} title="About you" />
          <div className="flow-copy">
            <span className="eyebrow">STEP 1 OF 2</span>
            <h1>
              Where are you
              <br />
              right now?
            </h1>
            <p>
              This helps us frame recommendations in a useful way. It does not
              change your potential.
            </p>
          </div>
          <div className="role-grid">
            {roles.map((item) => (
              <button
                className={role === item.id ? "selected" : ""}
                key={item.id}
                onClick={() => setRole(item.id)}
                type="button"
              >
                <span>
                  <Icon name={item.icon} />
                </span>
                <strong>{item.title}</strong>
                <small>{item.text}</small>
                <i>
                  <Icon name="check" size={14} />
                </i>
              </button>
            ))}
          </div>
          <label className="name-field">
            <span>
              Fictional demo alias <small>Optional · no real personal data</small>
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Demo Explorer" maxLength={40}
            />
          </label>
          <div className="sticky-action">
            <PrimaryButton disabled={!role} onClick={() => go("skills-intake")}>
              Continue
            </PrimaryButton>
          </div>
        </section>
      )}

      {screen === "skills-intake" && (
        <section className="flow-screen">
          <AppHeader
            onBack={() => go(answers.length > 0 ? "capability" : "onboarding")}
            title="Skills snapshot"
          />
          <div className="flow-copy">
            <span className="eyebrow">STEP 2 OF 2 · OPTIONAL</span>
            <h1>
              What have you
              <br />
              tried before?
            </h1>
            <p>
              Select anything you have practiced, even briefly. This is a
              starting snapshot—not a proficiency claim.
            </p>
          </div>
          <div className="intake-skill-grid">
            {skills.map((skill) => {
              const selected = intakeSkills.includes(skill.id)
              return (
                <button
                  className={`${skill.accent} ${selected ? "selected" : ""}`}
                  key={skill.id}
                  onClick={() =>
                    setIntakeSkills((current) =>
                      selected
                        ? current.filter((item) => item !== skill.id)
                        : [...current, skill.id],
                    )
                  }
                  type="button"
                  aria-pressed={selected}
                >
                  <span>
                    <Icon name={skill.icon} size={18} />
                  </span>
                  <strong>{skill.name}</strong>
                  <i>
                    <Icon name="check" size={13} />
                  </i>
                </button>
              )
            })}
          </div>
          <div className="intake-note">
            <Icon name="info" size={17} />
            <p>
              Selected skills help explain gaps later. They do not increase a
              match score or verify expertise.
            </p>
          </div>
          <div className="sticky-action">
            <PrimaryButton
              onClick={() =>
                go(answers.length > 0 ? "capability" : "assessment-intro")
              }
            >
              {intakeSkills.length > 0
                ? `Continue with ${intakeSkills.length} skills`
                : "Skip for now"}
            </PrimaryButton>
          </div>
        </section>
      )}

      {screen === "assessment-intro" && (
        <section className="flow-screen">
          <AppHeader
            onBack={() => go("skills-intake")}
            title="Discovery assessment"
          />
          <div className="intro-visual">
            <span className="intro-core">
              <Icon name="compass" size={40} />
            </span>
            <i className="intro-orbit o1" />
            <i className="intro-orbit o2" />
            <span className="satellite s1">
              <Icon name="chart" size={18} />
            </span>
            <span className="satellite s2">
              <Icon name="grid" size={18} />
            </span>
            <span className="satellite s3">
              <Icon name="spark" size={18} />
            </span>
          </div>
          <div className="flow-copy centered">
            <span className="eyebrow">YOUR STARTING POINT</span>
            <h1>
              Four short
              <br />
              workplace moments.
            </h1>
            <p>
              There are no right answers. Choose what feels most natural, not
              what sounds most impressive.
            </p>
          </div>
          <div className="assessment-facts">
            <div>
              <Icon name="spark" />
              <span>
                <strong>What energizes you</strong>
                <small>Motivation and work preferences</small>
              </span>
            </div>
            <div>
              <Icon name="chart" />
              <span>
                <strong>How you approach problems</strong>
                <small>Reasoning and decision patterns</small>
              </span>
            </div>
            <div>
              <Icon name="route" />
              <span>
                <strong>Where to explore next</strong>
                <small>Practical pathways, not predictions</small>
              </span>
            </div>
          </div>
          <div className="time-note">
            <Icon name="info" size={17} /> About 3 minutes · You can pause
            anytime
          </div>
          <PrimaryButton onClick={() => go("assessment")}>
            Start assessment
          </PrimaryButton>
        </section>
      )}

      {screen === "assessment" && (
        <section className="assessment-screen">
          <AppHeader
            onBack={() => {
              if (question > 0) {
                const previousQuestion = question - 1
                setQuestion(previousQuestion)
                setSelectedAnswer(answers[previousQuestion] ?? null)
              } else {
                go("assessment-intro")
              }
            }}
            title={`${question + 1} of ${questions.length}`}
          />
          <div className="assessment-progress">
            <i
              style={{ transform: `scaleX(${(question + 1) / questions.length})` }}
            />
          </div>
          <QuestionVisual type={questions[question].visual} />
          <div className="question-copy">
            <span className="eyebrow">{questions[question].kicker}</span>
            <h1>{questions[question].title}</h1>
            <p>{questions[question].prompt}</p>
          </div>
          <div className="answer-list">
            {questions[question].answers.map(([title, text], index) => (
              <button
                className={selectedAnswer === index ? "selected" : ""}
                key={title}
                onClick={() => setSelectedAnswer(index)}
                type="button"
              >
                <span>{String.fromCharCode(65 + index)}</span>
                <div>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </div>
                <i>
                  <Icon name="check" size={15} />
                </i>
              </button>
            ))}
          </div>
          <div className="sticky-action">
            <PrimaryButton
              disabled={selectedAnswer === null}
              onClick={nextQuestion}
            >
              {question === questions.length - 1
                ? "Complete assessment"
                : "Next scenario"}
            </PrimaryButton>
          </div>
        </section>
      )}

      {screen === "analysis" && (
        <section className="analysis-screen">
          <AppHeader title="Building your profile" />
          <div className="analysis-visual">
            <div className="analysis-core">
              <Logo compact />
            </div>
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <i
                key={item}
                style={{
                  transform: `rotate(${item * 60}deg) translateY(-82px)`,
                }}
              />
            ))}
            <div className="analysis-ring ring-one" />
            <div className="analysis-ring ring-two" />
          </div>
          <div className="flow-copy centered">
            <span className="eyebrow">ASSESSMENT COMPLETE</span>
            <h1>
              Connecting
              <br />
              your signals.
            </h1>
            <p>
              We are organizing your selected responses into explainable themes.
              This is guidance, not a prediction or psychological diagnosis.
            </p>
          </div>
          <div className="analysis-steps">
            {[
              "Reviewing response patterns",
              "Grouping capability signals",
              "Ranking evidence-backed career explorations",
            ].map((label, index) => (
              <div
                className={
                  analysisStep > index
                    ? "done"
                    : analysisStep === index
                      ? "active"
                      : ""
                }
                key={label}
              >
                <span>
                  {analysisStep > index ? (
                    <Icon name="check" size={14} />
                  ) : (
                    index + 1
                  )}
                </span>
                <p>{label}</p>
                <i />
              </div>
            ))}
          </div>
          {analysisStep >= 3 && (
            <div className="reveal-action">
              <PrimaryButton onClick={() => go("capability")}>
                View capability profile
              </PrimaryButton>
            </div>
          )}
        </section>
      )}

      {screen === "capability" && (
        <section className="main-screen">
          <AppHeader
            title="Capability profile"
          />
          <div className="profile-hero">
            <span className="eyebrow">YOUR CURRENT SIGNALS</span>
            <h1>
              {name ? `${name}’s` : "Your"} capability
              <br />
              constellation
            </h1>
            <p>
              Based on your four responses. Treat these as conversation
              starters, not fixed traits.
            </p>
            <div className="constellation" aria-hidden="true">
              <i className="line l1" />
              <i className="line l2" />
              <span className="node large">
                <Icon name="chart" />
              </span>
              <span className="node n2">
                <Icon name="compass" size={17} />
              </span>
              <span className="node n3">
                <Icon name="grid" size={17} />
              </span>
              <span className="node n4">
                <Icon name="route" size={17} />
              </span>
            </div>
          </div>
          <div className="signal-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">SELF-DESCRIBED</span>
                <h2>Signals worth exploring</h2>
              </div>
              <span className="signal-pill">
                <Icon name="spark" size={13} /> {assessment.kind === "complete" ? 3 : 0} signals
              </span>
            </div>
            <Evidence answers={answers} />
          </div>
          <div className="intake-summary">
            <div>
              <span className="eyebrow">SELF-REPORTED SKILLS</span>
              <h2>Your starting snapshot</h2>
            </div>
            <button onClick={() => go("skills-intake")} type="button">
              Update
            </button>
            <div>
              {intakeSkills.length > 0 ? (
                intakeSkills.map((skillId) => (
                  <span key={skillId}>
                    {skills.find((skill) => skill.id === skillId)?.name}
                  </span>
                ))
              ) : (
                <p>No skills selected yet. Add anything you have tried.</p>
              )}
            </div>
          </div>
          <div className="evidence-note">
            <Icon name="info" />
            <p>
              <strong>About confidence</strong> Four responses provide early
              evidence only. Confidence grows through reflection, projects, and
              real experience.
            </p>
          </div>
          <PrimaryButton onClick={() => go("recommendations")}>
            Explore career matches
          </PrimaryButton>
        </section>
      )}

      {screen === "recommendations" && (
        <section className="main-screen wide-screen">
          <AppHeader
            title="Career paths"
          />
          <div className="result-heading">
            <span className="eyebrow">YOUR SHORTLIST</span>
            <h1>
              A place
              <br />
              to begin exploring.
            </h1>
            <p>Compare three role-specific explanations. These are exploration scores from a small editorial rubric, not employment probabilities.</p>
          </div>
          <ScenarioSelector scenario={impactScenario} onChange={setImpactScenario} />
          <RoleMatches answers={answers} selectedSkills={intakeSkills} scenario={impactScenario} onSelect={(roleId) => openCareer(roleId)} />
          <TrendPanel trend={trend} status={trendStatus} refresh={refreshTrend} />
          <SdgMapping />
          <div className="why-panel">
            <span className="why-icon">
              <Icon name="spark" />
            </span>
            <div>
              <span className="eyebrow">WHY THIS PATH</span>
              <h2>Evidence, translated.</h2>
              <p>
                Each recommendation connects your assessment choices to
                recognizable work activities. Open a path to inspect the
                evidence and decide whether it feels worth testing.
              </p>
            </div>
          </div>
        </section>
      )}

      {screen === "skills" && (
        <section className="main-screen skills-screen">
          <AppHeader
            title="Skill collection"
          />
          <div className="collection-heading">
            <span className="eyebrow">YOUR LEARNING DECK</span>
            <h1>
              Collect skills.
              <br />
              Build real momentum.
            </h1>
            <p>
              Each card holds three practical missions. Visual upgrades mark
              learning progress — never verified mastery.
            </p>
          </div>
          <div className="collection-summary">
            <div>
              <span className="collection-medal">
                <Icon name="spark" size={24} />
              </span>
              <p>
                <strong>
                  {
                    skills.filter(
                      (skill) => (skillProgress[skill.id]?.length ?? 0) === 3,
                    ).length
                  }
                </strong>
                <small>Milestones</small>
              </p>
            </div>
            <div>
              <strong>{totalSkillMissions}</strong>
              <small>Missions complete</small>
            </div>
            <div>
              <strong>{skills.length}</strong>
              <small>Skills discovered</small>
            </div>
          </div>
          <div
            className="skill-filters"
            role="tablist"
            aria-label="Filter skill cards"
          >
            {[
              ["all", "All skills"],
              ["data", "Data"],
              ["software", "Software"],
              ["operations", "Operations research"],

            ].map(([id, label]) => (
              <button
                className={skillFilter === id ? "active" : ""}
                key={id}
                onClick={() => setSkillFilter(id)}
                role="tab"
                type="button"
                aria-selected={skillFilter === id}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="collection-grid">
            {skills
              .filter(
                (skill) =>
                  skillFilter === "all" || skill.career === skillFilter,
              )
              .map((skill) => (
                <SkillCard
                  completed={skillProgress[skill.id]?.length ?? 0}
                  key={skill.id}
                  onClick={() => openSkill(skill.id)}
                  skill={skill}
                />
              ))}
          </div>
          <div className="placeholder-note">
            <Icon name="info" />
            <p>
              Practice builds familiarity. Marking a mission complete is your own record, not verified mastery.
            </p>
          </div>
        </section>
      )}

      {screen === "skill" && (
        <section className={`skill-detail ${activeSkill.accent}`}>
          <AppHeader
            onBack={() => go(skillReturn)}
            title="Skill card"
          />
          {(() => {
            const completed = skillProgress[activeSkill.id]?.length ?? 0
            const cardState =
              completed === 3
                ? "milestone"
                : completed > 0
                  ? "progress"
                  : "discovered"
            return (
              <>
                <div className={`skill-detail-hero ${cardState}`}>
                  <div className="detail-state">
                    <span>
                      {cardState === "milestone"
                        ? "LEARNING MILESTONE ACHIEVED"
                        : cardState === "progress"
                          ? "IN PROGRESS"
                          : "DISCOVERED"}
                    </span>
                    <b>{completed} / 3 missions</b>
                  </div>
                  <SkillIllustration skill={activeSkill} state={cardState} />
                  <div className="skill-title">
                    <span>{activeSkill.careerName}</span>
                    <h1>{activeSkill.name}</h1>
                    <p>{activeSkill.description}</p>
                  </div>
                  <div className="skill-hero-progress">
                    <i>
                      <em style={{ transform: `scaleX(${completed / 3})` }} />
                    </i>
                    <small>
                      {cardState === "milestone"
                        ? "Card visual upgrade unlocked"
                        : "Complete missions to evolve this card"}
                    </small>
                  </div>
                </div>

                <div className="skill-detail-content">
                  <section className="skill-panel missions-panel">
                    <div className="section-heading">
                      <div>
                        <span className="eyebrow">PRACTICAL MISSIONS</span>
                        <h2>Learn by doing</h2>
                      </div>
                      <span className="time-chip">{activeSkill.time}</span>
                    </div>
                    <p className="panel-intro">
                      These tasks are lightweight learning evidence, not an
                      assessment of mastery.
                    </p>
                    <div className="skill-missions">
                      {activeSkill.missions.map((mission, index) => {
                        const complete = (
                          skillProgress[activeSkill.id] ?? []
                        ).includes(index)
                        return (
                          <button
                            className={complete ? "complete" : ""}
                            key={mission}
                            onClick={() =>
                              toggleSkillMission(activeSkill.id, index)
                            }
                            type="button"
                          >
                            <span>
                              {complete ? (
                                <Icon name="check" size={17} />
                              ) : (
                                index + 1
                              )}
                            </span>
                            <div>
                              <small>MISSION {index + 1}</small>
                              <strong>{mission}</strong>
                            </div>
                            <i>{complete ? "Complete" : "Mark done"}</i>
                          </button>
                        )
                      })}
                    </div>
                  </section>

                  <section className="skill-panel course-panel">
                    <div><span className="eyebrow">LEARNING RESOURCE</span><h2>{activeResource.resource}</h2><p>Free public learning material checked 22 October 2026. Use synthetic data. Completion is not verified proficiency.</p><a href={activeResource.url} target="_blank" rel="noreferrer">Open learning resource</a></div>
                  </section>

                  <section className="skill-panel"><h2>Potential SDG contribution</h2><p><a href="https://sdgs.un.org/goals/goal4" target="_blank" rel="noreferrer">UN Target {activeResource.sdg.target}</a>: {activeResource.sdg.reason}</p><p>This is a proposed learning contribution. No SDG impact has been measured.</p></section>

                  <section className="skill-panel outlook-panel">
                    <h2>Build skills that travel.</h2><p>Practice checking results and explaining your decisions alongside the tools. AI adoption varies; exposure is not a prediction of job loss.</p>
                    <button className="outlook-link" onClick={openImpact} type="button">Explore AI scenarios <Icon name="arrow" size={17} /></button>
                    <details className="pathway-notes"><summary>Sources & uncertainty</summary><TrendPanel trend={trend} status={trendStatus} refresh={refreshTrend} /></details>
                  </section>
                </div>
              </>
            )
          })()}
        </section>
      )}

      {screen === "career" && (
        <section className={`career-detail ${activeCareer.accent}`}>
          <AppHeader
            onBack={() => go(careerReturn)}
            title="Career overview"
          />
          <div className="career-hero">
            <span className="eyebrow">{activeCareer.domain}</span>
            <h1>{activeCareer.title}</h1>
            <p>{activeCareer.summary}</p>
            <CareerObject type={activeCareer.id} />
          </div>
          <div className="detail-content">
            <div className="detail-section">
              <span className="eyebrow">WHY IT SURFACED</span>
              <h2>Your evidence connection</h2>
              <p>{recommendation}</p><Evidence answers={answers} />
              <p>{activeRole.sourceNote} <a href={activeRole.sourceUrl} target="_blank" rel="noreferrer">Occupation evidence: {activeRole.source}</a></p>
              <div className="evidence-chips">
                {selectedRanking?.breakdown.filter((part) => part.contribution > 0).sort((a, b) => b.contribution - a.contribution).slice(0, 3).map((part) => <span key={part.dimension}>{part.dimension}</span>)}
              </div>
            </div>
            <div className="detail-section">
              <span className="eyebrow">THE WORK</span>
              <h2>What you might do</h2>
              <ul>
                {activeRole.workExamples.map((example) => <li key={example}><Icon name="check" size={16} />{example}</li>)}
              </ul>
            </div>
            <div className="detail-grid">
              <div>
                <span className="eyebrow">WORK STYLE</span>
                <strong>Focused + collaborative</strong>
                <small>
                  Independent analysis with regular stakeholder conversations.
                </small>
              </div>
              <div>
                <span className="eyebrow">ENTRY ROUTES</span>
                <strong>Projects build proof</strong>
                <small>
                  Portfolio projects, internships, operations roles, or guided
                  courses.
                </small>
              </div>
            </div>
            <div className="detail-section impact-sdg-section">
              <div>
                <span className="eyebrow">AI & SOCIETAL CONTEXT</span>
                <h2>Explore change responsibly</h2>
                <p>
                  Compare assumption-based disruption scenarios and review the pathway’s
                  potential UN Sustainable Development Goal alignment.
                </p>
                <button onClick={openImpact} type="button">
                  Open AI scenario explorer <Icon name="arrow" size={16} />
                </button>
              </div>
              <div className="sdg-map">
                <span>PROPOSED SDG ALIGNMENT</span>
                {activeRole.sdgs.map((sdg) => (
                  <b key={sdg.target}>Target {sdg.target}</b>
                ))}
                <small>
                  Proposed contribution only. No SDG outcome is measured.
                </small>
              </div>
            </div>
            <div className="detail-section">
              <span className="eyebrow">SKILL COLLECTION</span>
              <h2>Cards for this pathway</h2>
              <p>
                Open a skill to view practical missions, learning time, and a
                source-linked resource.
              </p>
              <div className="career-skill-links">
                {skills
                  .filter((skill) => skill.career === activeCareer.id)
                  .map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => openSkill(skill.id)}
                      type="button"
                    >
                      <span className={skill.accent}>
                        <Icon name={skill.icon} size={18} />
                      </span>
                      <div>
                        <strong>{skill.name}</strong>
                        <small>
                          {intakeSkills.includes(skill.id)
                            ? "Self-reported"
                            : "Growth opportunity"}{" "}
                          · {skillProgress[skill.id]?.length ?? 0} / 3 missions
                        </small>
                      </div>
                      <Icon name="arrow" size={16} />
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <SdgMapping roleId={activeRole.id} />
          <div className="sticky-action">
            <PrimaryButton disabled={!supported} onClick={() => go("pathway")}>
              Start beginner pathway
            </PrimaryButton>
          </div>
        </section>
      )}

      {screen === "pathway" && (
        <section className="main-screen pathway-screen">
          <AppHeader title="My pathway" logoState={dashboardLogoState} />
          <button className="pathway-role-change" type="button" onClick={()=>go('recommendations')}>Change career</button>
          <Pathway scenarioControl={<ScenarioSelector scenario={impactScenario} onChange={setImpactScenario} />} roleId={activeRole.id} scenario={impactScenario} selected={intakeSkills} onProfileChange={setIntakeSkills} completed={activePathProgress} onToggle={(id) => {
            const complete = activePathProgress.includes(id)
            setPathwayProgress(current => ({...current, [selectedCareer]:complete ? activePathProgress.filter(item => item !== id) : [...activePathProgress,id]}))
            announce(complete ? "Step marked incomplete" : "Step complete. Keep going at your own pace.")
          }} />
        </section>
      )}

      {screen === "impact" && (
        <section className="impact-screen">
          <AppHeader
            onBack={() => go(impactReturn)}
            title="AI outlook"
          />
          <div className="impact-heading">
            <span className="eyebrow">SCENARIO EXPLORER</span>
            <h1>
              How might the
              <br />
              work change?
            </h1>
            <p>
              Compare two qualitative assumptions. Neither is a forecast, and neither has an assigned probability. Selecting one updates role weights and learning priorities.
            </p>
          </div>
          <ScenarioSelector scenario={impactScenario} onChange={setImpactScenario} />
          <section className="mvp-panel scenario-method">
            <h2>What changes when you switch?</h2>
            <p>{adoptionScenarios.find((scenario) => scenario.id === impactScenario)?.limitation}</p>
            <p>In the accelerated scenario, the same assessment signals are reweighted toward evidence checking and collaborative explanation. The pathway moves verification and communication skills earlier when their prerequisites are ready. These are transparent product rules, not claims that any task or occupation will be automated.</p>
          </section>
          <RoleMatches answers={answers} selectedSkills={intakeSkills} scenario={impactScenario} onSelect={(roleId) => openCareer(roleId)} />
          <TrendPanel trend={trend} status={trendStatus} refresh={refreshTrend} />
          <SdgMapping />
        </section>
      )}

      {screen === "logo-system" && (
        <section className="main-screen identity-screen">
          <AppHeader onBack={() => go("dashboard")} title="Your identity" logoState={dashboardLogoState} />
          <div className="identity-hero"><LivingMark state={dashboardLogoState} label="Your Aiversecity identity" /><h1>A little growth,<br />every day.</h1><p>Your mark reflects your progress. Rest never takes it away.</p></div>
          <div className="identity-states">{logoStates.map(item => <div key={item.id}><LivingMark state={item.id} /><strong>{item.name}</strong></div>)}</div>
          <details className="pathway-notes"><summary>About the home-screen icon</summary><p>Aiversecity uses the A and orbit mark as its home-screen icon. These six expressions appear inside the app. Your phone controls the installed icon and may keep a cached copy.</p></details>
        </section>
      )}

      {screen === "dashboard" && (
        <section className="main-screen dashboard-screen">
          <AppHeader
            logoState={dashboardLogoState}
            action={
              <button
                className="avatar"
                type="button"
                aria-label="Open profile"
              >
                {name ? name.slice(0, 2).toUpperCase() : "KA"}
                <i />
              </button>
            }
          />
          <div className="dashboard-greeting">
            <span className="eyebrow">YOUR NEXT CHAPTER</span>
            <h1>Good to see you{name ? `, ${name}` : ""}.</h1>
            <p>Pick up where you left off or compare another possible path.</p>
          </div>
          <button
            className="continue-card"
            onClick={() => go("pathway")}
            type="button"
          >
            <div>
              <span className="eyebrow">CONTINUE YOUR PATH</span>
              <h2>{activeCareer.title} foundations</h2>
              <p>{activePathProgress.length} of {activeRole.skills.length+1} beginner practice steps complete</p>
              <i>
                <em style={{ width: `${activePathProgress.length / (activeRole.skills.length+1) * 100}%` }} />
              </i>
            </div>
            <span className="continue-icon">
              <Icon name="arrow" />
            </span>
            <CareerObject type={activeCareer.id} />
          </button>
          <div className="dashboard-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">CAREER EXPLORATION</span>
                <h2>Explore your paths</h2>
              </div>
              <button onClick={() => go("recommendations")} type="button">
                View all <Icon name="arrow" size={15} />
              </button>
            </div>
            <div className="mini-careers">
              {careers.map((career) => (
                <button
                  key={career.id}
                  onClick={() => openCareer(career.id)}
                  type="button"
                >
                  <span className={career.accent}>
                    <Icon
                      name={
                        career.id === "data"
                          ? "chart"
                          : career.id === "software"
                            ? "grid"
                            : "spark"
                      }
                    />
                  </span>
                  <div>
                    <strong>{career.title}</strong>
                    <small>{career.domain}</small>
                  </div>
                  <Icon name="arrow" size={17} />
                </button>
              ))}
            </div>
          </div>
          <div className="dashboard-grid">
            <button onClick={() => go("skills")} type="button">
              <span>
                <Icon name="grid" />
              </span>
              <strong>Skill collection</strong>
              <small>
                {totalSkillMissions} missions · {skills.length} cards
              </small>
            </button>
            <button onClick={() => go("capability")} type="button">
              <span>
                <Icon name="spark" />
              </span>
              <strong>Capability profile</strong>
              <small>Review your response evidence</small>
            </button>
            <button onClick={() => go("logo-system")} type="button">
              <span>
                <LivingMark state={dashboardLogoState} />
              </span>
              <strong>Your identity</strong>
              <small>A mark that grows with you</small>
            </button>
            <button onClick={openImpact} type="button">
              <span>
                <Icon name="spark" />
              </span>
              <strong>AI outlook</strong>
              <small>Compare 3 uncertain adoption scenarios</small>
            </button>
          </div>
          <details className="pathway-notes dashboard-notes"><summary>About your progress</summary><p>Your responses guide exploration, not a verified career assessment. Use fictional data. Progress stays in this visit and clears when you reload.</p></details>
        </section>
      )}

      {mainScreens.includes(screen) && <BottomNav current={screen} go={go} />}
      {feedback && (
        <div className="feedback-toast" role="status" aria-live="polite">
          <span>
            <Icon name="check" size={16} />
          </span>
          {feedback}
        </div>
      )}
    </main>
  )
}
