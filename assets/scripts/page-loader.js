/* DataLearning unified page loader. Public DOM readiness + private verified auth share one experience. */
(()=>{'use strict';
 const root=document.documentElement;
 const loader=document.getElementById('dlxPageLoader');
 if(!loader){root.classList.remove('dlx-loader-pending');return;}
 const MAX_PUBLIC_WAIT=2800; // public pages must not stall on slow third-party scripts
 let ready=document.readyState!=='loading';
 let finished=false,authResult=null;
 function finish(){
  if(finished||!ready||root.dataset.brandPending!==undefined)return;
  // Authentication remains fail-closed: do NOT dismiss until the guard approves or shows recovery.
  if(root.classList.contains('dalp-auth-checking') && authResult!=='error' && authResult!=='denied')return;
  finished=true;root.classList.remove('dlx-loader-pending');root.classList.add('dlx-loader-leaving');
  loader.setAttribute('aria-hidden','true');
  setTimeout(()=>{loader.remove();root.classList.remove('dlx-loader-leaving');},180);
 }
 if(!ready)document.addEventListener('DOMContentLoaded',()=>{ready=true;finish()},{once:true});
 else finish();
 window.addEventListener('datalearning:brand-settled',finish);
 window.addEventListener('dalp:auth-ready',()=>{authResult='ready';finish()});
 window.addEventListener('dalp:auth-gate-state',event=>{
  authResult=event.detail?.state||null;
  if(authResult==='error'||authResult==='denied'){ready=true;finish()}
 });
 window.addEventListener('pageshow',event=>{if(event.persisted){ready=true;finish()}});
 setTimeout(()=>{if(!root.classList.contains('dalp-auth-checking')){ready=true;finish()}},MAX_PUBLIC_WAIT);
})();

