/** Regression guard: every course/navigation icon must resolve to a local asset. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=(f)=>fs.readFileSync(path.join(root,f),'utf8');
const sourceFiles=['assets/scripts/modern.js','assets/scripts/learning-catalog.js','assets/scripts/reference.js','assets/scripts/arena-ide.js'];
for(const name of sourceFiles){
 const code=read(name);
 assert.doesNotMatch(code,/(?:\.\.\/)?assets\/icon-(?!s\/)/,`${name}: obsolete icon directory`);
 assert(/assets\/icons\/icon-|navMarks|dalpRefIcons/.test(code),`${name}: expected local icon path or embedded vector`);
}
const iconSlugs=['intro','excel','sql','powerbi','python','ai','capstone'];
for(const slug of iconSlugs){
 const filename=`assets/icons/icon-${slug}.svg`;
 assert.ok(fs.existsSync(path.join(root,filename)),`Missing ${filename}`);
 const svg=read(filename);
 assert.match(svg,/<svg\s/,`${filename} is not an SVG document`);
 assert.match(svg,/<\/svg>/,`${filename} has no closing svg tag`);
}
for(const f of ['courses/excel.html','courses/sql.html','courses/powerbi.html','courses/python.html','courses/ai.html','courses/introduction.html']){
 const expected=f.includes('introduction')?'intro':path.basename(f,'.html');
 assert.match(read(f),/<svg[^>]*viewBox="0 0 64 64"/,`${f}: course icon should be an embedded SVG`);
 assert.doesNotMatch(read(f),/src="\.\.\/assets\/icons\/icon-/,`${f}: course icon should not depend on outdated asset URLs`);
}
assert.doesNotMatch(read('practice.html'),/<img[^>]*src=\"https:\/\/cdn\.(?:simpleicons\.org|jsdelivr\.net)/,'Arena logos must load from local icons');
assert.doesNotMatch(read('assets/scripts/arena-ide.js'),/<img[^>]*src=\"https:\/\/cdn\.(?:simpleicons\.org|jsdelivr\.net)/,'IDE logos must load from local icons');
const css=read('assets/styles/layout-tuning.css');
assert.match(css,/\.dlp97-subject-icon svg/,'inline navigation icons need fixed sizing');
assert.match(css,/\.dlp90-practice-actions > a:not\(\.dlp90-arena-cta\)/,'studio link should be unboxed');
assert.match(css,/\.arena-task-panel\.is-collapsed/,'details panel needs a collapsed state');
const navigation=read('assets/scripts/learning-catalog.js');
assert.match(navigation,/const navIcon=name=>.*dlp97-icon-mark|const navIcon=name=>`<span/, 'Navigation monogram marks missing');
assert.match(read('assets/styles/experience.css'),/\.dlp97-icon-mark/, 'Navigation icons need deterministic sizing');
assert.match(navigation,/dalp-quick-guide/, 'Course guide should use compact quick links');
console.log('PASS embedded course icons, shipped SVGs, navigation sizing, and icon-safe links');
