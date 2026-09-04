"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Reference Pricing — Condition 2: Visual Salience of Reference-Price Strikethrough
 *
 * Thesis: N_ref is the strikethrough/"was" price node and N_current the
 * accompanying current-price node. The feature triggers if the reference
 * price is rendered at a contrast ratio below the WCAG 2.1 minimum for
 * informational text (τ_ref_cr = 3.0) while the current price dominates:
 *
 *   CR(N_ref, L_bg) < τ_ref_cr  ∧  fontSize(N_current)/fontSize(N_ref) > τ_size_skew
 *
 * Variant A (dark): the "was" price is faded to near-invisibility (CR ≈ 2.3,
 * 9px) while the current price dominates at 20px.
 * Variant B (benign): the same prices with a readable reference (CR ≈ 7.2)
 * at comparable size.
 */

export function ReferencePricingCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [measured, setMeasured] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Reference Pricing: Visual Salience of Reference-Price Strikethrough"
      caption="Visual Salience of Reference-Price Strikethrough — the reference price is rendered below the WCAG 2.1 informational contrast minimum (τ = 3.0) while the current price dominates, fading the comparison baseline to near-invisibility."
      deltaNote="Variant A fades the “was” price below a 3.0 contrast ratio (2.31) and skews the font sizes (20/9 = 2.22 > τ_size_skew) so the current price dominates the visual field. Variant B keeps the same prices but renders the reference at readable contrast (7.23) and comparable size."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Summit Trail Running Shoes</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">Grip sole · Breathable mesh · EU 36–46</p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Balanced pricing
              </div>
            </div>

            <div className="mt-2.5 rounded-md border bg-background p-3">
              <div className="flex items-baseline gap-2.5">
                <span className="text-[15px] font-bold tabular-nums">PLN 199.00</span>
                <span className="text-[12px] text-muted-foreground line-through">was PLN 299.00</span>
              </div>
              <div className="text-[9px] text-muted-foreground mt-1">
                Reference price at readable size and contrast — the comparison baseline is
                fully visible.
              </div>
            </div>

            <button
              onClick={() => setMeasured(true)}
              className="mt-2.5 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Measure contrast ratio
            </button>

            {measured && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed font-mono">
                <div className="font-semibold text-green-700 dark:text-green-300">
                  CR(N_ref, L_bg) = 7.23 ≥ τ_ref_cr (3.00)
                </div>
                <p className="text-muted-foreground mt-1">
                  No trigger — both prices readable at comparable size (15/12 = 1.25,
                  below τ_size_skew).
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
            <div>
              <h3 className="text-[11px] font-semibold">Summit Trail Running Shoes</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">Grip sole · Breathable mesh · EU 36–46</p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Faded baseline
            </div>
          </div>

          <div className="mt-2.5 rounded-md border bg-background p-3">
            <div className="flex items-baseline gap-2.5">
              <span className="text-[20px] font-extrabold tabular-nums text-red-600 dark:text-red-400">PLN 199.00</span>
              <span className="text-[9px] text-gray-400 line-through">was PLN 299.00</span>
            </div>
            <div className="text-[9px] text-muted-foreground mt-1">
              A striking deal. The previous price is printed somewhere over there.
            </div>
          </div>

          <button
            onClick={() => setMeasured(true)}
            className="mt-2.5 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Measure contrast ratio
          </button>

          {measured && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed font-mono">
              <div className="font-semibold text-yellow-700 dark:text-yellow-300">
                CR(N_ref, L_bg) = 2.31 &lt; τ_ref_cr (3.00) ∧ 20/9 = 2.22 &gt; τ_size_skew (1.5)
              </div>
              <p className="text-muted-foreground mt-1">
                The reference baseline is faded to near-invisibility while the current
                price dominates the visual field — the anchor can barely be read.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
