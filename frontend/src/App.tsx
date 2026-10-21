import { useEffect, useState } from "react"

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

const careers = [
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
    title: "Software Engineer",
    domain: "PRODUCTS & SYSTEMS",
    accent: "violet",
    summary:
      "Build reliable digital products by turning ideas into working systems.",
    why: "You showed structured problem solving, curiosity about how systems work, and a preference for testing practical solutions.",
    sdgs: ["4 · Quality Education", "8 · Decent Work", "9 · Innovation"],
  },
  {
    id: "ai",
    rank: "03",
    title: "AI Engineer",
    domain: "AI & APPLIED SYSTEMS",
    accent: "orange",
    summary:
      "Design and evaluate AI-enabled systems for useful, responsible outcomes.",
    why: "Your choices combined pattern recognition, evidence checking, and an interest in improving technical systems.",
    sdgs: ["4 · Quality Education", "8 · Decent Work", "9 · Innovation"],
  },
]

const skills = [
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
    course: "Intro to SQL for Analysis · Course placeholder",
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
    course: "Spreadsheet Foundations · Course placeholder",
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
    course: "Visual Storytelling Basics · Course placeholder",
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
    course: "Practical Statistics · Course placeholder",
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
    careerName: "Software Engineer",
    accent: "violet",
    icon: "grid" as IconName,
    description:
      "Express solutions as readable, maintainable instructions for computers.",
    time: "10–12 hours",
    course: "Programming Foundations · Course placeholder",
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
    careerName: "Software Engineer",
    accent: "violet",
    icon: "compass" as IconName,
    description:
      "Find, isolate, and explain why software behaves unexpectedly.",
    time: "5–7 hours",
    course: "Debugging Mindset · Course placeholder",
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
    careerName: "Software Engineer",
    accent: "violet",
    icon: "route" as IconName,
    description:
      "Shape components and trade-offs into a dependable technical system.",
    time: "8–10 hours",
    course: "Systems Thinking for Developers · Course placeholder",
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
    careerName: "Software Engineer",
    accent: "violet",
    icon: "check" as IconName,
    description: "Design checks that make software behavior safer to change.",
    time: "4–6 hours",
    course: "Practical Software Testing · Course placeholder",
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
    career: "ai",
    careerName: "AI Engineer",
    accent: "orange",
    icon: "grid" as IconName,
    description:
      "Build readable data and AI workflows in a widely used language.",
    time: "10–12 hours",
    course: "Python for AI Workflows · Course placeholder",
    pressure: "High task assistance",
    trend:
      "AI can draft code; reliable integration, review, and domain logic remain important.",
    adapt: ["Code review", "Data handling", "Workflow design"],
    missions: [
      "Transform a small CSV file",
      "Call a mock model function",
      "Package a reusable data helper",
    ],
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    career: "ai",
    careerName: "AI Engineer",
    accent: "orange",
    icon: "spark" as IconName,
    description:
      "Frame prediction problems and train models with appropriate data.",
    time: "12–16 hours",
    course: "Applied ML Foundations · Course placeholder",
    pressure: "Moderate task pressure",
    trend:
      "Model building is becoming accessible; problem framing and data quality grow in importance.",
    adapt: ["Problem framing", "Data quality", "Baseline comparison"],
    missions: [
      "Define a prediction target",
      "Train a simple baseline model",
      "Compare two model results",
    ],
  },
  {
    id: "model-evaluation",
    name: "Model Evaluation",
    career: "ai",
    careerName: "AI Engineer",
    accent: "orange",
    icon: "chart" as IconName,
    description:
      "Test whether an AI system is useful, reliable, and appropriate for its context.",
    time: "6–8 hours",
    course: "Responsible Model Evaluation · Course placeholder",
    pressure: "Lower task pressure",
    trend:
      "As models spread, rigorous evaluation and human oversight become more valuable.",
    adapt: ["Evaluation design", "Bias awareness", "Failure analysis"],
    missions: [
      "Choose a useful evaluation metric",
      "Review ten mock model outputs",
      "Document a failure pattern",
    ],
  },
  {
    id: "mlops",
    name: "MLOps",
    career: "ai",
    careerName: "AI Engineer",
    accent: "orange",
    icon: "route" as IconName,
    description:
      "Operate model workflows reliably from experiment to production.",
    time: "10–14 hours",
    course: "MLOps Starter Lab · Course placeholder",
    pressure: "Moderate task pressure",
    trend:
      "Automation expands deployment options; monitoring and accountability stay essential.",
    adapt: ["Monitoring", "Version control", "Incident response"],
    missions: [
      "Version a mock model artifact",
      "Design a monitoring checklist",
      "Plan a safe rollback",
    ],
  },
]

