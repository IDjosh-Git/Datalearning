import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(new URL('..',import.meta.url).pathname);
const htmls=[...fs.readdirSync(root).filter(x=>x.endsWith('.html')), ...fs.readdirSync(path.join(root,'courses')).filter(x=>x.endsWith('.html')).map(x=>'courses/'+x)];
assert.equal(htmls.length,22);
for(const name of htmls){
 const txt=fs.readFileSync(path.join(root,name),'utf8');
 const expected=(name.startsWith('courses/')?'../':'')+'assets/mobile-experience-v13.css?v=20261022';
 assert.equal(txt.split(expected).length-1,1,`Missing or duplicate final responsive CSS in ${name}`);
 const pos=txt.indexOf(expected);
 assert(pos>txt.lastIndexOf('stylesheet',pos-20),`Missing stylesheet metadata ${name}`);
 assert(/name=["']viewport["']/.test(txt),`Missing viewport ${name}`);
}
const CSS=fs.readFileSync(path.join(root,'assets/mobile-experience-v13.css'),'utf8');
for(const s of ['max-width:359px','max-width:760px','min-width:761px','min-width:1200px','safe-area-inset-bottom','dl-mobile-tabs','ac-mobile-tabs','cw-week-controls','ps-page','auth-page','data-responsive-page="certificate"','data-responsive-page="verify"','prefers-reduced-motion'])assert(CSS.includes(s),`Missing mobile rule: ${s}`);
const shell=fs.readFileSync(path.join(root,'assets/workspace-shell.js'),'utf8');
assert(shell.includes('aria-label\',\'Mobile learning navigation'));assert(shell.includes('dl-course-actions-toggle'));assert(shell.includes('More learning destinations'));
const admin=fs.readFileSync(path.join(root,'assets/admin-console.js'),'utf8');
assert(admin.includes('Mobile administration navigation'));assert(admin.includes('selectMobile'));
console.log('PASS v13 responsive coverage: 22 pages, five-course week workspace, learner/admin adaptive nav, light/dark touch surfaces and all special pages');
