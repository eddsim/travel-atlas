import { chromium } from 'playwright';
import { writeFile, rm } from 'node:fs/promises';

const URL = 'https://travel.606858.xyz/2026/09-24-phuket';
const INDEX = 'public/trips/2026/09-24-phuket/index.html';
const REMOVE = [
  'public/trips/2026/09-24-phuket/base.html',
  'public/trips/2026/09-24-phuket/phuket-journey-map.jpg',
  'public/trips/2026/09-24-phuket/README.tmp'
];

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('.day-nav', { timeout: 30000 });
  await page.waitForSelector('#prep', { timeout: 30000 });
  await page.waitForFunction(() => {
    const img = document.querySelector('.journey-overview img');
    return img && img.complete && img.naturalWidth > 0;
  }, { timeout: 30000 });
  await page.waitForFunction(() => document.querySelectorAll('[data-check-id]').length >= 20, { timeout: 30000 });
  await page.waitForTimeout(800);

  await page.evaluate(() => {
    document.body.classList.remove('night');
    window.scrollTo(0, 0);
  });

  const html = await page.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML);

  const required = ['class="day-nav"', 'id="prep"', 'phuket-journey-map.png', 'data-check-id=', 'focusTransport'];
  for (const marker of required) {
    if (!html.includes(marker)) throw new Error(`Missing required marker: ${marker}`);
  }
  if (html.includes('/trips/2026/09-24-phuket/base.html')) {
    throw new Error('Captured page still depends on base.html');
  }

  await writeFile(INDEX, html, 'utf8');
  for (const path of REMOVE) await rm(path, { force: true });
  console.log(`Wrote consolidated index (${html.length} chars)`);
} finally {
  await browser.close();
}
