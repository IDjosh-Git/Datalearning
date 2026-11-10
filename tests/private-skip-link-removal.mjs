import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'docs/SITE_ROUTE_MANIFEST.json'),'utf8'));
const privatePages=[...manifest.categories.learner_account,...manifest.categories.admin_only,...manifest.categories.admin_diagnostics];
assert.equal(privatePages.length,8,'Protected page inventory changed: review skip-link policy');
for(const page of privatePages){
  const html=fs.readFileSync(path.join(root,page),'utf8');
  assert.match(html,/data-private-workspace="true"/,`${page}: missing private-page marker`);
  assert.doesNotMatch(html,/<a\b[^>]*class=["'][^"']*(?:dalp-skip-link|dlp-skip-link)/i,`${page}: skip link was reintroduced`);
  assert.match(html,/\bid=["']main-content["']/,`${page}: main content landmark missing`);
}
const shared=fs.readFileSync(path.join(root,'assets/scripts/accessibility.js'),'utf8');
assert(shared.includes('data-private-workspace'), 'Shared accessibility script must not inject skip links into private pages');
assert(shared.includes('.dalp-skip-link, .dlp-skip-link'), 'Shared accessibility script must not duplicate public skip links');
const publicPage=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.match(publicPage,/<a\b[^>]*class="(?:dalp-skip-link|za-skip)"/, 'Public keyboard skip link must remain');
console.log(`PASS private skip removal: ${privatePages.length} protected routes; public skip link preserved`);
