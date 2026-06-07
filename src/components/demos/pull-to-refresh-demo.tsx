"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Pull To Refresh (Variable-Reward Trap) pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function PullToRefreshDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Tinder-style pull-to-refresh; 1 in 3 pulls spawns an ad.
  const [pulls, setPulls] = React.useState(0);
  const [ads, setAds] = React.useState(0);
  const [triggered, setTriggered] = React.useState<null | "content" | "ad">(null);
  const pull = () => {
    const isAd = Math.random() < 0.34;
    setPulls((p) => p + 1);
    if (isAd) {
      setAds((a) => a + 1);
      setTriggered("ad");
    } else {
      setTriggered("content");
    }
  };

  const isAuditor = mode === "auditor";
  const reset = () => {
    setPulls(0);
    setAds(0);
    setTriggered(null);
  };

  const auditorControls = isAuditor ? (
    <button
      onClick={reset}
      className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
    >
      Restart counter
    </button>
  ) : null;

  const auditorStats = isAuditor ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Total pulls</span>
        <span className="font-mono font-semibold tabular-nums">{pulls}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Ads spawned</span>
        <span className="font-mono font-semibold tabular-nums">
          {ads} {pulls > 0 && `(${Math.round((ads / pulls) * 100)}%)`}
        </span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset} auditorControls={auditorControls} auditorStats={auditorStats} title="Pull To Refresh (Variable-Reward Trap)"
      caption="Refreshing the feed sometimes spawns content, sometimes an ad. The unpredictable reward trains the user to keep pulling — to feed the ad impression counter."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 flex h-32 items-center justify-center rounded-md border text-center text-xs">
          <div>
            <div className="text-muted-foreground text-[10px]">↑ Pull to refresh</div>
            {triggered && (
              <div className={triggered === "ad" ? "text-amber-700 dark:text-amber-300 text-base font-semibold" : "text-base font-semibold"}>
                {triggered === "ad" ? "🎁 Sponsored content" : "📰 New post"}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={pull}
          className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium"
        >
          Pull down to refresh
        </button>
      </div>
    </DemoShell>
  );
}
