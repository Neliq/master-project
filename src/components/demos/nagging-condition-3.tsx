"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function NaggingCond3({ mode = "user" }: { mode?: "user" | "auditor" } = {}) {
  const [shown, setShown] = React.useState(1);
  return (
    <DemoShell
      mode={mode}
      title="Nagging: Imperative Repetition"
      caption="The same imperative request is repeated without adding new information."
      deltaNote="The dark rendering repeats an imperative call to enable notifications while the task context stays unchanged. The neutral rendering gives a factual status update with new information instead of repeating a command."
      benign={<div className="space-y-3"><div className="rounded-md border bg-card p-4"><p className="text-[11px] font-semibold">Notification settings</p><p className="mt-1 text-[10px] text-muted-foreground">Notifications are currently off. You can change this in Settings.</p><button className="mt-3 rounded-md border px-3 py-1.5 text-[10px]">Open settings</button></div><button onClick={() => setShown((n) => n + 1)} className="w-full rounded-md border py-1.5 text-[10px] text-muted-foreground">Refresh status ({shown})</button></div>}
    >
      <div className="space-y-3">
        <div className="rounded-md border border-border/60 bg-card p-4"><p className="text-[11px] font-semibold">Enable notifications now</p><p className="mt-1 text-[10px] text-muted-foreground">Enable notifications now to stay up to date.</p><button className="mt-3 rounded-md bg-primary px-3 py-1.5 text-[10px] font-medium text-primary-foreground">Enable notifications</button></div>
        <button onClick={() => setShown((n) => n + 1)} className="w-full rounded-md border py-1.5 text-[10px] text-muted-foreground">Show the message again ({shown})</button>
        {shown > 1 && <div className="rounded-md border border-border/60 bg-muted/40 p-3 text-[10px] text-muted-foreground">Enable notifications now. Nothing about the task has changed.</div>}
      </div>
    </DemoShell>
  );
}
