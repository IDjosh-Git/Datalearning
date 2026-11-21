# Floating Learning AI — interface and pedagogy update

Implemented: desktop default 440×620 px and expandable 720×800 px (viewport constrained); edge-to-edge square-corner fullscreen mobile panel; contextual topic detection from course route and optional week in heading/query; topic-specific suggestion chips; learning modes (Hint, Explain, Worked Example, Check My Answer); copy assistant responses; Stop Generating for live requests; Retry Last Question; New Conversation; horizontal overflow protection for code/tables; links to the existing full Tutor Studio.

Live mode sends the selected learning mode and detected topic to the existing authenticated `/api/tutor` endpoint. Study Guide mode uses the existing offline learning library, with hints avoiding complete examples. No new API keys or external services were introduced.

Not implemented: cross-page/account-linked conversation history, as that requires a dedicated secure cloud persistence design; server-side streaming tokens; automated browser E2E testing of signed-in provider responses. Tutor Studio remains the dedicated full workspace, and is not duplicated by the floating panel.

Validation: `npm run verify:deployment` exit code 0; JS syntax check passed. Not deployed to Vercel.
