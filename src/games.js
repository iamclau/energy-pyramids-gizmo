// ================= GAMES =================
const Games = (() => {
  const best = () => store.get('best', {});
  function saveBest(k, v) { const b = best(); if (b[k] == null || v > b[k]) { b[k] = v; store.set('best', b); return true; } return false; }
  const GAMES = [
    { id: 'builder', icon: '🏗️', name: 'Pyramid Builder', desc: 'Put each organism on the right trophic level, then use the 10% rule to answer a bonus question. 5 rounds.', start: () => Builder.start() },
    { id: 'rush', icon: '⚡', name: '10% Rule Rush', desc: '60 seconds. Solve as many 10% rule problems as you can — up the pyramid and down. Build a streak for bonus points.', start: () => Rush.start() },
    { id: 'heat', icon: '🔥', name: 'Pass It Up or Lose It?', desc: 'Does the energy get passed up to the next level, or is it used up and lost as heat? Sort 12 situations.', start: () => Heat.start() },
    { id: 'zoom', icon: '🎯', name: 'Zoom Challenge', desc: 'Jump to the zoom tool and find the right level of organization from each clue — as fast as you can.', start: () => { showTab('zoom'); Zoom.startChallenge(); } }
  ];
  function menu() {
    const b = best(), zb = store.get('zoomBest', null);
    $('#gameMenu').hidden = false; $('#gameArea').hidden = true;
    $('#gameMenu').innerHTML = GAMES.map(g => `<div class="panel gcard"><div class="gi">${g.icon}</div><h3>${g.name}</h3><p>${g.desc}</p><div class="best">${g.id === 'zoom' ? (zb ? `🏆 Best: ${zb.score}/8 in ${zb.time}s` : 'No score yet') : (b[g.id] != null ? `🏆 Best: ${b[g.id]}` : 'No score yet')}</div><button class="btn sun" data-g="${g.id}">▶ Play</button></div>`).join('');
    $$('#gameMenu [data-g]').forEach(btn => btn.onclick = () => GAMES.find(g => g.id === btn.dataset.g).start());
  }
  function area(title, score) {
    $('#gameMenu').hidden = true; const a = $('#gameArea'); a.hidden = false;
    a.innerHTML = `<div class="game-head"><button class="btn ghost" id="gBack">← Games</button><h3>${title}</h3><span class="score-pill" id="gScore">⭐ ${score}</span></div><div id="gBody"></div>`;
    $('#gBack').onclick = () => { Rush.stop(); menu(); };
    a.scrollIntoView({ block: 'start' });
    return $('#gBody');
  }
  function setScore(s) { const el = $('#gScore'); if (el) el.textContent = '⭐ ' + s; }
  function finish(id, score, max, extra = '') {
    const nb = saveBest(id, score); const xp = Math.max(5, Math.round(score / 5)); addXP(xp, 'game');
    const pct = max ? Math.round(score / max * 100) : null;
    $('#gBody').innerHTML = `<div class="end-card"><div class="big">${score}${max ? ' / ' + max : ''}</div><p>${pct != null ? (pct >= 90 ? '🌟 Outstanding!' : pct >= 70 ? '👍 Nice work!' : '💪 Keep practicing!') : 'points'}</p>${nb ? '<p><b>🏆 New best score!</b></p>' : ''}${extra}<div class="row" style="justify-content:center;margin-top:10px"><button class="btn sun" id="gAgain">Play again</button><button class="btn ghost" id="gMenu">Back to games</button></div></div>`;
    $('#gAgain').onclick = () => GAMES.find(g => g.id === id).start(); $('#gMenu').onclick = menu;
  }

  // ---------- Pyramid Builder ----------
  const Builder = (() => {
    let s;
    function start() { s = { round: 0, score: 0, max: 0, pool: shuffle(CHAINS.map((_, i) => i)) }; next(); }
    function next() {
      if (s.round >= 5) return finish('builder', s.score, s.max);
      const chain = CHAINS[s.pool[s.round % s.pool.length]]; s.round++;
      s.chain = chain; s.placed = new Array(chain.length).fill(null); s.sel = null; s.checked = false;
      s.tray = shuffle(chain.map((_, i) => i)); s.max += chain.length * 10 + 10 + 20;
      area(`Pyramid Builder · Round ${s.round} of 5`, s.score); render();
    }
    function render() {
      const L = s.chain.length, b = $('#gBody');
      const slots = [...Array(L).keys()].reverse().map(i => { const p = s.placed[i]; const w = 46 + i * (54 / Math.max(1, L - 1)); return `<div class="slot" data-slot="${i}" style="width:${(100 - w + 46).toFixed(0)}%"><span class="role">${ORD[i]} · ${ROLES[i]}</span><span class="placed">${p != null ? s.chain[p][0] + ' ' + s.chain[p][1] : '<span class="muted">tap to place</span>'}</span></div>`; }).join('');
      b.innerHTML = `<p>Tap an organism card, then tap the trophic level where it belongs. The <b>producer</b> goes on the bottom.</p><div class="slots">${slots}</div>
        <div class="tray">${s.tray.map(k => `<button class="chip ${s.sel === k ? 'sel' : ''}" data-k="${k}">${s.chain[k][0]} ${s.chain[k][1]}</button>`).join('') || '<span class="muted small">All placed — press Check!</span>'}</div>
        <div class="row" style="justify-content:center;margin-top:12px"><button class="btn" id="bCheck" ${s.placed.includes(null) ? 'disabled' : ''}>Check my pyramid</button></div><div class="fb" id="bFb"></div><div id="bBonus"></div>`;
      $$('.chip', b).forEach(c => c.onclick = () => { s.sel = +c.dataset.k; render(); });
      $$('.slot', b).forEach(el => el.onclick = () => {
        if (s.checked) return; const i = +el.dataset.slot;
        if (s.sel != null) { if (s.placed[i] != null) s.tray.push(s.placed[i]); s.placed[i] = s.sel; s.tray = s.tray.filter(k => k !== s.sel); s.sel = null; }
        else if (s.placed[i] != null) { s.tray.push(s.placed[i]); s.placed[i] = null; }
        render();
      });
      $('#bCheck').onclick = check;
    }
    function check() {
      s.checked = true; let right = 0;
      $$('.slot').forEach(el => { const i = +el.dataset.slot, ok = s.placed[i] === i; if (ok) right++; el.classList.add(ok ? 'right' : 'wrong'); if (!ok) $('.placed', el).innerHTML += ` <span class="small">→ ${s.chain[i][0]} ${s.chain[i][1]}</span>`; });
      const L = s.chain.length, pts = right * 10 + (right === L ? 10 : 0); s.score += pts; setScore(s.score);
      const fb = $('#bFb'); fb.className = 'fb show ' + (right === L ? 'good' : 'bad');
      fb.innerHTML = right === L ? `✅ Perfect pyramid! +${pts}` : `You got ${right} of ${L} right (+${pts}). Corrections are shown in each level.`;
      $('#bCheck').disabled = true; bonus();
    }
    function bonus() {
      const L = s.chain.length, P = pick([1000, 2000, 5000, 10000, 20000, 30000, 50000, 80000, 100000].filter(v => v * Math.pow(.1, L - 1) >= 0.1));
      const ans = +(P * Math.pow(.1, L - 1)).toPrecision(12);
      const cands = [ans, +(P * Math.pow(.1, L - 2)).toPrecision(12), +(P * Math.pow(.1, L)).toPrecision(12), Math.round(P * Math.pow(.9, L - 1)), P / 2];
      const opts = []; cands.forEach(v => { if (!opts.some(o => fmt(o) === fmt(v))) opts.push(v); }); const four = opts.slice(0, 4);
      const order = shuffle(four.map((_, i) => i));
      $('#bBonus').innerHTML = `<div class="check"><h4>⚡ Bonus (+20)</h4><p>The ${s.chain[0][0]} <b>${s.chain[0][1].toLowerCase()}</b> captures <b>${fmt(P)} kcal</b>. Using the 10% rule, how much energy reaches the ${s.chain[L - 1][0]} <b>${s.chain[L - 1][1].toLowerCase()}</b>?</p><div class="rush-opts">${order.map(k => `<button class="opt" data-k="${k}">${fmt(four[k])} kcal</button>`).join('')}</div><div class="fb" id="bbFb"></div></div>`;
      $$('#bBonus .opt').forEach(b => b.onclick = () => {
        $$('#bBonus .opt').forEach(x => { x.disabled = true; if (+x.dataset.k === 0) x.classList.add('right'); });
        const ok = +b.dataset.k === 0; if (!ok) b.classList.add('wrong'); if (ok) { s.score += 20; setScore(s.score); }
        const fb = $('#bbFb'); fb.className = 'fb show ' + (ok ? 'good' : 'bad');
        fb.innerHTML = `${ok ? '✅ Correct! +20.' : '❌ Not this time.'} ${fmt(P)} × 0.10 × … (${L - 1} step${L - 1 > 1 ? 's' : ''} up) = <b>${fmt(ans)} kcal</b>.<div style="margin-top:10px"><button class="btn sun" id="bNext">${s.round >= 5 ? 'See results' : 'Next round →'}</button></div>`;
        $('#bNext').onclick = next;
      });
    }
    return { start };
  })();

  // ---------- 10% Rush ----------
  const Rush = (() => {
    let s = null, timer = null;
    function makeQ() {
      const chain = pick(CHAINS.filter(c => c.length >= 4)), L = chain.length, steps = 1 + Math.floor(Math.random() * Math.min(3, L - 1));
      const start = Math.floor(Math.random() * (L - steps)), end = start + steps; let q, ans, wrong, why;
      if (Math.random() < .55) {
        const V = pick([2000, 3000, 4000, 5000, 6000, 8000, 12000, 20000, 25000, 30000, 40000, 50000, 60000, 80000]);
        ans = +(V * Math.pow(.1, steps)).toPrecision(12);
        q = `${chain[start][0]} The ${chain[start][1].toLowerCase()} level has <b>${fmt(V)} kcal</b>. How much energy reaches the ${chain[end][1].toLowerCase()} ${chain[end][0]}?`;
        wrong = [V * Math.pow(.1, steps + 1), steps > 1 ? V * Math.pow(.1, steps - 1) : V * 10, Math.round(V * Math.pow(.9, steps)), V];
        why = `Going up ${steps} level${steps > 1 ? 's' : ''}: ${fmt(V)} × 0.10${steps > 1 ? ` ${steps} times` : ''} = ${fmt(ans)} kcal.`;
      } else {
        const v = pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50]);
        ans = v * Math.pow(10, steps);
        q = `${chain[end][0]} The ${chain[end][1].toLowerCase()} level gets <b>${fmt(v)} kcal</b>. How much energy was in the ${chain[start][1].toLowerCase()} ${chain[start][0]} level?`;
        wrong = [v * Math.pow(10, steps + 1), steps > 1 ? v * Math.pow(10, steps - 1) : v / 10, Math.round(v / Math.pow(.9, steps)), v * 9 * steps];
        why = `Going down ${steps} level${steps > 1 ? 's' : ''}: ${fmt(v)} × 10${steps > 1 ? ` ${steps} times` : ''} = ${fmt(ans)} kcal.`;
      }
      const opts = [ans]; wrong.forEach(w => { w = +(+w).toPrecision(12); if (w > 0 && !opts.some(o => fmt(o) === fmt(w))) opts.push(w); });
      while (opts.length < 4) { const w = ans * (opts.length + 1); if (!opts.some(o => fmt(o) === fmt(w))) opts.push(w); else opts.push(ans * 7 + opts.length); }
      return { q, opts: opts.slice(0, 4), why };
    }
    function start() { stop(); s = { score: 0, streak: 0, right: 0, total: 0, t: 60, lock: false }; area('10% Rule Rush', 0); show(); timer = setInterval(() => { s.t -= .25; const bar = $('#rTime i'); if (bar) bar.style.width = (s.t / 60 * 100) + '%'; const tt = $('#rT'); if (tt) tt.textContent = Math.ceil(s.t) + 's'; if (s.t <= 0) { stop(); finish('rush', s.score, null, `<p>${s.right} correct out of ${s.total}</p>`); } }, 250); }
    function stop() { clearInterval(timer); timer = null; }
    function show() {
      const Q = makeQ(); s.Q = Q; s.lock = false; const order = shuffle([0, 1, 2, 3]);
      $('#gBody').innerHTML = `<div class="row"><div class="timer" id="rTime"><i style="width:${s.t / 60 * 100}%"></i></div><b id="rT">${Math.ceil(s.t)}s</b><span>🔥 streak ${s.streak}</span></div><p class="rush-q">${Q.q}</p><div class="rush-opts">${order.map(k => `<button class="opt" data-k="${k}">${fmt(Q.opts[k])} kcal</button>`).join('')}</div><div class="fb" id="rFb"></div>`;
      $$('#gBody .opt').forEach(b => b.onclick = () => {
        if (s.lock || !timer) return; s.lock = true; s.total++;
        const ok = +b.dataset.k === 0, fb = $('#rFb');
        $$('#gBody .opt').forEach(x => { if (+x.dataset.k === 0) x.classList.add('right'); });
        if (ok) { s.right++; s.streak++; const pts = 10 + (s.streak >= 3 ? 5 : 0); s.score += pts; fb.className = 'fb show good'; fb.innerHTML = `✅ +${pts}${s.streak >= 3 ? ' (streak bonus!)' : ''}`; setScore(s.score); setTimeout(() => timer && show(), 650); }
        else { b.classList.add('wrong'); s.streak = 0; fb.className = 'fb show bad'; fb.innerHTML = `❌ ${Q.why}`; setTimeout(() => timer && show(), 1900); }
      });
    }
    return { start, stop };
  })();

  // ---------- Pass it up or lose it ----------
  const Heat = (() => {
    const ITEMS = [
      ['A snake eats a mouse and gets the chemical energy stored in the mouse\'s muscles.', 1, 'Energy stored in body tissue is what gets passed up when the mouse is eaten.'],
      ['A cricket eats grass and gets the chemical energy stored in the leaves.', 1, 'The glucose and tissue in the leaves carry energy to the next level.'],
      ['A heron swallows a fish and gets the energy stored in the fish\'s body fat.', 1, 'Fat is stored chemical energy — it moves up the food chain when eaten.'],
      ['A herring eats krill, and the energy in the krill\'s bodies moves into the herring.', 1, 'Energy stored in the krill\'s bodies is passed to the next trophic level.'],
      ['A hawk flaps its wings to fly over the meadow.', 0, 'Movement uses energy — it is not stored for the next level.'],
      ['A mouse gives off body heat on a cold night.', 0, 'Body heat is energy lost to the environment.'],
      ['A rabbit sprints away from a fox.', 0, 'Running is a life process that uses up energy (and gives off heat).'],
      ['Cellular respiration in a deer\'s cells releases heat.', 0, 'Every energy transformation loses some energy as heat.'],
      ['A snake can\'t digest a mouse\'s fur and bones, so they pass out as waste.', 0, 'Waste is not passed up to the next consumer — it goes to decomposers.'],
      ['A deer\'s heart beats and its lungs breathe all day long.', 0, 'Staying alive (heartbeat, breathing) uses a lot of energy.'],
      ['A robin uses energy to build a nest and raise its chicks.', 0, 'Reproduction is a life process that uses energy.'],
      ['A cricket chirps by rubbing its wings together.', 0, 'Chirping is movement — that energy is used, not stored.']
    ];
    let s;
    function start() { s = { list: shuffle(ITEMS), i: 0, score: 0, streak: 0 }; area('Pass It Up or Lose It?', 0); show(); }
    function show() {
      if (s.i >= s.list.length) return finish('heat', s.score, s.list.length * 10);
      const it = s.list[s.i];
      $('#gBody').innerHTML = `<p class="muted">Card ${s.i + 1} of ${s.list.length} · 🔥 streak ${s.streak}</p><div class="heat-card">${it[0]}</div><div class="heat-btns"><button class="btn sun big" data-v="1">⬆ Passed up to the next level</button><button class="btn heat big" data-v="0">🔥 Used up or lost as heat</button></div><div class="fb" id="hFb"></div>`;
      $$('#gBody [data-v]').forEach(b => b.onclick = () => {
        $$('#gBody [data-v]').forEach(x => x.disabled = true);
        const ok = +b.dataset.v === it[1], fb = $('#hFb');
        if (ok) { s.score += 10; s.streak++; setScore(s.score); } else s.streak = 0;
        fb.className = 'fb show ' + (ok ? 'good' : 'bad');
        fb.innerHTML = `${ok ? '✅ Correct! +10.' : '❌ Not quite.'} ${it[2]}<div style="margin-top:10px"><button class="btn" id="hNext">${s.i + 1 >= s.list.length ? 'See results' : 'Next →'}</button></div>`;
        $('#hNext').onclick = () => { s.i++; show(); }; $('#hNext').focus();
      });
    }
    return { start };
  })();

  window.addEventListener('scoresChanged', () => { if (!$('#gameMenu').hidden) menu(); });
  return { init: menu, menu };
})();
