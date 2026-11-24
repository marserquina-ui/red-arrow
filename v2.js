(function(){
var D=RA2,K="ra2";if(typeof RA2SIMS_V3!=="undefined")D.sims=RA2.sims=RA2SIMS_V3;
 if(window.RA2Art){D.diagramFiles=RA2Art.diagramFiles||D.diagramFiles;D.art=D.art||{};D.art.captions=RA2Art.captions||D.art.captions}
 function ico(name,alt){return h("img",{class:"ui-ic",src:"art/icons/"+name+".svg",alt:alt||"",width:"24",height:"24"})}
 function lsGet(k,d){try{var v=localStorage.getItem(k);return v===null?d:v}catch(e){return d}}
 function lsSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}
 var badgeArt={hinog:"mango-sorter",factcheck:"fact-checker",hotline:"scam-buster",soc:"soc-analyst",wifi:"wifi-fixer",pc:"pc-builder"};
function S(){try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return{}}}
function save(s){try{localStorage.setItem(K,JSON.stringify(s))}catch(e){}}
var st=S();st.m=st.m||{};st.pass=st.pass||{};st.pts=st.pts||0;st.badges=st.badges||[];
var LV=["Not started","Attempted","Familiar","Proficient","Mastered"],LVF=["Hindi pa nasisimulan","Sinubukan","Pamilyar","Mahusay","Dalubhasa"];
var fil=lsGet("ra-lang","en")==="fil";
function lv(n){return (fil?LVF:LV)[n||0]}
function up(id,n){if((st.m[id]||0)<n){st.m[id]=n;save(st)}}
function T(en,f){return fil&&f?f:en}
 function uiState(update){var k="ra-ui",o={};try{o=JSON.parse(sessionStorage.getItem(k)||"{}")}catch(e){o={}}if(update){for(var x in update)o[x]=update[x];o.href=location.pathname+location.search;try{sessionStorage.setItem(k,JSON.stringify(o))}catch(e){}}return o.href===location.pathname+location.search?o:{}}
