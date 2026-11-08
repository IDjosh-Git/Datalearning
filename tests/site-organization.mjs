// Validate route ownership, public navigation and keyboard organization at source level.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {root, discoverPages} from './page-assets.mjs';
const manifest=JSON.parse(fs.readFileSync(path.join(root,'docs/SITE_ROUTE_MANIFEST.json'),'utf8'));
const pages=discoverPages();
const routeSet=new Set(pages.map(p=>p.route));
const groups=manifest.categories;
const entries=Object.values(groups).flat();
assert.equal(new Set(entries).size,entries.length,'Route manifest has duplicates');
assert.deepEqual([...new Set(entries)].sort(),[...routeSet].sort(),'Route manifest misses pages or contains removed routes');
const isPublic=new Set([...groups.public_pages,...groups.course_players,...groups.course_guides]);
const privateRoutes=new Set([...groups.learner_account,...groups.admin_only,...groups.admin_diagnostics]);
let globalHeaders=0;
let publicNonGated=0;
for(const page of pages){
  const text=page.html;
  assert.equal((text.match(/<main\b/gi)||[]).length,1,`${page.route}: exactly one main landmark required`);
  assert.equal((text.match(/\bid=["']main-content["']/gi)||[]).length,1,`${page.route}: exactly one main target required`);
  const skipCount=(text.match(/<a\b[^>]*href=["']#main-content["']/gi)||[]).length;
  assert.equal(skipCount, privateRoutes.has(page.route)?0:1,`${page.route}: unexpected skip-to-content link count`);
  const nav=(text.match(/<nav\b[^>]*class=["'][^"']*dalp-global-nav/gi)||[]).length;
  assert(nav<=1,`${page.route}: duplicate global navigation`);
  if(nav){
    globalHeaders++;
    assert.equal((text.match(/<header\b[^>]*class=["'][^"']*dalp-global-header/gi)||[]).length,1,`${page.route}: missing unique shared header`);
    assert.equal(page.scripts.filter(s=>s.path==='assets/scripts/public-navigation.js').length,1,`${page.route}: exactly one public navigation initializer required`);
  }
  if(isPublic.has(page.route)&&page.route!=='auth.html'){
    assert(!page.scripts.some(s=>s.path==='assets/scripts/auth-gate.js'),`${page.route}: public page should not load page-wide auth gate`);
    publicNonGated++;
  }
}
assert.equal(globalHeaders,30,'The current shared-header inventory changed; review route organization');
const expectedPrivate=[...groups.learner_account,...groups.admin_only,...groups.admin_diagnostics];
assert.equal(expectedPrivate.length,8,'Protected route inventory changed; review middleware and access tests');
assert.equal((fs.readFileSync(path.join(root,'assets/styles/design-system.css'),'utf8').match(/\.dalp-skip-link\{position:fixed/g)||[]).length,1,'Skip-link styling duplicated');
console.log(`PASS organization: ${pages.length} routes mapped; ${globalHeaders} shared headers; ${publicNonGated} public content pages without a page-wide auth gate; main landmarks present; skip links restricted to public pages.`);
