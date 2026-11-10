# DataLearning — visible page loader repair (10 November 2026)

- Added one lightweight, accessible branded loader to every public HTML route.
- It shows immediately on navigation, disappears after DOMContentLoaded (minimum visibility 480 ms), and has a 2.8-second safety timeout to avoid trapping learners if scripts fail.
- No navigation interception, artificial AJAX loader, percentage simulation, blocking auth logic, or server dependency.
- Respects prefers-reduced-motion and remains opt-in (no persistent overlay without JavaScript).
- Protected account/admin pages retain their existing secure session-check gate, avoiding double-loading overlays.
- The Practice Arena, Python runtime, SQLite runtime, Tutor, and Supabase controls are unchanged.
- Added assets/scripts/page-loader.js and assets/styles/page-loader.css.
