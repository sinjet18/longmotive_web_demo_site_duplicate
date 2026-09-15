const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const news = fs.readFileSync(path.join(root, 'news-events.html'), 'utf8');
const redirects = fs.readFileSync(path.join(root, '_redirects'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');

assert.match(html, /'News & Events':'\/news-events'/);
assert.match(html, /if\(n==='News & Events'\)\{ window\.location\.href=NAV_PATH\[n\]/);
assert.match(news, /<link rel="canonical" href="https:\/\/www\.longmotive-m\.com\/news-events">/);
for (const href of ['/', '/about', '/projects', '/news-events', '/contact']) {
  assert.ok(news.includes(`href="${href}"`), `News navigation must link to ${href}`);
}
assert.match(redirects, /^\/news-events\s+\/news-events\.html\s+200$/m);
assert.doesNotMatch(redirects, /^\/news-events\s+\/\s+301$/m);
assert.match(sitemap, /<loc>https:\/\/www\.longmotive-m\.com\/news-events<\/loc>/);

console.log('PASS: News & Events follows the shared URL and standalone-head pattern');
