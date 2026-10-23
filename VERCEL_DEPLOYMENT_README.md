# Vercel deployment — Data Learning Path

## Root directory and framework

Set Vercel **Root Directory** to `Datalearningpath` if the repository has this enclosing folder, or `/` when the files inside `Datalearningpath` are the repository root. Select **Other** (no framework preset). This is a root-static HTML/CSS/JS site with Vercel Node.js API functions in `/api`, not a Vite/Next or single-index SPA. Leave Build Command and Output Directory **unset**. Do not point Output Directory to `dist`.

## Routing

`vercel.json` retains `cleanUrls: false` deliberately: the application links to `.html` pages throughout. `/practice` rewrites to `/practice.html`, `/studio` to `/studio.html`, `/dashboard` to `/index.html`, and `/courses/:course` to corresponding course HTML. Direct `/practice.html` requests also resolve natively. Assets under `/assets/`, downloads under `/downloads/`, and serverless endpoints under `/api/` remain untouched; a global SPA catch-all must **not** be added because it could mask missing static assets and API paths.

## Before deploying

From the deployment root, run `npm ci` if a committed lockfile is available (otherwise `npm install`), followed by `npm run verify:deployment` and `npm test`. The static pages do not require a bundler build. Check Vercel Framework Preset = Other and confirm any dashboard Build Command or Output Directory override is blank. If a Git repository contains this folder, configure the root directory accordingly.

## Environment and API

`/api/auth/session` uses the server auth module and Supabase validation settings. `/api/tutor` requires `OPENAI_API_KEY` for live AI; without it the endpoint intentionally returns a 503 for live generation and the page can use its offline fallback. Set secrets in Vercel project environment settings; never add them to client-side JS or ZIP archives. Public Supabase URL/anonymous key configuration is in `assets/supabase-config.js`; inspect and configure as appropriate for your environment. The local practice SQL engine and downloadable CSV/SQL files do not require a server database connection. The `.sqlite` download is a file, not a running SQLite service.

## Production smoke checks

After a preview deployment, test `/practice`, `/practice.html`, `/assets/practice.js`, `/downloads/retail_orders.csv`, `/downloads/retail_sqlite_setup.sql`, and `/api/tutor` (GET should return JSON describing mode). Verify challenge selector, Run Query, theme toggle, and refresh. A 503 on tutor POST without the AI key is a configuration-dependent response, not a broken static route. Check Function logs for `/api/auth/session` only after relevant auth environment variables are configured. Verify missing assets return genuine 404 responses instead of an HTML SPA fallback.

## Validation scope

Local checks prove archive file presence, consistent routing config, and test-specified resource references. They do not prove actual Vercel environment, external services, environment secrets, or deployed HTTP behavior. A live preview deployment is necessary for end-to-end verification.
