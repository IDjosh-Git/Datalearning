# Course Visual and Learning Audit — Version 17.0

## Scope

Five independently themed course pages were examined and corrected:
1. Introduction to Data Analysis
2. Microsoft Excel
3. SQL
4. Power BI
5. AI Integration in Data Analysis

Version 17 supersedes the earlier course presentation fixes while **retaining** the shared v16 navigation, server access controls, learner progress, weekly assignments, certificates and the separate Practice Studio. Deploy the entire package; do not mix CSS/JS from earlier versions.

## Defects found and corrections

| Finding | Fix |
| --- | --- |
| Final course mastery questions were appended directly to the `<main>` element and stretched across oversized monitor widths. | Move each checkpoint into the actual course content column; cap assessment width at 900px, with mobile layouts filling the available screen. |
| After repositioning, the legacy weekly navigator would classify a mastery checkpoint as an extra section and hide it. | Exempt `.course-mastery-wrap` from the navigator's `cw-extra` classification. |
| Checkpoint options were plain inline text and offered little visual selection feedback. | Use accessible fieldsets and legends, individually bordered radio options, focus states and consistent touch spacing. |
| Grading exposed all answers even when questions were unanswered. | Require responses to all three questions, move focus to the first unanswered question and provide an explanation after grading. |
| Mastery activities had no obvious shortcut from the weekly course workspace. | Add `Mastery checkpoint ↓` to the course controls and the Introduction learning navigator. |
| Older theme layers contained incompatible white backgrounds and dark-only text declarations in quizzes and specialist course components. | Introduce `assets/course-system-v17.css` as the last stylesheet on all five courses. Define common semantic light/dark colors and override teaching surfaces, selected answers, quiz feedback, lab cards, tables, code and forms. |
| Weekly quiz cards could span overly wide content grids. | Constrain quiz containers to a 920px maximum and standardize options at both narrow and wide widths. |
| The old fixed Practice Arena call-to-action could overlap mobile assessment content. | Hide that redundant floating link on mobile; Practice remains accessible through the persistent app navigation and the separate Practice Studio. |

## Learning-content preservation

- Excel, SQL, Power BI and AI Integration each retain **10 weekly assessments, 50 questions and the original coursework**. This is 200 weekly knowledge-check questions across those four courses.
- The Introduction course retains its 8 lesson sequence, 12-question knowledge check and kiosk scenario.
- All five tracks retain the separate three-question auto-scored end-of-course mastery checkpoint, now with a clearer feedback and retry flow.
- Original course lessons, guided labs, capstone tasks, progress state and certification logic are not rewritten.
- Weekly course navigation continues working; the checkpoint is intentionally reachable independently from it.

## Verification performed

- **60 isolated Chromium layout cases:** 5 courses × 2 appearances × 6 viewports (320px, 390px, 768px, 1024px, 1440px and 2560px). Each checked checkpoint presence, 3 questions, course alignment, bounded reading width and page-wide overflow. All 60 passed, with no page-level overflow detected. The wide-screen checkpoint did not exceed 900px.
- **10 isolated Chromium assessment-interaction cases:** 5 courses × 2 appearances at 390px. Each tested the empty-answer warning, question progress, radio selection, answer explanations and retry/reset. All passed.
- **444 computed text/background contrast pairs**, sampled from representative quiz, lesson, guided lab, checkpoint and AI/Introduction components in light and dark appearance. All sampled pairs exceeded 4.5:1; the minimum observed ratio was 9.55:1. This is a sampled contrast audit, **not** a claim that every on-screen pixel meets WCAG.
- Automated application regression suites passed: smoke, auth-first, course content, sync regression, responsive coverage, workspace coverage, admin console, server authorization and v16 theme/navigation; the v17 course-integration test also passed.
- The HTML source tests verify the five new stylesheet/script references, single versioned asset includes, preserved course structure, no duplicate static element IDs on course pages, and that the weekly navigator cannot hide the mastery checkpoint.

## Remaining release verification

The browser layout audit used static, isolated course content to avoid calling live authentication or cloud services. It is **not** a substitute for end-to-end signed-in testing on the deployed domain, native iOS Safari and Android Chrome, zoomed text/accessibility settings, touch scrolling, offline/online transitions, or an instructor/learner account. Verify these before a production rollout; the package has not been deployed.
