/** Regression audit: deliberate dark, contrasting public page and course mastheads. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const publicPages=['index.html','catalog.html','preview.html','reference.html','prompt-library.html','tutor.html','learning-lab.html','practice.html','studio.html','capstone.html','capstone-guide.html','verify.html','auth.html'];
const tracks=['introduction','excel','sql','powerbi','python','ai'];
const courses=tracks.flatMap(t=>[`courses/${t}.html`,`courses/${t}-roadmap.html`,`courses/${t}-extension.html`]);
const pages=[...publicPages,...courses];
const palette=['#203a57','#263d5d','#303561','#29476b','#3b365c','#29374e'];
const css=fs.readFileSync(path.join(root,'assets/styles/design-system.css'),'utf8');
const worker=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
for(const file of pages){
  const html=fs.readFileSync(path.join(root,file),'utf8');
  assert.match(html,/<body\b[^>]*data-dalp-header-tone="(ink|navy|indigo|slate|plum|ink-slate)"/,`${file}: needs a recognized tone`);
  assert.equal((html.match(/class="[^"]*\bdalp-themed-hero\b/g)||[]).length,1,`${file}: needs exactly one primary dark header surface`);
  assert.equal((html.match(/class="[^"]*\bdalp-global-header\b/g)||[]).length, file==='auth.html'||file==='preview.html'||file==='capstone-guide.html'||file==='verify.html'?0:1,`${file}: unexpected public masthead`);
  assert.match(html,/assets\/styles\/design-system\.css/,`${file}: missing shared theme`);
  assert.match(html,/<h1\b/,`${file}: missing page heading`);
}
function luminance(hex){
  const channels=hex.match(/[0-9a-f]{2}/gi).map(v=>parseInt(v,16)/255);
  const linear=channels.map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
  return .2126*linear[0]+.7152*linear[1]+.0722*linear[2];
}
function contrast(a,b){const [x,y]=[luminance(a),luminance(b)].sort((a,b)=>b-a);return (x+.05)/(y+.05)}
for(const color of palette){
  for(const fg of ['#ffffff','#e0eaf6','#dceaff','#ffe0a1']){
    assert(contrast(color,fg)>=4.5,`${fg} on ${color} fails normal text contrast: ${contrast(color,fg).toFixed(2)}`);
  }
}
assert(contrast('#e4edfa','#13243b')>=4.5,'Primary nav links are not sufficiently legible');
assert(contrast('#ffffff','#355474')>=4.5,'Week headings are not sufficiently legible');
assert.match(css,/body \.dalp-themed-hero\s*\{/,'Shared dark hero styling missing');
assert.match(css,/\.week-header\s*\{\s*background:#355474!important/,'Course week header theme missing');
assert(!css.includes('html[data-theme="light"] :is(.hero,.ai-hero,.intro-hero,.dlp97-catalog-hero,.lp-hero,.auth-hero,.admin-hero){'),'Retired pale hero rule still exists');
assert.doesNotMatch(css,/body\.dlp-course-v29 \.topbar\{background:#fff!important/,'Legacy white course header still exists');
assert.match(worker,/const CACHE = 'dalp-public-[a-z0-9-]+-v\d+'/,'Offline cache must use the current learner theme revision');
console.log(`PASS public header audit: ${pages.length} public/course routes, ${palette.length} dark tones, dark course headers, contrast >=4.5:1`);
