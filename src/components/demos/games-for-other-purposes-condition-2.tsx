"use client";

import { DemoShell } from "@/components/demos/demo-shell";

export function GamesForOtherPurposesCond2({ mode = "user" }: { mode?: "user" | "auditor" } = {}) {
  return (
    <DemoShell
      mode={mode}
      title="Games For Other Purposes: Visual Dominance"
      caption="The repurposed game layer takes visual priority over the ordinary service task."
      deltaNote="The dark rendering gives most of the viewport to a leaderboard and reward meter. The neutral rendering keeps progress information compact and lets the task controls remain dominant."
      benign={<div className="rounded-md border bg-card p-4"><p className="text-[11px] font-semibold">Submit maintenance request</p><p className="mt-1 text-[10px] text-muted-foreground">Describe the issue and choose a preferred time.</p><textarea className="mt-3 h-16 w-full rounded-md border bg-background p-2 text-[10px]" placeholder="Issue description" /><button className="mt-3 rounded-md bg-primary px-3 py-1.5 text-[10px] font-medium text-primary-foreground">Continue</button><div className="mt-3 rounded-md border p-2 text-[9px] text-muted-foreground">Profile progress: 2 of 4 steps</div></div>}
    >
      <div className="space-y-3">
        <div className="rounded-md border border-border/60 bg-card p-3"><div className="flex items-center justify-between"><p className="text-[11px] font-semibold">Weekly service leaderboard</p><span className="text-[9px] font-bold text-foreground">#04</span></div><div className="mt-3 rounded-md bg-primary p-4 text-center text-primary-foreground"><p className="text-2xl font-black">1,240</p><p className="text-[9px] uppercase tracking-widest text-primary-foreground/70">points to next badge</p></div><div className="mt-3 h-3 rounded-full bg-muted"><div className="h-3 w-4/5 rounded-full bg-primary" /></div><button className="mt-3 w-full rounded-md bg-primary py-2 text-[10px] font-semibold text-primary-foreground">Earn points to continue</button></div>
      </div>
    </DemoShell>
  );
}
