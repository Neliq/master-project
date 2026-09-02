"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Pressured Selling — Condition 3: High-Arousal Lexical Density
 *
 * Thesis: W(M) is the set of textual tokens rendered inside the injected
 * modal M_upsell, evaluated against D_pressure — an NLP lexicon of
 * high-arousal, urgency-inducing, FOMO trigger phrases (e.g. {"Wait!",
 * "Don't miss out", "Last chance", "Offer expires"}). The feature triggers
 * if the semantic density of pressure tokens relative to the total word
 * count exceeds an aggressive-marketing threshold τ_arousal:
 *
 *   |W(M) ∩ D_pressure| / |W(M)| > τ_arousal
 *
 * Variant A (dark): modal copy saturated with manufactured-panic phrases.
 * Variant B (benign): the same offer in neutral, informative copy.
 */

const D_PRESSURE = [
  "wait", "don't miss out", "last chance", "offer expires", "hurry",
  "act now", "only", "limited", "exclusive", "gone", "forever", "soon",
  "now or never", "before it's too late", "final call",
];

const DARK_COPY =
  "WAIT! Don't miss out! Last chance — only 3 left at this price! " +
  "Offer expires soon! Hurry, act now before this exclusive deal is gone forever! " +
  "This limited offer won't come back!";

const BENIGN_COPY =
  "You can add a two-year extended warranty for $19.99. " +
  "The price is guaranteed for the next 30 days. " +
  "You can decide now, or add it later before your order ships.";

const TAU_AROUSAL = 0.1; // aggressive marketing threshold

function countPressureTokens(text: string): number {
  const lower = text.toLowerCase();
  return D_PRESSURE.reduce((sum, phrase) => {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(escaped, "g");
    const matches = lower.match(re);
    return sum + (matches ? matches.length : 0);
  }, 0);
}

function wordCount(text: string): number {
  return text.toLowerCase().split(/\s+/).filter(Boolean).length;
}

const darkTokens = countPressureTokens(DARK_COPY);
const darkWords = wordCount(DARK_COPY);
const darkDensity = darkWords > 0 ? darkTokens / darkWords : 0;
const benignTokens = countPressureTokens(BENIGN_COPY);
const benignWords = wordCount(BENIGN_COPY);
const benignDensity = benignWords > 0 ? benignTokens / benignWords : 0;

export function PressuredSellingCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [darkDecision, setDarkDecision] = React.useState<null | "accepted" | "declined">(null);
  const [benignDecision, setBenignDecision] = React.useState<null | "accepted" | "declined">(null);

  const reset = () => {
    setDarkDecision(null);
    setBenignDecision(null);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|W(M) ∩ D_pressure| (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{darkTokens}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|W(M)| (dark)</span>
        <span className="font-mono font-semibold tabular-nums">{darkWords} words</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Pressure density (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">
          {darkDensity.toFixed(3)} &gt; {TAU_AROUSAL}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Pressure density (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">
          {benignDensity.toFixed(3)}
        </span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pressured Selling: High-Arousal Lexical Density"
      caption="High-Arousal Lexical Density — the modal's copy is saturated with FOMO trigger phrases so the density of pressure tokens exceeds the aggressive-marketing threshold."
      auditorStats={stats}
      deltaNote={`Both modals sell the same $19.99 warranty, but Variant A packs ${darkTokens} pressure tokens into ${darkWords} words (density ${darkDensity.toFixed(3)} > τ_arousal = ${TAU_AROUSAL}), while Variant B uses neutral copy with density ${benignDensity.toFixed(3)}. Only the words changed — the offer and buttons are identical.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Extend your coverage</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5 leading-relaxed">
                  {BENIGN_COPY}
                </p>
              </div>
              <div className="shrink-0 rounded-full border border-green-500/30 px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                Neutral copy
              </div>
            </div>

            {benignDecision === null ? (
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setBenignDecision("accepted")}
                  className="rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  Add for $19.99
                </button>
                <button
                  onClick={() => setBenignDecision("declined")}
                  className="rounded-md border border-border bg-background hover:bg-muted py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  No thanks
                </button>
              </div>
            ) : (
              <div className="mt-2.5 rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[9px] text-green-700 dark:text-green-300">
                {benignDecision === "accepted"
                  ? "Warranty added. Coverage will be included with this order."
                  : "Declined. The warranty was not added to this order."}
              </div>
            )}
          </div>
          {mode === "auditor" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[8px] text-muted-foreground">
              Density check: {benignTokens} pressure tokens / {benignWords} words ={" "}
              <span className="font-mono tabular-nums">{benignDensity.toFixed(3)}</span> — below{" "}
              τ_arousal = {TAU_AROUSAL}.
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border-2 border-red-500/50 bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">
                <span className="text-red-600 dark:text-red-400">WAIT!</span>{" "}Don&rsquo;t miss out!
              </h3>
              <p className="text-[9px] text-muted-foreground mt-0.5 leading-relaxed">
                {DARK_COPY}
              </p>
            </div>
            <div className="shrink-0 rounded-full border border-red-500/40 bg-red-500/10 px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
              Limited-time offer
            </div>
          </div>

          {darkDecision === null ? (
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <button
                onClick={() => setDarkDecision("accepted")}
                className="rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Add for $19.99
              </button>
              <button
                onClick={() => setDarkDecision("declined")}
                className="rounded-md border border-border bg-background hover:bg-muted py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                No thanks
              </button>
            </div>
          ) : (
            <div className="mt-2.5 rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[9px] text-green-700 dark:text-green-300">
              {darkDecision === "accepted"
                ? "Warranty added. It will appear in your order summary."
                : "Declined. The warranty was not added to this order."}
            </div>
          )}
        </div>

        {mode === "auditor" && darkDecision !== null && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Lexical pressure confirmed
            </div>
            <p className="text-muted-foreground">
              NLP evaluation of <span className="font-mono">W(M)</span>:{" "}
              <strong className="text-foreground">
                |W(M) ∩ D_pressure| / |W(M)| = {darkTokens} / {darkWords} ={" "}
                {darkDensity.toFixed(3)} &gt; τ_arousal = {TAU_AROUSAL}
              </strong>
              . Phrases like &ldquo;Wait!&rdquo;, &ldquo;Don&rsquo;t miss out&rdquo; and
              &ldquo;Offer expires&rdquo; are direct hits in the D_pressure lexicon — the copy
              is actively manufacturing panic, not informing.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
