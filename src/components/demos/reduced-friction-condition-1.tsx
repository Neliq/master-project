"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function ReducedFrictionCond1({
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
      title="Reduced Friction: Absence of Confirmation Interstitial"
      caption="Absence of Confirmation Interstitial — there is no way to dismiss this element." auditorStats={stats}>
      <div className="space-y-3">
        <div className="border-orange-500/40 bg-orange-500/5 rounded-md p-3 text-xs">
          <div className="font-medium text-orange-700 dark:text-orange-300">Absence of Confirmation Interstitial is active</div>
          <p className="text-muted-foreground text-[10px] mt-1">This banner cannot be dismissed.</p>
          <button onClick={() => setDone(true)} className="bg-orange-500 hover:bg-orange-600 text-white mt-2 rounded-md px-3 py-1.5 text-[10px] font-medium">
            Acknowledge
          </button>
        </div>
      </div>
    </DemoShell>
  );
}
