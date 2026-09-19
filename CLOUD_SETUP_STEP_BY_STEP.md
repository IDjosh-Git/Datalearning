# Data Analysis Learning Path — cloud progress and completion records

**The package is already connected to a Supabase project** via `assets/supabase-config.js`. It has its URL and public publishable key, but the learning-specific tables are **not created by deploying to Vercel**. The instructions below are for the Supabase project shown in that file. Back up any existing project before changes. Do not create a second project unless you also intentionally update the configuration.

## 1. Deploy the updated learning site
Extract the ZIP, upload **all contents** (including `assets/`, `courses/`, `api/`, `lib/`, `index.html`, `supabase_setup.sql` and `vercel.json`) to one GitHub repository and import that repository into Vercel. When replacing an existing project, commit these files to the same GitHub repository. Record the full production URL, e.g. `https://your-learning-site.vercel.app`. Do not upload the ZIP itself as the site.

## 2. Create the learning tables (one-time database setup)
1. Sign in at [Supabase Dashboard](https://supabase.com/dashboard) and open the project whose ID matches the URL in `assets/supabase-config.js` (the current package is set to `hotysnqorkqbiconjskl`). Do not choose an unrelated project.
2. Select **SQL Editor → New query**.
3. Open the packaged **`supabase_setup.sql`** on your device, copy all its SQL into the editor, review it, then click **Run** once. This creates `course_progress`, `quiz_results` and `certificates`, with per-user row-level security (RLS). It also creates a narrowly scoped certificate lookup function in the `api` schema. The script does **not** modify existing library or portfolio tables.
4. Under **Database → Tables** or **Table Editor**, confirm the three new tables exist. Existing learners, including those using the other apps in this Supabase project, are not automatically issued completion records.

## 3. Allow sign-ups and email confirmations
1. Open **Authentication → Providers → Email** and enable email/password sign-in and new-user signups. Keep email confirmation enabled if possible.
2. Under **Authentication → URL Configuration**, add your exact production URL **plus `/auth.html`** to **Redirect URLs** (for example `https://your-learning-site.vercel.app/auth.html`). The signup flow explicitly redirects here after confirmation.
3. **This Supabase project is shared with your other apps. Keep its existing Site URL** unless you intend to change their default sign-in redirects. Add the new learning URL to the allow-list instead.
4. If confirmation emails do not arrive, check spam and Supabase's email sending limits; configure custom SMTP for production if needed. Do not put an SMTP password or Supabase secret/service-role key in public website files.

## 4. Check learner cloud progress
1. Open your Vercel learning site in a normal browser; select **Sign in / register**, create a learner account, and confirm the email if prompted. Sign in.
2. Open Excel, complete week 1, then look for **Synced** on the course. On **My Account**, check that Excel shows **1 of 10 weeks**.
3. To verify cross-device sync, sign in to the same learner account on another browser/device. The previously completed week should appear there. If it does not, check **My Account → Cloud Sync**, then return to the course and tap the sync-status button to retry. Do not clear the original browser's storage before confirming sync.
4. Quiz scores appear under **My Account → Quiz Results** after answering a quiz and clicking its grade button. Course completion is currently learner-marked, not independently graded or proctored.

## 5. Register a course-completion record and enable QR checks
1. When all **10 weeks** of a course have been marked complete and synced, open that course's **Certificate** section. Enter the learner's full name and click **Generate Certificate**. Wait for the message **“Course-completion record registered.”** A local PNG/PDF without this confirmation is **not** a registered record.
2. In **My Account → Certificates**, the registered record should appear with a **Verify** link. New certificate IDs start with `DALP-`; historical `IJL-` IDs are still recognised by the SQL setup.
3. To enable verification for anyone holding the QR code: open **Supabase → Project Settings / Integrations → Data API → Exposed schemas** and **add `api`** without removing `public`. Save the setting. The function only returns limited fields for an exact active certificate ID. Test the actual QR/Verify link in a private browser window.
4. The checker shows **Not verified** until database registration succeeds and the function is accessible. In the browser, test `https://your-learning-site.vercel.app/verify.html?id=YOUR_REAL_CERTIFICATE_ID` using an actually registered ID, not an invented one.

**Privacy and meaning:** Verification reveals the learner name, course, completion date and ID to anyone who has the certificate link. Obtain appropriate learner consent. These are self-paced **course-completion records**, not Microsoft credentials, university awards or accredited professional certifications. The learner can mark their own weeks complete; quizzes are recorded but are not currently a condition for issuing a record.

## Troubleshooting
- **“Database not configured”**: inspect `assets/supabase-config.js` (publishable key only) and whether the Supabase client script loaded.
- **“Could not find table / permission denied”**: confirm the setup SQL ran in the correct project; verify tables, grants and RLS policies.
- **“Sign in to sync”**: sign in; if email confirmation is required, confirm your email first.
- **“Sync error”**: do not delete browser data; reconnect, check the browser console and retry the course’s sync button.
- **“Certificate registration error”**: first confirm all 10 weeks show synced in **My Account**. A locally generated image is not a database registration.
- **“Not verified”**: ensure the `api` schema is in the exposed Data API schemas, use a real registered ID, and confirm the certificate record is active.

Setup does not require `OPENAI_API_KEY`; that key is only for live AI tutor responses.
