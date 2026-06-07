"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Automatic Accept Third Party Term pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function AutomaticAcceptThirdPartyTermDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // 47 third-party partners pre-checked.
  const [unchecked, setUnchecked] = React.useState(0);
  const total = 47;
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Automatic Accept Third Party Term"
      caption="A 'Register' form pre-checks 47 third-party terms of service. Unchecking each one is a separate click. There is no 'reject all'."
      hint="Click 'Uncheck 1' repeatedly. Notice the time cost."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Third-party terms</span>
            <span className="font-mono text-base">{total - unchecked}/{total}</span>
          </div>
          <div className="bg-muted/40 h-2 overflow-hidden rounded">
            <div
              className="bg-foreground h-full"
              style={{ width: `${((total - unchecked) / total) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setUnchecked((u) => Math.min(total, u + 1))}
            className="bg-foreground text-background flex-1 rounded-md px-3 py-1.5 font-medium"
          >
            Uncheck 1 (1 click)
          </button>
          <button
            disabled
            className="bg-muted/40 text-muted-foreground flex-1 cursor-not-allowed rounded-md border border-dashed px-3 py-1.5 font-medium"
          >
            Reject all (disabled)
          </button>
        </div>
      </div>
    </DemoShell>
  );
}

