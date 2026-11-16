/* Contact pills with pop-up cards (Instagram, Facebook, LinkedIn, GitHub...). */
/* ===== A) social pills + in-page contract ===== */
var av = function () { var p = ph.getAttribute('src'); return p ? p : $('phsvg').src; };
var ic = { gh: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  li: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="9" width="4" height="12"/><circle cx="5" cy="5" r="2.2"/><path d="M10 9h3.8v1.8c.6-1.1 2-2.1 4-2.1 3.6 0 4.2 2.4 4.2 5.5V21h-4v-5.8c0-1.4 0-3.2-2-3.2s-2 1.6-2 3.1V21h-4z"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-1 .4-1.7 1.8-1.7h1.6V3.8c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.6H7.5v3.3h3.2V22z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.5-1.8-1.3-2.3-2.3l.8-1-1-2z" fill="currentColor" stroke="none"/></svg>',
  ml: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>' };
var gu = 'https://github.com/' + GH_USER, A = ' target="_blank" rel="noopener"';
var T = '<i class="tail"></i>', liu = 'https://www.linkedin.com/in/el-zind';
var fbp = FB_POST_URL ? 'post.php?href=' + encodeURIComponent(FB_POST_URL) + '&show_text=true&width=340' : FB_PAGE_URL ? 'page.php?href=' + encodeURIComponent(FB_PAGE_URL) + '&tabs=timeline&width=340&height=260&small_header=true&hide_cover=true&show_facepile=false' : '';
var fbl = fbp ? '<div class="live"><iframe data-src="https://www.facebook.com/plugins/' + fbp + '" title="Facebook" scrolling="no" loading="lazy"></iframe></div>' : '<div class="lp"><b>Latest post</b><p>Add FB_POST_URL to show your latest post live.</p></div>';
var SOC = [
  ['gh', 'GitHub', gu, 140, '<div class="pop gh"><b>GitHub · Repositories</b><div class="rl" data-lenis-prevent>' + REPOS.map(function (r) { return '<a' + A + ' href="' + gu + '/' + r[0] + '">' + r[0] + '<em>↗</em></a>'; }).join('') + '</div><a' + A + ' href="' + gu + '?tab=repositories">All repositories<em>→</em></a>' + T + '</div>', '<span class="arw" tabindex="0" aria-label="Show projects">›››</span>'],
  ['ig', 'Instagram', 'https://instagram.com/' + IG_USER, 160, '<div class="pop ig live-on"><div class="pu"><span>@' + IG_USER + '</span><button class="tg" type="button">Card view</button></div><div class="live"><iframe data-src="https://www.instagram.com/' + IG_USER + '/embed/" title="Instagram profile" scrolling="no" loading="lazy"></iframe></div><div class="pr"><div class="ring"><img class="av" alt=""></div><div class="pt"><b>Mohamed EL-Zind</b><small>Computer Science Student &amp; Front-End Developer<br>♪ Music</small></div></div><div class="pm"><div class="pbt"><a' + A + ' class="f" href="https://instagram.com/' + IG_USER + '">Follow me</a><a' + A + ' href="https://ig.me/m/' + IG_USER + '">DM</a><button class="inv" type="button">Invite</button></div><div class="pbox">Latest<br>post</div></div>' + T + '</div>'],
  ['li', 'LinkedIn', liu, 150, '<div class="pop li"><div class="ph2"><span>in</span>LinkedIn</div><div class="pr"><div class="ring2"><img class="av" alt=""></div><div class="pt"><b>Mohamed EL-Zind</b><small>Computer Science Student &amp; Front-End Developer<br>linkedin.com/in/el-zind</small></div></div><div class="pm"><div class="pbt"><a' + A + ' class="f" href="' + liu + '">Connect</a><a' + A + ' href="' + liu + '">Message</a></div></div>' + T + '</div>'],
  ['fb', 'Facebook', FB_URL, 160, '<div class="pop fb"><div class="cover"></div><div class="fr"><div class="ring2"><img class="av" alt=""></div><div class="pt"><b>Mohamed EL-Zind</b><small>Facebook</small></div></div>' + fbl + '<div class="lk"><a' + A + ' href="' + FB_URL + '">Friends</a><a' + A + ' href="' + FB_URL + '">Reels</a></div>' + T + '</div>'],
  ['wa', 'WhatsApp', 'https://wa.me/201040123425', 160, ''], ['ml', 'Email', 'mailto:elziend@icloud.com', 120, '', '<button class="ctb" id="cbtn" type="button">Freelance agreement</button>']
];
$('soc').innerHTML = SOC.map(function (x) { return '<div class="sw2 ' + x[0] + '" style="--w:' + x[3] + 'px"><a class="sb"' + A + ' href="' + x[2] + '" aria-label="' + x[1] + '"><i>' + ic[x[0]] + '</i><span>' + x[1] + '</span></a>' + (x[5] || '') + x[4] + '</div>'; }).join('');
document.querySelectorAll('.sw2').forEach(function (w) { var p = w.querySelector('.pop'); if (!p)
  return; var fit = function () { var r = w.getBoundingClientRect(), pw = Math.min(380, innerWidth * .86), l = r.left + r.width / 2 - pw / 2, dx = Math.max(12 - l, Math.min(0, innerWidth - 12 - (l + pw))); p.style.setProperty('--dx', dx + 'px'); p.classList.toggle('up', innerHeight - r.bottom < p.offsetHeight + 30 && r.top > innerHeight - r.bottom); }; w.addEventListener('mouseenter', fit); w.addEventListener('focusin', fit); });
document.querySelectorAll('.inv').forEach(function (b) { b.onclick = function () { var d = { title: 'Mohamed EL-Zind — Portfolio', text: 'Take a look at this portfolio', url: location.href }; if (navigator.share) {
  navigator.share(d).catch(function () { });
}
else if (navigator.clipboard) {
  navigator.clipboard.writeText(location.href);
  b.textContent = 'Link copied ✓';
} }; });
if (matchMedia('(hover:none)').matches)
  document.querySelectorAll('.sw2 .sb').forEach(function (b) { var w = b.parentNode; if (!w.querySelector('.pop'))
    return; b.addEventListener('click', function (e) { if (!w.classList.contains('open')) {
    e.preventDefault();
    document.querySelectorAll('.sw2.open').forEach(function (o) { o.classList.remove('open'); });
    w.classList.add('open');
  } }); });
function setAv() { document.querySelectorAll('.av').forEach(function (i) { var g = i.closest('.ig'); i.onerror = function () { i.onerror = null; i.src = av(); }; i.src = g ? 'https://unavatar.io/instagram/' + IG_USER : av(); }); }
setAv();
document.querySelectorAll('.pop .tg').forEach(function (b) { b.onclick = function () { var on = b.closest('.pop').classList.toggle('live-on'); b.textContent = on ? 'Card view' : 'Live view'; }; });
document.querySelectorAll('.sw2').forEach(function (w) { var ld = function () { w.querySelectorAll('iframe[data-src]').forEach(function (f) { f.src = f.dataset.src; f.removeAttribute('data-src'); }); }; ['mouseenter', 'click', 'focusin'].forEach(function (ev) { w.addEventListener(ev, ld, { once: true }); }); });
document.querySelectorAll('.arw').forEach(function (a) { a.onclick = function () { if (TOUCH) {
  a.parentNode.classList.toggle('open');
  return;
} var p = $('projects'); if (window.goScene)
  goScene('projects');
else
  p.scrollIntoView({ behavior: 'smooth' }); }; a.onkeydown = function (e) { if (e.key == 'Enter')
  a.onclick(); }; });
document.querySelectorAll('.sb,.arw').forEach(function (e) { e.addEventListener('mouseenter', function () { cur.classList.add('big'); }); e.addEventListener('mouseleave', function () { cur.classList.remove('big'); }); });
