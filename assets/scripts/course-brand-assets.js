/* Course identification artwork: product marks for branded tools, original symbols for subjects.
 * External official logos are optional; resilient local image assets are always retained. */
(()=>{'use strict';
 const root=document.documentElement;
 const base=root.dataset.base??(location.pathname.includes('/courses/')?'../':'');
 const slugs=new Set(['excel','powerbi','python','tableau','powerquery','sql','statistics','introduction','ai']);
 const remote={
  python:'https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg',
  powerquery:'https://raw.githubusercontent.com/microsoft/PowerBI-Icons/main/SVG/Power-Query-Colored.svg'
 };
 const local=slug=>base+'assets/icons/icon-'+slug+'.svg';
 const mark=(image)=>{
  const slug=image.getAttribute('data-brand-course');
  if(!slugs.has(slug)||image.dataset.brandPrepared==='yes')return;
  image.dataset.brandPrepared='yes';
  image.setAttribute('decoding','async');
  // No tracking scripts, CSS masks, or third-party JS: plain image requests only.
  image.onerror=()=>{
   image.onerror=null;
   if(image.getAttribute('src')!==local(slug))image.src=local(slug);
  };
  image.src=remote[slug]||local(slug);
 };
 const visit=node=>{
  if(node.nodeType!==1)return;
  if(node.matches?.('img[data-brand-course]'))mark(node);
  node.querySelectorAll?.('img[data-brand-course]').forEach(mark);
 };
 const init=()=>{
  visit(document.body);
  const observer=new MutationObserver(records=>{
   for(const record of records)for(const node of record.addedNodes)visit(node);
  });
  observer.observe(document.body,{childList:true,subtree:true});
 };
 window.DALP_COURSE_BRANDS={local,remote};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
