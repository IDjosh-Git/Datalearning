## November 11, 2026 — Premium paginated Formula & Code / Prompt Libraries

- Replaced the former library-only layouts with a shared, theme-aligned responsive design.
- Removed unused `assets/styles/reference.css` (227 KB) and `assets/styles/prompt-library.css` (223 KB) entirely; both pages load only `assets/styles/learning-libraries-premium.css` with route-scoped selectors. Other public pages are unaffected.
- Formula & Code Lab retains all 639 existing references and deep links (`?group=...&q=...`), category/difficulty filters, saved bookmarks and code copy, with an accessible full-example dialog.
- Prompt Library retains all 300 prompts, topic/level search, existing saved prompts, exports, downloadable Markdown, AI course links and accessible full-prompt dialog.
- Replaced unbounded cards / incremental load-more with 12-card page navigation (Previous and Next); standard desktop uses 3 columns, very wide desktop 4, tablet 2, mobile 1. Filters reset to the first page; page changes return focus to the results viewport.
- Improved keyboard focus states, reduced-motion behaviour, modal focus return, code scroll, small-phone sizing and empty-state help.
- No course progress, assessment, capstone, Supabase schema or application-routing changes.
- Added `tests/library-premium-pagination.mjs` and ran the complete deployment regression suite. Full browser navigation is restricted; interactive behaviour was verified in an isolated browser rendering with actual library content and scripts.

---

# DataLearning — Formula & Code Lab and five-question specialist quizzes (11 November 2026)

- AI and Python: each weekly quiz is **five questions**; both final mastery checks now use five representative weeks. Python gained two topic-specific questions per week. Other courses keep their existing quizzes and progress IDs.
- The Reference Library now includes real **Python/pandas** and **Power Query M** examples as well as Excel, DAX, SQL and the existing Power Query examples. Its search accepts prefiltered links from the lessons.
- Week-specific **Formula & Code Lab** shortcuts are shown in the relevant Excel, Power BI/DAX, SQL, Python, Power Query and AI-generation lessons. The link includes category and topic filtering, without creating a duplicate lab page.
- Snippets explain why they work and how to validate them; the reference is for copying/study, not code execution. Use the Practice Arena for supported execution; M and DAX must be run in compatible tools.
- The existing `mastery_results` database requires `total=10`. The five-question specialist mastery result is **normalized to a ten-point score** when saved to the cloud; the learner-facing quiz and local record still show five questions. No database migration is required.
- Public cached imagery stays intact; old HTML/JS/CSS caches are purged by the updated service worker version. All existing course pages, progress, datasets, quizzes and capstones are preserved.


## 11 November 2026 — all nine mastery assessment links

- Verified AI and Python course pages share the same `academy-app.js` lesson renderer and course stylesheet as the other seven courses, rather than using legacy course HTML.
- All nine courses now show their actual final assessment in the course sidebar. The Week 10 mastery button has a refined premium treatment and the catalogue's expanded curriculum and learner progress cards include direct mastery links.
- Existing mastery assessments remain unchanged: 10 review questions for the seven core courses and 5 for AI and Python. Results continue using the existing `mastery_results` database table and ten-point scoring format.
- Added a regression test covering all nine course pages, links, quiz counts, and shared CSS. No migration or course data modifications.

- Updated course stylesheet query strings on all active course readers and the Courses catalogue to prevent stale premium styling after deployment. Verified CSS parsing and JavaScript syntax.

## Practice Arena unified workspace — 11 November 2026

- SQL, Excel and Python now use the same compact, responsive editor/output shell; the existing SQL engine, spreadsheet evaluator, Pyodide worker and Python challenge grader are unchanged.
- The Python editor, Run/Stop controls, grading button, runtime status and output are presented in the same first-class layout as SQL/Excel; live controls are moved rather than cloned.
- Switching a workspace tab changes subject immediately. The dedicated Browse Challenges button still opens the full challenge selector.
- Academy navy, orange, off-white and shared UI tokens now style the Practice Arena shell, results, tables, editor controls, cards and mobile action dock; the layout avoids page-level horizontal overflow down to 320px.
- One collapsible Challenge Brief remains above the editor. Hints, worked answers, grading and per-task drafts remain available.
- The secondary mobile Run control now calls Python Run when Python is selected instead of incorrectly displaying/calling SQL Run.
- Added `tests/practice-unified-three-workspaces.mjs` to the Arena regression suite.

