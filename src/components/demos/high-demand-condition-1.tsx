"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function HighDemandCond1({
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
        <span className="text-muted-foreground">Emotional pressure tactics</span>
        <span className="font-mono font-semibold">Detected</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="High Demand: Metric Fabrication"
      caption="Metric Fabrication — social or parasocial pressure manipulates behavior." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md bg-red-500/5 border border-red-500/30 p-3 text-xs">
          <div className="font-medium text-red-700 dark:text-red-300">Metric Fabrication</div>
          <div className="space-y-1 mt-2">
            <div className="text-[10px]">✓ Alex just purchased — 2 min ago</div>
            <div className="text-[10px]">✓ Jordan just purchased — 5 min ago</div>
            <div className="text-[10px]">✓ Sam just purchased — 8 min ago</div>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white mt-2 w-full rounded-md py-1.5 text-[10px] font-medium">
            Don&apos;t miss out — $4.99
          </button>
        </div>
      </div>
    </DemoShell>
  );
}
