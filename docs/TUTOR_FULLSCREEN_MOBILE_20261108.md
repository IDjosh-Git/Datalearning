# DataLearning — Fullscreen AI Tutor on mobile (8 November 2026)

## Design and behavior

- On phones and portrait tablets (up to 900px CSS width), the AI Tutor takes the full dynamic viewport. The site-wide header and duplicate introductory hero are hidden on this page **only**.
- The Tutor toolbar keeps an accessible **Back to Discover** control, Tutor name, Tools drawer, and Reset button.
- The conversation is the only primary scrolling region, with no fixed 46vh/52vh height cap and no shrinking of long replies.
- The compact composer stays at the bottom with safe-area padding, including when the page contains many messages.
- The existing privacy and accuracy information now lives in the mobile Tools drawer (visible as part of the desktop study-settings sidebar).
- Input placeholder is shorter to avoid wrapping in the compact single-row composer. Chrome Android browsers can resize content when the virtual keyboard appears.
- Desktop continues to use the full navigation, Tutor introductory hero, and split sidebar/chat layout.

## Changes

- `tutor.html`: accessible Back control, move Privacy & accuracy into sidebar, concise placeholder, mobile keyboard viewport preference.
- `assets/styles/premium-unified.css`: last-loaded scoped viewport-height rules for Tutor only; no global CSS change to other pages.
- `tests/tutor-fullscreen-mobile.mjs`: source-level regression checks, included in `npm run test:tutor`.
- `README.md`: latest release notes.

## Verification

- Complete `npm run verify:deployment` passed.
- Headless Chromium layout tested with locally injected stylesheet text at 320×680, 390×844, 430×932, 768×1024; full viewport occupied, no overflow, messages scroll without moving composer.
- Tools drawer tested at 390×844 and contains Privacy & accuracy.
- Full origin-based navigation was blocked by the browser execution environment, so these previews are static layout checks rather than authenticated live-site tests.

## Deployment

Copy all ZIP contents into your existing DataLearning Git/Vercel project and redeploy. This is a Tutor-only frontend change. No Supabase migration or new environment variables are required.
