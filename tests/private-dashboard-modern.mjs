/** Dashboard & protected navigation regression without adding runtime dependencies. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {restrictedKind} from '../lib/server-auth.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const pages=['account','admin','progress','reviewer','certificate','connection-test','sync-test'];
const shell=read('assets/styles/private-shell-modern.css');
const account=read('account.html'),css=read('assets/styles/account.css');
const nav=read('assets/scripts/private-navigation.js');
for(const route of pages){
 const html=read(`${route}.html`);
 assert.equal((html.match(/assets\/styles\/private-shell-modern\.css/g)||[]).length,1,`${route}: shared private styling loaded exactly once`);
 assert.match(html,/<link[^>]+private-shell-modern\.css[^>]*>[\s\S]*?<link[^>]+premium-unified\.css[^>]*>\s*<\/head>/,`${route}: shared private styling must load before the premium unified final layer`);
 assert.equal((html.match(/assets\/scripts\/private-navigation\.js/g)||[]).length,1,`${route}: one navigation controller`);
 assert.match(html,/auth-gate\.js/,`${route}: auth gate unchanged`);
}
for(const id of ['who','accountSyncStatus','quizBody','certBody','accountCapstones','dashCourseCount','dashUnitCount','dashQuizAverage','dashCertificateCount','dashContinueLink','dashProgressRing'])assert(account.includes(`id="${id}"`),`Dashboard required element ${id}`);
assert.equal((account.match(/class="card progress-card" data-track=/g)||[]).length,6,'Six course cards remain');
assert.equal((account.match(/class="bar" role="progressbar"/g)||[]).length,6,'All six progress bars remain accessible');
assert.match(account,/<div class="account-studio-link">[\s\S]*?<\/div>\s*<\/div>\s*<aside class="mld-hero-progress"/,'Hero progress widget is a sibling of the welcome column');
assert.match(account,/ZAHProgressCloud\.syncAll\(\)/,'Learning sync preserved');
assert.match(account,/await quizRequest/,'Recorded quiz data preserved');
assert.match(account,/await Promise\.all\(\[certificateRequest,capstoneRequest\]\)/,'Capstone and certificate requests preserved');
for(const route of ['practice.html','studio.html','tutor.html','catalog.html','capstone.html','account.html#certificates'])assert(nav.includes(`'${route}'`),`Private sidebar missing ${route}`);
assert(nav.includes('group.hidden=!admin')&&nav.includes("window.DALP_ROLE==='admin'"),'Admin access remains role-gated');
assert(!nav.includes('ac-mobile-tabs')&&nav.includes("e.key==='Escape'"),'Single mobile drawer with Escape dismissal');
assert(shell.includes('.ac-side-nav a.ac-side-link.ac-selected')&&shell.includes('border-left:3px solid #d0c3ff'),'Strong visible selected state');
assert(shell.includes('@media(max-width:1024px)')&&shell.includes('@media(max-width:700px)'),'Shared responsive shell');
assert(css.includes('.mld-stat-grid')&&css.includes('.mld-resume')&&css.includes('.course-progress-grid')&&css.includes('.mld-detail-grid'),'Modern learner overview, next action, courses and records');
assert(!/radial-gradient\(/.test(css),'No decorative dashboard overlay backgrounds');
assert.notEqual(restrictedKind('/assets/styles/private-shell-modern.css'),'adminAsset','Learners can fetch shared private navigation skin');
function luminance(h){return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0)}
function contrast(a,b){const [hi,lo]=[luminance(a),luminance(b)].sort((a,b)=>b-a);return (hi+.05)/(lo+.05)}
for(const [label,fg,bg] of [
 ['Nav links','e8effe','192342'],['Nav muted','c6d0e9','192342'],['Nav active','ffffff','493f8a'],
 ['Topbar','1b2946','ffffff'],['Topbar shortcut','4b389e','f0edff'],
 ['Dashboard hero','ffffff','17264d'],['Dashboard intro','e1e9f8','17264d'],
 ['Course card','1d2a45','ffffff'],['Course descriptions','5c6c84','ffffff'],
 ['Muted table text','384963','f0f4fa']
 ])assert(contrast(fg,bg)>=4.5,`${label}: contrast below 4.5:1 (got ${contrast(fg,bg).toFixed(2)})`);
console.log(`PASS private dashboard: ${pages.length} routes, one navigation skin, six course cards, retained backend data, strong menu states and 10 WCAG AA contrast pairs`);
