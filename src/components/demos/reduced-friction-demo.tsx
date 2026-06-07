"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Reduced Friction pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function ReducedFrictionDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // The "quick" button is 3x larger. But it routes through a 3-step
  // OAuth consent + data share + opt-out. The "with email" path is
  // actually 1 step.
  const [path, setPath] = React.useState<null | "quick" | "email">(null);
  const [quickStep, setQuickStep] = React.useState(0);
  const [emailStep, setEmailStep] = React.useState(0);
  const quickSteps = ["OAuth consent", "Share contacts", "Opt out of tracking"];
  const emailSteps = ["Enter email", "Verify", "Done"];

  React.useEffect(() => {
    if (path === "quick" && quickStep < quickSteps.length - 1) {
      const id = window.setTimeout(() => setQuickStep((s) => s + 1), 1500);
      return () => window.clearTimeout(id);
    }
  }, [path, quickStep, quickSteps.length]);

  React.useEffect(() => {
    if (path === "email" && emailStep < emailSteps.length - 1) {
      const id = window.setTimeout(() => setEmailStep((s) => s + 1), 1500);
      return () => window.clearTimeout(id);
    }
  }, [path, emailStep, emailSteps.length]);

  const isAuditor = mode === "auditor";
  const reset = () => {
    setPath(null);
    setQuickStep(0);
    setEmailStep(0);
  };

  const auditorControls = isAuditor ? (
    <button
      onClick={reset}
      className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
    >
      Restart comparison
    </button>
  ) : null;

  const auditorStats = isAuditor ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Quick step</span>
        <span className="font-mono font-semibold tabular-nums">
          {path === "quick" ? `${Math.min(quickStep + 1, quickSteps.length)} / ${quickSteps.length}` : "—"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Email step</span>
        <span className="font-mono font-semibold tabular-nums">
          {path === "email" ? `${Math.min(emailStep + 1, emailSteps.length)} / ${emailSteps.length}` : "—"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Active path</span>
        <span className="font-mono font-semibold tabular-nums">{path ?? "—"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset} auditorControls={auditorControls} auditorStats={auditorStats} title="Reduced Friction"
      caption="The 'Quick sign-up' button is 30× the surface area of 'Sign in with email'. The visual nudge says the quick path is faster — but it actually routes through 3 sub-steps (OAuth consent, contact share, opt-out). The email path is 3 straight steps."
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <button
            onClick={() => { setPath("quick"); setQuickStep(0); }}
            className="bg-foreground text-background flex w-full items-center justify-between rounded-md px-6 py-6 text-base font-semibold"
          >
            <span>Quick sign-up</span>
            <span className="text-[10px] opacity-80">3 steps (visual nudge)</span>
          </button>
          <button
            onClick={() => { setPath("email"); setEmailStep(0); }}
            className="text-muted-foreground hover:text-foreground w-full px-2 py-1 text-left text-[10px]"
          >
            Sign in with email (3 steps, but tiny button)
          </button>
        </div>
        {path && (
          <div className="bg-foreground/5 space-y-2 rounded-md border p-3 text-xs">
            <div className="text-muted-foreground text-[10px]">Following: {path === "quick" ? "Quick" : "Email"} path</div>
            <div className="space-y-1">
              {(path === "quick" ? quickSteps : emailSteps).map((s, i) => {
                const isCurrent = path === "quick" ? i === quickStep : i === emailStep;
                const isDone = path === "quick" ? i < quickStep : i < emailStep;
                return (
                  <div
                    key={i}
                    className={`rounded-md border px-2 py-1 text-[10px] ${
                      isCurrent
                        ? "border-foreground/30 bg-foreground text-background font-medium"
                        : isDone
                        ? "bg-foreground/20 text-foreground/60 line-through"
                        : "border-foreground/10 bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    {i + 1}. {s}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
