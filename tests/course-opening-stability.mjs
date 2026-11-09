/** Prevent the initial unfiltered course document from flashing and then vanishing. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const slugs=['introduction','excel','sql','powerbi','python','ai'];
const source=fs.readFileSync('assets/scripts/weekly-workspace.js','utf8');
const css=fs.readFileSync('assets/styles/premium-unified.css','utf8');
assert.match(source,/function finishStartup\(/);
assert.match(source,/const fromHash=\(window\.DALP_PENDING_LESSON_HASH \|\| location\.hash\)/);
assert.match(source,/ids\.indexOf\(decodeURIComponent\(\(window\.DALP_PENDING_LESSON_HASH \|\| location\.hash\)/);
assert.match(source,/openWeek\(start,\{silent:true\}\);\s*finishStartup\(bar\)/);
assert.match(source,/finishStartup\(nav\)/);
assert.match(css,/html\.dl-course-initializing \.app \.content/);
assert.match(css,/html\.dl-course-initializing \.intro-body/);
let cases=0;
for(const slug of slugs){
 const html=fs.readFileSync(`courses/${slug}.html`,'utf8');
 const match=html.match(/<script id="dl-course-navigation-preflight">([\s\S]*?)<\/script>/);
 assert(match,`${slug}: missing navigation startup script`);
 assert(html.indexOf('dl-course-navigation-preflight')<html.indexOf('<body'),`${slug}: preflight must run before course markup`);
 const hash=slug==='introduction'?'#lesson-8':'#week10';
 let replaced='';let added='';let fallback=null;
 const window={location:{hash},setTimeout(fn){fallback=fn;return 1}};
 const location={pathname:`/courses/${slug}.html`,search:''};
 const document={documentElement:{classList:{add(v){added=v}}},body:{classList:{contains(){return false}}}};
 const history={state:null,replaceState(_state,_title,path){replaced=path}};
 vm.runInNewContext(match[1],{window,location,document,history});
 assert.equal(window.DALP_PENDING_LESSON_HASH,hash,`${slug}: lost selected module`);
 assert.equal(replaced,`/courses/${slug}.html`,`${slug}: fragment jump must be suppressed`);
 assert.equal(added,'dl-course-initializing',`${slug}: old content should not flash`);
 assert.equal(typeof fallback,'function',`${slug}: must fail open if scripts cannot initialize`);
 cases++;
}
console.log(`PASS stable course entry: ${cases} routes preflight before paint, preserve deep links, avoid hidden fragment scroll, and fail open`);
