const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix the corrupted Explore block
let badBlock =       <div>
        <h4 style="color:#fff;font-size:13px;text-transform:uppercase;letter-spacing:.1em;margin:0 0 14px">Explore</h4>
        <sc-for list="{{ navItems }}" as="n" hint-placeholder-count="4">
        <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;color:var(--lm-blue-300);margin-top:18px">LONGMOTIVE (M) SDN. BHD. Â· 202201027398 (1473095-A)</div>
      </div>
      <div>
        <h4 style="color:#fff;font-size:13px;text-transform:uppercase;letter-spacing:.1em;margin:0 0 14px">Explore</h4>
        <sc-for list="{{ navItems }}" as="n" hint-placeholder-count="4">
          <div style="margin-bottom:9px"><a onClick="{{ n.onClick }}" style="cursor:pointer;color:var(--lm-blue-200);font-size:14px">{{ n.label }}</a></div>
        </sc-for>
      </div>;

let correctBlock =       <div>
        <h4 style="color:#fff;font-size:13px;text-transform:uppercase;letter-spacing:.1em;margin:0 0 14px">Explore</h4>
        <sc-for list="{{ navItems }}" as="n" hint-placeholder-count="4">
          <div style="margin-bottom:9px"><a onClick="{{ n.onClick }}" style="cursor:pointer;color:var(--lm-blue-200);font-size:14px">{{ n.label }}</a></div>
        </sc-for>
      </div>;

if (html.includes(badBlock)) {
  html = html.replace(badBlock, correctBlock);
  console.log("Replaced bad footer block.");
} else {
  console.log("Could not find the exact bad block string. Let me try with regex...");
  let regex = /<div>\s*<h4[^>]*>Explore<\/h4>\s*<sc-for list="\{\{\s*navItems\s*\}\}" as="n" hint-placeholder-count="4">\s*<div[^>]*>LONGMOTIVE \(M\) SDN\. BHD\. Â· 202201027398 \(1473095-A\)<\/div>\s*<\/div>\s*/g;
  html = html.replace(regex, '');
}

// Fix double-encoded UTF-8 characters that show up as Â· and â†—
html = html.replace(/Â·/g, '·');
html = html.replace(/â†—/g, '↗');
html = html.replace(/â€”/g, '—'); // If there are any
html = html.replace(/â†/g, '←');
html = html.replace(/â†’/g, '→');


fs.writeFileSync('index.html', html, 'utf8');
console.log('Done fixing footer and encoding.');
