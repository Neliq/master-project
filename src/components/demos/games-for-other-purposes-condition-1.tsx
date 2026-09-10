"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function GamesForOtherPurposesCond1({ mode = "user" }: { mode?: "user" | "auditor" } = {}) {
  const [progress, setProgress] = React.useState(2);
  return (
    <DemoShell
      mode={mode}
      title="Games For Other Purposes: Task Progression"
      caption="A non-game service task is coupled to levels, points, and a progression loop."
      deltaNote="The dark rendering turns a profile-completion task into a level progression loop. The neutral rendering uses the same task as an ordinary checklist without game-state dependency."
      benign={<div className="rounded-md border bg-card p-4"><p className="text-[11px] font-semibold">Complete your service profile</p><div className="mt-3 space-y-2 text-[10px] text-muted-foreground"><p>✓ Contact details</p><p>○ Delivery preferences</p><p>○ Review and save</p></div><button className="mt-3 rounded-md bg-green-600 px-3 py-1.5 text-[10px] font-medium text-white">Continue</button></div>}
    >
      <div className="space-y-3">
        <div className="rounded-md border border-red-500/40 bg-card p-4"><div className="flex items-center justify-between"><p className="text-[11px] font-semibold">Profile quest</p><span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[9px] font-bold text-red-600">LEVEL {progress}</span></div><p className="mt-1 text-[10px] text-muted-foreground">Complete service details to earn points and unlock the next level.</p><div className="mt-3 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-red-500" style={{ width: `${progress * 25}%` }} /></div><button onClick={() => setProgress((n) => Math.min(4, n + 1))} className="mt-3 rounded-md bg-red-600 px-3 py-1.5 text-[10px] font-medium text-white">Complete next quest</button></div>
      </div>
    </DemoShell>
  );
}
