## Course imagery refresh — November 11, 2026

- Course catalogue, course explorer, lesson hero/sidebar, progress cards, studio selection, and course dropdown use image-based identifiers instead of font glyphs.
- Excel, Power BI and Tableau use locally bundled product-symbol images. Python and Power Query prefer the official images online, falling back to the local icon without breaking offline access. SQL, statistics, AI and data analysis use descriptive subject icons; no fictitious vendor association.
- Brand use and links: `assets/icons/COURSE_ICON_SOURCES.md`.
- Learner history, datasets, course IDs, tests, quizzes, capstone and Tutor unchanged.

# Current DataLearning release — 11 November 2026

## Active application

Nine guided 10-week courses with datasets, weekly practice worksheets, linked lesson videos and design/report examples. A separate four-level Career Path, Practice Arena, Prompt Library, offline/live Tutor, learner progress and instructor-reviewed capstone submissions remain available. All existing progress keys and database tables are unchanged.

## App-aware Tutor

- One curated public guide (`assets/data/tutor-app-guide.json`) documents course navigation, the nine weekly syllabuses, resource downloads, Practice Arena limitations, videos, prompt library, progress, capstone eligibility, certificates and privacy.
- The offline Tutor checks that guide before falling back to the existing knowledge library.
- Authenticated live AI receives only relevant guide entries as its verified app context. Server credentials and private learner records are not included in this context.
- This is retrieval/instruction grounding, **not** retraining, and provider configuration is still required for live AI.

## Cleanup

Old dated release diaries, obsolete curriculum generation sources and an orphan SVG were removed. All HTML routes and all actually referenced browser CSS/JS, lesson data and downloadable datasets remain intact. Retained database migrations and test files are build/maintenance resources, not duplicate learner pages. A fresh service-worker cache version discards old public caches on activation.

## Validation

Use `npm run verify:deployment` and review `docs/LEAN_APP_CLEANUP_TUTOR_20261111.md`. Static checks do not establish live Supabase authorisation, external video embedding or actual AI provider responses; verify on a deployment preview.
