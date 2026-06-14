"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function PreDeliveredContentCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [done, setDone] = React.useState(false);
  const reset = () => setDone(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Dismissal vectors</span>
        <span className="font-mono font-semibold">0</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pre-Delivered Content: Transactional Key Provision"
      caption="Transactional Key Provision — there is no way to dismiss this element." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-1 font-medium">Transactional Key Provision</div>
          <p className="text-muted-foreground text-[10px]">An overlay has appeared. No close button, no X, no escape key.</p>
        </div>
        <div className="bg-background rounded-md border-blue-500/40 border-2 p-4 text-center text-xs">
          <div className="mb-2 font-semibold">Action required</div>
          <button onClick={() => setDone(true)} className="bg-blue-500 hover:bg-blue-600 text-white mt-3 rounded-md px-3 py-1.5 text-[10px] font-medium">
            Continue
          </button>
        </div>
      </div>
    </DemoShell>
  );
}
