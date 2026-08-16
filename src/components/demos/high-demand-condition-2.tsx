"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { ShoppingCart, TrendingUp } from "lucide-react";

/*
 * High Demand — Condition 2: Visual Dynamics of Social-Proof Badges
 *
 * Thesis: the algorithm inspects demand-signaling badges ("X people are
 * viewing this," "Y purchased in the last hour") for visual embellishment.
 * The feature triggers if these indicators employ animation — pulsing,
 * flashing, or rapid numeric incrementation — at a refresh rate below a
 * perceptual-realism threshold τ_animate:
 *
 *   ∃n ∈ N_demand : IsAnimated(n) = True ∧ Δt_update(n) < τ_animate
 *
 * Variant A (dark): the "X bought this" badge increments ~2×/second
 * (Δt_update = 450 ms) with a pulse, manufacturing demand that never
 * existed.
 * Variant B (benign): the identical badge is static — Δt_update = ∞ —
 * and its count matches the backend analytics (14).
 */

const BACKEND_PURCHASES = 14;
const TAU_ANIMATE_MS = 1000;

export function HighDemandCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [phase, setPhase] = React.useState<"idle" | "revealed">("idle");
  const [count, setCount] = React.useState(24); // the animated badge counter (Variant A)

  const reset = () => {
    setPhase("idle");
    setCount(24);
  };

  // Variant A: rapid numeric incrementation — 450 ms (< τ_animate = 1000 ms).
  React.useEffect(() => {
    if (phase !== "idle") return;
    const id = window.setInterval(() => {
      setCount((c) => c + 1 + Math.floor(Math.random() * 2));
    }, 450);
    return () => window.clearInterval(id);
  }, [phase]);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δ t_update (A)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">450 ms</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_animate threshold</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_ANIMATE_MS} ms</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">IsAnimated (A / B)</span>
        <span className="font-mono font-semibold tabular-nums">
          <span className="text-rose-500">True</span> / <span className="text-emerald-500">False</span>
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Backend U_true</span>
        <span className="font-mono font-semibold tabular-nums">{BACKEND_PURCHASES} purchases</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="High Demand: Visual Dynamics of Social-Proof Badges"
      caption="Visual Dynamics of Social-Proof Badges — demand badges animated below the perceptual-realism refresh threshold fabricate urgency through artificial visual dynamism."
      auditorStats={stats}
      deltaNote="Variant A animates the “X bought this” badge: rapid numeric incrementation every 450 ms (Δt_update = 450 ms < τ_animate = 1000 ms) plus a pulse, starting from a fabricated 24 that no purchase log backs. Variant B shows the same badge statically at the true backend count (14) — Δt_update = ∞, IsAnimated = False — with each purchase resolvable to a row in the visible backend event log."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-[11px] font-semibold">AeroGlide X Wireless Headphones</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">Noise-cancelling over-ear · Graphite</p>
              </div>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                $119
              </span>
            </div>

            {/* Static badge — no animation at all */}
            <div className="mt-3 flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-3 py-2">
              <TrendingUp className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                  {BACKEND_PURCHASES} people bought this in the last hour
                </div>
                <div className="text-[8px] text-muted-foreground">
                  Static badge · Δt_update = ∞ ≥ τ_animate · count matches the backend event log below
                </div>
              </div>
            </div>

            {/* Structural mapping: the badge count resolves to this event log */}
            <div className="mt-2 rounded-md border border-border bg-background p-2.5">
              <div className="flex items-center justify-between text-[9px]">
                <span className="font-mono text-muted-foreground">Backend purchase log — last hour</span>
                <span className="font-mono font-semibold tabular-nums text-emerald-500">
                  {BACKEND_PURCHASES} events
                </span>
              </div>
              <div className="mt-1.5 space-y-1 text-[8px] font-mono text-muted-foreground">
                <div className="flex justify-between"><span>12:58 — P. Novak · AeroGlide X</span><span className="text-emerald-600 dark:text-emerald-400">✓</span></div>
                <div className="flex justify-between"><span>12:51 — S. Iyer · AeroGlide X</span><span className="text-emerald-600 dark:text-emerald-400">✓</span></div>
                <div className="flex justify-between"><span>12:44 — L. Ferreira · AeroGlide X</span><span className="text-emerald-600 dark:text-emerald-400">✓</span></div>
                <div className="flex justify-between text-muted-foreground/70"><span>… {BACKEND_PURCHASES - 3} more (total {BACKEND_PURCHASES})</span><span className="text-emerald-600 dark:text-emerald-400">✓</span></div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
              <span className="line-through">$195</span>
              <span className="font-semibold text-foreground">$119</span>
            </div>

            <button
              onClick={() => setPhase("revealed")}
              disabled={phase === "revealed"}
              className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[10px] font-medium transition-colors ${
                phase === "revealed"
                  ? "bg-muted text-muted-foreground/60 cursor-default"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              }`}
            >
              <ShoppingCart className="size-3" />
              {phase === "revealed" ? "Order placed" : "Buy now"}
            </button>

            {phase === "revealed" && (
              <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Static and truthful
                </div>
                <p className="text-muted-foreground mt-0.5">
                  IsAnimated(n) = False: the badge never pulses, flashes, or increments. With Δt_update = ∞ ≥
                  τ_animate, and every one of the {BACKEND_PURCHASES} purchases resolvable to a row in the visible
                  backend purchase log, the badge states the real backend figure without any artificial
                  visual dynamism or fabricated demand.
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
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0 animate-pulse">
              Trending
            </span>
          </div>

          {/* Animated badge — increments every 450 ms */}
          <div className="mt-3 flex items-center gap-2 rounded-md border border-rose-500/30 bg-rose-500/5 px-3 py-2 animate-pulse">
            <TrendingUp className="size-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
            <div>
              <div className="font-mono text-[13px] font-bold tabular-nums text-rose-700 dark:text-rose-300">
                {count} people bought this in the last hour
              </div>
              <div className="text-[8px] text-muted-foreground">
                Incrementing every 450 ms · Δt_update = 450 ms &lt; τ_animate = 1000 ms
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
            <span className="line-through">$195</span>
            <span className="font-semibold text-foreground">$119</span>
            <span className="text-[8px] font-semibold uppercase tracking-wider text-rose-500 animate-pulse">
              {count} sold
            </span>
          </div>

          <button
            onClick={() => setPhase("revealed")}
            disabled={phase === "revealed"}
            className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[10px] font-medium transition-colors ${
              phase === "revealed"
                ? "bg-muted text-muted-foreground/60 cursor-default"
                : "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
            }`}
          >
            <ShoppingCart className="size-3" />
            {phase === "revealed" ? "Order placed" : "Buy now"}
          </button>

          {phase === "revealed" && (
            <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Artificial visual dynamism
              </div>
              <p className="text-muted-foreground">
                ∃n ∈ N_demand: IsAnimated(n) = True ∧ Δt_update = 450 ms &lt; τ_animate = 1000 ms — the badge
                incremented to <strong className="text-rose-500">{count}</strong> while the backend truth stayed at{" "}
                <strong className="text-foreground">{BACKEND_PURCHASES}</strong>. The rapid churn fabricates urgency:
                demand that never existed is rendered as a live, breathing crowd.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
