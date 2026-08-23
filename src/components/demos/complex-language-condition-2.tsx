"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Complex Language — Condition 2: Visual Density of Legalese Text Blocks
 *
 * Thesis: the algorithm identifies FKGL-flagged text nodes (reading level
 * > 12) and evaluates their visual presentation. The feature triggers if
 * these legally complex passages are rendered below the site's median body
 * font size — visually inconspicuous while semantically impenetrable:
 *
 *   fontSize(N_complex) / S_base < τ_shrink  ∧  FKGL(N_complex) > 12
 *
 * Variant A (dark): a FKGL-21 legal block rendered at 7px under a 13px
 * body font — invisible and unreadable.
 * Variant B (benign): the same informational payload at body size in
 * plain English.
 */

const LEGALESE_DARK =
  "NOTWITHSTANDING THE FOREGOING, THE CARDHOLDER HEREBY IRREVOCABLY AUTHORIZES THE MERCHANT AND ITS DESIGNATED PROCESSING INTERMEDIARIES TO EFFECTUATE THE CAPTURE, AUTHORIZATION, AND SETTLEMENT OF THE FULL TRANSACTION AMOUNT DISCLOSED IN THE PRECEDING ORDER SUMMARY, INCLUDING ANY SUBSEQUENTLY INCURRED SURCHARGES, FEES, TAXES, OR ADJUSTMENTS ARISING FROM THE SALE. SUCH AUTHORIZATION REMAINS IN FULL FORCE NOTWITHSTANDING ANY CONTRARY INSTRUCTIONS OR CANCELLATION REQUESTS SUBMITTED AFTER THE INITIATION OF SAID TRANSACTION.";

const PLAIN_BENIGN =
  "We will charge your card the total shown above when you place the order. You can cancel your order within 24 hours for a full refund.";

const BASE_FONT_SIZE = 13;
const DARK_FONT_SIZE = 7;
const TAU_SHRINK = 0.7;

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  const groups = w.match(/[aeiouy]+/g);
  let n = groups ? groups.length : 0;
  if (w.endsWith("e") && n > 1) n -= 1;
  return Math.max(1, n);
}

function fkgl(text: string): number {
  const sentences = (text.match(/[^.!?]+[.!?]+/g) ?? [text]).length;
  const words = text.split(/\s+/).filter(Boolean);
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
  if (words.length === 0 || sentences === 0) return 0;
  return 0.39 * (words.length / sentences) + 11.8 * (syllables / words.length) - 15.59;
}

const FKGL_DARK = fkgl(LEGALESE_DARK);
const FKGL_BENIGN = fkgl(PLAIN_BENIGN);
const RATIO_DARK = (DARK_FONT_SIZE / BASE_FONT_SIZE).toFixed(2);

export function ComplexLanguageCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [paid, setPaid] = React.useState(false);

  const reset = () => setPaid(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">FKGL(N_complex) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{FKGL_DARK.toFixed(1)} &gt; 12</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">FKGL (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{FKGL_BENIGN.toFixed(1)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">fontSize / S_base (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{RATIO_DARK} &lt; &tau;_shrink ({TAU_SHRINK})</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">S_base / fontSize</span>
        <span className="font-mono font-semibold tabular-nums">{BASE_FONT_SIZE}px / {DARK_FONT_SIZE}px</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Paid?</span>
        <span className="font-mono font-semibold tabular-nums">{paid ? "Yes" : "No"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Complex Language: Visual Density of Legalese Text Blocks"
      caption="Visual Density of Legalese Text Blocks — a FKGL 21 legal passage is rendered at 7px under a 13px body font, making it visually inconspicuous and semantically impenetrable."
      auditorStats={stats}
      deltaNote={`In Variant A the FKGL ${FKGL_DARK.toFixed(1)} legal block is rendered at ${DARK_FONT_SIZE}px (ratio ${RATIO_DARK} < τ_shrink ${TAU_SHRINK}). Variant B renders the same payload at body size in plain English (FKGL ${FKGL_BENIGN.toFixed(1)}).`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Checkout</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">Design Tools Pro — one-time license</p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                FKGL {FKGL_BENIGN.toFixed(1)}
              </div>
            </div>

            <div className="mt-3 space-y-1.5 text-[9px] text-muted-foreground">
              <div className="flex justify-between"><span>License (1×)</span><span className="font-mono">$29.99</span></div>
              <div className="flex justify-between border-t border-border pt-1.5 font-semibold text-foreground">
                <span>Total</span><span className="font-mono">$29.99</span>
              </div>
            </div>

            <div className="mt-3 rounded-md border bg-background p-2.5">
              <p className="text-[12px] leading-relaxed text-foreground/80">{PLAIN_BENIGN}</p>
              <p className="mt-1 text-[8px] text-green-600/70 dark:text-green-400/70">
                Body-size text, FKGL {FKGL_BENIGN.toFixed(1)} — readable by anyone.
              </p>
            </div>

            <button
              onClick={() => setPaid(true)}
              className="mt-2 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Pay $29.99
            </button>
          </div>

          {paid && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Informed payment
              </div>
              <p className="text-muted-foreground mt-0.5">
                The charge condition was stated at body size in plain English (FKGL {FKGL_BENIGN.toFixed(1)}), so you
                knew the card would be charged and that you could cancel within 24 hours.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Checkout</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">Design Tools Pro — one-time license</p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              FKGL {FKGL_DARK.toFixed(1)}
            </div>
          </div>

          <div className="mt-3 space-y-1.5 text-[9px] text-muted-foreground">
            <div className="flex justify-between"><span>License (1×)</span><span className="font-mono">$29.99</span></div>
            <div className="flex justify-between border-t border-border pt-1.5 font-semibold text-foreground">
              <span>Total</span><span className="font-mono">$29.99</span>
            </div>
          </div>

          <div className="mt-3 rounded-md border bg-background p-2.5">
            <p className="text-[7px] leading-relaxed text-muted-foreground/60">{LEGALESE_DARK}</p>
            <p className="mt-1 text-[7px] italic text-red-500/60">
              Rendered at {DARK_FONT_SIZE}px under a {BASE_FONT_SIZE}px body — ratio {RATIO_DARK} &lt; &tau;_shrink ({TAU_SHRINK}).
            </p>
          </div>

          <button
            onClick={() => setPaid(true)}
            className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Pay $29.99
          </button>
        </div>

        {mode === "auditor" && paid && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Review the details below
            </div>
            <p className="text-muted-foreground">
              The passage governing your charge was written at a{" "}
              <strong className="text-red-500">FKGL of {FKGL_DARK.toFixed(1)}</strong> (&gt; 12) and shrunk to{" "}
              <span className="font-mono">{DARK_FONT_SIZE}px</span> — a fontSize/S_base ratio of{" "}
              <span className="font-mono text-red-500">{RATIO_DARK} &lt; &tau;_shrink ({TAU_SHRINK})</span>.
            </p>
            <p className="text-muted-foreground">
              Both conditions of the heuristic hold: the text is <em>visually inconspicuous</em> (below the site&rsquo;s
              median body font size) and <em>semantically impenetrable</em> (FKGL &gt; 12). You just approved a charge
              whose terms were engineered to be invisible.
            </p>
            <details className="group">
              <summary className="cursor-pointer font-medium text-muted-foreground transition-colors hover:text-foreground">
                Show what it actually said
              </summary>
              <p className="mt-1 rounded border border-green-500/20 bg-green-500/5 p-2 text-[9px] text-green-700 dark:text-green-300">
                {PLAIN_BENIGN}
              </p>
            </details>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