function h(t,a,c){var e=document.createElement(t);if(a)for(var k in a){if(k=="html")e.innerHTML=a[k];else if(k=="text")e.textContent=a[k];else if(k.slice(0,2)=="on")e.addEventListener(k.slice(2),a[k]);else e.setAttribute(k,a[k])}(c||[]).forEach(function(x){x&&e.appendChild(typeof x=="string"?document.createTextNode(x):x)});return e}
function q(k){return new URLSearchParams(location.search).get(k)}
function title(type,id){if(type=="lesson")return T(D.lessons[id].title,D.lessons[id].titleFil||D.lessons[id].title_fil);if(type=="sim")return T(D.sims[id].title,D.sims[id].titleFil||D.sims[id].title_fil);if(type=="quiz")return T(D.quizzes[id].title,D.quizzes[id].titleFil||D.quizzes[id].title_fil);return T("Unit test","Unit test")}
var icons={lesson:"lesson",sim:"simulation",quiz:"quiz",unit:"unit-test"};
function href(it){return it.type=="lesson"?"lesson.html?id="+it.id:it.type=="sim"?"sim.html?id="+it.id:"practice.html?id="+it.id}
function lastUiFor(it){var o={};try{o=JSON.parse(sessionStorage.getItem("ra-ui")||"{}")||{}}catch(e){o={}}var path=href(it);return (o.href&&path&&String(o.href).indexOf(path)>=0)?o:{}}
function continueStepLabel(it){var saved=lastUiFor(it);if(it.type==="lesson"){var cards=(D.lessons[it.id]&&D.lessons[it.id].cards)||[];var n=cards.length,i=n?Math.min(n,Math.max(1,(saved.lessonI||0)+1)):0;return n?(" — "+T("Step ","Hakbang ")+i+"/"+n):""}if(it.type==="sim"){var s=D.sims[it.id]||{},n=(s.steps&&s.steps.length)||0,i=n?Math.min(n,Math.max(1,(saved.step||0)+1)):0;return n?(" — "+T("Step ","Hakbang ")+i+"/"+n):""}return ""}
function lvlTag(id){var n=st.m[id]||0;return h("span",{class:"lvl l"+n,text:lv(n)})}
function stepLang(s){return{q:T(s.q,s.q_fil||s.qf),choices:(fil&&(s.choices_fil||s.choicesFil))||s.choices,hints:(fil&&(s.hints_fil||s.hintsFil))||s.hints,explain:T(s.explain,s.explain_fil||s.explainFil),a:s.a,lesson:s.lesson,ui:s.ui}}
function cardArt(lessonId,idx,c){var emoji=c.icon||c[0]||"";var key=lessonId+"-"+(idx+1);var src=(D.diagramFiles&&D.diagramFiles[key])||(D.art&&D.art.diagrams&&D.art.diagrams[key]);var cap=D.art&&D.art.captions&&(D.art.captions[key]||D.art.captions[src]);var alt=cap?T(cap.en||cap.en_alt||cap.alt_en||"",cap.fil||cap.fil_alt||cap.alt_fil||""):"";var wrap=h("div",{class:"art"});if(src){var img=h("img",{class:"diagram",src:src,alt:alt||emoji});img.addEventListener("error",function(){wrap.innerHTML="";wrap.setAttribute("aria-hidden","true");wrap.textContent=emoji});wrap.appendChild(img);var marks=cap&&cap.markers||[];if(marks.length){var ol=h("ol",{class:"diagram-key"});marks.forEach(function(m){ol.appendChild(h("li",{},[h("span",{class:"mk",text:String(m.n||"")}),document.createTextNode(" "+T(m.en||"",m.fil||""))]))});wrap.appendChild(ol)}}else{wrap.setAttribute("aria-hidden","true");wrap.textContent=emoji}return wrap}
var faqFilState="idle",faqFilWait=[];
function ensureFaqFil(cb){
  if(window.RA2FaqFil){mergeFaqFil();faqFilState="ready";cb&&cb(true);return}
  if(faqFilState==="ready"){cb&&cb(true);return}
  if(faqFilState==="failed"){cb&&cb(false);return}
  if(cb)faqFilWait.push(cb);
  if(faqFilState==="loading")return;
  faqFilState="loading";
  var s=document.createElement("script");s.src="askmar/faq-fil.js";
  var done=false;
  function finish(ok){if(done)return;done=true;clearTimeout(tid);if(ok){mergeFaqFil();faqFilState="ready"}else faqFilState="failed";var q=faqFilWait.slice();faqFilWait=[];q.forEach(function(fn){try{fn(ok)}catch(e){}})}
  s.onload=function(){finish(!!window.RA2FaqFil)};
  s.onerror=function(){finish(false)};
  var tid=setTimeout(function(){finish(false)},8000);
  document.head.appendChild(s)}
