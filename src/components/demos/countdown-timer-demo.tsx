"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Countdown Timer pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function CountdownTimerDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // A timer that auto-restarts whenever it hits zero, claiming a new
  // "exclusive" offer is now available.
  const [t, setT] = React.useState(15);
  const [expirations, setExpirations] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    if (t <= 0) {
      setExpirations((n) => n + 1);
      setT(15);
      return;
    }
    const id = window.setTimeout(() => setT((x) => x - 1), 1000);
    return () => window.clearTimeout(id);
  }, [t, paused]);

  const isAuditor = mode === "auditor";
  const reset = () => {
    setT(15);
    setExpirations(0);
    setPaused(false);
  };

  const auditorControls = isAuditor ? (
    <>
      <button
        onClick={() => setPaused((p) => !p)}
        className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        {paused ? "Resume timer" : "Pause timer"}
      </button>
      <button
        onClick={reset}
        className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        Restart
      </button>
    </>
  ) : null;

  const auditorStats = isAuditor ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Offers cycled</span>
        <span className="font-mono font-semibold tabular-nums">{expirations}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Current offer</span>
        <span className="font-mono font-semibold tabular-nums">#{expirations + 1}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Timer state</span>
        <span className="font-mono font-semibold tabular-nums">{paused ? "paused" : "running"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset} auditorControls={auditorControls} auditorStats={auditorStats} title="Countdown Timer"
      caption="Each time the countdown reaches zero, a 'new exclusive offer' appears with a fresh 15s timer. The user can never actually finalise the purchase because the timer never stays at zero."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-1 rounded-md border p-6 text-center">
          <div className="text-muted-foreground text-[10px]">Offer #{expirations + 1} expires in</div>
          <div className="font-mono text-5xl font-semibold tabular-nums">0:{String(t).padStart(2, "0")}</div>
          <div className="text-amber-700 dark:text-amber-300 text-xs">Hurry! Special price -50%</div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted/40 rounded-md border px-3 py-2">
            <div className="text-muted-foreground text-[10px]">Now</div>
            <div className="font-mono text-base font-semibold tabular-nums">$49.00</div>
          </div>
          <div className="bg-muted/40 rounded-md border px-3 py-2">
            <div className="text-muted-foreground text-[10px]">Tomorrow</div>
            <div className="font-mono text-base font-semibold tabular-nums line-through opacity-60">$99.00</div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
