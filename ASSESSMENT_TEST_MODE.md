# Assessment Test Mode — administrator dry run

Open Assessment Desk (`reviewer.html`) while signed in as a site administrator. The Assessment Test Mode panel accepts **synthetic** project title, summary, and pasted evidence. Supported technical fixtures (CSV/SQL/Python/JSON) invoke the same AI grading function as the learner assessment endpoint. Unsupported types (XLSX/PBIX/PDF) simulate a manual-review fallback without sending evidence to AI. The result includes the five rubric scores, simulated outcome and whether a real passing assessment would qualify for certificate issuance.

## Safety
- Server checks session, administrator membership and request origin.
- No learner ID is accepted, and no learner data is read or modified.
- The test endpoint has **no database writes or certificate issuance**. Test results are returned to the administrator only and are not persisted.
- Never paste actual learner data, private files or personal information into the test form: supported synthetic evidence is sent to the configured external AI provider.
- The test **does not validate** live learner upload, certificate issuance, or My Learning certificate display. Those still require a separate controlled end-to-end test using a new course/submission and appropriate safeguards.
- AI provider errors yield simulated `needs_manual_review`. This is not an actual instructor queue item.

## Deployment
Deploy this source version to Vercel; the feature is not active on the existing production deployment until deployed. No database migration required. Run `node tests/assessment-test-mode.mjs`, `node tests/server-auth.mjs`, `node tests/middleware-access.mjs`, `node tools-build-deployment.mjs`, and `node tests/clean-deployment.mjs` for focused checks.
