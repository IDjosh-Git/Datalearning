# Datalearningpath v30 — Discovery toolbar and week timeline

- Landing page search: luminous focus style, clear button and horizontal filter rail; existing landing-search.js handles real filtering.
- Four specialist courses: reusable compact milestone timeline, scroll arrows, current/completed styling; existing weekly-workspace.js owns switching and completion.
- Foundation course: accessible horizontal lesson timeline wired to existing lesson selection.
- Shared stylesheet: `assets/controls-refresh-v30.css`; loaded last on index and all five course pages.
- No npm dependencies or Vercel routing changes. Asset paths are relative, query versions bumped for modified JS.
- Verification: run a local static server and test keyboard/tab navigation, filters, mobile widths, progress, light/dark states and course deep links before production release.
