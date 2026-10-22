import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=x=>fs.readFileSync(path.join(root,x),'utf8');
const list=files=>files.flatMap(f=>{const p=path.join(root,f);return fs.statSync(p).isDirectory()?fs.readdirSync(p).filter(x=>x.endsWith('.html')).map(x=>f+'/'+x):[f]});
const all=list(['courses','index.html','account.html','admin.html','capstone.html','tutor.html','learning-lab.html','practice.html','progress.html','prompt-library.html','reference.html','reviewer.html']);
for(const file of all){const body=read(file);assert(body.includes('workspace-shell.css?v=20261021.3'),file+' missing unified workspace styling');assert(body.includes('workspace-shell.js?v=20261022.16'),file+' missing unified workspace navigation');assert(!body.includes('qrcodejs/'),file+' obsolete third-party blocking script');}
for(const file of list(['courses'])){let s=read(file);assert.equal((s.match(/src="\.\.\/assets\/course-studio-data\.js/g)||[]).length,1,file+' has duplicated course data');assert(s.includes('course-experience.css'),file+' missing compact lesson layout');}
for(const file of all.filter(f=>!f.startsWith('courses/'))){const s=read(file);assert(!s.includes('src="assets/course-studio-data.js'),file+' should lazy-load coach data');}
const shell=read('assets/workspace-shell.js');for(const label of ['Dashboard','Courses','Practice','AI Tutor','Lab','Library','Progress','Admin'])assert(shell.includes(label),'Missing '+label+' navigation');
assert(shell.includes('Escape')&&shell.includes('aria-expanded')&&shell.includes('dalp:auth-ready'),'Accessible role-aware navigation');
const home=read('assets/learner-home.js');for(const word of ['CONTINUE LEARNING','Explore your learning paths','Your study toolkit','dalp:progress-updated'])assert(home.includes(word));
const ref=read('assets/reference.js');assert(ref.includes('matches.slice(0,limit)')&&ref.includes('limit=24'),'Reference list must paginate');
const progress=read('assets/progress-cloud.js');assert(progress.includes('Promise.all(Object.keys(COURSE_MAP)')&&progress.includes('remoteRows=await fetchCourseRows(user.id,slug);'),'Parallelized progress sync with conditional refetch');
assert(read('assets/course-account.js').includes('dalp:auth-ready'),'Account buttons should reuse verified session');
assert(read('auth.html').includes('auth-experience.css?v=20261021.3'),'Modern sign-in polish');
console.log('PASS workspace restructure: '+all.length+' learner/admin pages, role-aware keyboard navigation, personalized dashboard, light initial render, parallel cloud progress');
