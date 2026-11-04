/* Data Learning 2026 — direct-link navigation with accessible mobile drawer. */
(()=>{'use strict';
 const init=()=>{
  const header=document.querySelector('.dalp-global-header');if(!header)return;
  const button=header.querySelector('.dalp-global-toggle');
  const nav=header.querySelector('.dalp-global-nav');
  if(!button||!nav)return;
  const close=()=>{nav.classList.remove('is-open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Open navigation');button.textContent='☰'};
  button.addEventListener('click',()=>{
   if(button.getAttribute('aria-expanded')==='true')close();
   else{nav.classList.add('is-open');button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','Close navigation');button.textContent='✕'}
  });
  nav.addEventListener('click',event=>{if(event.target.closest('a'))close()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&button.getAttribute('aria-expanded')==='true'){close();button.focus()}});
  document.addEventListener('pointerdown',event=>{if(!header.contains(event.target))close()});
  const desktop=matchMedia('(min-width:1351px)');desktop.addEventListener?.('change',event=>{if(event.matches)close()});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
