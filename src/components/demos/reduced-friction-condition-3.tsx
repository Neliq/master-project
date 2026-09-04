"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Reduced Friction — Condition 3: Semantic Absence of Confirmation Language
 *
 * Thesis: the algorithm searches for confirmation-seeking or
 * reversibility-assuring language preceding a high-commitment action —
 * “Are you sure?”, “This cannot be undone”, “Confirm purchase.” The feature
 * triggers if a one-click purchase or subscription commitment is executed
 * without any semantically equivalent confirmation text node in the
 * interaction path preceding the action:
 *
 *   ¬∃ n ∈ Path(v_pre, v_commit) : Match(T(n), Pattern_confirm) = True
 *
 * Variant A (dark): the commit button reads “Start my plan” surrounded by
 * promotional copy — zero confirmation-language nodes on the path, yet a
 * charge fires immediately.
 * Variant B (benign): identical layout and price, but the button is a
 * confirmation node: “Confirm purchase — $29.99”, preceded by “This cannot
 * be undone.”
 */

const PLAN_PRICE = "$29.99";

export function ReducedFrictionCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [aCommitted, setACommitted] = React.useState(false);
  const [bCommitted, setBCommitted] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Reduced Friction: Semantic Absence of Confirmation Language"
      userTitle="Harbor — Confirm changes"
      caption="Semantic Absence of Confirmation Language — a high-commitment action fires with no confirmation-seeking or reversibility-assuring text node anywhere on the path."
      deltaNote="In Variant A the button is a promotional node (“Start my plan”) and the path contains no confirmation language at all (Match = False). In Variant B the very same commitment is preceded by “This cannot be undone” and the button itself reads “Confirm purchase” — a confirmation node exists on the path."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                <svg className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">Premium Plan</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Unlimited projects, priority support, and analytics.{" "}
                  <span className="font-semibold text-green-600 dark:text-green-400">{PLAN_PRICE}/month</span>,
                  billed monthly. Cancel anytime.
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-md border border-border bg-background px-3 py-2 text-[9px] text-muted-foreground">
              <strong className="text-foreground">This cannot be undone.</strong> You will be charged {PLAN_PRICE}{" "}
              now, and every month thereafter until you cancel.
            </div>

            <button
              onClick={() => setBCommitted(true)}
              className="mt-2 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Confirm purchase — {PLAN_PRICE}/month
            </button>

            {bCommitted && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Purchase confirmed
                </div>
                <p className="text-muted-foreground mt-0.5">
                  The warning and the confirmation button made the recurring charge clear before you committed.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
              <svg className="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">Premium Plan</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Unlimited projects, priority support, and analytics.{" "}
                <span className="font-semibold text-green-600 dark:text-green-400">{PLAN_PRICE}/month</span>,
                billed monthly. Cancel anytime.
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-md border border-yellow-500/20 bg-yellow-500/5 px-3 py-2 text-[9px] text-muted-foreground">
             Limited-time offer — get instant access now! Join 40,000+ happy customers. Upgrade today.
          </div>

          <button
            onClick={() => setACommitted(true)}
            disabled={aCommitted}
            className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Start my plan — {PLAN_PRICE}/month
          </button>

          {aCommitted && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Plan started
              </div>
              <p className="text-muted-foreground mt-0.5">
                {PLAN_PRICE} was charged to •••• 4242. The plan started immediately from the offer page,
                where the surrounding copy focused on the benefits rather than confirming the recurring charge.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
