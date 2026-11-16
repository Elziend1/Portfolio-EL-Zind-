/* Hero photo card: tilts toward the mouse. */
var card = document.getElementById('card'), cw = card.parentNode, ph = document.getElementById('ph'), mx = -1e4, my = -1e4, rx = 0, ry = 0;
if (PROFILE_PHOTO) {
  ph.src = drv(PROFILE_PHOTO);
  ph.style.display = 'block';
  $('phsvg').style.display = 'none';
}
addEventListener('pointermove', function (e) { mx = e.clientX; my = e.clientY; });
function cl(v) { return Math.max(-1, Math.min(1, v)); }
(function lp() {
  if (window.__heroOff) {
    requestAnimationFrame(lp);
    return;
  }
  var r = cw.getBoundingClientRect(), dx = (mx - (r.left + r.width / 2)) / (r.width / 2), dy = (my - (r.top + r.height / 2)) / (r.height / 2), m = Math.max(Math.abs(dx), Math.abs(dy)), s = m <= 1 ? 1 : Math.max(0, 1 - (m - 1) / 1.6);
  rx += (-cl(dy) * s * 11 - rx) * .1;
  ry += (cl(dx) * s * 11 - ry) * .1;
  card.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
  card.style.setProperty('--mx', (50 + cl(dx) * 45) + '%');
  card.style.setProperty('--my', (50 + cl(dy) * 45) + '%');
  requestAnimationFrame(lp);
})();
