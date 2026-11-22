/** Regression: specialist course routes must be visible in all-courses and discovery. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const src=read('assets/scripts/academy-app.js');
const curriculum=JSON.parse(read('assets/data/academy-curriculum.json'));
function launch(page){
 const box={innerHTML:''},search={value:'',listeners:{},addEventListener(type,fn){this.listeners[type]=fn}},
       empty={hidden:false},count={textContent:''},discover={innerHTML:''};
 const filters=['all','analytics','bi','technical','specialist'].map(dl=>({dataset:{dlcFilter:dl},listeners:{},addEventListener(type,fn){this.listeners[type]=fn},setAttribute(){}}));
 const items={ '#zaCatalogCards':box,'#zaCourseSearch':search,'#zaCatalogEmpty':empty,'#dlcCatalogCount':count,'#zaDiscoverCards':discover };
 const win={DALP_ACADEMY:JSON.parse(JSON.stringify(curriculum)),addEventListener(){}};
 vm.runInNewContext(read('assets/scripts/specialist-course-data.js'),{window:win});
 const doc={readyState:'complete',documentElement:{dataset:{academyPage:page,base:''}},querySelector(selector){return items[selector]||null},querySelectorAll(selector){return selector==='[data-dlc-filter]'?filters:[]},addEventListener(){}};
 vm.runInNewContext(src,{window:win,document:doc,console},{timeout:5000,filename:'academy-app.js'});
 return {win,box,search,empty,count,discover,filters};
}
const app=launch('courses');
assert.equal(app.win.DALP_ACADEMY_APP.catalog.length,9,'Nine courses should appear');
assert.equal((app.box.innerHTML.match(/class="za-catalog-item dlc-course-card"/g)||[]).length,9,'Nine catalogue cards');
for(const slug of ['ai','python']){
 assert(app.box.innerHTML.includes(`data-course="${slug}"`),`${slug} must have a catalogue card`);
 assert(app.box.innerHTML.includes(`href="courses/${slug}.html"`),`${slug} course route must be clickable`);
 assert(app.box.innerHTML.includes(`href="courses/${slug}.html?week=10"`),`${slug} capstone week must be discoverable`);
 assert(read(`courses/${slug}.html`).includes('id="zaLessonBody"'),`${slug} interactive Week 10 route missing`);
}
assert.equal(app.count.textContent,'9 courses shown');
app.filters.find(f=>f.dataset.dlcFilter==='specialist').listeners.click();
assert.equal(app.count.textContent,'2 courses shown','Python and AI category includes both courses');
app.search.value='prompt engineering';app.search.listeners.input();
assert.equal(app.count.textContent,'1 course shown');
assert(app.box.innerHTML.includes('data-course="ai"'));
assert(!app.box.innerHTML.includes('data-course="python"'));
const home=launch('discover');
assert.equal((home.discover.innerHTML.match(/class="za-course-card"/g)||[]).length,9,'Home discovery should show all nine');
assert(home.discover.innerHTML.includes('courses/ai.html'),'AI discover card should be clickable');
const cat=read('catalog.html');
assert(cat.includes('data-dlc-filter="specialist"'));
assert(cat.includes('9 courses'));
assert(read('index.html').includes('<b>09</b> guided learning paths'));
const pages=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')).map(f=>f),...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>'courses/'+f)];
let navigationPages=0;
for(const p of pages){
 const html=read(p);if(!html.includes('NINE LEARNING PATHS'))continue;navigationPages++;
 const prefix=p.startsWith('courses/')?'../courses/':'courses/';
 assert(html.includes(`href="${prefix}ai.html"`),`${p} missing AI course menu link`);
 assert(html.includes(`href="${prefix}python.html"`),`${p} missing Python course menu link`);
}
assert(navigationPages>=28,'Course menus should be available after authentication');
assert(!read('auth.html').includes('NINE LEARNING PATHS'),'Sign-in must not expose app navigation');
assert(read('courses/ai.html').includes('href="../prompt-library.html"'),'Prompt Library link must remain');
console.log(`PASS AI/Python restoration: 9 searchable catalogue courses, 2 specialist cards, home discovery, 10 weeks, ${navigationPages} public course menus, prompt library`);
