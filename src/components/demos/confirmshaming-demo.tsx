"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Confirmshaming pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function ConfirmshamingDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Three different shame framings for the same decline action.
  const [severity, setSeverity] = React.useState(2);
  const frames = [
    "No thanks, I prefer paying full price",
    "No thanks, I don't care about privacy",
    "No thanks, I don't mind seeing irrelevant ads everywhere",
  ];
  const frame = frames[Math.min(severity, frames.length - 1)];
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Confirmshaming"
      caption="The 'decline' option is guilt-laden. The slider below shows three increasing severities of shame — most users will accept to avoid the social cost."
      hint="Slide the severity. Notice how the decline becomes more embarrassing."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-3 rounded-md border p-4 text-xs">
          <div className="text-base font-medium">We value your privacy</div>
          <p className="text-muted-foreground text-[10px]">Choose what data we can collect.</p>
          <div className="flex flex-col gap-2">
            <button className="bg-emerald-500 text-white rounded-md px-3 py-2 text-xs font-medium">
              Accept all — save 15% on this order
            </button>
            <button className="bg-muted/40 text-muted-foreground rounded-md border border-dashed px-3 py-2 text-[10px]">
              {frame}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-muted-foreground flex items-center justify-between text-[10px]">
            <span>Severity</span>
            <span className="font-mono">{severity + 1}/3</span>
          </div>
          <input
            type="range"
            min={0}
            max={2}
            value={severity}
            onChange={(e) => setSeverity(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-muted-foreground flex justify-between text-[10px]">
            <span>Mild</span>
            <span>Medium</span>
            <span>Severe</span>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}

