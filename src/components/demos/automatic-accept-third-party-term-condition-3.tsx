"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Automatic Accept Third Party Term — Condition 3: Semantic Concealment of
 * Third-Party Agreement Language
 *
 * Thesis: legal-agreement language ("by continuing, you agree to," "terms
 * apply," "third-party policies") is semantically present in a checkbox or
 * clause that is structurally pre-consented — checked without any
 * affirmative user interaction in the event log:
 *
 *   T(N_legal) ∩ K_agreement ≠ ∅  ∧  Checked(N_legal) = True
 *                                ∧  UserToggled(N_legal) = False
 *
 * Variant A (dark): the third-party agreement checkbox arrives pre-checked;
 * the user never touches it, yet its consent is recorded.
 * Variant B (benign): the identical sentence, but the box starts unchecked
 * and consent is only recorded when the user actively ticks it.
 */

const LEGAL_LABEL =
  "I agree to the Terms of Service, Privacy Policy, and third-party data-sharing agreements.";

export function AutomaticAcceptThirdPartyTermCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [darkChecked, setDarkChecked] = React.useState(true);
  const [darkToggled, setDarkToggled] = React.useState(false);
  const [benignChecked, setBenignChecked] = React.useState(false);
  const [benignToggled, setBenignToggled] = React.useState(false);
  const [darkCreated, setDarkCreated] = React.useState(false);
  const [benignCreated, setBenignCreated] = React.useState(false);

  const reset = () => {
    setDarkChecked(true);
    setDarkToggled(false);
    setBenignChecked(false);
    setBenignToggled(false);
    setDarkCreated(false);
    setBenignCreated(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">T(N_legal) &cap; K_agreement</span>
        <span className="font-mono font-semibold tabular-nums">&ne; &empty; (both)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Checked(N_legal)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">True (dark, pre-set) / {benignChecked ? "True" : "False"} (benign)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">UserToggled(N_legal)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{darkToggled ? "True" : "False"} (dark) / {benignToggled ? "True" : "False"} (benign)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Consent recorded</span>
        <span className="font-mono font-semibold tabular-nums">{darkCreated || benignCreated ? "Yes" : "No"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Automatic Accept Third Party Term: Semantic Concealment of Third-Party Agreement Language"
      caption="Third-party agreement language sits in a pre-checked box — legally present, structurally pre-consented, with no affirmative user interaction ever recorded."
      auditorStats={stats}
      deltaNote={`In Variant A the third-party agreement checkbox is pre-checked (Checked = True, UserToggled = False) — your consent is recorded without you ever touching it. In Variant B the same sentence starts unchecked and consent is only recorded when you actively tick the box.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Finish creating your account</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Read the agreements, then tick the box yourself to accept them.
            </p>

            <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
              <input
                type="checkbox"
                checked={benignChecked}
                onChange={(e) => {
                  setBenignChecked(e.target.checked);
                  setBenignToggled(true);
                }}
                className="mt-0.5 flex-shrink-0 accent-emerald-500"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  {LEGAL_LABEL}
                </div>
                <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                  Starts unchecked — acceptance happens only when you actively tick this box.
                </div>
              </div>
            </label>

            <button
              onClick={() => setBenignCreated(true)}
              disabled={!benignChecked}
              className={`mt-2.5 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                benignChecked
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              Create account
            </button>
          </div>

          {benignCreated && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Affirmative consent
              </div>
              <p className="text-muted-foreground mt-0.5">
                The event log shows <strong className="text-foreground">UserToggled(N_legal) =
                True</strong>: you actively checked the box before the account was created. The
                third-party agreement language was visible and your interaction was on record.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Finish creating your account</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Almost done — confirm below to get started.
          </p>

          <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
            <input
              type="checkbox"
              checked={darkChecked}
              onChange={(e) => {
                setDarkChecked(e.target.checked);
                setDarkToggled(true);
              }}
              className="mt-0.5 flex-shrink-0 accent-rose-500"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                {LEGAL_LABEL}
              </div>
              <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                {darkToggled
                  ? "You toggled this box during this session."
                  : "This box was already checked for you."}
              </div>
            </div>
          </label>

          <button
            onClick={() => setDarkCreated(true)}
            disabled={!darkChecked}
            className={`mt-2.5 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              darkChecked
                ? "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            Create account
          </button>
        </div>

        {darkCreated && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Pre-consented clause
            </div>
            <p className="text-muted-foreground mt-0.5">
              The clause contains classic agreement language (&ldquo;agree to,&rdquo; &ldquo;terms,&rdquo;{" "}
              &ldquo;third-party&rdquo;) — <strong className="text-rose-500">T(N_legal) &cap;
              K_agreement &ne; &empty;</strong> — but it was already checked when the page loaded.
              {darkToggled
                ? " You toggled it after the fact, so for most of the flow Checked(N_legal) = True while UserToggled(N_legal) = False."
                : " You never touched it: Checked(N_legal) = True ∧ UserToggled(N_legal) = False."}{" "}
              Your consent to third-party data sharing was recorded with zero affirmative
              interaction in the event log.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
