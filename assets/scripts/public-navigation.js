/* Accessible global navigation and Study tools disclosure. */
(()=>{'use strict';
 const init=()=>{
  const header=document.querySelector('.dalp-global-header');if(!header)return;
  const button=header.querySelector('.dalp-global-toggle');
  const nav=header.querySelector('.dalp-global-nav');
  const study=header.querySelector('.dalp-study-tools');
  if(!button||!nav)return;
  const closeStudy=()=>{if(study)study.open=false};
  const close=()=>{nav.classList.remove('is-open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Open navigation');button.textContent='☰';closeStudy()};
  button.addEventListener('click',()=>{
   if(button.getAttribute('aria-expanded')==='true')close();
   else{nav.classList.add('is-open');button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','Close navigation');button.textContent='✕'}
  });
  nav.addEventListener('click',event=>{if(event.target.closest('a'))close()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(study?.open){closeStudy();study.querySelector('summary')?.focus();event.preventDefault()}else if(button.getAttribute('aria-expanded')==='true'){close();button.focus()}}});
  document.addEventListener('pointerdown',event=>{if(!header.contains(event.target))close();else if(study?.open&&!study.contains(event.target))closeStudy()});
  matchMedia('(min-width:1201px)').addEventListener?.('change',event=>{if(event.matches)close()});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
