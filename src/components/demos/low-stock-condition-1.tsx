"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Low Stock — Condition 1: Inventory Fabrication
 *
 * Thesis: I_true(x) is the actual quantity of item x in the backend
 * database and I_displayed(x) the value rendered on the frontend, with
 * tau_scarcity the psychological panic threshold (typically I <= 5).
 * The feature triggers if the system algorithmically generates a low
 * number strictly to manufacture urgency, regardless of true stock:
 *
 *   I_displayed(x) <= tau_scarcity  given  I_displayed(x) << I_true(x)
 *
 * Variant A (dark): the page claims "Only 2 left at this price!" while
 * the backend holds 148 units — scarcity is a visual overlay.
 * Variant B (benign): the same page shows the real stock level.
 */

const ITEM_NAME = "Aurora Wireless Earbuds Pro";
const ITEM_PRICE = "$89.00";
const I_TRUE = 148; // backend database quantity
const I_DISPLAYED_DARK = 2; // fabricated frontend quantity
const TAU_SCARCITY = 5;

export function LowStockCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [added, setAdded] = React.useState(false);
  const [verified, setVerified] = React.useState(false);

  const reset = () => {
    setAdded(false);
    setVerified(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">I_displayed(x) — frontend (A)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{I_DISPLAYED_DARK} (&le; &tau;)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">I_displayed(x) — frontend (B)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{I_TRUE}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">I_true(x) — backend DB</span>
        <span className="font-mono font-semibold tabular-nums">{I_TRUE}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&tau;_scarcity (panic threshold)</span>
        <span className="font-mono font-semibold tabular-nums">I &le; {TAU_SCARCITY}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Low Stock: Inventory Fabrication"
      caption="Inventory Fabrication — the frontend renders a panic-level stock number that is algorithmically generated and has no relation to the real backend inventory."
      auditorStats={stats}
      deltaNote={`In Variant A the page claims “Only ${I_DISPLAYED_DARK} left at this price!” while the backend database actually holds ${I_TRUE} units (I_displayed = ${I_DISPLAYED_DARK} &le; &tau; = ${TAU_SCARCITY}, yet I_displayed &lt;&lt; I_true = ${I_TRUE}). Variant B shows the true stock level with the exact same product card.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                <svg className="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 7l10-5 10 5M4 10v10a1 1 0 001 1h14a1 1 0 001-1V10M2 7l2 13M22 7l-2 13" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">{ITEM_NAME}</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  True wireless, 36h battery, active noise cancelling.
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-[11px] font-bold">{ITEM_PRICE}</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-green-500/40 bg-green-500/10 px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider text-green-700 dark:text-green-300">
                    <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    In stock — {I_TRUE} available
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setAdded(true)}
              className="mt-3 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              {added ? "Added to cart ✓" : "Add to cart"}
            </button>
          </div>

          {added && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Honest inventory
              </div>
              <p className="text-muted-foreground mt-0.5">
                The stock badge shows the real backend quantity: I_displayed(x) = {I_TRUE} = I_true(x).
                There is no manufactured scarcity, so the Fear Of Missing Out trigger never fires.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
              <svg className="h-5 w-5 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 7l10-5 10 5M4 10v10a1 1 0 001 1h14a1 1 0 001-1V10M2 7l2 13M22 7l-2 13" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">{ITEM_NAME}</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                True wireless, 36h battery, active noise cancelling.
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-[11px] font-bold">{ITEM_PRICE}</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-red-500/40 bg-red-500/10 px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider text-red-600 dark:text-red-300 animate-pulse">
                  <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 9v4m0 4h.01" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  Only {I_DISPLAYED_DARK} left at this price!
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setAdded(true)}
              className="flex-1 rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              {added ? "Added to cart ✓" : "Add to cart"}
            </button>
            <button
              onClick={() => setVerified(true)}
              className="rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Verify stock
            </button>
          </div>
        </div>

        {mode === "auditor" && verified && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Only ${I_DISPLAYED_DARK} left
            </div>
            <p className="text-muted-foreground">
              The frontend badge claims <strong className="text-red-500">“Only {I_DISPLAYED_DARK} left at this price!”</strong> — that
              satisfies I_displayed(x) = {I_DISPLAYED_DARK} &le; &tau;_scarcity = {TAU_SCARCITY}, the panic threshold.
              But the backend database holds <strong className="text-green-500">I_true(x) = {I_TRUE} units</strong>.
            </p>
            <p className="text-muted-foreground">
              Because I_displayed(x) &lt;&lt; I_true(x), the low number was algorithmically generated to manufacture
              urgency — the scarcity is a visual overlay, not a backend reality. The trigger fires regardless of true stock depth.
            </p>
          </div>
        )}

        {added && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <p className="text-muted-foreground">
              You rushed to add the item while the panic badge was pulsing. A user who clicks “Verify stock”
              (or who reloads) discovers the stock never actually depletes — it is stuck at a fabricated low threshold.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
