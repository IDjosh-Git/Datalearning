/** Keep deployed filenames stable and ensure network-first service worker updates. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {discoverPages,assertReferences,root} from './page-assets.mjs';
import path from 'node:path';
const pages=discoverPages();
assertReferences(assert,pages);
for(const page of pages){
 assert.equal(page.links.at(-1)?.path,'assets/styles/experience.css',page.route+' must apply final light-only design last');
 assert(page.links.every(x=>!/[?&]v=/.test(x.href)),page.route+' contains old cache revision links');
 assert(page.scripts.every(x=>!/[?&]v=/.test(x.href)),page.route+' contains old script revisions');
}
const worker=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
assert(worker.includes('await fetch(request)'),'Service worker must fetch current deployed content first');
assert(worker.includes('no-store'),'Service worker must respect private/no-store responses');
assert(!fs.existsSync(path.join(root,'service-worker-v23.js')));
console.log(`PASS static asset policy: ${pages.length} routes, version-free URLs, fresh-first offline caching`);
