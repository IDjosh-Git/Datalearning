# Vercel pre-deployment verification — 2026-11-22

Source: DataLearning Release 6 quality-hardening package.

## Local checks completed
- `npm run build`: PASS. Static `dist/` generated; 2,774 published resource references resolved.
- `npm run lint`: PASS.
- `npm test`: PASS, including in-memory cloud/auth tests (not a live Supabase check).
- `npm run audit:quality`: PASS; mobile viewport and local JS/CSS references checked.
- `vercel.json`: configured with `buildCommand: npm run build`, `outputDirectory: dist`, and static routes/rewrites.

## Deployment settings to verify in Vercel
- Project Root Directory: repository root (the directory containing `package.json` and `vercel.json`).
- Install Command: default `npm install`; Build Command: `npm run build`; Output Directory: `dist`.
- Node.js runtime: project declares `24.x` in package.json and `.nvmrc`. Local checks ran with Node 22.16.0, so Node 24 / Vercel-hosted execution has **not** been independently tested here.
- Set the project's required Supabase and other server environment variables in Vercel settings; do not put credentials in the ZIP.
- Deploy to Preview first and test sign-in, course discovery, enrolment, progress persistence, mobile navigation, and protected API endpoints before production promotion.

## Limitations
These checks do not guarantee zero Vercel build/runtime errors. No authenticated Vercel preview deployment or live backend test was performed. No production environment was changed.
