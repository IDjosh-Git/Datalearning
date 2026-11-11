/** Regression: every course is visually represented and Excel has one visible formula entry. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const js=read('assets/scripts/academy-app.js');
const style=read('assets/styles/course-discovery-grid-premium.css');
const ide=read('assets/scripts/arena-ide.js');
const css=read('assets/styles/practice-arena-premium-final.css');
const paths=JSON.parse(read('assets/data/academy-curriculum.json')).map(x=>x.slug).concat(['python','ai']);
assert.equal(new Set(paths).size,9);
for(const slug of paths){
 for(let n=1;n<=10;n++){
  const extension=slug==='excel'&&n===1?'png':'svg';
  assert(fs.existsSync(new URL(`../assets/images/lesson-interfaces/${slug}-week-${n}.${extension}`,import.meta.url)),`${slug} Week ${n} visual missing`);
 }
}
assert(js.includes('za-card-media')&&js.includes('za-catalog-visual'),'Discovery and catalog previews are required');
assert(js.includes('loading="lazy" decoding="async"'),'Preview images must be lazy-loaded');
assert(style.includes('body.za-discover #zaDiscoverCards .za-card-media'),'Premium course preview layout missing');
assert(ide.includes('answer.hidden=true')&&ide.includes('answer.tabIndex=-1'),'Hidden original worksheet grading textarea must remain inaccessible');
assert(ide.includes("const originalLabel=area.querySelector('label[for=\"practiceAnswer\"]')"),'Original grading input label should be found');
assert(ide.includes("originalLabel.hidden=true"),'Original input label should remain hidden');
assert(ide.includes('ide-result-formula')&&ide.includes('ide-result-value'),'Structured Excel result and formula fields must render');
assert(ide.includes('formatExcelPreview')&&ide.includes('Intl.NumberFormat'),'Excel results need friendly number formatting');
assert(css.includes('textarea#practiceAnswer.ide-visually-hidden'),'CSS must prevent second formula box even under layout overrides');
assert(css.includes('output.ide-result-value'),'Result typography must be styled');
console.log('PASS nine course preview cards, 90 weekly visuals, single visible Excel formula entry and accessible formatted results');
