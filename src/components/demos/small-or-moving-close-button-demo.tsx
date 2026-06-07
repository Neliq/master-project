"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Small or Moving Close Button pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function SmallOrMovingCloseButtonDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // The "decline cookies" button is a 4-pixel square.
  // Every time the user hovers it, it jumps to a new position.
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = React.useState(0);
  const [declined, setDeclined] = React.useState(false);

  const onEnter = () => {
    if (declined) return;
    setHoverCount((c) => c + 1);
    setPos({ x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 40 });
  };

  const isAuditor = mode === "auditor";
  const reset = () => {
    setPos({ x: 0, y: 0 });
    setHoverCount(0);
    setDeclined(false);
  };

  const auditorControls = isAuditor ? (
    <button
      onClick={reset}
      className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
    >
      Restart
    </button>
  ) : null;

  const auditorStats = isAuditor ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Target size</span>
        <span className="font-mono font-semibold tabular-nums">4 × 4 px</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Hovers / dodges</span>
        <span className="font-mono font-semibold tabular-nums">{hoverCount}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Status</span>
        <span className="font-mono font-semibold">{declined ? "Declined ✓" : "Stuck"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset} auditorControls={auditorControls} auditorStats={auditorStats} title="Small or Moving Close Button"
      caption="The cookie consent modal's 'decline' button is a 4-pixel square placed in a corner. Each time the cursor approaches, the button teleports to a new position."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 relative h-48 overflow-hidden rounded-md border">
          <div className="bg-foreground/10 absolute inset-0 m-4 flex items-center justify-center rounded text-xs">
            Cookie banner
          </div>
          <button
            onMouseEnter={onEnter}
            onClick={() => setDeclined(true)}
            style={{
              position: "absolute",
              right: 6 + pos.x,
              top: 6 + pos.y,
              width: 4,
              height: 4,
            }}
            className="bg-foreground rounded-sm"
            aria-label="decline"
          />
        </div>
      </div>
    </DemoShell>
  );
}
