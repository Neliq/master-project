"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2, Play, X } from "lucide-react";

/*
 * Countdown On Ads — Condition 2: Dynamic Affordance Injection
 *
 * Thesis: DOM(t) is the active render tree at time t and N_close is the
 * semantic node (e.g. an 'X' icon) that facilitates the exit. The feature
 * triggers if the system completely omits the exit node from the interface
 * until the exact moment the countdown expires, leaving the user in visual
 * uncertainty:
 *
 *   N_close ∉ DOM(t)  ∀ t < τ_lock  ∧  N_close ∈ DOM(τ_lock)
 *
 * Variant A (dark): there is no 'X', no skip, and not even a visible timer —
 * zero exit indicators while the lock runs. The only clickable surface is the
 * ad itself, so escape attempts land on the advertisement.
 * Variant B (benign): the identical ad with the 'X' close node present from
 * the very first second and a visible countdown — departure is always planned.
 */

const TAU_LOCK = 15; // s — hardcoded mandatory wait

export function CountdownOnAdsCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [phaseA, setPhaseA] = React.useState<"idle" | "ad" | "playing">("idle");
  const [tActiveA, setTActiveA] = React.useState(0);
  const [adClicksA, setAdClicksA] = React.useState(0);
  const [adOpenedA, setAdOpenedA] = React.useState(false);

  const [phaseB, setPhaseB] = React.useState<"idle" | "ad" | "playing">("idle");
  const [tActiveB, setTActiveB] = React.useState(0);

  React.useEffect(() => {
    if (phaseA !== "ad") return;
    const iv = window.setInterval(() => setTActiveA((t) => t + 1), 1000);
    return () => window.clearInterval(iv);
  }, [phaseA]);

  React.useEffect(() => {
    if (phaseB !== "ad") return;
    const iv = window.setInterval(() => setTActiveB((t) => t + 1), 1000);
    return () => window.clearInterval(iv);
  }, [phaseB]);

  // N_close appears in the DOM only at τ_lock.
  const closeVisibleA = tActiveA >= TAU_LOCK;

  const clickAdSurfaceA = () => {
    if (closeVisibleA) return;
    setAdClicksA((n) => n + 1);
    setAdOpenedA(true);
  };

  const playA = () => {
    setPhaseA("ad");
    setTActiveA(0);
    setAdClicksA(0);
    setAdOpenedA(false);
  };

  const playB = () => {
    setPhaseB("ad");
    setTActiveB(0);
  };

  const reset = () => {
    setPhaseA("idle");
    setTActiveA(0);
    setAdClicksA(0);
    setAdOpenedA(false);
    setPhaseB("idle");
    setTActiveB(0);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_lock (mandatory wait)</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_LOCK}s</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">t_active (time in ad, A)</span>
        <span className="font-mono font-semibold tabular-nums">{tActiveA}s</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">N_close ∈ DOM(t)?</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">∉ for t &lt; τ_lock (A) / ∈ from t=0 (B)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Clicks that opened the ad (A)</span>
        <span className="font-mono font-semibold tabular-nums">{adClicksA}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Countdown On Ads: Dynamic Affordance Injection"
      userTitle="Streamly — Watch video"
      caption="Dynamic Affordance Injection — no exit node exists anywhere in the render tree until the exact moment the countdown expires, so the user cannot even plan their departure."
      auditorStats={stats}
      deltaNote="Variant A omits the 'X' close node (and any other exit indicator) from the DOM for the entire 15s lock — the ad is the only clickable surface, so clicks meant to escape open the ad itself. Variant B renders the identical ad with the 'X' present from the first second, so the user can leave at any moment."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Streamly — watch the video</h3>
            {phaseB === "idle" && (
              <button
                onClick={playB}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-green-600 hover:bg-green-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
              >
                <Play className="size-3" /> Play video
              </button>
            )}

            {phaseB === "ad" && (
              <div className="relative mt-2 overflow-hidden rounded-md border border-green-500/30">
                <button
                  onClick={() => setPhaseB("playing")}
                  aria-label="Close advertisement"
                  className="absolute right-1.5 top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
                >
                  <X className="size-3" />
                </button>
                <div className="bg-gradient-to-br from-slate-600 to-slate-800 p-4 text-white">
                  <div className="text-[8px] font-semibold uppercase tracking-widest opacity-80">
                    Sponsored
                  </div>
                  <div className="mt-1 text-[12px] font-bold leading-tight">
                    Aurora Trek — the light jacket for all seasons
                  </div>
                  <div className="mt-1 text-[9px] opacity-90">
                    Waterproof, windproof, packable. Free returns for 90 days.
                  </div>
                  <div className="mt-2 inline-block rounded bg-white/20 px-2 py-1 text-[9px] font-semibold">
                    Shop now
                  </div>
                </div>
                <div className="flex items-center justify-between bg-background px-2 py-1.5">
                  <span className="font-mono text-[9px] text-muted-foreground">
                    {Math.max(0, TAU_LOCK - tActiveB)}s
                  </span>
                  <span className="text-[8px] text-green-700 dark:text-green-300">
                    You can close this ad at any time
                  </span>
                </div>
              </div>
            )}

            {phaseB === "playing" && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-3 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <CheckCircle2 className="size-3" />
                  Video playing
                </div>
                <p className="text-muted-foreground mt-0.5">
                  You dismissed the ad at t_active = {tActiveB}s via the ’X’ — the exit node was in the
                  render tree from the very first frame, so departure was always planable.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Streamly — watch the video</h3>
          {phaseA === "idle" && (
            <button
              onClick={playA}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-red-600 hover:bg-red-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              <Play className="size-3" /> Play video
            </button>
          )}

          {phaseA === "ad" && (
            <div className="relative mt-2 overflow-hidden rounded-md border border-red-500/30">
              {/* No X, no skip, no timer — the exit node is absent from DOM(t). */}
              {closeVisibleA && (
                <button
                  onClick={() => setPhaseA("playing")}
                  aria-label="Close advertisement"
                  className="absolute right-1.5 top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
                >
                  <X className="size-3" />
                </button>
              )}
              <div
                onClick={clickAdSurfaceA}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    clickAdSurfaceA();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Open sponsored advertisement"
                className={`cursor-pointer bg-gradient-to-br from-slate-600 to-slate-800 p-4 text-white transition-opacity ${
                  closeVisibleA ? "" : "hover:opacity-95"
                }`}
              >
                <div className="text-[8px] font-semibold uppercase tracking-widest opacity-80">
                  Sponsored
                </div>
                <div className="mt-1 text-[12px] font-bold leading-tight">
                  Aurora Trek — the light jacket for all seasons
                </div>
                <div className="mt-1 text-[9px] opacity-90">
                  Waterproof, windproof, packable. Free returns for 90 days.
                </div>
                <div className="mt-2 inline-block rounded bg-white/20 px-2 py-1 text-[9px] font-semibold">
                  Shop now
                </div>
              </div>
              {!closeVisibleA && (
                <div className="flex items-center justify-between bg-background px-2 py-1.5">
                  <span className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">
                    No exit available
                  </span>
                  <span className="text-[8px] text-muted-foreground">
                    (indicator appears at {TAU_LOCK}s)
                  </span>
                </div>
              )}
              {closeVisibleA && (
                <div className="flex items-center justify-between bg-background px-2 py-1.5">
                  <span className="font-mono text-[9px] text-red-600 dark:text-red-300">
                    Close available — at {tActiveA}s
                  </span>
                </div>
              )}
              {adOpenedA && !closeVisibleA && (
                <div className="border-t border-border bg-[#171717] p-3 text-white">
                  <div className="flex items-center justify-between text-[8px] font-semibold uppercase tracking-wider opacity-70">
                    <span>Aurora Trek</span>
                    <span>Advertiser site</span>
                  </div>
                  <h4 className="mt-1.5 text-[13px] font-bold">The light jacket for all seasons.</h4>
                  <p className="mt-1 text-[9px] leading-relaxed text-white/75">
                    Waterproof, windproof, and packable. Free returns for 90 days.
                  </p>
                  <button className="mt-2 rounded bg-white px-2.5 py-1 text-[8px] font-semibold text-black">
                    Shop now
                  </button>
                </div>
              )}
            </div>
          )}

          {phaseA === "playing" && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <AlertTriangle className="size-3" />
                Close option became available
              </div>
              <p className="text-muted-foreground">
                For the first {TAU_LOCK}s there was no close control or visible timer. The close option
                appeared only when the ad finished.
              </p>
              <p className="text-muted-foreground">
                During the wait, {adClicksA} of your interaction{adClicksA === 1 ? "" : "s"} landed on the
                ad itself — the desire to exit was weaponized into ad engagement.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
