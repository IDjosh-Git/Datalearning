# DataLearning – Weekly lesson resources, guided practice and YouTube theatre
Release date: 10 November 2026

## Scope
- Nine courses: Data Analysis, Excel, SQL, Power BI, Tableau, Power Query, Statistics, Python and AI.
- 90 weeks receive a specific video chapter/tutorial and a downloadable practice source (CSV or SQLite), with 90 per-week `.md` worksheets under `downloads/weekly/`.
- Ten additional purpose-built fictional CSV datasets, a plain-language data dictionary and stable, reproducible examples; all are synthetic.
- Seven Academy courses gain a new resource kit and a substantive three-stage method walkthrough integrated into the weekly lesson. Python/AI retain their original detailed teaching and gain the same focused specialist guidance, week-specific downloads, and video links.
- A single reusable, accessible, responsive video theatre supports public YouTube watch/share/Shorts/live/embed links, watch/playlist lists, and timestamps. Video loading occurs only after a user clicks.

## What is and is not supported in the YouTube player
- Official embedded YouTube IFrame, not downloaded copies of videos. Works for embeddable, publicly available content according to YouTube's rules and user network conditions.
- Video owners or YouTube can restrict embedding, including private, age-restricted, region-restricted, paid or disabled-embedding videos; those cannot be forced to play inside DataLearning. Use the always-visible **View on YouTube** fallback.
- Direct channel, clip and arbitrary webpage URLs cannot always be resolved to an embeddable video ID; the player validates inputs and rejects unsupported/non-YouTube URLs.
- An isolated Chromium preview confirmed modal behavior but not remote YouTube playback; the test environment blocks external video frames.

## Content quality and accuracy
- Original learner week/quiz/progress IDs and cloud integrations remain unchanged.
- Practice worksheets incorporate the original lesson teaching, guided procedures, business context, independent exercise, verification and (where available) a suggested answer.
- The video sources are curated from existing and publicly indexed tutorials; chapter positions are supplied for long-form courses. Videos remain hosted by creators and can change or become unavailable after this release. A periodic editorial link audit is recommended.
- Original 70 core weeks have concept, reason, guided steps, worked example, case study, independent exercise, recap and new specific practice. The existing Python/AI mastery lessons are retained and enhanced, rather than replaced with a short summary.

## Key files
- `assets/scripts/week-learning-resources.js`: mapping of 90 lessons to datasets, worksheets and YouTube links.
- `assets/scripts/course-video-player.js`: accessible, click-to-load player with input URL validation and fullscreen, close and external fallback.
- `assets/scripts/specialist-week-deep.js`: focus-oriented extra teaching in Python and AI lessons.
- `assets/styles/weekly-media-premium.css`: isolated, responsive design for resource cards, lesson deep-dives and player.
- `downloads/learning_*.csv`: synthetic datasets.
- `downloads/weekly/*.md`: 90 guided practice briefs.
- `tests/week-resources-deep-video.mjs`: 90-week content/resource validation and player URL parser tests.

## Testing
- `npm run verify:deployment`: PASS; academy, security, editor/practice, and AI Tutor suites all pass.
- Isolated Chromium at 390px and 1440px: resource cards, dialog opening, timestamp conversion, Shorts switching, focusable close, iframe cleanup, and no page-level horizontal overflow all pass.
- Live authenticated Supabase operations and deployed YouTube playback have not been exercised here.

No database migrations, live deployments or cloud data writes were performed.
