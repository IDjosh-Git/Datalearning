# DataLearning — Unified Public Navigation & Study Pulse Release

**Updated:** 10 November 2026.

This release is built on the cleaned seven-path DataLearning app. The public header now uses one static design and full-screen mobile menu across all 31 public pages. The bottom-left **Study Pulse** icon opens the original quick habits and revision panel, renamed to distinguish it from the full Learning Coach page. The search action remains in the header. Protected account and administrator navigation is unchanged.

The prior Study Tools isolation changes are retained. Learning Coach and Learning Lab are now independent, purpose-built pages instead of overlapping sections in one document. Study Tools navigation, the public footer, and related links have been updated to point to each tool's own page.

- **Learning Coach:** `learning-coach.html` retains the original seven-session planning, export/import, checkboxes, reflection, active recall and learner-scoped local save keys. Its subject options now include all seven primary courses, with Python and AI available as legacy subjects.
- **Learning Lab:** `learning-lab.html` retains the searchable 559-item review library and its existing local progress and confidence/review scheduling, without embedding the Coach form.
- **Practice Studio:** `studio.html` has one redesigned hero, dedicated exercise picker, compact study panel and responsive active exercise area. Seven main learning paths now offer guided exercises; existing local save keys and self-check functions are preserved.
- **Reference Library:** `reference.html` has a compact filter/search workspace, consistent results cards, readable example code, bookmarking and copy controls.
- **Capstone:** privacy messaging on the submission form is now a slim readable notice, rather than a competing banner; secure upload, instructor review and certificate logic remain unchanged.
- Older bookmarked Coach section links are redirected by a small compatibility script.

**Security:** No Supabase schema changes, service secrets, authentication-policy changes or certificate changes. Verify live signed-in flows after deploying. The old controller IDs and state schemas remain untouched.

**Verification:** `npm run verify:deployment`, `node tests/study-tools-isolated-rebuild.mjs`, isolated Chromium layouts at 320, 390, 768 and 1440 pixels.

**Deployment:** Place the contents of the archive's `datalearning/` folder at your repository root and redeploy on Vercel.
