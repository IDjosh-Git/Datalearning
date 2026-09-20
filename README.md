# Data Analysis Learning Path

A responsive, Vercel-ready learning portal built from the uploaded three-course site. This package also includes a free **8-lesson Introduction to Data Analysis** (everyday applications, worked lunch-kiosk case study, downloadable five-row CSV, interactive calculator and 12-question knowledge check). The introduction uses local-only checkmarks and does not affect cloud progress or the three existing course certificates. The package contains three 10-week courses (Excel, SQL, Power BI), 150 existing quiz questions, 30 additional guided labs, 54 searchable reference examples, an editable tutor chat, a new DA logo, and a **fictional** practice dataset that works across all three tracks.

**Contact:** [esoterikjoshua@gmail.com](mailto:esoterikjoshua@gmail.com)

## Deploy on Vercel using GitHub

1. Extract the ZIP. Open the **Data_Analysis_Learning_Path** folder and upload its **contents** (including `api/`, `lib/`, `assets/`, `courses/`, `downloads/`, `index.html`, `vercel.json` and `package.json`) to the root of one GitHub repository. Do not upload the ZIP itself, put the entire folder inside another folder, or upload only `index.html`.
2. In Vercel, **Add New → Project → Import** the GitHub repository. Set Framework Preset to **Other**; leave Root Directory as `./` (repository root). No build command is needed. Click **Deploy**.
3. Confirm that `/`, `/courses/introduction.html`, `/courses/excel.html`, `/courses/sql.html`, `/courses/powerbi.html`, `/reference.html`, `/tutor.html`, `/downloads/retail_orders.csv` and `/api/tutor` load on your `*.vercel.app` domain. A GET request to `/api/tutor` should return JSON with `aiEnabled: false` before an API key is configured. If it returns 404, the `api/` folder was not deployed at the repository root.
4. Later GitHub commits trigger new deployments automatically when the repository is connected to Vercel.

The static site, all course pages, quiz scoring, local progress and formula search work without an OpenAI API key. The chat falls back to a **clearly identified reference-library guide**; it is not represented as full generative AI.

## Enable genuine AI replies (optional)

- Create an OpenAI API key through your own OpenAI API account. In Vercel → Project → **Settings → Environment Variables**, add `OPENAI_API_KEY` with the key value. Keep it secret: **never** paste it into `index.html`, `assets/`, GitHub, or a screenshot.
- Optionally set `OPENAI_MODEL` to an available model, otherwise the backend uses `gpt-4.1-mini`.
- Apply the variables to Production and redeploy. Visit `/api/tutor`: `aiEnabled` should become `true`. Ask a test question on `/tutor.html`.
- **API usage is billed separately from hosting.** Set project/API spending limits. The starter function has input/output limits and a best-effort per-instance rate limit, **not distributed abuse protection**; add persistent rate limiting and monitoring before advertising an open, high-traffic public AI chat. The site does not need AI for the reference library to function.
- Responses are generated from user questions and a public curriculum description, not from confidential documents or data. Do not submit private records, passwords, keys or customer information. The server uses OpenAI Responses API with `store:false`.

## Supabase account / cloud progress: read this before launch

The uploaded site included an existing Supabase **project URL and publishable key** in `assets/supabase-config.js`. Those are intentionally preserved so the existing client can continue to use the same project. A publishable key is designed for public browser use; a `service_role` or secret key must **never** be used here.

**At packaging time, the connected Supabase project did not contain the learning portal's `course_progress`, `quiz_results` and `certificates` tables when this package was prepared. I did not modify the live project.** Local course progress and quiz scoring work without those tables; cloud sync, quiz-result persistence and certificate registration **will fail until you configure the database**.

