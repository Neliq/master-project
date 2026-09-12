"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Choice Overload — Condition 1: Excessive Element Quantization
 *
 * Thesis: C_choices = {c_1, ..., c_n} is the set of distinct actionable
 * input nodes (vendor checkboxes, cookie toggles) inside one decision
 * context M_decision. tau_cognitive_limit models Miller's 7 ± 2 working
 * memory band. The feature triggers when the sheer volume of granular
 * choices exceeds a heuristic upper bound:
 *
 *   |C_choices| > tau_overload   (e.g. > 20 individual toggles)
 *
 * Variant A (dark): 24 vendor toggles with no "Reject all" affordance —
 * the only one-click path is "Accept all", so the path of least
 * resistance is the provider-favorable default (Hick's Law in action).
 * Variant B (benign): the same consent areas are grouped into eight
 * manageable controls, with a "Reject all" button beside "Accept all".
 */

const VENDORS = [
  "Meta Ads", "Google Ads", "TikTok Ads", "Criteo", "Taboola", "Outbrain",
  "AdRoll", "The Trade Desk", "Amazon Ads", "Microsoft Ads", "Pinterest Ads",
  "Snap Ads", "X Ads", "LinkedIn Ads", "PubMatic", "Index Exchange",
  "Magnite", "TripleLift", "Verizon Media", "Sovrn", "Rubicon Project",
  "Sharethrough", "SpotX", "OpenX",
];

const TAU_OVERLOAD = 20;
const MILLER_LOW = 5;
const MILLER_HIGH = 9;
const BENIGN_CHOICES = [
  "Advertising partners", "Analytics", "Personalisation", "Measurement",
  "Social features", "Content recommendations", "Security", "Essential services",
];
const ALL_TOGGLE_KEYS = [...VENDORS, ...BENIGN_CHOICES];

type Decision = "accept" | "save" | "reject" | null;

export function ChoiceOverloadCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [toggles, setToggles] = React.useState<Record<string, boolean>>(
    () => Object.fromEntries(ALL_TOGGLE_KEYS.map((v) => [v, false]))
  );
  const [decision, setDecision] = React.useState<Decision>(null);


  const flip = (vendor: string) =>
    setToggles((t) => ({ ...t, [vendor]: !t[vendor] }));

  const rejectAll = () => {
    setToggles(Object.fromEntries(ALL_TOGGLE_KEYS.map((v) => [v, false])));
    setDecision("reject");
  };

  const acceptAll = () => {
    setToggles(Object.fromEntries(ALL_TOGGLE_KEYS.map((v) => [v, true])));
    setDecision("accept");
  };

  const enabledCount = Object.values(toggles).filter(Boolean).length;

  const toggleList = (accent: "rose" | "emerald", choices = VENDORS) => (
    <div className="mt-2 max-h-40 space-y-1 overflow-y-auto rounded-md border bg-background p-2">
      {choices.map((v) => (
        <label key={v} className="flex cursor-pointer items-center justify-between gap-2 rounded px-1 py-0.5 transition-colors hover:bg-muted/50">
          <span className="text-[9px] text-muted-foreground truncate">{v}</span>
          <input
            type="checkbox"
            checked={!!toggles[v]}
            onChange={() => flip(v)}
            className={`h-3 w-3 flex-shrink-0 ${accent === "rose" ? "accent-primary" : "accent-primary"}`}
          />
        </label>
      ))}
    </div>
  );

  return (
    <DemoShell mode={mode}
      title="Choice Overload: Excessive Element Quantization"
      caption="Excessive Element Quantization — 24 granular vendor toggles with no one-click reject path: declining means manually switching off 24 switches, while accepting is a single click."
      deltaNote="Both variants expose the identical 24-vendor toggle list with the same starting state. Variant A offers only 'Accept all' and 'Save my choices', so the path of least resistance is the provider-favorable default; Variant B adds a 'Reject all' button of equal prominence, making the user-favorable action one click too."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">We value your privacy</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  We and our {VENDORS.length} partners use cookies and similar technologies to
                  store and access information on your device. You can accept all, reject all,
                  or manage each partner individually below.
                </p>
              </div>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
                {VENDORS.length} partners
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={acceptAll}
                className="rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Accept all
              </button>
              <button
                onClick={rejectAll}
                className="rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Reject all
              </button>
            </div>
            <button
              onClick={() => setDecision("save")}
              className="mt-2 w-full rounded-md border border-border/60 bg-muted/40 text-foreground hover:bg-muted/40 py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Save my choices
            </button>

            {toggleList("emerald", BENIGN_CHOICES)}

            <p className="text-[8px] text-muted-foreground/60 mt-2">
              Rejecting all disables every partner toggle in one click; you can always
              revisit these settings later.
            </p>
          </div>

          {decision && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {decision === "accept"
                  ? "All accepted"
                  : decision === "reject"
                    ? "All rejected in one click"
                    : `Choices saved (${enabledCount} partner${enabledCount === 1 ? "" : "s"} on)`}
              </div>
              <p className="text-muted-foreground mt-0.5">
                {decision === "accept"
                  ? "You accepted all 24 partners with one click — the same number of choices you would otherwise have to manage individually when declining."
                  : decision === "reject"
                    ? `You rejected all ${VENDORS.length} partners with a single click. A 'Reject all' affordance with the same prominence as 'Accept all' restores informed refusal.`
                    : "You manually configured your choices. Because a reject-all path exists, opting out never requires 24 individual switches."}
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">We value your privacy</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                We and our {VENDORS.length} partners use cookies and similar technologies to
                store and access information on your device. You can accept all or manage each
                partner individually below.
              </p>
            </div>
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
              {VENDORS.length} partners
            </span>
          </div>

          <div className="mt-3 space-y-2">
            <button
              onClick={acceptAll}
              className="w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-2 text-[11px] font-bold transition-colors cursor-pointer"
            >
              Accept all
            </button>
            <button
              onClick={() => setDecision("save")}
              className="w-full rounded-md border border-border bg-background text-muted-foreground hover:text-foreground py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Save my choices
            </button>
          </div>

          {toggleList("rose")}

          <p className="text-[8px] text-muted-foreground/40 mt-2 italic">
            There is no &ldquo;reject all&rdquo; — decline by switching off each of the{" "}
            {VENDORS.length} partners individually.
          </p>
        </div>

        {mode !== "auditor" && decision && (
          <div className="rounded-md border border-border bg-muted/30 p-2.5 text-[9px] leading-relaxed">
            <div className="font-semibold uppercase tracking-tight">Privacy preferences saved</div>
            <p className="text-muted-foreground mt-0.5">
              {decision === "accept" ? "All partner categories are enabled." : "Your selected privacy preferences were saved."}
            </p>
          </div>
        )}

        {mode === "auditor" && decision && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              {decision === "accept" ? "All partners accepted" : "Manual decline"}
            </div>
            <p className="text-muted-foreground">
              <strong className="font-mono text-red-500">|C_choices| = {VENDORS.length} &gt; τ_overload = {TAU_OVERLOAD}</strong>{" "}
              — the interface renders {VENDORS.length} distinct actionable toggles in one
              decision context, far beyond the {MILLER_LOW}–{MILLER_HIGH} item working-memory
              band.
            </p>
            <p className="text-muted-foreground">
              {decision === "accept"
                ? `All ${VENDORS.length} partners were accepted. You can review or change these settings below.`
                : `You manually switched ${enabledCount} of ${VENDORS.length} partners off. The absence of a reject-all button makes refusal a ${VENDORS.length}-step slog, so most users give up and accept — exactly what the quantization is designed to achieve.`}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
