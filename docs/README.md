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
