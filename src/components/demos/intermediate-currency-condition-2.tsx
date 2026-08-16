"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { ShoppingCart, Gem, SearchCheck } from "lucide-react";

/*
 * Intermediate Currency — Condition 2: Visual Obscuration of Real-Currency Equivalence
 *
 * Thesis: N_virtual is a virtual-currency price label (e.g. "4,500 Gems");
 * N_real is its real-currency conversion equivalent rendered in the same
 * viewport. The feature fires if the real-cost disclosure is entirely absent
 * or rendered at a font size below 50% of the base body text:
 *
 *   N_real = ∅  ∨  fontSize(N_real) / S_base < 0.5
 *
 * Variant A (dark): the "$45.00" equivalent is present but printed at 7px
 * against a 16px base — ratio 0.44, below the 0.5 threshold.
 * Variant B (benign): the identical price disclosure is rendered at the full
 * 16px base size — ratio 1.0, no obscuration.
 */

const ITEM_NAME = "Legendary Dragon Skin";
const GEM_PRICE = 4500;
const REAL_PRICE = "$45.00";
const BASE_SIZE_PX = 16;
const TINY_SIZE_PX = 7;
const RATIO_DARK = (TINY_SIZE_PX / BASE_SIZE_PX).toFixed(2); // 0.44
const RATIO_BENIGN = (BASE_SIZE_PX / BASE_SIZE_PX).toFixed(2); // 1.00

export function IntermediateCurrencyCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [bought, setBought] = React.useState(false);

  const reset = () => {
    setBought(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">N_virtual label</span>
        <span className="font-mono font-semibold tabular-nums">{GEM_PRICE.toLocaleString()} Gems</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">N_real disclosure</span>
        <span className="font-mono font-semibold tabular-nums">{REAL_PRICE} (present)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">fontSize(N_real)/S_base — dark</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{TINY_SIZE_PX}px/{BASE_SIZE_PX}px = {RATIO_DARK} &lt; 0.5</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">fontSize(N_real)/S_base — benign</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{BASE_SIZE_PX}px/{BASE_SIZE_PX}px = {RATIO_BENIGN} &ge; 0.5</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Intermediate Currency: Visual Obscuration of Real-Currency Equivalence"
      caption="Visual Obscuration of Real-Currency Equivalence — the real-dollar price of an item priced in gems exists in the viewport, but it is printed so small that it falls below the 50%-of-base-size threshold."
      auditorStats={stats}
      deltaNote={`Both panels show the same item, the same 4,500 Gems price, and the same $45.00 equivalent. Variant A prints the real price at ${TINY_SIZE_PX}px against a ${BASE_SIZE_PX}px base (ratio ${RATIO_DARK} < 0.5 — trigger fires); Variant B prints it at the full ${BASE_SIZE_PX}px base size (ratio ${RATIO_BENIGN} ≥ 0.5 — no trigger). The information is identical; only the typography differs.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-background overflow-hidden">
            <div className="relative flex h-24 items-center justify-center bg-gradient-to-br from-emerald-500/15 via-teal-500/15 to-indigo-500/15">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow">
                <Gem className="h-6 w-6 text-white" />
              </div>
              <div className="absolute top-2 right-2 rounded-full bg-amber-500 px-2 py-0.5 text-[8px] font-bold text-white">
                LIMITED
              </div>
            </div>
            <div className="p-3">
              <div className="mb-1 flex items-start justify-between gap-2">
                <h3 className="text-[11px] font-semibold">{ITEM_NAME}</h3>
                <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {GEM_PRICE.toLocaleString()} Gems
                </span>
              </div>
              {/* Real-price disclosure at FULL base size (ratio 1.0) */}
              <div className="mb-3 text-[10px] font-medium tabular-nums text-foreground">
                ≈ {REAL_PRICE} <span className="font-normal text-muted-foreground">/ {GEM_PRICE.toLocaleString()} Gems</span>
              </div>
              <p className="mb-3 text-[9px] leading-relaxed text-muted-foreground">
                A one-of-a-kind animated skin for your hero. Cosmetic only — no stat changes.
              </p>
              <button
                onClick={() => setBought(true)}
                className="flex w-full items-center justify-center gap-1.5 rounded-md bg-emerald-600 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-emerald-700 cursor-pointer"
              >
                <ShoppingCart className="h-3 w-3" />
                Buy for {GEM_PRICE.toLocaleString()} Gems
              </button>
            </div>
          </div>

          {bought && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <SearchCheck className="h-3 w-3" /> Full-size real-price disclosure
              </div>
              <p className="text-muted-foreground">
                fontSize(N<sub>real</sub>) / S<sub>base</sub> = {BASE_SIZE_PX}/{BASE_SIZE_PX} = {RATIO_BENIGN} ≥ 0.5 — the
                dollar cost sat right next to the gem price at the same size, so the fiduciary abstraction never hid the
                true cost: you knew you were paying ≈ {REAL_PRICE} before you clicked.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-background overflow-hidden">
          <div className="relative flex h-24 items-center justify-center bg-gradient-to-br from-rose-500/15 via-purple-500/15 to-indigo-500/15">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-purple-600 shadow">
              <Gem className="h-6 w-6 text-white" />
            </div>
            <div className="absolute top-2 right-2 rounded-full bg-amber-500 px-2 py-0.5 text-[8px] font-bold text-white">
              LIMITED
            </div>
          </div>
          <div className="p-3">
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3 className="text-[11px] font-semibold">{ITEM_NAME}</h3>
              <span className="shrink-0 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
                {GEM_PRICE.toLocaleString()} Gems
              </span>
            </div>

            {/* Real-price disclosure crushed to 7px — ratio 0.44 < 0.5, no way to enlarge it */}
            <div className="mb-3">
              <span className="text-[7px] leading-none tracking-tight text-muted-foreground/40 select-none">
                ≈ {REAL_PRICE} / {GEM_PRICE.toLocaleString()} Gems
              </span>
            </div>

            <p className="mb-3 text-[9px] leading-relaxed text-muted-foreground">
              A one-of-a-kind animated skin for your hero. Cosmetic only — no stat changes.
            </p>
            <button
              onClick={() => setBought(true)}
              className="flex w-full items-center justify-center gap-1.5 rounded-md bg-rose-600 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-rose-700 cursor-pointer"
            >
              <ShoppingCart className="h-3 w-3" />
              Buy for {GEM_PRICE.toLocaleString()} Gems
            </button>
          </div>
        </div>

        {bought && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Real cost visually obscured
            </div>
            <p className="text-muted-foreground">
              N<sub>real</sub> = {REAL_PRICE} was <strong className="text-foreground">not absent</strong> — it was printed at{" "}
              {TINY_SIZE_PX}px against a {BASE_SIZE_PX}px base body text: fontSize(N<sub>real</sub>)/S<sub>base</sub> ={" "}
              <strong className="text-rose-500">{RATIO_DARK} &lt; 0.5</strong>. The dollar figure exists in the viewport, so it
              survives an automated scan, but a human eye registers only &ldquo;{GEM_PRICE.toLocaleString()} Gems&rdquo;. You
              bought in gems; the ${REAL_PRICE.slice(1)} never registered.
            </p>
            <p className="text-muted-foreground">
              There is no magnifier and no settings toggle anywhere on this screen — the interface
              gives you no way to read the real price at a legible size.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
