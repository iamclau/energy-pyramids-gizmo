// ================= PYRAMID LAB =================
const Lab = (() => {
  const ECOS = {
    meadow: { name: 'Meadow', orgs: CHAINS[0], need: [10, 20, 200, 300, 100] },
    pond: { name: 'Pond', orgs: CHAINS[1], need: [1, 2, 50, 100, 50] },
    ocean: { name: 'Ocean', orgs: CHAINS[2], need: [1, 1, 100, 250, 100] }
  };
  const PLURAL = { Mouse: 'mice', Bass: 'bass', Herring: 'herring', Krill: 'krill', Zooplankton: 'zooplankton', Grass: 'grass plants', Algae: 'algae', Phytoplankton: 'phytoplankton', Minnow: 'minnows', Cricket: 'crickets', Snake: 'snakes', Hawk: 'hawks', Heron: 'herons', Seal: 'seals', Orca: 'orcas' };
  const DEF = { eco: 'meadow', P: 1000000, eff: 10, n: 5, type: 'energy', scale: 'true' };
  const st = Object.assign({}, DEF);
  const W = 640, BOT = 404, TOP = 16, CX = 330, MAXW = 300;
  let geom = [], parts = [], running = false, spawnLeft = 0, spawnAcc = 0, lastT = 0, counts = [], heat = 0, pool = [];

  function rows() {
    const e = ECOS[st.eco]; const out = [];
    for (let i = 0; i < st.n; i++) {
      const E = +(st.P * Math.pow(st.eff / 100, i)).toPrecision(12);
      out.push({ i, emoji: e.orgs[i][0], name: e.orgs[i][1], E, B: E / 4, pop: Math.floor(E / e.need[i] + 1e-9) });
    }
    out.forEach((r, i) => r.lost = i < out.length - 1 ? out[i + 1] ? r.E - out[i + 1].E : null : null);
    return out;
  }
  const mass = g => g >= 1000 ? fmt(g / 1000) + ' kg' : fmt(g) + ' g';
  function valOf(r) { return st.type === 'energy' ? r.E : st.type === 'biomass' ? r.B : r.pop; }
  function labelOf(r) { return st.type === 'energy' ? fmt(r.E) + ' kcal' : st.type === 'biomass' ? mass(r.B) : fmt(r.pop) + (r.pop === 0 ? ' — none!' : ''); }

  function draw() {
    const R = rows(), n = R.length, gap = 8, bh = Math.min(66, (BOT - TOP - (n - 1) * gap) / n);
    const vals = R.map(valOf), vmax = Math.max(...vals), pos = vals.filter(v => v > 0);
    const lmax = Math.log10(vmax), lo = Math.log10(Math.min(...pos)) - 0.6;
    geom = R.map((r, i) => {
      const v = vals[i]; let w = 0;
      if (v > 0) w = st.scale === 'true' ? Math.max(2, MAXW * v / vmax) : MAXW * (Math.log10(v) - lo) / Math.max(1e-9, lmax - lo);
      const y = BOT - (i + 1) * bh - i * gap; return { w, y, h: bh, yc: y + bh / 2, cx: CX };
    });
    let s = `<defs><linearGradient id="pyrShine" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
    s += `<line x1="${CX}" y1="${TOP - 6}" x2="${CX}" y2="${BOT}" stroke="#d6e2dc" stroke-dasharray="4 5"/>`;
    R.forEach((r, i) => {
      const g = geom[i], small = g.h < 40;
      s += `<rect x="${(CX - g.w / 2).toFixed(1)}" y="${g.y.toFixed(1)}" width="${g.w.toFixed(1)}" height="${g.h.toFixed(1)}" rx="6" fill="${LVL_COLORS[i]}"/><rect x="${(CX - g.w / 2).toFixed(1)}" y="${g.y.toFixed(1)}" width="${g.w.toFixed(1)}" height="${(g.h / 2).toFixed(1)}" rx="6" fill="url(#pyrShine)"/>`;
      if (g.w === 0) s += `<line x1="${CX - 20}" y1="${g.yc}" x2="${CX + 20}" y2="${g.yc}" stroke="#d64545" stroke-width="2" stroke-dasharray="4 3"/>`;
      s += `<text x="8" y="${(g.yc + (small ? 5 : -2)).toFixed(1)}" font-size="${small ? 14 : 15}" font-weight="600" fill="#1c2b2f">${r.emoji} ${r.name}</text>`;
      if (!small) s += `<text x="8" y="${(g.yc + 16).toFixed(1)}" font-size="11.5" fill="#5d6d72">${ORD[i]} · ${ROLES[i]}</text>`;
      const red = st.type === 'numbers' && r.pop === 0;
      s += `<text x="486" y="${(g.yc + (st.type === 'energy' && r.lost != null && !small ? -2 : 5)).toFixed(1)}" font-size="14" font-weight="700" fill="${red ? '#d64545' : '#154c3b'}">${labelOf(r)}</text>`;
      if (st.type === 'energy' && r.lost != null) s += small ? '' : `<text x="486" y="${(g.yc + 15).toFixed(1)}" font-size="11.5" fill="#e2553a">🔥 ${fmt(r.lost)} used/lost</text>`;
    });
    s += `<text x="${CX}" y="430" text-anchor="middle" font-size="13" fill="#7a5400">☀️ sunlight → producers</text><g id="pg"></g>`;
    $('#pyrSvg').innerHTML = s; pool = [];
    // status
    const top = R[n - 1], pct = Math.pow(st.eff / 100, n - 1) * 100, plural = PLURAL[top.name] || top.name.toLowerCase() + 's';
    const box = $('#labStatus');
    if (top.pop >= 1) { box.className = 'status ok'; box.innerHTML = `✅ This ${ECOS[st.eco].name.toLowerCase()} has enough energy at the top to support about <b>${fmt(top.pop)}</b> ${top.pop === 1 ? top.name.toLowerCase() : plural}. Only <b>${fmt(+pct.toPrecision(6))}%</b> of the producers' energy reaches the ${ORD[n - 1]} trophic level.`; }
    else { box.className = 'status warn'; box.innerHTML = `⚠️ <b>Not enough energy to support even one ${top.name.toLowerCase()}!</b> Only ${fmt(top.E)} kcal (${fmt(+pct.toPrecision(6))}% of the producers' energy) reaches the top level. This is why food chains rarely have more than 4–5 levels.`; }
    // table
    $('#dataTable').innerHTML = `<thead><tr><th>Level</th><th>Organism</th><th>Role</th><th class="num">Energy (kcal)</th><th class="num">Used / lost as heat</th><th class="num">Biomass</th><th class="num">Population (est.)</th></tr></thead><tbody>${R.map(r => `<tr><td>${ORD[r.i]}</td><td>${r.emoji} ${r.name}</td><td>${ROLES[r.i]}</td><td class="num">${fmt(r.E)}</td><td class="num">${r.lost == null ? 'all (top level)' : fmt(r.lost)}</td><td class="num">${mass(r.B)}</td><td class="num" style="${r.pop === 0 ? 'color:#d64545;font-weight:700' : ''}">${fmt(r.pop)}</td></tr>`).join('')}</tbody>`;
    if (!running) $('#flowReadout').textContent = 'Press “Run energy flow” to send 300 packets of energy into the producers.';
  }

  // ---------- particles ----------
  function decide(p) { p.t = 0; p.stay = .2 + Math.random() * .35; p.next = p.lvl < st.n - 1 && Math.random() < st.eff / 100 ? 'up' : 'heat'; }
  function spawn() { const g = geom[0]; const p = { lvl: 0, x: g.cx + (Math.random() - .5) * Math.max(g.w, 12) * .9, y: g.yc + (Math.random() - .5) * g.h * .6, state: 'stay', o: 1 }; decide(p); counts[0]++; parts.push(p); }
  function run() {
    if (running) { stop(); return; }
    parts = []; counts = new Array(st.n).fill(0); heat = 0; spawnLeft = 300; spawnAcc = 0; running = true;
    $('#runFlow').textContent = '■ Stop'; lastT = performance.now(); requestAnimationFrame(tick);
  }
  function stop() { running = false; parts = []; $('#runFlow').textContent = '▶ Run energy flow'; paint(); }
  function tick(now) {
    if (!running) return;
    const dt = Math.min(.05, (now - lastT) / 1000); lastT = now;
    spawnAcc += dt; while (spawnAcc > .016 && spawnLeft > 0) { spawn(); spawnLeft--; spawnAcc -= .016; }
    for (const p of parts) {
      p.t += dt;
      if (p.state === 'stay') {
        p.x += (Math.random() - .5) * 0.6;
        if (p.t >= p.stay) {
          if (p.next === 'up') { const g = geom[p.lvl + 1]; p.state = 'move'; p.fx = p.x; p.fy = p.y; p.tx = g.cx + (Math.random() - .5) * Math.max(g.w, 6) * .8; p.ty = g.yc + (Math.random() - .5) * g.h * .5; p.t = 0; p.dur = .55; }
          else { p.state = 'heat'; p.vx = (p.x < CX ? -1 : 1) * (70 + Math.random() * 90); p.vy = -15 - Math.random() * 35; p.t = 0; heat++; }
        }
      } else if (p.state === 'move') {
        const k = Math.min(1, p.t / p.dur), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        p.x = p.fx + (p.tx - p.fx) * e; p.y = p.fy + (p.ty - p.fy) * e;
        if (k >= 1) { p.lvl++; counts[p.lvl]++; p.state = 'stay'; decide(p); }
      } else { p.x += p.vx * dt; p.y += p.vy * dt; p.o = Math.max(0, 1 - p.t / 1.1); }
    }
    parts = parts.filter(p => !(p.state === 'heat' && p.o <= 0));
    paint();
    const R = rows();
    $('#flowReadout').innerHTML = `Energy packets reaching each level: ${R.map((r, i) => `${r.emoji} <b>${counts[i]}</b>`).join(' → ')} · 🔥 <b style="color:#e2553a">${heat}</b> used/lost as heat`;
    if (spawnLeft === 0 && parts.length === 0) { running = false; $('#runFlow').textContent = '▶ Run again'; return; }
    requestAnimationFrame(tick);
  }
  function paint() {
    const pg = $('#pg'); if (!pg) return;
    while (pool.length < parts.length) { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', '3.2'); pg.appendChild(c); pool.push(c); }
    pool.forEach((c, k) => {
      const p = parts[k];
      if (!p) { c.setAttribute('display', 'none'); return; }
      c.removeAttribute('display'); c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1));
      c.setAttribute('fill', p.state === 'heat' ? '#e2553a' : '#f4b41a'); c.setAttribute('opacity', p.o.toFixed(2));
      c.setAttribute('stroke', p.state === 'heat' ? 'none' : '#b37f00'); c.setAttribute('stroke-width', '.6');
    });
  }

  // ---------- controls ----------
  function seg(el, opts, key, after) {
    el.innerHTML = opts.map(([v, t]) => `<button data-v="${v}" class="${String(st[key]) === String(v) ? 'on' : ''}">${t}</button>`).join('');
    $$('button', el).forEach(b => b.onclick = () => { st[key] = typeof DEF[key] === 'number' ? +b.dataset.v : b.dataset.v; $$('button', el).forEach(x => x.classList.toggle('on', x === b)); changed(); if (after) after(); });
  }
  const nice = x => { const p = Math.pow(10, Math.floor(Math.log10(x))); return Math.round(Math.round(x / p * 10) / 10 * p); };
  function changed() { if (running) stop(); draw(); }
  function syncInputs() {
    $('#ecoSel').value = st.eco; $('#pNum').value = st.P; $('#pSlider').value = Math.log10(st.P);
    $('#effSlider').value = st.eff; $('#effOut').textContent = st.eff + '%';
    seg($('#typeSeg'), [['energy', '⚡ Energy'], ['biomass', '⚖️ Biomass'], ['numbers', '🔢 Numbers']], 'type');
    seg($('#scaleSeg'), [['true', 'True scale'], ['log', 'Log scale (easier to see)']], 'scale');
    seg($('#nSeg'), [[3, '3'], [4, '4'], [5, '5']], 'n');
  }

  // ---------- lab challenges ----------
  const TASKS = [
    { q: 'Set the producers to <b>50,000 kcal</b> at <b>10%</b>. How much energy reaches the <b>primary consumers</b>?', type: 'num', a: 5000, unit: 'kcal', hint: 'Look at the 2nd level of the pyramid (× 0.10 once).' },
    { q: 'Meadow, 5 levels, 10%: what is the <b>smallest</b> producer energy that still supports at least <b>1 hawk</b>? Lower the producer energy and watch the message under the pyramid.', type: 'num', a: 1000000, unit: 'kcal', hint: 'Try lowering the producer energy a little at a time. When does the hawk disappear?' },
    { q: 'Meadow, 5 levels, 1,000,000 kcal. Change the efficiency from 10% to <b>5%</b>. What happens to the hawks?', type: 'mc', o: ['There is no longer enough energy to support a hawk', 'The number of hawks doubles', 'Nothing changes', 'The hawks get more energy'] },
    { q: 'Switch to the <b>Numbers</b> pyramid. Which trophic level has the most individuals?', type: 'mc', o: ['Producers', 'Primary consumers', 'Secondary consumers', 'The top predator'] },
    { q: 'Compare <b>True scale</b> and <b>Log scale</b>. Why is the top of the true-scale pyramid so hard to see?', type: 'mc', o: ['Each level has only about 10% of the energy of the level below it, so the top is tiny', 'The top predator is not part of the pyramid', 'The pyramid is upside down', 'Energy increases as you go up'] }
  ];
  const done = new Set(store.get('labDone', []));
  function renderTasks() {
    $('#labTasks').innerHTML = TASKS.map((t, i) => `<div class="task ${done.has(i) ? 'ok' : ''}" data-i="${i}"><div><span class="tn">${done.has(i) ? '✅' : '🔬'} ${i + 1}.</span> ${t.q}</div>
      ${done.has(i) ? '' : t.type === 'num' ? `<div class="row" style="margin-top:8px"><input type="text" inputmode="numeric" placeholder="your answer"> ${t.unit} <button class="btn" data-check>Check</button></div>` : `<div class="opts">${optsHTML(t.o, t.order || (t.order = shuffle([0, 1, 2, 3])))}</div>`}
      <div class="fb"></div></div>`).join('');
    $$('#labTasks .task').forEach(el => {
      const i = +el.dataset.i, t = TASKS[i], fb = $('.fb', el);
      const ok = () => { done.add(i); store.set('labDone', [...done]); addXP(10, 'lab challenge'); if (done.size === TASKS.length) { markDone('explore'); addXP(25, 'all lab challenges'); } renderTasks(); };
      const bad = msg => { fb.className = 'fb show bad'; fb.innerHTML = msg; shakeEl(fb); };
      const btn = $('[data-check]', el);
      if (btn) { const inp = $('input', el); const go = () => { const v = +String(inp.value).replace(/[,\s]/g, ''); if (v === t.a) ok(); else bad('❌ Not yet. ' + t.hint); }; btn.onclick = go; inp.onkeydown = e => { if (e.key === 'Enter') go(); }; }
      $$('.opt', el).forEach(b => b.onclick = () => { if (+b.dataset.k === 0) ok(); else { b.classList.add('wrong'); b.disabled = true; bad('❌ Not quite — try it in the simulation and look again.'); } });
    });
  }

  function init() {
    $('#ecoSel').innerHTML = Object.entries(ECOS).map(([k, e]) => `<option value="${k}">${e.name}: ${e.orgs.map(o => o[1]).join(' → ')}</option>`).join('');
    $('#ecoSel').onchange = e => { st.eco = e.target.value; changed(); };
    $('#pSlider').oninput = e => { st.P = nice(Math.pow(10, +e.target.value)); $('#pNum').value = st.P; changed(); };
    $('#pNum').onchange = e => { st.P = clamp(Math.round(+e.target.value || DEF.P), 1000, 1000000); e.target.value = st.P; $('#pSlider').value = Math.log10(st.P); changed(); };
    $('#effSlider').oninput = e => { st.eff = +e.target.value; $('#effOut').textContent = st.eff + '%'; changed(); };
    $('#labReset').onclick = () => { Object.assign(st, DEF); syncInputs(); changed(); };
    $('#runFlow').onclick = run;
    syncInputs(); draw(); renderTasks();
  }
  return { init };
})();
