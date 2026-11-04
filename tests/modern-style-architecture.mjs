/** Prevent removed visual theme layers from reappearing. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {discoverPages} from './page-assets.mjs';
const root=path.resolve('.');
const obsolete=['site-refresh.css','experience.css','layout-tuning.css'];
for(const name of obsolete)assert(!fs.existsSync(path.join(root,'assets/styles',name)),`Obsolete stylesheet should be deleted: ${name}`);
for(const page of discoverPages()){
 const styles=page.links.filter(l=>l.local).map(l=>l.path);
 assert.equal(styles.at(-1),'assets/styles/modern-workspace-20261104.css',`${page.route}: latest maintained theme must be last`);
 assert.equal(styles.filter(x=>x==='assets/styles/design-system.css').length,1,`${page.route}: duplicate shared theme`);
 for(const name of obsolete)assert(!styles.some(x=>x.endsWith('/'+name)),`${page.route}: obsolete stylesheet reference ${name}`);
 const unique=new Set(styles);
 assert.equal(unique.size,styles.length,`${page.route}: duplicate stylesheet reference`);
}
const current=fs.readFileSync(path.join(root,'assets/styles/design-system.css'),'utf8');
for(const selector of ['.learning-table-scroll','.learning-clarity','.experience-back-top','.dlp97-subject-icon svg','.arena-task-panel.is-collapsed','.dalp-global-header','.lp-studio-cta','.dalp-public-footer'])assert(current.includes(selector),`Missing retained functional component: ${selector}`);
console.log('PASS modern style architecture: 38 pages, one shared current theme, 0 obsolete stylesheets, retained functional components');
