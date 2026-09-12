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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [phaseA, setPhaseA] = React.useState<"idle" | "bought">("idle");
  const [phaseB, setPhaseB] = React.useState<"idle" | "bought">("idle");
  const [stockA, setStockA] = React.useState(7); // the churning display counter (Variant A)


  // Variant A: sub-second churn — 600 ms refresh (< τ_pulsation ≈ 1000 ms).
  React.useEffect(() => {
    if (phaseA !== "idle") return;
    const id = window.setInterval(() => {
      setStockA(6 + Math.floor(Math.random() * 3)); // 6–8, rewriting ~1.7×/second
    }, 600);
    return () => window.clearInterval(id);
  }, [phaseA]);

  return (
    <DemoShell mode={mode}
      title="Fear Of Missing Out (FOMO): Visual Pulsation Frequency of Urgency Indicators"
      userTitle="AeroGlide X — Inventory"
      caption="Visual Pulsation Frequency of Urgency Indicators — an urgency indicator refreshing at a sub-second cadence manufactures temporal scarcity through rapid visual churn."
      deltaNote="Variant A’s stock counter rewrites itself every 600 ms (min Δt_refresh = 600 ms < τ_pulsation ≈ 1000 ms) and the “Selling fast” badge pulses, while real inventory stays at 8. Variant B shows the same product with a static indicator — no sub-second churn at all."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-[11px] font-semibold">AeroGlide X Wireless Headphones</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">Noise-cancelling over-ear · Graphite</p>
              </div>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
                In stock
              </span>
            </div>

            {/* Static, truthful indicator — zero churn */}
            <div className="mt-3 flex items-center gap-2 rounded-md border border-border/60 bg-muted/40 px-3 py-2">
              <svg className="size-3.5 text-foreground shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <div>
                <div className="text-[9px] font-medium text-foreground">
                  In stock — {REAL_STOCK} units
                </div>
                <div className="text-[8px] text-muted-foreground">
                  Inventory updates when stock changes
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
              <span className="line-through">$195</span>
              <span className="font-semibold text-foreground">$119</span>
            </div>

            <button
              onClick={() => setPhaseB("bought")}
              disabled={phaseB === "bought"}
              className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[10px] font-medium transition-colors ${
                phaseB === "bought"
                  ? "bg-muted text-muted-foreground/60 cursor-default"
                  : "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
              }`}
            >
              <ShoppingCart className="size-3" />
              {phaseB === "bought" ? "Added to cart" : "Add to cart"}
            </button>

            {phaseB === "bought" && (
              <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  No churn, no pressure
                </div>
                <p className="text-muted-foreground mt-0.5">
                  The stock figure ({REAL_STOCK}) stays steady between real inventory updates, so the product
                  details remain easy to read without added urgency.
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
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
              Selling fast
            </span>
          </div>

          {/* Churning counter — sub-second refresh */}
          <div className="mt-3 flex items-center gap-2 rounded-md border border-border/60 bg-muted/40 px-3 py-2">
            <Zap className="size-3.5 text-foreground shrink-0 animate-pulse" />
            <div>
              <div className="font-mono text-[13px] font-bold tabular-nums text-foreground">
                Only {stockA} left in stock
              </div>
              <div className="text-[8px] text-muted-foreground">
                Stock updates live
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
            <span className="line-through">$195</span>
            <span className="font-semibold text-foreground">$119</span>
            <span className="text-[8px] font-semibold uppercase tracking-wider text-foreground animate-pulse">
              Selling fast
            </span>
          </div>

          <button
            onClick={() => setPhaseA("bought")}
            disabled={phaseA === "bought"}
            className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[10px] font-medium transition-colors ${
              phaseA === "bought"
                ? "bg-muted text-muted-foreground/60 cursor-default"
                : "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
            }`}
          >
            <ShoppingCart className="size-3" />
            {phaseA === "bought" ? "Added to cart" : "Add to cart"}
          </button>

          {phaseA === "bought" && (
            <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
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
