"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Playing By Appointment — Condition 2: Visual Prominence of
 * Temporal-Gating Indicators
 *
 * Thesis: countdown timers, "available at" labels, and time-window
 * restrictions N_temporal gate content access. The feature triggers if
 * these temporal-gating elements are rendered at a viewport-dominant
 * scale or with high-saturation urgency colors, transforming an
 * artificial schedule constraint into a central visual event:
 *
 *   A(N_temporal)/A_viewport > τ_appointment  ∨  Saturation(N_temporal) > 0.8
 *
 * Variant A (dark): a giant pulsing, high-saturation countdown dominates
 * the whole panel — the schedule constraint becomes the interface.
 * Variant B (benign): the identical countdown shrinks to a muted corner
 * chip; the content, not the timer, leads.
 */

const REMAINING = "02:59:41";

export function PlayingByAppointmentCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [claimed, setClaimed] = React.useState(false);

  const reset = () => setClaimed(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(N_temporal)/A_viewport (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">≈ 0.75 &gt; τ</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(N_temporal)/A_viewport (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">≈ 0.10</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Saturation(N_temporal) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">0.92 &gt; 0.8</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Time remaining</span>
        <span className="font-mono font-semibold tabular-nums">{REMAINING}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Playing By Appointment: Visual Prominence of Temporal-Gating Indicators"
      caption="Visual Prominence of Temporal-Gating Indicators — a pulsing, high-saturation countdown ballooned to viewport-dominant scale turns an artificial deadline into the central visual event."
      auditorStats={stats}
      deltaNote="Both variants show the identical event with the identical 02:59:41 remaining. Variant A renders the countdown as a giant pulsing, high-saturation block covering ~75% of the panel (A(N_temporal)/A_viewport > τ_appointment; Saturation > 0.8). Variant B shrinks the same timer to a small muted corner chip — the reward content leads, and the deadline merely informs."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Harvest Moon Festival</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Seasonal event: earn double points on every harvest until the event ends.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-muted-foreground rounded-full border border-border px-2 py-0.5 shrink-0">
                {REMAINING}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-md border bg-background p-2">
                <div className="text-[13px] font-bold tabular-nums">2×</div>
                <div className="text-[8px] text-muted-foreground">points</div>
              </div>
              <div className="rounded-md border bg-background p-2">
                <div className="text-[13px] font-bold tabular-nums">+50</div>
                <div className="text-[8px] text-muted-foreground">event tasks</div>
              </div>
              <div className="rounded-md border bg-background p-2">
                <div className="text-[13px] font-bold tabular-nums">3</div>
                <div className="text-[8px] text-muted-foreground">rewards left</div>
              </div>
            </div>

            <p className="text-[9px] text-muted-foreground mt-2">
              The event ends in <span className="font-mono tabular-nums">{REMAINING}</span>. The timer
              is just a fact — play whenever you like before then.
            </p>

            <button
              onClick={() => setClaimed(true)}
              disabled={claimed}
              className={`mt-2 w-full rounded-md py-2 text-[10px] font-medium transition-all ${
                claimed
                  ? "bg-muted text-muted-foreground/50 cursor-default"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              }`}
            >
              {claimed ? "Reward claimed ✓" : "Claim event reward"}
            </button>
          </div>

          {claimed && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Informational deadline
              </div>
              <p className="text-muted-foreground mt-0.5">
                The countdown occupied about a tenth of the panel at neutral saturation — a quiet
                corner chip, not a visual event. The deadline informed you without commanding you.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="overflow-hidden rounded-md border bg-card">
          <div className="animate-pulse bg-gradient-to-r from-red-600 via-orange-500 to-rose-600 p-4 text-center">
            <p className="text-[9px] font-bold uppercase tracking-widest text-red-100">
              ⏰ Limited-time event ends soon!
            </p>
            <p className="mt-1 font-mono text-[22px] font-bold tabular-nums text-white leading-none">
              {REMAINING}
            </p>
            <p className="mt-1 text-[8px] font-semibold uppercase tracking-wider text-red-100/80">
              double points · last chance
            </p>
          </div>

          <div className="p-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-[11px] font-semibold">Harvest Moon Festival</h3>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
                Ending soon
              </div>
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Seasonal event: earn double points on every harvest until the event ends.
            </p>

            <button
              onClick={() => setClaimed(true)}
              disabled={claimed}
              className={`mt-2 w-full rounded-md py-2 text-[10px] font-bold transition-all ${
                claimed
                  ? "bg-muted text-muted-foreground/50 cursor-default"
                  : "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
              }`}
            >
              {claimed ? "Reward claimed ✓" : "Claim reward — before time runs out!"}
            </button>
          </div>
        </div>

        {claimed && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Temporal-gate prominence triggered
            </div>
            <p className="text-muted-foreground">
              The pulsing countdown banner covered roughly <strong className="text-rose-500">75% of the
              panel</strong> — A(N_temporal)/A_viewport ≈ 0.75 &gt; τ_appointment — at a{" "}
              <strong className="text-foreground">0.92-saturation</strong> red-orange gradient with an
              urgency label (&ldquo;last chance&rdquo;). The artificial schedule constraint was turned into the
              central visual event: the deadline, not the content, dominates the field of interaction.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
