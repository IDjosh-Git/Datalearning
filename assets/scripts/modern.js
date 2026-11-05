/* Shared interface interactions; light appearance is managed by the site stylesheet. */
(()=>{
 const place=()=>{
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
