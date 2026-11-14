/** Nine coherent progressive teaching paths, with no breaks to auth/progress/capstone. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(base,p),'utf8');
const ladders=JSON.parse(read('assets/data/course-educator-depth.json'));
const modules=JSON.parse(read('assets/data/ten-week-tool-to-report.json'));
const expected=['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'];
assert.deepEqual(Object.keys(ladders).sort(),expected.slice().sort());
const textSet=new Set();
let total=0;
for(const slug of expected){
  assert.equal(ladders[slug].length,10,`${slug} must have ten progressive weeks`);
  const page=read(`courses/${slug}.html`);
  assert(page.includes('course-educator-depth.js?v=educator-20261113'),`${slug} missing educator module`);
  const loaders=['ten-week-tool-to-report-data.js','specialist-course-data.js','course-educator-depth.js','academy-app.js'];
  assert(loaders.every(x=>page.includes(x)),`${slug} missing part of the shared course pipeline`);
  assert(page.indexOf('course-educator-depth.js')<page.indexOf('academy-app.js'));
  assert(page.includes('academy-learning-depth.css?v=educator-20261113'));
  for(const [i,lesson] of ladders[slug].entries()){
    assert.equal(lesson.week,i+1);
    const level=i<2?'Start here':i<5?'Build your skills':i<8?'Apply professionally':'Advanced practice';
    assert.equal(lesson.level,level,`${slug} week ${i+1} phase`);
    for(const k of ['foundation','worked','extension','evidence']){
      assert(lesson[k].length>45,`${slug}/${i+1} ${k} missing teaching detail`);
      assert(!textSet.has(lesson[k]),`${slug}/${i+1} repeated ${k}`);
      textSet.add(lesson[k]);
    }
    assert(modules[slug][i].topics.length===4,`${slug}/${i+1} underlying core concepts`);
    assert(modules[slug][i].guide.steps.length===4,`${slug}/${i+1} guided demonstration`);
    total++;
  }
}
const ctx={window:{}};
vm.runInNewContext(read('assets/scripts/course-educator-depth.js'),ctx);
assert.equal(Object.keys(ctx.window.DALP_EDUCATOR_DEPTH).length,9);
assert.equal(ctx.window.DALP_EDUCATOR_DEPTH.ai[8].week,9);
const uiCtx={window:{DALP_WEEK_MEDIA:{}}};
vm.runInNewContext(read('assets/scripts/ten-week-masterclass.js'),uiCtx);
for(const slug of expected){
 const m=modules[slug][9];
 const html=['python','ai'].includes(slug)?uiCtx.window.DALP_TEN_WEEK_UI.renderSpecialist(m,'../'):uiCtx.window.DALP_TEN_WEEK_UI.renderCore(m,'../');
 assert(html.includes('dlm-masterclass-head'));
 assert(html.includes('dlm-topic-grid'));
 if(['python','ai'].includes(slug))assert(html.includes('dlm-capstone'),`specialist ${slug} must retain capstone`);
}
const app=read('assets/scripts/academy-app.js');
for(const check of ['rebuiltModule?.guide','window.DALP_EDUCATOR_DEPTH','za-learning-concepts','za-learning-process','za-learning-depth-worked','za-learning-interpretation','zaDeeperLearning','safe(educator.extension)','safe(educator.evidence)','renderSpecialist?.(rebuiltModule,base)','saveWeek(slug,week,true)'])assert(app.includes(check),`Shared reader missing ${check}`);
const css=read('assets/styles/academy-learning-depth.css');
assert(css.includes('grid-template-columns:repeat(3,minmax(0,1fr))'));
assert(css.includes('grid-template-columns:1fr'));
assert(css.includes('overflow:auto'));
assert(!read('assets/styles/ten-week-masterclass.css').includes('.dlm-specialist-reading'));
for(const danger of ['service_role','Authorization: Bearer']) assert(!read('assets/scripts/course-educator-depth.js').includes(danger));
console.log(`PASS: ${total} educator-edited weeks, 360 unique explanations/practical checks, 9 shared readers, common Python/AI masterclass and retained capstones`);
