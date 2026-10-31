// Guard the mobile styling release against stale browser/CDN stylesheet cache URLs.
// Link query revisions are derived from file contents instead of hard-coded release numbers.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {root,discoverPages,assertReferences,requireAsset,requireOrder} from './page-assets.mjs';

const pages=discoverPages();
assert(pages.length>0,'CSS cache revision audit: no HTML pages found');
assertReferences(assert,pages);
const targetAssets=['premium-design-v99.css','learning-catalog-v97.css'];
const expectedRevision=new Map(targetAssets.map(name=>[
  `assets/${name}`,
  createHash('sha256').update(fs.readFileSync(path.join(root,'assets',name))).digest('hex').slice(0,12)
]));
const hitCounts=new Map(targetAssets.map(name=>[`assets/${name}`,0]));
for(const page of pages){
  requireAsset(assert,page,'premium-design-v99.css');
  requireAsset(assert,page,'text-contrast-v98.css');
  requireOrder(assert,page,'premium-design-v99.css','text-contrast-v98.css');
  assert.equal(page.links.at(-1)?.path,'assets/text-contrast-v98.css',
    `${page.route}: contrast stylesheet must be loaded last`);
  for(const ref of page.links){
    if(!expectedRevision.has(ref.path))continue;
    const revision=new URL(ref.href,`https://example.invalid/${page.route}`).searchParams.get('v');
    const expected=expectedRevision.get(ref.path);
    assert.equal(revision,expected,
      `${page.route}: ${ref.path} cache revision is ${revision??'(missing)'}, expected current CSS hash ${expected}; change the link query when editing this stylesheet`);
    hitCounts.set(ref.path,hitCounts.get(ref.path)+1);
  }
}
assert.equal(hitCounts.get('assets/premium-design-v99.css'),pages.length,
  'Premium CSS must be referenced by every discovered HTML page');
assert(hitCounts.get('assets/learning-catalog-v97.css')>0,
  'Catalog CSS is not referenced by any page; check whether the catalog shell was removed');
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
assert.equal(pkg.engines?.node,'24.x',
  'Vercel project uses Node 24.x; pin the same major in package.json rather than a future-major range');
console.log(`PASS cache revision guard: ${pages.length} HTML pages; premium CSS ${hitCounts.get('assets/premium-design-v99.css')} refs, catalog CSS ${hitCounts.get('assets/learning-catalog-v97.css')} refs, content-hash URLs match; Node.js 24.x aligned`);
