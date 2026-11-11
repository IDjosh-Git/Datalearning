# Active DataLearning source map

| Path | Purpose |
| --- | --- |
| `*.html`, `courses/*.html` | Referenced public, learner and protected pages; including linked Python/AI supporting guides |
| `assets/scripts`, `assets/styles`, `assets/images`, `assets/icons` | Used browser logic, styles and visuals |
| `assets/data` | Current weekly data, curriculum and public app Tutor guide; some generated data retained for test verification |
| `downloads` | Used downloadable synthetic datasets, worksheets and learning references |
| `api/tutor.js`, `lib/tutor-context.js`, `lib/tutor-app-knowledge.js` | Authenticated AI tutor, verified guidance, server-only prompts |
| `assets/scripts/tutor-app-guide.js` | Offline learning-guide matcher that reads the public guide JSON |
| `database` | Setup and migration history retained for fresh installations and recovery; not active browser assets |
| `tests` | Build and security regression tests |
| `docs` | Current deployment/curriculum references; archived release notes removed |

The 4 still-linked Python/AI supplementary course pages remain; removing them would break the current navigation. Historical URLs for retired Intro/Excel/SQL/Power BI guide pages remain as redirects, not duplicate HTML pages.
