# 9 November 2026 — Public floating AI, full-screen navigation, contrast

- Added a small fixed AI launcher to public learning pages, a pop-up chat panel, offline guide retrieval from existing built-in knowledge, and optional authenticated AI via existing `/api/tutor`.
- Live AI continues to require a signed-in session, configured provider API key, per-account rate limiting, and a same-origin request; no new credentials were added to the browser.
- Replaced mobile/tablet public navigation with a full-viewport scrollable menu and visible close button, Escape handling, and keyboard focus loop.
- Removed Search Learning trigger from `auth.html` by not loading the search overlay script there; search stays in site navigation elsewhere.
- Clarified light feedback card colors and dark terminal text contrast in Practice Arena, along with targeted pale-panel text fixes.
- Added responsive sizing, reduced-motion support, and visible focus states to the coach UI.

Deploy as the complete existing project, retaining the configured Supabase and AI environment. No SQL migration is required.
