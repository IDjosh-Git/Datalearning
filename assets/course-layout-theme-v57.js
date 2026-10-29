/* Accessible drawer and scroll-restoration layer for all course tracks. */
(()=>{'use strict';const init=()=>{const sidebar=document.getElementById('sidebar');const menu=document.getElementById('menuBtn');if(!sidebar||!menu)return;
const mobile=window.matchMedia('(max-width:1050px)');const backdrop=document.createElement('div');backdrop.className='course-drawer-backdrop';backdrop.setAttribute('aria-hidden','true');document.body.append(backdrop);const previousFocus={current:null};let storedY=0;
menu.setAttribute('aria-controls','sidebar');menu.setAttribute('aria-expanded','false');
function isOpen(){return mobile.matches&&sidebar.classList.contains('open')}
function update(open,restore=true){open=!!open&&mobile.matches;const wasLocked=document.body.classList.contains('course-drawer-open');if(open&&!wasLocked){storedY=window.scrollY;previousFocus.current=document.activeElement;document.body.style.top=`-${storedY}px`;document.body.classList.add('course-drawer-open')}
sidebar.classList.toggle('open',open);backdrop.classList.toggle('is-visible',open);menu.setAttribute('aria-expanded',String(open));sidebar.setAttribute('aria-hidden',String(mobile.matches&&!open));if(!open&&wasLocked){document.body.classList.remove('course-drawer-open');document.body.style.top='';if(restore)window.scrollTo(0,storedY)}if(open){sidebar.querySelector('.nav-link')?.focus({preventScroll:true})}else if(wasLocked&&restore){previousFocus.current?.focus?.({preventScroll:true})}}
menu.addEventListener('click',()=>queueMicrotask(()=>update(sidebar.classList.contains('open'))));backdrop.addEventListener('click',()=>update(false));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen())update(false)});
sidebar.addEventListener('click',e=>{if(e.target.closest('a[href]')&&document.body.classList.contains('course-drawer-open')){update(false,true);const a=e.target.closest('a[href^="#"]');if(a){requestAnimationFrame(()=>document.getElementById(decodeURIComponent(a.hash.slice(1)))?.scrollIntoView({block:'start'}))}}});
window.addEventListener('hashchange',()=>{if(isOpen())update(false,false)});
const change=()=>{if(!mobile.matches)update(false);else sidebar.setAttribute('aria-hidden',String(!isOpen()))};mobile.addEventListener?.('change',change);change();
// Scroll completion and active-link UI are owned by course-experience-v56; keep updates within that state flow.
};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init()})();
