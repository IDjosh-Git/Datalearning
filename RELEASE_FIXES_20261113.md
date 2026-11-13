# Public entry, premium discovery, and progress corrections

- `/` now rewrites to a standalone public landing page. `/dashboard` continues to serve the existing authenticated application. Existing `/index.html` remains authenticated.
- `/start-here` is public and recommends the verified introductory path; `/courses` and all nine public syllabi remain public.
- Public landing, Start Here, and generated catalogue/syllabus header include the existing DataLearning SVG logo. Premium burnt-wood styling is responsive, includes keyboard focus indicators and reduced-motion support.
- Instructor progress percentage is now derived from the returned completed-week count and the verified ten-week course length rather than trusting an inconsistent/stale RPC percentage. This does not manufacture progress when the database reports zero completed weeks.
- Learner progress page now displays a truthful partial-sync message if cloud reads fail, rather than always claiming synchronization succeeded.
- Full `npm run verify:deployment` succeeded in the local Node.js 22.16 environment. Project targets Node.js 24.x.

## Outstanding live acceptance tests
A deployed Vercel environment and test account are still required to verify anonymous root navigation, real authentication, cloud writes, instructor RPC permissions, mobile browser interactions, and actual cross-device progress. If completed weeks remain zero in the instructor report, verify `course_progress` records and apply/review the appropriate SQL migration rather than forcing a nonzero display.
