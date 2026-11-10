/* DataLearning unified page loader. Public DOM readiness + private verified auth share one experience. */
(()=>{'use strict';
 const root=document.documentElement;
 const loader=document.getElementById('dlxPageLoader');
 if(!loader){root.classList.remove('dlx-loader-pending');return;}
 const shownAt=performance.now();
 const MIN_VISIBLE=460; // brief branded state, never a fabricated multi-second delay
 const MAX_PUBLIC_WAIT=2800; // public pages must not stall on slow third-party scripts
 let ready=document.readyState!=='loading';
 let finished=false,finishTimer=null,authResult=null;
 function finish(){
  if(finished||!ready)return;
  // Authentication remains fail-closed: do NOT dismiss until the guard approves or shows recovery.
  if(root.classList.contains('dalp-auth-checking') && authResult!=='error' && authResult!=='denied')return;
  const remaining=Math.max(0,MIN_VISIBLE-(performance.now()-shownAt));
  if(remaining){if(finishTimer===null)finishTimer=setTimeout(()=>{finishTimer=null;finish()},remaining);return;}
  finished=true;root.classList.remove('dlx-loader-pending');root.classList.add('dlx-loader-leaving');
  loader.setAttribute('aria-hidden','true');
  setTimeout(()=>{loader.remove();root.classList.remove('dlx-loader-leaving');},360);
 }
 if(!ready)document.addEventListener('DOMContentLoaded',()=>{ready=true;finish()},{once:true});
 else finish();
 window.addEventListener('dalp:auth-ready',()=>{authResult='ready';finish()});
 window.addEventListener('dalp:auth-gate-state',event=>{
  authResult=event.detail?.state||null;
  if(authResult==='error'||authResult==='denied')finish();
 });
 window.addEventListener('pageshow',event=>{if(event.persisted){ready=true;finish()}});
 setTimeout(()=>{if(!root.classList.contains('dalp-auth-checking')){ready=true;finish()}},MAX_PUBLIC_WAIT);
})();
