"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Positive Or Negative Framing pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function PositiveOrNegativeFramingDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Toggle the frame of the same offer.
  const [frame, setFrame] = React.useState<"gain" | "loss">("gain");
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Positive or Negative Framing"
      caption="The same offer can be framed as a gain ('Earn $10') or a loss ('Avoid losing $10'). Toggle the frame and see how the framing changes the perceived value."
      hint="Switch the frame. The offer is identical."
    >
      <div className="space-y-4">
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setFrame("gain")}
            className={`flex-1 rounded-md border px-3 py-2 font-medium ${
              frame === "gain" ? "border-foreground/30 bg-foreground text-background" : "border-foreground/10 bg-muted/40 text-muted-foreground"
            }`}
          >
            Gain frame
          </button>
          <button
            onClick={() => setFrame("loss")}
            className={`flex-1 rounded-md border px-3 py-2 font-medium ${
              frame === "loss" ? "border-foreground/30 bg-foreground text-background" : "border-foreground/10 bg-muted/40 text-muted-foreground"
            }`}
          >
            Loss frame
          </button>
        </div>
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="text-base font-semibold">
            {frame === "gain" ? "Earn $10 today" : "Avoid losing $10 today"}
          </div>
          <p className="text-muted-foreground text-[10px]">
            {frame === "gain"
              ? "Users rate this offer 30% more attractive than its loss-framed twin (Tversky & Kahneman, 1981)."
              : "Same price, same benefit, but framed as a loss. Users avoid it more often than the gain frame."}
          </p>
          <button className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium">
            {frame === "gain" ? "Take the offer" : "Take the offer"}
          </button>
        </div>
      </div>
    </DemoShell>
  );
}

