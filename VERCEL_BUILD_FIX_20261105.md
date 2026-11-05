# DataLearning — Vercel build failure fix (5 November 2026)

## Exact failure

`[BUILD_UTILS_SPAWN_1] npm run build exited with 1` was caused by an assertion in `tests/vercel-deploy-readiness.mjs:25` requiring the obsolete `dalp-public-catalog-menu-v39` cache key. The deployed source correctly uses `dalp-public-progress-users-v40`.

## Resolution

Updated 11 old test contracts to call `hasCurrentPublicCache` from `tests/cache-release-contract.mjs`. It validates a current public cache revision (v40 or later) and confirms that the service worker removes older public caches. This avoids failing future releases when the cache is bumped again. `service-worker.js` has not been downgraded.

## Verification

`npm run build`: PASS
`npm run lint`: PASS
`npm test`: PASS (core, responsive, learning, security, arena, tutor)

Local verification used Node.js 22; the Vercel project is pinned to Node.js 24 via `package.json` and `.nvmrc`. Confirm the remote build once the updated source has been pushed.

## Publish

Replace the project files in the GitHub repository connected to Vercel and commit to `main`. Do not upload the ZIP as a single file; extract it first. Vercel should then build the new commit. No Supabase migration is required by this build fix.
