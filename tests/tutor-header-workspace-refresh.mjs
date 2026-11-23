/** Regression: the tutor fills the viewport and header utilities never create a second row. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = p => readFileSync(new URL('../'+p, import.meta.url), 'utf8');
const html=read('tutor.html');
const css=read('assets/styles/unified-site-v5.css');
const coach=read('assets/scripts/learner-companion.js');
const search=read('assets/scripts/premium-search.js');
const drawer=read('assets/scripts/tutor-workspace.js');
assert(!html.includes('class="dlx-v5-tutor-hero"')&&!html.includes('class="tutor-intro dalp-themed-hero"'), 'Tutor must not include duplicate promotional hero cards');
for(const id of ['chatForm','chatMessages','chatQuestion','sendQuestion','tutorToolsToggle','tutorToolsPanel','tutorCloseSettings','tutorModeAi','tutorModeOffline','clearChat','topReset','cancelTutor'])
 assert(html.includes(`id="${id}"`), `Tutor function missing: ${id}`);
assert(css.includes('main.tutor-main .tutor-grid{animation:none!important'), 'Drawer must not have transformed ancestor');
assert(css.includes('main.tutor-main .tutor-sidebar.tutor-drawer-open'), 'Mobile drawer open state missing');
assert(css.includes('main.tutor-main .tutor-chat .messages{display:flex'), 'Independent message scroller missing');
assert(css.includes('main.tutor-main .tutor-chat .tutor-toolbar-actions #clearChat{display:inline-flex'), 'Clear Chat must remain visible on mobile');
assert(coach.includes("launch.className='lc-launch lc-pulse-trigger'")&&coach.includes('Study Pulse')&&!coach.includes('function placeLaunch()'), 'Study Pulse must remain a floating shortcut, not a header item');
assert(search.includes(".academy-header .academy-actions"), 'Search must use the unified public header utility area');
assert(drawer.includes("getElementById('tutorCloseSettings')"), 'Full-height settings drawer must have a close action');
console.log('PASS Tutor header/workspace: single immersive screen, top-anchored settings drawer, compact coach/search controls, mobile chat actions');

