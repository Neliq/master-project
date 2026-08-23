"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CalendarClock, CheckCircle2, Clock, Hourglass } from "lucide-react";

/*
 * Forced Grace Period — Condition 1: Temporal Discrepancy Extraction
 *
 * Thesis: T_request is the exact timestamp when the termination request is
 * submitted. A NER model parses the confirmation text node n_confirm and
 * extracts future date/time-span entities E_time (e.g. "30 days", "next
 * billing cycle"), converted into a parsed future timestamp T_execute. The
 * feature triggers if the calculated delay strictly exceeds a heuristic
 * threshold Δt_min (such as 24 hours) — proving the delay is a programmatic
 * constraint rather than a technical necessity:
 *
 *   T_execute − T_request ≥ Δt_min
 *
 * Variant A (dark): the confirmation copy says "in 30 days" (720 h), the
 * request is parked in a mandatory pending state, and the clock only moves
 * because the interface chooses not to execute immediately. Variant B
 * (benign): the identical request executes instantly (Δt = 0 h).
 */

const DT_MIN_HOURS = 24; // heuristic threshold (24 h)
const DAYS_WAIT = 30; // NER entity parsed from the confirmation copy
const WAIT_HOURS = DAYS_WAIT * 24; // 720 h
const HOURS_PER_TICK = 2; // simulation speed: 2 simulated hours per tick
const TICK_MS = 120;
const T_REQUEST = "2026-08-15 10:32 UTC";
const T_EXECUTE = "2026-09-14 10:32 UTC"; // request + 30 days

type Stage = "idle" | "pending" | "done";

