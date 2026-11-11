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
