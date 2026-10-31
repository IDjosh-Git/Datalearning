# HTML pages and active stylesheet inventory

Discovered **26** HTML pages recursively from the repository; stylesheet order follows each HTML document's link elements. Query strings are retained in the CSV and removed for local filesystem resolution.

| Page | Layout | CSS links | Last stylesheet | Local missing | Duplicate local |
|---|---|---:|---|---:|---:|
| `account.html` | full | 40 | `assets/text-contrast-v98.css` | 0 | 0 |
| `admin.html` | full | 35 | `assets/text-contrast-v98.css` | 0 | 0 |
| `auth.html` | full | 38 | `assets/text-contrast-v98.css` | 0 | 0 |
| `capstone-guide.html` | compact | 14 | `assets/text-contrast-v98.css` | 0 | 0 |
| `capstone.html` | full | 42 | `assets/text-contrast-v98.css` | 0 | 0 |
| `catalog.html` | catalog | 3 | `assets/text-contrast-v98.css` | 0 | 0 |
| `certificate.html` | full | 31 | `assets/text-contrast-v98.css` | 0 | 0 |
| `connection-test.html` | full | 38 | `assets/text-contrast-v98.css` | 0 | 0 |
| `courses/ai.html` | full | 59 | `assets/text-contrast-v98.css` | 0 | 0 |
| `courses/excel.html` | full | 64 | `assets/text-contrast-v98.css` | 0 | 0 |
| `courses/introduction.html` | full | 58 | `assets/text-contrast-v98.css` | 0 | 0 |
| `courses/powerbi.html` | full | 63 | `assets/text-contrast-v98.css` | 0 | 0 |
| `courses/python.html` | full | 65 | `assets/text-contrast-v98.css` | 0 | 0 |
| `courses/sql.html` | full | 64 | `assets/text-contrast-v98.css` | 0 | 0 |
| `index.html` | full | 44 | `assets/text-contrast-v98.css` | 0 | 0 |
| `learning-lab.html` | full | 36 | `assets/text-contrast-v98.css` | 0 | 0 |
| `practice.html` | full | 73 | `assets/text-contrast-v98.css` | 0 | 0 |
| `preview.html` | compact | 14 | `assets/text-contrast-v98.css` | 0 | 0 |
| `progress.html` | full | 41 | `assets/text-contrast-v98.css` | 0 | 0 |
| `prompt-library.html` | full | 37 | `assets/text-contrast-v98.css` | 0 | 0 |
| `reference.html` | full | 39 | `assets/text-contrast-v98.css` | 0 | 0 |
| `reviewer.html` | full | 41 | `assets/text-contrast-v98.css` | 0 | 0 |
| `studio.html` | full | 30 | `assets/text-contrast-v98.css` | 0 | 0 |
| `sync-test.html` | full | 38 | `assets/text-contrast-v98.css` | 0 | 0 |
| `tutor.html` | full | 41 | `assets/text-contrast-v98.css` | 0 | 0 |
| `verify.html` | full | 31 | `assets/text-contrast-v98.css` | 0 | 0 |

## Layer relationships

- **Full layout:** 23 currently discovered pages use `responsive-v2.css`, `mobile-experience-v13.css`, `mobile-finish-v14.css`, `responsive-system-v15.css`, `theme-navigation-v16.css`, `theme-foundation-v65.css`, `learning-polish-v96.css`, the shared `premium-design-v99.css` and the final `text-contrast-v98.css`. The earlier responsive and theme layers remain active; they were not replaced by the contrast layer.
- **Compact layout:** `capstone-guide.html` and `preview.html` use the v2/v13 responsive CSS, the theme foundation/controller and the v96, premium v99 and v98 visual layers; they intentionally lack the v14–v16 finishing layers.
- **Standalone catalog:** `catalog.html` uses `learning-catalog-v97.css` for its responsive breakpoints, dark theme tokens and focus states, plus `premium-design-v99.css` and final `text-contrast-v98.css`. Its own navigation/theme script manages interactions.
- Every HTML page loads the shared premium v99 design layer immediately before the final v98 contrast stylesheet.
- No external CSS links, duplicate stylesheet links, or missing local stylesheet paths were found in the current repository.

The accompanying CSV lists **every stylesheet reference in its original document order**, including the exact cache-busting query string. Counts here are observational, not assertions in tests.
