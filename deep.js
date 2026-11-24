/* Red Arrow v2: full lessons, unit tests and the AI project, lazy-loaded by v2.js.
   Content files live in deep/<id>.js and are built from the faculty markdown by build_deep.py.
   FILIPINO DRAFT: every Filipino block is marked DRAFT until native-speaker review.
   Written answers stay in memory on this phone only: never saved, logged or sent. */
(function(){
var W=window;
/* Crisis phrases for written boxes (same terms as the Ask Mar search list), checked next to RA2Safety.classify. */
var CRISIS=/\b(mamatay|magpakamatay|nagpakamatay|pakamatay|papakamatay|suicide|suicidal|self ?harm|kill mysel[fv]e?s?|hurt myself|saktan (ang|ko) (ang )?sarili|patayin ko (ang )?sarili|(ayoko|ayaw ko) (na|ng|nang) mabuhay|dont want to live)\b/;
function norm(s){return String(s||"").toLowerCase().replace(/[’']/g,"").replace(/[^a-z0-9ñ ]+/g," ").replace(/\s+/g," ").trim()}
function isCrisis(text){var t=String(text||"");if(!t.trim())return false;try{var S=W.RA2Safety;if(S&&typeof S.classify==="function"){var v=S.classify(t);if(v&&v.label==="crisis")return true}}catch(e){}return CRISIS.test(norm(t))}
W.RA2DeepCrisis=isCrisis;
W.RA2DeepRender=function(m,id,A){
 var h=A.h,T=A.T,fil=A.fil,D=A.D,d=(W.RA2DeepData||{})[id];
 m.innerHTML="";if(!d){m.appendChild(h("p",{class:"fb-soft",text:T("This page couldn't load.","Hindi ma-load ang page na ito.")}));return}
 function X(pair){return fil&&pair[1]?pair[1]:pair[0]}            /* html pair */
 function isF(pair){return !!(fil&&pair&&pair[1])}
 function draft(pair){return isF(pair)?h("span",{class:"draft-tag",text:"FIL: DRAFT"}):null}
 function H(t,a,html){var e=h(t,a||{});e.innerHTML=html;return e}
 function blk(pair,cls){var w=h("div",{class:cls||"deep-text"});if(isF(pair))w.appendChild(draft(pair));w.appendChild(H("div",{lang:isF(pair)?"fil":"en"},X(pair)));return w}
 function lessonKey(mod,n){if(!n)return null;if(n<=2)return mod==="ai"?"ai"+n:"cy"+n;return (mod==="ai"?"ai":"cy")+"-l"+(n<10?"0":"")+n}
 m.appendChild(h("p",{class:"kicker",text:d.qs&&!d.steps?T("Unit test","Unit test"):d.sec?T("Module project","Proyekto ng module"):T("Lesson","Aralin")+(d.n?" "+d.n:"")}));
 var tt=h("h1",{class:"page-title"});tt.innerHTML=X(d.title);m.appendChild(tt);
 if(fil)m.appendChild(h("p",{class:"draft-note",role:"note",text:"Filipino: DRAFT — para sa native-speaker review. Puwedeng may mali pa ang salin. · Filipino is a draft for native-speaker review."}));
 if(d.min||d.csta&&d.csta.length)m.appendChild(h("p",{class:"muted",text:(d.min?"~"+d.min+" min":"")+(d.csta&&d.csta.length?" · CSTA "+d.csta.join(", "):"")}));
 (d.notes||[]).forEach(function(n){m.appendChild(blk(n,"deep-note"))});
 /* ---- one multiple-choice question with letter feedback ---- */
 var stats={ok:0,n:0};
 function mcq(q,k,label,onDone){
  var box=h("div",{class:"quiz deep-q"}),qq=[q.q[0],q.q[1]],ch=isF(qq)&&q.ch[1].length?q.ch[1]:q.ch[0],F=isF(qq);
  box.appendChild(h("p",{class:"kicker",text:label}));if(F)box.appendChild(draft(qq));
  box.appendChild(H("p",{class:"quiz-q"},X(qq)));
  var list=h("div",{class:"choices",role:"group"}),fb=h("div",{role:"status","aria-live":"polite"}),first=true,done=false;
  ch.forEach(function(c,j){var b=h("button",{type:"button",class:"choice","aria-pressed":"false",onclick:function(){if(done)return;
    [].forEach.call(list.children,function(x){x.classList.remove("selected","wrong");x.setAttribute("aria-pressed","false")});b.setAttribute("aria-pressed","true");fb.innerHTML="";
    if(j===q.a){done=true;b.classList.add("correct");if(first)stats.ok++;stats.n++;fb.appendChild(H("div",{class:"fb-good"},"<strong>"+T("Right!","Tama!")+"</strong> "+X(q.why)+(q.pk&&X(q.pk)?"<br><span class='deep-pk'>"+T("If you picked another: ","Kung iba ang pinili mo: ")+X(q.pk)+"</span>":"")));onDone&&onDone()}
    else{first=false;b.classList.add("wrong");fb.appendChild(h("div",{class:"fb-soft",text:T("Not quite — that's okay. Try another choice.","Hindi pa — ayos lang. Subukan ang ibang sagot.")}))}}});
   b.innerHTML="<span class='deep-letter'>"+"ABCD".charAt(j)+")</span> "+c;list.appendChild(b)});
  box.appendChild(list);box.appendChild(fb);return box}
 /* ---- written answer: memory only, crisis check on input and blur ---- */
 function written(w,i){
  var sec=h("section",{class:"card deep-sec"},[h("h2",{text:T("Explain your thinking","Ipaliwanag ang iniisip mo")})]);
  sec.appendChild(blk(w.p));
  var tid="deep-w-"+i,ta=h("textarea",{id:tid,class:"text-input deep-ta",rows:"5",autocomplete:"off",spellcheck:"true","aria-describedby":tid+"-n"});
  sec.appendChild(h("label",{for:tid,class:"field-label",text:T("Your answer","Ang sagot mo")}));sec.appendChild(ta);
  sec.appendChild(h("p",{id:tid+"-n",class:"muted note-line",text:T("Your answer stays on this phone and is never sent or saved.","Nananatili sa phone na ito ang sagot mo at hindi ipinapadala o sine-save.")+(fil?" (FIL: DRAFT)":"")}));
  var help=h("div",{class:"deep-help",hidden:""},[h("button",{type:"button",class:"btn need-help-btn",onclick:function(){A.teacherCard()}},[A.ico("help",""),T("Need help?","Kailangan ng tulong?")]),h("p",{text:T("You're not alone. A trusted adult can help.","Hindi ka nag-iisa. May adultong puwedeng tumulong.")})]);
  sec.appendChild(help);
  function chk(){var c=isCrisis(ta.value);if(c)help.removeAttribute("hidden");else help.setAttribute("hidden","")}
  ta.addEventListener("input",chk);ta.addEventListener("blur",chk);
  sec.appendChild(h("div",{class:"quiz-actions"},[h("button",{type:"button",class:"btn btn-outline",text:T("Show my teacher","Ipakita sa titser"),onclick:function(){showTeacher(ta.value)}}),h("button",{type:"button",class:"btn btn-outline",text:T("Clear","Burahin"),onclick:function(){ta.value="";chk();ta.focus()}})]));
  checks(sec,w.ck);return sec}
 function checks(sec,ck){var list=isF(ck)&&ck[1].length?ck[1]:ck[0];if(!list||!list.length)return;sec.appendChild(h("h3",{text:T("Check yourself","Suriin ang sarili")}));if(isF(ck)&&ck[1].length)sec.appendChild(draft(ck));
  var ul=h("ul",{class:"deep-checks"});list.forEach(function(x,j){var cid="ck-"+Math.random().toString(36).slice(2,8);ul.appendChild(h("li",{},[h("input",{type:"checkbox",id:cid}),H("label",{for:cid},x)]))});sec.appendChild(ul)}
 function showTeacher(text){var o=h("div",{class:"overlay deep-show",role:"dialog","aria-modal":"true","aria-label":T("Answer for my teacher","Sagot para sa titser")});
  var close=h("button",{type:"button",class:"btn btn-solid",text:T("Close","Isara"),onclick:function(){o.remove()}});
  o.appendChild(h("div",{class:"deep-show-in"},[h("p",{class:"deep-show-t",text:text||T("(No answer yet)","(Wala pang sagot)")}),close]));
  o.addEventListener("keydown",function(e){if(e.key==="Escape")o.remove()});document.body.appendChild(o);close.focus()}
 function safetyBox(s){var b=h("aside",{class:"deep-safety",role:"note"},[h("p",{class:"kicker",text:T("Safety","Kaligtasan")})]);b.appendChild(blk(s));return b}
 /* ---- lesson ---- */
 if(d.steps){
  A.up(id,1);A.st.last=id;A.save(A.st);
  d.steps.forEach(function(s,i){var c=h("section",{class:"step-card deep-step"},[h("div",{class:"art","aria-hidden":"true",text:s.icon}),h("p",{class:"kicker",text:T("Step ","Hakbang ")+(i+1)+"/"+d.steps.length})]);
   c.appendChild(H("h2",{},s.h));c.appendChild(blk(s.t));
   if(s.box){var bx=h("div",{class:"deep-note"});bx.appendChild(H("h3",{},s.box.h));bx.appendChild(blk(s.box.t));c.appendChild(bx)}
   m.appendChild(c);
   /* AI L13: the safety lines stay always open, read in order right after Step 4 (Child Safety). */
   if(d.safety&&((id==="ai-l13"&&i===3)||(id!=="ai-l13"&&i===d.steps.length-1)))m.appendChild(safetyBox(d.safety))});
  var pr=h("section",{class:"deep-sec"},[h("h2",{text:T("Practice","Pagsasanay")})]);m.appendChild(pr);
  var left=d.qs.length;d.qs.forEach(function(q,k){pr.appendChild(mcq(q,k,T("Question ","Tanong ")+(k+1)+"/"+d.qs.length,function(){left--;if(!left){A.up(id,stats.ok===d.qs.length?3:2)}}))});
  if(d.written)m.appendChild(written(d.written,0));
  var gd=h("section",{class:"card deep-sec"},[h("h2",{text:T("Go deeper","Palalimin pa")})]);
  if(d.deeper.concept){gd.appendChild(H("h3",{},"🧠 "+(d.deeper.concept.h||T("Key idea","Pangunahing ideya"))));gd.appendChild(blk(d.deeper.concept.t))}
  d.deeper.qs.forEach(function(q,k){gd.appendChild(mcq(q,k,T("Harder question ","Mas mahirap na tanong ")+(k+1)))});
  var hd=d.deeper.hands;if(hd){gd.appendChild(h("h3",{text:"🛠️ "+T("Hands-on","Gawain")+" "+String(hd.h||"").replace(/<[^>]+>/g,"")}));gd.appendChild(blk(hd.t));checks(gd,hd.ck)}
  m.appendChild(gd);
  var nx=A.nextAfter(id);m.appendChild(h("div",{class:"quiz-actions"},[h("a",{class:"btn btn-solid",href:nx?A.href(nx):"index.html",text:nx?T("Next activity","Susunod na gawain"):T("Done","Tapos")})]));
 }
 /* ---- unit test: answer all, then score and explanations ---- */
 else if(d.qs){
  if(d.intro)m.appendChild(blk(d.intro,"deep-note"));
  m.appendChild(h("p",{class:"muted",text:T("Pass mark: ","Pasadong iskor: ")+d.pass+"/"+d.qs.length+" (80%)"}));
  var sel=[],items=[];
  d.qs.forEach(function(q,k){var qq=q.q,F=isF(qq),ch=F&&q.ch[1].length?q.ch[1]:q.ch[0],box=h("div",{class:"quiz deep-q"});
   box.appendChild(h("p",{class:"kicker",text:T("Question ","Tanong ")+(k+1)+"/"+d.qs.length}));if(F)box.appendChild(draft(qq));
   if(q.warn)box.appendChild(blk(q.warn,"deep-safety"));
   box.appendChild(H("p",{class:"quiz-q"},X(qq)));var list=h("div",{class:"choices",role:"group"});
   ch.forEach(function(c,j){var b=h("button",{type:"button",class:"choice","aria-pressed":"false",onclick:function(){if(submitted)return;sel[k]=j;[].forEach.call(list.children,function(x){x.classList.remove("selected");x.setAttribute("aria-pressed","false")});b.classList.add("selected");b.setAttribute("aria-pressed","true");left.textContent=count()}});b.innerHTML="<span class='deep-letter'>"+"ABCD".charAt(j)+")</span> "+c;list.appendChild(b)});
   box.appendChild(list);var fb=h("div");box.appendChild(fb);items.push({list:list,fb:fb});m.appendChild(box)});
  var submitted=false,left=h("p",{class:"muted",role:"status"}),res=h("div",{tabindex:"-1"});
  function count(){var n=sel.filter(function(x){return x!=null}).length;return n+"/"+d.qs.length+" "+T("answered","nasagot")}
  left.textContent=count();
  var sub=h("button",{type:"button",class:"btn btn-solid",text:T("Check my answers","Tingnan ang mga sagot ko"),onclick:function(){
   if(submitted)return;submitted=true;var ok=0;d.qs.forEach(function(q,k){var right=sel[k]===q.a;if(right)ok++;var it=items[k];[].forEach.call(it.list.children,function(b,j){if(j===q.a)b.classList.add("correct");else if(j===sel[k])b.classList.add("wrong")});
     it.fb.appendChild(H("div",{class:right?"fb-good":"fb-soft"},"<strong>"+(right?T("Right. ","Tama. "):T("Answer: ","Sagot: ")+"ABCD".charAt(q.a)+". ")+"</strong>"+X(q.why)));
     var key=lessonKey(d.m,q.l);if(right&&key&&D.lessons[key])A.up(key,4)});
   A.st.pts+=ok*10;A.save(A.st);var pass=ok>=d.pass;res.innerHTML="";
   res.appendChild(h("div",{class:"quiz"},[h("h2",{text:ok+"/"+d.qs.length+" · "+(pass?T("You passed!","Pasado ka!"):T("Not yet — review and try again.","Hindi pa — balikan at subukan ulit."))}),h("p",{class:"muted",text:T("Explanations are under each question.","Nasa ilalim ng bawat tanong ang paliwanag.")}),h("div",{class:"quiz-actions"},[h("button",{type:"button",class:"btn btn-outline",text:T("Try again","Subukan ulit"),onclick:function(){location.reload()}}),h("a",{class:"btn btn-solid",href:"index.html",text:T("Back to courses","Bumalik sa mga kurso")})])]));
   sub.remove();res.focus()}});
  m.appendChild(left);m.appendChild(h("div",{class:"quiz-actions"},[sub]));m.appendChild(res);
 }
 /* ---- module project ---- */
 else if(d.sec){
  A.up(id,1);
  d.sec.forEach(function(s){var c=h("section",{class:"card deep-sec"});c.appendChild(H("h2",{},s.h));if(X(s.t))c.appendChild(blk(s.t));
   s.sub.forEach(function(u){c.appendChild(H("h3",{},u.h));c.appendChild(blk(u.t))});m.appendChild(c)});
  m.appendChild(h("div",{class:"quiz-actions"},[h("a",{class:"btn btn-solid",href:"index.html",text:T("Back to courses","Bumalik sa mga kurso")})]));
 }
};
})();
