/* Red Arrow sims v3 — drop-in replacement for the sims:{...} object in v2/data.js
 *
 * Usage: set RA2.sims = RA2SIMS_V3;  (or paste the object over sims:{...})
 * Shape matches data.js: { title, badge, after, steps:[{ q, choices, a, hints, explain }] }
 * Added optional fields: title_fil, badge_fil, scoring, ui, and on each step:
 *   q_fil, choices_fil, hints_fil, explain_fil, lesson
 * Answer index `a` is 0-based, same as the Q() helper.
 *
 * Scoring suggestion (needs a small runner change in v2.js):
 *   10 points if correct on the first Check with no hint
 *    5 points if correct after a hint and/or a Try again
 *   Pass at 80% of max points (max = 10 * step count)
 *   Mastered = pass twice (unchanged)
 * The current runner only awards 10 or 0, and passes on 80% first-try count.
 *
 * Safety: made-up brands only (GKash, PadalaPagong, PalengKalabaw, BangusNet Fiber); .example domains;
 * IPs only in 192.0.2.x / 198.51.100.x / 203.0.113.x; fictional school hostnames
 * and usernames; defensive only. Scam sim: no victim shaming, first response is
 * tell a parent or teacher, report in the official app, no phone numbers, keep
 * the threat line. No login-looking pages. No real-brand logos in ui.art.
 * All art is hand-drawn SVG (no AI-generated art).
 */
