# Data Analysis Learning Path · Manual Grading Edition (v3)

The existing 8-lesson introduction, three full 10-week courses, 150 quiz questions, guided labs, formula library, downloads, progress syncing, course identities, dark/light theme and certificate artwork remain available. **Capstone projects are now assessed by the owner, not AI.**

## What changed

- Learners complete all ten weeks, submit a project summary and upload 1–4 files (12 MB each, 32 MB combined). A prominent **Photos/screenshots preferred** instruction encourages pictures of finished work, plus workbooks, SQL, PDF or PBIX as optional supporting evidence. The bucket stays private.
- `/reviewer.html` is your private instructor review desk. It has a paginated, searchable/filterable inbox, pending/passed/revision counts, learner/project information, a visual evidence gallery, in-page image/PDF/text/CSV/SQL previews, and an XLSX preview for up to three worksheets. PBIX and other files can be opened/downloaded for inspection in the native application. Mobile layout is supported.
- The published 100-point rubric: problem & objectives (25), data quality (20), technical execution (20), insights (20), communication & evidence (15). Enter integer scores and written feedback. The database **validates all five subscores, checks owner authorization and 10 completed weeks, computes the total and publishes atomically** when you click Publish. At 70 or higher it issues/links a certificate in the same transaction; below 70 it requests a revision. The learner sees the score and feedback on refresh. There is **no automatic grader, AI capstone API, review cron or five-day grade-release gate**.
- An estimated target due date (`review_due_at = submission + 5 days`) is retained in the database for your own planning and compatibility with older rows. It does **not** delay publication. You control when you review.
- The optional AI learning tutor is preserved separately and is not used for assessments. It can remain in reference-only mode without an OpenAI key.

## Update your existing site

1. Back up your existing Supabase project and the current site repository. Extract this ZIP and replace the site repository with the **contents** of this folder (including `api/`, `assets/`, `courses/`, `index.html`, `capstone.html`, `reviewer.html`, `OWNER_SETUP.sql`, `supabase_setup.sql`, and `vercel.json`). Use the same Vercel project; framework: Other; no build command.
2. In the **same Supabase project already referenced by** `assets/supabase-config.js`, inspect and run **the complete updated `supabase_setup.sql`** in SQL Editor. It preserves existing learning rows and unrelated apps, removes the old automated-claim functions, establishes owner-only grading and protects learners' evidence. Do not run against a different project. Ensure the public `api` schema is exposed in Supabase Data API settings without removing `public`; **never expose `learning_private`**.
3. In Supabase Authentication → Users, open the account **you use to sign in as the instructor** and copy its **User UID**. Open `OWNER_SETUP.sql`, replace its zero UUID placeholder with that exact UID and run the statement in SQL Editor. **Do not add a learner or unknown account**. Only this explicitly allowlisted account can view all submissions and publish scores. Learners are limited to their own submission, evidence and certificate by RLS. A static HTML URL by itself does not grant access.
4. Redeploy the Vercel project. Remove `CRON_SECRET`, `OPENAI_REVIEW_MODEL` and `SUPABASE_SERVICE_ROLE_KEY` from Vercel if they were *only* used for the old automated capstone endpoint and nothing else in your site needs them. Delete the old `api/review-capstones.js` from your GitHub repository when updating an existing site, and remove any manually configured external cron hitting `/api/review-capstones`: that endpoint is deleted and `vercel.json` no longer schedules it. **Neither OpenAI nor service-role credentials are required for grading.** `OPENAI_API_KEY` is optional only for the separate AI tutor.
5. Sign in with your instructor account, go to `account.html` and select **Instructor review desk**, or open `/reviewer.html` directly. As a learner, sign in with another test account, complete/sync the ten weeks, upload a **photo or screenshot** and a supporting file, then check that it appears in the inbox. Preview files, enter five rubric scores and publish. Refresh the learner's `capstone.html` to see score, remarks and (for a passing score) certificate and verification URL.

**Previous records:** Existing submissions, grades and certificates remain. A previously completed automated review is not regraded automatically. Existing pending/processing/error/manual-review records can be taken over and graded by the instructor. Historical `review_due_at` values are retained but no longer restrict manual review.

**Privacy and limitations:** The instructor and each learner can view appropriate files in the private bucket; the owner can download attachments while assessing on the go. A Power BI `.pbix` file cannot be rendered inside the browser: use screenshots for fast review or download the `.pbix` to Power BI Desktop. ExcelJS 4.4.0 is loaded via a CDN only on the private reviewer page to display an XLSX preview; if offline, download the workbook instead. For security, publish a data-retention policy and avoid client/customer datasets without permission. A completion certificate is not an accredited or Microsoft-issued certification.

See `CLOUD_SETUP_STEP_BY_STEP.md` for setup, security checks and troubleshooting.

## Instructor learner progress

The instructor workspace now includes `progress.html`, a private learner-progress dashboard. It shows learners with activity in the learning tables, course progress, quiz count/average, capstone status, certificate status and latest activity. Click **View details** to see all ten weeks and the quiz result for each week.

Access is not granted by hiding the page alone. The dashboard calls instructor-only RPC functions in the `learning_private`/`api` schemas, and each protected function checks the signed-in user against `public.capstone_reviewers`. Re-run the latest `supabase_setup.sql` after upgrading so these functions exist.


## Cross-device Introduction progress

The 8-lesson Introduction path is now stored in `course_progress` when the learner is signed in. Existing local Introduction checkmarks are migrated to the signed-in account on first sync, so the same progress can appear on phone and laptop. This requires rerunning the latest `supabase_setup.sql`. The Introduction remains a foundation module and does not count toward certificate eligibility.

## Instructor learner progress

Authorised reviewers can open `progress.html` to see Introduction, Excel, SQL and Power BI progress. The dashboard is protected by the same `capstone_reviewers` allowlist as the Review Desk.
