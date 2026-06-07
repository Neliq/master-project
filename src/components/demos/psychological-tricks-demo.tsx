"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Psychological Tricks pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function PsychologicalTricksDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // "If you decline, you'll see more ads."
  const [stage, setStage] = React.useState(0);
  const messages = [
    "We value your privacy. (The ad revenue does too.)",
    "If you decline, you'll see more ads and we can't fund our journalism.",
    "10,000 users in your area have already opted in.",
    "Are you really sure? Your decision affects our team.",
  ];
  const isAuditor = mode === "auditor";
  const reset = () => setStage(0);

  const auditorControls = isAuditor ? (
    <>
      <button
        onClick={() => setStage((s) => Math.min(messages.length - 1, s + 1))}
        className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        Skip to last step
      </button>
      <button
        onClick={reset}
        className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        Restart
      </button>
    </>
  ) : null;

  const auditorStats = isAuditor ? (
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">Pressure stage</span>
      <span className="font-mono font-semibold tabular-nums">
        {stage + 1} / {messages.length}
      </span>
    </div>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset} auditorControls={auditorControls} auditorStats={auditorStats} title="Psychological Tricks"
      caption="A four-step guilt trip before the user can decline cookies. Each step introduces a new pressure: scarcity, social proof, emotional appeal."
    >
      <div className="space-y-4">
        <div className="bg-amber-500/10 border-amber-500/30 space-y-2 rounded-md border p-3 text-xs">
          <div className="text-sm font-medium">{messages[stage]}</div>
        </div>
        <div className="flex gap-2 text-xs">
          <button
            disabled={stage >= messages.length - 1}
            onClick={() => setStage((s) => s + 1)}
            className="bg-amber-500 text-white flex-1 rounded-md px-3 py-1.5 font-medium disabled:opacity-30"
          >
            Next pressure
          </button>
          <button
            onClick={() => setStage(0)}
            className="bg-foreground text-background rounded-md px-3 py-1.5 font-medium"
          >
            Decline (after {messages.length - stage - 1} steps)
          </button>
        </div>
      </div>
    </DemoShell>
  );
}
