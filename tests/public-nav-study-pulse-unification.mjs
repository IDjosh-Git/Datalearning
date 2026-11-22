/** The same public header, full-height mobile menu, and floating Study Pulse on every public page. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const privateRoutes=new Set(['account.html','admin.html','certificate.html','connection-test.html','profile.html','progress.html','reviewer.html','sync-test.html','career-setup.html']);
const pages=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')&&!privateRoutes.has(f)&&f!=='auth.html'&&f!=='landing.html'&&f!=='start-here.html'&&f!=='studio.html'&&f!=='career-paths.html'&&f!=='free-lesson.html'),...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>'courses/'+f)];
const navs=['index.html','index.html#zaDiscoverCards','study-tools.html','practice.html','tutor.html','capstone.html'];
for(const p of pages){
 const src=read(p),base=p.startsWith('courses/')?'../':'';
 assert.equal((src.match(/class="dlu-header"/g)||[]).length,1,`${p}: one public header`);
 assert.equal((src.match(/id="dluNavPanel"/g)||[]).length,1,`${p}: one full-screen navigation drawer`);
 assert.equal((src.match(/id="dluNavOpen"/g)||[]).length,1,`${p}: mobile open control`);
 assert.equal((src.match(/id="dluNavClose"/g)||[]).length,1,`${p}: close control`);
 assert(!src.includes('class="za-header"')&&!src.includes('class="dlx-header"')&&!src.includes('class="dalp-global-header"'),`${p}: old navigation markup removed`);
 for(const dest of navs)assert(src.includes(`href="${base}${dest}"`) || (dest==='catalog.html' && src.includes('href="/courses"')),`${p}: missing common nav destination ${dest}`);
 for(const fname of ['public-header-unified.js','premium-search.js','learner-companion.js']){
  assert.equal((src.match(new RegExp(`src="${base}assets/scripts/${fname.replaceAll('.','\\.')}"`,'g'))||[]).length,1,`${p}: ${fname} included once`);
 }
 assert(src.includes(`href="${base}assets/styles/public-header-unified.css"`),`${p}: unified styles missing`);
 assert(!src.includes('public-navigation.js')&&!src.includes('unified-academy-shell.js'),`${p}: legacy controller still linked`);
}
for(const p of privateRoutes){const src=read(p);assert(!src.includes('class="dlu-header"'),`${p}: protected workspace must keep role-aware nav`)}
assert(!read('auth.html').includes('learner-companion.js'),'Sign-in must not initialize a floating study widget');
const coach=read('assets/scripts/learner-companion.js');
assert(coach.includes("launch.className='lc-launch lc-pulse-trigger'"));
assert(coach.includes('Study Pulse'));
assert(!coach.includes('function placeLaunch()'),'The floating widget must not move into the header');
for(const token of ['dalp-companion-v1:', 'Log learning session','lc-goal','data-action="bookmark"','data-action="import"'])assert(coach.includes(token),`Study Pulse lost original habit-tracking feature ${token}`);
const css=read('assets/styles/public-header-unified.css');
for(const token of ['dlu-nav-panel:not([hidden])','height:100dvh!important','transform:none!important','lc-pulse-trigger','lc-pulse-panel','calc(17px + env(safe-area-inset-left))'])assert(css.includes(token),`Unification style missing ${token}`);
const nav=read('assets/scripts/public-header-unified.js');
for(const token of ['aria-expanded','Escape','shiftKey','Tab','focus(','dlu-nav-open'])assert(nav.includes(token));
console.log(`PASS public navigation & Study Pulse: ${pages.length} public pages, protected navigation intact, one floating habits control`);
