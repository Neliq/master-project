"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2, Gift } from "lucide-react";

/*
 * Forced Grace Period — Condition 2: Visual Conspicuity of Cancellation
 * Affordance
 *
 * Thesis: S(N_cancel) is the composite visual salience of the cancellation
 * or opt-out vector during the mandatory waiting window — the product of its
 * bounding-box area, contrast ratio, and font-weight multiplier, normalized
 * to [0,1]. The feature triggers if the cancellation affordance is rendered
 * at a conspicuity systematically inferior to the confirmation/renewal
 * prompt N_confirm, weighted by a tolerance ratio δ_salience:
 *
 *   S(N_cancel) / S(N_confirm) < δ_salience
 *
 * Variant A (dark): the renewal prompt ("Keep my subscription") is a large,
 * high-contrast, bold button (S = 1.00) while the cancellation affordance
 * ("Cancel anyway") is an 8px low-contrast link (S ≈ 0.01) — the ratio
 * collapses below δ_salience. Variant B (benign): both actions render as
 * equal full-size buttons (ratio = 1.0) and the offer is stated plainly
 * with a concrete term.
 */

// N_confirm — the renewal prompt: 280×44, contrast 7.0:1, weight 700.
const AREA_CONFIRM = 280 * 44; // 12320
const CONTRAST_CONFIRM = 7.0;
const WEIGHT_CONFIRM = 700;
const SALIENCE_CONFIRM = 1.0; // normalized reference

// N_cancel — dark variant: 110×12, contrast 1.15:1, weight 400.
const AREA_CANCEL_DARK = 110 * 12; // 1320
const CONTRAST_CANCEL_DARK = 1.15;
const WEIGHT_CANCEL_DARK = 400;
const SALIENCE_CANCEL_DARK =
  (AREA_CANCEL_DARK / AREA_CONFIRM) *
  (CONTRAST_CANCEL_DARK / CONTRAST_CONFIRM) *
  (WEIGHT_CANCEL_DARK / WEIGHT_CONFIRM); // ≈ 0.01

const RATIO_DARK = SALIENCE_CANCEL_DARK / SALIENCE_CONFIRM; // ≈ 0.010
const RATIO_BENIGN = 1.0;
const DELTA_SALIENCE = 0.3;

type Choice = null | "keep" | "cancel";

