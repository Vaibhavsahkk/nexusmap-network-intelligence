import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const screenshotsDir = path.join(process.cwd(), 'public', 'screenshots');

async function captureGraph() {
  console.log('🚀 Capturing dedicated WebGL Network Graph Canvas screenshot...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000); // Allow d3-force physics to stabilize completely

  // Scroll to graph canvas section cleanly
  const graphCanvasElement = await page.$('.glass-panel');
  if (graphCanvasElement) {
    const filePath = path.join(screenshotsDir, 'graph-canvas.png');
    await graphCanvasElement.screenshot({ path: filePath });
    console.log(`✅ Dedicated graph screenshot saved to ${filePath}`);
  } else {
    console.error('Canvas element not found!');
  }

  await browser.close();
}

captureGraph().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
