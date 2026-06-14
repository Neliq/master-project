"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function PositiveOrNegativeFramingCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [choice, setChoice] = React.useState("none");
  const reset = () => setChoice("none");

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Path to accept</span>
        <span className="font-mono font-semibold">1 click</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Path to reject</span>
        <span className="font-mono font-semibold">5+ clicks</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Positive Or Negative Framing: Asymmetric Valence Calculation"
      caption="Asymmetric Valence Calculation — one action is trivially easy, the other is disproportionately hard." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border p-3 text-xs">
          <div className="mb-2 font-medium">Asymmetric Valence Calculation</div>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-3 py-1.5 text-[10px] font-medium">Accept</div>
            <div className="text-muted-foreground text-[9px]">→ Done</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full border border-foreground/10 px-3 py-1.5 text-[10px] text-muted-foreground">Decline</div>
            <div className="text-muted-foreground text-[9px]">→ Page 1/5 → Page 2/5 → ...</div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
