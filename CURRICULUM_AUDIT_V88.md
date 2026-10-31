# Data Analysis Learning Path — Complete curriculum audit and revision v88

**Source:** Tutor Studio v87 archive (includes earlier curriculum mastery v34, colour system v86 and Practice Arena v85). The v88 revision is applied to the actual existing six `courses/*.html` pages and supplied datasets; no course routes or practice engines were replaced.

## Scope and methodology

Inspected all six full HTML course pages (including their week/lesson sections, quiz answer keys, projects and links), the v34 structured teaching source, referenced CSV and SQLite datasets, learning workspace scripts, Practice Arena challenge links, download guides and capstone references. The five specialist courses each have 10 weekly modules and the Foundation course has 8 learner-completable lessons plus a 12-item interactive quiz. Existing pages teach 40 separate guided subsections in each of Excel, SQL and Power BI; the previous 30-session claims for SQL and Power BI were wrong and have been corrected. Each specialist module already contained substantial teaching and two worked checks; this release keeps them and adds a tailored, observable practice checkpoint, prerequisite, validation method and project artifact for **all 50**. The eight Foundation lessons received their own tailored learning contracts.

The new visual template is used for course briefs, course progression maps, task/evidence panels and capstone criteria. The original text, lesson actions, quizzes and account/progress behaviour remain available. This is a **structured targeted curriculum revision**, not a claim that all old prose was rewritten or independently tested on every external software version.

## Course-by-course audit and correction log

| Course | Existing verified structure | Priority gaps found | v88 changes |
|---|---|---|---|
| Introduction to Data Analysis | 8 lessons, one progressive five-day kiosk case, 12-question dynamic quiz, 8 lesson checkmarks | Objectives and project artifact were spread across prose; small case study needed a checkable hand-in; access copy suggested registration never required while the course sits behind the real auth flow | Intro study contract, eight tailored independent tasks and self-check conditions, computed daily kiosk controls, precise access wording, first-project evidence specification |
| Excel for Data Analysis | 10 weeks, 40 guided lesson subsections, 50 quiz questions, 20 solved mastery checks | Excel compatibility guidance insufficiently prominent; one example labelled a nine-field range as `A1:J3`; dashboard evidence not clearly linked week by week | Clarified Microsoft 365/2021/2024 and Excel 2016/2019 XLOOKUP differences; corrected `RawData!A1:I3` source in HTML and structured curriculum; 10 individual output/reconciliation tasks, workbook rubric and verified calculation CSV |
| SQL for Data Analysis | 10 weeks, 40 guided teaching subsections, 50 quiz questions, 20 solved mastery checks; supplied SQLite `orders` and `customers` | `net sales` mislabelled a gross-revenue calculation; grouped query claimed a total row it did not return; window-query output omitted `order_date`; 30-session claim inconsistent with 40 sections | Corrected metric label, three-row output and separate total validation, full window-query columns; SQL dialect notes; 10 executable SQL examples tested, join/cardinality/date and project evidence per module; 40-section count corrected |
| Power BI & DAX | 10 weeks, 40 guided subsections, 50 quiz questions, 20 worked mastery checks | Too little emphasis on actual Windows authoring and publishing/licensing constraints; ambiguous "dashboard" terminology; 30-session claim inconsistent with actual content | Windows and license disclaimers; report-versus-Service-dashboard distinction; final week renamed to a report deliverable with optional Service dashboard; DAX filter tests, semantic-model checkpoint and 10 artifacts tied to final project; 40-section claim corrected |
| Python for Data Analytics | 10 weeks, 10 labs, 30 scored quiz questions, 20 solved mastery checks | Python environment and reproducibility checks needed consistent placement; practical success conditions needed explicit testing evidence | Clear interpreter/working-directory/dependencies guidance; 10 individually mapped tasks, code/test deliverables and capstone criteria; all 10 existing code examples run successfully against actual CSV with expected results |
| AI Integration in Data Analysis | 10 modules, 50 quiz questions, 20 worked mastery checks, existing applied toolkit examples | Learner-facing product/provider examples may change; suggestions and independently validated results need explicit distinction; safe-data and manual alternatives need reinforcement | Optional-provider and privacy notice, 10 prompt/verification evidence tasks, independent manual baseline and human-approval rubric; linked current resources; no assumption that a paid model is necessary |

## Cross-track progression

1. **Foundation:** business question, rows/types/grain, data ethics, basic arithmetic, kiosk project.
2. **Excel:** typed table → references and formulas → cleaning → grouped analysis → visual/dashboard evidence.
3. **SQL:** relational grain and filters → gross revenue definition → cardinality-safe joins → query layers → windows/dates → validation → scripted report.
4. **Power BI:** source preparation → star schema → measures/context → periods → accessible visuals/interactions → distribution decisions → report hand-in.
5. **Python:** script setup → types/functions → pandas → cleaning/joins → reporting/stats/NumPy/time → reproducible output.
6. **AI:** limits → structured prompts → privacy → Excel/SQL/Python/DAX verification → forecasts and automation governance → audited human-reviewed deliverable.

