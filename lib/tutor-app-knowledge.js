/* Verified, public application guidance. All routes and weekly titles come from this release. */
import knowledge from '../assets/data/tutor-app-guide.json' with {type:'json'};

const intent = /\b(datalearning|app|website|platform|course|courses|week|weekly|lesson|lessons|module|modules|capstone|project submission|submit|certificate|quiz|questions to try|practice arena|practice studio|download|datasets?|worksheets?|video|youtube|career path|prompt library|account|login|log in|sign in|progress|sync|offline tutor|live ai|tutor studio|dashboard layout|dashboard sample|dashboard images|how to start learning)\b/i;
const courseNames = {
  excel:/\bexcel\b/i,sql:/\bsql\b/i,powerbi:/\b(power\s*bi|dax)\b/i,python:/\bpython\b/i,ai:/\b(ai course|artificial intelligence course|ai for data analysis)\b/i,
  tableau:/\btableau\b/i,powerquery:/\bpower\s*query\b/i,statistics:/\b(statistics|statistical)\b/i,introduction:/\b(data analysis foundations|introduction to data analysis)\b/i
};
const words = value => (String(value).toLowerCase().match(/[a-z][a-z0-9]+/g)||[]).filter(w=>w.length>2);
function scoreEntry(query,entry,topic){
  const q=query.toLowerCase();const tokens=new Set(words(query));
  let score=0;
  for(const raw of entry.keywords){
    const phrase=raw.toLowerCase();
    if(q.includes(phrase))score+=12+Math.min(phrase.length,32)/3;
    else {const terms=words(phrase);const matched=terms.filter(x=>tokens.has(x));if(matched.length&&matched.length===terms.length)score+=4+matched.length*2;}
  }
  if(topic&&topic!=='general'&&topic===entry.topic)score+=4;
  if(q.includes(entry.title.toLowerCase()))score+=18;
  return score;
}
export function findAppGuide(question,topic='general'){
  const q=String(question||'').trim().slice(0,2000);
  if(!intent.test(q))return null;
  let course=null;for(const [slug,re] of Object.entries(courseNames))if(re.test(q)){course=slug;break}
  const week=Number(q.match(/\bweek\s*(10|[1-9])\b/i)?.[1]||0);
  const page = course?knowledge.entries.find(x=>x.id==='course-'+course):null;
  if(page && week){
    const w=page.weeks[week-1];
    return {id:'weekly-'+course+'-'+week,title:`${page.title} · Week ${week}: ${w.title}`,
      answer:`Goal: ${w.goal}\nWhere to work: ${w.where}\nBusiness case: ${w.business}`,
      steps:[...w.topics.map(x=>`${x.heading}: ${x.explanation}`),`Worked example: ${w.worked}`,`Try it: ${w.task}`,`Verify: ${w.check}`,`Avoid: ${w.trap}`],
      href:`${page.href}#week${week}`};
  }
  const ranked=knowledge.entries.map(x=>({x,score:scoreEntry(q,x,topic)})).sort((a,b)=>b.score-a.score);
  const best=ranked[0];
  if(!best||best.score<8)return null;
  return best.x;
}
export function appContextFor(question,topic='general'){
  const match=findAppGuide(question,topic);
  if(!match)return '';
  const content=[`Verified DataLearning app-specific information relevant to the learner's question:`,
   `${match.title}: ${match.answer}`,
   ...match.steps.slice(0,10).map((s,i)=>`${i+1}. ${s}`),
   `Official internal route: ${match.href}`,
   'Treat these details as app facts. Use the route only if it directly helps; do not claim to have viewed learner progress or submitted work. Do not infer real-time account state or promise an instructor response.'];
  return '\n\n'+content.join('\n').slice(0,4000);
}
export function appResourceFor(question,topic='general'){
  const match=findAppGuide(question,topic);
  return match?{title:match.title,href:match.href}:null;
}
export const guideVersion=knowledge.version;
