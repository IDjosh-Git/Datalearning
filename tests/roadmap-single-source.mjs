import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
for(const slug of ['python','ai']){
 assert(!fs.existsSync(path.join(root,`courses/${slug}-roadmap.html`)),`${slug} legacy roadmap still in project`);
 for(const page of [`courses/${slug}.html`,`courses/${slug}-extension.html`]){
  const html=read(page);
  assert(!html.includes(`${slug}-roadmap.html`),`${page} links to legacy roadmap`);
  assert(html.includes('career-path.html#masterLearningPath'),`${page} missing canonical career path link`);
 }
}
const catalogue=read('career-path.html');
assert(catalogue.includes('id="masterLearningPath"'));
const script=read('assets/scripts/master-pathway.js');
const courseDefs=[...script.matchAll(/\{slug:'([a-z]+)',name:'([^']+)'/g)];
assert.equal(courseDefs.length,9,'The career roadmap must display all nine course cards');
for(const slug of ['python','ai']){
 assert(courseDefs.some(m=>m[1]===slug),`${slug} missing from roadmap course cards`);
 assert(read('assets/scripts/master-pathway-data.js').includes(`\"${slug}\":[`),`${slug} missing module bridges`);
}
assert(script.includes('dlp-course-card-bottom') && script.includes('Open course'));
assert(script.includes('dlp-related-links') && script.includes('courseBridges'));
const css=read('assets/styles/master-pathway.css');
for(const expected of ['.dlp-guided-grid','.dlp-course-python','.dlp-course-ai','@media(max-width:580px)']) assert(css.includes(expected));
const manifest=JSON.parse(read('docs/SITE_ROUTE_MANIFEST.json'));
assert(!manifest.categories.supplementary_course_guides.some(route=>route.includes('-roadmap.html')));
for(const extension of ['courses/python-extension.html','courses/ai-extension.html']) assert(manifest.categories.supplementary_course_guides.includes(extension));
for(const file of fs.readdirSync(path.join(root,'courses'))){
 if(!file.endsWith('.html'))continue;
 const src=read(`courses/${file}`);
 assert(!/href=["'][^"']*(?:python|ai)-roadmap\.html/i.test(src),`${file}: stale link`);
}
console.log('PASS one canonical career roadmap, nine course links, and zero obsolete roadmap pages or links');
