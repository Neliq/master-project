"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Watch Ads To Unlock Features Or Get Rewards — Condition 1:
 * Attention as Transactional Currency
 *
 * Thesis: the application demands the uninterrupted completion of an ad
 * (E_playback(t) = 1 over the full Δt_ad) to generate a transactional
 * token. Verified attention time is the sole accepted currency:
 *
 *   ∫₀^Δt_ad E_playback(t) dt = Δt_ad ⟹ State(R_target) → Unlocked
 *
 * Variant A (dark): a 6-second unskippable ad. Switching away pauses it
 * (E_playback = 0) and freezes the integral — attention is the only
 * currency that unlocks the next level.
 * Variant B (benign): the identical ad + reward, but skippable after 1s
 * and unaffected by switching away. The ad still gates the reward, but
 * attention is no longer extorted.
 */

const AD_SECONDS = 6;
const SKIP_AFTER_SECONDS = 1;

export function WatchAdsToUnlockFeaturesCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [adState, setAdState] = React.useState<"idle" | "playing" | "done">("idle");
  const [secondsLeft, setSecondsLeft] = React.useState(AD_SECONDS);
  const [attentionRequired, setAttentionRequired] = React.useState(true);
  const [switchedAway, setSwitchedAway] = React.useState(false);
  const [skipped, setSkipped] = React.useState(false);
  const [energy, setEnergy] = React.useState(0);
  const [unlocked, setUnlocked] = React.useState(false);

  const reset = () => {
    setAdState("idle");
    setSecondsLeft(AD_SECONDS);
    setAttentionRequired(true);
    setSwitchedAway(false);
    setSkipped(false);
    setEnergy(0);
    setUnlocked(false);
  };

  // The ad only advances while playback is verified: in the dark variant,
  // switching away sets E_playback = 0 and the integral freezes.
  const playing = adState === "playing";
  const paused = playing && attentionRequired && switchedAway;
  const ticking = playing && !paused;
  const progressPct = Math.round(((AD_SECONDS - secondsLeft) / AD_SECONDS) * 100);

  React.useEffect(() => {
    if (!ticking) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [ticking]);

  React.useEffect(() => {
    if (!(playing && secondsLeft === 0)) return;
    // Deferred so the transition is not a synchronous setState in the effect body.
    const t = window.setTimeout(() => {
      setAdState("done");
      setEnergy((e) => e + 1);
      setUnlocked(true);
    }, 250);
    return () => window.clearTimeout(t);
  }, [playing, secondsLeft]);

  const startAd = (requireAttention: boolean) => {
    setAdState("playing");
    setAttentionRequired(requireAttention);
    setSecondsLeft(AD_SECONDS);
    setSwitchedAway(false);
    setSkipped(false);
  };

  const finishEarly = () => {
    setAdState("done");
    setEnergy((e) => e + 1);
    setUnlocked(true);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δt_ad (ad duration)</span>
        <span className="font-mono font-semibold tabular-nums">{AD_SECONDS}s</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">E_playback(t)</span>
        <span className={`font-mono font-semibold tabular-nums ${paused ? "text-rose-500" : "text-emerald-500"}`}>
          {paused ? "0 (paused)" : playing ? "1 (playing)" : "—"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">∫ E_playback dt</span>
        <span className="font-mono font-semibold tabular-nums">{Math.min(AD_SECONDS, AD_SECONDS - secondsLeft)}s / {AD_SECONDS}s</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">State(R_target)</span>
        <span className={`font-mono font-semibold tabular-nums ${unlocked ? "text-emerald-500" : "text-rose-500"}`}>
          {unlocked ? "Unlocked" : "Locked"}
        </span>
      </div>
    </>
  ) : null;

  const renderAdPlayer = (accent: "rose" | "emerald") => (
    <div className="rounded-md border border-border overflow-hidden">
      <div className="relative bg-muted aspect-video flex items-center justify-center">
        <div className="absolute top-1 left-1 text-[8px] font-mono font-bold uppercase tracking-wider bg-black/70 text-white rounded px-1.5 py-0.5">
          Ad
        </div>
        <div className="text-[10px] font-semibold text-muted-foreground">
          {paused ? "Ad paused — you looked away" : "Sponsored video"}
        </div>
        {paused && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-card rounded-md border px-3 py-2 text-center">
              <div className="text-[10px] font-semibold text-rose-500">E_playback(t) = 0</div>
              <div className="text-[8px] text-muted-foreground mt-0.5">
                Attention lost — the ad cannot earn progress while hidden.
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-2 space-y-1.5">
        <div className="flex items-center justify-between text-[8px] font-mono tabular-nums text-muted-foreground">
          <span>{paused ? "paused" : "0:0" + Math.max(0, secondsLeft)}</span>
          <span className={accent === "rose" ? "text-rose-500" : "text-emerald-500"}>{progressPct}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              accent === "rose" ? "bg-rose-500" : "bg-emerald-500"
            }`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex items-center gap-1.5 pt-0.5">
          <button
            onClick={() => finishEarly()}
            disabled={accent === "rose" || (adState === "playing" && AD_SECONDS - secondsLeft < SKIP_AFTER_SECONDS)}
            className={`flex-1 rounded-md py-1 text-[9px] font-medium transition-colors ${
              accent === "rose"
                ? "bg-muted text-muted-foreground/40 cursor-not-allowed line-through"
                : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
            }`}
          >
            Skip ad
          </button>
          {accent === "rose" ? (
            <button
              onClick={() => setSwitchedAway(true)}
              disabled={paused}
              className="flex-1 rounded-md bg-muted hover:bg-muted/70 text-foreground/70 py-1 text-[9px] font-medium transition-colors cursor-pointer"
            >
              Simulate switching apps
            </button>
          ) : (
            <button
              onClick={() => setSwitchedAway(true)}
              className="flex-1 rounded-md bg-muted hover:bg-muted/70 text-foreground/70 py-1 text-[9px] font-medium transition-colors cursor-pointer"
            >
              Switch apps (ad continues)
            </button>
          )}
        </div>
        {paused && (
          <button
            onClick={() => setSwitchedAway(false)}
            className="w-full rounded-md border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 py-1 text-[9px] font-semibold transition-colors cursor-pointer"
          >
            Return to app — resume watching
          </button>
        )}
        {accent === "rose" ? (
          <div className="text-[8px] text-rose-500/80 leading-relaxed">
            Unskippable — verified attention time is the only accepted currency for this unlock.
          </div>
        ) : (
          <div className="text-[8px] text-emerald-600 dark:text-emerald-400 leading-relaxed">
            Skippable after {SKIP_AFTER_SECONDS}s — the ad still plays, but your attention is never locked in.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Watch Ads To Unlock Features Or Get Rewards: Attention as Transactional Currency"
      caption="Attention as Transactional Currency — the app demands uninterrupted, fully-visible ad playback as the sole currency to unlock a feature."
      auditorStats={stats}
      deltaNote="Both variants gate the next level behind one 6-second ad and grant the same +1 Energy token. Variant A makes the ad unskippable and pauses it the moment you switch away — attention is verified and is the only accepted currency (∫E_playback dt = Δt_ad). Variant B keeps the reward but lets you skip after 1s and switch away freely, so attention is no longer extorted."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Trailblaze Quest — Level 2</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  The Ember Mines are locked. Earn 1 Energy to unlock this level.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                ⚡ {energy}
              </div>
            </div>

            {adState === "idle" && (
              <button
                onClick={() => startAd(false)}
                className="mt-3 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Watch ad to earn 1 Energy ({AD_SECONDS}s)
              </button>
            )}

            {(adState === "playing" || (adState === "done" && skipped)) && renderAdPlayer("emerald")}

            {adState === "done" && (
              <>
                <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2 text-[9px]">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300">+1 Energy token granted</span>
                  <span className="text-muted-foreground"> — the ad was completed, so State(R_target) → Unlocked.</span>
                </div>
                <button
                  onClick={() => setUnlocked(true)}
                  disabled={unlocked}
                  className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                    unlocked
                      ? "bg-muted text-muted-foreground/50 cursor-default"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  }`}
                >
                  {unlocked ? "Level 2 unlocked ✓" : "Unlock Level 2"}
                </button>
              </>
            )}

            {unlocked && (
              <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Level 2 unlocked — fairly gated
                </div>
                <p className="text-muted-foreground mt-0.5">
                  The reward still requires an ad, but the exchange is honest: you can skip after{" "}
                  {SKIP_AFTER_SECONDS}s and switch apps without losing progress. Verified attention is
                  not demanded as the sole currency — E_playback(t) is no longer required for the integral.
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
              <h3 className="text-[11px] font-semibold">Trailblaze Quest — Level 2</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                The Ember Mines are locked. Earn 1 Energy to unlock this level.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
              ⚡ {energy}
            </div>
          </div>

          {adState === "idle" && (
            <button
              onClick={() => startAd(true)}
              className="mt-3 w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Watch ad to earn 1 Energy ({AD_SECONDS}s)
            </button>
          )}

          {(adState === "playing" || (adState === "done" && skipped)) && renderAdPlayer("rose")}

          {adState === "done" && (
            <>
              <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2 text-[9px]">
                <span className="font-semibold text-amber-700 dark:text-amber-300">+1 Energy token granted</span>
                <span className="text-muted-foreground"> — the integral ∫E_playback dt reached Δt_ad.</span>
              </div>
              <button
                onClick={() => setUnlocked(true)}
                disabled={unlocked}
                className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                  unlocked
                    ? "bg-muted text-muted-foreground/50 cursor-default"
                    : "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                }`}
              >
                {unlocked ? "Level 2 unlocked ✓" : "Unlock Level 2"}
              </button>
            </>
          )}

          {unlocked && (
            <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Attention extorted as currency
              </div>
              <p className="text-muted-foreground">
                The game economy is balanced to starve you of Energy, so the ad is not a bonus — it is
                the only path forward. The unlock fires only when{" "}
                <strong className="text-foreground">∫₀^{AD_SECONDS} E_playback(t) dt = {AD_SECONDS}s</strong>{" "}
                with the video <em>fully visible and playing</em>: skip is disabled and switching away
                freezes progress (E_playback(t) = 0). Your attention — not your wallet — is the currency.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
