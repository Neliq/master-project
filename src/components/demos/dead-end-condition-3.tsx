"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function DeadEndCond3({
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
      title="Dead End: Visual Absence of Dismissal Vectors"
      caption="Visual Absence of Dismissal Vectors — provider-favorable option dominates visually." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-2 font-medium">Visual Absence of Dismissal Vectors</div>
          <div className="flex gap-2">
            <div className="bg-slate-600 hover:bg-slate-700 text-white rounded-full px-4 py-2 text-[10px] font-bold">Premium $19.99/mo</div>
            <div className="rounded-full border border-foreground/10 px-3 py-2 text-[10px] text-muted-foreground">Free</div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
