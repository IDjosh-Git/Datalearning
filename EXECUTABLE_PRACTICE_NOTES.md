# Offline executable practice upgrade

## Added
- `assets/execution-engine.js`: read-only teaching SQL interpreter over sample `orders` and `customers` tables. Executes supported SELECT queries, returning actual rows (not a keyword match). Supports basic projection, DISTINCT, simple WHERE conditions, aggregate functions, GROUP BY, numeric HAVING, ORDER BY and LIMIT.
- `assets/formula-engine.js`: evaluates supported spreadsheet formula expressions using a visible 6-row sample worksheet; supports SUM, AVERAGE, MIN, MAX, COUNT, COUNTA, PRODUCT, SUMIF, COUNTIF, IF, arithmetic, cell references.
- `assets/course-checkpoints.js`: three auto-graded multiple-choice checkpoints, each for all five courses, with per-answer explanations and local best-score persistence.
- Updated Practice Arena to grade by executing model and learner answers against data instead of comparing textual patterns.

## Accuracy and limits
- The SQL engine is **not SQLite** and does not support joins, subqueries, CTEs, arbitrary SQL, or full SQL dialect semantics. The project includes a `.sqlite` download to open in a real SQLite client. All 20 existing SQL exercises use the supported subset.
- Grading using one small dataset is not proof of equivalence on all possible datasets: an incorrect query may coincidentally produce the correct sample result. For certification-grade assessment, use hidden edge-case datasets and a complete SQL engine.
- The formula evaluator is **not Microsoft Excel**; its function set is intentionally limited to the exercises, and it does not support all Excel edge cases, error propagation or circular references.
- Course checkpoints are auto-graded multiple choice, while open-response studio exercises and capstones remain respectively self-assessed and human-reviewed.
- Local browser storage tracks checkpoint best scores. Hosted optional account/instructor features remain as supplied.

## Validation
Run `node tests/offline-engines.mjs` from the app root. This tests execution of all 40 supplied answers, representative SQL operations, formula calculations, five checkpoint inclusions, and rejected SQL operations. `node tests/course-content.mjs` and `node tests/ai-card-visibility.mjs` pass. The legacy full `npm test` suite does not fully pass due to an existing sync-regression asset-version expectation on `index.html`.
