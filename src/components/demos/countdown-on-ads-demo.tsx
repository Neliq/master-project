"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Countdown On Ads pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function CountdownOnAdsDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // An ad timer that counts down at 3× normal speed relative to the page.
  const [t, setT] = React.useState(60);
  const [adT, setAdT] = React.useState(60);
  const [skipped, setSkipped] = React.useState(false);

  React.useEffect(() => {
    const id = window.setInterval(() => setT((x) => Math.max(0, x - 1)), 1000);
    return () => window.clearInterval(id);
  }, []);

  React.useEffect(() => {
    const id = window.setInterval(() => setAdT((x) => Math.max(0, x - 3)), 333);
    return () => window.clearInterval(id);
  }, []);

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Countdown On Ads"
      caption="The ad's countdown ticks 3× faster than the page clock so a user who is 'just going to wait it out' gets pressured into clicking. Try to outlast the ad without giving in."
      hint="Compare the page timer to the ad timer."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 flex items-center justify-between rounded-md border px-3 py-2 text-xs">
          <span className="text-muted-foreground text-[10px]">Page clock</span>
          <span className="font-mono text-2xl font-semibold tabular-nums">{t}s</span>
        </div>

        <div className="bg-amber-500/10 border-amber-500/30 space-y-2 rounded-md border p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Sponsored</span>
            <span className="text-amber-700 dark:text-amber-300 font-mono text-2xl font-semibold tabular-nums">{adT}s</span>
          </div>
          <p className="text-muted-foreground text-[10px]">Skip in {adT}s — or click to install</p>
          <div className="flex gap-2">
            <button
              onClick={() => setSkipped(true)}
              className="bg-foreground text-background flex-1 rounded-md px-3 py-1.5 text-xs font-medium"
            >
              Install now
            </button>
            <button
              disabled={adT > 0}
              className="bg-muted/40 text-muted-foreground rounded-md border px-3 py-1.5 text-xs font-medium disabled:opacity-30"
            >
              {adT > 0 ? "Skip" : "Skip"}
            </button>
          </div>
        </div>

        {skipped && (
          <div className="bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-md border px-3 py-2 text-[10px]">
            Installed. Your 'skip' was tracked as a click.
          </div>
        )}
      </div>
    </DemoShell>
  );
}

