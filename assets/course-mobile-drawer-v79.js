/* v79: single mobile course drawer controller; preserves page scroll and focus. */
(()=>{'use strict';
function init(){
 const button=document.getElementById('menuBtn'),sidebar=document.getElementById('sidebar');
 if(!button||!sidebar)return;
 const mobile=matchMedia('(max-width:1050px)');
 document.querySelectorAll('.course-drawer-backdrop').forEach(n=>n.remove());
 const backdrop=document.createElement('div');backdrop.className='course-drawer-backdrop';
 backdrop.setAttribute('aria-hidden','true');document.body.appendChild(backdrop);
 let returnFocus=null;
 function setOpen(open,focus=true){
   open=Boolean(open&&mobile.matches);
   const wasOpen=sidebar.classList.contains('open');
   if(open&&!wasOpen)returnFocus=document.activeElement,apply();
   function apply(){
    sidebar.classList.toggle('open',open);
    backdrop.classList.toggle('is-visible',open);
    document.body.classList.toggle('course-drawer-open',open);
    button.setAttribute('aria-expanded',String(open));
    button.setAttribute('aria-label',open?'Close course navigation':'Open course navigation');
    sidebar.setAttribute('aria-hidden',String(mobile.matches&&!open));
    if(open&&focus)sidebar.querySelector('a[href]')?.focus({preventScroll:true});
    if(!open&&wasOpen&&focus&&returnFocus?.isConnected)returnFocus.focus({preventScroll:true});
   }
   apply();
 }
 button.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();setOpen(!sidebar.classList.contains('open'))});
 backdrop.addEventListener('click',()=>setOpen(false));
 sidebar.addEventListener('click',e=>{
   const link=e.target.closest('a[href]');if(!link||!mobile.matches)return;
   const hash=link.getAttribute('href');
   setOpen(false,false);
   if(hash&&hash.startsWith('#')){
    const target=document.getElementById(decodeURIComponent(hash.slice(1)));
    if(target){e.preventDefault();history.replaceState(null,'',hash);requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'auto'}));}
   }
 });
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sidebar.classList.contains('open'))setOpen(false)});
 function resize(){if(!mobile.matches)setOpen(false,false);sidebar.setAttribute('aria-hidden',String(mobile.matches&&!sidebar.classList.contains('open')))}
 mobile.addEventListener?.('change',resize);resize();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();