# Data Analysis Learning Path — Mastery v33

## Contents and scope

This release upgrades the supplied Practice Arena and course platform. It retains the original **95 SQL/Excel graded challenges** while adding standardized masterclass content for five specialist course tracks.

| Specialist pathway | Modules | Solved practice checks | Coverage |
|---|---:|---:|---|
| SQL | 10 | 20 | Tables, filters, metrics, joins, data quality, CTEs, windows, periods, query validation, capstone |
| Excel | 10 | 20 | Workbook workflow, Tables, references, formulas, cleaning, analysis, PivotTables, charts, dashboards, capstone |
| Power BI | 10 | 20 | Business questions, Power Query, model design, DAX, date tables, visual design, navigation, context, publishing, capstone |
| Python | 10 | 20 | Setup, fundamentals, functions, pandas, cleaning/joins, KPI grouping, statistics, NumPy, forecasting, capstone |
| AI Analytics | 10 | 20 | AI literacy, prompt specs, privacy, Excel, SQL, Python, DAX, evaluation, approvals, capstone |
| **Total** | **50** | **100** | Every module follows the common template below |

**Common module template:** business question / *why* → mechanics / *how* → runnable or reproducible example → expected result → pro tip → beginner trap → two exercises with expandable worked solutions → concise cheat-sheet recap. Existing broader enrichment and quizzes remain where appropriate.

## Main files

- `curriculum/MASTER_CURRICULUM_V33.md`: fully written, portable master curriculum.
- `curriculum/mastery_content.json`: structured content for editorial review or republishing.
- `curriculum/mastery_content.py`: editable authoring source in the same folder.
- `courses/{sql,excel,powerbi,ai,python}.html`: updated course pages. **Python is new.**
- `downloads/mastery_orders.csv` and `downloads/mastery_orders.sqlite`: reproducible *fictional* retail data for all five course tracks.
- `downloads/MASTERY_DATA_DICTIONARY.md`: schema, grain, examples, and reconciliation controls.
- `assets/mastery-accessibility-v33.css`: shared light/dark surface, typography, SQL-token and callout design tokens.
- `assets/theme-editor-v33.css`: final SQL-editor layout/contrast/IME and mobile presentation rules.
- `assets/theme-editor-v33.js`: native input attribute safeguarding, with no Space/Tab interception.
- `assets/practice.js` and `assets/arena-upgrade.js`: optimized draft-save/highlighter behavior, including composition-event handling.
- `PYTHON_COURSE_DATABASE_MIGRATION_V33.sql`: **manual database migration for existing Supabase projects**.
- `supabase_setup.sql`: fresh-install schema now permits Python progress and certification.

## Local preview and deployment

1. Unzip, preserving the `Datalearningpath` directory structure and relative links.
2. Preview through a local development server (`npx serve .` or `python -m http.server 8000`), not by double-clicking `file://` pages. Development preview does not replace authentication or cloud services.
3. Confirm the theme toggle on Home, each course and the Practice Arena. Check the Python card and learning account navigation.
4. Open Practice Arena and select a SQL challenge. Test typing `SELECT amount FROM orders`; Space must insert once. Try narrow screen and dark theme; the original grading dataset remains distinct from `mastery_orders.sqlite`.
5. If the deployed project already has Supabase tables, **back up the database** and review/run `PYTHON_COURSE_DATABASE_MIGRATION_V33.sql` in an authorized SQL editor before enabling cloud Python progress, capstone review or certificates. The migration is **not executed by this ZIP**.
6. Upload the updated static resources, project routes and SQL changes using the application's existing deployment process. Validate authenticated sign-in and RLS permissions in staging before release.

### Verify regressions

From the project root with Node 20+:

```bash
npm test
npm run test:arena:v31
npm run test:mastery:v33
```

Our offline checks passed: existing challenge suites, 50 generated modules and 100 solutions, CSS theme-token contrast (14 light/dark SQL token combinations each exceeding 4.5:1), and Chromium typing tests at widths 320, 390 and 1280 pixels. SQL examples were executed against the provided SQLite sample.

## Boundaries, limitations and editorial notes

- These are self-contained **ten-module** specialist pathways rather than externally accredited degrees. Learner time estimates, prerequisites and formal certification requirements should be determined by the course owner.
- The supplied retail training dataset is intentionally **synthetic (six example orders)**. It is coherent across disciplines, but not representative of real-world data scale. Extend it with more varied records before assessing performance or statistically valid forecasts.
- **Practice Arena currently executes SQL and Excel**, not Python, DAX, Power Query or AI scripts. Non-Arena examples run in the corresponding installed application/notebook; worked outputs can be compared with supplied control totals.
- The database migration was prepared but **was not applied** to any external environment. New Python certificates and cloud progress depend on the migration and environment policies.
- Offline Chromium layout and typing smoke tests are not a substitute for testing every browser, physical device, authentication deployment, or assistive technology. The claimed WCAG AA color contrast applies to the declared **theme tokens and syntax colors tested**, not a full third-party accessibility certification.
- `tools/build_mastery_v33.py` and `tools/apply_release_v33.py` are **one-time build scripts intended for the original v32 baseline**; do not rerun them on an already-upgraded v33 directory without first restoring the baseline (they aren't idempotent).
