"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Privacy Zuckering — Condition 1: Bundled Consent and Granularity Violation
 *
 * Thesis: D_essential is the data required to operate the core service and
 * D_monetization is data used strictly for profiling or third-party
 * brokerage. T_accept is the primary boolean consent node. The feature
 * triggers if the interface structurally fuses these categories into an
 * indivisible toggle — accepting monetization becomes a mandatory condition
 * of basic utility access, and no alternative interaction t_alt exists to
 * grant essential access while denying monetization:
 *
 *   T_accept = True  =>  Access(D_essential) = True ∧ Access(D_monetization) = True
 *   given ¬∃ t_alt : (t_alt => Access(D_essential) ∧ ¬Access(D_monetization))
 *
 * Variant A (dark): one indivisible “I agree” checkbox fuses essential
 * access and monetization tracking — there is no way to create an account
 * without surrendering profiling data.
 * Variant B (benign): essential consent and optional monetization consent
 * are separate toggles, so t_alt exists.
 */

export function PrivacyZuckeringCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Variant A: single fused checkbox drives both data classes (indivisible).
  const [aAll, setAAll] = React.useState(false);
  const [aCreated, setACreated] = React.useState(false);
  // Variant B: two granular toggles.
  const [bEssential, setBEssential] = React.useState(false);
  const [bMonetization, setBMonetization] = React.useState(false);
  const [bCreated, setBCreated] = React.useState(false);

  const reset = () => {
    setAAll(false);
    setACreated(false);
    setBEssential(false);
    setBMonetization(false);
    setBCreated(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Access(D_essential)</span>
        <span className="font-mono font-semibold tabular-nums">A: {String(aAll)} · B: {String(bEssential)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Access(D_monetization)</span>
        <span className="font-mono font-semibold tabular-nums">A: {String(aAll)} · B: {String(bMonetization)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">∃ t_alt (essential w/o monetization) (A)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">¬∃ — fused toggle</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">∃ t_alt (essential w/o monetization) (B)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">∃ — granular toggles</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Privacy Zuckering: Bundled Consent and Granularity Violation"
      caption="Bundled Consent and Granularity Violation — essential service access and monetization tracking are fused into one indivisible consent toggle, so no alternative grants one without the other."
      auditorStats={stats}
      deltaNote="In Variant A a single checkbox fuses Access(D_essential) with Access(D_monetization): you cannot create an account without accepting profiling/brokerage — ¬∃ t_alt. In Variant B the two data classes get separate toggles, so essential access exists without monetization (t_alt exists)."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Create your account</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Join NoteDrop — cloud notes that sync everywhere.
            </p>

            <div className="mt-3 space-y-2">
              <div>
                <label className="text-[9px] font-medium text-muted-foreground">Email</label>
                <input
                  defaultValue="alex@example.com"
                  className="mt-0.5 w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>
              <div>
                <label className="text-[9px] font-medium text-muted-foreground">Password</label>
                <input
                  type="password"
                  defaultValue="hunter2"
                  className="mt-0.5 w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>
            </div>

            {/* Granular consent: t_alt exists */}
            <div className="mt-3 space-y-1.5">
              <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
                <input
                  type="checkbox"
                  checked={bEssential}
                  onChange={(e) => setBEssential(e.target.checked)}
                  className="mt-0.5 flex-shrink-0 accent-emerald-500"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                    I agree to the Terms of Service and Privacy Policy (essential)
                  </div>
                  <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                    Required to operate your account — D_essential only.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
                <input
                  type="checkbox"
                  checked={bMonetization}
                  onChange={(e) => setBMonetization(e.target.checked)}
                  className="mt-0.5 flex-shrink-0 accent-emerald-500"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                    Optional: allow us to share your data with advertising partners
                  </div>
                  <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                    Not required to use NoteDrop. You can stay opted out — D_monetization only.
                  </div>
                </div>
              </label>
            </div>

            <button
              onClick={() => setBCreated(true)}
              disabled={!bEssential}
              className={`mt-2 w-full rounded-md py-2 text-[10px] font-medium transition-all ${
                bEssential
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              Create account
            </button>

            {bCreated && (
              <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Granular consent — t_alt exists
                </div>
                <p className="text-muted-foreground mt-0.5">
                  Essential access ({bEssential ? "granted" : "denied"}) and monetization access ({bMonetization ? "granted" : "denied"}) were decided
                  independently. <strong className="text-emerald-600 dark:text-emerald-400">∃ t_alt: Access(D_essential) ∧ ¬Access(D_monetization)</strong>{" "}
                  — the granularity violation never fires.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Create your account</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Join NoteDrop — cloud notes that sync everywhere.
          </p>

          <div className="mt-3 space-y-2">
            <div>
              <label className="text-[9px] font-medium text-muted-foreground">Email</label>
              <input
                defaultValue="alex@example.com"
                className="mt-0.5 w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-rose-500/40"
              />
            </div>
            <div>
              <label className="text-[9px] font-medium text-muted-foreground">Password</label>
              <input
                type="password"
                defaultValue="hunter2"
                className="mt-0.5 w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-rose-500/40"
              />
            </div>
          </div>

          {/* The single fused toggle: one checkbox, both data classes */}
          <div className="mt-3">
            <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-rose-500/30 bg-rose-500/5 p-3 transition-colors">
              <input
                type="checkbox"
                checked={aAll}
                onChange={(e) => setAAll(e.target.checked)}
                className="mt-0.5 flex-shrink-0 accent-rose-500"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  I agree to the Terms of Service, Privacy Policy, and data sharing with advertising partners
                </div>
                <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                  One checkbox — creating an account requires agreeing to everything at once.
                </div>
              </div>
            </label>
          </div>

          <button
            onClick={() => setACreated(true)}
            disabled={!aAll}
            className={`mt-2 w-full rounded-md py-2 text-[10px] font-medium transition-all ${
              aAll
                ? "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            Create account
          </button>

          {aCreated && (
            <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Bundled consent — granularity violation
              </div>
              <p className="text-muted-foreground mt-0.5">
                <strong className="text-foreground">T_accept = True ⟹ Access(D_essential) ∧ Access(D_monetization)</strong> — checking the
                single box surrendered both the data needed to run your account and the data used for profiling and
                brokerage, inseparably. <strong className="text-foreground">¬∃ t_alt</strong>: there was no way to create the account while
                denying monetization, because the categories were fused into one indivisible toggle.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
