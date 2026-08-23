"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Playing By Appointment — Condition 1: Temporal Gating
 *
 * Thesis: A_core is a primary interaction, C_energy(t) the user's stamina
 * or action currency, and τ_refill the hardcoded real-world delay to
 * regenerate one unit. The feature triggers if the system blocks the core
 * action on resource depletion, forcing the user to wait for a specific
 * real-world appointment time to resume, regardless of in-app skill:
 *
 *   State(A_core) = Blocked  until  t ≥ t_depletion + τ_refill
 *
 * Variant A (dark): at 0 energy the harvest action hard-blocks and the
 * game dictates "Come back at 3:42 PM" — a fixed appointment.
 * Variant B (benign): the same 5-energy economy, but depletion never
 * hard-blocks; the user keeps playing at their own pace.
 */

const MAX_ENERGY = 5;
const REFILL_MINUTES = 30;
const APPOINTMENT_BASE_MIN = 15 * 60 + 12; // 3:12 PM

function fmtAppointment(refillCount: number): string {
  const total = APPOINTMENT_BASE_MIN + REFILL_MINUTES * refillCount;
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

export function PlayingByAppointmentCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [harvests, setHarvests] = React.useState(0);
  const [refills, setRefills] = React.useState(0);

  const reset = () => {
    setHarvests(0);
    setRefills(0);
  };

  const energy = Math.max(0, MAX_ENERGY - harvests + refills);
  const depleted = energy <= 0;
  const revealed = harvests >= 8;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">C_energy(t)</span>
        <span className="font-mono font-semibold tabular-nums">{energy}/{MAX_ENERGY}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_refill (hardcoded)</span>
        <span className="font-mono font-semibold tabular-nums">{REFILL_MINUTES} min / unit</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Appointment (t_depletion + τ)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{fmtAppointment(refills)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">State(A_core) dark / benign</span>
        <span className="font-mono font-semibold tabular-nums">{depleted ? "Blocked" : "Open"} / Open</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Playing By Appointment: Temporal Gating"
      caption="Temporal Gating — when your energy runs out the core action is hard-blocked until a system-chosen appointment time, regardless of your skill or effort."
      auditorStats={stats}
      deltaNote="Both variants run the same farm with the same 5-energy economy and the same harvest counter. Variant A hard-blocks harvesting at 0 energy and schedules your return (State(A_core) = Blocked until t ≥ t_depletion + τ_refill, τ_refill = 30 min). Variant B keeps the energy meter but never blocks the action — depletion is informational, and progression stays user-paced."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Farm Kingdom</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Harvest pumpkins. Energy refills over time — but you decide when to play.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                User-paced
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground">Energy</span>
              <span className="flex items-center gap-0.5">
                {Array.from({ length: MAX_ENERGY }, (_, i) => (
                  <span key={i} className={`inline-block h-2.5 w-2.5 rounded-sm ${i < energy ? "bg-green-500" : "bg-foreground/10"}`} />
                ))}
              </span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-1.5">
              Pumpkins harvested: <span className="font-mono font-semibold tabular-nums text-green-600 dark:text-green-400">{harvests} </span>{" "}
              · refill: 1 energy / {REFILL_MINUTES} min
            </p>

            {depleted && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[9px] text-green-700 dark:text-green-300">
                Energy empty — no problem. Keep harvesting at your own pace; energy simply
                refills in the background.
              </div>
            )}

            <button
              onClick={() => setHarvests((h) => h + 1)}
              className="mt-2 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Harvest a pumpkin (+1)
            </button>
          </div>

          {revealed && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                No appointment needed
              </div>
              <p className="text-muted-foreground mt-0.5">
                After {harvests} harvests the core action never hard-blocked: State(A_core) = Available
                even at 0 energy. The energy meter informs you; it never commands your schedule.
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
              <h3 className="text-[11px] font-semibold">Farm Kingdom</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Harvest pumpkins. When energy runs out, the farm closes — until we say otherwise.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Scheduled
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Energy</span>
            <span className="flex items-center gap-0.5">
              {Array.from({ length: MAX_ENERGY }, (_, i) => (
                <span key={i} className={`inline-block h-2.5 w-2.5 rounded-sm ${i < energy ? "bg-red-500" : "bg-foreground/10"}`} />
              ))}
            </span>
          </div>
          <p className="text-[9px] text-muted-foreground mt-1.5">
            Pumpkins harvested: <span className="font-mono font-semibold tabular-nums text-yellow-500">{harvests} </span>{" "}
            · refill: 1 energy / {REFILL_MINUTES} min
          </p>

          {depleted ? (
            <>
              <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/10 p-2.5">
                <p className="text-[10px] font-semibold text-yellow-700 dark:text-yellow-300">
                  ⚡ Out of energy
                </p>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  The farm is closed for now. Come back at{" "}
                  <strong className="font-mono tabular-nums text-red-500">{fmtAppointment(refills)}</strong>{" "}
                  to harvest again. (1 energy refills every {REFILL_MINUTES} min.)
                </p>
                <button
                  onClick={() => setRefills((r) => r + 1)}
                  className="mt-2 w-full rounded-md border border-yellow-500/40 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  ⏩ Simulate waiting {REFILL_MINUTES} min
                </button>
              </div>
              <button
                disabled
                className="mt-2 w-full rounded-md bg-muted text-muted-foreground/40 py-2 text-[10px] font-medium cursor-not-allowed"
              >
                Harvest a pumpkin — locked
              </button>
            </>
          ) : (
            <button
              onClick={() => setHarvests((h) => h + 1)}
              className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Harvest a pumpkin (+1)
            </button>
          )}
        </div>

        {mode === "auditor" && revealed && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Event details
            </div>
            <p className="text-muted-foreground">
              After {harvests} harvests the core action hit{" "}
              <strong className="text-red-500">State(A_core) = Blocked</strong> until t ≥ t_depletion + τ_refill
              (τ_refill = {REFILL_MINUTES} min/unit). The game dictates an appointment —{" "}
              <strong className="font-mono tabular-nums">{fmtAppointment(refills)}</strong> — that moves
              every time you wait. Your skill and effort are irrelevant; the schedule owns you,
              manufacturing habituation and FOMO around a mandatory daily return.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
