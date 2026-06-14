"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function PrivacyMazeCond3({
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
        <span className="text-muted-foreground">Size ratio (favorable : other)</span>
        <span className="font-mono font-semibold">3.2:1</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Privacy Maze: Visual Prominence Disparity"
      caption="Visual Prominence Disparity — provider-favorable option dominates visually." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-2 font-medium">Visual Prominence Disparity</div>
          <div className="space-y-2">
            <div className="border-amber-500/40 border-2 bg-amber-500/5 rounded-lg p-6 text-center">
              <div className="text-lg font-bold">Premium — $19.99/mo</div>
              <div className="text-muted-foreground text-[10px]">Full access · Cancel anytime</div>
            </div>
            <div className="rounded-md border border-foreground/10 p-1.5 text-center text-[9px] text-muted-foreground">
              Basic (free) — limited
            </div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
