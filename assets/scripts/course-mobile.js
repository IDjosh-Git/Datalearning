/* Compact course action menu, preserving existing print and reset handlers. */
(()=>{
 'use strict';
 const init=()=>{
  const action=document.querySelector('.app .topbar .course-top-actions');
  if(!action)return;
  const toggle=action.querySelector('.dl-course-actions-toggle');
  if(!toggle)return;
  toggle.setAttribute('aria-label','More course options');
  toggle.setAttribute('title','More course options');
  const close=()=>{
   if(!action.classList.contains('dl-options-open'))return;
   action.classList.remove('dl-options-open');
   toggle.setAttribute('aria-expanded','false');
   toggle.textContent='Options';
  };
  document.addEventListener('pointerdown',e=>{if(!action.contains(e.target))close()});
  document.addEventListener('focusin',e=>{if(!action.contains(e.target))close()});
  toggle.addEventListener('click',()=>toggle.setAttribute('aria-label',action.classList.contains('dl-options-open')?'Close course options':'More course options'));
  action.querySelectorAll('a,button').forEach(el=>{if(el!==toggle)el.addEventListener('click',close)});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
