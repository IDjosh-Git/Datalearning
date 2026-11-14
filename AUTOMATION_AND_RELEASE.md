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
