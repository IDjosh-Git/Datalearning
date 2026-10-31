import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const get=file=>fs.readFileSync(path.join(root,file),'utf8');
const routes=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')),
  ...fs.readdirSync(path.join(root,'courses')).filter(f=>f.endsWith('.html')).map(f=>`courses/${f}`)];
assert.equal(routes.length,25,'Expected all published HTML routes');
for(const route of routes){
  const html=get(route),base=route.startsWith('courses/')?'../assets/':'assets/';
  const cssLinks=[...html.matchAll(/<link\b[^>]*href=["']([^"']+\.css[^"']*)["'][^>]*>/gi)]
    .map(match=>match[1].split('?')[0]);
  assert.equal(cssLinks.at(-1),`${base}learning-polish-v96.css`,`${route}: v96 must load last`);
  assert(cssLinks.includes(`${base}color-system-v86.css`),`${route}: missing colours`);
  assert(cssLinks.includes(`${base}visual-refinement-v95.css`),`${route}: missing v95 baseline`);
  assert(html.includes('theme-control-v14.js')&&html.includes('dalp-theme-prepaint'),`${route}: missing theme support`);
}
const css=get('assets/learning-polish-v96.css');
for(const selector of ['.sample-lesson','.idea-card','.try-card','.three-points','.auth-story',
  '.auth-account-note','.auth-benefit','.auth-field input','.auth-msg','.intro-hero',
  '.dlp29-guide','.ac-welcome','.dalp-admin-notice','[aria-invalid="true"]',
  ':focus-visible','prefers-reduced-motion']){
  // focus-visible is in the shared v95 foundation.
  assert((css+get('assets/visual-refinement-v95.css')).includes(selector),`Missing ${selector} coverage`);
}
for(const token of ['--background','--surface','--surface-alt','--text-main','--text-muted',
  '--primary','--learning-accent','--border-strong','--focus-ring']){
  assert((css+get('assets/visual-refinement-v95.css')).includes(`var(${token})`),`Visual system must reuse ${token}`);
}
assert.match(get('assets/auth-flow.js'),/ArrowLeft.*ArrowRight.*Home.*End/);
assert.match(get('assets/auth-flow.js'),/flagInvalid/);
assert.match(get('assets/auth-flow.js'),/aria-invalid/);
assert.equal(get('preview.html').match(/class="sample-lesson"/g)?.length,1);
for(const content of ['What is data analysis?','One-minute example','Try it (2 minutes)',
  'Ready to continue?'])assert(get('preview.html').includes(content),`Existing preview copy changed: ${content}`);
console.log(`PASS visual-v96: ${routes.length} routes, dual-theme semantic styling, preview, auth and admin coverage`);
