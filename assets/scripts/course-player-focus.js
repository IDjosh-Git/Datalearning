/* Visual-only course player improvements. No course state or access logic is replaced. */
(()=>{'use strict';const init=()=>{
 const sidebar=document.getElementById('sidebar'),menu=document.getElementById('menuBtn');if(!sidebar||!menu)return;
 const top=document.querySelector('.topbar-title')||document.querySelector('.topbar');
 if(top&&!document.getElementById('courseSidebarCollapse')){
  const collapse=document.createElement('button');collapse.type='button';collapse.id='courseSidebarCollapse';collapse.className='course-sidebar-collapse';collapse.setAttribute('aria-controls','sidebar');
  const sync=()=>{const closed=document.body.classList.contains('course-sidebar-collapsed');collapse.textContent=closed?'Show course outline':'Hide course outline';collapse.setAttribute('aria-expanded',String(!closed));sidebar.setAttribute('aria-label','Course outline');};
  collapse.addEventListener('click',()=>{document.body.classList.toggle('course-sidebar-collapsed');sync()});
  top.append(collapse);sync();
 }
 // A closed mobile drawer must not put its links into keyboard tab order.
 const narrow=matchMedia('(max-width:1050px)');const update=()=>{if(!narrow.matches){sidebar.inert=false;return;}sidebar.inert=!sidebar.classList.contains('open')};
 const watch=new MutationObserver(update);watch.observe(sidebar,{attributes:true,attributeFilter:['class']});narrow.addEventListener?.('change',update);update();
 // Annotate active lesson without repeating existing course titles.
 const links=[...sidebar.querySelectorAll('.course-lesson-items a[href^="#"]')];
 const active=()=>{const hash=location.hash;links.forEach(link=>{const current=!!hash&&link.getAttribute('href')===hash;link.toggleAttribute('data-current-lesson',current);if(current)link.setAttribute('aria-current','location');else if(link.getAttribute('aria-current')==='location')link.removeAttribute('aria-current')})};
 addEventListener('hashchange',active);active();
};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init()})();
