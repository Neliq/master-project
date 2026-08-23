"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Positive Or Negative Framing — Condition 1: Structural Asymmetry of
 * Framed Option Subtrees
 *
 * Thesis: the algorithm compares the DOM topology of options presented
 * under gain-framed (T_gain) and loss-framed (T_loss) modalities within
 * the same decision container. The feature triggers if one framing pole
 * carries additional structural embellishments — extra icon nodes, badge
 * overlays, or color-wrapper <span> elements — absent from the
 * counterpart, quantified as a subtree-difference ratio exceeding
 * tau_frame_structure:
 *
 *   |T_gain \ T_loss| / |T_gain U T_loss| > tau_frame_structure
 *
 * Variant A (dark): the gain-framed option is wrapped in a gradient
 * colour-wrapper and decorated with a badge plus two icon nodes; the
 * loss-framed option is a bare text node. The gain pole is also
 * pre-selected at load, and the loss pole discloses no price. The same
 * boolean decision is presented with structurally unequal DOM subtrees.
 * Variant B (benign): both framing poles carry structurally identical
 * subtrees (same wrapper, one icon each, no badge overlays), nothing is
 * pre-selected, and both outcomes are priced.
 */

const EXTRA_NODES = 4; // gradient wrapper + "BEST DEAL" badge + gift icon + sparkle icon
const UNION_NODES = 12;
const RATIO = EXTRA_NODES / UNION_NODES; // 0.333...
const TAU = 0.2;

export function PositiveOrNegativeFramingCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Per-panel state so the two variants never contaminate each other.
  const [aChoice, setAChoice] = React.useState<"gain" | "loss" | null>("gain");
  const [bChoice, setBChoice] = React.useState<"gain" | "loss" | null>(null);
  const [aSubmitted, setASubmitted] = React.useState(false);
  const [bSubmitted, setBSubmitted] = React.useState(false);

  const reset = () => {
    setAChoice("gain");
    setBChoice(null);
    setASubmitted(false);
    setBSubmitted(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|T_gain \ T_loss| (extra nodes)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{EXTRA_NODES}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|T_gain ∪ T_loss|</span>
        <span className="font-mono font-semibold tabular-nums">{UNION_NODES}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Subtree-difference ratio</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">
          {RATIO.toFixed(2)} &gt; {TAU.toFixed(1)}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">State(gain, t0) — Variant A</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">True (pre-selected)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Loss-pole price (Variant A)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">not disclosed</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Selected option (A / B)</span>
        <span className="font-mono font-semibold tabular-nums">
          {aChoice ? (aChoice === "gain" ? "Gain" : "Loss") : "—"} / {bChoice ? (bChoice === "gain" ? "Gain" : "Loss") : "—"}
        </span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Positive Or Negative Framing: Structural Asymmetry of Framed Option Subtrees"
      caption="Structural Asymmetry of Framed Option Subtrees — the gain-framed option is built from a richer DOM subtree (badge, icons, colour wrapper), is pre-selected at load, and is the only pole whose outcome is priced, so the interface's structure itself argues for one pole."
      auditorStats={stats}
      deltaNote="Both variants ask the same binary question with the same informational payload. In Variant A the gain-framed option's DOM subtree carries 4 extra embellishment nodes (badge, icons, colour wrapper) that the loss-framed option lacks, pushing the subtree-difference ratio past tau; the gain radio is pre-checked at t0 (State = True with zero user events), and the loss pole discloses no price — so the framing asymmetry is not cosmetic. In Variant B both poles share structurally identical subtrees, nothing is pre-selected, and both outcomes are priced, so the structure stays neutral."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">One-time welcome offer</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Get 20% off your first order. Choose how you would like to proceed.
            </p>

            <div className="mt-3 space-y-2">
              {/* Gain pole — same subtree shape as the loss pole (wrapper + one icon, no badge) */}
              <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
                <input
                  type="radio"
                  name="discount-choice-benign"
                  checked={bChoice === "gain"}
                  onChange={() => setBChoice("gain")}
                  className="mt-0.5 flex-shrink-0 accent-green-500"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-medium leading-relaxed select-none group-hover:text-foreground transition-colors">
                    <svg className="h-3 w-3 shrink-0 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
                    </svg>
                    Claim my 20% welcome discount
                  </div>
                  <p className="text-[8px] text-muted-foreground/60 mt-0.5">
                    You save $24 on your first order.
                  </p>
                </div>
              </label>

              {/* Loss pole — identical structure */}
              <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
                <input
                  type="radio"
                  name="discount-choice-benign"
                  checked={bChoice === "loss"}
                  onChange={() => setBChoice("loss")}
                  className="mt-0.5 flex-shrink-0 accent-green-500"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-medium leading-relaxed select-none group-hover:text-foreground transition-colors">
                    <svg className="h-3 w-3 shrink-0 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
                    </svg>
                    Skip the discount and pay full price
                  </div>
                  <p className="text-[8px] text-muted-foreground/60 mt-0.5">
                    You pay the standard $120 order total.
                  </p>
                </div>
              </label>
            </div>

            <button
              onClick={() => setBSubmitted(true)}
              disabled={!bChoice}
              className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                bChoice
                  ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              Confirm my choice
            </button>
          </div>

          {mode === "auditor" && bSubmitted && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Structurally neutral
              </div>
              <p className="text-muted-foreground mt-0.5">
                Both options are built from the same DOM subtree — identical wrappers, one icon
                each, no badge overlays. The subtree-difference ratio is 0, far below the
                threshold, so neither pole gains structural prominence. Your choice reflects
                the offer, not the markup.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">One-time welcome offer</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Get 20% off your first order. Choose how you would like to proceed.
          </p>

          <div className="mt-3 space-y-2">
            {/* Gain pole — gradient colour-wrapper + badge + two icon nodes, pre-selected */}
            <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-red-500/40  via-background  p-2.5 transition-colors">
              <input
                type="radio"
                name="discount-choice-dark"
                checked={aChoice === "gain"}
                onChange={() => setAChoice("gain")}
                className="mt-0.5 flex-shrink-0 accent-red-500"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="bg-red-600 text-white rounded-full px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider">
                    ★ Best deal
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-semibold leading-relaxed select-none group-hover:text-foreground transition-colors">
                    <svg className="h-3 w-3 shrink-0 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
                    </svg>
                    Claim my 20% welcome discount
                  </span>
                </div>
                <p className="text-[8px] text-green-600 dark:text-green-400 font-medium mt-0.5">
                  <svg className="inline h-2.5 w-2.5 -mt-0.5 mr-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 3v18M3 12h18" />
                  </svg>
                  You save $24 on your first order today.
                </p>
              </div>
            </label>

            {/* Loss pole — bare subtree, no embellishments, and no price disclosed */}
            <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
              <input
                type="radio"
                name="discount-choice-dark"
                checked={aChoice === "loss"}
                onChange={() => setAChoice("loss")}
                className="mt-0.5 flex-shrink-0 accent-red-500"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[9px] text-muted-foreground/60 leading-relaxed select-none group-hover:text-foreground transition-colors">
                  Skip the discount and pay full price
                </div>
              </div>
            </label>
          </div>

          <button
            onClick={() => setASubmitted(true)}
            disabled={!aChoice}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              aChoice
                ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            Confirm my choice
          </button>
        </div>

        {mode === "auditor" && aSubmitted && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Plan selected
            </div>
            <p className="text-muted-foreground">
              The two options are semantically equal — both grant or decline a 20% discount —
              but the gain-framed option&rsquo;s DOM subtree carries{" "}
              <strong className="text-foreground">{EXTRA_NODES} extra nodes</strong> (a gradient
              colour-wrapper, a &ldquo;Best deal&rdquo; badge overlay, and two icon nodes) that the
              loss-framed subtree lacks: ratio{" "}
              <strong className="font-mono text-red-500">{RATIO.toFixed(2)} &gt; {TAU.toFixed(1)}</strong>.
              The gain radio is also <strong className="text-foreground">pre-checked at load</strong>{" "}
              (State = True with zero user events), and the loss pole&rsquo;s outcome is never priced —
              you cannot compare what skipping actually costs.
            </p>
            <p className="text-muted-foreground">
              The structure itself argues for the gain pole before you read a single word: the
              interface weights the business-favorable option with markup, pre-selects it, and
              leaves the user-favorable alternative bare and unquantified. Per Prospect Theory,
              this asymmetric structure shifts the baseline of the decision.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
