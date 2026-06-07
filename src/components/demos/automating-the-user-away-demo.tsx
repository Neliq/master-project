"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Automating The User Away pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function AutomatingTheUserAwayDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // A "vacation mode" that automatically books the same trip.
  const [autoBooked, setAutoBooked] = React.useState(false);
  const [trip, setTrip] = React.useState({ destination: "Lisbon", price: 480 });
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Automating The User Away"
      caption="A 'vacation mode' toggle silently re-books the same trip each year. The user gets a 'convenient' auto-renewal they didn't ask for."
      hint="Toggle 'vacation mode' and watch the silent re-booking."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Vacation mode</span>
            <button
              onClick={() => {
                const next = !autoBooked;
                setAutoBooked(next);
                if (next) {
                  setTrip((t) => ({ ...t, price: t.price + 30 }));
                }
              }}
              className={`relative h-5 w-9 rounded-full transition-colors ${
                autoBooked ? "bg-foreground" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 size-4 rounded-full bg-background transition-transform ${
                  autoBooked ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
          <div className="text-muted-foreground text-[10px]">Auto-rebook the same trip each year.</div>
        </div>
        <div className="bg-muted/40 space-y-1 rounded-md border px-3 py-2 text-xs">
          <div className="flex items-center justify-between">
            <span>{trip.destination} (annual trip)</span>
            <span className="font-mono font-semibold tabular-nums">${trip.price}</span>
          </div>
          {autoBooked && (
            <div className="text-amber-700 dark:text-amber-300 text-[10px]">
              ⚠ Auto-rebooked. $30 fee added for the "convenience".
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}

