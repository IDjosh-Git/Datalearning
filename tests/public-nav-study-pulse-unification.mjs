/** The same public header, full-height mobile menu, and floating Study Pulse on every public page. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const privateRoutes=new Set(['account.html','admin.html','certificate.html','connection-test.html','profile.html','progress.html','reviewer.html','sync-test.html','career-setup.html']);
const pages=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')&&!privateRoutes.has(f)&&f!=='auth.html'&&f!=='landing.html'&&f!=='start-here.html'&&f!=='studio.html'),...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>'courses/'+f)];
const navs=['index.html','catalog.html','study-tools.html','practice-hub.html','practice.html','tutor.html','capstone.html'];
for(const p of pages){
 const src=read(p),base=p.startsWith('courses/')?'../':'';
 assert.equal((src.match(/data-academy-navigation/g)||[]).length,1,p+": one shared mount");
 assert(!/<header[^>]*class="(?:dlu|dlp)-header"/.test(src));
 for(const name of ['academy-navigation.js','premium-search.js'])assert(src.includes(name));
 if(!['career-paths.html','free-lesson.html'].includes(p))assert(src.includes('learner-companion.js'));
 assert(src.includes('academy-navigation.css'));
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
for(const token of ['lc-pulse-trigger','lc-pulse-panel','calc(17px + env(safe-area-inset-left))'])assert(css.includes(token),`Unification style missing ${token}`);
const nav=read('assets/scripts/academy-navigation.js');
for(const token of ['aria-expanded','Escape','showModal','focus('])assert(nav.includes(token));
console.log(`PASS public navigation & Study Pulse: ${pages.length} public pages, protected navigation intact, one floating habits control`);
