import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const securePages=['account','admin','progress','reviewer','profile','certificate','connection-test','sync-test'];
const styles=read('assets/styles/private-experience-v3.css');
for(const page of securePages){
  const html=read(`${page}.html`);
  assert.match(html,/data-private-workspace="true"/,`${page}: private shell marker`);
  assert.match(html,/private-experience-v3\.css/,`${page}: final premium style layer`);
  assert.match(html,/id="dlxPageLoader"/,`${page}: shared public/private loader`);
  assert.match(html,/private-navigation\.js/,`${page}: role-aware navigation`);
}
for(const token of ['.ac-courses-heading','.ac-insights-metric','.ac-chart-row','.ac-course-card','.mld-sync-action','.mld-progress-ring::before','.ip-panel','.review-inbox','.profile-card','.px-utility-panel'])assert.ok(styles.includes(token),`Missing premium styling for ${token}`);
const account=read('account.html');
for(const id of ['accountSyncNow','accountSyncStatus','dashProgressRing','excelBar','sqlBar','dashHeroCompletion'])assert.ok(account.includes(`id="${id}"`),`Missing dashboard control ${id}`);
for(const str of ['coreUnitTotal=Object.values(trackUnits)','coreTracks.has','renderProgress(rows)','void loadProgress()','await fetchProgress()','window.ZAHProgressCloud.syncAll({user})','if(refreshButton)refreshButton.addEventListener'])assert.ok(account.includes(str),`Missing reliable progress behavior: ${str}`);
assert.doesNotMatch(account,/const syncResult=await window.ZAHProgressCloud.syncAll\(\)/,'Render must not wait for full sync before showing progress');
const admin=read('assets/scripts/admin-dashboard.js');
for(const slug of ['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'])assert.match(admin,new RegExp(`${slug}:\\['`),`Admin Courses Analysis lacks ${slug}`);
assert.match(admin,/introduction:\['Introduction',10/,'Introduction denominator should match 10 real course units');
assert.match(styles,/z-index:0!important/,'Ring track must be visibly layered over its conic gradient');
console.log('PASS premium protected workspace: 8 private pages, 9 admin tracks, nonblocking learner progress, visible ring and refresh controls');
