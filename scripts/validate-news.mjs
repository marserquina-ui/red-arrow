#!/usr/bin/env node
/* Checks news.json against the schema the News page expects, and that it is under 80 KB.
   Run: node scripts/validate-news.mjs [path/to/news.json]   (exit code 1 on any problem) */
import { readFileSync } from "node:fs";
const file = process.argv[2] || new URL("../news.json", import.meta.url).pathname;
const raw = readFileSync(file);
const errs = [];
const kb = raw.length / 1024;
if (raw.length > 80 * 1024) errs.push(`news.json is ${kb.toFixed(1)} KB (limit 80 KB)`);
let j; try { j = JSON.parse(raw); } catch (e) { console.error("Not valid JSON: " + e.message); process.exit(1); }
const isStr = v => typeof v === "string" && v.length > 0;
const isIso = v => isStr(v) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(v) && !isNaN(Date.parse(v));
const isUrl = v => isStr(v) && /^https:\/\//.test(v);
const REG = ["PH", "Asia", "US", "Europe", "Global"], TOP = ["ai", "cyber", "it"];
function keys(o, want, where) { const k = Object.keys(o).sort().join(","), w = want.slice().sort().join(","); if (k !== w) errs.push(`${where}: keys are [${k}], expected [${w}]`); }
keys(j, ["version", "generated", "paused", "items", "labs", "sources"], "top level");
if (j.version !== 1) errs.push("version must be 1");
if (!isIso(j.generated)) errs.push("generated must be an ISO UTC time");
if (typeof j.paused !== "boolean") errs.push("paused must be true or false");
for (const k of ["items", "labs", "sources"]) if (!Array.isArray(j[k])) errs.push(k + " must be a list");
if (j.paused && (j.items.length || j.labs.length || j.sources.length)) errs.push("paused news.json must have empty lists");
(j.items || []).forEach((it, i) => {
  const w = `items[${i}]`;
  keys(it, ["id", "title", "link", "source", "sourceHome", "region", "topics", "published", "excerpt"], w);
  if (!isStr(it.id) || !isStr(it.title) || !isStr(it.source)) errs.push(w + ": id, title and source must be text");
  if (!isUrl(it.link) || !isUrl(it.sourceHome)) errs.push(w + ": link and sourceHome must be https URLs");
  if (!REG.includes(it.region)) errs.push(w + ": bad region " + it.region);
  if (!Array.isArray(it.topics) || !it.topics.every(t => TOP.includes(t))) errs.push(w + ": bad topics");
  if (!isIso(it.published)) errs.push(w + ": published must be an ISO UTC time");
  if (typeof it.excerpt !== "string" || it.excerpt.length > 200 || /<[a-z\/!]/i.test(it.excerpt)) errs.push(w + ": excerpt must be plain text, 200 characters or less");
});
(j.labs || []).forEach((l, i) => {
  const w = `labs[${i}]`;
  keys(l, ["id", "name", "home", "updates", "mentions", "status"], w);
  if (!isUrl(l.home)) errs.push(w + ": home must be an https URL");
  if (!["ok", "error"].includes(l.status)) errs.push(w + ": bad status");
  if (!Number.isInteger(l.mentions) || l.mentions < 0) errs.push(w + ": mentions must be a whole number");
  if (!Array.isArray(l.updates) || l.updates.length > 5) errs.push(w + ": updates must be a list of at most 5");
  (l.updates || []).forEach((u, k) => { keys(u, ["title", "link", "published"], `${w}.updates[${k}]`); if (!isStr(u.title) || !isUrl(u.link) || !isIso(u.published)) errs.push(`${w}.updates[${k}]: bad title/link/published`); });
});
(j.sources || []).forEach((s, i) => {
  const w = `sources[${i}]`;
  keys(s, ["id", "name", "home", "region", "status", "count"], w);
  if (!isUrl(s.home) || !REG.includes(s.region) || !["ok", "error"].includes(s.status) || !Number.isInteger(s.count)) errs.push(w + ": bad home/region/status/count");
});
const per = {}; (j.items || []).forEach(i => per[i.source] = (per[i.source] || 0) + 1);
if (Object.values(per).some(n => n > 6)) errs.push("more than 6 items from one source");
if ((j.items || []).length > 60) errs.push("more than 60 items");
if (errs.length) { console.error("news.json FAILED validation:\n - " + errs.join("\n - ")); process.exit(1); }
console.log(`news.json OK: ${kb.toFixed(1)} KB, ${j.items.length} items, ${j.labs.length} labs, ${j.sources.length} sources, paused=${j.paused}`);
