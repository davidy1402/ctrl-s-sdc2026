# Ctrl+S · SDC Hackathon 2026

Domain 1: Aiversecity Future-Ready Workforce.

Build an AI app that helps people understand how AI may change their jobs, find suitable future careers, and plan which skills to learn next.

## Start here

- [Team hub](https://docs.google.com/document/d/1ASOWPZ-TJerlxiS-XfcJrthEzJZrEQT9YvjadSpBKIY/edit?usp=drivesdk) — shared entry, roles, folders and milestones.
- [Team tracker](https://docs.google.com/spreadsheets/d/1rON7N3G5cFCVUlUERtMlPEnpCi1E67DqsZ_iaFy28o8/edit?usp=drivesdk) — current task owners, dates, status, sources, questions and tools.
- [Kickoff agenda and notes](https://docs.google.com/document/d/1Nlud9VfC0v6MKqeEHp_lqtMenuyD2XvO56Uu7c0SeV8/edit?usp=drivesdk).
- [Team Drive folder](https://drive.google.com/drive/folders/1Ek1sRHeDVOYtUSiUGsDoHE9vUqaiofWZ).
- [Official competition materials](https://drive.google.com/drive/folders/1xw7c2aN8N-at8hPEULzkcU76e_FFb0Ef).

Use the existing WhatsApp group for reminders and quick discussion. Keep accepted decisions in meeting notes and task status in the tracker.

## Current state

The Figma-integrated UI lives in `frontend/`. The synthetic MVP supports assessment → three explainable career matches → role-specific pathways → scenario comparison, with proposed SDG mappings for every supported role and skill. It fetches U.S. BLS occupation context and optional official global AI/Malaysian science-and-skills news. See [run instructions, sources and limitations](frontend/README.md) and [implementation review](docs/MVP-IMPLEMENTATION.md).

### Run locally from the repository root

Use Node 22.12+ or 24:

```sh
npm run setup
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Root commands delegate to `frontend/`; `npm run setup` installs its locked dependencies. You can also run `npm ci` and `npm run dev` inside `frontend/`. Root `npm test`, `npm run typecheck`, `npm run build`, and `npm run test:e2e` delegate there too.

The `.replit` file configures a Node 22 development preview on `0.0.0.0:5173`, including both live-source endpoints. Import this branch into the team's Replit project and use Run, then record the actual project link and redacted proof. Configuration and local checks do **not** establish actual Replit use, a production deployment, or competition compliance. See [Replit configuration documentation](https://docs.replit.com/features/project-setup/configuration).
This is a synthetic, session-only MVP for team review. It is not a validated career assessment, Malaysian labor forecast, approved team product decision, or completed competition submission. Replit usage/proof and formal tools declarations remain outstanding.

## Team responsibilities to confirm

| Member | Suggested focus |
|---|---|
| David | Direction, UX/UI, implementation integration and submission |
| Sodik | Data access and explainable matching as a technical partner |
| Rania | Proposal, slides and presentation structure |
| Anes | User problem, evidence, SDG reasoning and pitch |
| Sushi | Resource verification, testing, official tutorials and platform proof |

These are proposals. Confirm ownership, availability and the video editor in the kickoff.

## Working folders

| Location | What belongs here |
|---|---|
| Google Drive | Editable team drafts, meetings, research, wireframes, pitch/video, final package and proof |
| docs/ | Technical handoffs and working conventions |
| submission/ | Reviewed final exports and a deliverable index, when ready |
| .github/ | Focused technical task and pull-request templates |
| Root planning notes | Earlier Chinese-language preparation notes for David; Google hub/tracker own current team status |

Original official text extracts and generated authoring files stay local and are excluded from Git.

## Required product chain

Skills profile → updatable AI/job signals → explainable role matching and skill gaps → ordered reskilling pathway → meaningful role/skill SDG links. Show at least two future scenarios and explain uncertainty. Only public/open/synthetic demo data; synthetic means fictional test profiles. Real CVs are not permitted by the Domain 1 brief.

## Preliminary submission

- Official proposal PDF.
- Pitch slides.
- Accessible functional prototype/build.
- Technical and tools declaration PDF.
- Public GitHub source with Apache 2.0 license and run instructions.
- A 5–7 minute YouTube pitch/demo.

This repo stays private during preparation. Review content before switching it public for submission. Replit use is required. Confirm the exact API Premium sponsor requirement and the scope of mandatory RunPod use. No sponsor integration has been completed yet.

Internal submission target: **24 October 2026, 22:00 MYT**. Official sources conflict between **25 October, 07:59:59 AM** and **25 October, 11:59 PM MYT**. Obtain a written clarification; plan against the earlier deadline meanwhile. Stop modifying submitted code at the applicable deadline until organisers permit further development.

## Working together

Read [CONTRIBUTING.md](CONTRIBUTING.md). Use small focused branches and reviews. Keep actual source URLs and checked dates, review all AI assistance, and update the technical declaration as the project develops. Do not commit secrets, private invitation links, personal records or unredacted account screenshots.

## Local preparation notes

- [Rules and deliverables](RULES-AND-DELIVERABLES.md)
- [Execution proposal](TEAM-EXECUTION-PLAN.md)
- [Pitch/video plan](VIDEO-PLAN.md)
- [Kickoff discussion draft](TOMORROW-MEETING-DRAFT.md)

## License

Apache License 2.0 — see [LICENSE](LICENSE). Respect the separate licenses of any future third-party components.
