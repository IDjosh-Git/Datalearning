# Comprehensive Learning Path + 300-Prompt Library — 14 October 2026

## What changed

**AI Integration in Data Analysis** is a standalone, ten-week specialist track. Every week now includes an expanded plain-language manual, progressive practical instructions, worked examples, tool-specific applications, quality-control steps, common mistakes, assessment deliverables and a five-question scored learning check. All ten existing toolkits and the original learning-progress checkboxes were preserved.

**AI Prompt Library** is available at `prompt-library.html` with 300 distinctly titled task prompts in 20 categories. It supports keyword search, category and level filtering, copying individual prompts, bookmarking saved prompts locally, exporting bookmarks, and downloading all prompts as Markdown. Prompts require learners to fill placeholders with an approved schema and real objective; they must verify any analysis produced by AI. A portable full library is at `downloads/AI_PROMPT_LIBRARY_300.md` and a 70-term glossary is at `downloads/AI_ANALYTICS_GLOSSARY.md`.

**Excel, SQL and Power BI** retain their comprehensive 10-week beginner-to-capstone curricula, 150 original quiz questions and 30 original guided labs. Each specialist week gained an additional career-grade mastery assignment, independent validation criteria and access to prompts. A new shared `downloads/WORKED_SOLUTIONS.md` contains reproducible reference calculations, code snippets, and reconciliation checks.

**Technical fixes:** Quiz clicks are now recognized for grade buttons without an HTML id, enabling the existing authenticated quiz-sync handler to run. AI capstone scoring language has been aligned with the actual instructor rubric. Certificate ID schema and deployment migration now accept the AI code `AIA` while retaining historical IDs. No self-issued certificates or AI grading were introduced.

## Dataset checkpoints

These are test values for the existing **fictional** retail files:

- 360 orders, 50 customers and 48 monthly-region target rows
- Statuses: Completed 306; Returned 27; Cancelled 27
- Completed-order net revenue (Jan–Dec 2025): ₦14,248,255
- January: ₦1,149,005; February: ₦1,522,910; March: ₦1,376,500

## Installation / upgrade

1. Back up the existing deployment and database schema.
2. Replace the website source with the contents of this package; deploy through your existing hosting process (such as Vercel).
3. For an **existing Supabase project**, run `AI_COURSE_DATABASE_MIGRATION.sql` once in the intended project's SQL editor to update course checks, certificate IDs and instructor-only functions. **Do not reset or delete learner records.** A clean setup can use `supabase_setup.sql` together with the documented owner configuration process.
4. Review `assets/supabase-config.js`, host-domain/auth redirect settings, and instructor allowlist in the existing owner's configuration. Do not include Supabase service-role secrets in frontend files.
5. Test a signed-in learner completing one AI week and submitting a quiz; then check progress from another device. Confirm that a passing instructor-reviewed **test** capstone issues a verifiable AI certificate only in an approved test environment. Do not publish fake learner credentials.
6. Open `prompt-library.html` and test search, bookmarking, copying, exporting, filtering and mobile navigation in an actual deployed browser.

## Verification performed

- `npm test` passes all supplied and added project structural/regression suites, covering existing security-oriented tests and the new 300-prompt/course content checks.
- The supplied CSV and SQLite datasets were examined and key numerical worked examples reconciled.
- HTML local relative links and referenced files were checked for missing paths.
- JavaScript syntax for the new prompt UI was checked with Node.
- **Not completed:** live Supabase end-to-end testing, production deployment and manual browser rendering; the available browser was restricted from opening both local and loopback pages in the working environment. These require testing in the user's deployed setup.

## Course administration

The AI course remains a full **separate specialist course**. Progress completion is self-attested but synced when authenticated. Verification and certificate issuance still depend on protected instructor review and a passing capstone score of 70/100. Prompt libraries do not require a paid AI model subscription to view, search or copy.
