"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Information Without Context pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function InformationWithoutContextDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Four product metrics. Toggling 'show context' reveals the
  // 'idle / screen-on / mixed' breakdown.
  const [show, setShow] = React.useState(false);
  const metrics = [
    { label: "Battery life", headline: "16h", honest: "4h screen-on, 9h video, 16h idle" },
    { label: "Range", headline: "400 km", honest: "320 km highway, 400 km mixed, 280 km cold" },
    { label: "Download speed", headline: "1 Gbps", honest: "1 Gbps peak, 200 Mbps typical" },
    { label: "Storage", headline: "1 TB", honest: "1 TB raw, 870 GB formatted" },
  ];
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Information Without Context"
      caption="Headlines are accurate but misleading. Toggling 'show context' reveals the actual usage numbers."
      hint="Toggle the context view. Note the gap between headline and reality."
    >
      <div className="space-y-4">
        <div className="space-y-2">
          {metrics.map((m) => (
            <div key={m.label} className="bg-foreground/5 flex items-center justify-between rounded-md border px-3 py-2 text-xs">
              <div>
                <div className="text-muted-foreground text-[10px]">{m.label}</div>
                {show && <div className="text-amber-700 dark:text-amber-300 text-[10px]">{m.honest}</div>}
              </div>
              <div className="font-mono text-2xl font-semibold tabular-nums">{m.headline}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShow((s) => !s)}
          className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium"
        >
          {show ? "Hide context (back to marketing)" : "Show context"}
        </button>
      </div>
    </DemoShell>
  );
}