const pathwayData = {
  data: {
    skill: "sql",
    time: "About 2 hours total",
    missions: [
      [
        "Orientation",
        "Compare two Data Analyst role descriptions",
        "10 min",
        "Notice repeated responsibilities, tools, and outcomes.",
      ],
      [
        "Tool trial",
        "Clean a small messy spreadsheet",
        "25 min",
        "Rename, sort, remove duplicates, and document choices.",
      ],
      [
        "Mini project",
        "Find one story in public data",
        "45 min",
        "Create a simple chart and write a three-sentence insight.",
      ],
      [
        "Reflection",
        "Review what felt energizing",
        "10 min",
        "Capture what you liked, disliked, and want to test next.",
      ],
    ],
  },
  software: {
    skill: "programming",
    time: "About 2.5 hours total",
    missions: [
      [
        "Orientation",
        "Compare two Software Engineer role descriptions",
        "10 min",
        "Notice the products, teams, and technologies involved.",
      ],
      [
        "Tool trial",
        "Edit and run a small program",
        "30 min",
        "Change one behavior and explain what the code does.",
      ],
      [
        "Mini project",
        "Build a simple interactive utility",
        "60 min",
        "Break the idea into steps, test it, and document one decision.",
      ],
      [
        "Reflection",
        "Review your building experience",
        "10 min",
        "Capture what felt satisfying and where you wanted more support.",
      ],
    ],
  },
  ai: {
    skill: "python",
    time: "About 3 hours total",
    missions: [
      [
        "Orientation",
        "Compare two AI Engineer role descriptions",
        "10 min",
        "Notice where modeling ends and software engineering begins.",
      ],
      [
        "Tool trial",
        "Inspect a small Python data workflow",
        "30 min",
        "Trace inputs, transformations, and outputs.",
      ],
      [
        "Mini project",
        "Evaluate mock model outputs",
        "60 min",
        "Define useful criteria and document one recurring failure.",
      ],
      [
        "Reflection",
        "Review the responsible AI trade-offs",
        "15 min",
        "Capture risks, assumptions, and questions you would investigate.",
      ],
    ],
  },
}

