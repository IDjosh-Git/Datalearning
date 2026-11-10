# Study Tools isolated rebuild — 10 November 2026

## Navigation and purpose

| Tool | Page | Controller preserved |
| --- | --- | --- |
| Learning Coach | `learning-coach.html` | `study-success.js`, device-scoped plan and recall state |
| Learning Lab | `learning-lab.html` | `learning-lab.js`, saved confidence and spaced review |
| Practice Studio | `studio.html` | `course-studio.js`, existing exercises and saved attempts |
| Reference Library | `reference.html` | `reference.js`, formula filters, bookmarks, copy |
| AI Tutor | `tutor.html` | Existing authenticated and offline Tutor |
| Practice Arena | `practice.html` | Existing Excel, SQL and Python practice engines |

The previous `learning-lab.html` mixed the planner and library, with a large accordion nested inside a single page. The current release physically separates them and routes each Study Tools card to one page, while preserving legacy plan links through `study-tools-route-compat.js`.

## CSS consolidation

`assets/styles/study-tools-refined.css` is the final page-scoped stylesheet for the four rebuilt tools and Capstone privacy notice. It overrides retired layout rules without deleting styles still used by interactive controls. The old stacked Coach/Lab markup and the Studio's duplicate callout/hero have been removed. Do not delete remaining shared CSS without checking dynamic controls on other pages.

## Persistence and Supabase

No schema changes. Study plans, Studio exercise attempts, and Lab review statuses continue to use their preexisting local storage keys. Cloud course progress, quiz results, capstone submission, certificates and Tutor authentication are unchanged.

## QA

- Build/lint, security and Tutor/Arena regression suite
- Source-level distinct-route and required-ID tests
- Isolated browser tests across 320/390/768/1440px, including Coach plan creation, Lab search, Practice Studio rendering and Reference filtering
- No horizontal overflow in the tested routes

Live signed-in sessions should be verified on the Vercel preview before publishing.
