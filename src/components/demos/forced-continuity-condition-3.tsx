"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Forced Continuity — Condition 3: Semantic Asymmetry Between Subscription
 * and Cancellation Language
 *
 * Thesis: the algorithm compares the Flesch-Kincaid readability and
 * emotional valence of the subscription-initiation text against the
 * cancellation text. The feature triggers if the cancellation flow is
 * significantly harder to read (FKGL > 2 grade levels above the signup
 * page) or embeds guilt-inducing lexemes (“lose your benefits,” “abandon
 * your progress”) absent from the signup flow:
 *
 *   FKGL(T_cancel) − FKGL(T_signup) > 2
 *   ∨  Guilt(T_cancel) − Guilt(T_signup) > τ_guilt_gap
 *
 * Variant A (dark): signup copy is short and friendly (FKGL ≈ 4.9), but it
 * never mentions the renewal — no "Cancel anytime", no "$0.00 for 30 days" —
 * while the cancellation flow is a dense guilt-laden wall (FKGL ≈ 9.4) with
 * lexemes like "abandon your progress" and "lose your benefits."
 * Variant B (benign): signup discloses the free trial and cancel-anytime
 * terms up front, and cancellation is written at the same reading level as
 * signup, with zero guilt lexemes.
 */

type Tab = "signup" | "cancel";

const SIGNUP_COPY_DARK =
  "Try Premium free. You get unlimited projects, priority support, and analytics.";

const SIGNUP_COPY_BENIGN =
  "Try Premium free for 30 days. Cancel anytime. You get unlimited projects, priority support, and analytics.";

const CANCEL_COPY_DARK =
  "We're sorry to see you go. Please be aware that cancellation is an irreversible action: you will permanently " +
  "abandon your progress, lose all of your benefits and accumulated data, and forfeit any remaining time on your " +
  "current billing cycle. Upon cancellation, your account will immediately cease to function, all collaborative " +
  "privileges will be revoked, and any content you have created may be permanently deleted without the possibility " +
  "of recovery. Should you choose to proceed with this final and definitive termination of your subscription, " +
  "please confirm below.";

const CANCEL_COPY_BENIGN =
  "You can cancel anytime — no questions asked. Your plan stays active until the end of the current billing " +
  "period, then ends. You can export your data before you go.";

function countGuiltLexemes(text: string): number {
  const lexemes = ["abandon", "lose", "benefits", "irreversible", "forfeit", "permanently deleted", "final"];
  return lexemes.reduce((sum, lex) => sum + (text.toLowerCase().includes(lex) ? 1 : 0), 0);
}

const GUILT_DARK = countGuiltLexemes(CANCEL_COPY_DARK);
const GUILT_BENIGN = countGuiltLexemes(CANCEL_COPY_BENIGN);
const FKGL_SIGNUP = 4.9;
const FKGL_DARK = 9.4;
const FKGL_BENIGN = 4.9;

