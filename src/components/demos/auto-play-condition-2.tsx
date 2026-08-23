"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Auto-Play — Condition 2: Affordance Suppression
 *
 * Thesis: B_cancel is the interactive UI node required to abort the
 * auto-advance or pause the media. The feature triggers if the system
 * deliberately minimizes, hides, or delays the rendering of the
 * cancellation node, artificially increasing the cognitive and motor
 * effort required to stop the automation:
 *
 *   Visibility(B_cancel) -> 0  OR  Cost(S_play -> False) >> 1
 *
 * Variant A (dark): the stop affordance is a 6px, low-contrast control
 * that only appears 3 seconds in — clicking the player does nothing, so
 * stopping costs real effort.
 * Variant B (benign): a full-size, high-contrast "Stop autoplay" button
 * is visible immediately — one click regains control.
 */

const COUNTDOWN_MAX = 10;
const AFFORDANCE_DELAY_MS = 3000;

export function AutoPlayCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Shared outcome: once the user stops autoplay (in either panel), both
  // reflect the stopped state so the friction difference stays comparable.
  const [stopped, setStopped] = React.useState(false);
  const [countdownA, setCountdownA] = React.useState(COUNTDOWN_MAX);
  const [affordanceReadyA, setAffordanceReadyA] = React.useState(false);
  const [clicksOnPlayerA, setClicksOnPlayerA] = React.useState(0);
  const [countdownB, setCountdownB] = React.useState(COUNTDOWN_MAX);

  const reset = () => {
    setStopped(false);
    setCountdownA(COUNTDOWN_MAX);
    setAffordanceReadyA(false);
    setClicksOnPlayerA(0);
    setCountdownB(COUNTDOWN_MAX);
  };

  // Both panels tick their "next episode in…" countdowns while autoplay runs.
  React.useEffect(() => {
    if (stopped) return;
    const id = window.setInterval(() => {
      setCountdownA((c) => Math.max(0, c - 1));
      setCountdownB((c) => Math.max(0, c - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [stopped]);

  // Affordance suppression: the dark cancel node only appears after a delay.
  React.useEffect(() => {
    if (stopped || affordanceReadyA) return;
    const t = window.setTimeout(() => setAffordanceReadyA(true), AFFORDANCE_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [stopped, affordanceReadyA]);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Visibility(B_cancel)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">6px &middot; 25% opacity &rarr; 0</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Visibility(B_cancel)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">40px &middot; 100% opacity</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Cost(S_play &rarr; False)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">&gg; 1 — delayed + tiny + low contrast</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Cost(S_play &rarr; False)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">1 click</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Auto-Play: Affordance Suppression"
      caption="Affordance Suppression — the cancel affordance is minimized, hidden, or delayed, inflating the effort required to regain control of the automation."
      auditorStats={stats}
      deltaNote="Variant A hides the stop control as a 6px, 25%-opacity dot that only appears after 3 seconds, and clicking the player does nothing — stopping costs real effort. Variant B shows a full-size 'Stop autoplay' button immediately; one click ends the countdown."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">Streamly — auto-advance</h3>
              <span className="rounded-full border border-green-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-green-600 dark:text-green-400">
                {stopped ? "stopped" : "playing"}
              </span>
            </div>
            <div className="mt-2 rounded-md border border-border bg-background p-3">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-500" fill="currentColor">
                  <path d="M4 5v14l13-7L4 5z" />
                </svg>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-medium text-foreground/85">Field Notes — Episode 2</div>
                  <div className="text-[8px] font-mono text-muted-foreground">
                    {stopped ? "Autoplay stopped — next episode will wait." : `Next episode in ${countdownB}s`}
                  </div>
                </div>
              </div>
              {!stopped && (
                <button
                  onClick={() => setStopped(true)}
                  className="mt-2.5 w-full rounded-md bg-green-600 hover:bg-green-700 py-1.5 text-[10px] font-semibold text-white transition-colors cursor-pointer"
                >
                  Stop autoplay
                </button>
              )}
            </div>
            {stopped && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Stopped in 1 click
                </div>
                <p className="text-muted-foreground mt-0.5">
                  B_cancel was rendered at full size, full contrast, immediately —{" "}
                  <span className="font-mono">Cost(S_play &rarr; False) = 1 click</span>. Regaining
                  control was trivial.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[11px] font-semibold">Streamly — auto-advance</h3>
            <span className="rounded-full border border-red-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-red-600 dark:text-red-400">
              {stopped ? "stopped" : "playing"}
            </span>
          </div>
          <div
            onClick={() => setClicksOnPlayerA((c) => c + 1)}
            className="mt-2 relative cursor-default rounded-md border border-border bg-background p-3"
          >
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-red-500" fill="currentColor">
                <path d="M4 5v14l13-7L4 5z" />
              </svg>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-medium text-foreground/85">Field Notes — Episode 2</div>
                <div className="text-[8px] font-mono text-muted-foreground">
                  {stopped ? "Autoplay stopped." : `Next episode in ${countdownA}s — tap anywhere to pause`}
                </div>
              </div>
            </div>

            {/* The suppressed cancel affordance: 6px, 25% opacity, delayed. */}
            {!stopped && affordanceReadyA && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setStopped(true);
                }}
                title=""
                aria-label="Stop autoplay"
                className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-foreground/25 opacity-25 hover:opacity-100 transition-opacity cursor-pointer"
              />
            )}

            <p className="mt-2 text-[8px] leading-relaxed text-muted-foreground/60">
              {!affordanceReadyA && !stopped
                ? "Playback controls are loading…"
                : clicksOnPlayerA > 0 && !stopped
                  ? `You clicked the player ${clicksOnPlayerA}x — nothing pauses. The tiny dot in the corner is the only stop control.`
                  : "Tap the control in the corner to stop playback."}
            </p>
          </div>
          {mode === "auditor" && stopped && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                You found the suppressed affordance
              </div>
              <p className="text-muted-foreground">
                B_cancel was rendered at 6px with 25% opacity, 3 seconds late, in the corner —{" "}
                <span className="font-mono">Visibility(B_cancel) &rarr; 0</span>. Every normal
                click on the player was ignored, so{" "}
                <span className="font-mono">Cost(S_play &rarr; False) &gg; 1</span>: the friction
                of stopping is available below the player.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
