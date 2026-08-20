import { mkdir, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = join(root, "..", "..", "public", "cases");

const shots = (await readdir(root))
  .filter((file) => file.endsWith(".html"))
  .map((file) => file.replace(/\.html$/, ""));

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });

for (const id of shots) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  await page.goto(pathToFileURL(join(root, `${id}.html`)).href, {
    waitUntil: "networkidle",
    timeout: 45_000,
  });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.screenshot({ path: join(outDir, `${id}.png`), type: "png" });
  await page.close();
  console.log("captured", id);
}

await browser.close();
