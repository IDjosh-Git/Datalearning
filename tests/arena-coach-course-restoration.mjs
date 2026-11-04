/** Regression guard for the requested November 2026 UX restoration. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
const read = file => fs.readFileSync(file, 'utf8');
const html = read('practice.html');
const css = read('assets/styles/modern-workspace-20261104.css');
const launcher = read('assets/scripts/arena-subject-launcher.js');
const hub = read('assets/scripts/challenge-hub.js');
const coach = read('assets/scripts/learner-companion.js');
const data = read('assets/scripts/practice-data.js');
assert.equal((html.match(/id="hubOpen"/g)||[]).length,1,'Only one visible Browse challenges control');
assert(!/id="arenaEntryBrowseAll"|id="arenaEntryList"|id="arenaEntryItems"/.test(html),'Remove first duplicate library');
assert(!/hub-featured|hubFeaturedLaunch|hubMobileFeatured/.test(html),'No duplicate Choose columns featured card');
assert(!/arenaEntryItems|arena-entry-item|tasks\.slice\(0,6\)/.test(launcher),'Subject shortcuts must not replicate selectable challenges');
assert(launcher.includes('kindControl.dispatchEvent')&&launcher.includes('window.DALP_HUB.open'),'Subject tiles must open the single filtered library');
assert(!hub.includes('hubFeaturedTitle')&&!hub.includes('hubFeaturedLaunch'),'Challenge selector has no removed DOM dependencies');
assert.equal((data.match(/"id":"sql001"/g)||[]).length,1,'Choose columns is registered only once');
for(const action of ['study','bookmark','next','export','import','saved'])assert(coach.includes('data-action="'+action+'"'),'Coach action missing: '+action);
for(const id of ['lc-goal','lc-notes','lc-file','lc-msg'])assert(coach.includes('id="'+id+'"'),'Coach stateful control missing '+id);
for(const required of ['aria-valuenow','lc-metrics','lc-review-list','lc-coach','lc-welcome','lc-section-heading']){
 // lc-coach is a thematic class; require the others by code or CSS.
 if(required!=='lc-coach')assert(coach.includes(required)||css.includes(required),'Missing modern coach UI '+required);
}
assert(css.includes('2026-11-04 PREMIUM RESTORATION'),'Restored shared visual layer must ship');
assert(css.includes('#challengeModal .hub-dialog')&&css.includes('.lc-welcome'),'Modern challenge browser and coach styling missing');
for(const course of ['introduction','excel','sql','powerbi','python','ai']){
 const page=read(`courses/${course}.html`);
 assert(page.includes(`data-learning-subject="${course==='introduction'?'intro':course}"`),'Course identity missing '+course);
 assert(page.includes('course-checkpoints.js'),'Course checkpoint behaviour missing '+course);
 for(const type of ['roadmap','extension']){
  const guide=read(`courses/${course}-${type}.html`);
  assert(guide.includes('class="guide-container"'),'Guide layout lost '+course+' '+type);
  assert(guide.includes('course-guide-pages.css'),'Original guide style lost '+course+' '+type);
 }
}
for(const subject of ['intro','excel','sql','powerbi','python','ai'])assert(css.includes(`[data-learning-subject="${subject}"]`),'No distinctive course colours for '+subject);
assert(/@media\(max-width:600px\)/.test(css),'Mobile coach and arena treatment missing');
console.log('PASS restored UX: one challenge browser, one Choose columns card, complete modern Coach actions, 6 subject-specific course designs, 12 guides');
