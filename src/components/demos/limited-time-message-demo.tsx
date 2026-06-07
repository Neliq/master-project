"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Limited Time Message pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function LimitedTimeMessageDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // "30% off ends at midnight" — but the same banner has been there for
  // 4 days, and the discount is the always-on price.
  const [day, setDay] = React.useState(0);
  const [claimedEnd, setClaimedEnd] = React.useState("midnight");

  const newClaim = () => {
    const claims = ["midnight", "in 4 hours", "today only", "in 1 hour"];
    setClaimedEnd(claims[day % claims.length]);
  };

  const isAuditor = mode === "auditor";
  const reset = () => {
    setDay(0);
    setClaimedEnd("midnight");
  };
  const advanceDay = () => {
    setDay((d) => d + 1);
    newClaim();
  };

  const auditorControls = isAuditor ? (
    <>
      <button
        onClick={advanceDay}
        className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        +1 day
      </button>
      <button
        onClick={newClaim}
        className="bg-purple-500/80 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        Refresh deadline
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
        <span className="text-muted-foreground">Days banner has been up</span>
        <span className="font-mono font-semibold tabular-nums">{day}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Deadlines moved</span>
        <span className="font-mono font-semibold tabular-nums">{day}×</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset} auditorControls={auditorControls} auditorStats={auditorStats} title="Limited Time Message"
      caption="A banner says the discount ends in a few hours, but the same banner is shown for days. The 'deadline' is recomputed every refresh so it always looks imminent."
    >
      <div className="space-y-4">
        <div className="bg-amber-500 text-background space-y-1 rounded-md p-4 text-center text-xs">
          <div className="text-[10px]">⏰ Limited time</div>
          <div className="text-base font-semibold">30% off — ends {claimedEnd}</div>
          <div className="font-mono text-xs">$9.99 instead of $14.99</div>
        </div>

        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          The deadline moves every refresh. The discount is the always-on price.
        </div>
      </div>
    </DemoShell>
  );
}
