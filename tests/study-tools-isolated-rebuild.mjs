/** Regression contract for independently routed Study Tools, 7-path selectors and preserved controllers. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const read=x=>fs.readFileSync(path.join(root,x),'utf8');
const hub=read('study-tools.html');
for (const [name,destination] of [
 ['Learning Coach','learning-coach.html'], ['Learning Lab','learning-lab.html'],
 ['AI Tutor','tutor.html'],['Practice Arena','practice.html'],
 ['Reference Library','reference.html'],
 ['Prompt Library','prompt-library.html']
]) {
 assert(hub.includes(`href="${destination}"`),`Study Tools ${name} must have an independent destination: ${destination}`);
}
const coach=read('learning-coach.html'); const lab=read('learning-lab.html');
const ref=read('reference.html');const capstone=read('capstone.html');
for(const page of [coach,lab,ref]) {
 assert(page.includes('study-tools-refined.css'),'New premium CSS missing');
 assert.equal((page.match(/class="dlst-hero"/g)||[]).length,1,'Only one primary hero per tool');
 assert(page.includes('public-footer.js'),'Public footer must remain on tool route');
}
for(const id of ['ss-plan-form','ss-session-list','ss-reveal','ss-save','ss-export','ss-import','study-plan','study-recall']) {
 assert(coach.includes(`id="${id}"`),`Coach controller target missing: ${id}`);
 assert(!lab.includes(`id="${id}"`),`Coach section leaked into Learning Lab: ${id}`);
}
for(const id of ['labSearch','labCards','labGroup','labMode','labReset']){
 assert(lab.includes(`id="${id}"`),`Lab controller target missing: ${id}`);
 assert(!coach.includes(`id="${id}"`),`Learning Lab section leaked into Coach: ${id}`);
}
for(const id of ['referenceSearch','referenceResults','categoryFilter','levelFilter','savedFilter','clearSearch']) assert(ref.includes(`id="${id}"`),`Reference Library controller broken: ${id}`);
const src=read('assets/scripts/study-success.js');
for(const slug of ['introduction','excel','sql','powerbi','tableau','powerquery','statistics']){
 assert(coach.includes(`value="${slug}"`),`Coach lacks ${slug}`);
 assert(src.includes(`${slug}:`),`Coach JS lacks ${slug}`);
}
assert(coach.includes('study-success.js')&&!coach.includes('src="assets/scripts/learning-lab.js"'),'Coach must run only Coach controller');
assert(lab.includes('learning-lab.js')&&!lab.includes('src="assets/scripts/study-success.js"'),'Lab must run only Lab controller');
assert(lab.includes('study-tools-route-compat.js'),'Legacy coach hash bookmarks must redirect');
assert(capstone.includes('dlst-privacy-note')&&capstone.includes('capstoneForm'),'Privacy notice and capstone submission must be preserved');
assert(read('assets/scripts/public-footer.js').includes("['Learning Coach', 'learning-coach.html']"),'Footer Coach link must target its page');
assert(read('assets/styles/study-tools-refined.css').includes('prefers-reduced-motion'),'Reduced motion missing');
console.log('PASS isolated Study Tools pages, six learning destinations, unique navigation, capstone privacy and preserved controllers');
