"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Trick Questions — Condition 1: Affordance-Consequence Mismatch
 *
 * A marketing checkbox whose label is so densely packed with negations
 * that the user cannot tell whether checking it opts IN or opts OUT of
 * promotional communications. The toggle affordance (check = yes) fights
 * the linguistic structure (do not…not…unless…not…).
 */

const CLAUSE_TEXT =
  "I do not decline to not receive marketing communications " +
  "about products and services unrelated to my purchase unless " +
  "I have previously indicated no preference not to be excluded " +
  "from promotional offers that do not pertain to my transaction " +
  "history, in which case I do not object to not being opted out " +
  "of receiving such communications without my prior written consent " +
  "not having been obtained, except where such communications are " +
  "not prohibited by applicable law.";

function countNegations(s: string): number {
  const negations = ["not", "no", "never", "without", "unless", "except", "decline", "excluded", "prohibited", "opt out"];
  const words = s.toLowerCase().split(/\s+/);
  return negations.reduce((sum, n) => sum + words.filter(w => w === n).length, 0);
}

const NEGATION_COUNT = countNegations(CLAUSE_TEXT);

/* Stripped of all negation loops */
const PLAIN_MEANING =
  "By checking this box, I agree to receive marketing communications " +
  "about products and services. I can unsubscribe at any time.";

export function TrickQuestionsCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [checked, setChecked] = React.useState(false);
  const [showReveal, setShowReveal] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const reset = () => {
    setChecked(false);
    setShowReveal(false);
    setSubmitted(false);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.checked;
    setChecked(v);
    setShowReveal(true);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Negation count</span>
        <span className="font-mono font-semibold tabular-nums">{NEGATION_COUNT}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Clause length</span>
        <span className="font-mono font-semibold tabular-nums">{CLAUSE_TEXT.split(/\s+/).length} words</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Checkbox checked?</span>
        <span className="font-mono font-semibold tabular-nums">{checked ? "Yes" : "No"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Submitted?</span>
        <span className="font-mono font-semibold tabular-nums">{submitted ? "Yes" : "No"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Trick Questions: Syntactic Obfuscation via Multiple Negations"
      caption="Syntactic Obfuscation via Multiple Negations — a checkbox whose label is a maze of contradictory clauses." auditorStats={stats}>
      <div className="space-y-3">
        {/* ── The marketing offer ── */}
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-md bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center flex-shrink-0">
              <svg className="h-4 w-4 text-rose-600 dark:text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold text-foreground">
                You've been selected for an exclusive offer!
              </h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                As a valued customer, you qualify for <strong className="text-rose-600 dark:text-rose-400">Premium Gold Access</strong> —
                a <span className="font-semibold">$49.99/mo</span> value, available to you for the introductory price of
                just <span className="font-semibold text-emerald-600 dark:text-emerald-400">$0.00 for the first 30 days</span>.
                After your trial, your plan auto-renews at full price unless you cancel.
              </p>
            </div>
          </div>
        </div>

        {/* ── The negation-laden checkbox ── */}
        <div className="rounded-md border bg-background p-2.5 transition-colors"
          style={{
            borderColor: checked ? "hsl(142, 71%, 40%)" : undefined,
            backgroundColor: checked ? "hsla(142, 71%, 40%, 0.04)" : undefined,
          }}
        >
          <label className="flex items-start gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={checked}
              onChange={handleCheck}
              className="mt-1 accent-rose-500 flex-shrink-0"
            />
            <div className="space-y-1 min-w-0">
              <div className="text-[9px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                {CLAUSE_TEXT}
              </div>
              {!showReveal && (
                <p className="text-[7px] text-muted-foreground/40 italic">
                  Try to figure out what checking this box actually means.
                </p>
              )}
            </div>
          </label>
        </div>

        {/* ── Reveal: what each state actually means ── */}
        {showReveal && (
          <div className={`rounded-md border p-2.5 text-[9px] leading-relaxed transition-all ${
            checked
              ? "bg-emerald-500/5 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
              : "bg-amber-500/5 border-amber-500/30 text-amber-700 dark:text-amber-300"
          }`}>
            <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight mb-0.5">
              {checked ? (
                <>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  You are currently OPTED IN to marketing
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  You are currently OPTED OUT of marketing
                </>
              )}
            </div>
            <p className={checked ? "text-emerald-600/80 dark:text-emerald-400/80" : "text-amber-600/80 dark:text-amber-400/80"}>
              {checked
                ? `Despite ${NEGATION_COUNT} negations in the label, checking the box means exactly what it looks like: YES, I agree. The multiple negations are designed to confuse you into believing you're declining when you're actually accepting.`
                : "With the box unchecked, you haven't agreed to anything. The maze of negations was designed to pressure you into checking the box, not to inform your decision."}
            </p>
          </div>
        )}

        {/* ── Skeleton key / plain English ── */}
        <details className="group text-[9px]">
          <summary className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors font-medium">
            Show skeleton key — what the sentence actually says
          </summary>
          <div className="mt-1 p-2 rounded-md border bg-card">
            <p className="mb-1 text-muted-foreground">
              The sentence above contains <strong className="text-rose-500">{NEGATION_COUNT} negation words</strong>{" "}
              (not, no, never, without, unless, except, decline, excluded, prohibited, opt out).
              Every second "not" reverses the previous one. Here's what it means in plain English:
            </p>
            <div className="rounded bg-emerald-500/5 border border-emerald-500/20 p-2">
              <p className="text-emerald-700 dark:text-emerald-300 font-medium">{PLAIN_MEANING}</p>
            </div>
            <p className="mt-1 text-muted-foreground">
              The original is <strong>{CLAUSE_TEXT.split(/\s+/).length} words</strong>. The plain version is{" "}
              <strong>{PLAIN_MEANING.split(/\s+/).length} words</strong>.
              The negations serve no purpose except to discourage you from reading carefully.
            </p>
          </div>
        </details>

        {/* ── Confirm / submit ── */}
        <button
          onClick={handleSubmit}
          disabled={!checked}
          className={`w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
            checked
              ? "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
              : "bg-muted text-muted-foreground/40 cursor-not-allowed"
          }`}
        >
          {submitted ? "Confirmed ✓" : "Confirm & activate Premium Gold Access"}
        </button>

        {submitted && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2 text-[9px] text-amber-700 dark:text-amber-300">
            <strong>You agreed to receive marketing communications</strong> — or did you?
            The checkbox sentence had {NEGATION_COUNT} negations making it nearly impossible
            to parse. Most users check the box without understanding what they consented to.
          </div>
        )}
      </div>
    </DemoShell>
  );
}
