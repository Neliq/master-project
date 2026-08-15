"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function HiddenInformationCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const reset = () => {};

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Critical info offset from CTA</span>
        <span className="font-mono font-semibold">~800px below fold</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Hidden Information: Extreme Spatial Displacement"
      caption="Extreme Spatial Displacement — crucial subscription details pushed far below the fold." auditorStats={stats}>
      {/* Scrollable component — whole thing scrolls */}
      <div className="h-64 overflow-y-auto rounded-md border bg-foreground/5 p-3 text-xs space-y-3">

        {/* The attractive offer — fills the visible viewport */}
        <div className="rounded-xl border-2 border-green-500/40 bg-green-500/5 p-5 text-center shadow-lg">
          <div className="text-xs font-bold uppercase tracking-wide text-green-600 dark:text-green-400">Special Offer</div>
          <div className="mt-1 text-[10px] text-muted-foreground">Limited time only</div>
          <div className="mt-3 text-4xl font-extrabold tracking-tight text-green-600 dark:text-green-400">$2.99<span className="text-sm font-normal">/mo</span></div>
          <div className="text-[10px] text-muted-foreground">Save 80% today</div>
          <button className="mt-3 w-full rounded-lg bg-green-600 px-4 py-2.5 text-xs font-semibold text-white">
            Claim Offer
          </button>
        </div>

        {/* Empty space pushing critical info below the fold */}
        <div className="h-80" />

        {/* Critical clause — only visible after scrolling far down */}
        <p className="text-[10px] leading-relaxed text-foreground/60">
          Promotional rate of $2.99/mo is valid for the first 3 months only.
          After the promotional period, your subscription will automatically
          renew at $14.99/mo. The minimum commitment period is 24 months with
          a $75 early cancellation fee.
        </p>

      </div>
    </DemoShell>
  );
}
