# AI course card visibility and navigation — October 15, 2026

## Why the card was difficult to find
- The homepage contained the AI course card, but it was the fifth item in a four-column grid, so on desktop it wrapped below the first row.
- The My Learning account dashboard omitted AI Integration from its clickable learning actions and progress cards entirely.
- The account dashboard assumed only four learning paths when reporting successful cloud synchronization.
- Local asset URLs were using an earlier version; when files were published with the same URL, browsers could reuse cached copies.

## Corrections
- AI is now a featured, fully clickable course card immediately after Introduction on the homepage. On wide screens it spans two columns alongside Introduction; tablet and mobile layouts preserve visibility.
- A dedicated clickable AI course progress card and continuation action now appear on My Learning.
- Account progress/sync now includes all five learning paths; AI capstone submissions use a human-readable label.
- Homepage navigation now links directly to the AI course and 300-prompt library.
- Home/account assets have updated version numbers, with the automated cache-version test updated accordingly.

## Publish instructions
Deploy the **entire** updated `Datalearningpath/` folder to the project's published root, **not** only the `courses/` directory. In particular publish `index.html`, `account.html`, `assets/modern.css` and `courses/ai.html` together. Hard-refresh the site (Ctrl+Shift+R) or open in a private window afterward.

If the Supabase migration has not yet been applied, run `AI_COURSE_DATABASE_MIGRATION.sql` in Supabase SQL Editor before relying on AI cloud progress, capstone review or certificate issuance. Course navigation itself is independent of Supabase.
