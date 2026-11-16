# Mohamed EL-Zind — portfolio

Open `index.html` in a browser (needs internet for fonts, GSAP and Lenis).

```
index.html          page markup only
css/
  style.css         base styles (sections, cards, contact pop-ups, contract, themes)
  extras.css        certificate logo, Quick Look, contract button, Apple liquid glass
  stage.css         one-frame mode: signature intro, scenes, side rail, counter
js/                 loaded in this order (plain scripts, so it also works from a double-click)
  theme.js          theme + Apple detection (runs first, in <head>)
  config.js         YOUR DETAILS: links, skills, certificates, repositories, photos
  render.js         builds cards, skills, experience, certificates, Quick View
  contract-data.js  pre-built agreement PDF
  ui.js             theme toggle, Quick Look (Space / long-press), cursor, reveal
  hero-card.js      hero photo tilt
  contact.js        contact pills and pop-up cards
  contract.js       freelance agreement window
  motion.js         GSAP + Lenis setup, background, hero entrance
  signature.js      Arabic signature intro
  stage.js          one-frame scrolling scenes
  photo.js          optional photo link loader
  main.js           start-up
assets/             avatar.png, avatar-hand.png
```

To change content, edit `js/config.js`. To add a certificate photo, paste a Google Drive link into its `img:` field.
