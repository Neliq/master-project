"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2, Flame, Zap } from "lucide-react";

/*
 * Conflicting Information — Condition 1: Structural Proximity of
 * Contradictory Factual Nodes
 *
 * Thesis: two text nodes t1, t2 inside a shared container C carry factual
 * propositions whose logical intersection is null (Prop(t1) ∧ Prop(t2) ⇒ ⊥),
 * and they are placed within a DOM distance d_DOM(t1, t2) below the
 * perceptual grouping threshold τ_proximity — e.g. a "Free Trial" headline
 * juxtaposed with "Pay Today".
 *
 *   ∃t1, t2 ∈ Descendants(C) : Prop(t1) ∧ Prop(t2) ⇒ ⊥ ∧ d_DOM(t1, t2) < τ_proximity
 *
 * Variant A (dark): "FREE trial" and "Payment of $49.00 due today" share the
 * same card, a few pixels apart — mutually unsatisfiable claims.
 * Variant B (benign): the claims are consistent — free for 30 days, first
 * payment only after the trial ends.
 */

const PROXIMITY_THRESHOLD = 120; // τ_proximity, px
const NODE_GAP_DARK = 24; // px between the two contradictory nodes in A

export function ConflictingInformationCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [started, setStarted] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Conflicting Information: Structural Proximity of Contradictory Factual Nodes"
      caption="Structural Proximity of Contradictory Factual Nodes — a “FREE trial” claim and a “payment due today” note sit a few pixels apart in the same card, yet their propositions are mutually unsatisfiable."
      deltaNote="In Variant A the two factual nodes are placed within d_DOM = 24px (< τ_proximity), and their propositions are contradictory — “free trial, no charge” ∧ “payment of $49.00 due today” ⇒ ⊥ — so starting the trial charges you immediately. In Variant B the claims are consistent: the trial is genuinely free for 30 days and the first payment comes only afterwards, so both propositions are satisfiable."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                <Zap className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-[11px] font-semibold">AcmeStream Pro</h3>
                <p className="text-[9px] text-muted-foreground">30-day free trial · then $49.00/mo</p>
              </div>
            </div>

            <div className="mt-3 rounded-md bg-background border border-border p-2.5 text-center">
              <div className="text-[13px] font-bold text-foreground">Start your 30-day FREE trial</div>
              <div className="text-[9px] text-muted-foreground mt-0.5">
                No charge today — first payment of $49.00/mo begins after the trial ends.
              </div>
            </div>

            <button
              onClick={() => setStarted(true)}
              className="mt-2 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Start free trial
            </button>
          </div>

          {started && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <CheckCircle2 className="w-3 h-3" />
                Trial started — $0.00 charged
              </div>
              <p className="text-muted-foreground mt-0.5">
                Both claims in this card are satisfiable: “free for 30 days” ∧ “payment after the
                trial” hold together, so the interface never lies — d_DOM stays well below the
                grouping threshold but no contradiction exists to trip it.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
              <Flame className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-[11px] font-semibold">AcmeStream Pro</h3>
              <p className="text-[9px] text-muted-foreground">Trial offer · $49.00/mo after</p>
            </div>
          </div>

          <div className="mt-3 rounded-md bg-background border border-border p-2.5 text-center">
            <div className="text-[13px] font-bold text-foreground">Start your FREE trial</div>
            {/* t1 — the free claim */}
            <div className="text-[9px] text-muted-foreground mt-0.5">
              No charges during your trial period.
            </div>
            {/* t2 — the contradictory claim, placed NODE_GAP_DARK px away */}
            <div className="text-[9px] font-semibold text-red-500 mt-1 border-t border-dashed border-border pt-1">
              Payment of $49.00 due today at signup.
            </div>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Start free trial
          </button>
        </div>

        {mode === "auditor" && started && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <AlertTriangle className="w-3 h-3" />
              Payment complete — $49.00 charged
            </div>
            <p className="text-muted-foreground">
              The card told you <strong className="text-foreground">“No charges during your trial
              period”</strong> and, {NODE_GAP_DARK}px below it,{" "}
              <strong className="text-red-500">“Payment of $49.00 due today.”</strong>{" "}
              Prop(t₁) ∧ Prop(t₂) is logically unsatisfiable — both can&rsquo;t be true — yet the
              interface co-locates them so the free claim dominates your reading. Your card was
              charged today.
            </p>
            <p className="text-muted-foreground">
              d_DOM(t₁, t₂) = {NODE_GAP_DARK}px &lt; τ_proximity ({PROXIMITY_THRESHOLD}px): the
              contradictory nodes sit inside one perceptual group, so the paradox is processed as a
              single message.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
