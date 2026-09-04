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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [choice, setChoice] = React.useState<Choice>("none");


  const banner = (dark: boolean) => (
    <div className="rounded-md border bg-card p-3">
      <div className="flex items-start gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-yellow-100 dark:bg-yellow-900/30">
          <svg className="h-4 w-4 text-yellow-600 dark:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <span className={dark ? "font-semibold text-red-500" : "font-semibold text-green-600 dark:text-green-400"}>
              {dark ? "Français" : "English"}
            </span>
          </p>
        </div>
      </div>
      {choice === "none" ? (
        <div className="mt-3 flex flex-col gap-1.5">
        <button
          onClick={() => setChoice("all")}
          className={`w-full rounded-md py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
            dark
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {ACCEPT_ALL}
        </button>
        <button
          lang={dark ? "fr" : "en"}
          onClick={() => setChoice("essential")}
          className={`w-full rounded-md border py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
            dark
              ? "border-red-500/40 bg-background text-foreground/80 hover:text-foreground"
              : "border-green-500/40 bg-background text-foreground/80 hover:text-foreground"
          }`}
        >
          {dark ? REJECT_DARK : REJECT_BENIGN}
        </button>
        </div>
      ) : (
        <p className="mt-3 text-[9px] text-muted-foreground">Cookie preferences saved.</p>
      )}
      <p className={`mt-2 text-[8px] italic ${dark ? "text-red-500/70" : "text-green-600/70 dark:text-green-400/70"}`}>
        {dark ? NOTE_DARK : NOTE_BENIGN}
      </p>
    </div>
  );

  return (
    <DemoShell mode={mode}
      title="Wrong Language: Visual-Linguistic Locale Mismatch"
      caption="Visual-Linguistic Locale Mismatch — the consent banner looks English, but the critical opt-out control is rendered in a language that does not match your declared locale."
      deltaNote="In Variant A the critical opt-out control is rendered in French while your browser locale is en-US — L_DOM(N_critical) = fr ≠ L_browser — while Variant B renders the identical control in your locale."
      benign={
        <div className="space-y-3">
          {banner(false)}

        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {banner(true)}

      </div>
    </DemoShell>
  );
}
