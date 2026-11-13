/** Unified site footer/navigation, learning workbench and preserved interactive IDs. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=filename=>fs.readFileSync(path.join(root,filename),'utf8');
const protectedPages=new Set(['account.html','admin.html','profile.html','progress.html','reviewer.html','certificate.html','connection-test.html','sync-test.html']);
const publicPages=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')&&!protectedPages.has(f)&&f!=='auth.html'&&f!=='landing.html'&&f!=='start-here.html'),...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>'courses/'+f)];
for(const f of publicPages){
 const html=read(f);const nested=f.startsWith('courses/');
 const script=(nested?'../':'')+'assets/scripts/public-footer.js';
 assert.equal(html.split(`src="${script}"`).length-1,1,`${f}: exactly one site-wide footer script`);
 assert(!/<footer\b/i.test(html),`${f}: legacy inline footer must be removed`);
 assert(html.includes('unified-site-v5.css'),`${f}: shared typography / footer CSS missing`);
 assert(html.includes('study-tools.html')||f==='questions.html',`${f}: Study Tools route missing`);
}
assert(!read('auth.html').includes('public-footer.js'),'Entry must not initialize the full learning app before sign-in');
for(const f of protectedPages){
 assert(read(f).includes('unified-site-v5.css'),`${f}: consistent private UI CSS missing`);
 assert(!read(f).includes('public-footer.js'),`${f}: public footer must not attach to guarded workspace`);
}
const js=read('assets/scripts/public-footer.js');
const created=[];
const doc={currentScript:{src:'https://example.com/site/assets/scripts/public-footer.js'},readyState:'complete',querySelector:()=>null,createElement:()=>({setAttribute(){}}),body:{appendChild:n=>created.push(n)}};
vm.runInNewContext(js,{document:doc,URL,Date});
assert.equal(created.length,1);
assert.equal(created[0].className,'dalp-public-footer dlx-v5-footer');
for(const link of ['courses/tableau.html','courses/powerquery.html','courses/statistics.html','study-tools.html','learning-coach.html','learning-lab.html','tutor.html','verify.html'])assert(created[0].innerHTML.includes(link),`Footer missing ${link}`);
const coach=read('learning-coach.html'),lab=read('learning-lab.html'),tutor=read('tutor.html');
for(const id of ['ss-plan-form','ss-session-list','ss-reveal','ss-save','study-plan'])assert(coach.includes(id),`Coach functionality lost: ${id}`);
for(const id of ['labSearch','labCards','labGroup','labMode'])assert(lab.includes(id),`Lab functionality lost: ${id}`);
assert(!lab.includes('id="ss-plan-form"')&&!coach.includes('id="labCards"'),'Coach and Lab must be independent pages');
for(const id of ['chatForm','chatQuestion','sendQuestion','chatMessages','tutorToolsPanel','tutorModeOffline','tutorModeAi'])assert(tutor.includes(id),`Tutor functionality lost: ${id}`);
assert(read('assets/scripts/private-navigation.js').includes("['Study Tools','study-tools.html'"),'Protected nav must include Study Tools');
assert(read('study-tools.html').includes('dlx-tools-grid'),'Dedicated Study Tools hub missing');
console.log(`PASS full-site v5: ${publicPages.length} unified public footers, 8 protected styles, Study Tools hub, Coach/Lab and Tutor controller IDs`);
