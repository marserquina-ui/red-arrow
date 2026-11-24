/* Offline cache for the Red Arrow static site (GitHub Pages at /red-arrow/). */
const CACHE = "red-arrow-hub-v22";
const ASSETS = [
"./",
"./art/alert-panel.svg",
"./art/art-index.js",
"./art/badges/fact-checker.svg",
"./art/badges/locked.svg",
"./art/badges/mango-sorter.svg",
"./art/badges/pc-builder.svg",
"./art/badges/scam-buster.svg",
"./art/badges/soc-analyst.svg",
"./art/badges/wifi-fixer.svg",
"./art/captions.js",
"./art/captions.json",
"./art/chatbot.svg",
"./art/courses/ai.svg",
"./art/courses/cyber.svg",
"./art/courses/it.svg",
"./art/diagrams/ai-adv-bias-1.svg",
"./art/diagrams/ai-adv-bias-2.svg",
"./art/diagrams/ai-adv-honest-use-1.svg",
"./art/diagrams/ai-adv-honest-use-4.svg",
"./art/diagrams/ai1-1.svg",
"./art/diagrams/ai1-3.svg",
"./art/diagrams/ai2-1.svg",
"./art/diagrams/ai2-3.svg",
"./art/diagrams/ai3-1.svg",
"./art/diagrams/ai3-2.svg",
"./art/diagrams/ai4-1.svg",
"./art/diagrams/ai4-3.svg",
"./art/diagrams/cy1-1.svg",
"./art/diagrams/cy1-2.svg",
"./art/diagrams/cy2-1.svg",
"./art/diagrams/cy2-2.svg",
"./art/diagrams/cy3-1.svg",
"./art/diagrams/cy3-2.svg",
"./art/diagrams/cy4-1.svg",
"./art/diagrams/cy4-2.svg",
"./art/diagrams/cyber-adv-attacks-2.svg",
"./art/diagrams/cyber-adv-attacks-5.svg",
"./art/diagrams/cyber-adv-careers-1.svg",
"./art/diagrams/cyber-adv-careers-4.svg",
"./art/diagrams/it-adv-coding-logic-2.svg",
"./art/diagrams/it-adv-coding-logic-3.svg",
"./art/diagrams/it-adv-home-network-1.svg",
"./art/diagrams/it-adv-home-network-4.svg",
"./art/diagrams/it1-1.svg",
"./art/diagrams/it1-3.svg",
"./art/diagrams/it2-1.svg",
"./art/diagrams/it2-2.svg",
"./art/diagrams/it3-1.svg",
"./art/diagrams/it3-3.svg",
"./art/diagrams/it4-2.svg",
"./art/diagrams/it4-3.svg",
"./art/icons/ask-mar.svg",
"./art/icons/careers.svg",
"./art/icons/shield.svg",
"./art/icons/phone.svg",
"./art/icons/message.svg",
"./art/icons/close.svg",
"./art/icons/alert.svg",
"./art/icons/back.svg",
"./art/icons/badge.svg",
"./art/icons/check.svg",
"./art/icons/download.svg",
"./art/icons/help.svg",
"./art/icons/hint.svg",
"./art/icons/language.svg",
"./art/icons/learn.svg",
"./art/icons/lesson.svg",
"./art/icons/lock.svg",
"./art/icons/me.svg",
"./art/icons/next.svg",
"./art/icons/projector.svg",
"./art/icons/quiz.svg",
"./art/icons/simulation.svg",
"./art/icons/streak.svg",
"./art/icons/teacher.svg",
"./art/icons/unit-test.svg",
"./art/mango-mid.svg",
"./art/mango-ripe.svg",
"./art/mango-unripe.svg",
"./art/mar-avatar.svg",
"./art/pc-parts.svg",
"./art/phone-inbox.svg",
"./art/router.svg",
"./ask.html",
"./askmar/askmar-safety.js",
"./askmar/faq-fil.js",
"./assets/favicon.png",
"./assets/hero-arrow.svg",
"./assets/icon-256.png",
"./assets/logo.svg",
"./css/styles.css",
"./data.js",
"./index.html",
"./lesson.html",
"./manifest.webmanifest",
"./offline.html",
"./practice.html",
"./profile.html",
"./sim-ui.js",
"./sim.html",
"./sims-v3.js",
"./sw.js",
"./teacher.html",
"./about.html",
"./careers.html",
"./careers.js",
"./v2.css",
"./v2.js"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ASSETS);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (cached) {
      var net = fetch(req).then(function (res) {
        if (res && res.ok && res.type === "basic") {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () {
        return cached || caches.match("./offline.html");
      });
      return cached || net;
    })
  );
});
