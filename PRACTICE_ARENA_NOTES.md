> **Latest implementation (October 24, 2026):** See [PRACTICE_ARENA_RELEASE_V31.md](PRACTICE_ARENA_RELEASE_V31.md) for the new 95-challenge Excel/SQLite implementation and supported scope. The historical notes below describe earlier versions.

# Practice Arena upgrade — October 2026

Open `practice.html` from the homepage or any of the courses. It provides **40 guided exercises**: 20 SQL and 20 Excel. Learners enter answers, check them, receive actionable feedback, inspect a hint or worked answer, and retain passed exercises locally. The page has responsive layout, topic filters, and completion counts.

**Important scope**: This is not a general-purpose SQL execution sandbox or full spreadsheet runtime. SQL answers are evaluated by inspecting supported `SELECT` statement patterns; equivalent SQL may be rejected and semantically wrong queries may sometimes be accepted because no database is executed. The Excel checker compares known formulas and selected equivalents against model patterns. Avoid interpreting a pass as proof that an arbitrary query executes correctly. The graded exercises are deliberately limited and the UI explains the limitation. The supplied SQLite database in `downloads/` can be opened in a local SQLite client for real query execution.

No external AI endpoint is used by the Practice Arena. Original optional cloud-dependent features remain in the app. Learning progress is stored using browser localStorage and is device/browser specific. Existing tutor lessons, courses, formula library, and companion coach are retained.

Run `node --check assets/practice.js` to validate syntax. All challenge records are in `assets/practice-data.js`.
