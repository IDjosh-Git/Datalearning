/* Data Learning 2026 — direct-link navigation with accessible mobile drawer. */
(()=>{'use strict';
 const init=()=>{
  const header=document.querySelector('.dalp-global-header');if(!header)return;
  const button=header.querySelector('.dalp-global-toggle');
  const nav=header.querySelector('.dalp-global-nav');
  const study=header.querySelector('.dalp-study-tools');
  if(!button||!nav)return;
  const close=()=>{if(study)study.open=false;nav.classList.remove('is-open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Open navigation');button.textContent='☰'};
  button.addEventListener('click',()=>{
   if(button.getAttribute('aria-expanded')==='true')close();
   else{nav.classList.add('is-open');button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','Close navigation');button.textContent='✕'}
  });
  nav.addEventListener('click',event=>{if(event.target.closest('a'))close()});
  study?.querySelector('summary')?.addEventListener('click',()=>{if(button.getAttribute('aria-expanded')==='false' && matchMedia('(max-width:1130px)').matches){nav.classList.add('is-open');button.setAttribute('aria-expanded','true')}});
  document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;if(study?.open){study.open=false;study.querySelector('summary')?.focus();return}if(button.getAttribute('aria-expanded')==='true'){close();button.focus()}});
  document.addEventListener('pointerdown',event=>{if(!header.contains(event.target))close()});
  const desktop=matchMedia('(min-width:1131px)');desktop.addEventListener?.('change',event=>{if(event.matches)close()});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
