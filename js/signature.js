/* Signature intro: the Arabic word written by a glowing pen. */
if (HAS_MOTION) {
  /* ===== signature intro (Arabic Ruqaa, written by a glowing pen) ===== */
  var sigEl = $('sig'), sigDone = false;
  function sigEnd() { if (sigDone)
    return; sigDone = true; document.documentElement.classList.remove('sigon'); if (sigEl) {
    sigEl.remove();
  } intro(); }
  document.documentElement.classList.add('sigon');
  (function () {
    var txt = $('sgt'), fl = $('sgf'), pen = $('pen'), rect = $('swr');
    function start() {
      var bb = txt.getBBox();
      if (!bb.width) {
        sigEnd();
        return;
      }
      var x0 = bb.x, w = bb.width, h = bb.height, yb = bb.y + h;
      fl.setAttribute('d', 'M ' + (x0 + .06 * w) + ' ' + (yb - .3 * h) + ' C ' + (x0 - .14 * w) + ' ' + (yb + .18 * h) + ', ' + (x0 + .3 * w) + ' ' + (yb + .3 * h) + ', ' + (x0 + .58 * w) + ' ' + (yb + .12 * h) + ' S ' + (x0 + .92 * w) + ' ' + (yb - .1 * h) + ', ' + (x0 + 1.12 * w) + ' ' + (yb - .28 * h));
      var len = fl.getTotalLength();
      fl.style.strokeDasharray = len;
      fl.style.strokeDashoffset = len;
      var xs = bb.x + bb.width + 30, xe = bb.x - 150, y0 = bb.y + h * .55, o = { a: 0, b: 0 };
      rect.setAttribute('x', xs);
      var tl = gsap.timeline({ onComplete: sigEnd });
      tl.to(pen, { opacity: 1, duration: .25 })
        .to(o, { a: 1, duration: 2.6, ease: 'power1.inOut', onUpdate: function () {
          var x = xs + (xe - xs) * o.a;
          rect.setAttribute('x', x);
          var py = y0 + Math.sin(o.a * Math.PI * 10) * h * .3 * (.55 + .45 * Math.sin(o.a * 6 + 1));
          pen.setAttribute('transform', 'translate(' + (x + 75) + ' ' + py + ') rotate(' + (-16 + Math.cos(o.a * Math.PI * 10) * 10) + ')');
        } })
        .to(o, { b: 1, duration: 1.4, ease: 'power2.inOut', onUpdate: function () {
          var l = len * o.b, p = fl.getPointAtLength(l), q = fl.getPointAtLength(Math.min(len, l + 2));
          fl.style.strokeDashoffset = len * (1 - o.b);
          pen.setAttribute('transform', 'translate(' + p.x + ' ' + p.y + ') rotate(' + (Math.atan2(q.y - p.y, q.x - p.x) * 57.3) + ')');
        } })
        .to(pen, { opacity: 0, duration: .3 })
        .to({}, { duration: .55 })
        .to(sigEl, { opacity: 0, duration: .8, ease: 'power2.inOut' });
      $('sg-skip').onclick = function () { tl.timeScale(8); };
      addEventListener('keydown', function (e) { if (sigEl && (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter'))
        tl.timeScale(8); });
    }
    var ready = document.fonts && document.fonts.load ? Promise.race([document.fonts.load('210px "Aref Ruqaa"', 'الزند'), new Promise(function (r) { setTimeout(r, 2500); })]) : Promise.resolve();
    ready.then(function () { return document.fonts ? document.fonts.ready : 0; }).then(start, start);
  })();
}
