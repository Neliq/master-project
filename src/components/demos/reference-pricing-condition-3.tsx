"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Reference Pricing — Condition 3: Dual-Pricing Co-occurrence and Anchoring
 *
 * Thesis: N_cur displays the current selling price P_cur and N_ref an
 * adjacent, higher reference price P_ref. S_strike is the set of CSS
 * properties indicating a deprecated/"slashed" state (line-through,
 * diagonal SVG vectors). The feature triggers if an anchored price
 * comparison marks the reference as structurally deprecated to
 * artificially emphasise the current price's value:
 *
 *   P_ref > P_cur  ∧  CSS(N_ref) ∩ S_strike ≠ ∅
 *
 * Variant A (dark): “PLN 199 ~~PLN 299~~” — a slashed anchor co-located
 * with the current price.
 * Variant B (benign): the same current price with a factual 30-day
 * baseline instead of a slashed anchor.
 */

export function ReferencePricingCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [probed, setProbed] = React.useState(false);

  const reset = () => setProbed(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P_ref &gt; P_cur — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">299 &gt; 199</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P_ref &gt; P_cur — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">n/a — single price</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">CSS(N_ref) ∩ S_strike</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{"{line-through}"} ≠ ∅</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Anchor present</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">yes (dark)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Perceived saving</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">33% anchored</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Reference Pricing: Dual-Pricing Co-occurrence and Anchoring"
      caption="Dual-Pricing Co-occurrence and Anchoring — a higher reference price P_ref is structurally marked as deprecated (line-through) next to the current price, anchoring the perceived value of P_cur."
      auditorStats={stats}
      deltaNote="Variant A co-locates P_ref = 299 above P_cur = 199 with a strikethrough, so every glance anchors on a 33% “saving”. Variant B shows the same current price with a factual 30-day baseline instead — no secondary price, no anchor."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Nordic Wool Throw Blanket</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">150 × 200 cm · Recycled wool · Grey</p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Single price
              </div>
            </div>

            <div className="mt-2.5 rounded-md border bg-background p-3">
              <div className="text-[18px] font-bold tabular-nums">PLN 199.00</div>
              <div className="text-[9px] leading-relaxed text-muted-foreground mt-1.5">
                Lowest price in the last 30 days: <span className="font-mono font-semibold text-green-700 dark:text-green-300">PLN 199.00</span>{" "}
                (EU Omnibus Directive). No other price is shown — nothing to anchor on.
              </div>
            </div>

            <button
              onClick={() => setProbed(true)}
              className="mt-2.5 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Why is there no slash?
            </button>

            {probed && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed font-mono">
                <div className="font-semibold text-green-700 dark:text-green-300">CSS(N_ref) ∩ S_strike = ∅</div>
                <p className="text-muted-foreground mt-1">
                  There is no secondary price node at all — no anchor, no perceived saving.
                  The 30-day baseline is stated factually, as consumer law requires.
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
              <h3 className="text-[11px] font-semibold">Nordic Wool Throw Blanket</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">150 × 200 cm · Recycled wool · Grey</p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Dual price
            </div>
          </div>

          <div className="mt-2.5 rounded-md border bg-background p-3">
            <div className="flex items-baseline gap-2">
              <span className="text-[18px] font-bold tabular-nums text-red-600 dark:text-red-400">PLN 199.00</span>
              <span className="text-[11px] text-muted-foreground line-through">PLN 299.00</span>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-[9px] font-semibold text-yellow-600 dark:text-yellow-400">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              You save PLN 100.00 (33%) — while stocks last!
            </div>
          </div>

          <button
            onClick={() => setProbed(true)}
            className="mt-2.5 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Why the slash?
          </button>

          {mode === "auditor" && probed && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed font-mono">
              <div className="font-semibold text-yellow-700 dark:text-yellow-300">
                P_ref (299.00) &gt; P_cur (199.00) ∧ CSS(N_ref) ∩ S_strike = {"{line-through}"} ≠ ∅
              </div>
              <p className="text-muted-foreground mt-1">
                The previous price is shown for comparison with today&rsquo;s price.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
