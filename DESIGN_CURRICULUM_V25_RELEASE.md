# Datalearningpath v25 — Design System and Curriculum Extension

## Changed files

- `assets/design-system-v25.css` (new): global light/dark semantic color tokens, reusable card/section styling, layout guardrails, focus rings, 48px interactive control dimensions, reduced-motion preferences, course mastery component styles.
- All 22 top-level/course HTML routes: load the shared stylesheet as the final style layer, after legacy page styles.
- `courses/introduction.html`, `courses/excel.html`, `courses/sql.html`, `courses/powerbi.html`, `courses/ai.html`: each contains a new semantic `Applied mastery` section with three guided modules. Each module includes explicit learning objectives, a workplace case, ordered practical steps, a readable code/formula/workflow example, and an assessment checkpoint. Existing lessons, quiz engines and progress state remain unchanged.

## Semantic tokens

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--brand` | `#623653` | `#e1a7ca` | Brand accent / content highlight |
| `--ink` | `#172238` | `#f4f7fb` | Primary text |
| `--muted` | `#4a586d` | `#c0cbd9` | Supporting text |
| `--canvas` | `#f6f8fb` | `#101724` | Background |
| `--surface` | `#ffffff` | `#1a2636` | Elevated content |
| `--surface-alt` | `#ecf1f7` | `#263549` | Nested regions |
| `--line` | `#cbd5e1` | `#506079` | Borders |
| `--focus` | `#0868c7` | `#8bc9ff` | Keyboard focus |
| `--success` | `#126441` | `#7de3ab` | Positive semantic state |
| `--warning` | `#815300` | `#ffd17b` | Attention semantic state |
| `--error` | `#b42318` | `#ff9b96` | Destructive semantic state |
| `--progress` | `#3565b3` | `#95c4ff` | Learner progress |

Note: semantic tokens are supplied as implementation defaults, not a verified WCAG AA audit of all legacy computed styles. Historical stylesheets include specificity and `!important` overrides. Formal browser measurements (including CSS-computed color on controls, disabled states, imagery and overlaid text) are still needed.

## Testing performed

- `npm test` — PASS
- `npm run test:responsive:v15` — PASS
- `npm run test:course-navigation:v22` — PASS
- `npm run test:theme:v16` — PASS
- `npm run test:course-mobile:v21` — PASS
- `npm run test:server-auth` — PASS (mock/regression tests; not live Supabase)

## Integration/deployment

1. Extract the archive and review the five enriched course pages and token layer.
2. Run `npm install` and the commands listed above.
3. Deploy to staging and verify 320px/375px/768px/1440px/2560px displays and both theme modes.
4. Perform axe-core + manual tab and screen-reader testing on representative flows. Validate contrast of actual computed styles; course accents defined in legacy CSS may require follow-up adjustments.
5. Review added exercises with subject-matter experts for applicability to your datasets and SQL/Power BI model conventions.
6. Proceed to production only after live auth/API/offline release blockers documented in `RELEASE_QA_AUDIT_V24.md` are cleared.

## Known limitations

- This is a non-destructive styling and supplemental curriculum pass, not a wholesale rewrite of legacy page markup or application behavior.
- The additional checkpoints are written assessments; they do **not** automatically sync to the platform's existing progress engine or grade responses.
- No live visual browser screenshots or WCAG conformance certification were produced in this environment.