These tracks do **not** require a rigid six-course order after the Foundation. Learners may enter a specialist course if they already possess the stated prerequisites. The module maps explain that earlier specialist modules supply skills used in later ones.

## Sources, verified calculations and correction details

The authoritative files are `downloads/kiosk_week.csv` (5 daily observations), `downloads/mastery_orders.csv` (6 fictional transactions, 12 fields) and `downloads/mastery_orders.sqlite` (orders + customers). New derived files `downloads/kiosk_worked_controls_v88.csv` and `downloads/mastery_orders_validation_v88.csv` are computed independently from those source rows. They do not modify the source data.

**Six-order controls:** gross source amount 602,000; completed revenue 578,000; completed gross profit **before overhead** 135,000; 5 completed orders, 1 returned order; East 316,000, West 190,000, North 72,000; January 340,000, February 238,000. The teaching corpus uses hypothetical currency units, not real customer financial records. These values do **not** describe the larger 360-row retail dataset or the Practice Arena challenge data. See `downloads/CURRICULUM_VALIDATION_V88.md` for individual row checks, SQL corrections, the kiosk calculation table, model boundaries, setup notes and the observable five-part project rubric.

**Answer-key audit:** 230 scored specialist multiple-choice questions were parsed and their stored keys matched against the displayed options; there were no invalid keys and no disagreements where a literal `Correct answer:` label exists. The 12 Foundation quiz questions were examined in `assets/introduction.js`, including their explanatory feedback. This is a **structural answer-key audit**, not proof that every distractor has undergone independent academic or expert review.

**Independent execution:** all ten SQL v34 examples executed against the shipped SQLite database; SQL Weeks 3 and 7 received the specific output fixes noted above. All ten Python v34 snippets ran successfully in isolated Python subprocesses with the shipped CSV and installed packages. Example output for JavaScript-based Practice Arena is covered by the inherited Arena test suites. **Excel workbooks, DAX measures, Power Query M, Service publishing, certificate/instructor approvals, and all quiz interactions within a signed-in staging browser were not independently executed**; these remain explicit verification tasks.

## Learning, assessment and privacy boundaries

- A weekly checkbox is learner-reported practice completion; it does not automatically verify an assignment or count as an instructor-approved capstone. Quiz scores are separately calculated by existing scripts; this release does not change progress persistence or sync claims.
- New exercise links on SQL, Excel and Python point to actual present Arena challenge IDs. Practice Arena uses **separate datasets** and its own offline grading; an Arena pass does not equal passing a course capstone.
- Capstone criteria are provided as a 25-point **self-review rubric** in `CURRICULUM_VALIDATION_V88.md`. No instructor-review workflow, accredited credential or placement guarantee was added.
- Datasets are fictional; AI provider access is optional; capstone data should only be uploaded under the existing application's account/privacy controls.

## Technical and usability verification

Passed on the v88 source:
- New `tests/curriculum-v88.py`: six course maps, 58 learning checkpoints, 230 scored key/option checks, included files and six-page internal links, SQLite/Python runnable examples, source/derived dataset checks.
- Original `npm test`, `npm run test:mastery:v34`, `npm run test:arena:v85`, `npm run test:responsive`, `npm run test:colour:v86`, and `npm run verify:deployment` suites.
- Isolated Chromium CSS renders in **seven view/theme combinations** covering Introduction, Excel, SQL, Power BI, Python and AI. All inspected views had no horizontal overflow or script errors. A dark-mode contrast bug in SQL/Power BI course maps was found and corrected by isolating v88 semantic surface tokens from legacy theme overrides.

## Outstanding limitations and follow-up verification

1. Run signed-in end-to-end journeys on **both mobile and desktop** after staging deployment: module navigation, the 12-question Foundation quiz, representative specialist quizzes including wrong answers and retries, save/refresh of progress, Arena deep links, downloads and capstone submissions.
2. Run the Excel workbook and Power BI semantic model examples in the real authoring applications. DAX totals have arithmetic control checks but no real Power BI engine evaluation was available here. Review relationship cardinality, measure filter context, date-table modelling, dashboard terminology and locale-specific formulas.
3. Conduct a human educator review of all 242 individual quiz items (230 specialist + 12 Foundation) for distractor ambiguity and pedagogic rigor. Mechanical key consistency is not equivalent to a full expert psychometric review.
4. Review any existing AI-tool product names, pricing and feature access before using vendor-specific comparisons as purchasing guidance; providers can change terms.
5. Perform real authenticated accessibility checks (screen reader, keyboard, dark/light preference, zoom and user font-size), and verify the deployment console/network. Isolated HTML/CSS rendering is not a full production-browser audit.

**Release:** `v88` is a source-code package, not a live Vercel deployment.
