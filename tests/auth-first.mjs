import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(), read=f=>fs.readFileSync(path.join(root,f),'utf8');
const pages=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')),...fs.readdirSync('courses').filter(f=>f.endsWith('.html')).map(f=>'courses/'+f)];
for(const page of pages.filter(f=>f!=='auth.html')){
 const html=read(page),head=html.split('</head>')[0];
 assert(head.includes("classList.add('dalp-auth-checking')"),`${page}: protect before initial paint`);
 assert(head.includes('access-guard.css'),`${page}: fail-closed cover required`);
 assert(head.includes('assets/scripts/auth-gate.js'),`${page}: authenticated browser guard required`);
 assert(head.indexOf('auth-gate.js')>head.indexOf('supabase-client.js'),`${page}: session must initialize before gate`);
 assert.equal((html.match(/auth-gate.js/g)||[]).length,1,`${page}: avoid repeated auth checks`);
}
const auth=read('auth.html');
assert(!auth.includes('assets/scripts/auth-gate.js'),'Sign-in is the sole public screen');
assert(auth.includes('auth-entry-premium.css'));
assert(!auth.includes('public-header-unified.js')&&!auth.includes('learner-companion.js'));
for(const id of ['loginForm','signupForm','forgotForm','resetForm','loginEmail','loginPassword','signupEmail','signupPassword','signupConfirm','forgotEmail','newPassword','confirmNewPassword','loginBtn','signupBtn','forgotBtn','resetBtn'])assert(auth.includes(`id="${id}"`),`Missing auth control ${id}`);
const flow=read('assets/scripts/auth-flow.js');
for(const key of ['signInWithPassword','signUp','resetPasswordForEmail','updateUser','signInWithOAuth','location.replace(target)','DALP_SERVER_SESSION.establish','PASSWORD_RECOVERY'])assert(flow.includes(key),`Missing auth flow ${key}`);
assert(flow.includes('Secure session timed out'),'Cookie must be established before entering');
console.log(`PASS app-wide authenticated HTML: ${pages.length-1} guarded pages; only sign-in public; secure session required`);
