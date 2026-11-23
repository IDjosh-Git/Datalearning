(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  const fields = 'certificate_id,learner_name,course_slug,course_title,completion_date,issued_at,status,capstone_submission_id';
  let record;

  function renderList(rows) {
    const list = $('certificateList');
    for (const item of rows) {
      const card = document.createElement('li');
      const heading = document.createElement('h2');
      heading.textContent = item.course_title || 'Course certificate';
      const details = document.createElement('p');
      details.textContent = [item.completion_date && 'Completed ' + item.completion_date,
        item.status === 'active' ? 'Active' : 'Revoked', item.certificate_id].filter(Boolean).join(' · ');
      card.append(heading, details);
      if (item.status === 'active') {
        const link = document.createElement('a');
        link.href = 'certificate.html?id=' + encodeURIComponent(item.certificate_id);
        link.textContent = 'View and download';
        card.append(link);
      }
      list.append(card);
    }
    list.hidden = false;
  }

  async function showCertificate(client, item) {
    record = {...item, score:null};
    if (item.capstone_submission_id) {
      try {
        const result = await client.from('capstone_submissions').select('score')
          .eq('id', item.capstone_submission_id).eq('status', 'approved').limit(1);
        if (!result.error) record.score = result.data?.[0]?.score ?? null;
      } catch (error) {
        console.warn('Certificate score unavailable', error);
      }
    }
    window.DALP_CERT.mount($('certificatePaper'), record);
    for (const id of ['certificateViewPanel','certificateViewControls','certificateViewHelp']) $(id).hidden = false;
    $('certificateViewVerify').href = window.DALP_CERT.verifyUrl(record);
  }

  async function init() {
    const status = $('certificateViewStatus');
    const params = new URLSearchParams(location.search);
    const id = params.get('id')?.trim();
    try {
      const user = await window.DALP_AUTH_GATE?.whenReady;
      const client = window.ZAH_DB?.client;
      if (!user || !client) throw Error('Account connection unavailable');
      if (params.has('id')) {
        if (!id || id.length > 180) {
          status.textContent = 'This certificate link is incomplete. Open My certificates to choose a record.';
          return;
        }
        // Certificate RLS permits owners and authorised administrator accounts.
        const {data,error} = await client.from('certificates').select(fields)
          .eq('certificate_id',id).eq('status','active').limit(1);
        if (error) throw error;
        if (!data?.[0]) {
          status.textContent = 'This certificate is unavailable or no longer active. Open My certificates to review your records.';
          return;
        }
        await showCertificate(client,data[0]);
      } else {
        const {data,error} = await client.from('certificates').select(fields)
          .eq('user_id',user.id).order('issued_at',{ascending:false});
        if (error) throw error;
        if (!data?.length) {
          status.textContent = 'You don’t have any issued certificates yet.';
          return;
        }
        renderList(data);
      }
      status.hidden = true;
    } catch (error) {
      console.warn('Certificate records unavailable',error);
      status.textContent = 'Your certificates couldn’t be loaded. Refresh this page to try again.';
    }
  }

  $('certificateViewPrint').addEventListener('click',()=>{if(record)window.print()});
  $('certificateViewPNG').addEventListener('click',async()=>{
    if(!record)return;
    const button=$('certificateViewPNG');
    button.disabled=true;
    button.textContent='Preparing…';
    try{await window.DALP_CERT.downloadPNG($('certificatePaper'),record)}
    catch(e){console.error(e);alert('The download could not be prepared. Try Print / Save PDF.')}
    finally{button.disabled=false;button.textContent='Download PNG'}
  });
  $('certificateCopyLink').addEventListener('click',async()=>{
    if(!record)return;
    const link=window.DALP_CERT.verifyUrl(record);
    try{
      await navigator.clipboard.writeText(link);
      $('certificateCopyLink').textContent='Link copied';
      setTimeout(()=>$('certificateCopyLink').textContent='Copy verification link',2500);
    }catch{window.prompt('Copy your verification link',link)}
  });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else void init();
})();
