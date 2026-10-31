# Tutor Studio v87 — implementation and QA

Date: 31 October 2026. Built against the supplied **DataLearningPath_v86.zip**; no source or functional rewrite. This release is **not** deployed and did not send a successful request to a real AI account because no API key was provided.

## Existing implementation inspected

- Authenticated `/tutor.html`, with branded page shell, prepaint Light/Dark/System themes and Supabase auth gate.
- `assets/tutor.js`, `assets/offline-knowledge.js`, `assets/reference-data.js`, `assets/tutor-studio.css`, with offline matched explanations, examples, optional quizzes and localStorage progress (key `dalp-tutor-stats`).
- `/api/tutor`, previously a server-side OpenAI Responses endpoint, existed but **was not called by the browser Tutor Studio**.
- `/api/auth/session`, `assets/server-session.js`, `assets/auth-gate.js` and `lib/server-auth.js`, which exchange the existing Supabase session for a first-party HttpOnly cookie.
- Existing course, dashboard and capstone links; no private learner files were read or included in AI requests.

## What was implemented

1. **Real optional AI integration path:** `/api/tutor` supports GroqCloud chat completions (default when no existing OpenAI key), `GROQ_MODEL=openai/gpt-oss-20b`, and the existing OpenAI Responses API when `TUTOR_PROVIDER=openai`. No new production runtime dependencies.
2. **Provider control:** `TUTOR_PROVIDER=groq|openai`; invalid values produce a setup/unavailable state, not a silent provider fallback. If an existing OpenAI key is present and no provider explicitly selected, OpenAI remains the provider even when a Groq key is added. Provider/model returned from GET without any credential.
3. **Security:** POST is same-origin, requires a verified first-party learner session, limits body to 14 KB, question to 2,000 characters, history to six valid role messages of 900 characters each, and times out provider calls after 25 seconds. No learner name, account email, attachments, certificates or uploads sent to AI. Credentials stay in server environment only; sanitized provider errors never reveal upstream body, keys or stack traces. Provider prompts are static server content.
4. **Abuse guard:** best-effort in-memory per-user 8 requests/minute and 75/day on **one function instance**. **Not a global production limit**; add a shared Redis/Upstash limit, monitoring and budget alerts before scaling widely.
5. **Tutor Studio:** explicit Live AI / Offline guide switch, status/setup notices, topic context, seven example prompts including Python/statistics/responsible AI, safe Markdown renderer, labelled fenced code blocks with syntax colours and copy, overflow-safe tables, working server-powered follow-ups, request cancellation, clear/new conversation, loading/error/retry, privacy and provider policy link.
6. **Course integration:** course tutor links carry a trusted subject context via `?topic=`, and the weekly workspace link follows its existing course. The homepage and learning dashboard distinguish Tutor Studio with an offline guide and optional live AI. Offline tutor teaching, quizzes and browser-local progress were preserved.
7. **Conversation storage:** live conversation messages exist only in the open tab's runtime; no new history database or localStorage conversation store. Existing offline topic/quiz stats **remain saved on this browser** and can be reset with the original control.
8. **Model grounding:** server supplies a small, curated map of actual internal course, practice, capstone and reference URLs. The frontend accepts related links only from an explicit internal allowlist; it never treats model-created citations as verified sources. Tutors do not grade capstones.

## Configure live AI (Vercel)

1. On the existing Vercel project, under **Settings → Environment Variables**, add `TUTOR_PROVIDER=groq`, `GROQ_API_KEY=<secret from your GroqCloud account>` and optional `GROQ_MODEL=openai/gpt-oss-20b`. Use the server environment controls, **never** edit `assets/*.js` or put the key in `.env.example`.
2. If preserving OpenAI, use `TUTOR_PROVIDER=openai`, `OPENAI_API_KEY=<secret>` and optional `OPENAI_MODEL=gpt-4.1-mini`. **This is not a free-tier guarantee**.
3. Ensure the Supabase auth/session endpoints work as currently deployed; POST to `/api/tutor` requires the valid HttpOnly session cookie. Test live generation only in a secured preview deployment.
4. `GET /api/tutor` should report `aiEnabled`, `provider` and model. A successful authenticated POST should return an actual answer, but **none was exercised in this work session** because credentials were not supplied.
5. Configure a shared distributed rate limiter, provider spend/quota alerts, moderation or abuse monitoring appropriate to production traffic; current per-instance guard is only best-effort.

## Current provider terms and constraints (verified 31 Oct 2026)

- GroqCloud supports a limited **Free Plan** (no promise of unlimited API calls), with organization-level RPM/RPD/TPM/TPD restrictions. The authoritative account-specific allowance appears in the console, which may differ by organization or change. Documentation: https://console.groq.com/docs/rate-limits and https://console.groq.com/docs/billing-faqs .
- Selected default model `openai/gpt-oss-20b` is listed in Groq's production models: https://console.groq.com/docs/models . Current API format: https://console.groq.com/docs/api-reference .
- Groq's data guidance allows up to **30 days** for system reliability/abuse monitoring (eligible accounts can enable Zero Data Retention); check the organization's actual settings before using personal data: https://console.groq.com/docs/your-data .
- API output is unverified advice, not executed code or authoritative instructor grading. User's locally saved progress is separate.

## Verified tests

- `npm test`: PASS (core app, sign-in, admin, course and progress smoke tests)
- `npm run test:tutor:v87`: PASS, mocked Groq and OpenAI responses, origin/verified-session enforcement, no key, limits, invalid question/history/body, provider 401/429/500, mocked timeout, no leaked secret in client errors.
- `npm run test:responsive`: PASS, existing responsiveness tests.
- `npm run verify:deployment`: PASS, existing Vercel/source deployment audits.
- `npm run test:colour:v86`: PASS, existing 36 token contrast pairs.
- Isolated Chromium/Playwright renders of actual Tutor Studio HTML/CSS/JS in **1440px and 390px**, light and dark. Mocked provider success, code blocks, associated internal link, offline switching, and hostile HTML text rendered inert. No page JS exceptions or horizontal page overflow in those four scenarios. **Not a substitute for authenticated live browser testing**.
- `node --check` passed for modified API and client scripts.

## Outstanding / honest limitations

- **NOT live:** No valid Groq/OpenAI API key, no live provider response, and no production deployment were available. The integration is implemented and locally mocked, not proven in deployment.
- Authenticated session behavior was inspected in the source and mocked in API tests; an actual Supabase-authenticated browser end-to-end flow still requires staging.
- Serverless memory limits are per-instance, not durable nor distributed. For serious public traffic use shared rate limiting and admin monitoring.
- External code syntax highlighting is limited to a small safe client-side tokenizer, not a full language parser. Some advanced Markdown structures are intentionally plain text; model HTML/JS is never executed.
- Some older stylesheets have extensive cascade rules; isolated desktop/mobile snapshots do not establish full accessibility or screen-reader certification. Verify VoiceOver/TalkBack, long answers, zoom, dark theme, narrow keyboard viewport, error scenarios and actual network logs on staging.
- The app does **not** automatically search the user's documents or execute tutor-generated code, and it does **not** send capstone uploads to AI. It has no AI-based capstone grading.
