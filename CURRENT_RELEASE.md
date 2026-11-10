# DataLearning · Seven Learning Paths (10 November 2026)

This release rebuilds the learner-facing Discover, Courses, weekly lesson, Questions to Try, and My Progress screens around one mobile-first, accessible design system. It preserves the pre-existing advanced tools and authenticated workflows rather than replacing them with mock-ups.

## Curriculum

Seven guided course paths: Data Analysis, Excel, SQL, Power BI, Tableau, Power Query, and Introductory Statistics. Ten weekly modules per course (70 total), with beginner-friendly learning objectives, worked examples, practice exercises, model answers, and 270 practice questions. Visit `catalog.html`, select a course, open any week, and use the **Questions to Try** button to open the dedicated `quiz.html?course=<slug>&week=<n>` page. End-of-course Mastery Assessments use `week=mastery`.

Existing Data Analysis, Excel, SQL, and Power BI lesson material has been retained or incorporated, and Tableau, Power Query, and Statistics teaching tracks have been added. The legacy Python/AI course pages remain in the codebase for returning learners but are not listed as current primary paths.

## Real Supabase connection

- Uses the existing `assets/scripts/supabase-config.js` publishable-key configuration and authenticated `supabase-js` client. **No service-role key is included.**
- The connected DataLearning Supabase project (`hotysnqorkqbiconjskl`) received an additive migration expanding course checks in `course_progress`, `quiz_results`, `capstone_submissions`, and `certificates`. It also received an RLS-protected `mastery_results` table.
- Weekly completion uses the existing `ZAHProgressCloud.saveWeek` and authenticated RLS-protected upserts. Quiz results use `quiz_results`; Mastery Assessments use `mastery_results`. Signed-out learners receive local browser progress; the UI explicitly labels local versus cloud state.
- All seven paths support the original capstone submission workflow. **Certificates are not self-issued:** the existing authorised instructor review remains mandatory, and the database certificate mapping now recognizes the new course codes. The pre-existing certification verification page remains available.
- Do not re-run the migration on this same project. A reviewed, idempotent-ish copy is included at `database/migrations/seven_path_academy_20261110.sql` for other deployments. Keep database backups and examine function definitions before running it in another project.

## Maintained capabilities

Sign-in and Create Account (`auth.html`), Practice Arena (`practice.html`) with the existing SQL/Excel/Python challenge engines, AI Tutor Studio (`tutor.html`), floating AI with local knowledge + authenticated live-AI mode, Learning Coach (`learning-lab.html`), capstones and instructor review (`capstone.html`, `reviewer.html`), verified certificates (`certificate.html`, `verify.html`), and administrative learner reporting (`progress.html`). All original code and data files for these workflows remain in the package.

## Deploy

1. Unzip the project and push the contents of the `datalearning/` directory to the GitHub repository root (including `api/`, `assets/`, `database/` and `vercel.json`).
2. In Vercel, use the repository's existing deployment project, build command `npm run build`, and install with `npm install` (package versions are pinned in `package.json`).
3. Keep the server-only Tutor provider credentials from `.env.example` in **Vercel Environment Variables**. Never store them in frontend JavaScript or Git.
4. Build and test: `npm run verify:deployment`. After deploy, check `index.html`, `catalog.html`, `courses/tableau.html?week=3`, `quiz.html?course=powerquery&week=5`, `quiz.html?course=statistics&week=mastery`, and an authenticated learner's progress/capstone workflow.
5. Hard-refresh the hosted app to update browser assets. This release avoids caching HTML, JavaScript, and CSS in the service worker.

## Verification and limits

The dedicated Academy structural tests cover 7 paths, 70 modules and 270 questions; preserved security, Arena and Tutor regression suites were run. Isolated Chromium checks covered 24 page-width combinations with no JS exceptions or horizontal overflow. Live authenticated end-to-end browser testing using real learner credentials and real physical-device/browser combinations has not been completed. The complete legacy visual-regression suite contains assertions tied to replaced six-path page markup; `npm run test:legacy` is kept separately for migration reference, while `npm run verify:deployment` runs the maintained current checks.