export function ForcedGracePeriodCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [stageA, setStageA] = React.useState<Stage>("idle");
  const [hoursA, setHoursA] = React.useState<number>(() => 0);
  const [stageB, setStageB] = React.useState<Stage>("idle");

  React.useEffect(() => {
    if (stageA !== "pending") return;
    const iv = window.setInterval(() => {
      setHoursA((h) => Math.min(h + HOURS_PER_TICK, WAIT_HOURS));
    }, TICK_MS);
    return () => window.clearInterval(iv);
  }, [stageA]);

  const reset = () => {
    setStageA("idle");
    setHoursA(0);
    setStageB("idle");
  };

  const elapsedComplete = hoursA >= WAIT_HOURS;
  const pct = Math.round((hoursA / WAIT_HOURS) * 100);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">T_request / T_execute</span>
        <span className="font-mono font-semibold tabular-nums">{T_REQUEST.slice(0, 10)} → {T_EXECUTE.slice(0, 10)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">NER entity E_time</span>
        <span className="font-mono font-semibold tabular-nums text-yellow-600 dark:text-yellow-400">“{DAYS_WAIT} days” → {WAIT_HOURS} h</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δt = T_execute − T_request</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{WAIT_HOURS} h (A) / 0 h (B)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δt ≥ Δt_min ({DT_MIN_HOURS} h)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">True (A) → fired / False (B)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Simulated clock (A)</span>
        <span className="font-mono font-semibold tabular-nums">{hoursA} / {WAIT_HOURS} h</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Forced Grace Period: Temporal Discrepancy Extraction"
      caption="Temporal Discrepancy Extraction — a termination request that could execute instantly is deferred by an artificial 30-day window extracted from the confirmation copy."
      auditorStats={stats}
      deltaNote="Both variants process the identical deletion request and display the same confirmation information. Variant A parks the account in a mandatory 30-day pending state — Δt = 720 h ≥ Δt_min (24 h), so the heuristic fires — while Variant B executes the request immediately (Δt = 0 h). The only difference is the programmatic delay."
      benign={
        <div className="space-y-3">
          {stageB === "idle" ? (
            <div className="rounded-md border bg-card p-3">
              <div className="flex items-center gap-1.5">
                <Hourglass className="size-3.5 text-green-500" />
                <h3 className="text-[11px] font-semibold">CloudPhoto Pro — $9.99/mo</h3>
              </div>
              <p className="mt-1 text-[9px] text-muted-foreground">
                Renews monthly · billed to maya@example.com
              </p>
              <button
                onClick={() => setStageB("done")}
                className="mt-2.5 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Delete my account
              </button>
            </div>
          ) : (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-3 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <CheckCircle2 className="size-3" />
                Request executed instantly
              </div>
              <p className="text-muted-foreground mt-1">
                <span className="font-mono text-foreground">T_execute − T_request = 0 h &lt; Δt_min ({DT_MIN_HOURS} h)</span>{" "}
                — no pending state, no waiting period. The confirmation copy contained no
                future-date entity; the deletion completes the moment you click.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {stageA === "idle" ? (
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-1.5">
              <Hourglass className="size-3.5 text-red-500" />
              <h3 className="text-[11px] font-semibold">CloudPhoto Pro — $9.99/mo</h3>
            </div>
            <p className="mt-1 text-[9px] text-muted-foreground">
              Renews monthly · billed to maya@example.com
            </p>
            <button
              onClick={() => {
                setStageA("pending");
                setHoursA(0);
              }}
              className="mt-2.5 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Delete my account
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-md border bg-card p-3">
              <div className="flex items-center gap-1.5">
                <CalendarClock className="size-3.5 text-red-500" />
                <h3 className="text-[11px] font-semibold">Deletion request received</h3>
              </div>

              {/* Confirmation text node — NER parses the future time entity. */}
              <div className="mt-2 rounded-md border border-border bg-background p-2 text-[9px] leading-relaxed">
                <p className="text-muted-foreground">
                  We&rsquo;ve received your request. Your account will be permanently deleted in{" "}
                  <mark className="rounded-sm bg-yellow-500/25 px-0.5 text-yellow-800 dark:text-yellow-200">
                    30 days
                  </mark>
                  .
                </p>
                <p className="mt-1 text-[7px] text-muted-foreground/50">
                  NER: E_time = {`{“30 days”}`} → T_execute = {T_EXECUTE}
                </p>
              </div>

              <div className="mt-2 space-y-1 font-mono text-[8px] text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Clock className="size-2.5" /> T_request
                  </span>
                  <span>{T_REQUEST}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <CalendarClock className="size-2.5" /> T_execute
                  </span>
                  <span>{T_EXECUTE}</span>
                </div>
                <div className="flex items-center justify-between text-red-500">
                  <span>Δt = T_execute − T_request</span>
                  <span>{WAIT_HOURS} h ≥ Δt_min ({DT_MIN_HOURS} h)</span>
                </div>
              </div>

              <div className="mt-2.5">
                <div className="flex items-center justify-between text-[8px] text-muted-foreground">
                  <span>Simulated clock — pending state</span>
                  <span className="font-mono tabular-nums">{hoursA} / {WAIT_HOURS} h ({pct}%)</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                  <div
                    className="h-full rounded-full bg-red-500 transition-[width] duration-150"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="mt-2.5 flex gap-1.5">
                <button
                  onClick={() => setHoursA(WAIT_HOURS)}
                  className="flex-1 rounded-md border border-red-500/40 bg-red-500/5 py-1.5 text-[9px] font-semibold text-red-600 transition-colors hover:bg-red-500/10 cursor-pointer dark:text-red-300"
                >
                  Fast-forward 30 days
                </button>
              </div>
            </div>

            {mode === "auditor" && elapsedComplete && (
              <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                  <AlertTriangle className="size-3" />
                  Deletion scheduled
                </div>
                <p className="text-muted-foreground">
                  <span className="font-mono text-foreground">
                    Your account will be deleted in {DAYS_WAIT} days.
                  </span>{" "}
                  — the NER-extracted entity “{DAYS_WAIT} days” turned a one-click request into a
                  720-hour wait. Deletion is a database row; nothing about it technically requires
                  a month.
                </p>
                <p className="text-muted-foreground">
                  The delay is a programmatic constraint, not a technical necessity — a grace
                  window engineered to give habituation time to work.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </DemoShell>
  );
}
