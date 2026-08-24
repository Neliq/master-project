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
  const [waiting, setWaiting] = React.useState(false);
  const [remaining, setRemaining] = React.useState(WAIT_SECONDS);
  const [paid, setPaid] = React.useState(false);
  const [released, setReleased] = React.useState(false);

  const reset = () => {
    setWaiting(false);
    setRemaining(WAIT_SECONDS);
    setPaid(false);
    setReleased(false);
  };

  React.useEffect(() => {
    if (!waiting) return;
    const id = window.setInterval(() => {
      setRemaining((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [waiting]);

  React.useEffect(() => {
    if (!(waiting && remaining === 0)) return;
    // Deferred so the transition is not a synchronous setState in the effect body.
    const t = window.setTimeout(() => {
      setWaiting(false);
      setReleased(true);
    }, 250);
    return () => window.clearTimeout(t);
  }, [waiting, remaining]);

  const startWait = () => {
    setWaiting(true);
    setRemaining(WAIT_SECONDS);
    setReleased(false);
    setPaid(false);
  };

  const removePain = () => {
    setPaid(true);
    setWaiting(false);
    setReleased(true);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(N_pain) / A_viewport</span>
        <span className={`font-mono font-semibold tabular-nums ${waiting || !released ? "text-red-500" : "text-green-500"}`}>
          {OCCUPANCY_DARK.toFixed(2)} (dark) / {OCCUPANCY_BENIGN.toFixed(2)} (benign)
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_pain (threshold)</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_PAIN.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Verdict (dark)</span>
        <span className={`font-mono font-semibold tabular-nums ${waiting || !released ? "text-red-500" : "text-green-500"}`}>
          {OCCUPANCY_DARK.toFixed(2)} &gt; {TAU_PAIN.toFixed(2)} {waiting || !released ? "→ triggers" : "→ resolved"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Countdown (shared)</span>
        <span className="font-mono font-semibold tabular-nums">{waiting ? `${remaining}s` : "—"}</span>
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
      <div className="mt-3 space-y-1.5 rounded-md border border-border bg-background p-2">
        <div className="h-2 w-11/12 rounded bg-muted" />
        <div className="h-2 w-full rounded bg-muted" />
        <div className="h-2 w-4/5 rounded bg-muted" />
        <div className="h-2 w-9/12 rounded bg-muted" />
        <div className="h-2 w-full rounded bg-muted" />
        <div className="text-[8px] text-muted-foreground mt-1">Page 1 of 48 — abstract</div>
      </div>
    </div>
  );

  const painMeter = (isDark: boolean, active: boolean) => (
    <div className="mt-2 space-y-1">
      <div className="flex items-center justify-between text-[8px] font-mono tabular-nums text-muted-foreground">
        <span>A(N_pain) / A_viewport</span>
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
      caption="Visual Occupancy of the Pain-Point Element — the waiting screen devours the viewport, so paying for relief becomes the path of least resistance."
      auditorStats={stats}
      deltaNote="Both variants gate the same document behind the same 10-second free delay and offer the same $1.99 removal. Variant A renders the pain-point as a full-screen blocking overlay (~78% of the viewport) so the document is unreadable until you pay or wait. Variant B renders it as a slim banner (~9%) that never blocks reading — same friction, honest footprint."
      benign={
        <div className="space-y-3">
          {documentCard}
          {waiting && !paid && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[9px] font-semibold text-green-700 dark:text-green-300">
                    Free plan — 10s access delay applies
                  </div>
                  <div className="text-[8px] text-muted-foreground mt-0.5">
                    The document above is fully readable while you wait. Countdown:{" "}
                    <span className="font-mono tabular-nums">{remaining}s</span>
                  </div>
                </div>
                <button
                  onClick={removePain}
                  className="shrink-0 rounded-md border border-green-500/40 bg-green-500/10 hover:bg-green-500/20 text-green-700 dark:text-green-300 px-2 py-1 text-[9px] font-medium transition-colors cursor-pointer"
                >
                  Remove delay — $1.99
                </button>
              </div>
              {painMeter(false, true)}
            </div>
          )}
          {released && !waiting && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {paid ? "Wait removed — $1.99" : "Wait elapsed — document unlocked"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                {paid
                  ? "You paid to remove a banner that never blocked the content — the friction was honest and tiny from the start."
                  : "The banner counted down without ever hiding the document: A(N_pain)/A_viewport = 0.09 ≤ τ_pain (0.30), so the pain-point never dominated the viewport."}
              </p>
            </div>
          )}
          {!waiting && !released && (
            <button
              onClick={startWait}
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
          {waiting && !paid && (
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
                {remaining}
              </div>
              <div className="h-1.5 w-3/4 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-red-500 transition-all duration-300"
                  style={{ width: `${((WAIT_SECONDS - remaining) / WAIT_SECONDS) * 100}%` }}
                />
              </div>
              <button
                onClick={removePain}
                className="w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-semibold transition-colors cursor-pointer"
              >
                Skip the wait — $1.99
              </button>
              <div className="text-[8px] text-muted-foreground">
                N_pain covers {Math.round(OCCUPANCY_DARK * 100)}% of the viewport — nothing else is interactive.
              </div>
              {painMeter(true, true)}
            </div>
          )}
          {released && !waiting && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                {paid ? "You paid — relief purchased" : "Wait elapsed"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                {paid
                  ? "The pain-point dominated the viewport (A(N_pain)/A_viewport = 0.78 > τ_pain = 0.30), so paying $1.99 was the only comfortable path to the document. That is the digital-extortion model: payment bought the cessation of hostility, nothing more."
                  : "You endured the full-screen countdown instead of paying. The overlay occupied 78% of the viewport the whole time — engineered discomfort, not a service limitation."}
              </p>
            </div>
          )}
          {!waiting && !released && (
            <button
              onClick={startWait}
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
