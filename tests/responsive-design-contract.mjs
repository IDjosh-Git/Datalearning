/* Static guardrails paired with browser screenshots in release QA. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const css=fs.readFileSync(path.join(ROOT,'assets/styles/design-system.css'),'utf8');
const workspace=fs.readFileSync(path.join(ROOT,'assets/styles/private-workspace.css'),'utf8');
for(const s of ['max-width:359px','max-width:600px','min-width:1600px','pointer:coarse','prefers-reduced-motion:reduce','--ui-device-gutter','env(safe-area-inset-left)','auth-inline-link','auth-eye','auth-tab']) assert(css.includes(s),`Missing responsive design guardrail ${s}`);
for(const s of ['max-height:430px','max-width:359px','safe-area-inset-bottom','ac-side-bottom','ac-logout','ac-side-nav']) assert(workspace.includes(s),`Missing responsive private workspace guardrail ${s}`);
const files=['index.html','auth.html','catalog.html','courses/excel.html','courses/python.html','tutor.html','account.html','admin.html'];
for(const file of files){
 const html=fs.readFileSync(path.join(ROOT,file),'utf8');
 assert(/name="viewport"/.test(html),`${file}: missing viewport meta`);
 assert(html.includes('data-theme="light"'),`${file}: missing modern theme`);
 assert(html.includes('assets/styles/design-system.css')||html.includes('../assets/styles/design-system.css'),`${file}: missing shared styling`);
}
console.log('PASS responsive source contract: fluid surfaces, short viewport navigation, coarse pointer targets, reduced motion, device safe areas and representative route assets.');