function mergeFaqFil(){var extra=window.RA2FaqFil||D.faqFil;if(!extra)return;var list=extra.faq||extra;if(!Array.isArray(list))return;list.forEach(function(src){var hit=D.faq.filter(function(f){if(src.id&&f.id===src.id)return true;if(src.k&&f.k)return src.k.some(function(k){return f.k.indexOf(k)>=0});return false})[0];if(hit){if(src.af)hit.af=src.af;if(src.backf)hit.backf=src.backf;if(src.k)hit.k=src.k;if(src.p)hit.p=src.p;if(src.id&&!hit.id)hit.id=src.id;if(src.a&&!hit.a)hit.a=src.a;if(src.back&&!hit.back)hit.back=src.back;if(src.link)hit.link=src.link}else if(src.k&&(src.a||src.af))D.faq.push(src)})}
function fmtNcmh(tel){var d=String(tel).replace(/\D/g,"");if(d==="09190571553")return "0919-057-1553";if(d==="09178998727")return "0917-899-8727";if(d==="180018881553")return "1800-1888-1553";if(d.length===11&&d[0]==="0")return d.slice(0,4)+"-"+d.slice(4,7)+"-"+d.slice(7);if(d.length===13&&d.slice(0,4)==="1800")return d.slice(0,4)+"-"+d.slice(4,8)+"-"+d.slice(8);return tel}
function helpUnverified(){var t=D.help&&D.help.tested;if(!t)return true;return Object.keys(t).some(function(k){return !t[k]})}
function unverifiedNote(){return h("p",{class:"unverified-note",text:T("Not yet verified by the school","Hindi pa nasusuri ng paaralan")})}
function teacherCard(opts){
 opts=(opts&&opts.fromAsk)?opts:{};
 var existing=document.querySelector(".overlay");if(existing){var et=existing.querySelector("#help-title");if(et)et.focus();return}
 var H=D.help,pending=helpUnverified(),opener=document.activeElement,o;
 function close(){
  o.removeEventListener("keydown",onKey);o.remove();document.documentElement.classList.remove("has-overlay");
  [].forEach.call(document.body.children,function(el){if(el._raInert){el.removeAttribute("inert");el.removeAttribute("aria-hidden");el._raInert=false}});
  /* Shared phones: clear typed questions, and clear the chat if the card opened from Ask Mar. */
  document.querySelectorAll(".ask-in,.home-ask-in").forEach(function(i){i.value=""});
  if(opts.fromAsk){document.querySelectorAll(".chat").forEach(function(c){c.innerHTML=""});document.querySelectorAll(".home-ask-results,.home-live").forEach(function(c){c.innerHTML=""})}
  if(opener&&opener.isConnected&&opener.focus&&opener!==document.body)opener.focus();else{var mm=document.getElementById("main");if(mm)mm.focus()}}
 function onKey(e){
  if(e.key==="Escape"){e.preventDefault();close();return}
  if(e.key!=="Tab")return;
  var f=[].filter.call(o.querySelectorAll("a[href],button:not([disabled]),[tabindex]"),function(x){return x.getAttribute("tabindex")!=="-1"&&!x.closest("[hidden]")});
  if(!f.length)return;var first=f[0],last=f[f.length-1],a=document.activeElement;
  if(e.shiftKey&&(a===first||a===title||!o.contains(a))){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&(a===last||!o.contains(a))){e.preventDefault();first.focus()}}
 var title=h("h2",{id:"help-title",tabindex:"-1",text:T("You're not alone","Hindi ka nag-iisa")});
 var closeTop=h("button",{type:"button",class:"btn btn-outline overlay-close",onclick:close},[ico("close",""),h("span",{text:T("Close","Isara")})]);
 var guideNote=h("p",{class:"muted help-guide-note",id:"help-guide-note",hidden:"hidden",text:H.guidance||T("Ask any teacher to take you to the guidance office or the Child Protection Committee today.","Magpasama sa kahit sinong guro papunta sa guidance office o Child Protection Committee ngayon.")});
 var guideBtn=h("button",{type:"button",class:"btn btn-outline big","aria-expanded":"false","aria-controls":"help-guide-note",onclick:function(){var show=guideNote.hidden;guideNote.hidden=!show;guideBtn.setAttribute("aria-expanded",show?"true":"false")}},[ico("teacher",""),T("Child Protection Committee / Guidance","Child Protection Committee / Guidance")]);
 var body=[
  h("div",{class:"overlay-head"},[title,closeTop]),
  h("p",{class:"muted",text:T("Help is one tap away. These numbers are free or standard-rate.","Isang tap lang ang tulong. Libre o regular-rate ang mga numerong ito.")}),
  h("p",{text:T("Please talk to a parent, a teacher or the guidance office today. You did nothing wrong by asking for help.","Kausapin ang magulang, guro o guidance office ngayon. Walang mali sa paghingi ng tulong.")}),
  h("a",{class:"btn btn-solid big",href:"tel:911"},[ico("alert",""),h("span",{class:"help-btn-copy"},[h("span",{class:"help-btn-label",text:T("Call","Tumawag sa")}),h("span",{class:"help-tel",text:"911"}),h("span",{class:"help-btn-label",text:T(" — immediate danger"," — agarang panganib")})])]),
  h("p",{class:"overlay-label",text:T("NCMH Crisis Hotline (24/7)","NCMH Crisis Hotline (24/7)")})]
  .concat(pending?[unverifiedNote()]:[])
  /* Guidance office must test each number before launch and record the date (see RA2.help.tested). */
  .concat(H.ncmh.map(function(n){return h("a",{class:"btn btn-outline big help-outline",href:"tel:"+n.tel},[ico("phone",""),h("span",{class:"help-btn-copy"},[h("span",{class:"help-btn-label",text:T("Call NCMH","Tawagan ang NCMH")+" ("+n.label+")"}),h("span",{class:"help-tel",text:fmtNcmh(n.tel)})])])}))
  .concat([
  h("a",{class:"btn btn-outline big help-outline",href:H.bantayBataUrl||H.bantayBataFallback,target:"_blank",rel:"noopener noreferrer"},[ico("phone",""),T("Message Bantay Bata","Mag-message sa Bantay Bata")]),
  pending?unverifiedNote():null,
  h("p",{class:"overlay-label",text:T("Online threats, sextortion or a stolen account","Online na banta, sextortion o nanakaw na account")}),
  h("a",{class:"btn btn-outline big help-outline",href:"tel:"+H.pnpAcg.tel},[ico("shield",""),h("span",{class:"help-btn-copy"},[h("span",{class:"help-btn-label",text:"PNP Anti-Cybercrime Group"}),h("span",{class:"help-tel",text:H.pnpAcg.display})])]),
  pending?unverifiedNote():null,
  /* DepEd Order 40 route for bullying */
  guideBtn,guideNote,
  h("button",{type:"button",class:"btn btn-outline big overlay-done",onclick:close,text:T("Close","Isara")})]);
 o=h("div",{class:"overlay",role:"dialog","aria-modal":"true","aria-labelledby":"help-title"},[h("div",{class:"overlay-inner"},body)]);
 [].forEach.call(document.body.children,function(el){if(!el.hasAttribute("inert")&&el.tagName!=="SCRIPT"){el.setAttribute("inert","");el.setAttribute("aria-hidden","true");el._raInert=true}});
 document.body.appendChild(o);document.documentElement.classList.add("has-overlay");o.addEventListener("keydown",onKey);title.focus()}
