"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Wrong Language — Condition 2: Visual-Linguistic Locale Mismatch
 *
 * Thesis: the algorithm compares the dominant language L_DOM detected in
 * rendered text nodes against the user agent's declared locale L_browser.
 * The feature triggers if critical functional text — privacy toggles,
 * consent buttons, cancellation flows — is rendered in a language that
 * does not match the user's declared preference:
 *
 *   L_DOM(N_critical) ≠ L_browser
 *
 * Variant A (dark): the consent banner looks English, but the critical
 * opt-out control is rendered in French.
 * Variant B (benign): the same control is rendered in the browser locale.
 */


const ACCEPT_ALL = "Accept all cookies";
const REJECT_DARK = "Refuser les cookies non essentiels";
const REJECT_BENIGN = "Reject non-essential cookies";
const NOTE_DARK = "Les paramètres de confidentialité s’appliquent à ce site.";
const NOTE_BENIGN = "Privacy settings apply to this site.";

type Choice = "none" | "all" | "essential";

export function WrongLanguageCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [choice, setChoice] = React.useState<Choice>("none");

  const reset = () => setChoice("none");

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">L_browser (declared locale)</span>
        <span className="font-mono font-semibold tabular-nums">en-US</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">L_DOM(N_critical) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">fr</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Mismatch</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">fr ≠ en-US</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Consent choice</span>
        <span className="font-mono font-semibold tabular-nums">{choice}</span>
      </div>
    </>
  ) : null;

  const banner = (dark: boolean) => (
    <div className="rounded-md border bg-card p-3">
      <div className="flex items-start gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-100 dark:bg-amber-900/30">
          <svg className="h-4 w-4 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[11px] font-semibold">We value your privacy</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            We use cookies to improve your experience and analyse traffic. Choose what you allow.
          </p>
          <p className="text-[8px] text-muted-foreground/60 mt-1">
            Site language: English · Your locale: en-US · Cookie controls:{" "}
            <span className={dark ? "font-semibold text-rose-500" : "font-semibold text-emerald-600 dark:text-emerald-400"}>
              {dark ? "Français" : "English"}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        <button
          onClick={() => setChoice("all")}
          className={`w-full rounded-md py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
            dark
              ? "bg-rose-600 hover:bg-rose-700 text-white"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
        >
          {ACCEPT_ALL}
        </button>
        <button
          onClick={() => setChoice("essential")}
          className={`w-full rounded-md border py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
            dark
              ? "border-rose-500/40 bg-background text-foreground/80 hover:text-foreground"
              : "border-emerald-500/40 bg-background text-foreground/80 hover:text-foreground"
          }`}
        >
          {dark ? REJECT_DARK : REJECT_BENIGN}
        </button>
      </div>
      <p className={`mt-2 text-[8px] italic ${dark ? "text-rose-500/70" : "text-emerald-600/70 dark:text-emerald-400/70"}`}>
        {dark ? NOTE_DARK : NOTE_BENIGN}
      </p>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Wrong Language: Visual-Linguistic Locale Mismatch"
      caption="Visual-Linguistic Locale Mismatch — the consent banner looks English, but the critical opt-out control is rendered in a language that does not match your declared locale."
      auditorStats={stats}
      deltaNote="In Variant A the critical opt-out control is rendered in French while your browser locale is en-US — L_DOM(N_critical) = fr ≠ L_browser — while Variant B renders the identical control in your locale."
      benign={
        <div className="space-y-3">
          {banner(false)}
          {choice !== "none" && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Consent recorded in your language
              </div>
              <p className="text-muted-foreground mt-0.5">
                {choice === "all"
                  ? "You accepted all cookies — the button said exactly that, in en-US."
                  : "You rejected non-essential cookies — the control was rendered in your declared locale (L_DOM(N_critical) = en = L_browser), so you knew precisely what you were choosing."}
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {banner(true)}
        {choice !== "none" && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Visual-linguistic locale mismatch triggered
            </div>
            <p className="text-muted-foreground">
              Your browser declares <strong className="text-foreground">en-US</strong>, and the banner headline reads
              English — but the critical node, the privacy opt-out control, is rendered in{" "}
              <strong className="text-rose-500">French</strong>. L_DOM(N_critical) = fr ≠ L_browser = en-US.
            </p>
            <p className="text-muted-foreground">
              {choice === "essential"
                ? `You clicked “${REJECT_DARK}” — which is actually the user-favorable choice (rejecting non-essential cookies). But you could not read it, and most users in this position either guess wrong or abandon the banner and accept the default.`
                : `You clicked “${ACCEPT_ALL}” — the one button in your own language. The opt-out was hidden behind a linguistic barrier, manufacturing consent for the business-favorable default.`}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
