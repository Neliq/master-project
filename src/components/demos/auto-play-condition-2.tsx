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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [stoppedA, setStoppedA] = React.useState(false);
  const [stoppedB, setStoppedB] = React.useState(false);
  const [countdownA, setCountdownA] = React.useState(COUNTDOWN_MAX);
  const [affordanceReadyA, setAffordanceReadyA] = React.useState(false);

  const [countdownB, setCountdownB] = React.useState(COUNTDOWN_MAX);


  React.useEffect(() => {
    const id = window.setInterval(() => {
      if (!stoppedA) setCountdownA((c) => Math.max(0, c - 1));
      if (!stoppedB) setCountdownB((c) => Math.max(0, c - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [stoppedA, stoppedB]);

  // Affordance suppression: the dark cancel node only appears after a delay.
  React.useEffect(() => {
    if (stoppedA || affordanceReadyA) return;
    const t = window.setTimeout(() => setAffordanceReadyA(true), AFFORDANCE_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [stoppedA, affordanceReadyA]);

  return (
    <DemoShell mode={mode}
      title="Auto-Play: Affordance Suppression"
      userTitle="Streamly — Video player"
      caption="Affordance Suppression — the cancel affordance is minimized, hidden, or delayed, inflating the effort required to regain control of the automation."
      deltaNote="Variant A hides the stop control as a 6px, 25%-opacity dot that only appears after 3 seconds, and clicking the player does nothing — stopping costs real effort. Variant B shows a full-size 'Stop autoplay' button immediately; one click ends the countdown."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">Streamly — auto-advance</h3>
              <span className="rounded-full border border-border/60 px-2 py-0.5 text-[8px] font-mono font-bold text-foreground">
                  {stoppedB ? "stopped" : "playing"}
              </span>
            </div>
            <div className="mt-2 rounded-md border border-border bg-background p-3">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-foreground" fill="currentColor">
                  <path d="M4 5v14l13-7L4 5z" />
                </svg>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-medium text-foreground/85">Field Notes — Episode 2</div>
                  <div className="text-[8px] font-mono text-muted-foreground">
                    {stoppedB ? "Autoplay stopped — next episode will wait." : `Next episode in ${countdownB}s`}
                  </div>
                </div>
              </div>
              {!stoppedB && (
                <button
                  onClick={() => setStoppedB(true)}
                  className="mt-2.5 w-full rounded-md bg-primary hover:bg-primary/80 py-1.5 text-[10px] font-semibold text-primary-foreground transition-colors cursor-pointer"
                >
                  Stop autoplay
                </button>
              )}
            </div>
            {stoppedB && (
              <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Stopped in 1 click
                </div>
                <p className="text-muted-foreground mt-0.5">
                  Regaining control was immediate: the stop action was visible beside the player and
                  required one click.
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
            <span className="rounded-full border border-border/60 px-2 py-0.5 text-[8px] font-mono font-bold text-foreground">
              {stoppedA ? "stopped" : "playing"}
            </span>
          </div>
          <div
            role="button"
            tabIndex={0}
            aria-label="Pause preview"
            onClick={(event) => {
              if (event.target instanceof HTMLElement && event.target.closest("button")) return;
              setStoppedA(true);
            }}
            onKeyDown={(event) => {
              if (event.key !== "Enter" && event.key !== " ") return;
              event.preventDefault();
              setStoppedA(true);
            }}
            className="mt-2 relative cursor-pointer rounded-md border border-border bg-background p-3"
          >
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-foreground" fill="currentColor">
                <path d="M4 5v14l13-7L4 5z" />
              </svg>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-medium text-foreground/85">Field Notes — Episode 2</div>
                <div className="text-[8px] font-mono text-muted-foreground">
                  {stoppedA ? "Autoplay stopped." : `Next episode in ${countdownA}s — use the corner control to stop`}
                </div>
              </div>
            </div>

            {/* The suppressed cancel affordance: 6px, 25% opacity, delayed. */}
            {!stoppedA && affordanceReadyA && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setStoppedA(true);
                }}
                title=""
                aria-label="Stop autoplay"
                className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-foreground/25 opacity-25 hover:opacity-100 transition-opacity cursor-pointer"
              />
            )}

            <p className="mt-2 text-[8px] leading-relaxed text-muted-foreground/60">
              {!affordanceReadyA && !stoppedA
                ? "Playback is preparing…"
                : stoppedA
                  ? "Preview paused."
                  : "Use the corner control or press Enter to pause the preview."}
            </p>
          </div>
          {mode === "auditor" && stoppedA && (
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
