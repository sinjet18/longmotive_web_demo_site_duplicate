const fs = require('fs');
let html = fs.readFileSync('news-events.html', 'utf8');

// The main sections in news-events.html
html = html.replace(
  '<section class="ne-hero-banner">',
  '<section class="ne-hero-banner lm-snapsec" style="min-height:100vh; display:flex; flex-direction:column; scroll-snap-align:start">'
);

html = html.replace(
  '<section class="ne-content-section">',
  '<section class="ne-content-section lm-snapsec" style="min-height:100vh; display:flex; flex-direction:column; scroll-snap-align:start">'
);

fs.writeFileSync('news-events.html', html, 'utf8');
console.log('news-events updated');
