"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Visual Prominence — Condition 1: Structural Asymmetry in DOM Subtree Weight
 *
 * Thesis: the algorithm compares the DOM subtree complexity of the
 * business-favorable action node N_favorable against the median subtree of
 * all other interactive siblings. Desc(n) counts the total descendant nodes
 * in the rendered subtree of node n. The feature triggers if the favorable
 * action's subtree is structurally bloated — injecting extra wrapper <div>
 * elements, icon containers, or gradient overlays — beyond tau_subtree_bloat:
 *
 *   |Desc(N_favorable)| / median_s |Desc(s)| > tau_subtree_bloat
 *
 * Variant A (dark): "Complete purchase" is wrapped in nested gradient
 * wrappers, a shine overlay, an icon container and a badge, so its subtree
 * weighs ~6.2x its siblings.
 * Variant B (benign): the same action is a plain button — a sibling of equal
 * subtree weight to "Cancel order".
 */

const DESC_FAVORABLE = 37; // descendant nodes under the favorable action (dark)
const DESC_SIBLING_MEDIAN = 6; // median descendant count of interactive siblings
const TAU_BLOAT = 3.0;
const RATIO_DARK = DESC_FAVORABLE / DESC_SIBLING_MEDIAN;

export function VisualProminenceCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [choice, setChoice] = React.useState<null | "purchase" | "cancel">(null);

  const reset = () => setChoice(null);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|Desc(N_favorable)| (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{DESC_FAVORABLE} nodes</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">median |Desc(sibling)|</span>
        <span className="font-mono font-semibold tabular-nums">{DESC_SIBLING_MEDIAN} nodes</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Subtree ratio (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{RATIO_DARK.toFixed(1)} &gt; {TAU_BLOAT}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Subtree ratio (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">1.0 &le; {TAU_BLOAT}</span>
      </div>
    </>
  ) : null;

  const orderSummary = (
    <div className="space-y-1 text-[9px] text-muted-foreground">
      <div className="flex items-center justify-between">
        <span>Pro Plan — annual</span>
        <span className="font-mono tabular-nums">$89.00</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Tax</span>
        <span className="font-mono tabular-nums">$7.12</span>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-1 font-semibold text-foreground">
        <span>Total due today</span>
        <span className="font-mono tabular-nums">$96.12</span>
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Visual Prominence: Structural Asymmetry in DOM Subtree Weight"
      caption="Structural Asymmetry in DOM Subtree Weight — the business-favorable action is bloated with nested wrappers, overlays and icon containers, so its DOM subtree dwarfs every sibling."
      auditorStats={stats}
      deltaNote="In Variant A the 'Complete purchase' action is wrapped in nested gradient wrappers, a shine overlay, an icon container and a badge, inflating its DOM subtree to 6.2x the median sibling (|Desc(N_favorable)| = 37 vs 6). In Variant B the same action is a plain button with the same subtree weight as 'Cancel order' — ratio 1.0, below tau_subtree_bloat."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Order summary</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Confirm your purchase details below.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                Subtree ratio 1.0
              </div>
            </div>

            <div className="mt-3 rounded-md border border-border bg-background p-2.5">{orderSummary}</div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setChoice("cancel")}
                className="rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
              >
                Cancel order
              </button>
              <button
                onClick={() => setChoice("purchase")}
                className="rounded-md bg-emerald-600 hover:bg-emerald-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
              >
                Complete purchase
              </button>
            </div>
          </div>

          {choice && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {choice === "purchase" ? "Purchase completed" : "Order cancelled"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                Both actions are plain, single-layer buttons: each subtree carries roughly the same
                weight (|Desc| &asymp; 2, ratio 1.0 &le; {TAU_BLOAT}). Nothing in the DOM structure
                steers you toward one of them.
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
              <h3 className="text-[11px] font-semibold">Order summary</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Confirm your purchase details below.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              Subtree ratio 6.2
            </div>
          </div>

          <div className="mt-3 rounded-md border border-border bg-background p-2.5">{orderSummary}</div>

          {/* The favorable action: a structurally bloated subtree — 3 nested
              wrapper layers, a gradient overlay, an icon container, a badge. */}
          <div className="relative mt-3"> {/* wrapper A */}
            <div className="rounded-md bg-gradient-to-r from-rose-500 to-orange-500 p-[1.5px] shadow-lg shadow-rose-500/20"> {/* wrapper B */}
              <div className="relative overflow-hidden rounded-md bg-rose-600"> {/* wrapper C */}
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)]" />
                <button
                  onClick={() => setChoice("purchase")}
                  className="relative flex w-full items-center justify-center gap-1.5 py-2.5 text-[10px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-rose-500 cursor-pointer"
                >
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Complete purchase
                </button>
                <span className="absolute -top-1.5 -right-1.5 rounded-full bg-amber-400 px-1.5 py-px text-[7px] font-bold text-black shadow-sm">
                  SAVE 20%
                </span>
              </div>
            </div>
          </div>

          {/* The user-favorable action: a bare, single-node sibling. */}
          <button
            onClick={() => setChoice("cancel")}
            className="mt-2 w-full py-0.5 text-[9px] text-muted-foreground underline decoration-dotted underline-offset-2 transition-colors hover:text-foreground cursor-pointer"
          >
            Cancel order
          </button>
        </div>

        {choice && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Subtree bloat detected
            </div>
            <p className="text-muted-foreground">
              {choice === "purchase"
                ? "You clicked the bloated action. Its DOM subtree carries "
                : "You resisted the bloated action and clicked the bare text link instead. The favorable action's subtree carries "}
              <strong className="text-foreground">{DESC_FAVORABLE} descendant nodes</strong> (nested wrapper
              divs, a gradient overlay, an icon container, a badge) against a median of{" "}
              <strong className="text-foreground">{DESC_SIBLING_MEDIAN}</strong> for its siblings — a ratio of{" "}
              <strong className="text-rose-500">{RATIO_DARK.toFixed(1)} &gt; {TAU_BLOAT}</strong>.
            </p>
            <p className="text-muted-foreground">
              Extra structural weight is pure decoration: it exists to make the business action look and
              feel like the only real option, even though every sibling carries the identical meaning.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
