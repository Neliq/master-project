"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Bad Defaults / Preselection — Condition 1: Pre-initialized Activation State
 *
 * Thesis: C is the set of all boolean input nodes in the interface
 * (checkboxes, radios, custom toggles). t_0 is the timestamp immediately
 * after DOMContentLoaded, before any user input; State(c, t) captures the
 * boolean activation status of node c at time t. The feature triggers if a
 * node is initialized to an active state without any explicit user
 * initiation, exploiting default-acceptance heuristics:
 *
 *   ∃ c ∈ C : State(c, t_0) = True  ∧  UserEvents(c, t_0) = ∅
 *
 * Variant A (dark): the marketing and data-sharing consents are pre-checked
 * at t_0 — passive compliance guarantees provider-favorable outcomes.
 * Variant B (benign): the same consents start unchecked (opt-in model).
 */

export function BadDefaultsPreselectionCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  // Variant A: pre-checked at t_0, before any user event.
  const [aMarketing, setAMarketing] = React.useState(true);
  const [aData, setAData] = React.useState(true);
  const [aTouched, setATouched] = React.useState(false);
  const [aSubmitted, setASubmitted] = React.useState(false);
  // Variant B: opt-in — everything starts unchecked.
  const [bMarketing, setBMarketing] = React.useState(false);
  const [bData, setBData] = React.useState(false);
  const [bSubmitted, setBSubmitted] = React.useState(false);


  const aConsents = aMarketing || aData;

  return (
    <DemoShell mode={mode}
      title="Bad Defaults / Preselection: Pre-initialized Activation State"
      caption="Pre-initialized Activation State — consent checkboxes are already checked at t₀, before any user input, so passive compliance opts you into marketing and data sharing."
      deltaNote="At t₀ — the instant after DOMContentLoaded, with UserEvents(c, t₀) = ∅ — Variant A's consent nodes are already State = True (pre-checked), so submitting consents by default. Variant B initializes the identical nodes to State = False, making every consent an explicit opt-in."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Create your account</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Everything below is optional and starts unchecked.
            </p>
            <div className="mt-2.5 space-y-2">
              <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
                <input
                  type="checkbox"
                  checked={bMarketing}
                  onChange={(e) => setBMarketing(e.target.checked)}
                  className="mt-0.5 flex-shrink-0 accent-green-500"
                />
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  Send me exclusive offers and promotions
                </div>
              </label>
              <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
                <input
                  type="checkbox"
                  checked={bData}
                  onChange={(e) => setBData(e.target.checked)}
                  className="mt-0.5 flex-shrink-0 accent-green-500"
                />
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  Share my data with selected partners
                </div>
              </label>
            </div>
            <button
              onClick={() => setBSubmitted(true)}
              className="mt-2.5 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Create account
            </button>
            {bSubmitted && (
              <div className="mt-2.5 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Opt-in model
                </div>
                <p className="text-muted-foreground mt-0.5">
                  At t₀ both nodes were <span className="font-mono">State = False</span>. You
                  consented to{" "}
                  <strong className="text-foreground">
                    {bMarketing ? "marketing" : "no marketing"}
                    {bMarketing && bData ? " and " : ""}
                    {bData ? "data sharing" : "no data sharing"}
                  </strong>{" "}
                  — only what you explicitly checked.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border-2 border-red-500/50 bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[11px] font-semibold">Create your account</h3>
            <div className="shrink-0 rounded-full border border-red-500/40 bg-red-500/10 px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
              {mode === "auditor" ? "Pre-checked at t₀" : "Included by default"}
            </div>
          </div>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            The boxes below were checked before you arrived — no user event required.
          </p>
          <div className="mt-2.5 space-y-2">
            <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-red-500/30 bg-red-500/5 p-2.5 transition-colors">
              <input
                type="checkbox"
                checked={aMarketing}
                onChange={(e) => { setAMarketing(e.target.checked); setATouched(true); }}
                className="mt-0.5 flex-shrink-0 accent-red-500"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  Send me exclusive offers and promotions
                </div>
                <div className="text-[8px] text-muted-foreground/60 mt-0.5">
                  {mode === "auditor" ? "State(marketing, t₀) = True" : "Optional marketing preference"}
                </div>
              </div>
            </label>
            <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-red-500/30 bg-red-500/5 p-2.5 transition-colors">
              <input
                type="checkbox"
                checked={aData}
                onChange={(e) => { setAData(e.target.checked); setATouched(true); }}
                className="mt-0.5 flex-shrink-0 accent-red-500"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  Share my data with selected partners
                </div>
                <div className="text-[8px] text-muted-foreground/60 mt-0.5">
                  {mode === "auditor" ? "State(dataSharing, t₀) = True" : "Optional data-sharing preference"}
                </div>
              </div>
            </label>
          </div>
          <button
            onClick={() => setASubmitted(true)}
            className="mt-2.5 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Create account
          </button>
          {aSubmitted && (
            <div className="mt-2.5 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Defaults decided for you
              </div>
              {mode === "auditor" ? (
                <p className="text-muted-foreground">
                  At t₀, <span className="font-mono">UserEvents(c, t₀) = {aTouched ? "≠ ∅" : "∅"}</span>{" "}
                  and <strong className="text-foreground">∃ c ∈ C : State(c, t₀) = True</strong> for
                  both consent nodes. Submitting with{" "}
                  <strong className="text-foreground">
                    {aMarketing ? "marketing" : ""}{aMarketing && aData ? " + " : ""}{aData ? "data sharing" : aConsents ? "" : "no consents"}
                  </strong>{" "}
                  {aConsents ? "consents by default — you never chose it." : "— you opted out explicitly."}{" "}
                  The interface shifted the burden of action onto you: opt-out instead of opt-in.
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Your account was created with{" "}
                  <strong className="text-foreground">
                    {aMarketing ? "marketing" : "no marketing"}
                    {aMarketing && aData ? " and " : ""}
                    {aData ? "data sharing" : "no data sharing"}
                  </strong>{" "}
                  selected in advance. You can change these preferences at any time.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
