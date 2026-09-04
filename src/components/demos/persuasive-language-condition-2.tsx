"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Persuasive Language — Condition 2: Visual Emphasis Asymmetry on Coercive Text
 *
 * Thesis: the algorithm evaluates whether emotionally manipulative text
 * nodes receive disproportionate typographic emphasis. N_coercive is the
 * subset of text nodes flagged by NLP as containing pressure-language
 * (e.g. "Act Now", "Don't Miss Out") and N_neutral is the remainder. The
 * feature triggers if the mean font weight, color saturation, or
 * bounding-box area of coercive nodes exceeds that of neutral nodes by a
 * bias multiplier tau_emphasis:
 *
 *   fontWeight(N_coercive) / fontWeight(N_neutral) > tau_emphasis
 *       OR  A(N_coercive) / A(N_neutral) > tau_emphasis
 *
 * Variant A (dark): "DON'T MISS OUT — ACT NOW!" is set in weight 800,
 * uppercase, saturated red, occupying ~3.8x the area of the neutral copy.
 * Variant B (benign): the same information is set with uniform typography
 * (weight ratio 1.0).
 */

const FW_COERCIVE = 800;
const FW_NEUTRAL = 400;
const AREA_RATIO_DARK = 3.8;
const TAU_EMPHASIS = 1.5;
const FW_RATIO = FW_COERCIVE / FW_NEUTRAL;

export function PersuasiveLanguageCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [darkChoice, setDarkChoice] = React.useState<null | "subscribe" | "not-now">(null);
  const [benignChoice, setBenignChoice] = React.useState<null | "subscribe" | "not-now">(null);


  return (
    <DemoShell mode={mode}
      title="Persuasive Language: Visual Emphasis Asymmetry on Coercive Text"
      caption="Visual Emphasis Asymmetry on Coercive Text — pressure-language is typographically amplified far beyond the neutral copy that carries the actual facts."
      deltaNote="In Variant A the coercive text 'DON'T MISS OUT — ACT NOW!' is set in weight 800 vs 400 for the neutral copy (ratio 2.0 > tau_emphasis = 1.5) and occupies ~3.8x the bounding-box area in saturated red. In Variant B the exact same information is typeset uniformly (weight ratio 1.0), so no text node is typographically privileged."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Special offer</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Our standard plan costs $9.99/month. Cancel anytime.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Standard presentation
              </div>
            </div>

            {/* Uniform typography: no node shouts louder than another. */}
            <p className="mt-3 text-[10px] font-semibold text-foreground">
              Special offer — subscribe today
            </p>
            <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">
              Subscribe and save 40% on the annual plan. The standard plan costs $9.99/month and you
              can cancel anytime.
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setBenignChoice("not-now")}
                className="rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
              >
                Not now
              </button>
              <button
                onClick={() => setBenignChoice("subscribe")}
                className="rounded-md bg-green-600 hover:bg-green-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
              >
                Subscribe &amp; save 40%
              </button>
            </div>
          </div>

          {mode === "user" && benignChoice && (
            <div className="rounded-md border border-border bg-muted/30 p-2.5 text-[9px] leading-relaxed">
              <div className="font-semibold uppercase tracking-tight">
                {benignChoice === "subscribe" ? "Subscription started" : "Offer dismissed"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                {benignChoice === "subscribe" ? "Your annual plan is ready to activate." : "No changes were made to your plan."}
              </p>
            </div>
          )}

          {mode === "auditor" && benignChoice && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {benignChoice === "subscribe" ? "Subscribed" : "Dismissed"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                The persuasive copy and the factual copy share the same typography: weight ratio 1.0,
                equal area, no color saturation. The offer stands on its own merits — emphasis does not
                do the persuading.
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
              <h3 className="text-[11px] font-semibold">Special offer</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Our standard plan costs $9.99/month. Cancel anytime.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Featured presentation
            </div>
          </div>

          {/* Coercive text node: weight 800, uppercase, saturated, area ~3.8x. */}
          <div className="mt-3 rounded-md bg-red-500/10 border border-red-500/30 p-2.5">
            <p className="text-[12px] font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400">
              DON&rsquo;T MISS OUT — ACT NOW!
            </p>
            <p className="mt-1 text-[8px] font-bold uppercase tracking-wide text-red-500/80">
              This is the deal of the year. Grab it before it&rsquo;s gone!
            </p>
          </div>
          <p className="mt-2 text-[9px] leading-relaxed text-muted-foreground">
            Subscribe and save 40% on the annual plan. Offer available for a limited time; the standard
            plan costs $9.99/month and you can cancel anytime.
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => setDarkChoice("not-now")}
              className="rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
            >
              Not now
            </button>
            <button
              onClick={() => setDarkChoice("subscribe")}
              className="rounded-md bg-red-600 hover:bg-red-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
            >
              Subscribe &amp; save 40%
            </button>
          </div>
        </div>

        {mode === "user" && darkChoice && (
          <div className="rounded-md border border-border bg-muted/30 p-2.5 text-[9px] leading-relaxed">
            <div className="font-semibold uppercase tracking-tight">
              {darkChoice === "subscribe" ? "Subscription started" : "Offer dismissed"}
            </div>
            <p className="text-muted-foreground mt-0.5">
              {darkChoice === "subscribe" ? "Your annual plan is ready to activate." : "No changes were made to your plan."}
            </p>
          </div>
        )}

        {mode === "auditor" && darkChoice && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Offer added
            </div>
            <p className="text-muted-foreground">
              {darkChoice === "subscribe" ? "You subscribed — the shouting copy led the way. " : "You dismissed it, but the typography was still screaming. "}
              The coercive text node is set at <strong className="text-foreground">font-weight {FW_COERCIVE}</strong>{" "}
              vs <strong className="text-foreground">{FW_NEUTRAL}</strong> on the neutral copy — a ratio
              of <strong className="text-red-500">{FW_RATIO.toFixed(1)} &gt; {TAU_EMPHASIS}</strong> — and
              occupies roughly <strong className="text-foreground">{AREA_RATIO_DARK}x</strong> the
              bounding-box area in saturated red.
            </p>
            <p className="text-muted-foreground">
              The facts never change: $9.99/month, cancel anytime. Only the emphasis is asymmetric — and
              that asymmetry is the manipulation.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
