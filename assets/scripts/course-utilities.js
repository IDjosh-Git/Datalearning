/* v20: In-flow course utilities. Never place learning controls over page actions. */
(()=>{'use strict';
if(!location.pathname.includes('/courses/'))return;
const host=document.querySelector('.content')||document.querySelector('main');
if(!host||document.getElementById('dlp-course-utility-strip'))return;
const subject=location.pathname.match(/\/(excel|sql|python)\.html$/)?.[1];
const tool={excel:'Excel',sql:'SQL',python:'Python'}[subject];
const arenaHref='../practice.html'+(tool?'?tool='+tool:'');
const strip=document.createElement('div');strip.id='dlp-course-utility-strip';strip.className='dlp-course-utility-strip';strip.setAttribute('aria-label','Course study tools');
const first=host.querySelector(':scope > .hero, :scope > .ai-hero, :scope > .intro-hero');
if(first)first.insertAdjacentElement('beforebegin',strip);else host.prepend(strip);
const old=[...document.querySelectorAll('a[href$="practice.html"]')].find(el=>el.getAttribute('style')?.includes('position:fixed'));
if(old){old.removeAttribute('style');old.href=arenaHref;old.className='dlp-utility-practice';old.textContent='⚡ Practice Arena';strip.append(old)}
else{const a=document.createElement('a');a.className='dlp-utility-practice';a.href=arenaHref;a.textContent='⚡ Practice Arena';strip.append(a)}
})();
