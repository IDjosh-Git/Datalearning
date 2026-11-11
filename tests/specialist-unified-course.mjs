import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=path=>readFileSync(join(root,path),'utf8');
const css=read('assets/styles/specialist-unified-course.css');
const script=read('assets/scripts/specialist-unified-course.js');
for(const name of ['python','ai']){
 const html=read(`courses/${name}.html`);
 assert.equal((html.match(/specialist-unified-course\.css/g)||[]).length,1,`${name}: one new CSS include`);
 assert.equal((html.match(/specialist-unified-course\.js/g)||[]).length,1,`${name}: one new JS include`);
 assert.ok(html.indexOf('specialist-unified-course.css')<html.indexOf('public-search-premium.css'),`${name}: shared search CSS remains last`);
 for(let n=1;n<=10;n++){
  assert.match(html,new RegExp(`id="week${n}"`),`${name}: week ${n} retained`);
 }
 assert.ok(html.includes('weekly-workspace.js'),`${name}: original week navigation retained`);
 assert.ok(html.includes('week10-capstone-'+name+'.js'),`${name}: Week 10 capstone retained`);
 assert.ok(html.includes('week-learning-resources.js'),`${name}: lesson media resources retained`);
 assert.ok(html.includes('course-premium-sidebar.js'),`${name}: accessible course drawer retained`);
 assert.ok(html.includes('course-video-player.js'),`${name}: in-app video retained`);
 assert.ok(html.includes('ten-week-masterclass.js'),`${name}: comprehensive lessons retained`);
 assert.match(css,new RegExp(`body\\.sxl-unified-course\\[data-course="${name}"\\]`),`${name}: course-aware stylesheet`);
 assert.match(script,new RegExp(`${name}: \\{name:`),`${name}: dedicated course identity`);
}
for(const asset of ['icon-python.svg','icon-ai.svg'])assert.ok(existsSync(join(root,'assets/icons',asset)),`${asset}: image is bundled`);
for(const selector of ['.sxl-course-hero','.sxl-week-toolbar','.sxl-rail-brand','.sxl-hero-meter','.sxl-course-options','.cw-module-tabs','.cw-resources'])assert.ok(css.includes(selector),`expected premium design ${selector}`);
for(const behavior of ['sxlWeekSelect','hashchange','aria-valuenow','completeBox','dalp:','course-top-actions'])assert.ok(script.includes(behavior.replace('dalp:','zah:')),`expected interaction ${behavior}`);
assert.match(css,/@media\(max-width:720px\)/,'Mobile single-column study resources');
assert.match(css,/@media\(max-width:400px\)/,'Small phone layout');
assert.match(css,/@media\(prefers-reduced-motion:reduce\)/,'Reduced motion');
assert.match(css,/grid-row:2/,'Resource grid has explicit second row');
console.log('PASS unified specialist courses: AI/Python branding, responsive reading workspace, progress and week control, preserved quizzes/videos/capstone');
