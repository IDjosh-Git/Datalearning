import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=name=>fs.readFileSync(name,'utf8');
const sql=read('ADMIN_LEARNER_MIGRATION.sql');
const gate=read('assets/auth-gate.js');
const admin=read('admin.html');
const dashboard=read('assets/admin-dashboard.js');
for(const table of ['learner_profiles','site_admins']) assert(sql.includes('CREATE TABLE IF NOT EXISTS public.'+table),'Missing table: '+table);
for(const rule of ['ENABLE ROW LEVEL SECURITY','site_admins_read_self','learner_profiles_read_self','learner_profiles_read_admin','learner_profiles_update_self','progress_select_admin','quiz_select_admin','certificates_select_admin','capstones_select_admin','dalp_user_profile_sync']) assert(sql.includes(rule),'Missing database protection: '+rule);
assert(/REVOKE ALL ON TABLE public.site_admins FROM PUBLIC, anon, authenticated/i.test(sql),'Clients must not grant themselves admin privileges');
assert(/GRANT SELECT ON TABLE public.site_admins TO authenticated/i.test(sql),'Admin self read required');
assert(!/GRANT (?:INSERT|ALL) ON TABLE public.site_admins TO authenticated/i.test(sql),'Never allow client promotion');
assert(gate.includes("'admin.html'")&&gate.includes("'progress.html'")&&gate.includes("'reviewer.html'"),'Admin-only routes must be covered');
assert(gate.includes("role!=='admin'")&&gate.includes('roleError')&&gate.includes("paint('denied')"),'Role must be verified before page access');
for(const el of ['adminWorkspace','adminSearch','adminStatus','adminLearnerRows','adminLearnerDetail','adminExport','adminPending']) assert(admin.includes('id="'+el+'"'),'Admin UI missing '+el);
for(const operation of ["fetchAll('learner_profiles'","fetchAll('course_progress'","fetchAll('quiz_results'","fetchAll('certificates'","fetchAll('capstone_submissions'",'escape','not_a_real']){
 if(operation==='escape'||operation==='not_a_real')continue;
 assert(dashboard.includes(operation),'Admin report missing '+operation);
}
assert(dashboard.includes('esc(v)')||dashboard.includes('const esc='),'Report strings must be escaped');
console.log('PASS admin architecture: role gate, protected records, private roster, profile triggers, non-self-service privileges');