export function ForcedGracePeriodCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [choiceA, setChoiceA] = React.useState<Choice>(null);
  const [choiceB, setChoiceB] = React.useState<Choice>(null);

  const reset = () => {
    setChoiceA(null);
    setChoiceB(null);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">S(N_confirm) — renewal prompt</span>
        <span className="font-mono font-semibold tabular-nums">{SALIENCE_CONFIRM.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">S(N_cancel) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{SALIENCE_CANCEL_DARK.toFixed(3)} (area × contrast × weight)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Ratio (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{RATIO_DARK.toFixed(3)} &lt; &delta; ({DELTA_SALIENCE}) → fired</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Ratio (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{RATIO_BENIGN.toFixed(2)} ≥ &delta;</span>
      </div>
    </>
  ) : null;

  const salienceBars = (cancelSalience: number, accent: "rose" | "emerald") => (
    <div className="space-y-1.5">
      <div>
        <div className="flex items-center justify-between text-[8px] text-muted-foreground">
          <span className="font-mono">{mode === "auditor" ? "S(N_confirm) — “Keep my subscription”" : "Keep my subscription"}</span>
          <span className="font-mono tabular-nums">{mode === "auditor" ? SALIENCE_CONFIRM.toFixed(2) : ""}</span>
        </div>
        <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
          <div className="h-full rounded-full bg-foreground/60" style={{ width: "100%" }} />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between text-[8px] text-muted-foreground">
          <span className="font-mono">{mode === "auditor" ? "S(N_cancel) — “Cancel anyway”" : "Cancel plan"}</span>
          <span className={`font-mono tabular-nums ${accent === "rose" ? "text-red-500" : "text-green-500"}`}>
            {mode === "auditor" ? cancelSalience.toFixed(2) : ""}
          </span>
        </div>
        <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
          <div
            className={`h-full rounded-full ${accent === "rose" ? "bg-red-500" : "bg-green-500"}`}
            style={{ width: `${Math.max(1, Math.round(cancelSalience * 100))}%` }}
          />
        </div>
      </div>
    </div>
  );

  const dialog = (
    accent: "rose" | "emerald",
    cancelNode: React.ReactNode,
    onKeep: () => void,
    oneTimeFraming: boolean
  ) => (
    <div className="rounded-md border bg-card p-3">
      <div className="flex items-center gap-1.5">
        <Gift className={`size-3.5 ${accent === "rose" ? "text-red-500" : "text-green-500"}`} />
        <h3 className="text-[11px] font-semibold">We&rsquo;re sorry to see you go!</h3>
      </div>
      <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">
        Your plan stays active until Sep 14.{" "}
        {oneTimeFraming ? (
          <>
            Before you leave, we&rsquo;ve unlocked a one-time offer:{" "}
            <strong className="text-foreground">50% off for the next 3 months</strong>.
          </>
        ) : (
          <>
            If you&rsquo;d like to stay, you can keep your current rate:{" "}
            <strong className="text-foreground">50% off for the next 3 months</strong>{" "}
            (through Dec 14, no hidden terms).
          </>
        )}
      </p>

      {/* N_confirm — the confirmation/renewal prompt. */}
      <button
        onClick={onKeep}
        className={`mt-2.5 w-full rounded-md py-2.5 text-[10px] font-bold text-white shadow-sm transition-colors cursor-pointer ${
          accent === "rose" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        Keep my subscription — 50% off
      </button>

      {/* N_cancel — the cancellation affordance under test. */}
      <div className="mt-1.5">{cancelNode}</div>

      <div className="mt-2.5 border-t border-border pt-2">
        {salienceBars(accent === "rose" ? SALIENCE_CANCEL_DARK : 1.0, accent)}
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Forced Grace Period: Visual Conspicuity of Cancellation Affordance"
      userTitle="Harbor — Cancellation details"
      caption="Visual Conspicuity of Cancellation Affordance — during the mandatory waiting window, the cancellation vector is rendered at a conspicuity far below the renewal prompt."
      auditorStats={stats}
      deltaNote="Both dialogs carry the same renewal offer and the same cancellation action. In Variant A the offer is framed as “we've unlocked a one-time offer” and the cancellation affordance renders as an 8px low-contrast link — S(N_cancel) ≈ 0.01 vs S(N_confirm) = 1.00, so the salience ratio collapses below δ_salience = 0.3. In Variant B the same offer is stated plainly with a concrete term and both actions render as equal full-size buttons (ratio 1.0)."
      benign={
        <div className="space-y-3">
          {dialog(
            "emerald",
            <button
              onClick={() => setChoiceB("cancel")}
              className="w-full rounded-md bg-foreground/85 hover:bg-foreground py-2.5 text-[10px] font-bold text-background shadow-sm transition-colors cursor-pointer"
            >
              Continue with cancellation
            </button>,
            () => setChoiceB("keep"),
            false
          )}
          {choiceB === "keep" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <CheckCircle2 className="size-3" />
                Choice made with equal salience
              </div>
              <p className="text-muted-foreground mt-0.5">
                You weighed the offer against a cancellation button of identical size,
                contrast, and weight —{" "}
                <span className="font-mono text-foreground">S(N_cancel)/S(N_confirm) = 1.00 ≥ δ (0.30)</span>.
                Staying was your decision, not the only visible option.
              </p>
            </div>
          )}
          {choiceB === "cancel" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <CheckCircle2 className="size-3" />
                Cancellation — one glance away
              </div>
              <p className="text-muted-foreground mt-0.5">
                The cancel action was a full-size button right next to the renewal prompt —
                you never had to hunt for it. No trigger: the salience ratio is 1.0.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {dialog(
          "rose",
          <div className="text-center">
            <button
              onClick={() => setChoiceA("cancel")}
              className="text-[8px] font-normal text-muted-foreground/40 underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:text-red-500 cursor-pointer"
            >
              Cancel anyway
            </button>
            <p className="mt-0.5 text-[7px] text-muted-foreground/30">
              Cancel anytime
            </p>
          </div>,
          () => setChoiceA("keep"),
          true
        )}
        {choiceA === "keep" && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <AlertTriangle className="size-3" />
              Request saved
            </div>
            <p className="text-muted-foreground">
              You stayed — and the interface made sure staying was the only thing you could
              see. <span className="font-mono text-foreground">
                S(N_cancel)/S(N_confirm) = {RATIO_DARK.toFixed(3)} &lt; δ_salience ({DELTA_SALIENCE})
              </span>: the cancellation link&rsquo;s area × contrast × weight salience was ~1% of
              the renewal button&rsquo;s.
            </p>
            <p className="text-muted-foreground">
              The cancellation path existed — it was rendered at conspicuity so low that
              most users never register it during the grace window.
            </p>
          </div>
        )}
        {choiceA === "cancel" && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <AlertTriangle className="size-3" />
              Cancellation confirmed
            </div>
            <p className="text-muted-foreground">
              You cancelled, but you had to hunt for an 8px gray link to do it. The salience
              ratio {RATIO_DARK.toFixed(3)} &lt; {DELTA_SALIENCE} means the opt-out vector was
              systematically demoted below the confirmation prompt during the waiting window.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
