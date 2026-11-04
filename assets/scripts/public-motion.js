/* Public-only micro-interactions: progressive enhancement, no hidden content,
   no scroll listeners, and no movement with reduced-motion preferences. */
(()=>{
  'use strict';
  const init=()=>{
    const root=document.body;
    if(!root?.hasAttribute('data-public-refresh'))return;
    const reduce=matchMedia('(prefers-reduced-motion: reduce)');
    root.classList.add('dalp-motion-enhanced');
    if(reduce.matches || !('IntersectionObserver' in window))return;
    const candidates=[...document.querySelectorAll([
      'main .lp-course','main .dlp97-card','main .lp-feature',
      'main .lp-step','main .intro-lesson','main .course-week-card',
      'main .dlp97-catalog-hero','main .course-guide-card',
      'main .dalp-themed-hero','main .lp-prompt-promo-inner'
    ].join(','))].slice(0,42);
    let animated=0;
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        observer.unobserve(entry.target);
        const element=entry.target;
        if(!element.isConnected || typeof element.animate!=='function')return;
        // Animate the element itself, without hiding it if JS is interrupted.
        const delay=Math.min((animated++%5)*35,140);
        element.animate([
          {opacity:0.90,transform:'translate3d(0,12px,0)'},
          {opacity:1,transform:'translate3d(0,0,0)'}
        ],{duration:460,delay,easing:'cubic-bezier(.2,.7,.2,1)',fill:'none'});
      });
    },{threshold:0.08,rootMargin:'0px 0px -24px 0px'});
    candidates.forEach(element=>observer.observe(element));
    window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
