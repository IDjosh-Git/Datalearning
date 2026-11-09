import assert from 'node:assert/strict';
import fs from 'node:fs';
for(const slug of ['introduction','excel','sql','powerbi','python','ai']){
 const html=fs.readFileSync(`courses/${slug}.html`,'utf8');
 assert.equal((html.match(/class="course-portal-links"/g)||[]).length,1,`${slug}: one visible course resource bar`);
 assert(!html.includes('class="dalp-course-resource-links"'),`${slug}: duplicated hero links`);
 assert(!html.includes('class="capstone-path-v74"'),`${slug}: oversized capstone notice`);
 assert(html.includes(`href="${slug}-roadmap.html"`),`${slug}: missing roadmap route`);
 assert(html.includes(`href="${slug}-extension.html"`),`${slug}: missing curriculum route`);
}
const css=fs.readFileSync('assets/styles/course-page-improvements.css','utf8');
for(const token of ['--course-content-max:1380px','.capstone-requirement-strip','--course-muted:var(--ui-muted)','align-items:start!important'])assert(css.includes(token),`Missing ${token}`);
console.log('PASS six consistent course resource bars, compact notices, layout constraints and text contrast.');
