/** Regression check for the maintained light workspace and responsive public surfaces. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>readFileSync(path.join(root,p),'utf8');
const shared=read('assets/styles/design-system.css');
const admin=read('assets/styles/admin-workspace.css');
const learner=read('assets/styles/account.css');
const cache=read('service-worker.js');
for(const width of [420,767,1199]){
 assert(shared.includes(`max-width:${width}px`),`Missing tested mobile/tablet breakpoint: ${width}`);
}
for(const cls of ['.dalp-global-header','.dalp-global-nav.is-open','.dalp-public-footer__grid','body.dlp-course-v29', '.lp-course-grid']){
 assert(shared.includes(cls),`Missing public responsive surface: ${cls}`);
}
assert(shared.includes('overflow-x:auto')&&shared.includes('overscroll-behavior-inline:contain'),'Overflowing tables and code must scroll within content');
assert(shared.includes('prefers-reduced-motion:reduce'),'Reduced motion must remain available');
assert.match(admin,/--ac-canvas:#f5f7fb/,'Admin must use the light canvas');
assert.match(admin,/--ac-panel:#ffffff/,'Admin cards must be white');
assert.match(admin,/--ac-text:#15243a/,'Admin default text must be dark');
assert.match(admin,/\.ac-sidebar\{[^}]*background:var\(--ac-deep\)/,'Admin sidebar must use the light surface token');
assert.match(admin,/\.ac-mobile-tabs\{[^}]*background:#ffffff!important/,'Admin mobile tabs must be light');
assert.match(admin,/\.ac-detail-backdrop:not\(\[hidden\]\)/,'Authenticated learner detail backdrop must remain');
assert.match(admin,/\.ac-nav-overlay\{[^}]*background:#080f1dc4/,'Mobile menu scrim must remain functional');
assert.match(learner,/\.account-overview\s*\{[^}]*background:#eaf0ff/,'Account introduction panel should be light indigo');
assert(!learner.includes('background:#172d4d;'),'Old dark learner hero must not return');
for(const route of ['admin.html','progress.html','reviewer.html']){
 const html=read(route);
 assert(html.indexOf('assets/styles/design-system.css')<html.indexOf('assets/styles/admin-workspace.css'),`${route}: light admin CSS should win over shared base`);
 assert(html.includes('assets/scripts/auth-gate.js'),`${route}: access protection must be preserved`);
}
assert.match(cache,/dalp-public-performance-v7/,'Offline public stylesheet cache must be refreshed');
function lum(hex){return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((a,x,i)=>a+[.2126,.7152,.0722][i]*x,0)}
function contrast(a,b){const [hi,lo]=[lum(a),lum(b)].sort((a,b)=>b-a);return (hi+.05)/(lo+.05)}
for(const [name,fg,bg] of [
 ['Admin text','#15243a','#ffffff'],
 ['Admin muted text','#50627a','#ffffff'],
 ['Admin links','#3035b0','#ffffff'],
 ['Learner hero text','#15243a','#eaf0ff'],
 ['Learner hero muted','#4f607b','#eaf0ff'],
 ['Learner hero links','#3035b0','#eaf0ff']
])assert(contrast(fg,bg)>=4.5,`${name} contrast insufficient: ${contrast(fg,bg).toFixed(2)}:1`);
console.log('PASS responsive/light theme: phone/tablet breakpoints, public cards/menus, 3 protected light pages, learner light page, 6 AA contrast checks and cache revision');
