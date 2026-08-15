"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function CountdownOnAdsCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [adVisible, setAdVisible] = React.useState(false);
  const [countdown, setCountdown] = React.useState(10);
  const [xCountdown, setXCountdown] = React.useState(5);
  const [dismissed, setDismissed] = React.useState(false);

  const reset = () => {
    setAdVisible(false);
    setCountdown(10);
    setXCountdown(5);
    setDismissed(false);
  };

  React.useEffect(() => {
    const t = setTimeout(() => setAdVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Main 10s countdown
  React.useEffect(() => {
    if (!adVisible || countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [adVisible, countdown]);

  // Secondary 5s countdown on X button (starts when main hits 0)
  React.useEffect(() => {
    if (countdown > 0 || xCountdown <= 0) return;
    const interval = setInterval(() => {
      setXCountdown(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown, xCountdown]);

  const mainDone = countdown === 0;
  const canClose = mainDone && xCountdown === 0;
  const xProgress = mainDone ? ((5 - xCountdown) / 5) * 100 : 0;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Mandatory wait (main)</span>
        <span className="font-mono font-semibold">10 seconds</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Mandatory wait (X button)</span>
        <span className="font-mono font-semibold">5 seconds</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Countdown On Ads: Sequential Timer Chaining"
      caption="Sequential Timer Chaining — after the first countdown, the close button appears but remains locked for another 5 seconds." auditorStats={stats}>
      <div className="space-y-3">
        <div className="relative min-h-[400px] rounded-md border bg-foreground/5 p-3 text-xs">

          {/* Page content */}
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
              <div className="absolute inset-0 bg-black/60 rounded-md" />

              <div className="relative w-full max-w-[220px] rounded-xl border-2 border-amber-500/40 bg-white shadow-2xl dark:bg-zinc-900">

                {/* Top right — countdown number, then grayed-out X with circle progress, then clickable X */}
                <div className="absolute top-2 right-2">
                  {!mainDone ? (
                    /* Phase 1: countdown number */
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/5 text-[10px] font-bold text-muted-foreground/30">
                      {countdown}
                    </div>
                  ) : !canClose ? (
                    /* Phase 2: X with circular progress, grayed out */
                    <button disabled className="relative flex h-7 w-7 items-center justify-center cursor-not-allowed">
                      <svg className="absolute inset-0 h-7 w-7 -rotate-90" viewBox="0 0 28 28">
                        <circle cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="2"
                          className="text-foreground/10" />
                        <circle cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="2"
                          strokeDasharray={75.4}
                          strokeDashoffset={75.4 - (xProgress / 100) * 75.4}
                          className="text-amber-500"
                          strokeLinecap="round"
                          style={{ transition: "stroke-dashoffset 1s linear" }} />
                      </svg>
                      <span className="relative z-10 text-sm font-bold text-muted-foreground/30">✕</span>
                    </button>
                  ) : (
                    /* Phase 3: clickable X */
                    <button
                      onClick={() => setDismissed(true)}
                      className="relative flex h-7 w-7 items-center justify-center cursor-pointer"
                    >
                      <svg className="absolute inset-0 h-7 w-7 -rotate-90" viewBox="0 0 28 28">
                        <circle cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="2"
                          className="text-green-500/30" />
                        <circle cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="2"
                          strokeDasharray={75.4} strokeDashoffset={0}
                          className="text-green-500"
                          strokeLinecap="round" />
                      </svg>
                      <span className="relative z-10 text-sm font-bold text-foreground">✕</span>
                    </button>
                  )}
                </div>

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

                  {/* Phase 1: progress bar */}
                  {!mainDone && (
                    <div className="mt-2">
                      <div className="h-1 overflow-hidden rounded-full bg-foreground/10">
                        <div
                          className="h-full bg-amber-500/60 transition-all duration-1000"
                          style={{ width: `${((10 - countdown) / 10) * 100}%` }}
                        />
                      </div>
                      <div className="mt-0.5 text-[7px] text-muted-foreground/50">
                        Ad closes in {countdown}s
                      </div>
                    </div>
                  )}

                  {/* Phase 2: X button countdown hint */}
                  {mainDone && !canClose && (
                    <div className="mt-2 text-[8px] text-muted-foreground/50">
                      Close available in {xCountdown}s
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
