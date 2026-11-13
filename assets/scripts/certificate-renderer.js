/* One accessible SVG certificate for screen, print and high-resolution export. No remote assets. */
(function(g){'use strict';
 const COLORS={excel:'#397BAE',sql:'#235A83',powerbi:'#758C46',python:'#235A83',ai:'#235A83'};
 const XML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
 const clean=s=>String(s??'').replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').trim();
 const fmt=v=>{if(!v)return '—';const d=new Date(String(v).length===10?v+'T12:00:00':v);return Number.isNaN(d.getTime())?'—':d.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})};
 function verifyUrl(cert){const url=new URL('verify.html',document.baseURI||g.location.href);url.searchParams.set('id',cert.certificate_id);return url.href}
 function qrSvg(url){if(!g.DALP_QR)return '';try{const qr=new g.DALP_QR(0,1);qr.addData(url);qr.make();const n=qr.getModuleCount(),size=134,cell=size/(n+8);let blocks='';for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(qr.isDark(y,x))blocks+=`M${((x+4)*cell).toFixed(2)} ${((y+4)*cell).toFixed(2)}h${(cell+.05).toFixed(2)}v${(cell+.05).toFixed(2)}h-${(cell+.05).toFixed(2)}Z`;return `<rect x="0" y="0" width="${size}" height="${size}" rx="6" fill="#FFFFFF"/><path d="${blocks}" fill="#253745"/>`}catch(e){console.warn('QR unavailable',e);return ''}}
 function split(s,max=34){const words=clean(s).split(' '),lines=[];let line='';for(const word of words){const pieces=word.match(new RegExp('.{1,'+max+'}','g'))||[word];for(const piece of pieces){if((line+' '+piece).trim().length>max&&line){lines.push(line);line=piece}else line=(line+' '+piece).trim()}}if(line)lines.push(line);return lines}
 const lineText=(lines,x,y,size,height,fill,weight='600',family='Arial, sans-serif')=>lines.map((line,i)=>`<text x="${x}" y="${y+i*height}" font-family="${family}" font-weight="${weight}" text-anchor="middle" font-size="${size}" fill="${fill}">${XML(line)}</text>`).join('');
 function grade(score){const n=Number(score);if(score===null||score===undefined||score===''||!Number.isFinite(n)||n<0||n>100)return null;return n>=90?'A+ — Excellent':n>=80?'A — Very Good':n>=70?'B — Good':n>=60?'C — Satisfactory':n>=50?'D — Fair':'F — Fail'}
 function svg(cert){
   if(!cert||!clean(cert.certificate_id)||!clean(cert.learner_name)||!clean(cert.course_title))throw Error('Certificate is missing required verified details');
   const accent=COLORS[cert.course_slug]||'#397BAE',url=verifyUrl(cert),name=clean(cert.learner_name),course=clean(cert.course_title);
   const nameLines=split(name,38),longName=nameLines.length>1||name.length>29;
   const nameSize=nameLines.length>=3?44:longName?name.length>55?50:60:Math.min(83,Math.max(50,1300/Math.max(name.length,15)));
   const courseLines=split(course,47),courseSize=course.length>35?43:49;
   const nameY=nameLines.length===1?580:nameLines.length===2?552:500;
   const courseY=courseLines.length===1?790:772;
   const issued=fmt(cert.issued_at||cert.completion_date),completed=fmt(cert.completion_date||cert.issued_at);
   const assessmentGrade=grade(cert.score);
   const desc=`10 learning modules · practical activities · instructor-assessed capstone`;
   let qr=qrSvg(url);
   return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1684 1191" width="1684" height="1191" role="img" aria-label="Certificate of completion issued to ${XML(name)} for ${XML(course)}" preserveAspectRatio="xMidYMid meet">
   <defs><linearGradient id="paper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FBFBF8"/><stop offset="1" stop-color="#FBFBF8"/></linearGradient><linearGradient id="navy" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#11212D"/><stop offset="1" stop-color="#304F66"/></linearGradient></defs>
   <rect width="1684" height="1191" fill="url(#paper)"/><rect width="1684" height="23" fill="url(#navy)"/><rect x="0" y="23" width="1684" height="6" fill="#9BB765"/>
   <rect x="51" y="55" width="1582" height="1080" fill="none" stroke="#9BB765" stroke-width="2"/><rect x="66" y="70" width="1552" height="1050" fill="none" stroke="#C5E384" stroke-width="1.5"/>
   <path d="M72 190V72h118M1494 72h118v118M72 1000v114h118M1494 1114h118v-114" stroke="#9BB765" stroke-width="5" fill="none"/>
   <circle cx="167" cy="155" r="51" fill="#253745"/><circle cx="167" cy="155" r="44" fill="none" stroke="#9BB765" stroke-width="2"/><text x="167" y="167" font-family="Georgia,serif" font-size="35" text-anchor="middle" fill="#FBFBF8" font-weight="bold">DA</text>
   <text x="238" y="148" font-family="Arial,sans-serif" font-size="29" font-weight="800" letter-spacing="2" fill="#253745">DATA ANALYSIS</text>
   <text x="238" y="180" font-family="Arial,sans-serif" font-size="21" letter-spacing="5" fill="#657A86">LEARNING PATH</text>
   <text x="1506" y="140" text-anchor="end" font-family="Arial,sans-serif" font-size="18" font-weight="700" letter-spacing="3" fill="#566B36">OFFICIAL LEARNING RECORD</text>
   <text x="1506" y="175" text-anchor="end" font-family="Arial,sans-serif" font-size="19" fill="#4A5C6A">Course completion · Verified online</text>
   <path d="M585 245h514" stroke="#C5E384" stroke-width="2"/><path d="M813 245h58" stroke="#758C46" stroke-width="6"/>
   <text x="842" y="356" font-family="Georgia,'Times New Roman',serif" font-size="91" fill="#253745" text-anchor="middle" letter-spacing="-2">Certificate</text>
   <text x="842" y="409" font-family="Arial,sans-serif" font-size="30" font-weight="700" fill="#758C46" letter-spacing="9" text-anchor="middle">OF COMPLETION</text>
   <text x="842" y="479" font-family="Arial,sans-serif" font-size="23" fill="#657A86" letter-spacing="2.2" text-anchor="middle">PROUDLY PRESENTED TO</text>
   ${lineText(nameLines,842,nameY,nameSize,nameLines.length>=3?54:65,'#253745','700','Georgia, Times New Roman, serif')}
   <path d="M414 649h856" stroke="#9BB765" stroke-width="2"/><circle cx="842" cy="649" r="7" fill="#9BB765"/>
   <text x="842" y="719" font-family="Arial,sans-serif" font-size="25" fill="#657A86" text-anchor="middle">For successfully completing the learning programme in</text>
   ${lineText(courseLines,842,courseY,courseSize,55,accent,'700','Arial, sans-serif')}
   <text x="842" y="871" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" fill="#4A5C6A">${XML(desc)}</text>
   <text x="842" y="905" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#657A86">Capstone assessed and passed · Grade: ${XML(assessmentGrade||'Not available')}</text>
   <path d="M132 942h1418" stroke="#CCD0CF" stroke-width="2"/>
   <text x="150" y="994" font-size="17" font-weight="700" letter-spacing="2" font-family="Arial,sans-serif" fill="#758C46">DATE OF ISSUE</text><text x="150" y="1030" font-size="26" font-weight="700" font-family="Arial,sans-serif" fill="#253745">${XML(issued)}</text>
   <text x="485" y="994" font-size="17" font-weight="700" letter-spacing="2" font-family="Arial,sans-serif" fill="#758C46">ASSESSMENT</text><text x="485" y="1030" font-size="26" font-weight="700" font-family="Arial,sans-serif" fill="#253745">PASSED</text>
   <text x="815" y="994" font-size="17" font-weight="700" letter-spacing="2" font-family="Arial,sans-serif" fill="#758C46">ISSUED BY</text><text x="815" y="1030" font-size="24" font-weight="700" font-family="Arial,sans-serif" fill="#253745">Data Analysis Learning Path</text>
   <text x="150" y="1079" font-family="Arial,sans-serif" font-size="18" fill="#657A86">Certificate ID: <tspan fill="#253745" font-weight="700">${XML(cert.certificate_id)}</tspan></text>
   <text x="150" y="1106" font-family="Arial,sans-serif" font-size="15" fill="#657A86">Awarded upon successful completion of the course and its assessed requirements.</text>
   <g transform="translate(1375 954)">${qr||'<rect width="134" height="134" fill="white" stroke="#CCD0CF"/>'}</g>
   <text x="1442" y="1107" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" font-weight="700" fill="#4A5C6A">SCAN TO VERIFY</text>
   </svg>`;
 }
 function mount(node,cert){node.innerHTML=svg(cert);node.dataset.course=cert.course_slug||'';return node.querySelector('svg')}
 async function downloadPNG(node,cert){const source=node.querySelector('svg');if(!source)throw Error('Certificate is not ready');const clone=source.cloneNode(true);clone.setAttribute('xmlns','http://www.w3.org/2000/svg');const blob=new Blob([new XMLSerializer().serializeToString(clone)],{type:'image/svg+xml;charset=utf-8'});const url=URL.createObjectURL(blob);try{const img=new Image();img.src=url;await img.decode();const canvas=document.createElement('canvas');canvas.width=3508;canvas.height=2480;const ctx=canvas.getContext('2d');ctx.fillStyle='#FFFFFF';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);const file=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!file)throw Error('Unable to create image');const fileUrl=URL.createObjectURL(file);const a=document.createElement('a');a.href=fileUrl;a.download='Data-Learning-Path-'+clean(cert.course_slug||'course')+'-'+clean(cert.certificate_id).replace(/[^a-z\d_-]/gi,'')+'.png';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(fileUrl),1500)}finally{URL.revokeObjectURL(url)}}
 g.DALP_CERT={mount,svg,verifyUrl,downloadPNG,fmt,grade};
})(window);
