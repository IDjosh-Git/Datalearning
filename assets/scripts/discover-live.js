/* Preview of the four actual learning stages, not simulated activity metrics. */
(()=>{'use strict';const start=()=>{
 const steps=[...document.querySelectorAll('.dh-hero .dh-route-step')];if(!steps.length)return;
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 let i=0;const update=()=>steps.forEach((el,j)=>el.classList.toggle('is-lit',i===j));update();
 const visibility=()=>{if(document.hidden){clearInterval(timer);timer=null}else if(!timer)timer=setInterval(()=>{i=(i+1)%steps.length;update()},2800)};
 let timer=setInterval(()=>{i=(i+1)%steps.length;update()},2800);
 document.addEventListener('visibilitychange',visibility);
 };if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();