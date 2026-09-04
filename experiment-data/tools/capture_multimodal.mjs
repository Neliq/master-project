// Capture multimodal evidence bundles for the frozen opaque-ID corpus.
// The DOM/text inputs are copied from the accepted corpus; screenshots are
// current rendered target panels with no variant labels or auditor explanation.
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const EXP = path.resolve(process.env.EXPERIMENT_DIR || path.join(path.dirname(new URL(import.meta.url).pathname), ".."));
const OUT = path.resolve(process.env.MULTIMODAL_DIR || path.join(EXP, "results", "run6-multimodal"));
const BASE = process.env.SANDBOX_BASE_URL || "http://127.0.0.1:3000";
const CHROMIUM = process.env.CHROMIUM_PATH || "/usr/bin/chromium";
const MAX_STATES = Number(process.env.MAX_STATES || 4);
const slugFilter = new Set((process.env.SLUG_FILTER || "").split(",").map(s => s.trim()).filter(Boolean));


const instances = JSON.parse(fs.readFileSync(path.join(EXP, "instances.json"), "utf8"));
const corpus = path.join(EXP, "corpus");
const selected = Object.entries(instances)
  .filter(([, m]) => !slugFilter.size || slugFilter.has(m.slug))
  .sort((a, b) => a[1].slug.localeCompare(b[1].slug) || a[1].condition_index - b[1].condition_index || a[1].variant.localeCompare(b[1].variant));
const byKey = new Map(selected.map(([iid, m]) => [`${m.slug}:${m.condition_index}:${m.variant}`, iid]));
const slugs = [...new Set(selected.map(([, m]) => m.slug))];
if (!selected.length) throw new Error("no selected instances");


function normHtml(html) {
  return html.replace(/\s+/g, " ").trim();
}
function expectedStateCount(iid) {
  const html = fs.readFileSync(path.join(corpus, `${iid}.html`), "utf8");
  return (html.match(/<!-- state s\d+ -->/g) || []).length;
}

fs.mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROMIUM, headless: "new", args: ["--no-sandbox"] });
const records = [];
let errors = 0;

