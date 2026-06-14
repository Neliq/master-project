"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function ForcedRegistrationCond1({
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
      title="Forced Registration: Absolute State Blocking"
      caption="Absolute State Blocking — content is blocked without payment." auditorStats={stats}>
      <div className="space-y-3">
        <div className="relative rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-1 font-medium">Background content</div>
          <p className="text-muted-foreground text-[10px]">This content is partially obscured by a gate that cannot be closed.</p>
          <div className="border-amber-500/40 bg-amber-500/5 absolute inset-x-0 bottom-0 rounded-b-md p-3 text-center">
            <div className="text-[10px] font-medium text-amber-700 dark:text-amber-300">Absolute State Blocking</div>
            <button onClick={() => setUnlocked(true)} className="bg-amber-500 hover:bg-amber-600 text-white mt-1 rounded-md px-3 py-1 text-[10px] font-medium">
              Unlock
            </button>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
