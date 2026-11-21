# DataLearning automated assessment setup

## Release status
This source release adds a server-side AI assessment endpoint, same five-category rubric used by the manual Review Desk, and an optional manual fallback. It does **not** change the deployed database or live environment.

## Required setup
1. Apply `database/migrations/20261121_ai_capstone_grading.sql` in the correct Supabase project (back up first).
2. Configure `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, and optionally `ASSESSMENT_MODEL` in Vercel server-side environment settings. Never publish these values in frontend code.
3. Deploy to a preview environment, upload a small supported submission, inspect the saved scores and certificate, and confirm the learner dashboard and verification page.
4. Test missing API key, unsupported PBIX/XLSX/PDF files, failed AI responses, duplicate calls, and instructor fallback.

## Safety and limitations
- The system accepts supported text/code/CSV files and images for AI inspection. Unsupported files (PDF, PBIX, XLSX and others) are preserved and routed to an instructor; the system does not pretend to inspect their internal structure.
- At least one machine-readable technical source file is required for automatic grading. Visual evidence alone cannot establish executable correctness. The AI may also request manual review.
- Automatic certificate issuance uses the existing 70/100 threshold and a 14/20 technical minimum. The same five-category rubric is used by manual grading; the technical minimum is an additional AI safeguard, not a new manual grading policy.
- The AI model is not a deterministic SQL/Python executor or Excel/Power BI validator. For production-grade automatic certification, add independent executable tests and instructor-calibrated evaluation cases.
- Grading is attempted immediately from the submission page. If the request is interrupted or times out, the record may stay `processing`; an operations recovery job is needed before a high-volume production rollout. The Review Desk supports `processing` records for manual fallback.
- AI assessment is a paid external service; learner evidence is transmitted to the configured AI provider. Publish a privacy notice and retention policy before enabling this for real learners.