window.RA2open=teacherCard;
/* question runner: one at a time, progressive hints, check/try again, worked explanation */
function runner(root,steps,opts){var saved=uiState(),i=Math.min(steps.length-1,Math.max(0,saved.step||0)),first=Array.isArray(saved.first)?saved.first.slice():[],pts=saved.pts||0;
 function snap(){uiState({step:i,pts:pts,first:first})} snap();
 function dots(){if(steps.length<2)return document.createComment("single-step");return h("div",{class:"dots","aria-label":"Step "+(i+1)+" of "+steps.length},steps.map(function(_,j){return h("i",{class:j<i?"on":j==i?"cur":""})}))}
 function show(){snap();root.innerHTML="";if(opts&&opts.onStep)opts.onStep(i);var s=stepLang(steps[i]),sel=null,hn=0,tries=0,chk;function armCheck(on){if(on){chk.removeAttribute("aria-disabled");chk.classList.remove("is-wait")}else{chk.setAttribute("aria-disabled","true");chk.classList.add("is-wait")}}root.appendChild(dots());
  var wrap=h("div",{class:"sim2"}),scen=h("div",{class:"scen quiz"},[h("p",{class:"kicker",text:T("Scenario","Sitwasyon")+" "+(i+1)+"/"+steps.length}),h("p",{class:"quiz-q",text:s.q})]),card=h("div",{class:"quiz"});wrap.appendChild(scen);wrap.appendChild(card);
  var list=h("div",{class:"choices"});s.choices.forEach(function(c,j){var b=h("button",{type:"button",class:"choice","aria-pressed":"false",text:(j+1)+". "+c,onclick:function(){if(done)return;sel=j;[].forEach.call(list.children,function(x){x.classList.remove("selected");x.setAttribute("aria-pressed","false")});b.classList.add("selected");b.setAttribute("aria-pressed","true");armCheck(true)}});list.appendChild(b)});card.appendChild(list);
  var hints=h("div",{"aria-live":"polite"}),fb=h("div",{role:"status","aria-live":"polite"}),done=false;card.appendChild(hints);
  var hb=h("button",{type:"button",class:"btn btn-outline",title:T("Using a hint lowers this answer from 10 points to 5","Bababa sa 5 ang puntos ng sagot na ito mula 10 kapag gumamit ng pahiwatig"),onclick:function(){if(hn<s.hints.length){hints.appendChild(h("div",{class:"hint"},[ico("hint",""),h("span",{text:s.hints[hn]})]));hn++}if(hn>=s.hints.length)hb.disabled=true}},[ico("hint",""),T("Hint (costs 5 pts)","Pahiwatig (bawas 5 pts)")]);
  chk=h("button",{type:"button",class:"btn btn-solid is-wait",text:T("Check","Tingnan"),"aria-disabled":"true",onclick:function(){fb.innerHTML="";if(sel===null){fb.appendChild(h("div",{class:"fb-soft",text:T("Pick an answer first","Pumili muna ng sagot")}));return}tries++;if(sel===s.a){done=true;if(tries==1&&hn==0){first[i]=true;pts+=10}else{first[i]=false;pts+=5};
     fb.appendChild(h("div",{class:"fb-good",html:"<strong>"+T("Nice work!","Magaling!")+"</strong> "+s.explain}));chk.remove();hb.remove();var nxb=h("button",{type:"button",class:"btn btn-solid",text:i+1<steps.length?T("Next","Susunod"):T("Finish","Tapusin"),onclick:function(){i++;i<steps.length?show():end()}});act.appendChild(nxb);nxb.focus({preventScroll:true})}
    else{first[i]=false;fb.appendChild(h("div",{class:"fb-soft",html:"<strong>"+T("Not quite — that's okay.","Hindi pa — ayos lang.")+"</strong> "+T("Here's how to think about it: ","Ganito ang pag-isip: ")+s.explain}));
     if(s.lesson&&opts.linkLesson)fb.firstChild.appendChild(h("div",{},[h("a",{href:"lesson.html?id="+s.lesson,text:T("Review the lesson: ","Balikan: ")+D.lessons[s.lesson].title})]));chk.textContent=T("Try again","Subukan ulit")}}});
  var act=h("div",{class:"quiz-actions"},[hb,chk]);card.appendChild(fb);card.appendChild(act);root.appendChild(wrap);if(opts&&opts.onActions)opts.onActions(act);
  root._key=function(e){if(e.target.tagName=="INPUT"||document.querySelector(".overlay"))return;var n=parseInt(e.key,10);if(n>=1&&n<=s.choices.length&&!done){list.children[n-1].click();e.preventDefault()}else if(e.key=="Enter"){var nb=act.querySelector("button:last-child");if(nb&&!nb.disabled){nb.click();e.preventDefault()}}else if((e.key=="h"||e.key=="H")&&hb.isConnected&&!hb.disabled){hb.click()}}}
 if(!root._bound){root._bound=1;document.addEventListener("keydown",function(e){root._key&&root._key(e)})}
 function end(){root._key=null;var ok=first.filter(Boolean).length;uiState({step:0,pts:0,first:[]});if(opts&&opts.onEnd)opts.onEnd(ok,steps.length,pts,first)}
 show()}
