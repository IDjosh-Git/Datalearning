# Practice Studio — v12

## What changed

- Moved the former inline **INTERACTIVE COURSE STUDIO · OFFLINE** section out of all five course pages into the standalone `studio.html`. The weekly lesson layout now opens without the large practice block above it.
- Added clear Practice Studio links to the global learning navigation, learner dashboard, course cards, every weekly course toolbar and learner account.
- Studio offers five subjects (Foundations, Excel, SQL, Power BI, AI Integration), searchable skills, worked examples, an answer box, explanation reveal, next/previous and completion tracking.
- Phone layout opens with the active exercise, not a long skill list. Use **Browse skills** to open a compact mobile selector.
- Subject changes happen without a page reload.
- Local practice progress is scoped to the verified learner ID on that device, not the graded course completion record. This is self-assessed learning.
- Clear offline statement: already-open exercises can work without a connection; site login, navigation and new page downloads may require internet. This is **not** an installed offline app or a downloaded course.

## How to deploy

Deploy all files together, including `studio.html`, its CSS/JS, the existing middleware and authentication functions. No database migration needed. Follow previous hosting security setup.

## Verification

Run `npm test`, `npm run test:responsive`, `node tests/practice-studio-v11.mjs`, and `node tests/practice-studio-v12.mjs`. Test signed-in accounts and session protection on the actual deployed domain.
