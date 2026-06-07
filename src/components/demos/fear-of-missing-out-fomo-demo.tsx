"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Fear Of Missing Out (FOMO) pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function FearOfMissingOutFomoDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Show a list of "drops" you missed; each click 'reveals' a new
  // loss-frame.
  const drops = [
    { time: "5 min ago", item: "Limited drop: $120 hoodie" },
    { time: "1 hr ago", item: "Members-only: 50% off coupon" },
    { time: "2 hr ago", item: "Beta access to new feature" },
    { time: "yesterday", item: "Free upgrade for the first 100" },
  ];
  const [seen, setSeen] = React.useState(0);
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Fear Of Missing Out (FOMO)"
      caption="A wall of recent events you 'missed' is shown on the home page. Each event is a real-world loss. The longer you browse, the more you have 'missed'."
      hint="Tap 'Mark as seen'. The list is unbounded — there is always a new thing."
    >
      <div className="space-y-4">
        <div className="space-y-1">
          {drops.map((d, i) => (
            <div
              key={i}
              className={`bg-muted/40 flex items-center justify-between rounded-md border px-3 py-2 text-xs ${
                i < seen ? "opacity-40" : ""
              }`}
            >
              <div>
                <div className="font-medium">{d.item}</div>
                <div className="text-muted-foreground text-[10px]">{d.time}</div>
              </div>
              {i >= seen && (
                <button
                  onClick={() => setSeen((s) => Math.max(s, i + 1))}
                  className="bg-foreground text-background rounded-md px-2 py-1 text-[10px] font-medium"
                >
                  Mark as seen
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300 rounded-md border px-3 py-2 text-[10px]">
          Marked as seen: {seen} / {drops.length} (the list is refreshed every minute)
        </div>
      </div>
    </DemoShell>
  );
}