Deployment: Upload the contents of this `datalearning/` project to the existing host using normal deployment procedures. This ZIP is project source, not a claim of production deployment.

## Mastery 50-question assessment & deeper weekly learning (11 Nov 2026)
- Nine course mastery assessments now include 50 course-specific questions each (five items from each of ten weeks). One visible question at a time; Check Answer disabled until a choice is made. Detailed answer rationale, every distractor, worked example, validation and pitfalls are shown after checking.
- Added Previous / Next navigation and per-week exam score report, with optional same-tab draft restoration. Existing weekly quizzes remain unchanged.
- Expanded every weekly module with business context, four core concepts, a guided analytical walkthrough, a worked scenario and verification notes.
- The existing Supabase mastery_results table requires a legacy 0–10 score and total=10; the UI displays and stores locally the true raw score out of 50, while cloud sync sends the accurate percentage and compatible normalized score. No schema changes are required.
- Changes are source-only and not deployed to a live domain.


## 11 November — Mastery selection and visual consolidation
- A course-less mastery assessment URL (`quiz.html?week=mastery` or `quiz.html`) opens a premium course-selection landing page and never displays questions until a course is chosen. Deep links with course parameters remain valid selections.
- A Change course control returns to the course selector. Existing 50-question exams, validation, explanations, and progress storage are preserved.
- The redundant advanced career/roadmap end-of-lesson section was removed from Python and AI core lessons; practical teaching material remains.
- The Reference Library hero heading and actions are centered across desktop, tablet and mobile.
- The Practice Arena loads a consolidated `practice-arena-premium-final.css` instead of six legacy override layers. The legacy mobile action dock was removed and a single canonical Run Query or Calculate button is used across screen sizes; the original SQL challenge action remains wired invisibly for execution.


## 11 November 2026 — AI/Python roadmap and Reference Library compact hero

- The optional six-stage "Your path from the interface to a professional report" section on AI and Python course pages is now presented inside a modern, responsive card.
- The roadmap is **collapsed by default**; the accessible **View roadmap + / Hide roadmap −** button controls a single panel. All existing stages, descriptions and practice tasks remain available.
- The Reference Library hero is shorter and centered vertically and horizontally. Its existing toolkit highlights are retained in a compact summary strip below the hero, not inside the large background.
- Updated course and Reference Library asset cache versions and added the focused regression test `tests/specialist-roadmap-toggle-reference-compact.mjs`.
- Confirmed visually at 1440, 768, 390 and 320px (Reference Library), and 1440, 390 and 320px (both roadmaps); no horizontal overflow; toggle expanded/collapsed successfully.

## 11 November — Mobile full-width Practice Arena and light SQL code surface
- Reduced the Practice Arena's mobile outer gutters to 6px per side and removed redundant nested spacing so all workspace cards, editors, tabs, and result panels use the available screen width.
- Corrected the SQL editor's historical overlapping dark and light layers: the query editor, syntax-highlight pre, and line-number gutter now render as one light surface with dark, contrast-aware syntax colours. The native textarea, selection, caret, input/composition events and scroll synchronisation remain intact.
- Added mobile screen-width assertions and a dedicated `tests/practice-mobile-sql-light.mjs` contract. Browser visual checks were performed at 320px, 390px, 768px and 1440px with no horizontal page overflow.
- Existing challenge selection, SQL/Excel execution and grading, Python worker, weekly lessons, mastery questions, progress and cloud schema are unchanged. The full `npm test` suite passed.
- Source release only; no live deployment was performed.
