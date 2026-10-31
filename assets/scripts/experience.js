/* Presentation-only progressive enhancement. No change to grading, auth or progress storage. */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const init = () => {
    const root=document.documentElement;
    root.setAttribute('data-theme','light');
    root.classList.add('light');
    const progress=document.createElement('div');
    progress.className='experience-top-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
    const btn=document.createElement('button');btn.type='button';btn.className='experience-back-top';
    btn.setAttribute('aria-label','Back to top of page');btn.innerHTML='<span>Back to top</span> ↑';
    btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced.matches?'auto':'smooth'}));document.body.append(btn);
    const onScroll=()=>{
      const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
      progress.style.width=`${Math.min(100,Math.max(0,100*window.scrollY/max))}%`;
      btn.classList.toggle('is-visible',window.scrollY>650);
    };
    window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll,{passive:true});onScroll();
    // Normalise loose tables in existing lessons without replacing table contents or controls.
    document.querySelectorAll('table').forEach((table,index)=>{
      if(table.closest('.learning-table-scroll'))return;
      if(!table.querySelector('caption')){const cap=document.createElement('caption');cap.textContent=`Example data table ${index+1}`;table.prepend(cap);}
      table.querySelectorAll('thead tr').forEach(row=>row.querySelectorAll('th').forEach(th=>th.setAttribute('scope','col')));
      if(!table.closest('.experience-table-scroll')){const shell=document.createElement('div');shell.className='experience-table-scroll';shell.tabIndex=0;shell.setAttribute('role','region');shell.setAttribute('aria-label',table.querySelector('caption')?.textContent||'Scrollable data table');table.before(shell);shell.append(table);}
    });
    document.querySelectorAll('.experience-table-scroll').forEach(el=>{el.style.cssText='max-width:100%;overflow-x:auto;overscroll-behavior-inline:contain;border-radius:12px';});
    // Course learning sequence is a reading hint; unit completion remains learner-controlled.
    const match=location.pathname.match(/\/courses\/(excel|sql|powerbi|python|ai|introduction)\.html$/);
    if(match){
      const main=document.querySelector('main')||document.querySelector('.content');
      const target=document.querySelector('.content')||main;
      if(target&&!document.querySelector('.experience-study-map')){
        const section=document.createElement('aside');section.className='experience-study-map';section.setAttribute('aria-label','How to study effectively');
        const copy=document.createElement('div');const heading=document.createElement('strong');heading.textContent='Your learning routine';
        const p=document.createElement('p');p.textContent='Understand the explanation → study the example and table → attempt the exercise without copying → reveal the verification guide → take your knowledge check. Mark progress only when you can explain the result.';
        copy.append(heading,p);section.append(copy);
        const a=document.createElement('a');a.href='#'+(match[1]==='introduction'?'lesson-1':'week1');a.textContent='Go to first lesson ↗';section.append(a);
        const hero=target.querySelector('.hero,.intro-hero,.ai-hero');
        if(hero)hero.after(section);else target.prepend(section);
      }
    }
    // Animate only short, visible cards; do not obscure lessons during reading or keyboard navigation.
    if('IntersectionObserver' in window&&!reduced.matches){
      const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-seen');observer.unobserve(entry.target);}}),{threshold:.07,rootMargin:'0px 0px 50px 0px'});
      document.querySelectorAll('body.lp-home .lp-course,body.lp-home .lp-feature,body.lp-home .lp-step,.dlp97-card').forEach(el=>{el.classList.add('experience-reveal');observer.observe(el);});
    }
    // An icon button must always have a name, even when it only uses an SVG.
    document.querySelectorAll('button').forEach(btn=>{if(!btn.getAttribute('aria-label')&&!btn.textContent.trim()){const title=btn.getAttribute('title');if(title)btn.setAttribute('aria-label',title);}});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
