# Seven-stage educator-led curriculum update

All nine Academy courses and 90 weeks now have explicit: business relevance, beginner explanation, four-step demonstration, output interpretation, mistake diagnosis, guided and independent practice, and professional validation/reflection. The core existing lessons, quizzes, worksheets, capstones, mastery items, and authentication are retained. Excel Week 3 and SQL Week 3 receive additional concrete worked walkthroughs. Other weeks reuse and organise the existing authored examples and acceptance criteria with discipline-specific coaching; they are not independently reauthored full-length textbooks.

Source of truth: `assets/data/course-educator-depth.json`; runtime: `assets/scripts/course-educator-depth.js`, `assets/scripts/academy-app.js`; styles: `assets/styles/academy-learning-depth.css`.

Quality gate: `node tests/seven-stage-lesson-quality.mjs`, `npm run verify:deployment`. Validate signed-in lesson layout and actual exercises in a Vercel preview before production.
