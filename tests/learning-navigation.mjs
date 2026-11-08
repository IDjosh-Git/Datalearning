/** Ensure exactly one active mobile navigation shell and a separate catalog route. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {root,discoverPages,assertReferences} from './page-assets.mjs';
const pages=discoverPages();assertReferences(assert,pages);
const home=pages.find(p=>p.route==='index.html');
for(const asset of ['assets/scripts/learning-catalog.js','assets/scripts/catalog-data.js','assets/scripts/public-navigation.js'])
 assert(home.html.includes(asset),`Homepage missing ${asset}`);
const css=fs.readFileSync(path.join(root,'assets/styles/home.css'),'utf8');
assert(css.includes('body.lp-home.dlp97-learning-page .dlp97-navigation{display:none}'),'Homepage redundant navigation not hidden');
for(const slug of ['introduction','excel','sql','powerbi','python','ai']){
 const page=pages.find(p=>p.route===`courses/${slug}.html`);
 assert(page,`Missing ${slug}`);
 assert(page.html.includes('public-navigation.js')&&page.html.includes('learning-catalog.js'),`${slug}: learning navigation missing`);
 assert(page.links.some(x=>x.path.startsWith('assets/styles/course-')),`${slug}: course bundle missing`);
}
const catalog=pages.find(p=>p.route==='catalog.html');
assert(catalog.html.includes('learning-catalog.js')&&catalog.html.includes('public-navigation.js'));
console.log('PASS dashboard, course learning navigation and standalone catalog preserved');