export function ForcedContinuityCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Independent tab state per panel so the two flows can be compared side by side.
  const [aTab, setATab] = React.useState<Tab>("signup");
  const [bTab, setBTab] = React.useState<Tab>("signup");
  const [aCancelled, setACancelled] = React.useState(false);
  const [bCancelled, setBCancelled] = React.useState(false);

  const reset = () => {
    setATab("signup");
    setBTab("signup");
    setACancelled(false);
    setBCancelled(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">FKGL(T_signup)</span>
        <span className="font-mono font-semibold tabular-nums">{FKGL_SIGNUP} (grade 5)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">FKGL(T_cancel) (A)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{FKGL_DARK} — diff {(FKGL_DARK - FKGL_SIGNUP).toFixed(1)} &gt; 2</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">FKGL(T_cancel) (B)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{FKGL_BENIGN} — diff 0.0</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Guilt lexemes in cancel</span>
        <span className="font-mono font-semibold tabular-nums">A: {GUILT_DARK} (rose) · B: {GUILT_BENIGN}</span>
      </div>
    </>
  ) : null;

  const signupPanel = (dark: boolean) => (
    <div className="space-y-3">
      <div className="rounded-md border bg-card p-3">
        <h3 className="text-[11px] font-semibold">Premium — {dark ? "free trial" : "30-day free trial"}</h3>
        <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">{dark ? SIGNUP_COPY_DARK : SIGNUP_COPY_BENIGN}</p>
        <div className="mt-3 flex items-center justify-between rounded-md border border-border bg-background px-3 py-2">
          <span className="text-[9px] text-muted-foreground">Visa •••• 4242</span>
          <span className="text-[10px] font-mono font-semibold tabular-nums">
            {dark ? "Free trial" : "$0.00 for 30 days"}
          </span>
        </div>
        <button
          onClick={() => {}}
          className="mt-2 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
        >
          Start free trial
        </button>
        <p className="text-[8px] text-muted-foreground/60 mt-1.5 text-center">
          {dark
            ? "Simple language, friendly tone — and no mention of renewal or cancellation anywhere on this screen."
            : `Simple language, friendly tone — FKGL ≈ ${FKGL_SIGNUP}.`}
        </p>
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Forced Continuity: Semantic Asymmetry Between Subscription and Cancellation Language"
      caption="Semantic Asymmetry — the cancellation flow is written several grade levels above the signup flow and laced with guilt lexemes that the signup never mentions."
      auditorStats={stats}
      deltaNote="Variant A signs you up in grade-5 prose that never mentions the renewal — no “Cancel anytime”, no “$0.00 for 30 days” — and cancels you through a grade-9 guilt wall (“abandon your progress,” “lose your benefits”), so FKGL diff 4.5 > 2 and no renewal feedforward exists anywhere in the flow. Variant B discloses the free-trial terms and cancel-anytime up front, and writes cancellation at the same reading level as signup, with zero guilt lexemes."
      benign={
        <div className="space-y-3">
          <div className="flex rounded-md border border-border overflow-hidden">
            <button
              onClick={() => setBTab("signup")}
              className={`flex-1 py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
                bTab === "signup" ? "bg-emerald-600 text-white" : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              Signup flow
            </button>
            <button
              onClick={() => setBTab("cancel")}
              className={`flex-1 py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
                bTab === "cancel" ? "bg-emerald-600 text-white" : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              Cancellation flow
            </button>
          </div>

          {bTab === "signup" ? (
            signupPanel(false)
          ) : (
            <div className="rounded-md border bg-card p-3">
              <h3 className="text-[11px] font-semibold">Cancel subscription</h3>
              <p className="text-[9px] text-muted-foreground mt-1.5 leading-relaxed">{CANCEL_COPY_BENIGN}</p>
              <p className="text-[8px] text-muted-foreground/60 mt-1.5">
                FKGL ≈ {FKGL_BENIGN} — the same reading level as signup. Guilt lexemes: {GUILT_BENIGN}.
              </p>
              {bCancelled ? (
                <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] text-emerald-700 dark:text-emerald-300">
                  <strong>Cancelled.</strong> One click, plain language, no guilt trip. FKGL(T_cancel) − FKGL(T_signup)
                  = 0.0 ≤ 2 — the semantic asymmetry heuristic does not fire.
                </div>
              ) : (
                <button
                  onClick={() => setBCancelled(true)}
                  className="mt-2 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  Cancel my subscription
                </button>
              )}
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="flex rounded-md border border-border overflow-hidden">
          {/* Cancellation flow first in DOM order so a single activation exposes the retention wall */}
          <button
            onClick={() => setATab("cancel")}
            className={`flex-1 py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
              aTab === "cancel" ? "bg-rose-600 text-white" : "bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            Cancellation flow
          </button>
          <button
            onClick={() => setATab("signup")}
            className={`flex-1 py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
              aTab === "signup" ? "bg-rose-600 text-white" : "bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            Signup flow
          </button>
        </div>

        {aTab === "signup" ? (
          signupPanel(true)
        ) : (
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Cancel subscription</h3>
            <p className="mt-1.5 text-[8px] leading-relaxed text-muted-foreground/70">{CANCEL_COPY_DARK}</p>
            <p className="text-[8px] text-muted-foreground/60 mt-1.5">
              FKGL ≈ {FKGL_DARK} — a jump of {(FKGL_DARK - FKGL_SIGNUP).toFixed(1)} grades from the signup page.
              Guilt lexemes embedded: {GUILT_DARK} (“abandon your progress,” “lose your benefits,” “irreversible,” …).
            </p>
            {aCancelled ? (
              <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 9v4m0 4h.01" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  Semantic asymmetry triggered
                </div>
                <p className="text-muted-foreground mt-0.5">
                  <strong className="text-foreground">FKGL(T_cancel) − FKGL(T_signup) = {(FKGL_DARK - FKGL_SIGNUP).toFixed(1)} &gt; 2</strong>{" "}
                  and <strong className="text-foreground">Guilt(T_cancel) − Guilt(T_signup) = {GUILT_DARK} &gt; τ_guilt_gap</strong>.
                  You were sold a plan in two friendly sentences, then asked to cancel through a wall of legal-grade,
                  guilt-inducing prose — linguistic complexity weaponized as a retention barrier.
                </p>
              </div>
            ) : (
              <button
                onClick={() => setACancelled(true)}
                className="mt-2 w-full rounded-md border border-rose-500/40 bg-background py-1.5 text-[10px] font-medium text-rose-600 hover:bg-rose-500/10 dark:text-rose-400 transition-colors cursor-pointer"
              >
                I still want to cancel
              </button>
            )}
          </div>
        )}
      </div>
    </DemoShell>
  );
}
