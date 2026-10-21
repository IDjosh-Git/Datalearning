# Clear, Natural Language Update

This release refines the learner and administrator interface so people see clear instructions and useful feedback rather than technical service names or setup instructions.

## Updated areas
- Sign-in, registration, account recovery and account security messages
- Learner dashboard, account and progress-saving indicators
- Course and introductory lesson progress indicators
- Capstone submission help, assessment results and instructor reporting errors
- Administrator overview, private learner-record notices and assessment desk
- Certificate verification and account/progress check pages
- Public README and getting-started instructions

## Communication principles
- Say what happened, what it means and what someone can do next.
- Explain where progress is saved without describing the underlying services.
- Keep sign-in and assessment errors approachable, without showing raw connection or database errors to learners.
- Keep technical identifiers, scripts and maintenance references in the application's implementation. They must not be removed because the website depends on them.
- Keep the names of Excel, SQL, Power BI and AI tools in the courses because they are the subjects being taught.

## Deployment
Deploy the complete site package as one release. Account roles, private learner records, progress, quizzes and assessment behavior remain connected to the existing infrastructure; no database migration was required for this copy update.

The `TECHNICAL_SETUP_REFERENCE.md` file is intended for the person maintaining the website and is **not** a page for learners.

## Verification
Run `node --test tests/*.mjs` and `node --check assets/<file>.js` for modified scripts. A dedicated `tests/public-copy.mjs` check verifies that user-facing HTML text has no database or hosting brand labels.
