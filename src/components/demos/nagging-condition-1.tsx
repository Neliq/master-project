"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function NaggingCond1({ mode = "user" }: { mode?: "user" | "auditor" } = {}) {
  const [dismissals, setDismissals] = React.useState(0);
  const darkPrompt = dismissals > 0;
  return (
    <DemoShell
      mode={mode}
      title="Nagging: Repeated Prompt Injection"
      caption="The same request returns after it has already been dismissed."
      deltaNote="The dark rendering reinjects an equivalent profile prompt after every dismissal. The neutral rendering dismisses the request and keeps the task available without another interruption."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-4">
            <p className="text-[11px] font-semibold">Your account is ready</p>
            <p className="mt-1 text-[10px] text-muted-foreground">You can finish setting up your profile whenever you choose.</p>
            <button className="mt-3 rounded-md bg-green-600 px-3 py-1.5 text-[10px] font-medium text-white">Open profile</button>
          </div>
          <p className="text-[9px] text-muted-foreground">The message does not return after you dismiss it.</p>
        </div>
      }
    >
      <div className="space-y-3">
        <div className="rounded-md border border-red-500/40 bg-card p-4">
          <p className="text-[11px] font-semibold">Finish setting up your profile</p>
          <p className="mt-1 text-[10px] text-muted-foreground">Add a photo to get the most from your account.</p>
          <div className="mt-3 flex gap-2">
            <button className="rounded-md bg-red-600 px-3 py-1.5 text-[10px] font-medium text-white">Add photo</button>
            <button onClick={() => setDismissals((n) => n + 1)} className="rounded-md border px-3 py-1.5 text-[10px] text-muted-foreground">Not now</button>
          </div>
        </div>
        {darkPrompt && <div className="rounded-md border border-yellow-500/40 bg-yellow-500/10 p-3 text-[10px] text-muted-foreground">The same setup request returned after dismissal ({dismissals} dismissal{dismissals === 1 ? "" : "s"}).</div>}
      </div>
    </DemoShell>
  );
}
