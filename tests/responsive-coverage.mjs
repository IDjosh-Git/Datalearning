/** Static responsive and accessibility coverage of every shipped page bundle. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {root,discoverPages,assertReferences} from './page-assets.mjs';
const pages=discoverPages();
assertReferences(assert,pages);
let queryCount=0;
for(const page of pages){
 assert(page.viewport,`${page.route}: viewport meta missing`);
 const resourcePage=/^courses\/(?:introduction|excel|sql|powerbi|python|ai)-(?:roadmap|extension)\.html$/.test(page.route);
 if(resourcePage){
  assert(page.html.includes('course-guide-pages.css'),`${page.route}: standalone guide styling missing`);
  const css=fs.readFileSync(path.join(root,'assets/styles/course-guide-pages.css'),'utf8');
  assert(/@media\s*\(/.test(css) && css.includes('prefers-reduced-motion'),`${page.route}: responsive or motion settings missing`);
  queryCount++;
  continue;
 }
 assert(page.html.includes('design-system.css'),`${page.route}: final light styling missing`);
 const compiled=page.links.filter(l=>l.local && !['assets/styles/design-system.css'].includes(l.path));
 assert(compiled.length>=1 && compiled.length<=8,`${page.route}: expected compact page CSS bundles`);
 const styles=compiled.map(l=>fs.readFileSync(path.join(root,l.path),'utf8')).join('\n');
 assert(/@media\s*\(/.test(styles),`${page.route}: no responsive CSS present`);
 assert(/max-width\s*:/.test(styles),`${page.route}: no narrow viewport adaptation`);
 queryCount+=(styles.match(/@media\s*\(/g)||[]).length;
 assert(!/prefers-color-scheme\s*:\s*dark/.test(styles),`${page.route}: stale dark-mode media query`);
 if(page.route.startsWith('courses/')){
  assert(page.html.includes('public-navigation.js'),`${page.route}: accessible mobile workspace navigation missing`);
  assert(styles.includes('.sidebar')||styles.includes('.dlp97-navigation'),`${page.route}: course navigation CSS missing`);
 }
}
const nav=fs.readFileSync(path.join(root,'assets/scripts/responsive.js'),'utf8');
assert(nav.includes('Escape')&&nav.includes('aria-expanded'),'Mobile menus need Escape and aria-expanded state');
assert(queryCount>200,'Too few responsive media rules after consolidation');
console.log(`PASS responsive coverage: ${pages.length} pages, ${queryCount} responsive media queries, mobile navigation accessibility`);
