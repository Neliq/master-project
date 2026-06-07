"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Auto-Play pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function AutoPlayDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // A video player that auto-advances; cancel is hover-only.
  const [videos] = React.useState(["Lo-fi beats", "Engagement loops", "Math behind feeds", "Opt-out guides"]);
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setIdx((i) => (i + 1) % videos.length), 4000);
    return () => window.clearTimeout(id);
  }, [idx, paused, videos.length]);

  const isAuditor = mode === "auditor";
  const reset = () => {
    setIdx(0);
    setPaused(false);
  };

  const auditorControls = isAuditor ? (
    <>
      <button
        onClick={() => setPaused((p) => !p)}
        className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        {paused ? "Resume autoplay" : "Pause autoplay"}
      </button>
      <button
        onClick={() => setIdx((i) => (i + 1) % videos.length)}
        className="bg-purple-500/80 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        Next video
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
        <span className="text-muted-foreground">Queue position</span>
        <span className="font-mono font-semibold tabular-nums">
          {idx + 1} / {videos.length}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Autoplay state</span>
        <span className="font-mono font-semibold tabular-nums">{paused ? "paused" : "running"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset} auditorControls={auditorControls} auditorStats={auditorStats} title="Auto-Play"
      caption="The video player auto-advances to the next video. The pause control is only visible while the cursor is hovering over the player, and disappears after 800ms."
    >
      <div className="space-y-4">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="bg-foreground/5 relative aspect-video overflow-hidden rounded-md border"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-xs">
            <div className="text-muted-foreground text-[10px]">Now playing</div>
            <div className="font-mono text-base font-semibold">{videos[idx]}</div>
            <div className="text-muted-foreground text-[10px]">Queue: {videos.length}</div>
          </div>
          {hovered && (
            <div className="bg-background/90 absolute right-2 bottom-2 left-2 flex gap-2 rounded p-2 text-[10px]">
              <button
                onClick={() => setPaused(true)}
                className="bg-foreground text-background rounded px-2 py-0.5"
              >
                Pause
              </button>
              <button
                onClick={() => setIdx((i) => (i + 1) % videos.length)}
                className="bg-muted/60 text-foreground rounded px-2 py-0.5"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
