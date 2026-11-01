/** Regression coverage for the previously unaudited route-specific styles.
 * Global colours/typography live in the existing, last-loaded design system;
 * this test protects preserved page-specific layouts and legacy-theme cleanup. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=rel=>fs.readFileSync(path.join(root,rel),'utf8');
const routes={
 'index.html':['home.css','home-refinements.css'],
 'catalog.html':['catalog.css'],
 'studio.html':['studio.css'],
 'capstone.html':['capstone.css','capstone-layout.css'],
 'capstone-guide.html':['capstone-guide.css','capstone-guide-layout.css'],
 'preview.html':['preview-foundation.css','preview-layout.css'],
 'account.html':['account-foundation.css','account-layout.css'],
 'auth.html':['auth.css'],
 'admin.html':['admin.css'],
 'progress.html':['progress.css'],
 'reviewer.html':['reviewer.css'],
 'certificate.html':['certificate.css'],
 'connection-test.html':['connection-test-layout.css'],
 'sync-test.html':['sync-test-layout.css'],
 'verify.html':['verify.css'],
};
const protectedPages=['account.html','admin.html','progress.html','reviewer.html'];
for(const [route,styles] of Object.entries(routes)){
 const html=read(route);
 for(const stylesheet of styles){
  assert(html.includes('assets/styles/'+stylesheet),`${route}: essential layout CSS was removed: ${stylesheet}`);
  const css=read('assets/styles/'+stylesheet);
  assert(css.trim().length>200,`${stylesheet}: essential page layout unexpectedly empty`);
  assert(!/#(?:713a55|572640|924d70|087b79|f27329)\b/i.test(css),`${stylesheet}: obsolete palette colour returned`);
 }
 assert.equal((html.match(/design-system\.css/g)||[]).length,1,`${route}: one current theme must remain`);
 assert(styles.some(s=>read('assets/styles/'+s).includes('@media')),`${route}: responsive CSS must remain`);
}
for(const [page,selector] of Object.entries({
 'index.html':'.lp-course',
 'catalog.html':'.dlp97-',
 'studio.html':'.ps-layout',
 'capstone.html':'.capstone',
 'preview.html':'.sample-shell',
 'account.html':'.account-studio-link',
 'auth.html':'.auth-layout',
 'admin.html':'.ac-welcome',
 'progress.html':'.ip-panel',
 'reviewer.html':'.review-shell',
 'certificate.html':'.certificate-paper',
 'verify.html':'.verify-panel'
})){
 assert(routes[page].some(s=>read('assets/styles/'+s).includes(selector)),`${page}: functional layout selector missing`);
}
for(const page of protectedPages){
 const html=read(page);
 assert(/auth-gate|guard|admin/i.test(html),`${page}: protected-page authentication integration removed`);
}
const theme=read('assets/styles/design-system.css');
for(const token of ['--ui-primary:#3f46d9','--ui-accent:#29476b','--ui-radius:14px']){
 assert(theme.includes(token),`Shared theme is missing ${token}`);
}
console.log(`PASS remaining-page theme audit: ${Object.keys(routes).length} routes, 20 updated layout stylesheets, current shared theme and protected-page integration preserved`);
