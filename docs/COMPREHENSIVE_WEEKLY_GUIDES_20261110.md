# DataLearning — Comprehensive Weekly Learning Guides

**Release date:** 10 November 2026

## What changed

Every week across **Data Analysis, Excel, SQL, Power BI, Tableau, Power Query and Introductory Statistics** now uses an expanded, original guided-reading lesson, rather than relying on just an objective and a short example. This includes **70 individually written modules**.

Each lesson is organised into:

1. **Learning goal** — the measurable skill learners should gain;
2. **Understand the idea** — an accessible explanation of the underlying concept;
3. **Why it matters** — a separate explanation of its business relevance and caveats;
4. **Guided workflow** — four concrete steps learners can follow in the appropriate tool;
5. **Example to study** — an Excel formula, SQL statement, DAX, Tableau calculation, Power Query M example or statistical calculation where suitable;
6. **Worked business example** — the original week scenario plus an expanded, distinct case;
7. **Practical exercise** — an activity with a selectively revealed model answer;
8. **Recap and verification** — checks for correctness, limitations and common mistakes.

The **Questions to Try** button still opens the independent weekly quiz page, and progress is marked separately. All existing Supabase, AI, Practice Arena, Learning Coach, Mastery Assessment, capstone, certificate and authentication implementations are retained.

## Teaching approach

The structure is informed by the instructional patterns of Microsoft Learn: defined objectives, small conceptual units, practical examples, exercises, a knowledge check and a summary. Course text and worked cases were written specifically for DataLearning and are **not copied** from Microsoft Learn.

Reference pages (for instructional structure only):
- https://learn.microsoft.com/en-us/training/modules/clean-data-power-bi/
- https://learn.microsoft.com/en-us/training/modules/get-started-data-analytics/
- https://learn.microsoft.com/en-us/training/paths/data-analytics-microsoft/

## Technical changes

- `assets/scripts/academy-guided-lessons.js` — original weekly lesson guide data.
- `assets/scripts/academy-app.js` — renders detailed learning units, model cases, step lists and jump navigation.
- `assets/styles/academy.css` — consistent responsive reader components with code blocks, exercises, case cards and accessible text colours.
- `courses/{introduction,excel,sql,powerbi,tableau,powerquery,statistics}.html` — loads the guide data before the course controller.
- `tests/academy-guided-lessons.mjs` — validates every guide, course wiring, separate assessments and existing progress integration.

## Deployment and preservation

- Deploy the complete project as usual; **no database migration** is needed for the expanded lesson text.
- Existing progress records are unchanged because the course slug and week number remain the same.
- No existing quiz questions, stored quiz results, mastery results, capstone records or certificate records have been reset.
- The source lesson data is held in the delivered project, so the lessons do not depend on a third-party content API.

## Verification

Run `npm run verify:deployment`. The guided-content test asserts 70 complete guides. Additional isolated Chromium checks cover the seven course readers at desktop, tablet and phone widths, 70 week selections, full-screen mobile drawers, and overflow and script-error checks. Isolated local browser checks do **not** constitute proof of production behaviour or exhaustive accessibility certification; test the deployed app with signed-in learners before publishing.
