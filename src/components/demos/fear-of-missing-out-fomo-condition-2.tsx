"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { ShoppingCart, Zap } from "lucide-react";

/*
 * Fear Of Missing Out (FOMO) — Condition 2: Visual Pulsation Frequency
 * of Urgency Indicators
 *
 * Thesis: the algorithm monitors the temporal update rate of urgency-
 * signaling visual elements — countdown timers, stock counters, "selling
 * fast" badges. The feature triggers if any urgency indicator refreshes
 * at a sub-second cadence, creating artificial temporal scarcity through
 * rapid visual churn:
 *
 *   min_{n ∈ N_urgency} Δt_refresh(n) < τ_pulsation ≈ 1000 ms
 *
 * Variant A (dark): the "only X left" stock counter rewrites itself every
 * 600 ms and the "Selling fast" badge pulses — churn below the perceptual
 * threshold while the real inventory never changes.
 * Variant B (benign): the same product shows a static, truthful stock
 * indicator (min Δt_refresh = ∞ ≥ τ_pulsation).
 */

const REAL_STOCK = 8;

export function FearOfMissingOutFomoCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [phase, setPhase] = React.useState<"idle" | "bought">("idle");
  const [stock, setStock] = React.useState(7); // the churning display counter (Variant A)

  const reset = () => {
    setPhase("idle");
    setStock(7);
  };

  // Variant A: sub-second churn — 600 ms refresh (< τ_pulsation ≈ 1000 ms).
  React.useEffect(() => {
    if (phase !== "idle") return;
    const id = window.setInterval(() => {
      setStock(5 + Math.floor(Math.random() * 5)); // 5–9, rewriting ~1.7×/second
    }, 600);
    return () => window.clearInterval(id);
  }, [phase]);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">min Δt_refresh (A)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">600 ms</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_pulsation threshold</span>
        <span className="font-mono font-semibold tabular-nums">≈ 1000 ms</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">600 &lt; 1000</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">triggers</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Real inventory</span>
        <span className="font-mono font-semibold tabular-nums">{REAL_STOCK} units</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Fear Of Missing Out (FOMO): Visual Pulsation Frequency of Urgency Indicators"
      caption="Visual Pulsation Frequency of Urgency Indicators — an urgency indicator refreshing at a sub-second cadence manufactures temporal scarcity through rapid visual churn."
      auditorStats={stats}
      deltaNote="Variant A’s stock counter rewrites itself every 600 ms (min Δt_refresh = 600 ms < τ_pulsation ≈ 1000 ms) and the “Selling fast” badge pulses, while real inventory stays at 8. Variant B shows the same product with a static indicator — no sub-second churn at all."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-[11px] font-semibold">AeroGlide X Wireless Headphones</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">Noise-cancelling over-ear · Graphite</p>
              </div>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                In stock
              </span>
            </div>

            {/* Static, truthful indicator — zero churn */}
            <div className="mt-3 flex items-center gap-2 rounded-md border border-green-500/30 bg-green-500/5 px-3 py-2">
              <svg className="size-3.5 text-green-600 dark:text-green-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <div>
                <div className="text-[9px] font-medium text-green-700 dark:text-green-300">
                  In stock — {REAL_STOCK} units
                </div>
                <div className="text-[8px] text-muted-foreground">
                  Static counter · min Δt_refresh = ∞ ≥ τ_pulsation
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
              <span className="line-through">$195</span>
              <span className="font-semibold text-foreground">$119</span>
            </div>

            <button
              onClick={() => setPhase("bought")}
              disabled={phase === "bought"}
              className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[10px] font-medium transition-colors ${
                phase === "bought"
                  ? "bg-muted text-muted-foreground/60 cursor-default"
                  : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              }`}
            >
              <ShoppingCart className="size-3" />
              {phase === "bought" ? "Added to cart" : "Add to cart"}
            </button>

            {phase === "bought" && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  No churn, no pressure
                </div>
                <p className="text-muted-foreground mt-0.5">
                  The indicator is static and truthful — min Δt_refresh = ∞ ≥ τ_pulsation. The stock figure
                  ({REAL_STOCK}) never flickers, so nothing manufactures urgency beyond the product itself.
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
            <div className="min-w-0">
              <h3 className="text-[11px] font-semibold">AeroGlide X Wireless Headphones</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">Noise-cancelling over-ear · Graphite</p>
            </div>
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Selling fast
            </span>
          </div>

          {/* Churning counter — sub-second refresh */}
          <div className="mt-3 flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/5 px-3 py-2">
            <Zap className="size-3.5 text-red-600 dark:text-red-400 shrink-0 animate-pulse" />
            <div>
              <div className="font-mono text-[13px] font-bold tabular-nums text-red-700 dark:text-red-300">
                Only {stock} left in stock
              </div>
              <div className="text-[8px] text-muted-foreground">
                Stock updates live
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
            <span className="line-through">$195</span>
            <span className="font-semibold text-foreground">$119</span>
            <span className="text-[8px] font-semibold uppercase tracking-wider text-red-500 animate-pulse">
              Selling fast
            </span>
          </div>

          <button
            onClick={() => setPhase("bought")}
            disabled={phase === "bought"}
            className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[10px] font-medium transition-colors ${
              phase === "bought"
                ? "bg-muted text-muted-foreground/60 cursor-default"
                : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            }`}
          >
            <ShoppingCart className="size-3" />
            {phase === "bought" ? "Added to cart" : "Add to cart"}
          </button>

          {phase === "bought" && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Limited-time availability
              </div>
              <p className="text-muted-foreground">
                {REAL_STOCK} units are currently available. The item has been added to your cart.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
