"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function WrongLanguageCond3({
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
      title="Wrong Language: Suppression of Localization Controls"
      caption="Suppression of Localization Controls — manufactured countdown creates pressure to act before thinking." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border-indigo-500/40 bg-indigo-500/5 p-3 text-xs">
          <div className="mb-1 font-medium text-indigo-700 dark:text-indigo-300">Suppression of Localization Controls</div>
          <div className="font-mono text-2xl font-bold tabular-nums text-center py-2">
            {mm}:{ss}
          </div>
          <div className="bg-foreground/10 h-2 rounded-full overflow-hidden mb-2">
            <div className="bg-indigo-500 h-full transition-all" style={{width: (secs/120*100)+"%"}} />
          </div>
          {!expired ? (
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white w-full rounded-md py-2 text-sm font-bold">
              Claim 50% off
            </button>
          ) : (
            <button onClick={reset} className="bg-indigo-500 hover:bg-indigo-600 text-white w-full rounded-md py-2 text-sm font-bold">
              New offer available
            </button>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
