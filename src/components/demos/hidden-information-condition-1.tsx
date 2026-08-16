"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Hidden Information — Condition 1: Structural Burial in High-Density Text
 *
 * Thesis: N_document is a dense text block (e.g. Terms and Conditions) with
 * word count |W(N_document)|. t_clause is the sentence containing critical
 * financial or privacy information. P(x) evaluates the presence of visual
 * emphasis tags (<strong>, <em>). The feature triggers when the critical
 * clause is buried in an excessively long document without any semantic or
 * visual highlighting:
 *
 *   |W(N_document)| > τ_fatigue  ∧  P(t_clause) = False
 *
 * Variant A (dark): the auto-renew clause sits deep inside a 400+ word
 * legalese monolith with no emphasis tags.
 * Variant B (benign): the identical document, but the clause is marked with
 * <strong>/<em> emphasis (P = True), the full price is disclosed in the
 * headline, and a visible renewal warning is shown — so it is findable at a
 * glance and no fee is ever hidden.
 */

const BOILERPLATE_SENTENCES = [
  "This Agreement constitutes the entire understanding between you and CloudNimbus regarding the Service.",
  "By creating an account you acknowledge that you have read, understood, and agree to be bound by the terms set forth herein.",
  "CloudNimbus reserves the right to modify, suspend, or discontinue any portion of the Service at any time without prior notice.",
  "You are solely responsible for maintaining the confidentiality of your account credentials and for all activity occurring under your account.",
  "The Service is provided on an as-is and as-available basis without warranties of any kind, whether express or implied.",
  "To the maximum extent permitted by law, CloudNimbus shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
  "You agree not to reverse engineer, decompile, or disassemble any software component of the Service.",
  "CloudNimbus may collect, store, and process usage data in accordance with its Privacy Policy, which is incorporated herein by reference.",
  "Either party may terminate this Agreement at any time, provided that obligations that by their nature should survive shall survive termination.",
  "Disputes arising under this Agreement shall be governed by the laws of the State of Delaware, without regard to conflict-of-law principles.",
  "You agree to indemnify and hold harmless CloudNimbus and its affiliates from any claims arising out of your use of the Service.",
  "Any failure by CloudNimbus to enforce any provision of this Agreement shall not be construed as a waiver of that provision.",
  "Headings in this Agreement are for convenience only and shall not affect the interpretation of any provision.",
  "This Agreement may be executed in counterparts, each of which shall be deemed an original, and all of which together shall constitute one instrument.",
];

const CRITICAL_CLAUSE =
  "Your subscription will automatically renew at $49.99 per month unless you cancel at least 24 hours before the renewal date, and cancellation requests must be submitted through the account settings portal.";

const BOILERPLATE_TEXT = BOILERPLATE_SENTENCES.join(" ");

const CLAUSE_PARTS = (() => {
  const words = BOILERPLATE_TEXT.split(/\s+/);
  const at = Math.floor(words.length * 0.7);
  const before = words.slice(0, at).join(" ");
  const after = words.slice(at).join(" ");
  return {
    before: `${before} `,
    clause: CRITICAL_CLAUSE,
    after: ` ${after}`,
  };
})();

const DOCUMENT_WORDS =
  CLAUSE_PARTS.before.split(/\s+/).length +
  CRITICAL_CLAUSE.split(/\s+/).length +
  CLAUSE_PARTS.after.split(/\s+/).length;

const CLAUSE_START = CLAUSE_PARTS.before.split(/\s+/).length; // word index of t_clause

