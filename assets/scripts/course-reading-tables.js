/* Accessible tables for the Premium Course Reading Experience V7. No data changes. */
(()=>{'use strict';
 const init=()=>{
  if(!location.pathname.includes('/courses/') && !document.body.matches('[data-premium-course-v7="true"]'))return;
  const tables=[...document.querySelectorAll('main table:not(.ide-sheet):not(.arena-table):not(.account-table)')];
  tables.forEach((table,index)=>{
   let region=table.closest('.learning-table-scroll,.table-wrap,.table-scroll,.table-responsive,.dlp-table-frame');
   if(!region){region=document.createElement('div');region.className='dlp-table-frame';table.parentNode.insertBefore(region,table);region.append(table);}
   if(!region.hasAttribute('tabindex'))region.tabIndex=0;
   if(!region.hasAttribute('role'))region.setAttribute('role','region');
   if(!region.hasAttribute('aria-label')){
    const caption=table.caption?.textContent?.trim();
    const heading=table.closest('section,article')?.querySelector('h2,h3,h4,h5')?.textContent?.trim();
    region.setAttribute('aria-label',`${caption||heading||'Course example'} — table ${index+1}, scroll horizontally if needed`.slice(0,190));
   }
   if(!region.querySelector(':scope > .dlp-table-hint')){
    const hint=document.createElement('div');hint.className='dlp-table-hint';hint.setAttribute('aria-hidden','true');
    hint.textContent='Swipe to view more columns →';region.append(hint);
   }
  });
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
