# Vercel build repair — missing favicons (2026-11-05)

## Root cause
The previous Tutor Header Correction source ZIP inadvertently omitted assets/icons/favicon-32.png and assets/icons/favicon-180.png, while all site pages still referenced these files. Vercel halted during tests/site-integrity.mjs with a broken favicon reference in account.html.

## Fix
Restored both original PNG files from the preceding successful Tutor Studio Premium package. Do not remove favicon references from the HTML.

## Deployment
For the minimum patch, copy the two PNG files to the exact paths under assets/icons/ in the Datalearning GitHub repository, commit, and let Vercel rebuild. Alternatively replace the repository content with this full source ZIP. Do not nest its contents in an additional directory.

## Local validation
- npm run build: PASS
- npm run lint: PASS
- npm test: PASS
- PNG file headers: verified 32×32 and 180×180 respectively
- 39 HTML pages retain their icon references

This repair does not make any Supabase changes and does not deploy itself.
