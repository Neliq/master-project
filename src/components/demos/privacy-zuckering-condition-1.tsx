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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  // Variant A: single fused checkbox drives both data classes (indivisible).
  const [aAll, setAAll] = React.useState(false);
  const [aCreated, setACreated] = React.useState(false);
  // Variant B: two granular toggles.
  const [bEssential, setBEssential] = React.useState(false);
  const [bMonetization, setBMonetization] = React.useState(false);
  const [bCreated, setBCreated] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Privacy Zuckering: Bundled Consent and Granularity Violation"
      userTitle="Orbit — Create account"
      caption="Bundled Consent and Granularity Violation — essential service access and monetization tracking are fused into one indivisible consent toggle, so no alternative grants one without the other."
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
                  className="mt-0.5 w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-ring/50"
                />
              </div>
              <div>
                <label className="text-[9px] font-medium text-muted-foreground">Password</label>
                <input
                  type="password"
                  defaultValue="[REDACTED]"
                  className="mt-0.5 w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-ring/50"
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
                  className="mt-0.5 flex-shrink-0 accent-primary"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                    I agree to the Terms of Service and Privacy Policy (essential)
                  </div>
                  <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                    Required to use NoteDrop.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
                <input
                  type="checkbox"
                  checked={bMonetization}
                  onChange={(e) => setBMonetization(e.target.checked)}
                  className="mt-0.5 flex-shrink-0 accent-primary"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                    Optional: allow us to share your data with advertising partners
                  </div>
                  <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                    Optional — you can change this later in Settings.
                  </div>
                </div>
              </label>
            </div>

            <button
              onClick={() => setBCreated(true)}
              disabled={!bEssential}
              className={`mt-2 w-full rounded-md py-2 text-[10px] font-medium transition-all ${
                bEssential
                  ? "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              Create account
            </button>

            {bCreated && (
              <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Account created
                </div>
                <p className="text-muted-foreground mt-0.5">
                  Your NoteDrop account is ready. You can update your communication preferences at any time.
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
                className="mt-0.5 w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-ring/50"
              />
            </div>
            <div>
              <label className="text-[9px] font-medium text-muted-foreground">Password</label>
              <input
                type="password"
                defaultValue="[REDACTED]"
                className="mt-0.5 w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-ring/50"
              />
            </div>
          </div>

          {/* The single fused toggle: one checkbox, both data classes */}
          <div className="mt-3">
            <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border/60 bg-muted/40 p-3 transition-colors">
              <input
                type="checkbox"
                checked={aAll}
                onChange={(e) => setAAll(e.target.checked)}
                className="mt-0.5 flex-shrink-0 accent-primary"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  I agree to the Terms of Service, Privacy Policy, and data sharing with advertising partners
                </div>

              </div>
            </label>
          </div>

          <button
            onClick={() => setACreated(true)}
            disabled={!aAll}
            className={`mt-2 w-full rounded-md py-2 text-[10px] font-medium transition-all ${
              aAll
                ? "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            Create account
          </button>

          {aCreated && (
            <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Account created
              </div>
              <p className="text-muted-foreground mt-0.5">
                Welcome to NoteDrop. Your account is ready to use.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
