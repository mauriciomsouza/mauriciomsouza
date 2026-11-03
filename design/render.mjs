// Renders the profile banner (dark and light) into ../assets at 2x.
// Usage: node design/render.mjs
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 840, height: 300 }, deviceScaleFactor: 2 });
await page.goto('file://' + path.join(dir, 'banner.html'));
await page.evaluate(() => document.fonts.ready);
for (const theme of ['dark', 'light']) {
  await page.evaluate((t) => document.body.classList.toggle('light', t === 'light'), theme);
  await page.screenshot({ path: path.join(dir, '..', 'assets', `banner-${theme}.png`) });
}
await browser.close();
