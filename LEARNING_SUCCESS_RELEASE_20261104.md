# DataLearning — Guided Learning Success Update (4 November 2026)

## Purpose
The existing app already contains six learning tracks, 500+ Learning Lab knowledge exercises, quizzes, a Practice Arena editor, AI Tutor, Learning Coach, progress dashboards and certificates. This update adds the missing structured workflow linking course study, deliberate practice, active recall and reflection without replacing existing functionality.

## Added
- **Guided personal study plan** within the Learning Lab, available from the existing Study Tools dropdown, Discover, My Learning dashboard, private learner navigation and global Bento search.
- Six subject choices: data foundations, Excel, SQL, Power BI, Python and AI. Seven distinct sessions for each subject and ability level; no artificially duplicated final lesson.
- Session pacing: 15, 30 or 60 minutes. Learner controls Understand → Apply → Recall checklists, with progress display and continuation across visits.
- Links to actual course lessons and relevant hands-on work. Five tracks link to matching Practice Studio skills; Python links to its working Practice Arena challenge editor.
- Active-recall worksheet based on the curated course content, including a worked answer, common pitfalls, confidence self-check and editable reflection. Dedicated Python prompts supplied where the source Studio catalogue has no Python entries.
- Browser-only saved plans, scoped to a signed-in learner account or to a guest profile. Export and safely validated import. No new Supabase tables, permissions or analytics events.
- Updated static cache version and a targeted regression test. The original course content, Learning Lab spaced repetition, Coach notes, Practice Arena editor, Tutor and progress sync remain intact.

## Verification
- `npm run verify:deployment`: PASS under installed Node.js 22.16 (package targets Node.js 24 on Vercel).
- Browser interactive fixture: PASS at 1440px, 768px and 390px; no horizontal overflow; course selection, self-checks, worked answer and saving work.
- Six tracks verified to generate seven unique sessions; Python links to the Arena; switching account identities does not expose guest plan state; import restores the selected route and saved completion.

## Limitations and release
The new plan is **not** formal course progress, an instructor assessment or an automatically measured mastery score. Local study plans do not synchronize through Supabase, but can be exported and imported. Guest plans are visible to people sharing a browser profile. Real Vercel preview/device authentication and network-functionality testing is still required; this ZIP is not deployed to production. Publish a new Git commit to update the Vercel site.
