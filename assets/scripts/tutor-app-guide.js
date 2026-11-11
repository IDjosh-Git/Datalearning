/* DataLearning's public, verified app guide. Offline-first; no private account reads. */
(()=>{'use strict';
 const intent=/\b(datalearning|app|website|platform|course|courses|week|weekly|lesson|lessons|module|modules|capstone|project submission|submit|certificate|quiz|questions to try|practice arena|practice studio|download|datasets?|worksheets?|video|youtube|career path|prompt library|account|login|log in|sign in|progress|sync|offline tutor|live ai|tutor studio|dashboard layout|dashboard sample|dashboard images|how to start learning)\b/i;
 const courseNames={excel:/\bexcel\b/i,sql:/\bsql\b/i,powerbi:/\b(power\s*bi|dax)\b/i,python:/\bpython\b/i,ai:/\b(ai course|artificial intelligence course|ai for data analysis)\b/i,tableau:/\btableau\b/i,powerquery:/\bpower\s*query\b/i,statistics:/\b(statistics|statistical)\b/i,introduction:/\b(data analysis foundations|introduction to data analysis)\b/i};
 const terms=s=>(String(s).toLowerCase().match(/[a-z][a-z0-9]+/g)||[]).filter(t=>t.length>2);
 const ready=fetch('/assets/data/tutor-app-guide.json',{cache:'no-store'}).then(r=>r.ok?r.json():null).catch(()=>null);
 function score(q,e,topic){const lower=q.toLowerCase(),tokens=new Set(terms(q));let total=0;
   for(const k of e.keywords){const p=k.toLowerCase();if(lower.includes(p))total+=12+Math.min(p.length,32)/3;
    else{const parts=terms(p),matched=parts.filter(w=>tokens.has(w));if(matched.length&&matched.length===parts.length)total+=4+matched.length*2;}}
   if(topic&&topic!=='general'&&topic===e.topic)total+=4;
   if(lower.includes(e.title.toLowerCase()))total+=18;
   return total;
 }
 window.DALP_APP_HELP={ready,async find(question,topic='general'){
   const q=String(question||'').trim().slice(0,2000);if(!intent.test(q))return null;
   const knowledge=await ready;if(!knowledge||!Array.isArray(knowledge.entries))return null;
   let course=null;for(const [slug,re] of Object.entries(courseNames))if(re.test(q)){course=slug;break}
   const week=Number(q.match(/\bweek\s*(10|[1-9])\b/i)?.[1]||0);
   const page=course?knowledge.entries.find(x=>x.id==='course-'+course):null;
   if(page&&week){const w=page.weeks[week-1];return {title:page.title+' · Week '+week+': '+w.title,
     answer:'Goal: '+w.goal+'\nWhere to work: '+w.where+'\nBusiness case: '+w.business,
     steps:[...w.topics.map(x=>x.heading+': '+x.explanation),'Worked example: '+w.worked,'Try it: '+w.task,'Verify: '+w.check,'Avoid: '+w.trap],href:page.href+'#week'+week};}
   const best=knowledge.entries.map(e=>({e,score:score(q,e,topic)})).sort((a,b)=>b.score-a.score)[0];
   return best?.score>=8?best.e:null;
 },
 format(item){return [item.title,'',item.answer,'',...item.steps.map((s,i)=>(i+1)+'. '+s),'','Open the verified page: '+item.href].join('\n');}
 };
})();
