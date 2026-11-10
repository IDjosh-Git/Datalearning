# DataLearning — active project file map

| Directory | Current responsibility |
| --- | --- |
| `/` | Current HTML entry points and project configuration |
| `courses/` | Seven current teaching paths; AI and Python legacy routes and their still-linked guides |
| `assets/styles/` | Referenced page styles and shared modern layers. No orphaned standalone CSS |
| `assets/scripts/` | Referenced scripts and controllers; no orphaned historic frontend scripts |
| `assets/data/` | Seven-path teaching curriculum |
| `assets/icons/` | Active brand icons and favicons |
| `downloads/` | Downloadable learning data and supporting study resources |
| `api/`, `lib/`, `middleware.js` | Authenticated server handlers and access middleware |
| `database/` | Setup and historical migration files, retained for reproducibility |
| `tests/` | Maintained academy, security, Arena, Tutor, asset-audit and syntax regressions |
| `docs/` | Only current documentation, audit and route map |

Only the active Vercel deployment tests are retained. The retired `test:legacy` suite contained pre-rebuild assumptions, including a 41-page count that did not match the current site.