function currentTheme(){try{if(localStorage.getItem("ra-proj")==="1")return "light";var t=localStorage.getItem("ra-theme");if(t==="light"||t==="dark")return t}catch(e){}return (window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches)?"dark":"light"}
function applyTheme(t){try{if(localStorage.getItem("ra-proj")==="1")t="light"}catch(e){}document.documentElement.setAttribute("data-theme",t||"light");try{localStorage.setItem("ra-theme",t)}catch(e){}}
function themeBtn(){var dark=currentTheme()==="dark";return h("button",{type:"button",class:"nav-toggle header-tool theme-toggle","aria-label":dark?T("Switch to light","Lumipat sa light"):T("Switch to dark","Lumipat sa dark"),title:dark?"Light":"Dark",onclick:function(){var next=currentTheme()==="dark"?"light":"dark";applyTheme(next);location.reload()}},[ico(dark?"learn":"me",""),h("span",{class:"tool-label","aria-hidden":"true",text:dark?"Light":"Dark"})])}
function privacyFooter(){var f=h("footer",{class:"site-footer"},[h("p",{},[h("a",{class:"about-link about-link-ft",href:"about.html",text:T("About this site","Tungkol sa site")})]),h("p",{text:T("Preview only — not for class use yet. Progress stays on this device. This site does not collect names, emails, phone numbers or LRNs. Ask Mar questions aren't saved.","Preview lang — hindi pa para sa klase. Sa device na ito lang ang progress. Hindi kumukuha ang site ng pangalan, email, numero o LRN. Hindi sine-save ang mga tanong kay Ask Mar.")}),h("p",{text:T("This site is hosted on GitHub Pages, which may log visitors' IP addresses. We don't collect anything.","Naka-host ang site na ito sa GitHub Pages, na maaaring mag-log ng IP address ng bisita. Wala kaming kinokolekta.")}),h("p",{text:T("Most lessons and other educational content are CC BY-SA 4.0. A few lessons adapted from MIT OpenCourseWare are CC BY-NC-SA 4.0: you may share and adapt them for non-commercial use with credit, but you may not sell them. Each adapted lesson has its own credit line.","CC BY-SA 4.0 ang karamihan ng aralin at iba pang educational content. Ang ilang aralin na hango sa MIT OpenCourseWare ay CC BY-NC-SA 4.0: puwede mo itong i-share at i-adapt para sa di-komersyal na gamit kung may credit, pero hindi mo ito puwedeng ibenta. May sariling credit line ang bawat hango na aralin.")})]);document.body.appendChild(f)}
function shell(){
 var pg=document.body.dataset.page||"home",sect={home:"index.html",lesson:"index.html",sim:"index.html",practice:"index.html",ask:"ask.html",profile:"profile.html",teacher:"teacher.html",about:"about.html"}[pg]||"index.html";
 var nav=[["index.html","learn",T("Learn","Aralin")],["ask.html","ask-mar","Ask Mar"],["profile.html","me",T("Me","Ako")],["teacher.html","teacher",T("Teacher","Guro")]];
 var langBtn=h("button",{type:"button",class:"nav-toggle header-tool lang-toggle","aria-label":fil?T("Switch to English","Lumipat sa English"):T("Switch to Filipino","Lumipat sa Filipino"),title:fil?"English":"Filipino",onclick:function(){uiState({});lsSet("ra-lang",fil?"en":"fil");location.reload()}},[ico("language",""),h("span",{class:"tool-label","aria-hidden":"true",text:fil?"EN":"FIL"})]);
 var _dark=currentTheme()==="dark";
 var themeBtn=h("button",{type:"button",class:"nav-toggle header-tool theme-toggle","aria-label":_dark?T("Light mode","Light mode"):T("Dark mode","Dark mode"),title:_dark?"Light":"Dark",onclick:function(){applyTheme(_dark?"light":"dark");location.reload()}},[ico(_dark?"learn":"me",""),h("span",{class:"tool-label","aria-hidden":"true",text:_dark?"Light":"Dark"})]);
 var askBtn=h("a",{class:"nav-toggle header-tool",href:"ask.html","aria-label":"Ask Mar",title:"Ask Mar"},[ico("ask-mar",""),h("span",{class:"tool-label","aria-hidden":"true",text:"Ask Mar"})]);
 var helpHdr=h("button",{type:"button",class:"nav-toggle header-tool",onclick:function(){teacherCard()},"aria-label":T("Help","Tulong"),title:T("Help","Tulong")},[ico("help",""),h("span",{class:"tool-label","aria-hidden":"true",text:T("Help","Tulong")})]);
 var aboutLnk=h("a",{class:"nav-toggle header-tool about-link",href:"about.html","aria-label":T("About","Tungkol"),title:T("About this site","Tungkol sa site")},[ico("message",""),h("span",{class:"tool-label","aria-hidden":"true",text:T("About","Tungkol")})]);
 if(pg==="about")aboutLnk.setAttribute("aria-current","page");
 var skip=h("a",{class:"skip-link",href:"#main",text:T("Skip to content","Laktawan papunta sa nilalaman")});
 var tabs=h("ul",{class:"tabbar-list"},nav.map(function(n){var on=n[0]===sect,a={href:n[0],class:"tab-link"+(on?" is-active":"")};if(on)a["aria-current"]=(pg==="lesson"||pg==="sim"||pg==="practice")?"true":"page";return h("li",{class:n[0]==="ask.html"?"tab-ask":""},[h("a",a,[ico(n[1],""),h("span",{class:"tab-label",text:n[2]})])])}));
 var hd=h("header",{class:"site-header"},[h("div",{class:"header-inner"},[h("a",{class:"logo",href:"index.html",html:'<img src="assets/logo.svg" width="36" height="36" alt=""><span class="logo-text"><strong>Red Arrow Hub</strong><span>San Nicolas, Pangasinan</span></span>'}),
  h("div",{class:"header-actions"},[askBtn,helpHdr,aboutLnk,langBtn,themeBtn,D.filipinoDraft?h("span",{class:"fil-draft-note",text:T("Filipino: draft, under teacher review","Burador pa, sinusuri ng guro")}):null])]),
  h("nav",{class:"tabbar","aria-label":T("Sections","Mga seksyon")},[tabs])]);
 document.body.prepend(hd);document.body.prepend(skip);if(D.filipinoDraft&&fil)document.body.prepend(h("div",{class:"draft-banner is-shown",text:"Draft na salin — pakisuri ng native speaker."}))}
