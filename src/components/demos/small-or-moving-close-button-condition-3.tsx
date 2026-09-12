"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Small or Moving Close Button — Condition 3:
 * Semantic Obfuscation of Dismissal Labels
 *
 * Thesis: the algorithm examines the aria-label, title attribute, and
 * visible text of dismissal elements. The feature triggers if the close
 * button's accessible name is absent, semantically vacuous (a
 * non-descriptive icon with no label), or misleading — such as labeling a
 * close action "Continue" or "Learn More" — so even a visually detected
 * dismissal element has its semantic identity deliberately obscured:
 *
 *   AccessibleName(N_close) = ∅  ∨  Intent(AccessibleName(N_close)) ≠ Dismissal
 *
 * Variant A (dark): the only dismissal vector is labeled "Continue" —
 * semantically a progression action, not a dismissal — and its accessible
 * name is equally misleading.
 * Variant B (benign): the dismissal vector is an X with the accessible name
 * "Close dialog", whose intent matches dismissal.
 */

export function SmallOrMovingCloseButtonCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [aDismissed, setADismissed] = React.useState(false);
  const [bDismissed, setBDismissed] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Small or Moving Close Button: Semantic Obfuscation of Dismissal Labels"
      userTitle="Streamly — Newsletter prompt"
      caption="Semantic Obfuscation of Dismissal Labels — the dismissal control's accessible name says “Continue reading”, so its semantic intent is progression, not dismissal."
      deltaNote="Both variants dismiss the modal with one click. In Variant A the only dismissal vector is a button labeled 'Continue' (accessible name 'Continue reading') with no disclosure that it closes the dialog — AccessibleName(N_close) maps to Intent = Proceed ≠ Dismissal — so users and screen readers are told they are progressing when the control actually closes the dialog. In Variant B the X is named 'Close dialog' and Intent = Dismissal."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">You&rsquo;ve been selected!</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5 leading-relaxed">
                  Claim your free gift card. If you&rsquo;re not interested, close this window
                  with the X — its label honestly says what it does.
                </p>
              </div>
              {!bDismissed ? (
                <button
                  onClick={() => setBDismissed(true)}
                  aria-label="Close dialog"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-foreground transition-colors hover:bg-muted/60 cursor-pointer"
                >
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              ) : null}
            </div>
            {bDismissed && (
              <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2 text-[9px] text-foreground">
                Dismissed. The close control clearly said what it would do, so both screen readers and
                sighted users could identify it immediately.
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border-2 border-border/60 bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">You&rsquo;ve been selected!</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5 leading-relaxed">
                Claim your free gift card &mdash; a $25 reward is waiting for you.
              </p>
            </div>
            {!aDismissed ? (
              <button
                onClick={() => setADismissed(true)}
                aria-label="Continue reading"
                className="shrink-0 rounded-md border border-border/60 bg-muted/40 px-2 py-1 text-[10px] font-medium text-foreground transition-colors hover:bg-muted/60 cursor-pointer"
              >
                Continue
              </button>
            ) : null}
          </div>
          {aDismissed && (
            <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Close
              </div>
              <p className="text-muted-foreground">
                Clicking <strong className="text-foreground">“Continue”</strong> dismissed the modal,
                even though the control looked like a way to keep reading. Users expecting to advance
                were silently closed out of the dialog instead.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
