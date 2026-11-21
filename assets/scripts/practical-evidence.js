/* Evidence-based practical self-assessment; never awards grades or certificates. */
(()=>{'use strict';
 const select=document.getElementById('practicalCourse'),host=document.getElementById('practicalCriteria'),evidence=document.getElementById('practicalEvidence'),status=document.getElementById('practicalStatus'),save=document.getElementById('practicalSave');if(!select||!host||!save)return;
 const criteria=['Business question and intended decision','Source data, grain, and quality checks','Working technical artifact or reproducible calculations','Output reconciliation and error investigation','Interpretation, limitations, and recommendation'];
 const key=course=>'dalp-practical-evidence-v1-'+course;
 const storage=()=>window.DALP_STORAGE;
 function render(){host.replaceChildren();let state={};try{state=JSON.parse(storage()?.getItem(key(select.value))||'{}')}catch{};
 criteria.forEach((label,i)=>{const line=document.createElement('label');line.className='mastery-option';const check=document.createElement('input');check.type='checkbox';check.dataset.index=i;check.checked=!!state.checks?.[i];line.append(check,document.createTextNode(label));host.append(line)});evidence.value=typeof state.evidence==='string'?state.evidence:'';status.textContent='Checklist loaded. Only instructor-reviewed capstones receive official grades.'}
 save.addEventListener('click',async()=>{if(!window.DALP_CLOUD_WORKSPACE?.ready){status.textContent='Sign in and wait for cloud synchronisation before saving.';return}
 const checks=[...host.querySelectorAll('input')].map(x=>x.checked);const value={checks,evidence:evidence.value.trim().slice(0,2000),updatedAt:new Date().toISOString()};storage().setItem(key(select.value),JSON.stringify(value));status.textContent='Saving to your account…';const ok=await window.DALP_CLOUD_WORKSPACE.persist(key(select.value));status.textContent=ok?'Evidence checklist saved to your account. This is not a grade.':'Cloud save pending; please retry while connected.'});
 select.addEventListener('change',render);window.addEventListener('dalp:cloud-hydrated',render);render();
})();
