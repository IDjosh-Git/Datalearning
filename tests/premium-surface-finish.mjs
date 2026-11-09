import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(new URL('..',import.meta.url).pathname);
const css=fs.readFileSync(path.join(root,'assets/styles/premium-unified.css'),'utf8');
for(const piece of [
 'Premium Surface Finish',
 '--finish-shadow-hover',
 '--finish-control-radius',
 '.dlp97-card',
 '.dh-tool-card',
 '.profile-card',
 '.cap-panel',
 '.tutor-welcome',
 '.course-mastery',
 '.cv88-lesson-contract',
 'body.lp-home main#main-content',
 '.dalp-menu-panel',
 ':focus-visible',
 'prefers-reduced-motion',
 'min-height: 44px'
]) assert(css.includes(piece),`Premium styling component/contract missing: ${piece}`);
for(const file of ['index.html','catalog.html','tutor.html','courses/excel.html','courses/ai.html','profile.html','admin.html']){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 assert(html.includes('premium-unified.css'),`${file}: last-loaded theme missing`);
}
console.log('PASS premium surface finish: public, private, course, form, navigation, responsive, accessible and Tutor styles');
