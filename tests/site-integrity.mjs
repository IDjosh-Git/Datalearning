/** Canonical integrity gate for the shipped multi-page, light-only learning site. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {discoverPages, assertReferences} from './page-assets.mjs';
import {restrictedKind} from '../lib/server-auth.js';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const pages=discoverPages();
assert.equal(pages.length,38,'Expect 20 core routes, six courses, and 12 linked resource pages');
assertReferences(assert,pages);
let links=0,css=0,js=0;
for(const page of pages){
 assert.match(page.html,/<html\b[^>]*data-theme="light"/i,`${page.route}: light theme required`);
 assert(!/prefers-color-scheme:\s*dark|theme-toggle|theme-control-v\d+\.js/.test(page.html),`${page.route}: obsolete theme feature`);
 const resourcePage=/^courses\/(?:introduction|excel|sql|powerbi|python|ai)-(?:roadmap|extension)\.html$/.test(page.route);
 const contentCss=resourcePage?'assets/styles/course-guide-pages.css':page.route==='courses/introduction.html'?'assets/styles/course-page-improvements.css':page.route.startsWith('courses/')?'assets/styles/course-shared-responsiveness.css':null;
 if(contentCss){
  assert(page.links.some(link=>link.path===contentCss),`${page.route}: missing functional page layout ${contentCss}`);
  if(contentCss.endsWith('course-shared-responsiveness.css')) assert(fs.readFileSync(path.join(ROOT,contentCss),'utf8').includes('Final course page improvements'),`${page.route}: consolidated responsive and content layout missing`);
 }
 assert(!page.links.some(link=>['site-refresh.css','experience.css','layout-tuning.css'].some(x=>link.path.endsWith('/'+x))),`${page.route}: obsolete theme layer found`);
 const adminRoute=['admin.html','progress.html','reviewer.html'].includes(page.route);
 const privateRoute=['admin.html','progress.html','reviewer.html','account.html','certificate.html','connection-test.html','sync-test.html'].includes(page.route);
 assert.equal(page.links.at(-1)?.path,adminRoute?'assets/styles/admin-workspace.css':privateRoute?'assets/styles/private-workspace.css':['capstone.html','capstone-guide.html'].includes(page.route)?'assets/styles/capstone-premium.css':(page.html.includes('data-public-refresh=')||page.route==='verify.html')?'assets/styles/public-motion.css':'assets/styles/design-system.css',`${page.route}: current page theme should load last`);
 if(privateRoute)assert(page.links.some(x=>x.path==='assets/styles/design-system.css'),`${page.route}: shared design foundation is required`);
 assert(page.links.length<=(resourcePage?4:page.route.startsWith('courses/')?9:adminRoute?7:page.html.includes('data-public-refresh=')?8:6),`${page.route}: redundant CSS loading; found ${page.links.length} layers`);
 for(const m of page.html.matchAll(/<(a|img|source|iframe|video|link|script)\b[^>]*?(?:href|src)\s*=\s*(["'])(.*?)\2/gi)){
  const [_,kind,,ref]=m;
  if(/^(?:https?:|#|data:|mailto:|tel:|javascript:|\/\/)/i.test(ref))continue;
  let parsed;
  try{parsed=new URL(ref,`https://learning.example/${page.route}`);}catch{continue;}
  if(parsed.origin!=='https://learning.example')continue;
  const full=path.resolve(ROOT,'.'+decodeURIComponent(parsed.pathname));
  assert(full.startsWith(ROOT+path.sep),`${page.route}: path traversal ${ref}`);
  assert(fs.existsSync(full),`${page.route}: broken ${kind} reference ${ref}`);
  if(kind.toLowerCase()==='a')links++;
 }
 css+=page.links.length;js+=page.scripts.length;
}
const styles=fs.readdirSync(path.join(ROOT,'assets/styles')).filter(x=>x.endsWith('.css'));
assert(styles.length<=46,'Legacy CSS files were not consolidated');
for(const cssFile of styles){
 const content=fs.readFileSync(path.join(ROOT,'assets/styles',cssFile),'utf8');
 assert(!/\[data-theme=["']?dark["']?\]|prefers-color-scheme:\s*dark/.test(content),`${cssFile}: dark-mode styling`);
 for(const hit of content.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)){
  const target=hit[1].trim();
  if(!target||/^(?:data:|https?:|\/\/|#)/i.test(target))continue;
  assert(fs.existsSync(path.resolve(ROOT,'assets/styles',target)),`${cssFile}: missing CSS resource ${target}`);
 }
}
// No version suffixes in production source file names.
const versioned=[];
for(const folder of ['assets/styles','assets/scripts','assets/icons','curriculum','downloads']){
 for(const file of fs.readdirSync(path.join(ROOT,folder))){
  if(/(?:[-_]v\d+)(?=\.|[-_])/i.test(file))versioned.push(`${folder}/${file}`);
 }
}
assert.deepEqual(versioned,[],'Versioned production filenames remain');
assert(fs.existsSync(path.join(ROOT,'assets/python-worker.js')),'Python challenge worker must exist');
for(const script of ['python-lab.js','python-grader.js'])assert(fs.readFileSync(path.join(ROOT,'assets/scripts',script),'utf8').includes('assets/python-worker.js'),`Python worker not linked by ${script}`);
assert(fs.existsSync(path.join(ROOT,'service-worker.js')),'Latest offline worker missing');
assert(!fs.existsSync(path.join(ROOT,'service-worker-v23.js')),'Old service worker should be removed');
assert(!fs.existsSync(path.join(ROOT,'docs/history')),'Historical release archive should be removed');
for(const name of ['introduction','excel','sql','powerbi','python','ai']){
 assert(fs.existsSync(path.join(ROOT,'courses',name+'.html')));
 assert(fs.existsSync(path.join(ROOT,'assets/icons','icon-'+(name==='introduction'?'intro':name)+'.svg')));
}
for(const name of ['admin-dashboard.js','admin-console.js','progress-admin.js','reviewer.js'])
 assert.equal(restrictedKind('/assets/scripts/'+name),'adminAsset');
for(const name of ['admin.css','admin-workspace.css','progress.css','reviewer.css'])
 assert.equal(restrictedKind('/assets/styles/'+name),'adminAsset');
for(const internal of ['/database/migrations/supabase_setup.sql','/docs/SUPABASE_SETUP.txt','/tests/smoke.mjs','/lib/server-auth.js'])
 assert.equal(restrictedKind(internal),'deny');
const vercel=JSON.parse(fs.readFileSync(path.join(ROOT,'vercel.json'),'utf8'));
assert(vercel.rewrites.some(x=>x.source==='/courses/:course'));
for(const asset of ['assets/scripts/auth-gate.js','assets/scripts/server-session.js'])
 assert(fs.readFileSync(path.join(ROOT,asset),'utf8').includes("new URL('../../'"));
console.log(`PASS site integrity: ${pages.length} HTML pages, ${links} internal links, ${css} stylesheet links, ${js} script references, ${styles.length} consolidated CSS files; protected routes and version-free assets.`);
