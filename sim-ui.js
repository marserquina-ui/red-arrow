/* Interactive sim boards. Tap only (no drag). Uses RA2.sims[id].ui and art/ SVGs.
   Deps passed in: { h, T, fil, teacherCard } */
(function (root) {
  var CAP = root.RA2SimCaptions || {};
  var FILL = { on: "#0f766e", warn: "#c0392b", off: "#fff7ed" };
  var STATE_L = { on: ["On", "Naka-on"], off: ["Off", "Naka-off"], warn: ["Warning", "Babala"] };

  function cap(file) {
    var name = String(file || "").split("/").pop();
    return CAP[name] || {};
  }
  function artSrc(file) {
    var name = String(file || "").split("/").pop();
    return "art/" + name;
  }
  function img(file, cls) {
    var c = cap(file);
    return api.h("img", { class: cls || "sim-art", src: artSrc(file), alt: api.T(c.alt_en || c.label_en || "", c.alt_fil || c.label_fil || "") });
  }
  function L(obj) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return api.T(obj.en || obj.label || "", obj.fil || obj.label_fil || "");
  }
  function stateWord(st) { return api.T.apply(null, STATE_L[st] || [st, st]); }

  var api = { h: function () {}, T: function (a) { return a; }, fil: false, teacherCard: function () {} };

  function mango(root, ui) {
    var labels = {}, stage = "train", selected = null, wrap = api.h("div", { class: "sim-board mango-board" });
    root.appendChild(wrap);
    function labelOf(id) { return labels[id]; }
    function binAria(kind) { return api.T("Label as ", "I-label na ") + L(ui.labels[kind]); }
    function render() {
      wrap.innerHTML = "";
      var stg = (ui.stages || []).filter(function (s) { return s.id === (stage === "retest" ? "fix" : stage); })[0] || ui.stages[0];
      wrap.appendChild(api.h("p", { class: "kicker", text: api.T(stg.title, stg.title_fil) }));
      wrap.appendChild(api.h("p", { text: api.T(stg.instruction, stg.instruction_fil) }));
      var cards = stage === "train" ? ui.training : stage === "test" ? ui.test : ui.training.concat(ui.topup || []);
      if (stage === "fix") cards = ui.topup;
      var grid = api.h("div", { class: "mango-grid", role: "list" });
      cards.forEach(function (c) {
        var lab = labelOf(c.id);
        var name = lab ? L(ui.labels[lab]) : api.T("not labelled yet", "wala pang label");
        var b = api.h("button", {
          type: "button",
          class: "mango-card" + (selected === c.id ? " is-sel" : "") + (lab ? " is-lab" : ""),
          role: "listitem",
          "aria-pressed": selected === c.id ? "true" : "false",
          "aria-label": api.T("Mango", "Mangga") + " " + c.id + ", " + name,
          onclick: function () { selected = c.id; render(); }
        });
        b.appendChild(img(c.art, "mango-img"));
        b.appendChild(api.h("span", { class: "mango-lab", text: lab ? L(ui.labels[lab]) : "—" }));
        grid.appendChild(b);
      });
      wrap.appendChild(grid);
      var bins = api.h("div", { class: "mango-bins", role: "group", "aria-label": api.T("Bins", "Mga lagayan") });
      ["ripe", "unripe"].forEach(function (kind) {
        bins.appendChild(api.h("button", {
          type: "button",
          class: "btn btn-outline bin-btn",
          text: L(ui.labels[kind]),
          "aria-label": binAria(kind),
          onclick: function () {
            if (!selected) return;
            labels[selected] = kind;
            selected = null;
            render();
          }
        }));
      });
      wrap.appendChild(bins);
      if (!selected) wrap.appendChild(api.h("p", { class: "muted", text: api.T("Tap a mango, then tap a bin to label it.", "I-tap ang isang mangga, saka i-tap ang lagayan para i-label.") }));

      function allLabelled(list) { return list.every(function (c) { return !!labels[c.id]; }); }
      if (stage === "train" && allLabelled(ui.training)) {
        wrap.appendChild(api.h("button", { type: "button", class: "btn btn-solid", text: api.T("Run test", "Patakbuhin ang test"), onclick: function () { stage = "test"; render(); } }));
      }
      if (stage === "test") {
        wrap.appendChild(api.h("button", { type: "button", class: "btn btn-solid", text: api.T("Run test", "Patakbuhin ang test"), onclick: function () { showTest(false); } }));
      }
      if (stage === "fix" && allLabelled(ui.topup || [])) {
        wrap.appendChild(api.h("button", { type: "button", class: "btn btn-solid", text: api.T("Test again", "I-test ulit"), onclick: function () { showTest(true); } }));
      }
    }
    function majority() {
      var ripe = 0, unripe = 0;
      (ui.training || []).concat(stage === "fix" || arguments[0] ? (ui.topup || []) : []).forEach(function (c) {
        if (labels[c.id] === "ripe") ripe++; else if (labels[c.id] === "unripe") unripe++;
      });
      /* Planted set is 9 hilaw / 3 hinog until the ripe top-up is included. */
      if (!(stage === "fix" || arguments[0])) { ripe = ripe || 3; unripe = unripe || 9; }
      return { ripe: ripe, unripe: unripe };
    }
    function showTest(afterFix) {
      var maj = majority(afterFix);
      var leanUnripe = maj.unripe > maj.ripe;
      var ok = 0;
      var list = api.h("ul", { class: "test-out" });
      (ui.test || []).forEach(function (c) {
        var pred = leanUnripe ? "unripe" : c.true;
        var hit = pred === c.true;
        if (hit) ok++;
        list.appendChild(api.h("li", { text: c.id + ": " + api.T("true", "tama") + " " + L(ui.labels[c.true]) + " · " + api.T("sorter", "sorter") + " " + L(ui.labels[pred]) + (hit ? " ✓" : " ✗") }));
      });
      var res = api.h("div", { class: "fb-soft" });
      res.appendChild(api.h("p", { text: api.T("Correct", "Tama") + ": " + ok + " / " + ui.test.length }));
      if (!afterFix && ui.callout_bias) res.appendChild(api.h("p", { text: L(ui.callout_bias) }));
      wrap.appendChild(res);
      wrap.appendChild(list);
      if (!afterFix) {
        wrap.appendChild(api.h("button", { type: "button", class: "btn btn-solid", text: api.T("Add ripe mangoes and fix the bias", "Dagdagan ng hinog at ayusin ang bias"), onclick: function () { stage = "fix"; render(); } }));
      }
    }
    render();
    return {};
  }

  function lights(root, ui) {
    var sceneI = 0, wrap = api.h("div", { class: "sim-board light-board" });
    root.appendChild(wrap);
    function render() {
      wrap.innerHTML = "";
      var scene = ui.scenes[sceneI] || ui.scenes[0];
      wrap.appendChild(api.h("p", { class: "kicker", text: (ui.provider || "") + " · " + api.T("Router lights", "Mga ilaw ng router") }));
      var fig = api.h("div", { class: "router-fig" });
      var routerImg = img((ui.art && ui.art[0]) || "art/router.svg", "sim-art router-img");
      fig.appendChild(routerImg);
      wrap.appendChild(fig);
      /* Recolor cloned SVG lights after load if possible; also always show labelled rows. */
      routerImg.addEventListener("load", function () {
        /* External img cannot be restyled by id; rows carry the labelled state. */
      });
      var list = api.h("div", { class: "light-rows", role: "list" });
      (ui.lights || []).forEach(function (lt) {
        var st = (scene.lights || {})[lt.id] || "off";
        var meta = (lt.states && lt.states[st]) || {};
        var row = api.h("button", {
          type: "button",
          class: "light-row",
          role: "listitem",
          "aria-label": (lt.label) + ", " + stateWord(st) + ". " + api.T(meta.clue || "", meta.clue_fil || ""),
          onclick: function () {
            var clue = wrap.querySelector(".light-clue");
            if (clue) clue.remove();
            wrap.appendChild(api.h("p", { class: "light-clue hint", text: api.T(lt.label, lt.label_fil) + " — " + stateWord(st) + ": " + api.T(meta.clue || "", meta.clue_fil || "") }));
          }
        });
        row.appendChild(api.h("span", { class: "light-dot st-" + st, style: "background:" + (meta.fill || FILL[st] || FILL.off), "aria-hidden": "true" }));
        row.appendChild(api.h("span", { class: "light-text", html: "<strong>" + (api.T(lt.label, lt.label_fil)) + "</strong> · " + stateWord(st) }));
        list.appendChild(row);
      });
      wrap.appendChild(list);
      var nav = api.h("div", { class: "scene-nav" });
      ui.scenes.forEach(function (sc, i) {
        nav.appendChild(api.h("button", {
          type: "button",
          class: "btn btn-outline" + (i === sceneI ? " is-on" : ""),
          text: api.T(sc.title || sc.id.replace(/-/g, " "), sc.title_fil),
          "aria-pressed": i === sceneI ? "true" : "false",
          onclick: function () { sceneI = i; render(); }
        }));
      });
      wrap.appendChild(nav);
    }
    render();
    return {
      setStep: function (i) {
        /* Map early steps to no-power, mid to los/no-internet, later to all-good. */
        var n = ui.scenes.length;
        sceneI = Math.min(n - 1, Math.floor((i / Math.max(1, 7)) * n));
        render();
      }
    };
  }

  function inbox(root, ui) {
    var marks = {}, flags = {}, wrap = api.h("div", { class: "sim-board inbox-board" });
    root.appendChild(wrap);
    if (ui.threatLine) {
      wrap.appendChild(api.h("button", {
        type: "button",
        class: "btn btn-outline threat-line",
        text: L(ui.threatLine),
        onclick: function () { if (api.teacherCard) api.teacherCard(); }
      }));
    }
    var frame = img((ui.art && ui.art[0]) || "art/phone-inbox.svg", "sim-art inbox-frame");
    wrap.appendChild(frame);
    var list = api.h("div", { class: "inbox-rows", role: "list" });
    wrap.appendChild(list);
    function render() {
      list.innerHTML = "";
      (ui.messages || []).forEach(function (m) {
        var row = api.h("div", { class: "inbox-row", role: "listitem" });
        var via = api.T(m.via || "", m.via_fil || "");
        row.appendChild(api.h("p", { class: "inbox-meta", text: m.from + (via ? " · " + via : "") + " · " + (m.time || "") }));
        row.appendChild(api.h("p", { class: "inbox-body", text: api.T(m.body, m.body_fil) }));
        var acts = api.h("div", { class: "row-acts", role: "group", "aria-label": api.T("Mark this message", "Markahan ang mensahe") });
        ["scam", "safe"].forEach(function (k) {
          acts.appendChild(api.h("button", {
            type: "button",
            class: "btn btn-outline" + (marks[m.id] === k ? " is-on" : ""),
            text: L(ui.marks[k]),
            "aria-pressed": marks[m.id] === k ? "true" : "false",
            onclick: function () { marks[m.id] = k; if (k !== "scam") delete flags[m.id]; render(); }
          }));
        });
        row.appendChild(acts);
        if (marks[m.id] === "scam" && m.flags && m.flags.length) {
          var fg = api.h("div", { class: "flag-rows", role: "group", "aria-label": api.T("Red flags", "Mga red flag") });
          m.flags.forEach(function (fid) {
            var lab = L(ui.flagLabels[fid] || { en: fid, fil: fid });
            fg.appendChild(api.h("button", {
              type: "button",
              class: "btn btn-outline flag-btn" + ((flags[m.id] || []).indexOf(fid) >= 0 ? " is-on" : ""),
              text: lab,
              "aria-pressed": (flags[m.id] || []).indexOf(fid) >= 0 ? "true" : "false",
              onclick: function () {
                flags[m.id] = flags[m.id] || [];
                var i = flags[m.id].indexOf(fid);
                if (i >= 0) flags[m.id].splice(i, 1); else flags[m.id].push(fid);
                render();
              }
            }));
          });
          row.appendChild(fg);
        }
        if (marks[m.id]) {
          var ok = marks[m.id] === m.mark;
          row.appendChild(api.h("p", { class: ok ? "muted" : "muted", text: (ok ? "✓ " : "") + api.T(m.why, m.why_fil) }));
        }
        list.appendChild(row);
      });
    }
    render();
    return {};
  }

  function alerts(root, ui) {
    var picks = {}, wrap = api.h("div", { class: "sim-board alert-board" });
    root.appendChild(wrap);
    wrap.appendChild(img((ui.art && ui.art[0]) || "art/alert-panel.svg", "sim-art"));
    var list = api.h("div", { class: "alert-rows", role: "list" });
    wrap.appendChild(list);
    function render() {
      list.innerHTML = "";
      (ui.alerts || []).forEach(function (a) {
        var row = api.h("div", { class: "alert-row", role: "listitem" });
        row.appendChild(api.h("p", { class: "inbox-meta", text: a.host + " · " + a.time }));
        row.appendChild(api.h("p", { text: api.T(a.text, a.text_fil) }));
        var acts = api.h("div", { class: "row-acts", role: "group", "aria-label": api.T("Choose an action", "Pumili ng aksyon") });
        Object.keys(ui.actions || {}).forEach(function (k) {
          acts.appendChild(api.h("button", {
            type: "button",
            class: "btn btn-outline" + (picks[a.id] === k ? " is-on" : ""),
            text: L(ui.actions[k]),
            "aria-pressed": picks[a.id] === k ? "true" : "false",
            onclick: function () { picks[a.id] = k; render(); }
          }));
        });
        row.appendChild(acts);
        if (picks[a.id]) {
          var ok = picks[a.id] === a.action;
          row.appendChild(api.h("p", { class: "muted", text: (ok ? "✓ " : "") + api.T(a.why, a.why_fil) }));
        }
        list.appendChild(row);
      });
    }
    render();
    return {};
  }

  function facts(root, ui) {
    var marks = {}, wrap = api.h("div", { class: "sim-board fact-board" });
    root.appendChild(wrap);
    var head = api.h("div", { class: "fact-head" });
    head.appendChild(img((ui.art && ui.art[0]) || "art/chatbot.svg", "sim-art bot-art"));
    head.appendChild(api.h("p", { class: "kicker", text: ui.botName || "ClassBot" }));
    wrap.appendChild(head);
    (ui.items || []).forEach(function (it) {
      var card = api.h("div", { class: "fact-item" });
      card.appendChild(api.h("p", { class: "bubble", text: api.T(it.claim, it.claim_fil) }));
      var acts = api.h("div", { class: "row-acts", role: "group", "aria-label": api.T("Mark this claim", "Markahan ang claim") });
      Object.keys(ui.marks || {}).forEach(function (k) {
        acts.appendChild(api.h("button", {
          type: "button",
          class: "btn btn-outline" + (marks[it.id] === k ? " is-on" : ""),
          text: L(ui.marks[k]),
          "aria-pressed": marks[it.id] === k ? "true" : "false",
          onclick: function () { marks[it.id] = k; redraw(); }
        }));
      });
      card.appendChild(acts);
      card._why = api.h("div");
      card.appendChild(card._why);
      card._it = it;
      wrap.appendChild(card);
    });
    function redraw() {
      [].forEach.call(wrap.querySelectorAll(".fact-item"), function (card) {
        var it = card._it;
        if (!it) return;
        card._why.innerHTML = "";
        if (marks[it.id]) {
          var ok = marks[it.id] === it.mark;
          card._why.appendChild(api.h("p", { class: "muted", text: (ok ? "✓ " : "") + api.T(it.why, it.why_fil) }));
        }
        [].forEach.call(card.querySelectorAll(".row-acts .btn"), function (b, i) {
          var k = Object.keys(ui.marks)[i];
          if (!k) return;
          b.classList.toggle("is-on", marks[it.id] === k);
          b.setAttribute("aria-pressed", marks[it.id] === k ? "true" : "false");
        });
      });
    }
    return {};
  }

  function pc(root, ui) {
    var slots = {}, selected = null;
    var cats = ["cpu", "board", "ram", "storage", "psu", "gpu", "case"];
    var catLab = {
      cpu: ["CPU", "CPU"], board: ["Motherboard", "Motherboard"], ram: ["RAM", "RAM"],
      storage: ["Storage", "Storage"], psu: ["Power supply", "Power supply"],
      gpu: ["Graphics card (optional)", "Graphics card (opsyonal)"], case: ["Case", "Case"]
    };
    var wrap = api.h("div", { class: "sim-board pc-board" });
    root.appendChild(wrap);
    var bar = api.h("div", { class: "budget-pin", role: "status" });
    wrap.appendChild(bar);
    var body = api.h("div", { class: "pc-body" });
    wrap.appendChild(body);
    document.body.classList.add("sim-pc");
    var live = document.getElementById("pc-budget-live");
    if (!live) {
      live = api.h("div", { id: "pc-budget-live", class: "sr-live", "aria-live": "polite", "aria-atomic": "true" });
      document.body.appendChild(live);
    }
    var prevSlots = {};

    function spent() {
      var t = 0;
      Object.keys(slots).forEach(function (k) { if (slots[k]) t += slots[k].price; });
      return t;
    }
    function socketOk() {
      if (!slots.cpu || !slots.board) return true;
      return slots.cpu.socket === slots.board.socket;
    }
    function byId(id) {
      return (ui.parts || []).filter(function (p) { return p.id === id; })[0];
    }
    function render() {
      body.innerHTML = "";
      body.appendChild(api.h("p", { class: "kicker", text: L(ui.job) }));
      body.appendChild(img((ui.art && ui.art[0]) || "art/pc-parts.svg", "sim-art"));
      var slotBox = api.h("div", { class: "pc-slots", role: "list" });
      cats.forEach(function (cat) {
        var filled = slots[cat];
        var slot = api.h("button", {
          type: "button",
          class: "pc-slot" + (selected && selected.category === cat ? " is-target" : "") + (filled ? " is-filled" : ""),
          role: "listitem",
          "aria-label": api.T.apply(null, catLab[cat]) + ", " + (filled ? filled.name + ", ₱" + filled.price : api.T("empty", "walang laman")),
          onclick: function () {
            if (selected && selected.category === cat) { slots[cat] = selected; selected = null; render(); return; }
            if (filled && !selected) { slots[cat] = null; render(); }
          }
        });
        slot.appendChild(api.h("strong", { text: api.T.apply(null, catLab[cat]) }));
        slot.appendChild(api.h("span", { text: filled ? filled.name + " · ₱" + filled.price.toLocaleString() : api.T("Tap a part, then tap this slot", "I-tap ang parte, saka i-tap ang slot na ito") }));
        slotBox.appendChild(slot);
      });
      body.appendChild(slotBox);
      if (!socketOk()) body.appendChild(api.h("p", { class: "fb-soft", role: "alert", text: L(ui.warnings.socket) }));
      var used = spent();
      if (used > ui.budget) body.appendChild(api.h("p", { class: "fb-soft", role: "alert", text: L(ui.warnings.budget) }));

      var list = api.h("div", { class: "pc-list" });
      cats.forEach(function (cat) {
        list.appendChild(api.h("h3", { text: api.T.apply(null, catLab[cat]) }));
        (ui.parts || []).filter(function (p) { return p.category === cat; }).forEach(function (p) {
          var b = api.h("button", {
            type: "button",
            class: "pc-part" + (selected && selected.id === p.id ? " is-sel" : ""),
            "aria-pressed": selected && selected.id === p.id ? "true" : "false",
            "aria-label": p.name + ", ₱" + p.price + (p.socket ? ", socket " + p.socket : "") + ". " + api.T(p.blurb, p.blurb_fil),
            onclick: function () { selected = p; render(); }
          });
          b.appendChild(api.h("strong", { text: p.name }));
          b.appendChild(api.h("span", { text: "₱" + p.price.toLocaleString() + (p.socket ? " · " + p.socket : "") }));
          b.appendChild(api.h("span", { class: "muted", text: api.T(p.blurb, p.blurb_fil) }));
          list.appendChild(b);
        });
      });
      body.appendChild(list);

      var over = used > ui.budget;
      var left = ui.budget - used;
      bar.className = "budget-pin" + (over ? " is-over" : " is-ok");
      bar.innerHTML = "";
      bar.appendChild(api.h("p", { text: over
        ? ("₱" + used.toLocaleString() + " / ₱" + ui.budget.toLocaleString() + " · " + api.T("Over by ₱" + Math.abs(left).toLocaleString(), "Lampas ₱" + Math.abs(left).toLocaleString()))
        : ("₱" + used.toLocaleString() + " / ₱" + ui.budget.toLocaleString() + " · ₱" + left.toLocaleString() + " " + api.T("left", "natitira")) }));
      var fill = Math.min(100, Math.round(used / ui.budget * 100));
      var meter = api.h("div", { class: "budget-meter", "aria-hidden": "true" });
      meter.appendChild(api.h("span", { style: "width:" + fill + "%" }));
      bar.appendChild(meter);
      syncBudgetLine(used, left, over);
      announceChanges(used, left);
      persistSlots();
    }
    function leftLabel(left, over) {
      return over
        ? api.T("Over by ₱" + Math.abs(left).toLocaleString(), "Lampas ₱" + Math.abs(left).toLocaleString())
        : ("₱" + left.toLocaleString() + " " + api.T("left", "natitira"));
    }
    function syncBudgetLine(used, left, over) {
      if (used == null) {
        used = spent();
        left = ui.budget - used;
        over = used > ui.budget;
      }
      var actions = document.querySelector("body.sim-pc .quiz-actions") || document.querySelector(".quiz-actions");
      if (!actions) return;
      var line = actions.querySelector(".budget-left");
      if (!line) {
        line = api.h("p", { class: "budget-left" });
        var chk = null;
        var btns = actions.querySelectorAll("button, a.btn");
        for (var i = 0; i < btns.length; i++) {
          if (/Check|Tingnan/.test((btns[i].textContent || ""))) { chk = btns[i]; break; }
        }
        if (chk) actions.insertBefore(line, chk);
        else actions.appendChild(line);
      }
      line.textContent = leftLabel(left, over);
    }
    function announceChanges(used, left) {
      var changed = [];
      cats.forEach(function (cat) {
        var now = slots[cat] ? slots[cat].id : null;
        var was = prevSlots[cat] || null;
        if (now && now !== was) changed.push({ cat: cat, part: slots[cat], kind: "place" });
        else if (!now && was) changed.push({ cat: cat, kind: "remove" });
      });
      prevSlots = {};
      cats.forEach(function (cat) { if (slots[cat]) prevSlots[cat] = slots[cat].id; });
      if (!changed.length || !live) return;
      var bits = changed.map(function (ch) {
        var name = api.T.apply(null, catLab[ch.cat]);
        if (ch.kind === "place") return api.T(name + " placed", "Nailagay ang " + name);
        return api.T(name + " removed", "Tinanggal ang " + name);
      });
      live.textContent = bits.join(". ") + ", " + leftLabel(left, left < 0);
    }
    function persistSlots() {
      var map = {};
      cats.forEach(function (cat) { if (slots[cat]) map[cat] = slots[cat].id; });
      if (api.uiState) api.uiState({ slots: map });
    }
    function restoreSlots() {
      var saved = api.uiState ? api.uiState() : {};
      var map = saved && saved.slots;
      if (!map) return false;
      var any = false;
      cats.forEach(function (cat) {
        var part = map[cat] ? byId(map[cat]) : null;
        if (part) { slots[cat] = part; prevSlots[cat] = part.id; any = true; }
      });
      return any;
    }
    function statusAria(left, over) {
      if (!live) return;
      var names = [];
      cats.forEach(function (cat) { if (slots[cat]) names.push(api.T.apply(null, catLab[cat])); });
      live.textContent = names.length
        ? names.join(", ") + ", " + leftLabel(left, over)
        : leftLabel(left, over);
    }
    var restored = restoreSlots();
    function syncBudget() { render(); }
    render();
    if (restored) {
      var used0 = spent(), left0 = ui.budget - used0, over0 = used0 > ui.budget;
      statusAria(left0, over0);
    }
    persistSlots();
    return { unmount: function () { document.body.classList.remove("sim-pc"); var el = document.getElementById("pc-budget-live"); if (el && el.parentNode) el.parentNode.removeChild(el); }, syncBudget: syncBudget };
  }

  var kinds = {
    "mango-label-then-test": mango,
    "chatbot-fact-board": facts,
    "phone-inbox": inbox,
    "alert-queue": alerts,
    "router-lights": lights,
    "budget-pc-builder": pc
  };

  function mount(root, sim, deps) {
    api = deps || api;
    CAP = root.ownerDocument.defaultView.RA2SimCaptions || CAP;
    if (!sim || !sim.ui) return { setStep: function () {} };
    var fn = kinds[sim.ui.kind];
    if (!fn) {
      root.appendChild(api.h("p", { class: "muted", text: sim.ui.kind || "" }));
      return { setStep: function () {} };
    }
    return fn(root, sim.ui) || { setStep: function () {} };
  }

  root.RA2SimUI = { mount: mount };
})(typeof window !== "undefined" ? window : this);
