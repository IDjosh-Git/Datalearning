/** DataLearning viewport correction regression — 2026-11-04.
 * Source contract complements browser-width and interaction audits documented
 * in RESPONSIVE_LAYOUT_AUDIT_20261104.md. Avoid replacing runnable editors. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const css = fs.readFileSync(path.join(root, 'assets/styles/premium-unified.css'), 'utf8');
const overview = fs.readFileSync(path.join(root, 'overview.html'), 'utf8');
const catalog = fs.readFileSync(path.join(root, 'catalog.html'), 'utf8');
const practice = fs.readFileSync(path.join(root, 'practice.html'), 'utf8');
const account = fs.readFileSync(path.join(root, 'account.html'), 'utf8');
const serviceWorker = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
for (const marker of [
 'DataLearning responsive layout audit',
 'input#dlp97-search',
 '.bo-overview .bo-hero h1',
 '.dalp-account-page .mld-resume',
 'main.pc-wrap::before',
 '.lp-filter-rail',
 '.pc-filter-row',
 '.guide-container',
 '@media(max-width:380px)',
]) assert(css.includes(marker), `Missing responsive repair for ${marker}`);
assert(catalog.includes('id="dlp97-search"'), 'Catalogue search input missing');
assert(overview.includes('class="bo-primary"') && overview.includes('background:#6350d1!important'), 'Overview hero action must be legible on dark background');
assert(account.includes('id="dashContinueLink"'), 'Resume-learning action must remain present');
assert(practice.includes('id="practiceDetail"'), 'Practice editor mounting point must remain present');
assert(practice.includes('assets/scripts/practice.js') && practice.includes('assets/scripts/arena-workspace-visibility.js'), 'Practice editor runtime was disconnected');
assert(serviceWorker.includes('dalp-public-responsive-layout-v36'), 'Fresh responsive CSS needs a new offline cache key');
console.log('PASS responsive layout regressions: catalogue search, overview contrast, account CTAs, arena editor and cache version');
