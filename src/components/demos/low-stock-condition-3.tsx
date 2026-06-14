"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function LowStockCond3({
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
      title="Low Stock: Selective Scope Narrowing"
      caption="Selective Scope Narrowing — provider-favorable option dominates visually." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-2 font-medium">Selective Scope Narrowing</div>
          <div className="rounded-xl border-indigo-500/40 border-2 bg-indigo-500/5 p-4 text-center shadow-lg">
            <div className="text-xs font-bold">Low Stock Premium</div>
            <div className="mt-1 text-lg font-bold">$19.99<span className="text-[10px] font-normal">/mo</span></div>
            <div className="text-muted-foreground text-[9px]">Everything included</div>
          </div>
          <div className="mt-2 rounded-md border border-foreground/10 p-1.5 text-center text-[9px] text-muted-foreground">
            Free plan
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
