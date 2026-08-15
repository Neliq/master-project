"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function CountdownOnAdsCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [adVisible, setAdVisible] = React.useState(false);
  const [countdown, setCountdown] = React.useState(10);
  const [dismissed, setDismissed] = React.useState(false);

  const reset = () => {
    setAdVisible(false);
    setCountdown(10);
    setDismissed(false);
  };

  React.useEffect(() => {
    const t = setTimeout(() => setAdVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    if (!adVisible || countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [adVisible, countdown]);

  const canClose = countdown === 0;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Mandatory wait time</span>
        <span className="font-mono font-semibold">10 seconds</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Close affordance injected at</span>
        <span className="font-mono font-semibold">t = 10s</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Countdown On Ads: Dynamic Affordance Injection"
      caption="Dynamic Affordance Injection — no close button exists until the countdown finishes." auditorStats={stats}>
      <div className="space-y-3">
        <div className="relative min-h-[400px] rounded-md border bg-foreground/5 p-3 text-xs">

          {/* Page content behind the ad */}
          <div className={`transition-opacity ${adVisible && !dismissed ? "opacity-30" : "opacity-100"}`}>
            <div className="mb-1 font-medium">Your Content</div>
            <div className="space-y-1 text-[10px] text-muted-foreground">
              <div className="h-2 w-3/4 rounded bg-foreground/10" />
              <div className="h-2 w-full rounded bg-foreground/10" />
              <div className="h-2 w-5/6 rounded bg-foreground/10" />
              <div className="h-2 w-2/3 rounded bg-foreground/10" />
            </div>
          </div>

          {/* Ad overlay */}
          {adVisible && !dismissed && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md">
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/60 rounded-md" />

              {/* Ad card */}
              <div className="relative w-full max-w-[220px] rounded-xl border-2 border-amber-500/40 bg-white shadow-2xl dark:bg-zinc-900">

                {/* Close button — only appears after countdown, positioned top-left */}
                {canClose && (
                  <button
                    onClick={() => setDismissed(true)}
                    className="absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 text-sm font-bold text-foreground hover:bg-foreground/20 animate-in fade-in"
                  >
                    ✕
                  </button>
                )}

                {/* Ad content */}
                <div className="p-4 pt-3 text-center">
                  <div className="text-[7px] uppercase tracking-widest text-amber-600 dark:text-amber-400">Sponsored</div>
                  <div className="mt-1.5 text-base font-bold text-foreground">🎉 Congratulations!</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">You've been selected for an exclusive offer</div>

                  <div className="mt-2 rounded-lg border-2 border-amber-500/30 bg-amber-500/5 p-2">
                    <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400">FREE</div>
                    <div className="text-[9px] text-muted-foreground">Premium membership for 30 days</div>
                  </div>

                  <button className="mt-2 w-full rounded-lg bg-amber-500 px-3 py-2 text-[10px] font-bold text-white shadow-lg">
                    Claim Now
                  </button>

                  {/* Central countdown */}
                  {!canClose && (
                    <div className="mt-3 flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-amber-500/30 text-xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                        {countdown}
                      </div>
                      <div className="mt-1 text-[8px] text-muted-foreground/50">
                        Wait to close
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
