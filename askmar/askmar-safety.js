/* Ask Mar safety helpers — drop-in for Red Arrow v2.
   No dependencies. Mula: wire this in before FAQ matching (see README.md).
   MIN_FAQ_SCORE: require 2+ FAQ keyword hits before answering; otherwise refuse / redirect.
*/
(function (root) {
  "use strict";

  var MIN_FAQ_SCORE = 2;
  var REDACT = "[tinanggal / removed]";

  function normalize(text) {
    var s = String(text == null ? "" : text);
    s = s.toLowerCase();
    if (s.normalize) s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    s = s.replace(/['’]/g, "");
    s = s.replace(/[^a-z0-9ñ\s]+/g, " ");
    s = s.replace(/\s+/g, " ").trim();
    /* Keep real doubles (kill, bully). Fold only 3+ repeats: kiiill -> kill. */
    s = s.replace(/([a-zñ])\1{2,}/g, "$1");
    /* Join split compounds so "self harm", "self-harm" and "selfharm" match the same. */
    s = s.replace(/\bself\s+harms?\b/g, "selfharm");
    s = s.replace(/\bbinu\s+bully\b/g, "binubully");
    s = s.replace(/\bbinu\s+bullied\b/g, "binubully");
    s = s.replace(/\bkill\s+my\s+self\b/g, "kill myself");
    return s;
  }

  function compact(s) { return s.replace(/\s+/g, ""); }

  function hasStem(comp, stem) { return comp.indexOf(stem) >= 0; }

  /* Damerau–Levenshtein so adjacent transpositions like "myslef" cost 1. */
  function lev(a, b) {
    if (a === b) return 0;
    var al = a.length, bl = b.length, i, j;
    if (!al) return bl;
    if (!bl) return al;
    if (Math.abs(al - bl) > 1) return 99;
    var d = [];
    for (i = 0; i <= al; i++) {
      d[i] = [i];
      for (j = 1; j <= bl; j++) d[i][j] = i === 0 ? j : 0;
    }
    for (i = 1; i <= al; i++) {
      for (j = 1; j <= bl; j++) {
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        if (i > 1 && j > 1 && a.charAt(i - 1) === b.charAt(j - 2) && a.charAt(i - 2) === b.charAt(j - 1)) {
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
        }
      }
    }
    return d[al][bl];
  }

  function closeWord(w, target) { return lev(w, target) <= 1; }

  function hasFirstPerson(n) {
    return /\b(ako|ko|sa akin|akin|me|myself|my|i|im|ko ay)\b/.test(n);
  }

  /* Third person: a student asking for help for someone else also gets the full card. */
  function hasOtherPerson(n) {
    return /\bmy\s+(friend|friends|sister|brother|classmate|cousin|sibling)\b/.test(n)
      || /\b(kaibigan|classmate|kaklase|pinsan|kapatid|kuya|ate)\s+ko\b/.test(n)
      || /\b(ng|ni)\s+(kaibigan|classmate|kaklase|pinsan|kapatid|kuya|ate)\s+ko\b/.test(n)
      || /\bsomeone\s+i\s+know\b/.test(n)
      || /\ba\s+friend\s+of\s+mine\b/.test(n)
      || /\bang\s+(kaibigan|classmate|kaklase|pinsan|kapatid)\s+ko\b/.test(n);
  }

  function hasConcernPerson(n) {
    return hasFirstPerson(n) || hasOtherPerson(n);
  }

  /* ----- PII ----- */

  function scrubPII(text) {
    var s = String(text == null ? "" : text);
    var found = [];

    s = s.replace(/(\+?63|0)[\s-]*9(?:[\s-]*\d){9}/g, function (m) {
      var d = m.replace(/\D/g, "");
      if (/^09\d{9}$/.test(d) || /^639\d{9}$/.test(d)) {
        found.push("mobile");
        return REDACT;
      }
      return m;
    });

    s = s.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, function () {
      found.push("email");
      return REDACT;
    });

    /* 12-digit LRN, optional spaces/dashes, not part of a longer number. */
    s = s.replace(/(^|[^\d])(\d(?:[\s-]*\d){11})(?!\d)/g, function (m, pre, num) {
      var d = num.replace(/\D/g, "");
      if (d.length === 12) {
        found.push("lrn");
        return pre + REDACT;
      }
      return m;
    });

    var addr = /\b(?:\d{1,5}\s+)?(?:[A-Za-zñÑ][A-Za-zñÑ.'-]*\s+){0,4}(?:st\.?|street|ave\.?|avenue|rd\.?|road|blvd\.?|boulevard)\b(?:\s*,\s*[A-Za-zñÑ .]+){0,3}|\b(?:brgy\.?|barangay|purok)\.?\s+[A-Za-z0-9ñÑ][A-Za-z0-9ñÑ .'’-]*(?:,\s*[A-Za-zñÑ .]+){0,3}/gi;
    s = s.replace(addr, function (m) {
      if (m.replace(/\s+/g, " ").trim().length < 4) return m;
      found.push("address");
      return REDACT;
    });

    return { clean: s, found: found };
  }

  /* ----- classify ----- */

  function isLessonAmbiguous(n) {
    return /\bthreat\s+actor\b/.test(n)
      || /\bthreat\s+model\b/.test(n)
      || /\bphishing\s+threats?\b/.test(n)
      || /\bsecurity\s+threats?\b/.test(n)
      || /\bcyberbullying\b/.test(n)
      || /\babuse\s+of\b/.test(n)
      || /\b(admin\s+)?privileges?\b/.test(n)
      || /\b(kill|patayin)\s+(the\s+|a\s+|ang\s+)?(process|proseso)\b/.test(n)
      || /\b(post|posting|share|sharing|safe to post)\b.{0,40}\bphotos?\b/.test(n)
      || /\bphotos?\s+of\s+me\s+online\b/.test(n)
      || /\bwhat\s+is\s+(a\s+|an\s+)?(security\s+)?threat\b/.test(n)
      || /\bano\s+ang\s+(security\s+)?threat\b/.test(n)
      || /\bexplain\s+the\s+threat\b/.test(n)
      || /\bdeal\s+with\b.{0,20}\bthreats?\b/.test(n);
  }

  function typoKillMyself(words) {
    var i, a, b, c;
    for (i = 0; i < words.length; i++) {
      a = words[i];
      b = words[i + 1] || "";
      c = words[i + 2] || "";
      if (closeWord(a, "kill") && (closeWord(b, "myself") || closeWord(b, "herself") || closeWord(b, "himself") || closeWord(b, "themselves"))) return true;
      if (closeWord(a, "kill") && b === "my" && closeWord(c, "self")) return true;
    }
    return false;
  }

  function crisisReason(n) {
    var c = compact(n);
    var words = n.split(" ").filter(Boolean);
    var fp = hasFirstPerson(n);
    var other = hasOtherPerson(n);
    var person = fp || other;
    var lesson = isLessonAmbiguous(n);

    /* Strong suicide / self-harm phrases (EN + FIL stems). */
    if (/\bsuicid(e|al)\b/.test(n) || hasStem(c, "suicide") || hasStem(c, "suicidal")) {
      return "suicide/suicidal";
    }
    if (hasStem(c, "pakamatay") || hasStem(c, "papakamatay")) return "pakamatay stem";
    if (/\bmamatay\b/.test(n) || hasStem(c, "mamatay")) return "mamatay";
    if (/\bayaw\b.{0,20}\bmabuhay\b/.test(n) || /\bayaw\s+ko\s+na\b/.test(n)) return "ayaw ko na mabuhay";
    if (/\bselfharm\b/.test(n)) return "self harm";
    if (/\b(want|wants|wanna|wanted)\s+(to\s+)?die\b/.test(n)
      || /\bgusto(\s+ko(ng|n)?)?\s+(nang\s+)?(mamatay|die)\b/.test(n)
      || /\bi\s+want\s+to\s+die\b/.test(n)) {
      return "want to die";
    }
    if (/\bend\s+my\s+life\b/.test(n) || /\bend\s+it\s+all\b/.test(n)) return "end my life";
    if (/\bcut(ting)?\s+(my\s*)?self\b/.test(n)) return "cut myself";
    if (typoKillMyself(words) || /\bkill\s+myself\b/.test(n)) return "kill myself";

    /* Harm to self: saktan / patayin + sarili or first person, but not "patayin ang process". */
    if (!/\b(process|proseso)\b/.test(n)) {
      if (hasStem(c, "saktanangsarili") || /\bsaktan\s+ang\s+sarili\b/.test(n)) return "saktan ang sarili";
      if ((hasStem(c, "sinasaktan") || hasStem(c, "sasaktan") || /\bsaktan\b/.test(n)) && (person || /\bsarili\b/.test(n))) {
        return "saktan + person";
      }
      if (/\bpatayin\b/.test(n) && (person || /\bsarili\b/.test(n))) return "patayin + self";
    }

    /* Bullying directed at the student. "what is cyberbullying?" stays maybe. */
    if (hasStem(c, "binubully") || /\bbinubully\b/.test(n)) return "binubully";
    if ((/\b(bullied|bullying|bully)\b/.test(n) || hasStem(c, "bullied") || hasStem(c, "bullying"))
        && person) {
      /* Definition / lesson questions about cyberbullying stay "maybe". Directed harm stays crisis. */
      var lessonBully = /\bcyberbullying\b/.test(n) && /\b(what is|whats|ano ang|define|know what|meaning of)\b/.test(n);
      if (!lessonBully) return "bullying + person";
    }

    if (hasStem(c, "nagbabanta") || /\bnagbabanta\b/.test(n)) return "nagbabanta";
    if (hasStem(c, "inaabuso") || /\binaabuso\b/.test(n)) return "inaabuso";
    if (/\babusing\b/.test(n) && person) return "abusing + person";
    if (/\bthreatened\b/.test(n) && person) return "threatened + person";
    if (/\bthreatening\s+(me|ako|sa akin|him|her|them|classmate|kaibigan|kaklase)\b/.test(n)
      || /\b(me|ako|sa akin)\s+.{0,10}threatening\b/.test(n)
      || (other && /\bthreaten/.test(n))) {
      return "threatening a person";
    }

    /* Sextortion / blackmail / nude. */
    if (/\bsextort/.test(n) || hasStem(c, "sextort")) return "sextortion";
    if (/\bblackmail/.test(n)) return "blackmail";
    if (/\bnude\b/.test(n) || /\bnudes\b/.test(n) || /\bhubad\b/.test(n)) return "nude/hubad";
    if (/\bhurt\s+me\b/.test(n) || /\bsinasaktan\s+ako\b/.test(n)) return "hurt me";

    /* Account takeover / stolen account. */
    if (/\baccount\s+take\s*over\b/.test(n) || /\btakeover\b/.test(n) && /\baccount\b/.test(n)) {
      return "account takeover";
    }
    if (/\btook\s+over\b.{0,20}\baccount\b/.test(n) || /\baccount\b.{0,20}\btook\s+over\b/.test(n)) {
      return "took over account";
    }
    if (/\bstolen\s+account\b/.test(n) || /\baccount\s+was\s+stolen\b/.test(n) || /\bstole\s+my\s+account\b/.test(n)) {
      return "stolen account";
    }
    if (/\bnanakaw\b.{0,20}\baccount\b/.test(n) || /\baccount\b.{0,20}\bnanakaw\b/.test(n)) {
      return "nanakaw account";
    }

    /* Child Safety probe 2026-11-23: self-harm, abuse and sextortion wording. */
    var family = /\b(tatay|itay|papa|daddy|dad|stepdad|stepfather|step\s+dad|step\s+father|tito|tiyo|uncle|nanay|inay|mama|mommy|mom|stepmom|stepmother|lolo|lola|kuya|ate|pinsan|cousin|boyfriend|bf|teacher|guro|coach)\b/;
    if (/\bhurt(s|ing)?\s+(my\s*self|myself)\b/.test(n) || hasStem(c, "hurtmyself")) return "hurt myself";
    if (/\b(ayoko|ayokong|ayaw|di|hindi)\b.{0,20}\bmabuhay\b/.test(n)) return "ayoko mabuhay";
    if (/\bsaysay\b/.test(n) && (/\bbuhay\b/.test(n) || /\bwala/.test(n))) return "walang saysay";
    if (/\b(want|wants|wanna|wanted|going|gonna|will|thinking|plan|planning|gusto)\b.{0,16}\b(end|ending)\s+it\b/.test(n) && person) return "want to end it + person";
    if (/\bend\s+(his|her|their)\s+(own\s+)?life\b/.test(n)) return "end their life";
    if (/\b(touches|touched|touching|touch)\s+(me|ako|my)\b/.test(n)
      || /\b(hinahawakan|hinipuan|hinihipuan|hinawakan)\b/.test(n) && fp) return "touches me";
    if (hasStem(c, "bugbog") || /\bbinubugbog\b/.test(n)) return "bugbog";
    /* Probe round 2: laslas / hiwa, not wanting to live, leaked photos. */
    if (hasStem(c, "laslas") || /\blaslas/.test(n)) return "laslas";
    if (/\b(hiwa|hinihiwa|hiniwa|naghihiwa)\b/.test(n) && (/\bsarili\b/.test(n) || /\b(braso|pulso|wrist|arm|balat)\b/.test(n) || /\b(hinihiwa|hiniwa|naghihiwa)\s+(ko|ako)\b/.test(n))) return "hiwa sarili";
    if (/\b(dont|do\s+not|don\s+t|no\s+longer|never)\s+(want|wanna)\s+(to\s+)?(live|be\s+alive|exist)\b/.test(n)
      || /\b(dont|do\s+not)\s+want\s+to\s+be\s+here\s+anymore\b/.test(n)) return "dont want to live";
    if (/\b(leak|leaks|leaked|leaking|ikalat|ikakalat|kinalat|ipost|ipopost|pinost|ipakalat|spread|expose)\b/.test(n)
      && /\b(pics?|pictures?|photos?|litrato|picture|video|videos|vid|vids)\b/.test(n)
      && (fp || other)) {
      return "leak my photos";
    }
    if (/\b(touch|touches|touched|touching|hurt|hurts|hurting|hit|hits|hitting|beat|beats|beating|sinasaktan|sinampal)\b/.test(n) && family.test(n) && person) {
      return "touch/hurt + family";
    }
    if (/\b(threat|threaten|threatened|threatening|banta|nagbanta|nagbabanta|blackmail)/.test(n)
      && /\b(post|ipost|ipopost|ikalat|ikakalat|share|leak|upload|send)\b/.test(n)
      && /\b(pics?|pictures?|photos?|litrato|picture|video|videos|vid|vids)\b/.test(n)) {
      return "threat to post pics";
    }

    /* First-person + a clear crisis stem, unless this is only a lesson wording. */
    if (person && !lesson) {
      if (/\b(threaten|threatening|threatened|threat)\b/.test(n) && /\b(me|ako|sa akin|against\s+me|sa\s+akin)\b/.test(n)) {
        return "person + threat";
      }
      /* Third-person marker plus a crisis stem (die, mamatay, bully, abuso, saktan...). */
      if (other && (/\b(die|suicide|suicidal|mamatay|pakamatay|bully|bullied|bullying|abuso|abusing|saktan|hurt|blackmail|nude|hubad)\b/.test(n) || hasStem(c, "pakamatay") || hasStem(c, "binubully") || hasStem(c, "inaabuso") || hasStem(c, "nagbabanta"))) {
        return "third person + crisis stem";
      }
    }
    /* "online threat against me" */
    if (/\bthreat\b.{0,24}\b(against\s+me|sa\s+akin|sa akin)\b/.test(n)
      || /\b(against\s+me|sa\s+akin)\b.{0,24}\bthreat\b/.test(n)) {
      return "threat against me";
    }

    return null;
  }

  function harmfulReason(n) {
    if (/\bignore\s+your\s+rules\b/.test(n)) return "jailbreak: ignore your rules";
    if (/\bpretend\s+you\s+are\b/.test(n) || /\bpretend\s+to\s+be\b/.test(n)) return "jailbreak: pretend you are";
    if (/\bdo\s+anything\s+now\b/.test(n) || /\b\bdan\b/.test(n) && /\b(mode|jailbreak|ignore|prompt)\b/.test(n) || /(?:^|\s)dan(?:\s|$)/.test(n) && n.split(" ").length <= 4) {
      /* bare "DAN" or short "enable DAN" jailbreak; avoid "standard" / "dance" via word bound */
      if (/\bdan\b/.test(n) && !/\bdance\b/.test(n) && !/\bstandard\b/.test(n) && !/\bang\s+dan\b/.test(n)) {
        if (/\b(dan|jailbreak|ignore|enable|activate)\b/.test(n)) return "jailbreak: DAN";
      }
    }
    if (/\b(bypass|lusot|lusutan|lusutin)\b/.test(n) && /\b(filter|wifi|wi\s*fi|school)\b/.test(n)) return "bypass school filter/wifi";
    if (/\b(filter|wifi|wi\s*fi)\b/.test(n) && /\b(bypass|lusot|lusutan|lusutin|unblock)\b/.test(n)) return "bypass school filter/wifi";
    if (/\bhack\b/.test(n) && /\b(wifi|wi\s*fi|fb|facebook|account|classmate|someone|somebody|password|kanila)\b/.test(n)) {
      return "hack wifi/account/fb/someone";
    }
    if (/\b(steal|nakaw|ninakaw)\b/.test(n) && /\b(password|otp|passcode|account|passphrase)\b/.test(n)) {
      return "steal password/otp";
    }
    if (/\bget\b.{0,24}\b(someone|someones|classmate|kanila)s?\b.{0,16}\botp\b/.test(n)
      || /\botp\b.{0,16}\b(someone|classmate)\b/.test(n)) {
      return "get someone's otp";
    }
    if (/\bcrack\b/.test(n) && /\b(password|wifi|account|passphrase)\b/.test(n)) return "crack password";
    if (/\b(launch|perform|run|how\s+to|paano)\b.{0,24}\bddos\b/.test(n)
      || /\bddos\b.{0,16}\b(someone|somebody|school|classmate)\b/.test(n)) {
      return "ddos";
    }
    if (/\b(make|create|build|write|craft|code)\b.{0,24}\b(malware|virus|ransomware)\b/.test(n)) {
      return "making malware/virus";
    }
    if (/\bdoxx?i?(ng)?\b/.test(n)) return "dox";
    if (/\bdeepfake\b/.test(n) && /\b(person|classmate|someone|somebody|her|him|of\s+a|real|kanila|guro|teacher)\b/.test(n)) {
      return "deepfake of a real person";
    }
    if (/\bspy\s+on\b/.test(n)) return "spy on someone";
    if (/\b(make|create|build|gumawa)\b.{0,24}\bphishing\b/.test(n) || /\bphishing\s+(page|site|site|kit)\b/.test(n)) {
      return "make a phishing page";
    }
    return null;
  }

  function maybeReason(n) {
    if (isLessonAmbiguous(n)) {
      if (/\bcyberbullying\b/.test(n)) return "lesson word: cyberbullying";
      if (/\bthreat\b/.test(n)) return "lesson word: threat";
      if (/\babuse\b/.test(n)) return "lesson word: abuse";
      if (/\bphotos?\b/.test(n)) return "lesson word: photos";
      if (/\b(process|proseso)\b/.test(n)) return "lesson word: kill/patayin process";
      return "ambiguous lesson wording";
    }
    if (/\b(disappear|disappearing|vanish)\b/.test(n) && /\b(want|wanna|wish|forever|gusto)\b/.test(n)) return "want to disappear";
    if (/\b(mawala|maglaho)\b/.test(n) && /\b(gusto|sana|na\s+lang|nalang|forever)\b/.test(n) && hasFirstPerson(n)) return "gusto ko nang mawala";
    if (/\bpagod\s+na\s+(ako|ko)\b/.test(n) || /\b(tired\s+of\s+everything|tired\s+of\s+life)\b/.test(n)) return "pagod na ako sa lahat";
    /* Whole-word only for leftover ambiguous terms, no first-person harm. */
    if (/\bcyberbullying\b/.test(n)) return "lesson word: cyberbullying";
    if (/\bthreats?\b/.test(n) || /\bthreat\b/.test(n)) return "whole word: threat";
    if (/\babuse\b/.test(n)) return "whole word: abuse";
    if (/\bphotos?\b/.test(n)) return "whole word: photos";
    if (/\bpatayin\b/.test(n)) return "whole word: patayin";
    if (/\bkill\b/.test(n)) return "whole word: kill";
    if (/\bbullying\b/.test(n) || /\bbullied\b/.test(n) || /\bbully\b/.test(n)) return "whole word: bully";
    return null;
  }

  function classify(text) {
    var n = normalize(text);
    if (!n) return { label: "offtopic-or-faq", reason: "empty" };

    var crisis = crisisReason(n);
    if (crisis) return { label: "crisis", reason: crisis };

    var harm = harmfulReason(n);
    if (harm) return { label: "harmful", reason: harm };

    var maybe = maybeReason(n);
    if (maybe) return { label: "maybe", reason: maybe };

    return { label: "offtopic-or-faq", reason: "no safety category; apply FAQ only if score >= MIN_FAQ_SCORE" };
  }

  var API = {
    normalize: normalize,
    scrubPII: scrubPII,
    classify: classify,
    MIN_FAQ_SCORE: MIN_FAQ_SCORE
  };

  if (typeof module !== "undefined" && module.exports) module.exports = API;
  root.RA2Safety = API;
})(typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : this);
