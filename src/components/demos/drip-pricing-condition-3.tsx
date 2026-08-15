"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function DripPricingCond3({
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
        <span className="text-muted-foreground">Size ratio (main price : fee)</span>
        <span className="font-mono font-semibold">12:1</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Drip Pricing, Hidden Costs, or Partitioned Pricing: Visual Disparity of Cost Partitioning"
      caption="Visual Disparity of Cost Partitioning — additional cost rendered nearly invisible next to the main price." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-2 font-medium">Visual Disparity of Cost Partitioning</div>

          {/* Product card */}
          <div className="rounded-xl border-2 border-teal-500/40 bg-teal-500/5 p-5 text-center shadow-lg">
            <div className="text-xs font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">Limited-Time Offer</div>
            <div className="mt-1 text-sm text-muted-foreground">Annual subscription to Premium Suite</div>

            {/* Big prominent price */}
            <div className="mt-3 text-4xl font-extrabold tracking-tight">$49.99</div>
            <div className="text-[10px] text-muted-foreground">per month, billed annually</div>

            {/* Tiny additional cost — visually minimized */}
            <div className="mt-3 inline-flex items-center gap-1 rounded bg-foreground/5 px-2 py-0.5 text-[8px] text-muted-foreground/60">
              <span>+ $3.99 service fee</span>
              <span className="text-muted-foreground/40">·</span>
              <span>+ $1.25 tax</span>
            </div>

            {/* CTA */}
            <div className="mt-3 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white">
              Subscribe Now
            </div>
          </div>

          {/* Fine print */}
          <div className="mt-2 text-center text-[8px] text-muted-foreground/50 leading-tight">
            Price excludes applicable taxes and fees. Final total calculated at checkout. Service fee applies per billing cycle.
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
