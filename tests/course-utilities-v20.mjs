import fs from 'node:fs';
import assert from 'node:assert/strict';
const read = file => fs.readFileSync(file,'utf8');
const pages = fs.readdirSync('.').filter(n=>n.endsWith('.html')).map(n=>n).concat(fs.readdirSync('courses').filter(n=>n.endsWith('.html')).map(n=>'courses/'+n));
assert.equal(pages.length,22,'Expected 22 pages');
const script=read('assets/course-utilities-v20.js');
const coach=read('assets/learner-companion.js');
const sync=read('assets/course-sync.js');
const css=read('assets/course-utilities-v20.css');
for(const file of pages){
 const html=read(file);
 assert(html.includes('course-utilities-v20.css?v=20261022.20'),`${file}: missing latest toolbar stylesheet`);
 assert(!/<a\b[^>]*style="position:fixed;[^">]*"[^>]*>⚡ Practice Arena<\/a>/.test(html),`${file}: floating Practice Arena remains`);
 if(file.startsWith('courses/')){
  assert.equal((html.match(/course-utilities-v20\.js\?v=20261022\.20/g)||[]).length,1,`${file}: missing or duplicated course tools script`);
  assert(html.includes('learner-companion.js?v=20261022.20'),`${file}: old learner coach still cached`);
 }
}
assert(script.includes("first.insertAdjacentElement('beforebegin',strip)"),'Course toolbar should be in page flow, before course hero');
assert(coach.includes("strip.prepend(launch)"),'Coach not in course toolbar');
assert(coach.includes("head.insertAdjacentElement('afterend',launch)"),'Coach not at top of mobile drawer');
assert(coach.includes('backdrop.addEventListener'),'Backdrop dismissal missing');
assert(coach.includes("e.key==='Escape'"),'Keyboard dismissal missing');
assert(sync.includes("slot.className='dlp-sync-slot'"),'Save status is not in the toolbar');
assert(!sync.includes("position:fixed;right:18px"),'Legacy fixed save badge remains');
assert(css.includes('position:static!important')&&css.includes('html[data-theme="dark"]'),'Toolbar position or dark mode not covered');
console.log('PASS v20 unobstructed coach and inline sync | 22 pages | course toolbar, drawer, modal and themes');
