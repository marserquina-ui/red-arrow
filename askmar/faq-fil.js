/* Ask Mar FAQ drop-in — Filipino answers, keywords, and phrase keys.
   For Mula to merge into Red Arrow v2. Do not edit v2/data.js from here.

   FILIPINO DRAFT: af, backf, and Filipino/Taglish strings in k and p need a
   native-speaker teacher review before students use them.

   Field names match v2/data.js and v2.js (faqText uses a/af and back/backf):
     id     optional stable id (data.js entries do not have ids yet; merge
            still matches an existing row when any k string overlaps)
     k      keyword/stem list (substring match in showFaq)
     p      phrase keys — full short questions in English and Filipino/Taglish.
            As of 7:01 PM America/New_York on 23 Nov 2026, data.js FAQ rows
            still had only k, a, af, back, backf, link, and showFaq scored
            only k. Mula said phrase keys were coming so short questions
            like "what is ai" still match under MIN_FAQ_SCORE = 2.
            This file uses p for that list (short name, same style as k).
            If the live field name differs, rename p when merging.
            Phrase keys are also copied into k, with overlapping fragments
            (e.g. "ano ang ai" plus "ang ai"), so today's scorer already
            reaches score 2 on short questions.
     a, af  English / Filipino answer (Mar's voice, 2–4 sentences, offline)
     back, backf  English / Filipino follow-up prompt
     link   practice target, lesson.html?id=… or sim.html?id=…

   window.RA2FaqFil / module.exports = { faq, updated, added }
   v2.js mergeFaqFil() already looks for window.RA2FaqFil || RA2.faqFil
   and extra.faq || extra. It copies af, backf, k, and link on a match,
   and a/back only when the existing row is missing them. Please also
   copy p: if (src.p) hit.p = src.p;
   Load this file after data.js and before v2.js. check.sh copies it to
   v2/askmar/faq-fil.js.

   New-entry k values are disjoint from the 9 existing rows' k values so
   mergeFaqFil will append them instead of overwriting an older row.

   Safety: defensive answers only. Keywords avoid crisis words handled
   by askmar-safety.js. Answers use fictional brands (GKash, PadalaPagong, PalengKalabaw)
   and .example domains. The keyword "gcash" is kept on the scam row only
   so students who type the real brand still get a match; the answer says
   GKash.
*/
(function (root) {
  "use strict";

  var updated = [
    {
      id: "faq-ai1",
      k: [
        "what is ai", "ano ang ai", "artificial intelligence", "ano ba ang ai", "ano yung ai", 
        "anong ai", "ang ai", "is ai", "what's ai", "whats ai", "what is artificial", 
        "ano ang artificial", "programang ai", "ai program", "ano ba yung ai", 
        "artificial intel"
      ],
      p: [
        "what is ai", "what's ai", "whats ai", "what is artificial intelligence", "ano ang ai", 
        "ano ba ang ai", "ano yung ai", "anong ai", "ano ba yung ai", 
        "ano ang artificial intelligence"
      ],
      a: "AI is a computer program that learns patterns from data and predicts a useful output, like the next word or a label for a photo. It is a tool, not a person, and it does not know you the way a friend does.",
      af: "Ang AI ay isang programang computer na natututo ng pattern mula sa datos, tapos naghuhula ng kapaki-pakinabang na sagot — tulad ng susunod na salita o label ng litrato. Tool ito, hindi tao, at hindi ka nito kilala tulad ng isang kaibigan.",
      back: "Can you name one app on your phone that guesses what you want?",
      backf: "May app ba sa phone mo na nahuhulaan kung ano ang gusto mo?",
      link: "lesson.html?id=ai1"
    },
    {
      id: "faq-factcheck",
      k: [
        "hallucinat", "wrong answer", "fake source", "mali", "hallucination", "hallucinations", 
        "gawa-gawa", "gawa gawa", "pekeng source", "pekeng citation", "maling sagot", 
        "mali ang sagot", "ano ang hallucination", "what is a hallucination", 
        "ai hallucination", "confident na sagot", "hindi totoo ang sagot", "made up answer", 
        "fake sources"
      ],
      p: [
        "what is a hallucination", "what is hallucination", "ano ang hallucination", 
        "ano ba ang hallucination", "why is ai wrong", "bakit mali ang ai", 
        "bakit mali ang sagot ng ai", "what is a fake source"
      ],
      a: "AI sometimes gives confident answers that are made up. That's called a hallucination. Before you use a fact, check it in a textbook, with a teacher, or on an official source.",
      af: "Minsan confident ang sagot ng AI, pero gawa-gawa lang pala. Tawag diyan ay hallucination. Bago mo gamitin ang isang fact, i-check ito sa textbook, sa guro, o sa opisyal na source.",
      back: "How could you check if a book the AI mentions is real?",
      backf: "Paano mo susuriin kung totoo ang librong binanggit ng AI?",
      link: "sim.html?id=factcheck"
    },
    {
      id: "faq-cy1",
      k: [
        "password", "passphrase", "passphrases", "passwords", "matibay na password", 
        "malakas na password", "strong password", "mahabang password", "mahaba na password", 
        "ano ang passphrase", "ano ang password", "anong password", "mga password", 
        "pang-password", "iba-ibang password", "unique na password", "good password", 
        "what is a passphrase", "what is a password", "paano gumawa ng malakas na password", 
        "paano gumawa ng matibay na password", "paano gumawa ng password", "long passphrase"
      ],
      p: [
        "what is a password", "what is a passphrase", "what's a good password", 
        "ano ang password", "ano ang passphrase", "ano ba ang password", "anong password", 
        "paano gumawa ng malakas na password", "paano gumawa ng matibay na password", 
        "paano gumawa ng password", "paano mag-password", "how to make a strong password"
      ],
      a: "Long passphrases of unrelated words are strong and easy to remember. Use a different one for email and for money apps, and never share it.",
      af: "Ang mahaba at walang kaugnayang mga salita ay matibay na passphrase, at madali pa itong tandaan. Gumamit ng iba-iba para sa email at sa money app, at huwag i-share.",
      back: "What four random words could make a passphrase you'd remember?",
      backf: "Anong apat na random na salita ang puwede mong gawing passphrase?",
      link: "lesson.html?id=cy1"
    },
    {
      id: "faq-hotline",
      k: [
        "scam", "phish", "gcash", "gkash", "otp", "text", "scams", "scammer", "phishing", 
        "phising", "ano ang scam", "ano ang phishing", "what is phishing", "what is a scam", 
        "a scam", "pekeng text", "pekeng link", "text scam", "scam ba ito", "otp ko", 
        "one time pin", "mpin", "gkash scam", "gcash scam", "biglang text", 
        "hinihingi ang otp", "hinihingi ang code", "surprise text", "red flag"
      ],
      p: [
        "what is a scam", "what is phishing", "what's a scam", "ano ang scam", 
        "ano ang phishing", "ano ba ang scam", "scam ba ito", "pekeng text ba ito", 
        "gcash scam", "gkash scam", "hinihingi ang otp", "ano ang otp"
      ],
      a: "Scams use urgency, strange links, and requests for codes or OTP. Do not tap the link. Open the official app yourself, such as GKash, and tell a parent or teacher.",
      af: "Gumagamit ang scam ng pagmamadali, kakaibang link, at hinihinging code o OTP. Huwag i-tap ang link. Ikaw mismo ang magbukas ng opisyal na app, tulad ng GKash, at sabihin sa magulang o guro.",
      back: "What's the first red flag you'd look for in a surprise text?",
      backf: "Ano ang unang red flag sa isang biglang text?",
      link: "sim.html?id=hotline"
    },
    {
      id: "faq-soc",
      k: [
        "soc", "analyst", "cybersecurity job", "security career", "soc analyst", "ano ang soc", 
        "ano ang soc analyst", "ano ba ang soc", "what is soc", "what is a soc", 
        "what is a soc analyst", "what does a soc analyst do", "security operations", 
        "trabaho sa cyber", "cyber job", "mga alert", "i-escalate", "imbestigahan", 
        "ano ang analyst", "security operations center", "defensive work", 
        "depensibong trabaho"
      ],
      p: [
        "what is a soc", "what is soc", "what is a soc analyst", "what does a soc analyst do", 
        "ano ang soc", "ano ang soc analyst", "ano ba ang soc", 
        "ano ang ginagawa ng soc analyst", "what is a cybersecurity job"
      ],
      a: "SOC analysts watch alerts and decide: ignore, investigate, or escalate. It is defensive work — the job is to protect people and systems, never to attack others.",
      af: "Ang SOC analyst ay nagbabantay ng alert at nagpapasya: balewalain, imbestigahan, o i-escalate. Depensibong trabaho ito — protektahan ang tao at system, hindi kailanman atakehin ang iba.",
      back: "Why might a login at 3 a.m. from a new place be worth checking?",
      backf: "Bakit dapat suriin ang login nang 3 a.m. mula sa bagong lugar?",
      link: "sim.html?id=soc"
    },
    {
      id: "faq-wifi",
      k: [
        "wifi", "wi-fi", "internet", "router", "walang wifi", "walang internet", 
        "hindi kumokonek", "hindi connect", "problema sa wifi", "wifi ko", "ilaw ng router", 
        "router lights", "i-restart ang router", "paano ayusin ang wifi", "can't connect", 
        "cannot connect", "hindi gumagana ang wifi", "wifi problem", "troubleshoot wifi", 
        "ayusin ang wifi", "disconnected", "no internet"
      ],
      p: [
        "why is my wifi not working", "wifi not working", "walang wifi", "walang internet", 
        "hindi gumagana ang wifi", "paano ayusin ang wifi", "problema sa wifi", 
        "can't connect to wifi", "cannot connect to wifi", "ano ang problema sa wifi", 
        "paano i-troubleshoot ang wifi"
      ],
      a: "Start simple: check the router lights, the power, a restart, then the Wi-Fi password on your device. If other phones connect but yours does not, the problem is likely on your phone.",
      af: "Magsimula sa simple: tingnan ang ilaw ng router, ang kuryente, i-restart, saka ang Wi-Fi password sa device mo. Kung nakakakonekta ang ibang phone pero ikaw hindi, malamang nasa phone mo ang problema.",
      back: "If other phones connect but yours doesn't, where is the problem likely to be?",
      backf: "Kung nakakakonekta ang ibang phone pero ikaw hindi, saan malamang ang problema?",
      link: "sim.html?id=wifi"
    },
    {
      id: "faq-it1",
      k: [
        "ram", "cpu", "storage", "computer parts", "pc", "ano ang ram", "ano ang cpu", 
        "ano ang storage", "parte ng computer", "bahagi ng computer", "mga parte ng pc", 
        "processor", "what is ram", "what is a cpu", "what is cpu", "parts of a computer", 
        "parts of a pc", "memory ng computer", "imbakan", "ano ang processor", "computer part"
      ],
      p: [
        "what is ram", "what is cpu", "what is a cpu", "what is storage", "ano ang ram", 
        "ano ang cpu", "ano ang storage", "ano ba ang ram", "parts of a computer", 
        "parts of a pc", "mga parte ng computer", "bahagi ng computer", 
        "ano ang mga parte ng computer"
      ],
      a: "The CPU runs instructions, RAM holds the apps you have open, and storage keeps files when the power is off. If many open apps make a PC slow, more RAM is often the upgrade that helps.",
      af: "Ang CPU ang tumatakbo ng instruction, ang RAM ang may hawak ng bukas na app, at ang storage ang nagtatago ng file kapag patay ang kuryente. Kung bumabagal ang PC dahil sa maraming bukas na app, madalas ang RAM ang nakakatulong na i-upgrade.",
      back: "Which part would you upgrade if many open apps make the PC slow?",
      backf: "Aling parte ang iu-upgrade mo kung bumabagal ang PC dahil sa maraming bukas na app?",
      link: "lesson.html?id=it1"
    },
    {
      id: "faq-hinog",
      k: [
        "train", "model", "data", "bias", "mango sorter", "hinog", "paano natututo", 
        "how models learn", "training data", "unbalanced", "natututo ang model", 
        "ano ang model", "what is a model", "ai model", "green mangoes", "green mango", 
        "how a model learns", "examples create", "paano natututo ang ai", 
        "paano natututo ang model"
      ],
      p: [
        "how models learn", "how does a model learn", "how do models learn", 
        "paano natututo ang model", "paano natututo ang ai", "ano ang model", 
        "what is a model", "what is training data", "ano ang training data", "mango sorter", 
        "how does ai learn"
      ],
      a: "Models learn from examples. If the examples are unbalanced, the model can pick up bias — like a mango sorter that only ever sees green mangoes and then misses the ripe ones.",
      af: "Natututo ang model mula sa mga halimbawa. Kung hindi balanced ang mga halimbawa, puwedeng magkaroon ito ng bias — tulad ng mango sorter na green mango lang ang nakikita, kaya palya ito sa hinog.",
      back: "What happens if a mango sorter only ever sees green mangoes?",
      backf: "Ano ang mangyayari kung green mango lang ang nakikita ng mango sorter?",
      link: "sim.html?id=hinog"
    },
    {
      id: "faq-ai3",
      k: [
        "cheat", "homework", "assignment", "essay", "dayaan", "ai sa homework", 
        "ai sa assignment", "paggamit ng ai", "can i use ai", "pwede ba ang ai", 
        "pwede ba gumamit ng ai", "ai for homework", "use ai for homework", "nangongopya", 
        "ai sa schoolwork", "ai sa proyekto", "allowed on homework"
      ],
      p: [
        "can i use ai for homework", "is ai cheating", "pwede ba ang ai sa homework", 
        "pwede ba gumamit ng ai", "pwede ba ang ai", "ai sa homework", "ai sa assignment", 
        "is using ai cheating", "dayaan ba ang ai"
      ],
      a: "Use AI as a tutor to explain ideas, then write your own work, following your teacher's rules. If you are not sure a tool is allowed, ask first.",
      af: "Gamitin ang AI bilang tutor para magpaliwanag, saka ikaw mismo ang sumulat, ayon sa patakaran ng guro. Kung hindi ka sigurado kung pwede ang tool, magtanong muna.",
      back: "What's one way AI could help you study without doing the work for you?",
      backf: "Paano makakatulong ang AI sa pag-aaral nang hindi nito ginagawa ang assignment mo?",
      link: "lesson.html?id=ai3"
    }
  ];

  var added = [
    {
      id: "faq-ai-adv-bias-meaning",
      k: [
        "what is bias", "ano ang bias", "ano ba ang bias", "ang bias", "is bias", "bias in ai", 
        "bias ng ai", "ai fairness", "fairness in ai", "pagiging patas", "hindi patas ang ai", 
        "patas ba ang ai", "unfair ai", "ano ang fairness", "fairness"
      ],
      p: [
        "what is bias", "what is ai bias", "what is bias in ai", "ano ang bias", 
        "ano ba ang bias", "ano ang bias ng ai", "patas ba ang ai", "what is fairness in ai", 
        "ano ang pagiging patas"
      ],
      a: "Bias means an AI tool can treat some people or examples less fairly than others. It often happens when the training data is uneven, like a mango sorter that mostly saw green mangoes. A computer is not automatically fair just because it is a machine.",
      af: "Ang bias ay ang hindi patas na trato ng AI sa ibang tao o halimbawa. Madalas itong nangyayari kapag hindi pantay ang training data, tulad ng mango sorter na berde ang karamihan sa nakitang mangga. Hindi automatic na patas ang computer dahil machine ito.",
      back: "Who might be missing from a tool's training data if it was built in another country?",
      backf: "Sino ang maaaring wala sa training data kung sa ibang bansa ginawa ang tool?",
      link: "lesson.html?id=ai-adv-bias"
    },
    {
      id: "faq-ai-adv-bias-accents",
      k: [
        "filipino names", "mga pangalan", "pangalan sa ai", "accent", "accents", 
        "pangasinan accent", "ilocano", "tagalog accent", "voice tool", "voice assistant", 
        "lokal na boses", "local voices", "hindi makuha ang accent", "filipino english", 
        "local languages", "lokal na wika"
      ],
      p: [
        "why does the voice tool fail", "hindi makuha ang accent ko", "pangasinan accent", 
        "filipino names", "bakit mali ang accent", "ano ang problema sa pangalan", 
        "voice assistant hindi makaintindi"
      ],
      a: "A voice tool trained mostly on other accents may struggle with Filipino English, or with Tagalog, Ilocano, or Pangasinan. That does not mean the speaker is wrong — the tool just did not learn enough local voices. Some systems also trip over Filipino names or the letter Ñ.",
      af: "Ang voice tool na sanay sa ibang accent ay maaaring mahirapan sa Filipino English, o sa Tagalog, Ilocano, o Pangasinan. Hindi ibig sabihin na mali ang nagsasalita — kulang lang ang natutunan nitong lokal na boses. May systems ding natitisod sa mga Filipino na pangalan o sa letrang Ñ.",
      back: "If a classroom tool often misreads Filipino names, what should you do?",
      backf: "Kung paulit-ulit na mali ang pagbasa ng tool sa klase sa mga Filipino na pangalan, ano ang dapat mong gawin?",
      link: "lesson.html?id=ai-adv-bias"
    },
    {
      id: "faq-ai-adv-bias-check",
      k: [
        "fair school tool", "patas ba sa school", "test with filipino", "i-test ang tool", 
        "misread names", "mali ang marka", "who might be missing", "check if a tool is fair", 
        "patas ba ang tool", "uneven results", "hindi pantay ang resulta"
      ],
      p: [
        "how do i check if ai is fair", "paano malaman kung patas ang ai", 
        "patas ba sa school ang tool", "ano ang gagawin kung mali ang tool", 
        "how to test for bias"
      ],
      a: "A good habit is to test a school tool with Filipino names, accents, and words, not only with examples from somewhere else. If the results look uneven, tell a teacher and describe what you saw. You do not have to just accept a tool that keeps getting local names or language wrong.",
      af: "Mabuting ugali ang i-test ang school tool gamit ang mga Filipino na pangalan, accent, at salita, hindi lang mga halimbawa mula sa iba. Kung hindi pantay ang resulta, sabihin sa guro at ilarawan ang nakita mo. Hindi mo kailangang bayaan lang ang tool na paulit-ulit na mali sa lokal na pangalan o wika.",
      back: "What is one local example you could use to test a school AI tool?",
      backf: "Anong lokal na halimbawa ang puwede mong gamitin para i-test ang AI tool sa school?",
      link: "lesson.html?id=ai-adv-bias"
    },
    {
      id: "faq-ai-adv-honest-use-tutor",
      k: [
        "ghostwriter", "tutor not", "hindi ghostwriter", "submit ai", "i-submit ang gawa", 
        "gawa ng chatbot", "gawa ng ai", "as your own", "sarili mong gawa", "buong sanaysay", 
        "honest use", "tapat na paggamit", "using ai honestly", "hindi tapat", "not honest", 
        "ipasulat sa ai", "pwede bang ipasulat", "ipasulat"
      ],
      p: [
        "can the chatbot write my essay", "pwede bang ipasulat sa ai", 
        "is it honest to submit ai work", "tapat ba kung gawa ng ai", 
        "ano ang tapat na paggamit ng ai", "what is honest use of ai", "hindi ghostwriter"
      ],
      a: "AI can help you understand a hard idea or try a practice question, but it should not do the assignment for you. Copying a full essay, code, or answer from a chatbot and putting your name on it is not honest. Use AI to learn, then write in your own words.",
      af: "Puwedeng tulungan ka ng AI na maintindihan ang mahirap na ideya o subukan ang practice question, pero hindi nito dapat gawin ang assignment para sa iyo. Hindi tapat ang pagkopya ng buong sanaysay, code, o sagot mula sa chatbot at nilagyan ng pangalan mo. Gamitin ang AI para matuto, saka ikaw mismo ang magsulat.",
      back: "Can you explain your last assignment in your own words, without looking at a chatbot?",
      backf: "Kaya mo bang ipaliwanag sa sarili mong mga salita ang huli mong assignment, nang hindi tumitingin sa chatbot?",
      link: "lesson.html?id=ai-adv-honest-use"
    },
    {
      id: "faq-ai-adv-honest-use-disclose",
      k: [
        "disclose", "i-disclose", "sabihin kung ginamit", "sabihin ang paggamit", 
        "rules sa klase", "class rules", "pinapayagan ba ang ai", "allowed to use ai", 
        "itanong sa guro", "ask your teacher first", "deped", "follow the rules", 
        "sundin ang rules", "tell my teacher", "should i tell my teacher", 
        "sabihin sa guro na gumamit"
      ],
      p: [
        "should i tell my teacher i used ai", "kailangan ko bang sabihin sa guro", 
        "how do i disclose ai", "paano i-disclose ang ai", "pinapayagan ba ang ai sa klase", 
        "ask your teacher first", "itanong muna sa guro"
      ],
      a: "If you used AI, say so in the way your teacher asks — for example, a short note about what you asked and how you used the answer. Teachers set the rules for each class, and those can differ by subject. If you are not sure a tool is allowed, ask first.",
      af: "Kung gumamit ka ng AI, sabihin ito sa paraang hinihingi ng guro mo — halimbawa, isang maikling tala kung ano ang tinanong mo at paano mo ginamit ang sagot. Ang mga guro ang nagtatakda ng rules sa bawat klase, at puwede itong magkaiba ayon sa asignatura. Kung hindi ka sigurado kung pwede ang tool, magtanong muna.",
      back: "What would you write in a short note if your teacher asked you to disclose AI use?",
      backf: "Ano ang isusulat mo sa maikling tala kung hinihingi ng guro na sabihin mo ang paggamit ng AI?",
      link: "lesson.html?id=ai-adv-honest-use"
    },
    {
      id: "faq-ai-adv-honest-use-facts",
      k: [
        "check every fact", "i-check ang fact", "invented book", "cannot find the book", 
        "hindi ko mahanap", "verify the source", "i-verify", "gov.ph", "made-up book", 
        "imbentong source", "check the citation", "i-check ang citation", "mahanap ang libro", 
        "ang libro"
      ],
      p: [
        "the chatbot cited a book i cannot find", "hindi ko mahanap ang libro", 
        "should i trust ai citations", "pwede ko bang gamitin ang source ng ai", 
        "check every fact", "i-check ang fact"
      ],
      a: "Chatbots can invent book titles, dates, quotes, and laws that sound real. If you cannot find a fact in a textbook, with a teacher, or on an official site such as .gov.ph, do not use it. You are responsible for what you turn in.",
      af: "Puwedeng mag-imbento ang chatbot ng titulo ng libro, petsa, quote, at batas na mukhang totoo. Kung hindi mo mahanap ang fact sa textbook, sa guro, o sa opisyal na site tulad ng .gov.ph, huwag mo itong gamitin. Ikaw ang responsable sa isusumite mo.",
      back: "Where would you check a date or a law before you put it in your homework?",
      backf: "Saan mo i-check ang petsa o batas bago mo ilagay sa homework?",
      link: "lesson.html?id=ai-adv-honest-use"
    },
    {
      id: "faq-cyber-adv-attacks-defend",
      k: [
        "how attacks work", "paano gumagana ang atake", "paano gumagana ang mga atake", 
        "learn this to defend", "para magtanggol", "never try this", "huwag kailanman subukan", 
        "defensive only", "depensa lang", "spot attacks", "kilalanin ang atake", 
        "stay safe from attacks", "paano maging ligtas sa atake", "gumagana ang atake", 
        "ang mga atake"
      ],
      p: [
        "how attacks work", "how do attacks work", "paano gumagana ang atake", 
        "paano gumagana ang mga atake", "paano maging ligtas sa atake", 
        "is it ok to test an attack", "pwede bang i-test ang atake"
      ],
      a: "We learn how common attacks work so you can spot them and stay safe — not so you can try them. Never attempt this on real people, phones, or systems, not as a test and not as a joke. That can hurt people and may be against the law.",
      af: "Pinag-aaralan natin kung paano gumagana ang mga karaniwang atake para makilala mo sila at manatiling ligtas — hindi para subukan mo. Huwag kailanman gawin ito sa totoong tao, phone, o system, hindi bilang test at hindi bilang biro. Puwede itong manakit ng tao at maaaring labag sa batas.",
      back: "If a classmate wants to 'just test' an attack on someone's phone, what do you say?",
      backf: "Kung gusto ng kaklase na 'i-test lang' ang atake sa phone ng iba, ano ang sasabihin mo?",
      link: "lesson.html?id=cyber-adv-attacks"
    },
    {
      id: "faq-cyber-adv-attacks-malware",
      k: [
        "what is malware", "ano ang malware", "malware", "unknown usb", "hindi kilalang usb", 
        "napulot na usb", "pekeng app", "surprise file", "huwag isaksak", "do not plug in", 
        "don't plug it in", "found a usb", "may nahanap na usb"
      ],
      p: [
        "what is malware", "ano ang malware", "ano ba ang malware", "i found a usb", 
        "may nahanap akong usb", "pwede ko bang isaksak ang usb", 
        "should i plug in a usb i found"
      ],
      a: "Malware is software meant to harm a device or steal information. It can arrive as a surprise file, a fake app, or an unknown USB. Do not install apps from random links, and do not plug in a USB you found. If something feels wrong, tell a parent or teacher.",
      af: "Ang malware ay software na sadyang makakasama sa device o magnanakaw ng impormasyon. Puwede itong dumating bilang sorpresang file, pekeng app, o hindi kilalang USB. Huwag mag-install ng app mula sa random na link, at huwag isaksak ang USB na napulot mo. Kung may tila kakaiba, sabihin sa magulang o guro.",
      back: "You find a USB on a lab table. What is the safest next step?",
      backf: "May nahanap kang USB sa mesa ng laboratoryo. Ano ang pinakaligtas na susunod na hakbang?",
      link: "lesson.html?id=cyber-adv-attacks"
    },
    {
      id: "faq-cyber-adv-attacks-social",
      k: [
        "social engineering", "social engineer", "nagpapanggap", "support agent", "school it", 
        "fake school", "pekeng staff", "humihingi ng password", "humihingi ng otp", 
        "read back", "basahin mo pabalik", "pretend staff", "fix your account", 
        "what is social engineering", "ano ang social engineering", "asked for my password", 
        "school it asked"
      ],
      p: [
        "what is social engineering", "ano ang social engineering", 
        "ano ba ang social engineering", "school it asked for my password", 
        "humihingi ng password ang school it", "someone is pretending to be staff", 
        "nagpapanggap na support agent"
      ],
      a: "Some attacks trick a person, not a computer. Someone may pretend to be school staff, a relative, or a support agent and ask for a password, OTP, or PIN. A real school or company will not ask you to read those secrets back. Do not give them — stop, and tell a parent or teacher.",
      af: "May atakeng niloloko ang tao, hindi ang computer. Puwedeng magpanggap ang isang tao na staff ng school, kamag-anak, o support agent at humingi ng password, OTP, o PIN. Hindi hihingi ang totoong school o kumpanya na basahin mo pabalik ang mga sikretong iyon. Huwag ibigay — tumigil, at sabihin sa magulang o guro.",
      back: "A chat says 'school IT' and asks for your password to fix your account. What do you do?",
      backf: "May chat na nagsasabing 'school IT' siya at humihingi ng password para ayusin ang account mo. Ano ang gagawin mo?",
      link: "lesson.html?id=cyber-adv-attacks"
    },
    {
      id: "faq-cyber-adv-careers-paths",
      k: [
        "cyber careers", "cyber career", "mga cyber career", "ibang cyber", "other cyber", 
        "compliance", "help desk cyber", "tvl path", "ethics first", "depensa hindi atake", 
        "never attack others", "other cyber jobs", "iba pang cyber", 
        "rules risk and compliance"
      ],
      p: [
        "what cyber careers are there", "ano ang mga cyber career", "other cyber jobs", 
        "iba pang cyber career", "ano pang trabaho sa cyber", "do i have to work in a soc"
      ],
      a: "Not everyone in cybersecurity sits in a SOC. Some people help staff with everyday computer problems, design safer systems, teach people how to stay safe, or work on rules and compliance. All of these paths start with ethics and clear thinking, not with attacking others.",
      af: "Hindi lahat sa cybersecurity ay nakaupo sa SOC. May tumutulong sa staff sa pang-araw-araw na problema sa computer, may nagdidisenyo ng mas ligtas na system, may nagtuturo kung paano maging ligtas, at may gumagawa sa rules at compliance. Nagsisimula ang lahat ng landas na ito sa ethics at malinaw na pag-iisip, hindi sa pag-atake sa iba.",
      back: "Which cyber path sounds interesting to you, and why is it still defense-only work?",
      backf: "Aling cyber path ang interesante sa iyo, at bakit depensa pa rin ang trabahong iyon?",
      link: "lesson.html?id=cyber-adv-careers"
    },
    {
      id: "faq-cyber-adv-careers-start",
      k: [
        "tvl ict", "tesda", "dict", "senior high", "senior high student", "paano magsimula", 
        "how can i start", "ict track", "ict elective", "guidance counselor", 
        "official learning", "start in senior high", "paano ako magsisimula sa cyber", 
        "magsimula sa cyber"
      ],
      p: [
        "how can i start a cyber career", "paano magsimula sa cyber", 
        "paano ako magsisimula sa cyber", "what is tvl ict", "ano ang tvl ict", 
        "tesda or dict courses", "paano mag-aral ng cyber sa senior high"
      ],
      a: "In the Philippines, the TVL ICT track in senior high is one honest way to build computer skills at school. The lessons on this site are another, and you can ask a teacher or guidance counselor about ICT electives and clubs. Start with basics you can practice safely: strong passphrases, spotting scams, and a clear troubleshooting habit.",
      af: "Sa Pilipinas, isa sa mga tapat na paraan para magtayo ng skill sa computer sa school ang TVL ICT track sa senior high. Isa pa ang mga aralin sa site na ito, at puwede kang magtanong sa guro o guidance counselor tungkol sa ICT elective at club. Magsimula sa mga batayang ligtas mong maisasanay: matibay na passphrase, pagkilala sa scam, at malinaw na ugali sa pag-troubleshoot.",
      back: "Who at school could help you choose an ICT elective or club?",
      backf: "Sino sa school ang puwedeng tumulong sa iyo pumili ng ICT elective o club?",
      link: "lesson.html?id=cyber-adv-careers"
    },
    {
      id: "faq-cyber-adv-careers-certs",
      k: [
        "certification", "certifications", "mga certification", "industry cert", 
        "certificate ad", "fast cyber job", "huwag pagkatiwalaan ang ad", "do i need a cert", 
        "need a certification", "buy a certification", "industry certification", 
        "kailangan ko ba ng certification", "ng certification"
      ],
      p: [
        "do i need a certification", "kailangan ko ba ng certification", 
        "should i buy a cyber cert", "ano ang certification", "are cyber job ads real", 
        "totoo ba ang ad sa cyber job"
      ],
      a: "Some jobs later on may look at industry certifications, but they are not the only path, and you do not need to buy an expensive one in Grade 11. If you are curious, research official certification names with a teacher or counselor. Do not trust random ads that promise a fast, high-paying cyber job.",
      af: "Sa susunod, may mga trabahong tumitingin sa industry certification, pero hindi iyon ang tanging landas, at hindi mo kailangang bumili ng mahal na certification sa Grade 11. Kung curious ka, magsaliksik ng opisyal na pangalan ng certification kasama ang guro o counselor. Huwag pagkatiwalaan ang random na ad na nangangako ng mabilis at malaking sweldo sa cyber job.",
      back: "What would you check with a teacher before trusting an ad for a cyber certificate?",
      backf: "Ano ang itatanong mo sa guro bago pagkatiwalaan ang isang ad ng cyber certificate?",
      link: "lesson.html?id=cyber-adv-careers"
    },
    {
      id: "faq-it-adv-home-network-ask",
      k: [
        "home network", "home networks", "ano ang home network", "what is a home network", 
        "ligtas na network", "ligtas na home", "ask a parent first", "magtanong muna", 
        "sambahayan", "before you change", "bago baguhin ang setting", "home router", 
        "safe home network"
      ],
      p: [
        "what is a home network", "ano ang home network", "ano ba ang home network", 
        "how do i make our home network safer", "paano gawing ligtas ang home network", 
        "can i change the router settings", "pwede ko bang baguhin ang setting"
      ],
      a: "A home network is the router plus the phones, laptops, and other devices that share its internet. The router belongs to the household, so ask a parent or the adult who pays for the internet before you change any setting. You can learn the safe steps together.",
      af: "Ang home network ay ang router plus ang mga phone, laptop, at iba pang device na nagbabahagi ng internet nito. Sa sambahayan ang router, kaya magtanong sa magulang o sa adultong nagbabayad ng internet bago mo baguhin ang kahit anong setting. Puwede ninyong pag-aralan ang ligtas na hakbang nang magkasama.",
      back: "Who in your house should you ask before changing a router setting?",
      backf: "Sino sa bahay ang dapat mong tanungin bago baguhin ang setting ng router?",
      link: "lesson.html?id=it-adv-home-network"
    },
    {
      id: "faq-it-adv-home-network-wpa",
      k: [
        "admin password", "default admin", "default na admin", "wpa2", "wpa3", "wpa 2", 
        "wpa 3", "factory login", "factory admin", "open network", "open na network", 
        "palitan ang default", "admin login", "default admin password", "what is wpa3", 
        "what is wpa2", "ano ang wpa3", "ano ang wpa2", "is wpa3", "is wpa2"
      ],
      p: [
        "why change the default admin password", "bakit palitan ang default na admin password", 
        "what is wpa2", "what is wpa3", "ano ang wpa2", "ano ang wpa3", 
        "should i leave wifi open", "pwede bang walang password ang wifi"
      ],
      a: "Routers often come with a default admin login printed on a sticker, and attackers know those too, so change the admin password to a long unique passphrase. That is different from the Wi-Fi password. For Wi-Fi itself, choose WPA2 or WPA3 and do not leave the network open.",
      af: "Madalas may default na admin login ang router na naka-print sa sticker, at alam din iyon ng mga umatake, kaya palitan ang admin password ng mahaba at unique na passphrase. Iba ito sa Wi-Fi password. Para sa Wi-Fi, piliin ang WPA2 o WPA3, at huwag iwanang open ang network.",
      back: "What is the difference between the admin password and the Wi-Fi password?",
      backf: "Ano ang pinagkaiba ng admin password at ng Wi-Fi password?",
      link: "lesson.html?id=it-adv-home-network"
    },
    {
      id: "faq-it-adv-home-network-guest",
      k: [
        "guest network", "guest networks", "ano ang guest network", "what is a guest network", 
        "bisita sa wifi", "router update", "install updates", "mag-install ng update", 
        "repair-wifi.example", "official provider", "guest password", "password ng bisita"
      ],
      p: [
        "what is a guest network", "ano ang guest network", "ano ba ang guest network", 
        "para saan ang guest network", "should i update the router", 
        "kailangan ba ng update ang router"
      ],
      a: "A guest network lets visitors go online without joining the same network as family phones and computers. Share the guest password, not the main one, and never the admin password. With a parent's help, also install router updates, and ignore surprise texts such as ones from repair-wifi.example.",
      af: "Pinapayagan ng guest network ang bisita na mag-online nang hindi sumasali sa network ng mga phone at computer ng pamilya. I-share ang guest password, hindi ang main, at lalo nang hindi ang admin password. Sa tulong ng magulang, mag-install din ng update sa router, at huwag pansinin ang sorpresang text tulad ng mula sa repair-wifi.example.",
      back: "A visitor asks for the main Wi-Fi password. What can you share instead?",
      backf: "Humihingi ang bisita ng main na Wi-Fi password. Ano ang puwede mong i-share sa halip?",
      link: "lesson.html?id=it-adv-home-network"
    },
    {
      id: "faq-it-adv-coding-logic-pseudo",
      k: [
        "pseudocode", "pseudo code", "ano ang pseudocode", "what is pseudocode", 
        "coding logic", "logic sa pag-code", "unang tikim", "programs are steps", 
        "mga hakbang ang programa", "plan the steps", "plain language plan", 
        "first taste of coding"
      ],
      p: [
        "what is pseudocode", "what is pseudo code", "ano ang pseudocode", 
        "ano ba ang pseudocode", "what is coding logic", "ano ang logic sa pag-code", 
        "why write pseudocode"
      ],
      a: "A program is a clear list of steps a computer follows. Before anyone writes real code, it helps to plan those steps in plain language — that plan is called pseudocode. This is a thinking tool, not a secret language, and this site does not teach a full programming language.",
      af: "Ang programa ay malinaw na listahan ng mga hakbang na sinusunod ng computer. Bago magsulat ng totoong code, nakakatulong ang pagplano ng mga hakbang sa simpleng salita — ang planong iyon ay tinatawag na pseudocode. Tool ito sa pag-iisip, hindi sekretong wika, at hindi tinuturo ng site na ito ang buong programming language.",
      back: "Can you write three plain-language steps for a task you do every day?",
      backf: "Kaya mo bang magsulat ng tatlong hakbang sa simpleng salita para sa isang gawain mo araw-araw?",
      link: "lesson.html?id=it-adv-coding-logic"
    },
    {
      id: "faq-it-adv-coding-logic-ifelse",
      k: [
        "sequence", "if/else", "if else", "ifelse", "jeepney route", "ruta ng dyip", "dyip", 
        "sari-sari", "sukli", "sari sari store", "sari-sari store", "if then else", 
        "kung hindi", "ano ang if", "ano ang if else", "ano ang if/else"
      ],
      p: [
        "what is a sequence in coding", "ano ang sequence", "ano ang if else", 
        "what is if else", "what is if/else", "sukli sa sari-sari", "ruta ng dyip", 
        "jeepney route"
      ],
      a: "Sequence means do this, then that, in order — like a jeepney route: stop, let people on or off, collect the fare, then drive to the next stop. If/else means if this is true, do one thing; if not, do another, like giving sari-sari store change only when the customer paid enough.",
      af: "Ang sequence ay gawin ito, saka iyon, nang sunud-sunod — tulad ng ruta ng dyip: huminto, paibababa o paisakay, maningil ng pamasahe, saka tumakbo papunta sa susunod na hintuan. Ang if/else ay kung totoo ito, gawin ang isa; kung hindi, gawin ang iba, tulad ng pagbigay ng sukli sa sari-sari kapag sapat ang bayad.",
      back: "What happens in the sari-sari steps if the customer did not pay enough?",
      backf: "Ano ang nangyayari sa hakbang sa sari-sari kung kulang ang binayad ng customer?",
      link: "lesson.html?id=it-adv-coding-logic"
    },
    {
      id: "faq-it-adv-coding-logic-loop",
      k: [
        "what is a loop", "ano ang loop", "counting loop", "bilangin ang mangga", "while loop", 
        "hindi humihinto", "stopping condition", "one step at a time", "isa-isa ang hakbang", 
        "debug the steps", "count the mangoes", "umuulit ang loop", "ang loop", 
        "hindi humihinto ang loop"
      ],
      p: [
        "what is a loop", "ano ang loop", "ano ba ang loop", "why does my loop never stop", 
        "bakit hindi humihinto ang loop", "how do i fix wrong steps", 
        "paano ayusin kung mali ang hakbang"
      ],
      a: "A loop repeats a step until a condition is met, like counting mangoes until the box is empty. Every loop needs a clear stopping point, or the work never ends. If the result is wrong, check the steps one at a time, then test again.",
      af: "Umuulit ang loop ng isang hakbang hanggang matugunan ang isang condition, tulad ng pagbilang ng mangga hanggang maubos ang kahon. Kailangan ng bawat loop ng malinaw na katapusan, kung hindi ay hindi matatapos ang gawain. Kung mali ang resulta, tingnan isa-isa ang hakbang, saka i-test ulit.",
      back: "If a counting loop never stops, what is most likely missing?",
      backf: "Kung hindi humihinto ang counting loop, ano ang pinaka-malamang na kulang?",
      link: "lesson.html?id=it-adv-coding-logic"
    }
  ];

  var faq = updated.concat(added);

  var API = { faq: faq, updated: updated, added: added };

  if (typeof module !== "undefined" && module.exports) module.exports = API;
  root.RA2FaqFil = API;
})(typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : this);
