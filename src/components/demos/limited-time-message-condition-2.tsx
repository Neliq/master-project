"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Limited Time Message — Condition 2: Visual Salience of Temporal-Urgency Chromatics
 *
 * Thesis: the offer container C_offer is inspected for the co-occurrence of
 * a time-constrained claim and high-saturation, warm-spectrum color styling.
 * The feature triggers if the dominant accent color falls within the urgency
 * spectrum and the text matches a temporal-scarcity pattern:
 *
 *   Hue(C_offer) ∈ [0°, 45°]  ∧  Match(T(C_offer), Pattern_temporal) = True
 *
 * Variant A (dark): temporal-scarcity copy painted in the urgency spectrum
 * (hue ≈ 15°) — a compound visual-linguistic urgency signal.
 * Variant B (benign): identical copy on a neutral palette (hue ≈ 210°) —
 * the compound signal never forms.
 */

export function LimitedTimeMessageCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [probed, setProbed] = React.useState(false);
  const [added, setAdded] = React.useState(false);

  const reset = () => {
    setProbed(false);
    setAdded(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Hue(C_offer) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">15° ∈ [0°, 45°]</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Hue(C_offer) — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">210° ∉ [0°, 45°]</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Match(T, Pattern_temporal)</span>
        <span className="font-mono font-semibold tabular-nums">“ends in” → True</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Compound signal</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">dark: active</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Limited Time Message: Visual Salience of Temporal-Urgency Chromatics"
      caption="Visual Salience of Temporal-Urgency Chromatics — a warm-spectrum accent (hue 0°–45°) co-occurring with a temporal-scarcity claim (“ends in”, “only today”) creates a compound visual-linguistic urgency signal."
      auditorStats={stats}
      deltaNote="Both variants carry identical urgency copy — only the palette differs. Variant A paints the offer container in the urgency spectrum (hue ≈ 15°), satisfying the co-occurrence condition; Variant B uses a neutral hue (≈ 210°), so the same claim never triggers the compound signal."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div data-dp-color-signal className="rounded-md border border-blue-200 bg-blue-100 px-3 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-900">Flash sale — 50% off</div>
                <div className="rounded-full bg-blue-200 px-2 py-0.5 text-[8px] font-mono font-semibold text-blue-900">hue ≈ 210°</div>
              </div>
              <div className="mt-1.5 text-[10px] font-semibold text-blue-900">Only today — ends in 4 hours</div>
              <div className="mt-0.5 text-[9px] leading-relaxed text-blue-900/70">
                Don&rsquo;t miss it. Full-price customers pay double.
              </div>
            </div>

            <button
              onClick={() => setProbed(true)}
              className="mt-2.5 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Inspect offer container (hue probe)
            </button>

            {probed && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed font-mono">
                <div className="font-semibold text-green-700 dark:text-green-300">Hue(C_offer) = 210° ∉ [0°, 45°] ✗</div>
                <div className="text-muted-foreground">Match(T(C_offer), “ends in | only today”) = True ✓</div>
                <div className="text-muted-foreground mt-1">Conjunction fails — no compound urgency signal.</div>
              </div>
            )}

            <button
              onClick={() => setAdded(true)}
              className="mt-2 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Add to cart — 50% off
            </button>
          </div>

          {added && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Added — decision on the price alone
              </div>
              <p className="text-muted-foreground mt-0.5">
                The offer was evaluated on its factual content: the same copy, a neutral
                palette, no warm-spectrum urgency. Nothing in the container amplifies arousal.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div data-dp-color-signal className="rounded-md bg-orange-600 px-3 py-2.5 text-white" style={{ backgroundColor: "hsl(15 85% 45%)" }}>
            <div className="flex items-center justify-between gap-2">
              <div className="text-[10px] font-bold uppercase tracking-wider">Flash sale — 50% off</div>
              <div className="rounded-full bg-white/25 px-2 py-0.5 text-[8px] font-mono font-semibold">hue ≈ 15°</div>
            </div>
            <div className="mt-1.5 text-[10px] font-semibold">Only today — ends in 4 hours</div>
            <div className="mt-0.5 text-[9px] leading-relaxed text-white/85">
              Don&rsquo;t miss it. Full-price customers pay double.
            </div>
          </div>

          <button
            onClick={() => setProbed(true)}
            className="mt-2.5 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Inspect offer container (hue probe)
          </button>

          {probed && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed font-mono">
              <div className="font-semibold text-yellow-700 dark:text-yellow-300">Hue(C_offer) = 15° ∈ [0°, 45°] ✓</div>
              <div className="text-muted-foreground">Match(T(C_offer), “ends in | only today”) = True ✓</div>
              <div className="text-muted-foreground mt-1">Offer ends soon</div>
            </div>
          )}

          <button
            onClick={() => setAdded(true)}
            className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Add to cart — 50% off
          </button>
        </div>

        {added && (
          <div className="rounded-md border bg-background p-2.5">
            <div className="flex items-center justify-between text-[9px]">
              <span className="font-semibold">Flash sale item</span>
              <span className="font-mono font-semibold">50% off</span>
            </div>
            <div className="mt-1 text-[8px] text-muted-foreground">Added to your cart. Checkout whenever you&rsquo;re ready.</div>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
