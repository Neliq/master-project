import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const BASE = "http://localhost:3000";
const EXP = "/home/neliq/Coding/master-project/experiment-data";
const CORPUS = process.env.CAPTURE_DIR || path.join(EXP, "corpus");
const LOG = "/tmp/mstate.log";
const MAX_STATES = 4;

const manifest = JSON.parse(fs.readFileSync(path.join(EXP, "manifest.json"), "utf8"));
const slugs = [...new Set(manifest.map((m) => m.slug))].sort();

fs.writeFileSync(LOG, "");
const log = (msg) => fs.appendFileSync(LOG, msg + "\n");

const norm = (s) => s.replace(/\s+/g, " ").trim();
const STOP = new Set(["restart demo", "restart", "reset", "back to store", "back", "go back", "undo", "home", "close", "dismiss", "×"]);

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/chromium",
  headless: "new",
  args: ["--no-sandbox"],
});

let written = 0;
let errors = 0;

for (const slug of slugs) {
  const manifestFor = manifest.filter((m) => m.slug === slug);
  // Per-variant page loads: some demos share a single useState between the A
  // and B panels; capturing both panels in one page load would let A's clicks
  // advance B's state. Each variant gets a FRESH page load, clicking only in
  // the target panel.
  for (const variant of ["A", "B"]) {
    let page;
    try {
      page = await browser.newPage();
      await page.setViewport({ width: 1400, height: 3000 });
      await page.goto(`${BASE}/patterns/${slug}`, { waitUntil: "networkidle0", timeout: 20000 });
      await new Promise((r) => setTimeout(r, 1200));

      const captures = await page.evaluate(async (variant, maxStates) => {
        const norm = (s) => s.replace(/\s+/g, " ").trim();
        const STOP = new Set(["restart demo", "restart", "reset", "back to store", "back", "go back", "undo", "home", "close", "dismiss", "×"]);

        const perShell = async (shell) => {
          const isHeader = (t) => new RegExp(`^Variant ${variant} — (Dark|Non-dark) pattern$`).test(t);
          const headers = [...shell.querySelectorAll("div")].filter((d) => isHeader(norm(d.textContent || "")));
          if (!headers.length) return null;
          const h = headers[0];
          const panel = h.nextElementSibling;
          if (!panel) return null;

          const states = [];
          for (let step = 0; step < maxStates; step++) {
            states.push(panel.innerHTML);
            const btns = [...panel.querySelectorAll("button")].filter((b) => {
              const t = norm(b.textContent || "").toLowerCase();
              if (!t) return false;
              if (b.disabled) return false;
              return ![...STOP].some((w) => t.includes(w));
            });
            if (!btns.length) break;
            btns[0].click();
            await new Promise((r) => setTimeout(r, 450));
            const cur = norm(panel.innerHTML);
            if (cur === norm(states[states.length - 1])) break; // no change
            if (states.length >= maxStates) break;
          }
          return states;
        };

        const shells = [...document.querySelectorAll("[data-dp-simulation]")];
        const out = [];
        for (let si = 0; si < shells.length; si++) {
          const states = await perShell(shells[si]);
          out.push(states);
        }
        return out;
      }, variant, MAX_STATES);

      const shellsFor = manifestFor.filter((m) => m.variant === variant);
      for (let si = 0; si < shellsFor.length; si++) {
        const entry = shellsFor[si];
        const states = captures[si];
        const file = path.join(CORPUS, entry.file.replace("corpus/", ""));
        if (!states || !states.length) {
          log(`${slug} [${variant}]: NO STATES for shell ${si}`);
          errors++;
          continue;
        }
        const body = states.map((s, i) => `<!-- state s${i} -->\n${s}`).join("\n");
        fs.writeFileSync(file, body);
        entry.size_bytes = Buffer.byteLength(body, "utf8");
        written++;
      }
      log(`${slug} [${variant}]: ${shellsFor.length} shells OK`);
    } catch (e) {
      log(`${slug} [${variant}]: ERROR ${String(e).slice(0, 200)}`);
      errors++;
    } finally {
      if (page) await page.close().catch(() => {});
    }
  }
}

// refresh manifest sizes
fs.writeFileSync(path.join(EXP, "manifest.json"), JSON.stringify(manifest, null, 1));
console.log(`DONE: ${written} instances written, ${errors} errors`);
await browser.close();
