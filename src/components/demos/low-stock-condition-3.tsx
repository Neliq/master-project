"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Low Stock — Condition 3: Semantic Verifiability of Stock-Level Quantifiers
 *
 * Thesis: scarcity claims ("Only X left", "X in stock") are inspected for
 * semantic consistency over time. The feature triggers if successive page
 * loads within a short temporal window (Delta t < 60 s) yield semantically
 * inconsistent stock-level quantifiers — "Only 3 left" followed by "Only 5
 * left" on reload — with no transaction in between:
 *
 *   exists t1, t2 : |t2 - t1| < 60s  ∧  Q_stock(t1) != Q_stock(t2)
 *                                    ∧  ¬HasTransaction(t1, t2)
 *
 * Variant A (dark): each simulated refresh produces a new, arbitrary
 * quantifier (3 → 5 → 1 → 4 …) while the transaction log stays empty.
 * Variant B (benign): the quantifier is stable and only changes when a
 * real purchase (HasTransaction = True) decrements it.
 */

const ITEM_NAME = "CloudNine Smart Lamp";
const ITEM_PRICE = "$59.00";
const QUANT_CYCLE = [3, 5, 1, 4, 2]; // procedurally generated quantifiers (A)
const BASE_STOCK = 5; // honest stock level (B)

