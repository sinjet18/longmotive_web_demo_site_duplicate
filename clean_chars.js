const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/Â·/g, '·');
html = html.replace(/â†—/g, '↗');
html = html.replace(/â€”/g, '—');
html = html.replace(/â†/g, '←');
html = html.replace(/â†’/g, '→');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Garbled characters cleaned up.');
