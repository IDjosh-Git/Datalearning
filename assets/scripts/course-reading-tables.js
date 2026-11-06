/* Responsive, accessible course tables. One controller for the six current courses.
   Small three-/four-column learning examples become readable stacked cards.
   Wider data grids remain horizontally scrollable with their original table semantics. */
(()=>{'use strict';
 const init=()=>{
  if(!location.pathname.includes('/courses/') && !document.body.matches('[data-premium-course-v7="true"]'))return;
  const tables=[...document.querySelectorAll('main table:not(.ide-sheet):not(.arena-table):not(.account-table)')];
  tables.forEach((table,index)=>{
   let region=table.closest('.learning-table-scroll,.table-wrap,.table-scroll,.table-responsive,.dlp-table-frame,.dlp97-table-scroll,.experience-table-scroll');
   if(!region){region=document.createElement('div');region.className='dlp-table-frame';table.parentNode.insertBefore(region,table);region.append(table);}
   if(!region.hasAttribute('tabindex'))region.tabIndex=0;
   if(!region.hasAttribute('role'))region.setAttribute('role','region');
   const headers=[...table.querySelectorAll(':scope > thead > tr:first-child > th, :scope > thead > tr:first-child > td')];
   const rows=[...table.querySelectorAll(':scope > tbody > tr')];
   const safeForCards=table.matches('.learning-table,.lesson-table') && headers.length>=2 && headers.length<=4
    && rows.length>0 && !table.querySelector('[rowspan],[colspan]')
    && rows.every(row=>row.querySelectorAll(':scope > th,:scope > td').length===headers.length);
   if(safeForCards){
    const labels=headers.map((header,i)=>header.textContent.trim()||`Column ${i+1}`);
    table.classList.add('dlp-mobile-table-cards');region.classList.add('dlp-mobile-card-region');
    rows.forEach(row=>[...row.children].filter(c=>/^(TH|TD)$/.test(c.tagName)).forEach((cell,i)=>{
     cell.setAttribute('data-column-label',labels[i]);
    }));
   }
   if(!region.hasAttribute('aria-label')){
    const caption=table.caption?.textContent?.trim();
    const heading=table.closest('section,article')?.querySelector('h2,h3,h4,h5')?.textContent?.trim();
    const suffix=safeForCards?'examples, displayed as cards on narrow screens':'table, scroll horizontally if needed';
    region.setAttribute('aria-label',`${caption||heading||'Course example'} — ${suffix}`.slice(0,190));
   }
   if(!region.querySelector(':scope > .dlp-table-hint')){
    const hint=document.createElement('div');hint.className='dlp-table-hint';hint.setAttribute('aria-hidden','true');
    hint.textContent='Swipe to view more columns →';region.append(hint);
   }
  });
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
