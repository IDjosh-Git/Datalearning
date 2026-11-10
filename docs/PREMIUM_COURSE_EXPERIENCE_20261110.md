# Premium course experience — QA and deployment notes

## Scope and principles
This is a UI and interaction enhancement to DataLearning, preserving the seven existing 10-week course identifiers, all current quiz routes, progress keys and the separate 31-module four-level pathway. No student records, content datasets, grades or database permissions were modified.

## Learner experience
1. Start from **Courses**. Use the first learning-path action to view the seven guided courses, or go directly to the four-level specialist explorer.
2. Use category pills or search to narrow the seven guided courses. Course tiles show saved-on-device progress; Start learning opens the first lesson and Continue week opens the earliest incomplete week.
3. Open **Explore the 10-week curriculum** for a concise, navigable lesson outline rather than a permanently expanded list.
4. Inside a guided lesson, the week progress bar, Previous and Next controls, lesson jump links, worked example and exercise answer disclosures help learners navigate without losing their place.
5. The four-level pathway defaults to module cards. Open the comparison table only when comparing tools or outcomes. Specialist modules keep their prerequisite, case study, worked example and model answer.
6. Python and AI retain their existing custom interactive course controllers and use an aligned premium visual system.

## Quality assurance
- `npm run verify:deployment`: passed for Academy, security, Practice Arena, Tutor, script, and course UI contracts.
- Isolated Chromium: 320, 390, 768, 1440px — catalogue renders seven courses, four-level explorer renders 31 modules, filters/search work, table initially collapsed, no document horizontal overflow.
- Isolated Chromium: guided Excel lesson renders and Previous/Next navigation and example completion indicators work at 320, 390 and 1440px. Only a mocked local progress source was used for the UI test.
- Isolated Chromium: Python and AI landing, roadmap and extension pages fit viewports of 390/768/1440px without horizontal document overflow.
- Environment limitation: direct navigation to local server URLs is blocked in the preview browser, so testing used actual stylesheet and DOM components in isolated rendered previews. Signed-in production and live Supabase operations were not verified.

## Deploy
Deploy this complete archive. Test course entry, quiz navigation, progress updates, Python/AI lessons and responsive views in a staged URL with representative signed-in and signed-out accounts before releasing to learners.
