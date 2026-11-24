/* Unit tests for scripts/fetch-news.mjs. Run: node --test scripts/test-fetch-news.mjs
   Fixtures in scripts/fixtures are short real samples (HTML saved as .html.txt so Pages never serves them as pages) plus made-up items. */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as N from "./fetch-news.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const fx = f => readFileSync(path.join(here, "fixtures", f), "utf8");
const cfg = JSON.parse(readFileSync(path.join(here, "..", "news-sources.json"), "utf8"));
const NOW = new Date("2026-11-24T15:00:00Z");
function src(id, extra) { return Object.assign({ id, name: id, homepage: "https://" + id + ".example/", region: "US", kind: "news" }, extra); }
function run(sources, results, extraCfg = {}) { return N.buildNews(Object.assign({}, cfg, { sources, labs: {} }, extraCfg), results, null, NOW); }

test("sponsored items are dropped (BleepingComputer fixture)", () => {
  const items = N.parseFeed(fx("bleepingcomputer.xml"));
  assert.equal(items.length, 3);
  assert.ok(items.some(i => /Sponsored/.test(i.author)), "fixture has a sponsored item");
  const { news, stats } = run([src("bc", { defaultTopics: ["cyber"] })], { bc: { ok: true, items } });
  assert.equal(stats.dropped.sponsored, 1);
  assert.equal(news.items.length, 2);
  assert.ok(!news.items.some(i => /Rethinking Security/.test(i.title)));
  assert.ok(N.isSponsored({ title: "Partner content: a new laptop", author: "" }));
  assert.ok(N.isSponsored({ title: "Phones", author: "Advertorial desk" }));
  const deals = [{ title: "The Best Early Black Friday Laptop Deals", link: "https://d.example/1", published: new Date("2026-11-24T01:00:00Z"), excerpt: "", author: "", categories: [] }, { title: "Router Promo Codes: 20% Off", link: "https://d.example/2", published: new Date("2026-11-24T01:00:00Z"), excerpt: "", author: "", categories: [] }];
  assert.equal(run([src("d", { defaultTopics: ["it"] })], { d: { ok: true, items: deals } }).news.items.length, 0, "deal and promo-code posts are dropped too");
});

test("non-tech items from GMA SciTech are dropped (filterTech)", () => {
  const items = N.parseFeed(fx("gma-scitech.xml"));
  assert.equal(items.length, 15);
  const gma = cfg.sources.find(s => s.id === "gma-scitech");
  assert.equal(gma.filterTech, true);
  const { news, stats } = run([gma], { "gma-scitech": { ok: true, items } });
  const titles = news.items.map(i => i.title);
  assert.ok(titles.some(t => /deepfake/i.test(t)), "keeps the NPC deepfake story");
  assert.ok(titles.some(t => /app to track EDSA/i.test(t)), "keeps the bus-tracking app story");
  assert.ok(titles.some(t => /Java flaw/i.test(t)), "keeps the Java flaw story");
  for (const bad of [/Supermoon/, /quasar/, /orchids/, /potatoes/, /Ebola/]) assert.ok(!titles.some(t => bad.test(t)), "drops " + bad);
  assert.ok(stats.dropped.nonTech >= 8);
  assert.ok(news.items.every(i => i.topics.length > 0));
});

test("student-safety blocklist works and is editable in news-sources.json", () => {
  const items = N.parseFeed(fx("blocklist-dupes.xml"));
  const { news, stats } = run([src("t", { defaultTopics: ["it"] })], { t: { ok: true, items } });
  const titles = news.items.map(i => i.title);
  assert.ok(!titles.some(t => /casino|betting/i.test(t)));
  assert.equal(stats.dropped.blocked, 3, "casino, online betting, and the excerpt that says Gambling");
  const m = N.makeMatcher(cfg.blocklist);
  assert.ok(m("Police seize shabu in raid"));
  assert.ok(m("Teen suicide prevention"));
  assert.ok(!m("Nvidia is betting big on AI chips"), "business 'betting on' is not blocked");
  assert.ok(!m("Visible to the naked eye"));
  assert.ok(!m("A new method for teaching math"), "meth is whole-word only");
  assert.ok(m("CEO admitted to two affairs"));
  assert.ok(!m("Department of Foreign Affairs warns of text scam"), "Foreign Affairs is not blocked");
  const custom = N.makeMatcher(["robot*"]);
  assert.ok(custom("Robots take over"));
});

test("dedupe by canonical URL and by near-identical title keeps the earliest copy", () => {
  const items = N.parseFeed(fx("blocklist-dupes.xml"));
  const { news, stats } = run([src("t", { defaultTopics: ["it"] })], { t: { ok: true, items } });
  const phish = news.items.filter(i => /Phishing texts/.test(i.title));
  assert.equal(phish.length, 1);
  assert.equal(phish[0].published, "2026-11-24T03:00:00.000Z");
  assert.equal(stats.dropped.dupes, 2);
  assert.equal(N.canonicalUrl("http://www.Example.com/a/?utm_source=x#top"), "https://example.com/a");
  assert.ok(N.nearSame("Google fixes Chrome zero-day exploited in attacks", "Google fixes Chrome zero-day exploited in the attacks"));
  assert.ok(!N.nearSame("Google fixes Chrome zero-day", "Apple fixes Safari bug in iOS"));
});

