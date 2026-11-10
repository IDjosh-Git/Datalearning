# DataLearning cleanup audit — 10 November 2026

This cleanup begins with `DataLearning_Unified_Premium_StudyTools_Footer_Tutor_Coach_20261110.zip`. It removes unreferenced frontend styles and scripts, retired tests and old release notes. It does **not** remove core learning or access-control features.

## Removed files

- **orphan CSS:** 8 files (883,229 uncompressed bytes)
- **orphan JS:** 9 files (108,804 uncompressed bytes)
- **legacy course pages:** 8 files (105,506 uncompressed bytes)
- **retired tests:** 99 files (246,215 uncompressed bytes)
- **historic docs:** 22 files (53,314 uncompressed bytes)
- **orphan icons:** 1 file (915 uncompressed bytes; unused capstone icon)
- **Hidden old duplicate navigation headers:** 9 removed from pages already using the new navigation.

The eight old Intro, Excel, SQL and Power BI roadmap/extension URLs redirect on Vercel to their active current course players instead of returning 404. The AI and Python legacy course pages and their referenced guides remain available for returning learners. The active seven paths, quizzes, learning materials, downloads, tutors, Arena, Learning Coach, capstone, certificates, auth/API handlers, database scripts, and secure role-based controls are retained.

## Styling choices

Eight standalone CSS files no longer referenced by any current HTML or JS were deleted. **Still-referenced CSS remains**; deleting it merely because a filename sounds old would risk breaking dynamic overlays, legacy AI/Python lessons and authenticated workspaces. This is a conservative reachability cleanup, not a claim that every selector in every large stylesheet has been proven live.

## Tests

`npm run verify:deployment` covers the maintained Academy, security, Arena and Tutor suites, plus JavaScript syntax and the new HTML resource-audit test. Previous optional `test:legacy` assumptions were already failing before this cleanup (41 expected pages against 46 actual); stale tests are removed rather than falsifying their assertions.

## Verification and limitations

Run `npm run verify:deployment` locally before deployment; review the Vercel redirects after deployment. Real signed-in flows should be checked in staging. Database migrations are unchanged.
