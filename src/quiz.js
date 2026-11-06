// ================= QUIZ =================
const Quiz = (() => {
  // first option is always the correct one; options are shuffled when shown
  const BANK = [
    ['Which level of organization is a group of organisms of the same species living in the same place at the same time?', ['Population', 'Community', 'Ecosystem', 'Organism'], 'A population is one species in one place at one time. A community has many interacting populations.'],
    ['Which list is in order from SMALLEST to LARGEST?', ['Quark → atom → molecule → cell', 'Atom → quark → cell → molecule', 'Cell → molecule → atom → quark', 'Molecule → atom → quark → cell'], 'Quarks build subatomic particles, which build atoms, which bond into molecules, which make up cells.'],
    ['The stomach is an example of which level of organization?', ['Organ', 'Tissue', 'System', 'Cell'], 'An organ is made of different kinds of tissues working together for one function.'],
    ['What makes an ecosystem different from a community?', ['An ecosystem includes the non-living (abiotic) parts of the environment', 'An ecosystem has only one species', 'An ecosystem has only producers', 'An ecosystem is smaller than a population'], 'Ecosystem = living communities interacting with non-living parts like sunlight, water and soil.'],
    ['Protons and neutrons are made of smaller particles called…', ['Quarks', 'Atoms', 'Molecules', 'Cells'], 'Quarks are the smallest bits of matter known to science. A proton is 2 up quarks + 1 down quark.'],
    ['A group of cells of the same kind, like muscle or nerve cells, is called a(n)…', ['Tissue', 'Organ', 'System', 'Population'], 'A tissue is a collection of cells of the same kind.'],
    ['Almost all of the energy in living things originally comes from…', ['The Sun', 'The soil', 'Water', 'Decomposers'], 'Producers capture light energy from the Sun and store it as chemical energy in glucose.'],
    ['Organisms that capture energy and make their own food are called…', ['Producers (autotrophs)', 'Consumers (heterotrophs)', 'Detritivores', 'Carnivores'], 'Producers (autotrophs) make their own food, usually by photosynthesis.'],
    ['A bear eats berries, fish and insects. A bear is a(n)…', ['Omnivore', 'Herbivore', 'Carnivore', 'Producer'], 'Omnivores obtain energy by eating both plants and animals.'],
    ['In a food chain, the arrows point…', ['In the direction energy flows, from the organism eaten to the organism that eats it', 'From the predator to its prey', 'From the top predator down to the producer', 'Back toward the Sun'], 'Arrows always show the direction energy flows.'],
    ['In the food chain grass → cricket → mouse → snake → hawk, the snake is the…', ['Tertiary consumer (4th trophic level)', 'Secondary consumer (3rd trophic level)', 'Primary consumer (2nd trophic level)', 'Quaternary consumer (5th trophic level)'], 'Grass (1st), cricket (2nd), mouse (3rd), snake (4th, tertiary), hawk (5th, quaternary).'],
    ['About what percent of the energy at one trophic level is passed on to the next level?', ['10%', '90%', '50%', '1%'], 'Only about 10% is passed on — this is the 10% rule.'],
    ['The producers in a pond capture 50,000 kcal of energy. How much energy is available to the SECONDARY consumers?', ['500 kcal', '5,000 kcal', '50 kcal', '45,000 kcal'], '50,000 × 0.10 = 5,000 (primary) → 5,000 × 0.10 = 500 kcal (secondary).'],
    ['In the food chain grass → rabbit → fox, the fox receives 30 kcal. How much energy did the grass contain?', ['3,000 kcal', '300 kcal', '30,000 kcal', '3 kcal'], 'Going down, multiply by 10 each step: 30 → 300 (rabbit) → 3,000 kcal (grass).'],
    ['A hawk (tertiary consumer) gets 6 kcal from its food. How much energy was in the producer level of its food chain?', ['6,000 kcal', '600 kcal', '60 kcal', '60,000 kcal'], '6 → 60 (secondary) → 600 (primary) → 6,000 kcal (producers).'],
    ['What happens to most (about 90%) of the energy at each trophic level?', ['It is used for life processes or lost as heat', 'It is stored in the top predator forever', 'It is recycled back to the producers', 'It is passed on to the next level'], 'About 90% is used for movement, growth, reproduction and other life processes, or lost as heat.'],
    ['Which ecological pyramid shows the total amount of living tissue at each trophic level?', ['Biomass pyramid', 'Energy pyramid', 'Pyramid of numbers', 'Food web'], 'Biomass is the total amount of living tissue in a trophic level (grams per unit area).'],
    ['Why are there far fewer hawks than mice in a meadow?', ['Only about 10% of the mice\'s energy reaches the hawks, so there is only enough energy for a few hawks', 'Hawks reproduce faster than mice', 'Hawks do not need energy to survive', 'Mice get their energy from the hawks'], 'Energy shrinks at every step up the pyramid, so the top can support only a few individuals.'],
    ['Energy flows ______ through an ecosystem, while matter ______.', ['one way; cycles', 'in a cycle; flows one way', 'one way; also flows one way', 'in a cycle; also cycles'], 'Energy enters as sunlight and leaves as heat, so it must be resupplied. Matter is recycled.'],
    ['Bacteria at deep-sea vents make food without sunlight. This process is called…', ['Chemosynthesis', 'Photosynthesis', 'Cellular respiration', 'Decomposition'], 'Chemosynthesis uses energy stored in chemicals instead of light.']
  ];
  let s = null;
  function startScreen() {
    const last = store.get('quizLast', null);
    $('#quizBox').innerHTML = `<h3>Before you start</h3><label class="f" for="qName">Your name</label><input class="t" id="qName" placeholder="First and last name" value="${esc(store.get('quizName', ''))}"><label class="f" for="qPer">Class period (optional)</label><input class="t" id="qPer" placeholder="e.g. Period 3" value="${esc(store.get('quizPer', ''))}">
      <p class="muted small" style="margin-top:12px">Tip: finish the Learn cards and the Pyramid Lab first. You can go back and change answers before you submit.</p>
      <div class="row" style="margin-top:12px"><button class="btn sun big" id="qStart">Start quiz →</button>${last ? `<span class="muted small">Last score: ${last.right}/${last.total}</span>` : ''}</div><div class="fb" id="qsFb"></div>`;
    $('#qStart').onclick = () => {
      const name = $('#qName').value.trim(); if (!name) { const fb = $('#qsFb'); fb.className = 'fb show bad'; fb.textContent = 'Please type your name first.'; shakeEl(fb); return; }
      store.set('quizName', name); store.set('quizPer', $('#qPer').value.trim());
      s = { name, per: $('#qPer').value.trim(), qs: shuffle(BANK.map((b, i) => ({ i, b, order: shuffle([0, 1, 2, 3]) }))), ans: {}, cur: 0, t0: Date.now() };
      show();
    };
  }
  function show() {
    const n = s.qs.length, q = s.qs[s.cur], a = s.ans[s.cur];
    const answered = Object.keys(s.ans).length;
    $('#quizBox').innerHTML = `<div class="row" style="justify-content:space-between"><b>Question ${s.cur + 1} of ${n}</b><span class="muted small">${answered} answered</span></div><div class="qprog"><i style="width:${answered / n * 100}%"></i></div>
      <p class="qtext">${q.b[0]}</p><div class="opts">${q.order.map(k => `<button class="opt ${a === k ? 'sel' : ''}" data-k="${k}">${q.b[1][k]}</button>`).join('')}</div>
      <div class="lesson-nav"><button class="btn ghost" id="qPrev" ${s.cur === 0 ? 'disabled' : ''}>← Back</button>${s.cur < n - 1 ? `<button class="btn" id="qNext" ${a == null ? 'disabled' : ''}>Next →</button>` : `<button class="btn sun" id="qSubmit" ${answered < n ? 'disabled' : ''}>Submit quiz ✓</button>`}</div>
      ${s.cur === n - 1 && answered < n ? `<p class="small muted" style="text-align:right">Answer every question to submit (${n - answered} left).</p>` : ''}`;
    $$('#quizBox .opt').forEach(b => b.onclick = () => { s.ans[s.cur] = +b.dataset.k; if (s.cur < n - 1) { show(); setTimeout(() => { s.cur++; show(); }, 220); } else show(); });
    $('#qPrev').onclick = () => { s.cur--; show(); };
    const nx = $('#qNext'); if (nx) nx.onclick = () => { s.cur++; show(); };
    const sb = $('#qSubmit'); if (sb) sb.onclick = submit;
  }
  function submit() {
    const n = s.qs.length; let right = 0; const missed = [];
    s.qs.forEach((q, k) => { if (s.ans[k] === 0) right++; else missed.push(k + 1); });
    const pct = Math.round(right / n * 100), mins = Math.max(1, Math.round((Date.now() - s.t0) / 60000));
    const when = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    store.set('quizLast', { right, total: n }); markDone('quiz'); addXP(right * 5, 'quiz');
    const summary = `Energy & Ecology Gizmo — Quiz Results\nName: ${s.name}${s.per ? '\nClass: ' + s.per : ''}\nScore: ${right}/${n} (${pct}%)\nMissed: ${missed.length ? missed.map(m => 'Q' + m).join(', ') : 'none'}\nTime: about ${mins} min\nSubmitted: ${when}`;
    $('#quizBox').innerHTML = `<div class="end-card"><p class="muted">${esc(s.name)}${s.per ? ' · ' + esc(s.per) : ''}</p><div class="score-big">${right}/${n}</div><p style="font-size:1.2rem;font-weight:600">${pct}% — ${pct >= 90 ? '🌟 Excellent!' : pct >= 75 ? '👍 Good job!' : pct >= 60 ? '📘 Getting there — review the misses below.' : '💪 Review the Learn cards and try again.'}</p><p class="small muted">${when}</p>
      <div class="row" style="justify-content:center"><button class="btn" id="qCopy">📋 Copy my results</button><button class="btn ghost" id="qRetake">↺ Retake quiz</button></div><div class="fb" id="qcFb"></div>
      <p class="small muted">Turn in your results the way your teacher asks — paste them into Google Classroom or show this screen.</p></div>
      <div class="review"><h3>Review your answers</h3>${s.qs.map((q, k) => { const ok = s.ans[k] === 0; return `<div class="rv ${ok ? 'ok' : 'no'}"><b>${k + 1}. ${q.b[0]}</b><br>${ok ? '✅' : '❌'} Your answer: ${q.b[1][s.ans[k]]}${ok ? '' : `<br>✔️ Correct answer: <b>${q.b[1][0]}</b>`}<br><span class="muted">${q.b[2]}</span></div>`; }).join('')}</div>`;
    $('#qCopy').onclick = async () => {
      const fb = $('#qcFb');
      try { await navigator.clipboard.writeText(summary); fb.className = 'fb show good'; fb.textContent = '✅ Copied! Paste it where your teacher asks.'; }
      catch (e) { fb.className = 'fb show bad'; fb.innerHTML = 'Your browser blocked copying. Select and copy this text:<pre style="white-space:pre-wrap;user-select:all;background:#fff;padding:8px;border-radius:8px;margin:8px 0 0">' + esc(summary) + '</pre>'; }
    };
    $('#qRetake').onclick = startScreen;
    $('#quizBox').scrollIntoView({ block: 'start' });
  }
  return { init: startScreen };
})();
