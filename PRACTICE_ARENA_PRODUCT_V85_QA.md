# Practice Arena · Product Experience v85

## Scope and implementation

This release builds on Product Experience v84, improving `/practice.html` without replacing its existing executors, challenge data, grading logic, authentication gate, storage key, SQL editor, Excel formula evaluator, Python worker, or course routes.

### Findings from the code audit

1. There were 149 bundled challenges: **45 SQL**, **50 Excel**, **54 Python**. The existing selector had subject, search and pass-status filters, but not a topic or suggested-level filter. There was a confusing difference between the challenge selector, the active editor and the first learning action.
2. The challenge prompt and data/schema existed, but learning goal, grading criteria and pacing guidance were not presented consistently in the workspace. The IDE also created a second task panel, so a clear, independent summary was needed.
3. The grader already distinguishes outputs in its logic, but showed mainly an unstructured message. An executed query that produced the wrong answer could look indistinguishable from an execution error. The IDE also relocated the grading feedback into the Console tab, where it could be hidden.
4. Existing hints were revealed all at once; worked solutions were available on demand, but their display was combined with assessment feedback.
5. SQL, Excel and Python course links pointed mainly to a different Practice Studio instead of to contextually relevant Arena challenges.
6. Execution limitations and local-only progress were in the original notes, but were not close to the key actions. This was a risk for users who expect cloud-synced practice progress.

### Changes implemented

- Added a short, accessible **3-step start guide** and explicit **45 SQL / 50 Excel / 54 Python** counts on the subject launcher.
- Added **topic** and **suggested-level** filters, supporting existing title/description search, tool and pass-status filters. Level and time guidance are **heuristics inferred from subject/topic**, *not* official course requirements or measured completion times.
- Added a challenge brief with **subject, topic, suggested difficulty, suggested time, learning goal and true completion criteria**. SQL and Excel must match the example and two varied datasets; Python must pass its bundled assertions. Merely running code is not a pass.
- Added staged hints: a general planning prompt, then the challenge-provided hint. Worked-answer reveal is explicit and independent of grading feedback.
- Added a dedicated grading outcome: **execution error**, **executed but failed checks**, or **passed**. SQL and Excel show sample actual-versus-expected results where available. The legacy SQL/Excel IDE's grading feedback is moved out of its hidden Console tab to remain visible.
- Added direct links to exact real challenges from selected Excel, SQL and Python course weeks, plus a dedicated Arena entrance on the homepage and contextual links back to courses.
- Added privacy/storage and execution notices adjacent to the workspace. Existing authentication requirements remain in place. No new accounts, sync or submission backend was invented.
- Added `assets/arena-product-v85.css`, `assets/arena-product-v85.js`, `assets/arena-course-links-v85.css`, and `tests/arena-product-v85.mjs`; modified the existing scripts and pages only where required.

### Tests completed

| Validation | Result |
| --- | --- |
| `npm run test:arena:v85` | PASS: new content/route checks, 95 SQL/Excel model challenges, 54 Python registrations, existing IDE isolation and deployment checks |
| `npm test` | PASS: existing application, role, course, sync and auth suites |
| `npm run test:responsive` | PASS: source-level responsive coverage |
| `npm run test:experience` | PASS: v84 learning experience |
| `npm run verify:deployment` | PASS: static resource / route audits |
| `npm run test:theme:contrast` | PASS: 14 semantic light/dark contrast pairs (design tokens) |
| Isolated Chromium DOM interaction: Excel | PASS: tool filter, topic and suggested-level filters, two-stage hints, worked-answer reveal, successful formula grading, local progress update, no page-script errors |
| Isolated Chromium DOM interaction: SQL | PASS: incorrect-but-running query not passed; correct query passed varied checks; no page-script errors |

### Remaining limitations and follow-up tests

- **Real authenticated browser end-to-end test is still required.** The execution environment blocked navigating to both local file URLs and intercepted test URLs. An isolated browser DOM fixture worked for SQL/Excel, but was not equivalent to loading a logged-in deployed page.
- **Python runtime and challenge worker** need live-network browser checks because Pyodide downloads its runtime and may load third-party packages. The 54 challenge definitions and worker wiring were preserved, but the full worker was not executed in this isolated browser test.
- **Real-device layout inspection** is still required for the complete 66+ style-layer production stack. Responsive CSS, widths, focus and reduced-motion rules were addressed and source checks passed, but we cannot certify zero overflow across all combinations without deployed browser inspection.
- Challenge-level labels and suggested times are **derived suggestions** because original challenge data has no official difficulty or duration fields. They must not be interpreted as verified completion-time metrics.
- Arena drafts, attempts and pass flags continue to use `localStorage` key `dalp-practice-v1`. Cloud/device synchronisation is **not** provided by this release. Account sign-in remains mandatory where the existing auth gate requires it.
- SQL works via the bundled fallback for supported simple queries, or via browser SQLite when its runtime loads. Excel uses a partial offline evaluator. Python uses a separate Pyodide worker. Runtime execution and challenge passing remain different states.

### Recommended staging journey

On the deployed Vercel preview, sign in as a test learner and visit `/practice.html`. Change between SQL/Excel/Python, filter by topic/level/status, run correct and incorrect submissions, try hint and worked answer controls, refresh to confirm local progress, load a linked challenge from each course, switch light/dark/system themes, keyboard-navigate the modal, and repeat at 320 / 390 / 768 / 1440px including a mobile touch device. Confirm Pyodide download and SQL.js runtime through the browser network and console panels. Clear only the test browser's local progress after QA.
