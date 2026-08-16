"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { RefreshCw, ShoppingCart, Users } from "lucide-react";

/*
 * High Demand — Condition 1: Metric Fabrication
 *
 * Thesis: U_true(i, t) is the actual count of unique users interacting
 * with item i in the backend; U_displayed(i, t) is the value rendered on
 * the frontend. Using a pseudo-random function R(a, b), the feature
 * triggers if the system generates a high-arousal number bearing no
 * mathematical relation to factual data:
 *
 *   U_displayed(i, t) = R(a, b)  given  U_displayed(i, t) ≫ U_true(i, t)
 *
 * Variant A (dark): the "X people are viewing this" counter is a random
 * draw — it re-rolls to a fresh inflated value on every refresh while the
 * backend count stays at 2.
 * Variant B (benign): the frontend renders the true backend analytics
 * (2 users), stable across refreshes.
 */

const U_TRUE = 2;
const rollDisplayed = () => 28 + Math.floor(Math.random() * 40); // R(a, b) ∈ [28, 67]

export function HighDemandCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [displayedA, setDisplayedA] = React.useState(37); // first fabricated draw
  const [refreshes, setRefreshes] = React.useState(0);
  const [darkRevealed, setDarkRevealed] = React.useState(false);
  const [benignRevealed, setBenignRevealed] = React.useState(false);
  const [bought, setBought] = React.useState(false);

  const reset = () => {
    setDisplayedA(37);
    setRefreshes(0);
    setDarkRevealed(false);
    setBenignRevealed(false);
    setBought(false);
  };

  const refreshDark = () => {
    setDisplayedA(rollDisplayed()); // U_displayed = R(a, b), re-rolled per refresh
    setRefreshes((c) => c + 1);
    setDarkRevealed(true);
  };

  const refreshBenign = () => {
    setBenignRevealed(true); // U_displayed stays pinned to U_true
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">U_true(i, t) — backend</span>
        <span className="font-mono font-semibold tabular-nums">{U_TRUE} users</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">U_displayed (A) = R(a, b)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{displayedA}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Inflation (A vs truth)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">≈ {Math.round(displayedA / U_TRUE)}×</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">U_displayed (B)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{U_TRUE} = U_true</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="High Demand: Metric Fabrication"
      caption="Metric Fabrication — a pseudo-random function generates a high-arousal viewer count that bears no relation to the backend’s true user analytics."
      auditorStats={stats}
      deltaNote="Variant A renders U_displayed = R(a, b): a random inflated count (e.g. 37) that re-rolls on every refresh while the backend shows U_true = 2. Variant B renders the true backend count (2) and it never changes on refresh — U_displayed = U_true."
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

            <div className="mt-3 flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-3 py-2">
              <Users className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                  {U_TRUE} people are viewing this right now
                </div>
                <div className="text-[8px] text-muted-foreground">
                  U_displayed = U_true — live backend analytics, stable across refreshes
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
              <span className="line-through">$195</span>
              <span className="font-semibold text-foreground">$119</span>
            </div>

            <button
              onClick={() => setBought(true)}
              disabled={bought}
              className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[10px] font-medium transition-colors ${
                bought
                  ? "bg-muted text-muted-foreground/60 cursor-default"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              }`}
            >
              <ShoppingCart className="size-3" />
              {bought ? "Added to cart" : "Add to cart"}
            </button>

            <button
              onClick={refreshBenign}
              className="mt-1.5 flex w-full items-center justify-center gap-1.5 rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <RefreshCw className="size-3" />
              Refresh analytics
            </button>

            {benignRevealed && (
              <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Displayed = truth
                </div>
                <p className="text-muted-foreground mt-0.5">
                  Refreshing changed nothing: U_displayed(i, t) = U_true(i, t) = {U_TRUE}. The frontend renders
                  genuine backend analytics, so the social proof is statistically attached to reality.
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
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              $119
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-md border border-rose-500/30 bg-rose-500/5 px-3 py-2">
            <Users className="size-3.5 text-rose-600 dark:text-rose-400 shrink-0 animate-pulse" />
            <div>
              <div className="font-mono text-[13px] font-bold tabular-nums text-rose-700 dark:text-rose-300">
                {displayedA} people are viewing this right now
              </div>
              <div className="text-[8px] text-muted-foreground">
                U_displayed = R(a, b) — pseudo-random, detached from backend truth
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
            <span className="line-through">$195</span>
            <span className="font-semibold text-foreground">$119</span>
            <span className="text-[8px] font-semibold uppercase tracking-wider text-rose-500">
              {displayedA} watching
            </span>
          </div>

          <button
            onClick={() => setBought(true)}
            disabled={bought}
            className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[10px] font-medium transition-colors ${
              bought
                ? "bg-muted text-muted-foreground/60 cursor-default"
                : "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
            }`}
          >
            <ShoppingCart className="size-3" />
            {bought ? "Added to cart" : "Add to cart"}
          </button>

          <button
            onClick={refreshDark}
            className="mt-1.5 flex w-full items-center justify-center gap-1.5 rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <RefreshCw className="size-3" />
            Refresh analytics
          </button>

          {darkRevealed && (
            <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Fabricated metric
              </div>
              <p className="text-muted-foreground">
                U_displayed(i, t) = R(a, b) = <strong className="text-rose-500">{displayedA}</strong> while
                U_true(i, t) = <strong className="text-foreground">{U_TRUE}</strong> — the frontend number is produced by a
                pseudo-random function with no relation to backend analytics, and it re-rolls on every refresh
                ({refreshes} so far). A false sense of social proof, ~{Math.round(displayedA / U_TRUE)}× inflated.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
