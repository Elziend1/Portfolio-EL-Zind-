/* One-frame mode: scenes fade and pan while you scroll, with a side rail and scene counter. */
if (HAS_MOTION) {
  /* ===== one frame: scenes cross-fade and pan while you scroll ===== */
  var NAMES = { hero: 'Home', kin: 'Mindset', about: 'About', do: 'Build', gh: 'GitHub', projects: 'Projects', skills: 'Skills', exp: 'Experience', cert: 'Certificates', contact: 'Contact' };
  var ORDER = ['hero', 'kin', 'about', 'do', 'gh', 'projects', 'skills', 'exp', 'cert', 'contact'];
  var ST = { tl: null, trig: null, starts: [], scenes: [], D: 0, cur: -1 };
  function goScene(id) { var i = ORDER.indexOf(id); if (i < 0 || !ST.starts.length)
    return; var y = (ST.starts[i] + (i ? .72 : 0)) * innerHeight; if (lenis)
    lenis.scrollTo(y);
  else
    scrollTo({ top: y, behavior: 'smooth' }); }
  window.goScene = goScene;
  function buildStage() {
    var vh = innerHeight, vw = innerWidth, html = document.documentElement, stage = $('stage');
    if (!stage) {
      stage = document.createElement('div');
      stage.id = 'stage';
      ORDER.forEach(function (id) {
        var sec = $(id), sc = document.createElement('div'), pan = document.createElement('div');
        sc.className = 'frm-s';
        sc.dataset.id = id;
        pan.className = 'frm-p';
        sc.appendChild(pan);
        pan.appendChild(sec);
        if (id === 'contact') {
          pan.appendChild(document.querySelector('.wave'));
          pan.appendChild(document.querySelector('footer'));
        }
        stage.appendChild(sc);
      });
      document.body.appendChild(stage);
      var sp = document.createElement('div');
      sp.id = 'spacer';
      document.body.appendChild(sp);
      var rail = document.createElement('div');
      rail.id = 'rail';
      rail.innerHTML = ORDER.map(function (id) { return '<button type="button" data-g="' + id + '" aria-label="' + NAMES[id] + '"><span>' + NAMES[id] + '</span></button>'; }).join('');
      document.body.appendChild(rail);
      rail.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b)
        goScene(b.dataset.g); });
      var hud = document.createElement('div');
      hud.id = 'hud';
      document.body.appendChild(hud);
      var hint = document.createElement('div');
      hint.id = 'hint';
      hint.textContent = 'Scroll';
      document.body.appendChild(hint);
      document.querySelectorAll('a[href^="#"]').forEach(function (a) { a.addEventListener('click', function (e) { var id = a.getAttribute('href').slice(1); if (ORDER.indexOf(id) >= 0) {
        e.preventDefault();
        goScene(id);
      } }); });
      html.classList.add('stage-on');
    }
    var prev = ST.trig ? ST.trig.progress : 0;
    if (ST.trig)
      ST.trig.kill();
    if (ST.tl)
      ST.tl.kill();
    var scenes = [].slice.call(stage.children);
    gsap.set(scenes, { clearProps: 'all' });
    gsap.set(stage.querySelectorAll('.frm-p'), { clearProps: 'all' });
    var tl = gsap.timeline({ defaults: { ease: 'none' } }), t = 0, last = scenes.length - 1;
    ST.starts = [];
    scenes.forEach(function (sc, i) {
      var id = sc.dataset.id, pan = sc.firstChild, H = pan.offsetHeight, travel = Math.max(0, H - vh), P = Math.max(.5, travel / vh + .4), IN = i ? .7 : 0, EX = i < last ? .55 : 0, odd = i % 2, tag = sc.querySelector('.tag');
      ST.starts[i] = t;
      if (i) {
        tl.set(sc, { visibility: 'visible' }, t);
        tl.fromTo(sc, { opacity: 0, x: odd ? vw * .07 : 0, y: odd ? 0 : vh * .09, scale: .97 }, { opacity: 1, x: 0, y: 0, scale: 1, ease: 'power2.out', duration: IN }, t);
        var hh = sc.querySelector('.big-h');
        if (hh) {
          if (!hh.dataset.sp) {
            hh.dataset.sp = 1;
            hh._w = split(hh);
          }
          tl.from(hh._w, { y: 40, opacity: 0, stagger: .035, duration: .4, ease: 'power2.out' }, t + .1);
        }
        var items = sc.querySelectorAll('.dc,.sg,.cc,.repo,.pf,.tag,.sw2');
        if (items.length)
          tl.from(items, { opacity: 0, stagger: { each: .045 }, duration: .45, ease: 'power1.out' }, t + .2);
      }
      else
        tl.set(sc, { visibility: 'visible' }, 0);
      if (travel > 0)
        tl.fromTo(pan, { y: 0 }, { y: -travel, duration: P }, t + IN);
      var span = IN + P + EX, exit = t + IN + P;
      if (id === 'hero')
        tl.to('.phand', { yPercent: 100, duration: .8, ease: 'power1.inOut' }, 0).to('.cardwrap', { y: -.06 * vh, duration: IN + P }, 0);
      if (id === 'kin')
        tl.fromTo('#kin .w', { x: function (k, el) { return -.25 * vw * el.dataset.s; } }, { x: function (k, el) { return .25 * vw * el.dataset.s; }, duration: span }, t);
      if (id === 'cert')
        tl.fromTo('#badge', { rotationY: 0, rotationX: 0 }, { rotationY: 720, rotationX: 12, duration: span }, t);
      if (id === 'gh')
        tl.fromTo('#cat', { x: -.05 * vw }, { x: .06 * vw, duration: span }, t);
      if (i < last) {
        tl.to(sc, { opacity: 0, x: odd ? -vw * .07 : 0, y: odd ? 0 : -vh * .07, scale: 1.03, ease: 'power2.in', duration: EX }, exit);
        tl.set(sc, { visibility: 'hidden' }, exit + EX);
        t = exit + EX;
      }
      else
        t = exit;
    });
    gsap.set(scenes[0], { visibility: 'visible' });
    ST.D = t;
    ST.tl = tl;
    ST.scenes = scenes;
    $('spacer').style.height = Math.round(t * vh + vh) + 'px';
    ST.trig = ScrollTrigger.create({ trigger: '#spacer', start: 'top top', end: 'bottom bottom', animation: tl, scrub: true, invalidateOnRefresh: true, onUpdate: function (self) {
        var pos = self.progress * ST.D, n = 0;
        for (var k = 0; k < ST.starts.length; k++)
          if (pos >= ST.starts[k] + (k ? .35 : 0))
            n = k;
        if (n !== ST.cur) {
          ST.cur = n;
          window.__heroOff = n !== 0;
          var id = ORDER[n];
          $('hud').innerHTML = '<b>' + (n < 9 ? '0' : '') + (n + 1) + '</b>' + NAMES[id] + ' / 10';
          document.querySelectorAll('#rail button').forEach(function (b) { b.classList.toggle('on', b.dataset.g === id); });
        }
        var hn = $('hint');
        if (hn && self.progress > .02) {
          hn.remove();
        }
      } });
    ScrollTrigger.refresh();
    if (prev)
      scrollTo(0, prev * (document.documentElement.scrollHeight - vh));
  }
  var rbT = 0;
  addEventListener('resize', function () { clearTimeout(rbT); rbT = setTimeout(buildStage, 250); });
  buildStage();
  addEventListener('load', buildStage);
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(buildStage);
}
