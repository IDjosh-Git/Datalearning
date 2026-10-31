import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=name=>fs.readFileSync(name,'utf8');
const sql=read('database/migrations/ADMIN_LEARNER_MIGRATION.sql');
const gate=read('assets/scripts/auth-gate.js');
const admin=read('admin.html');
const dashboard=read('assets/scripts/admin-dashboard.js');
for(const table of ['learner_profiles','site_admins']) assert(sql.includes('CREATE TABLE IF NOT EXISTS public.'+table),'Missing table: '+table);
for(const rule of ['ENABLE ROW LEVEL SECURITY','site_admins_read_self','learner_profiles_read_self','learner_profiles_read_admin','learner_profiles_update_self','progress_select_admin','quiz_select_admin','certificates_select_admin','capstones_select_admin','dalp_user_profile_sync']) assert(sql.includes(rule),'Missing database protection: '+rule);
assert(/REVOKE ALL ON TABLE public.site_admins FROM PUBLIC, anon, authenticated/i.test(sql),'Clients must not grant themselves admin privileges');
assert(/GRANT SELECT ON TABLE public.site_admins TO authenticated/i.test(sql),'Admin self read required');
assert(!/GRANT (?:INSERT|ALL) ON TABLE public.site_admins TO authenticated/i.test(sql),'Never allow client promotion');
assert(gate.includes("'admin.html'")&&gate.includes("'progress.html'")&&gate.includes("'reviewer.html'"),'Admin-only routes must be covered');
// Restriction is checked synchronously before lifting the protected-page veil;
// ordinary learner pages may perform their optional role lookup after rendering.
const restricted=gate.match(/const restricted=new Set\(\[([^\]]+)\]\)/)?.[1]??'';
for(const route of ['admin.html','progress.html','reviewer.html','connection-test.html','sync-test.html'])
 assert(restricted.includes(`'${route}'`),`Protected route missing from role gate: ${route}`);
const gateStart=gate.indexOf('const adminPage=restricted.has(page)');
const roleLookup=gate.indexOf("client.from('site_admins').select('user_id')",gateStart);
const denied=gate.indexOf("paint('denied');return;",roleLookup);
const show=gate.indexOf("authenticated=true;",gateStart);
assert(gateStart>=0&&roleLookup>gateStart&&denied>roleLookup&&show>denied,
 'Restricted routes must verify site_admins role and deny unapproved users before making the page visible');
const restrictedCode=gate.slice(gateStart,gate.indexOf('prepareWorkspace(data.user)',gateStart));
assert.match(restrictedCode,/if\(adminPage\)\s*\{/, 'Restricted pages must require role lookup');
assert.match(restrictedCode,/if\(result\?\.error\)\s*\{[^}]*showError\(\);return;/s,
 'Restricted pages must fail closed on permission lookup errors');
assert.match(restrictedCode,/if\(!result\?\.data\)\s*\{paint\('denied'\);return;\}/,
 'Non-administrators must be denied protected pages');
for(const el of ['adminWorkspace','adminSearch','adminStatus','adminLearnerRows','adminLearnerDetail','adminExport','adminPending']) assert(admin.includes('id="'+el+'"'),'Admin UI missing '+el);
for(const operation of ["fetchAll('learner_profiles'","fetchAll('course_progress'","fetchAll('quiz_results'","fetchAll('certificates'","fetchAll('capstone_submissions'",'escape','not_a_real']){
 if(operation==='escape'||operation==='not_a_real')continue;
 assert(dashboard.includes(operation),'Admin report missing '+operation);
}
assert(dashboard.includes('esc(v)')||dashboard.includes('const esc='),'Report strings must be escaped');
console.log('PASS admin architecture: role gate, protected records, private roster, profile triggers, non-self-service privileges');
