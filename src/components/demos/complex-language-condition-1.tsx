"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Complex Language — Condition 1: Structural Nesting Depth of Legal/Technical Text Nodes
 *
 * Thesis: the algorithm measures DOM nesting depth and text-node length
 * distribution inside legal/terms containers C_legal. The feature triggers
 * if FKGL-flagged complex text nodes are structurally buried at a DOM depth
 * significantly exceeding the site's median content depth, or if the mean
 * clause length exceeds readability thresholds:
 *
 *   D_DOM(N_complex) > τ_legal_depth  ∨  mean |text(n)| > τ_clause_length
 *
 * Variant A (dark): the binding auto-renewal clause sits six DOM levels deep
 * inside nested collapsible legal containers.
 * Variant B (benign): the same clause, same payload, at depth 1 in plain text.
 */

const CLAUSE_DARK =
  "14.2 Automatic Renewal: The subscription shall renew automatically for successive monthly periods, and the Provider shall be entitled to charge the payment method on file for each such renewal period without further notice or separate confirmation, unless the Subscriber shall have delivered written notification of non-renewal not less than twenty-four (24) hours prior to the conclusion of the then-current billing cycle, in which event the renewal shall be foreclosed.";

const CLAUSE_BENIGN =
  "Your plan renews automatically each month at the same price unless you cancel at least 24 hours before the renewal date.";

const TAU_LEGAL_DEPTH = 3;
const TAU_CLAUSE_LENGTH = 200;
const DEPTH_DARK = 6;
const DEPTH_BENIGN = 1;

export function ComplexLanguageCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [openA, setOpenA] = React.useState([false, false, false]);
  const [agreed, setAgreed] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);


  const toggleA = (i: number) =>
    setOpenA((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <DemoShell mode={mode}
      title="Complex Language: Structural Nesting Depth of Legal/Technical Text Nodes"
      caption="Structural Nesting Depth — the binding auto-renewal clause is buried deep inside nested legal containers, far below the site's median content depth."
      deltaNote={`In Variant A the renewal clause sits ${DEPTH_DARK} DOM levels deep inside nested collapsibles (τ_legal_depth = ${TAU_LEGAL_DEPTH}) with a ${CLAUSE_DARK.length}-character clause (τ_clause_length = ${TAU_CLAUSE_LENGTH}). Variant B shows the identical clause at depth ${DEPTH_BENIGN} in plain language.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Subscription signup</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Pro plan — $29.99/month. Review the terms before agreeing.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
                Depth {DEPTH_BENIGN}
              </div>
            </div>

            <div className="mt-3 max-h-36 overflow-y-auto rounded-md border bg-background p-2">
              <p className="text-[10px] leading-relaxed text-foreground/80">
                <span className="font-semibold text-foreground">14.2 Automatic Renewal — </span>
                {CLAUSE_BENIGN}
              </p>
              <p className="mt-1.5 text-[8px] text-muted-foreground/60">
                The clause is visible at the top of the terms container — DOM depth {DEPTH_BENIGN}, plain English.
              </p>
            </div>

            <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 flex-shrink-0 accent-primary"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  I agree to the Terms of Service
                </div>
                <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                  Including the renewal clause you just read at the top.
                </div>
              </div>
            </label>

            <button
              onClick={() => setSubmitted(true)}
              disabled={!agreed}
              className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                agreed
                  ? "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              Complete signup
            </button>
          </div>

          {submitted && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Clause at depth {DEPTH_BENIGN} — no excavation needed
              </div>
              <p className="text-muted-foreground mt-0.5">
                You saw the auto-renewal clause immediately (DOM depth {DEPTH_BENIGN}, {CLAUSE_BENIGN.length} characters,
                well under τ_clause_length). The decision was yours to make with full information.
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
              <h3 className="text-[11px] font-semibold">Subscription signup</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Pro plan — $29.99/month. Review the terms before agreeing.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
              Depth {DEPTH_DARK}
            </div>
          </div>

          <div className="mt-3 max-h-36 overflow-y-auto rounded-md border bg-background p-2">
            <details open={openA[0]} onToggle={() => toggleA(0)} className="group text-[10px]">
              <summary className="cursor-pointer font-medium text-foreground/80 transition-colors hover:text-foreground">
                Terms of Service
              </summary>
              <div className="mt-1 pl-3">
                <details open={openA[1]} onToggle={() => toggleA(1)} className="group">
                  <summary className="cursor-pointer text-[9px] font-medium text-muted-foreground transition-colors hover:text-foreground">
                    Section 14 — Renewal &amp; Billing
                  </summary>
                  <div className="mt-1 pl-3">
                    <details open={openA[2]} onToggle={() => toggleA(2)} className="group">
                      <summary className="cursor-pointer text-[9px] font-medium text-muted-foreground transition-colors hover:text-foreground">
                        14.2 Automatic Renewal
                      </summary>
                      <p className="mt-1 text-[8px] leading-relaxed text-foreground/70">
                        {CLAUSE_DARK}
                      </p>
                      <p className="mt-1 text-[7px] italic text-foreground/70">
                        D_DOM = {DEPTH_DARK} — the clause lives 6 levels below the page surface.
                      </p>
                    </details>
                  </div>
                </details>
              </div>
            </details>
          </div>

          <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 flex-shrink-0 accent-primary"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                I agree to the Terms of Service
              </div>
              <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                Including anything hidden in the sections above.
              </div>
            </div>
          </label>

          <button
            onClick={() => setSubmitted(true)}
            disabled={!agreed}
            className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              agreed
                ? "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            Complete signup
          </button>
        </div>

        {mode === "auditor" && submitted && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Additional terms
            </div>
            <p className="text-muted-foreground">
              The clause that commits you to <strong className="text-foreground">automatic monthly renewal at $29.99</strong>{" "}
              was buried at DOM depth <span className="font-mono text-red-500">{DEPTH_DARK} &gt; &tau;_legal_depth ({TAU_LEGAL_DEPTH})</span>,
              inside three nested collapsibles — and its mean clause length is{" "}
              <span className="font-mono text-red-500">{CLAUSE_DARK.length} &gt; &tau;_clause_length ({TAU_CLAUSE_LENGTH})</span>{" "}
              characters. Both branches of the trigger fire.
            </p>
            <p className="text-muted-foreground">
              The site&rsquo;s median content depth is 2. This clause was placed 6 levels down so that the checkbox you
              just ticked commits you to a recurring charge you never actually read.
            </p>
            <details className="group">
              <summary className="cursor-pointer font-medium text-muted-foreground transition-colors hover:text-foreground">
                Show plain-English translation
              </summary>
              <p className="mt-1 rounded border border-green-500/20 bg-green-500/5 p-2 text-green-700 dark:text-green-300">
                {CLAUSE_BENIGN}
              </p>
            </details>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
