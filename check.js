const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let out = '';
out += 'isAbout: ' + html.split('<sc-if value=\"{{ isAbout }}\">').length + '\n';
out += 'isProjects: ' + html.split('<sc-if value=\"{{ isProjects }}\">').length + '\n';
out += 'isContact: ' + html.split('<sc-if value=\"{{ isContact }}\">').length + '\n';
fs.writeFileSync('check.txt', out);
