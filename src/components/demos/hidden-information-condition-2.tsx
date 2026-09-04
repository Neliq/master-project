"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Hidden Information — Condition 2: Typographical and Chromatic Camouflage
 *
 * Thesis: N_critical is a DOM node containing NLP-identified critical
 * phrases (e.g. {“auto-renew”, “subscription”, “cancel at any time”}).
 * S_font(x) is the computed font size in px and CR(x, L_bg) the WCAG
 * contrast ratio against the background. The feature triggers when the
 * critical node is rendered at the extreme margins of legibility:
 *
 *   S_font(N_critical) < τ_min_readable  ∨  CR(N_critical, L_bg) < τ_wcag_min
 *
 * Variant A (dark): the auto-renew disclosure is printed at 6px with
 * ~1.9:1 contrast directly beneath the trial CTA.
 * Variant B (benign): the same disclosure rendered at 11px with full
 * contrast in a bordered notice.
 */

const usd = (n: number) => `$${n.toFixed(2)}`;
const RENEWAL_PRICE = 49.99;
const TRIAL_DAYS = 30;

export function HiddenInformationCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [started, setStarted] = React.useState(false);
  const [showLine, setShowLine] = React.useState(false);


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
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[11px] font-semibold">CloudNimbus Pro</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Unlimited sync · 2 TB storage · team sharing
            </p>
          </div>
        </div>

        <button
          onClick={() => setStarted(true)}
          className={`mt-3 w-full cursor-pointer rounded-md py-2 text-[11px] font-semibold text-white transition-colors ${
            dark ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {started ? "Trial activated" : `Start your free ${TRIAL_DAYS}-day trial`}
        </button>

        {/* N_critical — the auto-renew disclosure */}
        {dark ? (
          <button
            onClick={() => setShowLine(true)}
            className={`mt-1.5 block w-full cursor-pointer text-left text-[6px] leading-relaxed transition-all hover:underline ${
              showLine ? "rounded px-1 ring-2 ring-red-500/60" : ""
            }`}
            style={{ color: "rgb(185 185 185)" }}
          >
            Your plan auto-renews at {usd(RENEWAL_PRICE)}/month after your trial.
          </button>
        ) : (
          <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[11px] leading-relaxed">
            <span className="text-green-700 dark:text-green-300">
              <strong>After your free {TRIAL_DAYS}-day trial, your plan auto-renews at{" "}
              {usd(RENEWAL_PRICE)}/month.</strong>{" "}
            </span>
            <span className="text-muted-foreground">You can cancel anytime in settings.</span>
          </div>
        )}
        {dark ? (
          <p className="text-[8px] text-muted-foreground/50 mt-1">
            No commitment required. Cancel before the trial ends.
          </p>
        ) : null}
      </div>

      {started &&
        (dark ? (
          <div className="rounded-md border border-red-500/30 bg-red-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="font-semibold text-red-700 dark:text-red-300">Trial activated</div>
            <p className="mt-1 text-muted-foreground">Your CloudNimbus Pro trial is active. You can review renewal details before the first charge.</p>
          </div>
        ) : (
          <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-green-700 dark:text-green-300">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Disclosure fully legible
            </div>
            <p className="text-muted-foreground mt-1">
              The auto-renewal at {usd(RENEWAL_PRICE)}/month was printed at 11px with ≈14.5:1 contrast
              in a bordered notice directly under the CTA — S_font and CR both clear their thresholds,
              so the commitment was readable before you clicked.
            </p>
          </div>
        ))}
    </div>
  );

  return (
    <DemoShell
      mode={mode}
      title="Hidden Information: Typographical and Chromatic Camouflage"
      caption="Typographical and Chromatic Camouflage — the critical node is rendered at the extreme margins of legibility, dropping below minimum readable font size or WCAG contrast while the primary interface stays highly visible."
      deltaNote={`Variant A prints the $49.99/month auto-renew disclosure at 6px with ≈1.9:1 contrast (S_font < τ_min_readable ∨ CR < τ_wcag_min). Variant B shows the same disclosure at 11px with ≈14.5:1 contrast in a bordered notice — legible before committing.`}
      benign={renderPanel(false)}
    >
      {renderPanel(true)}
    </DemoShell>
  );
}
