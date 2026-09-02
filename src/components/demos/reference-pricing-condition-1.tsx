"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Reference Pricing — Condition 1: Mathematical Exaggeration of Discount
 *
 * Thesis: the implied percentage discount Δ_pct is derived directly from the
 * reference anchor. With τ_unrealistic as a heuristic threshold for
 * suspicious, exaggerated discounts (e.g. > 70%), the feature triggers if
 * the calculated discount strictly exceeds this threshold without
 * contextual justification:
 *
 *   Δ_pct = (P_ref − P_cur) / P_ref  =>  Δ_pct > τ_unrealistic
 *
 * Variant A (dark): a 90% discount anchored against an inflated reference.
 * Variant B (benign): the same selling price with a realistic anchor (22.6%).
 */

const DARK_REF = 999.0;
const DARK_CUR = 99.9;
const BENIGN_REF = 129.0;
const BENIGN_CUR = 99.9;
const TAU = 70;

const darkPct = ((DARK_REF - DARK_CUR) / DARK_REF) * 100;
const benignPct = ((BENIGN_REF - BENIGN_CUR) / BENIGN_REF) * 100;

export function ReferencePricingCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [checked, setChecked] = React.useState(false);
  const [bought, setBought] = React.useState(false);

  const reset = () => {
    setChecked(false);
    setBought(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P_ref / P_cur — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">999.00 / 99.90</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P_ref / P_cur — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">129.00 / 99.90</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δ_pct — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{darkPct.toFixed(1)}% &gt; τ</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δ_pct — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{benignPct.toFixed(1)}% ≤ τ</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_unrealistic</span>
        <span className="font-mono font-semibold tabular-nums">{TAU}%</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Reference Pricing: Mathematical Exaggeration of Discount"
      caption="Mathematical Exaggeration of Discount — the implied percentage discount Δ_pct = (P_ref − P_cur)/P_ref exceeds the unrealistic threshold (τ = 70%) without contextual justification."
      auditorStats={stats}
      deltaNote="Variant A anchors against an inflated PLN 999 reference, implying a 90% discount — far above τ_unrealistic = 70%. Variant B keeps the same selling price but anchors against a realistic PLN 129 reference (22.6%), which is plausible."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Aurora Wireless Headphones</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">ANC · 40 h battery · Satin black</p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                −{benignPct.toFixed(0)}%
              </div>
            </div>

            <div className="mt-2.5 rounded-md border bg-background p-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] text-muted-foreground line-through">PLN {BENIGN_REF.toFixed(2)}</span>
                <span className="text-[16px] font-bold tabular-nums">PLN {BENIGN_CUR.toFixed(2)}</span>
              </div>
              <div className="text-[9px] text-muted-foreground mt-0.5">
                Discount: {benignPct.toFixed(1)}% — within a plausible band.
              </div>
            </div>

            <button
              onClick={() => setChecked(true)}
              className="mt-2.5 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Check the math
            </button>

            {checked && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed font-mono">
                <div className="font-semibold text-green-700 dark:text-green-300">
                  Δ_pct = (129.00 − 99.90) / 129.00 = {benignPct.toFixed(1)}% ≤ {TAU}%
                </div>
                <p className="text-muted-foreground mt-1">
                  Within the plausible band. Price history confirms PLN 99.90 for the last
                  30 days — the anchor reflects a real prior price.
                </p>
              </div>
            )}

            <button
              onClick={() => setBought(true)}
              className="mt-2 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Buy now
            </button>
          </div>

          {bought && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Purchased
              </div>
              <p className="text-muted-foreground mt-0.5">
                The discount was evaluated on its arithmetic: a modest, plausible −22.6% —
                no anchor inflated to manufacture urgency.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Aurora Wireless Headphones</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">ANC · 40 h battery · Satin black</p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              −{darkPct.toFixed(0)}%
            </div>
          </div>

          <div className="mt-2.5 rounded-md border bg-background p-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] text-muted-foreground line-through">PLN {DARK_REF.toFixed(2)}</span>
              <span className="text-[16px] font-bold tabular-nums text-red-600 dark:text-red-400">PLN {DARK_CUR.toFixed(2)}</span>
            </div>
            <div className="text-[9px] text-muted-foreground mt-0.5">
              Was {DARK_REF.toFixed(2)} — now {DARK_CUR.toFixed(2)}. Limited stock!
            </div>
          </div>

          <button
            onClick={() => setChecked(true)}
            className="mt-2.5 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Check the math
          </button>

          {checked && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed font-mono">
              <div className="font-semibold text-yellow-700 dark:text-yellow-300">
                Δ_pct = (999.00 − 99.90) / 999.00 = {darkPct.toFixed(1)}% &gt; {TAU}%
              </div>
              <p className="text-muted-foreground mt-1">
                An extreme, mathematically improbable discount with no contextual
                justification — short-circuits rational evaluation and induces urgency.
              </p>
            </div>
          )}

          <button
            onClick={() => setBought(true)}
            className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Buy now — 90% off!
          </button>
        </div>

        {mode === "auditor" && bought && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Offer applied
            </div>
            <p className="text-muted-foreground">
              The −{darkPct.toFixed(0)}% badge was the whole pitch — but the reference
              anchor was never a genuine prior price. Δ_pct exceeds τ_unrealistic, so the
              claimed saving is misleading. The current price is PLN 99.90.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
