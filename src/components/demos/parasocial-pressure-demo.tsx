"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Parasocial Pressure pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function ParasocialPressureDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // A streamer overlay asking for tips.
  const [tipped, setTipped] = React.useState(0);
  const [streak, setStreak] = React.useState(7);
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Parasocial Pressure"
      caption="The streamer overlay highlights '847K followers' and shows a leaderboard of tippers. The CTA implies social obligation. Tip history and streak are tracked."
      hint="Click a tip button. Notice the social-pressure messaging."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="bg-foreground/10 size-8 rounded-full" />
            <div>
              <div className="font-semibold">Streamer name</div>
              <div className="text-muted-foreground text-[10px]">847K followers • 7-day streak</div>
            </div>
          </div>
          <p className="text-muted-foreground text-[10px] italic">
            &quot;Hey friends! Only 3 of 847K viewers have donated today. Could you be next?&quot;
          </p>
          <div className="flex flex-wrap gap-2">
            {[1, 5, 20].map((n) => (
              <button
                key={n}
                onClick={() => setTipped((t) => t + n)}
                className="bg-amber-500 text-white rounded-md px-3 py-1.5 text-xs font-medium"
              >
                Tip ${n}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-amber-500/10 border-amber-500/30 rounded-md border px-3 py-2">
            <div className="text-amber-700 dark:text-amber-300 text-[10px]">Tipped</div>
            <div className="text-amber-700 dark:text-amber-300 font-mono text-2xl font-semibold tabular-nums">${tipped}</div>
          </div>
          <div className="bg-muted/40 rounded-md border px-3 py-2">
            <div className="text-muted-foreground text-[10px]">Streak</div>
            <div className="font-mono text-2xl font-semibold tabular-nums">{streak}d</div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}

