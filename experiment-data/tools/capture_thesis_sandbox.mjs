// Capture representative current Sandbox condition screenshots for Chapter 5.
// Run from the Sandbox repository (where puppeteer-core is installed):
//   SANDBOX_URL=http://127.0.0.1:3000 \
//   SHOT_DIR=/home/neliq/Coding/Master-Thesis/figures \
//   bun experiment-data/tools/capture_thesis_sandbox.mjs
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.SANDBOX_URL || "http://127.0.0.1:3000";
const OUT = process.env.SHOT_DIR || "/home/neliq/Coding/Master-Thesis/figures";
const SLUG = process.env.SANDBOX_SLUG || "privacy-maze";
const MODES = [
  ["user", "User view", "fig-sandbox-privacy-maze.png"],
  ["auditor", "Auditor view", "fig-sandbox-auditor.png"],
];

fs.mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: "new",
  args: ["--no-sandbox"],
});

for (const [mode, desiredMode, filename] of MODES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1800, deviceScaleFactor: 1 });
  await page.goto(`${BASE}/patterns/${SLUG}`, {
    waitUntil: "networkidle0",
    timeout: 30000,
  });
  await new Promise((resolve) => setTimeout(resolve, 800));

  await page.evaluate((desired) => {
    const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
    const buttons = [...document.querySelectorAll("button[aria-pressed]")]
      .filter((button) => norm(button.textContent) === desired);
    if (buttons.length !== 3) {
      throw new Error(`expected 3 ${desired} buttons, found ${buttons.length}`);
    }
    for (const button of buttons) button.click();
  }, desiredMode);
  await new Promise((resolve) => setTimeout(resolve, 200));

  const marked = await page.evaluateHandle(() => {
    const firstShell = document.querySelector("[data-dp-simulation]");
    if (!firstShell) throw new Error("missing simulation shell");
    let candidate = firstShell.parentElement;
    while (candidate && !candidate.querySelector("h2")) {
      candidate = candidate.parentElement;
    }
    if (!candidate) throw new Error("missing first condition wrapper");
    candidate.setAttribute("data-thesis-capture", "true");
    return candidate;
  });
  const element = marked.asElement();
  if (!element) throw new Error("first condition wrapper is not an element");
  await element.screenshot({ path: path.join(OUT, filename) });
  await page.close();
  console.log(`ok ${mode}: ${filename}`);
}

await browser.close();
console.log("done, errors: 0");
