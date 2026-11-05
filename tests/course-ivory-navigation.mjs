/* Regression guard: one ivory-gradient lesson rail, below the main header. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const styles=read('assets/styles/premium-unified.css');
const script=read('assets/scripts/course-sidebar-header-offset.js');
const courses=['introduction','excel','sql','powerbi','python','ai'];
assert.match(styles,/Ivory Glass lesson navigation/,'Maintained white sidebar layer missing');
assert.match(styles,/--dl-ivory-gradient:linear-gradient\(/,'Sidebar background is not a white gradient');
assert.match(styles,/#sidebar\.sidebar\.dl-lesson-rail\.open/,'Mobile drawer open state override missing');
assert.match(styles,/top:calc\(var\(--dl-course-header-h\) \+ 12px\)/,'Desktop sidebar must be inset below header');
assert.match(styles,/top:calc\(var\(--dl-course-header-h\) \+ 8px\)/,'Mobile drawer must be inset below header');
assert.match(styles,/#lessonRailBackdrop:not\(\[hidden\]\)/,'Backdrop must start below header');
assert.match(styles,/z-index:1250!important/,'Main header must be visually above sidebar');
assert.match(styles,/\.sidebar-tools,\.sidebar-progress,\.dl-lesson-rail-resources/,'Resource/progress cards should share white surfaces');
assert.match(styles,/\.course-lesson-disclosure>summary/,'Lesson disclosure requires matching gradient controls');
assert.match(script,/ResizeObserver/,'Header height must track actual responsive header');
assert.match(script,/--dl-course-header-h/,'Sidebar height must use measured header size');
for(const name of courses){
 const html=read(`courses/${name}.html`);
 const stylesheets=[...html.matchAll(/<link\b[^>]*href="([^"]+\.css)"[^>]*>/gi)].map(x=>x[1]);
 assert.equal(stylesheets.at(-1),'../assets/styles/premium-unified.css',`${name}: final stylesheet must own sidebar`);
 assert.equal((html.match(/id="sidebar"/g)||[]).length,1,`${name}: one lesson rail only`);
 assert.equal((html.match(/course-sidebar-header-offset\.js/g)||[]).length,1,`${name}: one header observer only`);
 assert.equal((html.match(/src="\.\.\/assets\/scripts\/course-premium-sidebar\.js"/g)||[]).length,1,`${name}: one drawer controller only`);
 assert.match(styles,new RegExp(`data-ui-course="${name}"`),`${name}: track accent missing`);
 assert.doesNotMatch(html,/class="dlp97-side"|id="courseRail"/,`${name}: obsolete course list rail`);
}
console.log('PASS six ivory-gradient lesson rails, one drawer each, header-safe desktop/mobile offsets and white navigation controls');
