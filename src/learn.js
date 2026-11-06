// ================= LEARN =================
const Learn = (() => {
  const sunFig = `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" font-family="Lexend, sans-serif">
    <circle cx="55" cy="60" r="32" fill="#ffd23f"/><g stroke="#ffd23f" stroke-width="5" stroke-linecap="round">${[...Array(10)].map((_, k) => { const a = k * Math.PI / 5; return `<line x1="${(55 + 40 * Math.cos(a)).toFixed(0)}" y1="${(60 + 40 * Math.sin(a)).toFixed(0)}" x2="${(55 + 52 * Math.cos(a)).toFixed(0)}" y2="${(60 + 52 * Math.sin(a)).toFixed(0)}"/>`; }).join('')}</g>
    <text x="55" y="135" text-anchor="middle" font-size="13" fill="#5d6d72">Sun</text>
    <path d="M100,72 C140,80 160,95 180,110" stroke="#f4b41a" stroke-width="4" fill="none" stroke-dasharray="6 5"/><path d="M176,100 L186,113 L170,114Z" fill="#f4b41a"/>
    <text x="140" y="70" text-anchor="middle" font-size="12" fill="#7a5400">light energy</text>
    <path d="M200,190 C190,140 220,105 270,100 C275,150 245,185 200,190Z" fill="#4e9a4b"/><path d="M200,190 C225,160 245,135 268,103" stroke="#2e6b2b" stroke-width="3" fill="none"/>
    <line x1="200" y1="190" x2="196" y2="220" stroke="#2e6b2b" stroke-width="4"/>
    <text x="200" y="236" text-anchor="middle" font-size="12" fill="#5d6d72">producer (plant)</text>
    <g transform="translate(305 150)"><polygon points="0,-24 21,-12 21,12 0,24 -21,12 -21,-12" fill="#cfe6ff" stroke="#2c6fb5" stroke-width="3"/><text y="5" text-anchor="middle" font-size="11" fill="#1c3f66" font-weight="600">C₆H₁₂O₆</text></g>
    <path d="M262,140 L280,146" stroke="#2c6fb5" stroke-width="3"/>
    <text x="305" y="195" text-anchor="middle" font-size="12" fill="#1c3f66">glucose =</text><text x="305" y="210" text-anchor="middle" font-size="12" fill="#1c3f66">chemical energy</text>
    <rect x="12" y="160" width="150" height="58" rx="10" fill="#fff4d6"/><text x="87" y="184" text-anchor="middle" font-size="22" font-weight="700" fill="#7a5400">&lt; 1%</text><text x="87" y="205" text-anchor="middle" font-size="11" fill="#7a5400">of sunlight is used by life</text>
  </svg>`;
  const pctFig = `<svg viewBox="0 0 360 250" xmlns="http://www.w3.org/2000/svg" font-family="Lexend, sans-serif">
    <text x="180" y="22" text-anchor="middle" font-size="14" font-weight="600" fill="#154c3b">A mouse eats 100 kcal of seeds…</text>
    <rect x="20" y="40" width="320" height="34" rx="8" fill="#e2553a"/><rect x="20" y="40" width="32" height="34" rx="8" fill="#f4b41a"/>
    <text x="36" y="62" text-anchor="middle" font-size="12" font-weight="700" fill="#3a2a00">10</text><text x="200" y="62" text-anchor="middle" font-size="13" font-weight="600" fill="#fff">90 kcal used or lost</text>
    <path d="M36,78 L36,110" stroke="#f4b41a" stroke-width="4"/><path d="M28,104 L36,118 L44,104Z" fill="#f4b41a"/>
    <text x="20" y="138" font-size="12" fill="#7a5400" font-weight="600">≈10 kcal stored in its body</text><text x="20" y="154" font-size="12" fill="#7a5400">→ available to the snake</text>
    <g font-size="12" fill="#8f2727">${['🏃 movement', '❤️ breathing, heartbeat', '🍼 growth & reproduction', '🔥 body heat', '💩 waste (to decomposers)'].map((t, k) => `<text x="190" y="${108 + k * 22}">${t}</text>`).join('')}</g>
    <path d="M200,78 L200,92" stroke="#e2553a" stroke-width="3"/>
  </svg>`;
  function miniPyr(title, sub, rows, colors) {
    const w = [150, 112, 74, 36];
    return `<g><text x="0" y="0" text-anchor="middle" font-size="13" font-weight="700" fill="#154c3b">${title}</text>${rows.map((r, k) => { const i = 3 - k; return `<rect x="${-w[i] / 2}" y="${12 + k * 30}" width="${w[i]}" height="26" rx="5" fill="${colors[i]}"/><text x="0" y="${30 + k * 30}" text-anchor="middle" font-size="11" fill="${i < 2 ? '#fff' : '#3a2a00'}" font-weight="600">${r}</text>`; }).join('')}<text x="0" y="146" text-anchor="middle" font-size="11" fill="#5d6d72">${sub}</text></g>`;
  }
  const pyrFig = `<svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg" font-family="Lexend, sans-serif">
    <g transform="translate(88 14)">${miniPyr('Energy', 'kcal at each level', ['10', '100', '1,000', '10,000'], LVL_COLORS)}</g>
    <g transform="translate(260 14)">${miniPyr('Biomass', 'mass of living tissue', ['5 g', '50 g', '500 g', '5,000 g'], LVL_COLORS)}</g>
    <g transform="translate(432 14)">${miniPyr('Numbers', 'number of individuals', ['1', '20', '400', '9,000'], LVL_COLORS)}</g>
  </svg>`;

  const CARDS = [
    { t: 'Energy starts with the Sun', html: `<p>Every living thing needs a constant supply of energy to grow, move and stay alive. Almost all of that energy starts as <b>light from the Sun</b>.</p><ul><li><b>Photosynthesis</b> — plants, algae and some bacteria capture light energy and store it as <b>chemical energy</b> in glucose.<br><span class="eq">light energy + CO₂ + H₂O → glucose + O₂</span></li><li>Less than <b>1%</b> of the Sun's energy is used by living things.</li><li><b>Chemosynthesis</b> — at deep-sea vents with no sunlight, some producers make food using energy stored in chemicals.</li><li><b>Cellular respiration</b> — organisms break glucose down to release usable energy (ATP).</li></ul>`, fig: sunFig,
      q: { q: 'Bacteria at a deep-sea vent make their own food with no sunlight at all. Which process are they using?', o: ['Chemosynthesis', 'Photosynthesis', 'Cellular respiration', 'Decomposition'], why: 'Chemosynthesis uses energy stored in chemicals (inorganic compounds) instead of light.' } },
    { t: 'Producers and consumers', html: `<p><b>Producers (autotrophs)</b> capture energy from the Sun or chemicals and make their own food. <b>Consumers (heterotrophs)</b> cannot make their own food — they get energy by eating other organisms.</p><div class="type-grid">
        <div class="type"><div class="em">🌱</div><b>Producer</b><span>makes its own food<br><i>grass, trees, algae</i></span></div>
        <div class="type"><div class="em">🦌</div><b>Herbivore</b><span>eats plants<br><i>cows, deer</i></span></div>
        <div class="type"><div class="em">🦉</div><b>Carnivore</b><span>eats animals<br><i>snakes, owls</i></span></div>
        <div class="type"><div class="em">🐻</div><b>Omnivore</b><span>eats plants and animals<br><i>humans, bears</i></span></div>
        <div class="type"><div class="em">🪱</div><b>Detritivore</b><span>feeds on remains and dead matter<br><i>mites, snails, crabs, earthworms</i></span></div>
        <div class="type"><div class="em">🍄</div><b>Decomposer</b><span>breaks down dead matter at every level<br><i>bacteria, fungi</i></span></div></div>`, fig: '',
      q: { q: 'A bear eats berries, fish and insects. What kind of consumer is it?', o: ['Omnivore', 'Herbivore', 'Carnivore', 'Detritivore'], why: 'Omnivores obtain energy by eating both plants and animals — like humans and bears.' } },
    { t: 'Trophic levels & food chains', html: `<p>A <b>trophic level</b> is each feeding step in a food chain or food web. Producers are always the 1st level.</p><div class="chain">${CHAINS[0].map((o, i) => `${i ? '<span class="arr">→</span>' : ''}<div class="org"><span class="em">${o[0]}</span><b>${o[1]}</b>${ROLES[i].replace(' consumer', '<br>consumer')}<br><i>${ORD[i]} level</i></div>`).join('')}</div>
        <ul><li>Arrows point in the direction <b>energy flows</b>: from the organism eaten → to the organism that eats it.</li><li>Energy flows in <b>one direction</b>: Sun → autotrophs → heterotrophs.</li><li>A <b>food web</b> links all of the food chains in an ecosystem together.</li><li>Decomposers and detritivores break down dead matter at <b>every</b> level.</li></ul>`, fig: '',
      q: { q: 'In a food chain, which way do the arrows point?', o: ['From the organism that is eaten to the organism that eats it', 'From the predator to its prey', 'From the top predator down to the producer', 'From each organism back to the Sun'], why: 'Arrows show the direction energy flows — from the food to the eater.' } },
    { t: 'The 10% rule', html: `<p>Only about <b>10%</b> of the energy at one trophic level is passed on to the next level.</p><div class="rule-box"><div>⬆ Going <b>up</b> a level: <b>× 0.10</b> (move the decimal one place left)</div><div>⬇ Going <b>down</b> a level: <b>÷ 0.10</b> (that's the same as × 10)</div></div>
        <p class="small muted">Worked example: grass → rabbit → fox. If the fox receives 30 kcal, the rabbits had 30 × 10 = 300 kcal and the grass had 300 × 10 = 3,000 kcal.</p>
        <div class="calc"><label><b>Try it:</b> producers capture <input type="number" id="calcIn" value="10000" min="1" max="100000000"> kcal</label><div id="calcOut" class="mini-pyr"></div></div>`, fig: '', after: renderCalc,
      q: { q: 'The producers in a pond capture 50,000 kcal. How much energy is available to the primary consumers?', o: ['5,000 kcal', '500 kcal', '45,000 kcal', '50,000 kcal'], why: '50,000 × 0.10 = 5,000 kcal.' } },
    { t: 'Where does the other 90% go?', html: `<p>About <b>90%</b> of the energy at each level is <b>not</b> passed on. It is used for life processes (movement, growth, reproduction) or <b>lost as heat</b> to the environment.</p><ul><li>Every time energy changes form, some is “lost” as heat.</li><li>That is why energy flows <b>one way</b>: it enters as sunlight, passes through food chains, and leaves as heat.</li><li>Energy must be <b>constantly resupplied</b> by the Sun — but <b>matter cycles</b> (carbon, nitrogen, water) and gets reused.</li></ul>`, fig: pctFig,
      q: { q: 'A mouse eats seeds containing 100 kcal. About how much of that energy will be available to a snake that eats the mouse?', o: ['About 10 kcal', 'About 90 kcal', 'About 100 kcal', 'About 1 kcal'], why: 'Only ~10% is stored in the mouse\'s body. ~90% is used for life processes or lost as heat.' } },
    { t: 'Three kinds of ecological pyramids', html: `<p>The amount of energy or matter in an ecosystem can be shown with a pyramid.</p><ul><li><b>Energy pyramid</b> — the amount of energy available at each trophic level. Only about 10% moves up to the next level.</li><li><b>Biomass pyramid</b> — the total amount of living tissue at each level (grams per unit area). The greatest mass is at the base: most of the mass of living things is producers.</li><li><b>Pyramid of numbers</b> — the number of individual organisms at each level. It usually has the same shape: many producers, fewer consumers.</li></ul>`, fig: pyrFig,
      q: { q: 'Which pyramid shows the total amount of living tissue (in grams per area) at each trophic level?', o: ['Biomass pyramid', 'Energy pyramid', 'Pyramid of numbers', 'Food web'], why: 'Biomass = the total amount of living tissue in a trophic level.' } },
    { t: 'Why are top predators rare?', html: `<p>Because energy shrinks by about 90% at every step, there is very little energy left at the top of a pyramid.</p><ul><li>A meadow can feed thousands of mice but only a few hawks — only about 10% of the mice's energy reaches the hawks.</li><li>That is also why food chains are short: after 4 or 5 levels there is not enough energy left to support another level.</li><li>Losing producers hurts <b>every</b> level above them.</li></ul><p><button class="btn ghost" id="toLab">🔬 Test this in the Pyramid Lab →</button></p>`, fig: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" font-family="Lexend, sans-serif"><text x="180" y="22" text-anchor="middle" font-size="14" font-weight="600" fill="#154c3b">Same meadow, very different numbers</text><text x="90" y="80" text-anchor="middle" font-size="44">🦅</text><text x="90" y="110" text-anchor="middle" font-size="13" fill="#5d6d72">1 hawk</text><g font-size="18">${[...Array(40)].map((_, k) => `<text x="${190 + (k % 8) * 20}" y="${54 + Math.floor(k / 8) * 26}">🐭</text>`).join('')}</g><text x="270" y="200" text-anchor="middle" font-size="13" fill="#5d6d72">dozens of mice</text></svg>`, after: () => { const b = $('#toLab'); if (b) b.onclick = () => showTab('explore'); },
      q: { q: 'Why are there far fewer hawks than mice in a meadow?', o: ['Only about 10% of the mice\'s energy reaches the hawks, so there is only enough energy for a few hawks', 'Hawks need less energy than mice', 'Mice eat hawk eggs', 'Hawks get their energy directly from the Sun'], why: 'Energy shrinks at each step up, so the top level can only support a small number of individuals.' } }
  ];
  let idx = 0; const solved = new Set(store.get('learnSolved', []));

  function renderCalc() {
    const inp = $('#calcIn'), out = $('#calcOut'); if (!inp) return;
    const draw = () => {
      const P = Math.max(0, +inp.value || 0); const names = CHAINS[0].slice(0, 4);
      const vals = names.map((_, i) => P * Math.pow(0.1, i));
      out.innerHTML = names.map((n, i) => ({ n, i, v: vals[i] })).reverse().map(o => `<div style="width:${[100, 76, 52, 30][o.i]}%;background:${LVL_COLORS[o.i]};color:${o.i < 2 ? '#fff' : '#3a2a00'}">${n[0]} ${n[1]}: ${fmt(+o.v.toPrecision(12))} kcal</div>`).join('');
    };
    inp.addEventListener('input', draw); draw();
  }
  function renderSteps() {
    $('#learnSteps').innerHTML = CARDS.map((c, i) => `<button data-i="${i}" class="${i === idx ? 'on' : ''} ${solved.has(i) ? 'ok' : ''}"><span class="n">${solved.has(i) ? '✓' : i + 1}</span><span class="t">${c.t}</span></button>`).join('');
    $$('#learnSteps button').forEach(b => b.onclick = () => { idx = +b.dataset.i; render(); });
  }
  function render() {
    const c = CARDS[idx]; const order = shuffle([0, 1, 2, 3]);
    $('#lesson').innerHTML = `<span class="lvl-num" style="display:inline-block;background:var(--sun-l);color:#7a5400;font-weight:600;border-radius:999px;padding:2px 10px;font-size:.8rem">Card ${idx + 1} of ${CARDS.length}</span><h2 style="margin-top:6px">${c.t}</h2>
      <div class="lesson-body" style="${c.fig ? '' : 'grid-template-columns:1fr'}"><div>${c.html}</div>${c.fig ? `<div class="fig">${c.fig}</div>` : ''}</div>
      <div class="check"><h4>✏️ Quick check</h4><p>${c.q.q}</p><div class="opts">${optsHTML(c.q.o, order)}</div><div class="fb" id="lfb"></div></div>
      <div class="lesson-nav"><button class="btn ghost" id="lPrev" ${idx === 0 ? 'disabled' : ''}>← Back</button><button class="btn" id="lNext">${idx === CARDS.length - 1 ? 'Go to Pyramid Lab →' : 'Next card →'}</button></div>`;
    $$('#lesson .opt').forEach(b => b.onclick = () => {
      const k = +b.dataset.k, fb = $('#lfb');
      if (k === 0) {
        $$('#lesson .opt').forEach(x => x.disabled = true); b.classList.add('right');
        fb.className = 'fb show good'; fb.innerHTML = `✅ <b>Correct!</b> ${c.q.why}`;
        if (!solved.has(idx)) { solved.add(idx); store.set('learnSolved', [...solved]); addXP(10, 'quick check'); renderSteps(); if (solved.size === CARDS.length) { markDone('learn'); addXP(25, 'all cards done'); } }
      } else { b.classList.add('wrong'); b.disabled = true; fb.className = 'fb show bad'; fb.innerHTML = '❌ Not quite — re-read the card and try again.'; shakeEl(fb); }
    });
    $('#lPrev').onclick = () => { idx--; render(); window.scrollTo({ top: 0 }); };
    $('#lNext').onclick = () => { if (idx === CARDS.length - 1) showTab('explore'); else { idx++; render(); window.scrollTo({ top: 0 }); } };
    if (c.after) c.after();
    renderSteps();
  }
  return { init: render };
})();
