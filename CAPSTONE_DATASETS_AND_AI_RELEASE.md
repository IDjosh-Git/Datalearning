# Capstone dataset pack release

Nine deterministic, synthetic course-specific ZIPs are now in `downloads/capstone-packs/`. The same project briefs power Week 10 and the Assessment Desk; learners can download datasets directly from the Assessment Desk.

## AI grading and certification: not yet activated

This package does **not** claim production AI grading or auto-issue certificates. The current Supabase Assessment Desk uses instructor review and issues certificates only on approved review. Secure automation requires deploying and validating a privileged backend worker, versioned rubrics, independent file parsers and technical tests, audit logs, an idempotent certificate issuer, and a fail-closed review queue. Never place a service-role key in browser code. Do not auto-approve screenshot-only technical evidence.

Recommended rollout: shadow-grade instructor-marked examples, evaluate agreement and failure modes, enable verified formats course by course, then enable automatic issuance only for independently validated submissions.
