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
  .concat(H.ncmh.map(function(n){return h("a",{class:"btn btn-outline big",href:"tel:"+n.tel},[ico("phone",""),h("span",{class:"help-btn-copy"},[h("span",{class:"help-btn-label",text:T("Call NCMH","Tawagan ang NCMH")+" ("+n.label+")"}),h("span",{class:"help-tel",text:fmtNcmh(n.tel)})])])}))
  .concat([
  h("a",{class:"btn btn-outline big",href:H.bantayBataUrl||H.bantayBataFallback,target:"_blank",rel:"noopener noreferrer"},[ico("message",""),T("Message Bantay Bata","Mag-message sa Bantay Bata")]),
  pending?unverifiedNote():null,
  h("p",{class:"overlay-label",text:T("Online threats, sextortion or a stolen account","Online na banta, sextortion o nanakaw na account")}),
  h("a",{class:"btn btn-outline big",href:"tel:"+H.pnpAcg.tel},[ico("shield",""),h("span",{class:"help-btn-copy"},[h("span",{class:"help-btn-label",text:"PNP Anti-Cybercrime Group"}),h("span",{class:"help-tel",text:H.pnpAcg.display})])]),
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
function applyTheme(t){try{if(localStorage.getItem("ra-proj")==="1")t="light"}catch(e){}document.documentElement.setAttribute("data-theme",t||"light")}
function searchLessons(q){function bag(s){return " "+String(s).toLowerCase().replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim()+" "};var b=bag(q),hits=[];if(!b||!D.lessons)return hits;Object.keys(D.lessons).forEach(function(id){var L=D.lessons[id],blob=bag((L.title||"")+" "+(L.titleFil||"")+" "+((L.cards||[]).map(function(c){return (c.h||"")+" "+(c.hf||"")+" "+(c.t||"")+" "+(c.tf||"")}).join(" "))),s=0;b.trim().split(/\s+/).forEach(function(w){if(w.length>2&&blob.indexOf(w)>=0)s+=w.length});if(s>=3)hits.push({id:id,title:L.title,titleFil:L.titleFil,score:s})});hits.sort(function(a,c){return c.score-a.score});return hits.slice(0,6)}
function setAskOpen(open,focus){document.body.classList.toggle("ask-open",!!open);lsSet("ra-ask",open?"1":"0");var b=document.querySelector(".ask-toggle");if(b)b.setAttribute("aria-expanded",open?"true":"false");if(focus){if(open){var i=document.querySelector("#ask-side .ask-in");if(i)i.focus()}else if(b)b.focus()}}
function header(){var shell=document.getElementById("shell-header");if(shell)shell.remove();var oldSkip=document.querySelector("body > .skip-link");if(oldSkip)oldSkip.remove();
 if(lsGet("ra-proj","0")==="1")document.body.classList.add("projector");applyTheme(currentTheme());
 var pg=document.body.dataset.page||"home",sect={home:"index.html",lesson:"index.html",sim:"index.html",practice:"index.html",ask:"ask.html",profile:"profile.html",teacher:"teacher.html",about:"about.html"}[pg]||"index.html";
 var nav=[["index.html","learn",T("Learn","Aralin")],["ask.html","ask-mar","Ask Mar"],["profile.html","me",T("Me","Ako")],["teacher.html","teacher",T("Teacher","Guro")]];
 var langBtn=h("button",{type:"button",class:"nav-toggle header-tool","aria-label":fil?T("Switch to English","Lumipat sa English"):T("Switch to Filipino","Lumipat sa Filipino"),title:fil?"English":"Filipino",onclick:function(){uiState({});lsSet("ra-lang",fil?"en":"fil");location.reload()}},[ico("language",""),h("span",{class:"tool-label","aria-hidden":"true",text:fil?"EN":"Fil"})]);
 var _dark=currentTheme()==="dark";
 var themeLab=_dark?T("Light","Maliwanag"):T("Dark","Madilim");
 var themeBtn=h("button",{type:"button",class:"btn btn-outline theme-toggle nav-toggle header-tool","aria-pressed":_dark?"true":"false","aria-label":_dark?T("Switch to light theme","Lumipat sa maliwanag na tema"):T("Switch to dark theme","Lumipat sa madilim na tema"),title:themeLab,onclick:function(){var next=currentTheme()==="dark"?"light":"dark";lsSet("ra-theme",next);applyTheme(currentTheme());var d=currentTheme()==="dark";this.setAttribute("aria-pressed",d?"true":"false");var lab=d?T("Light","Maliwanag"):T("Dark","Madilim");this.title=lab;this.setAttribute("aria-label",d?T("Switch to light theme","Lumipat sa maliwanag na tema"):T("Switch to dark theme","Lumipat sa madilim na tema"));var s=this.querySelector(".tool-label");if(s)s.textContent=lab}},[h("span",{class:"theme-ic","aria-hidden":"true"}),h("span",{class:"tool-label","aria-hidden":"true",text:themeLab})]);
 var askBtn=pg!=="ask"?h("button",{type:"button",class:"btn btn-outline header-tool ask-toggle","aria-expanded":"false","aria-controls":"ask-side",onclick:function(){setAskOpen(!document.body.classList.contains("ask-open"),true)}},[ico("ask-mar",""),h("span",{text:"Ask Mar"})]):null;
 var helpHdr=h("button",{type:"button",class:"btn btn-outline header-tool help-toggle","aria-label":T("Need help? Get help from a person","Kailangan ng tulong? Humingi ng tulong sa tao"),title:T("Need help?","Kailangan ng tulong?"),onclick:function(){teacherCard()}},[ico("help",""),h("span",{class:"tool-label",text:T("Need help?","Kailangan ng tulong?")})]);
 var aboutLnk=h("a",{class:"about-link about-link-hdr",href:"about.html",text:T("About this site","Tungkol sa site")});if(pg==="about")aboutLnk.setAttribute("aria-current","page");
 var skip=h("a",{class:"skip-link",href:"#main",text:T("Skip to content","Laktawan papunta sa nilalaman")});
 var tabs=h("ul",{class:"tabbar-list"},nav.map(function(n){var on=n[0]===sect,a={href:n[0],class:"tab-link"+(on?" is-active":"")};if(on)a["aria-current"]=(pg==="lesson"||pg==="sim"||pg==="practice")?"true":"page";return h("li",{class:n[0]==="ask.html"?"tab-ask":""},[h("a",a,[ico(n[1],""),h("span",{class:"tab-label",text:n[2]})])])}));
 var hd=h("header",{class:"site-header"},[h("div",{class:"header-inner"},[h("a",{class:"logo",href:"index.html",html:'<img src="assets/logo.svg" width="36" height="36" alt=""><span class="logo-text"><strong>Red Arrow Hub</strong><span>San Nicolas, Pangasinan</span></span>'}),
  h("div",{class:"header-actions"},[askBtn,helpHdr,aboutLnk,langBtn,themeBtn,D.filipinoDraft?h("span",{class:"fil-draft-note",text:T("Filipino: draft, under teacher review","Burador pa, sinusuri ng guro")}):null])]),
  h("nav",{"aria-label":T("Main","Pangunahin"),class:"tabbar"},[tabs])]);
 document.body.prepend(hd);document.body.prepend(skip);if(D.filipinoDraft&&fil)document.body.prepend(h("div",{class:"draft-banner is-shown",text:"Draft na salin — pakisuri ng native speaker."}))}
var P={
home:function(m){
 m.classList.add("home");
 function lessonIdsOf(qid){var Q=D.quizzes[qid]||{};var l=(Q.lessons||[]).slice();(Q.qs||[]).forEach(function(x){if(x.lesson&&l.indexOf(x.lesson)<0)l.push(x.lesson)});return l}
 var flat=[];D.modules.forEach(function(mod){mod.items.forEach(function(it){flat.push({it:it,mod:mod})})});
 function lv0(id){return st.m[id]||0}
 function nextUp(){var core=flat.filter(function(x){return x.it.type==="lesson"||x.it.type==="sim"});
  var anyStarted=core.some(function(x){return lv0(x.it.id)>0});
  if(st.last){var cur=core.filter(function(x){return x.it.id===st.last})[0];if(cur&&lv0(cur.it.id)<2)return {x:cur,mode:"resume"}}
  var nx=core.filter(function(x){return lv0(x.it.id)<2})[0];if(nx)return {x:nx,mode:anyStarted?"next":"start"};
  var qz=flat.filter(function(x){return x.it.type==="quiz"&&lessonIdsOf(x.it.id).some(function(l){return lv0(l)<3})})[0];if(qz)return {x:qz,mode:"quiz"};
  return {mode:"done"}}
 function itemTitle(it,mod){return it.type==="unit"?T("Unit test","Unit test")+": "+T(mod.title,mod.fil):title(it.type,it.id)}
 function kindLabel(t){return t==="lesson"?T("Lesson","Aralin"):t==="sim"?T("Simulation","Simulasyon"):t==="quiz"?"Quiz":T("Unit test","Unit test")}
 var top=h("div",{class:"home-top"});m.appendChild(top);
 top.appendChild(h("h1",{class:"sr-live",text:T("Red Arrow Hub — Learn","Red Arrow Hub — Aralin")}));
 /* Search: lesson matches update while typing (local only); Ask Mar answers on submit, after the safety check. */
 var dest=h("div",{id:"home-ask-results",class:"home-ask-results","aria-live":"polite"});
 var live=h("div",{class:"home-live"}),liveStatus=h("p",{class:"sr-live",role:"status"});
 var inpHome=h("input",{class:"home-ask-in",type:"search",autocomplete:"off",autocorrect:"off",spellcheck:"false","aria-label":T("Ask Mar or search lessons","Magtanong kay Mar o maghanap ng aralin"),placeholder:T("Ask Mar or search lessons","Magtanong kay Mar o maghanap")});
 var timer=null;
 function liveSearch(){var v=inpHome.value.trim();live.innerHTML="";crisisBox.innerHTML="";crisisBox.hidden=true;if(v.length<3){liveStatus.textContent="";return}
  var g=runAskSafety(v);
  if(g.closed||(g.verdict&&(g.verdict.label==="crisis"||g.verdict.label==="harmful"))){
    liveStatus.textContent="";
    crisisBox.hidden=false;
    crisisBox.appendChild(h("button",{type:"button",class:"btn need-help-btn home-live-help","aria-label":"Need help? / Kailangan ng tulong?",onclick:function(){teacherCard()}},[ico("help",""),"Need help? / Kailangan ng tulong?"]));
    crisisBox.appendChild(h("p",{class:"home-crisis-note"},[h("span",{lang:"fil",text:"Hindi ka nag-iisa. May makakausap ka. "}),h("span",{lang:"en",text:"You're not alone. There's someone to talk to."})]));
    return}
  var hits=searchLessons(g.scrub.clean);
  if(!hits.length){var none=T("No results","Walang nahanap");liveStatus.textContent=none;live.appendChild(h("p",{class:"muted home-live-empty",text:none}));live.appendChild(h("button",{type:"button",class:"btn btn-outline home-ask-opt",text:T("Ask Mar","Itanong kay Mar"),onclick:function(){if(form.requestSubmit)form.requestSubmit();else form.dispatchEvent(new Event("submit",{cancelable:true,bubbles:true}))}}));return}
  liveStatus.textContent=hits.length+" "+T(hits.length===1?"lesson matches":"lessons match","na aralin ang tugma");
  var ul=h("ul",{class:"home-ask-lessons"});hits.forEach(function(hit){ul.appendChild(h("li",{},[h("a",{href:"lesson.html?id="+encodeURIComponent(hit.id)},[ico("lesson",""),h("span",{text:T(hit.title,hit.titleFil||hit.title)})])]))});
  live.appendChild(h("p",{class:"kicker",text:T("Matching lessons","Mga tugmang aralin")}));live.appendChild(ul)}
 inpHome.addEventListener("input",function(){clearTimeout(timer);timer=setTimeout(liveSearch,250)});
 var form=h("form",{class:"home-ask",role:"search",autocomplete:"off",onsubmit:function(e){e.preventDefault();clearTimeout(timer);live.innerHTML="";liveStatus.textContent="";var raw=inpHome.value;if(!raw.trim())return;if(window.RA2AskSubmit)window.RA2AskSubmit(raw,dest);else{dest.innerHTML="";teacherCard({fromAsk:true})}}});
 form.appendChild(inpHome);
 form.appendChild(h("button",{type:"submit",class:"btn btn-solid",text:T("Ask","Itanong")}));
 var crisisBox=h("div",{class:"home-crisis",hidden:"hidden"});var searchBlock=h("div",{class:"home-search-block"});searchBlock.appendChild(form);searchBlock.appendChild(crisisBox);top.appendChild(searchBlock);top.appendChild(liveStatus);top.appendChild(live);top.appendChild(dest);
 /* Continue card: reads only ra2 + this session's ra-ui. Hidden on a first visit. */
 var nu=nextUp();
 if(nu.mode!=="start"){
  var cc=h("section",{class:"card continue-card","aria-labelledby":"continue-title"});
  if(nu.mode==="done"){cc.appendChild(h("h2",{id:"continue-title",class:"continue-title",text:T("You finished every lesson. Nice work!","Natapos mo ang lahat ng aralin. Magaling!")}));cc.appendChild(h("p",{class:"muted",text:T("Try a unit test below, or ask Mar something new.","Subukan ang unit test sa ibaba, o magtanong kay Mar.")}))}
  else{var it=nu.x.it,mod=nu.x.mod,label=T("Continue","Ituloy")+": "+itemTitle(it,mod)+continueStepLabel(it);
   cc.appendChild(h("h2",{id:"continue-title",class:"sr-live",text:label}));
   cc.appendChild(h("a",{class:"btn btn-solid continue-btn",href:href(it),text:label}))}
  top.appendChild(cc);
 }
 /* Courses: summary up front, full list folded away */
 top.appendChild(h("h2",{class:"section-title",text:T("Your courses","Mga kurso mo")}));
 var openMap={};try{openMap=JSON.parse(lsGet("ra-open","{}"))||{}}catch(e){openMap={}}
 var progressMod=null;if(st.last){D.modules.forEach(function(mod){if(mod.items.some(function(it){return it.id===st.last}))progressMod=mod.id})}
 if(!progressMod){D.modules.forEach(function(mod){if(progressMod)return;if(mod.items.some(function(it){return (it.type==="lesson"||it.type==="sim")&&(st.m[it.id]||0)>0}))progressMod=mod.id})}
 var grid=h("div",{class:"course-grid"});m.appendChild(grid);
 D.modules.forEach(function(mod){var ids=mod.items.filter(function(x){return x.type==="lesson"||x.type==="sim"}).map(function(x){return x.id});var tot=ids.reduce(function(a,id){return a+(st.m[id]||0)},0),pct=Math.round(100*tot/(ids.length*4)),started=tot>0;
  var nL=mod.items.filter(function(x){return x.type==="lesson"}).length,nS=mod.items.filter(function(x){return x.type==="sim"}).length;
  var tag=mod.id==="cyber"?"tag-cyber":mod.id==="it"?"tag-it":"tag-ai";
  var cover=h("img",{class:"course-cover",src:"art/courses/"+mod.id+".svg",alt:"",width:"640",height:"240"});
  var titleEl=h("h3",{class:"course-title",text:T(mod.title,mod.fil)});
  var count=h("p",{class:"course-count",text:nL+" "+T(nL===1?"lesson":"lessons",nL===1?"aralin":"na aralin")+" · "+nS+" "+T(nS===1?"sim":"sims","sim")});
  var progress;
  if(started){progress=h("div",{class:"course-progress"},[h("div",{class:"bar",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":String(pct),"aria-label":T(mod.title,mod.fil)+" — "+T("mastery","kasanayan")},[h("span",{style:"width:"+pct+"%"})]),h("small",{class:"muted",text:pct+"% "+T("mastery","kasanayan")})])}
  else{var first=mod.items[0];progress=h("div",{class:"course-progress"},[h("p",{class:"muted course-new",text:T("Not started yet","Hindi pa nasisimulan")}),h("a",{class:"btn btn-outline course-start",href:href(first)},[h("span",{text:T("Start here","Magsimula rito")}),ico("next","")])])}
  var askChip=h("button",{type:"button",class:"tag-chip "+tag,text:T("Ask Mar about this","Magtanong kay Mar tungkol dito"),onclick:function(){inpHome.value=T("Tell me about ","Sabihin mo tungkol sa ")+T(mod.title,mod.fil);inpHome.focus();window.scrollTo({top:0})}});
  var startOpen=(openMap[mod.id]===true)||(openMap[mod.id]==null&&progressMod===mod.id);
  var list=h("div",{class:"course-items"+(startOpen?" is-open":"")});if(!startOpen)list.setAttribute("hidden","");
  var tog=h("button",{type:"button",class:"course-toggle","aria-expanded":startOpen?"true":"false",onclick:function(){var open=tog.getAttribute("aria-expanded")!=="true";tog.setAttribute("aria-expanded",open?"true":"false");list.classList.toggle("is-open",open);if(open)list.removeAttribute("hidden");else list.setAttribute("hidden","");openMap[mod.id]=open;lsSet("ra-open",JSON.stringify(openMap))}},[h("span",{text:T("See all ","Tingnan ang lahat ng ")+mod.items.length+" "+T("activities","gawain")})]);
  mod.items.forEach(function(it){var lab=it.type==="sim"?T("Try it","Subukan")+" · ":it.type==="quiz"?"Quiz · ":"";list.appendChild(h("a",{class:"mrow "+it.type,href:href(it)},[h("span",{class:"ic"},[ico(icons[it.type]||"lesson","")]),h("span",{class:"t"},[h("strong",{text:itemTitle(it,mod)}),h("small",{text:lab+(it.type==="lesson"?T("Lesson","Aralin"):it.type==="sim"?T("Simulation","Simulasyon"):it.type==="unit"?T("Covers the whole module","Buong module"):(function(){var n=lessonIdsOf(it.id).length;return n===1?T("1 lesson","1 aralin"):(n||2)+" "+T("lessons","aralin")})())}),(it.type==="lesson"||it.type==="sim")?lvlTag(it.id):null])]))});
  grid.appendChild(h("section",{class:"card course-card"},[cover,titleEl,count,progress,h("div",{class:"course-tags"},[askChip]),tog,list]))})},
lesson:function(m0){var id=q("id"),L=D.lessons[id];if(!L)return notFound(m0);up(id,1);st.last=id;save(st);var i=Math.min((L.cards||[]).length-1,Math.max(0,uiState().lessonI||0));var pq=[];Object.keys(D.quizzes).forEach(function(k){D.quizzes[k].qs.forEach(function(x){if(x.lesson==id)pq.push(x)})});
 var grid=h("div",{class:"lesson-grid"+(pq.length?" has-practice":"")}),m=h("div",{class:"lesson-col"});m0.appendChild(grid);grid.appendChild(m);
 if(pq.length){var pc=h("aside",{class:"practice-col","aria-label":T("Practice","Pagsasanay")},[h("p",{class:"kicker",text:T("Practice this lesson","I-practice ang aralin")})]);var pb=h("div");pc.appendChild(pb);grid.appendChild(pc);runner(pb,pq,{onEnd:function(ok,n){pb.innerHTML="";pb.appendChild(h("p",{class:"fb-good",text:ok+"/"+n+" "+T("on the first try. The quiz counts toward mastery.","sa unang subok. Ang quiz ang bibilang sa mastery.")}))}})}
 m.appendChild(h("p",{class:"kicker",text:T("Lesson","Aralin")}));m.appendChild(h("h1",{class:"page-title",text:T(L.title,L.titleFil)}));
 if(L.license||L.credit){var cred=h("div",{class:"lesson-credit"});
  if(L.license)cred.appendChild(h("p",{class:"license-tag",text:L.license+" · "+T("Not the site default license","Hindi ito ang default na lisensya ng site")}));
  if(L.credit)cred.appendChild(h("p",{text:T(L.credit,L.creditFil||L.credit)}));
  var links=h("p",{class:"lesson-credit-links"});
  if(L.sourceUrl)links.appendChild(h("a",{href:L.sourceUrl,rel:"noopener noreferrer",target:"_blank",text:T("MIT OpenCourseWare 6.034","MIT OpenCourseWare 6.034")}));
  if(L.licenseUrl){if(links.childNodes.length)links.appendChild(document.createTextNode(" · "));links.appendChild(h("a",{href:L.licenseUrl,rel:"noopener noreferrer",target:"_blank",text:"CC BY-NC-SA 4.0"}));}
  cred.appendChild(links);
  if(L.deeperUrl)cred.appendChild(h("a",{class:"btn btn-outline lesson-deeper",href:L.deeperUrl,rel:"noopener noreferrer",target:"_blank",text:T("Want to go deeper?","Gusto mo pang palalimin?")}));
  m.appendChild(cred)}
 var box=h("div");m.appendChild(box);
 function show(){uiState({lessonI:i});box.innerHTML="";if(L.cards.length>1)box.appendChild(h("div",{class:"dots"},L.cards.map(function(_,j){return h("i",{class:j<i?"on":j==i?"cur":""})})));var c=L.cards[i];
  box.appendChild(h("div",{class:"step-card"},[cardArt(id,i,c),h("p",{class:"kicker",text:T("Step ","Hakbang ")+(i+1)+"/"+L.cards.length}),h("h2",{text:T(c.h||c[1],c.hf)}),h("p",{text:T(c.t||c[2],c.tf)})]));
  var a=h("div",{class:"quiz-actions lesson-actions"});if(i>0)a.appendChild(h("button",{class:"btn btn-outline",text:T("Back","Bumalik"),onclick:function(){i--;show()}}));
  if(i<L.cards.length-1)a.appendChild(h("button",{class:"btn btn-solid",text:T("Next","Susunod"),onclick:function(){i++;show()}}));else{up(id,2);var nx=nextAfter(id);a.appendChild(h("a",{class:"btn btn-solid",href:nx?href(nx):"index.html",text:nx?(nx.type=="sim"?T("Try it: ","Subukan: ")+D.sims[nx.id].title:T("Continue","Magpatuloy")):T("Done","Tapos")}))}box.appendChild(a)}show()},
sim:function(m){m.innerHTML="";var id=q("id"),s=D.sims[id];if(!s)return notFound(m);up(id,1);st.last=id;save(st);m.appendChild(h("p",{class:"kicker",text:T("Try it · Simulation","Subukan · Simulasyon")}));var simTitle=h("h1",{class:"page-title",tabindex:"-1",text:T(s.title,s.titleFil||s.title_fil)});m.appendChild(simTitle);
 m.appendChild(h("p",{class:"muted",text:T("Practice only. Every name, brand and link here is made up.","Practice lang. Gawa-gawa ang lahat ng pangalan, brand at link.")}));
 if(id=="hotline"&&!(s.ui&&s.ui.threatLine))m.appendChild(h("p",{},[h("button",{type:"button",class:"btn btn-outline",text:T("If anyone threatens you or asks for photos, stop and tell an adult.","Kung may nagbabanta o humihingi ng litrato, tumigil at magsabi sa adult."),onclick:function(){teacherCard()}})]));
 var board=h("div",{class:"sim-ui-host"});m.appendChild(board);
 var boardApi=window.RA2SimUI&&s.ui?window.RA2SimUI.mount(board,s,{h:h,T:T,fil:fil,teacherCard:function(){teacherCard()},uiState:uiState}):{setStep:function(){}};
 var box=h("div");m.appendChild(box);
 function restart(){uiState({step:0,pts:0,first:[],slots:{}});P.sim(m);var t=m.querySelector(".page-title");window.scrollTo(0,0);if(t)t.focus({preventScroll:true})}
 runner(box,s.steps,{onStep:function(i){if(boardApi&&boardApi.setStep)boardApi.setStep(i)},onActions:function(){if(boardApi&&boardApi.syncBudget)boardApi.syncBudget()},onEnd:function(ok,n,pts){up(id,2);var max=n*10,pass=pts/max>=0.8;st.pts+=pts;if(pass){st.pass[id]=(st.pass[id]||0)+1;up(id,st.pass[id]>=2?4:3);if(st.pass[id]>=2&&st.badges.indexOf(s.badge)<0)st.badges.push(s.badge)}save(st);
  box.innerHTML="";var res=h("h2",{tabindex:"-1",text:pass?T("You passed!","Pasado ka!"):T("Good practice!","Magandang practice!")});box.appendChild(h("div",{class:"quiz"},[res,h("p",{text:T("Score: ","Puntos: ")+pts+"/"+max+" · "+T("first-try correct: ","tama sa unang subok: ")+ok+"/"+n}),h("p",{},[T("Level: ","Antas: "),lvlTag(id)]),
   h("p",{class:"muted",text:pass&&st.pass[id]<2?T("Pass once more to reach Mastered.","Pumasa ulit para maging Dalubhasa."):st.pass[id]>=2?T("Badge unlocked: ","Nakuha ang badge: ")+s.badge:T("Score at least 80% of points to pass. Hints or retries are worth 5 points.","Kailangan 80% ng puntos para pumasa. 5 puntos ang hint o ulit.")}),
   h("div",{class:"quiz-actions"},[h("button",{type:"button",class:"btn btn-outline",text:T("Try again","Subukan ulit"),onclick:restart}),h("a",{class:"btn btn-solid",href:"index.html",text:T("Back to courses","Bumalik sa mga kurso"),onclick:function(){box.innerHTML=""}})])]));res.focus()}})},
practice:function(m){var id=q("id"),isU=!!D.units[id],qz=isU?null:D.quizzes[id];if(!isU&&!qz)return notFound(m);var qs=isU?D.units[id].reduce(function(a,k){return a.concat(D.quizzes[k].qs)},[]):qz.qs;
 m.appendChild(h("p",{class:"kicker",text:isU?T("Unit test","Unit test"):"Quiz"}));m.appendChild(h("h1",{class:"page-title",text:isU?T("Unit test","Unit test"):T(qz.title,qz.titleFil)}));var box=h("div");m.appendChild(box);
 runner(box,qs,{linkLesson:true,onEnd:function(ok,n,pts,first){st.pts+=pts;qs.forEach(function(x,j){if(first[j])up(x.lesson,isU?4:3)});save(st);var miss=qs.filter(function(x,j){return!first[j]});
  box.innerHTML="";var resH=h("h2",{tabindex:"-1",text:ok+"/"+n+" "+T("on the first try","sa unang subok")});setTimeout(function(){resH.focus()},0);box.appendChild(h("div",{class:"quiz"},[resH,miss.length?h("p",{text:T("Review these lessons:","Balikan ang mga ito:")}):h("p",{text:T("Great job! Your lessons leveled up.","Magaling! Tumaas ang antas mo.")}),
   h("ul",{},miss.map(function(x){return h("li",{},[h("a",{href:"lesson.html?id="+x.lesson,text:D.lessons[x.lesson].title})])})),h("a",{class:"btn btn-solid",href:"index.html",text:T("Back to courses","Bumalik")})]))}})},
profile:function(m){m.appendChild(h("h1",{class:"page-title",text:T("My profile","Profile ko")}));var inp=h("input",{id:"nick",class:"text-input",maxlength:"20",autocomplete:"off",value:st.nick||"","aria-describedby":"nick-help nick-status"});
 var saved=h("p",{id:"nick-status",class:"save-status",role:"status"}),tmr=null;
 function saveNick(){var v=inp.value.slice(0,20);if((st.nick||"")===v)return;st.nick=v;save(st);saved.textContent=v?T("Saved on this phone","Naka-save sa phone na ito"):T("Nickname cleared","Binura ang palayaw")}
 inp.addEventListener("input",function(){clearTimeout(tmr);saved.textContent="";tmr=setTimeout(saveNick,600)});inp.addEventListener("change",function(){clearTimeout(tmr);saveNick()});
 m.appendChild(h("label",{for:"nick",class:"field-label",text:T("Nickname","Palayaw")}));m.appendChild(inp);m.appendChild(saved);m.appendChild(h("p",{id:"nick-help",class:"muted note-line"},[ico("lock",""),h("span",{text:T("Don't use your real name. Saved only on this phone.","Huwag gamitin ang tunay mong pangalan. Sa phone lang ito naka-save.")})]));
 var ptsH=h("h2",{class:"icon-heading"},[ico("streak",""),document.createTextNode(" "+st.pts+" "+T("points","puntos"))]);m.appendChild(ptsH);
 m.appendChild(h("h2",{text:T("Badges","Mga badge")}));var bw=h("div",{class:"badge-wall"});Object.keys(D.sims).forEach(function(k){var s=D.sims[k],b=s.badge,g=st.badges.indexOf(b)>=0,file=badgeArt[k]||"locked";bw.appendChild(h("div",{class:"badge"+(g?" got":"")},[h("img",{src:"art/badges/"+(g?file:"locked")+".svg",alt:g?T(b,s.badge_fil||b):T("Locked badge","Naka-lock na badge"),width:"80",height:"80"}),T(b,s.badge_fil||b),h("small",{class:"muted",text:g?T("Unlocked","Nakuha"):T("Master ","I-master ")+T(s.title,s.titleFil||s.title_fil)})]))});m.appendChild(bw);
 m.appendChild(h("p",{class:"muted section-gap",text:T("Progress stays on this device only. This site does not collect names, emails, phone numbers or LRNs.","Sa device na ito lang naka-save ang progress. Hindi kumukuha ang site ng pangalan, email, numero o LRN.")}));m.appendChild(h("p",{class:"section-gap"},[h("button",{type:"button",class:"btn btn-outline",text:T("Shared phone? Clear my progress","Shared phone? Burahin ang progress"),onclick:function(){if(confirm(T("Clear all progress on this device?","Burahin ang lahat ng progress sa device na ito?"))){try{localStorage.removeItem(K)}catch(e){}location.reload()}}})]))},
teacher:function(m){m.appendChild(h("h1",{class:"page-title",text:T("Mastery summary","Buod ng mastery")}));m.appendChild(h("p",{class:"muted",text:T("Show this screen to your teacher. It reads this phone only; nothing is sent anywhere.","Ipakita ito sa guro. Mula lang sa phone na ito; walang pinapadala.")}));
 if(st.nick)m.appendChild(h("p",{},[h("strong",{text:T("Nickname","Palayaw")+": "}),st.nick]));
 D.modules.forEach(function(mod){var t=h("table",{class:"m"},[h("caption",{class:"sr-live",text:T(mod.title,mod.fil)}),h("tr",{},[h("th",{scope:"col",text:T(mod.title,mod.fil)}),h("th",{scope:"col",text:T("Level","Antas")})])]);mod.items.forEach(function(it){if(it.type=="lesson"||it.type=="sim")t.appendChild(h("tr",{},[h("td",{class:"icon-cell"},[ico(it.type=="sim"?"simulation":"lesson",it.type=="sim"?T("Simulation","Simulasyon"):T("Lesson","Aralin")),h("span",{text:title(it.type,it.id)})]),h("td",{},[lvlTag(it.id)])]))});m.appendChild(t)});
 m.appendChild(h("p",{class:"stat-line"},[ico("streak",""),h("span",{text:st.pts+" "+T("points","puntos")}),ico("badge",""),h("span",{text:st.badges.length+" "+T(st.badges.length===1?"badge":"badges","badge")})]));var pj=lsGet("ra-proj","0")==="1";m.appendChild(h("button",{type:"button",class:"btn btn-outline",onclick:function(){lsSet("ra-proj",pj?"0":"1");location.reload()}},[ico("projector",""),pj?T("Turn off projector mode","I-off ang projector mode"):T("Projector mode (bigger text)","Projector mode (malaking teksto)")]))},
about:function(m){
 m.classList.add("about-page");
 m.appendChild(h("h1",{class:"page-title",text:T("About this site","Tungkol sa site")}));
 if(D.filipinoDraft)m.appendChild(h("p",{class:"muted",text:T("Filipino on this page is a draft, under teacher review.","Burador pa ang Filipino sa page na ito, sinusuri ng guro.")}));
 m.appendChild(h("p",{class:"unverified-note",text:T("Not yet verified by the school","Hindi pa nasusuri ng paaralan")}));
 m.appendChild(h("h2",{text:T("What this site is","Ano ang site na ito")}));
 m.appendChild(h("p",{text:T("Red Arrow Hub is a free learning site for senior high students at Red Arrow High School in San Nicolas, Pangasinan. It teaches AI, cybersecurity and IT in short lessons you can do on a phone.","Libreng site sa pag-aaral ang Red Arrow Hub para sa mga senior high sa Red Arrow High School sa San Nicolas, Pangasinan. Nagtuturo ito ng AI, cybersecurity at IT sa maiikling aralin na kaya sa phone.")}));
 m.appendChild(h("p",{text:T("There are three modules — AI, Cyber and IT — with short lessons, practice questions, hands-on simulations, and Ask Mar, an offline question-and-answer guide drawn from this site's lessons.","May tatlong module — AI, Cyber at IT — na may maiikling aralin, practice questions, hands-on na simulation, at Ask Mar, isang offline na gabay sa tanong at sagot mula sa mga aralin sa site na ito.")}));
 m.appendChild(h("h2",{text:T("Privacy and how it works","Privacy at paano ito gumagana")}));
 m.appendChild(h("p",{text:T("There are no accounts and no sign-in. Progress, language and theme stay on this device only. This site has no tracking or analytics. Ask Mar questions are not saved. After the first visit, the site can work offline. Names, brands and links in the lessons and sims are made up.","Walang account at walang sign-in. Sa device na ito lang naka-save ang progress, wika at tema. Walang tracking o analytics ang site. Hindi sine-save ang mga tanong kay Ask Mar. Pagkatapos ng unang bisita, puwedeng gumana ang site nang offline. Gawa-gawa ang mga pangalan, brand at link sa mga aralin at sim.")}));
 m.appendChild(h("p",{},[h("span",{text:T("On a shared phone, use ","Sa shared phone, gamitin ang ")}),h("a",{class:"about-link",href:"profile.html",text:T("Shared phone? Clear my progress","Shared phone? Burahin ang progress")}),h("span",{text:T(" on the Me page."," sa page na Me.")})]));
 m.appendChild(h("h2",{text:T("Licenses","Mga lisensya")}));
 m.appendChild(h("p",{text:T("Site code is under the MIT License. Most lessons and other educational content are CC BY-SA 4.0. A few lessons adapted from MIT OpenCourseWare are CC BY-NC-SA 4.0: you may share and adapt them for non-commercial use with credit, but you may not sell them. Each adapted lesson has its own credit line. MIT does not endorse this site.","MIT License ang code ng site. CC BY-SA 4.0 ang karamihan ng aralin at iba pang educational content. Ang ilang aralin na hango sa MIT OpenCourseWare ay CC BY-NC-SA 4.0: puwede mo itong i-share at i-adapt para sa di-komersyal na gamit kung may credit, pero hindi mo ito puwedeng ibenta. May sariling credit line ang bawat hango na aralin. Hindi ini-endorse ng MIT ang site na ito.")}));
 m.appendChild(h("h2",{text:T("Compatible devices","Mga compatible na device")}));
 m.appendChild(h("p",{text:T("This is a static HTML, CSS and JavaScript site for modern browsers. We have checked it in Chrome on screens from 360px wide up, on phone-sized and laptop-sized windows.","Static na HTML, CSS at JavaScript site ito para sa mga modernong browser. Sinuri namin ito sa Chrome sa mga screen na 360px ang lapad pataas, sa window na pang-phone at pang-laptop.")}));
 var devices=[
  T("It is written to work in current versions of Chrome, Edge, Firefox and Safari on phones, tablets and computers. We have not separately tested every browser or device.","Isinulat ito para gumana sa kasalukuyang bersyon ng Chrome, Edge, Firefox at Safari sa phone, tablet at computer. Hindi namin hiwalay na sinubukan ang bawat browser o device."),
  T("Pages are kept small so they can load on a slow or prepaid connection. After the first visit, a service worker can keep the site available offline.","Maliit ang mga page para makarga sa mabagal o prepaid na koneksyon. Pagkatapos ng unang bisita, puwedeng panatilihin ng service worker ang site nang offline."),
  T("Shared phones are okay. Progress stays on this device. On the Me page, use “Shared phone? Clear my progress” to erase it.","Okay ang shared phone. Sa device na ito naka-save ang progress. Sa page na Me, gamitin ang “Shared phone? Burahin ang progress” para burahin ito."),
  T("Light and dark themes are built in. You can switch them in the header.","Built-in ang light at dark na tema. Puwede mo itong palitan sa header."),
  T("The site includes a skip link, labels for assistive tech, tap targets at least 48px, and text contrast of at least 4.5:1. You can enlarge text in your browser.","May skip link ang site, mga label para sa assistive tech, tap target na hindi bababa sa 48px, at contrast ng teksto na hindi bababa sa 4.5:1. Puwede mong palakihin ang teksto sa browser.")
 ];
 var ul=h("ul",{class:"about-devices"});devices.forEach(function(line){ul.appendChild(h("li",{text:line}))});m.appendChild(ul);
},
ask:function(m){m.classList.add("ask-full");mountAsk(m)}
};
function notFound(m){m.innerHTML="";m.appendChild(h("h1",{class:"page-title",text:T("Lesson not found","Hindi nahanap ang aralin")}));m.appendChild(h("p",{class:"muted",text:T("That lesson or simulation is not on this site.","Wala rito ang aralin o simulation na iyon.")}));m.appendChild(h("a",{class:"btn btn-solid",href:"index.html",text:T("Back to courses","Bumalik sa mga kurso")}))}
function runAskSafety(raw){try{var Safe=window.RA2Safety;if(!Safe||typeof Safe.scrubPII!=="function"||typeof Safe.classify!=="function")return {closed:true};var scrub=Safe.scrubPII(raw),verdict=Safe.classify(raw);if(!scrub||!verdict||!verdict.label)return {closed:true};return {closed:false,scrub:scrub,verdict:verdict}}catch(e){return {closed:true}}}
function mountAsk(m,side){
if(side){m.appendChild(h("div",{class:"ask-side-head"},[h("img",{class:"mar-face",src:"art/mar-avatar.svg",alt:"",width:"40",height:"40"}),h("h2",{class:"page-title",text:"Ask Mar"}),h("button",{type:"button",class:"btn btn-outline ask-side-close","aria-label":T("Close Ask Mar","Isara ang Ask Mar"),onclick:function(){setAskOpen(false,true)}},[ico("close","")])]));m.addEventListener("keydown",function(e){if(e.key==="Escape"&&!document.querySelector(".overlay")){setAskOpen(false,true)}})}
else{m.appendChild(h("img",{class:"mar-face",src:"art/mar-avatar.svg",alt:T("Mar, the site guide","Si Mar, gabay sa site"),width:"64",height:"64"}));m.appendChild(h("h1",{class:"page-title",text:"Ask Mar"}))}m.appendChild(h("p",{class:"muted",text:T("Mar answers from this site's lessons, offline. Mar is a program and can be wrong. Questions aren't saved. Don't type your name, phone number, email or LRN.","Sumasagot si Mar mula sa mga aralin, offline. Program si Mar at puwedeng magkamali. Hindi sine-save ang mga tanong. Huwag i-type ang pangalan, numero, email o LRN.")}));
 var Safe=window.RA2Safety;
 var chat=h("div",{class:"chat",role:"log","aria-live":"polite","aria-label":T("Conversation with Mar","Usapan kasama si Mar")}),inp=h("input",{class:"ask-in text-input",maxlength:"200",autocomplete:"off","aria-label":"Ask Mar",placeholder:T("Ask about AI, IT or cyber…","Magtanong tungkol sa AI, IT o cyber…")});
 function faqText(f,key,filKey){return fil&&f[filKey]?f[filKey]:f[key]}
 function bag(s){return " "+String(s).toLowerCase().replace(/\bwi[\s-]+fi\b/g,"wifi").replace(/\be[\s-]+mail\b/g,"email").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim()+" "}
 var DEF=/^ (what is|whats|what are|ano ang|ano ba ang|anong|how does|how do|paano gumagana ang|explain|define|meaning of|ibig sabihin ng) (an? |ang |the |mga )?(.+?) ?(work|gumagana|mean|po)? $/;
 function phraseHit(f,q){var words=bag(q);return (f.p||[]).some(function(p){var ph=bag(p).trim();return ph&&words.indexOf(" "+ph+" ")>=0})}
 function faqScore(f,q){var b=bag(q),s=0;(f.k||[]).forEach(function(k){var kk=bag(k);if(b.indexOf(kk)<0)return;var w=kk.trim().split(" ").filter(Boolean).length;s+=w>=2?Math.max(2,w):1});
  if(phraseHit(f,q))s=Math.max(s,2);
  var m=b.match(DEF);if(m){var topic=" "+m[3].trim()+" ";if((f.k||[]).some(function(k){return bag(k)===topic}))s=Math.max(s,2)}
  var toks=b.trim().split(" ");
  if(toks.length>=2&&toks.length<=3&&(f.k||[]).some(function(k){var kk=bag(k).trim();return kk&&kk.indexOf(" ")<0&&kk.length>=4&&toks.indexOf(kk)>=0}))s=Math.max(s,2);
  return s}
 function needHelpBtn(){return h("button",{type:"button",class:"btn need-help-btn","aria-label":T("Need help? Get help from a person","Kailangan ng tulong? Humingi ng tulong sa tao"),onclick:function(){teacherCard()}},[ico("help",""),T("Need help?","Kailangan ng tulong?")])}
 function paintAsk(b){var wrap=h("div",{class:"ask-turn"});wrap.appendChild(b);var help=needHelpBtn();wrap.appendChild(help);chat.appendChild(wrap);help.scrollIntoView({block:"end",inline:"nearest"})}
 function showFaq(b,t,opts){var best=null,sc=0,lo=t.toLowerCase();D.faq.forEach(function(f){var s=faqScore(f,lo);if(s>sc){sc=s;best=f}});var min=(opts&&opts.allowOne)?1:((Safe&&Safe.MIN_FAQ_SCORE)||2),quizish=/answer|sagot|quiz|which is|alin|correct/.test(lo);
  if(!best||sc<min){b.appendChild(h("p",{text:T("I only know about AI, IT and cyber safety. Try asking about passwords, scams, Wi-Fi or how AI learns!","AI, IT at cyber lang ang alam ko. Subukang magtanong tungkol sa password, scam, Wi-Fi o paano natututo ang AI!")}));b.appendChild(h("a",{class:"btn btn-solid",href:"index.html",text:T("Practice this","I-practice ito")}));return}
  if(quizish){b.appendChild(h("p",{class:"icon-line"},[ico("hint",""),h("span",{text:T("Hint first: ","Pahiwatig muna: ")+faqText(best,"back","backf")})]));var full=h("button",{class:"btn btn-outline",text:T("Show full answer","Ipakita ang sagot"),onclick:function(){full.replaceWith(h("p",{text:faqText(best,"a","af")}))}});b.appendChild(full)}
  else{b.appendChild(h("p",{text:faqText(best,"a","af")}));b.appendChild(h("p",{class:"icon-line think-q"},[ico("ask-mar",""),h("span",{text:T("Think about it: ","Pag-isipan: ")+faqText(best,"back","backf")})]))}
  b.appendChild(h("a",{class:"btn btn-solid",href:best.link,text:T("Practice this","I-practice ito")}))}
 function reply(raw){
  /* Official RA2Safety run order. Never store the question. Classify the original wording first,
     before any faq-fil.js request, so crisis/harmful paths never wait on that file.
     Fail closed: if the safety module is missing or throws, show the help card and do not answer. */
  var gate=runAskSafety(raw);
  if(gate.closed){inp.value="";teacherCard({fromAsk:true});return}
  var scrub=gate.scrub,verdict=gate.verdict;
  var t=scrub.clean,label=verdict.label;
  inp.value="";
  chat.appendChild(h("div",{class:"me",text:t}));
  if(scrub.found&&scrub.found.length)chat.appendChild(h("p",{class:"pii-warn",text:T("I hid a phone number, email, LRN or address from the screen. Don't type personal details on a shared phone.","Itinago ko ang numero, email, LRN o address. Huwag mag-type ng personal na detalye sa shared phone.")}));
  if(label==="crisis"){teacherCard({fromAsk:true});return}
  if(label==="harmful"){
   var b=h("div",{class:"mar"});
   b.appendChild(h("p",{text:T("I can't help with that. I only answer questions about AI, IT and cyber safety.","Hindi ko iyon matutulongan. AI, IT at cyber safety lang ang sinasagot ko.")}));
   paintAsk(b);return}
  function afterFaq(ok){
    if(think&&think.parentNode)think.parentNode.removeChild(think);
    if(!ok){
      var miss=h("div",{class:"mar"});
      miss.appendChild(h("p",{text:T("I couldn't load that answer. Please ask a teacher.","Hindi ko mai-load ang sagot. Magtanong sa guro.")}));
      paintAsk(miss);teacherCard({fromAsk:true});return}
    var b=h("div",{class:"mar"});
    if(label==="maybe"){showFaq(b,t,{allowOne:true});b.appendChild(h("button",{type:"button",class:"btn btn-outline happen-btn",text:T("Is this happening to you?","Nangyayari ba ito sa iyo?"),onclick:function(){teacherCard({fromAsk:true})}}));paintAsk(b);return}
    showFaq(b,t);paintAsk(b)}
  var think=null;
  if(faqFilState==="ready"||window.RA2FaqFil){mergeFaqFil();faqFilState="ready";afterFaq(true);return}
  if(faqFilState==="failed"){afterFaq(false);return}
  think=h("div",{class:"mar think"},[h("p",{text:T("Thinking…","Sandali…")})]);
  chat.appendChild(think);
  ensureFaqFil(afterFaq)}
 window.RA2AskSubmit=function(raw,dest){
  /* Same official run order as reply(): classify first, never store the question, fail closed. */
  function clear(){if(dest)dest.innerHTML=""}
  var gate=runAskSafety(raw);
  if(gate.closed){clear();teacherCard({fromAsk:true});return {kind:"closed"}}
  var scrub=gate.scrub,verdict=gate.verdict,q=scrub.clean,label=verdict.label;
  if(label==="crisis"){clear();teacherCard({fromAsk:true});return {kind:"crisis"}}
  if(label==="harmful"){
    clear();
    var ref=h("div",{class:"mar home-ask-refusal"});
    ref.appendChild(h("p",{text:T("I can't help with that. I only answer questions about AI, IT and cyber safety.","Hindi ko iyon matutulongan. AI, IT at cyber safety lang ang sinasagot ko.")}));
    if(dest)dest.appendChild(ref);
    return {kind:"harmful"}}
  function paintLessons(){
    var hits=searchLessons(q);
    if(!hits.length||!dest)return;
    var ul=h("ul",{class:"home-ask-lessons"});
    hits.forEach(function(hit){ul.appendChild(h("li",{},[h("a",{href:"lesson.html?id="+encodeURIComponent(hit.id)},[ico("lesson",""),h("span",{text:T(hit.title,hit.titleFil||hit.title)})])]));});
    dest.appendChild(ul)}
  function afterHomeFaq(ok){
    if(think&&think.parentNode)think.parentNode.removeChild(think);
    clear();
    if(!ok){
      var miss=h("div",{class:"mar"});
      miss.appendChild(h("p",{text:T("I couldn't load that answer. Please ask a teacher.","Hindi ko mai-load ang sagot. Magtanong sa guro.")}));
      if(dest)dest.appendChild(miss);teacherCard({fromAsk:true});return}
    var b=h("div",{class:"mar"});
    if(label==="maybe"){showFaq(b,q,{allowOne:true});b.appendChild(h("button",{type:"button",class:"btn btn-outline happen-btn",text:T("Is this happening to you?","Nangyayari ba ito sa iyo?"),onclick:function(){teacherCard({fromAsk:true})}}))}
    else showFaq(b,q);
    if(dest)dest.appendChild(b);
    paintLessons()}
  var think=null;
  if(faqFilState==="ready"||window.RA2FaqFil){mergeFaqFil();faqFilState="ready";afterHomeFaq(true);return {kind:"ok"}}
  if(faqFilState==="failed"){afterHomeFaq(false);return {kind:"fail"}}
  think=h("div",{class:"mar think"},[h("p",{text:T("Thinking…","Sandali…")})]);
  if(dest)dest.appendChild(think);
  ensureFaqFil(afterHomeFaq);return {kind:"pending"}}
 var f=h("form",{class:"ask-form",onsubmit:function(e){e.preventDefault();if(inp.value.trim())reply(inp.value.trim())}},[inp,h("button",{type:"submit",class:"btn btn-solid",text:T("Ask","Itanong")})]);
 m.appendChild(chat);m.appendChild(h("p",{class:"ask-tools"},[h("button",{type:"button",class:"btn btn-outline",onclick:function(){teacherCard()}},[ico("teacher",""),T("Ask a teacher","Magtanong sa guro")]),h("button",{type:"button",class:"btn btn-outline",text:T("Clear chat","Linisin"),onclick:function(){chat.innerHTML=""}})]));m.appendChild(f);
 window.addEventListener("pagehide",function(){inp.value="";chat.innerHTML=""});
 if(window.visualViewport)visualViewport.addEventListener("resize",function(){document.documentElement.style.setProperty("--kb",Math.max(0,innerHeight-visualViewport.height)+"px")})}
function nextAfter(id){for(var a=0;a<D.modules.length;a++){var it=D.modules[a].items;for(var b=0;b<it.length;b++)if(it[b].id==id)return it[b+1]}}
if("serviceWorker" in navigator)addEventListener("load",function(){navigator.serviceWorker.register("sw.js",{scope:"./"}).catch(function(){})});
document.addEventListener("keydown",function(e){if(e.target.tagName=="INPUT"||document.querySelector(".overlay"))return;if(e.key=="ArrowDown"||e.key=="ArrowUp"){var c=[].slice.call(document.querySelectorAll(".choice:not([disabled])"));if(!c.length)return;var i=c.indexOf(document.activeElement);i=e.key=="ArrowDown"?Math.min(c.length-1,i+1):Math.max(0,i-1);c[i].focus();e.preventDefault()}else if(e.key=="ArrowRight"||e.key=="ArrowLeft"){var bs=document.querySelectorAll(".lesson-col .quiz-actions .btn,.step-nav");var want=e.key=="ArrowRight"?/Next|Susunod|Continue|Magpatuloy|Try it|Subukan|Done|Tapos/:/Back|Bumalik/;[].some.call(document.querySelectorAll(".lesson-col .quiz-actions .btn"),function(b){if(want.test(b.textContent)){b.click();return true}})}});
function privacyFooter(){var f=h("footer",{class:"site-footer"},[h("p",{},[h("a",{class:"about-link about-link-ft",href:"about.html",text:T("About this site","Tungkol sa site")})]),h("p",{text:T("Preview only — not for class use yet. Progress stays on this device. This site does not collect names, emails, phone numbers or LRNs. Ask Mar questions aren't saved.","Preview lang — hindi pa para sa klase. Sa device na ito lang ang progress. Hindi kumukuha ang site ng pangalan, email, numero o LRN. Hindi sine-save ang mga tanong kay Ask Mar.")}),h("p",{text:T("This site is hosted on GitHub Pages, which may log visitors' IP addresses. We don't collect anything.","Naka-host ang site na ito sa GitHub Pages, na maaaring mag-log ng IP address ng bisita. Wala kaming kinokolekta.")}),h("p",{text:T("Most lessons and other educational content are CC BY-SA 4.0. A few lessons adapted from MIT OpenCourseWare are CC BY-NC-SA 4.0: you may share and adapt them for non-commercial use with credit, but you may not sell them. Each adapted lesson has its own credit line.","CC BY-SA 4.0 ang karamihan ng aralin at iba pang educational content. Ang ilang aralin na hango sa MIT OpenCourseWare ay CC BY-NC-SA 4.0: puwede mo itong i-share at i-adapt para sa di-komersyal na gamit kung may credit, pero hindi mo ito puwedeng ibenta. May sariling credit line ang bawat hango na aralin.")})]);document.body.appendChild(f)}
function boot(){mergeFaqFil();document.documentElement.lang=fil?"fil":"en";header();var m=document.getElementById("main");m.innerHTML="";var pg=document.body.dataset.page;
 /* The desktop Ask Mar panel is always mounted (the home search uses its answer engine) but stays closed until asked for. */
 if(pg!="ask"){var side=h("aside",{class:"ask-side",id:"ask-side","aria-label":"Ask Mar"});document.body.appendChild(side);mountAsk(side,true);setAskOpen(lsGet("ra-ask","0")==="1")}
 (P[pg]||P.home)(m);privacyFooter()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();
