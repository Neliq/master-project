"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function PositiveOrNegativeFramingCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [sent, setSent] = React.useState(false);
  const reset = () => setSent(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Messages sent without consent</span>
        <span className="font-mono font-semibold">{sent ? "47" : "0"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Positive Or Negative Framing: Exploitation of Loss Aversion"
      caption="Exploitation of Loss Aversion — messages appear to come from the user without consent." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-1 font-medium">Exploitation of Loss Aversion</div>
          <p className="text-muted-foreground text-[10px]">Find friends already on the platform.</p>
          <button onClick={() => setSent(true)} className="bg-foreground text-background mt-2 w-full rounded-md py-2 text-[10px] font-medium">
            {sent ? "Invites sent" : "Send invites"}
          </button>
        </div>
        {sent && (
          <div className="rounded-md border border-slate-400/30 bg-slate-100 p-3 text-[10px]">
            <div className="font-medium text-slate-700 dark:text-slate-300">47 invites sent as you!</div>
            <div className="text-muted-foreground mt-1">Messages appear to come from YOUR account.</div>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
