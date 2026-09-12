"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Privacy Maze — Condition 1: Asymmetrical Path Depth
 *
 * Thesis: the consent interface is a directed graph G = (V, E) with
 * v_start on page load and two terminal states, v_accept_all and
 * v_reject_all. The feature triggers if the navigational effort to
 * reject tracking strictly exceeds the effort to accept it, or if the
 * rejection path exceeds the heuristic depth threshold tau_depth:
 *
 *   d(v_start, v_reject_all) > d(v_start, v_accept_all)
 *     OR d(v_start, v_reject_all) > tau_depth
 *
 * Variant A (dark): "Accept All" is a single click; rejecting requires a
 * 5-step traversal through dense toggle screens and a buried tiny link.
 * Variant B (benign): accept and reject are both one click, side by side.
 */

const DEPTH_REJECT = 5;
const TAU_DEPTH = 4;

const PURPOSES = [
  { id: "p1", label: "Store and/or access information on a device", on: true },
  { id: "p2", label: "Personalised advertising and content", on: true },
  { id: "p3", label: "Ad measurement", on: true },
  { id: "p4", label: "Audience research and insights", on: true },
  { id: "p5", label: "Develop and improve products", on: true },
  { id: "p6", label: "Precise geolocation data", on: false },
  { id: "p7", label: "Active fingerprinting of device characteristics", on: false },
];

const PARTNERS = [
  "AdExchange Holdings",
  "DataBridge Media Group",
  "Insight Analytics Network",
  "Precision Reach Ltd",
  "Vantage Audience Corp",
];

