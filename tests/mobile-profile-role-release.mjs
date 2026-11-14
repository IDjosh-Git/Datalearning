import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import handler from '../api/auth/session.js';
const root=path.resolve(import.meta.dirname,'..');
const file=p=>fs.readFileSync(path.join(root,p),'utf8');
const simulate=async(req)=>{
 const headers={};let body='';
 const res={statusCode:200,setHeader(k,v){headers[k]=v},end(value=''){body=value}};
 await handler(req,res);
 return {status:res.statusCode,headers,body};
};
for(const [url,accept,target] of [
 ['/api/auth/session','text/html','/index.html'],
 ['/api/auth/session?continue=%2Fcourses%2Fexcel.html','text/html','/courses/excel.html'],
 ['/api/auth/session?continue=%2Fpractice.html','*/*','/practice.html']
]){
 const r=await simulate({method:'GET',url,headers:{host:'app.example.test',cookie:'',accept,'sec-fetch-mode':'navigate'}});
 assert.equal(r.status,303,'Expired top-level navigation redirects instead of JSON');
 assert.equal(r.headers.Location,'/auth.html?return='+encodeURIComponent(target));
 assert.doesNotMatch(String(r.body),/Session expired/);
}
const api=await simulate({method:'GET',url:'/api/auth/session',headers:{host:'app.example.test',cookie:'',accept:'application/json','sec-fetch-mode':'cors'}});
assert.equal(api.status,401);assert.match(api.body,/Session expired/);
const auth=file('assets/scripts/auth-gate.js'),session=file('api/auth/session.js');
assert.match(auth,/const whenReady\s*=\s*new Promise/);
assert.match(session,/function documentRequest\(/);
for(const p of ['admin.html','account.html','profile.html','reviewer.html','progress.html'])
 assert.match(file(p),/profile-navigation\.js/,'Profile button needed on '+p);
const profile=file('assets/scripts/profile-editor.js');
assert.match(profile,/db\.auth\.updateUser\(\{data:values\}\)/);
assert.match(profile,/from\('learner_profiles'\)\.update\(\{full_name:name\}\)/);
assert.doesNotMatch(profile,/update\(\{[^}]*role/,'Clients cannot edit role');
const admin=file('assets/scripts/admin-dashboard.js');
assert.match(admin,/full_name,email,role,joined_at/);
assert.match(admin,/ac-account-role/);
assert.doesNotMatch(admin,/if\(p\.user_id===window\.DALP_AUTH_USER\?\.id\)return false/);
const nav=file('assets/scripts/private-navigation.js');
assert.match(nav,/\['Review desk','reviewer\.html','reviews'\]/);
assert.match(nav,/right\.innerHTML='<span class="ac-secure"/);
assert.doesNotMatch(nav,/data-admin-shortcut|data-learner-shortcut|ac-side-account/);
const role=file('database/migrations/20261111_admin_learner_directory_role.sql');
assert.match(role,/GRANT UPDATE \(full_name\)/);
assert.match(role,/REVOKE UPDATE ON public\.learner_profiles FROM anon, authenticated/);
assert.match(role,/SECURITY DEFINER/);
console.log('PASS mobile document refresh redirect, cloud profile update, single admin links and secure role synchronization');
