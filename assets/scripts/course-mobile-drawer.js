/* v80: overlay-free, accessible course navigation. */
(()=>{'use strict';function init(){
 const button=document.getElementById('menuBtn'),sidebar=document.getElementById('sidebar');if(!button||!sidebar)return;
 const mq=matchMedia('(max-width:1050px)');
 document.querySelectorAll('.course-drawer-backdrop').forEach(n=>n.remove());
 document.body.classList.remove('course-drawer-open');document.body.style.top='';
 let prior=null;
 const isOpen=()=>mq.matches&&sidebar.classList.contains('open');
 function setOpen(open,{restoreFocus=false}={}){
   open=!!open&&mq.matches;if(open&&!isOpen())prior=document.activeElement;
   sidebar.classList.toggle('open',open);
   button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Close course navigation':'Open course navigation');
   sidebar.setAttribute('aria-hidden',String(mq.matches&&!open));
   document.body.classList.remove('course-drawer-open');document.body.style.top='';
   if(!open&&restoreFocus) (prior?.isConnected?prior:button).focus({preventScroll:true});
 }
 button.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();setOpen(!isOpen())});
 document.addEventListener('pointerdown',e=>{if(isOpen()&&!sidebar.contains(e.target)&&!button.contains(e.target))setOpen(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen())setOpen(false,{restoreFocus:true})});
 sidebar.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||!mq.matches)return;
   const href=a.getAttribute('href');setOpen(false);
   if(href?.startsWith('#')){const target=document.getElementById(decodeURIComponent(href.slice(1)));
     if(target){e.preventDefault();history.pushState(null,'',href);requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'auto'}));}}
 });
 const sync=()=>{if(!mq.matches)setOpen(false);else sidebar.setAttribute('aria-hidden',String(!isOpen()))};
 mq.addEventListener?.('change',sync);sync();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();