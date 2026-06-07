"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Forced Grace Period pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function ForcedGracePeriodDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // A subscription panel that warns about an upcoming charge.
  // The cancel button is always present, but every "no, really" stage
  // re-opens the upsell modal.
  const [stage, setStage] = React.useState(0);
  const [cancelled, setCancelled] = React.useState(false);
  const friction = ["Continue cancellation", "Confirm loss of benefits", "Are you sure?", "Final answer?"];

  const isAuditor = mode === "auditor";
  const reset = () => {
    setStage(0);
    setCancelled(false);
  };

  const auditorControls = isAuditor ? (
    <>
      <button
        onClick={() => {
          if (stage < friction.length - 1) setStage((s) => s + 1);
          else setCancelled(true);
        }}
        className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        Force advance
      </button>
      <button
        onClick={() => setStage(0)}
        className="bg-purple-500/80 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        Back to stage 1
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
        <span className="text-muted-foreground">Friction stage</span>
        <span className="font-mono font-semibold tabular-nums">
          {Math.min(stage + 1, friction.length)} / {friction.length}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Cancellation</span>
        <span className="font-mono font-semibold tabular-nums">
          {cancelled ? "scheduled (in 14d)" : "in progress"}
        </span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset} auditorControls={auditorControls} auditorStats={auditorStats} title="Forced Grace Period"
      caption="The trial ends in 14 days, but the system imposes a 14-day waiting period between cancellation request and actual termination. During that period the subscription still auto-renews."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Pro Plan</span>
            <span className="text-muted-foreground text-[10px]">$9.99 / mo</span>
          </div>
          <div className="text-muted-foreground text-[10px]">
            Free trial ends in <span className="font-mono font-semibold">14 days</span>
          </div>
        </div>

        {!cancelled ? (
          <div className="space-y-2">
            <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 space-y-2 rounded-md border p-3 text-xs">
              <div className="font-medium">{friction[stage] ?? "Final"}</div>
              {stage === 1 && (
                <ul className="ml-4 list-disc text-[10px]">
                  <li>You'll lose custom themes</li>
                  <li>Priority support ends</li>
                  <li>Cloud storage downgrades to 1 GB</li>
                </ul>
              )}
              {stage === 2 && (
                <p className="text-[10px]">Other users in your area who cancelled came back within 30 days. Just saying.</p>
              )}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => {
                    if (stage < friction.length - 1) setStage((s) => s + 1);
                    else setCancelled(true);
                  }}
                  className="bg-red-500 text-white rounded-md px-3 py-1.5 text-xs font-medium"
                >
                  Yes, cancel
                </button>
                <button
                  onClick={() => setStage(0)}
                  className="bg-amber-500 text-white rounded-md px-3 py-1.5 text-xs font-medium"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-red-500/10 border-red-500/30 space-y-2 rounded-md border p-3 text-xs">
            <div className="text-red-700 dark:text-red-300 font-medium">Cancellation scheduled</div>
            <p className="text-muted-foreground text-[10px]">
              Your subscription will remain active for <span className="font-mono font-semibold">14 more days</span> and then auto-renew for one more cycle before terminating.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
