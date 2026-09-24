# Manual instructor assessment · Cloud setup

## 1. SQL upgrade (run once, then keep your SQL files)

Go to **Supabase → your existing learning app project → SQL Editor**. Back up the project, open `supabase_setup.sql`, inspect and run the complete file. Do not create a second project if your learner accounts and progress already exist in the current one. This migration keeps the old tables, all submitted capstones and previous certificates. It adds the `capstone_reviewers` allowlist, reviewer-only access to all submissions and private evidence, and a protected `api.submit_capstone_review` RPC. It removes the old cron-claim/automatic-issuance RPCs. The certificate registry can now be written only through the protected manual review function.

In Data API settings, the exposed schema list should include **`public` and `api`**. Do not expose `learning_private`. Supabase RLS lets learners read their own records and allows the explicitly registered reviewer to see all submissions. Only the manual review RPC can publish a grade and certificate.

## 2. Authorize your own login (essential)

1. Sign into the website using the email address you want to use as owner/instructor.
2. Open Supabase → **Authentication → Users**, click **that user** and copy their **User UID**. An email address or password is *not* a substitute for the UID.
3. Open `OWNER_SETUP.sql`. Replace `00000000-0000-0000-0000-000000000000` with your actual UID. Run it in the Supabase SQL Editor. This creates a single row in `public.capstone_reviewers`, not an additional user.
4. Confirm the new row's UID matches your Supabase Auth profile. Only explicitly allowlisted accounts may enter the review desk and publish assessments; ordinary learners may not read other learners' submissions or evidence.

If you want **only yourself** to grade, add only your own UID. Revoke access by deleting the allowlist row from SQL Editor. Do not attempt to gate the reviewer area only by hiding menu links or by checking an email address in JavaScript.

## 3. Website deployment

Extract the ZIP into the GitHub repository connected to your current Vercel project. Upload all files including `reviewer.html`, `assets/reviewer.js`, `assets/reviewer.css`, the upgraded SQL and supporting course content. Redeploy the Vercel project. **No scheduled assessment job** or server secrets are required to grade; the browser uses your signed-in Supabase session and the protected database RPC. Remove the old cron and its credentials if not needed elsewhere.

The old `api/review-capstones.js` is absent from this ZIP; also delete any existing copy from your GitHub repository. Only the separate optional AI *tutor* still uses `/api/tutor`, which requires `OPENAI_API_KEY` if you want live chat. Without the API key, the tutor uses its built-in reference mode.

## 4. Review a learner's project

Sign in as the authorised instructor and open **My learning → Instructor review desk** or `/reviewer.html`. The inbox includes all submitted capstones with filters for **course, status and learner/project search**, with pagination. Select one project to read the learner's summary and inspect each uploaded item. The file gallery prioritizes **photos/screenshots**, previews PDF, TXT, CSV, SQL and XLSX in-page, and provides an open/download link for every file. PBIX requires Power BI Desktop. Use a phone or laptop.

Enter five integer scores with maxima of **25, 20, 20, 20 and 15**. Add an overall remark (minimum 20 characters), strengths, areas to improve and next steps. The total updates while you type; only clicking **Publish assessment** releases the grade. A confirmation prompts you before publishing. If the grade is at least **70/100**, the transaction also issues the verified course-completion certificate; otherwise the learner may revise and resubmit. Results appear in the learner's Capstone Studio immediately after your successful submission (they may need to refresh).

The database still records an internal five-day *target* date for historical compatibility, but **it does not defer results**. There is no AI review, no scheduled assessment and no automatic score generation.

## 5. Security / test checklist

- Sign in as a normal learner: `/reviewer.html` must say **Access restricted**, and direct Supabase queries must not return other learners' capstones or private attachments. Learners cannot call the grading RPC successfully.
- Sign in as the allowlisted owner: see all submissions and private evidence; able to publish once per submission. Learners must not be able to submit scores, change an existing grade, issue a certificate or upload evidence under another account's folder.
- Test scores **69** and **70** on two different sample projects. A 69 should show feedback and allow a revision; 70 should issue the certificate immediately. Refresh the learner page and check the public verifier with the issued certificate ID.
- Confirm existing certificates still verify and existing progress/quiz records remain. Test both light/dark themes and smartphone width.
- Do not put a Supabase secret/service-role key or any API key in website HTML or JavaScript. The frontend contains only the intended public publishable key. Publish an evidence retention/deletion policy before inviting learners.

**Scope:** The local test suite checks source structure and protected SQL logic, but you must run the end-to-end Auth/RLS/upload/publishing tests against your actual Supabase project after deploying this upgrade. The ZIP has not modified your live database or Vercel settings.

## Instructor learner-progress + cross-device Introduction upgrade

After uploading this version, **run the latest `supabase_setup.sql` again in the same Supabase project**. It adds the protected instructor progress functions and expands `course_progress` so the 8-lesson Introduction can sync to the signed-in learner account. Introduction progress is for monitoring only; it cannot unlock a specialist certificate.

Then sign in with the instructor account listed in `capstone_reviewers` and open **My Account → Open learner progress**. The instructor dashboard includes Introduction, Excel, SQL and Power BI and can be filtered by learner, learning path and status.

For a learner who already completed Introduction on one phone before this upgrade, open the upgraded site on that phone and sign in once. The local Introduction checkmarks are migrated to Supabase on first sync. After that, signing into the same account on a laptop will retrieve those checkmarks. Anonymous progress cannot move between devices until it is attached to a signed-in account.

## Light and dark mode

Every main page now loads a shared final theme layer (`assets/theme-polish.css`) and applies the saved theme before page paint. Test the portal, My Learning, Introduction, all three specialist courses, Capstone Studio, Review Desk, Learner Progress, Reference Library, Tutor, Auth and Verify pages in both modes after deployment.
