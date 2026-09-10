"use client";

import { DemoShell } from "@/components/demos/demo-shell";

export function NaggingCond2({ mode = "user" }: { mode?: "user" | "auditor" } = {}) {
  return (
    <DemoShell
      mode={mode}
      title="Nagging: Persistent Interruption Salience"
      caption="A recurring request is rendered as a large, high-layer interruption over the current task."
      deltaNote="The dark rendering covers the task with a persistent overlay. The neutral rendering keeps the same request in a small, dismissible inline notice."
      benign={<div className="rounded-md border bg-card p-4"><p className="text-[11px] font-semibold">Order summary</p><p className="mt-1 text-[10px] text-muted-foreground">Your delivery details are saved.</p><div className="mt-3 rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[10px] text-green-700 dark:text-green-300">Optional reminder: finish your profile later.</div></div>}
    >
      <div className="relative min-h-48 rounded-md border border-red-500/40 bg-card p-4">
        <div className="space-y-2 opacity-40"><p className="text-[11px] font-semibold">Order summary</p><p className="text-[10px] text-muted-foreground">Delivery tomorrow · card ending 2048</p><button className="rounded-md border px-3 py-1.5 text-[10px]">Continue</button></div>
        <div className="absolute inset-4 z-10 flex items-center justify-center rounded-md border-2 border-red-500/50 bg-red-950/90 p-5 text-center text-white shadow-xl">
          <div><p className="text-[12px] font-bold">Please finish your profile</p><p className="mt-1 text-[10px] text-white/70">This request interrupts the task again.</p><button className="mt-3 rounded-md bg-red-500 px-3 py-1.5 text-[10px] font-semibold">Finish now</button></div>
        </div>
      </div>
    </DemoShell>
  );
}
