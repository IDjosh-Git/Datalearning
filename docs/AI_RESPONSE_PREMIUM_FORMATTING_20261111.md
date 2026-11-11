# AI response formatting update — 11 November 2026

## Scope
- Shared safe DOM-based Markdown response renderer: `assets/scripts/ai-response-format.js`
- Shared responsive presentation: `assets/styles/ai-response-premium.css`
- Integrated with the floating learning coach, live Tutor Studio, and the built-in offline Tutor explanations.
- Proper semantic tables (`table`, `thead`, `tbody`, `th`, `td`) inside a keyboard-focusable horizontal scroll region.
- Scoped paragraphs, headings, ordered/unordered lists, links, quotations, and code block formatting.
- Code examples have a copy control. Untrusted model text is only added using text nodes; model HTML never renders as executable HTML.

## Behavior
- Tables and code scroll inside their messages at small screen sizes. The chat card and document do not grow wider than their container.
- Paragraphs wrap while code preserves intentional indentation.
- Assistant messages have consistent visual treatment; user messages remain plain text.
- No changes to AI provider logic, API contracts, study progression, server/session code, or course content.

## Verification
- `npm test`: passed (Academy, security, Practice Arena, Tutor, cloud/media).
- New automated response parser and 29-page script/style-order regression check: passed.
- Headless Chromium isolated rendering: 320px, 390px, 768px, 1440px; no document overflow. Six-column tables and long code examples scroll within their containers.
- Live provider requests were not executed against a production service as part of this UI-only update.
