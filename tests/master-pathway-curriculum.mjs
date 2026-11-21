/** Validate the four-level, in-app, beginner-to-expert curriculum without changing legacy progress IDs. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const data=JSON.parse(read('assets/data/master-learning-pathway.json'));
const levelCounts=[7,8,8,8];
assert.deepEqual(data.levels.map(x=>x.name),['Beginner','Intermediate','Advanced','Expert']);
assert.equal(data.modules.length,31);
assert.deepEqual(data.levels.map(x=>data.modules.filter(m=>m.level===x.id).length),levelCounts);
const codes=new Set();
for(const m of data.modules){
 assert(!codes.has(m.id),`duplicate module ID ${m.id}`);codes.add(m.id);
 assert(m.id.match(/^[FIAE][0-9]{2}$/));
 assert(m.outcome.length>20&&m.prerequisites.length>15);
 assert(m.topics.length>=3&&m.topics.length<=5);
 assert(m.steps.length===4&&m.steps.every(s=>s.length>15));
 for(const field of ['lesson','caseStudy','workedExample','interpretation','microProject','modelAnswer','commonMistake'])assert(m[field]?.length>50||['workedExample','modelAnswer'].includes(field)&&m[field]?.length>20, `${m.id} missing ${field}`);
}
const context={window:{}};
vm.runInNewContext(read('assets/scripts/master-pathway-data.js'),context,{timeout:4000});
assert.equal(context.window.DALP_MASTER_PATHWAY.modules.length,31);
const catalog=read('career-path.html');
for(const x of ['id="masterLearningPath"','master-pathway-data.js','master-pathway.js','master-pathway.css'])assert(catalog.includes(x),`Catalog missing ${x}`);
const renderer=read('assets/scripts/master-pathway.js');
for(const x of ['data-level','aria-pressed','data-jump-module','caseStudy','microProject','modelAnswer','prerequisites','filter(m)','aria-live','Collapse all','dlp-library-navigation','courseLinks','dlp-related-links'])assert(renderer.includes(x),`Pathway explorer missing ${x}`);
const app=read('assets/scripts/academy-app.js');
for(const slug of ['introduction','excel','sql','powerbi','tableau','powerquery','statistics']){
 const link=data.courseBridges[slug];assert(link.length>=3&&link.every(id=>codes.has(id)));
 assert(app.includes(`${slug}:`),`Course reader missing bridge for ${slug}`);
}
assert(app.includes('career-path.html#pathway-'));
const courses=JSON.parse(read('assets/data/academy-curriculum.json'));
assert.equal(courses.length,7);assert.equal(courses.reduce((t,x)=>t+x.weeks.length,0),70);
for(const c of courses)assert(c.weeks.every((w,i)=>w.week===i+1));
const blueprint=read('docs/MASTER_FOUR_LEVEL_CURRICULUM_20261110.md');
for(const x of ['Gap analysis summary','Updated master curriculum table','Detailed module breakdowns',...data.modules.map(m=>m.id+' · '+m.title)])assert(blueprint.includes(x),`Blueprint missing ${x}`);
for(const slug of ['python','ai']) assert(renderer.includes(`slug:'${slug}'`) && renderer.includes('weekLinks=Object.fromEntries'), `${slug} missing guided course card`);
console.log('PASS master curriculum: 4 levels, 31 specialist lessons, nine guided-course cards and related bridges, 90 guided weeks');
