/* Builds the repo cards, skills, experience, certificate cards, project photos and the Quick View window. */
function drvId(u) { var m = /drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/.exec(u || ''); return m ? m[1] : null; }
function drv(u) { var i = drvId(u); return i ? 'https://lh3.googleusercontent.com/d/' + i : (u || ''); }
function drvPdf(u) { var i = drvId(u); return i ? 'https://drive.google.com/file/d/' + i + '/preview' : (u || ''); }
CERTS.forEach(function (c) { c.img = drv(c.img); c.pdf = drvPdf(c.pdf); });
var $ = function (i) { return document.getElementById(i); }, TOUCH = matchMedia('(hover:none)').matches;
$('repos').innerHTML = REPOS.map(function (r) { return '<a class="repo rv" target="_blank" rel="noopener" href="https://github.com/' + GH_USER + '/' + r[0] + '"><div class="top mono"><span>REPO</span><span class="arr">↗</span></div><h4>' + r[0] + '</h4><p>' + r[1] + '</p></a>'; }).join('');
$('ghall').href = 'https://github.com/' + GH_USER + '?tab=repositories';
fetch('https://api.github.com/users/' + GH_USER + '/repos?sort=updated&per_page=12').then(function (r) { if (!r.ok)
  throw 0; return r.json(); }).then(function (rs) { if (!rs.length)
  return; var e = function (t) { return String(t || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }; $('repos').innerHTML = rs.map(function (r) { return '<a class="repo rv in" target="_blank" rel="noopener" href="' + e(r.html_url) + '"><div class="top mono"><span>REPO</span><span class="arr">↗</span></div><h4>' + e(r.name) + '</h4><p>' + e(r.description || r.language) + '</p></a>'; }).join(''); var rl = document.querySelector('.pop.gh .rl'); if (rl)
  rl.innerHTML = rs.map(function (r) { return '<a' + A + ' href="' + e(r.html_url) + '">' + e(r.name) + '<em>↗</em></a>'; }).join(''); }).catch(function () { });
$('sk').innerHTML = SKILLS.map(function (g) { return '<div class="sg rv"><h4>' + g[0] + '</h4><div class="chips">' + g[1].map(function (s) { return '<span>' + s + '</span>'; }).join('') + '</div></div>'; }).join('');
var EXP = [['Independent Developer', 'Windows desktop application · 2026', 'Built a business system in C#/.NET with AI-assisted workflows: product catalog, pricing automation, order tracking, automated receipt printing and database backups.'], ['Front-End Developer', 'Independent web applications · 2025 – 2026', 'Built interactive client-side web apps with HTML, CSS and JavaScript, including an e-commerce store with category filtering, persistent shopping carts, marketplace status badges and WhatsApp checkout.'], ['Front-End Developer', 'Code Viper digital team · 2025 – 2026', 'Delivered three commercial digital projects with a small team: UI/UX implementation, responsive layouts and AI-assisted front-end workflows.'], ['Retail Operations &amp; Customer Support', 'Local store, Port Said · 2024 – 2025', 'Handled daily operations, 70+ daily customer inquiries with an 80% positive outcome rate, stock adjustments, cash transactions, supplier records and social media.'], ['Robotics Trainee', 'Smart Peak EV3 program · 2024 – 2025', 'Built and programmed LEGO Mindstorms EV3 robots and won one round of an EV3 sumo competition.'], ['BSc Computer Science', 'Suez Canal University · 2026 – present', 'Faculty of Computers and Informatics, Ismailia. Programming fundamentals, C++ and web technologies.'], ['Secondary education', 'Port Said Official Language School', 'Applied Mathematics track, English-medium instruction.'], ['Languages', 'Arabic · English · French', 'Arabic native, English C1 reading and writing and B2 speaking, French A1.']];
$('xp').innerHTML = EXP.map(function (x) { return '<div class="sg rv"><h4>' + x[0] + '</h4><p class="xm mono">' + x[1] + '</p><p>' + x[2] + '</p></div>'; }).join('');
function face(c) { return '<div class="cf"><div class="seal">★</div><h4>' + c.t + '</h4><p>' + c.i + (c.y ? ' · ' + c.y : '') + '</p></div>'; }
$('certs').innerHTML = CERTS.map(function (c, i) { return '<div class="cc rv" data-i="' + i + '">' + (c.img ? '<img src="' + c.img + '" alt="' + c.t + '">' : face(c)) + '<span class="hint mono">' + (TOUCH ? 'Long-press' : 'Space') + '</span></div>'; }).join('');
PHOTOS = PHOTOS.map(drv);
var POS = [['-7deg', '0%', '0%', 1], ['6deg', '40%', '4%', 2], ['4deg', '3%', '40%', 3], ['-5deg', '42%', '44%', 4]];
function stack() { return '<div class="stackc">' + POS.map(function (p, i) { var u = PHOTOS[i]; return '<figure class="pf" style="--r:' + p[0] + ';left:' + p[1] + ';top:' + p[2] + ';z-index:' + p[3] + '"><div class="pi"' + (u ? ' style="background-image:url(' + u + ')"' : '') + '>' + (u ? '' : 'PHOTO 0' + (i + 1)) + '</div><figcaption class="mono">0' + (i + 1) + '</figcaption></figure>'; }).join('') + '</div>'; }
$('pstack').innerHTML = stack();
var zt = 30;
document.addEventListener('click', function (e) { var f = e.target.closest && e.target.closest('.pf'); if (!f)
  return; var s = f.parentNode; s.querySelectorAll('.pf').forEach(function (x) { x.classList.remove('up'); }); f.style.zIndex = ++zt; f.classList.add('up'); });
function qvStack() { openQ($('pstack'), { t: 'Project photos', html: stack() }); $('pqv').style.display = 'none'; }
$('pqv').onclick = qvStack;
$('pstack').addEventListener('click', qvStack);
var qv = $('qv'), qb = $('qb'), cur_ = null;
function openQ(el, c) {
  c = c || CERTS[el.dataset.i];
  cur_ = el;
  $('qt').textContent = c.t;
  $('qm').innerHTML = c.html || (c.pdf ? '<iframe src="' + c.pdf + '"></iframe>' : c.img ? '<img src="' + c.img + '" alt="">' : face(c));
  var a = $('qa');
  a.style.display = c.pdf ? '' : 'none';
  a.href = c.pdf || '#';
  qb.style.transition = 'none';
  qb.style.transform = 'none';
  qv.classList.add('on');
  var r = el.getBoundingClientRect(), b = qb.getBoundingClientRect();
  qb.style.transform = 'translate(' + (r.left + r.width / 2 - b.left - b.width / 2) + 'px,' + (r.top + r.height / 2 - b.top - b.height / 2) + 'px) scale(' + (r.width / b.width) + ')';
  void qb.offsetWidth;
  qb.style.transition = 'transform .55s cubic-bezier(.2,.8,.2,1)';
  qb.style.transform = 'none';
}
function closeQ() { if (!cur_)
  return; var r = cur_.getBoundingClientRect(), b = qb.getBoundingClientRect(); qb.style.transform = 'translate(' + (r.left + r.width / 2 - b.left - b.width / 2) + 'px,' + (r.top + r.height / 2 - b.top - b.height / 2) + 'px) scale(' + (r.width / b.width) + ')'; qv.classList.remove('on'); cur_ = null; }
document.querySelectorAll('.cc').forEach(function (e) { e.onclick = function () { if (!TOUCH)
  openQ(e); }; e.addEventListener('pointermove', function (ev) { var r = e.getBoundingClientRect(); e.style.transform = 'perspective(700px) rotateY(' + ((ev.clientX - r.left) / r.width - .5) * 10 + 'deg) rotateX(' + (-((ev.clientY - r.top) / r.height - .5)) * 10 + 'deg)'; }); e.addEventListener('pointerleave', function () { e.style.transform = ''; }); });
$('qx').onclick = closeQ;
qv.onclick = function (e) { if (e.target == qv)
  closeQ(); };
addEventListener('keydown', function (e) { if (e.key == 'Escape')
  closeQ(); });
