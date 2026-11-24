(function(){
var D=RA2,K="ra2";if(typeof RA2SIMS_V3!=="undefined")D.sims=RA2.sims=RA2SIMS_V3;
 if(window.RA2Art){D.diagramFiles=RA2Art.diagramFiles||D.diagramFiles;D.art=D.art||{};D.art.captions=RA2Art.captions||D.art.captions}
 function ico(name,alt){return h("img",{class:"ui-ic",src:"art/icons/"+name+".svg",alt:alt||"",width:"24",height:"24"})}
 var badgeArt={hinog:"mango-sorter",factcheck:"fact-checker",hotline:"scam-buster",soc:"soc-analyst",wifi:"wifi-fixer",pc:"pc-builder"};
function S(){try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return{}}}
function save(s){localStorage.setItem(K,JSON.stringify(s))}
var st=S();st.m=st.m||{};st.pass=st.pass||{};st.pts=st.pts||0;st.badges=st.badges||[];
var LV=["Not started","Attempted","Familiar","Proficient","Mastered"],LVF=["Hindi pa nasisimulan","Sinubukan","Pamilyar","Mahusay","Dalubhasa"];
var fil=localStorage.getItem("ra-lang")==="fil";
function lv(n){return (fil?LVF:LV)[n||0]}
function up(id,n){if((st.m[id]||0)<n){st.m[id]=n;save(st)}}
function T(en,f){return fil&&f?f:en}
 function uiState(update){var k="ra-ui",o={};try{o=JSON.parse(sessionStorage.getItem(k)||"{}")}catch(e){o={}}if(update){for(var x in update)o[x]=update[x];o.href=location.pathname+location.search;try{sessionStorage.setItem(k,JSON.stringify(o))}catch(e){}}return o.href===location.pathname+location.search?o:{}}
function h(t,a,c){var e=document.createElement(t);if(a)for(var k in a){if(k=="html")e.innerHTML=a[k];else if(k=="text")e.textContent=a[k];else if(k.slice(0,2)=="on")e.addEventListener(k.slice(2),a[k]);else e.setAttribute(k,a[k])}(c||[]).forEach(function(x){x&&e.appendChild(typeof x=="string"?document.createTextNode(x):x)});return e}
function q(k){return new URLSearchParams(location.search).get(k)}
function title(type,id){if(type=="lesson")return T(D.lessons[id].title,D.lessons[id].titleFil||D.lessons[id].title_fil);if(type=="sim")return T(D.sims[id].title,D.sims[id].titleFil||D.sims[id].title_fil);if(type=="quiz")return T(D.quizzes[id].title,D.quizzes[id].titleFil||D.quizzes[id].title_fil);return T("Unit test","Unit test")}
var icons={lesson:"lesson",sim:"simulation",quiz:"quiz",unit:"unit-test"};
function href(it){return it.type=="lesson"?"lesson.html?id="+it.id:it.type=="sim"?"sim.html?id="+it.id:"practice.html?id="+it.id}
function lvlTag(id){var n=st.m[id]||0;return h("span",{class:"lvl l"+n,text:lv(n)})}
function stepLang(s){return{q:T(s.q,s.q_fil||s.qf),choices:(fil&&(s.choices_fil||s.choicesFil))||s.choices,hints:(fil&&(s.hints_fil||s.hintsFil))||s.hints,explain:T(s.explain,s.explain_fil||s.explainFil),a:s.a,lesson:s.lesson,ui:s.ui}}
function cardArt(lessonId,idx,c){var emoji=c.icon||c[0]||"";var key=lessonId+"-"+(idx+1);var src=(D.diagramFiles&&D.diagramFiles[key])||(D.art&&D.art.diagrams&&D.art.diagrams[key]);var cap=D.art&&D.art.captions&&(D.art.captions[key]||D.art.captions[src]);var alt=cap?T(cap.en||cap.en_alt||cap.alt_en||"",cap.fil||cap.fil_alt||cap.alt_fil||""):"";var wrap=h("div",{class:"art"});if(src){var img=h("img",{class:"diagram",src:src,alt:alt||emoji});img.addEventListener("error",function(){wrap.innerHTML="";wrap.setAttribute("aria-hidden","true");wrap.textContent=emoji});wrap.appendChild(img);var marks=cap&&cap.markers||[];if(marks.length){var ol=h("ol",{class:"diagram-key"});marks.forEach(function(m){ol.appendChild(h("li",{},[h("span",{class:"mk",text:String(m.n||"")}),document.createTextNode(" "+T(m.en||"",m.fil||""))]))});wrap.appendChild(ol)}}else{wrap.setAttribute("aria-hidden","true");wrap.textContent=emoji}return wrap}
function ensureFaqFil(cb){if(window.RA2FaqFil){mergeFaqFil();cb&&cb();return}var s=document.createElement("script");s.src="askmar/faq-fil.js";s.onload=function(){mergeFaqFil();cb&&cb()};document.head.appendChild(s)}
function maybeLoadFaqFil(){if(document.body.getAttribute("data-page")==="ask"||window.matchMedia("(min-width:1024px)").matches)ensureFaqFil()}
function mergeFaqFil(){var extra=window.RA2FaqFil||D.faqFil;if(!extra)return;var list=extra.faq||extra;if(!Array.isArray(list))return;list.forEach(function(src){var hit=D.faq.filter(function(f){if(src.id&&f.id===src.id)return true;if(src.k&&f.k)return src.k.some(function(k){return f.k.indexOf(k)>=0});return false})[0];if(hit){if(src.af)hit.af=src.af;if(src.backf)hit.backf=src.backf;if(src.k)hit.k=src.k;if(src.p)hit.p=src.p;if(src.id&&!hit.id)hit.id=src.id;if(src.a&&!hit.a)hit.a=src.a;if(src.back&&!hit.back)hit.back=src.back;if(src.link)hit.link=src.link}else if(src.k&&(src.a||src.af))D.faq.push(src)})}
function fmtNcmh(tel){var d=String(tel).replace(/\D/g,"");if(d==="09190571553")return "0919-057-1553";if(d==="09178998727")return "0917-899-8727";if(d==="180018881553")return "1800-1888-1553";if(d.length===11&&d[0]==="0")return d.slice(0,4)+"-"+d.slice(4,7)+"-"+d.slice(7);if(d.length===13&&d.slice(0,4)==="1800")return d.slice(0,4)+"-"+d.slice(4,8)+"-"+d.slice(8);return tel}
function helpUnverified(){var t=D.help&&D.help.tested;if(!t)return true;return Object.keys(t).some(function(k){return !t[k]})}
function unverifiedNote(){return h("p",{class:"unverified-note",text:T("Not yet verified by the school","Hindi pa nasusuri ng paaralan")})}
function teacherCard(){var H=D.help,pending=helpUnverified(),o=h("div",{class:"overlay",role:"dialog","aria-modal":"true"},[
 h("h2",{text:T("You're not alone","Hindi ka nag-iisa")}),h("p",{class:"muted",text:T("Help is one tap away. These numbers are free or standard-rate.","Isang tap lang ang tulong. Libre o regular-rate ang mga numerong ito.")}),
 h("p",{text:T("Please talk to a parent, a teacher or the guidance office today. You did nothing wrong by asking for help.","Kausapin ang magulang, guro o guidance office ngayon. Walang mali sa paghingi ng tulong.")}),
 h("a",{class:"btn btn-solid big",href:"tel:911",text:"🚨 "+T("Call 911 — immediate danger","Tumawag sa 911 — agarang panganib")}),
 h("p",{style:"margin:.8rem 0 0;font-weight:700",text:T("NCMH Crisis Hotline (24/7)","NCMH Crisis Hotline (24/7)")})].concat(pending?[unverifiedNote()]:[]).concat(
 /* Guidance office must test each number before launch and record the date (see RA2.help.tested). */
 H.ncmh.map(function(n){return h("a",{class:"btn btn-outline big",href:"tel:"+n.tel,text:"📞 "+T("Call NCMH","Tawagan ang NCMH")+" ("+n.label+") · "+fmtNcmh(n.tel)})}),[
 h("a",{class:"btn btn-outline big",href:H.bantayBataUrl||H.bantayBataFallback,target:"_blank",rel:"noopener noreferrer",text:"💬 "+T("Message Bantay Bata","Mag-message sa Bantay Bata")}),
 pending?unverifiedNote():null,
 h("p",{style:"margin:.8rem 0 0;font-weight:700",text:T("Online threats, sextortion or a stolen account","Online na banta, sextortion o nanakaw na account")}),
 h("a",{class:"btn btn-outline big",href:"tel:"+H.pnpAcg.tel,text:"🛡️ PNP Anti-Cybercrime Group "+H.pnpAcg.display}),
 pending?unverifiedNote():null,
 /* DepEd Order 40 route for bullying */
 h("button",{class:"btn btn-outline big",text:"🏫 "+T("Child Protection Committee / Guidance","Child Protection Committee / Guidance"),onclick:function(e){e.target.after(h("p",{class:"muted",text:H.guidance||T("Ask any teacher to take you to the guidance office or the Child Protection Committee today.","Magpasama sa kahit sinong guro papunta sa guidance office o Child Protection Committee ngayon.")}))}}),
 h("button",{class:"btn btn-ghost big",style:"color:var(--ink);border-color:var(--line)",text:T("Back to lessons","Bumalik sa mga aralin"),onclick:function(){o.remove();document.querySelectorAll(".ask-in").forEach(function(i){i.value=""});location.href="index.html"}})]));document.body.appendChild(o)}
window.RA2open=teacherCard;
/* question runner: one at a time, progressive hints, check/try again, worked explanation */
function runner(root,steps,opts){var saved=uiState(),i=Math.min(steps.length-1,Math.max(0,saved.step||0)),first=Array.isArray(saved.first)?saved.first.slice():[],pts=saved.pts||0;
 function snap(){uiState({step:i,pts:pts,first:first})} snap();
 function dots(){if(steps.length<2)return document.createComment("single-step");return h("div",{class:"dots","aria-label":"Step "+(i+1)+" of "+steps.length},steps.map(function(_,j){return h("i",{class:j<i?"on":j==i?"cur":""})}))}
 function show(){snap();root.innerHTML="";if(opts&&opts.onStep)opts.onStep(i);var s=stepLang(steps[i]),sel=null,hn=0,tries=0,chk;function armCheck(on){if(on){chk.removeAttribute("aria-disabled");chk.classList.remove("is-wait")}else{chk.setAttribute("aria-disabled","true");chk.classList.add("is-wait")}}root.appendChild(dots());
  var wrap=h("div",{class:"sim2"}),scen=h("div",{class:"scen quiz"},[h("p",{class:"kicker",text:T("Scenario","Sitwasyon")+" "+(i+1)+"/"+steps.length}),h("p",{class:"quiz-q",text:s.q})]),card=h("div",{class:"quiz"});wrap.appendChild(scen);wrap.appendChild(card);
  var list=h("div",{class:"choices"});s.choices.forEach(function(c,j){var b=h("button",{type:"button",class:"choice",text:(j+1)+". "+c,onclick:function(){if(done)return;sel=j;[].forEach.call(list.children,function(x){x.classList.remove("selected")});b.classList.add("selected");armCheck(true)}});list.appendChild(b)});card.appendChild(list);
  var hints=h("div"),fb=h("div"),done=false;card.appendChild(hints);
  var hb=h("button",{type:"button",class:"btn btn-outline",text:T("Hint (5 pts)","Pahiwatig (5 pts)"),onclick:function(){if(hn<s.hints.length){hints.appendChild(h("div",{class:"hint",text:"💡 "+s.hints[hn]}));hn++}if(hn>=s.hints.length)hb.disabled=true}});
  chk=h("button",{type:"button",class:"btn btn-solid is-wait",text:T("Check","Tingnan"),"aria-disabled":"true",onclick:function(){fb.innerHTML="";if(sel===null){fb.appendChild(h("div",{class:"fb-soft",text:T("Pick an answer first","Pumili muna ng sagot")}));return}tries++;if(sel===s.a){done=true;if(tries==1&&hn==0){first[i]=true;pts+=10}else{first[i]=false;pts+=5};
     fb.appendChild(h("div",{class:"fb-good",html:"<strong>"+T("Nice work!","Magaling!")+"</strong> "+s.explain}));chk.remove();hb.remove();act.appendChild(h("button",{class:"btn btn-solid",text:i+1<steps.length?T("Next","Susunod"):T("Finish","Tapusin"),onclick:function(){i++;i<steps.length?show():end()}}))}
    else{first[i]=false;fb.appendChild(h("div",{class:"fb-soft",html:"<strong>"+T("Not quite — that's okay.","Hindi pa — ayos lang.")+"</strong> "+T("Here's how to think about it: ","Ganito ang pag-isip: ")+s.explain}));
     if(s.lesson&&opts.linkLesson)fb.firstChild.appendChild(h("div",{},[h("a",{href:"lesson.html?id="+s.lesson,text:T("Review the lesson: ","Balikan: ")+D.lessons[s.lesson].title})]));chk.textContent=T("Try again","Subukan ulit")}}});
  var act=h("div",{class:"quiz-actions"},[hb,chk]);card.appendChild(fb);card.appendChild(act);root.appendChild(wrap);
  root._key=function(e){if(e.target.tagName=="INPUT"||document.querySelector(".overlay"))return;var n=parseInt(e.key,10);if(n>=1&&n<=s.choices.length&&!done){list.children[n-1].click();e.preventDefault()}else if(e.key=="Enter"){var nb=act.querySelector("button:last-child");if(nb&&!nb.disabled){nb.click();e.preventDefault()}}else if((e.key=="h"||e.key=="H")&&hb.isConnected&&!hb.disabled){hb.click()}}}
 if(!root._bound){root._bound=1;document.addEventListener("keydown",function(e){root._key&&root._key(e)})}
 function end(){root._key=null;var ok=first.filter(Boolean).length;uiState({step:0,pts:0,first:[]});if(opts&&opts.onEnd)opts.onEnd(ok,steps.length,pts,first)}
 show()}
function header(){var nav=[["index.html","learn",T("Learn","Aralin")],["ask.html","ask-mar","Ask Mar"],["profile.html","me",T("Me","Ako")],["teacher.html","teacher",T("Teacher","Guro")]];
 var langBtn=h("button",{class:"nav-toggle",style:"display:inline-flex",onclick:function(){uiState({});localStorage.setItem("ra-lang",fil?"en":"fil");location.reload()}},[ico("language",""),document.createTextNode(fil?"EN":"Filipino")]);
 var skip=h("a",{class:"skip-link",href:"#main",text:T("Skip to content","Laktawan papunta sa nilalaman")});
 var hd=h("header",{class:"site-header"},[h("div",{class:"header-inner"},[h("a",{class:"logo",href:"index.html",html:'<img src="assets/logo.svg" width="36" height="36" alt=""><span class="logo-text"><strong>Red Arrow Hub</strong><span>San Nicolas, Pangasinan</span></span>'}),
  h("div",{class:"header-actions"},[langBtn,D.filipinoDraft?h("span",{class:"fil-draft-note",text:T("Filipino: draft, under teacher review","Burador pa, sinusuri ng guro")}):null])]),
  h("nav",{"aria-label":"Main",class:"tabbar"},[h("ul",{style:"display:flex;justify-content:space-around;list-style:none;margin:0;padding:.3rem"},nav.map(function(n){return h("li",{class:n[0]=="ask.html"?"tab-ask":""},[h("a",{href:n[0],style:"display:flex;flex-direction:column;align-items:center;text-align:center;text-decoration:none;color:var(--ink);font-weight:600;font-size:.85rem;padding:.4rem .6rem;min-height:48px"},[ico(n[1],""),document.createTextNode(n[2])])])}))])]);
 document.body.prepend(hd);document.body.prepend(skip);if(D.filipinoDraft&&fil)document.body.prepend(h("div",{class:"draft-banner",style:"display:block",text:"Draft na salin — pakisuri ng native speaker."}));if(localStorage.getItem("ra-proj")==="1")document.body.classList.add("projector")}
var P={
home:function(m){m.appendChild(h("h1",{class:"page-title",text:T("Your courses","Mga kurso mo")}));
 D.modules.forEach(function(mod){var ids=mod.items.filter(function(x){return x.type=="lesson"||x.type=="sim"}).map(function(x){return x.id});var tot=ids.reduce(function(a,id){return a+(st.m[id]||0)},0),pct=Math.round(100*tot/(ids.length*4));
  var cover=h("img",{class:"course-cover",src:"art/courses/"+mod.id+".svg",alt:T(mod.title,mod.fil)});
  var sec=h("section",{class:"card",style:"margin:1rem 0"},[cover,h("h2",{text:T(mod.title,mod.fil)}),h("div",{class:"bar"},[h("span",{style:"width:"+pct+"%"})]),h("small",{class:"muted",text:pct+"% "+T("mastery","kasanayan")})]);
  mod.items.forEach(function(it){var lab=it.type=="sim"?T("Try it","Subukan")+" · ":it.type=="quiz"?"Quiz · ":"";sec.appendChild(h("a",{class:"mrow "+it.type,href:href(it)},[h("span",{class:"ic"},[ico(icons[it.type]||"lesson","")]),h("span",{class:"t"},[h("strong",{text:it.type=="unit"?T("Unit test","Unit test")+": "+T(mod.title,mod.fil):title(it.type,it.id)}),h("small",{text:lab+(it.type=="lesson"?T("Lesson","Aralin"):it.type=="sim"?T("Simulation","Simulasyon"):it.type=="unit"?T("Covers the whole module","Buong module"):(function(){var n=(D.quizzes[it.id]&&D.quizzes[it.id].lessons||[]).length;return n===1?T("1 lesson","1 aralin"):(n||2)+" "+T("lessons","aralin")})())}),(it.type=="lesson"||it.type=="sim")?lvlTag(it.id):null])]))});m.appendChild(sec)})},
lesson:function(m0){var id=q("id"),L=D.lessons[id];if(!L)return notFound(m0);up(id,1);var i=Math.min((L.cards||[]).length-1,Math.max(0,uiState().lessonI||0));var pq=[];Object.keys(D.quizzes).forEach(function(k){D.quizzes[k].qs.forEach(function(x){if(x.lesson==id)pq.push(x)})});
 var grid=h("div",{class:"lesson-grid"+(pq.length?" has-practice":"")}),m=h("div",{class:"lesson-col"});m0.appendChild(grid);grid.appendChild(m);
 if(pq.length){var pc=h("aside",{class:"practice-col","aria-label":T("Practice","Pagsasanay")},[h("p",{class:"kicker",text:T("Practice this lesson","I-practice ang aralin")})]);var pb=h("div");pc.appendChild(pb);grid.appendChild(pc);runner(pb,pq,{onEnd:function(ok,n){pb.innerHTML="";pb.appendChild(h("p",{class:"fb-good",text:ok+"/"+n+" "+T("on the first try. The quiz counts toward mastery.","sa unang subok. Ang quiz ang bibilang sa mastery.")}))}})}
 m.appendChild(h("p",{class:"kicker",text:T("Lesson","Aralin")}));m.appendChild(h("h1",{class:"page-title",text:T(L.title,L.titleFil)}));var box=h("div");m.appendChild(box);
 function show(){uiState({lessonI:i});box.innerHTML="";if(L.cards.length>1)box.appendChild(h("div",{class:"dots"},L.cards.map(function(_,j){return h("i",{class:j<i?"on":j==i?"cur":""})})));var c=L.cards[i];
  box.appendChild(h("div",{class:"step-card"},[cardArt(id,i,c),h("p",{class:"kicker",text:T("Step ","Hakbang ")+(i+1)+"/"+L.cards.length}),h("h2",{text:T(c.h||c[1],c.hf)}),h("p",{text:T(c.t||c[2],c.tf)})]));
  var a=h("div",{class:"quiz-actions",style:"justify-content:space-between"});if(i>0)a.appendChild(h("button",{class:"btn btn-outline",text:T("Back","Bumalik"),onclick:function(){i--;show()}}));
  if(i<L.cards.length-1)a.appendChild(h("button",{class:"btn btn-solid",text:T("Next","Susunod"),onclick:function(){i++;show()}}));else{up(id,2);var nx=nextAfter(id);a.appendChild(h("a",{class:"btn btn-solid",href:nx?href(nx):"index.html",text:nx?(nx.type=="sim"?T("Try it: ","Subukan: ")+D.sims[nx.id].title:T("Continue","Magpatuloy")):T("Done","Tapos")}))}box.appendChild(a)}show()},
sim:function(m){var id=q("id"),s=D.sims[id];if(!s)return notFound(m);up(id,1);m.appendChild(h("p",{class:"kicker",text:T("Try it · Simulation","Subukan · Simulasyon")}));m.appendChild(h("h1",{class:"page-title",text:T(s.title,s.titleFil||s.title_fil)}));
 m.appendChild(h("p",{class:"muted",text:T("Practice only. Every name, brand and link here is made up.","Practice lang. Gawa-gawa ang lahat ng pangalan, brand at link.")}));
 if(id=="hotline"&&!(s.ui&&s.ui.threatLine))m.appendChild(h("p",{},[h("button",{class:"btn btn-outline",text:T("If anyone threatens you or asks for photos, stop and tell an adult.","Kung may nagbabanta o humihingi ng litrato, tumigil at magsabi sa adult."),onclick:teacherCard})]));
 var board=h("div",{class:"sim-ui-host"});m.appendChild(board);
 var boardApi=window.RA2SimUI&&s.ui?window.RA2SimUI.mount(board,s,{h:h,T:T,fil:fil,teacherCard:teacherCard}):{setStep:function(){}};
 var box=h("div");m.appendChild(box);
 runner(box,s.steps,{onStep:function(i){if(boardApi&&boardApi.setStep)boardApi.setStep(i)},onEnd:function(ok,n,pts){up(id,2);var max=n*10,pass=pts/max>=0.8;st.pts+=pts;if(pass){st.pass[id]=(st.pass[id]||0)+1;up(id,st.pass[id]>=2?4:3);if(st.pass[id]>=2&&st.badges.indexOf(s.badge)<0)st.badges.push(s.badge)}save(st);
  box.innerHTML="";box.appendChild(h("div",{class:"quiz"},[h("h2",{text:pass?T("You passed!","Pasado ka!"):T("Good practice!","Magandang practice!")}),h("p",{text:T("Score: ","Puntos: ")+pts+"/"+max+" · "+T("first-try correct: ","tama sa unang subok: ")+ok+"/"+n}),h("p",{},[T("Level: ","Antas: "),lvlTag(id)]),
   h("p",{class:"muted",text:pass&&st.pass[id]<2?T("Pass once more to reach Mastered.","Pumasa ulit para maging Dalubhasa."):st.pass[id]>=2?T("Badge unlocked: ","Nakuha ang badge: ")+s.badge:T("Score at least 80% of points to pass. Hints or retries are worth 5 points.","Kailangan 80% ng puntos para pumasa. 5 puntos ang hint o ulit.")}),
   h("div",{class:"quiz-actions"},[h("button",{class:"btn btn-outline",text:T("Try again","Subukan ulit"),onclick:function(){location.reload()}}),h("button",{class:"btn btn-solid",text:T("Done (clear screen)","Tapos (linisin ang screen)"),onclick:function(){box.innerHTML="";location.href="index.html"}})])]))}})},
practice:function(m){var id=q("id"),isU=!!D.units[id],qz=isU?null:D.quizzes[id];if(!isU&&!qz)return notFound(m);var qs=isU?D.units[id].reduce(function(a,k){return a.concat(D.quizzes[k].qs)},[]):qz.qs;
 m.appendChild(h("p",{class:"kicker",text:isU?T("Unit test","Unit test"):"Quiz"}));m.appendChild(h("h1",{class:"page-title",text:isU?T("Unit test","Unit test"):T(qz.title,qz.titleFil)}));var box=h("div");m.appendChild(box);
 runner(box,qs,{linkLesson:true,onEnd:function(ok,n,pts,first){st.pts+=pts;qs.forEach(function(x,j){if(first[j])up(x.lesson,isU?4:3)});save(st);var miss=qs.filter(function(x,j){return!first[j]});
  box.innerHTML="";box.appendChild(h("div",{class:"quiz"},[h("h2",{text:ok+"/"+n+" "+T("on the first try","sa unang subok")}),miss.length?h("p",{text:T("Review these lessons:","Balikan ang mga ito:")}):h("p",{text:T("Great job! Your lessons leveled up.","Magaling! Tumaas ang antas mo.")}),
   h("ul",{},miss.map(function(x){return h("li",{},[h("a",{href:"lesson.html?id="+x.lesson,text:D.lessons[x.lesson].title})])})),h("a",{class:"btn btn-solid",href:"index.html",text:T("Back to courses","Bumalik")})]))}})},
profile:function(m){m.appendChild(h("h1",{class:"page-title",text:T("My profile","Profile ko")}));var inp=h("input",{id:"nick",maxlength:"20",autocomplete:"off",value:st.nick||"",style:"font:inherit;padding:.6rem;border:1px solid var(--line);border-radius:10px;min-height:48px;width:100%"});
 inp.addEventListener("change",function(){st.nick=inp.value.slice(0,20);save(st)});
 m.appendChild(h("label",{for:"nick",style:"font-weight:700",text:T("Nickname","Palayaw")}));m.appendChild(inp);m.appendChild(h("p",{class:"muted",text:"⚠️ "+T("Don't use your real name. Saved only on this phone.","Huwag gamitin ang tunay mong pangalan. Sa phone lang ito naka-save.")}));
 var ptsH=h("h2",{},[ico("streak",""),document.createTextNode(" "+st.pts+" "+T("points","puntos"))]);m.appendChild(ptsH);
 m.appendChild(h("h2",{text:T("Badges","Mga badge")}));var bw=h("div");Object.keys(D.sims).forEach(function(k){var s=D.sims[k],b=s.badge,g=st.badges.indexOf(b)>=0,file=badgeArt[k]||"locked";bw.appendChild(h("div",{class:"badge"+(g?" got":"")},[h("img",{src:"art/badges/"+(g?file:"locked")+".svg",alt:g?T(b,s.badge_fil||b):T("Locked badge","Naka-lock na badge"),width:"80",height:"80"}),T(b,s.badge_fil||b),h("small",{class:"muted",text:g?T("Unlocked","Nakuha"):T("Master ","I-master ")+T(s.title,s.titleFil||s.title_fil)})]))});m.appendChild(bw);
 m.appendChild(h("p",{class:"muted",style:"margin-top:1.2rem",text:T("Progress stays on this device only. This site does not collect names, emails, phone numbers or LRNs.","Sa device na ito lang naka-save ang progress. Hindi kumukuha ang site ng pangalan, email, numero o LRN.")}));m.appendChild(h("p",{style:"margin-top:1.5rem"},[h("button",{class:"btn btn-outline",text:T("Shared phone? Clear my progress","Shared phone? Burahin ang progress"),onclick:function(){if(confirm(T("Clear all progress on this device?","Burahin ang lahat ng progress sa device na ito?"))){localStorage.removeItem(K);location.reload()}}})]))},
teacher:function(m){m.appendChild(h("h1",{class:"page-title",text:T("Mastery summary","Buod ng mastery")}));m.appendChild(h("p",{class:"muted",text:T("Show this screen to your teacher. It reads this phone only; nothing is sent anywhere.","Ipakita ito sa guro. Mula lang sa phone na ito; walang pinapadala.")}));
 if(st.nick)m.appendChild(h("p",{html:"<strong>"+T("Nickname","Palayaw")+":</strong> "}).appendChild(document.createTextNode(st.nick)).parentNode);
 D.modules.forEach(function(mod){var t=h("table",{class:"m"},[h("tr",{},[h("th",{text:T(mod.title,mod.fil)}),h("th",{text:T("Level","Antas")})])]);mod.items.forEach(function(it){if(it.type=="lesson"||it.type=="sim")t.appendChild(h("tr",{},[h("td",{text:(it.type=="sim"?"🎮 ":"📘 ")+title(it.type,it.id)}),h("td",{},[lvlTag(it.id)])]))});m.appendChild(t)});
 m.appendChild(h("p",{text:"⭐ "+st.pts+" · 🏅 "+st.badges.length}));var pj=localStorage.getItem("ra-proj")==="1";m.appendChild(h("button",{class:"btn btn-outline",text:pj?T("Turn off projector mode","I-off ang projector mode"):T("Projector mode (bigger text)","Projector mode (malaking teksto)"),onclick:function(){localStorage.setItem("ra-proj",pj?"0":"1");location.reload()}}))},
ask:function(m){m.classList.add("ask-full");mountAsk(m)}
};
function notFound(m){m.appendChild(h("h1",{class:"page-title",text:T("Lesson not found","Hindi nahanap ang aralin")}));m.appendChild(h("p",{class:"muted",text:T("That lesson or simulation is not on this site.","Wala rito ang aralin o simulation na iyon.")}));m.appendChild(h("a",{class:"btn btn-solid",href:"index.html",text:T("Back to courses","Bumalik sa mga kurso")}))}
function runAskSafety(raw){try{var Safe=window.RA2Safety;if(!Safe||typeof Safe.scrubPII!=="function"||typeof Safe.classify!=="function")return {closed:true};var scrub=Safe.scrubPII(raw),verdict=Safe.classify(raw);if(!scrub||!verdict||!verdict.label)return {closed:true};return {closed:false,scrub:scrub,verdict:verdict}}catch(e){return {closed:true}}}
function mountAsk(m){if(document.body.getAttribute("data-page")==="ask"||window.matchMedia("(min-width:1024px)").matches)ensureFaqFil();else m.addEventListener("focusin",function once(){ensureFaqFil();m.removeEventListener("focusin",once)});
m.appendChild(h("img",{class:"mar-face",src:"art/mar-avatar.svg",alt:T("Mar, the site guide","Si Mar, gabay sa site"),width:"64",height:"64"}));m.appendChild(h("h1",{class:"page-title",text:"Ask Mar"}));m.appendChild(h("p",{class:"muted",text:T("Mar answers from this site's lessons, offline. Mar is a program and can be wrong. Questions aren't saved. Don't type your name, phone number, email or LRN.","Sumasagot si Mar mula sa mga aralin, offline. Program si Mar at puwedeng magkamali. Hindi sine-save ang mga tanong. Huwag i-type ang pangalan, numero, email o LRN.")}));
 var Safe=window.RA2Safety;
 var chat=h("div",{class:"chat"}),inp=h("input",{class:"ask-in",maxlength:"200",autocomplete:"off","aria-label":"Ask Mar",placeholder:T("Ask about AI, IT or cyber…","Magtanong tungkol sa AI, IT o cyber…"),style:"flex:1;font:inherit;padding:.6rem;border:1px solid var(--line);border-radius:10px;min-height:48px;min-width:0"});
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
 function needHelpBtn(){return h("button",{type:"button",class:"btn need-help-btn",text:T("Need help?","Kailangan ng tulong?"),"aria-label":T("Get help from a person","Humingi ng tulong sa tao"),onclick:function(){teacherCard()}})}
 function paintAsk(b){var wrap=h("div",{class:"ask-turn"});wrap.appendChild(b);var help=needHelpBtn();wrap.appendChild(help);chat.appendChild(wrap);help.scrollIntoView({block:"end",inline:"nearest"})}
 function showFaq(b,t,opts){var best=null,sc=0,lo=t.toLowerCase();D.faq.forEach(function(f){var s=faqScore(f,lo);if(s>sc){sc=s;best=f}});var min=(opts&&opts.allowOne)?1:((Safe&&Safe.MIN_FAQ_SCORE)||2),quizish=/answer|sagot|quiz|which is|alin|correct/.test(lo);
  if(!best||sc<min){b.appendChild(h("p",{text:T("I only know about AI, IT and cyber safety. Try asking about passwords, scams, Wi-Fi or how AI learns!","AI, IT at cyber lang ang alam ko. Subukang magtanong tungkol sa password, scam, Wi-Fi o paano natututo ang AI!")}));b.appendChild(h("a",{class:"btn btn-solid",href:"index.html",text:T("Practice this","I-practice ito")}));return}
  if(quizish){b.appendChild(h("p",{text:"💡 "+T("Hint first: ","Pahiwatig muna: ")+faqText(best,"back","backf")}));var full=h("button",{class:"btn btn-outline",text:T("Show full answer","Ipakita ang sagot"),onclick:function(){full.replaceWith(h("p",{text:faqText(best,"a","af")}))}});b.appendChild(full)}
  else{b.appendChild(h("p",{text:faqText(best,"a","af")}));b.appendChild(h("p",{text:"🤔 "+faqText(best,"back","backf")}))}
  b.appendChild(h("a",{class:"btn btn-solid",href:best.link,text:T("Practice this","I-practice ito")}))}
 function reply(raw){
  /* Official RA2Safety run order. Never store the question. Classify the original wording.
     Fail closed: if the safety module is missing or throws, show the help card and do not answer. */
  var gate=runAskSafety(raw);
  if(gate.closed){inp.value="";teacherCard();return}
  var scrub=gate.scrub,verdict=gate.verdict;
  var t=scrub.clean,label=verdict.label;
  inp.value="";
  chat.appendChild(h("div",{class:"me",text:t}));
  if(scrub.found&&scrub.found.length)chat.appendChild(h("p",{class:"pii-warn",text:T("I hid a phone number, email, LRN or address from the screen. Don't type personal details on a shared phone.","Itinago ko ang numero, email, LRN o address. Huwag mag-type ng personal na detalye sa shared phone.")}));
  if(label==="crisis"){teacherCard();return}
  var b=h("div",{class:"mar"});
  if(label==="harmful"){
   b.appendChild(h("p",{text:T("I can't help with that. I only answer questions about AI, IT and cyber safety.","Hindi ko iyon matutulongan. AI, IT at cyber safety lang ang sinasagot ko.")}));
   paintAsk(b);return}
  if(label==="maybe"){showFaq(b,t,{allowOne:true});b.appendChild(h("button",{type:"button",class:"btn btn-outline happen-btn",text:T("Is this happening to you?","Nangyayari ba ito sa iyo?"),onclick:teacherCard}));paintAsk(b);return}
  /* offtopic-or-faq: answer only when the keyword score is >= MIN_FAQ_SCORE (2). */
  showFaq(b,t);
  paintAsk(b)}
 var f=h("form",{class:"ask-form",onsubmit:function(e){e.preventDefault();if(inp.value.trim())reply(inp.value.trim())}},[inp,h("button",{class:"btn btn-solid",text:T("Ask","Itanong")})]);
 m.appendChild(chat);m.appendChild(h("p",{class:"ask-tools"},[h("button",{class:"btn btn-outline",text:T("Ask a teacher","Magtanong sa guro"),onclick:teacherCard}),h("button",{class:"btn btn-outline",style:"margin-left:.4rem",text:T("Clear chat","Linisin"),onclick:function(){chat.innerHTML=""}})]));m.appendChild(f);
 window.addEventListener("pagehide",function(){inp.value="";chat.innerHTML=""});
 if(window.visualViewport)visualViewport.addEventListener("resize",function(){document.documentElement.style.setProperty("--kb",Math.max(0,innerHeight-visualViewport.height)+"px")})}
function nextAfter(id){for(var a=0;a<D.modules.length;a++){var it=D.modules[a].items;for(var b=0;b<it.length;b++)if(it[b].id==id)return it[b+1]}}
if("serviceWorker" in navigator)addEventListener("load",function(){navigator.serviceWorker.register("sw.js",{scope:"./"}).catch(function(){})});
document.addEventListener("keydown",function(e){if(e.target.tagName=="INPUT"||document.querySelector(".overlay"))return;if(e.key=="ArrowDown"||e.key=="ArrowUp"){var c=[].slice.call(document.querySelectorAll(".choice:not([disabled])"));if(!c.length)return;var i=c.indexOf(document.activeElement);i=e.key=="ArrowDown"?Math.min(c.length-1,i+1):Math.max(0,i-1);c[i].focus();e.preventDefault()}else if(e.key=="ArrowRight"||e.key=="ArrowLeft"){var bs=document.querySelectorAll(".lesson-col .quiz-actions .btn,.step-nav");var want=e.key=="ArrowRight"?/Next|Susunod|Continue|Magpatuloy|Try it|Subukan|Done|Tapos/:/Back|Bumalik/;[].some.call(document.querySelectorAll(".lesson-col .quiz-actions .btn"),function(b){if(want.test(b.textContent)){b.click();return true}})}});
function privacyFooter(){var f=h("footer",{class:"site-footer"},[h("p",{text:T("Preview only — not for class use yet. Progress stays on this device. This site does not collect names, emails, phone numbers or LRNs. Ask Mar questions aren't saved.","Preview lang — hindi pa para sa klase. Sa device na ito lang ang progress. Hindi kumukuha ang site ng pangalan, email, numero o LRN. Hindi sine-save ang mga tanong kay Ask Mar.")}),h("p",{text:T("This site is hosted on GitHub Pages, which may log visitors' IP addresses. We don't collect anything.","Naka-host ang site na ito sa GitHub Pages, na maaaring mag-log ng IP address ng bisita. Wala kaming kinokolekta.")})]);document.body.appendChild(f)}
document.addEventListener("DOMContentLoaded",function(){mergeFaqFil();maybeLoadFaqFil();document.documentElement.lang=fil?"fil":"en";header();var m=document.getElementById("main");var pg=document.body.dataset.page;(P[pg]||P.home)(m);
 if(pg!="ask"){var side=h("aside",{class:"ask-side","aria-label":"Ask Mar"});document.body.appendChild(side);mountAsk(side);document.body.classList.add("with-ask")}privacyFooter();});
})();
