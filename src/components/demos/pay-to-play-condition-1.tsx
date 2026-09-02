"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Pay-To-Play — Condition 1: Exponential Friction and Paid Bypass
 *
 * Thesis: E_free(L_i), the effort required to progress through stage L_i
 * without spending currency, is scaled exponentially by the system (c^i)
 * to induce frustration, while the paid bypass E_paid(L_i) after a fiat
 * transaction T_usd collapses to a trivial constant O(1):
 *
 *   E_free(L_i) ∝ c^i (c > 1)  ∧  E_paid(L_i) = O(1)
 *
 * Variant A (dark): the "free" path needs 2^i harvest taps per stage,
 * while a $4.99 skip completes the stage in a single click.
 * Variant B (benign): the free path needs only i+1 taps per stage —
 * effort grows gently, so no paid bypass is ever attractive.
 */

const STAGE_NAMES = ["Sprout", "Sapling", "Orchard", "Harvest", "Banquet", "Empire"];

/** Stage requirements for a given taps-per-stage function. */
function stageProgress(
  taps: number,
  need: (stage: number) => number
): { stage: number; progress: number; required: number } {
  let remaining = taps;
  let stage = 0;
  let req = need(0);
  while (remaining >= req) {
    remaining -= req;
    stage += 1;
    req = need(stage);
  }
  return { stage, progress: remaining, required: req };
}

const needDark = (s: number) => Math.pow(2, s);
const needBenign = (s: number) => s + 1;

export function PayToPlayCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [taps, setTaps] = React.useState(0);
  const [darkTaps, setDarkTaps] = React.useState(0);
  const [skips, setSkips] = React.useState(0);

  const reset = () => {
    setTaps(0);
    setDarkTaps(0);
    setSkips(0);
  };

  const dark = stageProgress(darkTaps, needDark);
  const benign = stageProgress(taps, needBenign);
  const revealed = taps >= 15;

  const skipStage = () => {
    setSkips((s) => s + 1);
    setDarkTaps((t) => t + (needDark(dark.stage) - dark.progress));
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Stage L_i (dark)</span>
        <span className="font-mono font-semibold tabular-nums">{dark.stage}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">E_free(L_i) = c^i</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{needDark(dark.stage)} taps</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">E_paid(L_i) = O(1)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">1 tap ($4.99)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">E_free / E_paid</span>
        <span className="font-mono font-semibold tabular-nums">{needDark(dark.stage)}×</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pay-To-Play: Exponential Friction and Paid Bypass"
      userTitle="Harvest Valley"
      caption="Exponential Friction and Paid Bypass — the free path demands exponentially more taps per stage (c^i), while the paid bypass collapses the same stage to a single click (O(1))."
      auditorStats={stats}
      deltaNote="Both variants show the same farm and the same tap counter — only the effort curve differs. In Variant A the free path needs 2^i taps per stage while a $4.99 skip finishes the stage in one click, so the microtransaction becomes the only sane escape. In Variant B the free path needs i+1 taps per stage, so effort stays trivial and no paid bypass is offered."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Harvest Valley</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Tap to tend your farm. Each stage needs a few taps — nothing more.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Fair effort
              </div>
            </div>

            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground">Stage {benign.stage + 1} — {STAGE_NAMES[Math.min(benign.stage, STAGE_NAMES.length - 1)]}</span>
                <span className="font-mono tabular-nums">{benign.progress}/{benign.required} taps</span>
              </div>
              <div className="bg-foreground/10 h-2.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full transition-all" style={{ width: `${Math.min(100, (benign.progress / benign.required) * 100)}%` }} />
              </div>
            </div>

            <button
              onClick={() => setTaps((t) => t + 1)}
              className="mt-2 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Tend farm (+1 tap)
            </button>
          </div>

          {revealed && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Effort matches value
              </div>
              <p className="text-muted-foreground mt-0.5">
                After {taps} taps you are on stage {benign.stage + 1}, needing just{" "}
                <span className="font-mono tabular-nums">{benign.required}</span> more taps. The work stays
                manageable from one stage to the next, so there is no reason to pay and no paid bypass is offered.
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
              <h3 className="text-[11px] font-semibold">Harvest Valley</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Tap to tend your farm. The free path gets… steeper. Much steeper.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Free · slow
            </div>
          </div>

          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground">Stage {dark.stage + 1} — {STAGE_NAMES[Math.min(dark.stage, STAGE_NAMES.length - 1)]}</span>
              <span className="font-mono tabular-nums">{dark.progress}/{dark.required} taps</span>
            </div>
            <div className="bg-foreground/10 h-2.5 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full transition-all" style={{ width: `${Math.min(100, (dark.progress / dark.required) * 100)}%` }} />
            </div>
          </div>

          <button
            onClick={() => setDarkTaps((t) => t + 1)}
            className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Tend farm (+1 tap)
          </button>

          {dark.stage >= 2 && (
            <button
              onClick={skipStage}
              className="mt-2 w-full rounded-md border border-yellow-500/40 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              ⚡ Skip this stage instantly — $4.99
            </button>
          )}
          {dark.stage >= 2 && (
            <p className="text-[8px] text-muted-foreground/60 mt-1">
              Keep tending your farm to reach the next stage.
            </p>
          )}
        </div>

        {mode === "auditor" && (darkTaps >= 15 || skips > 0) && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Skip available
            </div>
            <p className="text-muted-foreground">
              After {darkTaps} taps the free path demands <strong className="text-red-500">{needDark(dark.stage)} taps</strong>{" "}
              for stage {dark.stage + 1} (E_free(L_i) ∝ c^i, c = 2), while the $4.99 skip needs exactly{" "}
              <strong className="text-green-500">1 tap</strong> (E_paid(L_i) = O(1)){skips > 0 ? " — you used it." : "."}
              The effort curve is algorithmically inflated so the microtransaction becomes the
              rational escape, monetizing your time as a captive resource.
            </p>
            {skips > 0 && (
              <p className="text-muted-foreground">
                You spent <strong className="text-foreground">{skips} × $4.99</strong> to bypass friction the
                game itself manufactured.
              </p>
            )}
          </div>
        )}
      </div>
    </DemoShell>
  );
}
