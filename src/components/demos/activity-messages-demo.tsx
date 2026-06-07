"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Activity Messages pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function ActivityMessagesDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // A real-time ticker.
  const events = [
    "Sarah from London just bought this",
    "James from Manchester is viewing",
    "14 people purchased in the last hour",
    "Anna from Krakow added to cart",
    "Mystery shopper just claimed a 50% coupon",
  ];
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = window.setInterval(() => setIdx((i) => (i + 1) % events.length), 2500);
    return () => window.clearInterval(id);
  }, []);
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Activity Messages"
      caption="A real-time ticker fires every 2.5s with a fresh social-proof message. The cadence and content are designed to feel both urgent and ambient."
      hint="Watch the ticker. Each event loops back to the start after the last one."
    >
      <div className="space-y-4">
        <div className="bg-amber-500/10 border-amber-500/30 space-y-1 rounded-md border p-3 text-xs">
          <div className="text-amber-700 dark:text-amber-300 text-[10px]">Live activity</div>
          <div className="font-mono text-sm">{events[idx]}</div>
        </div>
        <div className="space-y-1">
          {events.map((e, i) => (
            <div
              key={i}
              className={`rounded-md border px-2 py-1 text-[10px] ${
                i === idx ? "border-foreground/30 bg-foreground/10" : "border-foreground/10 bg-muted/30 text-muted-foreground"
              }`}
            >
              {e}
            </div>
          ))}
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          {events.length} unique events, looped every {events.length * 2.5}s.
        </div>
      </div>
    </DemoShell>
  );
}

