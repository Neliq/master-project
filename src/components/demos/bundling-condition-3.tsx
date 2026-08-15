"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function BundlingCond3({
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
        <span className="text-muted-foreground">Actual item prices</span>
        <span className="font-mono font-semibold">$79.99 + $14.99</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Displayed price</span>
        <span className="font-mono font-semibold">$94.98 (bundle only)</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Bundling: Suppression of Individual Pricing"
      caption="Suppression of Individual Pricing — individual item prices hidden behind a single bundle total." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-2 font-medium">Shopping Cart</div>

          {/* Card 1 — headphones, no price shown */}
          <div className="rounded-md border border-foreground/10 bg-foreground/5 px-2.5 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-sm">🎧</div>
                <div className="font-medium">Wireless Headphones</div>
              </div>
              <div className="text-[8px] text-muted-foreground/50">bundle</div>
            </div>
          </div>

          {/* Card 2 — warranty, no price shown */}
          <div className="mt-1.5 rounded-md border border-foreground/10 bg-foreground/5 px-2.5 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-sm">🛡️</div>
                <div className="font-medium">Extended Warranty (2yr)</div>
              </div>
              <div className="text-[8px] text-muted-foreground/50">bundle</div>
            </div>
          </div>

          {/* Single joined price for the bundle */}
          <div className="mt-2 flex items-center justify-between rounded-md bg-foreground/10 px-2.5 py-1.5 font-semibold">
            <span>Total (bundle)</span>
            <span className="font-mono">$94.98</span>
          </div>

          <div className="mt-2 text-center text-[8px] text-muted-foreground/50">
            Individual pricing not available. Items sold as a package.
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
