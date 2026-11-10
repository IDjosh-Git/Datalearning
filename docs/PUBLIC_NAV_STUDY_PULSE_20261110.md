# Unified Navigation and Study Pulse

- **All 31 public HTML pages** have one `.dlu-header` and full-height `#dluNavPanel`, with Discover, Courses, Study Tools, Practice Arena, AI Tutor, Capstone and Progress in the same order.
- All public pages load `public-header-unified.css` and `public-header-unified.js`; the superseded `public-navigation.js` and `unified-academy-shell.js` controllers have been removed from the distribution.
- Search remains available through `premium-search.js`; the same accessible dialog works on mobile and desktop.
- The small bottom-left **Study Pulse** launcher (`learner-companion.js`) retains the original study habit tracker, notes, goals, spaced repetition, bookmarks, and export/import data. The full Learning Coach at `learning-coach.html` remains separate.
- The launcher is icon-only, with an accessible name; its dismissible panel opens above the backdrop. The mobile navigation covers the viewport and remains above the floating widgets.
- Eight authenticated and role-aware pages are intentionally left unchanged.
- No database schema, credentials, Supabase settings, Tutor provider code, or learner progress keys were changed.
- Verification: `npm run verify:deployment`, `node tests/public-nav-study-pulse-unification.mjs`, isolated Chromium checks on Discover, Excel, Learning Coach and Tutor at widths 320/390/1440.
- Live signed-in and physical-device verification remains advisable after Vercel deployment.
