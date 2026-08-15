"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function PullToRefreshCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [state, setState] = React.useState<"idle" | "loading" | "done">("idle");
  const [progress, setProgress] = React.useState(0);
  const rafRef = React.useRef<number | null>(null);

  const startLoading = () => {
    setState("loading");
    setProgress(0);

    const startTime = performance.now();
    const DURATION = 3000; // 3 seconds

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / DURATION, 1);
      // Smooth ease-out cubic — starts fast, decelerates
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Done
        rafRef.current = null;
        setState("done");
        setProgress(1);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const reset = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setState("idle");
    setProgress(0);
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Artificial delay</span>
        <span className="font-mono font-semibold">3.0s</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">New content loaded</span>
        <span className="font-mono font-semibold">0 KB</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pull To Refresh (Variable-Reward Trap): Artificial Anticipation Injection"
      caption="Artificial Anticipation Injection — the app forces a 3-second loading screen even when nothing is loading. The delay is purely manufactured to train anticipation and make the eventual 'reward' feel earned." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-4 text-xs">
          <div className="mb-3 font-medium">Artificial Anticipation Injection</div>

          {state === "idle" && (
            <div className="text-center">
              <p className="text-muted-foreground text-[10px] mb-3 leading-relaxed">
                Pull-to-refresh feeds often simulate loading — even when there's nothing new.
                The artificial wait trains you to associate the pull with anticipation.
              </p>
              <button
                onClick={startLoading}
                className="bg-foreground text-background hover:opacity-90 w-full rounded-md py-2 text-xs font-medium transition-opacity"
              >
                Pull down to refresh
              </button>
            </div>
          )}

          {state === "loading" && (
            <div className="flex flex-col items-center gap-3 py-6">
              {/* Animated ring spinner */}
              <div className="relative w-14 h-14">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                  {/* Track */}
                  <circle
                    cx="18" cy="18" r="15.5"
                    fill="none" stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-foreground/10"
                  />
                  {/* Progress arc */}
                  <circle
                    cx="18" cy="18" r="15.5"
                    fill="none" stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="text-blue-500"
                    strokeDasharray={`${2 * Math.PI * 15.5}`}
                    strokeDashoffset={`${2 * Math.PI * 15.5 * (1 - progress)}`}
                    style={{ transition: "none" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-mono tabular-nums text-muted-foreground">
                    {Math.round(progress * 100)}%
                  </span>
                </div>
              </div>

              {/* Smooth progress bar */}
              <div className="w-full h-2 rounded-full bg-foreground/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress * 100}%`,
                    background:
                      "linear-gradient(90deg, rgb(59,130,246), rgb(168,85,247))",
                    transition: "none",
                  }}
                />
              </div>

              {/* Pulsing text */}
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] text-muted-foreground font-mono tabular-nums">
                  Checking for new content...
                </span>
              </div>
            </div>
          )}

          {state === "done" && (
            <div className="text-center py-4 space-y-2">
              <div className="text-3xl">📡</div>
              <div className="text-[10px] font-medium">No new content</div>
              <p className="text-muted-foreground text-[9px] max-w-[200px] mx-auto leading-relaxed">
                There was nothing new to show. The 3-second wait was entirely
                artificial — but next time you might pull again anyway.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
