# DataLearning — Master Documentation

> Consolidated from Release 10. This document preserves the complete source text of the original project and technical documentation, organised by source file. Learner-facing downloads and test-required technical files remain in their original locations.

## Contents

### Project overview and release documentation
- [AI_ASSESSMENT_DEPLOYMENT_NOTES.md](#source-ai-assessment-deployment-notes-md)
- [AI_ASSESSMENT_SETUP.md](#source-ai-assessment-setup-md)
- [AI_COURSE_IMPLEMENTATION_NOTES.md](#source-ai-course-implementation-notes-md)
- [AI_HISTORY_STREAMING_RELEASE.md](#source-ai-history-streaming-release-md)
- [ASSESSMENT_TEST_MODE.md](#source-assessment-test-mode-md)
- [AUTOMATION_AND_RELEASE.md](#source-automation-and-release-md)
- [CAPSTONE_ALIGNMENT_README.md](#source-capstone-alignment-readme-md)
- [CAPSTONE_DATASETS_AND_AI_RELEASE.md](#source-capstone-datasets-and-ai-release-md)
- [CAPSTONE_SESSION_FIX.md](#source-capstone-session-fix-md)
- [CAREER_ROADMAP_RELEASE_NOTES.md](#source-career-roadmap-release-notes-md)
- [CLEANUP_AUDIT.md](#source-cleanup-audit-md)
- [CLOUD_ENROLMENT_RELEASE.md](#source-cloud-enrolment-release-md)
- [CLOUD_FIRST_VERIFICATION.md](#source-cloud-first-verification-md)
- [CONTENT_CONFIRMATION_CHECKLIST.md](#source-content-confirmation-checklist-md)
- [DEPLOYMENT_RELEASE_NOTES.md](#source-deployment-release-notes-md)
- [FLOATING_ACTIONS_RELEASE_7.md](#source-floating-actions-release-7-md)
- [FLOATING_AI_RELEASE.md](#source-floating-ai-release-md)
- [IMPLEMENTATION_STATUS_20261121.md](#source-implementation-status-20261121-md)
- [MY_LEARNING_IMPLEMENTATION.md](#source-my-learning-implementation-md)
- [OFFLINE_DRAFT_RECOVERY_RELEASE.md](#source-offline-draft-recovery-release-md)
- [PHASES_1_TO_5_RELEASE_STATUS.md](#source-phases-1-to-5-release-status-md)
- [PROGRESS_REPAIR_AND_CLEANUP.md](#source-progress-repair-and-cleanup-md)
- [README.md](#source-readme-md)
- [REFERENCE_FAILURE_RESOLUTION.md](#source-reference-failure-resolution-md)
- [REFERENCE_LAB_IMPLEMENTATION_NOTES.md](#source-reference-lab-implementation-notes-md)
- [REFERENCE_RUNTIME_AUDIT.md](#source-reference-runtime-audit-md)
- [REFERENCE_VALIDATION_STATUS.md](#source-reference-validation-status-md)
- [RELEASE_10_GROUPED_NAVIGATION.md](#source-release-10-grouped-navigation-md)
- [RELEASE_6_REMAINING_RECOMMENDATIONS.md](#source-release-6-remaining-recommendations-md)
- [RELEASE_8_NAVIGATION.md](#source-release-8-navigation-md)
- [RELEASE_9_PREMIUM_NAVIGATION.md](#source-release-9-premium-navigation-md)
- [STUDIO_RETIREMENT_AND_SCROLL_NOTES.md](#source-studio-retirement-and-scroll-notes-md)
- [STUDIO_RETIREMENT_TEST_UPDATE.md](#source-studio-retirement-test-update-md)
- [UI_REFINEMENT_20261121.md](#source-ui-refinement-20261121-md)
- [VERCEL_PREDEPLOY_VERIFICATION_2026-11-22.md](#source-vercel-predeploy-verification-2026-11-22-md)
- [WEEK_COMPLETION_IMPLEMENTATION.md](#source-week-completion-implementation-md)
- [WORKSPACE_CONFLICT_RELEASE.md](#source-workspace-conflict-release-md)

### Technical architecture, design and implementation notes
- [docs/ADMIN_LEARNERS_HEADER_CANVAS_20261112.md](#source-docs-admin-learners-header-canvas-20261112-md)
- [docs/ADMIN_NAV_CONTRAST_FIX_20261113.md](#source-docs-admin-nav-contrast-fix-20261113-md)
- [docs/ADMIN_UNIFIED_LEARNER_PROGRESS_20261112.md](#source-docs-admin-unified-learner-progress-20261112-md)
- [docs/AI_RESPONSE_PREMIUM_FORMATTING_20261111.md](#source-docs-ai-response-premium-formatting-20261111-md)
- [docs/BURNT_WOOD_ADMIN_NAV_REFINEMENT_20261113.md](#source-docs-burnt-wood-admin-nav-refinement-20261113-md)
- [docs/BURNT_WOOD_COMPLETE_COLOR_AUDIT_20261113.md](#source-docs-burnt-wood-complete-color-audit-20261113-md)
- [docs/BURNT_WOOD_CSS_REFACTOR_20261113.md](#source-docs-burnt-wood-css-refactor-20261113-md)
- [docs/BURNT_WOOD_RGB_REAUDIT_20261113.md](#source-docs-burnt-wood-rgb-reaudit-20261113-md)
- [docs/BURNT_WOOD_SIGNIN_ADMIN_SNAPSHOT_FIX_20261113.md](#source-docs-burnt-wood-signin-admin-snapshot-fix-20261113-md)
- [docs/BURNT_WOOD_THEME_20261113.md](#source-docs-burnt-wood-theme-20261113-md)
- [docs/CLOUD_STUDY_AND_PYTHON_EXECUTION.md](#source-docs-cloud-study-and-python-execution-md)
- [docs/CONCEPT_DIAGRAMS_RELEASE.md](#source-docs-concept-diagrams-release-md)
- [docs/CONNECTED_LEARNING_JOURNEY_RELEASE.md](#source-docs-connected-learning-journey-release-md)
- [docs/COURSE_REPETITION_AUDIT_20261111.md](#source-docs-course-repetition-audit-20261111-md)
- [docs/EDUCATOR_CURRICULUM_20261113.md](#source-docs-educator-curriculum-20261113-md)
- [docs/FOUNDATIONAL_TEACHING_FLOW_UPGRADE.md](#source-docs-foundational-teaching-flow-upgrade-md)
- [docs/ICON_SYSTEM.md](#source-docs-icon-system-md)
- [docs/ICON_VISUAL_AUDIT_20261121.md](#source-docs-icon-visual-audit-20261121-md)
- [docs/LEAN_APP_CLEANUP_TUTOR_20261111.md](#source-docs-lean-app-cleanup-tutor-20261111-md)
- [docs/MASTER_FOUR_LEVEL_CURRICULUM_20261110.md](#source-docs-master-four-level-curriculum-20261110-md)
- [docs/PALETTE_PREMIUM_20261113.md](#source-docs-palette-premium-20261113-md)
- [docs/PROJECT_FILE_MAP.md](#source-docs-project-file-map-md)
- [docs/README.md](#source-docs-readme-md)
- [docs/REPOSITORY_CLEANUP_20261121.md](#source-docs-repository-cleanup-20261121-md)
- [docs/SEVEN_STAGE_PEDAGOGY_RELEASE.md](#source-docs-seven-stage-pedagogy-release-md)
- [docs/TEN_WEEK_TOOL_TO_REPORT_LEARNING_20261111.md](#source-docs-ten-week-tool-to-report-learning-20261111-md)
- [docs/THEME_RELEASE_20261113.md](#source-docs-theme-release-20261113-md)
- [docs/TOPIC_ALIGNED_WEEKLY_VISUALS_20261113.md](#source-docs-topic-aligned-weekly-visuals-20261113-md)
- [docs/WEEKLY_PRACTICE_VIDEO_EDUCATOR_RELEASE_20261110.md](#source-docs-weekly-practice-video-educator-release-20261110-md)

---

## Project overview and release documentation

<a id="source-ai-assessment-deployment-notes-md"></a>
### Source: `AI_ASSESSMENT_DEPLOYMENT_NOTES.md`

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

---

<a id="source-ai-assessment-setup-md"></a>
### Source: `AI_ASSESSMENT_SETUP.md`

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

---

<a id="source-ai-course-implementation-notes-md"></a>
### Source: `AI_COURSE_IMPLEMENTATION_NOTES.md`

# AI for Data Analysis — course implementation

Updated ten native Academy weekly records, their assessment questions, tool-to-report topic guides, educator-depth explanations, and ten downloadable weekly worksheets.

The course now covers AI fundamentals, prompting, Excel, SQL, Power BI/DAX, Python, quality assurance, storytelling, governance, and a verified capstone. Exercises require reproducible checks and evidence, not merely prompts.

Existing Prompt Library, AI Tutor, Practice Arena, capstone links, and Week 10 Advanced Learning Library navigation are retained. The redundant career-path link was removed from the static AI course support panel.

Limitations: Existing legacy cross-cutting course resources and assessment banks may still reference earlier weekly themes. No live browser, LMS persistence, or end-to-end performance test was performed. This package has not been deployed.

---

<a id="source-ai-history-streaming-release-md"></a>
### Source: `AI_HISTORY_STREAMING_RELEASE.md`

# AI account history and response streaming

## Implemented
- `api/ai-history.js`: authenticated GET/PUT/DELETE for an account-owned conversation, using the existing HttpOnly session cookie and user-scoped Supabase REST requests. No service-role key or browser localStorage history.
- `database/migrations/20261121_ai_account_history.sql`: `ai_conversation_history` with owner-only RLS SELECT/INSERT/UPDATE/DELETE policies; applied to the configured Supabase project on 2026-11-21 and verified RLS and four policies.
- `api/tutor.js`: opt-in `stream:true` server-sent event output, with OpenAI Responses streaming and Groq chat-completion streaming. Existing JSON API remains supported.
- `assets/scripts/floating-learning-ai.js`: progressively rendered live answers, account history restoration, new-conversation deletion, and persistence after completed responses.
- `assets/scripts/tutor-ai.js`: progressively rendered live answers and shared account history restoration/persistence.

## Verification and limitations
- `npm run verify:deployment`: passed locally after changes.
- Syntax checks: passed.
- Supabase table and RLS policies: confirmed live.
- No live provider token was exercised, so actual Groq/OpenAI streaming and browser session behavior require a Vercel preview smoke test.
- One recent conversation (up to 40 messages) is saved per account and shared by Floating AI and Tutor Studio. This is not a multi-thread conversation browser.
- History is only saved after a complete AI answer. Stopped or interrupted responses are not persisted.
- New Conversation clears the account transcript for both interfaces; offline study-guide answers are not saved.
- Provider streaming must be supported by the configured provider/model.

---

<a id="source-assessment-test-mode-md"></a>
### Source: `ASSESSMENT_TEST_MODE.md`

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

---

<a id="source-automation-and-release-md"></a>
### Source: `AUTOMATION_AND_RELEASE.md`

# DataLearning automated quality gate

The GitHub Actions workflow `.github/workflows/quality-gate.yml` runs on pushes to main/master, pull requests, manual dispatch, and every Monday at 06:00 UTC. It installs the two pinned runtime dependencies, runs `npm run verify:deployment`, and checks published course routes and retired-page exclusions.

## Deployment recommendation

Connect the repository to Vercel. Require the `Build, tests and published-route audit` GitHub status check before merging into the production branch. Vercel should deploy only after changes pass review. The workflow does not deploy, access production credentials, or modify learner data.

## Limitations and owner checks

- The source currently has no package-lock.json. CI uses `npm install` rather than `npm ci`; generate and commit a lockfile in an environment with npm registry access to enable reproducible installs.
- The tests are largely source-level and mocked; they do not validate live Supabase credentials, RLS policies, real email verification, external AI providers, or browser layout.
- Test learner/admin sign-in, progress syncing, course downloads, mobile layout, keyboard interaction and deployment environment variables in a staging environment.
- Scheduled GitHub Actions runs depend on the repository being hosted on GitHub and Actions being enabled.
- A green check is not a guarantee of zero production errors. Configure Vercel runtime error alerts and review logs after deployment.

---

<a id="source-capstone-alignment-readme-md"></a>
### Source: `CAPSTONE_ALIGNMENT_README.md`

# Week 10 capstone / Assessment Desk alignment

Nine versioned project briefs are stored in `assets/scripts/capstone-briefs.js` and shown on Week 10 lessons and the existing Assessment Desk. They use the live five-part 25/20/20/20/15 rubric and existing 70/100 passing threshold. No certificate or grading backend was modified.

The sample dataset specifications are requirements, not claims that matching datasets are bundled. Existing weekly downloads remain available. A complete course-specific project dataset pack and secure automated AI grading are separate implementation phases.

The existing Assessment Desk is instructor-reviewed and certificates are only released by its current approved-review workflow.

---

<a id="source-capstone-datasets-and-ai-release-md"></a>
### Source: `CAPSTONE_DATASETS_AND_AI_RELEASE.md`

# Capstone dataset pack release

Nine deterministic, synthetic course-specific ZIPs are now in `downloads/capstone-packs/`. The same project briefs power Week 10 and the Assessment Desk; learners can download datasets directly from the Assessment Desk.

## AI grading and certification: not yet activated

This package does **not** claim production AI grading or auto-issue certificates. The current Supabase Assessment Desk uses instructor review and issues certificates only on approved review. Secure automation requires deploying and validating a privileged backend worker, versioned rubrics, independent file parsers and technical tests, audit logs, an idempotent certificate issuer, and a fail-closed review queue. Never place a service-role key in browser code. Do not auto-approve screenshot-only technical evidence.

Recommended rollout: shadow-grade instructor-marked examples, evaluate agreement and failure modes, enable verified formats course by course, then enable automatic issuance only for independently validated submissions.

---

<a id="source-capstone-session-fix-md"></a>
### Source: `CAPSTONE_SESSION_FIX.md`

# Capstone Studio sign-in regression

Root cause: `supabase-client.js` configures Supabase with `persistSession:false` and restores the signed-in account asynchronously through `DALP_AUTH_RESTORE` using the secure hosting session cookie. `capstone.js` previously called `getSession()` immediately during page initialization, racing the restoration and falsely showing the sign-in prompt.

Fix: `refresh()` now awaits the existing `DALP_AUTH_RESTORE` promise before checking the session. The course/refresh race guard remains intact. No new authentication flow, second login, or insecure localStorage persistence was added.

Expected: a signed-in learner navigating from My Learning to Capstone Studio remains signed in and can submit once the ten completed weeks and submission status have been verified.

Checks: JavaScript syntax and ZIP integrity. Actual browser verification against the live secure cookie, Vercel deployment and capstone submission were not performed.

---

<a id="source-career-roadmap-release-notes-md"></a>
### Source: `CAREER_ROADMAP_RELEASE_NOTES.md`

# DataLearning career pathway integration (2026-11-21)

## Implemented
- First-time registration redirects to `career-setup.html` after a confirmed session, unless an explicit deep link or administrator destination takes precedence.
- Career setup offers four career tracks plus “Exploring Data Careers”, and an experience level.
- Choices are saved in the authenticated user’s Supabase Auth `user_metadata` using `auth.updateUser`, with no new database migration.
- My Learning renders the recommended sequence from the existing nine guided courses and links directly to them; electives remain accessible.
- Existing course progress, capstone grades and certificates are not overwritten or converted to career-level certifications.
- All nine course pages remain intact. Career selection is editable via `career-setup.html`.

## Verification and limitations
- JavaScript syntax, nine course routes and source integration checked.
- No production deployment or authenticated browser cross-device test performed.
- Course progress text is read from existing dashboard cards and may initially show Not started until dashboard data loads.
- `user_metadata` is user-editable; appropriate for preferences, **not** authoritative certification.
- Onboarding is triggered for first-time registration; older accounts are offered setup in My Learning rather than forced through onboarding.
- Experience level is saved but not yet used for proficiency placement or skipping course lessons.
- Career path completion/certification is deliberately not awarded.

---

<a id="source-cleanup-audit-md"></a>
### Source: `CLEANUP_AUDIT.md`

# Cleanup audit — 14 November 2026

## Removed from the deployable site
- Retired standalone pages: `catalog.html`, `overview.html`, `progress.html` (existing redirects retained).
- Obsolete admin-progress script and stylesheet: `assets/scripts/progress-admin.js`, `assets/styles/progress.css`.
- Tests, database scripts, documentation, server-only libraries, and development tooling are not copied to the static `dist` directory.

## Corrections
- Public footer My progress now points directly to `account.html#course-progress-heading` rather than a retired page.
- Header `/overview` alias now resolves to the current dashboard.
- Dashboard labels Python and AI as standard courses, removing the misleading legacy separator and styling classes.

## Retained intentionally
- The retired HTML source files remain in the developer archive because existing regression tests inspect their compatibility behavior. They are NOT deployed.
- `preview.html`, `questions.html`, course content, downloads and shared assets are retained because their runtime or curriculum roles have not been proven redundant.
- Server-side code, middleware and configuration are retained in the source archive; the static deployment ZIP is not a replacement for the complete Vercel source deployment.

## Verification
- `npm test`: passed
- `npm run lint`: passed
- `node tests/clean-deployment.mjs`: passed; 2,710 published local resource references resolve.
- No authenticated live browser session or end-to-end Vercel deployment was performed.

---

<a id="source-cloud-enrolment-release-md"></a>
### Source: `CLOUD_ENROLMENT_RELEASE.md`

# Cloud-only course enrolment update

- Supabase Auth user metadata remains the canonical store for career goal and experience level. The browser does not store career preferences.
- New `course_enrollments` table stores explicitly started courses with user-scoped RLS.
- The nine Academy courses remain discoverable. Opening a course offers **Start studying this course**; only then is it shown under My Courses.
- My Learning now displays only enrolled course cards, and dashboard completion percentages are calculated across enrolled courses.
- Career recommendations do **not** automatically enrol a learner.
- Apply `migrations/20261121_course_enrollments.sql` before deploying the frontend.
- IMPORTANT: This release does not eliminate the existing platform-wide local progress caches in `progress-cloud.js`, practice storage, and Supabase Auth session storage. Removing those safely requires a separate end-to-end refactor and online-only policy. Course enrolments and career preferences introduced here are cloud-authoritative.
- Test with two real authenticated browsers before production deployment.

---

<a id="source-cloud-first-verification-md"></a>
### Source: `CLOUD_FIRST_VERIFICATION.md`

# Cloud-first status (2026-11-21)

Supabase: `course_enrollments`, `course_progress`, `practice_progress`, and `learner_workspace_state` are present. My Learning filters course cards to explicit enrolments. Career preferences use Supabase Auth user metadata. Browser storage is used by Supabase Auth for session persistence; `DALP_STORAGE` is an in-memory adapter backed by `learner_workspace_state` for many app-specific states.

Updated `assets/scripts/practice-cloud.js` to hydrate cloud workspace first, merge existing practice records, refresh remote progress before an upsert, and retry failures. This is not a transactional conflict-resolution guarantee; simultaneous edits on two devices can still race. Authenticated end-to-end tests on two devices have not been completed.

Important limitations: Some course and practice UI code still stages changes in RAM and uses the existing cloud adapters; a network failure can lose unsaved changes when a tab closes. Existing legacy browser data is read once for migration and removed after successful upload. Supabase Auth may retain session tokens in browser storage. No production deployment was performed.

Release gate: test first registration, career choice persistence, starting a course, My Learning only showing enrolled courses, weekly progress, SQL/Excel/Python practice on two browsers, sign-out and account switching, network failure and recovery, and capstone revision. Check browser Storage tab for remaining application-owned persistent keys after legacy migration.

---

<a id="source-content-confirmation-checklist-md"></a>
### Source: `CONTENT_CONFIRMATION_CHECKLIST.md`

# DataLearning owner confirmation checklist — 13 November 2026

Verified in source: nine unique courses; ten weekly curriculum modules per course; weekly self-check questions in the curriculum data. Public route `/courses` and nine extensionless `/courses/:slug` syllabus routes are deliberately distinct from authenticated `/courses/:slug.html` interactive lessons.

Confirm before publishing any unverified promises:
- Course level and prerequisites for the eight courses beyond the beginner starting path.
- Actual elapsed duration, hours per week, lesson/session counts, delivery format, and last-updated dates for each course.
- Required operating systems, software editions, license costs, accessible alternatives, and device/browser support for each tool.
- Whether course-specific capstones have published deliverables, rubrics, reviewer identity, pass marks, and submission steps.
- Whether the separate mastery assessments count toward course completion; retries, feedback, saved-progress and sync behavior for anonymous vs signed-in learners.
- Certificate eligibility, instructor assessment conditions, issuer, and any independently verified accreditation (none claimed in public syllabus).
- Validate actual resource/download links, quiz feedback and capstone submissions with a test learner account in staging.

Note: The public syllabus exposes existing example, exercise, solution and pitfall content from the source data, with solutions inside collapsed disclosure panels. No new lesson titles or assessment items were invented.

---

<a id="source-deployment-release-notes-md"></a>
### Source: `DEPLOYMENT_RELEASE_NOTES.md`

# DataLearning deployment verification — 21 November 2026

## Verified
`npm run verify:deployment` exited successfully (0), including build, lint, Academy, security, Practice Arena, AI Tutor and cloud/media test suites. See `DEPLOYMENT_TEST_LOG.txt`.

## Changes
- Reconciled Advanced Learning Library regression expectations with the current specialist-library design.
- Restored five distinct weekly AI assessment questions for each of ten weeks.
- Aligned AI titles, learning outcomes, masterclass tasks and weekly worksheets without removing long-form instructional material.
- Updated navigation regression expectations for the deliberate removal of duplicate career links.
- Removed palette-audit violations and made the shared premium colour stylesheet the last stylesheet on all 38 relevant pages.
- Preserved Capstone Studio session-restoration fix, Reference Lab, cloud bookmarks and the weekly 80% completion flow.

## Repository / Vercel
The ZIP contains `package.json` and `vercel.json` at the archive root. Extract its contents directly into the root of the deployment repository (not into an additional `learning_mobile_fixed` directory), or configure Vercel's Root Directory to match the extracted subdirectory. The build generates `dist/`.

## Limitations
This is a local production build verification, not a successful Vercel preview or production deployment. Runtime environment variables, hosted API endpoints, signed-in capstone submission, Supabase authentication, and Vercel's actual GitHub checkout remain to be verified in a preview deployment.

---

<a id="source-floating-actions-release-7-md"></a>
### Source: `FLOATING_ACTIONS_RELEASE_7.md`

# Release 7 floating actions

Study Pulse is aligned above Learning AI on the right. On mobile both controls are raised above bottom navigation. Opening either panel hides the other launcher. No application APIs changed.

Validation: `node tests/floating-actions-layout.mjs` and `npm run build` passed. Browser and live Vercel deployment not tested.

---

<a id="source-floating-ai-release-md"></a>
### Source: `FLOATING_AI_RELEASE.md`

# Floating Learning AI — interface and pedagogy update

Implemented: desktop default 440×620 px and expandable 720×800 px (viewport constrained); edge-to-edge square-corner fullscreen mobile panel; contextual topic detection from course route and optional week in heading/query; topic-specific suggestion chips; learning modes (Hint, Explain, Worked Example, Check My Answer); copy assistant responses; Stop Generating for live requests; Retry Last Question; New Conversation; horizontal overflow protection for code/tables; links to the existing full Tutor Studio.

Live mode sends the selected learning mode and detected topic to the existing authenticated `/api/tutor` endpoint. Study Guide mode uses the existing offline learning library, with hints avoiding complete examples. No new API keys or external services were introduced.

Not implemented: cross-page/account-linked conversation history, as that requires a dedicated secure cloud persistence design; server-side streaming tokens; automated browser E2E testing of signed-in provider responses. Tutor Studio remains the dedicated full workspace, and is not duplicated by the floating panel.

Validation: `npm run verify:deployment` exit code 0; JS syntax check passed. Not deployed to Vercel.

---

<a id="source-implementation-status-20261121-md"></a>
### Source: `IMPLEMENTATION_STATUS_20261121.md`

# DataLearning Practice + Capstone follow-up

## Implemented in source (not deployed)
- Adds a Practice Arena entry inside each of the ten weeks of SQL, Excel and Python course pages (30 entry points).
- Keeps existing verified direct challenge mappings. For other weeks, links to the appropriate subject catalogue with a week/lesson hint; these are NOT asserted to be verified exact curriculum matches.
- Displays local practice attempts/passed status beside verified lesson links.
- Adds a learner-facing capstone attempt history and explicit revision guidance; latest submission remains current.
- Adds a database migration to serialize capstone submissions per learner/course, prevent new attempts while assessment is pending or after certification, and permit another attempt only when latest status is `needs_revision`.

## Important limitations / required next work
- Apply `database/migrations/20261121_capstone_resubmission_guard.sql` to Supabase before publishing the new capstone flow. Migration has NOT been applied to production.
- The existing partial index is changed to cover `needs_manual_review`; inspect production indexes/triggers before migration.
- Practice progress is still device-local, NOT synced to Supabase or My Learning. Do not describe it as account-level tracking.
- Exact challenge-to-week mapping has not been verified for all 30 weeks. Only existing curated direct mappings are used.
- No production browser-based end-to-end test or Vercel deployment was performed.
- Existing AI grading rule has a 14/20 technical minimum whereas manual grading may use only overall 70; align policy separately.

---

<a id="source-my-learning-implementation-md"></a>
### Source: `MY_LEARNING_IMPLEMENTATION.md`

# My Learning implementation

- Renamed the learner-facing Learning Dashboard to **My Learning** across source HTML, including desktop/mobile navigation and accessible labels.
- Kept `account.html`, existing authentication, queries, course progress, capstone submission records and certificate links intact.
- Added learner-focused section navigation: Overview, My Courses, Assessments, Certificates, Learning Activity.
- Updated capstone completion guidance to reflect AI grading with instructor fallback.
- No admin Assessment Desk, database or certificate eligibility rules were changed.
- No production deployment performed by this package.

---

<a id="source-offline-draft-recovery-release-md"></a>
### Source: `OFFLINE_DRAFT_RECOVERY_RELEASE.md`

# Cloud-first, offline-resilient drafts

Implemented in `assets/scripts/cloud-workspace.js`:
- IndexedDB (`dalp-pending-drafts-v1`) stores **only pending, unconfirmed workspace edits**, scoped by authenticated Supabase user ID.
- Pending edits are restored before fetching cloud workspace state; a pending edit retains its original revision for optimistic concurrency control.
- Cloud writes use the existing `save_workspace_cas` RPC. Confirmed edits are removed from IndexedDB. Conflicting edits are not silently overwritten; the learner chooses cloud or device version.
- Connection recovery and tab focus trigger cloud hydration and retry. A save indicator displays `Saved to cloud`, `Saved on this device`, `Synchronising`, or `Action required`.
- Existing assessment/grading and official course-progress logic remain server-side; this patch does not introduce offline submission.

## Important limits
- Offline recovery requires IndexedDB availability and sufficient quota. If blocked, status displays `Unsaved: device storage unavailable`.
- Drafts remain on a device until confirmed uploaded; they are not accessible on a different device while offline.
- This package is **not deployed**. Real two-device, offline close/reopen, account-switching, conflict-dialog and browser storage tests are required before production sign-off.
- This patch covers workspace state via `DALP_STORAGE`, not every standalone learning-progress adapter. No claim of full offline recovery for course progress or submissions.
- Browser-stored drafts are accessible to scripts running on the same origin; consider encrypted-at-rest recovery and retention policies before handling sensitive learner content.

---

<a id="source-phases-1-to-5-release-status-md"></a>
### Source: `PHASES_1_TO_5_RELEASE_STATUS.md`

# DataLearning — phases 1–5 implementation and verification (22 Nov 2026)

This release is an incremental stability and UX update, not a claim that every roadmap objective has been completed.

## Implemented in this package
- Learner notification feedback now exposes accessible `status` / `alert` semantics and keeps routine messages inline in the Reference and Prompt Libraries. Critical failures remain visible.
- Notification presentation supports reduced-motion preferences.
- Confirmed signed-in Academy course search navigation uses the protected course discovery anchor, not the public catalogue. Preserved all nine course cards and public catalogue search/filter behaviour.
- Added an automated cross-feature journey regression test and a `npm run test:journey` command.
- Retained existing authentication and role controls, course progress, assessments, mobile layouts, admin tools and production build pipeline.

## Verified locally
- `npm run verify:deployment` — passed (build, lint, Academy, security, practice, tutor and cloud media suites).
- `npm run test:journey` — passed.
- Deployment ZIP integrity — checked.

## Still to implement or validate before claiming roadmap completion
- A platform-wide notification refactor across all learning workspaces (current policy is targeted to the two libraries).
- Dashboard information architecture and complete mobile usability review with real devices.
- End-to-end browser tests for sign-in, enrolment, cross-device progress, assessments and certificate issuance against a staging Supabase project.
- Admin activity/event monitoring and real performance measurements (Core Web Vitals, payload budgets).
- Live deployment and production smoke tests.

No live environment was changed by this package. `dist/` is generated by the build and intentionally excluded from the lean source archive.

---

<a id="source-progress-repair-and-cleanup-md"></a>
### Source: `PROGRESS_REPAIR_AND_CLEANUP.md`

# Progress repair and deployment cleanup — 14 November 2026

The connected DataLearning database was inspected read-only. It contains 38 completed week records across Excel, Introduction and Power BI, all within their valid week ranges. Ownership-based SELECT/INSERT/UPDATE policies exist, and the database health check returned no notices. No learner records, policies or schema were changed.

## Repairs

- Course progress waits for the shared verified sign-in restoration before looking up a user. Previously an early lookup could return no user and leave the page at its initial zero state.
- A stale cloud read cannot overwrite a newer completion click. Newer edits and pending writes are merged before progress is displayed.
- Failed completion writes now say they have not reached the account and offer retry. The old “saved locally” wording was inaccurate because the app uses transient memory rather than persistent browser progress storage.
- The dashboard counts all nine courses and 90 weeks, including Python and AI. Its obsolete seven-course denominator and separate persistent progress snapshot were removed.
- Progress refreshes on returning to the dashboard, restoring a page, reconnecting or selecting Refresh progress. Read failures display an unavailable state instead of presenting initial zero figures as verified progress.

## Consolidation

Signed-in Progress navigation leads to `account.html#course-progress-heading`. The separate learner overview, duplicate catalogue and old administrator progress report are excluded from the published static output. Existing URLs redirect as follows:

| Old URL | Maintained destination |
| --- | --- |
| `/overview.html`, `/overview` | `/account.html#course-progress-heading` |
| `/catalog.html` | `/index.html#zaDiscoverCards` |
| `/progress.html` | `/admin.html#admin-learners` |

The source copies remain only to support existing regression checks and compatibility auditing; they are not deployed as active pages. The retired administrator progress script and stylesheet are also excluded from deployment. The build creates a clean `dist` directory containing maintained static runtime files. Development tests, historical reports, database scripts and source helpers are not published as static files. Server functions and routing middleware retain their normal Vercel source locations.

Obsolete root release and audit reports were archived outside this package to remove contradictory deployment notes. The README points to this release's setup and progress behaviour.

## Verification

New runtime tests cover delayed authentication, saved progress after a fresh page load, learner isolation, failed-write retry, stale-read races and preservation of loaded progress after read failure. Dashboard tests execute the actual rendering functions and verify Python/AI counts, the 90-week denominator, duplicate-row resolution and invalid-week rejection. The clean-deployment test checks 2,764 published resource references and verifies retired pages and development files are excluded.

`npm run verify:deployment` passed after these changes: build, lint, academy, security, practice, Tutor and cloud/media suites. Final targeted progress, dashboard syntax/rendering and clean-output checks also passed.

Automated verification uses simulated accounts and service failures. The production database was checked read-only; a real learner's completion was not changed. No browser-based sign-in or production deployment was performed in this update. Work that never reached the database cannot be reconstructed automatically.

## Deployment

Use the enclosed `datalearning` directory as the Vercel project root. Keep `vercel.json`, `middleware.js`, `api` and `lib`, and retain existing environment variables. The build command remains `npm run build`; the output directory is now **dist**. If the Vercel dashboard has an Output Directory override, set it to **dist** or disable that override so `vercel.json` applies. Deploy this release as one complete package.

## Sign-out destination
All app sign-out controls now return to the public homepage at /. This also applies to sign-out events on nested course pages. Unauthenticated attempts to open protected pages still go to sign-in with their requested destination preserved. Targeted runtime authentication, shared sign-out, middleware and clean-deployment checks passed for this update.

---

<a id="source-readme-md"></a>
### Source: `README.md`

# DataLearning — maintained source package

This ZIP contains the authoritative application source, course materials, tests and build scripts. The generated `dist/` directory is intentionally omitted. Run `npm run build` to recreate it for deployment. Do not edit generated output.

**Documentation index:** [docs/README.md](docs/README.md) · **Cleanup record:** [docs/REPOSITORY_CLEANUP_20261121.md](docs/REPOSITORY_CLEANUP_20261121.md) · **Duplicate audit:** `npm run audit:repository`.

**Release note:** Offline draft recovery and workspace conflict handling are included in source. Full authenticated cross-device/browser verification and production deployment are not claimed.

---

> Current release — 14 November 2026: use `npm run build` and publish `dist` on Vercel. The build generates this clean folder. Keep `api`, `lib`, `middleware.js` and `vercel.json` at the source root for server functionality. Learner progress is in `account.html`; old overview/catalogue/admin progress URLs redirect to maintained pages. Read `PROGRESS_REPAIR_AND_CLEANUP.md` for current deployment and verification details. Earlier release notes have been archived outside this package.
> **Latest release (13 November 2026):** All 90 weekly lessons now include course-specific beginner-to-advanced instruction and verifiable practice. Python and AI share the exact same lesson structure as the other seven courses, and unused specialist styles have been retired. See `docs/EDUCATOR_CURRICULUM_20261113.md`. Source ZIP only; redeployment required.

> **Previous release (12 November 2026):** Search and Sign Out now use a shared premium header style across public and private app pages, including a signed-in account card in the public mobile drawer. The learner directory remains restricted to verified DataLearning activity and administrators, rather than every shared Supabase Auth account. The admin dashboard uses the same source-of-truth directory. App-wide sign-in remains mandatory. Learners do not see administrator navigation and cannot access admin-only pages; the server verifies the `site_admins` role. Styles have been audited and route-scoped, unnecessary Practice Studio CSS loads removed, and repeated declarations consolidated. See `CURRENT_RELEASE.md` and `docs/STYLE_CLEANUP_AUDIT_20261111.json`. This ZIP has not been deployed.

# DataLearning — current application (11 November 2026)

DataLearning is a responsive analytics learning app with **nine 10-week learning courses**: Data Analysis Foundations, Excel, SQL, Power BI, Tableau, Power Query, Applied Statistics, Python for Data Analysis, and AI for Data Analysis. It also includes a separate four-level [Career Path](career-path.html) with 31 specialist modules.

**Learner workflow:** [Course Library](catalog.html) → choose a tool → follow Weeks 1–10, worked examples, downloadable synthetic datasets, practice worksheets and in-app YouTube links → dashboard/report or equivalent analytical project → Week 10 [Capstone](capstone.html) submission and instructor review. Real YouTube playback requires the publisher to permit embedding and network access.

## Main routes

- `index.html` / `catalog.html` / `career-path.html`: discover courses, pick a pathway and plan a career.
- `courses/<slug>.html`: nine guided course readers; `courses/python-*.html` and `courses/ai-*.html` are still-linked supplementary course guides.
- `practice.html` / `studio.html` / `learning-lab.html`: Excel/SQL/Python editor challenges, skill drills and learning review.
- `prompt-library.html` / `reference.html`: prompts and analytics reference content.
- `tutor.html`: offline knowledge tutor or optional authenticated live AI. Both include curated, public app help for courses, week selection, resources, practice, capstone requirements and more.
- `auth.html` / `account.html` / `capstone.html` / `certificate.html`: protected learner workflows.
- `admin.html`, `progress.html`, `reviewer.html`: protected administrative workflows; `connection-test.html` and `sync-test.html` are diagnostics.

## Deployment and tests

Use Node.js 24 (`.nvmrc`). Run `npm install` followed by `npm run verify:deployment`. Extract this ZIP and deploy the **contents** of the `datalearning/` folder to your repository root. `vercel.json`, `middleware.js`, `api/`, `lib/` and the existing Supabase setup must remain in place. Configure live Tutor provider credentials **only** in Vercel server environment variables (`OPENAI_API_KEY` or `GROQ_API_KEY`; optional `TUTOR_PROVIDER`). Without them, offline app help and reference tutoring remain available.

**Safety and release bounds:** This package does not change or migrate Supabase records, grade projects automatically, or retrain a model. Live AI receives relevant *verified public application guidance* through the server prompt; offline help uses the same curated source. Neither has access to private submissions or personal account data. Verify live authenticated flows and actual video playback on a deployed preview.

See [release notes](CURRENT_RELEASE.md), [the active file map](docs/PROJECT_FILE_MAP.md), and [the cleanup and Tutor audit](docs/LEAN_APP_CLEANUP_TUTOR_20261111.md).

### AI and Python courses: same native reader as all other courses

Python (`courses/python.html`) and AI (`courses/ai.html`) are now first-class Academy routes using `assets/scripts/academy-app.js` and the same lesson structure/styles as the other seven courses. The previous standalone AI/Python lesson page markup, legacy sidebar controllers and course-only CSS have been removed. `assets/scripts/specialist-course-data.js` provides current week metadata and preserves the original 80 quiz questions; the masterclass renderer supplies deeper explanations and the Week 10 capstone. The original progress keys, Supabase course slugs, media, Prompt Library and capstone routes remain intact. The roadmap and extension pages are optional supplemental resources, not alternate course screens.

### App-wide sign-in requirement (November 11, 2026)

All DataLearning routes, including `/`, the course catalog, Practice Arena, Tutor Studio, previews, course assets, lessons and downloads, are protected by Vercel middleware before any HTML is served. `/auth.html` and its minimal styles/scripts/icons plus the session exchange endpoint are the only public resources. Guests are redirected to sign-in, with the original in-app destination preserved in `?return=...`.

**Important:** Deploy this project to Vercel (or a host that enforces equivalent request-time middleware). Opening static files directly or hosting the ZIP on a static-only provider does **not** provide true access control. The same Supabase project manages learner and administrator identities. The server checks valid identity and enforces the existing administrator role restrictions. First-party HttpOnly cookies are required before entering; signing out clears them. Existing Row Level Security must remain enabled for learner data. Verify the redirect and protected asset tests on a deployed preview before releasing to learners.


### Verified DataLearning learner directory (11 November 2026)

`public.learner_profiles` now includes only learners who have a verified DataLearning app use/sign-in or recorded DataLearning-specific learning activity, plus users present in `public.site_admins`. The former Auth-wide profile trigger has been removed. `datalearning_private.learner_profiles_archive` preserves unverified profiles, without deleting shared Auth accounts or study records. The admin dashboard uses **exactly** the live directory table for its user count. New authenticated app visits are tracked through `record_datalearning_use` before the sign-in redirect; a DB trigger creates or restores the directory profile.

**Snapshot after reconciliation:** 3 evidenced learner profiles + 1 administrator. The operator reports expecting 4 learners; the remaining person's identity has not been independently established by app-specific records, so the application does not fabricate a fifth directory entry. That person will appear after a genuine DataLearning sign-in, without deleting or recreating their Supabase Auth account.

See `database/migrations/20261111_verified_datalearning_members_only.sql` (already applied). Do not reapply the older Auth-wide migration after it without the corrective migration.

---

<a id="source-reference-failure-resolution-md"></a>
### Source: `REFERENCE_FAILURE_RESOLUTION.md`

# SQL and Python failed example resolution

The 47 previously failing SQL and 7 Python examples were rerun using a richer, explicit synthetic fixture. The SQLite DATE_TRUNC function is a compatibility shim, **not PostgreSQL execution**. Python snippets were supplied the upstream lesson variables `orders`, `completed`, `customers`, `region_kpis` and appropriate packages.

Results: {'executed_sqlite_with_fixture': 47, 'executed_python_with_fixture': 7}.

Execution proves these snippets run in the stated fixtures, not that business logic is universally correct. DAX, M and Excel were not executed in this pass. The prior Supabase completion trigger remains active; no database change was needed in this pass.

---

<a id="source-reference-lab-implementation-notes-md"></a>
### Source: `REFERENCE_LAB_IMPLEMENTATION_NOTES.md`

# Reference Lab: individual worked-example coverage

All 639 reference records now include a workedExample with:
- a domain-specific synthetic setup,
- a title-specific task and expected behaviour,
- execution/inspection steps,
- independent verification guidance.

153 Excel SUMIFS/COUNTIFS/AVERAGEIFS/SUM entries have independently computed numeric results from synthetic rows. Other examples deliberately use **expected behaviour**, not fabricated numeric outputs, because they require running the original expression in Excel, SQL, DAX, M, or Python with compatible source tables and model context.

Important distinction: all entries now have a guided worked-example scaffold, but only the 153 deterministic Excel entries have computed numeric expected results. These are NOT all runtime-executed or individually validated examples. The existing cloud bookmarks, filters, search and practice links remain intact.

Tests: JavaScript syntax, record coverage, unique reference keys, ZIP integrity. Full browser/E2E testing and Vercel deployment remain outstanding.

---

<a id="source-reference-runtime-audit-md"></a>
### Source: `REFERENCE_RUNTIME_AUDIT.md`

# Runtime audit and database completion rule

## Actual runtime checks
- SQL: 80 snippets attempted with SQLite and a small synthetic orders/customers/products fixture. 33 executed successfully, 47 failed (primarily missing fixture fields or PostgreSQL-only SQL). These successes establish only execution in SQLite, not PostgreSQL correctness.
- Python: 18 snippets attempted in isolated subprocesses with pandas and a synthetic CSV. 11 executed successfully; 7 failed because of missing variables, fields, dependencies or other fixture requirements.
- DAX (78), Power Query (65), and Power Query M (18): no compatible runtime was available, so not executed or verified. The application explicitly labels them as not runtime-verified.
- Excel (380): numeric examples were previously calculated from synthetic inputs, but no Excel engine execution was performed in this pass.
- Full per-entry SQL/Python execution details are in `reference_execution_report.json`.

## Completion gate
- Connected Supabase project migration applied.
- Existing 38 completed rows snapshotted into a non-client-writable legacy table.
- Database trigger blocks new completion=true writes without an 80%+ quiz_results row, while preserving legacy completions.
- Negative test (new completion with no passing quiz) passed; post-migration completed count remained 38.
- **Security limitation:** Quiz results are written by clients. A malicious client can forge a passing quiz_results row, so this is not tamper-proof assessment enforcement. Fully trusted scoring requires server-graded assessments with protected answer keys and restricted quiz writes.
- No website deployment or browser end-to-end test performed.

---

<a id="source-reference-validation-status-md"></a>
### Source: `REFERENCE_VALIDATION_STATUS.md`

# Reference validation status

All 639 entries have guided worked-example scaffolds. Numerical outputs are only tagged as calculated synthetic examples where the stored expected field is numeric. No claims are made that SQL, DAX, Python, Power Query or all Excel examples have been executed.

Actual per-example execution requires suitable runtimes, original schema and test fixtures. This release adds explicit validation labels rather than presenting generic expected behaviour as a verified result.

---

<a id="source-release-10-grouped-navigation-md"></a>
### Source: `RELEASE_10_GROUPED_NAVIGATION.md`

# Release 10 — Premium grouped navigation

Based on Release 9. Five primary navigation links remain direct links. Each has a separate keyboard-accessible dropdown toggle and grouped secondary destinations. Mobile drawer uses five expandable groups with the same destinations, including nine course paths. Learning Coach, Prompt Library, Reference Lab, Learning Lab, Practice Arena, Question Bank, Quizzes, Capstones, Certificates and Career Roadmap remain discoverable.

Coverage: 28 shared-header pages including course pages. Existing private/admin navigation remains untouched. Release 10 assets: `assets/styles/release-10-navigation.css`, `assets/scripts/release-10-navigation.js`. Regression test: `tests/release-10-navigation.mjs`. Existing signed-in navigation regression updated to verify five top-level links and groups.

Validation: `npm run verify:deployment` passed under local Node 22. Application declares Node 24 for Vercel. Browser device testing and staging deployment are not performed.

---

<a id="source-release-6-remaining-recommendations-md"></a>
### Source: `RELEASE_6_REMAINING_RECOMMENDATIONS.md`

# Release 6 — incremental quality hardening

Implemented:
- Narrow-screen dashboard overflow safeguards, scoped to the learner dashboard.
- Automated release asset audit (`npm run audit:quality`) checking viewport configuration and missing local JS/CSS references for key entry pages.
- Machine-readable baseline report in `reports/release-quality-budget.json` to support later payload reduction.

Baseline: public home 1,197 KiB; learner dashboard 1,112 KiB; catalogue 1,238 KiB; auth 79 KiB of referenced, uncompressed local CSS/JS. These are NOT network transfer sizes, and do not represent real-user Core Web Vitals.

Not completed in this offline release:
- Full notification architecture consolidation (requires workspace-by-workspace behavioral review).
- Browser/device-based responsive and sign-in-to-certificate end-to-end verification.
- Staging Supabase integration, cross-device state validation, production smoke tests, and live performance measurement.
- Broad dependency or stylesheet removal without a verified production-equivalent browser suite.

No production environment or database was modified.

---

<a id="source-release-8-navigation-md"></a>
### Source: `RELEASE_8_NAVIGATION.md`

# Release 8 — Unified learner top navigation

- Updated 28 shared-header pages with Dashboard, Courses, My Learning, Practice, and Progress links.
- Added the four new learner shortcuts to the mobile/tablet drawer; preserved all existing resource and course links.
- Compacted the desktop My Learning shortcut and mobile header, while retaining the current accessibility controls, focus trap and keyboard dismissal.
- Retained Study Pulse and Learning AI floating controls from Release 7.
- Local checks: npm run build, npm run lint, npm test (passed after correcting Progress routing to the learner dashboard). These are local checks, not live Vercel deployment or real-device testing.

---

<a id="source-release-9-premium-navigation-md"></a>
### Source: `RELEASE_9_PREMIUM_NAVIGATION.md`

# Release 9 — Premium learner navigation

Removed duplicate dashboard/My Learning/Progress destinations from shared headers. Primary destinations: My Learning, Explore Courses, Practice Hub, AI Tutor, Study Tools. The mobile drawer has the same five primary links and retains secondary Capstone and study resources. The redundant top-right My Learning shortcut is replaced with a Profile link. Existing sign-in/sign-out logic is unchanged.

Navigation changes apply to shared-header pages, not private admin/tutor workspace chrome. Practice Hub currently uses the existing practice.html; a broader practice directory would require separate work.

---

<a id="source-studio-retirement-and-scroll-notes-md"></a>
### Source: `STUDIO_RETIREMENT_AND_SCROLL_NOTES.md`

# Practice Studio retirement and Practice Arena scrolling

- Practice Studio is no longer a standalone destination; the study tools card and shared navigation entry are removed.
- Old studio.html bookmarks redirect to Practice Arena; saved learner records are not deleted.
- Practice Arena now uses native immediate scrolling instead of global CSS smooth scrolling and scripted smooth panel jumps.
- Reduced the decorative fixed background layer on coarse-pointer devices.
- The requested Practice Studio sidebar height change is intentionally not applied because Practice Studio is retired.
- Actual frame-time performance still requires profiling on physical devices.

---

<a id="source-studio-retirement-test-update-md"></a>
### Source: `STUDIO_RETIREMENT_TEST_UPDATE.md`

# Practice Studio retirement — regression update

- Updated legacy regression contracts to exclude the retired `studio.html` redirect from active-page layout, theme, authentication UI, favicon, and page-loader assertions.
- Added `tests/studio-retirement.mjs` to verify redirect, removal from primary Study Tools/navigation/search, and availability of Practice Arena.
- Removed unused retired Studio stylesheet and controller files; retained `course-studio-data.js` because `connection-test.html` still references it.
- Removed residual Practice Studio destinations from private navigation and premium search.
- Preserved active Practice Arena worksheet, exercise, Tutor, authentication, and cloud test coverage.
- Verified with `npm run verify:deployment` (exit code 0). Actual live Vercel deployment and physical-device scrolling performance not tested.

---

<a id="source-ui-refinement-20261121-md"></a>
### Source: `UI_REFINEMENT_20261121.md`

# DataLearning UI refinement
- Removed repetitive generic career roadmap links from weekly lesson actions and learning-journey checkpoints.
- Preserved the specialist career roadmap bridge at Week 10 and all original specialist content.
- Retained weekly lesson, assessment, practice and next-week navigation.
- Increased shared SVG icon size and stroke weight.
- Reduced mobile Practice Arena paint-heavy filters and shadows while preserving result/editor scrolling.
- Static verification only; live mobile FPS and end-to-end deployment are not verified.
- GitHub connector currently exposes no repositories, so changes were not pushed to GitHub or Vercel.

---

<a id="source-vercel-predeploy-verification-2026-11-22-md"></a>
### Source: `VERCEL_PREDEPLOY_VERIFICATION_2026-11-22.md`

# Vercel pre-deployment verification — 2026-11-22

Source: DataLearning Release 6 quality-hardening package.

## Local checks completed
- `npm run build`: PASS. Static `dist/` generated; 2,774 published resource references resolved.
- `npm run lint`: PASS.
- `npm test`: PASS, including in-memory cloud/auth tests (not a live Supabase check).
- `npm run audit:quality`: PASS; mobile viewport and local JS/CSS references checked.
- `vercel.json`: configured with `buildCommand: npm run build`, `outputDirectory: dist`, and static routes/rewrites.

## Deployment settings to verify in Vercel
- Project Root Directory: repository root (the directory containing `package.json` and `vercel.json`).
- Install Command: default `npm install`; Build Command: `npm run build`; Output Directory: `dist`.
- Node.js runtime: project declares `24.x` in package.json and `.nvmrc`. Local checks ran with Node 22.16.0, so Node 24 / Vercel-hosted execution has **not** been independently tested here.
- Set the project's required Supabase and other server environment variables in Vercel settings; do not put credentials in the ZIP.
- Deploy to Preview first and test sign-in, course discovery, enrolment, progress persistence, mobile navigation, and protected API endpoints before production promotion.

## Limitations
These checks do not guarantee zero Vercel build/runtime errors. No authenticated Vercel preview deployment or live backend test was performed. No production environment was changed.

---

<a id="source-week-completion-implementation-md"></a>
### Source: `WEEK_COMPLETION_IMPLEMENTATION.md`

# Weekly completion rules (all nine Academy courses)

- New completion requires an 80% or higher weekly quiz score.
- Best attempt is retained in local storage and in the existing `quiz_results` row for signed-in learners.
- Weekly lesson checks the account's quiz result and local result before enabling completion.
- Retry and answer explanations remain available in the existing weekly quiz.
- Previously completed weeks are grandfathered and not revoked.
- This is a frontend eligibility check only: `course_progress` API writes are not server-side gated. A secure server-side gate requires a separately reviewed Supabase migration and must account for legacy completions and other progress writers.
- Practical exercises remain learner-directed, not machine-graded or independently verified.
- This package has not been browser-tested or deployed.

---

<a id="source-workspace-conflict-release-md"></a>
### Source: `WORKSPACE_CONFLICT_RELEASE.md`

# DataLearning workspace concurrency release

## Implemented
- Live Supabase `save_workspace_cas` RPC with per-item revision check and row lock.
- Cloud workspace frontend uses expected revisions and refuses silent stale overwrites.
- A conflict dialog offers cloud or local version, preserving unsaved edits in memory until selection.
- Existing atomic practice completion merge remains in place.

## Limitations / verification required
- Two authenticated browser/device sessions were not available for a full live end-to-end test.
- Some lesson progress and other surfaces need independent concurrency review.
- No complete browser DevTools audit of IndexedDB, Cache Storage, cookies, and SDK internals.
- Local drafts are only in RAM until saved; closing an offline tab loses unsaved data.
- No frontend production deployment performed.
- Legacy localStorage is still read to import previous data and removed after successful import.
- Supabase authentication can retain session data on device.

---

## Technical architecture, design and implementation notes

<a id="source-docs-admin-learners-header-canvas-20261112-md"></a>
### Source: `docs/ADMIN_LEARNERS_HEADER_CANVAS_20261112.md`

# Admin Learners & Progress – header and canvas refinement (2026-11-12)

- Restored a premium navy-and-teal header behind **Learners & Progress**, with white typography, orange eyebrow text, and accessible translucent action buttons.
- Removed the legacy radial gradient/underlay from the admin page-area, main-frame, and workspace wrappers. Body retains a single flat `#f7f9fa` canvas. Modal backdrops and sidebar overlays remain operational when intentionally opened.
- Removed page-wide border/outline treatments while retaining individual table/card/control borders.
- Scoped all changes to the admin page, preserving Course Analysis, Review Desk, and learner-facing pages.
- Bumped the admin CSS cache-version query in `admin.html` to ensure updated styling loads when deployed.
- No Supabase schema or administrative role changes.

---

<a id="source-docs-admin-nav-contrast-fix-20261113-md"></a>
### Source: `docs/ADMIN_NAV_CONTRAST_FIX_20261113.md`

# Administration navigation contrast — 13 November 2026

## Cause
The old `admin-workspace.css` gave `.ac-secure` a pale background, while the canonical premium palette applied white text to the same element. The combination made “Admin access” hard to read. The older admin topbar also used a white background before the final theme layer loaded.

## Correction
- `.ac-secure` now has a dark translucent background and white text, with one pistachio status dot. The redundant pseudo-element dot is removed.
- Administrator topbar uses the shared premium navy gradient.
- Admin Overview, Review Desk, Connection Check, and Progress Sync use a flat neutral mist canvas instead of a page-sized white underlay. Content cards and inputs remain light for legibility.
- The canonical stylesheet version changed to `20261113-theme-v3` across 38 pages to invalidate stale CSS caches.

## Validation
- `npm test` and `npm run lint` verify application logic and CSS link integrity.
- `tests/admin-access-badge-contrast.mjs` checks the new badge, role label, responsive hiding, and canvas selectors.
- A full live authenticated browser rendering check is still required after deployment. No database or hosting configuration was changed.

---

<a id="source-docs-admin-unified-learner-progress-20261112-md"></a>
### Source: `docs/ADMIN_UNIFIED_LEARNER_PROGRESS_20261112.md`

# DataLearning — Unified Administration Release (12 November 2026)

## User-facing changes

- The administration sidebar and overview now point to one **Learners & Progress** view (`admin.html#admin-learners`) instead of separate Learner Management and Progress Reports links. The legacy `progress.html` route remains server-protected for bookmarked URLs; it is no longer advertised in navigation, search or administrator shortcuts.
- The retained view uses verified `public.learner_profiles` records as the directory of DataLearning users, with **Learner** and **Administrator** role badges, search, course filter, role filter, learning-status filter, pagination and CSV export.
- The directory shows courses started, distinct completed weeks out of 90, overall progress %, last activity and a **View details** action for each account. Details include course-specific progress, completed-week indicators, quiz attempts and average, capstone status and certificate status.
- **An administrator who studies is an engaged learner** for learning analytics. Course analytics count distinct account IDs with study events regardless of their role. Login alone does not count as learning engagement. Administrators retain their administrator role and privileges. Deduplicate repeated completion updates by `user_id`, course slug and week.
- Every private workspace sidebar now displays **Administrator account** or **Learner account** and the verified signed-in email directly above **Sign out**. The role comes from the verified gate (`site_admins`), not editable profile metadata.
- The admin interface and assessment desk use the scoped premium cleanup stylesheet. It removes oversized decorative hero underlays and full-width section border treatments, retains accessible content backgrounds and fixes the phone detail drawer's content-box overflow issue.

## Privacy and correctness

- No database changes were made for this release. The authoritative learner directory and role security remain in Supabase.
- Access remains verified by Vercel middleware and the client role gate, backed by `site_admins` and RLS. Both learner and administrator study events use their real account identifiers.
- Percentages in the directory are completed course weeks divided by 90 (9 paths × 10 weekly units), not a fake enrolment percentage. Course cards use the individual course's 10-week denominator.
- Historical totals use only recorded, readable data. Distinct study participation is not invented or conflated with signing in.

## Verification

- `npm test` passes all academy, security, Practice Arena, Tutor and cloud-media suites, including `tests/admin-unified-engagement.mjs`.
- Isolated Chromium checks at 320, 390, 768, and 1440px with simulated authenticated Supabase responses confirmed responsive table display with no page-level overflow and an administrator's Excel progress appearing in course engagement.
- A 390px per-account View details drawer was checked: nine collapsible course records with 90 week indicators, no off-screen clipping, and responsive content.
- This is a **source release only**, not a live deployment or end-to-end check against live authenticated records.

---

<a id="source-docs-ai-response-premium-formatting-20261111-md"></a>
### Source: `docs/AI_RESPONSE_PREMIUM_FORMATTING_20261111.md`

# AI response formatting update — 11 November 2026

## Scope
- Shared safe DOM-based Markdown response renderer: `assets/scripts/ai-response-format.js`
- Shared responsive presentation: `assets/styles/ai-response-premium.css`
- Integrated with the floating learning coach, live Tutor Studio, and the built-in offline Tutor explanations.
- Proper semantic tables (`table`, `thead`, `tbody`, `th`, `td`) inside a keyboard-focusable horizontal scroll region.
- Scoped paragraphs, headings, ordered/unordered lists, links, quotations, and code block formatting.
- Code examples have a copy control. Untrusted model text is only added using text nodes; model HTML never renders as executable HTML.

## Behavior
- Tables and code scroll inside their messages at small screen sizes. The chat card and document do not grow wider than their container.
- Paragraphs wrap while code preserves intentional indentation.
- Assistant messages have consistent visual treatment; user messages remain plain text.
- No changes to AI provider logic, API contracts, study progression, server/session code, or course content.

## Verification
- `npm test`: passed (Academy, security, Practice Arena, Tutor, cloud/media).
- New automated response parser and 29-page script/style-order regression check: passed.
- Headless Chromium isolated rendering: 320px, 390px, 768px, 1440px; no document overflow. Six-column tables and long code examples scroll within their containers.
- Live provider requests were not executed against a production service as part of this UI-only update.

---

<a id="source-docs-burnt-wood-admin-nav-refinement-20261113-md"></a>
### Source: `docs/BURNT_WOOD_ADMIN_NAV_REFINEMENT_20261113.md`

# Burnt Wood — administration navigation and icon refinement

- Consolidated obsolete intermediate blue and terracotta tokens to the six-color Burnt Wood palette and accessible neutrals across active CSS, HTML, JS, and SVG assets.
- Added scoped administration sidebar and top-navigation gradients with warm copper highlights.
- Increased administration icon-container contrast, SVG stroke weight and active navigation emphasis.
- Retained mobile menu, existing routes, permissions, form behavior, courses, Tutor, and Practice Arena.
- Added `tests/burnt-wood-admin-nav-icons.mjs` to the security regression suite.
- Validation: npm test and npm run lint passed; visual authenticated deployment review is still required.
- Deployment: source-only; not deployed.

---

<a id="source-docs-burnt-wood-complete-color-audit-20261113-md"></a>
### Source: `docs/BURNT_WOOD_COMPLETE_COLOR_AUDIT_20261113.md`

# DataLearning Burnt Wood complete color audit — 13 November 2026

## Scope

Audited the current project source: all 38 HTML pages, 55 CSS modules, JavaScript-rendered UI strings, SVG icons and lesson diagrams. The new automated test (`tests/burnt-wood-complete-source-audit.mjs`) scans 303 text-based interface source files and checks approximately 18,705 explicit hex/RGB color literals against the Burnt Wood palette and its approved accessible warm-neutral surface colors. It is included in `npm test` through `test:academy`.

## Results

No unapproved legacy hex, RGB, RGBA, or HSL color literals remain in the audited interface text. Legacy variable *names* such as `--mint`, `--orange`, `--ambient-indigo`, and classes such as `.button.blue` still exist for backward compatibility; their values are now mapped to the current palette. Renaming them without a full selector migration would risk breaking app behavior and is not necessary to remove their previous colors.

The palette is Charcoal `#0B0909`, Midnight Blue `#023048`, Burnt Red `#770101`, Warm Ivory `#F0EDDE`, Copper `#C58A69`, and Soft Sand `#D9BFA4`. Warm neutrals, white, and black are retained for accessibility, readable data tables, borders, and shadows.

## Boundaries

This audit does not claim that every raster pixel is recolored. The Excel Week 1 educational interface PNG deliberately depicts a familiar spreadsheet UI and may contain application-specific interface colors. Third-party embedded widgets, browser chrome, dynamically fetched assets, and live authenticated page states are not exhaustively visual-tested. A live deployment and authenticated mobile/desktop review remain necessary to verify production appearance and caching.

---

<a id="source-docs-burnt-wood-css-refactor-20261113-md"></a>
### Source: `docs/BURNT_WOOD_CSS_REFACTOR_20261113.md`

# Burnt Wood CSS source modernization — 13 November 2026

## What changed

The previous release had the correct palette but repeated literal color values thousands of times across component CSS. This release replaces 5,000+ such usages with canonical `var(--bw-*)` tokens, defined in `assets/styles/burnt-wood-theme.css`. The six canonical tokens are charcoal, midnight, burgundy, ivory, copper and sand. The theme stylesheet remains loaded on all pages after component CSS.

Seven existing CSS files retain a small number of explicit values because they have established component-level contract tests that verify those declarations: `private-premium-rebuild.css`, `private-experience-v3.css`, `course-discovery-grid-premium.css`, `admin-unified-premium.css`, `practice-arena-premium-final.css`, `account.css`, `ten-week-masterclass.css`, and `private-workspace.css` (eight files). Their values are already from the current Burnt Wood palette, not retired colors.

Legacy variable *names* (such as `--mint` or `--brand-orange`) remain as compatibility aliases for existing JS and older components; they resolve to current theme colors. Renaming them without a full dependency migration would risk breaking the app.

## Validation

- Full `npm test` regression suite.
- New `tests/burnt-wood-css-tokens.mjs` checks token definitions and all CSS variable references.
- Parsed all 55 stylesheets using `tinycss2` with zero top-level syntax errors.
- No live deployment or authenticated browser session performed.

## Future changes

Change the six canonical `--bw-*` values in the Burnt Wood theme to update the refactored components; keep contrast and semantic status colors accessible. Update remaining compatibility aliases gradually, with component tests.

---

<a id="source-docs-burnt-wood-rgb-reaudit-20261113-md"></a>
### Source: `docs/BURNT_WOOD_RGB_REAUDIT_20261113.md`

# Burnt Wood color audit — 2026-11-13

The previous hex-color audit did not cover old RGB and RGBA literals. This pass inspected CSS, HTML, JavaScript, and SVG and replaced 171 legacy RGB/RGBA references across the app. These included previous cornflower blue, pistachio green, cool mist, older brown, and intermediate cool-gray values.

The corrected references now use Burnt Wood colors and warm neutrals: charcoal #0B0909, midnight blue #023048, burnt red #770101, ivory #F0EDDE, copper #C58A69, sand #D9BFA4, plus readable off-white and neutral shades.

The audit is enforced by tests/burnt-wood-rgb-audit.mjs. Pure white and black remain intentionally for accessibility, and functional status/third-party content may have distinct colors. Raster illustrations and third-party UI content cannot be exhaustively certified by a text-source audit. Verify rendered pages on the live deployment and clear deployment caches.

---

<a id="source-docs-burnt-wood-signin-admin-snapshot-fix-20261113-md"></a>
### Source: `docs/BURNT_WOOD_SIGNIN_ADMIN_SNAPSHOT_FIX_20261113.md`

# DataLearning · Sign-in and Admin Performance Snapshot · 13 Nov 2026

## Sign-in page (`auth.html`)
- Kept the global Burnt Wood palette but moved the isolated `auth-entry-premium.css` stylesheet to the final stylesheet position. This prevents general-purpose primary-button rules from overriding the sign-in page.
- Changed its cache key to `20261113-auth-v4`.
- Updated the actual hero gradient to Charcoal → Midnight Blue → Burnt Red (red ends at 100%, rather than beyond the visible panel).
- Updated the sign-in tab, submit gradient, page canvas, warm form background, form-top accent, and focus treatments. Mobile rules and accessibility preferences remain.
- Preserved all login, registration, password visibility, and password-reset markup and scripts.

## Admin overview (`admin.html`)
- Added a specific `ac-performance-section` class to the Performance Snapshot section.
- Removed the section's backing background, border, shadow, backdrop filter, and pseudo-element overlays. Its four individual KPI cards retain their white surfaces, borders, and metric content.
- Bumped `admin-unified-premium.css` cache key to `20261113-snapshot-clean-v1`.

## Verification
- `npm test` passed.
- `npm run lint` passed.
- `tests/auth-admin-visual-fixes.mjs` added to the security suite.
- Browser-rendered computed styles confirmed the sign-in hero and submit gradients on 1440px and 390px preview widths. For the admin snapshot, the section and KPI grid computed backgrounds are transparent with no section border or shadow, while cards remain white and bordered. This preview did not use a live authenticated Supabase session.
- Source code changes are **not deployed**. Redeploy the complete project to update the live website. The updated cache keys prevent stale CSS once deployed.

---

<a id="source-docs-burnt-wood-theme-20261113-md"></a>
### Source: `docs/BURNT_WOOD_THEME_20261113.md`

# Burnt Wood Theme — 13 November 2026

Primary: #0B0909 (charcoal), #770101 (burnt red), #F0EDDE (warm ivory), #023048 (midnight blue).
Supporting: #C58A69 (copper) and #D9BFA4 (sand).

All active HTML/CSS/JS/SVG UI color tokens were remapped to the new hue family. Neutral whites, text grays, and derived tonal surfaces remain for readability. A final shared stylesheet is linked on every HTML page. Course diagrams and interface assets were recolored where encoded as SVG; raster assets are not automatically recolored.

Deployment required. Browser cache and favicon cache may require refresh.

---

<a id="source-docs-cloud-study-and-python-execution-md"></a>
### Source: `docs/CLOUD_STUDY_AND_PYTHON_EXECUTION.md`

# DataLearning — Cloud state and Python execution

## Implemented (11 November 2026)

- The existing Supabase `course_progress` and `mastery_results` tables remain the authoritative destinations for week completion and final assessment scores.
- Private `public.learner_workspace_state` stores small learner-specific editor drafts, worksheet cells, quiz drafts, bookmarks, practice notes, study plans, and preferences. Access is constrained by Supabase Auth and user-id Row Level Security. The migration is in `database/20261111_cloud_learner_workspace.sql` and was applied to the connected project.
- The client uses `persistSession: false`, meaning Supabase JS does not persist auth tokens in localStorage/IndexedDB.
- `assets/scripts/cloud-workspace.js` is a synchronous RAM-backed compatibility adapter; it asynchronously hydrates and saves to Supabase. The first authenticated visit attempts a one-time migration of legacy browser data, after which app keys are cleared from localStorage. Offline-only unsynced changes cannot be guaranteed to survive a closed tab.
- The hosting API `/api/auth/session` uses a first-party HttpOnly, SameSite=Lax, Secure cookie for access and refresh tokens. Sign-in must be served on a host where this server endpoint is deployed; a static `file://` copy cannot maintain cross-page accounts in this architecture.
- Legacy offline service worker caching was retired and app-owned caches are cleaned up.
- Each of 90 weekly lessons includes a lazy-loaded explanatory diagram. Excel Week 1 additionally has a detailed generated visual showing ribbon tabs, worksheet cells, the formula bar, and Excel-style workspace navigation. The diagrams are **educational interface illustrations**, not exact screenshots of licensed software.
- The Excel practice workbook remains editable and saves its values to the account workspace. The editor header shows only its selected icon; the worksheet expansion remains optional.

## Python execution: current boundary

Python remains a **browser Web Worker** running Pyodide for functional, isolated client execution. The worker is warmed on Python selection, reused between Run and Grade, and avoids loading optional packages for standard-library imports. These steps can reduce perceived waiting and redundant package downloads during a single session, but **they do not make Python server-side**. Initial downloads and memory use remain on the device.

**Do not execute learner Python directly in Supabase PostgreSQL, Supabase Edge Functions, or an unrestricted serverless process.** True cloud execution requires a dedicated sandbox runner (e.g., ephemeral containers/microVMs with isolated filesystem and no network by default), authentication, size/time/memory quotas, abusive-code protection, dependency controls, and a secure grading API. No such runner was provisioned or connected in this release. Until it is, the site should not advertise "cloud Python execution."

## Release and validation

- Requires redeploying the `api/auth/session.js` serverless endpoint and the project assets together. **This source update is not a live deployment.**
- If transferring to another Supabase project, apply `database/20261111_cloud_learner_workspace.sql` and configure the correct publishable Supabase URL/key.
- Network interruptions leave unsynced changes in RAM only, with visible warnings. Sign-in uses an essential first-party HttpOnly cookie; it is not possible to retain authenticated sessions across pages with literally zero browser-side session data.
- Browser engines may cache public static resources such as fonts or images outside the app's control. No DataLearning localStorage, sessionStorage, or IndexedDB persistence remains active after the legacy-data migration.
- All repository unit and static integrity tests, including cloud/media release guards, pass. End-to-end authenticated login against a deployed host and true remote Python execution have **not** been verified.

---

<a id="source-docs-concept-diagrams-release-md"></a>
### Source: `docs/CONCEPT_DIAGRAMS_RELEASE.md`

# Concept diagram learning upgrade

Added 20 responsive, self-contained SVG concept diagrams for selected lessons across Data Analysis, Excel, SQL, Power BI, Power Query, Tableau, Statistics, Python and AI. They supplement (rather than replace) the existing 90 weekly interface illustrations.

## Teaching pattern
Each selected lesson now includes a concept diagram, a concise explanation, and a learner prompt to trace inputs, connections, and outputs. Power BI Week 3 compares star and snowflake structures in two panels. Diagram labels are illustrative and do not substitute for specifying model cardinality, relationship direction, or join keys in the real tool.

## Engineering
- Assets: `assets/images/lesson-concepts/*.svg`
- Registry: `assets/scripts/academy-concept-diagrams.js` and `assets/data/lesson-concept-diagrams.json`
- Styling: `assets/styles/academy-concept-diagrams.css`
- Rendering: `assets/scripts/academy-app.js` within the weekly lesson reader
- Existing progress IDs, assessment data and lesson content are unchanged.

## Verification
`npm run verify:deployment` passed locally on Node 22 (project targets Node 24). Authenticated visual inspection on mobile and desktop remains outstanding. Production has not been deployed.

---

<a id="source-docs-connected-learning-journey-release-md"></a>
### Source: `docs/CONNECTED_LEARNING_JOURNEY_RELEASE.md`

# Connected learning journey — 21 November 2026

- Roadmap specialist modules link to related Academy courses, course-specific Practice Arena workspaces where supported (SQL, Excel, Python), and capstone selection.
- Roadmap includes an explicit six-step learning journey.
- Academy lesson actions link back to roadmap and to relevant Practice Arena tools.
- Existing progress, quiz, capstone, and authentication implementations are unchanged.
- Practice Arena currently has executable workspaces for SQL, Excel, Python only. Other courses link to capstone, not unsupported editors.
- This release does **not** implement AI tutor context awareness, mastery analytics, automated capstone grading, or admin analytics. Those require separate product design and validation.

---

<a id="source-docs-course-repetition-audit-20261111-md"></a>
### Source: `docs/COURSE_REPETITION_AUDIT_20261111.md`

# Course repetition audit — 11 November 2026

Inspected the nine courses, their 90 weekly module records, and the 450 exam-style mastery questions.

- **Exact duplicate mastery-question prompts within each course:** none (50 distinct prompts in each course).
- **Exact duplicate week outcomes, worked examples, exercises, solutions, and pitfalls within the seven JSON-authored paths:** none.
- **Repeated generic learning boilerplate:** removed repetitive per-concept instructional paragraphs and duplicate generic descriptions under the week-by-week deeper-learning content. Preserved substantive topic-specific reasoning, worked business examples, validation, and practice exercises.
- **New instructional illustrations:** 90 week-keyed diagrams (with Excel Week 1 enhanced by a detailed interface infographic). Images use descriptive text and are loaded only when needed.

Some pedagogical directions (e.g. checking assumptions or validating results) appropriately recur across topics. This is not the same as a duplicate question, module, or example. A manual pedagogical review for semantic similarity should accompany any future curriculum-wide rewrite.

---

<a id="source-docs-educator-curriculum-20261113-md"></a>
### Source: `docs/EDUCATOR_CURRICULUM_20261113.md`

# Educator curriculum release — 13 November 2026

## Scope and source of truth

- All **nine Academy courses** have **ten weeks**. The existing foundations (roughly 615 words/week of masterclass teaching, with worksheets, visuals, quizzes and capstones) remain available.
- Added **90 curated non-repeating teaching ladders**, one per course/week, containing a plain-English foundation, a worked miniature, a professional extension and independently checkable evidence. Source of truth: `assets/data/course-educator-depth.json`; browser build: `assets/scripts/course-educator-depth.js`.
- Progression: Weeks 1–2 **Start here**, 3–5 **Build your skills**, 6–8 **Apply professionally**, 9–10 **Advanced practice**. This is an instructional progression, not a promise of formal professional certification after ten weeks.
- The course reader uses the same full guided reading for **Python and AI** as for the seven core subjects. The specialist masterclass renderer now calls the common renderer instead of displaying the same explanation twice; Week 10 projects remain accessible.
- The previous duplicated deep-dive casework was replaced by one practical skill ladder with disclosure-based companion code, verification evidence and a meaningful extension.
- SQL miniature examples explicitly use the **retail SQLite practice dataset** (`orders.unit_price`, `orders.discount_pct`), which differs from the **learning_sales_2026.csv** dataset (`unit_price_ngn`). Do not mix their schemas. The three SQL samples were executed against `downloads/retail_practice.sqlite`.
- All existing user/administrator roles, first-party session protection, Supabase RLS, cloud progress, 90 quizzes, 450 mastery items, capstone handling, Tutor and Practice Arena remain intact. No database migrations were applied.

## Style consolidation

- `academy-learning-depth.css` is now the one canonical teaching-ladder stylesheet; it replaces earlier gradient overlays, cramped two-column casework and non-scrolling code, providing three responsive cards and a structured proof section.
- Removed unused `.dlm-specialist-reading`, `.dlm-answer`, `.dlm-code` and old helper selectors from `ten-week-masterclass.css`, as the shared renderer does not use them.
- All HTML-referenced stylesheets still serve real pages; avoid deleting legacy shared CSS blindly until a complete browser-state and interaction audit demonstrates it is unused.
- Updated the changed lesson JS/CSS query versions to `educator-20261113`, preventing old CDN assets from masking this release after deployment.

## Release verification

Run `npm test` (includes new 90-week progression verification), `npm run build`, and test actual login, Supabase progress save, editors, Tutor and capstone in a deployed Vercel preview. Browser-only Python still runs in a web worker (not on the Supabase server). The current source ZIP is not a live deployment.

---

<a id="source-docs-foundational-teaching-flow-upgrade-md"></a>
### Source: `docs/FOUNDATIONAL_TEACHING_FLOW_UPGRADE.md`

# Foundational teaching flow upgrade

## Data Analysis Week 1
Begins with what data is, what data analysis is, why it matters, four types of analytics, the analyst role, analysis workflow, tool roles and a guided Lagos kiosk revenue calculation. Updated first-week curriculum, practical module, educator-depth content, self-check questions and downloadable worksheet. Existing week numbering and saved progress keys remain stable.

## Other eight courses
Added subject-specific conceptual orientations before tool procedures in Week 1 for Excel, SQL, Power BI, Tableau, Power Query, Statistics, Python and AI. The seven-stage educator guidance is retained across all 90 lessons. Other weeks are not rewritten in this release.

## Quality assurance
Full `npm run verify:deployment` passed locally on Node 22. Signed-in browser and mobile visual checks remain to be completed in Vercel Preview. Production has not been deployed.

---

<a id="source-docs-icon-system-md"></a>
### Source: `docs/ICON_SYSTEM.md`

# DataLearning icon system

Shared outline icon registry: `assets/scripts/icon-system.js`, with sizing in `assets/styles/icon-system.css`.

- Icons use 24×24 viewBox, 1.85 stroke, round linecaps and theme `currentColor`.
- Supported semantic names: code-2, sparkles, target, graduation-cap, book-open, trending-up, check, menu, x, layout-dashboard, award, route.
- Common decorative glyphs in `.za-tool-icon`, `.dl-intro-icon` and `.dl-note-icon` are upgraded automatically.
- Add `<span data-dl-icon="award" aria-hidden="true"></span>` for new decorative icons.
- For functional icon-only buttons, supply a meaningful `aria-label` on the button.
- Existing course logos, brand assets, diagrams and illustrations remain untouched.
- New dynamic content can call `window.DataLearningIcons.refresh()`.
- Avoid replacing instructional mathematical symbols or meaningful text with decorative icons.

---

<a id="source-docs-icon-visual-audit-20261121-md"></a>
### Source: `docs/ICON_VISUAL_AUDIT_20261121.md`

# Follow-up icon audit — 21 November 2026

## Scope and changes

- Standardised 29 desktop header My Learning icons and 29 mobile drawer My Learning icons to the shared 24×24 outline geometry.
- Standardised 29 mobile menu icons without changing accessible button labels or navigation event handlers.
- Standardised My Learning dashboard icons for courses, lessons, quiz score, certificates, progress sync, continue learning, quiz records, capstone assessments and certificates.
- All replacement SVGs use `viewBox="0 0 24 24"`, `currentColor`, 1.85 stroke, rounded caps/joins, `aria-hidden="true"` and `focusable="false"`.
- Kept course logos, instructional diagrams, decorative illustrations and functional iconography outside these reviewed areas unchanged.

## Verification

- `npm run build`: passed (2,778 deployment resource references resolved).
- `npm run lint`: passed.
- `npm test`: passed.
- `node tests/arena-svg-accessibility.mjs`: passed.

## Remaining manual QA

Automated tests do not replace visual browser QA. Check desktop and narrow mobile breakpoints, high contrast, keyboard focus, screen-reader announcements and icon alignment in a browser before deploying. The audit is a targeted shared-navigation/dashboard pass, not a guarantee that every SVG in the application has been replaced.

---

<a id="source-docs-lean-app-cleanup-tutor-20261111-md"></a>
### Source: `docs/LEAN_APP_CLEANUP_TUTOR_20261111.md`

# DataLearning — current-file cleanup and app-aware Tutor audit

**Release:** 11 November 2026 · **Scope:** complete latest DataLearning package, based on the AI Course + Prompt Library release.

## What was removed

Eighteen provably unused files were deleted (365,767 raw bytes):

- Eleven dated, superseded UI/release-note documents under `docs/`.
- Six unused source-generation files under `curriculum/` (old Python builders, exported Markdown and intermediate JSON). Their current output already lives in the active course scripts/data; the originals were not loaded by the website or referenced by the maintained test suite.
- `assets/icons/data-network.svg`, an icon with no app or test references.

The stale `test:core`, `test:responsive`, `test:learning` and `test:legacy` npm scripts were also removed because they referenced deleted test files and could not run. The two previously omitted but current tests for the Career Path and AI Prompt Library have been added to `test:academy`. All retained `tests/*.mjs` files are now included in a maintained npm command.

`README.md`, `CURRENT_RELEASE.md`, `docs/README.md`, `docs/PROJECT_FILE_MAP.md` and the route manifest have been refreshed to reflect the actual nine-course release. The service-worker cache identifier was increased to remove stale public asset caches on activation.

## What stays — and why

- **All nine ten-week course players:** the original 90 weekly course IDs and existing quizzes/progress semantics remain stable.
- **Python/AI roadmap and extension pages:** they are still directly linked in the learning experience. Removing them without migrating the content and links would break navigation. They are current supplemental resources, not unused copies.
- **Every CSS and browser JS file:** the static dependency audit confirms that each is referenced by at least one current HTML page; they are not safe to delete based on filenames or age.
- **Course data, downloads and dashboard images:** consumed by page controllers, downloadable learner material or active curriculum regression tests.
- **Database migration history:** not loaded by browser pages, but retained for reproducible installation/recovery. The current release neither executes a migration nor changes learner data.
- **Maintained test suite:** essential to validate all Academy, authentication, Arena and Tutor behaviour before deployment.

This is **reachability-led pruning**. A referenced file may contain older internal CSS rules, but deleting that file wholesale would break an active page. No unproven cascade/dependency deletions were made.

## The app-aware AI Tutor

The new curated source `assets/data/tutor-app-guide.json` contains **26 verified guidance entries**, including all **nine ten-week course plans (90 weeks)** and 17 user-workflow articles. It covers:

- getting started and course navigation;
- precise week goals, core topics, worked examples, practise tasks, validation checks and common mistakes;
- downloads, in-app YouTube restrictions and dashboard/presentation examples;
- the Excel/SQL/Python Practice Arena and its limitations;
- the Prompt Library and separate four-level Career Path;
- sign-in, progress sync, quizzes, certificate eligibility and Week 10 capstone review;
- the difference between offline tutor knowledge and authenticated live AI;
- privacy and synthetic-data guidance.

**Offline Tutor:** `assets/scripts/tutor-app-guide.js` reads the public guide and finds matching app questions before using the older topic-explanation library. It neither sends these questions to an AI provider nor reads private account records. If the public guide cannot be loaded, ordinary offline subject tutoring still works.

**Live AI:** `lib/tutor-app-knowledge.js` selects relevant, whitelisted guidance. `api/tutor.js` adds this to the authenticated provider's server-side instructions. Existing provider keys stay in server environment variables. No model weights are trained or fine-tuned, and no learner records, submissions or secrets are added to the guide.

**Safety:** the Tutor cannot approve capstones, inspect a learner's grades or bypass login/RLS. It should not invent features or claim access to real-time user state.

## Verification

- `npm run verify:deployment`: **passed** after cleanup and Tutor grounding.
- `tests/runtime-asset-audit.mjs`: all current HTML-referenced CSS, JS and local file links exist; confirms that no standalone CSS/JS is orphaned.
- `tests/tutor-app-guide-cleanup.mjs`: checks 26 guide entries, 90 weeks, canonical local routes, server context, offline matching and removed artifacts.
- Isolated Chromium (390px) interaction test: app help answered a capstone question and an Excel Week 8 question with no page script errors.
- **Not verified:** full browser navigation was blocked by local administrator policy; actual live OpenAI/Groq responses, external video embedding, real Supabase login and project uploads require a deployed preview with appropriate test accounts.

## Deployment and maintenance

Extract the ZIP and deploy the contents of `datalearning/` at the repository root. Keep `api/`, `lib/`, `middleware.js`, `vercel.json`, `assets/`, `courses/` and `database/` in their relative locations. If course titles or app routes are changed later, update the guide and rerun Tutor and asset tests. Keep server API keys out of the public guide and browser bundles.

---

<a id="source-docs-master-four-level-curriculum-20261110-md"></a>
### Source: `docs/MASTER_FOUR_LEVEL_CURRICULUM_20261110.md`

# DataLearning — Four-Level Master Curriculum Blueprint
**Curriculum review:** 10 November 2026 · **Audience:** absolute beginners, practising analysts, engineers, and aspiring AI/data-science specialists.

## 1. Gap analysis summary

### Strengths in the existing app
- Seven active 10-week courses (Data Analysis, Excel, SQL, Power BI, Tableau, Power Query, Introductory Statistics), each with worked examples, guided steps, weekly questions, and saved completion states. The separate Python and AI course routes are retained for continuity.
- Practical exercises, SQL and spreadsheet practice surfaces, progress tracking and capstone tools already exist. These provide a strong beginner-to-intermediate analytics base.

### What needed improvement and has been added
- **A clear four-stage progression:** the core 70 weeks were not visibly connected to data engineering, machine learning or expert AI systems. A new 31-module interactive master pathway bridges those gaps.
- **Data engineering:** data contracts, dbt/Snowflake-style transformation practices, orchestration, cloud architecture, ACID lakehouse tables, Spark and Kafka are now explicitly taught at the appropriate progression level.
- **Data science:** Python, pandas, statistical inference, A/B tests, forecasting, supervised ML, temporal validation and production monitoring are mapped into an ascending sequence.
- **Responsible AI:** prompting for data professionals, grounded retrieval, evaluations, permission boundaries and human verification are separate instructional units rather than generic “use AI” suggestions.
- **Reproducibility and safety:** Git, CI, lineage, privacy and security controls are taught before learners encounter production-scale architecture.
- **Applied depth:** every new specialist module contains a substantial concept explanation, concrete worked example with interpretation, realistic case, four steps, a five-minute micro-project, model answer, and mistake to avoid.

### Existing topics to keep, reposition or de-emphasize
- **Keep** fundamental arithmetic, basic SQL, ordinary spreadsheet references and descriptive statistics. Beginners need them, but link each lesson to a tangible analysis problem instead of presenting abstract facts alone.
- **De-emphasize as primary techniques** legacy LOOKUP/VLOOKUP and manual copy-paste spreadsheet consolidations. Teach for maintenance and historical literacy; prefer structured tables, XLOOKUP when available, Power Query and validated transforms.
- **Avoid** chart decoration without metric design, memorizing isolated DAX/SQL syntax, cloud vendor names without architecture concepts, and purely theoretical mathematics disconnected from business interpretation.
- **Update assessments next:** some existing weekly multiple-choice items use generic distractors. Those remain unchanged in this compatibility-safe release; a later content-quality pass should introduce more diagnostic, scenario-specific feedback and version existing quiz banks.

### Delivery and status of implementation
- The complete 31-module supplement is displayed within `catalog.html` beneath the original course catalog. Filter by proficiency and specialization; expand each module to read the practical lesson and reveal the model answer.
- The seven existing 10-week courses link to the relevant specialist modules. **No existing course slug, week number, quiz result or Supabase progress record is changed.**
- The specialist material runs as **mobile-friendly reading, offline synthetic calculations and planning challenges**. Cloud warehouses, Spark, Kafka, MLflow and AI APIs are instructional topics; these cloud platforms are **not** emulated or connected by the new content.
- Treat `E08` as an assessed portfolio assignment and `F01–F07` as a zero-experience on-ramp. Estimated durations are only instructional planning estimates, not measured completions.

## 2. Proficiency-level guide

### Level 1 — Beginner (Foundations)
**Objective:** Start from zero. Understand data, use a spreadsheet, read basic SQL and Python, and explain what a number actually means. **Suggested guided study:** 15–25 guided hours, plus independent project time.

### Level 2 — Intermediate (Applied Skills)
**Objective:** Solve complete analytics tasks: clean data, join tables, explore patterns, design reports, and make your work reproducible. **Suggested guided study:** 25–40 guided hours, plus independent project time.

### Level 3 — Advanced (Specialized Mastery)
**Objective:** Build robust analytics and engineering workflows, evaluate models and experiments, and operate safely in the cloud. **Suggested guided study:** 35–55 guided hours, plus independent project time.

### Level 4 — Expert (Industry Systems)
**Objective:** Design governed, monitored, scalable systems for streaming, distributed data and responsible generative AI. **Suggested guided study:** 40–65 guided hours, plus independent project time.

## 3. Updated master curriculum table

| Level | Module name | Primary tools | Learning outcome |
|---|---|---|---|
| 1 · Beginner | **F01** Think like a data analyst | Paper, Excel / Sheets | Turn an imprecise business request into a testable metric and an appropriate decision. |
| 1 · Beginner | **F02** Spreadsheet literacy and formulas | Excel, Google Sheets | Build a clean table and calculate totals, averages and rates with correct references. |
| 1 · Beginner | **F03** First SQL queries | SQL / SQLite | Read a table and return only the records needed for a business question. |
| 1 · Beginner | **F04** Python from zero | Python | Write short, readable Python scripts that calculate and label a business result. |
| 1 · Beginner | **F05** Statistics you can explain | Excel / Sheets | Describe a small dataset while communicating spread, sample size and uncertainty. |
| 1 · Beginner | **F06** Clean data and protect people | Excel, Power Query | Identify data quality problems without losing traceability or exposing private information. |
| 1 · Beginner | **F07** Visuals that support decisions | Excel, Power BI, Tableau | Choose appropriate charts and write one correct, evidence-based insight. |
| 2 · Intermediate | **I01** Excel formulas and self-updating dashboards | Excel | Build reusable, auditable spreadsheet models with dynamic formulas and summary views. |
| 2 · Intermediate | **I02** Relational SQL: joins, CTEs and windows | SQL / SQLite | Write trustworthy multi-table analyses while preventing duplicated revenue and misplaced filters. |
| 2 · Intermediate | **I03** Power Query and repeatable ETL | Excel, Power BI, Power Query | Create a refreshable extract-transform-load flow with explicit cleaning and quality checks. |
| 2 · Intermediate | **I04** Python pandas and exploratory analysis | Python, pandas | Profile, clean and summarize a dataset with reproducible code and interpretable outputs. |
| 2 · Intermediate | **I05** Power BI modelling and DAX | Power BI, DAX | Build correct measures that respond predictably to filters and support business decisions. |
| 2 · Intermediate | **I06** Tableau and evidence-led storytelling | Tableau | Build an interactive, accessible view that guides users from an observation to a next action. |
| 2 · Intermediate | **I07** Inference and experiment literacy | Excel, Python | Interpret confidence intervals, p-values and experiment designs without overstating conclusions. |
| 2 · Intermediate | **I08** Git and reproducible analysis | Git, Python, SQL | Maintain versioned, reviewable work with tests and a lightweight change log. |
| 3 · Advanced | **A01** Production SQL and query performance | PostgreSQL, SQL Server, Snowflake | Tune and verify analytic queries without sacrificing correctness. |
| 3 · Advanced | **A02** Analytics engineering with dbt and Snowflake | dbt, Snowflake, SQL | Build a tested, documented warehouse transformation project that preserves metric meaning. |
| 3 · Advanced | **A03** Orchestrate resilient data pipelines | Airflow, Fabric Data Factory, SQL | Design a scheduled pipeline with retries, dependencies and observable data-quality checks. |
| 3 · Advanced | **A04** Cloud and lakehouse architecture | Azure/Fabric, AWS, GCP | Choose storage, processing and access patterns that fit cost, scale, governance and workload. |
| 3 · Advanced | **A05** Supervised machine learning that generalizes | Python, scikit-learn | Build and evaluate a baseline model with leakage prevention and an honest test set. |
| 3 · Advanced | **A06** A/B testing and causal evidence | Python, SQL, experimentation | Design, analyze and communicate an experiment with a valid primary metric. |
| 3 · Advanced | **A07** Time series and forecasting | Python, SQL, Power BI | Build a defensible forecast with seasonal baselines and error analysis. |
| 3 · Advanced | **A08** Data contracts, quality tests and CI/CD | dbt, GitHub Actions, Great Expectations | Enforce reliable schemas, freshness and business reconciliations before publishing downstream data. |
| 4 · Expert | **E01** Distributed computing with Spark | Apache Spark, Databricks, Fabric | Explain partitioned execution and choose Spark operations that avoid unnecessary shuffles. |
| 4 · Expert | **E02** Streaming analytics with Kafka | Kafka, Spark Structured Streaming | Design a near-real-time event flow with defined delivery guarantees and late-event handling. |
| 4 · Expert | **E03** MLOps: deployment and monitoring | MLflow, Python, CI/CD | Operate a model with reproducible versions, drift checks, monitoring and rollback. |
| 4 · Expert | **E04** Deep learning, embeddings and RAG | PyTorch, embeddings, vector search | Explain neural models and build a source-grounded retrieval-augmented question-answering prototype. |
| 4 · Expert | **E05** Prompt engineering, GenAI evaluation and agents | LLM API, Python, evaluation sets | Use generative AI to support data work while proving correctness and controlling tool access. |
| 4 · Expert | **E06** Data governance, privacy and security | Cloud IAM, data catalog, policy-as-code | Create enforceable controls for access, lineage, quality, retention and responsible data sharing. |
| 4 · Expert | **E07** Lakehouse engineering and interoperability | Delta Lake, Iceberg, Spark, SQL | Design a scalable, maintainable lakehouse with transactional table formats and clear data contracts. |
| 4 · Expert | **E08** Expert capstone: governed data product | SQL, Git, cloud, BI, Spark, ML | Explain and prototype an end-to-end data product with quality gates, secure access and monitored outcomes. |

## 4. Detailed module breakdowns

## Level 1: Beginner — Foundations

### F01 · Think like a data analyst
**Discipline:** Analytics  
**Primary tools:** Paper, Excel / Sheets  
**Learning objective:** Turn an imprecise business request into a testable metric and an appropriate decision.  
**Prerequisites:** None — suitable for someone who has never used analytics software.

**Core topics:** Observation vs explanation; Population, time frame and grain; KPIs and numerator/denominator; Decision-oriented reporting.

**Teach the concept:** An analyst is not someone who simply makes charts; an analyst converts a decision into a question that can be answered using evidence. First name the audience and the action they may take. Then define precisely what is counted, the time period, and what one record represents. A metric is only meaningful when its numerator and denominator use the same population and date window. Finally distinguish what the dataset directly shows from why you think it happened. This prevents a plausible story from being mistaken for proof.

**Business case study:** A delivery team says “service has become worse”. You have daily on-time and total delivery counts for East and West. The manager must decide where to investigate. Instead of plotting every available field, compare weekly on-time delivery rate for both regions and note missing dates.

**Guided practical walkthrough:**
1. Write the decision and its owner.
2. Choose the grain and define the metric.
3. Compare equal time windows and count missing records.
4. Explain the observed pattern and propose a check.

**Worked example:**

```text
Week 1: 81 on-time / 90 deliveries = 90%; Week 2: 72 on-time / 90 deliveries = 80%. The change is −10 percentage points, not −10 deliveries.
```

**How to interpret the result:** The rate declined, but this does not establish why: staffing, weather and route mix may differ. Check these before recommending a policy change.

**Five-minute mobile micro-project:** On your phone, draft one question about a shop with falling sales, specifying measure, period, comparison and decision.

**Model answer:** “Which shop had the largest week-over-week decline in net revenue over the last four complete weeks, and is it due to order count or average order value?”

**Common mistake:** Do not treat a correlation or a percentage change as a causal explanation.

**Next step:** Take F02 and the Data Analysis course, week 1.

### F02 · Spreadsheet literacy and formulas
**Discipline:** Analytics  
**Primary tools:** Excel, Google Sheets  
**Learning objective:** Build a clean table and calculate totals, averages and rates with correct references.  
**Prerequisites:** F01; ability to type or paste values into a grid.

**Core topics:** Cells, rows and columns; Types, dates and IDs; Relative vs absolute references; SUM, AVERAGE, IF and basic charts.

**Teach the concept:** Each row should represent one observation and each column a single field. Keep a header row, do not merge cells inside the dataset, and store numeric prices as numbers rather than strings with currency symbols. A formula begins with = and changes automatically when input cells change. Relative references move when a formula is copied; a fixed $ reference does not. Structured tables are preferred to scattered ranges because they expand with new data. A chart is a view of a clearly defined calculation, not a substitute for a valid one.

**Business case study:** A kiosk logs three orders: 2 notebooks at 500 each, 1 pen at 200, and 3 folders at 300. The owner wants total sales and a calculation that will remain correct when tomorrow’s data is added.

**Guided practical walkthrough:**
1. Enter Quantity and UnitPrice as numeric fields.
2. Calculate LineSales = Quantity × UnitPrice.
3. Convert the data to a structured table and sum LineSales.
4. Add one order and verify the total updates.

**Worked example:**

```text
Line sales = 2×500 = 1,000; 1×200 = 200; 3×300 = 900. Total = 2,100. In an Excel Table, use =SUM(Orders[LineSales]).
```

**How to interpret the result:** A total is a sum of line values, not a sum of quantities or an average of unit prices. Document whether refunds and discounts are included.

**Five-minute mobile micro-project:** Add a fourth order of 2 pens at 200 and calculate the revised total; list the Excel formula.

**Model answer:** New line sales = 400; revised total = 2,500. In a worksheet: =SUM(D2:D5), where D contains the calculated line totals.

**Common mistake:** Do not sum textual ID columns or assume formatting a cell changes its underlying data type.

**Next step:** Continue with the Excel Analytics weeks 1–4.

### F03 · First SQL queries
**Discipline:** Analytics  
**Primary tools:** SQL / SQLite  
**Learning objective:** Read a table and return only the records needed for a business question.  
**Prerequisites:** F01; understand what a row and column represent.

**Core topics:** Table grain, keys and types; SELECT and FROM; WHERE and Boolean logic; ORDER BY, LIMIT and NULLs.

**Teach the concept:** SQL describes the result you want from a relational database. SELECT chooses fields, FROM selects a source, WHERE checks which individual rows qualify, and ORDER BY determines the output order. A primary key identifies one row; a foreign key connects related tables. Unlike a spreadsheet, a database does not promise an inherent row order. Use AND/OR parentheses and NULL-aware predicates, because missing values are not identical to zero or an empty string.

**Business case study:** A merchant asks for completed East-region orders, highest value first. The orders table contains order_id, region, status and amount. A read-only query answers the request without changing records.

**Guided practical walkthrough:**
1. Inspect the table columns and identify the order grain.
2. Write SELECT with necessary fields only.
3. Add status and region filters.
4. Sort descending with a stable tie-break and inspect totals.

**Worked example:**

```text
SELECT order_id, amount FROM orders WHERE status = 'Completed' AND region = 'East' ORDER BY amount DESC, order_id;
```

**How to interpret the result:** The output contains individual East orders only; it is not a regional total. To obtain a sum, learn aggregation rather than adding a misleading label.

**Five-minute mobile micro-project:** Change the filter to return West completed orders worth at least 5,000, largest first.

**Model answer:** SELECT order_id, amount FROM orders WHERE status = 'Completed' AND region = 'West' AND amount >= 5000 ORDER BY amount DESC, order_id;

**Common mistake:** LIMIT without ORDER BY can return an unpredictable sample; = NULL will not test missing values.

**Next step:** Continue with SQL weeks 1–3 and try the SQL Practice Arena.

### F04 · Python from zero
**Discipline:** Data Science  
**Primary tools:** Python  
**Learning objective:** Write short, readable Python scripts that calculate and label a business result.  
**Prerequisites:** F01; no prior coding experience.

**Core topics:** Variables and scalar types; Lists and dictionaries; Conditions and loops; Functions and exceptions.

**Teach the concept:** Python lets you express an analysis as reproducible instructions. A variable stores a value, a list stores an ordered collection, and a dictionary pairs field names with values. A loop repeats a calculation, while a function packages a reusable step. An if statement controls branches based on a Boolean condition. Use descriptive names and small functions; a script that appears to run is not necessarily correct until you inspect its inputs and expected output.

**Business case study:** A small shop has order values [1200, 800, 500]. You want a total and an average you can recalculate when new orders arrive. This is a first step toward automated reporting.

**Guided practical walkthrough:**
1. Create a list of numeric order amounts.
2. Use sum() and len() with explicit variable names.
3. Handle the empty-list case to avoid division by zero.
4. Print a labelled result and test another list.

**Worked example:**

```text
values = [1200, 800, 500]
total = sum(values)
average = total / len(values) if values else 0
print(total, average)  # 2500 833.333...
```

**How to interpret the result:** Total is 2,500 and the mean is about 833.33 per order. It is not a forecast or a per-customer metric.

**Five-minute mobile micro-project:** Add a fourth order of 1,500. State the new total and average and write the revised code.

**Model answer:** 4,000 total and 1,000 average: values.append(1500); total=sum(values); average=total/len(values).

**Common mistake:** Never divide by len(values) without handling empty input; never confuse quoted numbers with numeric values.

**Next step:** Continue with Python fundamentals and the Python Practice Arena.

### F05 · Statistics you can explain
**Discipline:** Data Science  
**Primary tools:** Excel / Sheets  
**Learning objective:** Describe a small dataset while communicating spread, sample size and uncertainty.  
**Prerequisites:** F02; basic arithmetic.

**Core topics:** Mean, median and mode; Range and standard deviation; Outliers and distributions; Samples vs populations.

**Teach the concept:** Descriptive statistics reduce many observations to useful summaries. The mean is sensitive to extreme values; the median is often more representative of a skewed distribution. Spread matters because two groups can have the same average but very different consistency. Also identify whether the numbers cover every customer or only a sample. A sample estimate is not a guaranteed description of a population, especially when the collection process excludes some groups.

**Business case study:** Five delivery times in minutes are 10, 11, 12, 12 and 35. The manager asks for a “typical delivery time” and whether there is a delay problem.

**Guided practical walkthrough:**
1. Order the values and compute mean and median.
2. Identify the long-tail observation.
3. Write what the mean and median each communicate.
4. Propose one additional measurement before acting.

**Worked example:**

```text
Mean = (10+11+12+12+35)/5 = 16 minutes. Median = 12 minutes. Range = 35−10 = 25 minutes.
```

**How to interpret the result:** Most jobs are near 12 minutes but one took 35 minutes. Investigate the outlier rather than automatically deleting it.

**Five-minute mobile micro-project:** A second courier has times 12,12,12,12,12. Both groups have median 12; explain how service reliability differs.

**Model answer:** The second courier has zero observed range while the first ranges over 25 minutes; similar median does not mean similar predictability.

**Common mistake:** Averages alone hide outliers and sampling bias. A small sample cannot establish a stable service-level agreement.

**Next step:** Continue with Statistics weeks 1–5.

### F06 · Clean data and protect people
**Discipline:** Analytics  
**Primary tools:** Excel, Power Query  
**Learning objective:** Identify data quality problems without losing traceability or exposing private information.  
**Prerequisites:** F01–F02; basic tables.

**Core topics:** Missingness and duplicates; Identifiers and date locale; Validation rules and change logs; PII minimization and ethical use.

**Teach the concept:** Quality is not simply deleting blanks. Completeness, validity, uniqueness, consistency and timeliness each require a business rule. A missing delivery date may be correct for an open order but invalid for a completed order. Preserve the raw input and log transformations; record how many rows were changed or excluded. Treat names, phone numbers and account IDs as sensitive when they identify a person. Use small synthetic datasets in exercises and share only what a learning task actually needs.

**Business case study:** A CSV has 100 orders, five repeated IDs and six missing completion dates. Four of the missing dates belong to still-open orders. A safe quality report distinguishes expected blanks from data errors.

**Guided practical walkthrough:**
1. Define rules based on order status.
2. Count duplicate keys and affected records.
3. Separate acceptable from invalid missing dates.
4. Create a reconciliation log and redact personally identifying fields.

**Worked example:**

```text
Of six missing completion dates, only two are exceptions if the other four belong to open orders. Report “2 invalid completed orders” rather than “6 corrupt rows.”
```

**How to interpret the result:** Dedupe rules require evidence: repeated IDs may represent accidental duplication or legitimate source updates. Do not delete before inspecting their business meaning.

**Five-minute mobile micro-project:** List three checks for a customer sales table and say which columns you would mask in a public learning example.

**Model answer:** Checks: unique order ID, nonnegative sale amount, required completion date for completed status. Mask customer name, phone number and email.

**Common mistake:** Replacing unknown amounts with zero biases financial totals; never publish personal records to a classroom sandbox.

**Next step:** Continue with Power Query weeks 2–3 and Data Analysis week 8.

### F07 · Visuals that support decisions
**Discipline:** Business Intelligence  
**Primary tools:** Excel, Power BI, Tableau  
**Learning objective:** Choose appropriate charts and write one correct, evidence-based insight.  
**Prerequisites:** F01–F05; an understanding of percentages.

**Core topics:** Bar vs line vs scatter; Axes and baselines; Measures, dimensions and rates; Plain-language chart commentary.

**Teach the concept:** Visual design begins with the question. Compare categories with bars and change over time with lines; use a scatterplot only when investigating the relationship between two quantitative variables. Label units, periods and population. Avoid truncated bar-chart axes that exaggerate differences, and never put incompatible scales on one axis. An insight should state the observed pattern, its likely operational relevance, and what remains unknown.

**Business case study:** A weekly sales dashboard shows East = 120,000 and West = 80,000 over the same seven days. A regional manager wants to allocate follow-up calls.

**Guided practical walkthrough:**
1. Define the aggregation and time filter.
2. Choose a horizontal bar chart with zero baseline.
3. Annotate the values and relevant comparison.
4. Write an observation plus one question for further analysis.

**Worked example:**

```text
East contributes 120,000 / 200,000 = 60% of the observed two-region revenue; West contributes 40%.
```

**How to interpret the result:** Being 60% of revenue does not mean East is 60% more profitable. Profit requires expenses, returns and margins.

**Five-minute mobile micro-project:** Pick a chart for monthly sales trend and one for order value by category; say why each fits.

**Model answer:** Line chart for month-to-month trend; bar chart for category comparisons. Both need clear labels, an explicit period and a consistent metric.

**Common mistake:** Do not infer causality from chart shape or compare values from different populations without normalization.

**Next step:** Continue with Power BI or Tableau weeks 1–3.

## Level 2: Intermediate — Applied Skills

### I01 · Excel formulas and self-updating dashboards
**Discipline:** Analytics  
**Primary tools:** Excel  
**Learning objective:** Build reusable, auditable spreadsheet models with dynamic formulas and summary views.  
**Prerequisites:** F02, F05; comfortable with formulas and basic tables.

**Core topics:** XLOOKUP, SUMIFS and LET; FILTER, UNIQUE and SORT; Tables and PivotTables; Validation and dashboard usability.

**Teach the concept:** As workbooks grow, avoid copying the same hard-coded formula into many cells. Structured references name the business fields, XLOOKUP connects a fact table to a dimension, SUMIFS aggregates with explicit conditions, and LET assigns readable names to parts of a calculation. Dynamic arrays spill variable-sized results into adjacent cells; keep the spill area free. Validate each formula against a manually checked small dataset, and put the data grain and refresh date on the dashboard.

**Business case study:** A shop receives new rows daily. The owner needs completed revenue by region, with a product lookup for cost and a gross-margin KPI that updates after new orders.

**Guided practical walkthrough:**
1. Create named Excel Tables for Orders and Products.
2. Use XLOOKUP to populate unit cost and LET to name intermediate metrics.
3. Build a PivotTable or SUMIFS summary with month and region filters.
4. Compare dashboard totals against the raw table and document omissions.

**Worked example:**

```text
=LET(sales, SUMIFS(Orders[Revenue],Orders[Status],"Completed"), cost, SUMIFS(Orders[Cost],Orders[Status],"Completed"), IFERROR((sales-cost)/sales,0))
```

**How to interpret the result:** Gross margin is (revenue−cost)/revenue, not profit divided by cost. A zero-revenue case needs deliberate handling rather than a hidden error.

**Five-minute mobile micro-project:** Given completed sales of 200,000 and cost of 150,000, calculate gross margin and explain the denominator.

**Model answer:** 25%: (200,000−150,000)/200,000. Revenue is the denominator because margin is the share of sales retained after costs.

**Common mistake:** Gross margin differs from net margin; spill formulas do not work identically in every older Excel version.

**Next step:** Take Excel weeks 4–10, then progress to dbt and warehouse modelling.

### I02 · Relational SQL: joins, CTEs and windows
**Discipline:** Analytics  
**Primary tools:** SQL / SQLite  
**Learning objective:** Write trustworthy multi-table analyses while preventing duplicated revenue and misplaced filters.  
**Prerequisites:** F03; SELECT, WHERE and ORDER BY.

**Core topics:** Join cardinality and grain; GROUP BY and HAVING; CTEs and window functions; NULL-safe reconciliation.

**Teach the concept:** A join combines tables based on related keys, but it can also multiply rows: an order with three lines appears three times after joining headers to lines. Know the grain of each table before aggregating. A CTE makes multi-step logic readable; a window function calculates rankings or running totals without collapsing individual rows. Validate against a known source total and count distinct business keys after any join.

**Business case study:** A retailer keeps Orders(order_id, region) and Lines(order_id, product_id, amount). Operations wants revenue by region and the top-selling product without counting each header repeatedly.

**Guided practical walkthrough:**
1. Check uniqueness on the order and line keys.
2. Join lines to orders and sum line amount by region.
3. Use a CTE to aggregate product revenue.
4. Use DENSE_RANK over revenue to identify top products and reconcile totals.

**Worked example:**

```text
WITH product_sales AS (SELECT product_id, SUM(amount) AS revenue FROM lines GROUP BY product_id) SELECT product_id,revenue,DENSE_RANK() OVER (ORDER BY revenue DESC) AS rank_no FROM product_sales;
```

**How to interpret the result:** The ranking is across products because the window has no PARTITION BY. Add PARTITION BY region only after a region column exists in the grouped result.

**Five-minute mobile micro-project:** A header has total 100 and three line records of 20,30,50. Why does SUM(header.total) after a join return 300, and what would you sum instead?

**Model answer:** The header value repeats on every line (3×100). Sum line amount = 100, or pre-aggregate at order grain before joining.

**Common mistake:** SELECT DISTINCT is not a reliable fix for a bad join; it may hide duplicate records instead of reconciling the grain.

**Next step:** Take SQL weeks 4–10 and write reconciliation tests.

### I03 · Power Query and repeatable ETL
**Discipline:** Data Engineering  
**Primary tools:** Excel, Power BI, Power Query  
**Learning objective:** Create a refreshable extract-transform-load flow with explicit cleaning and quality checks.  
**Prerequisites:** F02, F06; basic spreadsheet transformations.

**Core topics:** Connectors and type inference; Append, merge and unpivot; M transformations and parameters; Refresh validation and error handling.

**Teach the concept:** Power Query records a reproducible set of transformation steps. First inspect source fields and types, then apply changes deliberately: parse dates with the right locale, remove or flag invalid values, append similar files and merge dimension fields using verified join keys. Unpivot repeated month columns into tidy rows before analysis. A good pipeline is idempotent: rerunning it with the same input produces the same output. Record input row counts and exceptions so refresh failures are visible.

**Business case study:** A training company collects Jan and Feb attendance files, but one file writes dates as DD/MM/YYYY and the other as ISO dates. The owner wants one monthly participation report.

**Guided practical walkthrough:**
1. Append the files without deleting source copies.
2. Apply date parsing per source and normalize status codes.
3. Merge the course lookup on a unique course ID.
4. Group monthly counts and log invalid rows.

**Worked example:**

```text
M example: Table.TransformColumnTypes(Source, {{"Date", type date}, {"Attended", Int64.Type}}, "en-GB")
```

**How to interpret the result:** The locale affects how dates are parsed, not merely how they display. A mistaken locale can silently move attendance between months.

**Five-minute mobile micro-project:** Describe why January and February data should be appended rather than merged when the columns represent the same fields.

**Model answer:** Append stacks rows for the same schema; merge adds columns using key matches. Check the combined row count equals the input counts, less documented exclusions.

**Common mistake:** Removing errors silently makes totals unreliable; inspect the cause and report exclusions.

**Next step:** Take the Power Query course and learn orchestration at A-level.

### I04 · Python pandas and exploratory analysis
**Discipline:** Data Science  
**Primary tools:** Python, pandas  
**Learning objective:** Profile, clean and summarize a dataset with reproducible code and interpretable outputs.  
**Prerequisites:** F04–F06; functions, lists and descriptive statistics.

**Core topics:** Reading CSV and dataframes; Types, missing values and groupby; Merges and deduplication; EDA charts and notebooks.

**Teach the concept:** A pandas DataFrame is an in-memory table with labelled columns. Loading a CSV is not the same as validating it: check dtypes, null counts, duplicates and business keys before computing a result. GroupBy summarizes by categories, while merge can accidentally duplicate records when a lookup key is not unique. A notebook should explain why each transformation is appropriate, not only display the output. For reproducibility, freeze the sample dataset, seed any randomized steps and keep assertions on known totals.

**Business case study:** You receive 200 synthetic orders with region, status, amount and refund. The business wants net revenue by region and a list of suspicious duplicates.

**Guided practical walkthrough:**
1. Read the file and inspect shape, dtypes and nulls.
2. Flag duplicate order IDs and resolve them with a documented rule.
3. Define net revenue and filter completed orders.
4. Group by region, check source totals, and plot a labelled comparison.

**Worked example:**

```text
net = df.loc[df['status'].eq('Completed')].assign(net=lambda x:x.amount-x.refund); net.groupby('region')['net'].sum()
```

**How to interpret the result:** `net` must be defined at a consistent row grain; subtracting refunds from unrelated rows would overstate or understate revenue.

**Five-minute mobile micro-project:** Explain why `df.drop_duplicates()` without a business key can be dangerous on an order dataset.

**Model answer:** Identical-looking rows may reflect real repeated purchases, while two versions of one ID may differ. Verify an order key and update policy before deduplicating.

**Common mistake:** EDA patterns are observations, not causal findings; redact or synthesize personal data in shared notebooks.

**Next step:** Continue to statistical inference, forecasting and production ML.

### I05 · Power BI modelling and DAX
**Discipline:** Business Intelligence  
**Primary tools:** Power BI, DAX  
**Learning objective:** Build correct measures that respond predictably to filters and support business decisions.  
**Prerequisites:** F02, F05, F07 and basic SQL joins.

**Core topics:** Facts, dimensions and star schema; CALCULATE and filter context; Measures vs calculated columns; Date tables and report interaction.

**Teach the concept:** A Power BI report depends on its semantic model. Store transactions in fact tables and descriptive attributes in dimension tables with clear one-to-many relationships. Measures calculate at query time in the filter context created by slicers and visuals; calculated columns materialize during refresh. CALCULATE changes filter context, so denominator choice requires care. A robust report reconciles grand totals and makes users aware of the time window and units.

**Business case study:** A workforce report measures assigned hours against available hours by team. Management asks whether 80% team utilization means each person is near 80%.

**Guided practical walkthrough:**
1. Model Resources, Dates and Allocations with documented keys.
2. Write total assigned and available hours measures.
3. Calculate weighted utilization with DIVIDE.
4. Test a single resource, then team and date slicers and compare totals.

**Worked example:**

```text
Utilization % = DIVIDE(SUM(Allocations[AssignedHours]), SUM(Capacity[AvailableHours]))
```

**How to interpret the result:** The team ratio is weighted by available hours, not necessarily the unweighted average of individual utilization percentages.

**Five-minute mobile micro-project:** Two people have 20/40 and 36/40 assigned hours. Calculate weighted team utilization.

**Model answer:** (20+36)/(40+40) = 70%. The arithmetic average of 50% and 90% also happens to be 70% here because capacity is equal.

**Common mistake:** Be careful with many-to-many relationships and denominators altered by filters; validate each context.

**Next step:** Take Power BI weeks 3–10 and progress to enterprise modelling.

### I06 · Tableau and evidence-led storytelling
**Discipline:** Business Intelligence  
**Primary tools:** Tableau  
**Learning objective:** Build an interactive, accessible view that guides users from an observation to a next action.  
**Prerequisites:** F05, F07; comfort with categorical and time-series data.

**Core topics:** Marks, encodings and chart choice; Calculated fields, LOD and table calculations; Parameters, filters and actions; Dashboard accessibility and narrative.

**Teach the concept:** Tableau creates views by combining dimensions, measures and visual encodings. First decide the unit of analysis, then place a metric in the view and test the aggregation. Tableau LOD calculations fix or change the aggregation scope independently of some view details; table calculations operate over the marks in the rendered partition. Interactive filters should clarify the result rather than make it impossible to compare periods. Provide explicit units, colour-safe labels and tooltips with key definitions.

**Business case study:** A retail operations analyst wants to identify which branch is falling behind the prior quarter. A dashboard should let a manager filter region, inspect the branch, and read the relevant contribution to the decline.

**Guided practical walkthrough:**
1. Create a trend with correctly ordered dates.
2. Build a region comparison and a metric definition tooltip.
3. Add a parameter or action to inspect one branch.
4. Add a short caveat and check dashboard behaviour at mobile width.

**Worked example:**

```text
Example calculated field: SUM([Sales]) / SUM([Orders]) — only valid as average order value if [Orders] is a suitable count field at the intended grain.
```

**How to interpret the result:** Dividing two aggregated measures is often preferable to averaging per-row ratios. Confirm what an order count represents.

**Five-minute mobile micro-project:** Create a title and insight sentence for a dashboard where Branch A declines from 100k to 85k.

**Model answer:** “Branch A net sales fell 15% quarter over quarter (100k → 85k); inspect traffic and returns before attributing the change.”

**Common mistake:** Using an LOD expression does not automatically fix erroneous joins or mismatched grain.

**Next step:** Take Tableau weeks 4–10 and compare with Power BI modelling.

### I07 · Inference and experiment literacy
**Discipline:** Data Science  
**Primary tools:** Excel, Python  
**Learning objective:** Interpret confidence intervals, p-values and experiment designs without overstating conclusions.  
**Prerequisites:** F05; percentages and basic probability.

**Core topics:** Sampling and confidence intervals; Hypotheses and p-values; Effect sizes and power; Randomization, confounders and segmentation.

**Teach the concept:** Statistical inference uses sample data to estimate a population quantity under stated assumptions. A confidence interval expresses uncertainty using a procedure that would cover the true fixed value at its advertised rate over repeated samples. A p-value describes how surprising a statistic would be if a null model were true; it is not the probability that the null is true. Before trusting an A/B experiment, verify random assignment, sample size, eligibility and a pre-selected primary metric.

**Business case study:** A website tests a shorter checkout. Version A converts 20 of 100 visitors and B converts 24 of 100. The team wants to declare a winner immediately.

**Guided practical walkthrough:**
1. Define eligible visitors and conversion before calculating.
2. Compute the observed conversion rates.
3. State the absolute difference and what uncertainty remains.
4. Discuss sample size, randomization and what a significance test would assess.

**Worked example:**

```text
A = 20%, B = 24%; observed lift = +4 percentage points (relative lift +20%). This alone is not proof of a repeatable improvement.
```

**How to interpret the result:** An apparent 20% relative lift sounds substantial, but only four additional conversions occurred in these small samples.

**Five-minute mobile micro-project:** Explain the difference between +4 percentage points and +20% relative lift in this example.

**Model answer:** Absolute difference = 24%−20% = 4 points; relative lift = (24−20)/20 = 20% measured against A.

**Common mistake:** Never stop an experiment early just because the current p-value looks favourable without a valid sequential design.

**Next step:** Continue to advanced A/B testing and causal inference.

### I08 · Git and reproducible analysis
**Discipline:** Data Engineering  
**Primary tools:** Git, Python, SQL  
**Learning objective:** Maintain versioned, reviewable work with tests and a lightweight change log.  
**Prerequisites:** F03 or F04; a small working SQL or Python script.

**Core topics:** Git add, commit, branch and merge; README and environment files; Tests and reproducibility; Review workflows and secret hygiene.

**Teach the concept:** Version control tells you what changed, why, and when, making analysis auditable. A repository should keep code, sample synthetic inputs, instructions and tests while excluding secrets and raw personal data. Use descriptive commits, feature branches for experimentation and peer review before merging. Record tool versions and assumptions so another analyst can reproduce the results. A correct analysis with no provenance is hard to maintain or defend.

**Business case study:** Two analysts share a weekly revenue query. One quietly changes how refunds are handled; the reported number changes without an explanation.

**Guided practical walkthrough:**
1. Create a repository with a README and synthetic sample.
2. Commit the initial query and expected total.
3. Create a branch for refund handling and add a test.
4. Review the diff, explain the changed metric and merge.

**Worked example:**

```text
Example commit flow: git switch -c fix/refunds; git add revenue.sql tests/; git commit -m "Account for completed-order refunds"
```

**How to interpret the result:** The test should record an expected result and fail if a future edit changes it accidentally.

**Five-minute mobile micro-project:** Write a one-line commit message for fixing a duplicate join and list two files that should never be committed.

**Model answer:** Commit: “Fix order-line fanout in revenue calculation”. Exclude .env with API secrets and raw customer exports.

**Common mistake:** Git does not replace secure backups or data-access permissions; never place credentials in a training repository.

**Next step:** Continue to dbt projects and CI/CD.

## Level 3: Advanced — Specialized Mastery

### A01 · Production SQL and query performance
**Discipline:** Data Engineering  
**Primary tools:** PostgreSQL, SQL Server, Snowflake  
**Learning objective:** Tune and verify analytic queries without sacrificing correctness.  
**Prerequisites:** I02, I08; fluency with joins and window functions.

**Core topics:** Execution plans, scans and joins; Indexes, partitions and pruning; Incremental logic and SCDs; Reconciliation and query tests.

**Teach the concept:** Production SQL must be both correct and efficient. The optimizer selects a plan using table statistics, estimated cardinality and available access paths. Examine actual plans and measure the bottleneck before creating indexes or rewriting queries. Filter early when possible, keep predicates searchable, and distinguish OLTP index design from warehouse partition pruning. A slowly changing dimension preserves history so a transaction can be reported using the category valid at the time. Every optimization must preserve row counts and business totals.

**Business case study:** A daily sales dashboard is slowing as the orders table reaches millions of rows. A developer suggests adding DISTINCT to every join, masking duplicated revenue rather than fixing the data model.

**Guided practical walkthrough:**
1. Capture baseline timing and reconciled totals.
2. Inspect the explain plan for large scans or many-to-many joins.
3. Rewrite the join at a documented grain and test date pruning.
4. Compare execution time, rows and totals after changes.

**Worked example:**

```text
SELECT region, SUM(net_amount) FROM fact_orders WHERE order_date >= DATE '2026-01-01' GROUP BY region;  -- Verify pruning/partition choice in the actual target engine.
```

**How to interpret the result:** Query syntax and date types differ by engine. Correctness must be checked independently of performance.

**Five-minute mobile micro-project:** An order header of 400 joins to four lines. Why is SUM(header_amount) = 1,600 and what source should control the total?

**Model answer:** The header repeats four times. Aggregate transaction line amounts or a one-row-per-order intermediate table, then reconcile the result to 400.

**Common mistake:** An index that speeds a demo may slow writes or be ignored by a columnar cloud warehouse.

**Next step:** Continue to A02 and A08 for governed transformations.

### A02 · Analytics engineering with dbt and Snowflake
**Discipline:** Data Engineering  
**Primary tools:** dbt, Snowflake, SQL  
**Learning objective:** Build a tested, documented warehouse transformation project that preserves metric meaning.  
**Prerequisites:** I02 and I08; query validation and Git basics.

**Core topics:** Staging, intermediate and marts; dbt models, refs and sources; Unique/not-null/relationship tests; Incremental models, lineage and docs.

**Teach the concept:** Modern analytics engineering treats transformations like software. Stage source fields without altering business logic, use intermediate models for reusable joins and build marts at clearly defined grains. In dbt, `ref()` expresses dependencies between models; source declarations document upstream tables. Test uniqueness, relationships and accepted values to detect silent data errors before a dashboard reads them. Decide when a view, table or incremental materialization is appropriate; incremental updates require a sound unique key and late-arriving record strategy.

**Business case study:** A subscription service calculates monthly recurring revenue in three dashboards, each with slightly different refund rules. An analytics engineer creates one reviewed revenue mart and publishes its definition.

**Guided practical walkthrough:**
1. Define raw sources and a staging contract.
2. Build customer and transaction staging models.
3. Create a monthly revenue mart with an explicit grain.
4. Add tests, documentation and a reconciliation query before deploying.

**Worked example:**

```text
dbt source example: SELECT customer_id, SUM(net_amount) AS net_revenue FROM {{ ref('stg_payments') }} GROUP BY customer_id;  -- model tests must enforce customer_id uniqueness in the output.
```

**How to interpret the result:** Whether the model is at customer or customer-month grain is part of the contract; date must be included if the latter is intended.

**Five-minute mobile micro-project:** Choose two data tests for a customer revenue mart and say what each catches.

**Model answer:** Unique customer_id detects unexpected duplicate rows; not_null customer_id prevents unassignable revenue. Add relationship checks where dimensions are required.

**Common mistake:** Modelling tools cannot compensate for an undefined KPI or incorrect source grain.

**Next step:** Explore certified metrics, lineage and CI alongside governance.

### A03 · Orchestrate resilient data pipelines
**Discipline:** Data Engineering  
**Primary tools:** Airflow, Fabric Data Factory, SQL  
**Learning objective:** Design a scheduled pipeline with retries, dependencies and observable data-quality checks.  
**Prerequisites:** I03, I08; reproducible transformations.

**Core topics:** DAGs and dependency order; Idempotent tasks and backfills; Retries, SLAs and alerts; Watermarks and schema drift.

**Teach the concept:** A data pipeline is a directed flow of tasks, not a collection of unrelated scripts. An orchestrator coordinates ingestion, transformation, quality checks and publishing while recording what ran and when. Design each task to be safe to retry: processing the same date twice should not double sales. Watermarks track how far data has arrived; backfills recompute a bounded period after late data. Use failure alerts based on business impact, not just whether a job exited with code zero.

**Business case study:** A retailer receives a daily order file at 02:00. A dashboard refresh at 02:05 sometimes reports incomplete revenue because delivery is late.

**Guided practical walkthrough:**
1. Define a freshness threshold and arrival check.
2. Ingest only once per batch ID and record row counts.
3. Run transformations and validation after ingestion succeeds.
4. Publish after validation and alert if freshness or totals fail.

**Worked example:**

```text
DAG: wait_for_file → ingest_raw → validate_schema → transform_daily → reconcile_totals → publish_report.
```

**How to interpret the result:** If validation fails, the publishing task should not run; the previous confirmed dataset should remain available with a freshness warning.

**Five-minute mobile micro-project:** What happens when the 01 Nov file arrives late after the 02 Nov run, and how would you repair the date window?

**Model answer:** Use a bounded backfill for affected partitions, rerun idempotent tasks and reconcile final totals before republishing. Do not insert duplicate batches.

**Common mistake:** Blind retries can multiply records or overload source systems if tasks are not idempotent.

**Next step:** Move to A04 for cloud architectural decisions.

### A04 · Cloud and lakehouse architecture
**Discipline:** Data Engineering  
**Primary tools:** Azure/Fabric, AWS, GCP  
**Learning objective:** Choose storage, processing and access patterns that fit cost, scale, governance and workload.  
**Prerequisites:** I02, I03, I08; SQL and ETL fundamentals.

**Core topics:** Object storage vs databases; Warehouse vs lakehouse; IAM, networks and encryption; Cost, scaling and regional residency.

**Teach the concept:** Cloud architecture is a sequence of trade-offs rather than one magic service. Object storage handles large durable files; a warehouse offers managed SQL analytics; a lakehouse combines file-based storage with table reliability and computational engines. Separate raw, curated and serving layers and document who can read each. Use least-privilege roles, retention policies and encryption. Choose services according to volume, freshness, concurrency and budget; a small batch workload may not justify an expensive streaming cluster.

**Business case study:** A regional health NGO wants monthly aggregate reports from three offices. Data includes personally identifying records and must be accessible only to an approved team.

**Guided practical walkthrough:**
1. Classify raw and aggregate fields and residency rules.
2. Sketch landing, curated and reporting layers.
3. Assign restricted IAM roles and retention policies.
4. Estimate workload costs and pick an appropriately simple engine.

**Worked example:**

```text
Architecture: restricted bucket → ingestion job → curated table with pseudonymized IDs → SQL reporting view with aggregated counts.
```

**How to interpret the result:** Distributing dashboards does not require publishing the raw person-level data. Access controls must be enforced at the storage and query layers.

**Five-minute mobile micro-project:** Name one reason to choose a warehouse over a Spark cluster for a small daily reporting workload.

**Model answer:** A managed warehouse can run familiar SQL with fewer operational components and often lower total maintenance burden for small, structured batch queries.

**Common mistake:** Never place secret keys in front-end code or treat region selection as a purely technical preference.

**Next step:** Continue to L4 governance, Spark and streaming.

### A05 · Supervised machine learning that generalizes
**Discipline:** Data Science  
**Primary tools:** Python, scikit-learn  
**Learning objective:** Build and evaluate a baseline model with leakage prevention and an honest test set.  
**Prerequisites:** I04 and I07; pandas and probability.

**Core topics:** Target and feature definition; Train/validation/test split; Regression vs classification; Metrics, bias and leakage.

**Teach the concept:** Machine learning learns statistical patterns from examples; it does not inherently uncover causal rules. Define the prediction target and decision deadline first, so you do not include future information as a feature. Split data according to the use case: time-based data often needs temporal validation rather than random splitting. Begin with a simple baseline, choose metrics aligned with error costs, and inspect performance across groups. Document model limitations and never claim a strong accuracy score without saying what dataset produced it.

**Business case study:** A shop predicts next-week stockouts from prior sales and supply lead time. Using the actual future stockout quantity as a feature produces an unrealistic near-perfect model.

**Guided practical walkthrough:**
1. Define the point of prediction and available features.
2. Build a time-based holdout set.
3. Train a simple classifier against a no-skill baseline.
4. Compare precision/recall on a held-out period and check leakage.

**Worked example:**

```text
If 8 out of 10 predicted stockouts are genuine, precision = 80%. If there were 20 actual stockouts and the model found 8, recall = 40%.
```

**How to interpret the result:** An 80% precision model may still miss most stockouts. Choose a threshold based on the cost of missed shortages versus false alarms.

**Five-minute mobile micro-project:** Which metric is more useful if missing a stockout is very costly: precision or recall, and why?

**Model answer:** Recall is usually prioritized because it measures how many actual stockouts were found; still monitor precision so false alarms remain manageable.

**Common mistake:** Do not normalize or impute using all rows before splitting; it leaks test information into training.

**Next step:** Continue to L4 MLOps, drift and responsible deployment.

### A06 · A/B testing and causal evidence
**Discipline:** Data Science  
**Primary tools:** Python, SQL, experimentation  
**Learning objective:** Design, analyze and communicate an experiment with a valid primary metric.  
**Prerequisites:** I07; sample inference, proportions and business metrics.

**Core topics:** Randomization and eligibility; Sample size and detectable effect; Confidence intervals and peeking; Guardrail metrics and subgroup bias.

**Teach the concept:** Controlled experiments attempt to estimate a treatment effect by comparing randomized groups. Define the hypothesis, allocation unit, primary metric and stopping rule before launch. Check whether users remain in assigned groups and whether sample ratios match the plan. A result can be statistically detectable but economically unimportant, or useful but too uncertain to make a decision. Watch guardrails such as refunds and latency so optimizing one metric does not cause collateral damage.

**Business case study:** A checkout layout test appears to increase conversion, but the treatment group receives fewer mobile users due to a tracking bug.

**Guided practical walkthrough:**
1. Pre-register the conversion outcome and mobile guardrails.
2. Audit randomization and sample-ratio balance.
3. Calculate effect size and an appropriate uncertainty interval.
4. Decide whether to ship, extend or invalidate the experiment and document the rationale.

**Worked example:**

```text
A converts 200/1,000 = 20%; B converts 220/1,000 = 22%. Observed uplift = +2 percentage points, or +10% relative.
```

**How to interpret the result:** The difference is an estimate. Statistical confidence requires an uncertainty calculation and a valid randomization and measurement process.

**Five-minute mobile micro-project:** Treatment causes refunds to rise from 1% to 4%. Should a conversion lift alone justify rollout?

**Model answer:** No. Evaluate the refund guardrail and business value; a higher conversion rate may be offset by costly negative effects.

**Common mistake:** A significant p-value does not repair broken assignment, multiple unplanned analyses or a biased measurement pipeline.

**Next step:** Continue to causal methods and monitoring.

### A07 · Time series and forecasting
**Discipline:** Data Science  
**Primary tools:** Python, SQL, Power BI  
**Learning objective:** Build a defensible forecast with seasonal baselines and error analysis.  
**Prerequisites:** I04 and I07; date handling and descriptive statistics.

**Core topics:** Trends, cycles and seasonality; Time-based backtesting; MAE, MAPE and sMAPE; Scenario and prediction intervals.

**Teach the concept:** Forecasting is about predicting future observations using information available at the forecast origin. Begin with a naive or seasonal-naive baseline; complex models are only useful when they outperform this. Keep the training and evaluation periods ordered in time to prevent future leakage. Measure accuracy using an appropriate metric: percentage error is unstable around zero, while mean absolute error remains interpretable in original units. Explain uncertainty and the operational cost of over- or under-forecasting.

**Business case study:** A warehouse forecasts weekly demand for a product that sells more during holidays. A random train/test split mixes future holiday patterns into the past and overstates accuracy.

**Guided practical walkthrough:**
1. Visualize demand by week and annotate major events.
2. Define the horizon and seasonal baseline.
3. Backtest on successive future windows.
4. Compare MAE and bias; describe limitations and uncertainty.

**Worked example:**

```text
Actual demand [100,120] and forecasts [90,130] yield absolute errors [10,10] and MAE = 10 units.
```

**How to interpret the result:** A MAE of 10 is only useful compared with stockout and inventory costs and a baseline such as last-week demand.

**Five-minute mobile micro-project:** If a model systematically underforecasts holiday weeks by 20 units, what operational risk follows?

**Model answer:** Understocking and missed sales; add an event/holiday indicator or increase safety stock while validating on past holiday windows.

**Common mistake:** Do not evaluate time-series models on randomly shuffled data or declare precision without uncertainty.

**Next step:** Continue to ML deployment and alerting.

### A08 · Data contracts, quality tests and CI/CD
**Discipline:** Data Engineering  
**Primary tools:** dbt, GitHub Actions, Great Expectations  
**Learning objective:** Enforce reliable schemas, freshness and business reconciliations before publishing downstream data.  
**Prerequisites:** I03, I08 and A02; SQL transformations and Git workflow.

**Core topics:** Schema and semantic contracts; Freshness and uniqueness tests; CI pipelines and staged release; Incidents, backfills and lineage.

**Teach the concept:** Production pipelines fail in ways that look like success: a source adds a new status code, a late partition arrives, or a join quietly doubles transactions. A data contract defines expected types, allowed keys and freshness standards between teams. Test each layer’s correctness and reconcile significant business totals before releases. CI runs checks on every change; deployment promotion should be possible to reverse, with incident owners and clear rollback procedures.

**Business case study:** An upstream team changes amount from numeric to formatted text. Reports still refresh but net revenue becomes null for part of the month.

**Guided practical walkthrough:**
1. Define amount type and non-null rules in a source contract.
2. Add a duplicate-key and daily total check.
3. Run tests in CI against representative fixtures.
4. Quarantine invalid batches and publish a failure status instead of a misleading total.

**Worked example:**

```text
Example test: number of completed orders in curated data = source completed order count ± documented exclusions.
```

**How to interpret the result:** A quality test should express a business invariant, not only the absence of SQL exceptions.

**Five-minute mobile micro-project:** Give one semantic test a report should pass before being released, beyond checking a column data type.

**Model answer:** Revenue reconciles within a documented tolerance to the source ledger for the same dates, status rules and currency; explain deviations.

**Common mistake:** Passing unit tests does not guarantee correctness if they only assert that code runs rather than what numbers mean.

**Next step:** Continue to real-time observability and governance.

## Level 4: Expert — Industry Systems

### E01 · Distributed computing with Spark
**Discipline:** Data Engineering  
**Primary tools:** Apache Spark, Databricks, Fabric  
**Learning objective:** Explain partitioned execution and choose Spark operations that avoid unnecessary shuffles.  
**Prerequisites:** A01, A03, A04; SQL, partitioning and pipelines.

**Core topics:** Driver, executors and partitions; Spark DataFrames and SQL; Shuffle, skew, broadcast joins; Delta/Iceberg table formats and optimization.

**Teach the concept:** Spark distributes data processing across worker executors. Operations such as filtering and simple projections are often local to partitions; joins and groupings may trigger a network shuffle. Big data performance depends on data size, partition layout and key distribution—not only writing short code. DataFrame transformations are lazy until an action runs. Open table formats can add transaction semantics and schema evolution to object storage, but each format has its own feature support and operational trade-offs.

**Business case study:** A telecom data lake receives millions of call records daily. Grouping by country works, but one extremely common country key slows a shuffle stage and causes skew.

**Guided practical walkthrough:**
1. Describe the record grain and daily partition strategy.
2. Inspect stage metrics and locate the skewed grouping key.
3. Filter early and consider targeted salting or re-partitioning only after measurement.
4. Validate total record counts and billable amounts after tuning.

**Worked example:**

```text
Pseudocode: df.filter("date >= date_sub(current_date(), 7)").groupBy("region").count() — partition pruning requires matching the physical layout.
```

**How to interpret the result:** Running groupBy can produce a shuffle. Verify skew using task metrics; repartitioning blindly may increase costs.

**Five-minute mobile micro-project:** Why does one very frequent join key cause slow tasks even when many executors are available?

**Model answer:** Rows with the same key may concentrate in a few partitions, creating long-running straggler tasks and unbalanced work.

**Common mistake:** Caching every DataFrame can exhaust memory; do not assume a cloud cluster removes data-quality responsibilities.

**Next step:** Continue to E07 for scalable lakehouse lifecycle design.

### E02 · Streaming analytics with Kafka
**Discipline:** Data Engineering  
**Primary tools:** Kafka, Spark Structured Streaming  
**Learning objective:** Design a near-real-time event flow with defined delivery guarantees and late-event handling.  
**Prerequisites:** A03, A04 and E01; batch ETL and distributed concepts.

**Core topics:** Brokers, topics and partitions; Consumer groups and offsets; Event time, watermarks and windows; Idempotency and exactly-once trade-offs.

**Teach the concept:** Streaming systems read an unbounded flow of events and update results as new information arrives. Kafka topics are partitioned append-only logs; consumer groups coordinate readers and manage offsets. Differentiate event time (when something happened) from processing time (when the system saw it). Watermarks limit how long late events can revise an aggregate. Delivery guarantees depend on the entire pipeline, including external sinks; claiming “exactly once” without end-to-end evidence is unsafe.

**Business case study:** A payments platform flags a surge of failed transactions over five-minute event-time windows. Network delays cause some failures to arrive after their original interval.

**Guided practical walkthrough:**
1. Define an event key and event-time field.
2. Choose topic partitions and a consumer group.
3. Aggregate per event-time window with a documented watermark.
4. Write idempotently to the sink and monitor lag and missing partitions.

**Worked example:**

```text
If failures per five-minute window increase from 10 to 35, the observed increment is 25; alert thresholds should also account for volume and known outages.
```

**How to interpret the result:** A late event may update an earlier window if it arrives within the allowed lateness; outside it, the system needs a documented policy.

**Five-minute mobile micro-project:** Explain why counting consumed messages without deduplicating by stable transaction ID can overstate payments.

**Model answer:** At-least-once delivery may replay an event after retries. Use an idempotent sink or dedupe by event ID and explain any retention window.

**Common mistake:** Kafka does not automatically guarantee one row per business event in every downstream database.

**Next step:** Continue to E08 incident exercises and observability.

### E03 · MLOps: deployment and monitoring
**Discipline:** Data Science  
**Primary tools:** MLflow, Python, CI/CD  
**Learning objective:** Operate a model with reproducible versions, drift checks, monitoring and rollback.  
**Prerequisites:** A05, A08; model evaluation and pipeline quality.

**Core topics:** Model registry and experiment tracking; Feature/target leakage safeguards; Batch vs online serving; Data drift, fairness and monitoring.

**Teach the concept:** An accurate notebook is not a production model. Production requires pinned dependencies, artifact and data versioning, tested feature transformations, and monitored serving. Separate prediction latency, error rate, feature distributions and real-world target quality because drift may occur long before labels become available. Define rollback criteria and an owner for investigations. Monitor error slices for affected groups; aggregate accuracy can hide systematic failures for a smaller population.

**Business case study:** A churn predictor trained on last year’s users degrades when the subscription product changes. Weekly serving continues without an error, but accuracy drops in a new user segment.

**Guided practical walkthrough:**
1. Register model version and training data signature.
2. Deploy with monitored feature schema and latency.
3. Compare incoming features with training distribution and evaluate labelled outcomes.
4. Trigger investigation, fallback or rollback when guardrails fail.

**Worked example:**

```text
A model with overall 90% accuracy but 55% accuracy on a new segment requires slice-level review even if its global KPI looks healthy.
```

**How to interpret the result:** Operational monitoring is broader than model accuracy: track drift, outages, missing features, outcomes and business costs.

**Five-minute mobile micro-project:** Name two signals to monitor before delayed ground-truth labels are available.

**Model answer:** Input schema/feature drift and serving latency or error rate; label-based precision/recall cannot be trusted until labels arrive.

**Common mistake:** Retraining automatically on unvalidated drift can reinforce bias or learn from corrupted data.

**Next step:** Continue to E04 and responsible AI controls.

### E04 · Deep learning, embeddings and RAG
**Discipline:** AI / ML  
**Primary tools:** PyTorch, embeddings, vector search  
**Learning objective:** Explain neural models and build a source-grounded retrieval-augmented question-answering prototype.  
**Prerequisites:** A05 and Python fluency; E03 recommended.

**Core topics:** Neural network training and overfitting; Tokenization and embeddings; Vector retrieval and chunking; RAG citations and evaluation.

**Teach the concept:** Deep learning uses trainable layered representations to capture complex relationships. Large language models generate tokens conditioned on context and do not verify truth by default. Retrieval-augmented generation first searches a document corpus, then gives relevant passages to the model as supporting context. The system must evaluate retrieval accuracy separately from answer correctness and abstain when documents do not support a claim. Embeddings encode semantic similarity, not legal permission or factual reliability.

**Business case study:** A company wants an internal policy assistant. A naive chatbot invents a leave allowance. A retrieval-based assistant must answer from approved, versioned HR policy paragraphs with citations.

**Guided practical walkthrough:**
1. Split approved policy text into labelled chunks.
2. Embed and index chunks with restricted access metadata.
3. Retrieve relevant chunks and instruct the model to cite them.
4. Test answer accuracy, missing-answer abstention and document permissions.

**Worked example:**

```text
Question: “How many days of leave?” If no retrieved policy passage states a number, a correct response is “The available policy excerpts do not specify the allowance.”
```

**How to interpret the result:** Responding with a plausible generic leave figure is a failure because it is not grounded in the organization’s source.

**Five-minute mobile micro-project:** Explain one reason a semantic search result can be relevant but still unsafe to display.

**Model answer:** The passage may be outdated, restricted to another team or contain confidential data. Enforce document access and effective-date checks.

**Common mistake:** RAG reduces some hallucinations but cannot eliminate them; prompt text never substitutes for access controls.

**Next step:** Continue to E05 prompt evaluation and E06 governance.

### E05 · Prompt engineering, GenAI evaluation and agents
**Discipline:** AI / ML  
**Primary tools:** LLM API, Python, evaluation sets  
**Learning objective:** Use generative AI to support data work while proving correctness and controlling tool access.  
**Prerequisites:** I04, I08 and E04; SQL/Python basics.

**Core topics:** Task framing and structured outputs; Verification against known totals; Prompt injection and tool permissions; Evaluation sets, costs and human review.

**Teach the concept:** A productive data prompt provides context, input schema, allowed methods, output format, and checks. Asking a model to “analyze the data” is less reliable than asking for specific SQL with a known definition and an expected reconciliation test. Evaluate the model on representative examples, including adversarial inputs and deliberate missing data. If an agent can call tools, limit its permissions and separate read actions from approvals to publish or mutate records. Generated charts, formulas and narratives still require human validation.

**Business case study:** A reporting assistant proposes SQL that multiplies revenue after joining order headers to lines. Its explanation is eloquent, but the number fails reconciliation.

**Guided practical walkthrough:**
1. Write a task specification with table grains and metric definition.
2. Request a read-only SQL result and an accompanying validation query.
3. Compare counts and totals with a trusted fixture.
4. Log success, failure, cost and whether a reviewer approved the output.

**Worked example:**

```text
Prompt frame: “Use only the listed synthetic tables. Return SQL and a validation query. State the order grain. Do not claim the result is audited unless totals reconcile.”
```

**How to interpret the result:** The model response is a draft. Passing a deterministic assertion is stronger evidence than sounding confident.

**Five-minute mobile micro-project:** An AI query reports revenue 300 from three order lines whose actual total is 100. What test should reject it?

**Model answer:** Assert that grouped line revenue equals the source line sum (100) at the same date/status grain; flag or block the 300 result.

**Common mistake:** Never upload private records to an unapproved external AI service or let a prompt override enforced role permissions.

**Next step:** Continue to E06 security and E08 expert capstone.

### E06 · Data governance, privacy and security
**Discipline:** Data Engineering  
**Primary tools:** Cloud IAM, data catalog, policy-as-code  
**Learning objective:** Create enforceable controls for access, lineage, quality, retention and responsible data sharing.  
**Prerequisites:** F06, A04, A08; cloud access and data-quality basics.

**Core topics:** Least privilege and role-based access; Lineage, ownership and data catalogs; Retention, masking and minimization; Threat models and audit evidence.

**Teach the concept:** Data governance defines who owns information, what it means and how it may safely be used. A catalog is useful only when important fields have stewards, definitions and lineage to trusted sources. Security begins at storage and service permissions; hiding a button in the browser does not prevent direct API access. Use least privilege, row/column-level controls, encryption and rotation of credentials. Set data retention according to legal and operational requirements and prepare a clear incident response path.

**Business case study:** A university analytics app exposes learner scores. A viewer should see only their own progress, while instructors need verified access to cohorts they are assigned to.

**Guided practical walkthrough:**
1. Classify user IDs, grades and enrolment information.
2. Define role-to-data access rules at the database layer.
3. Test unauthorized direct API requests and log access.
4. Document retention and data-subject request workflows.

**Worked example:**

```text
Access matrix: Learner → own progress; Instructor → assigned cohort aggregated results; Admin → permitted management scope; Public → no private records.
```

**How to interpret the result:** The user interface should reflect permissions, but database row-level security and server checks must enforce them.

**Five-minute mobile micro-project:** Why is hiding the “Admin” menu insufficient to secure learner records?

**Model answer:** An attacker could call the database or API directly. Policies must be enforced server-side and in RLS, with tests for denied access.

**Common mistake:** Never publish real learner data in demonstrations, tests or reusable prompts.

**Next step:** Continue to E08 governance review and incident response.

### E07 · Lakehouse engineering and interoperability
**Discipline:** Data Engineering  
**Primary tools:** Delta Lake, Iceberg, Spark, SQL  
**Learning objective:** Design a scalable, maintainable lakehouse with transactional table formats and clear data contracts.  
**Prerequisites:** A02, A04, E01; warehouse models and distributed storage.

**Core topics:** Bronze/silver/gold data layers; ACID tables, compaction and evolution; Catalogs, lineage and portability; Retention, recovery and cost controls.

**Teach the concept:** Object files alone do not provide a reliable analytical table. Lakehouse formats add metadata and transactional behaviour so readers can obtain consistent snapshots during updates. A layered architecture retains raw provenance, applies validated transformations and exposes purpose-built serving tables. Catalogs help resolve which table is authoritative and who may access it. Choose table format and compute engines with compatibility, upgrade paths, file sizes and retention requirements in mind; avoid promising universal interchangeability.

**Business case study:** A business maintains a year of transaction history in object storage. Analysts repeatedly scan tiny CSV files and disagree over whether a failed load created partial totals.

**Guided practical walkthrough:**
1. Define raw landing with immutable batch identifiers.
2. Transform to validated partitioned silver transactions.
3. Publish a gold daily-revenue mart with reconciled totals.
4. Plan compaction, schema changes, snapshots and rollback testing.

**Worked example:**

```text
Example contract: gold_daily_revenue has one row per business_date and region; its sum for a day must match accepted silver transactions.
```

**How to interpret the result:** An ACID table format helps with atomic visibility but cannot validate whether a business KPI is defined correctly.

**Five-minute mobile micro-project:** What is the purpose of keeping an immutable raw/bronze layer after creating cleaned tables?

**Model answer:** It enables reprocessing, tracing source errors and auditing transformation decisions without needing to reconstruct the original input.

**Common mistake:** Do not delete historical files solely for short-term performance without checking recovery, compliance and retention needs.

**Next step:** Complete E08 with batch, streaming, BI and ML paths.

### E08 · Expert capstone: governed data product
**Discipline:** Cross-functional  
**Primary tools:** SQL, Git, cloud, BI, Spark, ML  
**Learning objective:** Explain and prototype an end-to-end data product with quality gates, secure access and monitored outcomes.  
**Prerequisites:** Complete one advanced engineering module, one analytical module and the governance module.

**Core topics:** Architectural decision records; Batch/stream ingestion and tests; Metric definitions and reporting; Model/LLM checks, incident and cost review.

**Teach the concept:** A strong portfolio capstone shows a business problem, a data contract, reproducible transformations and a measurable decision—not a collection of screenshots. State boundaries: simulated architecture is fine for a mobile learning lab, but do not claim cloud infrastructure was deployed when it was only designed. Provide a traceable chain from raw inputs through reconciled metrics to a dashboard, prediction or alert. Document failure modes, access scopes, rollback criteria and the cost/latency trade-off.

**Business case study:** A fictional logistics operator wants daily delivery KPIs, a five-minute delay alert and a stockout predictor. Records arrive from different sources with late updates and limited permissions.

**Guided practical walkthrough:**
1. Draw source, raw, curated and serving layers and specify grains.
2. Create SQL/Python pseudocode with three deterministic quality tests.
3. Propose a dashboard, event-time alert and model evaluation plan.
4. Write an access matrix, monitoring SLA and one-page incident runbook.

**Worked example:**

```text
Minimum evidence: daily on-time rate = on-time deliveries / eligible completed deliveries; reconcile eligible counts, reject negative transit time, and verify duplicate delivery IDs do not inflate results.
```

**How to interpret the result:** The product should explain what it knows, what data is missing and what failures prevent a trusted decision.

**Five-minute mobile micro-project:** A pipeline reports 95% on-time delivery but 15% of completed orders lack arrival timestamps. Should the dashboard show “verified 95%” without qualification?

**Model answer:** No. Fail or qualify the metric, publish the coverage rate and investigate missing arrivals. A valid service rate needs a defined eligible population.

**Common mistake:** Do not substitute demo diagrams for a running service or present simulated test results as production evidence.

**Next step:** Publish a portfolio README, limitations, versioned assets and an honest validation checklist.

## 5. Suggested teaching and assessment workflow

1. **Micro-lesson (3–5 min):** describe one concept with a plain-language analogy and an explicit example.
2. **Worked example (3–5 min):** identify input data, operation, output, interpretation and limitations.
3. **Guided practice (5–10 min):** use a six-row synthetic dataset or a read-only query/formula in the app.
4. **Knowledge check (2–3 min):** short diagnostic question, feedback for wrong answers and a revealed worked solution.
5. **Case application (15–45 min):** gradually extend the micro-project into a business decision, a reproducible script or an architecture sketch.
6. **Evidence checkpoint:** source-to-result reconciliation, documented assumptions, limitation statement and rubric-based review before earning a credential.

### Suggested capstone gates
- **Level 1:** clean and summarize six synthetic orders, explain the metric, show a table and a chart.
- **Level 2:** produce a refreshable business dashboard with SQL joins, checks and a short insight memo.
- **Level 3:** prototype an auditable transformation pipeline or validation-aware ML experiment with CI and tests.
- **Level 4:** architecture plus demonstrable synthetic tests for access, lineage, latency, reliability, a failure drill and human-reviewed AI behavior.

### Tool and cost safeguards
- Mobile/app exercises should work with miniature synthetic datasets. Where real Spark/Kafka/cloud access is unavailable, clearly label the activity **simulation or design exercise**.
- Optional paid cloud labs should have a published spending cap, teardown steps and free/local alternatives. Do not require credentials or real customer data for an introductory task.
- Practical assessment should measure correctness, interpretation, reproducibility and security—not simply a page visit or attractive output.

## 6. Modern reference topics (official documentation)

- Microsoft Learn, Apache Spark in Fabric: https://learn.microsoft.com/en-us/training/modules/use-apache-spark-work-files-lakehouse/
- Microsoft Learn, Fabric Data Engineering overview: https://learn.microsoft.com/en-us/fabric/data-engineering/data-engineering-overview
- dbt Developer Hub, best-practice guides: https://docs.getdbt.com/best-practices
- Google for Developers, production ML monitoring: https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring
- Microsoft Learn, Copilot in Fabric Data Engineering: https://learn.microsoft.com/en-us/training/modules/get-started-copilot-fabric-data-engineering

**Privacy and progress:** this release adds curriculum content and links only; existing Supabase tables, authentication, learner records, week progress, and assessment results are not migrated or reset.

---

<a id="source-docs-palette-premium-20261113-md"></a>
### Source: `docs/PALETTE_PREMIUM_20261113.md`

# DataLearning Premium Palette · 2026-11-13

Canonical shared tokens: ink `#06141B`, deep navy `#11212D`, slate `#253745`, steel `#4A5C6A`, neutral silver `#9BA8AB`, mist `#CCD0CF`, canvas `#FBFBF8`, cornflower `#6AA6DA`, pear `#C5E384`.

Every retained HTML route imports `assets/styles/palette-premium-20261113.css`; global tokens in `design-system.css` match this palette. The page loader uses a translucent navy/cornflower/pear gradient (22–27% alpha, about 73–78% transparent) with backdrop blur and a darker accessible text panel. Tutor's rich-text stylesheet intentionally remains the last stylesheet on tutor.html to prevent layout regressions.

Legacy brand literals in active styles and page markup were replaced. Context-specific semantic colors (success/error/chart colors), illustrations, vendor assets, and some specialized component hues remain where they convey meaning or avoid compromising contrast. Do not assume all possible hex codes in the application were eliminated. Existing authentication, user progress, and course logic were not changed. Recheck visual contrast and real browser navigation after deployment.

---

<a id="source-docs-project-file-map-md"></a>
### Source: `docs/PROJECT_FILE_MAP.md`

# Active DataLearning source map

| Path | Purpose |
| --- | --- |
| `*.html`, `courses/*.html` | Referenced public, learner and protected pages; including linked Python/AI supporting guides |
| `assets/scripts`, `assets/styles`, `assets/images`, `assets/icons` | Used browser logic, styles and visuals |
| `assets/data` | Current weekly data, curriculum and public app Tutor guide; some generated data retained for test verification |
| `downloads` | Used downloadable synthetic datasets, worksheets and learning references |
| `api/tutor.js`, `lib/tutor-context.js`, `lib/tutor-app-knowledge.js` | Authenticated AI tutor, verified guidance, server-only prompts |
| `assets/scripts/tutor-app-guide.js` | Offline learning-guide matcher that reads the public guide JSON |
| `database` | Setup and migration history retained for fresh installations and recovery; not active browser assets |
| `tests` | Build and security regression tests |
| `docs` | Current deployment/curriculum references; archived release notes removed |

The 4 still-linked Python/AI supplementary course pages remain; removing them would break the current navigation. Historical URLs for retired Intro/Excel/SQL/Power BI guide pages remain as redirects, not duplicate HTML pages.

---

<a id="source-docs-readme-md"></a>
### Source: `docs/README.md`

# DataLearning documentation hub

This is the maintained entry point for project notes. **The application source is authoritative**; release notes describe history and are not deployment instructions.

## Start here

- [Application README](../README.md): product, setup, commands and routes.
- [Project file map](PROJECT_FILE_MAP.md): directory responsibilities.
- [Route manifest](SITE_ROUTE_MANIFEST.json): published paths and redirects.
- [Curriculum blueprint](MASTER_FOUR_LEVEL_CURRICULUM_20261110.md): programme structure.
- [Course teaching plan](TEN_WEEK_TOOL_TO_REPORT_LEARNING_20261111.md): 90 weekly lessons.
- [Educator curriculum](EDUCATOR_CURRICULUM_20261113.md): course-specific content and progression.
- [Database setup](SUPABASE_SETUP.txt): Supabase configuration and migration cautions.
- [Repository cleanup report](REPOSITORY_CLEANUP_20261121.md): cleanup decisions and verification.
- [Exact duplicate audit](audits/SOURCE_DUPLICATES.json): reproducible content-hash inventory.

## Current synchronisation and assessment notes

- [Offline draft recovery](../OFFLINE_DRAFT_RECOVERY_RELEASE.md)
- [Workspace conflict protection](../WORKSPACE_CONFLICT_RELEASE.md)
- [Cloud enrolment](../CLOUD_ENROLMENT_RELEASE.md)
- [Cloud verification](../CLOUD_FIRST_VERIFICATION.md)
- [Assessment test mode](../ASSESSMENT_TEST_MODE.md)
- [AI assessment setup](../AI_ASSESSMENT_SETUP.md)

## Historical and specialist notes

Other documents in this folder and release-specific Markdown files in the project root are retained as reference history. They have **not** been merged into teaching lessons or treated as active instructions. Consult the source and current tests for actual behaviour.

## Maintenance

Run `npm run audit:repository` to regenerate the exact-content duplicate report. Run `npm run build` to regenerate `dist/` from source. Do not manually edit or commit `dist/`.

---

<a id="source-docs-repository-cleanup-20261121-md"></a>
### Source: `docs/REPOSITORY_CLEANUP_20261121.md`

# Repository consolidation and cleanup — 21 November 2026

## Scope and safety

Baseline: `DataLearning_Offline_Resilient_Drafts.zip`. This is a source-package cleanup; no course, learner, database, API or runtime application files were intentionally deleted.

## Completed

1. Excluded generated `dist/` from the distributed source ZIP. `tools-build-deployment.mjs` already removes and rebuilds that directory from authoritative source files.
2. Consolidated the documentation navigation in `docs/README.md`, distinguishing current references, curriculum, sync notes and historical release notes.
3. Added a reproducible SHA-256 exact-duplicate inventory (`npm run audit:repository`) without deleting files that may be referenced dynamically.
4. Updated the root README with the maintained source/build workflow.

## Not performed

- No lesson text was merged or shortened: semantically similar material can have different learning objectives.
- No runtime JavaScript modules were merged without dependency and browser regression evidence.
- No cloud data, schema, authentication or learner records were modified.
- No production deployment or authenticated two-device test was performed.

## Verification

Verification results on the supplied baseline:

- `node tests/script-syntax.mjs`: **PASS**, 112 JavaScript files.
- `node tests/clean-deployment.mjs`: **PASS**, 2,693 published resource references resolved.
- `npm run build`: **FAIL** at existing `tests/unified-site-v5.mjs` assertion for `career-setup.html` (expected one site-wide footer script; found zero). The build did not complete. This failure is not presented as a successful build.
- `npm run audit:repository`: **PASS**, 740 source files, four exact duplicate groups (six redundant byte-identical copies); none deleted because paths may be referenced.

Re-run the commands below after subsequent changes:

```sh
npm run audit:repository
node tests/script-syntax.mjs
npm run build
npm run verify:deployment
```

The build recreates `dist/` locally; it should remain excluded from the source archive.

---

<a id="source-docs-seven-stage-pedagogy-release-md"></a>
### Source: `docs/SEVEN_STAGE_PEDAGOGY_RELEASE.md`

# Seven-stage educator-led curriculum update

All nine Academy courses and 90 weeks now have explicit: business relevance, beginner explanation, four-step demonstration, output interpretation, mistake diagnosis, guided and independent practice, and professional validation/reflection. The core existing lessons, quizzes, worksheets, capstones, mastery items, and authentication are retained. Excel Week 3 and SQL Week 3 receive additional concrete worked walkthroughs. Other weeks reuse and organise the existing authored examples and acceptance criteria with discipline-specific coaching; they are not independently reauthored full-length textbooks.

Source of truth: `assets/data/course-educator-depth.json`; runtime: `assets/scripts/course-educator-depth.js`, `assets/scripts/academy-app.js`; styles: `assets/styles/academy-learning-depth.css`.

Quality gate: `node tests/seven-stage-lesson-quality.mjs`, `npm run verify:deployment`. Validate signed-in lesson layout and actual exercises in a Vercel preview before production.

---

<a id="source-docs-ten-week-tool-to-report-learning-20261111-md"></a>
### Source: `docs/TEN_WEEK_TOOL_TO_REPORT_LEARNING_20261111.md`

# DataLearning · 10-Week Tool-to-Report Learning Journeys

Release: 11 November 2026. Every course begins with the working environment and progresses to analysis, visual communication, and a capstone.

## Changes and compatibility

- 70 core Academy lessons now have revised titles, outcomes, 500+ word guided instructional material, worked examples and corresponding knowledge checks.
- 20 Python and AI specialist weeks receive prominent original masterclass instruction above their existing advanced references.
- 90 practice worksheets now match the rewritten titles and examples, reusing existing synthetic downloads.
- Nine dashboard layout samples and nine executive-storyboard illustrations accompany visual and reporting weeks.
- Week 10 of all nine courses links to the existing private, authenticated, instructor-reviewed capstone submission page.
- Existing per-course progress storage keys, week numbers, quiz results table and course slug identifiers are preserved. Historical quiz results remain stored; the replacement question text is not versioned by the database.
- Existing YouTube URLs are retained as companion resources; their availability, topical chapter alignment and permission to embed depend on YouTube and were not independently re-verified for all 90 links.

## What does a 10-week path teach?

### Microsoft Excel (excel)

- **Week 1: Getting comfortable with the Excel workspace.** Identify ribbon tabs, worksheets, cells, ranges and the formula bar before typing or analysing data. Deliverable: The formula =B2*C2 multiplies 3 by 1500 to return 4500; the source values remain independently readable.
- **Week 2: Entering, formatting and organising data.** Turn raw entries into a well-typed Excel Table that can be filtered without corrupting the source. Deliverable: After filtering, every row still has the correct original OrderID and amount; removing the filter restores all records.
- **Week 3: Essential Excel formulas and cell references.** Build correct arithmetic and summary formulas and know when to lock a reference. Deliverable: A 3-unit order at 1500 produces 4500 before tax; a fixed 7.5% rate in H2 produces 337.50 tax.
- **Week 4: Cleaning text, dates, duplicates and errors.** Fix dirty source data while keeping an auditable record of what changed. Deliverable: A label of '  north ' becomes 'North'; missing dates remain flagged rather than silently fabricated.
- **Week 5: IF, SUMIFS, COUNTIFS and lookup functions.** Calculate business KPIs by conditions and retrieve attributes from a reference table. Deliverable: A missing ProductID returns 'Unmapped' rather than a misleading blank; paid revenue excludes cancelled sales.
- **Week 6: PivotTables, dynamic arrays and reusable analysis.** Summarise thousands of rows into pivot summaries and dynamic filtered lists without manual recalculation. Deliverable: A pivot total for Paid orders must match independently computed SUMIFS on the same data and filters.
- **Week 7: Choosing and interpreting Excel charts.** Create truthful visuals that match the business question and explain what each chart shows. Deliverable: The line must connect Jan, Feb and Mar in order; (135000-150000)/150000 = -10% month-on-month.
- **Week 8: Building a professional interactive Excel dashboard.** Arrange KPI cards, PivotCharts and slicers into one readable decision-making page. Deliverable: Changing the Region slicer must update the connected metrics; original overall totals must remain recoverable.
- **Week 9: Writing and presenting an Excel management report.** Turn dashboard findings into a concise business narrative and deliver a portable report. Deliverable: Explain the ₦60,000 shortfall as a -6.67% variance against target; disclose unknown causes until investigated.
- **Week 10: Excel analytics capstone: dataset to executive dashboard.** Independently design, calculate, validate, present and submit a professional Excel dashboard. Deliverable: Instructor should reproduce totals and confirm a slicer changes relevant visuals; a 70/100 score is required for completion.

### Power BI Desktop (powerbi)

- **Week 1: Touring Power BI Desktop and its workspace.** Recognise the Report, Data and Model views, main ribbon and essential panes without prior Power BI experience. Deliverable: The imported table should appear in Data view and Model view; the Report canvas should remain ready for visuals.
- **Week 2: Connecting and profiling data in Power Query.** Import spreadsheets or CSVs and identify incorrect types, missing fields and quality problems before modelling. Deliverable: Your transformed table should include numeric Amount and a valid OrderDate with documented errors.
- **Week 3: Building relationships and a star schema.** Model sales facts with reusable dimension tables to prevent misleading totals and filters. Deliverable: Each fact row must match at most one product dimension key; a filtered total should never increase from an accidental join.
- **Week 4: DAX measures and evaluation context.** Write measures that react correctly to slicers and compare them with calculated columns. Deliverable: AOV must equal selected revenue divided by selected distinct orders, not average of precomputed category averages.
- **Week 5: Time intelligence and period comparisons.** Analyse month-over-month and year-over-year changes with a proper date dimension. Deliverable: For March 135000 versus February 150000, MoM = -10%; date labels must sort chronologically.
- **Week 6: Advanced DAX and analytical scenarios.** Control denominators and create context-aware comparisons without confusing totals. Deliverable: All region shares should sum to 100% when the denominator uses the appropriate total; compare to a source-based cross-check.
- **Week 7: Designing Power BI visuals and interactions.** Select charts for decisions and make drilldown and filters understandable to a new user. Deliverable: A selected region should update related KPIs, while totals in a separate validation table remain consistent.
- **Week 8: Building a premium interactive Power BI report.** Apply grid-based dashboard layout, slicers, bookmarks and visual hierarchy to a decision-ready report page. Deliverable: Every card must reconcile with its source measure; a reset state must restore the intended overview.
- **Week 9: Publishing, sharing and presenting insights.** Explain how Power BI Desktop reports are shared, refreshed and turned into an executive narrative. Deliverable: Do not claim a scheduled refresh is successful until the published model confirms it; screenshots must show selected filters.
- **Week 10: Power BI capstone: model to published executive report.** Build and document an end-to-end data model, DAX KPIs, interactive report and executive presentation. Deliverable: The instructor should reproduce KPIs and navigate slicers; acceptance requires documented limitations and a 70/100 assessment.

### SQL and SQLite (sql)

- **Week 1: Understanding databases and SQL editor environments.** Explore a SQL client, tables, schemas and query results before writing your first analytical statement. Deliverable: The table list appears and the sample query returns no more than five rows; no source records change.
- **Week 2: Writing SELECT, WHERE, ORDER BY and LIMIT.** Retrieve precise records instead of dumping entire tables to the screen. Deliverable: All returned rows are Completed with revenue over 10000 and sorted descending; tie handling should be explained.
- **Week 3: GROUP BY, aggregation and KPI queries.** Turn transaction records into business metrics using grouped aggregations. Deliverable: Sum of regions must reconcile to the Completed-only grand total unless intentionally excluded by HAVING.
- **Week 4: JOINs, table grain and duplicate control.** Combine fact data with reference tables without accidentally multiplying money. Deliverable: LEFT JOIN should keep every source order row if the product dimension is unique; totals should remain unchanged.
- **Week 5: CASE, NULL and conditional business rules.** Classify transactions transparently and avoid incorrect logic for missing fields. Deliverable: High-value flag follows the threshold; NULL Region displays as Unknown only in the reporting output.
- **Week 6: CTEs, subqueries and maintainable reporting SQL.** Split a difficult analysis into readable stages that can be checked separately. Deliverable: The sum of regions should equal the Completed-only sum from the base table, with matching date ranges.
- **Week 7: Window functions and time-based comparisons.** Calculate rankings, running totals and period comparisons without losing transaction detail. Deliverable: For values 10,15,12 by month, running total is 10,25,37; first LAG is NULL.
- **Week 8: Building dashboard-ready SQL datasets.** Shape a query output that a BI tool can visualise without ambiguity. Deliverable: Every row represents one month-region combination; when grouped again by month, totals must reconcile.
- **Week 9: Optimising, validating and presenting SQL analysis.** Explain query results to decision-makers and prepare reproducible validation evidence. Deliverable: Base and final totals reconcile at the same grain; query improvement must not change the answer.
- **Week 10: SQL capstone: end-to-end analytical reporting dataset.** Design, test and submit a repeatable SQL project for a complete business question. Deliverable: An independent reviewer should rerun the SELECT queries and reproduce your metrics; provide screenshots of the editor and output.

### Python and pandas (python)

- **Week 1: Python environment, notebooks and first expressions.** Start confidently in a Python editor or notebook, run code cells and understand variables and errors. Deliverable: The printed value is 4500, and changing input values updates the calculation without retyping the formula.
- **Week 2: Python collections, loops and functions.** Represent multiple records and write small reusable calculations. Deliverable: The three given prices total 4700, and sum([]) returns zero rather than failing.
- **Week 3: Reading CSV files into pandas DataFrames.** Load tabular sales data and inspect rows, column types and missing values. Deliverable: Shape reports rows then columns; head(3) previews three records without changing the source.
- **Week 4: Cleaning DataFrames safely.** Handle missing records, duplicates, inconsistent labels and invalid numeric values with reproducible code. Deliverable: Row count should change only if a documented removal rule is applied; missing totals must be reported.
- **Week 5: Filtering, grouping and business KPI calculations.** Compute revenue, customer counts and category KPIs with pandas using explicit business rules. Deliverable: The sum of grouped paid revenue must match the source Paid-only revenue under the same filters.
- **Week 6: Joining datasets and analytical feature engineering.** Combine related tables and create purposeful derived fields without fanout errors. Deliverable: Post-merge row count must equal source orders for a valid many-to-one join; unmatched categories must be counted.
- **Week 7: Exploratory data analysis and charts.** Use descriptive statistics and matplotlib visuals to expose patterns without implying causation. Deliverable: The plotted monthly sums should reconcile with the filtered dataframe; axis labels and units are explicit.
- **Week 8: Building a Python dashboard or interactive report.** Compose KPIs and charts in a reproducible Streamlit or notebook dashboard layout. Deliverable: A region selection must change all linked metrics; the source revenue total is the independent accuracy check.
- **Week 9: Automating reporting and presenting Python insights.** Export clean tables, plots and a reproducible analysis narrative for business stakeholders. Deliverable: The exported totals equal those calculated in memory; the report names its source and reporting period.
- **Week 10: Python capstone: raw CSV to dashboard and report.** Build a full data analysis project from source ingestion through dashboard, validated insights and presentation. Deliverable: An instructor can reproduce your summary from the supplied dataset; submission should disclose versions and limitations.

### AI for Data Analysis (ai)

- **Week 1: Getting to know AI tools for data analysis.** Navigate a chat-based AI tool and understand what AI can and cannot verify on its own. Deliverable: A good response identifies likely data types but flags uncertainty about field definitions.
- **Week 2: Writing clear prompts for analytical tasks.** Build prompts with task, data context, constraints, expected format and verification rules. Deliverable: The answer must show which rows count, the arithmetic and at least one limitation rather than invented figures.
- **Week 3: Using AI to understand and clean datasets.** Ask AI for an audit plan and implement transformations in the actual tool rather than trusting prose. Deliverable: A valid checklist distinguishes detection from correction; each chosen transformation must be demonstrated with real input rows.
- **Week 4: Generating and checking Excel formulas with AI.** Use AI to draft formulas while personally verifying references and edge cases. Deliverable: The Paid North result matches hand arithmetic; an unknown product ID returns an explicit missing value.
- **Week 5: Generating and validating SQL with AI.** Request readable SELECT queries and verify schema, join grain and source totals before using results. Deliverable: A valid join preserves orders when the dimension keys are unique; documented missing matches remain visible.
- **Week 6: AI-assisted Python analysis and debugging.** Use AI to explain code, diagnose errors and draft reproducible pandas transformations. Deliverable: Code must execute without hiding errors; revenue output matches an independent filtered sum.
- **Week 7: AI-supported EDA, visuals and evidence-based insight.** Use AI to suggest appropriate charts and draft explanations from verified results. Deliverable: The reported month-on-month change is -10% and the causal explanation remains a hypothesis.
- **Week 8: Designing dashboards with AI assistance.** Use AI to critique dashboard wireframes and propose layouts that make KPIs and filters understandable. Deliverable: Every visual has a purpose, consistent filters and a reproducible metric definition.
- **Week 9: Reviewing AI-written reports and building a safe workflow.** Create a reliable human approval path for AI-generated analysis and reporting deliverables. Deliverable: Every headline statistic appears in your evidence register, and recommendations are identified as recommendations.
- **Week 10: AI analytics capstone: verified end-to-end insight pack.** Deliver an AI-assisted analysis that is independently verified and transparently documented. Deliverable: Instructor can reproduce numerical findings independently; the AI-use statement clearly separates automation from human verification.

### Tableau (tableau)

- **Week 1: Tableau interface, worksheets and first connection.** Become familiar with Tableau's start page, data source pane, shelves, Marks card and sheet/dashboard/story tabs. Deliverable: The sheet should show a bar per region when Region is on Rows and SUM(Revenue) on Columns.
- **Week 2: Understanding field types, measures and data relationships.** Set data types and link tables while respecting their analytical grain. Deliverable: Revenue by Product Category should reconcile to the same total as the underlying valid sales data.
- **Week 3: Building bar charts, line charts and a readable visual.** Choose the right shelf/marks combinations for rankings and trends. Deliverable: Regional totals sum to the same filtered base revenue; monthly dates appear chronologically.
- **Week 4: Calculated fields and business KPI definitions.** Create reproducible calculations and understand row-level versus aggregate expressions. Deliverable: For revenue 1000 and cost 700, profit is 300 and margin 30%; aggregate ratios should be computed from total components.
- **Week 5: Filters, parameters and purposeful interactions.** Give viewers useful controls while keeping metric definitions consistent. Deliverable: Changing Region must update dependent charts; Revenue and Profit are not interchangeable currency concepts.
- **Week 6: Level of detail and advanced aggregate reasoning.** Apply FIXED and INCLUDE calculations carefully when category grain differs from metric grain. Deliverable: Repeated region totals are not additive product facts, so summing the repeated figure across products would double count.
- **Week 7: Table calculations for running totals and comparisons.** Add running sums, ranks and percent-of-total calculations to an existing visual. Deliverable: The cumulative sequence must be 10,25,37 for the sample; ranking should honour the intended metric.
- **Week 8: Building a Tableau dashboard with layout containers.** Combine worksheets, filters and actions into a premium interactive canvas. Deliverable: Region selection must update expected views; reset view restores the overall total.
- **Week 9: Creating Tableau stories and presenting findings.** Organise dashboard views into a sequence that supports an evidence-based recommendation. Deliverable: Each claim can be traced to a calculated field or worksheet; changed filters are disclosed.
- **Week 10: Tableau capstone: interactive dashboard and story.** Submit a complete Tableau analysis with verifiable calculations and an executive narrative. Deliverable: The instructor can check chart data, filter behaviour and presentation against the stated metric definitions.

### Power Query (powerquery)

- **Week 1: Finding the Power Query editor and importing data.** Learn the Power Query editor, Query pane, preview grid, ribbon and Applied Steps before transformations. Deliverable: The loaded output reflects the source preview and recorded transformations; raw CSV is unchanged.
- **Week 2: Data types, date locale and column profiling.** Ensure values are correctly typed before creating calculated analysis fields. Deliverable: After conversion, date sorting is chronological and revenue can be summed numerically; IDs retain leading zeroes.
- **Week 3: Cleaning nulls, duplicates and transformation errors.** Build a repeatable quality-control sequence with defensible exception handling. Deliverable: The number of cleaned rows plus investigated removals must reconcile to the input rows.
- **Week 4: Transforming text, split columns and date fields.** Standardise inconsistent labels and create helpful structured fields without changing source meaning. Deliverable: '  north ' should become 'North'; derived month remains numeric or uses an explicit date dimension.
- **Week 5: Custom columns, filtering and conditional business rules.** Create transparent derived labels and filter only records that meet published KPI definitions. Deliverable: Every high-value result follows the chosen threshold; excluded statuses are documented.
- **Week 6: Appending monthly files and controlling schema drift.** Combine compatible files vertically into one analysis-ready table. Deliverable: Combined row count equals the sum of compatible sources and revenue equals the sum of each month's revenue.
- **Week 7: Merging lookup tables and checking join matches.** Enrich transactions with attributes while preventing duplicate-key fanout. Deliverable: A unique product lookup should preserve one result per order row; unmatched ProductID remains visible.
- **Week 8: Grouping and reshaping dashboard-ready data.** Use Group By and Unpivot to produce tidy monthly KPI data for visual analytics. Deliverable: Summing the tidy output must reproduce the source figures; each Month value should be a valid period.
- **Week 9: Reading M language and designing a refreshable pipeline.** Inspect Generated M steps, document dependencies and verify refresh without modifying original files. Deliverable: A fresh file of the same expected schema loads cleanly and the quality checks still reconcile.
- **Week 10: Power Query capstone: reliable data preparation pipeline.** Prepare an auditable ETL output and show how downstream dashboards can consume it. Deliverable: Re-running the transformation on the same inputs reproduces row counts and sums; changes to source are traceable.

### Applied Statistics (statistics)

- **Week 1: Discovering statistical tools and data types.** Understand how Excel's Analysis ToolPak or Python notebooks support practical statistical questions. Deliverable: CustomerID must not be summed, and the chosen statistical operation matches the variable type.
- **Week 2: Mean, median, mode and interpreting typical values.** Calculate central tendency and explain what outliers do to the story. Deliverable: The mean is 29.8 and median 13; the unusually high 100 pushes the mean upward.
- **Week 3: Spread: range, variance and standard deviation.** Describe volatility alongside an average rather than hiding unstable results. Deliverable: The means match, but Team B has a substantially larger range and standard deviation.
- **Week 4: Frequency tables, histograms and distribution patterns.** Create charts that reveal where observations cluster and which values are unusual. Deliverable: The sample contains two spends in 0–49 and two in 50–99; bins must not overlap.
- **Week 5: Sampling design and identifying bias.** Plan a sample that supports a specific conclusion without excluding important customers. Deliverable: The sampling plan includes each relevant segment and documents its selection probabilities and constraints.
- **Week 6: Probability and risks in business decisions.** Compute basic unconditional and conditional probabilities using observed counts. Deliverable: P(Error) = 15/60 = 25%; every probability statement names the conditioning group.
- **Week 7: Correlation and exploratory relationship analysis.** Measure associations and explain why they do not automatically establish causation. Deliverable: A strong association may justify investigation but does not prove advertising caused the difference.
- **Week 8: Confidence intervals and uncertainty dashboard.** Construct and interpret a confidence interval in business terms without overstating certainty. Deliverable: Across repeated comparable samples, the 95% method captures the fixed population rate about 95% of the time.
- **Week 9: Hypothesis testing, experiments and result interpretation.** Use clear hypotheses and effect sizes to decide whether an apparent change is meaningful. Deliverable: At pre-specified alpha 0.05, reject H0 when p=0.03, subject to assumptions; do not call it proof of causation without design.
- **Week 10: Statistics capstone: analysis to executive recommendations.** Perform descriptive analysis and one defensible inferential check, then present uncertainty to stakeholders. Deliverable: Reviewer can trace all statistics to data and see why selected methods are appropriate; unsupported causal claims are flagged.

### Data Analysis (introduction)

- **Week 1: The data analyst's workspace and way of thinking.** Learn the full analysis workflow and recognise the interfaces analysts commonly use before specialising. Deliverable: Your question names a metric, comparison period, audience and decision that could follow.
- **Week 2: Data files, columns, types and measurement.** Become confident reading CSVs and spreadsheets and recognising the meaning of each field. Deliverable: IDs preserve leading zeroes, and revenue or quantity fields have meaningful numeric units.
- **Week 3: Data grain, keys and simple relationships.** Understand what one row represents and why duplicates can be legitimate. Deliverable: COUNTROWS = 3 but DISTINCTCOUNT(OrderID) = 2; both figures are right for different questions.
- **Week 4: Understanding and measuring data quality.** Identify missing values, erroneous amounts and duplicate keys before trusting a calculation. Deliverable: Each rule has a count, rationale and treatment; source and cleaned totals reconcile after approved changes.
- **Week 5: Basic calculations and descriptive KPIs.** Understand totals, counts, averages and the difference between typical and exceptional values. Deliverable: AOV = Paid Revenue / Distinct Paid Orders, and the sample median is 23.
- **Week 6: Preparing data for a repeatable analysis.** Separate raw source, cleaned records and reporting summaries into traceable layers. Deliverable: Every dropped or excluded record has a reason, and category totals reconcile to the clean rows.
- **Week 7: Choosing effective charts and reading trends.** Connect business questions to line, bar, table and KPI displays without misleading viewers. Deliverable: A descending bar ranking identifies top region and the monthly line correctly shows a February peak.
- **Week 8: Planning the first dashboard and selecting KPIs.** Design a clean dashboard layout before choosing a complicated tool. Deliverable: A reader can answer the business question in 30 seconds and every visual has a clear purpose.
- **Week 9: Explaining results and writing an executive briefing.** Write an evidence-first management report and prepare a brief verbal presentation. Deliverable: The statement uses correct arithmetic, cites the reporting dataset and identifies what cannot yet be concluded.
- **Week 10: Data analysis capstone: question to presentation.** Complete one end-to-end analysis using a realistic fictional business dataset. Deliverable: Each chart and KPI traces back to documented source and filters, and the instructor can follow all exclusions.

## Capstone instructions and rubric

Each Week 10 presents the business problem, submission requirements, source validation and a link with the correct course selector preselected. Learners must be signed in and have 10 synced completed weeks before uploading.

Submissions allow 1–4 project files of up to 12 MB each and 32 MB total; assessments are instructor-reviewed, requiring at least 70/100.

Rubric: Problem and objectives (25); Data preparation and quality (20); Technical execution (20); Analysis and insights (20); Communication and evidence (15).

## Notes on sample images

All image values are explicitly fictional, are for visual-layout teaching only and do not represent executed dashboards. Learners must still produce their own working calculations and project evidence.

---

<a id="source-docs-theme-release-20261113-md"></a>
### Source: `docs/THEME_RELEASE_20261113.md`

# DataLearning unified theme release — 13 November 2026

Version: **2.3.1**. Source update only; not deployed.

## What changed

- Harmonised active UI color literals across 54 stylesheets, 38 HTML routes, inline SVG icons, four JS-driven UI color sources and 108 course/illustration SVGs. Retired mixed purple, orange and legacy blue/teal branding in favor of the navy–cornflower–pistachio palette. Instructional diagrams retain their topics and content; raster screenshots are not recolored.
- Maintained the final shared theme file at `assets/styles/palette-premium-20261113.css` with versioned links on all pages. Preserved the Tutor rich-text stylesheet as the final, specialized response-layout layer.
- Restyled authenticated sidebar, top navigation, Admin Overview, Courses Analysis, Learners & Progress, Review Desk, personal Learning Dashboard, Profile, Certificate Viewer, Connection Health and Sync Diagnostics with consistent dark navy gradients and accessible light text.
- Removed old page-wide ambient gradient overlays from authenticated page canvases. Public navigation uses a subtle light gradient and the same color tokens.
- Preserved the translucent page loader's ~75% transparent backdrop and reduced-motion behavior.
- Kept role-based navigation, server authentication, Supabase persistence, nine courses, all 90 weekly visual guides, Tutor response formatting, Practice Arena, assessments and reports unchanged in behavior.

## Validation

- `npm test` and `npm run lint` (full automated suites) pass.
- All 54 CSS stylesheets parse without top-level errors.
- Chromium isolated render checks cover 11 representative public/private pages at 320, 390, 768 and 1440 pixels, with no horizontal page overflow and gradient header styles present. These tests use static page markup with scripts removed; they are not authenticated end-to-end tests.
- Contrast checks confirm WCAG AA for key reference foreground/background pairs. They are not a substitute for a full WCAG audit of every possible state.

## Deployment checklist

1. Deploy the complete source ZIP to the existing Vercel project, preserving current environment variables and Supabase configuration.
2. Hard-refresh the site once after deployment to load `palette-premium-20261113.css?v=20261113-theme-v2` and updated bundled CSS.
3. Verify sign-in, one-session navigation, the admin-only sidebar, live progress updates, Tutor messages, and mobile page loader with real accounts.
4. Visually inspect dark mode if your deployment exposes it. The canonical palette provides dark-mode tokens, but live dark-mode behavior is not covered by authenticated browser testing.

---

<a id="source-docs-topic-aligned-weekly-visuals-20261113-md"></a>
### Source: `docs/TOPIC_ALIGNED_WEEKLY_VISUALS_20261113.md`

# Topic-aligned visual learning guides — 2026-11-13

Every one of the nine courses has ten local weekly illustrations. 89 SVGs were refreshed to show topic-specific concepts and sample workflows (SQL joins/CTEs, Excel formulas and PivotTables, Power BI DAX, Tableau dashboards, Power Query transformations, Python pandas, statistics, AI prompt validation, and introductory data analysis). The detailed Excel Week 1 PNG is retained.

Images are self-contained original instructional diagrams rather than screenshots of vendor software. The weekly visual heading now displays the lesson's actual title, and captions explain that learners should reproduce and validate the concept with their own practice dataset. No third-party hotlinked image URLs are used. References consulted: Microsoft Learn Power BI Report View and pandas documentation. Source URLs: https://learn.microsoft.com/power-bi/create-reports/desktop-report-view and https://pandas.pydata.org/docs/user_guide/visualization.html .

Checks: XML validation for SVG assets, topic-specific illustration regression test, complete npm test suite. Post-deployment browser testing and review of subject-matter accuracy with educators remain recommended.

---

<a id="source-docs-weekly-practice-video-educator-release-20261110-md"></a>
### Source: `docs/WEEKLY_PRACTICE_VIDEO_EDUCATOR_RELEASE_20261110.md`

# DataLearning – Weekly lesson resources, guided practice and YouTube theatre
Release date: 10 November 2026

## Scope
- Nine courses: Data Analysis, Excel, SQL, Power BI, Tableau, Power Query, Statistics, Python and AI.
- 90 weeks receive a specific video chapter/tutorial and a downloadable practice source (CSV or SQLite), with 90 per-week `.md` worksheets under `downloads/weekly/`.
- Ten additional purpose-built fictional CSV datasets, a plain-language data dictionary and stable, reproducible examples; all are synthetic.
- Seven Academy courses gain a new resource kit and a substantive three-stage method walkthrough integrated into the weekly lesson. Python/AI retain their original detailed teaching and gain the same focused specialist guidance, week-specific downloads, and video links.
- A single reusable, accessible, responsive video theatre supports public YouTube watch/share/Shorts/live/embed links, watch/playlist lists, and timestamps. Video loading occurs only after a user clicks.

## What is and is not supported in the YouTube player
- Official embedded YouTube IFrame, not downloaded copies of videos. Works for embeddable, publicly available content according to YouTube's rules and user network conditions.
- Video owners or YouTube can restrict embedding, including private, age-restricted, region-restricted, paid or disabled-embedding videos; those cannot be forced to play inside DataLearning. Use the always-visible **View on YouTube** fallback.
- Direct channel, clip and arbitrary webpage URLs cannot always be resolved to an embeddable video ID; the player validates inputs and rejects unsupported/non-YouTube URLs.
- An isolated Chromium preview confirmed modal behavior but not remote YouTube playback; the test environment blocks external video frames.

## Content quality and accuracy
- Original learner week/quiz/progress IDs and cloud integrations remain unchanged.
- Practice worksheets incorporate the original lesson teaching, guided procedures, business context, independent exercise, verification and (where available) a suggested answer.
- The video sources are curated from existing and publicly indexed tutorials; chapter positions are supplied for long-form courses. Videos remain hosted by creators and can change or become unavailable after this release. A periodic editorial link audit is recommended.
- Original 70 core weeks have concept, reason, guided steps, worked example, case study, independent exercise, recap and new specific practice. The existing Python/AI mastery lessons are retained and enhanced, rather than replaced with a short summary.

## Key files
- `assets/scripts/week-learning-resources.js`: mapping of 90 lessons to datasets, worksheets and YouTube links.
- `assets/scripts/course-video-player.js`: accessible, click-to-load player with input URL validation and fullscreen, close and external fallback.
- `assets/scripts/specialist-week-deep.js`: focus-oriented extra teaching in Python and AI lessons.
- `assets/styles/weekly-media-premium.css`: isolated, responsive design for resource cards, lesson deep-dives and player.
- `downloads/learning_*.csv`: synthetic datasets.
- `downloads/weekly/*.md`: 90 guided practice briefs.
- `tests/week-resources-deep-video.mjs`: 90-week content/resource validation and player URL parser tests.

## Testing
- `npm run verify:deployment`: PASS; academy, security, editor/practice, and AI Tutor suites all pass.
- Isolated Chromium at 390px and 1440px: resource cards, dialog opening, timestamp conversion, Shorts switching, focusable close, iframe cleanup, and no page-level horizontal overflow all pass.
- Live authenticated Supabase operations and deployed YouTube playback have not been exercised here.

No database migrations, live deployments or cloud data writes were performed.

---

---

## Release 13 — Premium navigation visual implementation

See `RELEASE_13_PREMIUM_NAVIGATION.md` for details. Premium icon-led dropdown panels, two-column desktop feature links, descriptions, keyboard controls, and responsive mobile accordions were added without changing primary destinations.
