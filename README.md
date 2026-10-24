# Aiversecity

Aiversecity is a web app for students exploring possible career directions. Users answer a short assessment and receive three suggested pathways.

- Data Analyst
- Software Developer
- Operations Research Analyst

The assessment uses clear scoring rules in the browser. It is for career exploration and learning planning. It does not predict employment outcomes.

## Team Information

| Item | Details |
| --- | --- |
| Team | Ctrl+S |
| Domain | Domain 1 Aiversecity Future-Ready Workforce |
| SDG track | SDG 8 Decent Work and Economic Growth with support for SDG 4 Quality Education |
| University | Xiamen University Malaysia |
| Team size | 5 |

## Project Links

| Item | Link |
| --- | --- |
| Live prototype | [Open Aiversecity](https://ctrls-aiversecity.replit.app) |
| Product demo | [Watch on YouTube](https://youtu.be/D1d8F0OJGY8) |
| Pitch deck | [PDF](submission/SDC2026_Ctrl+S_PitchDeck.pdf) |
| Preliminary proposal | [PDF](submission/SDC2026_Ctrl+S_Preliminary.pdf) |
| Technical and tools declaration | [PDF](submission/SDC2026_Ctrl+S_TechDeclaration.pdf) |
| Replit proof of use | [PDF](submission/SDC2026_Ctrl+S_Replit_POU.pdf) |

## What It Does

Users select skills they have tried and respond to four workplace scenarios. The app compares their answers with the three pathway profiles and shows why a pathway is relevant. Each pathway includes suggested areas to practise and public learning resources.

The app also shows selected public occupation and news context when those sources are available. Assessment answers stay in the browser and are cleared when the page reloads.

## Technology

| Area | Used |
| --- | --- |
| Frontend | React, TypeScript, Tailwind CSS |
| Development and build | Vite, Node.js, npm |
| Public data handlers | TypeScript and fast-xml-parser |
| Hosting and development | Replit |
| Source control | GitHub |
| Testing | Node test runner, tsx, Playwright |
| Database, accounts and runtime AI model | Not used |
| RunPod | Not used because this prototype has no GPU workload |

## Run Locally

Use Node.js 22.12 or later.

```sh
git clone https://github.com/davidy1402/ctrl-s-sdc2026.git
cd ctrl-s-sdc2026
npm run setup
npm run dev
```

Run the checks with

```sh
npm test
npm run typecheck
npm run build
```

For browser tests

```sh
cd frontend
npx playwright install chromium
npm run test:e2e
```

## Project Structure

```text
frontend/     Application source and tests
docs/         Technical notes and third party notices
submission/   Proposal, declaration, Replit proof and pitch deck
.replit       Replit run settings
LICENSE       Apache License 2.0
```

## Team

- Yong Jia Wei
- Rania Kamoun
- Anes Nasr Anes Abbas
- Tee Sou See
- Akhrorov Muhammadsodik

AI-assisted development tools used by the team are declared in the [Technical and Tools Declaration](submission/SDC2026_Ctrl+S_TechDeclaration.pdf).

## License

The project code is licensed under [Apache License 2.0](LICENSE). Third-party components and public information remain under their own licences and terms.
