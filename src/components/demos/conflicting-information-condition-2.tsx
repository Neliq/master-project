"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, Check, CheckCircle2 } from "lucide-react";

/*
 * Conflicting Information — Condition 2: Semantic-Visual Mismatch
 *
 * Thesis: for an interactive node B, Intent(L(B)) is the NLP-derived
 * semantic intent of its label (e.g. "Cancel" → destructive), while
 * Affordance(C(B)) is the psychological affordance of its background color
 * (e.g. green → positive/confirm). The feature triggers when the semantic
 * intent of the text diametrically opposes the visual affordance of the
 * element, confusing automated psychological responses:
 *
 *   Intent(L(B)) ∩ Affordance(C(B)) = ∅ ⇒ Contradiction
 *
 * Variant A (dark): the destructive "Cancel my membership" action is painted
 * green — the confirm affordance — so the text and the color tell opposite
 * stories.
 * Variant B (benign): intent and affordance agree — cancel is red, keep is
 * green.
 */

export function ConflictingInformationCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [choice, setChoice] = React.useState<null | "cancel" | "keep">(null);
  // Variant A only: the cancellation path requires an extra confirmation step.
  const [confirming, setConfirming] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Conflicting Information: Semantic-Visual Mismatch"
      caption="Semantic-Visual Mismatch — the destructive “Cancel my membership” path is painted in the confirm affordance color (green) and placed behind an extra confirmation step while the card’s “cancel anytime” claim is contradicted by a minimum-term fee clause."
      deltaNote="In Variant A Intent(L(B)) = cancel (destructive) ∩ Affordance(C(B)) = green (confirm) = ∅, so the button that ends your membership is dressed in the color your brain reads as safe/confirm. Variant A also obstructs the exit: the card claims “cancel anytime” yet the fine print imposes a 12-month minimum term with a $49 early-cancellation fee, and cancellation is demoted to a small text link that demands a second confirmation step (N(x_delete) = 2 &gt; N(x_create) = 1). In Variant B the affordances are honest: the destructive action is red, the safe one is green, Intent ∩ Affordance is non-empty for both, and cancelling takes a single prominent click with no conflicting terms."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted">
                <Check className="h-3.5 w-3.5 text-foreground" />
              </div>
              <div>
                <h3 className="text-[11px] font-semibold">FitClub gym membership</h3>
                <p className="text-[9px] text-muted-foreground">Billed monthly · cancel anytime</p>
              </div>
            </div>

            <div className="mt-3 rounded-md bg-background border border-border p-2.5 text-center">
              <div className="text-[11px] font-semibold">Manage your membership</div>
              <p className="text-[9px] text-muted-foreground mt-1">
                Choose what happens to your account:
              </p>
            </div>

            <div className="mt-2 space-y-1.5">
              <button
                onClick={() => setChoice("cancel")}
                className="w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Cancel my membership
              </button>
              <button
                data-dp-color-signal=""
                onClick={() => setChoice("keep")}
                className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                Keep my membership
              </button>
            </div>
          </div>

          {choice && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <CheckCircle2 className="w-3 h-3" />
                {choice === "cancel" ? "Membership cancelled" : "Membership kept"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                Each button&rsquo;s color matched its meaning: red carried the destructive intent,
                green the confirm intent, so Intent(L(B)) ∩ Affordance(C(B)) ≠ ∅ — nothing in the
                interface fights your automated colour response.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted">
              <Check className="h-3.5 w-3.5 text-foreground" />
            </div>
            <div>
              <h3 className="text-[11px] font-semibold">FitClub gym membership</h3>
              <p className="text-[9px] text-muted-foreground">Billed monthly · cancel anytime</p>
            </div>
          </div>

          <div className="mt-3 rounded-md bg-background border border-border p-2.5 text-center">
            <div className="text-[11px] font-semibold">Manage your membership</div>
            <p className="text-[9px] text-muted-foreground mt-1">
              Choose what happens to your account:
            </p>
          </div>

          <div className="mt-2 space-y-1.5">
            {/* Business-favorable action: primary, prominent, confirm-colored */}
            <button
              onClick={() => setChoice("keep")}
              className="w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-2 px-3 text-[10px] font-semibold transition-colors cursor-pointer"
            >
              Keep my membership
            </button>
            {/* User-favorable action: confirmation-colored despite its destructive intent. */}
            {!confirming ? (
              <button
                data-dp-color-signal=""
                type="button"
                onClick={() => setConfirming(true)}
                className="w-full rounded-md border border-border bg-background hover:bg-muted text-foreground py-2 px-3 text-[10px] font-semibold transition-colors cursor-pointer"
              >
                Cancel my membership
              </button>
            ) : (
              <div className="rounded-md border border-border/60 bg-muted/40 p-2.5">
                <div className="text-[9px] font-semibold text-foreground">Confirm cancellation</div>
                <p className="text-[8px] text-muted-foreground mt-1 leading-relaxed">
                  Cancelling ends your access immediately and the $49 early-cancellation fee will be
                  charged to your card on file. Are you sure?
                </p>
                <div className="mt-1.5 flex gap-1.5">
                  <button
                    data-dp-color-signal=""
                    onClick={() => {
                      setConfirming(false);
                      setChoice("cancel");
                    }}
                    className="flex-1 rounded-md border border-border bg-background py-1.5 text-[9px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Yes, cancel my membership
                  </button>
                  <button
                    onClick={() => setConfirming(false)}
                    className="flex-1 rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 text-[9px] font-semibold transition-colors cursor-pointer"
                  >
                    Keep my membership
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Fine print that contradicts the "cancel anytime" claim above */}
          <p className="mt-2 text-[8px] leading-relaxed text-muted-foreground/60">
            12-month minimum term — early cancellation incurs a $49 processing fee.
          </p>
        </div>

        {mode === "auditor" && choice && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <AlertTriangle className="w-3 h-3" />
              Exit vector obstructed — semantic-visual mismatch also fired
            </div>
            <p className="text-muted-foreground">
              The card claims <strong className="text-foreground">“cancel anytime”</strong> while the
              fine print imposes a <strong className="text-foreground">12-month minimum term and a $49 early-cancellation fee</strong>{" "}
              — mutually exclusive factual claims in one container. And the exit itself is a bare,
              9px text link behind an extra confirmation step:{" "}
              <strong className="text-red-500">N(x_delete) = 2 &gt; N(x_create) = 1</strong>, with
              the deletion affordance visually demoted below the “Keep my membership” button.
            </p>
            <p className="text-muted-foreground">
              {choice === "cancel"
                ? "You pushed through both steps and cancelled — after the interface had already made you doubt whether leaving was even possible."
                : "You kept the membership — the green confirm-colored path was the one the layout kept pushing you toward."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
