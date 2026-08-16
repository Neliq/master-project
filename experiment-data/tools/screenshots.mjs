// Regenerate the 62 per-pattern screenshots for Master-Thesis Chapter 3.
// Usage:
//   1) Start the sandbox server:  cd /home/neliq/Coding/master-project && bun run start
//   2) Run from a directory containing puppeteer-core (e.g. /tmp/pptr):
//        bun /home/neliq/Coding/master-project/experiment-data/tools/screenshots.mjs
//   3) Output: /home/neliq/Coding/Master-Thesis/figures/patterns/<slug>.png
//   4) Rebuild the thesis: cd /home/neliq/Coding/Master-Thesis && latexmk -pdf
// Pitfall: bun resolves node_modules relative to the SCRIPT's location, so the
// script must be executed from a cwd that has puppeteer-core installed (or pass
// NODE_PATH / install puppeteer-core next to this script).
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const OUT = process.env.SHOT_DIR || "/home/neliq/Coding/Master-Thesis/figures/patterns";
const BASE = process.env.SANDBOX_URL || "http://localhost:3000";
fs.mkdirSync(OUT, { recursive: true });

// slugs in thesis/group order: parse from patterns.ts (project order is fine —
// filenames are slug-keyed, order does not matter for the figures)
const patternsSrc = fs.readFileSync(
  "/home/neliq/Coding/master-project/src/lib/patterns.ts", "utf8");
const slugs = [...patternsSrc.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
if (slugs.length !== 62) throw new Error(`expected 62 slugs, got ${slugs.length}`);

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/chromium", headless: "new", args: ["--no-sandbox"],
});

let errs = 0;
for (const slug of slugs) {
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 2400, deviceScaleFactor: 2 });
    await page.goto(`${BASE}/patterns/${slug}`, { waitUntil: "networkidle0", timeout: 30000 });
    await new Promise(r => setTimeout(r, 800)); // let React hydrate
    // First condition shell, A (deceptive) panel wrapper = header + demo content
    const el = await page.evaluateHandle(() => {
      const shell = document.querySelector('[data-dp-simulation]');
      if (!shell) return null;
      const headers = Array.from(shell.querySelectorAll('div'))
        .filter(d => /^Variant A/.test(d.textContent.trim()));
      if (!headers.length) return null;
      return headers[0].parentElement;
    });
    if (el === null || el === undefined) { console.log(`NO PANEL: ${slug}`); errs++; continue; }
    await el.asElement().screenshot({ path: path.join(OUT, `${slug}.png`) });
    await page.close();
    console.log(`ok ${slug}`);
  } catch (e) { console.log(`ERR ${slug}: ${e.message.slice(0, 80)}`); errs++; }
}
await browser.close();
console.log(`done, errors: ${errs}`);
