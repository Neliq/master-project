"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Watch Ads To Unlock Features Or Get Rewards pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function WatchAdsToUnlockFeaturesDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Feature locked behind "watch 3 ads" CTA.
  const [watched, setWatched] = React.useState(0);
  const target = 3;
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Watch Ads To Unlock Features"
      caption="A feature (e.g. cloud storage) is locked behind 'watch 3 ads'. Each ad takes 30 seconds. The alternative is a $4.99 one-time purchase."
      hint="Click 'Watch ad' to unlock. Each ad takes time."
    >
      <div className="space-y-4">
        <div className="bg-muted/40 relative space-y-2 rounded-md border p-4 text-xs">
          <div className="text-muted-foreground text-[10px]">Cloud storage (locked)</div>
          <div className="text-base font-medium">100 GB</div>
          {watched < target && (
            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-background/85 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-amber-700 dark:text-amber-300 text-[10px]">Locked</div>
                <div className="font-mono text-sm font-semibold">{watched} / {target} ads watched</div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            disabled={watched >= target}
            onClick={() => setWatched((w) => w + 1)}
            className="bg-foreground text-background rounded-md px-3 py-1.5 font-medium disabled:opacity-30"
          >
            Watch 1 ad (30s)
          </button>
          <button
            onClick={() => setWatched(target)}
            className="bg-amber-500 text-white rounded-md px-3 py-1.5 font-medium"
          >
            Skip — pay $4.99
          </button>
        </div>
        {watched >= target && (
          <div className="bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-md border px-3 py-2 text-[10px]">
            Storage unlocked. You watched {watched} ads.
          </div>
        )}
      </div>
    </DemoShell>
  );
}

