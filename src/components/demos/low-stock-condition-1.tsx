"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function LowStockCond1({
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
        <span className="text-muted-foreground">Emotional pressure tactics</span>
        <span className="font-mono font-semibold">Detected</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Low Stock: Inventory Fabrication"
      caption="Inventory Fabrication — social or parasocial pressure manipulates behavior." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md bg-indigo-500/5 border border-indigo-500/30 p-3 text-xs">
          <div className="mb-2 font-medium text-indigo-700 dark:text-indigo-300">Your favourite creator needs support</div>
          <p className="text-muted-foreground text-[10px]">Without your help, they cannot keep creating content you love.</p>
          <div className="mt-2 flex gap-2">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white flex-1 rounded-md py-2 text-[10px] font-medium">Send $4.99</button>
            <button className="rounded-md border border-foreground/10 px-3 py-2 text-[10px] text-muted-foreground">Maybe later</button>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
