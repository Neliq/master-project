"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function ParasocialPressureCond1({
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
      title="Parasocial Pressure: Emotional Asymmetry"
      caption="Emotional Asymmetry — one action is trivially easy, the other is disproportionately hard." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border p-3 text-xs">
          <div className="mb-2 font-medium">Emotional Asymmetry</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-1.5 text-[10px]">1-click Accept</div>
              <div className="bg-foreground/10 h-2 w-full rounded-full">
                <div className="bg-green-500 h-2 rounded-full" style={{width: "100%"}} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-md border border-foreground/10 px-3 py-1.5 text-[10px] text-muted-foreground">Manage</div>
              <div className="bg-foreground/10 h-2 w-full rounded-full">
                <div className="bg-foreground/20 h-2 rounded-full" style={{width: "20%"}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
