/* Optional: loads the hero photo from MY_PHOTO_URL (set it in config.js). */
// Load the photo from the URL you configured at the top
window.addEventListener('DOMContentLoaded', function () {
  const photoImg = document.getElementById('ph');
  const svgImg = document.getElementById('phsvg');
  if (MY_PHOTO_URL && MY_PHOTO_URL.trim() !== "") {
    // Set your photo as the source
    photoImg.src = MY_PHOTO_URL;
    photoImg.style.display = 'block';
    photoImg.style.position = 'absolute';
    photoImg.style.inset = '0';
    photoImg.style.width = '100%';
    photoImg.style.height = '100%';
    photoImg.style.objectFit = 'cover';
    // Hide the placeholder SVG
    if (svgImg) {
      svgImg.style.display = 'none';
    }
  }
});
