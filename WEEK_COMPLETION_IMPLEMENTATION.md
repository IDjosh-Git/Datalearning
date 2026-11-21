# Weekly completion rules (all nine Academy courses)

- New completion requires an 80% or higher weekly quiz score.
- Best attempt is retained in local storage and in the existing `quiz_results` row for signed-in learners.
- Weekly lesson checks the account's quiz result and local result before enabling completion.
- Retry and answer explanations remain available in the existing weekly quiz.
- Previously completed weeks are grandfathered and not revoked.
- This is a frontend eligibility check only: `course_progress` API writes are not server-side gated. A secure server-side gate requires a separately reviewed Supabase migration and must account for legacy completions and other progress writers.
- Practical exercises remain learner-directed, not machine-graded or independently verified.
- This package has not been browser-tested or deployed.
