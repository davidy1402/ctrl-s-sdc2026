# Platform and portal audit — 23 October 2026 (MYT)

Status: **Replit use has not been evidenced. This document is an audit, not platform proof.**

## Observed directly

| Item | Actual verification | Remaining action |
|---|---|---|
| Replit session | The task's in-app browser showed the public Replit home page and Log in dialog. Google login was attempted; no authenticated project page appeared. | A team member must sign in to an existing Replit account in a controllable browser. Do not create an account or accept new terms on their behalf. |
| Replit project/runtime | No team project or runtime was accessible in that browser. | Import the reviewed code, run it, verify the UI and both APIs, then record its actual project/history URL. |
| Replit configuration | Root `.replit` requests Node.js 22, setup and Vite development preview on port 5173. | Verify on Replit. A configuration file is not evidence of actual platform use. |
| Submission portal | The authenticated official `/submit` page was read. It accepts a GitHub repository link, explicitly checks that it is public, and contains a mandatory API Premium sponsor technology checkbox. No box was checked and no form was submitted. | Obtain the sponsor's exact identity, official integration instructions and applicable exception (if any). Do not attest compliance without evidence. |
| Sponsor identity | The authenticated `/portal` page listed Replit Core and RunPod resources, but no named “API Premium” provider or API documentation. | Official written clarification needed. Replit/RunPod presence alone does not establish that checkbox's meaning. |
| Deadline | The live website and authenticated submission page both show 25 October 2026, 11:59 PM MYT. Participant PDF §6.3.1 says 25 October 2026, 07:59:59 AM MYT. | Retain the earlier internal target: 24 October 2026, 22:00 MYT. Ask the organiser to resolve the conflict in writing. |

The native browser was already being used for another project. Its interaction was interrupted by user activity; no further native-browser actions were taken. This does not establish whether another browser contains a signed-in Replit session.

No raw portal screenshots or exports are committed: the team page also contains financial information, personal contact data, private invitation links and resource redemption codes. None is needed to substantiate this audit. Do not publish an unredacted portal capture.

## Rules rechecked against the actual local PDFs

Fresh text extraction on this date from the supplied Participant Handbook, PDF pages 28–29 (printed pages 26–27), confirms:

- §9.3: Replit must be part of the solution.
- §9.4: GPU work must use RunPod; non-GPU work may use other tools. This does not resolve the separate template/portal wording.
- §10.2–10.5: an Apache 2.0 LICENSE and an accessible public submission repository are required.
- §10.6: the Technical & Tools Declaration must carry one of a live Replit URL, a project/history link, or credits-finished evidence, showing the team's own account/project.
- §10.7: teams that used RunPod must include dashboard evidence with Pod ID, GPU and runtime; serverless uses endpoint URL instead of Pod ID. Never expose a credential-bearing URL.

Fresh extraction of Terms & Conditions, PDF page 29 (printed page 28), confirms §6.6: stop development and repository changes at the applicable official deadline until authorised to resume.

## Ready-to-execute Replit procedure (not yet performed)

1. Sign in to the team's own existing Replit account. Use [Replit Import](https://replit.com/import).
2. Choose guided GitHub import for the private repository. If this requires new repository-access grants, the account owner must approve the exact grant. Do not change repository visibility to work around authentication.
3. Import the reviewed implementation branch/commit, not the old `main` which lacks the app. If the import UI starts from the default branch, switch to the reviewed implementation branch before Run. Record `git rev-parse HEAD` in the project terminal and compare with the reviewed commit.
4. Use the root `.replit` command. Confirm Node.js >=22.12.0. If an import proposes Agent migration, a paid plan or credit-consuming changes, review the scope before accepting; no spend has been authorised by this audit.
5. In the preview, complete the fictional profile, inspect roles, gaps, pathway and SDG reasons, change the qualitative scenario, then refresh trend evidence. Verify source dates, retrieval times and missing/stale state.
6. Open `/api/trends`, `/api/news?scope=global` and `/api/news?scope=malaysia` on the actual preview origin. Record HTTP status, retrieval timestamp, geographic scope, and fallback/error state without claiming every upstream succeeds. A static `dist/` upload alone cannot host these APIs.
7. Save the real project/history URL and exact commit in a dated proof record. A stable live deployment is useful but is distinct from a temporary development preview; do not promise anonymous or persistent access until tested. Test any judge link without the owner's session.
8. Put the verified evidence into the Technical & Tools Declaration. Redact secrets, redemption codes, billing details and unrelated private information. Request the necessary final public-access approval only after the publishable material is reviewed.

## Sources and limits

- [Official live website](https://sdchack.my/) — rechecked on 23 October 2026; deadline remains in conflict with PDF.
- [Official submission portal](https://sdchack.my/submit) and [team portal](https://sdchack.my/portal) — authenticated read-only inspection; no submission, attestation, redemption, booking or message sent.
- Supplied local `3. SDC Hackathon Official Participant Handbook.pdf` and `2. SDC Hackathon Official Terms & Conditions.pdf` — sections above; extracted afresh rather than relying only on earlier notes.
- [Replit official import documentation](https://docs.replit.com/build/import-from-providers) — supports guided import from private GitHub repositories; ZIP import is an alternative. It warns some imports may consume Agent credits. This is provider guidance, not proof that this project was imported.

Unknown: official sponsor interpretation, availability of other signed-in Replit sessions, workshop completion, actual redemption, available account credit, real deployment region/plan, and anonymous judge access. These must remain unverified in declarations until observed or confirmed by the responsible team member.

## Replit login clarification — operations paused at David's request

David asked to wait before Replit login/import while checking whether the organiser requires a particular account method. **All Replit login/import operations are paused.** The procedure above is reference material, not authorisation to resume.

What the organiser's written sources establish:

- Participant Handbook PDF p28 (printed p26), §9.1.1 assigns Core to each participant; §9.2 puts resource access in the team leader's official portal.
- Participant Handbook PDF p29 (printed p27), §10.6 requires evidence tied to the team's own account and project.
- Authenticated portal Replit Core section: “Every member of your team should redeem the code below on their own Replit account.” It also asks members to tick their redemption box after redemption. An unticked box establishes only that this portal has not recorded confirmation.
- These inspected passages do **not** specify Google versus email login, a university email, the competition registration email, a new account, or one shared team login. Do not invent an email-matching requirement. This is a statement about the passages inspected, not assurance that no later Discord announcement or spoken workshop instruction exists.

The [official Replit workshop folder](https://drive.google.com/drive/folders/1XmoZ-S4E0lHZDWsXfz7nMWl8Y8f0thVy) contains [Replit Workshop Recording.mp4](https://drive.google.com/file/d/1HIfXfJY66LY9fMhbgOigOQlkBeVlSMtD/view). It has no accessible transcript in the Drive viewer checked here. The video has not been fully reviewed; do not claim its spoken account instructions were verified. The [Participant Guideline tutorial directory](https://drive.google.com/drive/folders/14UtBBtYZktlBhETrG0dvmdfFfwJ9zr8n) currently lists Submission Guidance, Apache 2.0 Tutorial, Mentorship Booking & Submission Method, and Domain 2 Orbyte Setup; no separate Replit login tutorial was listed at that level.
