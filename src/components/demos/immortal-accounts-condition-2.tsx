"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function ImmortalAccountsCond2({
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
      title="Immortal Accounts: Asymmetrical Navigational Depth"
      caption="Asymmetrical Navigational Depth — one action is trivially easy, the other is disproportionately hard." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border p-3 text-xs">
          <div className="mb-2 font-medium">Asymmetrical Navigational Depth</div>
          <div className="space-y-2">
            <button onClick={() => setChoice("accept")} className="w-full rounded-md border p-3 text-left text-[11px] hover:bg-foreground/5">
              <div className="font-medium">Accept</div>
              <div className="text-muted-foreground text-[10px]">Instant — one click</div>
            </button>
            <button onClick={() => setChoice("manage")} className="w-full rounded-md p-3 text-left text-[10px] text-muted-foreground hover:bg-foreground/5">
              <div>Manage settings...</div>
              <div className="text-[9px]">Requires navigating 5+ pages</div>
            </button>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
