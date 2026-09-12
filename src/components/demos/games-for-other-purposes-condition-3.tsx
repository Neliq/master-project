"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function GamesForOtherPurposesCond3({ mode = "user" }: { mode?: "user" | "auditor" } = {}) {
  const [points, setPoints] = React.useState(20);
  return (
    <DemoShell
      mode={mode}
      title="Games For Other Purposes: Reward Framing"
      caption="A routine service action is framed as game advancement and depends on a reward state."
      deltaNote="The dark rendering frames submitting a routine request as earning a badge and blocks completion until enough points are earned. The neutral rendering states the service action and leaves it available without a game reward."
      benign={<div className="rounded-md border bg-card p-4"><p className="text-[11px] font-semibold">Submit your application</p><p className="mt-1 text-[10px] text-muted-foreground">Your information is complete and ready for review.</p><button className="mt-3 rounded-md bg-primary px-3 py-1.5 text-[10px] font-medium text-primary-foreground">Submit application</button></div>}
    >
      <div className="space-y-3"><div className="rounded-md border border-border/60 bg-card p-4"><p className="text-[11px] font-semibold">Unlock the submission badge</p><p className="mt-1 text-[10px] text-muted-foreground">Earn 30 points to unlock your application submission.</p><div className="mt-3 flex items-center justify-between rounded-md bg-muted/40 p-3"><span className="text-[10px] text-muted-foreground">Progress</span><strong className="text-[12px] text-foreground">{points}/30 XP</strong></div><button onClick={() => setPoints((n) => Math.min(30, n + 5))} className="mt-3 rounded-md bg-primary px-3 py-1.5 text-[10px] font-medium text-primary-foreground">Complete a challenge</button>{points >= 30 && <button className="mt-2 w-full rounded-md border border-border/60 py-1.5 text-[10px] text-foreground">Submit application</button>}</div></div>
    </DemoShell>
  );
}
