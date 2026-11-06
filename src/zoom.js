// ================= ZOOM: Earth → quark =================
const Zoom = (() => {
  const LEVELS = [
    { name: 'Ecosphere', num: 14, color: '#1d4f8f', def: 'A collection of all the ecosystems of the world.', ex: 'Planet Earth — all of its land, water, air and life together.', size: '≈ 12,700 km across (Earth)', energy: 'Nearly all of the energy for life arrives as sunlight. Less than 1% of it is captured by living things.' },
    { name: 'Biosphere', num: 13, color: '#2464a3', def: 'A collection of all the communities on planet Earth.', ex: 'The thin layer of life that reaches from about 8 km above the surface to 11 km below it (deep-sea vents).', size: '≈ 20 km thick layer of life', energy: 'Producers on land and in the ocean capture sunlight (photosynthesis). Some at deep-sea vents use chemicals instead (chemosynthesis).' },
    { name: 'Ecosystem', num: 12, color: '#2f7fc1', def: 'Living communities interacting with the non-living parts of the environment.', ex: 'A meadow and pond: plants and animals (biotic) plus sunlight, water, rocks and soil (abiotic).', size: '≈ 1 km', energy: 'Energy flows ONE way through an ecosystem (sunlight → food chains → heat), while matter cycles.' },
    { name: 'Community', num: 11, color: '#2a8a6e', def: 'Collections of populations that are interacting with one another.', ex: 'Grass, crickets, mice, snakes and hawks all living in the same meadow.', size: '≈ 50 m', energy: 'Feeding relationships (food chains and food webs) pass energy from one population to the next.' },
    { name: 'Population', num: 10, color: '#3f9b4f', def: 'A group of organisms of the same kind living together in the same place, at the same time.', ex: 'All of the field mice in one meadow. (Species = organisms so similar they can breed and produce fertile offspring.)', size: '≈ 5 m', energy: 'A population can only grow as large as the energy at its trophic level allows.' },
    { name: 'Organism', num: 9, color: '#6aa83a', def: 'A collection of systems that work together.', ex: 'One field mouse.', size: '≈ 10 cm', energy: 'The mouse uses most of the energy it eats to move, breathe and stay warm. Only about 10% is stored in its body for the next level.' },
    { name: 'System', num: 8, color: '#93a72f', def: 'A collection of organs that work together to perform a common function.', ex: 'The digestive system: esophagus, stomach, liver and intestines.', size: '≈ 5 cm', energy: 'The digestive system breaks food down so its chemical energy can reach every cell.' },
    { name: 'Organ', num: 7, color: '#c29a26', def: 'A collection of tissues of different kinds working together to perform a common function.', ex: 'The stomach (muscle, nerve and lining tissues working together).', size: '≈ 1 cm', energy: 'Stomach muscles churn food — using energy and giving off heat.' },
    { name: 'Tissue', num: 6, color: '#d9862a', def: 'A collection of cells of the same kind.', ex: 'Muscle tissue, nerve tissue, fat tissue, stomach lining.', size: '≈ 0.1 mm', energy: 'Fat tissue stores chemical energy. Muscle tissue turns chemical energy into motion (and heat).' },
    { name: 'Cell', num: 5, color: '#d9622f', def: 'A collection of molecules that forms the basic structure and function of life — the basic unit of life.', ex: 'Red blood cells, white blood cells, bone cells (osteocytes).', size: '≈ 0.01 mm (10 micrometers)', energy: 'Mitochondria break down glucose in cellular respiration to release usable energy (ATP) — and some heat.' },
    { name: 'Molecule', num: 4, color: '#c94660', def: 'A collection of atoms that are chemically bonded together.', ex: 'Glucose (C₆H₁₂O₆), carbon dioxide (CO₂).', size: '≈ 1 nanometer (0.000000001 m)', energy: 'Chemical energy is stored in the bonds between atoms. Glucose is the fuel made by photosynthesis.' },
    { name: 'Atom', num: 3, color: '#a24a9a', def: 'A collection of subatomic particles.', ex: 'Carbon (C), hydrogen (H), oxygen (O).', size: '≈ 0.15 nanometers', energy: 'Electrical energy is the energy of moving electrons, like the ones around this carbon atom.' },
    { name: 'Subatomic particles', num: 2, color: '#7a4bb0', def: 'A collection of quarks.', ex: 'Protons (+), neutrons (no charge) and electrons (−).', size: '≈ 0.000000000000005 m (a carbon nucleus)', energy: 'Nuclear energy is stored in the nucleus, where protons and neutrons are packed tightly together.', fun: 'Protons and neutrons are made of quarks. Electrons are different — scientists think they are fundamental particles with nothing smaller inside.' },
    { name: 'Quarks', num: 1, color: '#5a3ea8', def: 'The smallest bits of matter known to science at this time.', ex: 'A proton = 2 “up” quarks + 1 “down” quark. A neutron = 1 up + 2 down.', size: 'smaller than 0.000000000000000001 m', energy: 'Quarks are held together by the strong force — the strongest force in nature.' }
  ];
  const CLUES = [
    ['All of the ecosystems of the world put together.', 'The whole planet: land, water, air and life.'],
    ['All of the communities on planet Earth.', 'The thin layer of life from about 8 km up to 11 km down.'],
    ['Living communities PLUS the non-living parts: sunlight, water, rocks, soil.', 'Biotic and abiotic factors interacting.'],
    ['Different populations interacting — grass, crickets, mice, snakes and hawks together.', 'Several species living and interacting in one place.'],
    ['A group of the SAME species living in the same place at the same time.', 'All of the field mice in one meadow.'],
    ['One single living thing made of systems working together.', 'One field mouse.'],
    ['Organs working together for one job — like digesting food.', 'Esophagus + stomach + liver + intestines.'],
    ['Different kinds of tissues working together — like the stomach.', 'A heart, a lung, a stomach.'],
    ['A group of cells of the same kind.', 'Muscle, nerve or fat ____.'],
    ['The basic unit of life.', 'Red blood cells and bone cells are examples.'],
    ['Atoms chemically bonded together — like glucose.', 'C₆H₁₂O₆ or CO₂.'],
    ['Made of protons, neutrons and electrons — like carbon.', 'H, O and C are examples.'],
    ['A collection of quarks: protons and neutrons.', 'Particles found inside the nucleus.'],
    ['The smallest bits of matter known to science.', 'Up and down are two kinds of these.']
  ];
  const N = LEVELS.length;

  // ---------- art helpers ----------
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const BG = f => `<rect x="-4500" y="-4500" width="10000" height="10000" fill="${f}"/>`;
  const target = (r, cx = 500, cy = 500) => `<circle class="ztarget" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#ffd84a" stroke-width="5" stroke-dasharray="12 9"/>`;
  function tag(x, y, text, o = {}) {
    const fs = o.fs || 22; const w = text.length * fs * 0.55 + 26; const a = o.anchor || 'middle';
    const rx = a === 'middle' ? x - w / 2 : a === 'start' ? x - 13 : x - w + 13;
    return `<g><rect x="${rx.toFixed(1)}" y="${(y - fs * 0.98).toFixed(1)}" width="${w.toFixed(1)}" height="${(fs * 1.5).toFixed(1)}" rx="${(fs * 0.75).toFixed(1)}" fill="${o.bg || 'rgba(255,255,255,.9)'}"/><text x="${x}" y="${y}" font-size="${fs}" text-anchor="${a}" fill="${o.color || '#1c2b2f'}" font-family="Lexend, sans-serif" font-weight="500">${text}</text></g>`;
  }
  function mouse(x, y, s, flip = false, body = '#9b7b60') {
    const sx = flip ? -s : s;
    return `<g transform="translate(${x} ${y}) scale(${sx} ${s})"><path d="M48,8 C90,22 104,-12 134,-2" stroke="#d3a294" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="-20" cy="30" rx="11" ry="6" fill="#d3a294"/><ellipse cx="25" cy="31" rx="11" ry="6" fill="#d3a294"/><ellipse cx="0" cy="0" rx="52" ry="33" fill="${body}"/><circle cx="-46" cy="-8" r="25" fill="${body}"/><circle cx="-38" cy="-32" r="14" fill="${body}"/><circle cx="-38" cy="-32" r="8" fill="#e7b3a6"/><circle cx="-57" cy="-13" r="3.8" fill="#1a1a1a"/><circle cx="-71" cy="-5" r="4.6" fill="#e48c9a"/><path d="M-70,-3 l-18,-5 M-70,0 l-18,4" stroke="#5d4c3e" stroke-width="1.3"/></g>`;
  }
  function hawk(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0,0 C-30,-25 -70,-32 -115,-12 C-82,-8 -50,0 -18,9 Z" fill="#7a5132"/><path d="M0,0 C30,-25 70,-32 115,-12 C82,-8 50,0 18,9 Z" fill="#7a5132"/><ellipse cx="0" cy="6" rx="16" ry="30" fill="#8d6040"/><circle cx="0" cy="-22" r="11" fill="#9b6d48"/><path d="M-4,-14 L0,-5 L4,-14Z" fill="#f2b632"/><path d="M-13,32 L0,48 L13,32Z" fill="#6b4529"/></g>`;
  }
  function snake(x, y, s) {
    const d = 'M-120,0 C-90,-40 -60,40 -30,0 S30,-40 60,0 S110,30 130,0';
    return `<g transform="translate(${x} ${y}) scale(${s})"><path d="${d}" stroke="#6f8a2a" stroke-width="22" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#b5cf55" stroke-width="6" fill="none" stroke-dasharray="6 14" stroke-linecap="round"/><ellipse cx="142" cy="-4" rx="22" ry="15" fill="#6f8a2a"/><circle cx="150" cy="-10" r="3" fill="#111"/><path d="M162,-2 l14,2 l-6,4" stroke="#d6453d" stroke-width="2" fill="none"/></g>`;
  }
  function cricket(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-10,0 L-40,-28 L-62,10" stroke="#3d4a1d" stroke-width="5" fill="none"/><path d="M10,0 L-5,25 M-15,2 L-25,24" stroke="#3d4a1d" stroke-width="4"/><ellipse cx="0" cy="0" rx="34" ry="13" fill="#5a6b2a"/><circle cx="34" cy="-4" r="11" fill="#4b5a22"/><path d="M42,-10 C60,-40 80,-44 96,-40 M42,-8 C64,-30 84,-30 98,-24" stroke="#3d4a1d" stroke-width="2" fill="none"/></g>`;
  }
  function tuft(x, y, s, c) {
    return `<path transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${s.toFixed(2)})" d="M0,0 q-6,-30 -16,-52 M0,0 q2,-36 5,-64 M0,0 q8,-28 18,-46 M0,0 q-12,-18 -26,-28" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  }
  function tree(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-9" y="-60" width="18" height="70" fill="#7a5532"/><circle cx="0" cy="-85" r="45" fill="#3f8a3a"/><circle cx="-30" cy="-65" r="32" fill="#4a9a42"/><circle cx="30" cy="-65" r="32" fill="#4a9a42"/><circle cx="0" cy="-110" r="30" fill="#55a64b"/></g>`;
  }
  function mito(x, y, rot, s) {
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><ellipse rx="80" ry="36" fill="#f5a26f" stroke="#c4643a" stroke-width="5"/><path d="M-60,4 L-50,-22 L-35,22 L-20,-22 L-5,22 L10,-22 L25,22 L40,-22 L55,8" stroke="#c4643a" stroke-width="4" fill="none" stroke-linejoin="round"/></g>`;
  }
  function hex(cx, cy, r, fill = '#cfe6ff', stroke = '#2c6fb5', sw = 4) {
    let p = []; for (let k = 0; k < 6; k++) { const a = Math.PI / 180 * (60 * k + 30); p.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`); }
    return `<polygon points="${p.join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  }
  function wavy(x1, y1, x2, y2, amp, waves) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L; let d = '';
    for (let i = 0; i <= 80; i++) { const t = i / 80, o = amp * Math.sin(t * waves * 2 * Math.PI); d += (i ? 'L' : 'M') + (x1 + dx * t + nx * o).toFixed(1) + ',' + (y1 + dy * t + ny * o).toFixed(1); }
    return d;
  }
  const STOMACH = 'M470,450 C440,470 440,540 480,560 C520,580 560,560 555,520 C550,490 520,500 510,480 C500,465 490,445 470,450Z';

  // ---------- scenes ----------
  const SCENES = [
    // 0 Ecosphere
    () => {
      const r = rng(7); let stars = '';
      for (let i = 0; i < 260; i++) { const x = -700 + r() * 2400, y = -700 + r() * 2400; if (Math.hypot(x - 500, y - 500) < 345) continue; stars += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(r() * 2.2 + .6).toFixed(1)}" fill="#fff" opacity="${(.35 + r() * .65).toFixed(2)}"/>`; }
      return `<defs><radialGradient id="g0o" cx="38%" cy="35%" r="70%"><stop offset="0" stop-color="#5fb4ea"/><stop offset="1" stop-color="#0f3b78"/></radialGradient><radialGradient id="g0a" r="50%"><stop offset=".84" stop-color="#7cc4ff" stop-opacity=".55"/><stop offset="1" stop-color="#7cc4ff" stop-opacity="0"/></radialGradient><radialGradient id="g0s" cx="32%" cy="30%" r="78%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient><clipPath id="c0"><circle cx="500" cy="500" r="300"/></clipPath></defs>
      ${BG('#040a1c')}${stars}
      <circle cx="500" cy="500" r="355" fill="url(#g0a)"/><circle cx="500" cy="500" r="300" fill="url(#g0o)"/>
      <g clip-path="url(#c0)">
        <path d="M380,330 C430,295 525,300 585,340 C640,378 612,430 592,470 C572,520 560,565 522,602 C500,622 478,602 468,572 C450,522 402,502 372,452 C350,412 352,360 380,330Z" fill="#4e9a4b"/>
        <ellipse cx="430" cy="440" rx="34" ry="20" fill="#b9a46a" opacity=".75"/>
        <path d="M522,600 C540,615 556,625 566,640" stroke="#4e9a4b" stroke-width="12" fill="none"/>
        <path d="M565,635 C605,622 648,662 636,722 C626,782 594,826 574,806 C552,766 544,700 565,635Z" fill="#4a944a"/>
        <path d="M612,292 C650,272 694,292 684,326 C664,348 632,344 612,292Z" fill="#e6f0f5"/>
        <path d="M745,365 C800,350 830,420 815,485 C805,565 765,628 742,606 C722,566 728,476 745,365Z" fill="#5aa04f"/>
        <ellipse cx="777" cy="470" rx="26" ry="48" fill="#c8b273" opacity=".85"/>
        <ellipse cx="500" cy="206" rx="200" ry="44" fill="#f2f8ff"/><ellipse cx="500" cy="800" rx="210" ry="40" fill="#f2f8ff"/>
        <g fill="#fff" opacity=".78"><ellipse cx="335" cy="565" rx="72" ry="13" transform="rotate(-12 335 565)"/><ellipse cx="640" cy="420" rx="62" ry="11"/><ellipse cx="700" cy="705" rx="85" ry="14" transform="rotate(10 700 705)"/><ellipse cx="410" cy="705" rx="52" ry="10"/><ellipse cx="300" cy="380" rx="40" ry="9"/></g>
        <circle cx="500" cy="500" r="300" fill="url(#g0s)"/>
      </g>
      ${target(40)}${tag(500, 90, 'Planet Earth: the ecosphere', { fs: 26, bg: 'rgba(255,255,255,.12)', color: '#fff' })}`;
    },
    // 1 Biosphere
    () => {
      const r = rng(3); let stars = '';
      for (let i = 0; i < 140; i++) { const x = -800 + r() * 2600, y = -900 + r() * 1250; stars += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(r() * 2 + .5).toFixed(1)}" fill="#fff" opacity="${(.3 + r() * .6).toFixed(2)}"/>`; }
      return `${BG('#030816')}${stars}
      <circle cx="500" cy="2700" r="2310" fill="#7cc4ff" opacity=".14"/><circle cx="500" cy="2700" r="2262" fill="#7cc4ff" opacity=".26"/>
      <circle cx="500" cy="2700" r="2200" fill="#1c5a9c"/>
      <path d="M330,520 C360,505 380,500 410,498 L440,470 L462,488 L490,476 L515,452 L540,480 L570,486 L610,440 L650,478 L700,470 L760,496 L840,508 L940,525 L1040,548 L1140,580 L1240,620 L1240,1000 L330,1000 Z" fill="#3f8a3f"/>
      <path d="M515,452 L528,466 L505,466Z M610,440 L624,456 L598,456Z" fill="#f2f6f8"/>
      <circle cx="500" cy="2700" r="2138" fill="#5a3d26"/><circle cx="500" cy="2700" r="2110" fill="#3d2a1b"/>
      <path d="M210,582 L216,562 L224,562 L230,582Z" fill="#1d1d1d"/><circle cx="221" cy="552" r="7" fill="#999" opacity=".7"/><circle cx="226" cy="540" r="9" fill="#aaa" opacity=".5"/>
      <g fill="#fff" opacity=".85"><ellipse cx="440" cy="486" rx="40" ry="7"/><ellipse cx="660" cy="462" rx="55" ry="8"/><ellipse cx="860" cy="496" rx="45" ry="8"/><ellipse cx="260" cy="500" rx="38" ry="7"/></g>
      <path fill-rule="evenodd" d="M-1745,2700 a2245,2245 0 1,0 4490,0 a2245,2245 0 1,0 -4490,0 Z M-1650,2700 a2150,2150 0 1,0 4300,0 a2150,2150 0 1,0 -4300,0 Z" fill="#8ff08f" opacity=".2"/>
      <circle cx="500" cy="2700" r="2245" fill="none" stroke="#9cf09c" stroke-width="3" stroke-dasharray="14 10"/>
      <circle cx="500" cy="2700" r="2150" fill="none" stroke="#9cf09c" stroke-width="3" stroke-dasharray="14 10"/>
      ${tag(500, 300, 'Biosphere: the thin layer of life on Earth', { fs: 26 })}
      ${tag(150, 455, '≈ 8 km up', { fs: 19 })}${tag(205, 640, 'deep-sea vents ≈ 11 km down', { fs: 19 })}
      ${target(38, 500, 492)}`;
    },
    // 2 Ecosystem
    () => {
      const r = rng(11); let tufts = '';
      for (let i = 0; i < 150; i++) { const x = -400 + r() * 1800, y = 430 + r() * 900; if (((x - 790) / 210) ** 2 + ((y - 640) / 90) ** 2 < 1) continue; if (Math.hypot(x - 500, y - 500) < 70) continue; tufts += tuft(x, y, .5 + r() * .7, r() < .5 ? '#3e7f31' : '#5b9f45'); }
      let rays = ''; for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; rays += `<line x1="${(170 + 78 * Math.cos(a)).toFixed(0)}" y1="${(150 + 78 * Math.sin(a)).toFixed(0)}" x2="${(170 + 110 * Math.cos(a)).toFixed(0)}" y2="${(150 + 110 * Math.sin(a)).toFixed(0)}" stroke="#ffd23f" stroke-width="8" stroke-linecap="round"/>`; }
      return `<defs><linearGradient id="g2s" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="420"><stop offset="0" stop-color="#6fbdf0"/><stop offset="1" stop-color="#dff2ff"/></linearGradient><linearGradient id="g2g" gradientUnits="userSpaceOnUse" x1="0" y1="410" x2="0" y2="1000"><stop offset="0" stop-color="#7bbd5c"/><stop offset="1" stop-color="#4c8f3c"/></linearGradient></defs>
      ${BG('url(#g2s)')}<rect x="-4500" y="-4500" width="10000" height="4500" fill="#6fbdf0"/>
      ${rays}<circle cx="170" cy="150" r="64" fill="#ffd23f"/>
      <g fill="#fff"><circle cx="420" cy="120" r="30"/><circle cx="455" cy="105" r="38"/><circle cx="495" cy="122" r="28"/><circle cx="760" cy="90" r="26"/><circle cx="792" cy="78" r="34"/><circle cx="828" cy="94" r="24"/></g>
      <path d="M-700,400 C-300,300 0,330 200,360 C400,300 600,320 800,350 C1000,305 1300,330 1700,380 L1700,470 L-700,470Z" fill="#94cd7b"/>
      <rect x="-4500" y="410" width="10000" height="6000" fill="url(#g2g)"/>
      ${tree(110, 440, 1)}${tree(270, 425, .8)}${tree(900, 415, .9)}${tree(-60, 450, 1.1)}
      <ellipse cx="790" cy="640" rx="190" ry="72" fill="#3d8fd1"/><ellipse cx="770" cy="628" rx="140" ry="46" fill="#5aa8e6" opacity=".6"/>
      <g stroke="#3c6b2a" stroke-width="5" stroke-linecap="round"><line x1="610" y1="625" x2="600" y2="570"/><line x1="622" y1="630" x2="626" y2="560"/><line x1="960" y1="650" x2="972" y2="590"/></g>
      <ellipse cx="650" cy="790" rx="52" ry="26" fill="#9aa2a6"/><ellipse cx="635" cy="782" rx="30" ry="12" fill="#b6bdc0"/><ellipse cx="230" cy="730" rx="40" ry="20" fill="#9aa2a6"/>
      ${tufts}
      <ellipse cx="500" cy="502" rx="58" ry="20" fill="#3f7f33" opacity=".55"/>${mouse(486, 498, .11)}${mouse(518, 506, .1, true)}${tuft(470, 512, .4, '#2e6b25')}${tuft(530, 515, .35, '#2e6b25')}
      ${hawk(640, 250, .35)}
      ${tag(170, 265, 'sunlight (abiotic)')}${tag(790, 760, 'water (abiotic)')}${tag(650, 860, 'rocks & soil (abiotic)')}${tag(200, 300, 'plants (biotic)')}${tag(640, 200, 'animals (biotic)')}
      ${target(64)}`;
    },
    // 3 Community
    () => {
      const r = rng(21); let tufts = '', flowers = '';
      for (let i = 0; i < 170; i++) { const x = -300 + r() * 1600, y = 300 + r() * 900; if (Math.hypot(x - 500, y - 505) < 85) continue; tufts += tuft(x, y, .8 + r() * 1.1, r() < .5 ? '#3e7f31' : '#62a84b'); }
      for (let i = 0; i < 22; i++) { const x = -100 + r() * 1200, y = 330 + r() * 700; if (Math.hypot(x - 500, y - 505) < 90) continue; const c = pick(['#ffffff', '#ffd23f', '#e57bb8', '#a98be6']); flowers += `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${x.toFixed(0)}" y2="${(y + 40).toFixed(0)}" stroke="#3e7f31" stroke-width="4"/><circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="10" fill="${c}"/><circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="4" fill="#f2a516"/>`; }
      return `<defs><linearGradient id="g3g" gradientUnits="userSpaceOnUse" x1="0" y1="290" x2="0" y2="1000"><stop offset="0" stop-color="#83c463"/><stop offset="1" stop-color="#4a8b3a"/></linearGradient></defs>
      ${BG('#cfe9ff')}<rect x="-4500" y="290" width="10000" height="6000" fill="url(#g3g)"/>
      ${tufts}${flowers}
      ${hawk(770, 140, .95)}${snake(185, 830, 1.15)}${cricket(790, 700, .9)}${cricket(880, 560, .7)}${cricket(300, 640, .8)}
      <ellipse cx="500" cy="515" rx="80" ry="30" fill="#3f7f33" opacity=".45"/>
      ${mouse(472, 500, .2)}${mouse(530, 512, .18, true)}${mouse(498, 532, .16)}
      ${tag(770, 255, 'hawk population')}${tag(200, 745, 'snake population')}${tag(800, 790, 'cricket population')}${tag(170, 395, 'grass population')}${tag(500, 610, 'mouse population')}
      ${tag(500, 60, 'Community: populations interacting', { fs: 26 })}
      ${target(78, 500, 512)}`;
    },
    // 4 Population
    () => {
      const r = rng(5); let tufts = '';
      for (let i = 0; i < 140; i++) { const x = -300 + r() * 1600, y = -300 + r() * 1600; tufts += tuft(x, y, .6 + r() * .6, r() < .5 ? '#4a8b3a' : '#69ad50'); }
      const M = [[170, 230, .34], [340, 160, .3, 1], [700, 210, .33], [860, 330, .3, 1], [140, 470, .32, 1], [830, 520, .36], [270, 720, .34], [460, 840, .3, 1], [710, 790, .35, 1], [890, 830, .3], [320, 420, .3], [660, 400, .28, 1], [80, 860, .3], [930, 120, .3, 1]];
      return `${BG('#79b85b')}<g fill="#8a6b45" opacity=".22"><ellipse cx="300" cy="300" rx="160" ry="60"/><ellipse cx="750" cy="650" rx="180" ry="70"/><ellipse cx="200" cy="880" rx="140" ry="50"/></g>
      ${tufts}${M.map(m => mouse(m[0], m[1], m[2], !!m[3])).join('')}${mouse(510, 505, .5)}
      ${tag(500, 70, 'Population: one species, same place, same time', { fs: 25 })}
      ${target(92, 505, 505)}`;
    },
    // 5 Organism
    () => `<defs><radialGradient id="g5" r="70%"><stop offset="0" stop-color="#f7f1e6"/><stop offset="1" stop-color="#d9ceb8"/></radialGradient></defs>
      ${BG('url(#g5)')}<rect x="-4500" y="-4500" width="10000" height="10000" fill="#e3d9c6" opacity=".0"/>
      <ellipse cx="540" cy="645" rx="330" ry="38" fill="#000" opacity=".12"/>
      ${mouse(540, 520, 3.2)}
      ${tag(500, 130, 'Organism: one field mouse', { fs: 26 })}
      ${target(80, 520, 520)}`,
    // 6 System
    () => `${BG('#f7efe8')}
      <g opacity=".45">${mouse(620, 520, 6, false, '#d9b99c')}</g>
      <path d="M415,420 C450,395 540,395 575,420 C560,450 500,460 470,455 C440,452 420,440 415,420Z" fill="#9e3b3b"/>
      <path d="M330,470 C380,455 430,445 470,452" stroke="#d47878" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="${STOMACH}" fill="#ec8f8f" stroke="#c25b5b" stroke-width="3"/>
      <path d="M556,532 C600,540 640,520 660,555 C680,590 630,615 605,590 C585,570 625,560 645,585 C665,610 640,650 600,640 C570,632 560,660 590,672 C620,684 660,670 690,650" stroke="#e8a56f" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M690,650 C750,650 772,600 770,560 C768,520 742,500 720,500 C780,500 840,520 905,565" stroke="#c98b5e" stroke-width="18" fill="none" stroke-linecap="round"/>
      <g stroke="#1c2b2f" stroke-width="2" opacity=".55"><line x1="300" y1="402" x2="345" y2="462"/><line x1="470" y1="360" x2="490" y2="410"/><line x1="410" y1="610" x2="465" y2="555"/><line x1="700" y1="728" x2="650" y2="660"/></g>
      ${tag(285, 395, 'esophagus', { fs: 21 })}${tag(470, 352, 'liver', { fs: 21 })}${tag(400, 625, 'stomach', { fs: 21 })}${tag(720, 745, 'intestines', { fs: 21 })}
      ${tag(500, 120, 'System: the digestive system', { fs: 26 })}
      ${target(68)}`,
    // 7 Organ
    () => `<defs><clipPath id="c7"><circle cx="500" cy="500" r="56"/></clipPath></defs>${BG('#fbecec')}
      <g transform="translate(500 500) scale(6.8) translate(-498 -510)">
        <path d="M470,452 C450,440 430,430 402,424" stroke="#d98080" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M553,522 C566,505 582,500 600,506" stroke="#e8a56f" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="${STOMACH}" fill="#ec8f8f" stroke="#c25b5b" stroke-width=".7"/>
        <g stroke="#d06c6c" stroke-width=".8" fill="none"><path d="M455,486 C462,505 462,522 472,540"/><path d="M478,474 C488,496 492,520 500,546"/><path d="M500,492 C512,508 520,526 530,548"/><path d="M522,505 C532,515 540,525 546,540"/></g>
      </g>
      <g clip-path="url(#c7)"><rect x="440" y="440" width="120" height="30" fill="#f8cfcf"/><rect x="440" y="470" width="120" height="26" fill="#eaa5a5"/><rect x="440" y="496" width="120" height="70" fill="#c94b4b"/><g stroke="#a83636" stroke-width="3"><line x1="440" y1="510" x2="560" y2="510"/><line x1="440" y1="526" x2="560" y2="526"/><line x1="440" y1="542" x2="560" y2="542"/></g></g>
      <circle cx="500" cy="500" r="56" fill="none" stroke="#fff" stroke-width="5"/>
      ${tag(500, 110, 'Organ: the stomach', { fs: 26 })}${tag(680, 640, 'tissue layers', { fs: 21 })}
      <line x1="560" y1="540" x2="630" y2="615" stroke="#1c2b2f" stroke-width="2" opacity=".55"/>
      ${target(70)}`,
    // 8 Tissue
    () => {
      const r = rng(9); let cells = '';
      for (let k = -7; k <= 7; k++) for (let j = -6; j <= 6; j++) {
        const y = 500 + k * 96, x = 500 + j * 128 + (Math.abs(k) % 2 ? 64 : 0);
        const c = k === 0 && j === 0;
        cells += `<rect x="${x - 58}" y="${y - 42}" width="116" height="84" rx="28" fill="${c ? '#fff1e6' : '#fbdada'}" stroke="#d07a84" stroke-width="4"/><ellipse cx="${(x + (r() - .5) * 24).toFixed(0)}" cy="${(y + (r() - .5) * 14).toFixed(0)}" rx="20" ry="16" fill="#8b5aa8" opacity=".85"/>`;
      }
      return `${BG('#f0bfc3')}${cells}${tag(500, 80, 'Tissue: many cells of the same kind (stomach lining)', { fs: 24 })}${target(72)}`;
    },
    // 9 Cell
    () => `<defs><radialGradient id="g9" r="60%"><stop offset="0" stop-color="#fff8ef"/><stop offset="1" stop-color="#fde0d0"/></radialGradient></defs>
      ${BG('#f0bfc3')}
      <circle cx="500" cy="500" r="410" fill="url(#g9)" stroke="#d07a84" stroke-width="14"/>
      <path d="M200,560 C260,540 300,580 360,560 C420,540 440,580 480,560 M190,600 C250,580 300,620 360,600 C410,585 430,612 455,606" stroke="#c98fd6" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="330" cy="350" r="125" fill="#dcc3f1" stroke="#8b5aa8" stroke-width="6"/><circle cx="350" cy="340" r="42" fill="#8b5aa8" opacity=".8"/>
      <path d="M260,300 q20,-20 40,0 t40,0 M270,400 q15,15 30,0 t30,0 M380,410 q12,-14 24,0" stroke="#a37cc4" stroke-width="5" fill="none"/>
      ${mito(700, 330, 25, 1)}${mito(310, 700, -30, 1)}${mito(720, 690, 15, 1)}${mito(612, 520, 75, .65)}
      ${hex(500, 500, 22)}${hex(440, 575, 15)}${hex(565, 430, 14)}${hex(455, 440, 13)}
      ${tag(330, 200, 'nucleus', { fs: 21 })}${tag(720, 255, 'mitochondrion', { fs: 21 })}${tag(395, 640, 'glucose molecules', { fs: 21 })}${tag(800, 905, 'cell membrane', { fs: 21 })}
      ${tag(500, 60, 'Cell: the basic unit of life', { fs: 26 })}
      ${target(36)}`,
    // 10 Molecule (glucose)
    () => {
      const A = { C1: [500, 500, 'C'], C2: [425, 630, 'C'], C3: [275, 630, 'C'], C4: [200, 500, 'C'], C5: [275, 370, 'C'], Or: [425, 370, 'O'], C6: [210, 250, 'C'], O6: [300, 160, 'O'], H6: [380, 120, 'H'], H6a: [110, 230, 'H'], H6b: [195, 145, 'H'], O1: [630, 560, 'O'], H1: [710, 530, 'H'], HC1: [560, 400, 'H'], O2: [425, 770, 'O'], H2: [500, 820, 'H'], HC2: [520, 690, 'H'], O3: [275, 770, 'O'], H3: [200, 820, 'H'], HC3: [180, 690, 'H'], O4: [60, 470, 'O'], H4: [10, 400, 'H'], HC4: [150, 590, 'H'], HC5: [170, 410, 'H'] };
      const B = [['C1', 'C2'], ['C2', 'C3'], ['C3', 'C4'], ['C4', 'C5'], ['C5', 'Or'], ['Or', 'C1'], ['C5', 'C6'], ['C6', 'O6'], ['O6', 'H6'], ['C6', 'H6a'], ['C6', 'H6b'], ['C1', 'O1'], ['O1', 'H1'], ['C1', 'HC1'], ['C2', 'O2'], ['O2', 'H2'], ['C2', 'HC2'], ['C3', 'O3'], ['O3', 'H3'], ['C3', 'HC3'], ['C4', 'O4'], ['O4', 'H4'], ['C4', 'HC4'], ['C5', 'HC5']];
      const r = rng(4); let dots = ''; for (let i = 0; i < 90; i++) dots += `<circle cx="${(-300 + r() * 1600).toFixed(0)}" cy="${(-300 + r() * 1600).toFixed(0)}" r="${(1 + r() * 2).toFixed(1)}" fill="#8fb7ff" opacity=".25"/>`;
      const bonds = B.map(([a, b]) => `<line x1="${A[a][0]}" y1="${A[a][1]}" x2="${A[b][0]}" y2="${A[b][1]}" stroke="#cfd8e3" stroke-width="12" stroke-linecap="round"/>`).join('');
      const R = { C: 42, O: 38, H: 24 }, F = { C: 'url(#g10c)', O: 'url(#g10o)', H: 'url(#g10h)' };
      const atoms = Object.values(A).sort((a, b) => R[a[2]] - R[b[2]]).map(a => `<circle cx="${a[0]}" cy="${a[1]}" r="${R[a[2]]}" fill="${F[a[2]]}"/>`).join('');
      return `<defs><radialGradient id="g10c" cx="35%" cy="35%"><stop offset="0" stop-color="#8a8f96"/><stop offset="1" stop-color="#2b2f35"/></radialGradient><radialGradient id="g10o" cx="35%" cy="35%"><stop offset="0" stop-color="#ff8b7a"/><stop offset="1" stop-color="#b8261a"/></radialGradient><radialGradient id="g10h" cx="35%" cy="35%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#b9c2cc"/></radialGradient></defs>
      ${BG('#0f2036')}${dots}${bonds}${atoms}
      ${tag(500, 60, 'Molecule: glucose, C₆H₁₂O₆', { fs: 26 })}
      ${tag(790, 300, 'energy is stored in the bonds', { fs: 20, bg: 'rgba(255,214,90,.92)' })}
      <g font-family="Lexend, sans-serif" font-size="20" fill="#fff"><circle cx="720" cy="820" r="14" fill="url(#g10c)"/><text x="742" y="827">carbon</text><circle cx="720" cy="858" r="13" fill="url(#g10o)"/><text x="742" y="865">oxygen</text><circle cx="720" cy="894" r="10" fill="url(#g10h)"/><text x="742" y="901">hydrogen</text></g>
      ${target(56)}`;
    },
    // 11 Atom (carbon)
    () => {
      const P = (x, y) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="19" fill="url(#g11p)"/><text x="${x.toFixed(1)}" y="${(y + 6).toFixed(1)}" font-size="18" text-anchor="middle" fill="#fff" font-weight="700">+</text>`;
      const Nn = (x, y) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="19" fill="url(#g11n)"/>`;
      let ring2 = '', ring1 = '';
      ['p', 'n', 'p', 'n', 'p'].forEach((t, k) => { const a = (30 + 72 * k) * Math.PI / 180; const x = 500 + 62 * Math.cos(a), y = 500 + 62 * Math.sin(a); ring2 += t === 'p' ? P(x, y) : Nn(x, y); });
      ['n', 'p', 'n', 'p', 'n', 'n'].forEach((t, k) => { const a = (60 * k) * Math.PI / 180; const x = 500 + 36 * Math.cos(a), y = 500 + 36 * Math.sin(a); ring1 += t === 'p' ? P(x, y) : Nn(x, y); });
      const e = (x, y) => `<circle cx="${x}" cy="${y}" r="20" fill="#5ab0ff" stroke="#cfe6ff" stroke-width="3"/><circle cx="${x - 6}" cy="${y - 6}" r="6" fill="#fff" opacity=".6"/>`;
      const d = 370 * Math.SQRT1_2;
      return `<defs><radialGradient id="g11p" cx="35%" cy="35%"><stop offset="0" stop-color="#ff8a80"/><stop offset="1" stop-color="#c62828"/></radialGradient><radialGradient id="g11n" cx="35%" cy="35%"><stop offset="0" stop-color="#d5dbe1"/><stop offset="1" stop-color="#78828c"/></radialGradient><radialGradient id="g11g"><stop offset="0" stop-color="#ffb3a8" stop-opacity=".5"/><stop offset="1" stop-color="#ffb3a8" stop-opacity="0"/></radialGradient></defs>
      ${BG('#0b1628')}
      <circle cx="500" cy="500" r="200" fill="none" stroke="#8fb7ff" stroke-opacity=".45" stroke-width="3"/>
      <circle cx="500" cy="500" r="370" fill="none" stroke="#8fb7ff" stroke-opacity=".45" stroke-width="3"/>
      <g><animateTransform attributeName="transform" type="rotate" from="0 500 500" to="360 500 500" dur="9s" repeatCount="indefinite"/>${e(700, 500)}${e(300, 500)}</g>
      <g><animateTransform attributeName="transform" type="rotate" from="360 500 500" to="0 500 500" dur="15s" repeatCount="indefinite"/>${e((500 + d).toFixed(0) * 1, (500 + d).toFixed(0) * 1)}${e((500 - d).toFixed(0) * 1, (500 + d).toFixed(0) * 1)}${e((500 - d).toFixed(0) * 1, (500 - d).toFixed(0) * 1)}${e((500 + d).toFixed(0) * 1, (500 - d).toFixed(0) * 1)}</g>
      <circle cx="500" cy="500" r="110" fill="url(#g11g)"/>
      <g font-family="Lexend, sans-serif">${ring2}${ring1}${P(500, 500)}</g>
      ${tag(500, 70, 'Atom: carbon — 6 protons, 6 neutrons, 6 electrons', { fs: 24 })}
      ${tag(820, 410, 'electron', { fs: 20 })}${tag(500, 625, 'nucleus', { fs: 20 })}
      ${target(88)}`;
    },
    // 12 Subatomic particles (nucleus close-up)
    () => {
      const S = (x, y, t) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="72" fill="url(#${t === 'p' ? 'g12p' : 'g12n'})"/><text x="${x.toFixed(1)}" y="${(y + 12).toFixed(1)}" font-size="36" text-anchor="middle" fill="#fff" font-weight="700" font-family="Lexend, sans-serif">${t === 'p' ? 'p⁺' : 'n'}</text>`;
      let ring2 = '', ring1 = '';
      ['p', 'n', 'p', 'n', 'p'].forEach((t, k) => { const a = (30 + 72 * k) * Math.PI / 180; ring2 += S(500 + 270 * Math.cos(a), 500 + 270 * Math.sin(a), t); });
      ['n', 'p', 'n', 'p', 'n', 'n'].forEach((t, k) => { const a = (60 * k) * Math.PI / 180; ring1 += S(500 + 140 * Math.cos(a), 500 + 140 * Math.sin(a), t); });
      return `<defs><radialGradient id="g12p" cx="35%" cy="32%"><stop offset="0" stop-color="#ff9c8f"/><stop offset="1" stop-color="#b71c1c"/></radialGradient><radialGradient id="g12n" cx="35%" cy="32%"><stop offset="0" stop-color="#e2e7ec"/><stop offset="1" stop-color="#6d7781"/></radialGradient></defs>
      ${BG('#160c22')}${ring2}${ring1}${S(500, 500, 'p')}
      <circle cx="910" cy="190" r="12" fill="#5ab0ff"/>${tag(800, 240, 'an electron (tiny, far away)', { fs: 19 })}
      ${tag(450, 60, 'Subatomic particles: protons (p⁺) and neutrons (n)', { fs: 24 })}
      ${target(84)}`;
    },
    // 13 Quarks
    () => {
      const q = (x, y, c, t, lbl, dur) => `<g><animateTransform attributeName="transform" type="translate" values="0 0;5 -4;-4 5;3 3;0 0" dur="${dur}s" repeatCount="indefinite"/><circle cx="${x}" cy="${y}" r="78" fill="${c}"/><circle cx="${x - 24}" cy="${y - 26}" r="20" fill="#fff" opacity=".35"/><text x="${x}" y="${y + 22}" font-size="66" text-anchor="middle" fill="#fff" font-weight="700" font-family="Fredoka, Lexend, sans-serif">${t}</text></g>${tag(x, y + 125, lbl, { fs: 21 })}`;
      return `<defs><radialGradient id="g13"><stop offset="0" stop-color="#ff6b6b" stop-opacity=".42"/><stop offset=".85" stop-color="#ff6b6b" stop-opacity=".12"/><stop offset="1" stop-color="#ff6b6b" stop-opacity="0"/></radialGradient></defs>
      ${BG('#12081a')}<circle cx="500" cy="500" r="430" fill="url(#g13)"/><circle cx="500" cy="500" r="395" fill="none" stroke="#ff9a9a" stroke-opacity=".45" stroke-width="4" stroke-dasharray="6 10"/>
      <g stroke="#ffe08a" stroke-width="6" fill="none" opacity=".9"><path d="${wavy(380, 410, 625, 405, 12, 7)}"/><path d="${wavy(380, 410, 505, 630, 12, 6)}"/><path d="${wavy(625, 405, 505, 630, 12, 6)}"/></g>
      ${q(380, 410, '#ff7a59', 'u', 'up quark', 1.3)}${q(625, 405, '#f7a531', 'u', 'up quark', 1.6)}${q(505, 630, '#4f9cf5', 'd', 'down quark', 1.45)}
      ${tag(500, 70, 'Quarks: a proton = 2 up + 1 down', { fs: 26 })}
      ${tag(500, 880, 'gluons (yellow springs) hold quarks together', { fs: 21, bg: 'rgba(255,224,138,.95)' })}`;
    }
  ];

  // ---------- engine ----------
  let z = 0, lastCur = -1, groups = [], anim = null, touring = false, tourId = 0;
  const visited = new Set(store.get('zoomVisited', []));
  let svg, stage, slider, tourBtn;

  function smooth(a, b, x) { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function current() { const base = Math.min(Math.floor(z + 1e-6), N - 1); const f = z - base; return f > 0.6 && base < N - 1 ? base + 1 : base; }
  function render() {
    const base = Math.min(Math.floor(z + 1e-6), N - 1), f = Math.max(0, z - base);
    groups.forEach((g, i) => {
      if (i === base) { g.style.display = ''; g.setAttribute('transform', `translate(500 500) scale(${Math.pow(10, f).toFixed(4)}) translate(-500 -500)`); g.setAttribute('opacity', '1'); }
      else if (i === base + 1 && f > 0.25) { const o = smooth(0.3, 0.85, f); g.style.display = o > 0.001 ? '' : 'none'; g.setAttribute('transform', `translate(500 500) scale(${Math.pow(10, f - 1).toFixed(4)}) translate(-500 -500)`); g.setAttribute('opacity', o.toFixed(3)); }
      else g.style.display = 'none';
    });
    slider.value = z;
    const cur = current();
    if (cur !== lastCur) { lastCur = cur; updateInfo(cur); }
  }
  function updateInfo(i) {
    const L = LEVELS[i];
    if (!visited.has(i)) {
      visited.add(i); store.set('zoomVisited', [...visited]);
      if (visited.size === N && !store.get('zoomAllXP', false)) { store.set('zoomAllXP', true); addXP(30, 'visited all 14 levels'); markDone('zoom'); }
    }
    $('#zChip').innerHTML = `Level <b>${L.num}</b> · ${L.name} <span style="opacity:.75;font-weight:400">· 📏 ${L.size}</span>`;
    $('#zInfo').innerHTML = `<span class="lvl-num">Level ${L.num} of 14</span><h3>${L.name}</h3><p class="def">${L.def}</p>
      <div class="kv"><span>Example</span><p>${L.ex}</p></div>
      <div class="kv"><span>Approximate size</span><p>${L.size}</p></div>
      <div class="energy-note">⚡ <b>Energy connection:</b> ${L.energy}</div>${L.fun ? `<div class="fun">💡 <b>Fun fact:</b> ${L.fun}</div>` : ''}
      <div class="visited">Levels explored: ${visited.size} / 14<div class="meter"><i style="width:${visited.size / N * 100}%"></i></div></div>`;
    $$('#zLadder button').forEach(b => { const k = +b.dataset.i; b.classList.toggle('on', k === i); b.classList.toggle('seen', visited.has(k)); });
  }
  function setZ(v) { if (anim) { anim.cancel = true; anim = null; } stopTour(); z = clamp(v, 0, N - 1); render(); hideHint(); }
  function animateTo(t, dur) {
    t = clamp(t, 0, N - 1); if (anim) anim.cancel = true;
    const a = { cancel: false }; anim = a; const z0 = z;
    dur = dur ?? Math.min(2600, 450 + Math.abs(t - z0) * 420); const t0 = performance.now();
    return new Promise(res => {
      function step(now) {
        if (a.cancel) return res(false);
        const p = Math.min(1, (now - t0) / dur), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        z = z0 + (t - z0) * e; render();
        if (p < 1) requestAnimationFrame(step); else { if (anim === a) anim = null; res(true); }
      }
      requestAnimationFrame(step);
    });
  }
  async function tour() {
    if (touring) { stopTour(); return; }
    touring = true; const id = ++tourId; tourBtn.textContent = '⏸ Pause tour'; hideHint();
    if (z >= N - 1.01) { if (!await animateTo(0, 1800)) return; await wait(900); }
    let k = Math.floor(z + 1e-6);
    while (touring && id === tourId && k < N - 1) {
      k++; const ok = await animateTo(k, 1800);
      if (!ok || id !== tourId) return;
      await wait(1700);
    }
    if (id === tourId) stopTour();
  }
  function stopTour() { touring = false; tourId++; if (tourBtn) tourBtn.textContent = '▶ Auto tour'; }
  function hideHint() { $('#zHint').classList.add('hide'); }
  function step(dir) { stopTour(); const k = dir > 0 ? Math.floor(z + 1e-6) + 1 : Math.ceil(z - 1e-6) - 1; animateTo(clamp(k, 0, N - 1)); hideHint(); }

  // ---------- challenge ----------
  let ch = null, chTimer = null;
  function renderChallenge() {
    const box = $('#zChallenge'); const best = store.get('zoomBest', null);
    if (!ch) {
      box.innerHTML = `<h3>🎯 Zoom Challenge</h3><p class="small">Read each clue, zoom to the matching level, then press <b>I'm here!</b> 8 clues — go for accuracy and speed.</p><button class="btn sun" id="chStart">Start challenge</button>${best ? `<p class="small muted" style="margin-top:8px">🏆 Best: ${best.score}/8 in ${best.time}s</p>` : ''}`;
      $('#chStart').onclick = startChallenge; return;
    }
    if (ch.done) {
      const t = Math.round((ch.end - ch.start) / 1000);
      box.innerHTML = `<h3>🎯 Challenge complete!</h3><div class="end-card"><div class="big">${ch.score}/8</div><p>in ${t} seconds</p>${ch.newBest ? '<p><b>🏆 New best!</b></p>' : ''}</div><button class="btn sun" id="chStart">Play again</button>`;
      $('#chStart').onclick = startChallenge; return;
    }
    const lv = ch.order[ch.i];
    box.innerHTML = `<div class="ch-top"><span>Clue ${ch.i + 1} / 8</span><span>⭐ ${ch.score}</span><span id="chTime">0s</span></div><p class="clue">“${ch.clue}”</p><div class="row"><button class="btn" id="chHere">I'm here!</button><button class="btn ghost" id="chSkip">Skip</button></div><div id="chFb" class="fb"></div>`;
    $('#chHere').onclick = () => {
      const fb = $('#chFb');
      if (current() === lv) {
        ch.score++; addXP(5, 'zoom clue'); fb.className = 'fb show good'; fb.textContent = `✅ Yes! That's the ${LEVELS[lv].name.toLowerCase()} level.`;
        $('#chHere').disabled = true; $('#chSkip').disabled = true; setTimeout(nextClue, 900);
      } else {
        fb.className = 'fb show bad'; fb.textContent = `Not quite — you're at the ${LEVELS[current()].name.toLowerCase()} level. Keep zooming!`; shakeEl(fb);
      }
    };
    $('#chSkip').onclick = nextClue;
  }
  function startChallenge() {
    const order = shuffle([...Array(N).keys()]).slice(0, 8);
    ch = { order, i: 0, score: 0, start: Date.now(), clue: pick(CLUES[order[0]]) };
    clearInterval(chTimer); chTimer = setInterval(() => { const el = $('#chTime'); if (el && ch && !ch.done) el.textContent = Math.round((Date.now() - ch.start) / 1000) + 's'; }, 500);
    renderChallenge();
    if (window.innerWidth < 1100) $('#zoomStage').scrollIntoView({ block: 'center' });
  }
  function nextClue() {
    ch.i++;
    if (ch.i >= 8) {
      ch.done = true; ch.end = Date.now(); clearInterval(chTimer);
      const t = Math.round((ch.end - ch.start) / 1000), best = store.get('zoomBest', null);
      if (!best || ch.score > best.score || (ch.score === best.score && t < best.time)) { store.set('zoomBest', { score: ch.score, time: t }); ch.newBest = true; }
      if (ch.score >= 6) addXP(20, 'challenge bonus');
      window.dispatchEvent(new Event('scoresChanged'));
    } else ch.clue = pick(CLUES[ch.order[ch.i]]);
    renderChallenge();
  }

  function init() {
    svg = $('#zoomSvg'); stage = $('#zoomStage'); slider = $('#zSlider'); tourBtn = $('#zTour');
    svg.innerHTML = SCENES.map((f, i) => `<g id="zs${i}" style="display:none">${f()}</g>`).join('');
    groups = SCENES.map((_, i) => svg.querySelector('#zs' + i));
    $('#zLadder').innerHTML = LEVELS.map((L, i) => `<button data-i="${i}" style="width:${(38 + i * 62 / (N - 1)).toFixed(0)}%;background:${L.color}" title="${L.def}">${L.num}. ${L.name}</button>`).join('');
    $$('#zLadder button').forEach(b => b.onclick = () => { stopTour(); animateTo(+b.dataset.i); hideHint(); });
    slider.addEventListener('input', () => setZ(+slider.value));
    $('#zIn').onclick = () => step(1); $('#zOut').onclick = () => step(-1);
    tourBtn.onclick = tour;
    stage.addEventListener('wheel', e => { e.preventDefault(); const d = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY; setZ(z - d * 0.0022); }, { passive: false });
    const pts = new Map(); let pinch = 0, lastY = null;
    const dist = () => { const p = [...pts.values()]; return Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y); };
    stage.addEventListener('pointerdown', e => { pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); try { stage.setPointerCapture(e.pointerId); } catch (_) {} if (pts.size === 2) { pinch = dist(); lastY = null; } else lastY = e.clientY; stage.style.cursor = 'grabbing'; });
    stage.addEventListener('pointermove', e => {
      if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 2) { const d = dist(); if (pinch > 0) setZ(z + Math.log10(d / pinch) * 1.8); pinch = d; }
      else if (pts.size === 1 && lastY !== null) { const dy = e.clientY - lastY; lastY = e.clientY; if (dy) setZ(z - dy * 0.006); }
    });
    const up = e => { pts.delete(e.pointerId); pinch = pts.size === 2 ? dist() : 0; lastY = pts.size === 1 ? [...pts.values()][0].y : null; if (!pts.size) stage.style.cursor = ''; };
    stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
    stage.addEventListener('keydown', e => {
      if (['ArrowUp', '+', '=', 'ArrowRight'].includes(e.key)) { e.preventDefault(); step(1); }
      if (['ArrowDown', '-', '_', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); step(-1); }
    });
    render(); renderChallenge();
  }
  return { init, startChallenge, LEVELS };
})();
