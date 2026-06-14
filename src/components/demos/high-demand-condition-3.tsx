"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function HighDemandCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [secs, setSecs] = React.useState(120);
  const expired = secs <= 0;
  const reset = () => setSecs(120);
  React.useEffect(() => {
    if (expired) return;
    const id = window.setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [expired]);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Timer resets on expiry</span>
        <span className="font-mono font-semibold">Yes</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Urgency type</span>
        <span className="font-mono font-semibold">Manufactured</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="High Demand: Scarcity Coupling"
      caption="Scarcity Coupling — manufactured countdown creates pressure to act before thinking." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border-orange-500/40 bg-orange-500/5 p-3 text-xs">
          <div className="mb-1 font-medium text-orange-700 dark:text-orange-300">Scarcity Coupling</div>
          <div className="flex justify-center gap-1 py-3">
            {mm.split("").map((d,i) => (
              <div key={i} className="bg-foreground text-background h-10 w-8 rounded-md flex items-center justify-center font-mono text-lg font-bold">{d}</div>
            ))}
            <div className="flex items-center text-lg font-bold">:</div>
            {ss.split("").map((d,i) => (
              <div key={i} className="bg-foreground text-background h-10 w-8 rounded-md flex items-center justify-center font-mono text-lg font-bold">{d}</div>
            ))}
          </div>
          {!expired ? (
            <button className="bg-orange-500 hover:bg-orange-600 text-white w-full rounded-md py-2 text-sm font-bold">Claim 50% off</button>
          ) : (
            <button onClick={reset} className="bg-orange-500 hover:bg-orange-600 text-white w-full rounded-md py-2 text-sm font-bold">New offer</button>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
