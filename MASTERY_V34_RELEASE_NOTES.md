# Data Learning Path — Mastery v34

## Update summary

- All **five** courses (SQL, Excel, Power BI, Python, AI Data Analytics) continue to have ten independently selected weeks.
- Fixed Python's missing registration in `assets/weekly-workspace.js`. Previously, Python bypassed the week workspace and rendered all ten lessons in one long scroll. Now it follows the same week strip, Previous/Next, week dropdown and `#weekN` deep links as the other tracks.
- Python now has a meaningful **Learn → Practise → Check knowledge** experience for every week: ten dedicated lab activities and **30 auto-graded multiple-choice questions**, in addition to the existing **20 worked open-answer checks**.
- Added **50 distinct beginner-first concept walkthroughs**, each with a mental model, three clear execution steps, expected-result interpretation and independent mini-task. These are actual rendered website lesson sections, not only an external PDF.
- Expanded full curriculum to `curriculum/MASTER_CURRICULUM_V34.md` (also at project root), with business reasons, mechanics, sample code or formulas, expected results, traps, tips and knowledge checks.
- Added `downloads/PYTHON_GETTING_STARTED_V34.md`, dataset and setup instructions; Python continues to run externally, rather than falsely claiming browser execution.
- Added responsive, dark/light variable-driven layout overrides in `assets/weekly-mastery-v34.css`. Existing editor patches and 95-challenge Practice Arena are retained unchanged.

## Deployment

Deploy the entire `Datalearningpath/` folder, not isolated HTML files. Existing Python cloud progress support still needs `PYTHON_COURSE_DATABASE_MIGRATION_V33.sql` on Supabase installations that have not applied it. **Do not rerun the migration blindly**; check prior state first.

## Manual review after deployment

1. Open `courses/python.html`; verify only Week 1 is shown at first, and Week 5 shows only Week 5 when selected.
2. Check Learn, Practise and Check knowledge tabs on Python Weeks 1 and 10, and verify that scores and completed-week indicators update.
3. Confirm next/previous, direct `#weekN` links, search, progress save and returning to the selected week.
4. Toggle both themes on a desktop and mobile viewport; verify readable lesson content, tabs, quiz labels and resources.
5. Spot check original SQL and Excel Practice Arena execution and existing progress/authentication flows.

The synthetic CSV has six orders, five completed, 578000 completed revenue and 135000 gross profit. Outputs in teaching notes are computed from those records.

## Validation performed for v34

- `npm test` passed, including authentication/role and content regressions.
- `npm run test:mastery:v34` passed (50 expanded lessons, Python labs/quizzes).
- `npm run test:mastery:v33` passed (100 existing worked answers and 14 SQL syntax contrast tokens).
- `npm run test:arena:v31` passed (95 challenge registrations plus execution checks).
- `npm run test:responsive` and the original course navigation checks passed (23 routes).
- An **embedded offline Chromium smoke test** of the actual Python lesson and navigation JavaScript passed at 320px, 390px, 768px and 1280px. It checked week visibility, populated tabs, quiz scoring, progress updates, theme switching and horizontal overflow. The test necessarily bypassed authentication and network fetches, so it is **not** a production deployment check.
