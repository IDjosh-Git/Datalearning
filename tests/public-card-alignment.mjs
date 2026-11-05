import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {root} from './page-assets.mjs';

const css=fs.readFileSync(path.join(root,'assets/styles/design-system.css'),'utf8');
const publicPages=['index.html','catalog.html','practice.html','capstone.html','capstone-guide.html','reference.html','prompt-library.html','tutor.html','studio.html','learning-lab.html',...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>`courses/${f}`)];
assert.match(css,/Public card content alignment \| 2026-11-02/);
assert.match(css,/--card-space:clamp\(18px,1\.8vw,26px\)/);
assert.match(css,/\.lp-course,\.dlp97-card,\.lp-feature,\.lp-step,\.ref-card,\.pl-card/);
assert.match(css,/\.dlp97-card \.dlp97-facts\s*\{/);
assert.match(css,/\.learning-table-scroll\s*>\s*table\.learning-table\s*\{[\s\S]*?max-width:none!important/);
assert.match(css,/@media \(max-width:420px\)/);
for (const file of publicPages) {
  const html=fs.readFileSync(path.join(root,file),'utf8');
  assert.match(html,/<body\b[^>]*data-gradient-public="true"/, `${file}: public scope marker missing`);
  assert.match(html,/href="(?:\.\.\/)?assets\/styles\/design-system\.css"/, `${file}: missing shared stylesheet`);
}
for (const file of ['admin.html','auth.html','account.html','reviewer.html','progress.html']) {
  const html=fs.readFileSync(path.join(root,file),'utf8');
  assert.doesNotMatch(html,/data-gradient-public="true"/,`${file}: private page unexpectedly changed`);
}
console.log(`PASS public alignment: ${publicPages.length} pages, shared card spacing, table scrolling, protected routes unchanged`);
