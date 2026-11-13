# Route conflict cleanup — 14 November 2026

- Removed duplicate, conflicting `/courses/:course` rewrite entries.
- Added nine exact public course syllabus routes `/courses/{slug}` -> `/course-info/{slug}.html`.
- Preserved authenticated lesson pages `/courses/{slug}.html` and `/dashboard`.
- Explicitly allow-listed public syllabus static HTML in the middleware, without allowing authenticated lesson pages.
- Added redirects for legacy `/catalog.html`, `/landing.html` and `/start-here.html` entry points; retained source files for backward compatibility and to avoid breaking internal references.
- Retained existing assets, progress, quizzes, course content and service-worker unregister logic.
- Validation: `npm run build`, `npm run lint`, `npm test`, `node tests/public-route-conflict.mjs` passed using Node 22.16.0. Project targets Node 24.x.
- No live deployment performed. Production deployment and browser verification remain necessary.
