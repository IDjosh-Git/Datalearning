/* Add keyboard/outside-click support to existing responsive navigation.
   No changes to any lesson, form, progress or dashboard data logic. */
(()=>{
  const init=()=>{
    const button=document.querySelector('.nav-shell .nav-toggle');
    const nav=document.querySelector('.nav-shell .nav-links');
    if(button&&nav){
      document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){
        nav.classList.remove('open');button.setAttribute('aria-expanded','false');button.textContent='☰';button.focus();
      }});
      document.addEventListener('pointerdown',e=>{if(!nav.contains(e.target)&&!button.contains(e.target)&&nav.classList.contains('open')){
        nav.classList.remove('open');button.setAttribute('aria-expanded','false');button.textContent='☰';
      }});
      window.addEventListener('resize',()=>{if(window.innerWidth>1100&&nav.classList.contains('open')){
        nav.classList.remove('open');button.setAttribute('aria-expanded','false');button.textContent='☰';
      }});
    }
    const sidebar=document.querySelector('.app > .sidebar');
    const courseMenu=document.getElementById('menuBtn');
    if(sidebar&&courseMenu&&!sidebar.classList.contains('dl-lesson-rail')){
      courseMenu.setAttribute('aria-controls',sidebar.id||'sidebar');
      courseMenu.setAttribute('aria-label','Open course navigation');
      courseMenu.setAttribute('aria-expanded',sidebar.classList.contains('open')?'true':'false');
      const sync=()=>{
        const open=sidebar.classList.contains('open');
        courseMenu.setAttribute('aria-expanded',String(open));
        courseMenu.setAttribute('aria-label',(open?'Close':'Open')+' course navigation');
        document.body.classList.toggle('course-menu-open',open);
      };
      const observer=new MutationObserver(sync);
      observer.observe(sidebar,{attributes:true,attributeFilter:['class']});
      sidebar.querySelectorAll('a[href]').forEach(link=>link.addEventListener('click',()=>{if(innerWidth<=1050){sidebar.classList.remove('open');sync();}}));
      document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sidebar.classList.contains('open')){sidebar.classList.remove('open');sync();courseMenu.focus();}});
      document.addEventListener('pointerdown',e=>{if(innerWidth<=1050&&sidebar.classList.contains('open')&&!sidebar.contains(e.target)&&!courseMenu.contains(e.target)){sidebar.classList.remove('open');sync();}});
      window.addEventListener('resize',()=>{if(innerWidth>1050){sidebar.classList.remove('open');sync();}});
      sync();
    }
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