export function LowStockCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [loadsA, setLoadsA] = React.useState(1);
  const [quantA, setQuantA] = React.useState(QUANT_CYCLE[0]);
  const [loadsB, setLoadsB] = React.useState(1);
  const [soldB, setSoldB] = React.useState(0);
  const [elapsed, setElapsed] = React.useState(0);

  // Session clock — Delta t between first load and now, for both panels.
  React.useEffect(() => {
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const reset = () => {
    setLoadsA(1);
    setQuantA(QUANT_CYCLE[0]);
    setLoadsB(1);
    setSoldB(0);
    setElapsed(0);
  };

  const refreshA = () => {
    // Next procedurally generated quantifier, regardless of any real inventory.
    setLoadsA((n) => n + 1);
    setQuantA(QUANT_CYCLE[loadsA % QUANT_CYCLE.length]);
  };

  const refreshB = () => setLoadsB((n) => n + 1);

  const buyB = () => {
    setSoldB((s) => s + 1);
    setLoadsB((n) => n + 1);
  };

  const stockB = Math.max(0, BASE_STOCK - soldB);
  const inconsistent = loadsA >= 2 && elapsed < 60;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Q_stock(t1) — first load (A)</span>
        <span className="font-mono font-semibold tabular-nums">{QUANT_CYCLE[0]} left</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Q_stock(t2) — current load (A)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{quantA} left</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&Delta;t since first load</span>
        <span className="font-mono font-semibold tabular-nums">{elapsed}s {elapsed < 60 ? "(< 60s)" : "(≥ 60s)"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">HasTransaction(t1, t2) — A</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{loadsA >= 2 ? "False — no purchase logged" : "—"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Low Stock: Semantic Verifiability of Stock-Level Quantifiers"
      caption="Semantic Verifiability of Stock-Level Quantifiers — reload the page within 60 seconds and the stock count changes even though nobody bought anything."
      auditorStats={stats}
      deltaNote={`In Variant A every simulated page load draws a new arbitrary quantifier (${QUANT_CYCLE.join(" → ")} …) with an empty transaction log, so Q_stock(t1) ≠ Q_stock(t2) with ¬HasTransaction — the claim is procedurally generated. In Variant B the quantifier is reported verbatim from a visible live backend feed ("In stock — N remaining"), stays stable across reloads, and only decrements when a real purchase is logged.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                <svg className="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v3m6.366-.366l-2.12 2.12M21 12h-3m.366 6.366l-2.12-2.12M12 21v-3m-6.366.366l2.12-2.12M3 12h3m-.366-6.366l2.12 2.12" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">{ITEM_NAME}</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Dimmable smart lamp with app control and schedules.
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-[11px] font-bold">{ITEM_PRICE}</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-green-500/40 bg-green-500/10 px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider text-green-700 dark:text-green-300">
                    In stock — {stockB} remaining
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-border bg-background p-2.5">
            <div className="flex items-center justify-between text-[9px]">
              <span className="font-mono text-muted-foreground">Live stock feed — backend source</span>
              <span className="font-mono font-semibold tabular-nums text-green-500">{stockB} units</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[9px]">
              <span className="font-mono text-muted-foreground">Load count (simulated reloads)</span>
              <span className="font-mono font-semibold tabular-nums">{loadsB}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[9px]">
              <span className="font-mono text-muted-foreground">Transaction log (t1 → t2)</span>
              <span className="font-mono font-semibold tabular-nums text-green-500">{soldB} purchase{soldB === 1 ? "" : "s"}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[9px]">
              <span className="font-mono text-muted-foreground">Session clock (&Delta;t)</span>
              <span className="font-mono font-semibold tabular-nums">{elapsed}s</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={refreshB}
              className="flex-1 rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Reload page
            </button>
            <button
              onClick={buyB}
              className="flex-1 rounded-md border border-green-500/40 bg-green-500/10 py-1.5 text-[10px] font-medium text-green-700 dark:text-green-300 hover:bg-green-500/20 transition-colors cursor-pointer"
            >
              Someone bought one
            </button>
          </div>

          {loadsB > 1 && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Quantifier is verifiable
              </div>
              <p className="text-muted-foreground mt-0.5">
                Reloading keeps Q_stock at {stockB}, matching the live backend feed — it only moved because{" "}
                {soldB > 0 ? `${soldB} real purchase${soldB === 1 ? " was" : "s were"} logged (HasTransaction = True).` : "no transaction occurred, so the number is stable."}{" "}
                The stock level is displayed exactly as the backend reports it: no fabricated low-stock claim.
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
                <path d="M12 3v3m6.366-.366l-2.12 2.12M21 12h-3m.366 6.366l-2.12-2.12M12 21v-3m-6.366.366l2.12-2.12M3 12h3m-.366-6.366l2.12 2.12" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">{ITEM_NAME}</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Dimmable smart lamp with app control and schedules.
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-[11px] font-bold">{ITEM_PRICE}</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-red-500/40 bg-red-500/10 px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider text-red-600 dark:text-red-300 animate-pulse">
                  Only {quantA} left!
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-border bg-background p-2.5">
          <div className="flex items-center justify-between text-[9px]">
            <span className="font-mono text-muted-foreground">Load count (simulated reloads)</span>
            <span className="font-mono font-semibold tabular-nums">{loadsA}</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[9px]">
            <span className="font-mono text-muted-foreground">Transaction log (t1 → t2)</span>
            <span className="font-mono font-semibold tabular-nums text-red-500">0 purchases</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[9px]">
            <span className="font-mono text-muted-foreground">Session clock (&Delta;t)</span>
            <span className="font-mono font-semibold tabular-nums">{elapsed}s</span>
          </div>
        </div>

        <button
          onClick={refreshA}
          className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Reload page
        </button>

        {mode === "auditor" && inconsistent && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Stock updated
            </div>
            <p className="text-muted-foreground">
              Load t1: <strong className="text-foreground">“Only {QUANT_CYCLE[0]} left”</strong> &nbsp;·&nbsp; load t2:{" "}
              <strong className="text-red-500">“Only {quantA} left”</strong>, with &Delta;t = {elapsed}s &lt; 60s
              and <strong className="text-foreground">zero transactions</strong> in between (¬HasTransaction(t1, t2)).
            </p>
            <p className="text-muted-foreground">
              Since Q_stock(t1) ≠ Q_stock(t2) yet nothing was sold, the scarcity claim is procedurally generated —
              the quantifier is drawn from a fixed cycle ({QUANT_CYCLE.join(" → ")} …) rather than reflecting actual inventory.
            </p>
          </div>
        )}

        {!inconsistent && loadsA > 1 && (
          <div className="rounded-md border border-border bg-background p-2.5 text-[9px] text-muted-foreground">
            The 60-second detection window has passed (&Delta;t = {elapsed}s), so the reload inconsistency is no longer
            verifiable as a semantic violation — but the quantifier is still arbitrary.
          </div>
        )}
      </div>
    </DemoShell>
  );
}
