# DataLearning — file map

Keep paths stable when deploying. Imports, tests and Vercel rewrites depend on their current locations.

| Folder | Responsibility |
| --- | --- |
| `/` | Public and private HTML routes, `vercel.json`, service worker, `package.json`, release notes |
| `assets/styles/` | Layout and design CSS; `premium-unified.css` is the final shared theme layer |
| `assets/scripts/` | Browser controllers, Supabase sync, navigation, learning and practice modules |
| `assets/icons/` | Local icons, brand imagery and favicons |
| `courses/` | Six course players and twelve linked learning roadmaps/extensions |
| `api/` | Vercel serverless API handlers |
| `lib/` | Server-only authentication and tutor helpers; blocked as static routes |
| `database/migrations/` | Historical database migration scripts; **do not re-run blindly** |
| `docs/` | Deployment instructions, route manifest and audit notes |
| `curriculum/` | Authoritative teaching content and build tools |
| `tests/` | Automated build, security, learning, responsiveness and regressions |
| `downloads/` | Shipped learning resources referenced by existing pages |

**Organization decision:** keep referenced assets and historical migrations in their stable locations. Deleting or renaming them merely to reduce ZIP size risks broken course navigation, missing templates, or nonrepeatable database setup. The final shared UI changes are consolidated in the existing stylesheet rather than creating another overlapping theme file.
