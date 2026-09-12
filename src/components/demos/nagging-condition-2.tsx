"use client";

import { DemoShell } from "@/components/demos/demo-shell";

export function NaggingCond2({ mode = "user" }: { mode?: "user" | "auditor" } = {}) {
  return (
    <DemoShell
      mode={mode}
      title="Nagging: Persistent Interruption Salience"
      caption="A recurring request is rendered as a large, high-layer interruption over the current task."
      deltaNote="The dark rendering covers the task with a persistent overlay. The neutral rendering keeps the same request in a small, dismissible inline notice."
      benign={<div className="rounded-md border bg-card p-4"><p className="text-[11px] font-semibold">Order summary</p><p className="mt-1 text-[10px] text-muted-foreground">Your delivery details are saved.</p><div className="mt-3 rounded-md border border-border/60 bg-muted/40 p-2 text-[10px] text-foreground">Optional reminder: finish your profile later.</div></div>}
    >
      <div className="relative min-h-48 rounded-md border border-border/60 bg-card p-4">
        <div className="space-y-2 opacity-40"><p className="text-[11px] font-semibold">Order summary</p><p className="text-[10px] text-muted-foreground">Delivery tomorrow · card ending 2048</p><button className="rounded-md border px-3 py-1.5 text-[10px]">Continue</button></div>
        <div className="absolute inset-4 z-10 flex items-center justify-center rounded-md border-2 border-border/60 bg-foreground/90 p-5 text-center text-background shadow-xl">
          <div><p className="text-[12px] font-bold">Please finish your profile</p><p className="mt-1 text-[10px] text-primary-foreground/70">This request interrupts the task again.</p><button className="mt-3 rounded-md bg-primary px-3 py-1.5 text-[10px] font-semibold">Finish now</button></div>
        </div>
      </div>
    </DemoShell>
  );
}
