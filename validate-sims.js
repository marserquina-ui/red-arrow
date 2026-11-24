const fs = require("fs");
const path = require("path");
const sims = require("./sims-v3.js");
const ids = ["hinog", "factcheck", "hotline", "soc", "wifi", "pc"];
const errors = [];
const blob = JSON.stringify(sims);

for (const id of ids) {
  if (!sims[id]) errors.push("missing " + id);
}
for (const [id, sim] of Object.entries(sims)) {
  if (!ids.includes(id)) errors.push("unexpected key " + id);
  if (!sim.title || !sim.badge || !sim.after) errors.push(id + ": missing title/badge/after");
  if (!sim.ui) errors.push(id + ": missing ui");
  const n = (sim.steps || []).length;
  if (n < 6 || n > 8) errors.push(id + ": " + n + " steps, need 6-8");
  (sim.steps || []).forEach((s, i) => {
    const p = id + " step " + (i + 1);
    ["q", "q_fil", "explain", "explain_fil"].forEach((k) => {
      if (!s[k]) errors.push(p + ": missing " + k);
    });
    if (!Array.isArray(s.choices) || !Array.isArray(s.choices_fil) || s.choices.length !== s.choices_fil.length)
      errors.push(p + ": choices length mismatch");
    if (!Array.isArray(s.hints) || s.hints.length !== 2) errors.push(p + ": need 2 hints");
    if (!Array.isArray(s.hints_fil) || s.hints_fil.length !== 2) errors.push(p + ": need 2 hints_fil");
    if (!(s.a >= 0 && s.a < (s.choices || []).length)) errors.push(p + ": answer out of range");
  });
}

const forbidden = [
  /\bGCash\b/, /\bPLDT\b/, /Khan Academy/i, /khanacademy/i,
  /gcash-verify-secure/, /\.tk\b/, /gcash\.com/i, /pldt\.com/i,
  /\bShopee\b/, /\bLBC\b/,
  /\bShoppee\b/, /\bLBX\b/,
  /\bPLDN\b/,
];
for (const re of forbidden) {
  if (re.test(blob)) errors.push("forbidden pattern: " + re);
}

// phone numbers (not times like 08:14)
if (/\b0\d{9,10}\b/.test(blob) || /\+63\d{8,}/.test(blob) || /\(\d{2}\)\s*\d{3,}/.test(blob))
  errors.push("possible phone number in content");

const ipRe = /\b(\d{1,3}(?:\.\d{1,3}){3})\b/g;
let m;
while ((m = ipRe.exec(blob))) {
  const ip = m[1];
  if (
    !ip.startsWith("192.0.2.") &&
    !ip.startsWith("198.51.100.") &&
    !ip.startsWith("203.0.113.")
  ) {
    errors.push("non-documentation IP: " + ip);
  }
}

if (!/If anyone threatens you or asks for photos, stop and tell an adult/.test(blob))
  errors.push("missing required threat line");
if (!/Kung may nagbabanta o humihingi ng litrato, tumigil at magsabi sa adult/.test(blob))
  errors.push("missing required threat line (fil)");

const mustExample = ["gkash-verify.example", "padalapagong-pay.example", "bangusnet-pay.example"];
for (const d of mustExample) if (!blob.includes(d)) errors.push("missing expected domain " + d);

// factcheck marks
const items = sims.factcheck.ui.items;
const marks = Object.fromEntries(items.map((x) => [x.id, x.mark]));
const expect = { cb1: "true", cb2: "true", cb3: "true", cb4: "true", cb5: "false", cb6: "false", cb7: "check", cb8: "check" };
for (const [k, v] of Object.entries(expect)) {
  if (marks[k] !== v) errors.push("factcheck mark " + k + " is " + marks[k] + ", expected " + v);
}

if (sims.hotline.steps[6].a !== 0) errors.push("hotline first-response step should be tell a parent or teacher (index 0)");
if (sims.hotline.ui.messages.length !== 8) errors.push("hotline ui should have 8 messages");
if (sims.hinog.ui.training.length !== 12) errors.push("hinog training should have 12 cards");
if (sims.wifi.ui.lights.length !== 4) errors.push("wifi should have 4 lights");

if (errors.length) {
  console.error("FAIL");
  errors.forEach((e) => console.error(" - " + e));
  process.exit(1);
}
const counts = Object.fromEntries(ids.map((id) => [id, sims[id].steps.length]));
console.log("OK", counts);
