/* Auth-first role-based gate: Supabase validates identity and RLS enforces record access.
   The browser hides protected UI, but published static HTML/assets require hosting middleware
   for true file-level protection. */
(function(){
 'use strict';
 const root=new URL('../',new URL(document.currentScript.src,location.href));
 const toPage=name=>new URL(name,root);
 const restricted=new Set(['admin.html','progress.html','reviewer.html','connection-test.html','sync-test.html']);
 const ownerKey='dalpLastLearnerId';
 const courseKeys=['dalpIntroductionProgressV1','excelRoadmapProgress','sqlRoadmapProgress','powerbiRoadmapProgress','pythonRoadmapProgress','aiRoadmapProgress'];
 let gate,working=false,authenticated=false;
 const deadline=(promise,ms=14000)=>new Promise((resolve,reject)=>{
   const timer=setTimeout(()=>reject(new Error('Session verification timed out')),ms);
   Promise.resolve(promise).then(value=>{clearTimeout(timer);resolve(value)},error=>{clearTimeout(timer);reject(error)});
 });
 const page=location.pathname.split('/').pop().toLowerCase()||'index.html';
 function loginDestination(){const u=toPage('auth.html');u.searchParams.set('return',location.pathname+location.search+location.hash);return u.href;}
 function clearLocalCourseCache(){try{courseKeys.forEach(k=>localStorage.removeItem(k));['introduction','excel','sql','powerbi','python','ai'].forEach(k=>localStorage.removeItem('zahPendingAnonymous:'+k));}catch(_){}}
 function prepareWorkspace(user){if(!user?.id)return;try{const owner=localStorage.getItem(ownerKey);if(owner&&owner!==user.id)clearLocalCourseCache();localStorage.setItem(ownerKey,user.id);}catch(_){}}
 function exit(clearCache=true){if(clearCache)clearLocalCourseCache();try{sessionStorage.removeItem('dalpGateUser')}catch(_){}location.replace(loginDestination());}
 function paint(kind='loading'){
  if(!document.body)return;
  if(!gate){gate=document.createElement('div');gate.id='dalp-auth-gate';gate.setAttribute('role','status');gate.setAttribute('aria-live','polite');document.body.prepend(gate);}
  const isError=kind==='error',denied=kind==='denied';gate.className=(isError?'dalp-gate-error':denied?'dalp-gate-denied':'');
  const h=denied?'This area is for administrators':isError?'Unable to verify your access':'Checking your learning account';
  const desc=denied?'You are signed in as a learner. Your courses and saved progress remain available. Contact your platform administrator if you need a different role.':isError?'We could not finish checking your account. Please check your connection and select Retry. You can also return to sign-in without losing your selected page.':'Validating your session and permissions before opening the page.';
  gate.innerHTML='<section class="dalp-gate-box"><div class="dalp-gate-brand"><img src="'+toPage('assets/da-logo.svg').href+'" alt=""><span>Data Analysis Learning Path<small>Secure '+(denied?'admin':'learning')+' area</small></span></div><span class="dalp-gate-spin" aria-hidden="true"></span><h2>'+h+'</h2><p>'+desc+'</p>'+(denied?'<a class="dalp-gate-go" href="'+toPage('index.html').href+'">Return to learner dashboard →</a>':isError?'<div class="dalp-gate-actions"><button type="button" id="dalpGateRetry">Retry connection</button><a class="dalp-gate-go" href="'+loginDestination()+'">Return to sign-in</a></div>':'')+'</section>';
  if(isError)gate.querySelector('#dalpGateRetry').addEventListener('click',check);
 }
 function showError(){paint('error');}
 function addSignOut(){
  if(!document.getElementById('dalpGlobalLogout')&&!document.getElementById('logout')){
   const host=document.querySelector('.nav-links,.course-top-actions,.auth-top-actions,.sidebar');
   if(host){const b=document.createElement('button');b.id='dalpGlobalLogout';b.className='dalp-gate-logout';b.type='button';b.textContent='Sign out';b.addEventListener('click',async()=>{b.disabled=true;b.textContent='Signing out…';try{await window.DALP_SERVER_SESSION?.clear();await window.ZAH_DB.client.auth.signOut()}catch(e){console.warn('Sign-out failed',e)}exit()});host.append(b);}
  }
  document.querySelectorAll('a.account-link,a.course-account-link').forEach(a=>{a.textContent='My account';a.href=toPage('account.html').href});
 }
 function enhanceRoleUI(){
  const role=window.DALP_ROLE;document.documentElement.dataset.dalpRole=role;
  document.querySelectorAll('[data-admin-only]').forEach(node=>{node.hidden=role!=='admin'});
  if(role==='admin'){
   const host=document.querySelector('.nav-links,.course-top-actions,.sidebar,.auth-top-actions');
   if(host&&!document.getElementById('dalpAdminLink')){const a=document.createElement('a');a.id='dalpAdminLink';a.className=host.classList.contains('sidebar')?'lp-course-link':'dalp-admin-link';a.href=toPage('admin.html').href;a.textContent='⚙ Admin dashboard';host.append(a);}
  }else{document.querySelectorAll('.instructor-access-panel').forEach(n=>n.remove());}
  window.dispatchEvent(new CustomEvent('dalp:auth-ready',{detail:{role}}));
 }
 async function check(){
  if(working||authenticated)return;working=true;paint();
  try{
   const client=window.ZAH_DB?.client;
   if(!window.ZAH_DB?.configured||!client){showError();return;}
   const {data:session,error:sessionError}=await deadline(client.auth.getSession());
   if(sessionError){if(/refresh|invalid|session.*missing/i.test(sessionError.message||'')){exit();return;}showError();return;}
   if(!session?.session){let owned=false;try{owned=!!localStorage.getItem(ownerKey)}catch(_){}exit(owned);return;}
   const sessionId=session.session.user?.id;
   const verified=await deadline(client.auth.getUser());
   const {data,error}=verified;
   if(error){if(/invalid.*jwt|jwt.*expired|invalid.*refresh|session.*missing|user.*not.*found/i.test(error.message||'')){exit();return;}showError();return;}
   if(!data?.user||data.user.is_anonymous||(sessionId&&data.user.id!==sessionId)){exit();return;}
   // Identity verification is mandatory for every protected learning page.
   // Administrator-role lookup is NOT a prerequisite for ordinary learner content:
   // a slow or failing permissions service previously kept Practice Arena hidden.
   const adminPage=restricted.has(page);
   let role='learner';
   if(adminPage){
     let result;
     try{result=await deadline(client.from('site_admins').select('user_id').eq('user_id',data.user.id).maybeSingle(),8000)}
     catch(_){console.warn('Administrator permissions timed out');showError();return;}
     if(result?.error){console.warn('Administrator permissions unavailable');showError();return;}
     if(!result?.data){paint('denied');return;}
     role='admin';
   }
   prepareWorkspace(data.user);
   window.DALP_AUTH_USER=data.user;window.DALP_ROLE=role;
   window.DALP_ROLE_UNVERIFIED=!adminPage;
   // A hosting-session refresh is best-effort for learner pages and must not
   // block showing the Arena. Server-side functions still enforce auth.
   if(window.DALP_SERVER_SESSION?.establish){
     void deadline(window.DALP_SERVER_SESSION.establish(session.session),8000)
       .catch(()=>console.warn('Hosting session will retry on the next request'));
   }
   if(!adminPage){
     void (async()=>{
       try{
         const result=await deadline(client.from('site_admins').select('user_id').eq('user_id',data.user.id).maybeSingle(),5000);
         if(result?.error)return;
         window.DALP_ROLE=result?.data?'admin':'learner';
         window.DALP_ROLE_UNVERIFIED=false;
         if(authenticated){
           const refresh=()=>enhanceRoleUI();
           if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',refresh,{once:true});else refresh();
         }
       }catch(_){console.warn('Optional role lookup unavailable; learner page remains accessible')}
     })();
   }
   authenticated=true;document.documentElement.classList.remove('dalp-auth-checking');
   if(gate){gate.remove();gate=null;}
   const init=()=>{addSignOut();enhanceRoleUI();};
   if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
   client.auth.onAuthStateChange((event,newSession)=>{if(event==='SIGNED_OUT'||event==='USER_DELETED'){void window.DALP_SERVER_SESSION?.clear();exit();}else if(event==='TOKEN_REFRESHED'&&newSession){void window.DALP_SERVER_SESSION?.establish(newSession).catch(()=>{});}});
  }catch(e){console.warn('Unable to validate permissions',e);showError();}
  finally{working=false;}
 }
 window.DALP_AUTH_GATE={prepareWorkspace,clearLocalCourseCache,loginDestination,restrictedPages:Array.from(restricted)};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{if(!authenticated&&!gate)paint()},{once:true});
 check();
})();