To enable these features, review the provided `supabase_setup.sql` and run it once in the Supabase SQL Editor of the project configured in `assets/supabase-config.js`. The revised script creates only learning-specific tables and per-user RLS policies; it does **not** replace any existing Auth triggers or touch your library/portfolio tables. To turn on public QR verification, add `api` to your project's **Data API exposed schemas** while leaving `public` enabled. The verification endpoint reveals a learner's name and course to anyone holding the unguessable certificate ID; inform learners of this before issuing certificates. Under **Authentication → URL Configuration**, add `https://YOUR-LEARNING-SITE.vercel.app/auth.html` to **Redirect URLs**. Because this Supabase project is shared with other apps, **do not overwrite its existing Site URL** unless you deliberately want to change the default redirect for all apps. Email confirmation and email delivery depend on your Auth/SMTP settings.

Cloud progress uses existing internal JS storage keys (such as `excelRoadmapProgress` and `window.ZAH_DB`) to preserve compatibility with older learner progress. These are not public-facing brand names. No existing learner rows were migrated or reset by this redesign.

**Completion records:** The site uses learner-marked completion weeks, not a proctored assessment. It is not an external or professional accreditation. If certificate verification has not been configured, a QR link may show “Not verified”. New certificates have a DALP prefix; historic IJL IDs remain valid in the setup script. Avoid presenting an unregistered local record as verified.

## Step-by-step cloud progress and completion-record registration

Read **`CLOUD_SETUP_STEP_BY_STEP.md`** for exact dashboard instructions, a sample account test, and troubleshooting. The schema must be run once before a learner signs in and uses cloud features. The site alone cannot create database tables; no database migration has been applied automatically by this ZIP.

## Practice materials

Open `downloads/START_HERE.md`. The dataset is synthetic, not real customers or financial results:

| File | Contents |
|---|---|
| `downloads/kiosk_week.csv` | Five-day fictional kiosk case study for the beginner introduction |
| `downloads/retail_orders.csv` | 360 dated order records |
| `downloads/retail_customers.csv` | 50 customer records |
| `downloads/retail_targets.csv` | 48 monthly-region target rows |
| `downloads/retail_practice.sqlite` | Ready-to-query SQLite database |
| `downloads/retail_sqlite_setup.sql` | Create/populate a new SQLite database |

Completed net sales for the practice data, excluding Returned and Cancelled order rows, reconcile to **14,248,255.00 fictional naira**. The workbook, SQL and DAX definitions must use the same rule.

## Project structure

```text
Data_Analysis_Learning_Path/
  index.html                 Home
  reference.html             Searchable, copyable formula/query library
  tutor.html                 Editable chat: reference mode or live AI
  courses/introduction.html   Eight beginner lessons and complete worked case study
  courses/{excel,sql,powerbi}.html
  assets/site.css            Main responsive design
  assets/introduction.css    Beginner course layout
  assets/introduction.js     Local checkmarks, calculator and 12-question quiz
  assets/course-refresh.css  Restyled original lesson pages
  assets/da-logo.svg         New vector logo
  assets/reference-data.js   54 educational examples
  api/tutor.js               Vercel serverless OpenAI proxy
  lib/tutor-context.js       Public tutoring instructions
  downloads/                 Cross-course practice data
  supabase_setup.sql         Optional, safe learning-only schema
  vercel.json, package.json
```

## Quality checks

Run `npm test` in the extracted project to run structural/content/API mock checks. They do not send a paid AI request or email, and they do not alter a Supabase database. Test real Auth confirmation, certificate verification and live AI after configuring your actual services.

## Beginner orientation (new)

Visit `courses/introduction.html` from the homepage or the sidebar of any technical course. The orientation includes 8 in-depth lessons, daily-life applications, question-to-decision process, grain and data types, quality and privacy, six core calculations, a five-day lunch-kiosk worked example and first mini-project. Download `downloads/kiosk_week.csv` for the worked Excel practice. Lesson checkmarks are deliberately **stored on-device only** using `dalpIntroductionProgressV1`; this introduction does not modify the Supabase learning schema, the 10-week progress records or the certificate rules. The introductory quiz is self-check practice, not an accredited assessment.
