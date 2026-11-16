/* Motion setup: GSAP + ScrollTrigger + Lenis smooth scroll, aurora background, magnetic buttons, hero entrance. */
var HAS_MOTION = !!(window.gsap && window.ScrollTrigger);
if (HAS_MOTION) {
  gsap.registerPlugin(ScrollTrigger);
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches, lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ lerp: .09 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  /* aurora */
  document.querySelectorAll('#aur i').forEach(function (b, i) { gsap.set(b, { xPercent: -50, yPercent: -50, left: ['20%', '80%', '55%'][i], top: ['22%', '40%', '88%'][i], background: ['#4df3ff', '#2a7bff', '#8f7bff'][i] }); gsap.to(b, { x: 'random(-22vw,22vw)', y: 'random(-18vh,18vh)', duration: 'random(8,14)', repeat: -1, repeatRefresh: true, yoyo: true, ease: 'sine.inOut' }); });
  gsap.to('#bar', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });
  /* blur-text headings */
  function split(el) { var out = []; (function w(n) { [].slice.call(n.childNodes).forEach(function (c) { if (c.nodeType == 3) {
    var f = document.createDocumentFragment();
    c.textContent.split(/(\s+)/).forEach(function (t) { if (!t)
      return; if (/^\s+$/.test(t)) {
      f.appendChild(document.createTextNode(' '));
      return;
    } var s = document.createElement('span'); s.className = 'sw'; s.textContent = t; f.appendChild(s); out.push(s); });
    c.replaceWith(f);
  }
  else if (c.nodeType == 1 && c.tagName != 'BR')
    w(c); }); })(el); return out; }
  /* magnetic buttons */
  if (matchMedia('(hover:hover)').matches)
    document.querySelectorAll('.btn,nav .cta').forEach(function (b) { var xt = gsap.quickTo(b, 'x', { duration: .5, ease: 'power3' }), yt = gsap.quickTo(b, 'y', { duration: .5, ease: 'power3' }); b.addEventListener('pointermove', function (e) { var r = b.getBoundingClientRect(); xt((e.clientX - r.left - r.width / 2) * .3); yt((e.clientY - r.top - r.height / 2) * .3); }); b.addEventListener('pointerleave', function () { xt(0); yt(0); }); });
  /* hero entrance */
  function intro() {
    if (lenis)
      lenis.start();
    var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from('#hero .tag', { y: 24, opacity: 0, duration: .6 }).from('#hero h1', { y: 90, opacity: 0, scale: .96, duration: 1.2 }, '-=.35').from('#hero h2,#hero p:not(.tag)', { y: 30, opacity: 0, stagger: .12, duration: .8 }, '-=.7').from('#hero .btn', { y: 30, opacity: 0, stagger: .1, duration: .7 }, '-=.5').from('.cardwrap .card3', { scale: .7, opacity: 0, rotate: -8, duration: 1.1, ease: 'back.out(1.6)' }, '-=1.2')
      .from('.stk', { scale: 0, rotate: function (i, t) { return +t.dataset.r * 5; }, stagger: .12, duration: 1.2, ease: 'elastic.out(1,.5)' }, '-=.6');
    document.querySelectorAll('.stk').forEach(function (t) { gsap.set(t, { rotation: +t.dataset.r }); gsap.to(t, { y: 'random(-14,14)', x: 'random(-8,8)', rotation: +t.dataset.r + '+random(-5,5)', duration: 'random(2,3.4)', repeat: -1, yoyo: true, repeatRefresh: true, ease: 'sine.inOut', delay: 1.5 }); });
    ScrollTrigger.refresh();
  }
}
