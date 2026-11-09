# Premium Tutor & Immersive Mobile Challenges — 9 November 2026

## User experience

- Tutor Studio: squared premium panels, bubbles, toolbar, composer and controls; Blueprint/ivory palette, subtle melon accent, readable focus states and compact single-row mobile toolbar. The previous inline `Reset` control no longer overflows 320px screens.
- Practice Arena: tapping **Browse challenges** opens a modal that fills the entire phone viewport (including the area occupied by the normal site header). Close button, challenge search, compact filter expander and reset footer remain anchored; the list scrolls independently and supports touch momentum/overscroll containment. Four filters can be expanded on small screens and remain visible on desktop.
- Challenge selection, grading, offline execution, local progress, Tutor offline/live modes and account systems retain their existing code paths. The dialog is moved under document.body on open to avoid stacking conflicts; this does not clone/remove its DOM nodes or event handlers.
- Keyboard accessibility: Escape to close, Ctrl/Cmd+K to toggle, modal focus trap, focus restore on close. Visual focus indicators, safe-area insets and reduced-motion styles preserved.

## Verification

- `npm run verify:deployment` passed.
- Browser geometry audits at 320x720, 390x844, 768x1024, and 1440x900. Narrow phones: dialog begins at x=0,y=0 and equals the viewport height; dialog itself does not scroll; the challenge list scrolls internally. No horizontal page overflow detected in tested viewports.
- Browser checks of visibility, filter disclosure, close/Escape and Tutor control geometry passed. Actual deployed provider requests and account-specific user journeys should be verified after deployment.

## Deployment

Replace files in the existing GitHub project root and redeploy through Vercel. No Supabase migrations or new environment variables are required. Clear a stale browser cache if old CSS is observed.
