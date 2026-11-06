// ---------- shared helpers ----------
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem('eeg:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('eeg:' + k, JSON.stringify(v)); } catch (e) {} }
};
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function wait(ms) { return new Promise(r => setTimeout(r, ms)); }
function fmt(v) {
  if (!isFinite(v)) return '—';
  if (v === 0) return '0';
  if (Math.abs(v) >= 100) return Math.round(v).toLocaleString('en-US');
  if (Math.abs(v) >= 1) return (+v.toFixed(1)).toLocaleString('en-US');
  return String(+v.toPrecision(2));
}
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

let XP = store.get('xp', 0);
function addXP(n, label) {
  XP += n; store.set('xp', XP);
  const el = $('#xpNum'); if (el) el.textContent = XP;
  toast(`+${n} XP${label ? ' · ' + label : ''}`);
}
function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  $('#toasts').appendChild(t);
  setTimeout(() => t.classList.add('out'), 1700);
  setTimeout(() => t.remove(), 2200);
}
const progress = store.get('progress', {});
function markDone(tab) {
  if (progress[tab]) return;
  progress[tab] = true; store.set('progress', progress); updateTabs();
}
function updateTabs() { $$('nav.tabs button').forEach(b => b.classList.toggle('done', !!progress[b.dataset.tab])); }
function shakeEl(el) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }

// shared food chains (used by learn, games)
const CHAINS = [
  [['🌾', 'Grass'], ['🦗', 'Cricket'], ['🐭', 'Mouse'], ['🐍', 'Snake'], ['🦅', 'Hawk']],
  [['🟢', 'Algae'], ['🦐', 'Zooplankton'], ['🐟', 'Minnow'], ['🐠', 'Bass'], ['🐦', 'Heron']],
  [['🌿', 'Phytoplankton'], ['🦐', 'Krill'], ['🐟', 'Herring'], ['🦭', 'Seal'], ['🐋', 'Orca']],
  [['🌳', 'Oak leaves'], ['🐛', 'Caterpillar'], ['🐦', 'Robin'], ['🦊', 'Fox']],
  [['🌾', 'Grass'], ['🦗', 'Grasshopper'], ['🐸', 'Frog'], ['🐍', 'Snake'], ['🦅', 'Eagle']],
  [['🍀', 'Clover'], ['🐇', 'Rabbit'], ['🦊', 'Fox']],
  [['🌻', 'Sunflower seeds'], ['🐿️', 'Chipmunk'], ['🐍', 'Snake'], ['🦉', 'Owl']]
];
const ROLES = ['Producer', 'Primary consumer', 'Secondary consumer', 'Tertiary consumer', 'Quaternary consumer'];
const ORD = ['1st', '2nd', '3rd', '4th', '5th'];
const LVL_COLORS = ['#3f9b4f', '#93c13e', '#f2b632', '#ef8a35', '#d9534f'];

// MC option button helper: returns html for shuffled options; data-k = original index
function optsHTML(opts, order) { return order.map(k => `<button class="opt" data-k="${k}">${opts[k]}</button>`).join(''); }
