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
 assert.match(code,/assets\/icons\/icon-/,`${name}: expected canonical icon directory`);
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
 assert.ok(read(f).includes(`../assets/icons/icon-${expected}.svg`),`${f}: invalid course icon path`);
}
assert.doesNotMatch(read('practice.html'),/<img[^>]*src=\"https:\/\/cdn\.(?:simpleicons\.org|jsdelivr\.net)/,'Arena logos must load from local icons');
assert.doesNotMatch(read('assets/scripts/arena-ide.js'),/<img[^>]*src=\"https:\/\/cdn\.(?:simpleicons\.org|jsdelivr\.net)/,'IDE logos must load from local icons');
const css=read('assets/styles/layout-tuning.css');
assert.match(css,/\.dlp97-subject-icon img/,'navigation icons need fixed sizing');
assert.match(css,/\.dlp90-practice-actions > a:not\(\.dlp90-arena-cta\)/,'studio link should be unboxed');
assert.match(css,/\.arena-task-panel\.is-collapsed/,'details panel needs a collapsed state');
console.log('PASS local navigation icons: canonical paths, existing SVGs, size rules, and accessible links');
