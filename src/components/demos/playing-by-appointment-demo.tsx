"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Playing By Appointment pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function PlayingByAppointmentDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // 5 energy, regenerates 1 every 3 hours.
  const [energy, setEnergy] = React.useState(5);
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 800);
    return () => window.clearInterval(id);
  }, []);
  React.useEffect(() => {
    if (energy >= 5) return;
    if (tick % 4 !== 0) return;
    setEnergy((e) => Math.min(5, e + 1));
  }, [tick, energy]);
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Playing By Appointment"
      caption="Energy starts at 5, regenerates by 1 every 3 hours. The user is incentivised to log in at exactly the right moment to maximise energy use."
      hint="Spend energy. Wait. Watch the regen counter."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-1 rounded-md border p-4 text-center">
          <div className="text-muted-foreground text-[10px]">Energy</div>
          <div className="flex justify-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`text-2xl ${i < energy ? "" : "opacity-20"}`}>⚡</span>
            ))}
          </div>
          <div className="font-mono text-xs tabular-nums">{energy}/5</div>
        </div>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setEnergy((e) => Math.max(0, e - 1))}
            className="bg-foreground text-background rounded-md px-3 py-1.5 font-medium"
          >
            Spend 1 energy
          </button>
          <button
            disabled={energy >= 5}
            className="bg-amber-500 text-white rounded-md px-3 py-1.5 font-medium disabled:opacity-30"
          >
            Refill (pay $1.99)
          </button>
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          Energy regenerates 1 every 3 hours. (Demo time: ~3.2 seconds.)
        </div>
      </div>
    </DemoShell>
  );
}

