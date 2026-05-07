import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projects = [
  { url: 'https://consulting.co.mz', filename: 'consulting.jpg' },
  { url: 'https://servicos.co.mz', filename: 'servicos.jpg' },
  { url: 'https://loja.print4you.co.mz', filename: 'loja-print4you.jpg' },
  { url: 'https://cv.moztraders.com', filename: 'cv-gen.jpg' },
  { url: 'https://tips.moztraders.com', filename: 'moztraders-tips.jpg' },
  { url: 'https://www.print4you.co.mz/simulador', filename: 'simulador.jpg' },
  { url: 'https://www.print4you.co.mz', filename: 'print4you.jpg' },
  { url: 'https://www.file4you.co.mz', filename: 'file4you.jpg' },
];

const outputDir = path.join(__dirname, '..', 'public', 'images');

async function captureScreenshots() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  for (const project of projects) {
    const outputPath = path.join(outputDir, project.filename);
    console.log(`Capturing: ${project.url} -> ${project.filename}`);

    try {
      const page = await context.newPage();
      await page.goto(project.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      await page.screenshot({
        path: outputPath,
        fullPage: false,
        type: 'jpeg',
        quality: 85
      });

      console.log(`  OK: ${project.filename}`);
      await page.close();
    } catch (err) {
      console.log(`  FAILED: ${project.filename} - ${err.message}`);
    }
  }

  await browser.close();
  console.log('\nDone! Images saved to public/images/');
}

captureScreenshots().catch(console.error);
