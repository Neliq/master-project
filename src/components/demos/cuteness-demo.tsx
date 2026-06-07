"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Cuteness pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function CutenessDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Cat illustrations around an upsell.
  const [chosen, setChosen] = React.useState<"yes" | "no" | null>(null);
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Cuteness"
      caption="An upsell is wrapped in pastel colours, kawaii faces, and childlike language. The visual style cues emotional, not rational, evaluation."
      hint="Notice how the styles are coded differently. Pick one and observe the framing."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setChosen("yes")}
            className={`rounded-2xl border-2 p-4 text-left transition-all ${
              chosen === "yes"
                ? "border-pink-300 bg-pink-100/40"
                : "border-pink-200 bg-pink-50/40 hover:bg-pink-50"
            }`}
          >
            <div className="text-3xl">🐱</div>
            <div className="mt-1 text-sm font-semibold">Yes pls! ✨</div>
            <div className="text-muted-foreground text-[10px]">Add cute premium for $4.99</div>
          </button>
          <button
            onClick={() => setChosen("no")}
            className="bg-muted/30 hover:bg-muted/50 rounded-md border border-dashed p-4 text-left transition-colors"
          >
            <div className="text-3xl grayscale">😐</div>
            <div className="mt-1 text-sm font-medium">No thanks</div>
            <div className="text-muted-foreground text-[10px]">Stay on basic plan</div>
          </button>
        </div>

        {chosen && (
          <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
            {chosen === "yes"
              ? "The kawaii style and exclamation marks nudge you emotionally."
              : "Notice how the 'no' option is intentionally plain and joyless."}
          </div>
        )}
      </div>
    </DemoShell>
  );
}

