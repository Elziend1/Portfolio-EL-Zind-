/* Runs first: applies the saved/system theme and marks Apple devices (for the liquid glass). */
(function () {
  var d = document.documentElement, t = null;
  try {
    t = localStorage.getItem('theme');
  }
  catch (e) { }
  if (!t)
    t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  d.dataset.theme = t;
  if (/iPhone|iPad|iPod|Macintosh|Mac OS X/.test(navigator.userAgent) || (navigator.platform || '').indexOf('Mac') == 0)
    d.classList.add('apple');
})();
