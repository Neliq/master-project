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
        <span className="font-mono font-semibold tabular-nums text-red-500">∅</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Q_rendered — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{"{per l, per 100 ml}"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Intersection</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">∅ → trigger</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Cheaper per liter</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">1 L (PLN 8.99/l)</span>
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
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Price per litre shown
              </div>
            </div>

            <div className="mt-2.5 space-y-2">
              {DRINKS.map((it, i) => (
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
              Compare unit prices
            </button>

            {compared && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
                {mode === "auditor" ? (
                  <>
                    <div className="font-mono font-semibold text-green-700 dark:text-green-300">
                      Q_standard ∩ Q_rendered = {"{per l, per 100 ml}"} ≠ ∅
                    </div>
                    <p className="text-muted-foreground mt-1">
                      The 1 L bottle is cheaper per liter: PLN 8.99/l vs PLN 9.98/l for the
                      500 ml bottle.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="font-semibold text-green-700 dark:text-green-300">Unit price comparison</div>
                    <p className="text-muted-foreground mt-1">
                      The 1 L bottle costs PLN 8.99 per litre; the 500 ml bottle costs PLN 9.98 per litre.
                    </p>
                  </>
                )}
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
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Details unavailable
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
            className="mt-2.5 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            View product details
          </button>

          {compared && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
              {mode === "auditor" ? (
                <>
                  <div className="font-mono font-semibold text-yellow-700 dark:text-yellow-300">
                    Q_standard ∩ Q_rendered = ∅
                  </div>
                  <p className="text-muted-foreground mt-1">
                    No comparison qualifiers are present in the product card. The vocabulary needed to
                    compare these two bottles is absent, so the cheaper option stays invisible.
                  </p>
                </>
              ) : (
                <>
                  <div className="font-semibold text-yellow-700 dark:text-yellow-300">Unit-price details unavailable</div>
                  <p className="text-muted-foreground mt-1">
                    This listing shows pack prices only. Size is listed, but the store does not provide a price-per-litre figure.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
