import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const css=read('assets/styles/design-system.css');
const ai=read('assets/styles/course-ai.css');
const practice=read('assets/styles/practice.css');
const verify=read('assets/styles/verify.css');
const guide=read('assets/styles/course-framework.css');
for(const text of [
 '.dalp-themed-hero .job-ready-banner',
 '.job-ready-extension',
 '.week-header .badge',
 'main .guide-bottom a[href]',
 '.pc-hero.dalp-themed-hero',
 '.intro-visual .process-chip span',
 '.sample-hero.dalp-themed-hero',
 '.course-portal-links',
 '.resources .card',
 '.ip-hero,.review-hero'
]) assert(css.includes(text),`Shared theme is missing surface-aware contrast or padding rule: ${text}`);
for(const group of ['.guide-bottom a','.finish a','.topbar a']) {
 assert(css.includes(`:not(${group})`),`The generic public-link rule must exempt dark ${group} surfaces`);
}
assert(!ai.includes('.lp-ai-page .finish{background:var(--ui-hero);'), 'AI capstone finish panel cannot use retired hero token');
assert(ai.includes('.lp-ai-page .finish{background:#263d5d!important'), 'AI finish requires its own dark background');
assert(practice.includes('background: var(--ui-nav-ink) !important'), 'Practice Arena masthead must not be transparent');
assert(verify.includes('.verify-eyebrow{font-size:12px;letter-spacing:.18em;color:#eef4ff'), 'Verify banner eyebrow needs readable contrast');
assert(guide.includes('color:var(--ui-ink)!important;-webkit-text-fill-color:var(--ui-ink)!important'), 'Course stat cards must use dark ink on white');
const pages=[...fs.readdirSync(root).filter(x=>x.endsWith('.html')),
 ...fs.readdirSync(path.join(root,'courses')).filter(x=>x.endsWith('.html')).map(x=>'courses/'+x)];
assert.equal(pages.length,40,'All website routes remain present');
for(const page of pages){
 const source=read(page);
 assert(source.includes('design-system.css')||['admin.html','progress.html','reviewer.html'].includes(page),`${page}: current theme must be loaded`);
}
console.log('PASS cross-page contrast/alignment guard: dark banners, white inset cards, plain links, padded resources, 39 preserved routes');
