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
