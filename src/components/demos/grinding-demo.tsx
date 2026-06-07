"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Grinding pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function GrindingDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // 5,000 XP/day required to keep up.
  const [xp, setXp] = React.useState(0);
  const daily = 5000;
  const pct = (xp / daily) * 100;
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Grinding"
      caption="A daily XP requirement: 5,000 XP to keep up with the leaderboard. Free users earn ~50 XP per match; the gap is designed to be unclosable without paying."
      hint="Click 'Play match' to earn XP. Notice the rate."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Daily XP</span>
            <span className="font-mono text-base">{xp} / {daily}</span>
          </div>
          <div className="bg-muted/40 h-2 overflow-hidden rounded">
            <div className="bg-foreground h-full" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setXp((x) => x + 50)}
            className="bg-foreground text-background rounded-md px-3 py-1.5 font-medium"
          >
            +50 XP (free match)
          </button>
          <button
            onClick={() => setXp((x) => x + 500)}
            className="bg-amber-500 text-white rounded-md px-3 py-1.5 font-medium"
          >
            +500 XP (boost $0.99)
          </button>
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          {Math.max(0, 100 - Math.floor(pct))}% XP needed to clear today's quota. At 50 XP/match, that's {Math.max(0, Math.ceil((daily - xp) / 50))} free matches.
        </div>
      </div>
    </DemoShell>
  );
}

