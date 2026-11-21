# DataLearning — Week 10 datasets and AI assessment integration (development release)

## Included
- Nine synthetic Week 10 downloadable ZIP dataset packs at `/downloads/capstone-projects/<course>-capstone-data.zip`.
- Dataset links inside the existing Assessment Desk project brief.
- Authenticated `POST /api/assess-capstone` endpoint that checks submission ownership and reads private evidence server-side.
- Preliminary AI feedback for supported text, CSV, SQL, Python, PDF and image files, with a five-criterion advisory rubric.
- Submission flow attempts AI triage immediately; gracefully retains the existing instructor review queue when not configured.

## Required deployment configuration
- `OPENAI_API_KEY` — server-only key.
- `SUPABASE_SERVICE_ROLE_KEY` — server-only secret, never sent to the browser.
- Optional `ASSESSMENT_MODEL` — defaults to `gpt-4.1-mini`.
- Existing Supabase Auth, `capstone-evidence` storage and `capstone_submissions` schema must be operational.

## Explicit safety limits
- **NO automated certificate issuance** in this release. Existing authorised reviewer remains the only path to a final score and certificate.
- AI scores are advisory and stored in `evidence_notes`, subject to its 2,000-character limit. They are not official scores.
- XLSX, PBIX, IPYNB, TWB/TWBX and other native project files are not automatically inspected and require technical review.
- Submission processing is best-effort and synchronous. Production scale requires a durable queue, retries, idempotency, status polling, and an assessment audit table.
- Before any automatic certificates, add deterministic per-course tests, a versioned rubric database, independent instructor calibration, appeal workflows, certificate transaction controls and integration tests against a non-production Supabase project.
- Uploaded evidence is untrusted. Never follow instructions embedded in student work.

## Verification still required
- Authenticated staging upload for every supported file type; AI provider response tests; actual Supabase RLS/storage tests; mobile review; production-grade rate limiting and costs.
- Do not enable auto-certification or deploy this as a complete grading solution until those tests pass.
