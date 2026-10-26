/* v16: Visual theme controls are owned solely by theme-control-v14.js. */
(()=>{
 const place=()=>{
  const sidebar=document.querySelector('.sidebar');if(sidebar){const box=document.createElement('div');box.style.cssText='padding:12px 15px;border-top:1px solid #35475c;margin-top:8px';box.innerHTML='<a class="lp-course-link" href="../index.html">⌂ &nbsp; Learning dashboard</a><a class="lp-course-link" href="../capstone.html?course='+encodeURIComponent(document.body.dataset.course||window.ZAH_COURSE_SLUG||'excel')+'">✦ &nbsp; Capstone & certificate</a><div style="font-size:10px;color:#a9bfce;letter-spacing:.08em;font-weight:900;margin:12px 10px 5px">SWITCH TRACK</div>'+['excel','sql','powerbi','python','ai'].map(s=>'<a class="lp-course-link" href="'+s+'.html"><img src="../assets/icon-'+s+'.svg" width="20" height="20" alt=""> '+(s==='excel'?'Excel':s==='sql'?'SQL':s==='ai'?'AI Integration':s==='python'?'Python':'Power BI')+'</a>').join('');sidebar.append(box)}
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(window.DALP_ROLE==='admin'&&!['reviewer.html','auth.html','connection-test.html','sync-test.html','admin.html'].includes(page)&&!document.querySelector('.instructor-access-panel')){
   const inCourses=/\/courses\//.test(location.pathname),root=inCourses?'../':'';
   const reviewerUrl=new URL(root+'reviewer.html',location.href).href;
   const panel=document.createElement('section');panel.className='instructor-access-panel';panel.setAttribute('aria-label','Instructor reviewer access');
   panel.innerHTML='<div class="instructor-access-card"><div class="instructor-access-copy"><div class="instructor-access-icon" aria-hidden="true">⌁</div><div><small>Instructor access</small><h3>Instructor Reviewer Desk</h3><p>Sign in with your authorised instructor account to see submitted capstones, preview learner evidence, score projects and publish results.</p></div></div><div><a class="instructor-access-button" href="'+root+'auth.html?return='+encodeURIComponent(reviewerUrl)+'">Sign in &amp; review capstones →</a><div class="instructor-access-note">Learners cannot access the private review data.</div></div></div>';
   const footer=document.querySelector('.footer');if(footer)footer.before(panel);else document.body.append(panel);
  }
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',place,{once:true});else place();
})();
