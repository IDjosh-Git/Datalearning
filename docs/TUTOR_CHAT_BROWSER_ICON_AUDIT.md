# Tutor, favicon and My Learning skip-link audit

## Scope
Updated against the latest Course Navigation / Cards / Headers release.

## Tutor conversation
- Refined the conversation into a bordered, responsive chat shell with a dark navy toolbar, legible controls, visible offline status, separated assistant and learner messages, and a clearer message composer.
- Retained live/offline tutor choice, topics, suggested prompts, response controls, follow-up actions, quiz/practice controls, chat reset/cancel, privacy notices and message rendering.
- Preserved clear focus states, reduced-motion support, error/loading states and scrollable message history.
- Tutor CSS remains in the existing `assets/styles/tutor.css`; no additional stylesheet layer or duplicate chat component was added.

## Browser tab icons
- One consistent SVG favicon and 32 px PNG fallback linked in every one of the 38 HTML pages, with nested course paths corrected.
- Added 180 px touch icon and a root `favicon.ico` fallback.
- Favicon mark is adapted from the existing ascending-bars learning platform logo, using current ink-navy, indigo and gold.

## My Learning skip link
- The `Skip to main content` keyboard shortcut is retained for accessibility but positioned outside the visible viewport until keyboard focus.
- The account page retains the `#main-content` landmark and its existing authentication/progress features.

## Verification
- `npm run build`, `npm run lint`, and `npm test` pass, including new favicon/Tutor/skip-link regression coverage.
- Embedded browser previews at 360, 768 and 1280 px for Tutor and My Learning show no page-level horizontal overflow.
- Account skip link top position stays at -100px when unfocused and returns to 10px on focus.
- Live authenticated tutor conversations and CDN behaviour were not verified against the production backend.
