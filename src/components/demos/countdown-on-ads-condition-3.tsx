"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function CountdownOnAdsCond3({
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
      title="Countdown On Ads: Sequential Timer Chaining"
      caption="Sequential Timer Chaining — manufactured countdown creates pressure to act before thinking." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border-amber-500/40 bg-amber-500/5 p-3 text-xs">
          <div className="mb-2 font-medium text-amber-700 dark:text-amber-300">Sequential Timer Chaining</div>
          <div className="flex items-center justify-center gap-4 py-3">
            <div className="relative h-16 w-16">
              <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/10" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeDasharray={100} strokeDashoffset={100 - (secs/120*100)}
                  className="text-amber-700 dark:text-amber-300" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold">
                {Math.ceil(secs/60)}
              </div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold">{mm}:{ss}</div>
              <div className="text-muted-foreground text-[10px]">remaining</div>
            </div>
          </div>
          {!expired ? (
            <button className="bg-amber-500 hover:bg-amber-600 text-white w-full rounded-md py-2 text-sm font-bold">Claim 50% off</button>
          ) : (
            <button onClick={reset} className="bg-amber-500 hover:bg-amber-600 text-white w-full rounded-md py-2 text-sm font-bold">New offer</button>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
