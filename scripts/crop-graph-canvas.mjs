import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const screenshotsDir = path.join(process.cwd(), 'public', 'screenshots');

async function run() {
  console.log('🚀 Scrolling directly to WebGL Network Graph Canvas...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 800 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Wait 4 seconds for d3-force WebGL network to fully render
  await page.waitForTimeout(4000);

  // Scroll down so the graph canvas container is perfectly centered!
  await page.evaluate(() => {
    const el = document.querySelector('.glass-panel');
    if (el) {
      el.scrollIntoView({ block: 'center', inline: 'center' });
    }
  });

  await page.waitForTimeout(1000);

  const filePath = path.join(screenshotsDir, 'dashboard.png');
  await page.screenshot({ path: filePath, fullPage: false });

  const stats = fs.statSync(filePath);
  console.log(`🎉 PERFECT WebGL Network Graph Screenshot saved to ${filePath} (${stats.size} bytes)!`);

  await browser.close();
}

run().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
