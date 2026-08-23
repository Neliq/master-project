"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Visual Prominence — Condition 3: Semantic Neutrality of Dominant Action Labels
 *
 * Thesis: the algorithm computes the NLP sentiment and coercion scores of
 * the text label L(N_favorable) on the visually dominant business-favorable
 * button. The feature triggers if the label's sentiment deviates from
 * neutrality by more than +/- 0.5 on a normalized scale, or if it contains
 * lexemes from a curated coercion dictionary ("unlock," "claim," "don't
 * miss") — visual dominance compounded by manipulative semantics:
 *
 *   |Sent(L(N_favorable))| > 0.5  OR  L(N_favorable) ∩ D_coercion ≠ ∅
 *
 * Variant A (dark): the dominant button screams "YES! UNLOCK my $50 savings
 * — don't miss out!" (Sent +0.86; lexemes "unlock", "don't miss").
 * Variant B (benign): the identical offer is labelled neutrally
 * ("Apply $50 discount", Sent +0.12, no coercion lexemes).
 */

const SENT_DARK = 0.86;
const SENT_BENIGN = 0.12;
const COERCION_HITS_DARK = ["unlock", "don't miss"];
const TAU_SENTIMENT = 0.5;

export function VisualProminenceCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [choice, setChoice] = React.useState<null | "apply" | "full-price">(null);

  const reset = () => setChoice(null);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Sent(L) dominant label (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">+{SENT_DARK.toFixed(2)} (&gt; &plusmn;{TAU_SENTIMENT})</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Coercion lexemes (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{COERCION_HITS_DARK.join(", ")}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">L &cap; D_coercion (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">&ne; &empty;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Sent(L) benign label</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">+{SENT_BENIGN.toFixed(2)}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Visual Prominence: Semantic Neutrality of Dominant Action Labels"
      caption="Semantic Neutrality of Dominant Action Labels — the visually dominant button's label should be neutral; here its sentiment and coercion lexemes amplify the visual dominance."
      auditorStats={stats}
      deltaNote="Both variants offer the same $50 discount. In Variant A the dominant label is emotionally loaded: Sent = +0.86 (|Sent| > 0.5) and it contains coercion lexemes {'unlock', 'don't miss'} from D_coercion. In Variant B the identical offer is labeled neutrally (Sent = +0.12, L ∩ D_coercion = ∅)."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Almost there!</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  A <span className="font-semibold text-green-600 dark:text-green-400">$50 discount</span>{" "}
                  is available on your order of $120.00.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Sent +0.12
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2">
              <button
                onClick={() => setChoice("full-price")}
                className="rounded-md border border-border bg-background py-2 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
              >
                Continue without discount
              </button>
              <button
                onClick={() => setChoice("apply")}
                className="rounded-md bg-green-600 hover:bg-green-700 py-2 text-[10px] font-medium text-white transition-colors cursor-pointer"
              >
                Apply $50 discount
              </button>
            </div>
          </div>

          {mode === "auditor" && choice && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {choice === "apply" ? "Discount applied" : "Full price kept"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                The dominant label is semantically neutral: Sent(L) = +{SENT_BENIGN.toFixed(2)} (within
                &plusmn;{TAU_SENTIMENT}) and L &cap; D_coercion = &empty;. The decision is presented as a
                plain fact, so the visual dominance of the button is not reinforced by loaded wording.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Almost there!</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                A <span className="font-semibold text-green-600 dark:text-green-400">$50 discount</span>{" "}
                is available on your order of $120.00.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Sent +0.86
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <button
              onClick={() => setChoice("apply")}
              className="w-full rounded-md   py-3.5 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-lg shadow-red-500/30 transition-transform hover:scale-[1.02] cursor-pointer"
            >
              YES! Unlock my $50 savings — don&rsquo;t miss out!
            </button>
            <button
              onClick={() => setChoice("full-price")}
              className="w-full py-0.5 text-[9px] text-muted-foreground underline decoration-dotted underline-offset-2 transition-colors hover:text-foreground cursor-pointer"
            >
              No thanks, I&rsquo;ll pay the full price
            </button>
          </div>
        </div>

        {mode === "auditor" && choice && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Non-neutral dominant label
            </div>
            <p className="text-muted-foreground">
              {choice === "apply"
                ? "You clicked the screaming button — the wording did part of the selling."
                : "You can choose either option below."}{" "}
              The dominant action&rsquo;s label has <strong className="text-foreground">Sent(L) = +{SENT_DARK.toFixed(2)}</strong>,{" "}
              deviating from neutrality by more than &plusmn;{TAU_SENTIMENT}, and contains coercion
              lexemes <strong className="text-red-500">{COERCION_HITS_DARK.join(" + ")}</strong> from
              D_coercion, so <strong className="text-foreground">L &cap; D_coercion &ne; &empty;</strong>.
            </p>
            <p className="text-muted-foreground">
              The button is already the biggest thing on the page — the emotionally charged label stacks
              semantic pressure on top of the visual pressure, turning a simple choice into a&nbsp;nudge.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
