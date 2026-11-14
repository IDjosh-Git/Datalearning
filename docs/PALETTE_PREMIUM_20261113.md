# DataLearning Premium Palette · 2026-11-13

Canonical shared tokens: ink `#06141B`, deep navy `#11212D`, slate `#253745`, steel `#4A5C6A`, neutral silver `#9BA8AB`, mist `#CCD0CF`, canvas `#FBFBF8`, cornflower `#6AA6DA`, pear `#C5E384`.

Every retained HTML route imports `assets/styles/palette-premium-20261113.css`; global tokens in `design-system.css` match this palette. The page loader uses a translucent navy/cornflower/pear gradient (22–27% alpha, about 73–78% transparent) with backdrop blur and a darker accessible text panel. Tutor's rich-text stylesheet intentionally remains the last stylesheet on tutor.html to prevent layout regressions.

Legacy brand literals in active styles and page markup were replaced. Context-specific semantic colors (success/error/chart colors), illustrations, vendor assets, and some specialized component hues remain where they convey meaning or avoid compromising contrast. Do not assume all possible hex codes in the application were eliminated. Existing authentication, user progress, and course logic were not changed. Recheck visual contrast and real browser navigation after deployment.
