"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Price Comparison Prevention — Condition 2: Visual Suppression of Unit-Price Information
 *
 * Thesis: rendered price nodes are segmented into headline prices N_headline
 * and unit prices N_unit (per liter, per gram…). The feature triggers if the
 * unit-price nodes are rendered at a font size or contrast ratio
 * significantly suppressed relative to the headline price:
 *
 *   fontSize(N_unit)/fontSize(N_headline) < τ_suppress
 *     ∨ CR(N_unit, L_bg)/CR(N_headline, L_bg) < τ_suppress
 *
 * Variant A (dark): unit prices are shrunk to 8px at low contrast — per-unit
 * comparison is practically impossible.
 * Variant B (benign): the same two products with readable unit prices, so the
 * cheaper-per-100 g option is immediately obvious.
 */

const ITEMS = [
  { name: "Fruity Granola", size: "500 g", price: "PLN 12.90", unit: "PLN 2.58 / 100 g" },
  { name: "Crunchy Granola", size: "1 kg", price: "PLN 22.90", unit: "PLN 2.29 / 100 g" },
];

export function PriceComparisonPreventionCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [compared, setCompared] = React.useState(false);

  const reset = () => setCompared(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">fontSize ratio — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">8/13 ≈ 0.62 &lt; τ</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">fontSize ratio — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">10/13 ≈ 0.77 ≥ τ</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">CR(N_unit, bg) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">≈ 2.6 (vs 7.6 headline)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_suppress</span>
        <span className="font-mono font-semibold tabular-nums">0.70</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Cheaper per 100 g</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">Crunchy (PLN 2.29)</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Price Comparison Prevention: Visual Suppression of Unit-Price Information"
      caption="Visual Suppression of Unit-Price Information — unit prices are rendered at a font size and contrast ratio below τ_suppress relative to the headline price, defeating per-unit comparison."
      auditorStats={stats}
      deltaNote="Variant A shrinks and fades the unit-price nodes (8/13 ≈ 0.62 < τ_suppress = 0.70, contrast ≈ 2.6), so per-100 g comparison is practically impossible. Variant B renders them at near-headline size and contrast (10/13 ≈ 0.77), and the cheaper product is immediately obvious."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Granola aisle</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Two sizes of the same line. Unit prices are clearly rendered.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Unit prices visible
              </div>
            </div>

            <div className="mt-2.5 space-y-2">
              {ITEMS.map((it, i) => (
                <div key={i} className="flex items-center justify-between gap-2 rounded-md border bg-background p-2">
                  <div className="min-w-0">
                    <div className="text-[10px] font-medium">{it.name}</div>
                    <div className="text-[8px] text-muted-foreground">{it.size}</div>
                    <div className="text-[10px] font-medium text-green-700 dark:text-green-300">{it.unit}</div>
                  </div>
                  <div className="text-[13px] font-bold tabular-nums">{it.price}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCompared(true)}
              className="mt-2.5 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Compare per 100 g
            </button>

            {compared && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed font-mono">
                <div className="font-semibold text-green-700 dark:text-green-300">
                  Fruity: PLN 2.58/100 g · Crunchy: PLN 2.29/100 g
                </div>
                <p className="text-muted-foreground mt-1">
                  All unit prices render at 10/13 ≈ 0.77 ≥ τ_suppress with full contrast —
                  the comparison is trivial: Crunchy Granola is cheaper per 100 g.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Granola aisle</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Two sizes of the same line. Headline prices only.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Pack prices shown
            </div>
          </div>

          <div className="mt-2.5 space-y-2">
            {ITEMS.map((it, i) => (
              <div key={i} className="flex items-center justify-between gap-2 rounded-md border bg-background p-2">
                <div className="min-w-0">
                  <div className="text-[10px] font-medium">{it.name}</div>
                  <div className="text-[8px] text-muted-foreground">{it.size}</div>
                  <div className="text-[8px] text-gray-400 select-none">{it.unit}</div>
                </div>
                <div className="text-[13px] font-bold tabular-nums">{it.price}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCompared(true)}
            className="mt-2.5 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Compare per 100 g
          </button>

          {compared && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
              {mode === "auditor" ? (
                <>
                  <div className="font-mono font-semibold text-yellow-700 dark:text-yellow-300">
                    fontSize(N_unit)/fontSize(N_headline) = 8/13 ≈ 0.62 &lt; τ_suppress (0.70)
                  </div>
                  <p className="text-muted-foreground mt-1">
                    The contrast ratio collapses too (≈ 2.6 vs 7.6 for the headline). The
                    unit-price nodes are effectively unreadable — comparison aborted, and the
                    cheaper-per-100 g product stays hidden.
                  </p>
                </>
              ) : (
                <>
                  <div className="font-semibold text-yellow-700 dark:text-yellow-300">Unit-price comparison unavailable</div>
                  <p className="text-muted-foreground mt-1">Pack prices are shown, but the per-100 g figures are not available in a readable format.</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