const impactScenarios = [
  {
    id: "assistive",
    name: "Assistive adoption",
    horizon: "AI supports selected tasks",
    summary:
      "Routine drafting and lookup accelerate while people retain workflow ownership.",
  },
  {
    id: "accelerated",
    name: "Accelerated automation",
    horizon: "More tasks become automated",
    summary:
      "Review, integration, quality control, and domain judgment become stronger differentiators.",
  },
  {
    id: "uneven",
    name: "Uneven adoption",
    horizon: "Adoption varies by team",
    summary:
      "Tool fluency matters alongside the ability to work effectively without automated support.",
  },
] as const

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
    <div className={`career-object ${type}`} aria-hidden="true">
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
      {type === "ai" && (
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
          <em style={{ width: `${completed * 33.333}%` }} />
        </i>
      </span>
    </button>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash")
  const [role, setRole] = useState("")
  const [name, setName] = useState("")
  const [question, setQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [selectedCareer, setSelectedCareer] = useState("data")
  const [careerReturn, setCareerReturn] = useState<Screen>("recommendations")
  const [pathwayProgress, setPathwayProgress] =
    useState<Record<string, number[]>>({
      data: [0],
      software: [],
      ai: [],
    })
  const [selectedSkill, setSelectedSkill] = useState("sql")
  const [skillReturn, setSkillReturn] = useState<Screen>("skills")
  const [skillFilter, setSkillFilter] = useState("all")
  const [intakeSkills, setIntakeSkills] = useState<string[]>([])
  const [skillProgress, setSkillProgress] = useState<Record<string, number[]>>({
    sql: [0, 1, 2],
    excel: [0],
  })
  const [logoPreview, setLogoPreview] = useState<LogoState>("growing")
  const [impactScenario, setImpactScenario] =
    useState<typeof impactScenarios[number]["id"]>("assistive")
  const [impactReturn, setImpactReturn] = useState<Screen>("dashboard")
  const [signalRevision, setSignalRevision] = useState(1)
  const [feedback, setFeedback] = useState("")

  const go = (next: Screen) => {
    setScreen(next)
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
  const activeSkill =
    skills.find((skill) => skill.id === selectedSkill) ?? skills[0]
  const activePathway =
    pathwayData[(selectedCareer as keyof typeof pathwayData)]
  const activePathProgress = pathwayProgress[selectedCareer] ?? []
  const totalSkillMissions = Object.values(skillProgress).reduce(
    (total, missions) => total + missions.length,
    0,
  )
  const dashboardLogoState: LogoState = Object.values(skillProgress).some(
    (missions) => missions.length === 3,
  )
    ? "milestone"
    : totalSkillMissions > 0
      ? "growing"
      : "active"
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
              View demo dashboard
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
              What should we call you? <small>Optional</small>
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your first name"
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
              style={{ width: `${((question + 1) / questions.length) * 100}%` }}
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
              "Preparing three paths",
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
            action={<span className="simulated-label">SIMULATED</span>}
          />
          <div className="profile-hero">
            <span className="eyebrow">YOUR CURRENT SIGNALS</span>
            <h1>
              {name ? `${name}’s` : "Your"} capability
              <br />
              constellation
            </h1>
            <p>
              Based on four demonstration scenarios. Treat these as conversation
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
                <span className="eyebrow">DEMONSTRATED</span>
                <h2>Signals worth exploring</h2>
              </div>
              <span className="signal-pill">
                <Icon name="spark" size={13} /> 3 signals
              </span>
            </div>
            {[
              [
                "Pattern recognition",
                "You noticed relationships before jumping to a conclusion.",
                "Strong signal",
                "long",
              ],
              [
                "Evidence-led reasoning",
                "You preferred checking sources and assumptions together.",
                "Demonstrated",
                "medium",
              ],
              [
                "Systems thinking",
                "You looked for causes in a process, not individual blame.",
                "Developing",
                "short",
              ],
            ].map(([title, text, status, length], index) => (
              <article className="signal-card" key={title}>
                <span className="signal-icon">
                  <Icon
                    name={
                      index === 0 ? "chart" : index === 1 ? "compass" : "grid"
                    }
                  />
                </span>
                <div>
                  <span className="signal-top">
                    <strong>{title}</strong>
                    <small>{status}</small>
                  </span>
                  <p>{text}</p>
                  <i>
                    <em className={length} />
                  </i>
                </div>
              </article>
            ))}
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
            Reveal three career paths
          </PrimaryButton>
        </section>
      )}

      {screen === "recommendations" && (
        <section className="main-screen wide-screen">
          <AppHeader
            title="Career paths"
            action={<span className="simulated-label">SIMULATED</span>}
          />
          <div className="result-heading">
            <span className="eyebrow">YOUR SHORTLIST</span>
            <h1>
              Three places
              <br />
              to begin exploring.
            </h1>
            <p>
              Ordered by how directly the demonstration signals connect to
              day-to-day work — not by guaranteed fit.
            </p>
          </div>
          <div className="career-track">
            {careers.map((career) => (
              <button
                className={`career-card ${career.accent}`}
                key={career.id}
                onClick={() => openCareer(career.id)}
                type="button"
              >
                <span className="card-meta">
                  <span>{career.rank}</span>
                  {career.id === "data" && (
                    <b>
                      <Icon name="spark" size={12} /> Best starting point
                    </b>
                  )}
                </span>
                <span className="card-copy">
                  <small>{career.domain}</small>
                  <strong>{career.title}</strong>
                  <span>{career.summary}</span>
                </span>
                <CareerObject type={career.id} />
                <span className="card-arrow">
                  <Icon name="arrow" />
                </span>
              </button>
            ))}
          </div>
          <div className="why-panel">
            <span className="why-icon">
              <Icon name="spark" />
            </span>
            <div>
              <span className="eyebrow">WHY THESE PATHS</span>
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
            action={<span className="simulated-label">MOCK CONTENT</span>}
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
              ["ai", "AI"],
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
              <strong>Prototype collection:</strong> Skills, learning times,
              courses, and outlooks are temporary mock content for testing the
              experience.
            </p>
          </div>
        </section>
      )}

      {screen === "skill" && (
        <section className={`skill-detail ${activeSkill.accent}`}>
          <AppHeader
            onBack={() => go(skillReturn)}
            title="Skill card"
            action={<span className="simulated-label">PLACEHOLDER DATA</span>}
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
                      <em style={{ width: `${completed * 33.333}%` }} />
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
                    <span className="course-icon">
                      <Icon name="route" />
                    </span>
                    <div>
                      <span className="eyebrow">SUGGESTED COURSE</span>
                      <h2>{activeSkill.course}</h2>
                      <p>
                        Course link and provider will be added after resource
                        review.
                      </p>
                    </div>
                    <button type="button" disabled>
                      Coming soon
                    </button>
                  </section>

                  <section className="skill-panel outlook-panel">
                    <div className="outlook-heading">
                      <span className="outlook-icon">
                        <Icon name="spark" />
                      </span>
                      <div>
                        <span className="eyebrow">FUTURE OUTLOOK</span>
                        <h2>AI impact at task level</h2>
                      </div>
                      <span className="placeholder-chip">
                        PLACEHOLDER INSIGHT
                      </span>
                    </div>
                    <div className="pressure-meter">
                      <div>
                        <strong>{activeSkill.pressure}</strong>
                        <small>
                          Directional label only — no prediction or statistic
                        </small>
                      </div>
                      <i
                        className={
                          activeSkill.pressure.startsWith("High")
                            ? "high"
                            : activeSkill.pressure.startsWith("Moderate")
                              ? "moderate"
                              : "lower"
                        }
                      >
                        <em />
                      </i>
                    </div>
                    <div className="trend-copy">
                      <span>MARKET TREND · MOCK SUMMARY</span>
                      <p>{activeSkill.trend}</p>
                    </div>
                    <div className="signal-provenance">
                      <div>
                        <span>MOCK SOURCE SLOT</span>
                        <strong>
                          Labor-market signal feed · Not connected
                        </strong>
                      </div>
                      <div>
                        <span>MOCK REVIEW DATE</span>
                        <strong>15 Mar 2025</strong>
                      </div>
                    </div>
                    <div className="adapt-skills">
                      <span>RECOMMENDED ADAPTATION SKILLS</span>
                      <div>
                        {activeSkill.adapt.map((item) => (
                          <b key={item}>{item}</b>
                        ))}
                      </div>
                    </div>
                    <div className="outlook-disclaimer">
                      <Icon name="info" size={17} />
                      <p>
                        This preview uses temporary editorial copy. It does not
                        cite research, forecast demand, or predict job outcomes.
                      </p>
                    </div>
                    <button
                      className="outlook-link"
                      onClick={openImpact}
                      type="button"
                    >
                      Compare AI disruption scenarios
                      <Icon name="arrow" size={17} />
                    </button>
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
            action={<span className="simulated-label">SIMULATED</span>}
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
              <p>{activeCareer.why}</p>
              <div className="evidence-chips">
                <span>Pattern recognition</span>
                <span>Structured thinking</span>
                <span>Evidence focus</span>
              </div>
            </div>
            <div className="detail-section">
              <span className="eyebrow">THE WORK</span>
              <h2>What you might do</h2>
              <ul>
                <li>
                  <Icon name="check" size={16} />
                  Turn questions into measurable requirements
                </li>
                <li>
                  <Icon name="check" size={16} />
                  Find useful patterns in information or processes
                </li>
                <li>
                  <Icon name="check" size={16} />
                  Explain findings to people with different expertise
                </li>
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
                  Compare mock disruption scenarios and review the pathway’s
                  potential UN Sustainable Development Goal alignment.
                </p>
                <button onClick={openImpact} type="button">
                  Open AI scenario explorer <Icon name="arrow" size={16} />
                </button>
              </div>
              <div className="sdg-map">
                <span>MOCK UN SDG MAPPING</span>
                {activeCareer.sdgs.map((sdg) => (
                  <b key={sdg}>{sdg}</b>
                ))}
                <small>
                  Illustrative alignment only; validation criteria will be added
                  later.
                </small>
              </div>
            </div>
            <div className="detail-section">
              <span className="eyebrow">SKILL COLLECTION</span>
              <h2>Cards for this pathway</h2>
              <p>
                Open a skill to view practical missions, learning time, and a
                placeholder future outlook.
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
          <div className="sticky-action">
            <PrimaryButton onClick={() => go("pathway")}>
              Start beginner pathway
            </PrimaryButton>
          </div>
        </section>
      )}

      {screen === "pathway" && (
        <section className="main-screen">
          <AppHeader
            title="My pathway"
            action={<span className="simulated-label">DEMO PLAN</span>}
          />
          <div className="pathway-heading">
            <span className="eyebrow">
              {activeCareer.title.toUpperCase()} · BEGINNER
            </span>
            <h1>
              Your first
              <br />
              four missions.
            </h1>
            <p>
              Small experiments help you learn whether you enjoy the work before
              investing in a longer course.
            </p>
          </div>
          <div className="pathway-progress">
            <div>
              <span>{activePathProgress.length} of 4 complete</span>
              <small>{activePathway.time}</small>
            </div>
            <i>
              <em style={{ width: `${activePathProgress.length * 25}%` }} />
            </i>
          </div>
          <div className="mission-list">
            {activePathway.missions.map(([type, title, time, text], index) => {
              const complete = activePathProgress.includes(index)
              return (
                <button
                  className={`mission ${complete ? "complete" : ""}`}
                  key={title}
                  onClick={() => {
                    setPathwayProgress((current) => ({
                      ...current,
                      [selectedCareer]: complete
                        ? activePathProgress.filter((item) => item !== index)
                        : [...activePathProgress, index],
                    }))
                    announce(
                      complete
                        ? "Pathway task marked incomplete"
                        : "Pathway task complete — progress saved",
                    )
                  }}
                  type="button"
                >
                  <span className="mission-node">
                    {complete ? <Icon name="check" /> : index + 1}
                  </span>
                  <div>
                    <span className="mission-meta">
                      {type} · {time}
                    </span>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                  <i>{complete ? "Done" : "Mark done"}</i>
                </button>
              )
            })}
          </div>
          <div className="placeholder-note">
            <Icon name="info" />
            <p>
              <strong>MVP placeholder:</strong> Mission content is illustrative.
              A production version would link to reviewed resources and save
              progress to an account.
            </p>
          </div>
          <button
            className="pathway-skill-cta"
            onClick={() => openSkill(activePathway.skill)}
            type="button"
          >
            <span className="cyan">
              <Icon name="grid" />
            </span>
            <div>
              <span className="eyebrow">FEATURED SKILL CARD</span>
              <strong>
                Continue your{" "}
                {skills.find((skill) => skill.id === activePathway.skill)?.name}{" "}
                missions
              </strong>
              <small>
                {skillProgress[activePathway.skill]?.length ?? 0} of 3 learning
                missions complete
              </small>
            </div>
            <Icon name="arrow" />
          </button>
        </section>
      )}

      {screen === "impact" && (
        <section className="impact-screen">
          <AppHeader
            onBack={() => go(impactReturn)}
            title="AI outlook"
            action={<span className="simulated-label">MOCK SIGNALS</span>}
          />
          <div className="impact-heading">
            <span className="eyebrow">SCENARIO EXPLORER</span>
            <h1>
              How might the
              <br />
              work change?
            </h1>
            <p>
              Explore multiple possibilities rather than one unsupported
              prediction. All signals, dates, and sources below are
              placeholders.
            </p>
          </div>
          <div
            className="scenario-tabs"
            role="tablist"
            aria-label="AI disruption scenario"
          >
            {impactScenarios.map((scenario) => (
              <button
                className={impactScenario === scenario.id ? "active" : ""}
                key={scenario.id}
                onClick={() => setImpactScenario(scenario.id)}
                role="tab"
                type="button"
                aria-selected={impactScenario === scenario.id}
              >
                <strong>{scenario.name}</strong>
                <small>{scenario.horizon}</small>
              </button>
            ))}
          </div>
          <div className="scenario-summary">
            <span>
              <Icon name="spark" />
            </span>
            <div>
              <span className="eyebrow">SELECTED MOCK SCENARIO</span>
              <h2>
                {
                  impactScenarios.find(
                    (scenario) => scenario.id === impactScenario,
                  )?.name
                }
              </h2>
              <p>
                {
                  impactScenarios.find(
                    (scenario) => scenario.id === impactScenario,
                  )?.summary
                }
              </p>
            </div>
          </div>
          <div className="impact-careers">
            {careers.map((career) => {
              const signals =
                career.id === "data"
                  ? [
                      "Drafting queries and summaries",
                      "Problem framing and evidence checks",
                      "SQL validation · stakeholder context",
                    ]
                  : career.id === "software"
                    ? [
                        "Boilerplate code and documentation",
                        "Architecture and quality ownership",
                        "Code review · system design",
                      ]
                    : [
                        "Model setup and experiment scaffolds",
                        "Evaluation and responsible deployment",
                        "Failure analysis · MLOps",
                      ]
              return (
                <article className={career.accent} key={career.id}>
                  <div className="impact-career-title">
                    <span>
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
                      <small>{career.domain}</small>
                      <h2>{career.title}</h2>
                    </div>
                  </div>
                  <div className="impact-signal">
                    <span>TASKS LIKELY TO CHANGE</span>
                    <p>{signals[0]}</p>
                  </div>
                  <div className="impact-signal">
                    <span>HUMAN VALUE TO STRENGTHEN</span>
                    <p>{signals[1]}</p>
                  </div>
                  <div className="impact-signal">
                    <span>ADAPTATION FOCUS</span>
                    <p>{signals[2]}</p>
                  </div>
                  <button onClick={() => openCareer(career.id)} type="button">
                    View career evidence <Icon name="arrow" size={16} />
                  </button>
                </article>
              )
            })}
          </div>
          <section className="source-ledger">
            <div className="section-heading">
              <div>
                <span className="eyebrow">SIGNAL LEDGER</span>
                <h2>Sources & review dates</h2>
              </div>
              <button
                onClick={() => {
                  setSignalRevision((value) => value + 1)
                  announce("Mock trend signals refreshed")
                }}
                type="button"
              >
                Refresh mock data
              </button>
            </div>
            {[
              [
                "Labor-market signal feed",
                "Source integration pending",
                "15 Mar 2025",
              ],
              [
                "Task exposure taxonomy",
                "Research partner pending",
                "15 Mar 2025",
              ],
              [
                "Course and skill catalog",
                "Provider review pending",
                "15 Mar 2025",
              ],
            ].map(([source, status, date]) => (
              <div className="source-row" key={source}>
                <span>
                  <Icon name="info" size={17} />
                </span>
                <div>
                  <strong>{source}</strong>
                  <small>{status}</small>
                </div>
                <time>{date}</time>
              </div>
            ))}
            <p>
              MOCK REVISION {signalRevision} · No live sources connected. Dates
              demonstrate the update model only.
            </p>
          </section>
        </section>
      )}

      {screen === "logo-system" && (
        <section className="living-system-screen">
          <AppHeader
            onBack={() => go("dashboard")}
            title="Living logo system"
            action={<span className="simulated-label">BRAND PREVIEW</span>}
            logoState={logoPreview}
          />
          <div className="living-heading">
            <span className="eyebrow">A BRAND THAT GROWS WITH YOU</span>
            <h1>
              One mark.
              <br />
              Six moments.
            </h1>
            <p>
              The core A and its orbit companion always remain intact. Activity
              changes its energy and expression, never the user’s progress or
              standing.
            </p>
          </div>

          <section className={`living-stage ${logoPreview}`}>
            <div className="stage-orbit orbit-one" />
            <div className="stage-orbit orbit-two" />
            <div className="hero-living-mark">
              <LivingMark
                state={logoPreview}
                label={`${logoStates.find((item) => item.id === logoPreview)?.name} Aiversecity logo`}
              />
            </div>
            <div className="stage-copy">
              <span>LIVE PREVIEW</span>
              <h2>
                {logoStates.find((item) => item.id === logoPreview)?.name}
              </h2>
              <p>
                {logoStates.find((item) => item.id === logoPreview)?.subtitle}
              </p>
            </div>
          </section>

          <div
            className="state-switcher"
            role="radiogroup"
            aria-label="Living logo state"
          >
            {logoStates.map((item, index) => (
              <button
                className={logoPreview === item.id ? "active" : ""}
                key={item.id}
                onClick={() => setLogoPreview(item.id)}
                role="radio"
                type="button"
                aria-checked={logoPreview === item.id}
              >
                <span className="state-mini-mark">
                  <LivingMark state={item.id} />
                </span>
                <span>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{item.name}</strong>
                  <i>{item.subtitle}</i>
                </span>
              </button>
            ))}
          </div>

          <section className="living-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">IN CONTEXT</span>
                <h2>One state, every surface</h2>
              </div>
              <span className="signal-pill">
                <Icon name="spark" size={13} /> {logoPreview}
              </span>
            </div>
            <div className="context-grid">
              <article className="context-card icon-context">
                <div className="phone-wallpaper">
                  <span className="app-icon">
                    <LivingMark state={logoPreview} />
                  </span>
                  <strong>Aiversecity</strong>
                </div>
                <span>APP ICON · 60PX FLOOR</span>
              </article>
              <article className="context-card splash-context">
                <div>
                  <Logo state={logoPreview} />
                  <i />
                  <small>Mapping possible paths</small>
                </div>
                <span>SPLASH SCREEN</span>
              </article>
              <article className="context-card dashboard-context">
                <div className="mini-dashboard">
                  <div>
                    <Logo state={logoPreview} />
                    <span>KA</span>
                  </div>
                  <small>YOUR EXPLORATION HUB</small>
                  <strong>Good to see you.</strong>
                  <i>
                    <em />
                  </i>
                </div>
                <span>DASHBOARD HEADER</span>
              </article>
            </div>
          </section>

          <section className="living-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">STATE LOGIC</span>
                <h2>Triggers & transitions</h2>
              </div>
              <span className="placeholder-chip">PROTOTYPE RULES</span>
            </div>
            <div className="trigger-list">
              {logoStates.map((item, index) => (
                <button
                  className={logoPreview === item.id ? "active" : ""}
                  key={item.id}
                  onClick={() => setLogoPreview(item.id)}
                  type="button"
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.trigger}</p>
                  </div>
                  <small>{item.transition}</small>
                  <Icon name="arrow" size={17} />
                </button>
              ))}
            </div>
          </section>

          <div className="rest-principle">
            <span>
              <Icon name="spark" size={22} />
            </span>
            <div>
              <span className="eyebrow">CORE PRINCIPLE</span>
              <h2>Rest is a state, not a setback.</h2>
              <p>
                Inactivity only quiets the mark. Cards, missions, milestones,
                and recommendations remain exactly where the user left them.
              </p>
            </div>
          </div>
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
            <span className="eyebrow">YOUR EXPLORATION HUB</span>
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
              <p>{activePathProgress.length} of 4 beginner missions complete</p>
              <i>
                <em style={{ width: `${activePathProgress.length * 25}%` }} />
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
                <span className="eyebrow">SAVED SHORTLIST</span>
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
              <small>Review your demonstrated signals</small>
            </button>
            <button onClick={() => go("logo-system")} type="button">
              <span>
                <LivingMark state={dashboardLogoState} />
              </span>
              <strong>Living logo</strong>
              <small>Preview six brand states</small>
            </button>
            <button onClick={openImpact} type="button">
              <span>
                <Icon name="spark" />
              </span>
              <strong>AI outlook</strong>
              <small>Compare 3 mock disruption scenarios</small>
            </button>
          </div>
          <div className="demo-banner">
            <Icon name="info" />
            <p>
              <strong>Prototype mode</strong> Results and progress are stored
              only for this session.
            </p>
          </div>
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
