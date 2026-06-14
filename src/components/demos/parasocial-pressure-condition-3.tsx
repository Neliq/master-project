"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function ParasocialPressureCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [unlocked, setUnlocked] = React.useState(false);
  const reset = () => setUnlocked(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Free path available</span>
        <span className="font-mono font-semibold">No</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Parasocial Pressure: Algorithmic Status Gating"
      caption="Algorithmic Status Gating — content is blocked without payment." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-1 font-medium">Algorithmic Status Gating</div>
          <div className="rounded-md border-slate-400/40 bg-slate-100 p-4 text-center" style={{opacity: unlocked ? 1 : 0.2}}>
            <div className="text-2xl">{unlocked ? "🔓" : "🏦"}</div>
            <div className="mt-1 text-[10px]">{unlocked ? "Vault opened" : "Premium vault"}</div>
          </div>
          {!unlocked && (
            <button onClick={() => setUnlocked(true)} className="bg-slate-600 hover:bg-slate-700 text-white mt-2 w-full rounded-md py-2 text-[10px] font-medium">
              Open vault — $19.99/mo
            </button>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
