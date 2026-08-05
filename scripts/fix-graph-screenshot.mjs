import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const screenshotsDir = path.join(process.cwd(), 'public', 'screenshots');

async function captureLiveGraph() {
  console.log('🚀 Launching Chromium to capture LIVE WebGL Canvas Network Graph with clip snapshot...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  console.log('⏳ Waiting 5 seconds for WebGL canvas and force network to render...');
  await page.waitForTimeout(5000);

  const graphCard = await page.$('.glass-panel');
  if (graphCard) {
    const box = await graphCard.boundingBox();
    if (box) {
      const filePath = path.join(screenshotsDir, 'dashboard.png');
      // Use page.screenshot({ clip }) to bypass perpetual particle animation stability check
      await page.screenshot({
        path: filePath,
        clip: { x: box.x, y: box.y, width: box.width, height: box.height },
      });

      const stats = fs.statSync(filePath);
      console.log(`🎉 LIVE WebGL Graph Canvas saved to ${filePath} (${stats.size} bytes)!`);
    }
  } else {
    console.error('❌ Glass panel container not found!');
  }

  await browser.close();
}

captureLiveGraph().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
