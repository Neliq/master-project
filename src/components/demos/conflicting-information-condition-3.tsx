"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2, Crown } from "lucide-react";

/*
 * Conflicting Information — Condition 3: Mutually Exclusive Factual Claims
 *
 * Thesis: within a single informational container N_container (e.g. a pricing
 * tier card), NLP extracts the factual constraints Sem(x) of proximally close
 * text nodes t1, t2. The feature triggers if their logical intersection is
 * unsatisfiable — the card presents a logical paradox:
 *
 *   ∃t1, t2 ∈ N_container : Sem(t1) ∧ Sem(t2) ⇒ Unsatisfiable
 *
 * Variant A (dark): one "Pro" tier card asserts "Unlimited storage" while its
 * own fine print caps storage at 5 GB — an unsatisfiable conjunction.
 * Variant B (benign): the headline and the fine print agree on a 50 GB limit.
 */

export function ConflictingInformationCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [chosen, setChosen] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Conflicting Information: Mutually Exclusive Factual Claims"
      caption="Mutually Exclusive Factual Claims — a single pricing card asserts “Unlimited storage” and, in its own fine print, a 5 GB cap: a logical paradox inside one container."
      deltaNote="In Variant A the same N_container carries Sem(t₁) = “unlimited storage” and Sem(t₂) = “storage capped at 5 GB” — no plan could satisfy both, an unsatisfiable conjunction. In Variant B headline and fine print agree on a 50 GB limit, so the card&rsquo;s claims are satisfiable."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                  <Crown className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-[11px] font-semibold">CloudPlus Pro</h3>
              </div>
              <div className="text-[10px] font-bold text-green-600 dark:text-green-400">$12/mo</div>
            </div>

            <ul className="mt-3 space-y-1 text-[10px] text-foreground/80">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-green-500" /> 50 GB storage
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-green-500" /> Unlimited projects
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-green-500" /> Priority support
              </li>
            </ul>

            <div className="mt-3 rounded-md bg-background border border-border p-2 text-[9px] leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Fine print:</strong> Storage is 50 GB on Pro.
              Additional storage available as add-ons.
            </div>

            <button
              onClick={() => setChosen(true)}
              className="mt-2 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Choose Pro — $12/mo
            </button>
          </div>

          {chosen && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <CheckCircle2 className="w-3 h-3" />
                Plan selected — claims consistent
              </div>
              <p className="text-muted-foreground mt-0.5">
                Sem(“50 GB storage”) ∧ Sem(“Storage is 50 GB on Pro”) is satisfiable — headline and
                fine print describe the same fact, so the card&rsquo;s truth conditions hold
                together.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
                <Crown className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-[11px] font-semibold">CloudPlus Pro — Unlimited</h3>
            </div>
            <div className="text-[10px] font-bold text-red-600 dark:text-red-400">$12/mo</div>
          </div>

          <ul className="mt-3 space-y-1 text-[10px] text-foreground/80">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-red-500" /> Unlimited storage
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-red-500" /> Unlimited projects
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-red-500" /> Priority support
            </li>
          </ul>

          <div className="mt-3 rounded-md bg-background border border-border p-2 text-[9px] leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Fine print:</strong> Storage is capped at 5 GB on
            all plans. Projects limited to 3.
          </div>

          <button
            onClick={() => setChosen(true)}
            className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Choose Pro — $12/mo
          </button>
        </div>

        {mode === "auditor" && chosen && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <AlertTriangle className="w-3 h-3" />
              Storage details
            </div>
            <p className="text-muted-foreground">
              The card&rsquo;s headline claims <strong className="text-foreground">“Unlimited
              storage”</strong> while its own fine print states{" "}
              <strong className="text-red-500">“Storage is capped at 5 GB on all plans.”</strong>{" "}
              The logical intersection of the constraints is empty:{" "}
              <strong className="text-red-500">Sem(t₁) ∧ Sem(t₂) ⇒ Unsatisfiable</strong> — a
              paradox no plan could satisfy.
            </p>
            <p className="text-muted-foreground">
              You selected the tier on the strength of the headline; the contradictory node waited
              in the same container, close enough to be read as context but late enough to be
              missed.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
