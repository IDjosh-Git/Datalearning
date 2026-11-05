# DataLearning Tutor Studio — Transparent Header Privacy Note

- Removed the white box/background from the dynamic `For privacy, use fictional or anonymised examples...` note inside the Tutor Studio hero header; text remains readable, transparent and unobtrusive.
- Slight refinement to the Tutor learning-space card, conversation panel, sidebar and message area, without changing the live or offline Tutor logic.
- Bumped public service-worker cache revision to v43, so returning users refresh the relevant Tutor styling.

## Verified
- `npm run build`, `npm run lint` and `npm test` passed locally.
- Browser rendering checked at 390px and 1440px; computed note background is transparent (`rgba(0, 0, 0, 0)`), no horizontal page overflow.
- This is an updated source package, not a live Vercel deployment.
