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

const BENIGN_COPY =
  "In stock — 8 units. Regular price $195, now $119. Free shipping. 30-day returns.";

export function FearOfMissingOutFomoCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [scannedA, setScannedA] = React.useState(false);
  const [scannedB, setScannedB] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Fear Of Missing Out (FOMO): Semantic Density of Scarcity and Urgency Lexemes"
      userTitle="AeroGlide X — Offer"
      caption="Semantic Density of Scarcity and Urgency Lexemes — the page’s visible text weaponizes linguistic scarcity, exceeding the per-100-word manipulation threshold."
      deltaNote="Variant A packs 8 urgency lexemes into 27 words (≈29.6 per 100 words > τ_fomo): “LIMITED TIME,” “only 3 left,” “selling fast,” “flash deal,” “ends soon,” “last chance,” “don’t miss out,” “one-time.” Variant B conveys the same offer — $119, in stock, in neutral wording — with 0 lexemes (0.0 < τ_fomo)."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-[11px] font-semibold">AeroGlide X Wireless Headphones</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">Noise-cancelling over-ear · Graphite</p>
              </div>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
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
              onClick={() => setScannedB(true)}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md border border-border/60 bg-muted/40 py-1.5 text-[10px] font-medium text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
            >
              <ScanSearch className="size-3" />
              Review offer wording
            </button>

            {scannedB && (
              <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Offer wording reviewed
                </div>
                <p className="text-muted-foreground mt-0.5">
                  The price, stock, shipping, and returns are all visible in plain language. Same product,
                  same price, no manufactured panic.
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
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
              Only 3 left
            </span>
          </div>

          <div className="mt-3 rounded-md border border-border/60 bg-background p-2.5 text-[10px] leading-relaxed text-foreground/80">
            <span className="rounded bg-muted/40 text-foreground px-0.5 font-semibold">LIMITED TIME</span>
            {" — "}
            <span className="rounded bg-muted/40 text-foreground px-0.5 font-semibold">only 3 left</span>
            {" and "}
            <span className="rounded bg-muted/40 text-foreground px-0.5 font-semibold">selling fast</span>
            {"! This "}
            <span className="rounded bg-muted/40 text-foreground px-0.5 font-semibold">flash deal</span>
            {" "}
            <span className="rounded bg-muted/40 text-foreground px-0.5 font-semibold">ends soon</span>
            {". "}
            <span className="rounded bg-muted/40 text-foreground px-0.5 font-semibold">Last chance</span>
            {" to grab yours — "}
            <span className="rounded bg-muted/40 text-foreground px-0.5 font-semibold">don’t miss out</span>
            {" on our "}
            <span className="rounded bg-muted/40 text-foreground px-0.5 font-semibold">one-time</span>
            {" price."}
          </div>

          <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
            <span className="line-through">$195</span>
            <span className="font-semibold text-foreground">$119</span>
            <span className="text-[8px] font-semibold uppercase tracking-wider text-foreground">Ends soon</span>
          </div>

          <button
            onClick={() => setScannedA(true)}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md border border-border/60 bg-muted/40 py-1.5 text-[10px] font-medium text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
          >
            <ScanSearch className="size-3" />
            Review offer wording
          </button>

          {scannedA && (
            <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Offer details
              </div>
              <p className="text-muted-foreground">
                This offer is available while supplies last.
                The headline emphasizes stock and timing much more strongly than the product details,
                making the ordinary offer feel harder to postpone.
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
