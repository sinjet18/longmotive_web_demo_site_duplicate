const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/\uFFFD\?"/g, '—');
html = html.replace(/A\uFFFD/g, '·');
html = html.replace(/\uFFFD\+\?/g, '←');
html = html.replace(/\uFFFD\+'/g, '→');
html = html.replace(/\uFFFD\+-/g, '↗');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed garbled characters');
