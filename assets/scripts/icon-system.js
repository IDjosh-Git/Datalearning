/* DataLearning icon system: one consistent 24px outline family.
   Decorative icons are hidden from assistive technology; existing button/link
   labels remain the accessible names. Course/product artwork is preserved. */
(()=>{
 'use strict';
 const paths={
  'code-2':'<path d="m16 18 6-6-6-6M8 6l-6 6 6 6m6-16-4 20"/>',
  'sparkles':'<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>',
  'target':'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  'graduation-cap':'<path d="m2 10 10-5 10 5-10 5-10-5Zm4 2v5c4 3 8 3 12 0v-5M22 10v7"/>',
  'book-open':'<path d="M12 6c-3-2-6-2-10-1v14c4-1 7-1 10 1 3-2 6-2 10-1V5c-4-1-7-1-10 1Zm0 0v14"/>',
  'trending-up':'<path d="m3 17 6-6 4 4 8-8M15 7h6v6"/>',
  'check':'<path d="m5 12 4 4L19 6"/>',
  'menu':'<path d="M4 6h16M4 12h16M4 18h16"/>',
  'x':'<path d="M18 6 6 18M6 6l12 12"/>',
  'layout-dashboard':'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  'award':'<circle cx="12" cy="8" r="5"/><path d="m8.5 12-2 9 5.5-3 5.5 3-2-9"/>',
  'route':'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h6"/>'
 };
 const glyphs={'⌘':'code-2','✦':'sparkles','✧':'sparkles','◉':'target','◈':'graduation-cap','↗':'trending-up','✓':'check'};
 const icon=(name)=>{
  if(!Object.hasOwn(paths,name))return null;
  const ns='http://www.w3.org/2000/svg';
  const svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('fill','none');
  svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.85');
  svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');
  svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
  svg.classList.add('dl-icon');svg.innerHTML=paths[name];return svg;
 };
 function upgrade(){
  document.querySelectorAll('.za-tool-icon,.dl-intro-icon,.dl-note-icon').forEach(el=>{
   if(el.querySelector('svg'))return;
   const name=glyphs[el.textContent.trim()];if(!name)return;
   const svg=icon(name);if(!svg)return;
   el.replaceChildren(svg);el.setAttribute('aria-hidden','true');
  });
  document.querySelectorAll('[data-dl-icon]').forEach(el=>{
   if(el.querySelector('svg'))return;
   const svg=icon(el.getAttribute('data-dl-icon'));if(!svg)return;
   el.replaceChildren(svg);el.setAttribute('aria-hidden','true');
  });
 }
 window.DataLearningIcons=Object.freeze({create:icon,refresh:upgrade,names:Object.freeze(Object.keys(paths))});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',upgrade,{once:true});else upgrade();
})();
