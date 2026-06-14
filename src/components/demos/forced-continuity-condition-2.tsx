"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function ForcedContinuityCond2({
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
      title="Forced Continuity: Absence of Temporal Feedforward"
      caption="Absence of Temporal Feedforward — there is no way to dismiss this element." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-1 font-medium">Absence of Temporal Feedforward</div>
          <p className="text-muted-foreground text-[10px]">An overlay has appeared. No close button, no X, no escape key.</p>
        </div>
        <div className="bg-background rounded-md border-indigo-500/40 border-2 p-4 text-center text-xs">
          <div className="mb-2 font-semibold">Action required</div>
          <button onClick={() => setDone(true)} className="bg-indigo-500 hover:bg-indigo-600 text-white mt-3 rounded-md px-3 py-1.5 text-[10px] font-medium">
            Continue
          </button>
        </div>
      </div>
    </DemoShell>
  );
}
