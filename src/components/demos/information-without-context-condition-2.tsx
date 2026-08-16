"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2, Star } from "lucide-react";

/*
 * Information Without Context — Condition 2: Visual Prominence Imbalance
 * Between Metric and Baseline
 *
 * Thesis: the orphaned metric N_metric (e.g. "98%") is rendered at a
 * disproportionately large font size and saturated color, quantified by the
 * ratio of its visual weight W(N) = fontSize(N) × contrastRatio(N) against
 * any contextual qualifier N_context in the same cluster, exceeding a balance
 * threshold τ_context_imbalance:
 *
 *   W(N_metric) / W(N_context) > τ_context_imbalance ∧ CR(N_metric, L_bg) > 7.0
 *
 * Variant A (dark): a huge saturated "98%" with no unit denominator and no
 * sample size anywhere in the cluster — the qualifier reads "of customer
 * reviews" with no count, so the metric is unanchored.
 * Variant B (benign): metric and baseline share comparable visual weight and
 * the baseline carries the full denominator ("of 12 customer reviews"), so
 * the sample size is as visible as the number.
 */

const IMBALANCE_THRESHOLD = 2.0; // τ_context_imbalance
const METRIC_WEIGHT = 11.5; // W(N_metric) = fontSize × contrastRatio
const CONTEXT_WEIGHT = 0.8; // W(N_context)
const METRIC_CR = 9.6; // contrast ratio of the metric against its background

export function InformationWithoutContextCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [bought, setBought] = React.useState(false);

  const reset = () => setBought(false);

  const ratio = (METRIC_WEIGHT / CONTEXT_WEIGHT).toFixed(1);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">W(N_metric) = size × CR</span>
        <span className="font-mono font-semibold tabular-nums">{METRIC_WEIGHT.toFixed(1)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">W(N_context) (baseline)</span>
        <span className="font-mono font-semibold tabular-nums">{CONTEXT_WEIGHT.toFixed(1)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">W(N_metric) / W(N_context)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{ratio} &gt; τ ({IMBALANCE_THRESHOLD})</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">CR(N_metric, L_bg)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{METRIC_CR} &gt; 7.0</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Information Without Context: Visual Prominence Imbalance Between Metric and Baseline"
      caption="Visual Prominence Imbalance Between Metric and Baseline — a giant saturated “98%” is rendered ~14× heavier than its 8px qualifier, and the qualifier carries no unit denominator or sample size, so the metric is unanchored and reads as a universal verdict."
      auditorStats={stats}
      deltaNote="In Variant A the metric&rsquo;s visual weight W(N_metric) is 14.4× its contextual baseline, far past τ_context_imbalance (2.0), the metric itself has a 9.6:1 contrast ratio, and the qualifier offers no denominator — “98% of customer reviews” with no count, so U_val and B_val are absent from the cluster. In Variant B metric and baseline share comparable font size, colour and contrast, and the baseline carries the full denominator (“of 12 customer reviews”), so the ratio collapses below the threshold and the sample size is legible at a glance."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-900/30">
                <Star className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-[11px] font-semibold">Glow Serum — vitamin C</h3>
                <p className="text-[9px] text-muted-foreground">Skincare · 30 ml</p>
              </div>
            </div>

            {/* metric and baseline at comparable visual weight */}
            <div className="mt-3 rounded-md bg-background border border-border p-2.5 text-center">
              <div className="text-[13px] font-semibold text-foreground">98%</div>
              <div className="text-[10px] text-foreground/70 mt-0.5">
                of 12 customer reviews rate this product 5 stars
              </div>
            </div>

            <button
              onClick={() => setBought(true)}
              className="mt-2 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Buy now — $24.99
            </button>
          </div>

          {bought && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <CheckCircle2 className="w-3 h-3" />
                Fair comparison possible
              </div>
              <p className="text-muted-foreground mt-0.5">
                The metric and its baseline share comparable visual weight, so W(N_metric) /
                W(N_context) stays under τ_context_imbalance — you could weigh “98%” against its
                sample of 12 reviews before deciding.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-rose-100 dark:bg-rose-900/30">
              <Star className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <h3 className="text-[11px] font-semibold">Glow Serum — vitamin C</h3>
              <p className="text-[9px] text-muted-foreground">Skincare · 30 ml</p>
            </div>
          </div>

          {/* N_metric: huge, saturated, high contrast */}
          <div className="mt-3 rounded-md bg-background border border-border p-2.5 text-center">
            <div className="text-[28px] font-black leading-none text-rose-500">98%</div>
            {/* N_context: unqualified — no unit denominator, no sample size */}
            <div className="text-[8px] text-muted-foreground/50 mt-1.5 leading-relaxed">
              of customer reviews rate this product 5 stars
            </div>
          </div>

          <button
            onClick={() => setBought(true)}
            className="mt-2 w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Buy now — $24.99
          </button>
        </div>

        {bought && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <AlertTriangle className="w-3 h-3" />
              Context imbalance fired
            </div>
            <p className="text-muted-foreground">
              The <strong className="text-rose-500">“98%”</strong> is rendered at 28px, font-black,
              saturated rose — W(N_metric) = {METRIC_WEIGHT.toFixed(1)} — while the qualifier
              “of customer reviews” sits at 8px in 50% gray with no count attached: W(N_context) ={" "}
              {CONTEXT_WEIGHT.toFixed(1)}. The ratio{" "}
              <strong className="text-rose-500">
                W(N_metric)/W(N_context) = {ratio} &gt; τ_context_imbalance ({IMBALANCE_THRESHOLD})
              </strong>
              , CR(N_metric, L_bg) = {METRIC_CR} &gt; 7.0, and there is no denominator in the
              cluster — the sample size behind “98%” is simply absent.
            </p>
            <p className="text-muted-foreground">
              You evaluated the offer on the emotional weight of the number, with no scale to weigh
              it against — the metric was unanchored, so the claim could not be rationally checked.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
