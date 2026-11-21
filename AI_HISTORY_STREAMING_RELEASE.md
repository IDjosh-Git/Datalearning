# AI account history and response streaming

## Implemented
- `api/ai-history.js`: authenticated GET/PUT/DELETE for an account-owned conversation, using the existing HttpOnly session cookie and user-scoped Supabase REST requests. No service-role key or browser localStorage history.
- `database/migrations/20261121_ai_account_history.sql`: `ai_conversation_history` with owner-only RLS SELECT/INSERT/UPDATE/DELETE policies; applied to the configured Supabase project on 2026-11-21 and verified RLS and four policies.
- `api/tutor.js`: opt-in `stream:true` server-sent event output, with OpenAI Responses streaming and Groq chat-completion streaming. Existing JSON API remains supported.
- `assets/scripts/floating-learning-ai.js`: progressively rendered live answers, account history restoration, new-conversation deletion, and persistence after completed responses.
- `assets/scripts/tutor-ai.js`: progressively rendered live answers and shared account history restoration/persistence.

## Verification and limitations
- `npm run verify:deployment`: passed locally after changes.
- Syntax checks: passed.
- Supabase table and RLS policies: confirmed live.
- No live provider token was exercised, so actual Groq/OpenAI streaming and browser session behavior require a Vercel preview smoke test.
- One recent conversation (up to 40 messages) is saved per account and shared by Floating AI and Tutor Studio. This is not a multi-thread conversation browser.
- History is only saved after a complete AI answer. Stopped or interrupted responses are not persisted.
- New Conversation clears the account transcript for both interfaces; offline study-guide answers are not saved.
- Provider streaming must be supported by the configured provider/model.
