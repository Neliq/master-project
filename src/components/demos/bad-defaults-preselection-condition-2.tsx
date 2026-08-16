"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Bad Defaults / Preselection — Condition 2: Visual or Structural Obfuscation
 *
 * Thesis: N_submit is the primary progression node (e.g. the "Register" or
 * "Checkout" button). V(c, t_0) evaluates whether the pre-selected node c
 * is rendered inside the visible viewport at t_0 — not hidden in a
 * collapsed accordion or pushed below the fold. d_spatial(c, N_submit) is
 * the Euclidean distance between the checkbox and the submit button. The
 * feature triggers if the pre-selected node is hidden from immediate visual
 * parsing, landing outside the user's peripheral-vision threshold
 * τ_peripheral_vision:
 *
 *   V(c, t_0) = False  ∨  d_spatial(c, N_submit) > τ_peripheral_vision
 *
 * Variant A (dark): the pre-checked consent hides inside a collapsed
 * accordion, spatially far from the submit button.
 * Variant B (benign): the same consent sits visible, unchecked, right next
 * to the submit button.
 */

const TAU_PERIPHERAL = 160; // τ_peripheral_vision in px (illustrative)

export function BadDefaultsPreselectionCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Variant A: pre-checked consent hidden in a collapsed accordion.
  const [aConsent, setAConsent] = React.useState(true);
  const [aExpanded, setAExpanded] = React.useState(false);
  const [aSubmitted, setASubmitted] = React.useState(false);
  // Variant B: visible, unchecked consent above the submit button.
  const [bConsent, setBConsent] = React.useState(false);
  const [bSubmitted, setBSubmitted] = React.useState(false);

  const reset = () => {
    setAConsent(true);
    setAExpanded(false);
    setASubmitted(false);
    setBConsent(false);
    setBSubmitted(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">V(c, t₀) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">False (collapsed accordion)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">d_spatial(c, N_submit) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">~{260}px &gt; {TAU_PERIPHERAL}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">V(c, t₀) — benign</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">True (visible viewport)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">d_spatial(c, N_submit) — benign</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">~24px &lt; {TAU_PERIPHERAL}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Bad Defaults / Preselection: Visual or Structural Obfuscation"
      caption="Visual or Structural Obfuscation — the pre-checked consent is hidden inside a collapsed accordion far from the submit button, so it escapes peripheral vision entirely."
      auditorStats={stats}
      deltaNote="In Variant A the pre-checked consent sits inside a collapsed accordion: V(c, t₀) = False and d_spatial(c, N_submit) ≈ 260px > τ_peripheral_vision = 160px, so it is never visually parsed. Variant B places the same consent — unchecked — directly above the submit button at ≈ 24px."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Create your account</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              One optional consent, right where you can see it.
            </p>
            <div className="mt-2.5 space-y-2">
              <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 transition-colors">
                <input
                  type="checkbox"
                  checked={bConsent}
                  onChange={(e) => setBConsent(e.target.checked)}
                  className="mt-0.5 flex-shrink-0 accent-emerald-500"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                    I agree to receive promotional emails from our partners
                  </div>
                  <div className="text-[8px] text-muted-foreground/60 mt-0.5">
                    Visible, unchecked, ~24px from the button — V(c, t₀) = True
                  </div>
                </div>
              </label>
              <button
                onClick={() => setBSubmitted(true)}
                className="w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Create account (N_submit)
              </button>
            </div>
            {bSubmitted && (
              <div className="mt-2.5 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Nothing hidden
                </div>
                <p className="text-muted-foreground mt-0.5">
                  The consent sat in plain view at submit time —{" "}
                  <strong className="text-foreground">
                    {bConsent ? "you left it checked, so consent was given." : "you saw it unchecked and submitted with no consent."}
                  </strong>{" "}
                  V(c, t₀) = True and d_spatial = ~24px &lt; τ_peripheral_vision.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border-2 border-rose-500/50 bg-card p-3">
          <h3 className="text-[11px] font-semibold">Create your account</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Nothing to read — just hit the button.
          </p>
          <div className="mt-2.5 space-y-2">
            <button
              onClick={() => setASubmitted(true)}
              className="w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Create account (N_submit)
            </button>
            <details
              open={aExpanded}
              onToggle={(e) => setAExpanded(e.currentTarget.open)}
              className="rounded-md border border-rose-500/30 bg-rose-500/5"
            >
              <summary className="cursor-pointer px-2.5 py-2 text-[9px] font-medium text-muted-foreground hover:text-foreground transition-colors select-none">
                Show optional preferences (collapsed — below the fold)
              </summary>
              <div className="border-t border-rose-500/20 p-2.5">
                <label className="flex items-start gap-2 cursor-pointer group rounded-md border border-rose-500/30 bg-background p-2 transition-colors">
                  <input
                    type="checkbox"
                    checked={aConsent}
                    onChange={(e) => setAConsent(e.target.checked)}
                    className="mt-0.5 flex-shrink-0 accent-rose-500"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                      I agree to receive promotional emails from our partners
                    </div>
                    <div className="text-[8px] text-muted-foreground/60 mt-0.5">
                      Pre-checked, hidden at t₀ — V(c, t₀) = False
                    </div>
                  </div>
                </label>
              </div>
            </details>
          </div>
          {aSubmitted && (
            <div className="mt-2.5 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Invisible consent captured
              </div>
              <p className="text-muted-foreground">
                {aExpanded
                  ? "You opened the accordion, but the box was already checked — and most users never even expand it."
                  : "You never saw it."}{" "}
                <strong className="text-foreground">
                  V(c, t₀) = False
                </strong>{" "}
                (hidden inside a collapsed accordion) and{" "}
                <strong className="text-foreground">
                  d_spatial(c, N_submit) ≈ 260px &gt; τ_peripheral_vision = {TAU_PERIPHERAL}px
                </strong>
                . The checkbox sits outside your peripheral vision at submit time —{" "}
                {aConsent
                  ? "you consented to partner emails by default without ever parsing the option."
                  : "you happened to uncheck it, but only because you dug it out."}
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
