# DataLearning — AI and Python unified premium learning experience (11 November 2026)

This release builds on the nine-course public catalogue and aligns the two specialist course readers — `courses/python.html` and `courses/ai.html` — with the premium teaching interface used by the seven core courses. No existing course content or user records have been removed.

## What's new

- A shared navy/teal course identity and lesson hero with locally bundled subject logos, clearer objectives and course context.
- Live course-completion meter, based on the existing ten week-completion checkboxes and the normal cloud-progress sync event; no additional progress store.
- Accessible **Jump to a week** selector synchronized with the existing week navigation and deep links.
- Compact quick links for Python setup or AI Prompt Library, Practice Arena / AI Tutor, and the appropriate capstone submission page.
- More coherent dataset/video panels, expandable reference resources and optional account/course actions.
- Unified three-step **Learn / Practise / Check knowledge** lesson tabs, readable teaching surfaces, responsive typography and capstone-friendly navigation.
- Improved local course rail identity and clearer active states while retaining the existing mobile drawer and its keyboard/focus controls.

## Preserved features and compatibility

Both original ten-week lesson IDs, substantive instruction, quizzes, downloads, YouTube popup integration, saved completion state, Supabase integration, Prompt Library, Python practice environment, and instructor-reviewed capstone flows remain intact. The other seven courses and the public catalogue are not modified by the new scoped stylesheet. The Python **Sign In**, **Print / Save PDF**, and **Reset Progress** controls remain accessible inside **Account & course options**.

## Verification

Run `node tests/specialist-unified-course.mjs` and `npm run verify:deployment`. Isolated responsive render checks covered 320px, 390px, 768px and 1440px, including the course-hero and resource grid; direct browser navigation of the complete site was denied by the environment's browser policy. Authenticate, verify cloud completion sync, run quizzes and test YouTube playback in a deployed preview before live release.
