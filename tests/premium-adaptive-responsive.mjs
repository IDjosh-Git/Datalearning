import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const css=fs.readFileSync(path.join(root,'assets/styles/premium-unified.css'),'utf8');
const docs=fs.readFileSync(path.join(root,'docs/PREMIUM_RESPONSIVENESS_AUDIT_20261108.md'),'utf8');
for(const rule of [
  'DataLearning premium adaptive layout system — 2026-11-08',
  '--dl-adaptive-gutter',
  '--dl-adaptive-card-pad',
  '@media(max-width:1200px)',
  '@media(max-width:900px)',
  '@media(max-width:640px)',
  '@media(max-width:400px)',
  '@media(prefers-reduced-motion:reduce)',
  '.dalp-global-header .dalp-global-nav',
  '.dlp97-cards',
  '.dl-quiz-layout',
  '.tutor-composer',
  '.arena-subject-options',
  '.dalp-admin-table-wrap',
  '.course-top-actions',
  'h1#catalog-title',
  '.tutor-chat .tutor-composer #sendQuestion',
]) assert(css.includes(rule),`Adaptive responsiveness missing ${rule}`);
assert(!fs.readFileSync(path.join(root,'overview.html'),'utf8').includes('#6350d1'),'Overview must not regress to retired purple CTA');
assert(docs.includes('authentication APIs'),'Audit documentation must clearly state untested external flows');
for(const route of ['index.html','catalog.html','tutor.html','practice.html','quiz.html','courses/excel.html','courses/sql.html','courses/powerbi.html','courses/python.html','courses/ai.html','courses/introduction.html']){
  assert(fs.existsSync(path.join(root,route)),`Required responsive route missing: ${route}`);
}
console.log('PASS premium adaptive responsiveness: breakpoint system, course + quiz + tutor + arena + admin, audit notes');
