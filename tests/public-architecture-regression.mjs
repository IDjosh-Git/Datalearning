import assert from 'node:assert/strict';
import fs from 'node:fs';
import {restrictedKind} from '../lib/server-auth.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const pages=['public-pages/landing.html','public-pages/start-here.html','course-info/catalog.html','public-pages/career-paths.html','public-pages/free-lesson.html'];
const links=['/','/courses','/start-here','/career-paths','/free-lesson','/auth.html'];
for(const p of pages){
 const html=read(p);
 assert.equal((html.match(/data-academy-navigation/g)||[]).length,1,`${p}: exactly one public header`);
 assert(html.includes("public-footer.js"),`${p}: canonical public footer component missing`);
 for(const route of links)assert(read('assets/scripts/academy-navigation.js').includes(JSON.stringify(route)) || read('assets/scripts/academy-navigation.js').includes("'"+route+"'"),p+': missing '+route);
 assert(!html.includes('auth-gate.js'),`${p}: public page cannot require browser auth gate`);
 assert(!html.includes('class="dlu-header"'),`${p}: old learner header must not be stacked`);
}
assert.equal((read('public-pages/landing.html').match(/<main\b/g)||[]).length,1,'one homepage main');
assert.equal((read('public-pages/landing.html').match(/class="premium-hero"/g)||[]).length,1,'one homepage hero');
assert(!read('public-pages/landing.html').includes('class="final-invite"'),'no second CTA landing band');
assert(read('public-pages/landing.html').includes('id="dlWeeklyHeroImage"'),'weekly photo retained');
assert(read('public-pages/free-lesson.html').includes('id="sample-lesson"'),'actual sample lesson retained');
assert(read('public-pages/free-lesson.html').includes('What is data analysis?'));
for(const route of ['/','/courses','/start-here','/career-paths','/free-lesson','/public-pages/free-lesson.html','/public-pages/career-paths.html','/assets/styles/academy-navigation.css','/assets/scripts/academy-navigation.js','/assets/scripts/home-weekly-photo.js'])assert.equal(restrictedKind(route),'public',`${route}: must be public`);
for(const route of ['/practice.html','/account.html','/courses/sql.html','/assets/scripts/academy-app.js'])assert.notEqual(restrictedKind(route),'public',`${route}: must remain protected`);
const cfg=JSON.parse(read('vercel.json'));
for(const [src,dst] of [['/','/public-pages/landing.html'],['/courses','/course-info/catalog.html'],['/free-lesson','/public-pages/free-lesson.html'],['/career-paths','/public-pages/career-paths.html']])assert(cfg.rewrites.some(r=>r.source===src&&r.destination===dst),`${src}: missing rewrite`);
for(const [src,dst] of [['/landing.html','/'],['/catalog.html','/courses']])assert(cfg.redirects.some(r=>r.source===src&&r.destination===dst&&r.permanent),`${src}: missing canonical redirect`);
console.log('PASS public architecture: five unified pages, single hero, free lesson without auth, canonical routes, private boundaries');

