import {hasCurrentPublicCache} from './cache-release-contract.mjs';
/* Course-sidebar refresh must remain readable and keep the original learning controls. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = p=>fs.readFileSync(p,'utf8');
const shared=read('assets/styles/public-motion.css');
const compact = c => c.replaceAll('#','');
const srgb=x => {const n=parseInt(x,16)/255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4;};
const luminance=c=>{c=compact(c);return srgb(c.slice(0,2))*.2126+srgb(c.slice(2,4))*.7152+srgb(c.slice(4,6))*.0722;};
const ratio=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
for(const [fg,bg,name] of [
 ['263b55','f8faff','normal lesson text'],['ffffff','142a46','brand card'],
 ['1f3958','f1f5fb','lesson disclosure'],['ffffff','194da1','SQL lesson badge'],
 ['ffffff','086443','Excel lesson badge'],['ffffff','785000','Power BI lesson badge'],
 ['ffffff','3446a4','Python lesson badge'],['263f5c','ffffff','study resource link'],
 ['492b84','edecf8','introduction lesson number'],['ffffff','552f91','AI active lesson']]){
 assert(ratio(fg,bg)>=4.5,`${name}: below normal-text contrast threshold: ${ratio(fg,bg).toFixed(2)}`);
}
for(const slug of ['excel','sql','powerbi','python']){
 const html=read(`courses/${slug}.html`);
 assert.match(html,/class="brand course-brand"/,`${slug}: brand missing`);
 assert.match(html,/class="sidebar-course-mark"/,`${slug}: course icon missing`);
 assert.match(html,/class="sidebar-search-icon"/,`${slug}: search icon missing`);
 assert.match(html,/class="sidebar-tools"/,`${slug}: learning tools missing`);
 assert.match(html,/class="sidebar-progress"/,`${slug}: progress missing`);
 assert.match(html,/id="searchInput"/,`${slug}: lesson search missing`);
 assert.match(html,/id="courseLessonIndex"/,`${slug}: lesson disclosure missing`);
 assert.equal((html.match(/class="nav-link" href="#week\d+"/g)||[]).length,10,`${slug}: one link for each lesson`);
 for(const icon of ['sidebar-tool-icon','sidebar-course-mark'])assert.match(html,new RegExp(icon));
 assert.match(shared,new RegExp(`\[data-course="${slug}"\]`),`${slug}: accent palette missing`);
}
for(const slug of ['introduction','ai']){
 const html=read(`courses/${slug}.html`);
 assert.match(html,/aria-label="(?:Introduction lesson list|AI course week list)"/,`${slug}: accessible lesson navigation missing`);
 assert.match(shared,new RegExp(`data-responsive-page="courses/${slug}"`),`${slug}: themed navigation missing`);
}
assert.match(read('assets/scripts/course-premium-sidebar.js'),/min-width:1051px/,'Desktop lessons should be discoverable');
assert.match(shared,/\[role="tab"\]/,'Plain-link override must be scoped narrowly');
assert(hasCurrentPublicCache(read('service-worker.js')),'New CSS needs a fresh offline cache key');
console.log('PASS modern course sidebars: all six tracks, 40 lesson links, responsive presentation and WCAG AA contrast pairs');
