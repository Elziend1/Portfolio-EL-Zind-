/* Boot: without GSAP the page falls back to a normal scrolling layout. */
if (!HAS_MOTION) {
  var sg0 = document.getElementById('sig');
  if (sg0)
    sg0.remove();
}
reveal();
