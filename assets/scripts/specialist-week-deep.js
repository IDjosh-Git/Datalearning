/** Content-specific coaching in the existing Python / AI weekly workspace. */
(() => {
  'use strict';
  const slug=document.body.dataset.course;
  if(slug!=='python'&&slug!=='ai')return;
  const add=(name,cl,text)=>{const n=document.createElement(name);if(cl)n.className=cl;if(text!==undefined)n.textContent=String(text);return n;};
  function enhance(){
    const lessons=window.DALP_WEEK_MEDIA?.[slug];
    if(!lessons)return;
    document.querySelectorAll('.cw-module').forEach((week,i)=>{
      const info=lessons[i],host=week.querySelector('.cw-tab-panel[data-cw-panel="learn"]');
      if(!info||!host||host.querySelector('.dl-week-deep'))return;
      const deep=add('section','dl-week-deep');deep.setAttribute('aria-label','Extended practical instruction for week '+(i+1));
      const header=add('header');header.append(add('span','','DEEP DIVE · WEEK '+String(i+1).padStart(2,'0')),add('h2','','From concept to confident application'));
      const grid=add('div','dl-deep-steps');
      [['01 · THE IDEA','Understand the method',info.why],['02 · REAL TOOL PRACTICE','Reproduce the workflow',info.workthrough],['03 · ANALYST DELIVERY','Check and communicate',info.evidence]].forEach(([n,t,body])=>{
        const block=add('article','dl-deep-step');block.append(add('span','dl-deep-number',n),add('h3','',t),add('p','',body));grid.append(block);
      });
      const footer=add('footer');const b=add('strong','','Practice guidance: ');footer.append(b,document.createTextNode('Download the Week '+(i+1)+' dataset above, carry out the steps independently, and record a reproducible result before marking the week complete.'));
      deep.append(header,grid,footer);
      const nudge=host.querySelector('.dl-study-next');if(nudge)host.insertBefore(deep,nudge);else host.append(deep);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance,{once:true});else enhance();
})();
