/** Unified site footer/navigation, learning workbench and preserved interactive IDs. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=filename=>fs.readFileSync(path.join(root,filename),'utf8');
const protectedPages=new Set(['account.html','admin.html','profile.html','progress.html','reviewer.html','certificate.html','connection-test.html','sync-test.html','career-setup.html']);
const publicPages=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')&&!protectedPages.has(f)&&f!=='auth.html'&&f!=='landing.html'&&f!=='start-here.html'&&f!=='studio.html'&&f!=='free-lesson.html'&&f!=='career-paths.html'),...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>'courses/'+f)];
for(const f of publicPages){
 const html=read(f);const nested=f.startsWith('courses/');
 const script='/assets/scripts/public-footer.js?v=r25-audience';
 assert.equal(html.split(`src="${script}"`).length-1,1,`${f}: exactly one site-wide footer script`);
 assert(!/<footer\b/i.test(html),`${f}: legacy inline footer must be removed`);
 assert(html.includes('unified-site-v5.css'),`${f}: shared typography / footer CSS missing`);
 assert(read('assets/scripts/academy-navigation.js').includes('study-tools.html'),`${f}: Study Tools route missing`);
}
assert(!read('auth.html').includes('public-footer.js'),'Entry must not initialize the full learning app before sign-in');
for(const f of protectedPages){
 assert(read(f).includes('unified-site-v5.css'),`${f}: consistent private UI CSS missing`);
 assert(read(f).includes('public-footer.js')===['account.html','profile.html','career-setup.html','certificate.html'].includes(f),`${f}: public footer must not attach to guarded workspace`);
}
const js=read('assets/scripts/public-footer.js');
function footerFor(audience){
 const created=[];
 const footer={setAttribute(){},querySelectorAll:()=>[]};
 const doc={
  currentScript:{src:'https://example.com/assets/scripts/public-footer.js'},readyState:'complete',
  querySelector:()=>({dataset:{academyAudience:audience}}),querySelectorAll:()=>[],
  createElement:()=>footer,body:{appendChild:node=>created.push(node)}
 };
 vm.runInNewContext(js,{document:doc,URL,Date});
 assert.equal(created.length,1);
 return {footer};
}
const visitor=footerFor('visitor');
assert.match(visitor.footer.className,/dl-footer-visitor/);
for(const link of ['/courses','/start-here','/career-paths','/free-lesson','auth.html'])assert(visitor.footer.innerHTML.includes(link), 'Visitor footer missing '+link);
assert.doesNotMatch(visitor.footer.innerHTML,/admin\.html|tutor\.html|account\.html/);
const learner=footerFor();
assert.match(learner.footer.className,/dl-footer-learner/);
assert.match(learner.footer.innerHTML,/admin\.html">Admin<\/a>/);
const coach=read('learning-coach.html'),lab=read('learning-lab.html'),tutor=read('tutor.html');
for(const id of ['ss-plan-form','ss-session-list','ss-reveal','ss-save','study-plan'])assert(coach.includes(id),`Coach functionality lost: ${id}`);
for(const id of ['labSearch','labCards','labGroup','labMode'])assert(lab.includes(id),`Lab functionality lost: ${id}`);
assert(!lab.includes('id="ss-plan-form"')&&!coach.includes('id="labCards"'),'Coach and Lab must be independent pages');
for(const id of ['chatForm','chatQuestion','sendQuestion','chatMessages','tutorToolsPanel','tutorModeOffline','tutorModeAi'])assert(tutor.includes(id),`Tutor functionality lost: ${id}`);
assert(read('assets/scripts/private-navigation.js').includes("['Study Tools','study-tools.html'"),'Protected nav must include Study Tools');
assert(read('study-tools.html').includes('dlx-tools-grid'),'Dedicated Study Tools hub missing');
console.log(`PASS full-site v5: ${publicPages.length} unified public footers, 8 protected styles, Study Tools hub, Coach/Lab and Tutor controller IDs`);
