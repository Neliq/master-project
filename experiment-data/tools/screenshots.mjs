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
const slugFilter = new Set((process.env.SHOT_SLUGS || "")
  .split(",").map(s => s.trim()).filter(Boolean));
const allSlugs = [...patternsSrc.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
if (allSlugs.length !== 62) throw new Error(`expected 62 slugs, got ${allSlugs.length}`);
const slugs = allSlugs.filter(slug => !slugFilter.size || slugFilter.has(slug));
if (!slugs.length) throw new Error("SHOT_SLUGS selected no known slug");

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/chromium", headless: "new", args: ["--no-sandbox"],
});

const mode = process.env.SHOT_MODE || "user";
const desiredMode = mode === "auditor" ? "Auditor view" : "User view";
let errs = 0;
for (const slug of slugs) {
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 2400, deviceScaleFactor: 2 });
    await page.goto(`${BASE}/patterns/${slug}`, { waitUntil: "networkidle0", timeout: 30000 });
    await new Promise(r => setTimeout(r, 800)); // let React hydrate
    // The current Sandbox exposes each condition through a mode toggle. For
    // catalogue examples, capture the first condition wrapper in the requested
    // user/auditor mode: heading, toggle, live interface, and explanation.
    await page.evaluate((desiredMode) => {
      const button = [...document.querySelectorAll('button[aria-pressed]')]
        .find(b => (b.textContent || '').replace(/\s+/g, ' ').trim() === desiredMode);
      if (!button) throw new Error(`missing ${desiredMode} toggle`);
      button.click();
    }, desiredMode);
    await new Promise(r => setTimeout(r, 150));
    const marked = await page.evaluateHandle(() => {
      const firstShell = document.querySelector('[data-dp-simulation]');
      if (!firstShell) return null;
      let candidate = firstShell.parentElement;
      while (candidate && !candidate.querySelector('h2')) {
        candidate = candidate.parentElement;
      }
      if (!candidate) return null;
      candidate.setAttribute('data-thesis-capture', 'true');
      return candidate;
    });
    const el = marked.asElement();
    if (!el) { console.log(`NO PANEL: ${slug}`); errs++; continue; }
    await el.screenshot({ path: path.join(OUT, `${slug}.png`) });
    await page.close();
    console.log(`ok ${slug}`);
  } catch (e) { console.log(`ERR ${slug}: ${e.message.slice(0, 80)}`); errs++; }
}
await browser.close();
console.log(`done, errors: ${errs}`);