function boot(){
 var pg=document.body.dataset.page||"home";
 shell();
 if(pg==="home")renderHome();
 else if(pg==="lesson")renderLesson();
 else if(pg==="sim")renderSim();
 else if(pg==="practice")renderPractice();
 else if(pg==="ask")renderAsk();
 else if(pg==="profile")renderProfile();
 else if(pg==="teacher")renderTeacher();
 else if(pg==="about")renderAbout();
 privacyFooter();
}
function renderHome(){var main=document.getElementById("main");if(!main||typeof RA2==="undefined")return;main.innerHTML="";var courses=RA2.courses||[];main.appendChild(h("h1",{text:T("Red Arrow Hub","Red Arrow Hub")}));courses.forEach(function(c){var card=h("a",{class:"course-card",href:"index.html?course="+c.id});card.appendChild(h("img",{src:"art/courses/"+c.id+".svg",alt:""}));card.appendChild(h("div",{},[h("h2",{text:T(c.title,c.titleFil||c.title)}),h("p",{text:T(c.blurb,c.blurbFil||c.blurb)})]));main.appendChild(card)})}
function renderLesson(){}
function renderSim(){}
function renderPractice(){}
function renderAsk(){}
function renderProfile(){}
function renderTeacher(){}
function renderAbout(){}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();
