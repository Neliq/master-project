"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Privacy Zuckering pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function PrivacyZuckeringDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // 217 toggles, all pre-checked. The 'decline all' button is not present.
  const [declined, setDeclined] = React.useState(0);
  const total = 217;

  const isAuditor = mode === "auditor";
  const reset = () => setDeclined(0);

  const auditorControls = isAuditor ? (
    <button
      onClick={reset}
      className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
    >
      Reset (simulate next page load)
    </button>
  ) : null;

  const auditorStats = isAuditor ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Opt-outs completed</span>
        <span className="font-mono font-semibold tabular-nums">
          {declined} / {total}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Estimated time remaining</span>
        <span className="font-mono font-semibold tabular-nums">
          {Math.ceil((total - declined) * 0.5)}s
        </span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset} auditorControls={auditorControls} auditorStats={auditorStats} title="Privacy Zuckering"
      caption="The cookie settings page lists 217 data partners, all pre-checked. The 'decline all' option is absent. The user can only opt out one-by-one — and even that resets on next page load."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Manage data partners</span>
            <span className="font-mono text-base">{total - declined}/{total}</span>
          </div>
          <div className="bg-muted/40 h-2 overflow-hidden rounded">
            <div
              className="bg-foreground h-full"
              style={{ width: `${((total - declined) / total) * 100}%` }}
            />
          </div>
          <p className="text-muted-foreground text-[10px]">All 217 partners are pre-checked. There is no 'decline all' button.</p>
        </div>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setDeclined((d) => Math.min(total, d + 1))}
            className="bg-foreground text-background flex-1 rounded-md px-3 py-1.5 font-medium"
          >
            Decline 1 partner (1 click)
          </button>
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          (Average user gives up after 5 clicks. The opt-out also resets on the next page load.)
        </div>
      </div>
    </DemoShell>
  );
}