for (const slug of slugs) {
  for (const variant of ["A", "B"]) {
    let page;
    try {
      page = await browser.newPage();
      await page.setViewport({ width: 1400, height: 3000, deviceScaleFactor: 1 });
      await page.goto(`${BASE}/patterns/${slug}`, { waitUntil: "networkidle0", timeout: 30000 });
      await new Promise(r => setTimeout(r, 900));
      const desiredMode = variant === "A" ? "User view" : "Auditor view";
      const switched = await page.evaluate(async (desired) => {
        const norm = s => (s || "").replace(/\s+/g, " ").trim();
        const buttons = [...document.querySelectorAll("button[aria-pressed]")].filter(b => norm(b.textContent) === desired);
        if (buttons.length !== 3) throw new Error(`expected 3 ${desired} buttons, found ${buttons.length}`);
        buttons.forEach(b => b.click());
        await new Promise(r => setTimeout(r, 250));
        return [...document.querySelectorAll("button[aria-pressed]")].filter(b => norm(b.textContent) === desired).every(b => b.getAttribute("aria-pressed") === "true");
      }, desiredMode);
      if (!switched) throw new Error(`mode did not switch to ${desiredMode}`);
      const shellInfo = await page.evaluate((variant) => {
        const shells = [...document.querySelectorAll("[data-dp-simulation]")];
        if (shells.length !== 3) throw new Error(`expected 3 shells, found ${shells.length}`);
        return shells.map((shell, index) => {
          let target = shell.querySelector("[data-dp-content]");
          if (variant === "B") {
            const grid = shell.firstElementChild;
            const cards = grid ? [...grid.children].filter(e => e.matches("div")) : [];
            if (cards.length < 2) throw new Error(`missing auditor comparison cards in shell ${index}`);
            target = cards[1].querySelector("[data-dp-content]");
          }
          if (!target) throw new Error(`missing target content in shell ${index}`);
          const text = target.innerText || "";
          if (/Variant\s+[AB]|dark pattern|non-dark pattern|What changed/i.test(text)) {
            throw new Error(`target ${index} contains auditor or variant marker text`);
          }
          return { index, text: text.slice(0, 200) };
        });
      }, variant);
      await page.addStyleTag({ content: "[data-mm-hidden-audit]{display:none!important}" });

      for (const info of shellInfo) {
        const condition = info.index + 1;
        const iid = byKey.get(`${slug}:${condition}:${variant}`);
        if (!iid) throw new Error(`missing opaque mapping ${slug}:${condition}:${variant}`);
        const dir = path.join(OUT, iid);
        fs.mkdirSync(dir, { recursive: true });
        const target = await page.evaluateHandle((variant, index) => {
          const shell = [...document.querySelectorAll("[data-dp-simulation]")][index];
          if (variant === "A") return shell.querySelector("[data-dp-content]");
          const cards = [...shell.firstElementChild.children].filter(e => e.matches("div"));
          return cards[1].querySelector("[data-dp-content]");
        }, variant, info.index);
        const element = target.asElement();
        if (!element) throw new Error(`target handle unavailable for ${iid}`);
        const expected = expectedStateCount(iid);
        const states = [];
        for (let step = 0; step < MAX_STATES; step++) {
          const state = await page.evaluate(el => ({ html: el.innerHTML, text: el.innerText || "" }), element);
          await page.evaluate((el) => {
            const marker = /Variant\s+[AB]|dark pattern|non-dark pattern|What changed|heuristic|[τλδ]_[A-Za-z]|delta_/i;
            const interactive = (node) => !!node.querySelector("button, a, input, select, textarea");
            const nodes = [el, ...el.querySelectorAll("*")].sort((a, b) => b.querySelectorAll("*").length - a.querySelectorAll("*").length);
            for (const node of nodes) {
              if (!marker.test(node.innerText || "") || interactive(node)) continue;
              const childMarker = [...node.children].some(child => marker.test(child.innerText || ""));
              if (!childMarker) node.setAttribute("data-mm-hidden-audit", "true");
            }
          }, element);
          const visibleText = await page.evaluate(el => el.innerText || "", element);
          if (/Variant\s+[AB]|dark pattern|non-dark pattern|What changed|heuristic|[τλδ]_[A-Za-z]|delta_/i.test(visibleText)) {
            throw new Error(`state ${step} of ${iid} contains unsanitizable marker text`);
          }
          const filename = `s${step}.png`;
          await element.screenshot({ path: path.join(dir, filename) });
          await page.evaluate(el => el.querySelectorAll("[data-mm-hidden-audit]").forEach(node => node.removeAttribute("data-mm-hidden-audit")), element);
          states.push({ state: step, screenshot: filename, text_chars: visibleText.length, html_sha256: null });
          const buttons = await page.evaluate(el => [...el.querySelectorAll("button")].filter(b => {
            const t = (b.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
            return t && !b.disabled && !["restart demo", "restart", "reset", "back to store", "back", "go back", "undo", "home", "close", "dismiss", "×"].some(w => t.includes(w));
          }).length, element);
          if (!buttons) break;
          await page.evaluate(el => {
            const b = [...el.querySelectorAll("button")].find(x => {
              const t = (x.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
              return t && !x.disabled && !["restart demo", "restart", "reset", "back to store", "back", "go back", "undo", "home", "close", "dismiss", "×"].some(w => t.includes(w));
            });
            if (b) b.click();
          }, element);
          await new Promise(r => setTimeout(r, 450));
          const changed = await page.evaluate((el, previous) => el.innerHTML.replace(/\s+/g, " ").trim() !== previous, element, normHtml(state.html));
          if (!changed) break;
        }
        if (!states.length) throw new Error(`${iid}: captured no states`);
        records.push({ instance_id: iid, slug, condition_index: condition, variant,
          color_transform: "none", expected_sanitized_states: expected,
          captured_live_states: states.length, states });
        await target.dispose();
      }
      console.log(`ok ${slug} [${variant}]`);
    } catch (e) {
      errors++;
      console.log(`ERROR ${slug} [${variant}]: ${String(e).slice(0, 240)}`);
    } finally {
      if (page) await page.close().catch(() => {});
    }
  }
}

fs.writeFileSync(path.join(OUT, "bundle-index.json"), JSON.stringify({ run_id: "run6-multimodal", base_url: BASE, max_states: MAX_STATES, color_transform: "none", records }, null, 2) + "\n");
console.log(`DONE: ${records.length} bundles, ${errors} errors`);
await browser.close();
if (errors) process.exitCode = 1;
