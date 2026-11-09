/* Course reading design: scaffolding that teaches, practices, then opens a separate quiz route. */
(()=>{
 'use strict';
 const labels={introduction:'Data Analysis Foundations',excel:'Excel',sql:'SQL',powerbi:'Power BI',python:'Python for Data Analytics',ai:'AI Integration'};
 const slug=(document.body.dataset.course || document.body.dataset.uiCourse || location.pathname.split('/').pop().replace('.html','')).toLowerCase();
 if(!labels[slug])return;
 const guides=window.DALP_LESSON_GUIDES?.[slug]||{};
 const make=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 const clean=s=>String(s||'').replace(/^(Picture it this way:|Now try it without copying:|Read the expected result:|Try it \([^)]*\))\s*/i,'').trim();
 const quizUrl=n=>`../quiz.html?course=${encodeURIComponent(slug)}&week=${encodeURIComponent(n)}`;
 function studyIntro(guide,number,isIntro=false){
   const el=make('section','dl-lesson-brief');el.setAttribute('aria-label','Your learning guide for this lesson');
   const header=make('div','dl-brief-header');
   const left=make('div','dl-brief-heading');left.append(make('span','dl-brief-kicker',`YOUR LEARNING GUIDE · ${isIntro?'LESSON':'WEEK'} ${String(number).padStart(2,'0')}`),make('h3','dl-brief-title','Understand it. See it. Do it.'));
   const badge=make('span','dl-brief-time','Learn → Practise → Apply');header.append(left,badge);
   el.append(header);
   const cards=make('div','dl-brief-grid');
   const first=make('article','dl-brief-card dl-brief-outcome');first.append(make('span','dl-brief-icon','01'),make('h4','', 'What you will be able to do'),make('p','',guide.goal || guide.title));
   const second=make('article','dl-brief-card dl-brief-context');second.append(make('span','dl-brief-icon','02'),make('h4','','Why this matters in real work'),make('p','',clean(guide.reason)||'Data becomes useful when it helps answer a clear question and supports an informed decision.'));
   cards.append(first,second);
   const mental=make('article','dl-brief-mental');mental.append(make('div','dl-brief-mental-label','THE BIG IDEA'),make('p','',clean(guide.model)||'Learn the idea first. Look for the connection between the example, the process, and the final result.'));
   el.append(cards,mental);
   if(Array.isArray(guide.steps)&&guide.steps.length){
     const steps=make('div','dl-brief-steps');steps.append(make('h4','','Your three-step learning route'));
     const ol=make('ol');guide.steps.forEach(s=>{if(s)ol.append(make('li','',s))});steps.append(ol);el.append(steps);
   }
   if(guide.insight){const takeaway=make('div','dl-brief-insight');takeaway.append(make('strong','','Make the result meaningful'),make('p','',clean(guide.insight)));el.append(takeaway)}
   return el;
 }
 function practiceNudge(guide,num){
   const end=make('div','dl-study-next');
   const text=make('div');text.append(make('span','dl-study-next-kicker','NOW APPLY THE IDEA'),make('h3','','Learning sticks when you use it.'),make('p','',clean(guide.practice)||'Recreate the worked example using the practice dataset, then test one new input independently.'));
   const btn=make('button','dl-study-next-btn','Continue to guided practice →');btn.type='button';btn.addEventListener('click',()=>{const host=btn.closest('.cw-module');const tab=host?.querySelector('[data-cw-tab="practise"]');tab?.click();host?.scrollIntoView({behavior:'smooth',block:'start'})});
   end.append(text,btn);return end;
 }
 function quizLaunch(number,guide,kind='week'){
   const dest=quizUrl(kind==='final'?'final':kind==='mastery'?'mastery':number);
   const root=make('section','dl-question-launch');
   const art=make('span','dl-question-launch-icon','✓');art.setAttribute('aria-hidden','true');
   const copy=make('div','dl-question-launch-copy');copy.append(make('span','dl-question-launch-kicker','READY TO CHECK YOUR LEARNING?'),make('h3','',kind==='mastery'?'Take the course mastery checkpoint':kind==='final'?'Try your foundation questions':`Week ${number} · Questions to try`),make('p','','Open a focused assessment page, answer at your own pace, then review the explanations and try again whenever you need.'));
   const a=make('a','dl-question-launch-button',kind==='mastery'?'Open mastery assessment →':'Questions to try →');a.href=dest;
   root.append(art,copy,a);return root;
 }
 function enrichWeek(week,n){
   const guide=guides[String(n)]||{title:`Week ${n}`,goal:'Read, practise and independently apply the topic.'};
   const learn=week.querySelector('.cw-tab-panel[data-cw-panel="learn"]');
   const practise=week.querySelector('.cw-tab-panel[data-cw-panel="practise"]');
   const quiz=week.querySelector('.cw-tab-panel[data-cw-panel="quiz"]');
   if(learn){learn.prepend(studyIntro(guide,n));learn.append(practiceNudge(guide,n));}
   if(practise)practise.append(quizLaunch(n,guide));
   if(quiz){const source=quiz.querySelector('.quiz');if(source){source.classList.add('dl-hidden-quiz-source');source.hidden=true;}quiz.append(quizLaunch(n,guide));}
   const tab=week.querySelector('.cw-tab[data-cw-tab="quiz"]');if(tab)tab.textContent='3 · Questions to try';
   const foot=week.querySelector(':scope > .cw-module-panels');
   if(foot){const cta=make('div','dl-week-footer-cta');cta.append(make('span','',`Week ${n} knowledge check`));const link=make('a','','Questions to try →');link.href=quizUrl(n);cta.append(link);week.append(cta);}
 }
 function intro(){
   const lessons=[...document.querySelectorAll('.intro-lesson:not(.intro-quiz)')];
   lessons.forEach((lesson,i)=>{
     const g=guides[String(i+1)];if(!g)return;
     const head=lesson.querySelector('.lesson-heading');if(head)head.insertAdjacentElement('afterend',studyIntro(g,i+1,true));else lesson.prepend(studyIntro(g,i+1,true));
   });
   const last=document.querySelector('.intro-quiz');if(last){
     const form=last.querySelector('#introQuiz');if(form){form.hidden=true;form.classList.add('dl-hidden-quiz-source')}
     last.querySelector('#introQuizResult')?.setAttribute('hidden','');
     last.querySelector('.finish-card')?.setAttribute('hidden','');
     last.append(quizLaunch('final',{},'final'));
     const p=last.querySelector('p');if(p && /12 questions/.test(p.textContent))p.textContent='You have completed the learning pathway. Open the questions in the dedicated assessment workspace to test what you know.';
   }
 }
 function master(){
   const target=document.querySelector('.course-mastery-wrap');
   if(!target)return;
   target.classList.add('dl-hidden-mastery-source');target.hidden=true;
   const links=[...document.querySelectorAll('a[href="#course-mastery-checkpoint"],a[href$=".html#course-mastery-checkpoint"]')];
   links.forEach(link=>link.href=quizUrl('mastery'));
   const shell=make('div','dl-course-master-launch');shell.append(quizLaunch('mastery',{},'mastery'));
   // Use the reading host rather than appending outside the columns.
   const host=slug==='introduction'?document.querySelector('.intro-lessons'):document.querySelector('.app .content,.course-wrap');
   if(host)host.append(shell);
 }
 function init(){
   if(slug==='introduction')intro();
   else{const weeks=[...document.querySelectorAll('.cw-module')];weeks.forEach((w,i)=>enrichWeek(w,i+1));}
   master();
   document.body.classList.add('dl-premium-lesson-ready');
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
