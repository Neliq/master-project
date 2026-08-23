"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Watch Ads To Unlock Features Or Get Rewards — Condition 2:
 * Visual Mismatch Between Reward Progress Display and Actual Progress
 *
 * Thesis: the rendered progress indicator P_visual (the bar the user
 * sees) is compared against the actual reward-earned ratio
 * P_actual = ads_watched / ads_required. The feature triggers if the
 * visual representation overstates progress beyond a tolerance
 * τ_mislead, creating a false sense of near-completion to sustain
 * ad-watching:
 *
 *   P_visual − P_actual > τ_mislead
 *
 * Variant A (dark): each completed ad fills 20% of the bar (double the
 * real 10%) and the counter reads 2× the true count — the reward
 * "looks ready" at 5 real ads, then the claim is rejected.
 * Variant B (benign): the bar advances exactly 10% per ad and the
 * counter matches reality; the claim succeeds only at 10 ads.
 */

const ADS_REQUIRED = 10;

export function WatchAdsToUnlockFeaturesCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [adsWatched, setAdsWatched] = React.useState(0);
  const [claimAttempted, setClaimAttempted] = React.useState(false);
  const [claimed, setClaimed] = React.useState(false);

  const reset = () => {
    setAdsWatched(0);
    setClaimAttempted(false);
    setClaimed(false);
  };

  // Dark variant: visual progress runs at 2× the actual progress.
  const visualCountDark = Math.min(ADS_REQUIRED, adsWatched * 2);
  const pVisualDark = visualCountDark / ADS_REQUIRED;
  const pActual = adsWatched / ADS_REQUIRED;
  const mismatch = pVisualDark - pActual;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P_actual (ads watched / required)</span>
        <span className="font-mono font-semibold tabular-nums">{adsWatched}/{ADS_REQUIRED}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P_visual (rendered bar)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{visualCountDark}/{ADS_REQUIRED}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P_visual − P_actual</span>
        <span className={`font-mono font-semibold tabular-nums ${mismatch > 0.1 ? "text-red-500" : "text-green-500"}`}>
          {mismatch.toFixed(2)} {mismatch > 0.1 ? "&gt; τ" : "≤ τ"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_mislead (tolerance)</span>
        <span className="font-mono font-semibold tabular-nums">0.10</span>
      </div>
    </>
  ) : null;

  const renderProgress = (accent: "rose" | "emerald") => {
    const isDark = accent === "rose";
    const pct = Math.round((isDark ? pVisualDark : pActual) * 100);
    const label = isDark ? visualCountDark : adsWatched;
    return (
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between text-[8px] font-mono tabular-nums text-muted-foreground">
          <span>Reward progress</span>
          <span className={isDark ? "text-red-500" : "text-green-500"}>
            {label} / {ADS_REQUIRED} ads
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden relative">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isDark ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ width: `${pct}%` }}
          />
          {isDark && (
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-foreground/60"
              style={{ left: `${Math.round(pActual * 100)}%` }}
              title="actual progress"
            />
          )}
        </div>
        {isDark && (
          <div className="flex items-center justify-between text-[8px] text-muted-foreground">
            <span className="text-foreground/70">▮ = actual ({Math.round(pActual * 100)}%)</span>
            <span className="text-red-500">bar overstates by {(mismatch * 100).toFixed(0)}%</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Watch Ads To Unlock Features Or Get Rewards: Visual Mismatch Between Reward Progress Display and Actual Progress"
      caption="Visual Mismatch Between Reward Progress Display and Actual Progress — the progress bar claims near-completion while the real ad count lags far behind."
      auditorStats={stats}
      deltaNote="Both variants require the same 10 completed ads for the same HD-export reward and count the same button clicks. Variant A renders the bar at double speed (each ad fills 20%, counter reads 2×) so it announces 'reward ready' at 5 real ads — then rejects the claim (P_visual − P_actual = 0.50 > τ_mislead). Variant B's bar advances exactly 10% per ad and the claim succeeds only at 10."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Exporter Pro — HD export</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Watch {ADS_REQUIRED} rewarded ads to unlock 1080p export. Progress is counted per
                  completed ad — nothing else.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                {adsWatched}/{ADS_REQUIRED}
              </div>
            </div>

            {renderProgress("emerald")}

            <button
              onClick={() => setAdsWatched((a) => Math.min(ADS_REQUIRED, a + 1))}
              disabled={adsWatched >= ADS_REQUIRED}
              className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                adsWatched >= ADS_REQUIRED
                  ? "bg-muted text-muted-foreground/50 cursor-default"
                  : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              }`}
            >
              {adsWatched >= ADS_REQUIRED ? "All ads watched" : `Watch ad (+1 completed)`}
            </button>

            <button
              onClick={() => {
                setClaimAttempted(true);
                if (adsWatched >= ADS_REQUIRED) setClaimed(true);
              }}
              disabled={adsWatched < ADS_REQUIRED}
              className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                adsWatched < ADS_REQUIRED
                  ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              }`}
            >
              Claim HD export
            </button>

            {claimed && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  HD export unlocked
                </div>
                <p className="text-muted-foreground mt-0.5">
                  The bar told the truth at every step: P_visual = P_actual. The reward became
                  claimable exactly when {ADS_REQUIRED} ads were really completed.
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
              <h3 className="text-[11px] font-semibold">Exporter Pro — HD export</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Watch {ADS_REQUIRED} rewarded ads to unlock 1080p export. Almost there — keep going!
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-yellow-500 rounded-full border border-yellow-500/30 px-2 py-0.5 shrink-0">
              {visualCountDark}/{ADS_REQUIRED}
            </div>
          </div>

          {renderProgress("rose")}

          <button
            onClick={() => setAdsWatched((a) => Math.min(ADS_REQUIRED, a + 1))}
            disabled={adsWatched >= ADS_REQUIRED}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              adsWatched >= ADS_REQUIRED
                ? "bg-muted text-muted-foreground/50 cursor-default"
                : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            }`}
          >
            {adsWatched >= ADS_REQUIRED ? "All ads watched" : `Watch ad (+1 completed)`}
          </button>

          {visualCountDark >= ADS_REQUIRED && !claimed && (
            <div className="mt-2 flex items-center gap-1.5 rounded-md border border-yellow-500/30 bg-yellow-500/5 px-2 py-1.5 text-[9px] font-semibold text-yellow-700 dark:text-yellow-300">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Reward ready! Claim it now.
            </div>
          )}

          <button
            onClick={() => {
              setClaimAttempted(true);
              if (adsWatched >= ADS_REQUIRED) setClaimed(true);
            }}
            disabled={visualCountDark < ADS_REQUIRED}
            className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              visualCountDark < ADS_REQUIRED
                ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            }`}
          >
            Claim HD export
          </button>

          {claimAttempted && !claimed && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Claim rejected — progress overstated
              </div>
              <p className="text-muted-foreground">
                The bar showed <strong className="text-foreground">{visualCountDark}/{ADS_REQUIRED}</strong> and
                announced the reward was ready, but only{" "}
                <strong className="text-red-500">{adsWatched}/{ADS_REQUIRED}</strong> ads were actually
                completed. P_visual − P_actual = {(mismatch).toFixed(2)} &gt; τ_mislead (0.10) — the
                false sense of near-completion exists purely to keep you in the ad loop. The true
                requirement was never {visualCountDark} ads; it was always {ADS_REQUIRED}.
              </p>
            </div>
          )}

          {claimed && (
            <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                HD export unlocked
              </div>
              <p className="text-muted-foreground mt-0.5">
                This time the real counter finally caught up: {adsWatched} completed ads ≥ {ADS_REQUIRED}.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
