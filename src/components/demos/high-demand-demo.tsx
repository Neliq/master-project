"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the High Demand pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function HighDemandDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // A hotel page that always claims 12 people are viewing.
  const [viewers, setViewers] = React.useState(12);
  const [bookings, setBookings] = React.useState(3);
  const [showedUp, setShowedUp] = React.useState(0);

  // The "viewers" number is a constant — it never drops below 8
  React.useEffect(() => {
    const id = window.setInterval(() => {
      setViewers((v) => Math.max(8, v + Math.floor(Math.random() * 5) - 2));
    }, 1500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="High Demand"
      caption="The hotel page claims 12+ people are viewing this property right now. The number is updated on a timer to a value between 8 and 16; it never falls to zero."
      hint="Watch the viewer count refresh. Try to book — the urgency persists."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">The Ritz Hotel</span>
            <span className="text-amber-700 dark:text-amber-300 font-mono text-base font-semibold tabular-nums">
              👀 {viewers} viewing
            </span>
          </div>
          <div className="text-muted-foreground text-[10px]">Booked {bookings} times in the last 24h</div>
          <button
            onClick={() => { setBookings((b) => b + 1); setShowedUp((s) => s + 1); }}
            className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium"
          >
            Book now
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted/40 rounded-md border px-3 py-2">
            <div className="text-muted-foreground text-[10px]">Real viewers (you)</div>
            <div className="font-mono text-2xl font-semibold tabular-nums">{showedUp}</div>
          </div>
          <div className="bg-amber-500/10 border-amber-500/30 rounded-md border px-3 py-2">
            <div className="text-amber-700 dark:text-amber-300 text-[10px]">Claimed viewers</div>
            <div className="text-amber-700 dark:text-amber-300 font-mono text-2xl font-semibold tabular-nums">{viewers}</div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}

