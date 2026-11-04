/** Keep deployed filenames stable and ensure network-first service worker updates. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {discoverPages,assertReferences,root} from './page-assets.mjs';
import path from 'node:path';
const pages=discoverPages();
assertReferences(assert,pages);
for(const page of pages){
 const guide=/-roadmap\.html$|-extension\.html$/.test(page.route);
 const expected=guide?'assets/styles/course-guide-pages.css':page.route==='courses/introduction.html'?'assets/styles/course-page-improvements.css':page.route.startsWith('courses/')?'assets/styles/course-shared-responsiveness.css':null;
 if(expected)assert(page.links.some(l=>l.path===expected),page.route+' must retain its content layout');
 assert(!page.links.some(l=>/\/(site-refresh|experience|layout-tuning)\.css$/.test(l.path)),page.route+' has obsolete stylesheet');
 assert.equal(page.links.at(-1)?.path,'assets/styles/modern-workspace-20261104.css',page.route+' unified visual stylesheet missing');
 assert(page.links.every(x=>!/[?&]v=/.test(x.href)),page.route+' contains old cache revision links');
 assert(page.scripts.every(x=>!/[?&]v=/.test(x.href)),page.route+' contains old script revisions');
}
const worker=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
assert(worker.includes('await fetch(request)'),'Service worker must fetch current deployed content first');
assert(worker.includes('no-store'),'Service worker must respect private/no-store responses');
assert(!fs.existsSync(path.join(root,'service-worker-v23.js')));
console.log(`PASS static asset policy: ${pages.length} routes, version-free URLs, fresh-first offline caching`);
