# Vercel homepage routing fix — 14 November 2026

Production investigation found that `https://datalearning.vercel.app/` returned the authenticated Discover HTML, while `/public-pages/landing.html` returned the new public homepage. Requests made without a learner session to the Discover stylesheet `/assets/styles/home-premium-20261114.css` returned HTTP 403. This explains the broken signed-out layout: the root URL selected the wrong document, whose assets are intentionally private.

The root now explicitly rewrites to `/public-pages/landing.html` inside the existing routing middleware, before Vercel resolves the filesystem's `index.html`. Query strings are retained and the response is not cached. The existing configuration rewrite remains as a fallback. `/index.html` and `/dashboard` continue to require authentication; no private styles or scripts were made public.

The redesigned public document and all signed-in learning pages are unchanged by this fix. The middleware regression now checks root routing for signed-out and signed-in requests, query preservation, no-cache headers and continued protection of private routes and assets.

Deploy the contents of the `datalearning` folder, including `middleware.js` and `vercel.json`. Use that folder as the Vercel project root. Keep the existing environment variables. After deployment, `/` must show “Your next chapter starts with data.” and not “Discover the academy”. The direct public page `/public-pages/landing.html` should show the same design.

The live production site was inspected read-only. This corrected ZIP has not been deployed by this chat.
