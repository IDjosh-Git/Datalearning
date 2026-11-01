# Feature page cleanup — Practice Arena, Tutor, Formulas and Q&A

The project has no separate Question & Answer HTML page: interactive explanations, practice questions and adaptive review are provided by `learning-lab.html`, with content in `offline-knowledge.js` and `learning-lab.js`. The related AI Prompt Library was also included because it shares older library styling.

## Scope

- Removed legacy CSS selectors that cannot match feature page markup or any available JavaScript-generated component. CSS `:not()`, `:has()`, `:is()` and `:where()` selector logic was retained conservatively; CSS at-rules were processed recursively where safe.
- Removed identical repeated CSS rules, retaining the last declaration to preserve cascade order.
- Removed the duplicate Practice Arena start-up steps; subject launch, challenge library, Python Lab and progress features are unchanged.
- Moved Learning Lab’s embedded Q&A layout CSS into its already-loaded layout stylesheet and changed the old teal action fill to dark slate blue.
- Replaced outdated inline teal reference-heading styling with a defined high-contrast style and moved reference-search label styling into CSS.
- The shared nav, design-system.css, content datasets, event handler scripts, questions, quizzes and access controls are not removed.
- The older green footer mark on the Tutor and Formula Library was replaced with the existing site logo. No navigation links were removed.
- Confirmed **559 unique Q&A questions**, **603 unique formula-reference titles**, **300 unique AI prompts**, and **95 practice challenges**; one repeated practice title belongs to different challenges and was intentionally left intact.
- `tests/feature-source-cleanup.mjs` now checks preserved content, styling integration and public navigation.

## Quantitative stylesheet cleanup

| Feature | Before (bytes) | After (bytes) | Removed legacy selectors | Removed duplicate rules |
|---|---:|---:|---:|---:|
| practice | 568,559 | 412,468 | 1,218 | 20 |
| tutor | 415,297 | 271,082 | 1,190 | 14 |
| reference | 396,244 | 250,904 | 1,194 | 14 |
| prompt-library | 373,503 | 244,325 | 1,007 | 13 |
| learning-lab-foundation | 63,384 | 26,347 | 400 | 0 |
| learning-lab-layout | 306,244 | 200,817 | 784 | 9 |

**Measured cleanup:** 5,793 orphan CSS rules removed and 70 exact duplicate rules removed across six stylesheets; total CSS footprint reduced from 2,123,231 to 1,405,943 bytes (33.8%) in these files.

**Validation caveat:** source-level selector analysis is conservative but cannot replace visual, cross-device testing of dynamically injected third-party editor UI.
