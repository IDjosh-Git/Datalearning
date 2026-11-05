/* Align the learning rail beneath the actual site header at every viewport width.
   Purely visual; leaves lesson navigation, auth and progress controllers intact. */
(()=>{'use strict';
 const start=()=>{
  const header=document.querySelector('body.dlp-course-v29 > .dalp-global-header');
  if(!header)return;
  let scheduled=false;
  const sync=()=>{
   scheduled=false;
   const height=Math.max(0,Math.ceil(header.getBoundingClientRect().height));
   if(height&&height<240)document.body.style.setProperty('--dl-course-header-h',`${height}px`);
  };
  const schedule=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(sync);}};
  sync();
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(schedule).observe(header);
  addEventListener('resize',schedule,{passive:true});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
