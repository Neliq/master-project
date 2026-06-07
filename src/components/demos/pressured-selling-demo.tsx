"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Pressured Selling pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function PressuredSellingDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Stack of urgency, scarcity, and social-proof messages.
  const [viewers, setViewers] = React.useState(12);
  const [stock, setStock] = React.useState(2);
  const [minutes, setMinutes] = React.useState(58);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setViewers((v) => Math.max(8, v + Math.floor(Math.random() * 3) - 1));
      setMinutes((m) => Math.max(0, m - 1));
    }, 1500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Pressured Selling"
      caption="A product page stacks three pressure signals — social proof, scarcity, and a deadline — into a single banner. Each alone is mild; together they form a high-pressure purchase funnel."
      hint="Watch the timers tick. Note how many pressure signals are stacked."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 space-y-2 rounded-md border p-4 text-xs">
          <div className="text-base font-medium">Limited-edition product</div>
          <div className="font-mono text-2xl font-semibold tabular-nums">$49.99</div>
          <div className="space-y-1">
            <div className="bg-amber-500/10 border-amber-500/30 flex items-center justify-between rounded border px-2 py-1 text-[10px]">
              <span>👀 {viewers} people viewing</span>
              <span className="text-amber-700 dark:text-amber-300">Social proof</span>
            </div>
            <div className="bg-red-500/10 border-red-500/30 flex items-center justify-between rounded border px-2 py-1 text-[10px]">
              <span>⚠ Only {stock} left in stock</span>
              <span className="text-red-700 dark:text-red-300">Scarcity</span>
            </div>
            <div className="bg-amber-500/10 border-amber-500/30 flex items-center justify-between rounded border px-2 py-1 text-[10px]">
              <span>⏰ Offer ends in {minutes}m</span>
              <span className="text-amber-700 dark:text-amber-300">Deadline</span>
            </div>
          </div>
          <button className="bg-foreground text-background w-full rounded-md px-3 py-1.5 text-xs font-medium">
            Buy now
          </button>
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          Three pressure signals stacked. Each one alone is a common practice; together they form a coercive funnel.
        </div>
      </div>
    </DemoShell>
  );
}