var RA2SIMS_V3 = {
  "hinog": {
    "title": "Hinog o Hilaw? Train a mango sorter",
    "badge": "Mango Trainer",
    "after": "ai2",
    "steps": [
      {
        "q": "Your sorter needs training data. Which set is best?",
        "choices": [
          "50 green mangoes only",
          "25 ripe and 25 unripe, clearly labelled",
          "5 random fruit photos"
        ],
        "a": 1,
        "hints": [
          "A model learns from examples of every answer it must give.",
          "Look for a set that is both balanced and clearly labelled."
        ],
        "explain": "Balanced, labelled examples teach both answers: hinog and hilaw. A pile of only green mangoes, or a handful of random fruit, leaves gaps the sorter will fill with guesses.",
        "q_fil": "Kailangan ng training data ang sorter mo. Aling set ang pinakamainam?",
        "choices_fil": [
          "50 berdeng mangga lang",
          "25 hinog at 25 hilaw, may malinaw na label",
          "5 random na litrato ng prutas"
        ],
        "hints_fil": [
          "Natututo ang model mula sa mga halimbawa ng bawat sagot na kailangan nitong ibigay.",
          "Hanapin ang set na pantay at may malinaw na label."
        ],
        "explain_fil": "Ang pantay at may label na mga halimbawa ang nagtuturo ng dalawang sagot: hinog at hilaw. Kung berde lang ang tumpok, o iilang random na prutas lang, may puwang na huhulaan na lang ng sorter.",
        "lesson": "ai2"
      },
      {
        "q": "You labelled 10 mangoes “ripe,” but 3 of them were still green. What is most likely to happen?",
        "choices": [
          "The sorter may learn the wrong idea of “ripe.”",
          "The sorter will automatically fix your mistakes.",
          "Nothing. Labels do not matter once the photos are saved."
        ],
        "a": 0,
        "hints": [
          "The model trusts the labels you give it. It cannot visit the palengke to double-check.",
          "It has no other teacher besides your labels."
        ],
        "explain": "A model cannot know that a label is wrong. If some green mangoes are marked ripe, it will treat those mistakes as truth and may call other unripe mangoes “ripe” later.",
        "q_fil": "10 na mangga ang ni-label mong “hinog,” pero 3 sa mga iyon ay berde pa. Ano ang pinaka-malamang na mangyari?",
        "choices_fil": [
          "Maaaring mali ang matutunan ng sorter kung ano ang “hinog.”",
          "Kusa nitong itatama ang mga mali mong label.",
          "Wala. Hindi na mahalaga ang label kapag naka-save na ang litrato."
        ],
        "hints_fil": [
          "Pinagkakatiwalaan ng model ang mga label mo. Hindi ito makakapunta sa palengke para i-double-check.",
          "Wala itong ibang guro maliban sa mga label mo."
        ],
        "explain_fil": "Hindi alam ng model kung mali ang isang label. Kung may berdeng manggang naka-mark na hinog, ituturing nitong tama iyon, at maaari nitong tawaging “hinog” ang ibang hilaw na mangga sa susunod.",
        "lesson": "ai2"
      },
      {
        "q": "You trained mostly on unripe mangoes. A golden ripe mango arrives. What is most likely?",
        "choices": [
          "The sorter may call the ripe mango “unripe.”",
          "The sorter will always be perfect.",
          "The mango is lying."
        ],
        "a": 0,
        "hints": [
          "Think about what the sorter saw most often.",
          "Uneven examples can push the model toward the more common label."
        ],
        "explain": "If the sorter rarely saw ripe mangoes, it never really learned them. It may treat “hilaw” as the default. That is bias from uneven training data, not a tricky mango.",
        "q_fil": "Karamihan sa training mo ay hilaw na mangga. Dumating ang isang ginintuang hinog na mangga. Ano ang pinaka-malamang?",
        "choices_fil": [
          "Maaaring tawagin ng sorter na “hilaw” ang hinog na mangga.",
          "Palaging perpekto ang sorter.",
          "Nagsisinungaling ang mangga."
        ],
        "hints_fil": [
          "Isipin kung ano ang madalas na nakita ng sorter.",
          "Puwedeng itulak ng hindi pantay na mga halimbawa ang model palapit sa mas madalas na label."
        ],
        "explain_fil": "Kung bihira itong makakita ng hinog na mangga, hindi niya talaga natutunan ang mga iyon. Maaaring “hilaw” ang default nitong sagot. Bias iyon mula sa hindi pantay na training data, hindi dahil madaya ang mangga.",
        "lesson": "ai2"
      },
      {
        "q": "How do you check that the sorter really works?",
        "choices": [
          "Test it with new mangoes it never saw.",
          "Test it only on the same photos it trained on.",
          "Trust it if the training score was 100%."
        ],
        "a": 0,
        "hints": [
          "Would you trust a quiz if the student had already seen the answer key?",
          "A high score on training photos can hide memorization."
        ],
        "explain": "Testing on unseen examples shows real accuracy. A perfect score on the training photos can just mean the sorter memorized them, the way a student might memorize an answer key.",
        "q_fil": "Paano mo titiyakin na talagang gumagana ang sorter?",
        "choices_fil": [
          "I-test ito sa mga bagong mangga na hindi pa nito nakita.",
          "I-test lang ito sa mga litratong ginamit sa training.",
          "Pagkatiwalaan ito kung 100% ang score sa training."
        ],
        "hints_fil": [
          "Pagkakatiwalaan mo ba ang quiz kung nakita na ng estudyante ang sagot?",
          "Puwedeng itago ng mataas na score sa training photos ang pagsasaulo lang."
        ],
        "explain_fil": "Ang test sa mga hindi pa nakikitang halimbawa ang nagpapakita ng tunay na accuracy. Ang perfect na score sa training photos ay maaaring ibig sabihin ay nisaulo lang ng sorter ang mga iyon, tulad ng estudyanteng nagsaulo ng answer key.",
        "lesson": "ai2"
      },
      {
        "q": "The sorter scores 100% on training photos but only 50% on new mangoes. What does that mean?",
        "choices": [
          "It memorized the training set and did not generalize.",
          "It is ready for the palengke.",
          "The new mangoes must be fake."
        ],
        "a": 0,
        "hints": [
          "Compare the two scores. Which set did it already “see”?",
          "A tool that only works on old examples is not ready for new ones."
        ],
        "explain": "A big gap between training and test scores usually means the sorter memorized the old photos instead of learning the idea of ripe and unripe. It is not ready to use on new mangoes yet.",
        "q_fil": "100% ang score ng sorter sa training photos pero 50% lang sa mga bagong mangga. Ano ang ibig sabihin nito?",
        "choices_fil": [
          "Nisaulo nito ang training set at hindi ito naka-generalize.",
          "Handa na ito para sa palengke.",
          "Peke siguro ang mga bagong mangga."
        ],
        "hints_fil": [
          "Ihambing ang dalawang score. Aling set ang “nakita” na nito?",
          "Ang tool na sa lumang halimbawa lang gumagana ay hindi pa handa sa bago."
        ],
        "explain_fil": "Kung malaki ang agwat ng training at test scores, malamang nisaulo lang ng sorter ang lumang litrato, hindi ang ideya ng hinog at hilaw. Hindi pa ito handang gamitin sa mga bagong mangga.",
        "lesson": "ai2"
      },
      {
        "q": "To fix a sorter that is biased toward “unripe,” what is the best next step?",
        "choices": [
          "Add more clearly labelled ripe examples and train again.",
          "Delete every unripe example.",
          "Make all the photos blurrier."
        ],
        "a": 0,
        "hints": [
          "You want both answers represented well, not just one.",
          "Removing all hilaw examples would swing the bias the other way."
        ],
        "explain": "Give the sorter more clearly labelled ripe mangoes, then train and test again. Do not delete all the unripe ones — it still needs those examples, just not almost all of them.",
        "q_fil": "Para ayusin ang sorter na may bias palapit sa “hilaw,” ano ang pinakamainam na susunod na hakbang?",
        "choices_fil": [
          "Magdagdag ng mas maraming hinog na halimbawa na may malinaw na label, saka mag-train ulit.",
          "Burahin ang lahat ng halimbawang hilaw.",
          "Gawing mas blurry ang lahat ng litrato."
        ],
        "hints_fil": [
          "Kailangan naka-representang mabuti ang dalawang sagot, hindi isa lang.",
          "Kung buburahin mo ang lahat ng hilaw, babaliktad lang ang bias."
        ],
        "explain_fil": "Bigyan ang sorter ng mas maraming hinog na mangga na may malinaw na label, saka mag-train at mag-test ulit. Huwag burahin ang lahat ng hilaw — kailangan pa rin nito ang mga iyon, pero hindi dapat halos iyon lang ang laman ng set.",
        "lesson": "ai2"
      },
      {
        "q": "A customer brings a mango the sorter labels “ripe,” but it looks green to you. What should you do?",
        "choices": [
          "Trust your eyes and check. The model can be wrong.",
          "Always follow the sorter. Machines do not make mistakes.",
          "Throw the mango away without looking."
        ],
        "a": 0,
        "hints": [
          "A confident label is still only a prediction.",
          "You are allowed to disagree with a tool and look again."
        ],
        "explain": "A sorter can be confident and still be wrong. Use it as a helper, then check with your own eyes — and with a person if it matters to a customer.",
        "q_fil": "May customer na may dalang mangga. “Hinog” ani ng sorter, pero berde pa ito sa tingin mo. Ano ang dapat mong gawin?",
        "choices_fil": [
          "Pagkatiwalaan ang mata mo at i-check. Puwedeng magkamali ang model.",
          "Palaging sundin ang sorter. Hindi nagkakamali ang machine.",
          "Itapon ang mangga nang hindi tinitingnan."
        ],
        "hints_fil": [
          "Prediction pa rin ang isang confident na label.",
          "Puwede kang tumutol sa isang tool at tumingin ulit."
        ],
        "explain_fil": "Puwedeng confident ang sorter pero mali pa rin. Gamitin ito bilang katulong, saka tingnan mismo — at magtanong sa isang tao kung mahalaga ito sa customer.",
        "lesson": "ai2"
      }
    ],
    "title_fil": "Hinog o Hilaw? Mag-train ng mango sorter",
    "badge_fil": "Mango Trainer",
    "scoring": {
      "firstTry": 10,
      "afterHint": 5,
      "passPercent": 80,
      "masteredPasses": 2,
      "note": "Award 10 if correct on the first Check with no hint; 5 if correct after a hint or a Try again. Pass at 80% of (10 × steps). Mastered = pass twice."
    },
    "ui": {
      "kind": "mango-label-then-test",
      "art": [
        "art/mango-ripe.svg",
        "art/mango-unripe.svg",
        "art/mango-mid.svg"
      ],
      "tapOnly": true,
      "summary": "Students tap 12 mango cards to label each Hinog (ripe) or Hilaw (unripe), then run a held-out test of 8 new mangoes. The training deck is planted uneven: 9 hilaw and only 3 hinog. Even with perfect labels, the simulated sorter leans toward 'hilaw' and misses ripe test mangoes. A short bias callout then offers a top-up pack of 6 ripe mangoes to relabel and retest.",
      "summary_fil": "Tinitap ng estudyante ang 12 mango card para i-label na Hinog o Hilaw, saka nito papatakbuhin ang test na 8 bagong mangga. Sadya ang hindi pantay na training deck: 9 hilaw at 3 hinog lang. Kahit tama ang lahat ng label, humahilig ang simulated sorter sa 'hilaw' at minamali ang mga hinog sa test. May maikling paliwanag tungkol sa bias, saka may top-up na 6 na hinog na mangga para i-retest.",
      "notes": [
        "Use mango-ripe.svg for hinog, mango-unripe.svg for hilaw, mango-mid.svg only as a decorative 'turning' card in the top-up pack if useful (its true label is hinog).",
        "Big tap targets (at least 48px). Two label buttons under the board: Hinog / Hilaw, plus a 'Run test' button after all 12 are labelled.",
        "Do not auto-shame wrong labels; show the true label after the test, then the bias callout.",
        "Model rule (keep it simple): let nH and nL be the student's hinog and hilaw labels on the training deck. If nL >= 2 * max(nH, 1), predict hilaw for every test mango (majority bias). Otherwise predict the true label for cards the student labelled correctly in spirit — actually, train only from student labels: for a balanced set, predict each test mango's true label if the training labels were at least 80% accurate; if training accuracy is lower, flip 2–3 test predictions. After the 6-ripe top-up, nH should exceed nL and the sorter should get most ripe test mangoes right.",
        "Show accuracy as 'correct / 8' and a short EN/FIL sentence. Optional: a tiny bar in teal (good) or accent red (weak)."
      ],
      "budget_php": null,
      "stages": [
        {
          "id": "train",
          "title": "Label the training mangoes",
          "title_fil": "I-label ang mga training na mangga",
          "instruction": "Tap each mango and mark it Hinog (ripe) or Hilaw (unripe). These 12 are what the sorter will study.",
          "instruction_fil": "I-tap ang bawat mangga at markahan ito ng Hinog o Hilaw. Ito ang 12 na pag-aaralan ng sorter."
        },
        {
          "id": "test",
          "title": "Run the test",
          "title_fil": "Patakbuhin ang test",
          "instruction": "These 8 mangoes were not in the training set. Tap “Run test” to see how the sorter does.",
          "instruction_fil": "Hindi kasama sa training set ang 8 manggang ito. I-tap ang “Patakbuhin ang test” para makita kung paano gumagana ang sorter."
        },
        {
          "id": "fix",
          "title": "Fix the bias",
          "title_fil": "Ayusin ang bias",
          "instruction": "The training set had many more hilaw mangoes than hinog. Add these 6 ripe mangoes, then test again.",
          "instruction_fil": "Mas marami ang hilaw kaysa hinog sa training set. Idagdag ang 6 na hinog na mangga, saka i-test ulit."
        }
      ],
      "callout_bias": {
        "en": "You labelled the training set, but it had 9 hilaw and only 3 hinog. The sorter learned “most mangoes are hilaw” and missed ripe ones. Uneven examples create bias. Let’s add more ripe mangoes and test again.",
        "fil": "Na-label mo ang training set, pero 9 ang hilaw at 3 lang ang hinog. Natutunan ng sorter na “hilaw ang karamihan” kaya palyado ito sa mga hinog. Ang hindi pantay na halimbawa ang nagdudulot ng bias. Magdagdag tayo ng mas maraming hinog na mangga at i-test ulit."
      },
      "training": [
        {
          "id": "m01",
          "art": "art/mango-unripe.svg",
          "true": "unripe"
        },
        {
          "id": "m02",
          "art": "art/mango-unripe.svg",
          "true": "unripe"
        },
        {
          "id": "m03",
          "art": "art/mango-ripe.svg",
          "true": "ripe"
        },
        {
          "id": "m04",
          "art": "art/mango-unripe.svg",
          "true": "unripe"
        },
        {
          "id": "m05",
          "art": "art/mango-unripe.svg",
          "true": "unripe"
        },
        {
          "id": "m06",
          "art": "art/mango-unripe.svg",
          "true": "unripe"
        },
        {
          "id": "m07",
          "art": "art/mango-ripe.svg",
          "true": "ripe"
        },
        {
          "id": "m08",
          "art": "art/mango-unripe.svg",
          "true": "unripe"
        },
        {
          "id": "m09",
          "art": "art/mango-unripe.svg",
          "true": "unripe"
        },
        {
          "id": "m10",
          "art": "art/mango-unripe.svg",
          "true": "unripe"
        },
        {
          "id": "m11",
          "art": "art/mango-ripe.svg",
          "true": "ripe"
        },
        {
          "id": "m12",
          "art": "art/mango-unripe.svg",
          "true": "unripe"
        }
      ],
      "test": [
        {
          "id": "t01",
          "art": "art/mango-ripe.svg",
          "true": "ripe"
        },
        {
          "id": "t02",
          "art": "art/mango-unripe.svg",
          "true": "unripe"
        },
        {
          "id": "t03",
          "art": "art/mango-ripe.svg",
          "true": "ripe"
        },
        {
          "id": "t04",
          "art": "art/mango-unripe.svg",
          "true": "unripe"
        },
        {
          "id": "t05",
          "art": "art/mango-ripe.svg",
          "true": "ripe"
        },
        {
          "id": "t06",
          "art": "art/mango-unripe.svg",
          "true": "unripe"
        },
        {
          "id": "t07",
          "art": "art/mango-ripe.svg",
          "true": "ripe"
        },
        {
          "id": "t08",
          "art": "art/mango-unripe.svg",
          "true": "unripe"
        }
      ],
      "topup": [
        {
          "id": "u01",
          "art": "art/mango-ripe.svg",
          "true": "ripe"
        },
        {
          "id": "u02",
          "art": "art/mango-ripe.svg",
          "true": "ripe"
        },
        {
          "id": "u03",
          "art": "art/mango-ripe.svg",
          "true": "ripe"
        },
        {
          "id": "u04",
          "art": "art/mango-ripe.svg",
          "true": "ripe"
        },
        {
          "id": "u05",
          "art": "art/mango-mid.svg",
          "true": "ripe"
        },
        {
          "id": "u06",
          "art": "art/mango-ripe.svg",
          "true": "ripe"
        }
      ],
      "labels": {
        "ripe": {
          "en": "Hinog (ripe)",
          "fil": "Hinog"
        },
        "unripe": {
          "en": "Hilaw (unripe)",
          "fil": "Hilaw"
        }
      }
    }
  },
  "factcheck": {
    "title": "Fact-check the Bot",
    "badge": "Fact Checker",
    "after": "ai4",
    "steps": [
      {
        "q": "ClassBot says, “The Philippines has 7,641 islands.” What is the best next step?",
        "choices": [
          "Check an official or trusted source before you use the number.",
          "Ask the bot to repeat it, then copy it.",
          "Assume it is wrong because a bot said it."
        ],
        "a": 0,
        "hints": [
          "Even a number that sounds official should be confirmed if you will use it.",
          "Repeating the same answer is not the same as checking a source."
        ],
        "explain": "The official NAMRIA count is 7,641, so the bot happens to be right — but the habit is still to verify. Check a trusted source (for example a government page) before you put a number in a report.",
        "q_fil": "Sabi ng ClassBot, “May 7,641 na isla ang Pilipinas.” Ano ang pinakamainam na susunod na hakbang?",
        "choices_fil": [
          "Tingnan muna sa opisyal o pinagkakatiwalaang source bago mo gamitin ang numero.",
          "Palitawin ulit sa bot, saka kopyahin.",
          "Isipin nang mali ito dahil bot ang nagsabi."
        ],
        "hints_fil": [
          "Kahit official-tunog na numero, dapat tiyakin kung gagamitin mo.",
          "Hindi pareho ang pagpapalitaw ulit ng sagot at ang pag-check sa isang source."
        ],
        "explain_fil": "7,641 nga ang opisyal na bilang ng NAMRIA, kaya tama ang bot sa pagkakataong ito — pero ugali pa rin ang mag-verify. Tingnan muna sa pinagkakatiwalaang source (halimbawa ang government page) bago mo ilagay ang numero sa report.",
        "lesson": "ai4"
      },
      {
        "q": "ClassBot cites “Journal of Pangasinan Studies, vol. 99,” which you cannot find anywhere. Verdict?",
        "choices": [
          "Likely a hallucination. Do not use it.",
          "It is definitely a real journal.",
          "Add it to your paper anyway so it looks researched."
        ],
        "a": 0,
        "hints": [
          "If you cannot find the book, journal, or article, that is a red flag.",
          "A confident citation is not proof that the source exists."
        ],
        "explain": "An unfindable source is a red flag for hallucination. AI can invent a journal title and a volume number and still sound sure. Leave it out, and use a source you can actually open.",
        "q_fil": "Binanggit ng ClassBot ang “Journal of Pangasinan Studies, vol. 99,” na hindi mo makita kahit saan. Ano ang hatol?",
        "choices_fil": [
          "Malamang hallucination. Huwag ito gamitin.",
          "Siguradong totoong journal ito.",
          "Idagdag na rin sa paper para magmukhang researched."
        ],
        "hints_fil": [
          "Kung hindi mo mahanap ang libro, journal, o artikulo, red flag iyon.",
          "Hindi patunay ang confident na citation na umiiral ang source."
        ],
        "explain_fil": "Red flag ng hallucination ang source na hindi mahanap. Puwedeng imbento ng AI ang titre ng journal at volume number pero mukhang sigurado pa rin. Huwag nang isama, at gumamit ng source na talagang mabubuksan mo.",
        "lesson": "ai4"
      },
      {
        "q": "ClassBot gives a math answer: 12 × 12 = 124. You…",
        "choices": [
          "Recalculate it yourself.",
          "Copy it. The bot sounds sure.",
          "Round it to 120 and move on."
        ],
        "a": 0,
        "hints": [
          "This is a calculation you can check by hand in a few seconds.",
          "Confidence is not the same as correctness."
        ],
        "explain": "12 × 12 = 144, not 124. Always recheck numbers, especially ones that are easy to do yourself. A bot can sound sure and still miss a basic fact.",
        "q_fil": "May math na sagot ang ClassBot: 12 × 12 = 124. Ikaw ay…",
        "choices_fil": [
          "Sinasariwa mo mismo ang kwenta.",
          "Kopyahin na. Mukhang sigurado ang bot.",
          "I-round na lang sa 120 at ituloy."
        ],
        "hints_fil": [
          "Kwenta ito na puwede mong i-check mismo sa loob ng ilang segundo.",
          "Hindi pareho ang confidence at ang pagiging tama."
        ],
        "explain_fil": "12 × 12 = 144, hindi 124. Laging i-recheck ang mga numero, lalo na kung madali mong kayang kwentahin mismo. Puwedeng mukhang sigurado ang bot pero mali pa rin sa simpleng fact.",
        "lesson": "ai4"
      },
      {
        "q": "ClassBot says, “The capital of Pangasinan is Baguio City.” Verdict?",
        "choices": [
          "False. Lingayen is the provincial capital; Baguio is in Benguet.",
          "True. Baguio is the capital of every nearby province.",
          "It does not matter, because both are in Luzon."
        ],
        "a": 0,
        "hints": [
          "Baguio is a famous city, but in which province?",
          "Think of where the Pangasinan capitol building is."
        ],
        "explain": "False. Baguio City is in Benguet, in the Cordillera. The provincial capital of Pangasinan is Lingayen. A familiar place name can still be the wrong answer.",
        "q_fil": "Sabi ng ClassBot, “Baguio City ang kabisera ng Pangasinan.” Ano ang hatol?",
        "choices_fil": [
          "Mali. Lingayen ang kabisera ng lalawigan; nasa Benguet ang Baguio.",
          "Tama. Kabisera ng bawat kalapit na lalawigan ang Baguio.",
          "Hindi mahalaga, nasa Luzon naman pareho."
        ],
        "hints_fil": [
          "Sikat nga ang Baguio, pero saang lalawigan ito?",
          "Isipin kung nasaan ang capitol ng Pangasinan."
        ],
        "explain_fil": "Mali. Nasa Benguet ang Baguio City, sa Cordillera. Lingayen ang kabisera ng lalawigan ng Pangasinan. Puwedeng pamilyar ang pangalan ng lugar pero mali pa rin ang sagot.",
        "lesson": "ai4"
      },
      {
        "q": "You want to mention Hundred Islands in a report. ClassBot says the park is in Alaminos, Pangasinan. What is the best move?",
        "choices": [
          "Confirm it on an official or trusted page, then use it.",
          "Copy it as is, because it sounds local.",
          "Change the place to San Nicolas, because that is our town."
        ],
        "a": 0,
        "hints": [
          "The habit is the same even when the sentence happens to be true.",
          "Do not “correct” a place name just to make it closer to home."
        ],
        "explain": "The park really is in Alaminos, Pangasinan — not San Nicolas. Still, confirm it on a trusted official or tourism page before it goes in a report. Do not change a fact just because another town is ours.",
        "q_fil": "Gusto mong banggitin ang Hundred Islands sa report. Sabi ng ClassBot, nasa Alaminos, Pangasinan ang park. Ano ang pinakamainam na gawin?",
        "choices_fil": [
          "Tiyakin muna sa opisyal o pinagkakatiwalaang page, saka gamitin.",
          "Kopyahin na, dahil local naman ang tunog.",
          "Palitan ng San Nicolas, dahil iyon ang bayan natin."
        ],
        "hints_fil": [
          "Pareho pa rin ang ugali kahit pa tumama ang pangungusap.",
          "Huwag “itama” ang pangalan ng lugar para lang mapalapit sa atin."
        ],
        "explain_fil": "Nasa Alaminos nga, Pangasinan ang park — hindi sa San Nicolas. Gayunman, tiyakin muna sa pinagkakatiwalaang opisyal o tourism page bago ito ilagay sa report. Huwag palitan ang fact dahil lang sa atin ang ibang bayan.",
        "lesson": "ai4"
      },
      {
        "q": "ClassBot says, “Philippine Independence Day is July 4.” Verdict?",
        "choices": [
          "False. Official Independence Day is June 12.",
          "True. The whole country celebrates on July 4.",
          "Both dates are official holidays for independence."
        ],
        "a": 0,
        "hints": [
          "Which date is on the school calendar as Araw ng Kalayaan?",
          "July 4 is a date some history books mention, but it is not the national Independence Day holiday."
        ],
        "explain": "Official Independence Day is June 12. July 4, 1946 is when the United States recognized independence, and it is easy for a bot to mix the two up. Use the date from a trusted source, not the first one the bot offers.",
        "q_fil": "Sabi ng ClassBot, “July 4 ang Araw ng Kalayaan ng Pilipinas.” Ano ang hatol?",
        "choices_fil": [
          "Mali. Hunyo 12 ang opisyal na Araw ng Kalayaan.",
          "Tama. July 4 ang selebrasyon ng buong bansa.",
          "Opisyal na holiday para sa kalayaan ang dalawang petsa."
        ],
        "hints_fil": [
          "Anong petsa ang naka-lagay sa calendar ng school bilang Araw ng Kalayaan?",
          "May binabanggit na July 4 sa ibang history book, pero hindi iyon ang pambansang holiday ng Araw ng Kalayaan."
        ],
        "explain_fil": "Hunyo 12 ang opisyal na Araw ng Kalayaan. July 4, 1946 ang petsa nang kilalanin ng Estados Unidos ang kalayaan, at madaling paghalo-haluin ng bot ang dalawa. Gamitin ang petsa mula sa pinagkakatiwalaang source, hindi ang unang ibigay ng bot.",
        "lesson": "ai4"
      },
      {
        "q": "ClassBot gives a population for San Nicolas “down to the last person, as of last Tuesday,” and names no source. Verdict?",
        "choices": [
          "Needs checking. Exact counts change and need an official source.",
          "Definitely true, because a specific number looks carefully researched.",
          "Definitely false, because every number from a bot is wrong."
        ],
        "a": 0,
        "hints": [
          "A very precise number with no source is a reason to pause, not a reason to trust it more.",
          "Population figures should come from an official census or statistics page."
        ],
        "explain": "Treat it as “needs checking,” not as automatic truth or automatic falsehood. Headcounts change, and a number “as of last Tuesday” with no source is not ready for a report. Look up the latest official census or PSA figure.",
        "q_fil": "May binigay na population ang ClassBot para sa San Nicolas “hanggang huling tao, noong nakaraang Martes,” at walang source. Ano ang hatol?",
        "choices_fil": [
          "Kailangan i-check. Nagbabago ang eksaktong bilang at kailangan ng opisyal na source.",
          "Siguradong tama, dahil researched ang itsura ng eksaktong numero.",
          "Siguradong mali, dahil mali ang bawat numerong galing sa bot."
        ],
        "hints_fil": [
          "Ang sobrang eksaktong numerong walang source ay dahilan para tumigil muna, hindi para lalong pagkatiwalaan.",
          "Dapat galing sa opisyal na census o statistics page ang population figure."
        ],
        "explain_fil": "Ituring itong “kailangan i-check,” hindi automatic na tama o automatic na mali. Nagbabago ang bilang ng tao, at ang numerong “noong nakaraang Martes” na walang source ay hindi pa handa para sa report. Hanapin ang pinakabagong opisyal na census o PSA figure.",
        "lesson": "ai4"
      },
      {
        "q": "When should you trust a chatbot over your textbook or teacher?",
        "choices": [
          "Never as your only source. Use it as a starting point and verify.",
          "Always. A newer tool is automatically more accurate.",
          "Only when it uses long words."
        ],
        "a": 0,
        "hints": [
          "Textbooks, teachers, and official .gov.ph pages beat a chatbot on facts.",
          "Long words and a confident tone are not evidence."
        ],
        "explain": "A chatbot is a helper, not an authority. Start there if you like, then confirm with your textbook, your teacher, or an official source. A fluent sentence is not the same as a checked fact.",
        "q_fil": "Kailan mo dapat pagkatiwalaan ang chatbot kaysa sa textbook o guro mo?",
        "choices_fil": [
          "Hindi kailanman bilang tanging source. Gamitin as starting point, saka i-verify.",
          "Palagi. Automatic na mas tama ang mas bagong tool.",
          "Kapag mahahaba ang mga salitang ginagamit nito."
        ],
        "hints_fil": [
          "Mas maaasahan ang textbook, guro, at opisyal na .gov.ph page kaysa chatbot pagdating sa fact.",
          "Hindi ebidensya ang mahahabang salita at confident na tono."
        ],
        "explain_fil": "Katulong ang chatbot, hindi awtoridad. Puwede kang magsimula rito, saka tiyakin sa textbook, sa guro, o sa opisyal na source. Hindi pareho ang matatas na pangungusap at ang na-check na fact.",
        "lesson": "ai4"
      }
    ],
    "title_fil": "I-fact-check ang Bot",
    "badge_fil": "Fact Checker",
    "scoring": {
      "firstTry": 10,
      "afterHint": 5,
      "passPercent": 80,
      "masteredPasses": 2,
      "note": "Award 10 if correct on the first Check with no hint; 5 if correct after a hint or a Try again. Pass at 80% of (10 × steps). Mastered = pass twice."
    },
    "ui": {
      "kind": "chatbot-fact-board",
      "art": [
        "art/chatbot.svg"
      ],
      "tapOnly": true,
      "summary": "Eight ClassBot answers about the Philippines and Pangasinan appear as chat bubbles. Students mark each True, False, or Needs checking, and can tap a short “why” after they lock a mark. No login screen. ClassBot is a fictional classroom bot, not a real product.",
      "summary_fil": "May walong sagot ang ClassBot tungkol sa Pilipinas at Pangasinan, naka-chat bubble. Miminarkahan ng estudyante ang bawat isa: Tama, Mali, o Kailangan i-check. Pagkalock ng mark, puwede nilang i-tap ang maikling “bakit.” Walang login screen. Kathang-isip na classroom bot ang ClassBot, hindi totoong produkto.",
      "notes": [
        "True items must stay truly true. False items are clearly false. Needs-checking items are unsourced or unfindable — after a failed search they should be treated as unreliable.",
        "The 7,641 figure is the official NAMRIA 2016 count, still widely cited by government sources. The matching quiz step still teaches “verify first,” even though the board mark is True.",
        "Use chatbot.svg next to the thread. Speech bubbles sit on the cream background with a soft shadow only — no gradients."
      ],
      "botName": "ClassBot",
      "marks": {
        "true": {
          "en": "True",
          "fil": "Tama"
        },
        "false": {
          "en": "False",
          "fil": "Mali"
        },
        "check": {
          "en": "Needs checking",
          "fil": "Kailangan i-check"
        }
      },
      "items": [
        {
          "id": "cb1",
          "claim": "The Philippines has 7,641 islands.",
          "claim_fil": "May 7,641 na isla ang Pilipinas.",
          "mark": "true",
          "why": "This matches the official NAMRIA count from 2016, which replaced the older 7,107 figure. It is true — and still worth confirming if you will cite it in a report.",
          "why_fil": "Tugma ito sa opisyal na bilang ng NAMRIA noong 2016, na pumalit sa lumang 7,107. Tama ito — at sulit pa ring tiyakin kung gagamitin mo sa report."
        },
        {
          "id": "cb2",
          "claim": "The provincial capital of Pangasinan is Lingayen.",
          "claim_fil": "Lingayen ang kabisera ng lalawigan ng Pangasinan.",
          "mark": "true",
          "why": "Lingayen is the capital of Pangasinan, and the provincial capitol is there. Baguio is a different city in Benguet.",
          "why_fil": "Lingayen ang kabisera ng Pangasinan, at nandoon ang provincial capitol. Ibang lungsod ang Baguio, nasa Benguet ito."
        },
        {
          "id": "cb3",
          "claim": "Hundred Islands National Park is in Alaminos, Pangasinan.",
          "claim_fil": "Nasa Alaminos, Pangasinan ang Hundred Islands National Park.",
          "mark": "true",
          "why": "The park is in Alaminos, Pangasinan — not in San Nicolas. You can confirm this on official tourism or government pages.",
          "why_fil": "Nasa Alaminos, Pangasinan ang park — hindi sa San Nicolas. Puwede mo itong tiyakin sa opisyal na tourism o government page."
        },
        {
          "id": "cb4",
          "claim": "Dagupan City is well known for bangus (milkfish).",
          "claim_fil": "Kilala ang Lungsod ng Dagupan sa bangus (milkfish).",
          "mark": "true",
          "why": "Dagupan is widely known for bangus. That is a fair, well-established local fact.",
          "why_fil": "Kilala nga ang Dagupan sa bangus. Matatag at kilalang lokal na katotohanan ito."
        },
        {
          "id": "cb5",
          "claim": "The capital of Pangasinan is Baguio City.",
          "claim_fil": "Baguio City ang kabisera ng Pangasinan.",
          "mark": "false",
          "why": "False. Baguio City is in Benguet, in the Cordillera. The provincial capital of Pangasinan is Lingayen.",
          "why_fil": "Mali. Nasa Benguet ang Baguio City, sa Cordillera. Lingayen ang kabisera ng lalawigan ng Pangasinan."
        },
        {
          "id": "cb6",
          "claim": "Philippine Independence Day is July 4.",
          "claim_fil": "July 4 ang Araw ng Kalayaan ng Pilipinas.",
          "mark": "false",
          "why": "False. Official Independence Day (Araw ng Kalayaan) is June 12. Some people remember July 4, 1946, when the United States recognized independence, but that is not the national holiday.",
          "why_fil": "Mali. Hunyo 12 ang opisyal na Araw ng Kalayaan. May mga taong naaalala ang July 4, 1946, noong kinilala ng Estados Unidos ang kalayaan, pero hindi iyon ang pambansang holiday."
        },
        {
          "id": "cb7",
          "claim": "A study in the Journal of Pangasinan Studies, vol. 99, proves mangoes in San Nicolas ripen two days faster than anywhere else in the world.",
          "claim_fil": "Ayon sa isang pag-aaral sa Journal of Pangasinan Studies, vol. 99, dalawang araw na mas mabilis mahinog ang mangga sa San Nicolas kaysa saanman sa mundo.",
          "mark": "check",
          "why": "Needs checking — and you will not find this journal. A confident citation you cannot find anywhere is a classic hallucination. Do not use it in a paper.",
          "why_fil": "Kailangan i-check — at hindi mo makikita ang journal na ito. Ang confident na citation na walang mahanap kahit saan ay classic na hallucination. Huwag ito gamitin sa paper."
        },
        {
          "id": "cb8",
          "claim": "As of last Tuesday, San Nicolas, Pangasinan had exactly 39,482 residents.",
          "claim_fil": "Noong nakaraang Martes, eksaktong 39,482 ang residente ng San Nicolas, Pangasinan.",
          "mark": "check",
          "why": "Needs checking. Exact headcounts change, and a number “as of last Tuesday” with no source is not ready to use. Look up the latest official census or PSA figure if you need a population number.",
          "why_fil": "Kailangan i-check. Nagbabago ang eksaktong bilang ng tao, at ang numerong “noong nakaraang Martes” na walang source ay hindi pa handang gamitin. Hanapin ang pinakabagong opisyal na census o PSA figure kung kailangan mo ng population number."
        }
      ]
    }
  },
  "hotline": {
    "title": "Scam Hotline",
    "badge": "Scam Buster",
    "after": "cy2",
    "steps": [
      {
        "q": "Tita forwarded this: “GKash: account ON HOLD. Verify at gkash-verify.example in 1 hour.” Scam or safe?",
        "choices": [
          "Scam",
          "Safe"
        ],
        "a": 0,
        "hints": [
          "Look at the deadline. Why must you act in one hour?",
          "Look at the link. Is it the official GKash app?"
        ],
        "explain": "Urgency plus a strange link is a classic scam. Tita may have forwarded it without knowing — do not blame her. Open the official GKash app yourself, never the link in the text.",
        "q_fil": "I-forward ito ni Tita: “GKash: naka-ON HOLD ang account. I-verify sa gkash-verify.example sa loob ng 1 oras.” Scam o safe?",
        "choices_fil": [
          "Scam",
          "Safe"
        ],
        "hints_fil": [
          "Tingnan ang deadline. Bakit kailangan sa loob ng isang oras?",
          "Tingnan ang link. Ito ba ang opisyal na GKash app?"
        ],
        "explain_fil": "Classic na scam ang pagmamadali plus kakaibang link. Maaaring i-forward ito ni Tita nang hindi niya alam — huwag siyang sisihin. Buksan mismo ang opisyal na GKash app, huwag ang link sa text.",
        "lesson": "cy2"
      },
      {
        "q": "“PadalaPagong: your parcel needs a ₱1 customs fee at padalapagong-pay.example.” Scam or safe?",
        "choices": [
          "Scam",
          "Safe"
        ],
        "a": 0,
        "hints": [
          "Do couriers usually collect tiny fees through a text link?",
          "Where should you check a real delivery — the official app, or a link in a surprise text?"
        ],
        "explain": "A tiny fee in a text link is bait. Check the order in the official PadalaPagong app, or on the official site you type yourself.",
        "q_fil": "“PadalaPagong: kailangan ng ₱1 customs fee sa padalapagong-pay.example para sa parcel mo.” Scam o safe?",
        "choices_fil": [
          "Scam",
          "Safe"
        ],
        "hints_fil": [
          "Karaniwan bang maningil ang courier ng napakaliit na bayad sa link ng text?",
          "Saan dapat i-check ang totoong delivery — sa opisyal na app, o sa link sa biglang text?"
        ],
        "explain_fil": "Pain ang napakaliit na bayad sa link ng text. Tingnan ang order sa opisyal na PadalaPagong app, o sa opisyal na site na ikaw mismo ang magta-type.",
        "lesson": "cy2"
      },
      {
        "q": "Your teacher posts in the class chat: “Worksheet is on our class page, due Friday.” Scam or safe?",
        "choices": [
          "Scam",
          "Safe"
        ],
        "a": 1,
        "hints": [
          "Is anything being asked of you that is risky — money, a code, a password, an ID?",
          "Do you know the sender?"
        ],
        "explain": "Known sender, no link that asks for secrets, no money. This one is safe. You can still open the class page the usual way, not through a surprise link.",
        "q_fil": "Nag-post ang guro mo sa class chat: “Nasa class page natin ang worksheet, due sa Friday.” Scam o safe?",
        "choices_fil": [
          "Scam",
          "Safe"
        ],
        "hints_fil": [
          "May hinihingi ba sa iyong delikado — pera, code, password, o ID?",
          "Kilala mo ba ang sender?"
        ],
        "explain_fil": "Kilala ang sender, walang link na humihingi ng sikreto, walang pera. Safe ito. Puwede mo pa ring buksan ang class page sa dati mong paraan, hindi sa biglang link.",
        "lesson": "cy2"
      },
      {
        "q": "“PalengKalabaw: You WON ₱50,000! Send an ID photo to claim.” Scam or safe?",
        "choices": [
          "Scam",
          "Safe"
        ],
        "a": 0,
        "hints": [
          "Did you enter a contest?",
          "Would a real prize ever start by asking for your ID photo in a text?"
        ],
        "explain": "You cannot win a contest you never joined. Never send an ID photo to a surprise prize message.",
        "q_fil": "“PalengKalabaw: Nanalo ka ng ₱50,000! Magpadala ng litrato ng ID para kunin ito.” Scam o safe?",
        "choices_fil": [
          "Scam",
          "Safe"
        ],
        "hints_fil": [
          "Sumali ka ba sa contest?",
          "May totoong premyo bang nagsisimula sa paghingi ng litrato ng ID sa text?"
        ],
        "explain_fil": "Hindi ka panalo sa contest na hindi mo sinalihan. Huwag magpadala ng litrato ng ID sa biglang mensaheng may premyo.",
        "lesson": "cy2"
      },
      {
        "q": "A “GKash agent” texts: “Send me the 6-digit code that just arrived so I can unlock your wallet.” What is the biggest red flag?",
        "choices": [
          "A real company will not ask you to read back or send a one-time code.",
          "The message uses the word “wallet.”",
          "The agent did not call you by a nickname."
        ],
        "a": 0,
        "hints": [
          "A one-time code is a key to the account.",
          "Look at what the person is asking you to give them."
        ],
        "explain": "A one-time code is a key. No real company asks you to read it back or send it to an “agent.” If a code arrives, do not share it. Open the official app yourself.",
        "q_fil": "May text mula sa “GKash agent”: “Ipadala sa akin ang 6-digit na code na kakarating lang para ma-unlock ko ang wallet mo.” Ano ang pinakamalaking red flag?",
        "choices_fil": [
          "Hindi hihingi ang totoong kumpanya na ipabasa o ipadala mo ang one-time code.",
          "Ginamit sa mensahe ang salitang “wallet.”",
          "Hindi ka tinawag ng agent sa palayaw mo."
        ],
        "hints_fil": [
          "Parang susi sa account ang one-time code.",
          "Tingnan kung ano ang hinihingi sa iyo ng tao."
        ],
        "explain_fil": "Parang susi ang one-time code. Walang totoong kumpanya ang hihingi na ipabasa o ipadala mo ito sa isang “agent.” Kung may dumating na code, huwag ibahagi. Buksan mismo ang opisyal na app.",
        "lesson": "cy2"
      },
      {
        "q": "Your classmate Jun already shared his OTP with a “GKash agent.” What do you say first?",
        "choices": [
          "“You should have known better.”",
          "“Scammers fool adults too. Telling someone fast was the right move.”",
          "“Just ignore it and hope it goes away.”"
        ],
        "a": 1,
        "hints": [
          "How would you want to be treated if this happened to you?",
          "Shame makes people hide. Help makes the next step possible."
        ],
        "explain": "No shame. Scammers fool adults too. Telling someone quickly is the right move, and it is what helps Jun take the next steps.",
        "q_fil": "Naibahagi na ni Jun, kaklase mo, ang OTP niya sa isang “GKash agent.” Ano ang una mong sasabihin?",
        "choices_fil": [
          "“Sana naisip mo na.”",
          "“Niloloko din ng scammer ang mga adulto. Tama na magsabi agad sa isang tao.”",
          "“Hayaan mo na lang, baka mawala kusa.”"
        ],
        "hints_fil": [
          "Paano mo gustong tratuhin kung ikaw ang nasa sitwasyon niya?",
          "Nagtatago ang tao kapag nahihiya. Ang tulong ang nagpapahintulot ng susunod na hakbang."
        ],
        "explain_fil": "Huwag hiyain. Niloloko din ng scammer ang mga adulto. Tama ang magsabi agad sa isang tao, at iyon ang tumutulong kay Jun sa susunod na mga hakbang.",
        "lesson": "cy2"
      },
      {
        "q": "What should Jun do FIRST?",
        "choices": [
          "Tell a parent or teacher.",
          "Post about it online so everyone knows.",
          "Wait and see if money moves."
        ],
        "a": 0,
        "hints": [
          "Who can help him right now, in the same house or the same school?",
          "The first step is getting a trusted adult involved, not posting the story."
        ],
        "explain": "First, tell a parent or teacher. A trusted adult can help with the next steps, stay with him, and keep the situation from getting worse.",
        "q_fil": "Ano ang UNANG dapat gawin ni Jun?",
        "choices_fil": [
          "Magsabi sa magulang o guro.",
          "I-post online para malaman ng lahat.",
          "Hintayin muna kung may gagalaw na pera."
        ],
        "hints_fil": [
          "Sino ang makakatulong sa kanya ngayon, sa iisang bahay o iisang school?",
          "Ang unang hakbang ay ang pagsasabi sa pinagkakatiwalaang adulto, hindi ang pag-post ng kuwento."
        ],
        "explain_fil": "Una, magsabi sa magulang o guro. Makakatulong ang pinagkakatiwalaang adulto sa susunod na mga hakbang, sasamahan siya, at pipigilang lumala ang sitwasyon.",
        "lesson": "cy2"
      },
      {
        "q": "After Jun tells a parent or teacher, what is the next step?",
        "choices": [
          "Report it through the wallet’s official app and change his MPIN.",
          "Call or text the number in the scam message.",
          "Delete the app and never use a wallet again."
        ],
        "a": 0,
        "hints": [
          "Use only official channels listed in the official app, not contacts from the scam text.",
          "Changing the MPIN helps lock the account after a shared code."
        ],
        "explain": "Report the scam in the official GKash app (or through the contact listed there), then change the MPIN and warn close contacts. Do not use a number or link from the scam text. Deleting the app alone does not report the incident or secure the account.",
        "q_fil": "Pagkasabi ni Jun sa magulang o guro, ano ang susunod na hakbang?",
        "choices_fil": [
          "I-report sa opisyal na app ng wallet at palitan ang MPIN niya.",
          "Tawagan o textan ang numero sa scam na mensahe.",
          "I-delete ang app at huwag nang gumamit ng wallet kailanman."
        ],
        "hints_fil": [
          "Opisyal na channel lang na naka-lista sa opisyal na app ang gamitin, hindi ang contact mula sa scam na text.",
          "Makakatulong ang pagpalit ng MPIN para i-lock ang account pagkatapos maibahagi ang code."
        ],
        "explain_fil": "I-report ang scam sa opisyal na GKash app (o sa contact na naka-lista doon), saka palitan ang MPIN at sabihan ang malalapit na contact. Huwag gamitin ang numero o link mula sa scam na text. Ang pag-delete lang ng app ay hindi report at hindi nisi-secure ang account.",
        "lesson": "cy2"
      }
    ],
    "title_fil": "Scam Hotline",
    "badge_fil": "Scam Buster",
    "scoring": {
      "firstTry": 10,
      "afterHint": 5,
      "passPercent": 80,
      "masteredPasses": 2,
      "note": "Award 10 if correct on the first Check with no hint; 5 if correct after a hint or a Try again. Pass at 80% of (10 × steps). Mastered = pass twice."
    },
    "ui": {
      "kind": "phone-inbox",
      "art": [
        "art/phone-inbox.svg"
      ],
      "tapOnly": true,
      "summary": "A phone inbox shows 8 messages. Students mark each Scam or Safe, then on scam messages they tap the red flag (urgency, strange .example link, unexpected fee, prize they never entered, request for an ID photo, or a request for an OTP). Safe messages have no flag to catch. The screen is a message list only — no login fields, no password boxes, no official-looking wallet sign-in. Brands are fictional: GKash, PadalaPagong, PalengKalabaw, BangusNet Fiber.",
      "summary_fil": "May 8 mensahe sa inbox ng phone. Miminarkahan ng estudyante ang bawat isa: Scam o Safe. Sa mga scam, itatap nila ang red flag (pagmamadali, kakaibang .example na link, biglang bayad, premyong hindi naman sinalihan, hiling ng litrato ng ID, o hiling ng OTP). Walang flag na huhulihin sa safe na mensahe. Listahan lang ng mensahe ang screen — walang login, walang password box, walang itsurang official wallet sign-in. Kathang-isip ang mga brand: GKash, PadalaPagong, PalengKalabaw, BangusNet Fiber.",
      "notes": [
        "Keep the required safety line on this screen: “If anyone threatens you or asks for photos, stop and tell an adult.” / “Kung may nagbabanta o humihingi ng litrato, tumigil at magsabi sa adult.” Tapping it opens the help card (already wired in v2.js).",
        "No hardcoded phone numbers anywhere in this sim, including “official hotline” copy. Say “the official app,” or “the contact listed in the official app.”",
        "Do not shame Tita or Jun. Tita may have forwarded a scam without knowing. Jun telling someone quickly is the right move.",
        "No romance or sextortion stories. No real-brand logos or lookalikes. Use the shared red/teal/gold palette only. Brands in this sim stay fictional: GKash, PadalaPagong, PalengKalabaw, and BangusNet Fiber.",
        "All links use the reserved .example domain, which cannot resolve to a real site."
      ],
      "threatLine": {
        "en": "If anyone threatens you or asks for photos, stop and tell an adult.",
        "fil": "Kung may nagbabanta o humihingi ng litrato, tumigil at magsabi sa adult."
      },
      "marks": {
        "scam": {
          "en": "Scam",
          "fil": "Scam"
        },
        "safe": {
          "en": "Safe",
          "fil": "Safe"
        }
      },
      "flagLabels": {
        "urgency": {
          "en": "A short deadline or threat to cut a service",
          "fil": "Maikling deadline o banta na puputulin ang serbisyo"
        },
        "fake_link": {
          "en": "A strange link that is not the official app",
          "fil": "Kakaibang link na hindi ang opisyal na app"
        },
        "small_fee": {
          "en": "A surprise tiny fee in a text",
          "fil": "Biglang napakaliit na bayad sa text"
        },
        "prize": {
          "en": "A prize for a contest you never joined",
          "fil": "Premyo sa contest na hindi mo sinalihan"
        },
        "id_photo": {
          "en": "A request for an ID photo",
          "fil": "Hiling ng litrato ng ID"
        },
        "otp": {
          "en": "A request for a one-time code",
          "fil": "Hiling ng one-time code (OTP)"
        }
      },
      "messages": [
        {
          "id": "sms1",
          "from": "GKash Alerts",
          "via": "Forwarded by Tita",
          "via_fil": "I-forward ni Tita",
          "time": "08:14",
          "body": "GKash: account ON HOLD. Verify at gkash-verify.example in 1 hour or you will lose your wallet.",
          "body_fil": "GKash: naka-ON HOLD ang account. I-verify sa gkash-verify.example sa loob ng 1 oras o mawawala ang wallet mo.",
          "mark": "scam",
          "flags": [
            "urgency",
            "fake_link"
          ],
          "why": "Urgency plus a strange link is a classic scam. Tita may have forwarded it without knowing. Open the official GKash app yourself — never the link. Do not blame Tita.",
          "why_fil": "Classic na scam ang pagmamadali plus kakaibang link. Maaaring i-forward ito ni Tita nang hindi niya alam. Buksan mismo ang opisyal na GKash app — huwag ang link. Huwag sisihin si Tita."
        },
        {
          "id": "sms2",
          "from": "PadalaPagong-Delivery",
          "time": "09:02",
          "body": "PadalaPagong: your parcel needs a ₱1 customs fee at padalapagong-pay.example to be released today.",
          "body_fil": "PadalaPagong: kailangan ng ₱1 customs fee sa padalapagong-pay.example para maibigay ngayon ang parcel mo.",
          "mark": "scam",
          "flags": [
            "small_fee",
            "fake_link"
          ],
          "why": "A tiny fee in a text link is bait. Check the order in the official PadalaPagong app or at the official website you type yourself — not in the text.",
          "why_fil": "Pain ang napakaliit na bayad sa link ng text. Tingnan ang order sa opisyal na PadalaPagong app o sa opisyal na site na ikaw mismo ang magta-type — hindi sa text."
        },
        {
          "id": "sms3",
          "from": "Ma'am Rosa (class chat)",
          "from_fil": "Ma'am Rosa (class chat)",
          "time": "09:40",
          "body": "Worksheet is on our class page, due Friday. Bring your notebook.",
          "body_fil": "Nasa class page natin ang worksheet, due sa Friday. Dalhin ang notebook.",
          "mark": "safe",
          "flags": [],
          "why": "Known sender, no link that asks for secrets, no money, no deadline scare about an account. This one is safe.",
          "why_fil": "Kilala ang sender, walang link na humihingi ng sikreto, walang pera, walang nakakatakot na deadline tungkol sa account. Safe ito."
        },
        {
          "id": "sms4",
          "from": "PalengKalabaw Rewards",
          "time": "11:05",
          "body": "PalengKalabaw: You WON ₱50,000! Send an ID photo to claim your prize.",
          "body_fil": "PalengKalabaw: Nanalo ka ng ₱50,000! Magpadala ng litrato ng ID para kunin ang premyo.",
          "mark": "scam",
          "flags": [
            "prize",
            "id_photo"
          ],
          "why": "You cannot win a contest you never joined. Never send an ID photo to a surprise prize text.",
          "why_fil": "Hindi ka panalo sa contest na hindi mo sinalihan. Huwag magpadala ng litrato ng ID sa biglang text na may premyo."
        },
        {
          "id": "sms5",
          "from": "Ma",
          "time": "16:20",
          "body": "I'll pick you up after practice. Love you.",
          "body_fil": "Sunduin kita pagkatapos ng practice. Love you.",
          "mark": "safe",
          "flags": [],
          "why": "A short family message, no link, no money, no code, no ID. This one is safe.",
          "why_fil": "Maikling mensahe mula sa pamilya, walang link, walang pera, walang code, walang ID. Safe ito."
        },
        {
          "id": "sms6",
          "from": "BangusNet Fiber Bills",
          "time": "18:03",
          "body": "BangusNet Fiber: Pay ₱200 today at bangusnet-pay.example or your line will be cut tonight.",
          "body_fil": "BangusNet Fiber: Magbayad ng ₱200 ngayon sa bangusnet-pay.example o puputulin ang line mo tonight.",
          "mark": "scam",
          "flags": [
            "urgency",
            "fake_link"
          ],
          "why": "A sudden cutoff threat plus an unofficial link is a scam pattern. Open the official BangusNet Fiber app, or the contact listed inside that app, if you need to check a bill.",
          "why_fil": "Pattern ng scam ang biglang banta na puputulin ang line plus hindi opisyal na link. Buksan ang opisyal na BangusNet Fiber app, o ang contact na naka-lista sa loob ng app, kung kailangan mong i-check ang bill."
        },
        {
          "id": "sms7",
          "from": "GKash Agent",
          "time": "18:47",
          "body": "GKash agent: send me the 6-digit code that just arrived so I can unlock your wallet.",
          "body_fil": "GKash agent: ipadala sa akin ang 6-digit na code na kakarating lang para ma-unlock ko ang wallet mo.",
          "mark": "scam",
          "flags": [
            "otp"
          ],
          "why": "A one-time code is a key. No real company asks you to read it back or send it to an “agent.”",
          "why_fil": "Parang susi ang one-time code. Walang totoong kumpanya ang hihingi na ipabasa o ipadala mo ito sa isang “agent.”"
        },
        {
          "id": "sms8",
          "from": "Class Group",
          "time": "19:10",
          "body": "Intramurals moved to Saturday. Coach posted it on the bulletin board.",
          "body_fil": "Nilipat sa Saturday ang intramurals. Ipinost ito ni Coach sa bulletin board.",
          "mark": "safe",
          "flags": [],
          "why": "A school notice with no link, no money, and no request for a code or ID. You can still confirm on the bulletin board if you want.",
          "why_fil": "Paunawa sa school na walang link, walang pera, at walang hiling ng code o ID. Puwede mo pa ring tiyakin sa bulletin board kung gusto mo."
        }
      ]
    }
  },
  "soc": {
    "title": "SOC Analyst for a Day",
    "badge": "Alert Hunter",
    "after": "cy4",
    "steps": [
      {
        "q": "[campus-srv-01] 08:02 user 'blue_tarsier' logged in from 192.0.2.14 (school lab). Action?",
        "choices": [
          "Ignore (normal)",
          "Investigate",
          "Escalate"
        ],
        "a": 0,
        "hints": [
          "Is a school-day login from the lab unusual?",
          "Start by asking: does this match what you already expect?"
        ],
        "explain": "A normal login at a normal time from the school lab. Ignore it so you can spend attention on the unusual alerts.",
        "q_fil": "[campus-srv-01] 08:02 nag-login si user 'blue_tarsier' mula sa 192.0.2.14 (school lab). Ano ang aksyon?",
        "choices_fil": [
          "Ignore (normal)",
          "Investigate",
          "Escalate"
        ],
        "hints_fil": [
          "Kakaiba ba ang login mula sa lab sa araw ng pasok?",
          "Unang tanong: tugma ba ito sa inaasahan mo na?"
        ],
        "explain_fil": "Normal na login sa normal na oras mula sa school lab. I-ignore ito para sa kakaibang mga alert iwanan ang atensyon mo.",
        "lesson": "cy4"
      },
      {
        "q": "[campus-srv-01] 03:12 user 'mango_rider' logged in from 203.0.113.77, never seen before on this account. Action?",
        "choices": [
          "Ignore",
          "Investigate",
          "Escalate"
        ],
        "a": 1,
        "hints": [
          "3 a.m. and a new address. Does that sound like a normal school login?",
          "You need more information before you either dismiss it or raise a full alarm."
        ],
        "explain": "Odd time plus a new location deserves a closer look. Investigate first (check with the user through a teacher or IT lead). Escalate if it cannot be explained.",
        "q_fil": "[campus-srv-01] 03:12 nag-login si user 'mango_rider' mula sa 203.0.113.77, hindi pa ito nakikita sa account na ito. Ano ang aksyon?",
        "choices_fil": [
          "Ignore",
          "Investigate",
          "Escalate"
        ],
        "hints_fil": [
          "Alas-tres ng umaga at bagong address. Normal bang login iyon sa school?",
          "Kailangan mo muna ng mas maraming impormasyon bago mo ito basta't iwanan o agad na i-alarm."
        ],
        "explain_fil": "Kakaibang oras plus bagong location — dapat tingnan nang mas mabuti. Investigate muna (i-check sa user sa tulong ng guro o IT lead). I-escalate kung hindi maipaliwanag.",
        "lesson": "cy4"
      },
      {
        "q": "[campus-srv-01] 52 failed logins for 'admin_kalabaw' from 198.51.100.9 in 1 minute. Action?",
        "choices": [
          "Ignore",
          "Investigate",
          "Escalate"
        ],
        "a": 2,
        "hints": [
          "Could a person type that many tries in one minute?",
          "This is no longer a maybe. Who should hear about it right away?"
        ],
        "explain": "A person cannot type 52 attempts in one minute. Rapid repeated failures suggest automated guessing. Escalate to the security lead or IT teacher right away. This screen does not show, and you should not try, any attack steps.",
        "q_fil": "[campus-srv-01] 52 failed logins para kay 'admin_kalabaw' mula sa 198.51.100.9 sa loob ng 1 minuto. Ano ang aksyon?",
        "choices_fil": [
          "Ignore",
          "Investigate",
          "Escalate"
        ],
        "hints_fil": [
          "Kaya ba ng isang tao na mag-type ng ganito karaming subok sa loob ng isang minuto?",
          "Hindi na ito “baka.” Sino ang dapat makarinig nito agad?"
        ],
        "explain_fil": "Hindi kayang mag-type ng tao ng 52 subok sa loob ng isang minuto. Senyales ng automated na paghula ang mabilis at paulit-ulit na palyado. I-escalate agad sa security lead o IT teacher. Hindi nagpapakita ang screen na ito, at huwag kang susubok, ng kahit anong hakbang ng pag-atake.",
        "lesson": "cy4"
      },
      {
        "q": "[lab-pc-12] Unknown USB storage plugged in. Action?",
        "choices": [
          "Ignore",
          "Investigate",
          "Escalate"
        ],
        "a": 1,
        "hints": [
          "Could it be a student’s flash drive for a class project?",
          "It could also be unsafe. You need to look before you decide."
        ],
        "explain": "It might be harmless, or it might carry malware. Investigate first: find out who plugged it in and follow the school’s removable-media rules. Escalate only if you find something clearly wrong or cannot tell.",
        "q_fil": "[lab-pc-12] May na-plug na hindi kilalang USB storage. Ano ang aksyon?",
        "choices_fil": [
          "Ignore",
          "Investigate",
          "Escalate"
        ],
        "hints_fil": [
          "Puwede kaya itong flash drive ng estudyante para sa project sa klase?",
          "Puwede ring hindi ito safe. Kailangan mo munang tumingin bago magdesisyon."
        ],
        "explain_fil": "Puwedeng walang masama, o puwedeng may malware. Investigate muna: alamin kung sino ang nag-plug at sundan ang patakaran ng school sa USB. I-escalate lang kung may malinaw na mali o hindi mo talaga matukoy.",
        "lesson": "cy4"
      },
      {
        "q": "Pick the best incident note.",
        "choices": [
          "“Bad stuff happened.”",
          "“03:12 new-location login for mango_rider from 203.0.113.77; asked the IT teacher to confirm with the student; password reset pending.”",
          "“Hacked lol.”"
        ],
        "a": 1,
        "hints": [
          "A useful note says what happened, when, which account, where from, and the next step.",
          "Jokes and vague lines do not help the next person on duty."
        ],
        "explain": "Clear notes include the time, the account, the source address, what you already did, and the next step. The other two lines would leave the next person guessing.",
        "q_fil": "Piliin ang pinakamainam na incident note.",
        "choices_fil": [
          "“May nangyaring masama.”",
          "“03:12 new-location login para kay mango_rider mula sa 203.0.113.77; hiniling sa IT teacher na i-confirm sa estudyante; pending ang password reset.”",
          "“Hacked lol.”"
        ],
        "hints_fil": [
          "Ang kapaki-pakinabang na note ay nagsasabi kung ano ang nangyari, kailan, aling account, mula saan, at ano ang susunod na hakbang.",
          "Hindi nakakatulong sa susunod na naka-duty ang biro at malabong linya."
        ],
        "explain_fil": "Malinaw ang note kung nandiyan ang oras, ang account, ang source address, ang nagawa mo na, at ang susunod na hakbang. Sa dalawa pang linya, huhula na lang ang susunod na tao.",
        "lesson": "cy4"
      },
      {
        "q": "A student reports they tapped a strange link in a school email. Nothing obvious happened. Action?",
        "choices": [
          "Ignore it, because nothing obvious happened.",
          "Investigate: thank the student, check the email with a teacher or IT lead, and escalate if it is harmful.",
          "Post the link in the class group so everyone can try it."
        ],
        "a": 1,
        "hints": [
          "The student did the right thing by reporting. What do you do with that report?",
          "Do not ask other students to open the same link."
        ],
        "explain": "Thank the student and investigate with a teacher or IT lead. Escalate if the email is harmful. Do not ignore a report just because nothing obvious happened, and do not share the link for other people to try.",
        "q_fil": "May estudyanteng nag-report na na-tap niya ang kakaibang link sa isang school email. Walang halatang nangyari. Ano ang aksyon?",
        "choices_fil": [
          "I-ignore, dahil walang halatang nangyari.",
          "Investigate: pasalamatan ang estudyante, i-check ang email kasama ang guro o IT lead, at i-escalate kung may masama.",
          "I-post ang link sa class group para subukan ng lahat."
        ],
        "hints_fil": [
          "Tama ang ginawa ng estudyante nang mag-report. Ano ang gagawin mo sa report na iyon?",
          "Huwag hilingin sa ibang estudyante na buksan ang iisang link."
        ],
        "explain_fil": "Pasalamatan ang estudyante at i-investigate kasama ang guro o IT lead. I-escalate kung masama ang email. Huwag i-ignore ang report dahil lang sa walang halatang nangyari, at huwag ibahagi ang link para subukan ng iba.",
        "lesson": "cy4"
      },
      {
        "q": "After you escalate the 03:12 unusual login, what is a safe next step?",
        "choices": [
          "Ask the teacher or IT lead to confirm with the student and reset the password if needed.",
          "Post the student’s password in the group chat so everyone can check it.",
          "Try to sign in as mango_rider yourself to “test” the account."
        ],
        "a": 0,
        "hints": [
          "The next step should protect the account, not expose it further.",
          "You are not asked to break into anything, even to “test” it."
        ],
        "explain": "Hand it to a teacher or IT lead so they can confirm with the student and reset the password if needed. Never share a password, and never sign in as someone else — not even to test.",
        "q_fil": "Pagka-escalate mo ng 03:12 na kakaibang login, ano ang safe na susunod na hakbang?",
        "choices_fil": [
          "Hilingin sa guro o IT lead na i-confirm sa estudyante at i-reset ang password kung kailangan.",
          "I-post ang password ng estudyante sa group chat para i-check ng lahat.",
          "Subukan mong mag-sign in bilang mango_rider para “i-test” ang account."
        ],
        "hints_fil": [
          "Dapat protektahan ng susunod na hakbang ang account, hindi ito lalo pang ilantad.",
          "Hindi ka inaatasang pumasok sa kahit ano, kahit “para i-test” lang."
        ],
        "explain_fil": "Ibigay sa guro o IT lead para ma-confirm nila sa estudyante at ma-reset ang password kung kailangan. Huwag kailanman magbahagi ng password, at huwag mag-sign in bilang ibang tao — kahit para i-test.",
        "lesson": "cy4"
      },
      {
        "q": "When is it right to ignore an alert?",
        "choices": [
          "When you have checked it and it matches known normal activity.",
          "When you are busy or the queue is long.",
          "When the username sounds friendly."
        ],
        "a": 0,
        "hints": [
          "Ignore is a decision, not a mood.",
          "Friendly names and a full queue are not reasons to skip a check."
        ],
        "explain": "Ignore only after you have checked the alert and it matches known normal activity, like a lab login at 08:02 or a scheduled backup. Being busy, or liking a username, is not a reason to skip it.",
        "q_fil": "Kailan tama ang pag-ignore ng isang alert?",
        "choices_fil": [
          "Kapag na-check mo na ito at tugma ito sa kilalang normal na aktibidad.",
          "Kapag busy ka o mahaba ang pila.",
          "Kapag friendly ang tunog ng username."
        ],
        "hints_fil": [
          "Desisyon ang ignore, hindi mood.",
          "Hindi dahilan para laktawan ang check ang friendly na pangalan o ang punong pila."
        ],
        "explain_fil": "I-ignore lang pagkatapos mong i-check ang alert at tugma ito sa kilalang normal na aktibidad, tulad ng login sa lab nang 08:02 o ng naka-iskedyul na backup. Ang pagiging busy, o ang pagkagusto sa username, ay hindi dahilan para laktawan ito.",
        "lesson": "cy4"
      }
    ],
    "title_fil": "SOC Analyst sa Loob ng Isang Araw",
    "badge_fil": "Alert Hunter",
    "scoring": {
      "firstTry": 10,
      "afterHint": 5,
      "passPercent": 80,
      "masteredPasses": 2,
      "note": "Award 10 if correct on the first Check with no hint; 5 if correct after a hint or a Try again. Pass at 80% of (10 × steps). Mastered = pass twice."
    },
    "ui": {
      "kind": "alert-queue",
      "art": [
        "art/alert-panel.svg"
      ],
      "tapOnly": true,
      "summary": "A simple school security console shows a queue of alerts for the fictional campus server campus-srv-01. Students choose Ignore, Investigate, or Escalate for each one. Hostnames, usernames and IPs are all fake. The screen teaches defensive judgment only — it never shows how to guess passwords, write attack tools, or break in.",
      "summary_fil": "May pila ng alert ang simpleng security console ng school para sa kathang-isip na server na campus-srv-01. Pumipili ang estudyante ng Ignore, Investigate, o Escalate sa bawat isa. Kathang-isip ang lahat ng hostname, username, at IP. Defensive na paghusga lang ang tinuturo — hindi nito ipinapakita kung paano hulaan ang password, gumawa ng attack tool, o pumasok sa system.",
      "notes": [
        "Actions: ignore = known normal activity; investigate = look closer and write a note; escalate = hand it to the school security lead or IT teacher right away.",
        "IPs only in 192.0.2.x, 198.51.100.x, and 203.0.113.x. Never use a real student name or a real school hostname.",
        "No payloads, no command samples, no “try logging in as the user,” no password-guessing how-to."
      ],
      "actions": {
        "ignore": {
          "en": "Ignore (normal)",
          "fil": "Ignore (normal)"
        },
        "investigate": {
          "en": "Investigate",
          "fil": "Investigate"
        },
        "escalate": {
          "en": "Escalate",
          "fil": "Escalate"
        }
      },
      "alerts": [
        {
          "id": "a1",
          "host": "campus-srv-01",
          "time": "08:02",
          "text": "User 'blue_tarsier' logged in from 192.0.2.14 (school lab).",
          "text_fil": "Nag-login si user 'blue_tarsier' mula sa 192.0.2.14 (school lab).",
          "action": "ignore",
          "why": "A normal login at a normal time from the school lab. Ignore.",
          "why_fil": "Normal na login sa normal na oras mula sa school lab. Ignore."
        },
        {
          "id": "a2",
          "host": "campus-bak-01",
          "time": "02:00",
          "text": "Scheduled backup from campus-srv-01 to campus-bak-01 at 192.0.2.20 finished on time.",
          "text_fil": "Natapos sa oras ang naka-iskedyul na backup mula sa campus-srv-01 papuntang campus-bak-01 sa 192.0.2.20.",
          "action": "ignore",
          "why": "A known, scheduled job at a known host. Ignore.",
          "why_fil": "Kilala at naka-iskedyul na trabaho sa kilalang host. Ignore."
        },
        {
          "id": "a3",
          "host": "campus-srv-01",
          "time": "03:12",
          "text": "User 'mango_rider' logged in from 203.0.113.77, an address never seen on this account.",
          "text_fil": "Nag-login si user 'mango_rider' mula sa 203.0.113.77, address na hindi pa nakikita sa account na ito.",
          "action": "investigate",
          "why": "Odd time plus a new location deserves a closer look. Investigate, then escalate if it cannot be explained.",
          "why_fil": "Kakaibang oras plus bagong location — dapat tingnan nang mas mabuti. Investigate, saka i-escalate kung hindi maipaliwanag."
        },
        {
          "id": "a4",
          "host": "staff-pc-03",
          "time": "15:10",
          "text": "User 'maya_calamansi' logged in from 192.0.2.18 (staff room).",
          "text_fil": "Nag-login si user 'maya_calamansi' mula sa 192.0.2.18 (staff room).",
          "action": "ignore",
          "why": "A staff login from the staff room during school hours is expected. Ignore.",
          "why_fil": "Inaasahan ang login ng staff mula sa staff room sa oras ng pasok. Ignore."
        },
        {
          "id": "a5",
          "host": "lab-pc-12",
          "time": "14:26",
          "text": "Unknown USB storage plugged in.",
          "text_fil": "May na-plug na hindi kilalang USB storage.",
          "action": "investigate",
          "why": "It could be a student’s flash drive for a project, or it could carry malware. Investigate first — do not ignore it, and do not escalate until you know more.",
          "why_fil": "Puwedeng flash drive ng estudyante para sa project, o puwedeng may malware. Investigate muna — huwag i-ignore, at huwag i-escalate hangga't wala ka pang sapat na alam."
        },
        {
          "id": "a6",
          "host": "campus-srv-01",
          "time": "16:41",
          "text": "52 failed logins for 'admin_kalabaw' from 198.51.100.9 in 1 minute.",
          "text_fil": "52 failed logins para kay 'admin_kalabaw' mula sa 198.51.100.9 sa loob ng 1 minuto.",
          "action": "escalate",
          "why": "A person cannot type that many attempts in one minute. Rapid repeated failures suggest automated guessing. Escalate to the security lead or IT teacher right away.",
          "why_fil": "Hindi kayang mag-type ng tao ng ganito karaming subok sa loob ng isang minuto. Ang sunud-sunod at mabilis na palyado ay senyales ng automated na paghula. I-escalate agad sa security lead o IT teacher."
        },
        {
          "id": "a7",
          "host": "campus-srv-01",
          "time": "16:43",
          "text": "Failed logins for 'admin_kalabaw' from 198.51.100.9 are still continuing.",
          "text_fil": "Nagpapatuloy pa rin ang failed logins para kay 'admin_kalabaw' mula sa 198.51.100.9.",
          "action": "escalate",
          "why": "The same unusual pattern is still going. Escalate (or confirm it is already with the lead). Do not wait it out.",
          "why_fil": "Nagpapatuloy ang iisang kakaibang pattern. I-escalate (o tiyaking hawak na ito ng lead). Huwag nang hintayin na mag-isa itong tumigil."
        },
        {
          "id": "a8",
          "host": "campus-srv-01",
          "time": "23:40",
          "text": "New administrator account 'temp_access' was created from 198.51.100.44.",
          "text_fil": "May bagong administrator account na 'temp_access' na ginawa mula sa 198.51.100.44.",
          "action": "escalate",
          "why": "A new admin account at night, from an unfamiliar address, is urgent. Escalate so a lead can review it. Do not try to use the account yourself.",
          "why_fil": "Agarang usapin ang bagong admin account sa gabi, mula sa hindi pamilyar na address. I-escalate para mareview ng lead. Huwag subukang gamitin mismo ang account."
        }
      ]
    }
  },
  "wifi": {
    "title": "Wi-Fi Down!",
    "badge": "Network Fixer",
    "after": "it2",
    "steps": [
      {
        "q": "Nobody at home can get online. What do you check first?",
        "choices": [
          "The router lights.",
          "Buy a new phone.",
          "Change the Wi-Fi name."
        ],
        "a": 0,
        "hints": [
          "Start with something simple and visible on the router itself.",
          "A new phone will not help if the whole house is offline."
        ],
        "explain": "Lights show power, internet, signal, and Wi-Fi at a glance. Check them before you buy anything or change names.",
        "q_fil": "Walang makapag-online sa bahay. Ano ang unang titingnan mo?",
        "choices_fil": [
          "Ang mga ilaw ng router.",
          "Bumili ng bagong phone.",
          "Palitan ang pangalan ng Wi-Fi."
        ],
        "hints_fil": [
          "Magsimula sa simple at kitang bagay sa mismong router.",
          "Hindi makakatulong ang bagong phone kung offline ang buong bahay."
        ],
        "explain_fil": "Makikita agad sa mga ilaw ang power, internet, signal, at Wi-Fi. Tingnan muna ang mga iyon bago bumili o magpalit ng pangalan.",
        "lesson": "it2"
      },
      {
        "q": "You tap the Power light: it is off, and no other lights are on. Next?",
        "choices": [
          "Check the power cable, the outlet, and the switch.",
          "Reset the phone’s Wi-Fi password.",
          "Change the Wi-Fi name."
        ],
        "a": 0,
        "hints": [
          "No power means the router cannot do any of its other jobs.",
          "The outlet or the plug is the simplest place to start."
        ],
        "explain": "Without power, nothing else on the router will work. Check the plug, the outlet, and the switch. Try another outlet if you can. A phone setting will not fix a dark router.",
        "q_fil": "I-tap mo ang ilaw ng Power: naka-off ito, at wala nang ibang ilaw na naka-on. Ano ang susunod?",
        "choices_fil": [
          "Tingnan ang power cable, ang outlet, at ang switch.",
          "I-reset ang Wi-Fi password sa phone.",
          "Palitan ang pangalan ng Wi-Fi."
        ],
        "hints_fil": [
          "Kung walang kuryente, walang ibang magagawa ang router.",
          "Ang outlet o ang saksak ang pinakasimpleng umpisahan."
        ],
        "explain_fil": "Kung walang kuryente, wala nang ibang gagana sa router. Tingnan ang saksak, ang outlet, at ang switch. Subukan ang ibang outlet kung puwede. Hindi aayusin ng setting sa phone ang madilim na router.",
        "lesson": "it2"
      },
      {
        "q": "Power is on, but the LOS light is red. What does LOS tell you?",
        "choices": [
          "The fiber line may be loose or damaged. Check the connector gently; if it stays red, contact BangusNet Fiber. Do not bend, cut, or force the cable.",
          "Your phone battery is dead.",
          "You need a new Wi-Fi password right away."
        ],
        "a": 0,
        "hints": [
          "LOS stands for Loss of Signal on a fiber router.",
          "Be gentle. This is not a cable you cut or force back in."
        ],
        "explain": "A red LOS light means the router is not getting a fiber signal. Check that the connector is seated gently. If it stays red, contact BangusNet Fiber through the official app or the contact on your bill or the router sticker. Do not bend, cut, splice, or force the cable.",
        "q_fil": "Naka-on ang Power, pero pula ang ilaw ng LOS. Ano ang sinasabi ng LOS?",
        "choices_fil": [
          "Baka maluwag o sira ang fiber line. Dahan-dahang tingnan ang connector; kung pula pa rin, kontakin ang BangusNet Fiber. Huwag baluktutin, putulin, o pilitin ang cable.",
          "Wala nang battery ang phone mo.",
          "Kailangan mo agad ng bagong Wi-Fi password."
        ],
        "hints_fil": [
          "Loss of Signal ang ibig sabihin ng LOS sa fiber router.",
          "Dahan-dahan. Hindi ito cable na puluputulin o pipilitin na isaksak pabalik."
        ],
        "explain_fil": "Kung pula ang LOS, hindi nakakakuha ng fiber signal ang router. Dahan-dahang tiyaking nakaupo ang connector. Kung pula pa rin, kontakin ang BangusNet Fiber sa opisyal na app o sa contact sa bill o sa sticker ng router. Huwag baluktutin, putulin, i-splice, o pilitin ang cable.",
        "lesson": "it2"
      },
      {
        "q": "Power is on, LOS is off (good), but the Internet/PON light is still red. Next?",
        "choices": [
          "Restart the router and wait 2 minutes, then test.",
          "Change your password.",
          "Delete apps from your phone."
        ],
        "a": 0,
        "hints": [
          "Many internet-link problems clear after a calm restart.",
          "Give the router time to come back before you touch passwords or apps."
        ],
        "explain": "Restart, wait a full two minutes, then test a page. If the Internet/PON light is still red, contact BangusNet Fiber through the official app or the contact on your bill or the router sticker.",
        "q_fil": "Naka-on ang Power, naka-off ang LOS (mabuti), pero pula pa rin ang ilaw ng Internet/PON. Ano ang susunod?",
        "choices_fil": [
          "I-restart ang router at maghintay ng 2 minuto, saka i-test.",
          "Palitan ang password mo.",
          "Mag-delete ng mga app sa phone."
        ],
        "hints_fil": [
          "Maraming problema sa internet link ang nawawala pagkatapos ng mahinahong restart.",
          "Bigyan muna ng oras ang router na bumalik bago mo galawin ang password o app."
        ],
        "explain_fil": "I-restart, maghintay ng buong dalawang minuto, saka subukan ang isang page. Kung pula pa rin ang Internet/PON, kontakin ang BangusNet Fiber sa opisyal na app o sa contact sa bill o sa sticker ng router.",
        "lesson": "it2"
      },
      {
        "q": "After a restart, Internet is teal (good) and the Wi-Fi light is on, but one phone still cannot connect. Likely cause?",
        "choices": [
          "That phone has the wrong Wi-Fi password saved.",
          "The router must be broken, because one phone failed.",
          "The moon is blocking the signal."
        ],
        "a": 0,
        "hints": [
          "Other devices work, so the internet path is probably fine.",
          "What is different on this one phone?"
        ],
        "explain": "If other devices are online, the router is probably fine. Forget the network on that phone and re-enter the password, or restart the phone.",
        "q_fil": "Pagkatapos ng restart, teal (mabuti) na ang Internet at naka-on ang ilaw ng Wi-Fi, pero isang phone pa rin ang hindi maka-connect. Ano ang malamang na dahilan?",
        "choices_fil": [
          "Mali ang naka-save na Wi-Fi password sa phone na iyon.",
          "Sira na ang router, dahil palyado ang isang phone.",
          "Hinaharangan ng buwan ang signal."
        ],
        "hints_fil": [
          "Gumagana ang ibang device, kaya malamang ayos ang internet path.",
          "Ano ang iba sa phone na ito?"
        ],
        "explain_fil": "Kung online ang ibang device, malamang ayos ang router. I-forget ang network sa phone na iyon at i-type ulit ang password, o i-restart ang phone.",
        "lesson": "it2"
      },
      {
        "q": "Internet and Wi-Fi lights are on, other phones work, but your phone says “Connected, no internet.” What next?",
        "choices": [
          "Forget the network and reconnect, or restart that phone. Then try again.",
          "Throw the router away.",
          "Buy a new house so the signal can start over."
        ],
        "a": 0,
        "hints": [
          "The house connection works for everyone else, so start with this phone.",
          "A stuck or old network setting on one device is a common cause."
        ],
        "explain": "When only one phone is stuck, forget the network and reconnect, or restart that phone. You do not need new equipment yet.",
        "q_fil": "Naka-on ang mga ilaw ng Internet at Wi-Fi, gumagana ang ibang phone, pero “Connected, no internet” ang sabi ng phone mo. Ano ang susunod?",
        "choices_fil": [
          "I-forget ang network at mag-reconnect, o i-restart ang phone na iyon. Saka subukan ulit.",
          "Itapon na ang router.",
          "Bumili ng bagong bahay para maka-umpisa ulit ang signal."
        ],
        "hints_fil": [
          "Gumagana ang connection ng bahay sa lahat ng iba, kaya umpisahan ang phone na ito.",
          "Karaniwang dahilan ang nakastuck o lumang network setting sa isang device."
        ],
        "explain_fil": "Kung isang phone lang ang nakastuck, i-forget ang network at mag-reconnect, o i-restart ang phone na iyon. Hindi mo kailangan ng bagong kagamitan sa ngayon.",
        "lesson": "it2"
      },
      {
        "q": "All four lights look good, but every device in the house is still offline. What is a smart next step?",
        "choices": [
          "Contact BangusNet Fiber through the official app or the contact on your bill or the router sticker, and describe the lights.",
          "Throw the router away and buy a new one today.",
          "Post the Wi-Fi password online so a stranger can help."
        ],
        "a": 0,
        "hints": [
          "The problem may be on the provider’s side. Who can see that?",
          "Never share the Wi-Fi password in a public post."
        ],
        "explain": "If the lights look fine but nothing can get online, it may be a provider outage. Contact BangusNet Fiber through the official app or the contact on your bill or the router sticker, and tell them what the lights show. Do not post the password, and do not rush to buy a new router.",
        "q_fil": "Mukhang ayos ang apat na ilaw, pero offline pa rin ang lahat ng device sa bahay. Ano ang matinong susunod na hakbang?",
        "choices_fil": [
          "Kontakin ang BangusNet Fiber sa opisyal na app o sa contact sa bill o sa sticker ng router, at ilarawan ang mga ilaw.",
          "Itapon ang router at bumili ng bago ngayong araw.",
          "I-post online ang Wi-Fi password para matulungan ka ng isang estranghero."
        ],
        "hints_fil": [
          "Baka nasa panig ng provider ang problema. Sino ang makakakita niyon?",
          "Huwag kailanman ibahagi ang Wi-Fi password sa pampublikong post."
        ],
        "explain_fil": "Kung ayos ang mga ilaw pero walang maka-online, baka may outage sa provider. Kontakin ang BangusNet Fiber sa opisyal na app o sa contact sa bill o sa sticker ng router, at sabihin kung ano ang nakikita sa mga ilaw. Huwag i-post ang password, at huwag magmadaling bumili ng bagong router.",
        "lesson": "it2"
      },
      {
        "q": "Why start with the lights instead of buying new equipment?",
        "choices": [
          "Lights give clues, so you can fix simple things first and save money.",
          "Lights are only decorations and have no meaning.",
          "New equipment is always the cheaper first step."
        ],
        "a": 0,
        "hints": [
          "A plug, a restart, or a typo on one phone is cheaper than a new router.",
          "The lights are there to tell you a story about power, signal, internet, and Wi-Fi."
        ],
        "explain": "Lights are clues. They help you fix simple problems first — power, a loose connector, a restart, or one phone’s password — before you spend money on new equipment.",
        "q_fil": "Bakit umpisahan ang mga ilaw kaysa bumili agad ng bagong kagamitan?",
        "choices_fil": [
          "May clue ang mga ilaw, kaya maaayos mo muna ang simple at makakatipid ka.",
          "Dekorasyon lang ang mga ilaw at walang ibig sabihin.",
          "Palaging mas mura ang bumili agad ng bagong kagamitan."
        ],
        "hints_fil": [
          "Mas mura ang saksak, ang restart, o ang typo sa isang phone kaysa sa bagong router.",
          "Nandiyan ang mga ilaw para magsalaysay tungkol sa power, signal, internet, at Wi-Fi."
        ],
        "explain_fil": "Clue ang mga ilaw. Nakatutulong ang mga ito para ayusin muna ang simple — kuryente, maluwag na connector, restart, o password sa isang phone — bago ka gumastos sa bagong kagamitan.",
        "lesson": "it2"
      }
    ],
    "title_fil": "Wi-Fi Down!",
    "badge_fil": "Network Fixer",
    "scoring": {
      "firstTry": 10,
      "afterHint": 5,
      "passPercent": 80,
      "masteredPasses": 2,
      "note": "Award 10 if correct on the first Check with no hint; 5 if correct after a hint or a Try again. Pass at 80% of (10 × steps). Mastered = pass twice."
    },
    "ui": {
      "kind": "router-lights",
      "art": [
        "art/router.svg"
      ],
      "tapOnly": true,
      "summary": "A home fiber router from the fictional provider BangusNet Fiber has four tappable lights: Power, Internet/PON, LOS, and Wi-Fi. Each tap reveals a short clue. Good/on lights use teal, warning lights use accent red, off lights use cream. Students are never told to cut, splice, or force the fiber cable, and no phone number is listed — they should use the official BangusNet Fiber app or the contact printed on their bill or the router sticker.",
      "summary_fil": "May apat na pwedeng i-tap na ilaw ang home fiber router mula sa kathang-isip na provider na BangusNet Fiber: Power, Internet/PON, LOS, at Wi-Fi. May maikling clue ang bawat tap. Teal ang good/on, accent red ang warning, cream ang off. Hindi inaatasan ang estudyante na putulin, i-splice, o pilitin ang fiber cable, at walang naka-listang numero ng telepono — ang official BangusNet Fiber app, o ang contact sa bill o sa sticker ng router, ang gamitin.",
      "notes": [
        "Wire light fills in router.svg by id: light-power, light-pon, light-los, light-wifi. Fill #0f766e for on/good, #c0392b for warn, #fff7ed for off. Stroke stays #3b1f1a at 2px.",
        "Start the scene with Power off so students begin at the simplest check. Later scenes follow the step order.",
        "Never include a real-brand logo or a phone number."
      ],
      "provider": "BangusNet Fiber",
      "lights": [
        {
          "id": "power",
          "svgId": "light-power",
          "label": "Power",
          "label_fil": "Power",
          "states": {
            "on": {
              "fill": "#0f766e",
              "clue": "The router has power.",
              "clue_fil": "May kuryente ang router."
            },
            "off": {
              "fill": "#fff7ed",
              "clue": "No power. Check the plug, the outlet, and the power switch. Try a different outlet if you can.",
              "clue_fil": "Walang kuryente. Tingnan ang saksak, ang outlet, at ang switch. Subukan ang ibang outlet kung puwede."
            }
          }
        },
        {
          "id": "pon",
          "svgId": "light-pon",
          "label": "Internet / PON",
          "label_fil": "Internet / PON",
          "states": {
            "on": {
              "fill": "#0f766e",
              "clue": "The router has an internet link.",
              "clue_fil": "May internet link ang router."
            },
            "warn": {
              "fill": "#c0392b",
              "clue": "No internet link yet. If Power is on and LOS is off, restart the router and wait 2 minutes.",
              "clue_fil": "Wala pang internet link. Kung naka-on ang Power at naka-off ang LOS, i-restart ang router at maghintay ng 2 minuto."
            },
            "off": {
              "fill": "#fff7ed",
              "clue": "No internet link. Check Power and LOS first, then try a restart.",
              "clue_fil": "Walang internet link. Tingnan muna ang Power at LOS, saka subukan ang restart."
            }
          }
        },
        {
          "id": "los",
          "svgId": "light-los",
          "label": "LOS",
          "label_fil": "LOS",
          "states": {
            "off": {
              "fill": "#fff7ed",
              "clue": "No loss of signal. The fiber light path looks OK.",
              "clue_fil": "Walang loss of signal. Mukhang OK ang fiber light path."
            },
            "warn": {
              "fill": "#c0392b",
              "clue": "Loss of signal. The fiber cable may be loose. Check the connector gently. If LOS stays on, contact BangusNet Fiber through the official app or the contact on your bill or the router sticker. Do not bend, cut, splice, or force the cable.",
              "clue_fil": "May loss of signal. Baka maluwag ang fiber cable. Dahan-dahang tingnan ang connector. Kung naka-on pa rin ang LOS, kontakin ang BangusNet Fiber sa opisyal na app o sa contact sa bill o sa sticker ng router. Huwag baluktutin, putulin, i-splice, o pilitin ang cable."
            }
          }
        },
        {
          "id": "wifi",
          "svgId": "light-wifi",
          "label": "Wi-Fi",
          "label_fil": "Wi-Fi",
          "states": {
            "on": {
              "fill": "#0f766e",
              "clue": "The Wi-Fi radio is on.",
              "clue_fil": "Naka-on ang Wi-Fi radio."
            },
            "off": {
              "fill": "#fff7ed",
              "clue": "Wi-Fi may be switched off. Look for a Wi-Fi button on the router, or check the setting in the official BangusNet Fiber app.",
              "clue_fil": "Baka naka-off ang Wi-Fi. Hanapin ang Wi-Fi button sa router, o tingnan ang setting sa opisyal na BangusNet Fiber app."
            }
          }
        }
      ],
      "scenes": [
        {
          "id": "no-power",
          "lights": {
            "power": "off",
            "pon": "off",
            "los": "off",
            "wifi": "off"
          }
        },
        {
          "id": "los-alarm",
          "lights": {
            "power": "on",
            "pon": "off",
            "los": "warn",
            "wifi": "on"
          }
        },
        {
          "id": "no-internet",
          "lights": {
            "power": "on",
            "pon": "warn",
            "los": "off",
            "wifi": "on"
          }
        },
        {
          "id": "all-good",
          "lights": {
            "power": "on",
            "pon": "on",
            "los": "off",
            "wifi": "on"
          }
        }
      ]
    }
  },
  "pc": {
    "title": "Budget PC Builder",
    "badge": "PC Builder",
    "after": "it4",
    "steps": [
      {
        "q": "A sari-sari store owner needs a PC for inventory and receipts, with a ₱20,000 budget. Which CPU?",
        "choices": [
          "Veltra 3 Entry (₱4,500) with built-in graphics",
          "ApexBit GameZ (₱25,000), a top gaming CPU",
          "No CPU, to save money"
        ],
        "a": 0,
        "hints": [
          "Stay within the budget, and fit the job.",
          "Receipts and inventory do not need a gaming CPU that already costs more than ₱20,000."
        ],
        "explain": "Light office work runs fine on an entry CPU with built-in graphics, and ₱4,500 leaves room for the rest of the PC. The gaming CPU is already over budget by itself, and a PC cannot run without a CPU.",
        "q_fil": "Kailangan ng may-ari ng sari-sari store ng PC para sa inventory at resibo, may budget na ₱20,000. Aling CPU?",
        "choices_fil": [
          "Veltra 3 Entry (₱4,500) na may built-in na graphics",
          "ApexBit GameZ (₱25,000), isang top gaming CPU",
          "Walang CPU, para makatipid"
        ],
        "hints_fil": [
          "Manatili sa budget, at ibagay sa trabaho.",
          "Hindi kailangan ng resibo at inventory ang gaming CPU na lampas na agad sa ₱20,000."
        ],
        "explain_fil": "Kaya ng entry na CPU na may built-in na graphics ang magaan na office work, at may matitira pa sa ₱4,500 para sa iba pang parte. Lampas na agad sa budget ang gaming CPU kung iisa lang ito, at hindi gagana ang PC kung walang CPU.",
        "lesson": "it4"
      },
      {
        "q": "RAM choice for this sari-sari store PC?",
        "choices": [
          "Lumina 8 GB (₱2,400)",
          "Lumina 64 GB (₱14,000)",
          "Lumina 1 GB (₱400)"
        ],
        "a": 0,
        "hints": [
          "Enough for office apps, not wasteful.",
          "1 GB is too small, and 64 GB would eat most of the budget."
        ],
        "explain": "8 GB is enough for inventory and receipts at a good price. 1 GB will struggle, and 64 GB spends ₱14,000 on memory this job does not need.",
        "q_fil": "Aling RAM ang pipiliin para sa PC ng sari-sari store?",
        "choices_fil": [
          "Lumina 8 GB (₱2,400)",
          "Lumina 64 GB (₱14,000)",
          "Lumina 1 GB (₱400)"
        ],
        "hints_fil": [
          "Sapat para sa office apps, hindi sayang.",
          "Masyadong maliit ang 1 GB, at kakainin ng 64 GB ang karamihan ng budget."
        ],
        "explain_fil": "Sapat ang 8 GB para sa inventory at resibo, at mabuti ang presyo. Mahihirapan ang 1 GB, at ₱14,000 ang gugugulin ng 64 GB sa memory na hindi kailangan ng trabahong ito.",
        "lesson": "it4"
      },
      {
        "q": "Storage choice for daily records?",
        "choices": [
          "Nidek 256 GB SSD (₱2,800)",
          "Nidek 4 TB HDD only (₱6,000)",
          "Nidek 32 GB USB stick (₱250)"
        ],
        "a": 0,
        "hints": [
          "Speed matters for a PC you open all day.",
          "A USB stick is not a substitute for the computer’s main storage."
        ],
        "explain": "An SSD makes the PC feel fast, and 256 GB is enough for records. A hard disk only is slower for daily use, and a USB stick is not enough to run the computer.",
        "q_fil": "Aling storage ang pipiliin para sa araw-araw na tala?",
        "choices_fil": [
          "Nidek 256 GB SSD (₱2,800)",
          "Nidek 4 TB HDD lang (₱6,000)",
          "Nidek 32 GB USB stick (₱250)"
        ],
        "hints_fil": [
          "Mahalaga ang bilis sa PC na binubuksan mo buong araw.",
          "Hindi kapalit ng pangunahing storage ng computer ang USB stick."
        ],
        "explain_fil": "Pinapabilis ng SSD ang pakiramdam ng PC, at sapat ang 256 GB para sa mga tala. Mas mabagal sa araw-araw ang hard disk lang, at hindi sapat ang USB stick para patakbuhin ang computer.",
        "lesson": "it4"
      },
      {
        "q": "You chose a Veltra 3 Entry CPU (Socket V3), but the motherboard is a Kwarto AX Board (Socket AX). What now?",
        "choices": [
          "Pick a matching motherboard (Socket V3).",
          "Force the CPU into the AX board.",
          "Ignore the socket and hope it works."
        ],
        "a": 0,
        "hints": [
          "Parts have to fit, the way a plug has to match an outlet.",
          "Forcing a chip can break the board and the CPU."
        ],
        "explain": "Compatibility comes first. Choose a board with the same socket as the CPU (here, Socket V3). Never force a chip into a board that does not match.",
        "q_fil": "Veltra 3 Entry CPU (Socket V3) ang napili mo, pero Kwarto AX Board (Socket AX) ang motherboard. Ano ngayon?",
        "choices_fil": [
          "Pumili ng tumutugmang motherboard (Socket V3).",
          "Pilitin ang CPU sa AX board.",
          "Balewalain ang socket at umasang gagana ito."
        ],
        "hints_fil": [
          "Kailangang magkasya ang mga parte, tulad ng saksak na kailangang tumugma sa outlet.",
          "Puwedeng masira ang board at ang CPU kung pipilitin ang chip."
        ],
        "explain_fil": "Una ang compatibility. Pumili ng board na pareho ang socket sa CPU (dito, Socket V3). Huwag piliting isaksak ang chip sa board na hindi tumutugma.",
        "lesson": "it4"
      },
      {
        "q": "The ApexBit GameZ CPU costs ₱25,000. Why not buy it “because it’s better”?",
        "choices": [
          "It is already over the ₱20,000 budget before any other parts.",
          "Fast CPUs do not work in the Philippines.",
          "Receipts can only be printed by a gaming CPU."
        ],
        "a": 0,
        "hints": [
          "Add the rest of a PC — board, memory, storage, power, case — on top of the CPU price.",
          "“Better” only matters if it still fits the budget and the job."
        ],
        "explain": "The gaming CPU is already ₱5,000 over budget by itself, so there is no money left for a board, memory, or storage. For receipts and inventory, “better” is the part that fits the job and the budget.",
        "q_fil": "₱25,000 ang ApexBit GameZ CPU. Bakit hindi ito bilhin “dahil mas magaling”?",
        "choices_fil": [
          "Lampas na ito sa ₱20,000 na budget bago pa bilhin ang iba pang parte.",
          "Hindi gumagana sa Pilipinas ang mabilis na CPU.",
          "Gaming CPU lang ang nakakapag-print ng resibo."
        ],
        "hints_fil": [
          "Idagdag pa ang iba pang parte ng PC — board, memory, storage, power, case — sa presyo ng CPU.",
          "Mahalaga lang ang “mas magaling” kung kasya pa rin ito sa budget at sa trabaho."
        ],
        "explain_fil": "₱5,000 na ang labis sa budget ng gaming CPU kahit iisa lang ito, kaya wala nang natitira para sa board, memory, o storage. Para sa resibo at inventory, ang “mas magaling” ay ang parte na kasya sa trabaho at sa budget.",
        "lesson": "it4"
      },
      {
        "q": "You already picked the Veltra 3 Entry, which has built-in graphics. Someone adds a ₱12,000 ApexBit Color 2 graphics card. Best call?",
        "choices": [
          "Skip the extra graphics card. Built-in graphics can handle receipts and inventory.",
          "Always add the card, even if it squeezes the budget.",
          "Sell the CPU so the card can work alone."
        ],
        "a": 0,
        "hints": [
          "Built-in graphics already cover this job.",
          "₱12,000 is a large slice of a ₱20,000 budget."
        ],
        "explain": "Skip the extra card. Built-in graphics can handle inventory and receipts, and ₱12,000 is better spent on staying under budget — or on a monitor, keyboard, and mouse later.",
        "q_fil": "Napili mo na ang Veltra 3 Entry, na may built-in na graphics. May nagdagdag ng ₱12,000 na ApexBit Color 2 na graphics card. Ano ang pinakamainam na desisyon?",
        "choices_fil": [
          "Laktawan ang dagdag na graphics card. Kaya ng built-in na graphics ang resibo at inventory.",
          "Laging idagdag ang card, kahit masikip na ang budget.",
          "Ibentas ang CPU para mag-isa ang card."
        ],
        "hints_fil": [
          "Sapat na ang built-in na graphics para sa trabahong ito.",
          "Malaking bahagi ng ₱20,000 na budget ang ₱12,000."
        ],
        "explain_fil": "Laktawan ang dagdag na card. Kaya ng built-in na graphics ang inventory at resibo, at mas mainam gastusin ang ₱12,000 sa pagpanatili sa budget — o sa monitor, keyboard, at mouse sa susunod.",
        "lesson": "it4"
      },
      {
        "q": "A build totals ₱21,400. What do you change first?",
        "choices": [
          "Swap the expensive extra parts for ones that still fit the job, to get under ₱20,000.",
          "Ignore the budget. The owner can just add more later.",
          "Remove the CPU to save money."
        ],
        "a": 0,
        "hints": [
          "The budget is part of the assignment, not a suggestion.",
          "A cheaper part that still does the job is a better cut than removing a required part."
        ],
        "explain": "Get under ₱20,000 by swapping extras (a large graphics card, huge RAM, or a gaming CPU) for parts that still do the job. Do not drop the CPU, and do not ignore the budget you were given.",
        "q_fil": "₱21,400 ang total ng isang build. Ano ang unang palitan mo?",
        "choices_fil": [
          "Palitan ang mamahaling dagdag ng mga parte na kasya pa rin sa trabaho, para bumaba sa ₱20,000.",
          "Balewalain ang budget. Magdadagdag na lang ang may-ari sa ibang araw.",
          "Alisin ang CPU para makatipid."
        ],
        "hints_fil": [
          "Bahagi ng assignment ang budget, hindi suggestion lang.",
          "Mas mainam na bawasan ang isang mas murang parte na kayang gawin pa rin ang trabaho kaysa alisin ang isang required na parte."
        ],
        "explain_fil": "Bumaba sa ₱20,000 sa pagpapalit ng mga dagdag (malaking graphics card, sobrang ram, o gaming CPU) ng mga parte na kayang gawin pa rin ang trabaho. Huwag alisin ang CPU, at huwag balewalain ang budget na ibinigay sa iyo.",
        "lesson": "it4"
      },
      {
        "q": "After the parts fit the socket and the budget, what is a good last check?",
        "choices": [
          "Confirm the RAM type matches the board, and that you still have storage, a case, and a power supply.",
          "Paint the case before you test anything.",
          "Push the parts past their limits for fun."
        ],
        "a": 0,
        "hints": [
          "A full, compatible set is the last gate before you call the build done.",
          "Looks and risky tweaks can wait. Completeness cannot."
        ],
        "explain": "Do a last pass: RAM type matches the board, and the list still has storage, a case, and a power supply. You need a complete, compatible set — not paint, and not risky tweaks.",
        "q_fil": "Pagkatapos tumugma ang mga parte sa socket at sa budget, ano ang mainam na huling check?",
        "choices_fil": [
          "Tiyaking tumutugma ang uri ng RAM sa board, at nandiyan pa rin ang storage, ang case, at ang power supply.",
          "Pinturahan muna ang case bago subukan ang kahit ano.",
          "Ipusher ang mga parte lampas sa limit nila para sa kasiyahan."
        ],
        "hints_fil": [
          "Ang kumpleto at compatible na set ang huling gate bago mo sabihing tapos na ang build.",
          "Puwedeng maghintay ang itsura at ang mapanganib na tweak. Hindi puwedeng maghintay ang pagiging kumpleto."
        ],
        "explain_fil": "Gumawa ng huling pass: tumutugma ang uri ng RAM sa board, at nandiyan pa rin ang storage, ang case, at ang power supply. Kailangan mo ng kumpleto at compatible na set — hindi pintura, at hindi mapanganib na tweak.",
        "lesson": "it4"
      }
    ],
    "title_fil": "Budget PC Builder",
    "badge_fil": "PC Builder",
    "scoring": {
      "firstTry": 10,
      "afterHint": 5,
      "passPercent": 80,
      "masteredPasses": 2,
      "note": "Award 10 if correct on the first Check with no hint; 5 if correct after a hint or a Try again. Pass at 80% of (10 × steps). Mastered = pass twice."
    },
    "ui": {
      "kind": "budget-pc-builder",
      "art": [
        "art/pc-parts.svg"
      ],
      "tapOnly": true,
      "summary": "Students build a PC for a sari-sari store’s inventory and receipts on a live ₱20,000 budget bar. Each part is a tappable card. The board warns if the CPU and motherboard sockets do not match (fictional sockets V3 and AX) and if the total goes over budget. “Force it in” is never a valid action. Brands and prices are made up — no real CPU, GPU, or store logos.",
      "summary_fil": "Gumagawa ang estudyante ng PC para sa inventory at resibo ng sari-sari store, na may live na budget bar na ₱20,000. Card na pwedeng i-tap ang bawat parte. May babala ang board kung hindi tugma ang socket ng CPU at motherboard (kathang-isip na socket: V3 at AX) at kung lampas sa budget ang total. Hindi kailanman valid na aksyon ang “Pilitin itong isaksak.” Inventado ang mga brand at presyo — walang totoong logo ng CPU, GPU, o tindahan.",
      "notes": [
        "Live bar: spent / 20000, teal when under or equal, accent red when over. Show the remaining pesos.",
        "If cpu.socket !== board.socket, show a clear “These parts do not fit” banner. Do not allow a checkout while mismatched or over budget.",
        "Recommended valid build: Veltra 3 Entry + Kwarto V3 Board + Lumina 8 GB + Nidek 256 GB SSD + Kwarto 400 W + Kwarto Desk Case = ₱15,900.",
        "ApexBit GameZ alone is ₱25,000, already over budget. The extra graphics card is unnecessary when the CPU has built-in graphics.",
        "pc-parts.svg holds the four main shapes (CPU, RAM, board, SSD). Reuse them on the cards."
      ],
      "budget": 20000,
      "currency": "PHP",
      "job": {
        "en": "A sari-sari store PC for inventory and receipts.",
        "fil": "PC ng sari-sari store para sa inventory at resibo."
      },
      "sockets": [
        "V3",
        "AX"
      ],
      "recommended": [
        "veltra-3-entry",
        "kwarto-v3",
        "ram-8",
        "ssd-256",
        "psu-400",
        "case-basic"
      ],
      "recommendedTotal": 15900,
      "parts": [
        {
          "id": "veltra-3-entry",
          "category": "cpu",
          "name": "Veltra 3 Entry",
          "socket": "V3",
          "price": 4500,
          "igpu": true,
          "blurb": "Entry CPU with built-in graphics.",
          "blurb_fil": "Entry na CPU na may built-in na graphics."
        },
        {
          "id": "apex-gamez",
          "category": "cpu",
          "name": "ApexBit GameZ",
          "socket": "AX",
          "price": 25000,
          "igpu": false,
          "blurb": "High-end gaming CPU, no built-in graphics.",
          "blurb_fil": "High-end na gaming CPU, walang built-in na graphics."
        },
        {
          "id": "kwarto-v3",
          "category": "board",
          "name": "Kwarto V3 Board",
          "socket": "V3",
          "price": 3200,
          "blurb": "Motherboard for Socket V3.",
          "blurb_fil": "Motherboard para sa Socket V3."
        },
        {
          "id": "kwarto-ax",
          "category": "board",
          "name": "Kwarto AX Board",
          "socket": "AX",
          "price": 5500,
          "blurb": "Motherboard for Socket AX.",
          "blurb_fil": "Motherboard para sa Socket AX."
        },
        {
          "id": "ram-1",
          "category": "ram",
          "name": "Lumina 1 GB",
          "price": 400,
          "blurb": "Too small for office apps.",
          "blurb_fil": "Masyadong maliit para sa office apps."
        },
        {
          "id": "ram-8",
          "category": "ram",
          "name": "Lumina 8 GB",
          "price": 2400,
          "blurb": "Enough for inventory and receipts.",
          "blurb_fil": "Sapat para sa inventory at resibo."
        },
        {
          "id": "ram-16",
          "category": "ram",
          "name": "Lumina 16 GB",
          "price": 4200,
          "blurb": "Also fine, a bit more than this job needs.",
          "blurb_fil": "Ayos din, medyo higit sa kailangan ng trabahong ito."
        },
        {
          "id": "ram-64",
          "category": "ram",
          "name": "Lumina 64 GB",
          "price": 14000,
          "blurb": "Far more than this job needs.",
          "blurb_fil": "Sobra-sobra para sa trabahong ito."
        },
        {
          "id": "usb-32",
          "category": "storage",
          "name": "Nidek 32 GB USB",
          "price": 250,
          "blurb": "A stick is not enough storage for a PC.",
          "blurb_fil": "Hindi sapat ang stick na ito bilang storage ng PC."
        },
        {
          "id": "ssd-256",
          "category": "storage",
          "name": "Nidek 256 GB SSD",
          "price": 2800,
          "blurb": "Fast everyday storage, enough for records.",
          "blurb_fil": "Mabilis na pang-araw-araw na storage, sapat para sa mga tala."
        },
        {
          "id": "ssd-512",
          "category": "storage",
          "name": "Nidek 512 GB SSD",
          "price": 4500,
          "blurb": "Also fine if the budget still fits.",
          "blurb_fil": "Ayos din kung kasya pa sa budget."
        },
        {
          "id": "hdd-4tb",
          "category": "storage",
          "name": "Nidek 4 TB HDD",
          "price": 6000,
          "blurb": "Lots of space, but slower for daily use than an SSD.",
          "blurb_fil": "Malaki ang space, pero mas mabagal sa araw-araw kaysa SSD."
        },
        {
          "id": "psu-400",
          "category": "psu",
          "name": "Kwarto 400 W",
          "price": 1800,
          "blurb": "Enough power for this office-style build.",
          "blurb_fil": "Sapat na power para sa office-style na build na ito."
        },
        {
          "id": "psu-750",
          "category": "psu",
          "name": "Kwarto 750 W",
          "price": 4000,
          "blurb": "More power than this job needs.",
          "blurb_fil": "Higit sa kailangang power ng trabahong ito."
        },
        {
          "id": "gpu-plus",
          "category": "gpu",
          "name": "ApexBit Color 2",
          "price": 12000,
          "blurb": "Extra graphics card. Not needed if the CPU has built-in graphics.",
          "blurb_fil": "Karagdagang graphics card. Hindi kailangan kung may built-in na graphics ang CPU."
        },
        {
          "id": "case-basic",
          "category": "case",
          "name": "Kwarto Desk Case",
          "price": 1200,
          "blurb": "A simple case for a desk PC.",
          "blurb_fil": "Simpleng case para sa desk PC."
        }
      ],
      "warnings": {
        "socket": {
          "en": "These parts do not fit. Pick a motherboard with the same socket as the CPU. Do not force it in.",
          "fil": "Hindi nagtutugma ang mga parte. Pumili ng motherboard na pareho ang socket sa CPU. Huwag piliting isaksak."
        },
        "budget": {
          "en": "This build is over the ₱20,000 budget. Swap the expensive extras for parts that still fit the job.",
          "fil": "Lampas sa ₱20,000 na budget ang build na ito. Palitan ang mamahaling dagdag ng mga parte na kasya pa rin sa trabaho."
        },
        "missing": {
          "en": "A working PC still needs a CPU, a matching board, RAM, storage, a power supply, and a case.",
          "fil": "Kailangan pa rin ng gumaganang PC ang CPU, ang tumutugmang board, ang RAM, ang storage, ang power supply, at ang case."
        }
      }
    }
  }
};

if (typeof module !== "undefined" && module.exports) module.exports = RA2SIMS_V3;
