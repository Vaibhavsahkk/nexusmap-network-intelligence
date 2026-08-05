import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const screenshotsDir = path.join(process.cwd(), 'public', 'screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function capture() {
  console.log('🚀 Starting screenshot capture session...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const pagesToCapture = [
    { url: 'http://localhost:3000', file: 'dashboard.png', name: 'Interactive Graph Dashboard' },
    { url: 'http://localhost:3000/search?q=Priya', file: 'search.png', name: 'Multi-Hop Graph Search' },
    { url: 'http://localhost:3000/path?to=person-10', file: 'path.png', name: 'Warm Intro Path Engine' },
    { url: 'http://localhost:3000/person/person-10', file: 'profile.png', name: 'Executive Node Profile' },
  ];

  for (const pageInfo of pagesToCapture) {
    console.log(`📸 Capturing ${pageInfo.name} at ${pageInfo.url}...`);
    const page = await context.newPage();
    await page.goto(pageInfo.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000); // Allow force graph canvas and animations to render cleanly
    const filePath = path.join(screenshotsDir, pageInfo.file);
    await page.screenshot({ path: filePath, fullPage: false });
    console.log(`✅ Saved screenshot to ${filePath}`);
    await page.close();
  }

  await browser.close();
  console.log('🎉 All screenshots successfully generated!');
}

capture().catch((err) => {
  console.error('❌ Error taking screenshots:', err);
  process.exit(1);
});
