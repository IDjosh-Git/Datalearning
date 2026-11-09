/* Align the learning rail beneath the actual site header at every viewport width.
   Purely visual; leaves lesson navigation, auth and progress controllers intact. */
(()=>{'use strict';
 const start=()=>{
  const header=document.querySelector('body.dlp-course-v29 > .dalp-global-header');
  if(!header)return;
  let scheduled=false;
  // The Introduction course uses a body-level fixed rail rather than a grid
  // child. Clamp its position to the bottom of its main content, so it cannot
  // cover the footer as the reader nears the end of the course.
  const introRail=document.body.classList.contains('dl-special-rail')
    ?document.getElementById('sidebar'):null;
  const introMain=introRail?document.querySelector('body.dl-special-rail > main'):null;
  const sync=()=>{
   scheduled=false;
   const height=Math.max(0,Math.ceil(header.getBoundingClientRect().height));
   if(height&&height<240)document.body.style.setProperty('--dl-course-header-h',`${height}px`);
   if(introRail&&introMain&&matchMedia('(min-width:1051px)').matches){
     const top=height+12;
     const bottom=introMain.getBoundingClientRect().bottom;
     const overlap=Math.max(0,top+introRail.offsetHeight+10-bottom);
     document.body.style.setProperty('--dl-rail-footer-shift',`${-Math.round(overlap)}px`);
   }else if(introRail){
     document.body.style.setProperty('--dl-rail-footer-shift','0px');
   }
  };
  const schedule=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(sync);}};
  sync();
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(schedule).observe(header);
  addEventListener('resize',schedule,{passive:true});
  if(introRail) addEventListener('scroll',schedule,{passive:true});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
