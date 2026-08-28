import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const root = dirname(fileURLToPath(import.meta.url));
const publicDir = join(root, "..", "..", "public");

const jobs = [
  { html: "en.html", out: "resume-en.pdf" },
  { html: "ru.html", out: "resume-ru.pdf" },
];

await mkdir(publicDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });

for (const { html, out } of jobs) {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(join(root, html)).href, {
    waitUntil: "networkidle",
    timeout: 45_000,
  });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.pdf({
    path: join(publicDir, out),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
  await page.close();
  console.log("wrote", out);
}

await copyFile(join(publicDir, "resume-en.pdf"), join(publicDir, "resume.pdf"));
console.log("wrote resume.pdf (en alias)");

await browser.close();
