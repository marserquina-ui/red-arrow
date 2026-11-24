/* Red Arrow Hub: News page (news.html only). Loaded after v2.js; v2.js passes in its helpers.
   Reads only the same-origin news.json that the daily GitHub Action writes. No images, no favicons,
   no requests to news sites until a student taps a story. Filipino strings are drafts for teacher review. */
(function(){
function render(m,A){var h=A.h,T=A.T,D=A.D||{},fil=A.fil,uiState=A.uiState;
 m.classList.add("news-page");
 var TABS=[["top",T("Top stories","Nangungunang balita")],["ai","AI"],["cyber","Cyber"],["it","IT"],["labs","AI Labs"]];
 var REG=[["all",T("All","Lahat")],["PH",T("Philippines","Pilipinas")],["Asia",T("Asia","Asya")],["US","US"],["Europe",T("Europe","Europa")]];
 function regName(r){if(r==="Global")return "Global";for(var i=0;i<REG.length;i++)if(REG[i][0]===r)return REG[i][1];return r}
 var TOP={ai:"AI",cyber:"Cyber",it:"IT"};
 function ms(s){var t=Date.parse(s);return isNaN(t)?0:t}
 function rel(s){var d=Date.now()-ms(s);if(d<0)d=0;var mi=Math.floor(d/60000),hr=Math.floor(d/3600000),dy=Math.floor(d/86400000);
  if(mi<1)return T("just now","ngayon lang");
  if(mi<60)return mi===1?T("1 minute ago","1 minuto na ang nakalipas"):T(mi+" minutes ago",mi+" minuto na ang nakalipas");
  if(hr<24)return hr===1?T("1 hour ago","1 oras na ang nakalipas"):T(hr+" hours ago",hr+" oras na ang nakalipas");
  return dy===1?T("1 day ago","1 araw na ang nakalipas"):T(dy+" days ago",dy+" araw na ang nakalipas")}
 function manila(s,withTime){var d=new Date(ms(s));try{var o={timeZone:"Asia/Manila",month:"short",day:"numeric",year:"numeric"};if(withTime){o.hour="numeric";o.minute="2-digit"}return d.toLocaleString(fil?"fil-PH":"en-PH",o)}catch(e){var p=new Date(d.getTime()+8*3600000);return p.toISOString().slice(0,10)+(withTime?" "+p.toISOString().slice(11,16):"")}}
 function ext(href,text,cls){return h("a",{href:href,target:"_blank",rel:"noopener noreferrer",class:cls||""},[text,h("span",{class:"sr-only",text:T(" (opens in a new tab)"," (bubukas sa bagong tab)")})])}
 function lessonLink(id){var L=D.lessons&&D.lessons[id];if(!L)return null;return h("a",{class:"news-learn",href:"lesson.html?id="+encodeURIComponent(id)},[T("Learn more: ","Matuto pa: ")+(fil&&L.titleFil?L.titleFil:L.title)])}
 function learnMore(it){var s=(it.title+" "+(it.excerpt||"")).toLowerCase(),out=[];
  if(/phish|scam|smish|vish/.test(s))out.push("cy2");
  if(/password|passphrase|passkey/.test(s))out.push("cy1");
  if(/deepfake|hallucinat|ai mistake|ai error|ai-generated|fake image|fake video/.test(s))out.push("ai4");
  return out.map(lessonLink).filter(Boolean)}

 m.appendChild(h("p",{class:"kicker",text:T("Daily tech news","Balitang tech araw-araw")}));
 m.appendChild(h("h1",{class:"page-title",text:T("News","Balita")}));
 var updated=h("p",{class:"news-updated muted"});m.appendChild(updated);
 var notice=h("div",{class:"news-notices",role:"status","aria-live":"polite"});m.appendChild(notice);
 m.appendChild(h("p",{class:"news-tip",role:"note"},[h("span",{"aria-hidden":"true",class:"news-tip-ic",text:"ⓘ"}),T("Tapping a story opens the news site and uses data.","Kapag pinindot ang balita, bubuksan ang news site at gagamit ng data.")]));
 var check=h("aside",{class:"news-check","aria-label":T("Check it","Suriin")},[h("strong",{text:T("Check it","Suriin")}),h("p",{text:T("Before you share: Who wrote it? When? Can you find it in a second source?","Bago mag-share: Sino ang sumulat? Kailan? May iba pa bang source na nagsasabi nito?")}),h("a",{class:"btn btn-outline news-check-link",href:"sim.html?id=factcheck",text:T("Try the fact-check simulation","Subukan ang fact-check simulation")})]);
 var body=h("div",{class:"news-body"},[h("p",{class:"boot-msg",role:"status"},[h("span",{class:"boot-dot","aria-hidden":"true"}),T("Loading news…","Naglo-load ang balita…")])]);
 m.appendChild(body);m.appendChild(check);
 var foot=h("section",{class:"news-foot","aria-label":T("How we pick stories","Paano pinipili ang balita")});m.appendChild(foot);

 var st=uiState(),region=st.newsRegion||"all",want=(location.hash||"").slice(1),cur=0;TABS.forEach(function(t,i){if(t[0]===want)cur=i});
 function note(cls,text){notice.appendChild(h("p",{class:"news-note "+cls,text:text}))}

 function draw(N,fromCache){body.innerHTML="";notice.innerHTML="";
  if(!N){updated.textContent="";
   if(fromCache==="offline")note("is-offline",T("You're offline. Open this page once with internet to get the news.","Offline ka. Buksan ang page na ito nang may internet minsan para makuha ang balita."));
   else note("is-empty",T("News isn't ready yet. Check back tomorrow morning.","Wala pang balita. Bumalik bukas ng umaga."));
   return}
  updated.textContent=T("Updated "+manila(N.generated,true)+" · refreshes every morning","In-update "+manila(N.generated,true)+" · nire-refresh tuwing umaga");
  if(N.paused){note("is-paused",T("News is paused by your teacher.","Naka-pause ng guro mo ang balita."));drawFoot(N);return}
  if(fromCache==="offline")note("is-offline",T("You're offline. Showing news from "+manila(N.generated,false)+".","Offline ka. Ipinapakita ang balita mula "+manila(N.generated,false)+"."));
  if(Date.now()-ms(N.generated)>48*3600000)note("is-stale",T("News didn't refresh today.","Hindi nag-refresh ang balita ngayon."));
  var items=(N.items||[]).slice().sort(function(a,b){return ms(b.published)-ms(a.published)});
  var bar=h("div",{class:"cr-tabs news-tabs",role:"tablist","aria-label":T("News sections","Mga seksyon ng balita")}),btns=[],panels=[];
  var chips=h("div",{class:"news-chips",role:"group","aria-label":T("Region","Rehiyon")});
  var chipBtns=REG.map(function(r){var b=h("button",{type:"button",class:"news-chip","aria-pressed":r[0]===region?"true":"false",text:r[1],onclick:function(){region=r[0];uiState({newsRegion:region});chipBtns.forEach(function(x,i){x.setAttribute("aria-pressed",REG[i][0]===region?"true":"false")});fill()}});chips.appendChild(b);return b});
  TABS.forEach(function(t,i){var b=h("button",{type:"button",class:"cr-tab",role:"tab",id:"nwt-"+t[0],"aria-controls":"nwp-"+t[0],"aria-selected":"false",tabindex:"-1",text:t[1],onclick:function(){sel(i,false,true)}});
   var p=h("div",{class:"cr-panel news-panel",role:"tabpanel",id:"nwp-"+t[0],"aria-labelledby":"nwt-"+t[0],tabindex:"0",hidden:"hidden"});btns.push(b);panels.push(p);bar.appendChild(b)});
  bar.addEventListener("keydown",function(e){var n=btns.length,i=cur;if(e.key==="ArrowRight")i=(cur+1)%n;else if(e.key==="ArrowLeft")i=(cur-1+n)%n;else if(e.key==="Home")i=0;else if(e.key==="End")i=n-1;else return;e.preventDefault();e.stopPropagation();sel(i,true,true)});
  body.appendChild(bar);body.appendChild(chips);panels.forEach(function(p){body.appendChild(p)});
  function card(it){var meta=[it.source,regName(it.region),rel(it.published)].join(" · ");
   var kids=[h("h3",{class:"news-title"},[ext(it.link,it.title)]),h("p",{class:"news-meta muted",text:meta})];
   if(it.excerpt)kids.push(h("p",{class:"news-ex",text:it.excerpt}));
   if(it.topics&&it.topics.length)kids.push(h("p",{class:"news-pills","aria-label":T("Topics","Mga paksa")},it.topics.map(function(x){return h("span",{class:"cr-chip news-pill",text:TOP[x]||x})})));
   var lm=learnMore(it);if(lm.length)kids.push(h("p",{class:"news-learns"},lm));
   return h("li",{class:"card news-item"},kids)}
  function fill(){var t=TABS[cur][0],p=panels[cur];p.innerHTML="";chips.hidden=t==="labs";
   if(t==="labs")return labs(p);
   var list=items.filter(function(it){return (t==="top"||(it.topics||[]).indexOf(t)>=0)&&(region==="all"||it.region===region)});
   if(!list.length){p.appendChild(h("p",{class:"news-note is-empty",text:T("No stories for this filter yet.","Wala pang balita para sa filter na ito.")}));return}
   p.appendChild(h("ul",{class:"news-list"},list.map(card)))}
  function labs(p){var L=N.labs||[];if(!L.length){p.appendChild(h("p",{class:"news-note is-empty",text:T("No stories for this filter yet.","Wala pang balita para sa filter na ito.")}));return}
   p.appendChild(h("p",{class:"muted",text:T("Each lab's latest posts from its own official newsroom.","Pinakabagong post ng bawat lab mula sa sarili nitong opisyal na newsroom.")}));
   p.appendChild(h("ul",{class:"news-list news-labs"},L.map(function(l){var u=l.updates||[];
    var kids=[h("h3",{class:"news-title"},[ext(l.home,l.name)])];
    if(l.status==="error")kids.push(h("p",{class:"news-note is-stale",text:T("Couldn't check today.","Hindi ma-check ngayon.")}));
    kids.push(h("p",{class:"news-meta muted",text:u.length?T("Last update: "+rel(u[0].published),"Huling update: "+rel(u[0].published)):T("Last update: none yet","Huling update: wala pa")}));
    if(u.length)kids.push(h("ul",{class:"news-lab-posts"},u.slice(0,3).map(function(x){return h("li",{},[ext(x.link,x.title),h("span",{class:"muted news-lab-date",text:manila(x.published,false)})])})));
    kids.push(h("p",{class:"news-mentions",text:T("In the news this week: "+(l.mentions||0)+((l.mentions===1)?" story":" stories"),"Nasa balita ngayong linggo: "+(l.mentions||0)+" balita")}));
    return h("li",{class:"card news-item news-lab"},kids)})))}
  function sel(i,focus,user){btns.forEach(function(b,j){var on=j===i;b.setAttribute("aria-selected",on?"true":"false");b.setAttribute("tabindex",on?"0":"-1");if(on)panels[j].removeAttribute("hidden");else panels[j].setAttribute("hidden","hidden")});cur=i;fill();if(!focus&&!user)try{bar.scrollLeft=Math.max(0,btns[i].offsetLeft-bar.offsetLeft-16)}catch(e){}if(focus)btns[i].focus();if(btns[i].scrollIntoView&&focus)btns[i].scrollIntoView({block:"nearest",inline:"nearest"});if(user)try{history.replaceState(null,"","#"+TABS[i][0])}catch(e){}}
  sel(cur,false);drawFoot(N)}
 function drawFoot(N){foot.innerHTML="";
  foot.appendChild(h("p",{text:T("How we pick stories: automatically, every morning, from these sources. A person does not review each story.","Paano pinipili ang balita: awtomatiko, tuwing umaga, mula sa mga source na ito. Hindi bawat balita ay sinusuri ng tao.")}));
  var S=(N&&N.sources)||[];if(S.length)foot.appendChild(h("ul",{class:"news-sources"},S.map(function(s){return h("li",{},[ext(s.home,s.name),h("span",{class:"muted",text:" · "+regName(s.region)})])})))}

 function load(){var off=typeof navigator!=="undefined"&&navigator.onLine===false;
  fetch("news.json",{cache:"no-cache"}).then(function(r){var fromCache=(r.headers.get("x-ra-offline")==="1"||off)?"offline":"";if(!r.ok){if(fromCache)off=true;throw new Error("HTTP "+r.status)}return r.json().then(function(j){return [j,fromCache]})})
  .then(function(x){var j=x[0];draw(j&&j.version===1?j:null,x[1])})
  .catch(function(){draw(null,off?"offline":"")})}
 load();
}
if(typeof window.RA2NewsWait==="function"){var w=window.RA2NewsWait;window.RA2NewsWait=null;w(render)}else window.RA2News=render;
})();
