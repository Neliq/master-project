"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Small or Moving Close Button — Condition 1:
 * Structural Event-Listener Commandeering on Dismissal Vectors
 *
 * Thesis: the algorithm traces registered event handlers on the close-button
 * node N_close. The feature triggers if the onclick/onpointerdown handler is
 * either (a) intercepted by a parent-level capture-phase listener that
 * redirects the event, or (b) dynamically rebound at a rate Δt_rebind below
 * τ_rebind, indicating kinetic evasion where the handler target mutates
 * faster than human reaction time:
 *
 *   IsIntercepted(N_close) = True  ∨  Δt_rebind(N_close) < τ_rebind
 *
 * Variant A (dark): the X is a kinetic-evasion target — it jumps away on
 * hover (ΔΔt_rebind ≈ 120 ms < τ_rebind = 400 ms) — and when you finally
 * catch it, a parent capture-phase listener intercepts the click and
 * redirects it to the offer page instead of dismissing the modal.
 * Variant B (benign): a stationary X sized at the 44×44 px WCAG
 * touch-target minimum whose click handler dismisses cleanly.
 */

const TAU_REBIND_MS = 400; // human reaction-time bound
const REBIND_MS = 120; // measured rebind rate in Variant A

export function SmallOrMovingCloseButtonCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [aState, setAState] = React.useState<"open" | "intercepted" | "dismissed">("open");
  const [bState, setBState] = React.useState<"open" | "dismissed">("open");
  const [xPos, setXPos] = React.useState({ top: 8, right: 8 });
  const [evasions, setEvasions] = React.useState(0);

  const reset = () => {
    setAState("open");
    setBState("open");
    setXPos({ top: 8, right: 8 });
    setEvasions(0);
  };

  // Kinetic evasion: the close handler rebinds to a new coordinate on hover.
  const dodge = () => {
    if (aState !== "open") return;
    setXPos({
      top: 6 + Math.random() * 55,
      right: 4 + Math.random() * 30,
    });
    setEvasions((e) => e + 1);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">IsIntercepted(N_close)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">True (capture-phase)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δt_rebind(N_close)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">~{REBIND_MS} ms</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_rebind (reaction time)</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_REBIND_MS} ms</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Evasion events</span>
        <span className="font-mono font-semibold tabular-nums">{evasions}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Small or Moving Close Button: Structural Event-Listener Commandeering on Dismissal Vectors"
      caption="Structural Event-Listener Commandeering on Dismissal Vectors — the close button's event handler is hijacked: it evades the cursor faster than human reaction time, and its clicks are redirected instead of dismissing."
      auditorStats={stats}
      deltaNote="In Variant A the X's handler is commandeered twice over: it rebinds to a new position on hover (Δt_rebind ≈ 120 ms < τ_rebind = 400 ms) and a parent capture-phase listener intercepts the click, redirecting you to the offer page instead of closing. In Variant B the same X is stationary, sized at the WCAG 44×44 px touch-target minimum, and its click dismisses the modal."
      benign={
        <div className="space-y-3">
          <div className="relative rounded-md border bg-card p-3">
            <button
              onClick={() => setBState("dismissed")}
              aria-label="Close dialog"
              className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full border border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400 transition-colors hover:bg-green-500/20 cursor-pointer"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-[11px] font-semibold">Special offer for you</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5 leading-relaxed">
              20% off your next order. The X in the corner dismisses this — it never
              moves, it meets the 44×44 px touch-target minimum, and its click handler
              closes the dialog directly.
            </p>
            {bState === "dismissed" && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[9px] text-green-700 dark:text-green-300">
                Dismissed cleanly — the onclick on N_close fired and closed the modal.
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="relative rounded-md border-2 border-red-500/50 bg-card p-3">
          {aState === "open" && (
            <button
              onClick={() => setAState("intercepted")}
              onMouseEnter={dodge}
              aria-label="Close dialog"
              className="absolute z-10 flex h-6 w-6 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400 transition-all duration-100 cursor-pointer"
              style={{ top: `${xPos.top}%`, right: `${xPos.right}%` }}
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          <h3 className="text-[11px] font-semibold">Special offer for you</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5 leading-relaxed">
            20% off your next order. Try to close this — the X runs away from your
            cursor, and if you catch it, something else happens&hellip;
          </p>
          {evasions > 0 && aState === "open" && (
            <p className="text-[8px] italic text-muted-foreground/60 mt-1">
              The X rebounded {evasions} time{evasions === 1 ? "" : "s"} so far — kinetic evasion.
            </p>
          )}
          {aState === "intercepted" && (
            <div className="mt-2 space-y-1.5 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Click intercepted
              </div>
              <p className="text-muted-foreground">
                Your click on <span className="font-mono">N_close</span> was caught by a
                parent-level capture-phase listener. Instead of dismissing, the event was
                redirected — you were taken to the offer page. The modal is still here.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">IsIntercepted(N_close) = True</strong> — the
                dismissal vector is structurally commandeered.
              </p>
              <button
                onClick={() => setAState("dismissed")}
                className="w-full rounded-md border border-border bg-background hover:bg-muted py-1 text-[9px] font-medium transition-colors cursor-pointer"
              >
                Escape hatch: this secondary control really closes it
              </button>
            </div>
          )}
          {aState === "dismissed" && (
            <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[9px] text-green-700 dark:text-green-300">
              Finally dismissed — via a secondary control, not the X. The X itself was
              useless as a dismissal vector.
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
