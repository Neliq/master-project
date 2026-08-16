"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Wrong Language — Condition 1: Asymmetric State Application
 *
 * Thesis: the interface keeps the session language during provider-favorable
 * states (acquisition, e.g. checkout) but introduces a foreign language
 * strictly during termination or opt-out flows:
 *
 *   L(S_acquisition) = {L_session}  ∧  L(S_termination) \ {L_session} ≠ ∅
 *
 * Variant A (dark): the cancellation flow suddenly renders in German even
 * though the whole session — including signup and checkout — is English.
 * Variant B (benign): the identical termination flow stays in English.
 */


const GERMAN_PROMPT =
  "Möchten Sie Ihr Abonnement wirklich kündigen? Ihr Zugriff bleibt bis zum Ende des aktuellen Abrechnungszeitraums erhalten.";
const GERMAN_YES = "Ja, kündigen";
const GERMAN_NO = "Nein, behalten";

const ENGLISH_PROMPT =
  "Do you really want to cancel your subscription? You will keep access until the end of the current billing period.";
const ENGLISH_YES = "Yes, cancel my subscription";
const ENGLISH_NO = "No, keep my subscription";

type Step = "account" | "confirm" | "done";

export function WrongLanguageCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [step, setStep] = React.useState<Step>("account");
  const [cancelled, setCancelled] = React.useState(false);

  const reset = () => {
    setStep("account");
    setCancelled(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">L(S_acquisition)</span>
        <span className="font-mono font-semibold tabular-nums">{`{ en }`}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">L(S_termination) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{`{ en, de }`}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">L(S_term) ∖ {`{L_session}`}</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{`{ de } ≠ ∅`}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Flow step</span>
        <span className="font-mono font-semibold tabular-nums">{step}</span>
      </div>
    </>
  ) : null;

  const confirmPanel = (dark: boolean) => (
    <div className="rounded-md border bg-card p-3">
      <div className="flex items-start gap-2">
        <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
          dark ? "bg-rose-100 dark:bg-rose-900/30" : "bg-emerald-100 dark:bg-emerald-900/30"
        }`}>
          {dark ? (
            <svg className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v4m0 4h.01" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          ) : (
            <svg className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[11px] font-semibold">
            {dark ? "Kündigung bestätigen" : "Confirm cancellation"}
          </h3>
          <p className="text-[9px] leading-relaxed text-muted-foreground mt-1">
            {dark ? GERMAN_PROMPT : ENGLISH_PROMPT}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        <button
          onClick={() => { setCancelled(true); setStep("done"); }}
          className={`w-full rounded-md py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
            dark
              ? "bg-rose-600 hover:bg-rose-700 text-white"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
        >
          {dark ? GERMAN_YES : ENGLISH_YES}
        </button>
        <button
          onClick={() => { setCancelled(false); setStep("done"); }}
          className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground/70 transition-colors hover:text-foreground cursor-pointer"
        >
          {dark ? GERMAN_NO : ENGLISH_NO}
        </button>
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Wrong Language: Asymmetric State Application"
      caption="Asymmetric State Application — the interface stays in your session language during signup and checkout, but the cancellation flow abruptly switches to another language."
      auditorStats={stats}
      deltaNote="In Variant A the termination flow renders in German even though the session language is English — L(S_termination) ∖ {L_session} = {de} ≠ ∅ — while Variant B runs the identical flow entirely in the session language."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Account settings</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  StreamFlow Premium — billed monthly. Everything you see here is in English.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                en
              </div>
            </div>
            {step === "account" && (
              <button
                onClick={() => setStep("confirm")}
                className="mt-3 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground/80 transition-colors hover:text-foreground cursor-pointer"
              >
                Cancel subscription
              </button>
            )}
          </div>

          {step === "confirm" && confirmPanel(false)}

          {step === "done" && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {cancelled ? "Subscription cancelled" : "Subscription kept"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                The termination flow stayed in the session language end to end — L(S_termination) = {"{ en }"}. You read
                exactly what you confirmed: {cancelled ? "your subscription was cancelled deliberately." : "you chose to keep your subscription."}
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
              <h3 className="text-[11px] font-semibold">Account settings</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                StreamFlow Premium — billed monthly. Everything you see here is in English.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
              en
            </div>
          </div>
          {step === "account" && (
            <button
              onClick={() => setStep("confirm")}
              className="mt-3 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground/80 transition-colors hover:text-foreground cursor-pointer"
            >
              Cancel subscription
            </button>
          )}
        </div>

        {step === "confirm" && (
          <>
            <div className="rounded-md border border-amber-500/40 bg-amber-500/5 px-2.5 py-1.5 text-[9px] leading-relaxed text-amber-700 dark:text-amber-300">
              The interface just switched to <strong>Deutsch</strong> — you are now inside the termination flow.
            </div>
            {confirmPanel(true)}
          </>
        )}

        {step === "done" && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Asymmetric state application triggered
            </div>
            <p className="text-muted-foreground">
              During signup and checkout the interface rendered English only — L(S_acquisition) = {"{ en }"}. The moment you
              entered the termination flow it switched to German: L(S_termination) ∖ {"{L_session}"} = {"{ de }"} ≠ ∅.
            </p>
            <p className="text-muted-foreground">
              {cancelled
                ? `You just clicked “${GERMAN_YES}” (= “Yes, cancel”) — cancelling your subscription without being able to read the button. The linguistic barrier appeared exactly where the user-favorable action lives.`
                : `You clicked “${GERMAN_NO}” (= “No, keep”) — keeping a subscription you may not have wanted, because the choice was presented in a language you could not read.`}
            </p>
            <p className="text-muted-foreground">
              The discrepancy between acquisition and termination languages proves the switch is intentional, not stochastic.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
