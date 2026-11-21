(()=>{'use strict';
 const slugs=new Set(['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai']);
 const slug=location.pathname.match(/\/courses\/([a-z]+)\.html$/)?.[1];if(!slugs.has(slug))return;
 async function init(){
  await Promise.resolve(window.DALP_AUTH_GATE?.whenReady).catch(()=>{});
  const client=window.ZAH_DB?.client;if(!client)return;
  const {data:{user},error:authError}=await client.auth.getUser();if(authError||!user||user.is_anonymous)return;
  const el=document.createElement('aside');el.className='dlc-enrol';
  el.style.cssText='margin:1rem auto;max-width:1100px;padding:1rem 1.2rem;border:1px solid #e2dcd3;border-radius:12px;background:#f7f3ea;color:#023048;position:relative;z-index:2';
  el.innerHTML='<strong>My Learning enrolment</strong><p class="dlc-enrol-status" role="status">Checking your enrolment…</p><button type="button" class="dlc-enrol-button" hidden>Start studying this course</button>';
  const target=document.querySelector('main');if(!target)return;target.prepend(el);
  const status=el.querySelector('.dlc-enrol-status'),button=el.querySelector('button');
  button.style.cssText='padding:.65rem 1rem;background:#770101;color:white;border:0;border-radius:8px;font-weight:700;cursor:pointer';
  const {data,error}=await client.from('course_enrollments').select('course_slug').eq('user_id',user.id).eq('course_slug',slug).maybeSingle();
  if(error){status.textContent='Enrolment status unavailable. Please refresh to retry.';return;}
  if(data){status.textContent='You are studying this course. It appears in My Learning.';return;}
  status.textContent='This course is not yet in My Learning.';button.hidden=false;
  button.addEventListener('click',async()=>{button.disabled=true;status.textContent='Saving your enrolment…';const {error}=await client.from('course_enrollments').insert({user_id:user.id,course_slug:slug});if(error&&error.code!=='23505'){status.textContent='Unable to start this course: '+error.message;button.disabled=false;return;}status.textContent='Course added to My Learning. Your enrolment is available on other devices.';button.hidden=true;});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();