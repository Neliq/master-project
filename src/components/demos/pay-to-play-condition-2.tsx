"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Pay-To-Play — Condition 2: Visual Dominance of Payment-Unlock Overlays
 *
 * Thesis: locked-content regions C_locked carry unlock-prompt overlays
 * O_unlock. The feature triggers if the payment overlay occludes more than
 * a fraction τ_occlusion of the viewport, or if its dismiss affordance
 * N_dismiss is below the WCAG minimum touch-target size (44 × 44 px):
 *
 *   A(O_unlock)/A_viewport > τ_occlusion  ∨  A(N_dismiss) < 44 × 44
 *
 * Variant A (dark): a full-bleed paywall overlay that dominates the panel,
 * whose only dismiss control is a 16 × 16 px "×".
 * Variant B (benign): the same locked content with a compact inline
 * payment row and a 44 × 44 px dismiss target.
 */

const EPISODE_TITLE = "Episode 4: The Heist";

export function PayToPlayCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [purchased, setPurchased] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  const reset = () => {
    setPurchased(false);
    setDismissed(false);
  };

  const revealed = purchased || dismissed;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(O_unlock)/A_viewport (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">≈ 0.95 &gt; τ</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A(O_unlock)/A_viewport (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">≈ 0.28</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Dismiss target A(N_dismiss)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">16×16 px &lt; 44×44</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Paywall dismissed?</span>
        <span className="font-mono font-semibold tabular-nums">{dismissed ? "Yes" : "No"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pay-To-Play: Visual Dominance of Payment-Unlock Overlays"
      caption="Visual Dominance of Payment-Unlock Overlays — the paywall covers nearly the whole viewport and its dismiss control is a 16×16 px sliver, far below the 44×44 px WCAG minimum."
      auditorStats={stats}
      deltaNote="Both variants gate the same episode behind the same $3.99. Variant A renders the payment prompt as a full-bleed overlay with a 16×16 px dismiss '×' (occlusion ≈ 0.95 > τ_occlusion; A(N_dismiss) < 44×44). Variant B shrinks the prompt to a compact inline row with a 44×44 px dismiss target, so the content — not the paywall — dominates the interface."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-7 shrink-0 items-center justify-center rounded bg-foreground/10 text-[8px] font-semibold text-muted-foreground">
                A4
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">{EPISODE_TITLE}</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  {purchased
                    ? "Now playing — enjoy your rental."
                    : "Locked. A heist goes wrong when the crew's getaway driver has a change of heart."}
                </p>
              </div>
              {purchased ? (
                <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                  Playing
                </div>
              ) : (
                <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-muted-foreground rounded-full border border-border px-2 py-0.5 shrink-0">
                  Locked
                </div>
              )}
            </div>

            {!purchased && !dismissed && (
              <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md border border-green-500/30 bg-green-500/5 p-2">
                <span className="text-[9px] text-muted-foreground flex-1 min-w-[120px]">
                  Rent this episode — <span className="font-mono font-semibold text-green-600 dark:text-green-400">$3.99</span> one-time.
                </span>
                <button
                  onClick={() => setPurchased(true)}
                  className="rounded-md bg-green-600 hover:bg-green-700 text-white px-3 py-2.5 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  Rent $3.99
                </button>
                <button
                  onClick={() => setDismissed(true)}
                  aria-label="Dismiss payment prompt"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground text-[10px] transition-colors cursor-pointer"
                >
                  Later
                </button>
              </div>
            )}
            {!purchased && dismissed && (
              <p className="mt-3 text-[9px] text-muted-foreground">
                Payment prompt dismissed — the episode stays locked, but you can keep browsing.
              </p>
            )}
          </div>

          {revealed && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {purchased ? "Transaction completed" : "Prompt dismissed"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                The overlay covers only about a quarter of the panel (A(O_unlock)/A_viewport ≈ 0.28,
                below τ_occlusion) and the dismiss target is a full 44×44 px — WCAG compliant.
                The payment offer is informative, not dominating.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-md border bg-card">
          {/* Locked content, buried under the overlay */}
          <div className="p-3 blur-[1.5px] select-none" aria-hidden={!purchased}>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-7 shrink-0 items-center justify-center rounded bg-foreground/10 text-[8px] font-semibold text-muted-foreground">
                A4
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">{EPISODE_TITLE}</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  A heist goes wrong when the crew&rsquo;s getaway driver has a change of heart.
                </p>
              </div>
            </div>
          </div>

          {!purchased && !dismissed && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/95 p-3">
              <div className="w-full rounded-md border border-red-500/40 bg-card p-4 text-center">
                <svg className="mx-auto h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <h4 className="mt-2 text-[13px] font-bold">Unlock {EPISODE_TITLE}</h4>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  Only <span className="font-mono font-semibold text-yellow-500">$3.99</span> for this
                  episode — unlock the full season for $9.99!
                </p>
                <button
                  onClick={() => setPurchased(true)}
                  className="mt-3 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-2.5 text-[11px] font-bold transition-colors cursor-pointer"
                >
                  Unlock now — $3.99
                </button>
                {/* Dismiss affordance: 16×16 px, far below the 44×44 WCAG minimum */}
                <button
                  onClick={() => setDismissed(true)}
                  aria-label="Dismiss paywall (tiny target)"
                  className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer"
                  style={{ width: 16, height: 16 }}
                >
                  <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {purchased && (
            <div className="border-t border-border p-2.5 text-[9px] text-green-700 dark:text-green-300 flex items-center gap-1.5">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Unlocked — now playing.
            </div>
          )}
        </div>

        {mode === "auditor" && revealed && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Episode unlocked
            </div>
            <p className="text-muted-foreground">
              {dismissed ? (
                <>
                  You dismissed the overlay — but only after hunting for a{" "}
                  <strong className="text-red-500">16 × 16 px</strong> target (A(N_dismiss) &lt; 44 × 44,
                  a WCAG violation). {purchased ? "You also paid $3.99 to unlock the episode." : "The paywall visually dominated the panel until then."}
                </>
              ) : (
                <>
                  The overlay covered nearly the entire panel — A(O_unlock)/A_viewport ≈ 0.95 &gt; τ_occlusion —
                  and its dismiss &ldquo;&times;&rdquo; was a <strong className="text-red-500">16 × 16 px</strong>{" "}
                  sliver, well under the 44 × 44 px WCAG minimum. The paywall becomes the central visual
                  event; the content is buried beneath it.
                </>
              )}
            </p>
            {purchased && (
              <p className="text-muted-foreground">
                A $3.99 transaction was completed. The interface monetized the episode by making the
                paywall impossible to ignore.
              </p>
            )}
          </div>
        )}
      </div>
    </DemoShell>
  );
}
