/* Red Arrow Hub: Home page (about.html only). Loaded after v2.js; v2.js passes in its helpers. */
(function(){
function render(m,A){var h=A.h,T=A.T,ico=A.ico,teacherCard=A.teacherCard,D=A.D,fil=A.fil;
 m.classList.add("about-page","home-page");
 function X(href,text){return h("a",{class:"about-link",href:href,target:"_blank",rel:"noopener noreferrer",text:text})}
 function modOf(id){for(var i=0;i<D.modules.length;i++)if(D.modules[i].id===id)return D.modules[i];return null}
 function firstLesson(id,fb){var mod=modOf(id),it=mod&&mod.items&&mod.items[0];return it&&it.type==="lesson"&&it.id?it.id:fb}
 function list(cls,items){var ul=h("ul",cls?{class:cls}:{});items.forEach(function(x){ul.appendChild(h("li",{},typeof x==="string"?[x]:x))});return ul}
 var aiFirst=firstLesson("ai","ai1");
 m.appendChild(h("section",{class:"home-hero"},[
  h("img",{class:"home-map",src:"art/home-map.jpg",width:"720",height:"264",alt:""}),
  h("h1",{text:T("Welcome to Red Arrow Hub","Maligayang pagdating sa Red Arrow Hub")}),
  h("p",{text:T("Learn AI, cybersecurity and IT in short lessons you can do on your phone.","Matuto ng AI, cybersecurity at IT sa maiikling aralin na kaya mong gawin sa phone.")}),
  h("p",{class:"home-sub",text:T("Made for Red Arrow High School students in San Nicolas, Pangasinan.","Ginawa para sa mga estudyante ng Red Arrow High School sa San Nicolas, Pangasinan.")}),
  h("div",{class:"home-actions"},[
   h("a",{class:"btn btn-solid",href:"index.html",text:T("Start learning","Magsimulang matuto")}),
   h("button",{type:"button",class:"home-help-link",onclick:function(){teacherCard()},text:T("Need help? Talk to someone","Kailangan ng tulong? Makipag-usap sa tao")})])]));
 m.appendChild(h("section",{class:"home-mission"},[
  h("h2",{text:T("Our mission","Ang aming misyon")}),
  h("p",{class:"mission-text",text:T("Red Arrow Hub gives every student at Red Arrow High School, whatever phone they have and whatever load they can afford, a free and safe way to learn AI, cybersecurity and IT, and a clear path to college and work.","Layunin ng Red Arrow Hub na bigyan ang bawat estudyante ng Red Arrow High School, anuman ang phone nila at gaano man kalaki ang load nila, ng libre at ligtas na paraan para matuto ng AI, cybersecurity at IT, at ng malinaw na daan papunta sa kolehiyo at trabaho.")}),
  list("trust-list",[
   T("No sign-up. You don't need an account or an email.","Walang sign-up. Hindi mo kailangan ng account o email."),
   T("Nothing is tracked. Your progress stays on your phone.","Walang tracking. Sa phone mo lang naka-save ang progress mo."),
   T("Light on data. After your first visit, lessons work without internet.","Tipid sa data. Pagkatapos ng unang bisita, gumagana ang aralin kahit walang internet.")])]));
 var courses=[
  ["ai","AI Basics","AI Basics","Find out how AI learns, spot when it gets things wrong, and use it honestly for schoolwork.","Alamin kung paano natututo ang AI, kilalanin kapag nagkakamali ito, at gamitin ito nang tapat sa pag-aaral.","hinog","Try it: train a mango sorter","Subukan: sanayin ang mango sorter","ai1"],
  ["cyber","Cyber Safety","Cyber Safety","Make strong passwords, tell a scam text from a real one, and keep your accounts private.","Gumawa ng matibay na password, kilalanin ang scam na text, at panatilihing pribado ang mga account mo.","hotline","Try it: answer the Scam Hotline","Subukan: sagutin ang Scam Hotline","cy1"],
  ["it","IT Foundations","IT Foundations","Learn the parts of a computer, fix slow Wi-Fi, and plan a PC on a budget.","Alamin ang mga bahagi ng computer, ayusin ang mabagal na Wi-Fi, at magplano ng PC na pasok sa budget.","pc","Try it: build a budget PC","Subukan: bumuo ng budget PC","it1"]];
 var cards=h("div",{class:"cards"});
 courses.forEach(function(c){var mod=modOf(c[0]),en=mod&&mod.title===c[1]?mod.title:c[1];
  cards.appendChild(h("div",{class:"card home-course"},[
   h("h3",{text:T(en,c[2])}),
   h("p",{text:T(c[3],c[4])}),
   h("p",{},[h("a",{href:"sim.html?id="+c[5],text:T(c[6],c[7])})]),
   h("a",{class:"btn btn-outline",href:"lesson.html?id="+encodeURIComponent(firstLesson(c[0],c[8])),text:T("Start the course","Simulan ang kurso")})]))});
 m.appendChild(h("section",{class:"home-courses"},[h("h2",{text:T("What you'll learn","Ano ang matututunan mo")}),cards]));
 m.appendChild(h("section",{class:"home-steps"},[
  h("h2",{text:T("How it works","Paano ito gumagana")}),
  h("ol",{},[
   h("li",{},[ico("lesson",""),h("span",{text:T("Read a short lesson. Most take about 5 minutes.","Magbasa ng maikling aralin. Karamihan ay mga 5 minuto lang.")}),h("a",{href:"lesson.html?id="+encodeURIComponent(aiFirst),text:T("Try the first lesson","Subukan ang unang aralin")})]),
   h("li",{},[ico("simulation",""),h("span",{text:T("Try a simulation or quiz. Hints are there if you get stuck.","Subukan ang simulation o quiz. May pahiwatig kung mahirapan ka.")})]),
   h("li",{},[ico("badge",""),h("span",{text:T("Pass a simulation twice to reach Mastered and earn its badge.","Ipasa ang simulation nang dalawang beses para maging Dalubhasa at makuha ang badge.")}),h("a",{href:"profile.html",text:T("See your badges","Tingnan ang mga badge mo")})])])]));
 m.appendChild(h("section",{class:"home-next"},[
  h("div",{class:"card"},[
   h("h3",{text:T("Thinking about college or a job?","Iniisip mo ba ang kolehiyo o trabaho?")}),
   h("p",{text:T("See colleges near San Nicolas, free certificates, videos and real jobs in AI, cyber and IT.","Tingnan ang mga kolehiyo malapit sa San Nicolas, libreng certificate, video at totoong trabaho sa AI, cyber at IT.")}),
   h("a",{class:"btn btn-outline",href:"careers.html",text:T("Explore careers","Tingnan ang karera")})]),
  h("div",{class:"card"},[
   h("h3",{text:T("Have a question?","May tanong ka?")}),
   h("p",{text:T("Ask Mar about passwords, scams, Wi-Fi or how AI works. Mar answers from this site's lessons and doesn't save what you type.","Magtanong kay Mar tungkol sa password, scam, Wi-Fi o kung paano gumagana ang AI. Sumasagot si Mar mula sa mga aralin at hindi sine-save ang tina-type mo.")}),
   h("a",{class:"btn btn-outline",href:"ask.html",text:T("Ask Mar","Magtanong kay Mar")})])]));
 m.appendChild(h("section",{class:"home-staff"},[
  h("h2",{text:T("For teachers and parents","Para sa mga guro at magulang")}),
  h("p",{text:T("This is a staff preview. Students should not use it in class until these checks are done:","Staff preview pa ito. Hindi pa dapat gamitin ng estudyante sa klase hangga't hindi tapos ang mga pagsusuring ito:")}),
  list("",[
   T("The guidance office tests every help-card hotline and records the date.","Susubukan ng guidance office ang bawat hotline sa help card at itatala ang petsa."),
   T("A native-speaker teacher reviews the Filipino text.","Susuriin ng gurong native speaker ang tekstong Filipino."),
   T("A guidance counselor signs off on the crisis-phrase list.","Aaprubahan ng guidance counselor ang listahan ng crisis phrase."),
   T("The school sends the parent and teacher notice.","Ipapadala ng paaralan ang abiso sa magulang at guro."),
   T("A teacher confirms the colleges, courses and job links on the Careers tab.","Kukumpirmahin ng guro ang mga kolehiyo, kurso at link ng trabaho sa Careers tab.")]),
  h("a",{class:"btn btn-outline",href:"teacher.html",text:T("Open the mastery summary","Buksan ang buod ng mastery")}),
  h("p",{class:"muted",text:T("Students can show this screen to a teacher. It reads their phone only.","Maipapakita ito ng estudyante sa guro. Mula lang sa phone nila ito.")}),
  h("p",{class:"muted",text:T("Questions? Talk to the Red Arrow High School guidance office.","May tanong? Kausapin ang guidance office ng Red Arrow High School.")})]));
 function fold(sum,items){m.appendChild(h("details",{class:"home-fold"},[h("summary",{text:sum}),list("",items)]))}
 var meLink=h("a",{class:"about-link",href:"profile.html",text:T("Clear my progress","Burahin ang progress")});
 fold(T("How your privacy works","Paano gumagana ang privacy mo"),[
  T("There are no accounts and no sign-in.","Walang account at walang sign-in."),
  T("Your progress, language and theme are saved only on this phone.","Sa phone na ito lang naka-save ang progress, wika at tema mo."),
  T("The site has no tracking or analytics. Ask Mar questions are not saved.","Walang tracking o analytics ang site. Hindi sine-save ang mga tanong kay Mar."),
  T("The site is hosted on GitHub Pages, which may log visitors' IP addresses. We don't collect anything.","Naka-host ang site sa GitHub Pages, na maaaring mag-log ng IP address ng bisita. Wala kaming kinokolekta."),
  T("Names, brands and links in the lessons and simulations are made up.","Gawa-gawa ang mga pangalan, brand at link sa mga aralin at simulation."),
  fil?["Shared phone? Gamitin ang ",meLink," sa page na Me."]:["Sharing a phone? Use ",meLink," on the Me page."]]);
 var uMIT="https://github.com/marserquina-ui/red-arrow/blob/main/LICENSE",uSA="https://creativecommons.org/licenses/by-sa/4.0/",uOCW="https://ocw.mit.edu",uNC="https://creativecommons.org/licenses/by-nc-sa/4.0/";
 fold(T("Licenses","Mga lisensya"),[
  fil?[X(uMIT,"MIT License")," ang code ng site."]:["The site's code uses the ",X(uMIT,"MIT License"),"."],
  fil?[X(uSA,"CC BY-SA 4.0")," ang karamihan ng aralin at iba pang learning content."]:["Most lessons and other learning content use ",X(uSA,"CC BY-SA 4.0"),"."],
  fil?["Ang ilang aralin na hango sa ",X(uOCW,"MIT OpenCourseWare")," ay ",X(uNC,"CC BY-NC-SA 4.0"),". Puwede mo itong i-share at i-adapt para sa di-komersyal na gamit kung may credit, pero hindi mo ito puwedeng ibenta."]:["A few lessons adapted from ",X(uOCW,"MIT OpenCourseWare")," use ",X(uNC,"CC BY-NC-SA 4.0"),". You may share and adapt them for non-commercial use with credit, but you may not sell them."],
  T("Each adapted lesson shows its own credit line. MIT does not endorse this site.","May sariling credit line ang bawat hango na aralin. Hindi ini-endorse ng MIT ang site na ito.")]);
 fold(T("Devices and accessibility","Mga device at accessibility"),[
  T("We checked the site in Chrome on screens 360px wide and up, on phones and laptops.","Sinubukan namin ang site sa Chrome sa mga screen na 360px pataas, sa phone at laptop."),
  T("It's built for current Chrome, Edge, Firefox and Safari, but we haven't tested every browser or device.","Ginawa ito para sa kasalukuyang Chrome, Edge, Firefox at Safari, pero hindi pa namin nasubukan ang bawat browser o device."),
  T("Pages are small, so they load on slow or prepaid connections.","Maliit ang mga page, kaya naglo-load kahit mabagal o prepaid ang koneksyon."),
  T("Light and dark themes are in the header. You can also make text bigger in your browser.","Nasa header ang light at dark na tema. Puwede mo ring palakihin ang text sa browser mo."),
  T("Built-in support: a skip link, labels for screen readers, tap targets at least 48px, and text contrast of at least 4.5:1.","May skip link, label para sa screen reader, tap target na hindi bababa sa 48px, at text contrast na hindi bababa sa 4.5:1.")]);
}
if(typeof window.RA2HomeWait==="function"){var w=window.RA2HomeWait;window.RA2HomeWait=null;w(render)}else window.RA2Home=render;
})();
