# DataLearning — AI Prompt Library popup reader

The **Read full prompt** button now opens a separate native HTML dialog. Prompts no longer expand their cards. The dialog provides the complete prompt with its title, category, tool, level, **Copy full prompt**, close (X) and **Close** buttons, Escape-to-close, focus restoration and an independently scrolling reading area.

The existing 300 prompts, search, filters, favourites and export functionality remain unchanged. The prompt text is set using `textContent` so placeholders cannot be interpreted as HTML. The four-column desktop layout and responsive breakpoints are preserved.

The service-worker cache is updated to `dalp-public-prompt-preview-v41` to refresh CSS and JS for existing visitors.

Verification: `npm run build`, `npm run lint`, `npm test`, plus browser interaction checks at 390, 768 and 1440 pixels. On-screen checks covered unchanged card dimensions, correct prompt content, Copy, Close, Escape and keyboard activation.

Deployment: Commit the complete source to GitHub; the live Vercel site does not update automatically from this ZIP.
