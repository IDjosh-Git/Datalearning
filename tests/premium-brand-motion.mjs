import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const css = read('assets/styles/premium-unified.css');
const logo = read('assets/icons/datalearning-wordmark.svg');
const pages = [
  ...fs.readdirSync(root).filter(f => f.endsWith('.html')),
  ...fs.readdirSync(path.join(root, 'courses')).filter(f => f.endsWith('.html')).map(f => `courses/${f}`)
];
const sharedHeaders = pages.filter(p => read(p).includes('dalp-global-brand'));
assert(sharedHeaders.length >= 30, 'Expected public DataLearning brand on all shared-header pages');
for (const file of sharedHeaders) {
  const html = read(file);
  assert(html.includes('class="dalp-brand-name">data<span class="dalp-brand-accent">learning</span>'), `${file}: live wordmark intact`);
  assert(html.includes('assets/styles/premium-unified.css'), `${file}: shared stylesheet linked`);
}
assert(logo.includes('<title') && logo.includes('DataLearning wordmark'), 'Standalone SVG wordmark has accessible title');
assert(logo.includes('#ad4e23') && logo.includes('#244558'), 'Brand SVG uses Blueprint/Melon palette');
assert(css.includes('DataLearning premium identity + interaction polish'), 'Premium animation rules in final shared CSS');
assert(css.includes('@media (hover:hover) and (pointer:fine)'), 'Hover motion is pointer-aware');
assert(css.includes('@media (prefers-reduced-motion:reduce)'), 'Reduced-motion preference supported');
assert(css.includes('translateY(-4px)'), 'Premium card hover lift present');
assert(css.includes('transition:transform .35s'), 'Brand mark uses short transform transition');
assert(css.includes('color:#AD4E23!important'), 'Premium melon wordmark accent overrides legacy palette');
console.log(`PASS premium brand and motion: ${sharedHeaders.length} public headers, accessible wordmark asset, coherent style layer, gentle hover and reduced-motion support.`);
