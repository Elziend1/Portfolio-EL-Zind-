/* Small interface helpers: theme toggle, certificate Quick Look, card glow, custom cursor, reveal on scroll. */
$('th').onclick = function () { var d = document.documentElement, t = d.dataset.theme == 'light' ? 'dark' : 'light'; d.dataset.theme = t; try {
  localStorage.setItem('theme', t);
}
catch (e) { } };
/* Quick Look: Space on a hovered or focused certificate, long-press on touch screens */
(function () {
  var hov = null, tm = null;
  document.querySelectorAll('.cc').forEach(function (e) {
    e.tabIndex = 0;
    e.addEventListener('mouseenter', function () { hov = e; });
    e.addEventListener('mouseleave', function () { if (hov === e)
      hov = null; });
    e.addEventListener('focus', function () { hov = e; });
    e.addEventListener('blur', function () { if (hov === e)
      hov = null; });
    e.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') {
      ev.preventDefault();
      openQ(e);
    } });
    e.addEventListener('contextmenu', function (ev) { if (TOUCH)
      ev.preventDefault(); });
    e.addEventListener('touchstart', function () { clearTimeout(tm); tm = setTimeout(function () { if (navigator.vibrate)
      navigator.vibrate(12); openQ(e); }, 420); }, { passive: true });
    ['touchend', 'touchmove', 'touchcancel'].forEach(function (t) { e.addEventListener(t, function () { clearTimeout(tm); }, { passive: true }); });
  });
  addEventListener('keydown', function (ev) {
    if (ev.code !== 'Space' && ev.key !== ' ')
      return;
    var t = /^(INPUT|TEXTAREA|BUTTON)$/.test((document.activeElement || {}).tagName || '');
    if (qv.classList.contains('on')) {
      ev.preventDefault();
      closeQ();
      return;
    }
    if (hov && !t) {
      ev.preventDefault();
      openQ(hov);
    }
  });
})();
document.querySelectorAll('.dc').forEach(function (e) { e.addEventListener('pointermove', function (ev) { var r = e.getBoundingClientRect(); e.style.setProperty('--mx', (ev.clientX - r.left) + 'px'); e.style.setProperty('--my', (ev.clientY - r.top) + 'px'); }); });
// cursor
var cur = document.getElementById('cur');
addEventListener('mousemove', function (e) { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; });
document.querySelectorAll('a,.btn,.repo').forEach(function (e) { e.addEventListener('mouseenter', function () { cur.classList.add('big'); }); e.addEventListener('mouseleave', function () { cur.classList.remove('big'); }); });
// reveal
function reveal() { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting)
  e.target.classList.add('in'); }); }, { threshold: .2 }); document.querySelectorAll('.rv').forEach(function (e) { io.observe(e); }); }