function ToggleRow({
  label, note, on, onChange, accent,
}: {
  label: string;
  note?: string;
  on: boolean;
  onChange: () => void;
  accent: "rose" | "emerald";
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2 rounded-md border border-border bg-background p-2 transition-colors hover:border-foreground/20">
      <input
        type="checkbox"
        checked={on}
        onChange={onChange}
        className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${accent === "rose" ? "accent-primary" : "accent-primary"}`}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] leading-relaxed text-foreground/80">{label}</span>
        {note ? (
          <span className="mt-0.5 block text-[8px] text-muted-foreground/60">{note}</span>
        ) : null}
      </span>
    </label>
  );
}

export function PrivacyMazeCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [step, setStep] = React.useState<"banner" | "purposes" | "partners" | "advanced" | "confirm">("banner");
  const [onIds, setOnIds] = React.useState<string[]>(
    PURPOSES.filter((p) => p.on).map((p) => p.id)
  );
  const [outcomeA, setOutcomeA] = React.useState<"none" | "accepted" | "rejected">("none");
  const [outcomeB, setOutcomeB] = React.useState<"none" | "accepted" | "rejected">("none");
  const [acceptedVia, setAcceptedVia] = React.useState<"banner" | "defaults">("banner");


  const toggle = (id: string) =>
    setOnIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <DemoShell mode={mode}
      title="Privacy Maze: Asymmetrical Path Depth"
      userTitle="Orbit — Privacy choices"
      caption="Asymmetrical Path Depth — accepting tracking is one click, while rejecting it is buried five navigational steps deep in a maze of granular toggles."
      deltaNote={`In Variant A, d(v_start, v_accept_all) = 1 but d(v_start, v_reject_all) = ${DEPTH_REJECT} (> τ_depth = ${TAU_DEPTH}): rejecting means crossing three dense toggle screens, a buried tiny link, and a confirmation dialog. In Variant B both terminal states sit one click from v_start, so the graph is balanced.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted/40">
                <svg className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">We value your privacy</h3>
                <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">
                  We use cookies to remember your preferences and show relevant content. Choose
                  exactly what you consent to — every option is equally easy to reach.
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setOutcomeB("accepted")}
                className="w-full rounded-md bg-primary hover:bg-primary/80 py-2 text-[10px] font-semibold text-primary-foreground transition-colors cursor-pointer"
              >
                Accept All
              </button>
              <button
                onClick={() => setOutcomeB("rejected")}
                className="w-full rounded-md border border-border/60 bg-background hover:bg-muted/60 py-2 text-[10px] font-semibold text-foreground transition-colors cursor-pointer"
              >
                Reject All
              </button>
            </div>
            <p className="mt-2 text-center text-[8px] text-muted-foreground/60">
              Both choices are one click away and equally easy to reach.
            </p>
          </div>

          {outcomeB !== "none" && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {outcomeB === "accepted" ? "Consent granted (one click)" : "Tracking rejected (one click)"}
              </div>
              <p className="mt-0.5 text-muted-foreground">
                {outcomeB === "accepted"
                  ? "Accepting took 1 click. Rejecting would also have taken exactly 1 click — the graph is symmetric, so there is no structural pressure toward surrender."
                  : "Rejecting took 1 click, identical to accepting. The interface imposes no extra cognitive cost on protecting your privacy."}
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {step === "banner" && (
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted/40">
                <svg className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">We value your privacy</h3>
                <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">
                  We and our partners store and/or access information on a device, such as
                  cookies, and process personal data to serve personalised ads and content,
                  as described in our privacy policy.
                </p>
              </div>
            </div>
            <button
              onClick={() => { setOutcomeA("accepted"); setAcceptedVia("banner"); }}
              className="mt-3 w-full rounded-md bg-primary hover:bg-primary/80 py-2.5 text-[11px] font-bold text-primary-foreground shadow-md transition-colors cursor-pointer"
            >
              Accept All
            </button>
            <button
              onClick={() => setStep("purposes")}
              className="mt-1.5 w-full py-1 text-[9px] font-medium text-muted-foreground/50 underline underline-offset-2 hover:text-muted-foreground transition-colors cursor-pointer"
            >
              Manage options
            </button>
          </div>
        )}

        {(step === "purposes" || step === "partners") && (
          <div className="rounded-md border bg-card p-3">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[11px] font-semibold">
                {step === "purposes" ? "Step 1 of 3 — Cookie purposes" : `Step 2 of 3 — Your choices for ${PARTNERS.length} partners`}
              </h3>
              <span className="text-[8px] font-mono text-muted-foreground/50">
                {step === "purposes" ? `${PURPOSES.length} purposes` : `${PARTNERS.length} partners`}
              </span>
            </div>
            <p className="mb-2 text-[9px] text-muted-foreground">
              {step === "purposes"
                ? "Select the purposes for which we process your data. Most are already selected for your convenience."
                : "Each partner below processes your data independently. Review every one, or accept them all as listed."}
            </p>
            <div className="space-y-1.5">
              {step === "purposes"
                ? PURPOSES.map((p) => (
                    <ToggleRow key={p.id} label={p.label} on={onIds.includes(p.id)} onChange={() => toggle(p.id)} accent="rose" />
                  ))
                : PARTNERS.map((name) => (
                    <ToggleRow key={name} label={name} note="Processing your data for personalised advertising" on={onIds.includes(name)} onChange={() => toggle(name)} accent="rose" />
                  ))}
            </div>
            <button
              onClick={() => setStep(step === "purposes" ? "partners" : "advanced")}
              className="mt-2.5 w-full rounded-md bg-primary hover:bg-primary/80 py-1.5 text-[10px] font-medium text-primary-foreground transition-colors cursor-pointer"
            >
              Continue
            </button>
          </div>
        )}

        {step === "advanced" && (
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Step 3 of 3 — Advanced settings</h3>
            <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">
              Fine-tune every purpose and each of the {PARTNERS.length} partners individually. Your current
              selection ({onIds.length} items on) is applied unless you change it here.
            </p>
            <div className="mt-2 rounded-md border border-border bg-background p-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-foreground/80">Global control</span>
                <button
                  onClick={() => setStep("confirm")}
                  className="text-[9px] font-medium text-muted-foreground/50 underline underline-offset-2 hover:text-muted-foreground transition-colors cursor-pointer"
                >
                  Reject all tracking
                </button>
              </div>
              <p className="mt-0.5 text-[8px] text-muted-foreground/50">
                Toggle the global setting to decline every purpose and partner at once.
              </p>
            </div>
            <button
              onClick={() => { setOutcomeA("accepted"); setAcceptedVia("defaults"); }}
              className="mt-2.5 w-full rounded-md border border-border bg-background hover:bg-foreground/5 py-1.5 text-[10px] font-medium text-foreground/80 transition-colors cursor-pointer"
            >
              Confirm my choices
            </button>
          </div>
        )}

        {step === "confirm" && (
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-2">
              <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">Reject all tracking?</h3>
                <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">
                  This will disable all purposes and all {PARTNERS.length} partners. You will see fewer
                  personalised ads. This action cannot be undone from this screen.
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setStep("advanced")}
                className="w-full rounded-md border border-border bg-background hover:bg-foreground/5 py-1.5 text-[10px] font-medium text-foreground/80 transition-colors cursor-pointer"
              >
                Go back
              </button>
              <button
                onClick={() => setOutcomeA("rejected")}
                className="w-full rounded-md bg-primary hover:bg-primary/80 py-1.5 text-[10px] font-medium text-primary-foreground transition-colors cursor-pointer"
              >
                Yes, reject all
              </button>
            </div>
          </div>
        )}

        {outcomeA !== "none" && (
          <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Privacy settings
            </div>
            <p className="text-muted-foreground">
              {outcomeA === "accepted" && acceptedVia === "banner"
                ? "You chose Accept All on the first screen. The quieter settings route required several extra screens to reach."
                : outcomeA === "accepted"
                ? `You confirmed your choices, but ${PURPOSES.filter((p) => onIds.includes(p.id)).length} of ${PURPOSES.length} purposes were already selected by default, so tracking continues. Your choices were saved.`
                : "You made it through the additional settings screens and rejected tracking. Your privacy choice was saved."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
