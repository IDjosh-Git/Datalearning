/* Descriptive, accessible icons for the existing Courses and Study tools dropdowns.
 * Markup is left intact, including every destination and disclosure behavior. */
(()=>{'use strict';
 const svgNS='http://www.w3.org/2000/svg';
 const art={
  book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M4 5.5V21a2.5 2.5 0 0 1 2.5-2.5H20"/><path d="M8 8h8M8 12h6"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  table:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11M15 9v11"/>',
  database:'<ellipse cx="12" cy="5" rx="8.5" ry="3"/><path d="M3.5 5v14c0 1.7 3.8 3 8.5 3s8.5-1.3 8.5-3V5M3.5 12c0 1.7 3.8 3 8.5 3s8.5-1.3 8.5-3"/>',
  chart:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 17v-5M12 17V7M17 17v-8"/>',
  code:'<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16"/>',
  sparkle:'<path d="m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z"/>',
  search:'<circle cx="10.5" cy="10.5" r="7"/><path d="m16 16 5 5"/>',
  chat:'<path d="M20 11a8 8 0 0 1-8 8c-1.2 0-2.4-.3-3.5-.7L4 20l1.5-4.5A8 8 0 1 1 20 11Z"/><path d="M8 11h8M8 14h5"/>',
  flask:'<path d="M9 3h6M10 3v7l-5.4 8.4A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.7-2.6L14 10V3M8.2 16h7.6"/>',
  brain:'<path d="M12 6a4 4 0 1 0-7.3 2.3A4 4 0 0 0 6 16a3.5 3.5 0 0 0 6 3M12 6a4 4 0 1 1 7.3 2.3A4 4 0 0 1 18 16a3.5 3.5 0 0 1-6 3M12 6v13M8 10c2 0 3 1 4 2M16 10c-2 0-3 1-4 2"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  library:'<path d="M4 4h4v16H4zM10 4h4v16h-4zM16 6h4v14h-4z"/>'
 };
 function icon(key){const svg=document.createElementNS(svgNS,'svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('width','20');svg.setAttribute('height','20');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.85');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');svg.innerHTML=art[key]||art.book;return svg;}
 function init(){const header=document.querySelector('.dalp-global-header');if(!header)return;
  const courseIcons=['book','table','database','chart','code','brain'];
  header.querySelectorAll('.dalp-course-option').forEach((link,i)=>{const slot=link.querySelector('.dalp-course-number');if(!slot||slot.querySelector('svg'))return;slot.textContent='';slot.classList.add('dalp-menu-symbol');slot.append(icon(courseIcons[i%courseIcons.length]));});
  // Product / subject imagery for course choices. Keep earlier SVG fallback in the DOM.
  header.querySelectorAll('.dalp-course-option').forEach(link=>{
   const href=link.getAttribute('href')||'';
   const slug=href.match(/(?:^|\/)courses\/(introduction|excel|sql|powerbi|tableau|powerquery|statistics|python|ai)\.html(?:[?#]|$)/)?.[1];
   const slot=link.querySelector('.dalp-course-number');
   if(!slug||!slot||slot.querySelector('img'))return;
   const logo=document.createElement('img');logo.className='dl-course-logo';logo.dataset.brandCourse=slug;
   const base=document.documentElement.dataset.base??(location.pathname.includes('/courses/')?'../':'');
   logo.src=base+'assets/icons/icon-'+slug+'.svg';logo.width=24;logo.height=24;logo.alt='';
   slot.append(logo);
  });
  const toolIcons=['library','sparkle','code','flask','chat','target'];
  header.querySelectorAll('.dalp-tool-option').forEach((link,i)=>{const slot=link.querySelector('.dalp-tool-dot');if(!slot||slot.querySelector('svg'))return;slot.textContent='';slot.classList.add('dalp-menu-symbol');slot.append(icon(toolIcons[i%toolIcons.length]));});
  header.querySelectorAll('.dalp-nav-group>summary').forEach((summary,i)=>{if(summary.querySelector('.dalp-nav-summary-icon'))return;const span=document.createElement('span');span.className='dalp-nav-summary-icon';span.append(icon(i===0?'book':'sparkle'));summary.prepend(span);});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
