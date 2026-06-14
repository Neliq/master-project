"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function PrivacyZuckeringCond3({
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
      title="Privacy Zuckering: Pre-Emptive Exposure"
      caption="Pre-Emptive Exposure — social or parasocial pressure manipulates behavior." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md bg-indigo-500/5 border border-indigo-500/30 p-3 text-xs">
          <div className="font-medium text-indigo-700 dark:text-indigo-300">Pre-Emptive Exposure</div>
          <div className="flex items-center gap-3 mt-2">
            <div className="font-mono text-2xl font-bold">1,247</div>
            <div className="text-[10px] text-muted-foreground">people viewed this today</div>
          </div>
          <div className="mt-2 text-[9px] text-muted-foreground">Hurry — 23 people are viewing right now</div>
        </div>
      </div>
    </DemoShell>
  );
}
