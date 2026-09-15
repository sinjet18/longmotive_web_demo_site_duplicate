const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The corrupted footer section in html currently looks like:
//       <div>
//         <h4 style="color:#fff;font-size:13px;text-transform:uppercase;letter-spacing:.1em;margin:0 0 14px">Explore</h4>
//         <sc-for list=\"{{ navItems }}\" as=\"n\" hint-placeholder-count=\"4\">
//         <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;color:var(--lm-blue-300);margin-top:18px">LONGMOTIVE (M) SDN. BHD. · 202201027398 (1473095-A)</div>
//       </div>
//       <div>
//         <h4 style="color:#fff;font-size:13px;text-transform:uppercase;letter-spacing:.1em;margin:0 0 14px">Explore</h4>
//         <sc-for list=\"{{ navItems }}\" as=\"n\" hint-placeholder-count=\"4\">
//           <div style="margin-bottom:9px"><a onClick=\"{{ n.onClick }}\" style="cursor:pointer;color:var(--lm-blue-200);font-size:14px">{{ n.label }}</a></div>
//         </sc-for>
//       </div>

let badFooterRegex = /<div>\s*<h4[^>]*>Explore<\/h4>\s*<sc-for list="\{\{\s*navItems\s*\}\}" as="n" hint-placeholder-count="4">\s*<div[^>]*>LONGMOTIVE[\s\S]*?<\/div>\s*<\/div>\s*<div>\s*<h4[^>]*>Explore<\/h4>/;

if (badFooterRegex.test(html)) {
  html = html.replace(badFooterRegex, '<div>\n        <h4 style="color:#fff;font-size:13px;text-transform:uppercase;letter-spacing:.1em;margin:0 0 14px">Explore</h4>');
}

// Since PowerShell WriteAllText might have corrupted the encoding to ANSI/Windows-1252, we might need to fix the characters if they are garbled.
// Actually, reading it in utf8 might just preserve the bytes if they were written as utf8 BOM.
// Let's just strip BOM if present.
if (html.charCodeAt(0) === 0xFEFF) {
  html = html.slice(1);
}

// Re-write it cleanly.
fs.writeFileSync('index.html', html, 'utf8');
console.log('Footer fixed');
