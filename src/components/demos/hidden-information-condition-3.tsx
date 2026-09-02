"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Hidden Information — Condition 3: Semantic Concealment of Adverse Terms
 *
 * Thesis: the algorithm searches for adverse disclosure terms — “fee”,
 * “cancellation”, “auto-renew”, “liability” — and evaluates their
 * visibility. A term is semantically hidden if it appears only within
 * collapsed <details> elements, hover-triggered tooltips, or text styled
 * with display:none / visibility:hidden. The feature triggers when the
 * adverse-term keyword set has a non-empty intersection with the visible
 * DOM but the rendering properties place it in a concealed state:
 *
 *   K_adverse ∩ T_DOM ≠ ∅  ∧  IsConcealed(N_adverse) = True
 *
 * Variant A (dark): the $5.00 monthly service fee lives inside a collapsed
 * <details> element and a hover tooltip — present in the DOM, concealed in
 * the rendering.
 * Variant B (benign): the identical statement is plain visible text on the
 * page, so IsConcealed = False.
 */

const usd = (n: number) => `$${n.toFixed(2)}`;
const SERVICE_FEE = 5;
const TRIAL_DAYS = 7;

export function HiddenInformationCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [started, setStarted] = React.useState(false);
  const [scanned, setScanned] = React.useState(false);

  const reset = () => {
    setStarted(false);
    setScanned(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">K_adverse ∩ T_DOM</span>
        <span className="font-mono font-semibold tabular-nums">
          {"{service fee, auto-renew, cancel}"} ≠ ∅
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">IsConcealed(N_adverse) dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">
          True (collapsed &lt;details&gt;)
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">IsConcealed(N_adverse) benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">False</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Monthly service fee</span>
        <span className="font-mono font-semibold tabular-nums">{usd(SERVICE_FEE)} / mo</span>
      </div>
    </>
  ) : null;

  const renderPanel = (dark: boolean) => (
    <div className="space-y-3">
      <div className="rounded-md border bg-card p-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
              dark ? "bg-red-100 dark:bg-red-900/30" : "bg-green-100 dark:bg-green-900/30"
            }`}
          >
            <svg
              className={`h-4 w-4 ${dark ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 6L9 17l-5-5" />
              <circle cx="17" cy="17" r="4" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[11px] font-semibold">CloudBackup Pro</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Automatic cloud backups for all your devices
            </p>
          </div>
        </div>

        <label className="mt-3 block rounded-md border border-border bg-background p-2">
          <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground">
            Email
          </span>
          <span className="mt-1 block text-[10px] text-muted-foreground/70">
            marta.kowalska@cloudmail.pl
          </span>
        </label>

        <button
          onClick={() => setStarted(true)}
          className={`mt-2 w-full cursor-pointer rounded-md py-2 text-[11px] font-semibold text-white transition-colors ${
            dark ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          }`}
          title={dark ? "Auto-renews monthly — a $5.00 monthly service fee applies" : undefined}
        >
          {started ? "Trial started" : `Start ${TRIAL_DAYS}-day free trial`}
        </button>

        {dark ? (
          <details className="mt-2 text-[8px]">
            <summary className="cursor-pointer text-muted-foreground/60 transition-colors hover:text-foreground">
              Subscription details
            </summary>
            <div className="mt-1 rounded-md border bg-background p-2 leading-relaxed text-muted-foreground">
              A {usd(SERVICE_FEE)} monthly service fee applies after your free trial. Your
              subscription auto-renews monthly; you may cancel at any time in settings.
            </div>
          </details>
        ) : (
          <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[9px] leading-relaxed">
            <span className="text-muted-foreground">
              A <strong className="text-green-700 dark:text-green-300">{usd(SERVICE_FEE)} monthly
              service fee</strong> applies after your {TRIAL_DAYS}-day free trial. Your subscription
              auto-renews monthly — <strong className="text-green-700 dark:text-green-300">you
              can cancel at any time</strong> in settings.
            </span>
          </div>
        )}
      </div>

      <button
        onClick={() => setScanned(true)}
        className="w-full cursor-pointer rounded-md border border-border bg-background py-1.5 text-[9px] font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        {mode === "auditor" ? "Scan DOM for adverse terms" : "View subscription details"}
      </button>

      {scanned ? (mode === "auditor" ? (
        <div className="space-y-1.5 rounded-md border bg-background p-2 font-mono text-[8px] leading-relaxed">
          <div className="font-bold uppercase tracking-wide text-muted-foreground">
            K_adverse = {"{fee, cancellation, auto-renew, liability}"}
          </div>
          <div className="text-muted-foreground">
            K_adverse ∩ T_DOM = {"{service fee, auto-renew, cancel}"} ≠ ∅
          </div>
          <div className={dark ? "text-red-500" : "text-green-600 dark:text-green-400"}>
            IsConcealed(N_adverse) = {dark ? "True — inside collapsed <details> + hover tooltip" : "False — plain visible text"}
          </div>
          <div className={dark ? "text-red-500" : "text-green-600 dark:text-green-400"}>
            ⟹ trigger: K_adverse ∩ T_DOM ≠ ∅ ∧ IsConcealed = {dark ? "True" : "False"}
          </div>
        </div>
      ) : (
        <div className="space-y-1 rounded-md border bg-background p-2 text-[8px] leading-relaxed">
          <div className="font-semibold text-foreground">Subscription details</div>
          <div className="text-muted-foreground">A $5.00 monthly service fee applies after the {TRIAL_DAYS}-day trial. Your plan renews monthly and can be cancelled in Settings.</div>
        </div>
      )) : null}

      {started &&
        (dark ? (
          <div className="rounded-md border border-red-500/30 bg-red-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="font-semibold text-red-700 dark:text-red-300">Trial started</div>
            <p className="mt-1 text-muted-foreground">Your {TRIAL_DAYS}-day trial is active. Review Subscription details before the first renewal.</p>
          </div>
        ) : (
          <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-green-700 dark:text-green-300">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Adverse terms plainly visible
            </div>
            <p className="text-muted-foreground mt-1">
              The {usd(SERVICE_FEE)}/month service fee and the auto-renewal notice sit as plain
              visible text directly under the CTA — IsConcealed(N_adverse) = False, so the trigger
              never fires.
            </p>
          </div>
        ))}
    </div>
  );

  return (
    <DemoShell
      mode={mode}
      annotations={annotations}
      onRestart={onRestart ?? reset}
      title="Hidden Information: Semantic Concealment of Adverse Terms"
      caption="Semantic Concealment of Adverse Terms — adverse disclosure terms exist in the DOM but their rendering properties place them in a concealed state, such as a collapsed details element or a hover tooltip."
      auditorStats={stats}
      deltaNote="Variant A hides the $5.00 monthly service fee and auto-renewal inside a collapsed <details> element and a hover tooltip — present in the DOM, concealed in rendering (IsConcealed = True). Variant B renders the same statements as plain visible text under the CTA (IsConcealed = False)."
      benign={renderPanel(false)}
    >
      {renderPanel(true)}
    </DemoShell>
  );
}
