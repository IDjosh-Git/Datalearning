import {hasCurrentPublicCache} from './cache-release-contract.mjs';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const publicCss=readFileSync('assets/styles/public-motion.css','utf8');
const system=readFileSync('assets/styles/design-system.css','utf8');
const worker=readFileSync('service-worker.js','utf8');
for (const selector of ['.intro-hero-details span','.hero-buttons .button.ghost','.ai-hero .metrics span','.dalp-menu-all','.dalp-brand-copy small']) {
 assert.ok(publicCss.includes(selector),`Missing high-contrast style: ${selector}`);
}
assert.match(publicCss,/color:#263851!important/,'AI course metrics must use readable dark text on light cards');
assert.match(publicCss,/background:#eff5ff!important/,'AI course metrics need a defined light surface');
assert.match(publicCss,/color:#293f78!important/,'Menu all course action needs high-contrast ink');
assert.match(system,/auth-field input::placeholder/,'Sign-in placeholder must be legible');
assert(hasCurrentPublicCache(worker),'Refresh offline assets on release');
console.log('PASS course, navigation, auth and offline contrast regression checks');
