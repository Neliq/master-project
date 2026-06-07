"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Pay To Avoid pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function PayToAvoidDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // An ad that can be skipped by waiting 5 minutes or by paying $0.49.
  const [progress, setProgress] = React.useState(0);
  const [paid, setPaid] = React.useState(false);

  React.useEffect(() => {
    if (paid) return;
    if (progress >= 100) return;
    const id = window.setTimeout(() => setProgress((p) => Math.min(100, p + 1)), 600);
    return () => window.clearTimeout(id);
  }, [progress, paid]);

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Pay To Avoid"
      caption="A forced ad is skippable for free, but only after 5 minutes. A 49-cent payment skips immediately. The math is designed to favour the payment."
      hint="Compare the cost of waiting vs. paying."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="text-muted-foreground text-[10px]">Ad playback</div>
          <div className="bg-muted/40 h-2 overflow-hidden rounded">
            <div className="bg-foreground h-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="font-mono text-[10px]">{progress}% / 5:00</div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => setPaid(true)}
            className="bg-amber-500 text-white rounded-md px-3 py-2 font-medium"
          >
            Skip for $0.49
          </button>
          <button
            disabled={progress < 100}
            onClick={() => setPaid(true)}
            className="bg-muted/60 text-foreground rounded-md border px-3 py-2 font-medium disabled:opacity-30"
          >
            Wait it out
          </button>
        </div>
        {paid && (
          <div className="bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-md border px-3 py-2 text-[10px]">
            Ad skipped. Your $0.49 is the only thing the publisher earns from this view.
          </div>
        )}
      </div>
    </DemoShell>
  );
}

