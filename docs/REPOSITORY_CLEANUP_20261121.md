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
