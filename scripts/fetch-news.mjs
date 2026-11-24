#!/usr/bin/env node
/* Red Arrow Hub daily news fetcher (Node 20, no dependencies).
   Reads news-sources.json, fetches each source once, filters and writes news.json.
   Run: node scripts/fetch-news.mjs   (a source that fails never fails the run) */
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";

export const UA = "RedArrowHubNewsBot/1.0 (+https://github.com/marserquina-ui/red-arrow)";
const DAY = 86400000;

/* ---------- text helpers ---------- */
const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", mdash: "—", ndash: "–", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", laquo: "«", raquo: "»", middot: "·", bull: "•", copy: "©", reg: "®", trade: "™", eacute: "é", ntilde: "ñ", Ntilde: "Ñ", uuml: "ü", ouml: "ö", auml: "ä", aacute: "á", iacute: "í", oacute: "ó", uacute: "ú", euro: "€", pound: "£", deg: "°", times: "×", shy: "" };
export function decodeEntities(s) {
  return String(s || "").replace(/&(#x[0-9a-f]+|#\d+|[a-z]+\d*);/gi, (m, e) => {
    if (e[0] === "#") { const n = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); try { return Number.isFinite(n) && n > 0 ? String.fromCodePoint(n) : ""; } catch { return ""; } }
    return Object.prototype.hasOwnProperty.call(NAMED, e) ? NAMED[e] : m;
  });
}
function unCdata(s) { return String(s || "").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1"); }
export function stripHtml(s) {
  let t = unCdata(s);
  // Feeds often double-encode HTML: decode once if it still looks escaped.
  if (/&lt;\/?[a-z]/i.test(t)) t = decodeEntities(t);
  t = t.replace(/<(script|style|figure|figcaption|iframe|noscript|svg)[\s\S]*?<\/\1>/gi, " ")
       .replace(/<img[^>]*>/gi, " ").replace(/<br\s*\/?>/gi, " ").replace(/<\/(p|div|li|h\d)>/gi, " ")
       .replace(/<[^>]+>/g, " ");
  t = decodeEntities(t);
  return t.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
}
export function cleanTitle(s) { return stripHtml(s).replace(/\s+/g, " ").trim(); }
export function makeExcerpt(s, max = 200) {
  let t = stripHtml(s)
    .replace(/The post .{0,300}? appeared first on .{0,120}?\.?$/i, "")
    .replace(/\b(Continue reading|Read more|Read More)\b.{0,40}$/i, "")
    .replace(/\[(…|\.\.\.|&hellip;)\]$/, "").trim();
  if (t.length <= max) return t;
  let cut = t.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  if (sp > max * 0.5) cut = cut.slice(0, sp);
  return cut.replace(/[\s,;:.\-–—(]+$/, "") + "…";
}

/* ---------- dates ---------- */
const MONTHS = "january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec";
export function parseDate(s, offset) {
  if (!s) return null;
  let t = String(s).trim();
  if (offset) t = t.replace(/\s*(\+0000|GMT|UTC|Z)$/i, "").replace(/\s*[+-]\d{2}:?\d{2}$/, "") + " " + offset.replace(":", "");
  let d = Date.parse(t);
  if (isNaN(d)) { // "Nov 9, 2026" / "10 November 2026" style
    const m = t.match(new RegExp("(" + MONTHS + ")\\.?\\s+(\\d{1,2}),?\\s+(\\d{4})", "i")) || t.match(new RegExp("(\\d{1,2})\\s+(" + MONTHS + ")\\.?,?\\s+(\\d{4})", "i"));
    if (m) d = Date.parse(isNaN(+m[1]) ? `${m[1]} ${m[2]}, ${m[3]} 12:00 UTC` : `${m[2]} ${m[1]}, ${m[3]} 12:00 UTC`);
  }
  if (isNaN(d)) return null;
  const y = new Date(d).getUTCFullYear();
  if (y < 2000 || y > 2100) return null;
  return new Date(d);
}
function textDate(s) { // date written as text, e.g. "Nov 9, 2026" or "July 09, 2026", read as noon UTC
  const m = String(s).match(new RegExp("\\b(" + MONTHS + ")\\.?\\s+(\\d{1,2}),\\s+(\\d{4})\\b", "i")) || String(s).match(new RegExp("\\b(\\d{1,2})\\s+(" + MONTHS + ")\\.?\\s+(\\d{4})\\b", "i"));
  if (!m) return null;
  const d = isNaN(+m[1]) ? Date.parse(`${m[1]} ${m[2]}, ${m[3]} 12:00 UTC`) : Date.parse(`${m[2]} ${m[1]}, ${m[3]} 12:00 UTC`);
  return isNaN(d) ? null : new Date(d);
}

/* ---------- RSS / Atom ---------- */
function tagText(block, names) {
  for (const n of names) {
    const re = new RegExp("<" + n.replace(":", "\\:") + "(?:\\s[^>]*)?>([\\s\\S]*?)</" + n.replace(":", "\\:") + ">", "i");
    const m = block.match(re);
    if (m && m[1].trim()) return unCdata(m[1]).trim();
  }
  return "";
}
function attr(tag, name) { const m = tag.match(new RegExp("\\s" + name + "\\s*=\\s*(\"([^\"]*)\"|'([^']*)')", "i")); return m ? decodeEntities(m[2] ?? m[3]) : ""; }
export function parseFeed(xml, opts = {}) {
  const out = [];
  const src = String(xml || "");
  const blocks = src.match(/<item[\s>][\s\S]*?<\/item>/gi) || src.match(/<entry[\s>][\s\S]*?<\/entry>/gi) || [];
  for (const b of blocks) {
    const title = cleanTitle(tagText(b, ["title"]));
    let link = "";
    const lm = b.match(/<link(?:\s[^>]*)?>([^<]+)<\/link>/i);
    if (lm && /^https?:/i.test(unCdata(lm[1]).trim())) link = decodeEntities(unCdata(lm[1]).trim());
    if (!link) {
      const tags = b.match(/<link\b[^>]*\/?>/gi) || [];
      const alt = tags.find(t => !/rel=/i.test(t) || /rel=["']alternate["']/i.test(t)) || tags[0];
      if (alt) link = attr(alt, "href");
    }
    if (!link) { const g = tagText(b, ["guid", "id"]); if (/^https?:\/\//.test(g)) link = decodeEntities(g); }
    if (link && opts.base) { try { link = new URL(link, opts.base).href; } catch {} }
    const published = parseDate(tagText(b, ["pubDate", "published", "dc:date", "updated", "a10:updated"]), opts.offset);
    const desc = tagText(b, ["description", "summary", "content:encoded", "content"]);
    const author = stripHtml(tagText(b, ["dc:creator", "author", "name"]));
    const categories = (b.match(/<category[^>]*>([\s\S]*?)<\/category>/gi) || []).map(c => stripHtml(c.replace(/<\/?category[^>]*>/gi, ""))).concat((b.match(/<category\b[^>]*term="([^"]*)"/gi) || []).map(c => attr(c, "term")));
    if (title && link) out.push({ title, link, published, excerpt: makeExcerpt(desc), author, categories });
  }
  return out;
}

/* ---------- HTML list pages (one small parser per site) ---------- */
function cleanHtml(html) { return String(html || "").replace(/<(script|style|svg|noscript)[\s\S]*?<\/\1>/gi, " "); }
function firstHeading(s) { const m = s.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/i); return m ? cleanTitle(m[1]) : ""; }
function timeIn(s) {
  const dt = s.match(/<time\b[^>]*\bdate[tT]ime\s*=\s*"([^"]+)"/i);
  if (dt) { const d = parseDate(dt[1]); if (d) return d; }
  const tt = s.match(/<time\b[^>]*>([\s\S]*?)<\/time>/i);
  if (tt) { const d = textDate(stripHtml(tt[1])); if (d) return d; }
  return textDate(stripHtml(s));
}
function uniqPosts(posts, base) {
  const seen = new Set(), out = [];
  for (const p of posts) {
    if (!p.title || !p.link) continue;
    let link; try { link = new URL(decodeEntities(p.link), base).href; } catch { continue; }
    if (seen.has(link)) continue;
    seen.add(link); out.push({ title: p.title, link, published: p.published || null, excerpt: p.excerpt || "", author: "", categories: [] });
  }
  return out;
}
export const HTML_PARSERS = {
  /* anthropic.com/news: each <article> has a <time> and a link with an h2/h3 headline. */
  anthropic(html, base = "https://www.anthropic.com/news") {
    const s = cleanHtml(html), posts = [];
    for (const a of s.split(/<article\b/i).slice(1)) {
      const body = a.split(/<\/article>/i)[0];
      const date = timeIn(body);
      const links = [...body.matchAll(/<a\b[^>]*href="([^"#]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
      for (const m of links) {
        const title = firstHeading(m[2]);
        if (title) { posts.push({ title, link: m[1], published: date, excerpt: makeExcerpt((m[2].match(/<p[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || "") }); break; }
      }
    }
    // The full list is a table of <li> rows: a link with an <h3> title, then a <time>.
    for (const li of s.split(/<li\b/i).slice(1)) {
      if (!/<time/i.test(li)) continue;
      const m = li.match(/<a\b[^>]*href="([^"#]+)"[^>]*>((?:(?!<\/a>)[\s\S])*?<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>[\s\S]*?)<\/a>/i);
      if (m) posts.push({ title: firstHeading(m[2]), link: m[1], published: timeIn(li) });
    }
    // Some layouts list posts as <a href="/news/..."> rows with <time> inside, outside <article>.
    for (const m of s.matchAll(/<a\b[^>]*href="(\/news\/[a-z0-9][^"#]*)"[^>]*>([\s\S]*?)<\/a>/gi)) {
      const inner = m[2]; if (!/<time/i.test(inner)) continue;
      const title = firstHeading(inner) || cleanTitle((inner.match(/<span[^>]*class="[^"]*title[^"]*"[^>]*>([\s\S]*?)<\/span>/i) || [])[1] || "");
      if (title) posts.push({ title, link: m[1], published: timeIn(inner) });
    }
    return uniqPosts(posts, base);
  },
  /* x.ai/news: cards are <a href="/news/slug"> with a <time dateTime> (or a "Nov 11, 2026" line) and an h1/h3 title. */
  xai(html, base = "https://x.ai/news") {
    const s = cleanHtml(html), posts = [];
    for (const m of s.matchAll(/<a\b[^>]*href="(\/news\/[a-z0-9][^"#]*)"[^>]*>([\s\S]*?)<\/a>/gi)) {
      const title = firstHeading(m[2]); if (!title) continue;
      posts.push({ title, link: m[1], published: timeIn(m[2]) });
    }
    return uniqPosts(posts, base);
  },
  /* ai.meta.com/blog: title is the text of a blog link; the date ("July 27, 2026") follows in the same card. */
  metaai(html, base = "https://ai.meta.com/blog/") {
    const s = cleanHtml(html), posts = [];
    const re = /<a\b[^>]*href="(https:\/\/ai\.meta\.com\/blog\/[a-z0-9][^"#]*)"[^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    while ((m = re.exec(s))) {
      const title = cleanTitle(m[2]); if (!title || title.length < 8 || /^(read|featured|learn more|see all)/i.test(title)) continue;
      const after = s.slice(re.lastIndex, re.lastIndex + 1500);
      const next = after.search(/<a\b[^>]*href="https:\/\/ai\.meta\.com\/blog\/[a-z0-9]/i);
      posts.push({ title, link: m[1], published: textDate(stripHtml(next > 0 ? after.slice(0, next) : after)) });
    }
    return uniqPosts(posts, base);
  },
  /* microsoft.ai/news: <article> cards with an h2 link and <time datetime>. */
  microsoftai(html, base = "https://microsoft.ai/news/") {
    const s = cleanHtml(html), posts = [];
    for (const a of s.split(/<article\b/i).slice(1)) {
      const body = a.split(/<\/article>/i)[0];
      const m = body.match(/<a\b[^>]*href="([^"#]*\/news\/[a-z0-9][^"#]*)"[^>]*>([\s\S]*?)<\/a>/i);
      const title = m && firstHeading(m[2]);
      if (title) posts.push({ title, link: m[1], published: timeIn(body) });
    }
    return uniqPosts(posts, base);
  },
  /* enisa.europa.eu/news: <h3><a href="/news/..."> title, then <time datetime>, then a short summary. */
  enisa(html, base = "https://www.enisa.europa.eu/news") {
    const s = cleanHtml(html), posts = [];
    const re = /<h3[^>]*>\s*<a\b[^>]*href="(\/news\/[a-z0-9][^"#]*)"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>/gi;
    let m;
    while ((m = re.exec(s))) {
      const after = s.slice(re.lastIndex, re.lastIndex + 2000).split(/<h3/i)[0];
      const ex = (after.match(/<div[^>]*>\s*<p>([\s\S]*?)<\/(p|div)>/i) || [])[1] || "";
      posts.push({ title: cleanTitle(m[2]), link: m[1], published: timeIn(after), excerpt: makeExcerpt(ex) });
    }
    return uniqPosts(posts, base);
  }
};

/* ---------- filters ---------- */
function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
export function makeMatcher(words) {
  const sens = [], insens = [];
  for (const w0 of words || []) {
    const w = String(w0).trim(); if (!w) continue;
    const star = w.endsWith("*"); const core = escRe(star ? w.slice(0, -1) : w).replace(/\\ /g, "\\s+").replace(/ /g, "\\s+");
    const piece = core + (star ? "[\\p{L}\\p{N}-]*" : "");
    (/[A-Z]/.test(w) ? sens : insens).push(piece);
  }
  const wrap = (a, f) => a.length ? new RegExp("(?:^|[^\\p{L}\\p{N}])(?:" + a.join("|") + ")(?![\\p{L}\\p{N}])", f) : null;
  const a = wrap(sens, "u"), b = wrap(insens, "iu");
  return text => { const t = String(text || ""); return !!((a && a.test(t)) || (b && b.test(t))); };
}
export function isSponsored(item, markers = ["Sponsored", "Partner content", "Advertorial", "Promoted"]) {
  const hay = [item.title, item.author].concat(item.categories || []).join(" \n ").toLowerCase();
  return markers.some(m => hay.includes(m.toLowerCase()));
}
export function tagTopics(text, kw) {
  const out = [];
  for (const t of ["ai", "cyber", "it"]) if (kw[t] && kw[t](text)) out.push(t);
  return out;
}
export function canonicalUrl(u) {
  try {
    const x = new URL(u);
    x.protocol = "https:"; x.hostname = x.hostname.toLowerCase().replace(/^www\./, ""); x.hash = "";
    for (const k of [...x.searchParams.keys()]) if (/^(utm_|fbclid|gclid|cmpid|ocid|ref$|source$|rss$|mc_)/i.test(k)) x.searchParams.delete(k);
    x.search = x.searchParams.toString() ? "?" + x.searchParams.toString() : "";
    return x.href.replace(/\/+$/, "");
  } catch { return String(u || ""); }
}
const STOP = new Set("a an the to of in on for and or is are was be with by at as from its it this that how why what new says say after over".split(" "));
export function titleTokens(t) { return [...new Set(String(t).toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[’'`]/g, "").split(/[^a-z0-9]+/).filter(w => w && !STOP.has(w)))]; }
export function nearSame(a, b) {
  const A = titleTokens(a), B = titleTokens(b);
  if (A.length < 3 || B.length < 3) return A.join(" ") === B.join(" ") && A.length > 0;
  const setB = new Set(B); let n = 0; for (const w of A) if (setB.has(w)) n++;
  return n / Math.max(A.length, B.length) >= 0.8;
}
/* Keep the earliest-published copy; on a tie, the source listed first in news-sources.json. */
export function dedupe(items) {
  const sorted = items.slice().sort((x, y) => (x.published || "").localeCompare(y.published || "") || (x._rank ?? 0) - (y._rank ?? 0));
  const kept = [], urls = new Set();
  for (const it of sorted) {
    const cu = canonicalUrl(it.link);
    if (urls.has(cu)) continue;
    if (kept.some(k => nearSame(k.title, it.title))) continue;
    urls.add(cu); kept.push(it);
  }
  return kept;
}
export function balance(items, { perSource = 6, total = 60, minPH = 8 } = {}) {
  const newest = items.slice().sort((a, b) => (b.published || "").localeCompare(a.published || ""));
  const per = {}, capped = [];
  for (const it of newest) { per[it.source] = (per[it.source] || 0) + 1; if (per[it.source] <= perSource) capped.push(it); }
  const ph = capped.filter(i => i.region === "PH").slice(0, minPH);
  const chosen = new Set(ph);
  for (const it of capped) { if (chosen.size >= total) break; chosen.add(it); }
  return capped.filter(i => chosen.has(i));
}
function idFor(link) { return createHash("sha1").update(canonicalUrl(link)).digest("hex").slice(0, 12); }

/* ---------- build news.json from fetch results (pure, testable) ---------- */
export function buildNews(cfg, results, prev, now = new Date()) {
  const generated = now.toISOString();
  if (cfg.enabled === false) return { version: 1, generated, paused: true, items: [], labs: [], sources: [] };
  const L = Object.assign({ days: 7, perSource: 6, total: 60, minPH: 8, labUpdates: 5 }, cfg.limits || {});
  const since = now.getTime() - L.days * DAY;
  const kwRaw = cfg.topicKeywords || {};
  const kw = { ai: makeMatcher(kwRaw.ai), cyber: makeMatcher(kwRaw.cyber), it: makeMatcher(kwRaw.it) };
  const blocked = makeMatcher(cfg.blocklist || []);
  const markers = cfg.sponsoredMarkers;
  const shopping = makeMatcher(cfg.shoppingTitles || []);
  const prevItems = (prev && prev.items) || [], prevLabs = (prev && prev.labs) || [];
  const stats = { dropped: { old: 0, sponsored: 0, blocked: 0, nonTech: 0, undated: 0, dupes: 0 }, perSource: {} };
  let pool = [];
  const srcOut = [];
  cfg.sources.forEach((s, rank) => {
    if (s.kind !== "news") return;
    const r = results[s.id] || { ok: false, error: "not fetched" };
    let got = [];
    if (r.ok) {
      for (const it of r.items) {
        if (!it.published) { stats.dropped.undated++; continue; }
        let t = it.published.getTime(); if (t > now.getTime()) t = now.getTime();
        if (t < since) { stats.dropped.old++; continue; }
        if (isSponsored(it, markers) || shopping(it.title)) { stats.dropped.sponsored++; continue; }
        const text = it.title + " \n " + it.excerpt;
        if (blocked(text)) { stats.dropped.blocked++; continue; }
        let topics = tagTopics(text, kw);
        if (!topics.length) { if (s.filterTech) { stats.dropped.nonTech++; continue; } topics = (s.defaultTopics || []).slice(); }
        got.push({ id: idFor(it.link), title: it.title, link: it.link, source: s.name, sourceHome: s.homepage, region: s.region, topics, published: new Date(t).toISOString(), excerpt: it.excerpt, _rank: rank, _sid: s.id });
      }
    } else {
      got = prevItems.filter(i => i.source === s.name && Date.parse(i.published) >= since).map(i => Object.assign({}, i, { _rank: rank, _sid: s.id, _carried: true }));
    }
    stats.perSource[s.id] = { status: r.ok ? "ok" : "error", fetched: r.ok ? r.items.length : 0, kept: got.length, error: r.ok ? "" : r.error, carried: r.ok ? 0 : got.length };
    pool = pool.concat(got);
    srcOut.push({ id: s.id, name: s.name, home: s.homepage, region: s.region, status: r.ok ? "ok" : "error", count: 0 });
  });
  const deduped = dedupe(pool);
  stats.dropped.dupes = pool.length - deduped.length;
  const items = balance(deduped, L);
  for (const so of srcOut) so.count = items.filter(i => i._sid === so.id).length;
  // Labs
  const labs = [];
  for (const [lid, meta] of Object.entries(cfg.labs || {})) {
    const srcs = cfg.sources.filter(s => s.kind === "lab" && s.lab === lid);
    if (!srcs.length) continue;
    const okSrcs = srcs.filter(s => results[s.id] && results[s.id].ok);
    let ups = [];
    for (const s of okSrcs) for (const p of results[s.id].items) if (p.published && !isSponsored(p, markers)) ups.push({ title: p.title, link: p.link, published: new Date(Math.min(p.published.getTime(), now.getTime())).toISOString() });
    const status = okSrcs.length ? "ok" : "error";
    if (!okSrcs.length) { const old = prevLabs.find(l => l.id === lid); ups = old ? old.updates.slice() : []; }
    else if (okSrcs.length < srcs.length) { const old = prevLabs.find(l => l.id === lid); if (old) ups = ups.concat(old.updates); }
    const seen = new Set();
    ups = ups.sort((a, b) => b.published.localeCompare(a.published)).filter(u => { const c = canonicalUrl(u.link); if (seen.has(c)) return false; seen.add(c); return true; }).slice(0, L.labUpdates);
    const m = makeMatcher(meta.match || [meta.name]);
    const mentions = deduped.filter(i => m(i.title + " \n " + i.excerpt)).length;
    labs.push({ id: lid, name: meta.name, home: meta.home, updates: ups, mentions, status });
    for (const s of srcs) stats.perSource[s.id] = { status: results[s.id] && results[s.id].ok ? "ok" : "error", fetched: results[s.id] && results[s.id].ok ? results[s.id].items.length : 0, kept: 0, error: results[s.id] && !results[s.id].ok ? results[s.id].error : "" };
  }
  const clean = items.map(({ _rank, _sid, _carried, ...rest }) => rest);
  return { news: { version: 1, generated, paused: false, items: clean, labs, sources: srcOut }, stats };
}

/* ---------- fetching ---------- */
export async function fetchText(url, { timeoutMs = 15000, html = false } = {}) {
  const c = new AbortController(); const t = setTimeout(() => c.abort(), timeoutMs);
  try {
    const accept = html ? "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5" : "application/rss+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.9, */*;q=0.5";
    const r = await fetch(url, { headers: { "User-Agent": UA, "Accept": accept, "Accept-Language": "en" }, redirect: "follow", signal: c.signal });
    if (!r.ok) throw new Error("HTTP " + r.status + (r.headers.get("cf-mitigated") ? " (Cloudflare challenge)" : ""));
    const body = await r.text();
    if (body.length > 5_000_000) throw new Error("response too large");
    return body;
  } catch (e) { throw new Error(e.name === "AbortError" ? "timed out after 15 s" : (e.message || String(e))); }
  finally { clearTimeout(t); }
}
export async function fetchSource(s) {
  try {
    const body = await fetchText(s.feed || s.page, { html: !s.feed });
    let items;
    if (s.feed) items = parseFeed(body, { offset: s.feedOffset, base: s.homepage });
    else { const p = HTML_PARSERS[s.parser]; if (!p) throw new Error("no parser named " + s.parser); items = p(body, s.page); }
    if (!items.length) throw new Error(s.feed ? "feed had no items" : "parser found no posts (page layout may have changed)");
    return { ok: true, items };
  } catch (e) { return { ok: false, error: e.message || String(e) }; }
}

async function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const cfg = JSON.parse(await readFile(path.join(root, "news-sources.json"), "utf8"));
  let prev = null; try { prev = JSON.parse(await readFile(path.join(root, "news.json"), "utf8")); } catch {}
  const outFile = path.join(root, "news.json");
  if (cfg.enabled === false) {
    const paused = buildNews(cfg, {}, prev);
    await writeFile(outFile, JSON.stringify(paused) + "\n");
    console.log("News is paused (enabled:false). Wrote news.json with paused:true.");
    return;
  }
  const results = {};
  // Each source is fetched once; a few at a time so the run stays polite and short.
  const queue = cfg.sources.slice();
  await Promise.all(Array.from({ length: 6 }, async () => { while (queue.length) { const s = queue.shift(); results[s.id] = await fetchSource(s); } }));
  const { news, stats } = buildNews(cfg, results, prev);
  const json = JSON.stringify(news);
  if (Buffer.byteLength(json) > 80 * 1024) console.warn("WARNING: news.json is over 80 KB");
  await writeFile(outFile, json + "\n");
  // Report
  const by = (k) => news.items.reduce((o, i) => { for (const v of [].concat(i[k])) o[v] = (o[v] || 0) + 1; return o; }, {});
  console.log("Generated " + news.generated + " · " + news.items.length + " items · " + (Buffer.byteLength(json) / 1024).toFixed(1) + " KB");
  console.log("\nPer source (fetched → kept after filters → in news.json):");
  for (const s of cfg.sources) {
    const st = stats.perSource[s.id] || {}; const inJson = s.kind === "news" ? (news.sources.find(x => x.id === s.id) || {}).count : "-";
    console.log(`  ${st.status === "ok" ? "ok   " : "ERROR"} ${s.kind.padEnd(4)} ${s.id.padEnd(18)} ${String(st.fetched).padStart(4)} → ${String(st.kept).padStart(3)} → ${String(inJson).padStart(3)}${st.error ? "   [" + st.error + "]" + (st.carried ? " carried over " + st.carried : "") : ""}`);
  }
  console.log("\nPer region:", JSON.stringify(by("region")));
  console.log("Per topic: ", JSON.stringify(by("topics")));
  console.log("Dropped:   ", JSON.stringify(stats.dropped));
  console.log("\nLabs:");
  for (const l of news.labs) console.log(`  ${l.status === "ok" ? "ok   " : "ERROR"} ${l.name.padEnd(28)} updates=${l.updates.length} latest=${l.updates[0] ? l.updates[0].published.slice(0, 10) + " " + l.updates[0].title.slice(0, 60) : "-"} mentions=${l.mentions}`);
  const failed = cfg.sources.filter(s => stats.perSource[s.id] && stats.perSource[s.id].status !== "ok");
  console.log("\nFailed sources: " + (failed.length ? failed.map(s => s.id + " (" + stats.perSource[s.id].error + ")").join("; ") : "none"));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(e => { console.error("fetch-news: unexpected error, keeping the old news.json:", e); process.exitCode = 0; });
}
