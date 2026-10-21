# Data Analysis Learning Path — Week-by-Week Learning Workspace (v5)

## What changed

The course experiences have been restructured to use module-by-module progression inspired by Canvas's Modules and edX's course outline and lesson navigation. The original teaching material, worked exercises, 10 weekly quizzes per specialist course, Supabase authentication, individual progress saving, AI Tutor, instructor/admin access, capstones and certificate requirements remain intact.

### Each specialist course: Excel, SQL, Power BI, AI Integration

- **Only one week is displayed at a time.** Ten curriculum chips and a dropdown allow direct navigation. No scrolling through prior weeks to find the next lesson.
- **Previous / Next** controls are at the top and end of the weekly lesson, including on mobile.
- **Learn → Practise → Knowledge Check** tabs separate explanation, worked labs, graded quiz and mastery tasks without duplicating content.
- Each active week has an **outcome/focus panel** generated from the actual teaching session titles, plus practical study instructions.
- **Practice datasets** are prominent near the top with direct downloadable links (see below) and additional materials in an expandable menu.
- **Supplementary video link** opens an independently published video/course externally and is optional (no autoplay, heavy iframe or forced video downloads).
- Existing completion checkboxes and the original automatic browser/cloud progress synchronisation remain in place. The new completion button triggers the existing change event, rather than implementing an incompatible progress store.
- URL fragments like `courses/excel.html#week7` open the specified week; the learner homepage's Continue Learning action links to the first unfinished week.
- Course overview, instructions, final assessments and certificates remain available under **Course guide & final project**.

### Introduction to Data Analysis

The eight reading/case-study lessons and the knowledge check can now be viewed sequentially via a dropdown and Previous / Next. The five-day kiosk practice CSV is prominent. The longer overview is available using the **View course introduction & progress** toggle.

## Included practice files

| Course | Primary download | Other relevant files |
| --- | --- | --- |
| Excel | `downloads/retail_orders.csv` | customers, sales targets, START_HERE |
| SQL | `downloads/retail_practice.sqlite` | setup SQL, orders CSV, START_HERE |
| Power BI | `downloads/retail_orders.csv` | customers and targets CSVs, START_HERE |
| AI Integration | `downloads/retail_orders.csv` | customers, targets, AI glossary |
| Introduction | `downloads/kiosk_week.csv` | orders and getting-started guide |

## External video support (supplementary)

- Excel beginners (Kevin Stratvert): https://www.youtube.com/watch?v=LgXzzu68j7M
- SQL and databases for beginners (freeCodeCamp): https://www.freecodecamp.org/news/sql-and-databases-full-course
- Power BI beginners (Kevin Stratvert): https://www.youtube.com/watch?v=VaOhNqNtGGE
- AI literacy (DeepLearning.AI, course access terms may apply): https://www.deeplearning.ai/courses/ai-for-everyone/

These are third-party instructional resources, not official Data Analysis Learning Path video courses. Check each source's current availability and policies at deployment.

## Validation

- Original 11 application tests pass, plus the new weekly-workspace regression test.
- Chromium isolated interaction checks at 390px and 1440px show one active module, working week selection and visible quiz tabs for the tested pages, with no horizontal overflow in those isolated layouts.
- Full live sign-in, Supabase progression, cloud network loading and device-browser rendering still require staging/production testing. For isolated visual interaction tests, the application authentication and ancillary scripts were removed in the test harness; they were **not** removed from the release.

## Deployment

1. Upload the complete contents of `Datalearningpath/` (retaining `downloads/`, `assets/`, and `courses/` folder structure).
2. Clear CDN cache where relevant. New assets: `assets/weekly-workspace.js`, `assets/weekly-workspace.css`.
3. Test with a signed-in learner and a signed-in admin: week navigation, quiz scoring, mark complete, refresh/cloud progress, course guide, offline downloads, and introduction case study.
4. Verify the website host serves CSV, SQLite and Markdown files for download; add binary/octet-stream MIME handling for `.sqlite` if needed.
5. Existing security caution: a client-side gate on publicly served static HTML does not prevent direct retrieval of HTML/assets; use hosting-side authentication for server-enforced file privacy.

## Sources for structural inspiration

- Canvas Modules: https://community.instructure.com/en/kb/articles/662761-what-are-modules
- edX course homepage and outline: https://support.edx.org/hc/en-us/articles/14942397728023-What-s-the-Course-Homepage
- Canvas course design recommendations: https://med.stanford.edu/content/sm/edtech/services/lms/medcanvas/design.html
