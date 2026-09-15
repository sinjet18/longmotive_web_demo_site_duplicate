const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Enable scroll snap for Contact
html = html.replace(
  "document.documentElement.style.scrollSnapType = (scr==='Home'||scr==='About') ? 'y proximity' : '';",
  "document.documentElement.style.scrollSnapType = (scr==='Home'||scr==='About'||scr==='Contact') ? 'y proximity' : '';"
);

// 2. Add snap classes and styles to Contact sections
// We will just replace the exact <section style="..."> strings we injected
html = html.replace(
  '<section style="padding:76px var(--gutter) 40px; border-bottom:1px solid rgba(255,255,255,0.05)">',
  '<section class="lm-snapsec" style="min-height:100vh; display:flex; flex-direction:column; justify-content:center; padding:76px var(--gutter) 40px; border-bottom:1px solid rgba(255,255,255,0.05); scroll-snap-align:start">'
);
html = html.replace(
  '<section style="padding:56px var(--gutter)">',
  '<section class="lm-snapsec" style="min-height:100vh; display:flex; flex-direction:column; justify-content:center; padding:56px var(--gutter); scroll-snap-align:start">'
);
html = html.replace(
  '<section style="padding:56px var(--gutter);border-top:1px solid rgba(255,255,255,0.05)">',
  '<section class="lm-snapsec" style="min-height:100vh; display:flex; flex-direction:column; justify-content:center; padding:56px var(--gutter); border-top:1px solid rgba(255,255,255,0.05); scroll-snap-align:start">'
);
html = html.replace(
  '<section style="padding:56px var(--gutter) 80px;border-top:1px solid rgba(255,255,255,0.05);text-align:center">',
  '<section class="lm-snapsec" style="min-height:100vh; display:flex; flex-direction:column; justify-content:center; padding:56px var(--gutter) 80px; border-top:1px solid rgba(255,255,255,0.05); text-align:center; scroll-snap-align:start">'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Modifications applied.');
