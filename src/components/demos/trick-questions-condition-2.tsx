"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Trick Questions — Condition 2: Affordance-Consequence Mismatch
 *
 * Thesis: State(c) = True — the physical affordance of checking a box —
 * psychologically aligns with acceptance, inclusion, or addition. The
 * feature triggers if the positive physical action of checking the box
 * explicitly maps to a negative or exclusionary intent (D_deny, e.g.
 * "do not send" or "opt-out").
 *
 *   (State(c) = True) => (Intent(L(c)) in D_deny)
 *
 * Variant A (dark): the "claim my bonus" box is pre-checked at load and
 * checking it actually opts you OUT of the bonus (the node's intent lives
 * in D_deny) — completing signup with the box ticked refuses the bonus.
 * Variant B (benign): the box starts unchecked and must be ticked to opt
 * in; checking the box grants the bonus, as advertised.
 */

const CHECKBOX_LABEL = "Yes, I'd like to claim my $10 welcome bonus";

export function TrickQuestionsCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Per-panel state: the dark variant starts with the box pre-checked.
  const [aChecked, setAChecked] = React.useState(true);
  const [bChecked, setBChecked] = React.useState(false);
  const [aClaimed, setAClaimed] = React.useState<null | "granted" | "denied" | "none">(null);
  const [bClaimed, setBClaimed] = React.useState<null | "granted" | "denied" | "none">(null);

  const reset = () => {
    setAChecked(true);
    setBChecked(false);
    setAClaimed(null);
    setBClaimed(null);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">State(c, t0) — Variant A</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">True (pre-checked)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Physical affordance (State)</span>
        <span className="font-mono font-semibold tabular-nums">{aChecked ? "True (checked)" : "False"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Intent(L(c)) domain (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">D_deny (opt-out)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Reversal</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">check = deny</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Trick Questions: Affordance-Consequence Mismatch"
      caption="Affordance-Consequence Mismatch — the box is pre-checked at load and its checked state maps to a denial: the positive action of ticking an opt-in box actually opts you out."
      auditorStats={stats}
      deltaNote="In Variant A the box starts pre-checked (State = True at t0 with zero user events) and the positive action (checking the box) is wired to an opt-out intent (D_deny): completing signup with the box ticked refuses the bonus. In Variant B the box starts unchecked, the signup button stays disabled until you tick it, and the checked state means what the affordance promises: the bonus is granted."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-900/30">
                <svg className="h-4 w-4 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">Welcome bonus</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  New customers get a <span className="font-semibold text-emerald-600 dark:text-emerald-400">$10 bonus</span>{" "}
                  credited to their account after signup.
                </p>
              </div>
            </div>

            <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
              <input
                type="checkbox"
                checked={bChecked}
                onChange={(e) => setBChecked(e.target.checked)}
                className="mt-0.5 flex-shrink-0 accent-emerald-500"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  {CHECKBOX_LABEL}
                </div>
                <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                  Tick the box, and the bonus is yours.
                </div>
              </div>
            </label>

            <button
              onClick={() => setBClaimed(bChecked ? "granted" : "none")}
              disabled={!bChecked}
              className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                bChecked
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              Complete signup
            </button>
          </div>

          {bClaimed && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {bClaimed === "granted" ? "Bonus granted" : "No instruction sent"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                {bClaimed === "granted"
                  ? "Checking the box did exactly what the affordance promises: your $10 welcome bonus was credited. The intent of this node lives in the acceptance domain, not D_deny."
                  : "The button was disabled until you ticked the box, so no instruction was sent — nothing was claimed."}
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-rose-100 dark:bg-rose-900/30">
              <svg className="h-4 w-4 text-rose-600 dark:text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">Welcome bonus</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                New customers get a <span className="font-semibold text-emerald-600 dark:text-emerald-400">$10 bonus</span>{" "}
                credited to their account after signup.
              </p>
            </div>
          </div>

          <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
            <input
              type="checkbox"
              checked={aChecked}
              onChange={(e) => setAChecked(e.target.checked)}
              className="mt-0.5 flex-shrink-0 accent-rose-500"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                {CHECKBOX_LABEL}
              </div>
              <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                Tick the box, and the bonus is yours.
              </div>
            </div>
          </label>

          <button
            onClick={() => setAClaimed(aChecked ? "denied" : "none")}
            disabled={!aChecked}
            className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              aChecked
                ? "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            Complete signup
          </button>
        </div>

        {aClaimed && (
          <div className={`rounded-md border p-2.5 text-[9px] leading-relaxed ${
            aClaimed === "denied"
              ? "border-rose-500/30 bg-rose-500/5"
              : "border-emerald-500/30 bg-emerald-500/5"
          }`}>
            <div className={`flex items-center gap-1.5 font-semibold uppercase tracking-tight ${
              aClaimed === "denied" ? "text-rose-700 dark:text-rose-300" : "text-emerald-700 dark:text-emerald-300"
            }`}>
              {aClaimed === "denied" ? (
                <>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  Bonus refused
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 9v4m0 4h.01" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  No instruction sent
                </>
              )}
            </div>
            <p className="text-muted-foreground mt-0.5">
              {aClaimed === "denied"
                ? `The box was pre-checked at load, so the signup button was already active — completing signup with the box ticked was the path of least resistance. But checking the box — the physical affordance of a checkmark means acceptance — maps to the node's semantic intent in D_deny (opt-out): the system read your check as “do not send the bonus” and refused it. This reversal of standard UI conventions traps users who skim.`
                : "You unchecked the box, so no instruction was sent — nothing was claimed."}
            </p>
          </div>
        )}
      </div>

    </DemoShell>
  );
}
