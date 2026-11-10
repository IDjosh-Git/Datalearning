/* Premium, consistent course lesson drawer. Never mounts or restores the removed course-list rail. */
(()=>{'use strict';
 const init=()=>{
  const sidebar=document.getElementById('sidebar');
  const trigger=document.getElementById('menuBtn');
  const backdrop=document.getElementById('lessonRailBackdrop');
  if(!sidebar||!trigger||!backdrop)return;
  const narrow=matchMedia('(max-width:1050px)');
  let previousFocus=null;
  const isOpen=()=>narrow.matches&&sidebar.classList.contains('open');
  const focusable=()=>[...sidebar.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),summary,[tabindex]:not([tabindex="-1"])')].filter(el=>el.getClientRects().length>0);
  const setOpen=(on,{returnFocus=false}={})=>{
   const open=!!on&&narrow.matches;
   if(open&&!isOpen()) previousFocus=document.activeElement;
   sidebar.classList.toggle('open',open);
   trigger.setAttribute('aria-expanded',String(open));
   trigger.setAttribute('aria-label',(open?'Close':'Open')+' course lessons');
   sidebar.setAttribute('aria-hidden',String(narrow.matches&&!open));
   sidebar.inert=narrow.matches&&!open;
   backdrop.hidden=!open;
   document.body.classList.toggle('dl-lesson-rail-open',open);
   if(open){const first=focusable()[0];first?.focus({preventScroll:true});}
   if(!open&&returnFocus){(previousFocus?.isConnected?previousFocus:trigger)?.focus({preventScroll:true});}
  };
  // A genuine, keyboard-accessible close control lives inside every course drawer.
  // Mount once here rather than maintaining six independent sidebar templates.
  let drawerHeading=sidebar.querySelector('.dl-lesson-drawer-heading');
  if(!drawerHeading){
   drawerHeading=document.createElement('div');
   drawerHeading.className='dl-lesson-drawer-heading';
   const heading=document.createElement('span');
   heading.className='dl-lesson-drawer-caption';
   heading.textContent='Course lessons';
   const dismiss=document.createElement('button');
   dismiss.type='button';
   dismiss.className='dl-lesson-drawer-dismiss';
   dismiss.setAttribute('aria-label','Close course sidebar');
   dismiss.setAttribute('title','Close course sidebar');
   dismiss.setAttribute('aria-controls','sidebar');
   dismiss.innerHTML='<span aria-hidden="true">&#215;</span><span>Close</span>';
   dismiss.addEventListener('click',()=>setOpen(false,{returnFocus:true}));
   drawerHeading.append(heading,dismiss);
   sidebar.prepend(drawerHeading);
  }
  trigger.addEventListener('click',()=>setOpen(!isOpen()));
  backdrop.addEventListener('click',()=>setOpen(false,{returnFocus:true}));
  document.addEventListener('pointerdown',e=>{if(isOpen()&&!sidebar.contains(e.target)&&!trigger.contains(e.target))setOpen(false)});
  document.addEventListener('keydown',e=>{
   if(!isOpen())return;
   if(e.key==='Escape'){e.preventDefault();setOpen(false,{returnFocus:true});return;}
   if(e.key!=='Tab')return;
   const nodes=focusable();if(!nodes.length)return;
   if(e.shiftKey&&document.activeElement===nodes[0]){e.preventDefault();nodes.at(-1).focus()}
   else if(!e.shiftKey&&document.activeElement===nodes.at(-1)){e.preventDefault();nodes[0].focus()}
  });
  sidebar.addEventListener('click',e=>{
   const link=e.target.closest('a[href]');if(!link||!isOpen())return;
   setOpen(false);
  });
  const sync=()=>{if(!narrow.matches){setOpen(false);sidebar.removeAttribute('aria-hidden');sidebar.inert=false;}
   else{sidebar.setAttribute('aria-hidden',String(!isOpen()));sidebar.inert=!isOpen();}}
  narrow.addEventListener?.('change',sync);sync();
  const panel=document.getElementById('courseLessonIndex');
  // This single controller owns lesson disclosure, active links, focus, backdrop, and drawer state.
  const deepLesson=()=>/^#(?:week|module)\d+/.test(location.hash);
  if(panel&&(matchMedia('(min-width:1051px)').matches||deepLesson()))panel.open=true;
  narrow.addEventListener?.('change',()=>{if(!narrow.matches&&panel)panel.open=true;});
  // Mobile visitors should see the lesson list as soon as they open the drawer.
  trigger.addEventListener('click',()=>{if(isOpen()&&panel)panel.open=true});
  const search=document.getElementById('searchInput');
  if(search){search.addEventListener('input',()=>{
   const q=search.value.trim().toLowerCase();
   const items=[...sidebar.querySelectorAll('.course-lesson-items a')];
   for(const a of items)a.hidden=!!q&&!a.textContent.toLowerCase().includes(q);
   if(q&&panel)panel.open=true;
  });}
  const links=[...sidebar.querySelectorAll('a[href^="#"]')];
  const setCurrent=(id)=>{
   if(!id)return;
   for(const link of links){const current=link.getAttribute('href')==='#'+id;
    link.classList.toggle('dl-lesson-current',current);
    link.toggleAttribute('data-current-lesson',current);
    if(link.classList.contains('nav-link'))link.classList.toggle('active',current);
    if(current)link.setAttribute('aria-current','location');
    else if(link.getAttribute('aria-current')==='location')link.removeAttribute('aria-current');
   }
  };
  const hashCurrent=()=>{let id='';try{id=decodeURIComponent(location.hash.slice(1));}catch{}if(id)setCurrent(id);if(panel&&deepLesson())panel.open=true;};
  addEventListener('hashchange',hashCurrent);hashCurrent();
  // IntersectionObserver is intentionally non-destructive: it only decorates the existing links.
  if('IntersectionObserver' in window){const targets=links.map(a=>document.getElementById(a.hash.slice(1))).filter(Boolean);
   const observer=new IntersectionObserver(entries=>{
    if(location.hash)return;
    const candidate=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
    if(candidate)setCurrent(candidate.target.id);
   },{rootMargin:'-12% 0px -70% 0px',threshold:0});
   targets.forEach(el=>observer.observe(el));
  }
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
