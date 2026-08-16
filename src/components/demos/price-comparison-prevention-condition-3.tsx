"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Price Comparison Prevention — Condition 3: Semantic Omission of Comparison-Relevant Qualifiers
 *
 * Thesis: Q_standard is the set of expected unit-price qualifiers for the
 * product category (“per liter”, “per oz”, “per 100g”) and Q_rendered those
 * actually present in the DOM. The feature triggers if the intersection is
 * empty — the interface semantically strips the vocabulary necessary for
 * cross-product comparison:
 *
 *   Q_standard ∩ Q_rendered = ∅
 *
 * Variant A (dark): two lemonade bottles in different sizes, no unit-price
 * qualifier anywhere on the page.
 * Variant B (benign): identical bottles and prices with the qualifiers
 * present, so the cheaper-per-liter option is visible.
 */

const DRINKS = [
  { name: "Sparkling Lemonade", size: "500 ml", price: "PLN 4.99", unit: "PLN 9.98 / l" },
  { name: "Sparkling Lemonade", size: "1 L", price: "PLN 8.99", unit: "PLN 8.99 / l" },
];

export function PriceComparisonPreventionCond3({
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
        <span className="text-muted-foreground">Q_standard</span>
        <span className="font-mono font-semibold tabular-nums">{"{per l, per 100 ml, per kg}"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Q_rendered — dark</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">∅</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Q_rendered — benign</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{"{per l, per 100 ml}"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Intersection</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">∅ → trigger</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Cheaper per liter</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">1 L (PLN 8.99/l)</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Price Comparison Prevention: Semantic Omission of Comparison-Relevant Qualifiers"
      caption="Semantic Omission of Comparison-Relevant Qualifiers — the standard unit-price vocabulary (“per liter”, “per 100g”) is stripped from the DOM, so Q_standard ∩ Q_rendered is empty and cross-product comparison is impossible."
      auditorStats={stats}
      deltaNote="Both variants sell identical bottles at identical prices. Variant A omits every unit-price qualifier (Q_standard ∩ Q_rendered = ∅), hiding that the 1 L bottle is cheaper per liter; Variant B keeps the qualifiers, making the comparison trivial."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Beverages — lemonade</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Same product, two sizes. Unit qualifiers are present.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                Qualifiers present
              </div>
            </div>

            <div className="mt-2.5 space-y-2">
              {DRINKS.map((it, i) => (
                <div key={i} className="flex items-center justify-between gap-2 rounded-md border bg-background p-2">
                  <div className="min-w-0">
                    <div className="text-[10px] font-medium">{it.name}</div>
                    <div className="text-[8px] text-muted-foreground">{it.size}</div>
                    <div className="text-[10px] font-medium text-emerald-700 dark:text-emerald-300">{it.unit}</div>
                  </div>
                  <div className="text-[13px] font-bold tabular-nums">{it.price}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCompared(true)}
              className="mt-2.5 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Compare unit prices
            </button>

            {compared && (
              <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed font-mono">
                <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                  Q_standard ∩ Q_rendered = {"{per l, per 100 ml}"} ≠ ∅
                </div>
                <p className="text-muted-foreground mt-1">
                  The 1 L bottle is cheaper per liter: PLN 8.99/l vs PLN 9.98/l for the
                  500 ml bottle.
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
              <h3 className="text-[11px] font-semibold">Beverages — lemonade</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Same product, two sizes. Nothing but headline prices.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              Qualifiers stripped
            </div>
          </div>

          <div className="mt-2.5 space-y-2">
            {DRINKS.map((it, i) => (
              <div key={i} className="flex items-center justify-between gap-2 rounded-md border bg-background p-2">
                <div className="min-w-0">
                  <div className="text-[10px] font-medium">{it.name}</div>
                  <div className="text-[8px] text-muted-foreground">{it.size}</div>
                </div>
                <div className="text-[13px] font-bold tabular-nums">{it.price}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCompared(true)}
            className="mt-2.5 w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Compare unit prices
          </button>

          {compared && (
            <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed font-mono">
              <div className="font-semibold text-amber-700 dark:text-amber-300">
                Q_standard ∩ Q_rendered = ∅
              </div>
              <p className="text-muted-foreground mt-1">
                Expected qualifiers {"{per l, per 100 ml, per kg}"} — rendered: none. The
                vocabulary needed to compare these two bottles does not exist anywhere on
                this page, so the cheaper-per-liter option stays invisible.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