export function HiddenInformationCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [agreed, setAgreed] = React.useState(false);
  const [created, setCreated] = React.useState(false);
  const [located, setLocated] = React.useState(false);

  const reset = () => {
    setAgreed(false);
    setCreated(false);
    setLocated(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|W(N_document)|</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">
          {DOCUMENT_WORDS} (&gt; 250)
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P(t_clause) dark / benign</span>
        <span className="font-mono font-semibold tabular-nums">
          <span className="text-rose-500">False</span> / <span className="text-emerald-500">True</span>
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Clause position</span>
        <span className="font-mono font-semibold tabular-nums">
          word {CLAUSE_START} / {DOCUMENT_WORDS}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Auto-renew charge</span>
        <span className="font-mono font-semibold tabular-nums">$49.99 / mo</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Renewal warning (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">visible — 7-day reminder</span>
      </div>
    </>
  ) : null;

  const renderPanel = (dark: boolean) => (
    <div className="space-y-3">
      <div className="rounded-md border bg-card p-3">
        <h3 className="text-[11px] font-semibold">Create your CloudNimbus Pro account</h3>
        <p className="text-[9px] text-muted-foreground mt-0.5">
          {dark
            ? "Unlimited sync · 2 TB storage · $0 for the first month"
            : "Unlimited sync · 2 TB storage · $0 for the first month, then $49.99/month"}
        </p>

        <label className="mt-3 block rounded-md border border-border bg-background p-2">
          <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground">
            Email
          </span>
          <span className="mt-1 block text-[10px] text-muted-foreground/70">
            you@example.com
          </span>
        </label>

        <div className="mt-2 rounded-md border border-border bg-background p-2">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground">
              Terms and Conditions
            </span>
            <span className="font-mono text-[8px] tabular-nums text-muted-foreground/60">
              {DOCUMENT_WORDS} words
            </span>
          </div>
          <div className="mt-1.5 max-h-32 overflow-y-auto pr-1 text-[8px] leading-relaxed text-muted-foreground/80">
            {dark ? (
              <>
                {CLAUSE_PARTS.before}
                {CLAUSE_PARTS.clause}
                {CLAUSE_PARTS.after}
              </>
            ) : (
              <>
                {CLAUSE_PARTS.before}
                <strong className="font-bold text-emerald-700 dark:text-emerald-300">
                  <em>{CLAUSE_PARTS.clause}</em>
                </strong>
                {CLAUSE_PARTS.after}
              </>
            )}
          </div>
        </div>

        {!dark && (
          <div className="mt-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-2 py-1.5 text-[8px] leading-relaxed text-emerald-700 dark:text-emerald-300">
            Your free first month ends after 30 days. After that you&rsquo;ll be billed{" "}
            <strong className="font-semibold">$49.99/month</strong> automatically unless you
            cancel — a reminder email arrives 7 days before each renewal.
          </div>
        )}

        <label className="mt-2 flex cursor-pointer items-start gap-2 rounded-md border border-border bg-background p-2.5 transition-colors group">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className={`mt-0.5 flex-shrink-0 ${dark ? "accent-rose-500" : "accent-emerald-500"}`}
          />
          <span className="text-[9px] leading-relaxed text-foreground/80 select-none transition-colors group-hover:text-foreground">
            I agree to the Terms and Conditions.
          </span>
        </label>

        <button
          onClick={() => setCreated(true)}
          disabled={!agreed}
          className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
            agreed
              ? `cursor-pointer text-white ${dark ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"}`
              : "cursor-not-allowed bg-muted text-muted-foreground/40"
          }`}
        >
          {created ? "Account created" : "Create account"}
        </button>
      </div>

      <button
        onClick={() => setLocated(true)}
        className="w-full cursor-pointer rounded-md border border-border bg-background py-1.5 text-[9px] font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Locate the financial clause in the document
      </button>

      {located ? (
        <div
          className={`rounded-md border p-2.5 text-[9px] leading-relaxed ${
            dark
              ? "border-amber-500/30 bg-amber-500/5"
              : "border-emerald-500/30 bg-emerald-500/5"
          }`}
        >
          <div
            className={`flex items-center gap-1.5 font-semibold uppercase tracking-tight ${
              dark ? "text-amber-700 dark:text-amber-300" : "text-emerald-700 dark:text-emerald-300"
            }`}
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {dark ? "Buried clause — no emphasis" : "Clause highlighted"}
          </div>
          <p className="text-muted-foreground mt-1">
            {dark ? (
              <>
                The clause &ldquo;auto-renews at $49.99 per month&rdquo; sits at{" "}
                <strong className="text-foreground">word {CLAUSE_START} of {DOCUMENT_WORDS}</strong>.
                P(t_clause) = False — no &lt;strong&gt; or &lt;em&gt; distinguishes it from the
                surrounding boilerplate, so it is invisible to a skimming reader (reading fatigue).
              </>
            ) : (
              <>
                The same clause is wrapped in <strong className="text-emerald-700 dark:text-emerald-300">&lt;strong&gt;</strong>{" "}
                and <em className="text-emerald-700 dark:text-emerald-300">&lt;em&gt;</em> — P(t_clause) = True —
                so the $49.99 auto-renewal is findable at a glance without reading all{" "}
                {DOCUMENT_WORDS} words.
              </>
            )}
          </p>
        </div>
      ) : null}

      {created &&
        (dark ? (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-amber-700 dark:text-amber-300">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Structural burial detected
            </div>
            <p className="text-muted-foreground mt-1">
              |W(N_document)| = <strong className="text-foreground">{DOCUMENT_WORDS} words</strong>{" "}
              &gt; τ_fatigue ∧ P(t_clause) = <strong className="text-foreground">False</strong> — you
              agreed to a subscription that auto-renews at{" "}
              <strong className="text-amber-700 dark:text-amber-300">$49.99/month</strong> without any
              emphasis marking the clause. The information technically exists in the document; it is
              rendered practically invisible.
            </p>
          </div>
        ) : (
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-emerald-700 dark:text-emerald-300">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Clause visually marked
            </div>
            <p className="text-muted-foreground mt-1">
              The auto-renew clause was highlighted in bold italics from the start, so you saw the
              $49.99/month renewal before agreeing — P(t_clause) = True, no hunting required.
            </p>
          </div>
        ))}
    </div>
  );

  return (
    <DemoShell
      mode={mode}
      annotations={annotations}
      onRestart={onRestart ?? reset}
      title="Hidden Information: Structural Burial in High-Density Text"
      caption="Structural Burial in High-Density Text — the critical clause sits inside an excessively long document with no semantic or visual emphasis to distinguish it from the surrounding boilerplate."
      auditorStats={stats}
      deltaNote={`Variant A buries the $49.99/mo auto-renew clause at word ${CLAUSE_START} of ${DOCUMENT_WORDS} with no emphasis tags (P = False) and no upfront price disclosure. Variant B marks the clause with <strong>/<em> (P = True), discloses the full price in the headline (“$0 for the first month, then $49.99/month”), and shows a visible renewal warning — so the same information is findable at a glance and no fee is ever hidden.`}
      benign={renderPanel(false)}
    >
      {renderPanel(true)}
    </DemoShell>
  );
}
