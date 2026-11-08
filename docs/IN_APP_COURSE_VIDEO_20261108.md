# DataLearning — In-app course video player

Release date: 8 November 2026

## Behavior
- All six main course pages now load `assets/scripts/course-video-player.js`. The viewer uses event delegation, so it works with course resource links created after page load and any other valid YouTube links added to lesson content.
- Selecting a video opens a full-screen backdrop with a responsive, 16:9 YouTube player. The current lesson page, selected week, progress state and scroll position are kept.
- Viewers have a Close button, Escape key support, outside-click dismissal, focus restoration, a fullscreen control, and **Open on YouTube** as an explicit fallback when embedded playback is blocked by the video owner, network or browser.
- The iframe is loaded only after a click; closing it clears `src` to stop playback. Only validated 11-character YouTube IDs from trusted YouTube domains can be embedded. The player uses `youtube-nocookie.com`.
- Native browser YouTube navigation is still available using modifier-click or the in-viewer **Open on YouTube** link. Other site links continue to behave normally.
- The player is styled in the maintained `premium-unified.css` stylesheet; no new stylesheet or third-party JavaScript dependency was introduced.

## Video resource coverage

| Course | Video title / YouTube ID | Preserved resources |
|---|---|---|
| Data Analysis Foundations | Excel beginner walkthrough, `LgXzzu68j7M` (existing) | Case-study files |
| Excel | Excel beginner walkthrough, `LgXzzu68j7M` (existing) | Datasets |
| SQL | SQL Tutorial — Full Database Course, `HXV3zeQKqGY` (freeCodeCamp) | Original freeCodeCamp SQL reading guide |
| Power BI | Power BI beginner walkthrough, `VaOhNqNtGGE` (existing) | Datasets |
| Python | Learn Python — Full Course for Beginners, `rfscVS0vtbw` (freeCodeCamp) | Official Python tutorial |
| AI for Analysts | AI Foundations for Absolute Beginners, `tchN4xa4pfg` (freeCodeCamp) | DeepLearning.AI AI for Everyone link |

Note: The external SQL video demonstrates MySQL, while the bundled dataset uses SQLite; some commands differ. Videos come from third-party creators and may change, become unavailable or prohibit embedding. The app does not download or rehost videos.

## Verification
- `npm run verify:deployment`: passed (build, lint, core, responsive, learning, security, arena and tutor).
- New `tests/course-video-modal.mjs` included in `test:learning`.
- Isolated browser interactions tested at 320, 390, 768 and 1440 px for six course video URLs: opening, bounded layout, `Escape` closing, source cleanup and body scroll restoration (24 checks).
- Browser could not navigate to a local HTTP server in this environment (`ERR_BLOCKED_BY_ADMINISTRATOR`), so these were isolated DOM/CSS browser tests, not end-to-end tests of complete course pages.
- Embedded video frame was mocked during the browser interactions because YouTube playback was not reachable. **Real third-party playback / embedding permissions have not been verified** and must be checked after deployment.

## Deployment
Deploy the full ZIP contents to the same root of the existing Vercel project. No Supabase migration or new API credentials are needed. The existing service worker does not cache mutable scripts or CSS.
