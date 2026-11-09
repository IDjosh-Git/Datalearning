/* Safe offline spreadsheet formula evaluator. The challenge dataset is immutable for grading.
   An optional, independent editable worksheet supports formulas in A1:AZ1000.
   This is a teaching calculator with broad Excel-style support, NOT Microsoft Excel itself. */
(function(){'use strict';
const rows=[['Pens',120,'East',60,2],['Folders',450,'West',90,5],['Binders',300,'East',100,3],['Paper',210,'West',52.5,4],['Toner',620,'East',620,1],['Markers',150,'West',75,2]];
const headers=['Product','Sales','Region','Price','Qty'];
const ERR=(code,message)=>{const e=new Error(message||code);e.code=code;throw e};
function coordinates(ref){const m=/^\$?([A-Z]+)\$?(\d+)$/i.exec(ref);if(!m)ERR('#REF!','Invalid cell reference: '+ref);let col=0;for(const ch of m[1].toUpperCase())col=col*26+ch.charCodeAt(0)-64;return [Number(m[2])-1,col-1]}
function columnName(i){let name='';for(i++;i>0;i=Math.floor((i-1)/26))name=String.fromCharCode(65+(i-1)%26)+name;return name}
function normalizeRef(ref){return String(ref).toUpperCase().replace(/\$/g,'')}
function cell(ref,sheet,visiting){const [r,c]=coordinates(ref),key=normalizeRef(ref);
 if(r<0||c<0||r>(sheet?999:6)||c>(sheet?51:4))ERR('#REF!','Cell outside '+(sheet?'A1:AZ1000':'the practice worksheet A1:E7')+': '+ref);
 if(sheet&&Object.prototype.hasOwnProperty.call(sheet,key)){
  const value=sheet[key];if(typeof value==='string'&&value.trim().startsWith('=')){
   if(visiting.has(key))ERR('#CIRC!','Circular reference involving '+key);
   if(visiting.size>=60)ERR('#NUM!','Worksheet formula recursion limit exceeded');
   visiting.add(key);try{return evaluate(value,sheet,visiting)}finally{visiting.delete(key)}
  }return value;
 }
 return r<=6&&c<=4?(r===0?headers[c]:rows[r-1][c]):'';
}
function range(a,b,sheet,visiting){const [r1,c1]=coordinates(a),[r2,c2]=coordinates(b);
 if(r2<r1||c2<c1)ERR('#REF!','Invalid range direction');
 if((r2-r1+1)*(c2-c1+1)>10000)ERR('#NUM!','Range too large for offline practice (10,000 cells maximum)');
 if(r2>(sheet?999:6)||c2>(sheet?51:4))ERR('#REF!','Range outside the practice worksheet');
 const out=[];for(let r=r1;r<=r2;r++)for(let c=c1;c<=c2;c++)out.push(cell(columnName(c)+(r+1),sheet,visiting));return out;
}
function lex(src){const t=[];let i=0;while(i<src.length){let s=src.slice(i),m;if(/^\s/.test(s)){i++;continue}if(src[i]==='"'){let j=i+1,v='';for(;j<src.length;j++){if(src[j]==='"'){if(src[j+1]==='"'){v+='"';j++;continue}break}v+=src[j]}if(j===src.length)ERR('#VALUE!','Unclosed text string');t.push({t:'value',v});i=j+1;continue}
if((m=/^\d+(?:\.\d*)?(?:[Ee][+-]?\d+)?/.exec(s))){t.push({t:'value',v:Number(m[0])});i+=m[0].length;continue}
if((m=/^(?:\$?[A-Za-z]{1,3}\$?\d+|[A-Za-z_][\w.]*)/.exec(s))){t.push({t:/^\$?[A-Za-z]{1,3}\$?\d+$/.test(m[0])?'ref':'id',v:m[0].toUpperCase()});i+=m[0].length;continue}
if((m=/^(<=|>=|<>|!=|[+*/^%&()\-,:;=<>])/.exec(s))){t.push({t:m[0]===';'?',':m[0],v:m[0]});i+=m[0].length;continue}ERR('#VALUE!','Unrecognized character at position '+(i+1)+': '+src[i]);}t.push({t:'eof'});return t}
function parse(source){const tokens=lex(source),state={i:0};const peek=()=>tokens[state.i],take=()=>tokens[state.i++];function expect(t){if(peek().t!==t)ERR('#VALUE!','Expected '+t+' in formula');return take()}
function primary(){let tok=take();if(tok.t==='value')return {t:'literal',v:tok.v};if(tok.t==='ref'){if(peek().t===':'){take();return {t:'range',a:tok.v,b:expect('ref').v}}return {t:'cell',v:tok.v}}if(tok.t==='id'){if(peek().t!=='('){if(tok.v==='TRUE')return {t:'literal',v:true};if(tok.v==='FALSE')return {t:'literal',v:false};ERR('#NAME?','Unknown name: '+tok.v)}take();const args=[];if(peek().t!==')'){do{args.push(expr(0));if(peek().t!==',')break;take()}while(true)}expect(')');return {t:'call',name:tok.v,args}}
if(tok.t==='('){const v=expr(0);expect(')');return v}if(tok.t==='+'||tok.t==='-'){return {t:'unary',op:tok.t,v:expr(6)}}ERR('#VALUE!','Unexpected formula token '+String(tok.t))}
const prec={'=':1,'<>':1,'!=':1,'<':1,'>':1,'<=':1,'>=':1,'&':2,'+':3,'-':3,'*':4,'/':4,'^':5};function expr(min){let left=primary();while(true){if(peek().t==='%'&&6>=min){take();left={t:'unary',op:'%',v:left};continue}let op=peek().t,p=prec[op];if(p===undefined||p<min)break;take();left={t:'binary',op,a:left,b:expr(p+(op==='^'?0:1))}}return left}
const root=expr(0);if(peek().t!=='eof')ERR('#VALUE!','Unexpected input after formula');return root}
const flat=x=>Array.isArray(x)?x.flat(Infinity):[x];const str=x=>x==null?'':String(x);const num=x=>{if(Array.isArray(x))return num(x[0]);if(x==null||x==='')return 0;if(typeof x==='boolean')return x?1:0;const n=Number(x);if(!Number.isFinite(n))ERR('#VALUE!','Expected a number, received: '+str(x));return n};const numerical=x=>flat(x).filter(v=>typeof v==='number'&&Number.isFinite(v));
function compare(a,b){if(Array.isArray(a))a=a[0];if(Array.isArray(b))b=b[0];if(typeof a==='string'&&typeof b==='string')return a.localeCompare(b,undefined,{sensitivity:'accent'})<0?-1:a.localeCompare(b,undefined,{sensitivity:'accent'})>0?1:0;let x=Number(a),y=Number(b);if(Number.isFinite(x)&&Number.isFinite(y))return x-y;return str(a).toLowerCase().localeCompare(str(b).toLowerCase())}
function matchCriteria(v,raw){if(typeof raw!=='string')return compare(v,raw)===0;const m=/^(>=|<=|<>|!=|>|<|=)?(.*)$/s.exec(raw),op=m[1]||'=',target=m[2];const wildcard=target.includes('*')||target.includes('?');let match;if(wildcard){const regex=new RegExp('^'+target.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/\\\*/g,'.*').replace(/\\\?/g,'.')+'$','i');match=regex.test(str(v));}else match=compare(v,(!isNaN(Number(target))&&target.trim()!=='')?Number(target):target)===0;if(op==='=')return match;if(op==='<>'||op==='!=')return !match;const c=compare(v,(!isNaN(Number(target))&&target.trim()!=='')?Number(target):target);return op==='>'?c>0:op==='>='?c>=0:op==='<'?c<0:c<=0}
const dateSerial=d=>(Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())-Date.UTC(1899,11,30))/86400000;
function evaluate(input,sheet=null,visiting=new Set()){const source=String(input??'').trim().replace(/^=/,'');if(!source)ERR('#VALUE!','Enter a formula first');if(source.length>5000)ERR('#VALUE!','Formula exceeds the 5,000-character safety limit');const tree=parse(source);let ops=0;
function ev(n){if(++ops>30000)ERR('#NUM!','Formula complexity limit exceeded');if(n.t==='literal')return n.v;if(n.t==='cell')return cell(n.v,sheet,visiting);if(n.t==='range')return range(n.a,n.b,sheet,visiting);if(n.t==='unary'){const v=num(ev(n.v));return n.op==='-'?-v:n.op==='%'?v/100:v}
if(n.t==='binary'){const a=ev(n.a),b=ev(n.b),op=n.op;if(['=','<>','!=','<','>','<=','>='].includes(op)){const test=(x,y)=>{const c=compare(x,y);return op==='='?c===0:op==='!='||op==='<>'?c!==0:op==='<'?c<0:op==='>'?c>0:op==='<='?c<=0:c>=0};if(Array.isArray(a)||Array.isArray(b)){const aa=flat(a),bb=flat(b),len=Math.max(aa.length,bb.length);if(aa.length!==len&&aa.length!==1||bb.length!==len&&bb.length!==1)ERR('#VALUE!','Arrays have incompatible dimensions');return Array.from({length:len},(_,i)=>test(aa[aa.length===1?0:i],bb[bb.length===1?0:i]))}return test(a,b)}if(op==='&')return str(a)+str(b);const operation=(aa,bb)=>{const x=num(aa),y=num(bb);if(op==='+')return x+y;if(op==='-')return x-y;if(op==='*')return x*y;if(op==='/'){if(y===0)ERR('#DIV/0!','Division by zero');return x/y}if(op==='^')return Math.pow(x,y)};
if(Array.isArray(a)||Array.isArray(b)){const aa=flat(a),bb=flat(b),len=Math.max(aa.length,bb.length);if((aa.length!==1&&aa.length!==len)||(bb.length!==1&&bb.length!==len))ERR('#VALUE!','Array dimensions differ');return Array.from({length:len},(_,i)=>operation(aa[aa.length===1?0:i],bb[bb.length===1?0:i]));}
return operation(a,b)}
if(n.t!=='call')ERR('#VALUE!','Invalid formula node');const fn=n.name,ar=n.args;const v=i=>i<ar.length?ev(ar[i]):undefined;const vals=()=>ar.map(ev);const all=()=>vals().flat(Infinity);const nArgs=(min,max=Infinity)=>{if(ar.length<min||ar.length>max)ERR('#VALUE!',fn+' expects '+min+(max===min?'':' to '+max)+' arguments')};const criteriaList=(cstart)=>{const result=[];for(let i=cstart;i<ar.length;i+=2)result.push([flat(v(i)),v(i+1)]);return result};const doIfs=(start,avg=false,count=false)=>{const vv=flat(v(start));const checks=criteriaList(start+1);if(checks.some(([r])=>r.length!==vv.length))ERR('#VALUE!','Criteria and value ranges must have matching sizes');const matched=vv.filter((_,i)=>checks.every(([r,c])=>matchCriteria(r[i],c)));if(count)return matched.length;const ns=numerical(matched);if(avg)return ns.length?ns.reduce((a,b)=>a+b,0)/ns.length:ERR('#DIV/0!','No matching numerical values');return ns.reduce((a,b)=>a+b,0)};
// Lazy conditional evaluation prevents invalid unused branches producing errors.
if(fn==='IF'){nArgs(2,3);return truthy(v(0))?v(1):ar.length===3?v(2):false}
if(fn==='IFERROR'||fn==='IFNA'){nArgs(2,2);try{return v(0)}catch(e){if(fn==='IFNA'&&e.code!=='#N/A')throw e;return v(1)}}
if(fn==='AND'){for(let i=0;i<ar.length;i++)if(!truthy(v(i)))return false;return true}if(fn==='OR'){for(let i=0;i<ar.length;i++)if(truthy(v(i)))return true;return false}if(fn==='NOT'){nArgs(1,1);return !truthy(v(0))}
if(fn==='IFS'){for(let i=0;i+1<ar.length;i+=2)if(truthy(v(i)))return v(i+1);ERR('#N/A','No IFS condition matched')}
if(fn==='CHOOSE'){let i=Math.trunc(num(v(0)));if(i<1||i>=ar.length)ERR('#VALUE!','CHOOSE index out of range');return v(i)}
if(fn==='SWITCH'){const key=v(0);for(let i=1;i+1<ar.length;i+=2)if(compare(key,v(i))===0)return v(i+1);if(ar.length%2===0)return v(ar.length-1);ERR('#N/A','No SWITCH match')}
if(['SUM','AVERAGE','COUNT','COUNTA','MAX','MIN','PRODUCT','MEDIAN','STDEV.S','STDEV.P','VAR.S','VAR.P','COUNTBLANK','LARGE','SMALL'].includes(fn)){
const av=all(),ns=numerical(av);if(fn==='SUM')return ns.reduce((a,b)=>a+b,0);if(fn==='COUNT')return ns.length;if(fn==='COUNTA')return av.filter(x=>x!==''&&x!=null).length;if(fn==='COUNTBLANK')return av.filter(x=>x===''||x==null).length;if(fn==='AVERAGE')return ns.length?ns.reduce((a,b)=>a+b,0)/ns.length:ERR('#DIV/0!','No numeric values');if(fn==='MAX'||fn==='MIN')return ns.length?(fn==='MAX'?Math.max(...ns):Math.min(...ns)):0;if(fn==='PRODUCT')return ns.reduce((a,b)=>a*b,1);if(fn==='MEDIAN'){if(!ns.length)ERR('#NUM!');ns.sort((a,b)=>a-b);let i=Math.floor(ns.length/2);return ns.length%2?ns[i]:(ns[i-1]+ns[i])/2}if(fn==='LARGE'||fn==='SMALL'){const arr=numerical(v(0)).sort((a,b)=>fn==='LARGE'?b-a:a-b),k=Math.trunc(num(v(1)));if(k<1||k>arr.length)ERR('#NUM!');return arr[k-1]}const avg=ns.reduce((a,b)=>a+b,0)/ns.length,variance=ns.reduce((a,b)=>a+(b-avg)**2,0)/(ns.length-(fn.endsWith('.S')?1:0));if(!Number.isFinite(variance))ERR('#DIV/0!');return fn.startsWith('STDEV')?Math.sqrt(variance):variance}
if(fn==='SUMPRODUCT'){nArgs(1);const arrays=ar.map((_,i)=>flat(v(i)));if(arrays.some(a=>a.length!==arrays[0].length))ERR('#VALUE!','SUMPRODUCT ranges must align');return arrays[0].reduce((sum,_,i)=>sum+arrays.reduce((p,a)=>p*num(a[i]),1),0)}
if(fn==='SUMIF'||fn==='COUNTIF'||fn==='AVERAGEIF'){nArgs(2,3);const r=flat(v(0)),criterion=v(1),values=fn==='COUNTIF'?r:ar.length>2?flat(v(2)):r;if(values.length!==r.length)ERR('#VALUE!','Ranges have different dimensions');const matches=r.map((x,i)=>matchCriteria(x,criterion)?values[i]:undefined).filter(x=>x!==undefined);if(fn==='COUNTIF')return matches.length;const ns=numerical(matches);return fn==='SUMIF'?ns.reduce((a,b)=>a+b,0):ns.length?ns.reduce((a,b)=>a+b,0)/ns.length:ERR('#DIV/0!','No matching values')}
if(fn==='COUNTIFS'){nArgs(2);if(ar.length%2)ERR('#VALUE!','COUNTIFS requires complete range/criteria pairs');const r=flat(v(0)),checks=criteriaList(0);return r.filter((_,i)=>checks.every(([arr,c])=>arr.length===r.length&&matchCriteria(arr[i],c))).length}
if(fn==='SUMIFS'||fn==='AVERAGEIFS'){nArgs(3);if(ar.length%2!==1)ERR('#VALUE!',fn+' requires complete range/criteria pairs');return doIfs(0,fn==='AVERAGEIFS')}
if(fn==='ROUND'||fn==='ROUNDUP'||fn==='ROUNDDOWN'||fn==='TRUNC'){nArgs(1,2);const d=10**num(ar.length>1?v(1):0),x=num(v(0))*d;return (fn==='ROUND'?Math.round(x+Number.EPSILON):fn==='ROUNDUP'?Math.sign(x)*Math.ceil(Math.abs(x)):Math.trunc(x))/d}
if(fn==='INT')return Math.floor(num(v(0)));if(fn==='ABS')return Math.abs(num(v(0)));if(fn==='MOD'){const b=num(v(1));if(b===0)ERR('#DIV/0!');return ((num(v(0))%b)+b)%b}
if(fn==='POWER')return Math.pow(num(v(0)),num(v(1)));if(fn==='SQRT')return Math.sqrt(num(v(0)));if(fn==='EXP')return Math.exp(num(v(0)));if(fn==='LN')return Math.log(num(v(0)));if(fn==='LOG10')return Math.log10(num(v(0)));if(fn==='LOG')return Math.log(num(v(0)))/Math.log(num(ar.length>1?v(1):10));if(fn==='PI')return Math.PI;
if(fn==='CONCAT'||fn==='CONCATENATE')return all().map(str).join('');if(fn==='TEXTJOIN'){nArgs(3);return ar.slice(2).flatMap((_,i)=>flat(v(i+2))).filter(x=>!truthy(v(1))||str(x)!=='').map(str).join(str(v(0)))}
if(fn==='UPPER')return str(v(0)).toUpperCase();if(fn==='LOWER')return str(v(0)).toLowerCase();if(fn==='PROPER')return str(v(0)).toLowerCase().replace(/\b\p{L}/gu,s=>s.toUpperCase());if(fn==='TRIM')return str(v(0)).trim().replace(/\s+/g,' ');if(fn==='CLEAN')return str(v(0)).replace(/[\x00-\x1f]/g,'');if(fn==='LEN')return str(v(0)).length;
if(fn==='LEFT')return str(v(0)).slice(0,num(ar.length>1?v(1):1));if(fn==='RIGHT')return str(v(0)).slice(-num(ar.length>1?v(1):1));if(fn==='MID')return str(v(0)).slice(num(v(1))-1,num(v(1))-1+num(v(2)));if(fn==='REPT')return str(v(0)).repeat(Math.min(10000,Math.max(0,num(v(1)))));if(fn==='SUBSTITUTE')return str(v(0)).split(str(v(1))).join(str(v(2)));
if(fn==='FIND'||fn==='SEARCH'){const a=str(v(0)),b=str(v(1)),start=ar.length>2?num(v(2))-1:0;const pos=fn==='SEARCH'?b.toLowerCase().indexOf(a.toLowerCase(),start):b.indexOf(a,start);if(pos<0)ERR('#VALUE!','Text not found');return pos+1}if(fn==='VALUE')return num(v(0));if(fn==='T')return typeof v(0)==='string'?v(0):'';if(fn==='N')return typeof v(0)==='number'?v(0):0;
if(fn==='ISNUMBER')return typeof v(0)==='number';if(fn==='ISTEXT')return typeof v(0)==='string';if(fn==='ISBLANK')return v(0)===''||v(0)==null;
if(fn==='MATCH'||fn==='XMATCH'){const look=v(0),list=flat(v(1));const ix=list.findIndex(x=>compare(x,look)===0);if(ix<0)ERR('#N/A','No lookup match');return ix+1}
if(fn==='INDEX'){const list=flat(v(0)),r=Math.trunc(num(v(1)));if(r<1||r>list.length)ERR('#REF!','INDEX outside range');return list[r-1]}
if(fn==='VLOOKUP'||fn==='HLOOKUP'){nArgs(3,4);const rg=ar[1];if(rg.t!=='range')ERR('#VALUE!','Lookup table must be a cell range');const [r1,c1]=coordinates(rg.a),[r2,c2]=coordinates(rg.b),index=Math.trunc(num(v(2)));if(index<1||index>(fn==='VLOOKUP'?c2-c1+1:r2-r1+1))ERR('#REF!','Lookup column / row index outside range');const target=v(0);if(fn==='VLOOKUP'){for(let r=r1;r<=r2;r++){const c=cell(columnName(c1)+(r+1),sheet,visiting);if(compare(c,target)===0)return cell(columnName(c1+index-1)+(r+1),sheet,visiting)}}else{for(let c=c1;c<=c2;c++){const cval=cell(columnName(c)+(r1+1),sheet,visiting);if(compare(cval,target)===0)return cell(columnName(c)+(r1+index),sheet,visiting)}}ERR('#N/A','No exact lookup match')}
if(fn==='XLOOKUP'){nArgs(3,6);const search=v(0),lookup=flat(v(1)),returns=flat(v(2));if(lookup.length!==returns.length)ERR('#VALUE!','Lookup and return ranges must have matching sizes');const ix=lookup.findIndex(x=>compare(x,search)===0);if(ix<0)return ar.length>3?v(3):ERR('#N/A','No exact lookup match');return returns[ix]}
if(fn==='FILTER'){nArgs(2,3);const r=flat(v(0)),include=flat(v(1));if(r.length!==include.length)ERR('#VALUE!','FILTER arrays differ in size');const out=r.filter((_,i)=>truthy(include[i]));return out.length?out:ar.length===3?v(2):ERR('#CALC!','No matching records')}
if(fn==='UNIQUE')return [...new Set(flat(v(0)).map(x=>JSON.stringify(x)))].map(x=>JSON.parse(x));if(fn==='SORT'){let arr=flat(v(0)).slice();arr.sort((a,b)=>compare(a,b)*(num(ar.length>2?v(2):1)<0?-1:1));return arr}
if(fn==='TODAY'||fn==='NOW'){const today=new Date();return dateSerial(today)+(fn==='NOW'?(today.getUTCHours()*3600+today.getUTCMinutes()*60+today.getUTCSeconds())/86400:0)}
if(fn==='DATE')return dateSerial(new Date(Date.UTC(num(v(0)),num(v(1))-1,num(v(2)))));if(fn==='YEAR'||fn==='MONTH'||fn==='DAY'){const d=new Date(Date.UTC(1899,11,30)+num(v(0))*86400000);return fn==='YEAR'?d.getUTCFullYear():fn==='MONTH'?d.getUTCMonth()+1:d.getUTCDate()}

// Additional commonly used Excel-style functions. Unsupported workbook features return #NAME?.
const first=()=>num(v(0)),second=()=>num(v(1));
const numericArray=i=>numerical(v(i));
const dateFromSerial=x=>{const d=new Date(Date.UTC(1899,11,30)+Math.trunc(num(x))*86400000);if(!Number.isFinite(d.getTime()))ERR('#VALUE!','Invalid date');return d};
const quantile=(input,p,exclusive=false)=>{const a=numerical(input).sort((x,y)=>x-y);if(!a.length||p<0||p>1)ERR('#NUM!','Invalid percentile');const pos=exclusive?p*(a.length+1):p*(a.length-1)+1;if(pos<1||pos>a.length)ERR('#NUM!','Percentile not defined for this dataset');const lo=Math.floor(pos),hi=Math.ceil(pos);return a[lo-1]+(a[hi-1]-a[lo-1])*(pos-lo)};
if(fn==='SUMSQ'){nArgs(1);return numerical(all()).reduce((a,b)=>a+b*b,0)}
if(['AVERAGEA','MINA','MAXA'].includes(fn)){nArgs(1);const n=all().filter(x=>x!=null&&x!=='').map(x=>typeof x==='string'?0:num(x));if(fn==='AVERAGEA')return n.length?n.reduce((a,b)=>a+b,0)/n.length:ERR('#DIV/0!');return n.length?(fn==='MAXA'?Math.max(...n):Math.min(...n)):0}
if(fn==='MODE.SNGL'||fn==='MODE'){const a=numerical(all()),frequency=new Map();for(const x of a)frequency.set(x,(frequency.get(x)||0)+1);let best,top=1;for(const x of a)if(frequency.get(x)>top){top=frequency.get(x);best=x}return best===undefined?ERR('#N/A','No repeated values'):best}
if(['PERCENTILE.INC','PERCENTILE.EXC','PERCENTILE','QUARTILE.INC','QUARTILE.EXC','QUARTILE'].includes(fn)){nArgs(2,2);const q=second();return quantile(v(0),fn.startsWith('QUARTILE')?q/4:q,fn.endsWith('.EXC'))}
if(['RANK.EQ','RANK','RANK.AVG'].includes(fn)){nArgs(2,3);const x=first(),a=numericArray(1).sort((x,y)=>num(ar.length>2?v(2):0)===0?y-x:x-y),idx=a.findIndex(y=>y===x);if(idx<0)ERR('#N/A');if(fn==='RANK.AVG')return (idx+1+a.lastIndexOf(x)+1)/2;return idx+1}
if(['CORREL','PEARSON','COVARIANCE.S','COVARIANCE.P','SLOPE','INTERCEPT','RSQ','FORECAST.LINEAR'].includes(fn)){
 nArgs(fn==='FORECAST.LINEAR'?3:2,fn==='FORECAST.LINEAR'?3:2);
 const x=numericArray(fn==='FORECAST.LINEAR'?2:1),y=numericArray(fn==='FORECAST.LINEAR'?1:0);
 if(!x.length||x.length!==y.length)ERR('#N/A','Statistical input ranges must align');const n=x.length,mx=x.reduce((a,b)=>a+b,0)/n,my=y.reduce((a,b)=>a+b,0)/n;
 const cov=x.reduce((a,xi,i)=>a+(xi-mx)*(y[i]-my),0),vx=x.reduce((a,z)=>a+(z-mx)**2,0),vy=y.reduce((a,z)=>a+(z-my)**2,0);
 if(fn==='COVARIANCE.S'||fn==='COVARIANCE.P')return cov/(n-(fn.endsWith('.S')?1:0));
 if(fn==='SLOPE'||fn==='INTERCEPT'||fn==='FORECAST.LINEAR'){if(!vx)ERR('#DIV/0!');const slope=cov/vx;return fn==='SLOPE'?slope:fn==='INTERCEPT'?my-slope*mx:my+slope*(first()-mx)}
 if(!vx||!vy)ERR('#DIV/0!');const r=cov/Math.sqrt(vx*vy);return fn==='RSQ'?r*r:r;
}
if(fn==='SIGN')return Math.sign(first());if(fn==='EVEN')return Math.sign(first())*Math.ceil(Math.abs(first())/2)*2;if(fn==='ODD')return Math.sign(first())*(2*Math.ceil((Math.abs(first())-1)/2)+1);
if(fn==='MROUND'){nArgs(2,2);if(second()===0)return 0;if(first()*second()<0)ERR('#NUM!');return Math.round(first()/second())*second()}
if(['CEILING','CEILING.MATH','FLOOR','FLOOR.MATH'].includes(fn)){nArgs(1,3);const x=first(),unit=ar.length>1?Math.abs(second()):1;if(unit===0)return 0;const f=fn.startsWith('CEILING')?Math.ceil:Math.floor;return f(x/unit)*unit}
if(fn==='RADIANS')return first()*Math.PI/180;if(fn==='DEGREES')return first()*180/Math.PI;
if(fn==='SIN')return Math.sin(first());if(fn==='COS')return Math.cos(first());if(fn==='TAN')return Math.tan(first());if(fn==='ASIN')return Math.asin(first());if(fn==='ACOS')return Math.acos(first());if(fn==='ATAN')return Math.atan(first());if(fn==='ATAN2')return Math.atan2(second(),first());
if(fn==='SINH')return Math.sinh(first());if(fn==='COSH')return Math.cosh(first());if(fn==='TANH')return Math.tanh(first());
if(fn==='SQRTPI')return Math.sqrt(first()*Math.PI);
if(fn==='FACT'){const n=Math.trunc(first());if(n<0||n>170)ERR('#NUM!');let out=1;for(let i=2;i<=n;i++)out*=i;return out}
if(fn==='COMBIN'||fn==='PERMUT'){const n=Math.trunc(first()),k=Math.trunc(second());if(n<0||k<0||k>n||n>170)ERR('#NUM!');let out=1;for(let i=0;i<k;i++)out*=n-i;if(fn==='COMBIN')for(let i=2;i<=k;i++)out/=i;return out}
if(fn==='GCD'||fn==='LCM'){const a=all().map(x=>Math.trunc(num(x)));const gcd=(a,b)=>{while(b){const t=a%b;a=b;b=t}return Math.abs(a)};if(a.some(x=>x<0))ERR('#NUM!');return fn==='GCD'?a.reduce(gcd,0):a.reduce((out,x)=>!x||!out?0:out/gcd(out,x)*x,1)}
if(fn==='RAND'){nArgs(0,0);return Math.random()}if(fn==='RANDBETWEEN'){nArgs(2,2);const lo=Math.ceil(first()),hi=Math.floor(second());if(lo>hi)ERR('#NUM!');return lo+Math.floor(Math.random()*(hi-lo+1))}
if(fn==='TEXTBEFORE'||fn==='TEXTAFTER'){nArgs(2,6);const text=str(v(0)),delim=str(v(1));if(!delim)ERR('#VALUE!','Separator must not be empty');const parts=text.split(delim),count=Math.trunc(ar.length>2?num(v(2)):1);if(count===0)ERR('#VALUE!');let index=count>0?count:parts.length+count;if(index<1||index>=parts.length)return ar.length>5?v(5):ERR('#N/A','Separator not found');return fn==='TEXTBEFORE'?parts.slice(0,index).join(delim):parts.slice(index).join(delim)}
if(fn==='TEXTSPLIT'){nArgs(2,6);const delimiter=str(v(1));if(!delimiter)ERR('#VALUE!');return str(v(0)).split(delimiter)}
if(fn==='EXACT'){nArgs(2,2);return str(v(0))===str(v(1))}if(fn==='CHAR'){const n=Math.trunc(first());if(n<1||n>255)ERR('#VALUE!');return String.fromCharCode(n)}if(fn==='CODE')return str(v(0)).charCodeAt(0)||ERR('#VALUE!');
if(fn==='UNICODE')return str(v(0)).codePointAt(0)||ERR('#VALUE!');if(fn==='UNICHAR'){const x=first();if(x<1||x>0x10FFFF)ERR('#VALUE!');return String.fromCodePoint(x)}
if(fn==='REPLACE'){nArgs(4,4);const text=str(v(0)),pos=Math.trunc(second())-1,len=Math.trunc(num(v(2)));if(pos<0||len<0)ERR('#VALUE!');return text.slice(0,pos)+str(v(3))+text.slice(pos+len)}
if(fn==='NUMBERVALUE'){nArgs(1,3);const decimal=ar.length>1?str(v(1)):'.',group=ar.length>2?str(v(2)):',';const input=str(v(0)).replaceAll(group,'').replace(decimal,'.');return num(input)}
if(fn==='TEXT'){nArgs(2,2);const x=v(0),f=str(v(1)).toLowerCase();if(/y{2,4}|dd|mmm/.test(f)){const d=dateFromSerial(x),pad=n=>String(n).padStart(2,'0');return f.includes('yyyy')?`${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}`:`${pad(d.getUTCDate())}/${pad(d.getUTCMonth()+1)}/${d.getUTCFullYear()}`;}
 const percent=f.includes('%'),currency=f.includes('$'),commas=f.includes(','),digits=(f.match(/\.(0+)/)||[])[1]?.length||0;const formatted=(percent?num(x)*100:num(x)).toLocaleString('en-US',{useGrouping:commas,minimumFractionDigits:digits,maximumFractionDigits:digits});return(currency?'$':'')+formatted+(percent?'%':'')}
if(fn==='ISLOGICAL')return typeof v(0)==='boolean';if(fn==='ISEVEN')return first()%2===0;if(fn==='ISODD')return Math.abs(first()%2)===1;if(fn==='ISERROR'||fn==='ISERR'||fn==='ISNA'){try{v(0);return false}catch(e){return fn==='ISERROR'||(fn==='ISNA'?e.code==='#N/A':e.code!=='#N/A')}}
if(fn==='NA'){nArgs(0,0);ERR('#N/A','Value is not available')}
if(fn==='ROWS'||fn==='COLUMNS'){nArgs(1,1);const arg=ar[0];if(arg.t==='range'){const [r1,c1]=coordinates(arg.a),[r2,c2]=coordinates(arg.b);return fn==='ROWS'?r2-r1+1:c2-c1+1}return fn==='ROWS'?flat(v(0)).length:1}
if(fn==='ROW'||fn==='COLUMN'){nArgs(0,1);if(ar.length===1&&(ar[0].t==='cell'||ar[0].t==='range')){const [r,c]=coordinates(ar[0].t==='cell'?ar[0].v:ar[0].a);return fn==='ROW'?r+1:c+1}return 1}
if(fn==='ADDRESS'){nArgs(2,5);const row=Math.trunc(first()),col=Math.trunc(second());if(row<1||col<1||col>52)ERR('#REF!');return '$'+columnName(col-1)+'$'+row}
if(fn==='SEQUENCE'){nArgs(1,4);const rows=Math.trunc(first()),cols=ar.length>1?Math.trunc(second()):1,start=ar.length>2?num(v(2)):1,step=ar.length>3?num(v(3)):1;if(rows<1||cols<1||rows*cols>10000)ERR('#NUM!');return Array.from({length:rows*cols},(_,i)=>start+i*step)}
if(fn==='TAKE'||fn==='DROP'){nArgs(2,2);const arr=flat(v(0)),n=Math.trunc(second());if(fn==='TAKE')return n>=0?arr.slice(0,n):arr.slice(n);return n>=0?arr.slice(n):arr.slice(0,n)}
if(fn==='TRANSPOSE')return flat(v(0)); // Results are displayed as a one-dimensional spill list in this compact lab.
if(fn==='DAYS')return first()-second();
if(fn==='DATEVALUE'){nArgs(1,1);const date=new Date(str(v(0))+'T00:00:00Z');if(!Number.isFinite(date.getTime()))ERR('#VALUE!','Unable to parse date');return dateSerial(date)}
if(fn==='EDATE'||fn==='EOMONTH'){nArgs(2,2);const date=dateFromSerial(v(0)),shift=Math.trunc(second());let y=date.getUTCFullYear(),m=date.getUTCMonth()+shift,day=date.getUTCDate();const last=new Date(Date.UTC(y,m+1,0)).getUTCDate();return dateSerial(new Date(Date.UTC(y,m,fn==='EOMONTH'?last:Math.min(day,last))))}
if(fn==='WEEKDAY'){nArgs(1,2);const dow=dateFromSerial(v(0)).getUTCDay(),mode=ar.length>1?second():1;if(mode===1)return dow+1;if(mode===2)return (dow+6)%7+1;if(mode===3)return (dow+6)%7;ERR('#NUM!','Unsupported weekday mode')}
if(fn==='WEEKNUM'){nArgs(1,2);const d=dateFromSerial(v(0)),start=ar.length>1?second():1;const jan=new Date(Date.UTC(d.getUTCFullYear(),0,1));const shift=(jan.getUTCDay()-(start===2?1:0)+7)%7;return Math.floor((Math.floor((d-jan)/86400000)+shift)/7)+1}
if(fn==='TIME'){nArgs(3,3);return ((first()*3600+second()*60+num(v(2)))%86400+86400)%86400/86400}
if(['HOUR','MINUTE','SECOND'].includes(fn)){nArgs(1,1);const seconds=Math.round(((first()%1+1)%1)*86400)%86400;return fn==='HOUR'?Math.floor(seconds/3600):fn==='MINUTE'?Math.floor(seconds/60)%60:seconds%60}
if(fn==='NETWORKDAYS'){nArgs(2,3);const start=Math.trunc(first()),end=Math.trunc(second()),step=start<=end?1:-1,holidays=new Set(ar.length>2?flat(v(2)).map(x=>Math.trunc(num(x))):[]);if(Math.abs(end-start)>40000)ERR('#NUM!');let count=0;for(let day=start;step>0?day<=end:day>=end;day+=step){const dow=dateFromSerial(day).getUTCDay();if(dow!==0&&dow!==6&&!holidays.has(day))count+=step}return count}
if(fn==='WORKDAY'){nArgs(2,3);let day=Math.trunc(first()),left=Math.abs(Math.trunc(second())),step=second()>=0?1:-1,holidays=new Set(ar.length>2?flat(v(2)).map(x=>Math.trunc(num(x))):[]);if(left>40000)ERR('#NUM!');while(left>0){day+=step;const dow=dateFromSerial(day).getUTCDay();if(dow!==0&&dow!==6&&!holidays.has(day))left--}return day}

ERR('#NAME?','Function not yet supported: '+fn)}
function truthy(x){return Array.isArray(x)?x.some(truthy):typeof x==='string'?x.length>0:!!x}
const answer=ev(tree);if(typeof answer==='number'&&!Number.isFinite(answer))ERR('#NUM!','Invalid numeric result');return answer}
function withScenario(seed,callback){const snapshot=rows.map(r=>r.slice());try{rows.forEach((row,i)=>{row[1]=Math.round(snapshot[i][1]*(seed===1?1.3:.75))+(i%3)*17;row[3]=+(snapshot[i][3]*(seed===1?1.18:.91)).toFixed(2);row[4]=snapshot[i][4]+seed;if(seed===2){if(i!==1&&i!==4&&i!==5)row[0]=snapshot[i][0]+' '+(i%2?'Pro':'Max');row[2]=i%3===0?'Central':snapshot[i][2]}});return callback()}finally{rows.forEach((row,i)=>row.splice(0,row.length,...snapshot[i]))}}
window.DALP_EXEC_EXCEL={evaluate,rows,headers,withScenario,normalizeRef,cellValue:(ref,sheet)=>cell(ref,sheet,new Set()),supported:'Offline spreadsheet calculator: common math, financial-style rounding, logic, statistics, text, lookups, date functions, dynamic arrays, editable single-sheet formulas. No macros, Power Query, external workbook links or full Microsoft Excel compatibility.'};
})();
