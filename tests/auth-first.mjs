import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=x=>fs.readFileSync(path.join(root,x),'utf8');
const paths=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?paths(path.join(dir,x.name)):x.name.endsWith('.html')?[path.join(dir,x.name)]:[]);
const htmlFiles=paths(root);
const publiclyBrowsable=new Set(['catalog.html','index.html','courses/introduction.html','courses/excel.html','courses/sql.html','courses/powerbi.html','courses/python.html','courses/ai.html']);
for(const rel of publiclyBrowsable){assert(!read(rel).includes('assets/auth-gate.js'),`${rel} should allow course browsing without redirect`);}
assert(htmlFiles.length>=23,'Expected at least 23 app pages');
const publicPage=read('auth.html');
assert(!publicPage.includes('auth-gate.js'),'Sign-in page must remain public');
assert(!read('verify.html').includes('auth-gate.js'),'Third-party certificate verification must be public');
assert(!read('preview.html').includes('auth-gate.js'),'Sample lesson must remain public, with no save controls');
assert(!read('practice.html').includes('auth-gate.js'),'Practice Arena selection and local execution must remain public');
for(const f of htmlFiles.filter(x=>!publiclyBrowsable.has(path.relative(root,x).replaceAll('\\','/'))&&!x.endsWith('auth.html')&&!x.endsWith('verify.html')&&!x.endsWith('capstone-guide.html')&&!x.endsWith('preview.html')&&!x.endsWith('practice.html'))){
 const html=fs.readFileSync(f,'utf8');
 const rel=path.relative(root,f);
 const gate=html.indexOf('document.documentElement.classList.add(\'dalp-auth-checking\')');
 assert(gate>=0,`Missing pre-render authentication cover on ${rel}`);
 assert(/assets\/auth-gate\.js\?v=(?:20261021(?:\.[23])?|20261031\.(?:91|92))/.test(html),`Missing session guard ${rel}`);
 assert(/assets\/auth-gate\.css\?v=(?:20261021(?:\.[23])?|20261031\.91)/.test(html),`Missing fail-closed css ${rel}`);
 assert(/assets\/auth-gate\.js\?v=(?:20261021(?:\.[23])?|20261031\.(?:91|92))/.test(html.slice(0,html.indexOf('</head>'))),`Guard not in head ${rel}`);
 assert.equal((html.match(/src="https:\/\/cdn.jsdelivr.net\/npm\/@supabase\/supabase-js@2.57.0"/g)||[]).length,1,`Auth SDK not once on ${rel}`);
}
for(const id of ['loginForm','signupForm','forgotForm','resetForm','loginEmail','loginPassword','signupEmail','signupPassword','signupConfirm','forgotEmail','newPassword','confirmNewPassword','loginBtn','signupBtn','forgotBtn','resetBtn'])assert(publicPage.includes(`id="${id}"`),`Missing ${id}`);
const auth=read('assets/auth-flow.js');
for(const term of ['signInWithPassword','signUp','resetPasswordForEmail','updateUser','signInWithOAuth','return','location.replace(target)','emailRedirectTo','PASSWORD_RECOVERY','8 characters'])assert(auth.includes(term),`Missing auth logic ${term}`);
const gate=read('assets/auth-gate.js');
for(const term of ['auth.getSession()','auth.getUser()','loginDestination()','prepareWorkspace','clearLocalCourseCache','SIGNED_OUT','USER_DELETED','dalp-auth-checking','showError()','onAuthStateChange'])assert(gate.includes(term),`Missing guard logic ${term}`);
assert(read('assets/progress-cloud.js').includes('recoverCurrentDevice(user){ return syncAll({user:user||null}); }'),'No forced recovery on account switching');
console.log(`PASS auth-first coverage: ${htmlFiles.length-5-publiclyBrowsable.size} guarded pages, verified sessions, signup, signin, recovery, account switching, signout`);
