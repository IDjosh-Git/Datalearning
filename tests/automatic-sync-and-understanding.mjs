import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync('assets/scripts/cloud-workspace.js','utf8');
assert(source.includes("indexedDB.open(DB_NAME,2)"));
assert(source.includes('archiveConflict(k,value,rev,user)'));
assert(source.includes('offerRecovery()'));
assert(source.includes("window.dispatchEvent(new CustomEvent('dalp:cloud-hydrated',{detail:{key:k,source:'cloud'}}))"));
assert(source.includes('if(!(await archiveConflict(k,value,rev,user)))'));
for(const page of ['account.html','capstone.html','tutor.html','learning-coach.html','practice.html','quiz.html']){
 const html=fs.readFileSync(page,'utf8');assert(!html.includes('class="mastery-entry"'),`${page} still has repeated top banner`);
}
assert(fs.readFileSync('practice.html','utf8').includes('class="dalp-check-footer"'));
for(const course of ['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai']){
 const html=fs.readFileSync(`courses/${course}.html`,'utf8');
 assert(html.includes('class="dalp-check-footer"'),`${course} missing contextual knowledge check`);
 assert(html.indexOf('class="dalp-check-footer"')>html.indexOf('id="zaLessonActions"'),`${course} check is not after lesson`);
}
console.log('PASS automatic sync recovery safeguards and contextual understanding links across nine courses');
