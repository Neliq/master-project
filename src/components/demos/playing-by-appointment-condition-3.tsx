"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Playing By Appointment — Condition 3: Semantic Urgency Encoding in
 * Temporal-Gating Messages
 *
 * Thesis: the algorithm analyzes the sentiment and urgency scores of
 * time-gating messages ("Come back at 3 PM," "New content drops in
 * 2 hours"). The feature triggers if the messages carry an urgency
 * sentiment score above τ_appointment_urgency while also embedding
 * scarcity language ("limited window," "don't be late") — compound
 * semantic pressure:
 *
 *   Urgency(T_temporal) > τ_appointment_urgency  ∧  T_temporal ∩ L_scarcity ≠ ∅
 *
 * Variant A (dark): the same schedule is announced with urgent, scarcity-
 * laced copy ("Come back at 3 PM — limited window!").
 * Variant B (benign): identical schedule, neutral informative copy
 * ("Next harvest window: 3 PM").
 */

const MESSAGES_DARK = [
  { id: 1, text: "Come back at 3 PM — limited window!", urgency: 0.87, scarcity: ["limited"] },
  { id: 2, text: "New content drops in 2 hours — don\u2019t be late!", urgency: 0.92, scarcity: ["don\u2019t be late"] },
  { id: 3, text: "Your 7-day streak ends tonight — don\u2019t break it!", urgency: 0.81, scarcity: ["ends", "don\u2019t break"] },
];

const MESSAGES_BENIGN = [
  { id: 1, text: "Next harvest window: 3 PM.", urgency: 0.12, scarcity: [] },
  { id: 2, text: "New content arrives in 2 hours.", urgency: 0.18, scarcity: [] },
  { id: 3, text: "Streak counter resets at midnight.", urgency: 0.09, scarcity: [] },
];

export function PlayingByAppointmentCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [analyzed, setAnalyzed] = React.useState(false);

  const reset = () => setAnalyzed(false);

  const scarcityTotalDark = MESSAGES_DARK.reduce((s, m) => s + m.scarcity.length, 0);
  const scarcityTotalBenign = MESSAGES_BENIGN.reduce((s, m) => s + m.scarcity.length, 0);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Urgency(T_temporal) max (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">0.92 &gt; 0.7</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Urgency(T_temporal) max (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">0.18 &lt; 0.7</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Scarcity tokens L_scarcity (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{scarcityTotalDark} &ne; 0</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Scarcity tokens (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{scarcityTotalBenign} (= 0)</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Playing By Appointment: Semantic Urgency Encoding in Temporal-Gating Messages"
      caption="Semantic Urgency Encoding in Temporal-Gating Messages — schedule messages carry urgency scores above threshold while embedding scarcity language, compounding the pressure to return on time."
      auditorStats={stats}
      deltaNote="Both variants announce the identical schedule — a 3 PM window, content in 2 hours, a streak reset at midnight. Variant A wraps each fact in urgent, scarcity-laced copy (Urgency 0.81–0.92 > τ; 4 scarcity tokens). Variant B states the same facts neutrally (Urgency ≤ 0.18; zero scarcity tokens), so no compound semantic pressure is applied."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Mystic Garden</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Your daily schedule, stated plainly. Nothing to fear, nothing to rush.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                Neutral copy
              </div>
            </div>

            <div className="mt-3 space-y-1.5">
              {MESSAGES_BENIGN.map((m) => (
                <div key={m.id} className="flex items-start gap-2 rounded-md border border-border bg-background p-2">
                  <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-[8px] font-bold text-emerald-700 dark:text-emerald-300">
                    {m.id}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] leading-relaxed text-foreground/80">{m.text}</p>
                    {analyzed && (
                      <p className="mt-0.5 text-[8px] text-emerald-600/80 dark:text-emerald-400/80 font-mono tabular-nums">
                        urgency {m.urgency.toFixed(2)} · scarcity tokens: {m.scarcity.length}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setAnalyzed(true)}
              className="mt-2 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              {analyzed ? "Semantic analysis ✓" : "Run semantic analysis"}
            </button>
          </div>

          {analyzed && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                No compound pressure
              </div>
              <p className="text-muted-foreground mt-0.5">
                Max urgency is <span className="font-mono tabular-nums">0.18</span> — well below
                τ_appointment_urgency (0.7) — and zero scarcity tokens are present. The schedule
                informs; it does not pressure.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Mystic Garden</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Your daily schedule — miss a window and it&rsquo;s gone forever.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              Urgent
            </div>
          </div>

          <div className="mt-3 space-y-1.5">
            {MESSAGES_DARK.map((m) => (
              <div key={m.id} className="flex items-start gap-2 rounded-md border border-rose-500/30 bg-rose-500/5 p-2">
                <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-rose-500 text-[8px] font-bold text-white">
                  {m.id}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] leading-relaxed font-medium text-foreground/90">⏰ {m.text}</p>
                  {analyzed && (
                    <p className="mt-0.5 text-[8px] text-rose-600/80 dark:text-rose-400/80 font-mono tabular-nums">
                      urgency {m.urgency.toFixed(2)} · scarcity: {m.scarcity.join(", ") || "—"}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setAnalyzed(true)}
            className="mt-2 w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
          >
            {analyzed ? "Semantic analysis ✓" : "Run semantic analysis"}
          </button>
        </div>

        {analyzed && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Compound urgency triggered
            </div>
            <p className="text-muted-foreground">
              Urgency(T_temporal) peaks at <strong className="text-rose-500">0.92</strong> &gt; τ_appointment_urgency
              (0.7), and T_temporal ∩ L_scarcity ={" "}
              <strong className="text-foreground">&ldquo;limited,&rdquo; &ldquo;don&rsquo;t be late,&rdquo; &ldquo;ends,&rdquo; &ldquo;don&rsquo;t break&rdquo;</strong>{" "}
              — {scarcityTotalDark} tokens, so the intersection is non-empty. The messages compound
              urgency with scarcity, turning a voluntary schedule into a mandatory, fear-driven
              appointment.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
