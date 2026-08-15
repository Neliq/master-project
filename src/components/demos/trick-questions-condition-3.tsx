"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Trick Questions — Condition 3: Affordance-Consequence Mismatch
 *
 * A subscription cancellation dialog where the button labels are reversed:
 * - "Cancel" actually cancels the subscription
 * - "Confirm" does nothing (keeps the subscription)
 *
 * The user expects "Cancel" to dismiss the dialog and "Confirm" to finalise
 * the action, but the consequences are swapped.
 */

type PageState = "initial" | "modal" | "cancelled" | "confirmed";

const FEATURES = [
  "Ad-free browsing across all devices",
  "Exclusive member-only content & early access",
  "Priority customer support — 24/7 chat",
  "Unlimited bookmarks & custom collections",
  "Cancel anytime — your data stays yours",
];

export function TrickQuestionsCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [state, setState] = React.useState<PageState>("initial");

  const reset = () => setState("initial");

  const openModal = () => setState("modal");
  const doCancel = () => setState("cancelled");
  const doConfirm = () => setState("confirmed");

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Affordance label</span>
        <span className="font-mono font-semibold tabular-nums">&ldquo;Continue&rdquo;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Actual consequence</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">Keeps subscription</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Affordance label</span>
        <span className="font-mono font-semibold tabular-nums">&ldquo;Cancel&rdquo;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Actual consequence</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">Cancels subscription</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Mismatch severity</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">Critical</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Trick Questions: Affordance-Consequence Mismatch"
      caption="Affordance-Consequence Mismatch — button labels deliberately contradict their real consequences." auditorStats={stats}>
      <div className="space-y-3">
        {/* ── Subscription card ── */}
        {state !== "cancelled" && (
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[11px] font-semibold">Premium Gold Access</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">$49.99 / month &middot; Renews on July 20, 2026</p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5">
                Active
              </div>
            </div>

            {mode === "auditor" && (
              <div className="mt-2 rounded bg-muted p-1.5 text-[7px] text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Auditor note:</span> This card shows an active
                subscription. User expectation: clicking <strong>&ldquo;Cancel Subscription&rdquo;</strong> opens a
                confirmation dialog where <strong>&ldquo;Continue&rdquo;</strong> proceeds with cancellation and{" "}
                <strong>&ldquo;Cancel&rdquo;</strong> dismisses. Reality: swapped.
              </div>
            )}

            <button
              onClick={openModal}
              className="mt-2 w-full rounded-md bg-rose-600 text-white py-1.5 text-[10px] font-medium hover:bg-rose-700 transition-colors cursor-pointer"
            >
              Cancel Subscription
            </button>
          </div>
        )}

        {/* ── Cancelled state ── */}
        {state === "cancelled" && (
          <div className="rounded-md border border-rose-500/30 bg-rose-500/5 p-3">
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" />
              </svg>
              <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-300">Subscription Cancelled</span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-1">
              Your Premium Gold Access has been cancelled. You&rsquo;ll retain access through July 20, 2026.
            </p>
            <div className="mt-2 rounded border border-amber-500/30 bg-amber-500/5 p-2 text-[8px] leading-relaxed">
              <span className="font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">Affordance trap triggered</span>
              <p className="text-muted-foreground mt-0.5">
                You clicked <strong>&ldquo;Cancel&rdquo;</strong> &mdash; which sounds like it would
                dismiss the dialog. In reality, it cancelled your subscription. The{" "}
                <strong>&ldquo;Continue&rdquo;</strong> button, which sounds like it proceeds with
                cancellation, actually keeps you subscribed.
              </p>
            </div>
          </div>
        )}

        {/* ── Confirmed (kept) state ── */}
        {state === "confirmed" && (
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3">
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">Subscription Kept</span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-1">
              Nothing changed. Your Premium Gold Access remains active and will renew as scheduled.
            </p>
            <div className="mt-2 rounded border border-amber-500/30 bg-amber-500/5 p-2 text-[8px] leading-relaxed">
              <span className="font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">Affordance trap triggered</span>
              <p className="text-muted-foreground mt-0.5">
                You clicked <strong>&ldquo;Continue&rdquo;</strong> &mdash; which sounds like it would
                proceed with cancellation. In reality, nothing changed. To actually cancel, you would
                need to click <strong>&ldquo;Cancel,&rdquo;</strong> which sounds like dismissing
                the dialog.
              </p>
            </div>
          </div>
        )}

        {/* ── Modal overlay ── */}
        {state === "modal" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-sm rounded-lg border bg-card p-5 shadow-xl">
              {/* Close icon */}
              <button
                onClick={doConfirm}
                className="float-right text-muted-foreground/50 hover:text-muted-foreground cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 mb-2.5">
                  <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 9v4m0 4h.01" />
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  </svg>
                </div>

                <h4 className="text-sm font-semibold">We&rsquo;d hate to see you go!</h4>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Are you sure you want to cancel? Here&rsquo;s what you&rsquo;ll lose:
                </p>

                <ul className="mt-3 space-y-1.5 text-left text-[9px]">
                  {FEATURES.map((feature, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <svg className="mt-0.5 w-2.5 h-2.5 flex-shrink-0 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 rounded bg-rose-500/5 border border-rose-500/20 p-2 text-[8px] text-muted-foreground">
                  After cancellation you&rsquo;ll lose access immediately. We wouldn&rsquo;t want that.
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={doConfirm}
                  className="w-full rounded-md bg-foreground text-background py-2 text-[10px] font-medium hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Continue
                </button>
                <button
                  onClick={doCancel}
                  className="w-full rounded-md border border-border bg-transparent py-2 text-[10px] font-medium text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
