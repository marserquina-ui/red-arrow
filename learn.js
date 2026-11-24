/* Red Arrow v2: the Learn tab (index.html only, v31). Moved out of v2.js so shared pages stay light.
   Progress is read from the same on-device keys as before (ra2 via v2.js, ra-open for folds, the
   session's ra-ui for "Step i/n"). New: sessionStorage ra-learn (filter tab). Nothing leaves the phone.
   "Download course" saves a course's lesson files into the site's offline cache (Cache API).
   FILIPINO strings are DRAFT (NATIVE-SPEAKER-REVIEW.md A23). */
(function(){
/* [minutes, gzip bytes] per lazy-loaded file; "_" is deep.js. Written by scripts/learn-meta.js. */
var META=/*META*/{"_":[0,4674],"ai-l03":[11,7870],"ai-l04":[11,7246],"ai-l05":[12,7384],"ai-l06":[12,8059],"ai-l07":[11,7287],"ai-l08":[12,7738],"ai-l09":[12,7391],"ai-l10":[12,9174],"ai-l11":[12,7118],"ai-l12":[12,7021],"ai-l13":[13,7977],"ai-l14":[12,7735],"ai-project":[30,9407],"ai-unit":[20,10154],"cy-l03":[12,6428],"cy-l04":[13,7353],"cy-l05":[12,6998],"cy-l06":[11,6424],"cy-l07":[11,7419],"cy-l08":[11,7148],"cy-l09":[11,7395],"cy-l10":[11,7313],"cy-l11":[11,6028],"cy-l12":[11,6478],"cy-l13":[11,6873],"cy-l14":[11,6733],"cy-unit":[20,10018],"it-l01":[12,4424],"it-l02":[12,4222],"it-l03":[12,3751],"it-l04":[13,4056],"it-l05":[12,3876],"it-l06":[13,4110],"it-l07":[13,3962],"it-l08":[14,4203],"it-l09":[14,4767],"it-l10":[14,5044],"it-l11":[14,5007],"it-l12":[14,4568],"it-l13":[14,5041],"it-l14":[13,4929]}/*END*/;
var OUT={
 ai:["What AI is, how it learns from data, and how to use it honestly and safely.","Ano ang AI, paano ito natututo mula sa data, at paano ito gamitin nang tapat at ligtas.",[
  ["Explain what AI is and how a model learns from examples.","Ipaliwanag kung ano ang AI at paano natututo ang isang model mula sa mga halimbawa."],
  ["Spot AI mistakes, bias and made-up answers before you trust them.","Makita ang mga mali, bias at gawa-gawang sagot ng AI bago ito pagkatiwalaan."],
  ["Use AI for schoolwork honestly, as a helper, not a ghostwriter.","Gamitin nang tapat ang AI sa schoolwork, bilang katulong at hindi ghostwriter."],
  ["Protect your privacy and other people's work when you use AI.","Protektahan ang privacy mo at ang gawa ng iba kapag gumagamit ng AI."],
  ["Build and test a simple sorter, and judge if it is any good.","Bumuo at mag-test ng simpleng sorter, at suriin kung maayos ito."]]],
 cyber:["Stay safe from scams and hackers, and see how security teams protect people.","Manatiling ligtas sa scam at hacker, at alamin kung paano pinoprotektahan ng mga security team ang mga tao.",[
  ["Make strong passphrases and spot phishing, smishing and fake calls.","Gumawa ng matibay na passphrase at makilala ang phishing, smishing at pekeng tawag."],
  ["Keep your phone, apps and Wi-Fi safe, including piso Wi-Fi.","Panatilihing ligtas ang phone, mga app at Wi-Fi mo, pati ang piso Wi-Fi."],
  ["Know your rights under the Data Privacy Act and the Cybercrime Prevention Act.","Alamin ang mga karapatan mo sa ilalim ng Data Privacy Act at Cybercrime Prevention Act."],
  ["Know what to do, step by step, if an account gets hacked.","Alamin ang gagawin, hakbang-hakbang, kapag na-hack ang isang account."],
  ["Read logs and judge risks the way a security analyst does.","Magbasa ng logs at sumuri ng panganib gaya ng isang security analyst."]]],
 it:["How computers and networks work, and how to fix them when they don't.","Paano gumagana ang mga computer at network, at paano ayusin ang mga ito kapag may sira.",[
  ["Name the parts of a computer and choose hardware on a budget.","Pangalanan ang mga bahagi ng computer at pumili ng hardware na abot-kaya."],
  ["Explain how data moves: IP addresses, DNS, packets and routers.","Ipaliwanag kung paano gumagalaw ang data: IP address, DNS, packet at router."],
  ["Install an operating system and set up a small network.","Mag-install ng operating system at mag-set up ng maliit na network."],
  ["Fix problems with a step-by-step troubleshooting method.","Ayusin ang mga problema gamit ang hakbang-hakbang na paraan ng troubleshooting."],
  ["Build a spreadsheet model with charts for a sari-sari store.","Gumawa ng spreadsheet model na may chart para sa isang sari-sari store."]]]};
var TOPICS=["Phishing","Password","Privacy","Wi-Fi","Network","Spreadsheet"];
var CACHE_FALLBACK="red-arrow-hub-v31";
window.RA2Learn=function(m,A){
 var D=A.D,st=A.st,T=A.T,h=A.h,ico=A.ico,href=A.href,title=A.title,lvlTag=A.lvlTag,lsGet=A.lsGet,lsSet=A.lsSet,runAskSafety=A.runAskSafety,searchLessons=A.searchLessons,teacherCard=A.teacherCard,continueStepLabel=A.continueStepLabel;
 m.classList.add("home");
 function lessonIdsOf(qid){var Q=D.quizzes[qid]||{};var l=(Q.lessons||[]).slice();(Q.qs||[]).forEach(function(x){if(x.lesson&&l.indexOf(x.lesson)<0)l.push(x.lesson)});return l}
 var flat=[];D.modules.forEach(function(mod){mod.items.forEach(function(it){flat.push({it:it,mod:mod})})});
 function lv0(id){return st.m[id]||0}
 function core(it){return it.type==="lesson"||it.type==="sim"}
 function done(it){if(core(it))return lv0(it.id)>=2;if(it.type==="quiz"){var l=lessonIdsOf(it.id);return l.length>0&&l.every(function(x){return lv0(x)>=3})}return false}
 function nextUp(){var cr=flat.filter(function(x){return core(x.it)});
  var anyStarted=cr.some(function(x){return lv0(x.it.id)>0});
  if(st.last){var cur=cr.filter(function(x){return x.it.id===st.last})[0];if(cur&&lv0(cur.it.id)<2)return {x:cur,mode:"resume"}}
  var nx=cr.filter(function(x){return lv0(x.it.id)<2})[0];if(nx)return {x:nx,mode:anyStarted?"next":"start"};
  var qz=flat.filter(function(x){return x.it.type==="quiz"&&lessonIdsOf(x.it.id).some(function(l){return lv0(l)<3})})[0];if(qz)return {x:qz,mode:"quiz"};
  return {mode:"done"}}
 function itemTitle(it,mod){return it.type==="unit"?T("Unit test","Unit test")+": "+T(mod.title,mod.fil):title(it.type,it.id)}
 function kindLabel(t){return t==="lesson"?T("Lesson","Aralin"):t==="sim"?T("Simulation","Simulasyon"):t==="quiz"?"Quiz":T("Unit test","Unit test")}
 /* time and offline size */
 function deepKey(it){return it.type==="unit"?(D.deepUnits||{})[it.id]||null:(it.type==="lesson"&&D.lessons[it.id]&&D.lessons[it.id].deep)?it.id:null}
 function mins(it){var k=deepKey(it);if(k&&META[k])return META[k][0];if(it.type==="lesson")return (((D.lessons[it.id]||{}).cards)||[]).length+1;if(it.type==="sim")return 2*(((D.sims[it.id]||{}).steps)||[]).length;if(it.type==="quiz")return Math.max(2,((D.quizzes[it.id]||{}).qs||[]).length);return 15}
 function fmtMin(n){if(n<60)return "~"+n+" min";var r=n%60,x=Math.floor(n/60);return "~"+x+T(" h"," oras")+(r?" "+r+" min":"")}
 function kb(b){return Math.max(1,Math.round(b/1024))+" KB"}
 var hasC=typeof caches!=="undefined",offMap={},appReady=false,metaEls=[],dlBoxes=[];
 function offLabel(it){var k=deepKey(it);if(!k)return appReady?T("Works offline","Gumagana offline"):"";if(offMap[k])return T("Works offline","Gumagana offline");return T("Download first","I-download muna")+(META[k]?" · "+kb(META[k][1]):"")}
 function metaText(it){var o=offLabel(it);return kindLabel(it.type)+" · "+fmtMin(mins(it))+(o?" · "+o:"")}
 function paintMeta(){metaEls=metaEls.filter(function(p){return p[0].isConnected});metaEls.forEach(function(p){p[0].textContent=metaText(p[1])});dlBoxes.forEach(function(f){f()})}
 function checkOffline(){if(!hasC)return paintMeta();var ks=Object.keys(META).filter(function(k){return k!=="_"});
  Promise.all([caches.match("v2.js").then(function(r){appReady=!!r})].concat(ks.map(function(k){return caches.match("deep/"+k+".js").then(function(r){offMap[k]=!!r})}))).then(paintMeta,paintMeta)}
 function deepIds(mod){var o=[];mod.items.forEach(function(it){var k=deepKey(it);if(k&&META[k]&&o.indexOf(k)<0)o.push(k)});return o}
 function stat(mod){var c=mod.items.filter(core),ls=mod.items.filter(function(x){return x.type==="lesson"});
  return {nL:ls.length,nS:c.length-ls.length,nQ:mod.items.filter(function(x){return x.type==="quiz"}).length,nU:mod.items.filter(function(x){return x.type==="unit"}).length,
   dn:ls.filter(done).length,started:c.some(function(x){return lv0(x.id)>0}),fin:c.length>0&&c.every(done),min:mod.items.reduce(function(a,x){return a+mins(x)},0)}}
 var nu=nextUp();
 function curOf(mod){if(nu.x&&nu.x.mod===mod)return nu.x.it;return mod.items.filter(function(x){return core(x)&&!done(x)})[0]||null}
 function bar(mod,s){var pct=s.nL?Math.round(100*s.dn/s.nL):0;return h("div",{class:"lbar"},[h("div",{class:"bar",role:"progressbar","aria-valuemin":"0","aria-valuemax":String(s.nL),"aria-valuenow":String(s.dn),"aria-label":T(mod.title,mod.fil)},[h("span",{style:"width:"+pct+"%"})]),h("small",{text:s.started?s.dn+" "+T("of","sa")+" "+s.nL+" "+T("lessons done","aralin ang tapos"):T("Not started yet","Hindi pa nasisimulan")})])}
 /* numbered path: done, up next, not started (nothing is locked) */
 function row(it,n,mod,cur){var d=done(it),c=it===cur,meta=h("small",{text:metaText(it)});metaEls.push([meta,it]);
  return h("li",{class:"lstep"+(d?" is-done":"")+(c?" is-cur":"")},[h("a",{class:"mrow "+it.type,href:href(it)},[h("span",{class:"pn","aria-hidden":"true"},d?[ico("check","")]:[String(n)]),h("span",{class:"t"},[h("strong",{text:itemTitle(it,mod)}),meta,d||c?h("span",{class:"pst",text:d?T("Done","Tapos na"):T("Up next","Susunod")}):null]),core(it)&&lv0(it.id)?lvlTag(it.id):null])])}
 function path(mod,cur,only){var ol=h("ol",{class:"lpath"});mod.items.forEach(function(it,i){if(!only||only.indexOf(it)>=0)ol.appendChild(row(it,i+1,mod,cur))});return ol}
 /* download a whole course into the offline cache */
 function pickCache(){return caches.keys().then(function(ks){var best=null,bn=-1;ks.forEach(function(k){var x=/^red-arrow-hub-v(\d+)$/.exec(k);if(x&&+x[1]>bn){bn=+x[1];best=k}});return caches.open(best||CACHE_FALLBACK)})}
 function dlBox(mod){var ids=deepIds(mod);if(!ids.length)return null;var bytes=ids.reduce(function(a,k){return a+META[k][1]},(META._||[0,0])[1]),busy=false,msg="",bad=false;
  var lab=h("span"),btn=h("button",{type:"button",class:"btn btn-outline ldl-btn",onclick:run},[ico("download",""),lab]),pb=h("span"),prog=h("div",{class:"bar",hidden:"hidden"},[pb]),note=h("p",{class:"ldl-st",role:"status"}),box=h("div",{class:"ldl"},[btn,prog,note]);
  function paint(i,n){var have=ids.filter(function(k){return offMap[k]}).length;box.classList.toggle("is-done",have===ids.length&&!busy);box.classList.toggle("is-bad",bad);
   if(!hasC){btn.hidden=true;note.textContent=T("This browser can't save courses for offline.","Hindi kayang mag-save ng kurso para sa offline ang browser na ito.");return}
   if(busy){btn.disabled=true;prog.hidden=false;pb.style.width=Math.round(100*i/n)+"%";lab.textContent=T("Saving… ","Sine-save… ")+i+" "+T("of","sa")+" "+n;note.textContent=lab.textContent;return}
   btn.disabled=false;prog.hidden=true;
   if(have===ids.length){btn.hidden=true;note.innerHTML="";note.appendChild(ico("check",""));note.appendChild(document.createTextNode(T("Saved for offline. Works without internet.","Naka-save na para sa offline. Gumagana kahit walang internet.")));return}
   btn.hidden=false;lab.textContent=msg?T("Try again","Subukan ulit"):T("Download for offline","I-download para sa offline")+" · "+kb(bytes);
   note.textContent=msg||(have?have+" "+T("of","sa")+" "+ids.length+" "+T("files saved","file ang naka-save"):T("Use Wi-Fi if you can.","Gumamit ng Wi-Fi kung puwede."))}
  dlBoxes.push(function(){paint()});
  function fin(e){busy=false;bad=!!e;msg=e||"";paintMeta()}
  function run(){if(busy)return;if(navigator.onLine===false){bad=true;msg=T("You're offline. Connect to Wi-Fi, then try again.","Offline ka. Kumonekta sa Wi-Fi, saka subukan ulit.");return paint()}
   var list=["deep.js"].concat(ids.filter(function(k){return !offMap[k]}).map(function(k){return "deep/"+k+".js"})),i=0,fails=0;busy=true;bad=false;msg="";paint(0,list.length);
   var est=navigator.storage&&navigator.storage.estimate?navigator.storage.estimate().catch(function(){return null}):Promise.resolve(null);
   est.then(function(e){if(e&&e.quota&&e.quota-(e.usage||0)<bytes*4)throw {quota:1};return pickCache()}).then(function(c){
    function next(){if(i>=list.length)return fails;var u=list[i++];paint(i,list.length);
     return fetch(u,{cache:"reload"}).then(function(r){if(!r.ok)throw new Error("http");return c.put(u,r)}).then(function(){if(u!=="deep.js")offMap[u.slice(5,-3)]=true},function(e){if(e&&e.name==="QuotaExceededError")throw {quota:1};fails++}).then(next)}
    return next()}).then(function(f){fin(f?T("Some files didn't download. Check your connection, then tap Try again.","May mga file na hindi na-download. Tingnan ang koneksyon, saka pindutin ang Subukan ulit."):"")},
    function(e){fin(e&&e.quota?T("Not enough space on this phone. Free some space, then try again.","Kulang ang space sa phone na ito. Magbakante ng space, saka subukan ulit."):T("The download stopped. Check your connection, then tap Try again.","Huminto ang download. Tingnan ang koneksyon, saka pindutin ang Subukan ulit."))})}
  paint();return box}
 function goBtn(mod,s,cur){var first=mod.items[0];if(!s.started)return h("a",{class:"btn btn-solid lgo",href:"index.html?course="+mod.id},[h("span",{text:T("Preview and start","Silipin at simulan")}),ico("next","")]);
  if(s.fin)return h("a",{class:"btn btn-solid lgo",href:"index.html?course="+mod.id,text:T("Review course","Balikan ang kurso")});
  return h("a",{class:"btn btn-solid lgo",href:href(cur||first)},[h("span",{text:T("Continue","Ituloy")}),ico("next","")])}
 function countLine(s){return s.nL+" "+T(s.nL===1?"lesson":"lessons","na aralin")+" · "+s.nS+" "+T(s.nS===1?"sim":"sims","sim")+" · "+fmtMin(s.min)}
 /* ---- course preview: index.html?course=<id> ---- */
 var pid=new URLSearchParams(location.search).get("course"),pmod=D.modules.filter(function(x){return x.id===pid})[0];
 if(pmod){var s=stat(pmod),cur=curOf(pmod),o=OUT[pmod.id];
  m.appendChild(h("a",{class:"btn btn-outline lback",href:"index.html"},[ico("back",""),T("All courses","Lahat ng kurso")]));
  var pv=h("section",{class:"lpv"});m.appendChild(pv);
  pv.appendChild(h("p",{class:"kicker",text:T("Course preview","Silip sa kurso")}));
  pv.appendChild(h("h1",{class:"page-title",text:T(pmod.title,pmod.fil)}));
  pv.appendChild(h("img",{class:"course-cover",src:"art/courses/"+pmod.id+".svg",alt:"",width:"640",height:"240"}));
  if(o)pv.appendChild(h("p",{class:"lpv-intro",text:T(o[0],o[1])}));
  var chips=[s.nL+" "+T(s.nL===1?"lesson":"lessons","na aralin"),s.nS+" "+T(s.nS===1?"simulation":"simulations","simulation"),s.nQ+" "+T(s.nQ===1?"quiz":"quizzes","quiz"),s.nU+" unit test",fmtMin(s.min)];
  pv.appendChild(h("ul",{class:"lpv-stats","aria-label":T("What's inside","Ano ang laman")},chips.map(function(c){return h("li",{text:c})})));
  if(o){pv.appendChild(h("h2",{text:T("What you'll learn","Ano ang matututunan mo")}));pv.appendChild(h("ul",{class:"lpv-out"},o[2].map(function(x){return h("li",{text:T(x[0],x[1])})})))}
  var sims=pmod.items.filter(function(x){return x.type==="sim"});
  if(sims.length){pv.appendChild(h("h2",{text:T("Simulations inside","Mga simulation sa loob")}));pv.appendChild(h("ul",{class:"lpv-out"},sims.map(function(x){return h("li",{},[h("strong",{text:title("sim",x.id)}),h("span",{class:"muted",text:" · "+fmtMin(mins(x))})])})))}
  pv.appendChild(bar(pmod,s));
  var tgt=cur||pmod.items[0];
  pv.appendChild(h("a",{class:"btn btn-solid lgo lpv-go",href:href(tgt)},[h("span",{text:(s.started?T("Continue","Ituloy"):T("Start","Simulan"))+": "+itemTitle(tgt,pmod)}),ico("next","")]));
  var db=dlBox(pmod);if(db)pv.appendChild(db);
  pv.appendChild(h("h2",{text:T("Course path","Landas ng kurso")}));
  pv.appendChild(path(pmod,cur));
  checkOffline();return}
 /* ---- Learn home ---- */
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
 /* 1. Continue where you left off (reads ra2 + this session's ra-ui) */
 var cc=h("section",{class:"card continue-card","aria-labelledby":"continue-title"});
 if(nu.mode==="done"){cc.appendChild(h("h2",{id:"continue-title",class:"continue-title",text:T("You finished every lesson. Nice work!","Natapos mo ang lahat ng aralin. Magaling!")}));cc.appendChild(h("p",{class:"muted",text:T("Try a unit test below, or ask Mar something new.","Subukan ang unit test sa ibaba, o magtanong kay Mar.")}))}
 else{var it=nu.x.it,mod=nu.x.mod,ms=stat(mod),lsn=mod.items.filter(function(x){return x.type===it.type}),pos=lsn.indexOf(it)+1,cm=h("p",{class:"continue-meta",text:metaText(it)});metaEls.push([cm,it]);
  cc.appendChild(h("p",{class:"kicker",text:nu.mode==="start"?T("New here? Start here","Bago ka rito? Magsimula rito"):T(mod.title,mod.fil)+" · "+kindLabel(it.type)+" "+pos+" "+T("of","sa")+" "+lsn.length}));
  cc.appendChild(h("h2",{id:"continue-title",class:"continue-title",text:itemTitle(it,mod)+continueStepLabel(it)}));
  cc.appendChild(cm);cc.appendChild(bar(mod,ms));
  cc.appendChild(h("a",{class:"btn btn-solid continue-btn",href:href(it),"aria-describedby":"continue-title"},[h("span",{text:nu.mode==="start"?T("Start","Simulan"):T("Continue","Ituloy")}),ico("next","")]))}
 top.appendChild(cc);
 /* Courses */
 top.appendChild(h("h2",{class:"section-title",text:T("Your courses","Mga kurso mo")}));
 var openMap={};try{openMap=JSON.parse(lsGet("ra-open","{}"))||{}}catch(e){openMap={}}
 var progressMod=null;if(st.last){D.modules.forEach(function(mod){if(mod.items.some(function(it){return it.id===st.last}))progressMod=mod.id})}
 if(!progressMod){D.modules.forEach(function(mod){if(progressMod)return;if(mod.items.some(function(it){return core(it)&&lv0(it.id)>0}))progressMod=mod.id})}
 /* 5. filters + topic search */
 var F=[["all",T("All","Lahat")],["prog",T("In progress","Ginagawa pa")],["fin",T("Finished","Tapos na")]],fcur="all";try{fcur=sessionStorage.getItem("ra-learn")||"all"}catch(e){}
 var fbtns=F.map(function(f){return h("button",{type:"button",class:"news-chip lf-btn","aria-pressed":"false","data-f":f[0],text:f[1],onclick:function(){setF(f[0])}})});
 var fbar=h("div",{class:"lfilt",role:"group","aria-label":T("Show courses","Ipakita ang mga kurso")},fbtns);
 var tin=h("input",{class:"home-ask-in ltopic-in",type:"search",autocomplete:"off",spellcheck:"false",id:"ltopic","aria-label":T("Find a topic","Maghanap ng paksa"),placeholder:T("Find a topic","Maghanap ng paksa")});
 var tclr=h("button",{type:"button",class:"btn btn-outline",hidden:"hidden",text:T("Clear","I-clear"),onclick:function(){tin.value="";topic();tin.focus()}});
 var tchips=h("div",{class:"lchips"},TOPICS.map(function(w){return h("button",{type:"button",class:"news-chip lchip","aria-pressed":"false",text:w,onclick:function(){tin.value=w;topic()}})}));
 var tstat=h("p",{class:"sr-live",role:"status"}),tres=h("div",{class:"ltres"}),fempty=h("p",{class:"muted lempty",hidden:"hidden"});
 top.appendChild(fbar);top.appendChild(h("div",{class:"ltopic"},[h("div",{class:"home-ask"},[tin,tclr]),tchips]));top.appendChild(tstat);top.appendChild(tres);top.appendChild(fempty);
 var grid=h("div",{class:"course-grid"});m.appendChild(grid);var cards=[];
 D.modules.forEach(function(mod){var s=stat(mod),cur=curOf(mod);
  var cover=h("img",{class:"course-cover",src:"art/courses/"+mod.id+".svg",alt:"",width:"640",height:"240"});
  var titleEl=h("h3",{class:"course-title"},[h("span",{text:T(mod.title,mod.fil)}),s.fin?h("span",{class:"lfin"},[ico("check",""),T("Finished","Tapos na")]):null]);
  var count=h("p",{class:"course-count",text:countLine(s)});
  var acts=h("div",{class:"lacts"},[goBtn(mod,s,cur),s.started&&!s.fin?h("a",{class:"btn btn-outline",href:"index.html?course="+mod.id,text:T("Course overview","Buod ng kurso")}):null]);
  var startOpen=(openMap[mod.id]===true)||(openMap[mod.id]==null&&progressMod===mod.id);
  var list=h("div",{class:"course-items"});if(!startOpen)list.setAttribute("hidden","");
  var tog=h("button",{type:"button",class:"course-toggle","aria-expanded":startOpen?"true":"false",onclick:function(){var open=tog.getAttribute("aria-expanded")!=="true";tog.setAttribute("aria-expanded",open?"true":"false");if(open)list.removeAttribute("hidden");else list.setAttribute("hidden","");openMap[mod.id]=open;lsSet("ra-open",JSON.stringify(openMap))}},[h("span",{text:T("See the path: ","Tingnan ang landas: ")+mod.items.length+" "+T("steps","hakbang")})]);
  list.appendChild(path(mod,cur));
  var card=h("section",{class:"card course-card"+(s.fin?" is-fin":"")},[h("div",{class:"lhead"},[cover,h("div",{},[titleEl,count])]),bar(mod,s),acts,dlBox(mod),tog,list]);
  card._s=s;cards.push(card);grid.appendChild(card)});
 function setF(f){fcur=f;try{sessionStorage.setItem("ra-learn",f)}catch(e){}fbtns.forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-f")===f?"true":"false")});var n=0;
  cards.forEach(function(c){var ok=f==="all"||(f==="fin"?c._s.fin:c._s.started&&!c._s.fin);c.hidden=!ok;if(ok)n++});
  fempty.hidden=!!n;fempty.textContent=f==="fin"?T("No finished courses yet. Keep going!","Wala pang natapos na kurso. Tuloy lang!"):T("No courses in progress yet. Start one from All.","Wala pang kursong sinimulan. Magsimula ng isa sa Lahat.")}
 function bagOf(it){var L=it.type==="lesson"?D.lessons[it.id]:null;return (itemTitle(it,{title:"",fil:""})+" "+(L?(L.titleFil||"")+" "+(L.cards||[]).map(function(c){return (c.h||"")+" "+(c.t||"")}).join(" "):"")).toLowerCase()}
 function topic(){var v=tin.value.trim().toLowerCase(),ws=v.split(/\s+/).filter(function(w){return w.length>1});tres.innerHTML="";tclr.hidden=!v;
  [].forEach.call(tchips.children,function(b){b.setAttribute("aria-pressed",b.textContent.toLowerCase()===v?"true":"false")});
  if(!ws.length){grid.hidden=false;fbar.hidden=false;tstat.textContent="";setF(fcur);return}
  grid.hidden=true;fbar.hidden=true;fempty.hidden=true;var n=0;
  D.modules.forEach(function(mod){var hit=mod.items.filter(function(it){var b=bagOf(it);return ws.every(function(w){return b.indexOf(w)>=0})});if(!hit.length)return;n+=hit.length;
   tres.appendChild(h("section",{class:"card ltres-c"},[h("h3",{class:"course-title",text:T(mod.title,mod.fil)}),path(mod,curOf(mod),hit)]))});
  var msg=n?n+" "+T(n===1?"lesson matches":"lessons match","na aralin ang tugma"):T("No lessons match this topic.","Walang araling tugma sa paksang ito.");tstat.textContent=msg;
  if(!n)tres.appendChild(h("p",{class:"muted lempty",text:msg}));paintMeta()}
 var ttimer=null;tin.addEventListener("input",function(){clearTimeout(ttimer);ttimer=setTimeout(topic,200)});
 setF(fcur);checkOffline()};
})();
