"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Infinite Scrolling pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function InfiniteScrollingDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Simulated feed that auto-loads more on scroll.
  const [count, setCount] = React.useState(8);
  const [scrollCount, setScrollCount] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight > el.scrollHeight - 20) {
      setCount((c) => c + 4);
      setScrollCount((s) => s + 1);
    }
  };

  const isAuditor = mode === "auditor";
  const reset = () => {
    setCount(8);
    setScrollCount(0);
    setSeconds(0);
  };

  const auditorControls = isAuditor ? (
    <>
      <button
        onClick={() => setCount((c) => c + 4)}
        className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        Force load 4 more
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
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Items loaded</span>
        <span className="font-mono font-semibold tabular-nums">{count}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Scrolls to bottom</span>
        <span className="font-mono font-semibold tabular-nums">{scrollCount}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Time in feed</span>
        <span className="font-mono font-semibold tabular-nums">{seconds}s</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset} auditorControls={auditorControls} auditorStats={auditorStats} title="Infinite Scrolling"
      caption="There is no end of feed. The container auto-loads more items on scroll. There is no 'you've reached the end' marker — the loop never terminates."
    >
      <div className="space-y-4">
        <div onScroll={handleScroll} className="bg-muted/40 h-56 space-y-1 overflow-y-auto rounded-md border p-2">
          {Array.from({ length: count }, (_, i) => (
            <div key={i} className="bg-foreground/10 rounded px-2 py-2 text-[10px]">
              <div className="font-medium">Post #{i + 1}</div>
              <div className="text-muted-foreground">A scrollable, interesting, infinite thing.</div>
            </div>
          ))}
          <div className="text-muted-foreground py-2 text-center text-[10px]">loading more…</div>
        </div>
      </div>
    </DemoShell>
  );
}
