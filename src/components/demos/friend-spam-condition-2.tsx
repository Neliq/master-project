"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function FriendSpamCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const reset = () => {};

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Size ratio (favorable : other)</span>
        <span className="font-mono font-semibold">3.2:1</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Friend Spam: Absence of Granular Selection"
      caption="Absence of Granular Selection — provider-favorable option dominates visually." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-2 font-medium">Absence of Granular Selection</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="border-slate-400/40 border-2 bg-slate-100 rounded-md p-3 text-center">
              <div className="text-[10px] font-bold">Pro</div>
              <div className="text-[9px]">$19.99/mo</div>
            </div>
            <div className="rounded-md border border-foreground/10 p-3 text-center text-muted-foreground">
              <div className="text-[10px]">Free</div>
              <div className="text-[9px]">$0</div>
            </div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
