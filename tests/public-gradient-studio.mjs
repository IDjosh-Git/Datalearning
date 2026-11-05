import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {root} from './page-assets.mjs';
const css=fs.readFileSync(path.join(root,'assets/styles/design-system.css'),'utf8');
const publicFiles=['index.html','catalog.html','practice.html','capstone.html','capstone-guide.html','reference.html','prompt-library.html','tutor.html','studio.html','learning-lab.html',...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>`courses/${f}`)];
for(const file of publicFiles){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 assert.match(html,/<body\b[^>]*data-gradient-public="true"/,`${file}: public gradient marker missing`);
}
for(const file of ['admin.html','auth.html','account.html','reviewer.html','progress.html']){
 assert.doesNotMatch(fs.readFileSync(path.join(root,file),'utf8'),/data-gradient-public="true"/,`${file}: protected UI should be unchanged`);
}
for(const category of ['introduction','excel','sql','powerbi','python','ai']) {
 assert(css.includes(`.dlp97-card[data-course="${category}"]`),`${category}: catalog color missing`);
 assert.match(fs.readFileSync(path.join(root,`courses/${category}.html`),'utf8'), /data-learning-subject="(?:intro|excel|sql|powerbi|python|ai)"/);
}
assert.equal((fs.readFileSync(path.join(root,'catalog.html'),'utf8').match(/data-gradient-action="true"/g)||[]).length,6);
assert.equal((fs.readFileSync(path.join(root,'index.html'),'utf8').match(/data-gradient-action="true"/g)||[]).length,1,'Remove action duplication along with the course cards');
assert.match(css, /@layer public-gradient-actions/, 'Primary CTA layer missing');
assert.match(css, /prefers-reduced-motion:reduce/, 'Reduced-motion support missing');
assert.match(css, /forced-colors:active/, 'High contrast support missing');
console.log(`PASS public gradients: ${publicFiles.length} public pages, six distinct course colors, visible actions, protected pages untouched`);
