"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function DeadEndCond1({
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
      title="Dead End: Topological Sink in the Navigational Graph"
      caption="Topological Sink in the Navigational Graph — there is no way to dismiss this element." auditorStats={stats}>
      <div className="space-y-3">
        <div className="border-green-500/40 bg-green-500/5 rounded-md p-3 text-xs">
          <div className="font-medium text-green-700 dark:text-green-300">Topological Sink in the Navigational Graph is active</div>
          <p className="text-muted-foreground text-[10px] mt-1">This banner cannot be dismissed.</p>
          <button onClick={() => setDone(true)} className="bg-green-500 hover:bg-green-600 text-white mt-2 rounded-md px-3 py-1.5 text-[10px] font-medium">
            Acknowledge
          </button>
        </div>
      </div>
    </DemoShell>
  );
}
