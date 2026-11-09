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
/* Depth follows the pointer only on precision-pointer devices; it is purely visual. */
(()=>{'use strict';
  const init=()=>{
    const card=document.querySelector('.dh-hero .dh-demo');
    if(!card || !window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    let frame=0;
    const move=e=>{
      if(frame)cancelAnimationFrame(frame);
      const box=card.getBoundingClientRect();
      const x=(e.clientX-box.left)/box.width-.5;
      const y=(e.clientY-box.top)/box.height-.5;
      frame=requestAnimationFrame(()=>{card.style.setProperty('--tilt-y',`${(x*5).toFixed(2)}deg`);card.style.setProperty('--tilt-x',`${(-y*5).toFixed(2)}deg`);frame=0;});
    };
    card.addEventListener('pointermove',move,{passive:true});
    card.addEventListener('pointerleave',()=>{if(frame)cancelAnimationFrame(frame);frame=0;card.style.removeProperty('--tilt-x');card.style.removeProperty('--tilt-y');},{passive:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
