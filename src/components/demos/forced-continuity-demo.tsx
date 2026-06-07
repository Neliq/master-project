"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Forced Continuity pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function ForcedContinuityDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // A "free trial" that auto-renews, with cancel button disabled
  // for 48 h after the renewal.
  const [day, setDay] = React.useState(0);
  const [cancelled, setCancelled] = React.useState(false);
  const canCancel = day >= 14;
  const [hoursSinceCharge, setHoursSinceCharge] = React.useState(0);

  React.useEffect(() => {
    if (!canCancel || cancelled) return;
    const id = window.setInterval(() => {
      setHoursSinceCharge((h) => (h + 1) % 48);
    }, 200);
    return () => window.clearInterval(id);
  }, [canCancel, cancelled]);

  const cancelLocked = hoursSinceCharge < 24;

  const isAuditor = mode === "auditor";
  const reset = () => {
    setDay(0);
    setCancelled(false);
    setHoursSinceCharge(0);
  };
  const advance = (n: number) => setDay((d) => d + n);

  const auditorControls = isAuditor ? (
    <>
      <button
        onClick={() => advance(30)}
        className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        +30 days
      </button>
      <button
        onClick={() => advance(1)}
        className="bg-purple-500/80 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        +1 day
      </button>
      <button
        onClick={reset}
        className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        Restart
      </button>
    </>
  ) : null;

  const auditorStats = isAuditor ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Trial day</span>
        <span className="font-mono font-semibold tabular-nums">
          {day} {day < 14 ? `(locks cancel in ${14 - day}d)` : "(cancel open)"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Hours since last charge</span>
        <span className="font-mono font-semibold tabular-nums">{hoursSinceCharge}h</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Cancel button state</span>
        <span className="font-mono font-semibold tabular-nums">
          {cancelled ? "submitted" : cancelLocked ? "locked" : "active"}
        </span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset} auditorControls={auditorControls} auditorStats={auditorStats} title="Forced Continuity"
      caption="The service silently auto-renews at the end of the trial. The cancel button becomes unresponsive for 24 hours after the renewal so a user trying to claw back the charge will be told the system is busy."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-1 rounded-md border p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Invoice history</span>
            <span className="text-muted-foreground text-[10px]">${cancelled ? "0.00" : "9.99"} / mo</span>
          </div>
          {Array.from({ length: Math.max(1, day) }, (_, i) => (
            <div key={i} className="bg-muted/30 flex items-center justify-between rounded px-2 py-1 text-[10px]">
              <span>Day {(i + 1) * 30}</span>
              <span className="font-mono">- $9.99</span>
            </div>
          ))}
          {day === 0 && (
            <div className="text-muted-foreground text-[10px] italic">No charges yet.</div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <button
            disabled={!canCancel || cancelled || cancelLocked}
            onClick={() => setCancelled(true)}
            className="bg-red-500 text-white rounded-md px-3 py-1.5 font-medium disabled:opacity-30"
          >
            {cancelLocked && canCancel && !cancelled ? "Cancel (locked, retry in 24h)" : "Cancel subscription"}
          </button>
        </div>

        {canCancel && !cancelled && (
          <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
            Most recent renewal: {hoursSinceCharge}h ago. Cancellation window opens at 24h.
          </div>
        )}
        {cancelled && (
          <div className="bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-md border px-3 py-2 text-[10px]">
            Subscription cancelled. Refund window: closed.
          </div>
        )}
      </div>
    </DemoShell>
  );
}
