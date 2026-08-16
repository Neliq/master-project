"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { ScanSearch } from "lucide-react";

/*
 * Fear Of Missing Out (FOMO) — Condition 3: Semantic Density of Scarcity
 * and Urgency Lexemes
 *
 * Thesis: the algorithm computes the frequency of temporally urgent and
 * scarcity-signaling lexemes — "limited," "only X left," "selling fast,"
 * "ends soon" — within the visible text of a product page. The feature
 * triggers if the normalized occurrence rate per 100 words exceeds a
 * psychological-manipulation threshold τ_fomo:
 *
 *   ( |{w ∈ T : w ∈ L_FOMO}| / |T| ) × 100 > τ_fomo
 *
 * Variant A (dark): the offer copy is saturated with urgency lexemes
 * (8 lexemes across 27 words ≈ 29.6 per 100 words > τ_fomo).
 * Variant B (benign): the same factual offer in neutral wording —
 * 0 lexemes, density 0.0 < τ_fomo.
 */

const DARK_COPY =
  "LIMITED TIME — only 3 left and selling fast! This flash deal ends soon. Last chance to grab yours — don’t miss out on our one-time price.";

const BENIGN_COPY =
  "In stock — 8 units. Regular price $195, now $119. Free shipping. 30-day returns.";

const LEXEMES = [
  "limited time",
  "only 3 left",
  "selling fast",
  "flash deal",
  "ends soon",
  "last chance",
  "don’t miss out",
  "one-time",
];

function countLexemes(text: string): number {
  const lower = text.toLowerCase();
  let found = 0;
  for (const lex of LEXEMES) {
    const needle = lex.toLowerCase();
    let idx = lower.indexOf(needle);
    while (idx !== -1) {
      found += 1;
      idx = lower.indexOf(needle, idx + needle.length);
    }
  }
  return found;
}

const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;
const density = (text: string) => ((countLexemes(text) / wordCount(text)) * 100).toFixed(1);

export function FearOfMissingOutFomoCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [scanned, setScanned] = React.useState(false);

  const reset = () => setScanned(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Lexemes found (A / B)</span>
        <span className="font-mono font-semibold tabular-nums">
          {countLexemes(DARK_COPY)} <span className="text-rose-500">/</span> {countLexemes(BENIGN_COPY)}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|T| words (A / B)</span>
        <span className="font-mono font-semibold tabular-nums">{wordCount(DARK_COPY)} / {wordCount(BENIGN_COPY)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Density per 100 words (A)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{density(DARK_COPY)} &gt; τ_fomo</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Density per 100 words (B)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{density(BENIGN_COPY)} &lt; τ_fomo</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Fear Of Missing Out (FOMO): Semantic Density of Scarcity and Urgency Lexemes"
      caption="Semantic Density of Scarcity and Urgency Lexemes — the page’s visible text weaponizes linguistic scarcity, exceeding the per-100-word manipulation threshold."
      auditorStats={stats}
      deltaNote="Variant A packs 8 urgency lexemes into 27 words (≈29.6 per 100 words > τ_fomo): “LIMITED TIME,” “only 3 left,” “selling fast,” “flash deal,” “ends soon,” “last chance,” “don’t miss out,” “one-time.” Variant B conveys the same offer — $119, in stock, in neutral wording — with 0 lexemes (0.0 < τ_fomo)."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-[11px] font-semibold">AeroGlide X Wireless Headphones</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">Noise-cancelling over-ear · Graphite</p>
              </div>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                In stock
              </span>
            </div>

            <div className="mt-3 rounded-md border border-border bg-background p-2.5 text-[10px] leading-relaxed text-foreground/80">
              {BENIGN_COPY}
            </div>

            <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
              <span className="line-through">$195</span>
              <span className="font-semibold text-foreground">$119</span>
              <span className="text-[8px]">Free shipping · 30-day returns</span>
            </div>

            <button
              onClick={() => setScanned(true)}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/5 py-1.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 transition-colors cursor-pointer"
            >
              <ScanSearch className="size-3" />
              Scan copy for urgency lexemes
            </button>

            {scanned && (
              <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Lexeme scan: clean
                </div>
                <p className="text-muted-foreground mt-0.5">
                  {countLexemes(BENIGN_COPY)} urgency lexemes across {wordCount(BENIGN_COPY)} words — density{" "}
                  {density(BENIGN_COPY)} per 100 words &lt; τ_fomo. Same product, same price, no manufactured panic.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-[11px] font-semibold">AeroGlide X Wireless Headphones</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">Noise-cancelling over-ear · Graphite</p>
            </div>
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              Only 3 left
            </span>
          </div>

          <div className="mt-3 rounded-md border border-rose-500/25 bg-background p-2.5 text-[10px] leading-relaxed text-foreground/80">
            <span className="rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 px-0.5 font-semibold">LIMITED TIME</span>
            {" — "}
            <span className="rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 px-0.5 font-semibold">only 3 left</span>
            {" and "}
            <span className="rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 px-0.5 font-semibold">selling fast</span>
            {"! This "}
            <span className="rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 px-0.5 font-semibold">flash deal</span>
            {" "}
            <span className="rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 px-0.5 font-semibold">ends soon</span>
            {". "}
            <span className="rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 px-0.5 font-semibold">Last chance</span>
            {" to grab yours — "}
            <span className="rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 px-0.5 font-semibold">don’t miss out</span>
            {" on our "}
            <span className="rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 px-0.5 font-semibold">one-time</span>
            {" price."}
          </div>

          <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
            <span className="line-through">$195</span>
            <span className="font-semibold text-foreground">$119</span>
            <span className="text-[8px] font-semibold uppercase tracking-wider text-rose-500">Ends soon</span>
          </div>

          <button
            onClick={() => setScanned(true)}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md border border-rose-500/30 bg-rose-500/5 py-1.5 text-[10px] font-medium text-rose-700 dark:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <ScanSearch className="size-3" />
            Scan copy for urgency lexemes
          </button>

          {scanned && (
            <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Lexeme density exceeds τ_fomo
              </div>
              <p className="text-muted-foreground">
                The highlighted tokens are L_FOMO lexemes: {countLexemes(DARK_COPY)} across {wordCount(DARK_COPY)} words.
                Density = ({countLexemes(DARK_COPY)} / {wordCount(DARK_COPY)}) × 100 ={" "}
                <strong className="text-rose-500">{density(DARK_COPY)} per 100 words &gt; τ_fomo</strong> — the page
                weaponizes linguistic scarcity to override rational deliberation.
              </p>
              <p className="text-muted-foreground">
                The offer itself is ordinary — the wording is what does the work.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
