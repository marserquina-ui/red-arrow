/* Offline cache for the Red Arrow static site (GitHub Pages at /red-arrow/). */
const CACHE = "red-arrow-hub-v31";
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
"./art/icons/home.svg",
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
"./art/home-map.jpg",
"./art/mango-mid.svg",
"./art/mango-ripe.svg",
"./art/mango-unripe.svg",
"./art/mar-avatar.svg",
"./art/pc-parts.svg",
"./art/phone-inbox.svg",
"./art/router.svg",
"./ask.html",
"./careers.html",
"./news.html",
"./news-page.js",
"./art/icons/news.svg",
"./careers.js",
"./careers-interview.js",
"./art/icons/careers.svg",
"./catalog.js",
"./deep.js",
"./askmar/askmar-safety.js",
"./askmar/faq-fil.js",
"./assets/hero-arrow.svg",
"./assets/seal-32.png",
"./assets/seal-72.png",
"./assets/apple-touch-icon.png",
"./assets/seal-192.png",
"./assets/seal-512.png",
"./assets/seal-maskable-512.png",
"./css/styles.css",
"./data.js",
"./home.js",
"./index.html",
"./learn.css",
"./learn.js",
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
"./v2.css",
"./v2.js"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      /* v29: cache:"reload" skips the browser HTTP cache (GitHub Pages sends max-age=600),
         so a new version never precaches stale copies of the old files. */
      return cache.addAll(ASSETS.map(function (u) { return new Request(u, { cache: "reload" }); }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      var old = keys.filter(function (k) { return k !== CACHE; });
      /* v29: keep lessons a student already opened (deep/*.js, cached on first view) and the last news.json working offline
         after an update. They are refreshed in the background on the next online view. */
      return caches.open(CACHE).then(function (cur) {
        return Promise.all(old.map(function (k) {
          return caches.open(k).then(function (c) {
            return c.keys().then(function (reqs) {
              return Promise.all(reqs.filter(function (r) { return r.url.indexOf("/deep/") >= 0 || /\/news\.json$/.test(r.url); }).map(function (r) {
                return cur.match(r).then(function (have) { return have || c.match(r).then(function (res) { return res && cur.put(r, res); }); });
              }));
            });
          });
        }));
      }).then(function () { return Promise.all(old.map(function (k) { return caches.delete(k); })); });
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  /* news.json only: network first (today's news when online), cached copy when offline.
     The offline copy is marked with x-ra-offline so the News page can say so. Never precached. */
  if (new URL(req.url).pathname.endsWith("/news.json")) {
    event.respondWith(
      fetch(req, { cache: "no-store" }).then(function (res) {
        if (res && res.ok && res.type === "basic") {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put("./news.json", copy); });
        }
        return res;
      }).catch(function () {
        return caches.match("./news.json").then(function (c) {
          if (!c) return new Response("null", { status: 503, headers: { "Content-Type": "application/json", "x-ra-offline": "1" } });
          var hd = new Headers(c.headers); hd.set("x-ra-offline", "1");
          return c.blob().then(function (b) { return new Response(b, { status: 200, headers: hd }); });
        });
      })
    );
    return;
  }
  /* v29: page loads (HTML) are network first, revalidating past the HTTP cache, so an update
     shows on the next online load. Offline: the cached page (any ?id=), then offline.html. */
  if (req.mode === "navigate") {
    var key = new URL(req.url); key.search = ""; key.hash = ""; key = key.href;
    var fromCache = function () {
      return caches.match(key).then(function (c) {
        return c || caches.match(req, { ignoreSearch: true }).then(function (c2) { return c2 || caches.match("./offline.html"); });
      });
    };
    var net = fetch(req.url, { cache: "no-cache", credentials: "same-origin" }).then(function (res) {
      if (res && res.ok && res.type === "basic") {
        var copy = res.clone();
        caches.open(CACHE).then(function (cache) { cache.put(key, copy); });
      }
      return res;
    });
    /* Weak signal: if the network takes over 6 s, show the cached page (the fresh copy still lands in the cache). */
    event.respondWith(new Promise(function (resolve) {
      var done = false;
      var t = setTimeout(function () { fromCache().then(function (c) { if (!done && c) { done = true; resolve(c); } }); }, 6000);
      net.then(function (res) { clearTimeout(t); if (!done) { done = true; resolve(res); } })
        .catch(function () { clearTimeout(t); fromCache().then(function (c) { if (!done) { done = true; resolve(c || Response.error()); } }); });
    }));
    return;
  }
  /* Other files: cache first, refreshed in the background past the HTTP cache (cache:"no-cache"
     revalidates with the server, usually a small 304). */
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (cached) {
      var net = fetch(req, { cache: "no-cache" }).then(function (res) {
        if (res && res.ok && res.type === "basic") {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () {
        /* Offline and not cached: a real network error, so scripts fail cleanly (no HTML in place of JS). */
        return cached || Response.error();
      });
      return cached || net;
    })
  );
});
