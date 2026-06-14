"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function ForcedGracePeriodCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [level, setLevel] = React.useState(0);
  const reset = () => setLevel(0);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Current effort</span>
        <span className="font-mono font-semibold">{Math.pow(2, level)} units</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Growth model</span>
        <span className="font-mono font-semibold">Exponential (2^n)</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Forced Grace Period: Temporal Discrepancy Extraction"
      caption="Temporal Discrepancy Extraction — each step requires exponentially more effort." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-1 font-medium">Step {level + 1} — {Math.pow(2, level)} effort units</div>
          <div className="space-y-0.5">
            {Array.from({length: level}, (_, i) => (
              <div key={i} className="bg-orange-500 h-2 rounded-sm" style={{width: (100 - i * 12) + "%"}} />
            ))}
          </div>
        </div>
        <button onClick={() => setLevel(l => l + 1)} className="bg-orange-500 hover:bg-orange-600 text-white w-full rounded-md py-2 text-xs font-medium">
          Continue ({Math.pow(2, level)} units)
        </button>
      </div>
    </DemoShell>
  );
}
