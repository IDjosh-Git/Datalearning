/* Auth form presentation contract: no nested form cards; spacious fields. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const css = fs.readFileSync(new URL('../assets/styles/premium-unified.css', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../auth.html', import.meta.url), 'utf8');
const newer = css.split('/* 2026-11-09 — Open, full-width learner authentication fields.')[1];
assert(newer, 'Missing auth field refinement');
assert(/\.auth-forms \.auth-panel/.test(newer), 'Missing shared panel reset');
assert(/background:transparent!important;background-image:none!important;/.test(newer), 'Background panel must be transparent');
assert(/border:0!important;outline:0!important;border-radius:0!important;/.test(newer), 'Outer field-group border and curves must be removed');
assert(/height:60px!important;min-height:60px!important;/.test(newer), 'Spacious input height required');
for (const id of ['loginPanel','signupPanel','forgotPanel','resetPanel'])
  assert(html.includes(`id="${id}"`), `Missing account panel ${id}`);
for (const id of ['loginEmail','loginPassword','fullName','signupEmail','signupPassword','signupConfirm','forgotEmail','newPassword','confirmNewPassword'])
  assert(html.includes(`id="${id}"`), `Missing account field ${id}`);
console.log('PASS: transparent sign-in/create/recovery panels, taller inputs, unchanged account form controls');
