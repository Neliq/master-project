"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Pay To Avoid — Condition 2: Visual Occupancy of the Pain-Point Element
 *
 * Thesis: the algorithm identifies the friction element N_pain — a
 * countdown timer, a full-screen ad, or a forced waiting screen — that
 * the user can pay to remove. The feature triggers if this pain-point
 * occupies more than a fraction τ_pain of the interactive viewport,
 * maximizing discomfort to coerce payment for relief:
 *
 *   A(N_pain) / A_viewport > τ_pain
 *
 * Variant A (dark): a full-screen blocking overlay ("Free access — wait
 * 10s") covers ~78% of the viewport and hides the document; the only
 * escape is paying $1.99.
 * Variant B (benign): the same 10-second delay and the same $1.99 option,
 * but rendered as a slim banner occupying ~9% — the document stays fully
 * readable.
 */

const WAIT_SECONDS = 10;
const OCCUPANCY_DARK = 0.78;
const OCCUPANCY_BENIGN = 0.09;
const TAU_PAIN = 0.3;

export function PayToAvoidCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [waitingA, setWaitingA] = React.useState(false);
  const [waitingB, setWaitingB] = React.useState(false);
  const [remainingA, setRemainingA] = React.useState(WAIT_SECONDS);
  const [remainingB, setRemainingB] = React.useState(WAIT_SECONDS);
  const [paidA, setPaidA] = React.useState(false);
  const [paidB, setPaidB] = React.useState(false);
  const [releasedA, setReleasedA] = React.useState(false);
  const [releasedB, setReleasedB] = React.useState(false);

  const reset = () => {
    setWaitingA(false);
    setWaitingB(false);
    setRemainingA(WAIT_SECONDS);
    setRemainingB(WAIT_SECONDS);
    setPaidA(false);
    setPaidB(false);
    setReleasedA(false);
    setReleasedB(false);
  };

  React.useEffect(() => {
    if (!waitingA) return;
    const id = window.setInterval(() => {
      setRemainingA((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [waitingA]);

  React.useEffect(() => {
    if (!waitingB) return;
    const id = window.setInterval(() => {
      setRemainingB((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [waitingB]);

  React.useEffect(() => {
    if (!(waitingA && remainingA === 0)) return;
    // Deferred so the transition is not a synchronous setState in the effect body.
    const t = window.setTimeout(() => {
      setWaitingA(false);
      setReleasedA(true);
    }, 250);
    return () => window.clearTimeout(t);
  }, [waitingA, remainingA]);

  React.useEffect(() => {
    if (!(waitingB && remainingB === 0)) return;
    const t = window.setTimeout(() => {
      setWaitingB(false);
      setReleasedB(true);
    }, 250);
    return () => window.clearTimeout(t);
  }, [waitingB, remainingB]);

  const startWait = (side: "A" | "B") => {
    if (side === "A") {
      setWaitingA(true);
      setRemainingA(WAIT_SECONDS);
      setReleasedA(false);
      setPaidA(false);
    } else {
      setWaitingB(true);
      setRemainingB(WAIT_SECONDS);
      setReleasedB(false);
      setPaidB(false);
    }
  };

  const removePain = (side: "A" | "B") => {
    if (side === "A") {
      setPaidA(true);
      setWaitingA(false);
      setReleasedA(true);
    } else {
      setPaidB(true);
      setWaitingB(false);
      setReleasedB(true);
    }
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(N_pain) / A_viewport</span>
        <span className={`font-mono font-semibold tabular-nums ${waitingA || !releasedA ? "text-red-500" : "text-green-500"}`}>
          {OCCUPANCY_DARK.toFixed(2)} (dark) / {OCCUPANCY_BENIGN.toFixed(2)} (benign)
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_pain (threshold)</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_PAIN.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Verdict (dark)</span>
        <span className={`font-mono font-semibold tabular-nums ${waitingA ? "text-red-500" : "text-green-500"}`}>
          {waitingA ? `${OCCUPANCY_DARK.toFixed(2)} > ${TAU_PAIN.toFixed(2)} → active` : "not active"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Countdown (dark)</span>
        <span className="font-mono font-semibold tabular-nums">{waitingA ? `${remainingA}s` : "—"}</span>
      </div>
    </>
  ) : null;

  const documentCard = (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[11px] font-semibold">Product guide — chapter 4.pdf</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            48 pages · Free access begins after a short wait. Pay $1.99 for instant access.
          </p>
        </div>
        <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-muted-foreground rounded-full border border-border px-2 py-0.5 shrink-0">
          PDF
        </div>
      </div>
      <div className="mt-3 rounded-md border border-border bg-background p-2.5">
        <div className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">Chapter 4 · Delivery planning</div>
        <h4 className="mt-1 text-[10px] font-semibold">A practical checklist for the final handoff</h4>
        <p className="mt-1 text-[9px] leading-relaxed text-foreground/80">
          Confirm the owner, review the latest changes, and record the decision before the project moves
          into production. A short written handoff keeps the next step clear for everyone.
        </p>
        <div className="mt-2 flex items-center justify-between border-t border-border pt-1.5 text-[8px] text-muted-foreground">
          <span>Product guide · 48 pages</span>
          <span>Page 1 of 48</span>
        </div>
      </div>
    </div>
  );

  const painMeter = (isDark: boolean, active: boolean) => (
    <div className="mt-2 space-y-1">
      <div className="flex items-center justify-between text-[8px] font-mono tabular-nums text-muted-foreground">
        <span>{mode === "auditor" ? "A(N_pain) / A_viewport" : "Access notice footprint"}</span>
        <span className={active && isDark ? "text-red-500" : active ? "text-green-500" : "text-muted-foreground"}>
          {(isDark ? OCCUPANCY_DARK : OCCUPANCY_BENIGN) * 100}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            active && isDark ? "bg-red-500" : active ? "bg-green-500" : "bg-muted-foreground/30"
          }`}
          style={{ width: `${(isDark ? OCCUPANCY_DARK : OCCUPANCY_BENIGN) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pay To Avoid: Visual Occupancy of the Pain-Point Element"
      userTitle="Product guide — Chapter 4"
      caption="Visual Occupancy of the Pain-Point Element — the waiting screen devours the viewport, so paying for relief becomes the path of least resistance."
      auditorStats={stats}
      deltaNote="Both variants gate the same document behind the same 10-second free delay and offer the same $1.99 removal. Variant A renders the pain-point as a full-screen blocking overlay (~78% of the viewport) so the document is unreadable until you pay or wait. Variant B renders it as a slim banner (~9%) that never blocks reading — same friction, honest footprint."
      benign={
        <div className="space-y-3">
          {documentCard}
          {waitingB && !paidB && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[9px] font-semibold text-green-700 dark:text-green-300">
                    Free plan — 10s access delay applies
                  </div>
                  <div className="text-[8px] text-muted-foreground mt-0.5">
                    The document above is fully readable while you wait. Countdown:{" "}
                    <span className="font-mono tabular-nums">{remainingB}s</span>
                  </div>
                </div>
                <button
                  onClick={() => removePain("B")}
                  className="shrink-0 rounded-md border border-green-500/40 bg-green-500/10 hover:bg-green-500/20 text-green-700 dark:text-green-300 px-2 py-1 text-[9px] font-medium transition-colors cursor-pointer"
                >
                  Remove delay — $1.99
                </button>
              </div>
              {painMeter(false, true)}
            </div>
          )}
          {releasedB && !waitingB && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {paidB ? "Wait removed — $1.99" : "Wait elapsed — document unlocked"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                {paidB
                  ? "You paid to remove a banner that never blocked the content — the friction was honest and tiny from the start."
                  : "The banner counted down without ever hiding the document, so you could keep reading while access became available."}
              </p>
            </div>
          )}
          {!waitingB && !releasedB && (
            <button
              onClick={() => startWait("B")}
              className="w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Read document (free with 10s wait)
            </button>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="relative">
          {documentCard}
          {waitingA && !paidA && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-md border border-red-500/40 bg-background/95 p-4 text-center">
              <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9v4l2.5 2.5" />
              </svg>
              <div>
                <div className="text-[12px] font-bold text-foreground">Free access — please wait</div>
                <div className="text-[9px] text-muted-foreground mt-0.5">
                  Your document will be available in:
                </div>
              </div>
              <div className="font-mono text-[22px] font-bold tabular-nums text-red-500 leading-none">
                {remainingA}
              </div>
              <div className="h-1.5 w-3/4 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-red-500 transition-all duration-300"
                  style={{ width: `${((WAIT_SECONDS - remainingA) / WAIT_SECONDS) * 100}%` }}
                />
              </div>
              <button
                onClick={() => removePain("A")}
                className="w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-semibold transition-colors cursor-pointer"
              >
                Skip the wait — $1.99
              </button>
              <div className="text-[8px] text-muted-foreground">
                This notice covers most of the page — the document becomes available when the countdown ends.
              </div>
              {painMeter(true, true)}
            </div>
          )}
          {releasedA && !waitingA && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                {paidA ? "You paid — relief purchased" : "Wait elapsed"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                {paidA
                  ? "The full-page notice disappeared after you paid $1.99, and the document is available now."
                  : "The full-page notice stayed in place until the countdown finished, then the document became available."}
              </p>
            </div>
          )}
          {!waitingA && !releasedA && (
            <button
              onClick={() => startWait("A")}
              className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Read document (free with 10s wait)
            </button>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
