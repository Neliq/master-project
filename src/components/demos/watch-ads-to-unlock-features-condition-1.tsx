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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [adStateA, setAdStateA] = React.useState<"idle" | "playing" | "done">("idle");
  const [adStateB, setAdStateB] = React.useState<"idle" | "playing" | "done">("idle");
  const [secondsLeftA, setSecondsLeftA] = React.useState(AD_SECONDS);
  const [secondsLeftB, setSecondsLeftB] = React.useState(AD_SECONDS);
  const [attentionRequiredA, setAttentionRequiredA] = React.useState(true);
  const [attentionRequiredB, setAttentionRequiredB] = React.useState(true);
  const [switchedAwayA, setSwitchedAwayA] = React.useState(false);
  const [switchedAwayB, setSwitchedAwayB] = React.useState(false);
  const [skippedA, setSkippedA] = React.useState(false);
  const [skippedB, setSkippedB] = React.useState(false);
  const [energyA, setEnergyA] = React.useState(0);
  const [energyB, setEnergyB] = React.useState(0);
  const [unlockedA, setUnlockedA] = React.useState(false);
  const [unlockedB, setUnlockedB] = React.useState(false);


  // The ad only advances while playback is verified: in the dark variant,
  // switching away sets E_playback = 0 and the integral freezes.
  const playingA = adStateA === "playing";
  const playingB = adStateB === "playing";
  const pausedA = playingA && attentionRequiredA && switchedAwayA;
  const pausedB = playingB && attentionRequiredB && switchedAwayB;
  const tickingA = playingA && !pausedA;
  const tickingB = playingB && !pausedB;
  const progressPctA = Math.round(((AD_SECONDS - secondsLeftA) / AD_SECONDS) * 100);
  const progressPctB = Math.round(((AD_SECONDS - secondsLeftB) / AD_SECONDS) * 100);

  React.useEffect(() => {
    if (!tickingA) return;
    const id = window.setInterval(() => {
      setSecondsLeftA((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [tickingA]);

  React.useEffect(() => {
    if (!tickingB) return;
    const id = window.setInterval(() => {
      setSecondsLeftB((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [tickingB]);

  React.useEffect(() => {
    if (!(playingA && secondsLeftA === 0)) return;
    // Deferred so the transition is not a synchronous setState in the effect body.
    const t = window.setTimeout(() => {
      setAdStateA("done");
      setEnergyA((e) => e + 1);
      setUnlockedA(true);
    }, 250);
    return () => window.clearTimeout(t);
  }, [playingA, secondsLeftA]);

  React.useEffect(() => {
    if (!(playingB && secondsLeftB === 0)) return;
    const t = window.setTimeout(() => {
      setAdStateB("done");
      setEnergyB((e) => e + 1);
      setUnlockedB(true);
    }, 250);
    return () => window.clearTimeout(t);
  }, [playingB, secondsLeftB]);

  const startAd = (requireAttention: boolean, side: "A" | "B") => {
    if (side === "A") {
      setAdStateA("playing");
      setAttentionRequiredA(requireAttention);
      setSecondsLeftA(AD_SECONDS);
      setSwitchedAwayA(false);
      setSkippedA(false);
    } else {
      setAdStateB("playing");
      setAttentionRequiredB(requireAttention);
      setSecondsLeftB(AD_SECONDS);
      setSwitchedAwayB(false);
      setSkippedB(false);
    }
  };

  const finishEarly = (side: "A" | "B") => {
    if (side === "A") {
      setAdStateA("done");
      setEnergyA((e) => e + 1);
      setUnlockedA(true);
    } else {
      setAdStateB("done");
      setEnergyB((e) => e + 1);
      setUnlockedB(true);
    }
  };

  const renderAdPlayer = (accent: "rose" | "emerald") => {
    const isDark = accent === "rose";
    const panelAdState = isDark ? adStateA : adStateB;
    const panelSecondsLeft = isDark ? secondsLeftA : secondsLeftB;
    const panelAttentionRequired = isDark ? attentionRequiredA : attentionRequiredB;
    const panelSwitchedAway = isDark ? switchedAwayA : switchedAwayB;
    const panelPlaying = panelAdState === "playing";
    const panelPaused = panelPlaying && panelAttentionRequired && panelSwitchedAway;
    const panelProgressPct = isDark ? progressPctA : progressPctB;
    const switchAway = () => (isDark ? setSwitchedAwayA(true) : setSwitchedAwayB(true));
    const resumeAd = () => (isDark ? setSwitchedAwayA(false) : setSwitchedAwayB(false));
    const finishEarlyForPanel = () => finishEarly(isDark ? "A" : "B");

    return (
    <div className="rounded-md border border-border overflow-hidden">
      <div className="relative overflow-hidden bg-foreground aspect-video text-background">
        <div className="absolute top-1 left-1 text-[8px] font-mono font-bold uppercase tracking-wider bg-foreground/70 rounded px-1.5 py-0.5">Sponsored</div>
        <div className="flex h-full flex-col justify-end p-3">
          <div className="text-[8px] uppercase tracking-widest text-background/70">Aurora Trek</div>
          <div className="mt-1 text-[13px] font-bold leading-tight">A lighter jacket for every forecast</div>
          <div className="mt-1 max-w-[80%] text-[9px] text-background/80">Waterproof, packable, and backed by free returns for 90 days.</div>
          <div className="mt-2 inline-flex w-fit rounded bg-background/20 px-2 py-1 text-[8px] font-semibold">See the collection</div>
        </div>
        {panelPaused && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <div className="bg-card rounded-md border px-3 py-2 text-center">
              <div className="text-[10px] font-semibold text-foreground">Ad paused</div>
              <div className="text-[8px] text-muted-foreground mt-0.5">
                Return to the app to continue earning progress.
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-2 space-y-1.5">
        <div className="flex items-center justify-between text-[8px] font-mono tabular-nums text-muted-foreground">
          <span>{panelPaused ? "paused" : "0:0" + Math.max(0, panelSecondsLeft)}</span>
          <span className={accent === "rose" ? "text-foreground" : "text-foreground"}>{panelProgressPct}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              accent === "rose" ? "bg-primary" : "bg-primary"
            }`}
            style={{ width: `${panelProgressPct}%` }}
          />
        </div>
        <div className="flex items-center gap-1.5 pt-0.5">
          <button
            onClick={finishEarlyForPanel}
            disabled={accent === "rose" || (panelAdState === "playing" && AD_SECONDS - panelSecondsLeft < SKIP_AFTER_SECONDS)}
            className={`flex-1 rounded-md py-1 text-[9px] font-medium transition-colors ${
              accent === "rose"
                ? "bg-muted text-muted-foreground/40 cursor-not-allowed line-through"
                : "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
            }`}
          >
            Skip ad
          </button>
          {accent === "rose" ? (
            <button
              onClick={switchAway}
              disabled={panelPaused}
              className="flex-1 rounded-md bg-muted hover:bg-muted/70 text-foreground/70 py-1 text-[9px] font-medium transition-colors cursor-pointer"
            >
              Simulate switching apps
            </button>
          ) : (
            <button
              onClick={switchAway}
              className="flex-1 rounded-md bg-muted hover:bg-muted/70 text-foreground/70 py-1 text-[9px] font-medium transition-colors cursor-pointer"
            >
              Switch apps (ad continues)
            </button>
          )}
        </div>
        {panelPaused && (
          <button
            onClick={resumeAd}
            className="w-full rounded-md border border-border/60 bg-muted/40 hover:bg-muted/60 text-foreground py-1 text-[9px] font-semibold transition-colors cursor-pointer"
          >
            Return to app — resume watching
          </button>
        )}
        {accent === "rose" ? (
          <div className="text-[8px] text-foreground/80 leading-relaxed">
            Unskippable — verified attention time is the only accepted currency for this unlock.
          </div>
        ) : (
          <div className="text-[8px] text-foreground leading-relaxed">
            Skippable after {SKIP_AFTER_SECONDS}s — the ad still plays, but your attention is never locked in.
          </div>
        )}
      </div>
    </div>
    );
  };

  return (
    <DemoShell mode={mode}
      title="Watch Ads To Unlock Features Or Get Rewards: Attention as Transactional Currency"
      userTitle="Trailblaze Quest — Level 2"
      caption="Attention as Transactional Currency — the app demands uninterrupted, fully-visible ad playback as the sole currency to unlock a feature."
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
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
                ⚡ {energyB}
              </div>
            </div>

            {adStateB === "idle" && (
              <button
                onClick={() => startAd(false, "B")}
                className="mt-3 w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Watch ad to earn 1 Energy ({AD_SECONDS}s)
              </button>
            )}

            {(adStateB === "playing" || (adStateB === "done" && skippedB)) && renderAdPlayer("emerald")}

            {adStateB === "done" && (
              <>
                <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2 text-[9px]">
                  <span className="font-semibold text-foreground">+1 Energy token granted</span>
                  <span className="text-muted-foreground"> — the ad was completed, so the reward is ready.</span>
                </div>
                <button
                  onClick={() => setUnlockedB(true)}
                  disabled={unlockedB}
                  className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                    unlockedB
                      ? "bg-muted text-muted-foreground/50 cursor-default"
                      : "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
                  }`}
                >
                  {unlockedB ? "Level 2 unlocked ✓" : "Unlock Level 2"}
                </button>
              </>
            )}

            {unlockedB && (
              <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Level 2 unlocked — fairly gated
                </div>
                <p className="text-muted-foreground mt-0.5">
                  The reward still requires an ad, but the exchange is honest: you can skip after{" "}
                  {SKIP_AFTER_SECONDS}s and switch apps without losing progress. Verified attention is
                  required attention is not the only way to use the app after the reward is earned.
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
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
              ⚡ {energyA}
            </div>
          </div>

          {adStateA === "idle" && (
            <button
              onClick={() => startAd(true, "A")}
              className="mt-3 w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Watch ad to earn 1 Energy ({AD_SECONDS}s)
            </button>
          )}

          {(adStateA === "playing" || (adStateA === "done" && skippedA)) && renderAdPlayer("rose")}

          {adStateA === "done" && (
            <>
              <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2 text-[9px]">
                <span className="font-semibold text-foreground">+1 Energy token granted</span>
                <span className="text-muted-foreground"> — the full ad finished and the reward is ready.</span>
              </div>
              <button
                onClick={() => setUnlockedA(true)}
                disabled={unlockedA}
                className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                  unlockedA
                    ? "bg-muted text-muted-foreground/50 cursor-default"
                    : "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
                }`}
              >
                {unlockedA ? "Level 2 unlocked ✓" : "Unlock Level 2"}
              </button>
            </>
          )}

          {unlockedA && (
            <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Energy unlocked
              </div>
              <p className="text-muted-foreground">
                The Ember Mines are ready. Your completed sponsor view added one Energy token to the
                account, and the next level can now be opened.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
