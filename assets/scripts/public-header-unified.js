/* One public navigation controller across Academy, study tools and legacy learning routes. */
(()=>{'use strict';
 function init(){
   const open=document.getElementById('dluNavOpen'),close=document.getElementById('dluNavClose'),panel=document.getElementById('dluNavPanel');
   if(!open||!close||!panel)return;
   function updateActiveNavigation(){
     const aliases={'/dashboard':'/index.html','/practice':'/practice.html','/overview':'/overview.html','/studio':'/studio.html'};
     const currentPath=aliases[location.pathname]||location.pathname;
     const courseSection=currentPath.endsWith('/index.html')&&location.hash==='#zaDiscoverCards';
     document.querySelectorAll('.dlu-primary-links a[href],#dluNavPanel a[href]').forEach(anchor=>{
       const target=new URL(anchor.href,location.href);
       const match=target.pathname===currentPath && (target.hash ? target.hash===location.hash : !courseSection);
       if(match)anchor.setAttribute('aria-current',target.hash?'location':'page');
       else anchor.removeAttribute('aria-current');
     });
   }
   updateActiveNavigation();
   window.addEventListener('hashchange',updateActiveNavigation);
   close.innerHTML='<span aria-hidden="true">&#215;</span><span>Close</span>';
   let previous=null;
   const focusable=()=>[...panel.querySelectorAll('a[href],button:not([disabled])')].filter(e=>e.getClientRects().length);
   function toggle(show){
     panel.hidden=!show;
     open.setAttribute('aria-expanded',String(show));
     document.body.classList.toggle('dlu-nav-open',show);
     if(show){previous=document.activeElement;close.focus({preventScroll:true})}
     else if(previous?.isConnected)previous.focus({preventScroll:true});
   }
   open.addEventListener('click',()=>toggle(true));
   close.addEventListener('click',()=>toggle(false));
   panel.addEventListener('click',e=>{if(e.target===panel)toggle(false)});
   panel.querySelectorAll('a[href]').forEach(a=>a.addEventListener('click',()=>toggle(false)));
   document.addEventListener('keydown',e=>{
     if(panel.hidden)return;
     if(e.key==='Escape'){e.preventDefault();toggle(false);return}
     if(e.key!=='Tab')return;
     const elements=focusable();if(!elements.length)return;
     const first=elements[0],last=elements.at(-1);
     if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
     else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
   });
   matchMedia('(min-width:1101px)').addEventListener('change',e=>{if(e.matches&&!panel.hidden)toggle(false)});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
