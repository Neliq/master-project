"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function ImmortalAccountsCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [done, setDone] = React.useState(false);
  const reset = () => setDone(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Dismissal vectors</span>
        <span className="font-mono font-semibold">0</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Immortal Accounts: Absolute Absence of Deletion Vectors"
      caption="Absolute Absence of Deletion Vectors — there is no way to dismiss this element." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-1 font-medium">Page content</div>
          <p className="text-muted-foreground text-[10px]">Normal page content would appear here.</p>
        </div>
        <div className="border-indigo-500/40 bg-indigo-500/5 rounded-r-md border-l-4 p-4 text-xs">
          <div className="font-medium text-indigo-700 dark:text-indigo-300">Absolute Absence of Deletion Vectors</div>
          <p className="text-muted-foreground text-[10px] mt-1">Panel with no close mechanism.</p>
          <button onClick={() => setDone(true)} className="bg-indigo-500 hover:bg-indigo-600 text-white mt-2 rounded-md px-3 py-1.5 text-[10px] font-medium">
            Acknowledge
          </button>
        </div>
      </div>
    </DemoShell>
  );
}
