"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Trick Questions — Condition 3: Syntactic Obfuscation via Multiple Negations
 *
 * Thesis: the text label L(c) of a boolean input is parsed into a syntactic
 * dependency tree; the count of negation modifiers N_neg(L(c)) acting on the
 * primary action verbs triggers the feature at >= 2 stacked negations.
 *
 *   N_neg(L(c)) >= 2  =>  Linguistic Obfuscation
 *
 * Variant A (dark): a checkbox whose label stacks 10+ negations so the user
 * cannot tell whether checking opts in or out.
 * Variant B (benign): the same offer, expressed in plain English with zero
 * negations — checking means exactly what it says.
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

const PLAIN_TEXT =
  "I agree to receive marketing communications about products " +
  "and services. I can unsubscribe at any time.";

function countNegations(s: string): number {
  const negations = ["not", "no", "never", "without", "unless", "except", "decline", "excluded", "prohibited", "opt out"];
  const words = s.toLowerCase().split(/\s+/);
  return negations.reduce((sum, n) => sum + words.filter(w => w === n).length, 0);
}

const NEGATION_COUNT = countNegations(CLAUSE_TEXT);
const PLAIN_NEGATION_COUNT = countNegations(PLAIN_TEXT);

export function TrickQuestionsCond3({
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
    setChecked(e.target.checked);
    setShowReveal(true);
  };

  const handleSubmit = () => setSubmitted(true);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Negation count N_neg (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{NEGATION_COUNT} (&ge; 2)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Negation count (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{PLAIN_NEGATION_COUNT}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Clause length</span>
        <span className="font-mono font-semibold tabular-nums">{CLAUSE_TEXT.split(/\s+/).length} words</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Checkbox checked?</span>
        <span className="font-mono font-semibold tabular-nums">{checked ? "Yes" : "No"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Trick Questions: Syntactic Obfuscation via Multiple Negations"
      caption="Syntactic Obfuscation via Multiple Negations — a checkbox whose label is a maze of contradictory clauses, so the user cannot tell what checking means."
      auditorStats={stats}
      deltaNote={`In Variant A the label stacks ${NEGATION_COUNT} negation modifiers onto the primary verbs (N_neg >= 2, so the heuristic fires). Variant B says the same thing with zero negations in ${PLAIN_TEXT.split(/\s+/).length} words.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
                <svg className="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">
                  You&rsquo;ve been selected for an exclusive offer!
                </h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  As a valued customer, you qualify for <strong className="text-red-600 dark:text-red-400">Premium Gold Access</strong> — a{" "}
                  <span className="font-semibold">$49.99/mo</span> value, available to you for the introductory price of
                  just <span className="font-semibold text-green-600 dark:text-green-400">$0.00 for the first 30 days</span>.
                  After your trial, your plan auto-renews at full price unless you cancel.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-md border bg-background p-2.5">
            <label className="group flex cursor-pointer items-start gap-2">
              <input
                type="checkbox"
                checked={checked}
                onChange={handleCheck}
                className="mt-1 flex-shrink-0 accent-green-500"
              />
              <div className="min-w-0 space-y-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none transition-colors group-hover:text-foreground">
                  {PLAIN_TEXT}
                </div>
                <p className="text-[8px] text-muted-foreground/50">
                  {PLAIN_NEGATION_COUNT} negations — checking the box opts you in. Uncheck to opt out.
                </p>
              </div>
            </label>
          </div>

          {showReveal && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed text-green-700 dark:text-green-300">
              <div className="mb-0.5 flex items-center gap-1.5 font-semibold uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {checked ? "You are OPTED IN" : "You are OPTED OUT"}
              </div>
              <p className="text-muted-foreground">
                The label contains zero negations. {checked ? "Checking the box opted you into marketing — exactly as written." : "Unchecking left you opted out — exactly as written."}
              </p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!checked}
            className={`w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              checked
                ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            {submitted ? "Confirmed ✓" : "Confirm & activate Premium Gold Access"}
          </button>

          {mode === "auditor" && submitted && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[9px] text-green-700 dark:text-green-300">
              <strong>Consent recorded transparently.</strong> You read a one-sentence, zero-negation
              label and confirmed your opt-in. No syntactic acrobatics required.
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
              <svg className="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">
                You&rsquo;ve been selected for an exclusive offer!
              </h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                As a valued customer, you qualify for <strong className="text-red-600 dark:text-red-400">Premium Gold Access</strong> — a{" "}
                <span className="font-semibold">$49.99/mo</span> value, available to you for the introductory price of
                just <span className="font-semibold text-green-600 dark:text-green-400">$0.00 for the first 30 days</span>.
                After your trial, your plan auto-renews at full price unless you cancel.
              </p>
            </div>
          </div>
        </div>

        <div
          className="rounded-md border bg-background p-2.5 transition-colors"
          style={{
            borderColor: checked ? "hsl(142, 71%, 40%)" : undefined,
            backgroundColor: checked ? "hsla(142, 71%, 40%, 0.04)" : undefined,
          }}
        >
          <label className="group flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={handleCheck}
              className="mt-1 flex-shrink-0 accent-red-500"
            />
            <div className="min-w-0 space-y-1">
              <div className="text-[9px] leading-relaxed text-foreground/80 select-none transition-colors group-hover:text-foreground">
                {CLAUSE_TEXT}
              </div>
              {!showReveal && (
                <p className="text-[7px] italic text-muted-foreground/40">
                  Try to figure out what checking this box actually means.
                </p>
              )}
            </div>
          </label>
        </div>

        {showReveal && (
          <div className={`rounded-md border p-2.5 text-[9px] leading-relaxed transition-all ${
            checked
              ? "bg-green-500/5 border-green-500/30 text-green-700 dark:text-green-300"
              : "bg-yellow-500/5 border-yellow-500/30 text-yellow-700 dark:text-yellow-300"
          }`}>
            <div className="mb-0.5 flex items-center gap-1.5 font-semibold uppercase tracking-tight">
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
            <p className={checked ? "text-green-600/80 dark:text-green-400/80" : "text-yellow-600/80 dark:text-yellow-400/80"}>
              {checked
                ? `Despite ${NEGATION_COUNT} negation modifiers stacked on the primary verbs, checking the box means exactly what it looks like: YES, I agree. The negations exist to make you believe you're declining when you're actually accepting.`
                : "Leave the box unchecked if you do not want to activate Premium Gold Access."}
            </p>
          </div>
        )}

        <details className="group text-[9px]">
          <summary className="cursor-pointer font-medium text-muted-foreground transition-colors hover:text-foreground">
            Show skeleton key — what the sentence actually says
          </summary>
          <div className="mt-1 rounded-md border bg-card p-2">
            <p className="mb-1 text-muted-foreground">
              The sentence above contains <strong className="text-red-500">{NEGATION_COUNT} negation words</strong>{" "}
              (not, no, never, without, unless, except, decline, excluded, prohibited, opt out).
              Every second &ldquo;not&rdquo; reverses the previous one. Here&rsquo;s what it means in plain English:
            </p>
            <div className="rounded border border-green-500/20 bg-green-500/5 p-2">
              <p className="font-medium text-green-700 dark:text-green-300">{PLAIN_TEXT}</p>
            </div>
            <p className="mt-1 text-muted-foreground">
              The original is <strong>{CLAUSE_TEXT.split(/\s+/).length} words</strong>. The plain version is{" "}
              <strong>{PLAIN_TEXT.split(/\s+/).length} words</strong>. The negations serve no purpose except
              to discourage you from reading carefully.
            </p>
          </div>
        </details>

        <button
          onClick={handleSubmit}
          disabled={!checked}
          className={`w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
            checked
              ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              : "bg-muted text-muted-foreground/40 cursor-not-allowed"
          }`}
        >
          {submitted ? "Confirmed ✓" : "Confirm & activate Premium Gold Access"}
        </button>

        {mode === "auditor" && submitted && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2 text-[9px] text-yellow-700 dark:text-yellow-300">
            <strong>You agreed to receive marketing communications</strong> — or did you?
            The checkbox sentence had {NEGATION_COUNT} negations, making it nearly impossible
            to parse. Most users check the box without understanding what they consented to.
          </div>
        )}
      </div>

    </DemoShell>
  );
}
