/* global window, document */
(function () {
  const DATA = window.ERFGOED_DATA;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const state = {
    view: "home",
    mode: null,
    sectionId: null,
    path: {},
    answeredIds: [],
    current: null,
    score: 0,
    maxPossible: 0,
    streak: 0,
    locked: false,
    draft: null
  };

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function loadStore() {
    try {
      return JSON.parse(localStorage.getItem(DATA.storageKey) || "{}");
    } catch (e) {
      return {};
    }
  }

  function saveStore(store) {
    localStorage.setItem(DATA.storageKey, JSON.stringify(store));
  }

  function badgeFor(pct) {
    let found = DATA.badgeLevels[0];
    DATA.badgeLevels.forEach((b) => {
      if (pct >= b.minPct) found = b;
    });
    return found;
  }

  function questionMax(q) {
    if (!q || q.type === "pick-path") return 0;
    if (q.type === "fill") return q.answers.length * DATA.pointsPerItem;
    if (q.type === "match") return q.pairs.length * DATA.pointsPerItem;
    if (q.type === "order") return q.items.length * DATA.pointsPerItem;
    if (q.type === "mc" || q.type === "tf") return DATA.pointsPerItem;
    if (q.type === "multi") return q.options.filter((o) => o.correct).length * DATA.pointsPerItem;
    if (q.type === "keywords") return q.correct.length * DATA.pointsPerItem;
    if (q.type === "map") return q.targets.length * DATA.pointsPerItem;
    return DATA.pointsPerItem;
  }

  function visibleQuestions() {
    return DATA.questions.filter((q) => {
      if (state.mode === "all") {
        if (q.type === "pick-path" || q.includeInAll === false) return false;
        return true;
      }
      if (q.section !== state.sectionId) return false;
      if (q.requires) {
        return Object.keys(q.requires).every((k) => state.path[k] === q.requires[k]);
      }
      return true;
    });
  }

  function remainingQuestions() {
    const done = new Set(state.answeredIds);
    return visibleQuestions().filter((q) => !done.has(q.id));
  }

  function countMaxForRun() {
    return visibleQuestions().reduce((sum, q) => sum + questionMax(q), 0);
  }

  function updateHeader() {
    $("#scoreValue").textContent = String(state.score);
    const left = remainingQuestions();
    const done = state.answeredIds.length;
    const total = done + left.length;
    const currentIdx = state.current && !state.answeredIds.includes(state.current.id) ? done + 1 : done;
    const wrap = $("#progressWrap");
    if (state.view === "quiz" && total > 0) {
      wrap.classList.add("is-on");
      $("#progressLabel").textContent = "Vraag " + currentIdx + " van " + total;
      $("#progressBar").style.width = Math.round((done / total) * 100) + "%";
    } else {
      wrap.classList.remove("is-on");
    }
    const streak = $("#streakPill");
    if (state.streak >= 2 && state.view === "quiz") {
      streak.classList.add("is-on");
      streak.textContent = "Reeks ×" + state.streak;
    } else {
      streak.classList.remove("is-on");
    }
    $("#homeBtn").classList.toggle("hidden", state.view === "home");
    const chip = $("#recordChip");
    const beat = state.prevBest != null && state.score > state.prevBest;
    chip.classList.toggle("is-on", beat && state.view !== "home");
  }

  function showView(id) {
    $$(".view").forEach((el) => el.classList.add("hidden"));
    $("#" + id).classList.remove("hidden");
    state.view = id === "home-view" ? "home" : id === "end-view" ? "end" : "quiz";
    updateHeader();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  function namedEarnedIds(sectionBest) {
    return DATA.namedBadges.filter((b) => {
      if (b.allTopics) {
        return DATA.sections.every((s) => sectionBest[s.id] && sectionBest[s.id].pct >= 80);
      }
      return (b.sections || []).every((id) => sectionBest[id] && sectionBest[id].pct >= 80);
    }).map((b) => b.id);
  }

  function renderHome() {
    const store = loadStore();
    const sectionBest = store.sectionBest || {};
    const earnedNamed = new Set(namedEarnedIds(sectionBest));
    $("#namedGrid").innerHTML = DATA.namedBadges.map((b) => {
      const on = earnedNamed.has(b.id);
      return '<div class="named-badge' + (on ? " earned" : "") + '" title="' + escapeHtml(b.hint) + '">' +
        '<div class="icon" aria-hidden="true">' + b.emoji + "</div>" +
        "<strong>" + escapeHtml(b.name) + "</strong>" +
        '<div class="status">' + (on ? "Verdiend" : "Nog te verdienen") + "</div></div>";
    }).join("");

    const overall = store.overallBest;
    $("#bestOverall").textContent = overall
      ? "Jouw topscore voor alles oefenen: " + overall.score + " / " + overall.max +
        " (" + overall.pct + "%)"
      : "Nog geen topscore voor 'Alles oefenen'. Durf je het aan?";

    $("#topicGrid").innerHTML = DATA.sections.map((s) => {
      const best = sectionBest[s.id];
      const badge = best ? badgeFor(best.pct) : DATA.badgeLevels[0];
      const badgeHtml = best
        ? '<span class="badge ' + badge.className + '">' + badge.emoji + " " + badge.name +
          " · " + best.score + "/" + best.max + "</span>"
        : '<span class="badge todo">Nog te verdienen</span>';
      return '<button class="topic-card" data-section="' + s.id + '" style="--topic-accent:' + (s.accent || "#1E4E8C") + '">' +
        '<div class="topic-emoji">' + s.emoji + "</div>" +
        '<div class="topic-num">Oefening ' + s.num + "</div>" +
        "<h3>" + s.title + "</h3>" +
        "<p style=\"margin:0;color:var(--color-muted);font-size:0.88rem\">" + s.blurb + "</p>" +
        badgeHtml +
        "</button>";
    }).join("");

    $$("#topicGrid .topic-card").forEach((btn) => {
      btn.addEventListener("click", () => startQuiz("section", btn.dataset.section));
    });
    showView("home-view");
  }

  function startQuiz(mode, sectionId) {
    state.mode = mode;
    state.sectionId = sectionId || null;
    state.path = {};
    state.answeredIds = [];
    state.score = 0;
    state.streak = 0;
    state.locked = false;
    state.current = null;
    state.maxPossible = 0;
    const store = loadStore();
    if (mode === "section") {
      state.prevBest = (store.sectionBest && store.sectionBest[sectionId]) ? store.sectionBest[sectionId].score : 0;
    } else {
      state.prevBest = store.overallBest ? store.overallBest.score : 0;
    }
    nextQuestion();
  }

  function nextQuestion() {
    const left = remainingQuestions();
    if (!left.length) {
      finishQuiz();
      return;
    }
    state.current = left[0];
    state.locked = false;
    state.draft = null;
    renderQuestion(state.current);
    showView("quiz-view");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderQuestion(q) {
    const section = DATA.sections.find((s) => s.id === q.section);
    const root = $("#quiz-view");
    let extraImgs = "";
    if (q.extras && q.extras.images) {
      extraImgs = '<div class="grid" style="margin:0.6rem 0">' + q.extras.images.map((im) =>
        '<img class="q-image" src="' + im.src + '" alt="' + escapeHtml(im.alt) + '">'
      ).join("") + "</div>";
    }
    const img = q.image
      ? '<img class="q-image' + (q.imageContain ? " contain" : "") + '" src="' + q.image + '" alt="' + escapeHtml(q.imageAlt || "") + '">'
      : "";
    root.innerHTML = '<article class="question-card">' +
      '<div class="kicker">' + (section ? section.emoji + " " + section.title : "") + "</div>" +
      "<h2>" + escapeHtml(q.title) + "</h2>" +
      "<p>" + escapeHtml(q.prompt) + "</p>" +
      img + extraImgs +
      '<div id="qBody"></div>' +
      '<div id="feedback" class="feedback" role="status"></div>' +
      '<div class="actions" id="qActions"></div>' +
      "</article>";
    const body = $("#qBody");
    const actions = $("#qActions");

    if (q.type === "mc" || q.type === "pick-path") {
      const opts = shuffle(q.options).map((opt, i) => {
        return '<button class="choice" data-i="' + i + '">' + escapeHtml(opt.text) + "</button>";
      });
      body.innerHTML = '<div class="choices">' + opts.join("") + "</div>";
      body.dataset.opts = JSON.stringify(shuffle ? q.options : q.options);
      const shuffled = shuffle(q.options);
      body.innerHTML = '<div class="choices">' + shuffled.map((opt, i) =>
        '<button class="choice" data-i="' + i + '">' + escapeHtml(opt.text) + "</button>"
      ).join("") + "</div>";
      state.draft = { options: shuffled, picked: null };
      $$(".choice", body).forEach((btn) => {
        btn.addEventListener("click", () => {
          if (state.locked) return;
          if (q.type === "pick-path") {
            pickPath(q, shuffled[Number(btn.dataset.i)]);
            return;
          }
          submitMc(q, shuffled, Number(btn.dataset.i));
        });
      });
    } else if (q.type === "tf") {
      body.innerHTML = '<div class="tf-row">' +
        '<button class="choice tf-btn" data-v="true">Waar</button>' +
        '<button class="choice tf-btn" data-v="false">Niet waar</button>' +
        "</div>";
      $$(".choice", body).forEach((btn) => {
        btn.addEventListener("click", () => {
          if (state.locked) return;
          submitTf(q, btn.dataset.v === "true");
        });
      });
    } else if (q.type === "multi" || q.type === "keywords") {
      const items = q.type === "keywords"
        ? shuffle(q.correct.map((t) => ({ text: t, correct: true })).concat(q.wrong.map((t) => ({ text: t, correct: false }))))
        : shuffle(q.options);
      state.draft = { options: items, selected: new Set() };
      body.innerHTML = '<div class="choices"></div>';
      const box = $(".choices", body);
      items.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "choice";
        btn.textContent = opt.text;
        btn.dataset.i = String(i);
        btn.addEventListener("click", () => {
          if (state.locked) return;
          if (state.draft.selected.has(i)) state.draft.selected.delete(i);
          else state.draft.selected.add(i);
          btn.classList.toggle("selected", state.draft.selected.has(i));
        });
        box.appendChild(btn);
      });
      const check = document.createElement("button");
      check.className = "primary-btn";
      check.textContent = "Kijk na";
      check.addEventListener("click", () => submitMulti(q));
      actions.appendChild(check);
    } else if (q.type === "fill") {
      renderFill(q, body, actions);
    } else if (q.type === "match") {
      renderMatch(q, body, actions);
    } else if (q.type === "order") {
      renderOrder(q, body, actions);
    } else if (q.type === "map") {
      renderMap(q, body, actions);
    }
    updateHeader();
  }

  function renderFill(q, body, actions) {
    const words = shuffle(q.words.slice());
    const filled = q.answers.map(() => null);
    state.draft = { words, filled, picked: null };
    const html = q.text.split("\n").map((line) => {
      if (!line) return "<br>";
      return "<p>" + line.replace(/\{\{(\d+)\}\}/g, (_, n) =>
        '<button type="button" class="blank" data-blank="' + n + '" aria-label="open plek ' + (Number(n) + 1) + '"></button>'
      ) + "</p>";
    }).join("");
    body.innerHTML = '<div class="fill-text">' + html + "</div>" +
      '<div class="word-bank" id="wordBank"></div>';
    function paint() {
      $$(".blank", body).forEach((b) => {
        const i = Number(b.dataset.blank);
        const val = filled[i];
        b.textContent = val || "";
        b.classList.toggle("filled", !!val);
      });
      const bank = $("#wordBank");
      bank.innerHTML = "";
      words.forEach((w, i) => {
        const used = filled.includes(w) && words.filter((x, idx) => x === w && idx <= i).length <=
          filled.filter((x) => x === w).length;
        const already = filled.indexOf(w) !== -1 && !words.slice(0, i).includes(w)
          ? filled.includes(w) : false;
        const btn = document.createElement("button");
        btn.className = "word";
        btn.textContent = w;
        const taken = filled.includes(w) && countOcc(filled, w) >= countOcc(words.slice(0, i + 1), w);
        // simpler: mark used if this exact index was placed. Track by word unique in this exercise (all unique).
        const isUsed = filled.includes(w);
        btn.classList.toggle("used", isUsed);
        btn.classList.toggle("picking", state.draft.picked === w);
        btn.addEventListener("click", () => {
          if (state.locked || isUsed) return;
          state.draft.picked = w;
          paint();
        });
        bank.appendChild(btn);
      });
    }
    function countOcc(arr, val) { return arr.filter((x) => x === val).length; }
    $$(".blank", body).forEach((b) => {
      b.addEventListener("click", () => {
        if (state.locked) return;
        const i = Number(b.dataset.blank);
        if (filled[i]) {
          filled[i] = null;
        } else if (state.draft.picked) {
          filled[i] = state.draft.picked;
          state.draft.picked = null;
        }
        paint();
      });
    });
    paint();
    const check = document.createElement("button");
    check.className = "primary-btn";
    check.textContent = "Kijk na";
    check.addEventListener("click", () => submitFill(q));
    actions.appendChild(check);
  }

  function renderMatch(q, body, actions) {
    const left = shuffle(q.pairs.map((p, i) => ({ i, text: p.left })));
    const right = shuffle(q.pairs.map((p, i) => ({ i, text: p.right })));
    state.draft = { left, right, pairs: {}, selL: null, selR: null };
    body.innerHTML = '<div class="match"><div class="match-col" id="matchL"></div><div class="match-col" id="matchR"></div></div>';
    function paint() {
      const colors = ["#1E4E8C", "#1D7A5F", "#F2B705", "#5C6B7A", "#8B6914", "#6B4A2A"];
      $("#matchL").innerHTML = left.map((item, idx) => {
        const paired = Object.prototype.hasOwnProperty.call(state.draft.pairs, item.i);
        const cls = "match-item" + (state.draft.selL === item.i ? " selected" : "") + (paired ? " paired" : "");
        const style = paired ? ' style="border-color:' + colors[item.i % colors.length] + '"' : "";
        return '<button class="' + cls + '" data-side="L" data-i="' + item.i + '"' + style + ">" + escapeHtml(item.text) + "</button>";
      }).join("");
      $("#matchR").innerHTML = right.map((item) => {
        const pairedTo = Object.entries(state.draft.pairs).find(([, r]) => r === item.i);
        const paired = !!pairedTo;
        const cls = "match-item" + (state.draft.selR === item.i ? " selected" : "") + (paired ? " paired" : "");
        const style = paired ? ' style="border-color:' + colors[Number(pairedTo[0]) % colors.length] + '"' : "";
        return '<button class="' + cls + '" data-side="R" data-i="' + item.i + '"' + style + ">" + escapeHtml(item.text) + "</button>";
      }).join("");
      $$(".match-item", body).forEach((btn) => {
        btn.addEventListener("click", () => {
          if (state.locked) return;
          const i = Number(btn.dataset.i);
          if (btn.dataset.side === "L") {
            const existing = Object.entries(state.draft.pairs).find(([l]) => Number(l) === i);
            if (existing) delete state.draft.pairs[existing[0]];
            state.draft.selL = i;
          } else {
            const existing = Object.entries(state.draft.pairs).find(([, r]) => r === i);
            if (existing) delete state.draft.pairs[existing[0]];
            state.draft.selR = i;
          }
          if (state.draft.selL != null && state.draft.selR != null) {
            state.draft.pairs[state.draft.selL] = state.draft.selR;
            state.draft.selL = null;
            state.draft.selR = null;
          }
          paint();
        });
      });
    }
    paint();
    const check = document.createElement("button");
    check.className = "primary-btn";
    check.textContent = "Kijk na";
    check.addEventListener("click", () => submitMatch(q));
    actions.appendChild(check);
  }

  function renderOrder(q, body, actions) {
    const items = shuffle(q.items.map((it, i) => ({ ...it, i })));
    state.draft = { items, order: [] };
    body.innerHTML = '<div class="order-list" id="orderList"></div>';
    function paint() {
      $("#orderList").innerHTML = items.map((it) => {
        const pos = state.draft.order.indexOf(it.i);
        return '<button class="order-item' + (pos !== -1 ? " picked" : "") + '" data-i="' + it.i + '">' +
          '<span class="num-badge">' + (pos === -1 ? "•" : (pos + 1)) + "</span>" +
          escapeHtml(it.label) + "</button>";
      }).join("");
      $$(".order-item", body).forEach((btn) => {
        btn.addEventListener("click", () => {
          if (state.locked) return;
          const i = Number(btn.dataset.i);
          const pos = state.draft.order.indexOf(i);
          if (pos !== -1) state.draft.order.splice(pos, 1);
          else state.draft.order.push(i);
          paint();
        });
      });
    }
    paint();
    const check = document.createElement("button");
    check.className = "primary-btn";
    check.textContent = "Kijk na";
    check.addEventListener("click", () => submitOrder(q));
    actions.appendChild(check);
  }

  function renderMap(q, body, actions) {
    state.draft = { picked: [], next: 0 };
    body.innerHTML = '<div class="map-wrap">' + egyptSvg() +
      '<div class="map-legend"><span>💧 Tik op de Nijl</span><span>📍 Tik op Caïro</span></div></div>';
    const svg = $(".map-svg", body);
    function mark(id) {
      const el = svg.querySelector('[data-target="' + id + '"]');
      if (el) el.classList.add("picked");
      const twins = svg.querySelectorAll('[data-target="' + id + '"]');
      twins.forEach((n) => n.classList.add("picked"));
    }
    svg.querySelectorAll("[data-target]").forEach((el) => {
      el.addEventListener("click", () => {
        if (state.locked) return;
        const id = el.dataset.target;
        const expected = q.targets[state.draft.next];
        if (!expected) return;
        state.draft.picked.push({ id, ok: id === expected.id });
        mark(id);
        state.draft.next += 1;
        if (state.draft.next >= q.targets.length) submitMap(q);
      });
    });
  }

  function egyptSvg() {
    return '<svg class="map-svg" viewBox="0 0 280 360" role="img" aria-label="Kaart van Egypte">' +
      '<rect class="map-sea" x="0" y="0" width="280" height="360"></rect>' +
      '<path class="map-land" d="M38 78 L150 72 L168 78 L176 92 L210 88 L248 96 L252 118 L232 128 L226 170 L248 210 L240 250 L210 268 L200 318 L150 330 L92 324 L70 280 L48 210 L42 140 Z"></path>' +
      '<path class="map-nile-hit map-target" data-target="nile" d="M160 320 C155 280, 150 230, 152 180 C154 140, 148 110, 142 92 C138 84, 132 78, 128 70"></path>' +
      '<path class="map-nile map-target" data-target="nile" d="M160 320 C155 280, 150 230, 152 180 C154 140, 148 110, 142 92 C138 84, 132 78, 128 70"></path>' +
      '<path class="map-nile map-target" data-target="nile" d="M142 92 L118 64"></path>' +
      '<path class="map-nile map-target" data-target="nile" d="M142 92 L155 62"></path>' +
      '<circle class="map-cairo map-target" data-target="cairo" cx="140" cy="96" r="11"></circle>' +
      '<text x="154" y="102" font-size="13" font-weight="700" fill="#3b2415">Caïro</text>' +
      '<text x="168" y="180" font-size="13" font-weight="700" fill="#2a7de1">Nijl</text>' +
      '<text x="90" y="50" font-size="12" fill="#2b6cb0">Middellandse Zee</text>' +
      '<text x="200" y="200" font-size="12" fill="#2b6cb0">Rode Zee</text>' +
      "</svg>";
  }

  function showFeedback(q, got, max, extra) {
    const el = $("#feedback");
    el.className = "feedback show " + (got === max && max > 0 ? "ok" : got > 0 ? "" : "bad");
    const msg = got === max && max > 0
      ? "Goed zo! +" + got + " punten"
      : got > 0
        ? "Gedeeltelijk juist: +" + got + " van " + max + " punten"
        : "Nog niet juist.";
    el.innerHTML = '<div class="points-pop">' + msg + "</div><p>" + escapeHtml(q.explanation || extra || "") + "</p>";
    el.setAttribute("tabindex", "-1");
    addNextButton();
    el.focus();
  }

  function addNextButton() {
    const actions = $("#qActions");
    actions.innerHTML = "";
    const btn = document.createElement("button");
    btn.className = "next-btn";
    btn.textContent = remainingQuestions().length ? "Volgende" : "Naar je score";
    btn.addEventListener("click", () => nextQuestion());
    actions.appendChild(btn);
  }

  function award(q, got, max) {
    state.score += got;
    state.maxPossible += max;
    if (max > 0 && got === max) {
      state.streak += 1;
      if (state.streak > 0 && state.streak % DATA.streakEvery === 0) {
        state.score += DATA.streakBonus;
        const el = $("#feedback");
        if (el) {
          el.innerHTML += '<p class="points-pop">Reeks! +' + DATA.streakBonus + " bonuspunten</p>";
        }
      }
    } else if (max > 0) {
      state.streak = 0;
    }
    if (!state.answeredIds.includes(q.id)) state.answeredIds.push(q.id);
    state.locked = true;
    updateHeader();
  }

  function submitMc(q, options, index) {
    const chosen = options[index];
    const max = questionMax(q);
    const got = chosen.correct ? max : 0;
    $$(".choice").forEach((btn, i) => {
      btn.disabled = true;
      if (options[i].correct) btn.classList.add("correct");
      if (i === index && !options[i].correct) btn.classList.add("wrong");
    });
    award(q, got, max);
    showFeedback(q, got, max);
  }

  function pickPath(q, option) {
    state.path[q.key] = option.value;
    if (!state.answeredIds.includes(q.id)) state.answeredIds.push(q.id);
    state.locked = true;
    const el = $("#feedback");
    el.className = "feedback show ok";
    el.innerHTML = "<p>Je koos: <strong>" + escapeHtml(option.text) + "</strong>. Daar gaan we!</p>";
    addNextButton();
    updateHeader();
  }

  function submitTf(q, value) {
    const max = questionMax(q);
    const got = value === q.answer ? max : 0;
    $$(".choice").forEach((btn) => {
      btn.disabled = true;
      const v = btn.dataset.v === "true";
      if (v === q.answer) btn.classList.add("correct");
      if (v === value && value !== q.answer) btn.classList.add("wrong");
    });
    award(q, got, max);
    showFeedback(q, got, max);
  }

  function submitMulti(q) {
    const opts = state.draft.options;
    const selected = state.draft.selected;
    let got = 0;
    const max = questionMax(q);
    opts.forEach((opt, i) => {
      const btn = $('.choice[data-i="' + i + '"]');
      const on = selected.has(i);
      if (opt.correct && on) {
        got += DATA.pointsPerItem;
        btn.classList.add("correct");
      } else if (opt.correct) {
        btn.classList.add("correct");
      } else if (on) {
        btn.classList.add("wrong");
      }
      btn.disabled = true;
    });
    got = Math.max(0, got);
    award(q, got, max);
    showFeedback(q, got, max);
  }

  function submitFill(q) {
    const filled = state.draft.filled;
    let got = 0;
    const max = questionMax(q);
    $$(".blank").forEach((b) => {
      const i = Number(b.dataset.blank);
      const val = (filled[i] || "").trim().toLowerCase();
      const exp = q.answers[i].trim().toLowerCase();
      if (val && val === exp) {
        got += DATA.pointsPerItem;
        b.classList.add("correct");
        b.style.borderColor = "var(--color-ok)";
        b.style.background = "var(--color-ok-bg)";
      } else {
        b.style.borderColor = "var(--color-bad)";
        b.style.background = "var(--color-bad-bg)";
        b.textContent = (filled[i] ? filled[i] + " → " : "") + q.answers[i];
      }
    });
    award(q, got, max);
    showFeedback(q, got, max);
  }

  function submitMatch(q) {
    let got = 0;
    const max = questionMax(q);
    Object.entries(state.draft.pairs).forEach(([l, r]) => {
      if (Number(l) === Number(r)) got += DATA.pointsPerItem;
    });
    $$(".match-item").forEach((btn) => {
      const i = Number(btn.dataset.i);
      if (btn.dataset.side === "L") {
        const r = state.draft.pairs[i];
        btn.classList.add(r === i ? "correct" : "wrong");
      } else {
        const owner = Object.entries(state.draft.pairs).find(([, rv]) => rv === i);
        if (owner) btn.classList.add(Number(owner[0]) === i ? "correct" : "wrong");
      }
    });
    award(q, got, max);
    showFeedback(q, got, max);
  }

  function submitOrder(q) {
    const max = questionMax(q);
    let got = 0;
    const byOrig = q.items;
    state.draft.items.forEach((it) => {
      const pos = state.draft.order.indexOf(it.i);
      const ok = pos !== -1 && pos + 1 === it.order;
      if (ok) got += DATA.pointsPerItem;
    });
    $$(".order-item").forEach((btn) => {
      const i = Number(btn.dataset.i);
      const item = q.items[i];
      const pos = state.draft.order.indexOf(i);
      const ok = pos !== -1 && pos + 1 === item.order;
      btn.classList.add(ok ? "correct" : "wrong");
      btn.style.borderColor = ok ? "var(--color-ok)" : "var(--color-bad)";
      btn.style.background = ok ? "var(--color-ok-bg)" : "var(--color-bad-bg)";
      const badge = btn.querySelector(".num-badge");
      badge.textContent = item.order;
    });
    award(q, got, max);
    showFeedback(q, got, max);
  }

  function submitMap(q) {
    const max = questionMax(q);
    let got = 0;
    state.draft.picked.forEach((p) => {
      if (p.ok) got += DATA.pointsPerItem;
      document.querySelectorAll('[data-target="' + p.id + '"]').forEach((n) => {
        n.classList.add(p.ok ? "correct" : "wrong");
      });
    });
    award(q, got, max);
    showFeedback(q, got, max);
  }

  function finishQuiz() {
    const score = state.score;
    const max = state.maxPossible || countMaxForRun();
    const pct = max ? Math.round((score / max) * 100) : 0;
    const badge = badgeFor(pct);
    const store = loadStore();
    store.sectionBest = store.sectionBest || {};
    const beforeNamed = namedEarnedIds(store.sectionBest);
    let newRecord = false;
    if (state.mode === "section") {
      const prev = store.sectionBest[state.sectionId];
      if (!prev || score > prev.score) {
        newRecord = !prev || score > prev.score;
        store.sectionBest[state.sectionId] = { score, max, pct };
      }
    } else {
      const prev = store.overallBest;
      if (!prev || score > prev.score) {
        store.overallBest = { score, max, pct };
        newRecord = true;
      }
    }
    const afterNamed = namedEarnedIds(store.sectionBest);
    const unlocked = afterNamed.filter((id) => !beforeNamed.includes(id));
    saveStore(store);

    const title = state.mode === "all"
      ? "Alles geoefend!"
      : (DATA.sections.find((s) => s.id === state.sectionId) || {}).title;

    const topicMedal = '<div class="calm-badge"><div>' + badge.emoji + "</div><strong>" +
      escapeHtml(badge.name) + "</strong><div>" + pct + "%</div></div>";
    const namedHtml = unlocked.map((id) => {
      const b = DATA.namedBadges.find((x) => x.id === id);
      return '<div class="calm-badge"><div>' + b.emoji + "</div><strong>" + escapeHtml(b.name) +
        "</strong><div>Nieuw verdiend</div></div>";
    }).join("");

    $("#end-view").innerHTML = '<article class="end-card">' +
      "<h2>Klaar: " + escapeHtml(title || "") + "</h2>" +
      '<div class="end-score">' + score + " / " + max + "</div>" +
      "<p>Dat is " + pct + "%</p>" +
      (newRecord ? '<p class="record">Nieuwe topscore!</p>' : "<p>Topscore blijft bewaard in deze browser.</p>") +
      '<div class="earned-row">' + topicMedal + namedHtml + "</div>" +
      '<div class="actions" style="justify-content:center">' +
      '<button class="primary-btn" id="againBtn">Opnieuw</button>' +
      '<button class="secondary-btn" id="homeFromEnd">Naar het overzicht</button>' +
      "</div></article>";
    $("#againBtn").addEventListener("click", () => startQuiz(state.mode, state.sectionId));
    $("#homeFromEnd").addEventListener("click", renderHome);
    showView("end-view");
  }

  function goHome() {
    if (state.view === "quiz") {
      const ok = window.confirm("Wil je stoppen? Deze ronde wordt niet als topscore bewaard.");
      if (!ok) return;
    }
    renderHome();
  }

  document.addEventListener("DOMContentLoaded", () => {
    $("#homeBtn").addEventListener("click", goHome);
    $("#playAllBtn").addEventListener("click", () => startQuiz("all"));
    $("#resetScoresBtn").addEventListener("click", () => {
      if (window.confirm("Alle topscores en badges op dit toestel wissen?")) {
        localStorage.removeItem(DATA.storageKey);
        renderHome();
      }
    });
    renderHome();
  });
})();