test("excerpts are 200 characters or less with no HTML", () => {
  const long = "<p>" + "Scammers send fake delivery texts with links. ".repeat(20) + "<img src='https://x.example/a.png'> <a href='#'>more</a></p>";
  const e = N.makeExcerpt(long);
  assert.ok(e.length <= 200, "length " + e.length);
  assert.ok(e.endsWith("…"));
  assert.ok(!/[<>]/.test(e));
  for (const f of ["bleepingcomputer.xml", "gma-scitech.xml", "blocklist-dupes.xml"]) for (const it of N.parseFeed(fx(f))) {
    assert.ok(it.excerpt.length <= 200, f + ": " + it.excerpt.length);
    assert.ok(!/<[a-z\/!]/i.test(it.excerpt), f + " has HTML: " + it.excerpt);
    assert.ok(!/&(amp|lt|gt|quot|#\d+);/.test(it.excerpt), f + " has entities: " + it.excerpt);
  }
  assert.equal(N.makeExcerpt("&quot;Hi&quot; &amp; bye"), '"Hi" & bye');
});

test("Anthropic HTML parser extracts titles, links and dates", () => {
  const posts = N.HTML_PARSERS.anthropic(fx("anthropic-news.html.txt"));
  assert.ok(posts.length >= 3, "found " + posts.length);
  for (const p of posts) {
    assert.ok(p.title.length > 5);
    assert.match(p.link, /^https:\/\/www\.anthropic\.com\//);
    assert.ok(p.published instanceof Date && !isNaN(p.published));
  }
  const ipo = posts.find(p => /closing of initial public offering/.test(p.title));
  assert.ok(ipo, "list-row post found");
  assert.equal(ipo.link, "https://www.anthropic.com/news/ipo-close");
  assert.equal(ipo.published.toISOString().slice(0, 10), "2026-11-20");
  assert.deepEqual(N.HTML_PARSERS.anthropic("<html><body>new layout</body></html>"), []);
});

test("a broken source never fails the run: errors carry over previous items", () => {
  const prev = { items: [{ id: "x", title: "Old but recent: router patch out", link: "https://a.example/1", source: "A", sourceHome: "https://a.example/", region: "PH", topics: ["it"], published: "2026-11-22T00:00:00.000Z", excerpt: "" }], labs: [{ id: "anthropic", name: "Anthropic", home: "h", updates: [{ title: "t", link: "https://anthropic.example/1", published: "2026-11-20T00:00:00.000Z" }], mentions: 0, status: "ok" }] };
  const sources = [src("a", { name: "A", region: "PH" }), { id: "anth", name: "Anthropic News", homepage: "h", page: "p", parser: "anthropic", region: "US", kind: "lab", lab: "anthropic" }];
  const out = N.buildNews(Object.assign({}, cfg, { sources, labs: { anthropic: cfg.labs.anthropic } }), { a: { ok: false, error: "HTTP 403" }, anth: { ok: false, error: "parser found no posts" } }, prev, NOW);
  assert.equal(out.news.items.length, 1);
  assert.equal(out.news.sources[0].status, "error");
  assert.equal(out.news.labs[0].status, "error");
  assert.equal(out.news.labs[0].updates.length, 1);
});

test("enabled:false writes a paused news.json with empty lists", () => {
  const p = N.buildNews(Object.assign({}, cfg, { enabled: false }), {}, null, NOW);
  assert.deepEqual(p, { version: 1, generated: NOW.toISOString(), paused: true, items: [], labs: [], sources: [] });
});

test("balance: at most 6 per source, 60 total, at least 8 PH when available", () => {
  const items = [];
  for (let s = 0; s < 15; s++) for (let k = 0; k < 9; k++) items.push({ title: "s" + s + " k" + k, source: "S" + s, region: s < 2 ? "PH" : "US", published: new Date(NOW - (s < 2 ? 5e8 : 1e6) - k * 1000).toISOString() });
  const out = N.balance(items, { perSource: 6, total: 60, minPH: 8 });
  assert.equal(out.length, 60);
  assert.ok(out.filter(i => i.region === "PH").length >= 8);
  const per = {}; out.forEach(i => per[i.source] = (per[i.source] || 0) + 1);
  assert.ok(Object.values(per).every(n => n <= 6));
  for (let i = 1; i < out.length; i++) assert.ok(out[i - 1].published >= out[i].published, "newest first");
});

test("the other HTML parsers (xAI, Meta AI, Microsoft AI, ENISA) extract titles, links and dates", () => {
  const cases = [["xai", "xai-news.html.txt", /^https:\/\/x\.ai\/news\//, "Introducing Grok Bot 1.0", "2026-11-11"],
    ["metaai", "meta-ai-blog.html.txt", /^https:\/\/ai\.meta\.com\/blog\//, "Introducing Muse Spark 1.1", "2026-07-09"],
    ["microsoftai", "microsoft-ai-news.html.txt", /^https:\/\/microsoft\.ai\/news\//, "RL infrastructure at Microsoft AI", "2026-11-23"],
    ["enisa", "enisa-news.html.txt", /^https:\/\/www\.enisa\.europa\.eu\/news\//, "ENISA reveals the State of Cybersecurity in the Union", "2026-11-10"]];
  for (const [p, f, linkRe, title, day] of cases) {
    const posts = N.HTML_PARSERS[p](fx(f));
    assert.ok(posts.length >= 3, p + " found " + posts.length);
    for (const x of posts) { assert.match(x.link, linkRe, p); assert.ok(x.title.length > 5, p); assert.ok(x.published instanceof Date && !isNaN(x.published), p + " date"); }
    const hit = posts.find(x => x.title === title);
    assert.ok(hit, p + " has " + title);
    assert.equal(hit.published.toISOString().slice(0, 10), day, p);
    assert.deepEqual(N.HTML_PARSERS[p]("<html><body>layout changed</body></html>"), [], p + " returns [] on a changed page");
  }
});
