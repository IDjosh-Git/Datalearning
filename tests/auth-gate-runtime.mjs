import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('assets/scripts/auth-gate.js','utf8');
function make(authStatus,previousOwner,{page="courses/sql.html",admin=false,roleError=false}={}){
 const url=new URL('https://learn.example/'+page+(page==='courses/sql.html'?'?week=5':''));
 const store=new Map();
 if(previousOwner)store.set('dalpLastLearnerId',previousOwner);
 if(previousOwner||authStatus==='signed_out'){store.set('excelRoadmapProgress','{"1":true}');store.set('zahPendingAnonymous:excel','{"1":true}');}
 let redirect=null,ready=false,user=null;
 const classes=new Set(['dalp-auth-checking']);
 const listeners={};
 const doc={currentScript:{src:'https://learn.example/assets/scripts/auth-gate.js'},readyState:'loading',body:null,
 documentElement:{classList:{add:k=>classes.add(k),remove:k=>classes.delete(k)}},
 addEventListener:(event,cb)=>{listeners[event]=cb},getElementById:()=>null,querySelector:()=>null};
 const auth={
  getSession:async()=>({data:{session:authStatus==='signed_out'?null:{access_token:'stub'}},error:null}),
  getUser:async()=>({data:{user:authStatus==='signed_in'?{id:'new-user',email:'student@test.com'}:null},error:null}),
  onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}})};
 const from=()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:admin?{user_id:"new-user"}:null,error:roleError?{message:"permission denied"}:null})})})});
 const context={document:doc,location:{pathname:url.pathname,search:url.search,hash:url.hash,href:url.href,replace:val=>{redirect=val}},URL,
 console,setTimeout,clearTimeout,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},
 sessionStorage:{removeItem:()=>{}},window:{ZAH_DB:{configured:true,client:{auth,from}}}};
 vm.runInNewContext(source,context);
 return {async finish(){await new Promise(r=>setTimeout(r,40));return {redirect,classes,store,user:context.window.DALP_AUTH_USER,gate:context.window.DALP_AUTH_GATE}},listeners};
}
let a=make('signed_out');let r=await a.finish();
assert(r.redirect?.startsWith('https://learn.example/auth.html?return='),'Signed-out visitor redirected');
assert(new URL(r.redirect).searchParams.get('return')==='/courses/sql.html?week=5','Deep link preserved');
assert(r.store.has('excelRoadmapProgress'),'Legacy anonymous progress preserved for first signup');
a=make('signed_in','different-user');r=await a.finish();
assert(!r.redirect,'Valid learner must not redirect');
assert(!r.classes.has('dalp-auth-checking'),'Valid learner can see page');
assert(r.user?.id==='new-user','Valid user must be available');
assert(!r.store.has('excelRoadmapProgress'),'Previous learner progress cleared');
assert(!r.store.has('zahPendingAnonymous:excel'),'Anonymous queue cleared on learner change');
assert(r.store.get('dalpLastLearnerId')==='new-user','Signed-in user becomes owner');
a=make('signed_in',null,{page:'admin.html'});r=await a.finish();assert(r.classes.has('dalp-auth-checking'),'Learner denied admin route');
a=make('signed_in',null,{page:'admin.html',admin:true});r=await a.finish();assert(!r.classes.has('dalp-auth-checking'),'Administrator can open admin route');
a=make('signed_in',null,{page:'index.html',roleError:true});r=await a.finish();assert(!r.classes.has('dalp-auth-checking'),'Role-service errors must not block verified learner pages');
a=make('signed_in',null,{page:'admin.html',roleError:true});r=await a.finish();assert(r.classes.has('dalp-auth-checking'),'Admin access must fail closed when role service is unavailable');
console.log('PASS runtime auth guard: signed out -> safe deep link; signed in -> visible; shared-device progress isolated');
