/** Final polish: consistent actions, bounded surfaces and static mobile tutor. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {discoverPages} from './page-assets.mjs';
const read = p => fs.readFileSync(p,'utf8');
const pages=discoverPages();
const css=read('assets/styles/premium-unified.css');
const tutor=read('tutor.html');
const ai=read('assets/scripts/tutor-ai.js');
const drawer=read('assets/scripts/tutor-workspace.js');
assert.equal(pages.length,41,'All existing public/private HTML pages remain present');
for(const page of pages){
  assert(page.links.some(l=>l.path==='assets/styles/premium-unified.css'),`${page.route}: shared premium styles missing`);
  for(const ref of [...page.links,...page.scripts]){
    if(ref.local) assert(ref.exists,`${page.route}: unresolved ${ref.path}`);
  }
}
for(const id of ['tutorToolsToggle','tutorToolsScrim','tutorToolsPanel','tutorTopic','tutorModeAi','tutorModeOffline','chatMessages','chatQuestion','chatForm','quizPane']){
 assert(tutor.includes(`id="${id}"`),`Missing Tutor feature ${id}`);
}
assert(tutor.includes('class="tutor-privacy-disclosure"'));
assert(tutor.includes('class="tutor-action-disclosure"'));
assert(tutor.includes('class="tutor-suggestions"'));
assert(ai.includes("sidebar?.querySelector('.tutor-suggestions')?.before(quick)"),'Responsive tutor controls stay inside Tools drawer');
for(const name of ['aria-expanded','Escape','toggleAttribute(\'inert\'','tutor-drawer-open','tutor-settings-open','requestAnimationFrame(resize)'])
 assert(drawer.includes(name),`Accessible Tutor drawer detail absent: ${name}`);
for(const expected of ['body[data-responsive-page="tutor"]','height:100dvh!important','overscroll-behavior:contain!important','tutor-tools-scrim.tutor-scrim-open',':is(.tutor-suggestions,.tutor-extra-resources)','tutor-composer textarea','body main a.dalp-plain-link','body main a.cert-back-link','prefers-reduced-motion:reduce'])
 assert(css.includes(expected),`Premium finish CSS missing: ${expected}`);
// AA normal-text contrast for the final active tokens and common state surfaces.
function rgb(hex){if(hex.length===4)hex='#'+[...hex.slice(1)].map(c=>c+c).join('');return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4)}
function L(hex){return rgb(hex).reduce((a,n,i)=>a+[.2126,.7152,.0722][i]*n,0)}
function ratio(a,b){const x=L(a),y=L(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
const pairs=[['#fff','#4a37a4'],['#fff','#34247d'],['#fff','#44319b'],['#382887','#f3f0ff'],['#2e1f78','#e7e1fa'],['#352481','#f1efff'],['#475673','#fff'],['#253956','#f1f3fa'],['#192b4a','#fff'],['#fff','#182d52'],['#e3eafb','#192d53'],['#203451','#fff'],['#4a5b76','#fff']];
for(const [fg,bg] of pairs)assert(ratio(fg,bg)>=4.5,`Normal-text WCAG AA fail ${fg} on ${bg}: ${ratio(fg,bg).toFixed(2)}`);
console.log(`PASS premium finish: ${pages.length} pages, responsive Tutor drawer and stationary chat, 13 AA colour pairs, accessible links and controls`);
