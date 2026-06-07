"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Addictive Design pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function AddictiveDesignDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Streak counter with a streak-freeze paywall.
  const [streak, setStreak] = React.useState(7);
  const [broken, setBroken] = React.useState(false);
  const [freezes, setFreezes] = React.useState(0);

  const isAuditor = mode === "auditor";
  const reset = () => {
    setStreak(7);
    setBroken(false);
    setFreezes(0);
  };

  const auditorControls = isAuditor ? (
    <>
      <button
        onClick={() => { if (streak > 0) setStreak((s) => s - 1); }}
        className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        Skip a day
      </button>
      <button
        onClick={() => setBroken(true)}
        className="bg-purple-500/80 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        Miss a day
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
        <span className="text-muted-foreground">Current streak</span>
        <span className="font-mono font-semibold tabular-nums">{streak} days</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Freezes purchased</span>
        <span className="font-mono font-semibold tabular-nums">{freezes}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset} auditorControls={auditorControls} auditorStats={auditorStats} title="Addictive Design"
      caption="A 7-day streak counter. Missing a day resets the streak — unless the user pays $0.99 for a streak freeze. The user is incentivised to open the app daily, even when they have no reason to."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-center">
          <div className="text-muted-foreground text-[10px]">Current streak</div>
          <div className="font-mono text-5xl font-semibold tabular-nums">{streak}</div>
          <div className="text-[10px]">days</div>
        </div>
        {broken && (
          <div className="bg-amber-500/10 border-amber-500/30 space-y-2 rounded-md border p-3 text-xs">
            <div className="text-amber-700 dark:text-amber-300 font-medium">Streak broken!</div>
            <p className="text-muted-foreground text-[10px]">Buy a streak freeze for $0.99 to preserve your run?</p>
            <button
              onClick={() => { setBroken(false); setFreezes((f) => f + 1); }}
              className="bg-amber-500 text-white w-full rounded-md px-3 py-1.5 text-xs font-medium"
            >
              Pay $0.99 — restore streak
            </button>
          </div>
        )}
        {freezes > 0 && (
          <div className="bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-md border px-3 py-2 text-[10px]">
            Streak freezes bought: {freezes}
          </div>
        )}
      </div>
    </DemoShell>
  );
}
