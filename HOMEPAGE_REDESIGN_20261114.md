# Public homepage redesign — 14 November 2026

The public `/` route continues to serve `public-pages/landing.html`. The authenticated `index.html`, dashboard, courses, quizzes, progress tracking, authentication, API, middleware and shared theme files were not edited.

The landing page now uses midnight blue, burgundy and ivory, simplified navigation, Get Started and Sign In actions, nine public course previews, a learning illustration and a three-step introduction. It has no JavaScript or external font dependency. Critical styles remain embedded, so the page renders even if the shared stylesheet fails to load.

Two existing tests were made portable on Windows: `page-loader.mjs` now uses `path.basename` to identify the separate sign-in page, and `middleware-access.mjs` imports a URL directly instead of converting its encoded pathname into a second URL. Their behavioral assertions remain in place.

Validation:

- `npm run verify:deployment` passed: build, syntax/lint, academy, security, practice, tutor and cloud-media regression suites.
- Final public stylesheet delivery, stylesheet structure, JavaScript syntax and favicon checks passed after visual adjustments.
- Headless Edge checked 1440, 768, 390 and 320 pixel widths with JavaScript disabled: nine course cards, one main heading and no horizontal overflow. Desktop and phone screenshots were visually reviewed.
- Validation used installed Node 26.13.0; the deployment's existing Node 24.x setting is retained.
- Live login and production cloud writes were not exercised; the existing mocked security and cloud tests passed.

Deployment: extract the archive and use its `datalearning` folder as the project root. Keep the existing hosting environment variables. The existing Vercel configuration and build command are retained. The ZIP contains source and server functions, not just static HTML. It has not been published to the live site.
