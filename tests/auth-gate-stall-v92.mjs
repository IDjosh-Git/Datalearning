import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('assets/auth-gate.js','utf8');
async function check(page,roleHangs=true){
 const classes=new Set(['dalp-auth-checking']);const events=[];
 const doc={currentScript:{src:'https://example.test/assets/auth-gate.js'},readyState:'loading',body:null,documentElement:{classList:{remove:k=>classes.delete(k),add:k=>classes.add(k)}},addEventListener:(ev,fn)=>events.push(ev),getElementById:()=>null,querySelector:()=>null};
 const session={user:{id:'learner-1'},access_token:'private-token'};
 const auth={getSession:async()=>({data:{session},error:null}),getUser:async()=>({data:{user:session.user},error:null}),onAuthStateChange:()=>{}};
 const from=()=>({select:()=>({eq:()=>({maybeSingle:()=>roleHangs?new Promise(()=>{}):Promise.resolve({data:null,error:null})})})});
 const location={pathname:'/'+page,search:'?tool=SQL&challenge=sql001',hash:'',href:'https://example.test/'+page+'?tool=SQL&challenge=sql001',replace:()=>{throw Error('Unexpected redirect')}};
 const calls={cookie:false};
 const context={window:{ZAH_DB:{configured:true,client:{auth,from}},DALP_SERVER_SESSION:{establish:()=>{calls.cookie=true;return new Promise(()=>{})}}},document:doc,URL,location,console,localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},sessionStorage:{removeItem:()=>{}},setTimeout,clearTimeout,CustomEvent:function(){}};
 vm.runInNewContext(source,context);
 await new Promise(r=>setTimeout(r,90));
 return {classes,context,calls};
}
const learner=await check('tutor.html');
assert(!learner.classes.has('dalp-auth-checking'),'Ordinary learner content must reveal without waiting for role or hosting cookie');
assert(learner.context.window.DALP_AUTH_USER?.id==='learner-1');
assert(learner.calls.cookie,'Cookie renewal still attempted without blocking the page');
const admin=await check('admin.html');
assert(admin.classes.has('dalp-auth-checking'),'Unverified administrator content must remain protected');
const practice=fs.readFileSync('practice.html','utf8');
assert(!practice.includes('dalp-auth-checking'),'Public Arena selection must not be hidden by account verification');
assert(practice.includes('data-arena-subject="SQL"')&&practice.includes('data-arena-subject="Excel"')&&practice.includes('data-arena-subject="Python"'),'All three public tool choices required');
console.log('PASS v92: real learner access does not await unresolved role/cookie promises; admin stays protected; public Arena preserves selectors and deep-link');
