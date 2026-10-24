# Aiversecity

A web app that helps students explore three career pathways and decide what to practise next.

## Team Information

| Field | Details |
| --- | --- |
| Team Name | Ctrl+S |
| Team Domain | Domain 1 - Aiversecity Future-Ready Workforce |
| SDG Track (1-17) | SDG 8 - Decent Work and Economic Growth; SDG 4 is a supporting goal |
| Team Leader | Yong Jia Wei |
| University | Xiamen University Malaysia |
| Number of Members | 5 |

## Links

| Resource | Link |
| --- | --- |
| GitHub Repository | [davidy1402/ctrl-s-sdc2026](https://github.com/davidy1402/ctrl-s-sdc2026) |
| Live Demo / Replit Deployment | [Open Aiversecity](https://ctrls-aiversecity.replit.app) |
| RunPod Endpoint | Not applicable. This prototype has no GPU workload. |
| Slide Deck | [Pitch deck PDF](submission/SDC2026_CtrlS_PitchDeck.pdf) |
| Demo Video | [YouTube pitch and product demo](https://youtu.be/D1d8F0OJGY8) |
| Preliminary Proposal | [Proposal PDF](submission/SDC2026_CtrlS_Preliminary.pdf) |
| Technical & Tools Declaration | [Declaration PDF](submission/SDC2026_CtrlS_TechDeclaration.pdf) |
| Replit Proof of Use | [Workspace and usage screenshots](submission/SDC2026_CtrlS_Replit_POU.pdf) |

The PDFs and links are indexed in [the submission folder](submission/README.md).

## Overview

### Problem

Students face scattered career advice and conflicting claims about how AI will change work. It can be difficult to connect their strengths with a role or a useful next learning step. Aiversecity gives them a guided place to start.

### Solution

Users select skills they have tried and answer short workplace scenarios. The app compares their responses with three role profiles: Data Analyst, Software Developer, and Operations Research Analyst. It explains the matches and provides a learning pathway for each role.

The running app uses deterministic scoring rules and does not call an AI model. Public occupation information, a dated BLS trend source, and official news feeds provide context. Results support exploration and do not predict employment or verify skills.

### Key Features

- **Skills intake and assessment:** a fictional alias, self-reported skills, and four workplace scenarios.
- **Explainable matches:** three role profiles with visible reasoning and score contributions.
- **Learning pathways:** role-specific practice tasks, prerequisites, and public learning resources.
- **Updatable context:** BLS occupation data and UN News/MOSTI feeds, with dates and availability states.
- **Scenario comparison:** two hypothetical approaches to AI adoption and their effects on priorities.
- **SDG connections:** explanations linking roles and skills to relevant targets.

### Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, TypeScript, Tailwind CSS |
| Development and build | Vite, Node.js, npm |
| Server endpoints | TypeScript public-data handlers and fast-xml-parser |
| Database / authentication | None |
| Runtime AI / GPU | None. Matching uses rules in the browser. |
| Hosting / development | Replit |
| Source control | GitHub |
| Testing | Node test runner, tsx, Playwright |

## Project Structure

```text
.
├── docs/                               # Sources, methodology and technical notes
├── frontend/
│   ├── src/
│   │   ├── main.tsx                    # Application entry point
│   │   └── mvp/                        # Assessment, matching, pathways and unit tests
│   ├── api/                            # Public-data HTTP entry points
│   ├── e2e/                            # Browser tests
│   ├── public/                         # Static assets and dated data snapshot
│   └── package-lock.json               # Locked JavaScript dependencies
├── submission/
│   ├── SDC2026_CtrlS_Preliminary.pdf
│   ├── SDC2026_CtrlS_TechDeclaration.pdf
│   ├── SDC2026_CtrlS_Replit_POU.pdf
│   ├── SDC2026_CtrlS_PitchDeck.pdf
│   └── README.md                       # Deliverable index
├── .gitignore
├── .replit                             # Replit Run configuration
├── LICENSE                             # Apache License 2.0
├── package.json                        # Root setup, run and verification commands
└── README.md
```

This is a TypeScript project. Source and tests stay under `frontend/`; there is no Python dependency file or RunPod handler.

### Architecture

```text
Browser: intake -> assessment rules -> career matches -> learning pathway
    |
    +-> Replit-hosted public-data endpoints
            +-> BLS occupation information
            +-> UN News RSS
            +-> MOSTI RSS
```

Assessment answers remain in browser memory and are not sent to these public sources. Reloading clears the assessment and practice progress.

## How to Run

### Option 1 - Open the Replit Deployment

Open [the live app](https://ctrls-aiversecity.replit.app). No account or API key is needed. Use a fictional name and sample answers.

To run a development copy on Replit, import this repository and click Run. The `.replit` configuration installs locked dependencies and starts Vite on port 5173.

### Option 2 - Run Locally

Use Node.js 22.12 or later:

```sh
git clone https://github.com/davidy1402/ctrl-s-sdc2026.git
cd ctrl-s-sdc2026
npm run setup
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`. No environment variables or paid API credentials are required. Internet access is needed to refresh public sources.

### Run Tests

```sh
npm test
npm run typecheck
npm run build
```

For browser tests:

```sh
cd frontend
npx playwright install chromium
npm run test:e2e
```

See [the frontend notes](frontend/README.md) for scoring rules, source details, and limitations. Dated development notes describe the state when written.

## How We Use Replit

We imported the project into Replit, used it to run and work on the app, and deployed the public prototype there. [Proof of use](submission/SDC2026_CtrlS_Replit_POU.pdf) contains the workspace and account usage screenshots. The deployed app is linked above. No runtime GenAI API was used.

## How We Use RunPod

RunPod was not used because the prototype has no GPU workload. There is no RunPod endpoint or handler.

## Challenges & Learnings

- Public sources can be slow or unavailable. The app separates publication dates from retrieval times and reports stale or missing evidence.
- U.S. occupation projections cannot establish Malaysian hiring demand. Their scope is labelled, and news provides context only.
- Scores can appear more certain than the evidence supports. The app shows its reasoning and describes results as exploration guidance.

Only Data Analyst uses the related U.S. Data Scientists trend proxy. The other roles do not receive a trend direction from that source. See [the trend methodology](docs/TREND-METHODOLOGY.md).

## Future Improvements

- [ ] Test the flow with student volunteers and measure whether they can identify a pathway and next learning action.
- [ ] Review scoring weights and accessibility with users.
- [ ] Add more relevant Malaysian occupation and skills evidence.
- [ ] Consider a source-checked AI explanation feature if it adds value.

## Team

| Name | Role | GitHub |
| --- | --- | --- |
| Yong Jia Wei | Team leader | [@davidy1402](https://github.com/davidy1402) |
| Rania Kamoun | Team member | Not listed |
| Anes Nasr Anes Abbas | Team member | Not listed |
| Tee Sou See | Team member | Not listed |
| Akhrorov Muhammadsodik | Team member | Not listed |

The team used Codex, ChatGPT, Figma Make, Gemini, and Antigravity during development. Their uses are recorded in the [Technical & Tools Declaration](submission/SDC2026_CtrlS_TechDeclaration.pdf).

## Submission Checklist

- [x] Team name, domain, SDG track and registered names recorded
- [x] Pitch deck PDF and YouTube link added
- [x] Replit used, with proof in `submission/`
- [x] RunPod applicability recorded: no GPU workload
- [x] Latest proposal and declaration PDFs copied into `submission/`
- [ ] Proposal final check: shorten Section 3.2 to 200 words or fewer and correct the workshop checkbox
- [x] Apache License 2.0 included
- [ ] Publish the final package and verify the public default branch
- [ ] Submit the GitHub repository link at the competition website

The organiser's Q&A confirms the deadline as **25 October 2026, 7:59 AM MYT**. Preparing this package does not establish that the website submission is complete.

## License

Original project code is licensed under [Apache License 2.0](LICENSE). Third-party code, fonts, and information retain their own licences and terms. See the declaration and [third-party notices](docs/licenses/README.md).
