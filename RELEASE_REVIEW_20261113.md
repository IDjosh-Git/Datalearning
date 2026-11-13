# DataLearning follow-up fixes and validation

## Changes in this package
- Preserved the nine-course source-of-truth and existing authentication, lesson, quiz, and progress implementations.
- Expanded shared public course metadata to disclose format and unverified update dates.
- Added an accessible course-map table with outcomes, practice deliverables and self-check checkpoint counts for all 90 weekly modules.
- Clarified practice versus assessed work, expected evidence, progressive hints and worked explanations, and next-step guidance.
- Documented the source-verified capstone gate: all ten weekly completions must be saved to the cloud before submission. Instructor review is separate from learner-marked completion.
- Added software compatibility cautions, particularly Windows for Power BI Desktop.
- Removed unqualified certificate claims on the homepage; certificate eligibility is not promised without owner confirmation.
- Added automated assertions for nine public syllabus destinations, shared section headings, weekly scaffolding and certificate caution.

## Validation performed
- `npm run verify:deployment`: PASS on Node 22.16.0 (project declares Node 24.x).
- `node tests/public-course-requirements.mjs`: PASS (also included in `test:academy`).
- Source/static checks only: no live browser, real backend account, instructor reviewer account, cloud storage, production HTTP routing, or screen-reader session was available for end-to-end tests.

## Still awaiting owner evidence / external validation
- Confirm weekly study hours, elapsed calendar duration, course-level prerequisites, independent lesson counts, software editions, date of last substantive content revision, precise capstone deliverables and grading rubric, reviewer assignment, pass mark, certificate eligibility and external recognition (if any).
- Verify quiz retries and wrong-answer feedback against the live application, and manually test the nine public URLs, authentication redirect, downloads, mobile viewport, keyboard-only navigation, cloud progress and submission/review lifecycle on a staging deployment.
- The existing interactive lesson views have not been replaced by the public syllabus layout, to avoid breaking substantive content and progress workflows.

**Release status:** Automated checks pass; staging integration and owner content confirmation are outstanding. Do not treat this report as a production acceptance sign-off.
