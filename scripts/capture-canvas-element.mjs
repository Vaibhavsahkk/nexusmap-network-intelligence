import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const screenshotsDir = path.join(process.cwd(), 'public', 'screenshots');

async function run() {
  console.log('📸 Capturing ultra-sharp 4K element screenshot of WebGL Network Graph Canvas...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4500); // Allow d3-force physics to stabilize cleanly

  // Target the WebGL Force Graph container element specifically
  const canvasElement = await page.$('.glass-panel');
  if (canvasElement) {
    // Scroll element into view cleanly before cropping
    await canvasElement.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const croppedPath = path.join(screenshotsDir, 'dashboard.png');
    await canvasElement.screenshot({ path: croppedPath });
    console.log(`✅ Saved CROPPED Graph Canvas screenshot to ${croppedPath}`);
  } else {
    console.error('❌ Canvas element .glass-panel not found!');
  }

  await browser.close();
}

run().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
