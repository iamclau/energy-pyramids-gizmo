// ================= APP =================
const TABS = ['zoom', 'learn', 'explore', 'play', 'quiz'];
function showTab(name) {
  if (!TABS.includes(name)) name = 'zoom';
  $$('.tab').forEach(sec => sec.hidden = sec.id !== 'tab-' + name);
  $$('nav.tabs button').forEach(b => { const on = b.dataset.tab === name; b.classList.toggle('active', on); b.setAttribute('aria-selected', on); });
  if (location.hash.slice(1) !== name) { try { history.replaceState(null, '', '#' + name); } catch (e) {} }
  if (name === 'play') Games.menu();
  window.scrollTo({ top: 0 });
}
document.addEventListener('DOMContentLoaded', () => {
  $('#xpNum').textContent = XP;
  $$('nav.tabs button').forEach(b => b.onclick = () => showTab(b.dataset.tab));
  window.addEventListener('hashchange', () => showTab(location.hash.slice(1)));
  Zoom.init(); Learn.init(); Lab.init(); Games.init(); Quiz.init();
  updateTabs();
  showTab(location.hash.slice(1));
});
