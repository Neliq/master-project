"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Customisation (Interface Nesting) — Condition 1: Path Depth Asymmetry
 *
 * Thesis: the interface is a state transition graph G = (V, E) with S_0
 * the initial, primary layer. The feature triggers if the depth to the
 * provider-favorable state S_accept_all is minimal while the
 * user-favorable state S_reject_all requires traversing into a nested
 * customization layer S_custom — the path of least resistance is biased
 * toward the provider:
 *
 *   d(S_0, S_accept_all) = 1  AND  d(S_0, S_reject_all) >= 2
 *
 * Variant A (dark): "Accept All" lives on the primary layer; "Reject All"
 * is banished inside the "Customise settings" menu.
 * Variant B (benign): both macro-actions sit on layer 1, side by side.
 */

const CATEGORIES = [
  { id: "c1", label: "Strictly necessary cookies", locked: true, note: "Required for the site to function — cannot be disabled." },
  { id: "c2", label: "Analytics & performance", on: true, note: "Helps us understand how visitors use the site." },
  { id: "c3", label: "Advertising & marketing", on: true, note: "Used to show you ads on and off this site." },
  { id: "c4", label: "Personalisation", on: true, note: "Remembers your preferences and settings." },
  { id: "c5", label: "Social media integration", on: true, note: "Lets you share content on social platforms." },
];

export function CustomisationCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [customisingA, setCustomisingA] = React.useState(false);
  const [customisingB, setCustomisingB] = React.useState(false);
  const [onIdsA, setOnIdsA] = React.useState<string[]>(
    CATEGORIES.filter((c) => c.on).map((c) => c.id)
  );
  const [onIdsB, setOnIdsB] = React.useState<string[]>(
    CATEGORIES.filter((c) => c.on).map((c) => c.id)
  );
  const [outcomeA, setOutcomeA] = React.useState<"none" | "accepted" | "rejected">("none");
  const [outcomeB, setOutcomeB] = React.useState<"none" | "accepted" | "rejected">("none");
  const [acceptedViaA, setAcceptedViaA] = React.useState<"layer1" | "custom">("layer1");

  const reset = () => {
    setCustomisingA(false);
    setCustomisingB(false);
    setOnIdsA(CATEGORIES.filter((c) => c.on).map((c) => c.id));
    setOnIdsB(CATEGORIES.filter((c) => c.on).map((c) => c.id));
    setOutcomeA("none");
    setOutcomeB("none");
    setAcceptedViaA("layer1");
  };

  const toggle = (
    id: string,
    setOnIds: React.Dispatch<React.SetStateAction<string[]>>,
  ) => setOnIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">d(S_0, S_accept_all)</span>
        <span className="font-mono font-semibold tabular-nums">{1} click</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">d(S_0, S_reject_all) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{2} clicks</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">d(S_0, S_reject_all) — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{1} click</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Formula: 1 = 1 &and; 2 &ge; 2</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">TRUE</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Customisation (Interface Nesting): Path Depth Asymmetry"
      userTitle="Orbit — Customize privacy"
      caption="Path Depth Asymmetry — the provider-favorable macro-action is one click away on the primary layer, while the user-favorable equivalent is banished into a nested Customise menu."
      auditorStats={stats}
      deltaNote={`In Variant A, d(S_0, S_accept_all) = 1 but d(S_0, S_reject_all) = 2: “Reject All” exists only inside the “Customise settings” menu (S_custom), so the path of least resistance is mathematically biased toward the provider. In Variant B both macro-actions are on layer 1, so d(S_0, S_reject_all) = 1.`}
      benign={
        <div className="space-y-3">
          {!customisingB ? (
            <div className="rounded-md border bg-card p-3">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                  <svg className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[11px] font-semibold">Manage your cookie choices</h3>
                  <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">
                    We use cookies to improve your experience. Accept everything, reject
                    everything, or fine-tune — all from this first screen.
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOutcomeB("accepted")}
                  className="w-full rounded-md bg-green-600 hover:bg-green-700 py-2 text-[10px] font-semibold text-white transition-colors cursor-pointer"
                >
                  Accept All
                </button>
                <button
                  onClick={() => setOutcomeB("rejected")}
                  className="w-full rounded-md border border-green-600/50 bg-background hover:bg-green-500/10 py-2 text-[10px] font-semibold text-green-700 dark:text-green-300 transition-colors cursor-pointer"
                >
                  Reject All
                </button>
              </div>
              <button
                onClick={() => setCustomisingB(true)}
                className="mt-1.5 w-full py-1 text-[9px] font-medium text-muted-foreground/60 underline underline-offset-2 hover:text-muted-foreground transition-colors cursor-pointer"
              >
                Customise settings
              </button>
            </div>
          ) : (
            <div className="rounded-md border bg-card p-3">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-[11px] font-semibold">Customise settings</h3>
                <button
                  onClick={() => setCustomisingB(false)}
                  className="text-[9px] font-medium text-muted-foreground/60 underline underline-offset-2 hover:text-muted-foreground transition-colors cursor-pointer"
                >
                  Back
                </button>
              </div>
              <div className="space-y-1.5">
                {CATEGORIES.map((c) => (
                  <label key={c.id} className="flex cursor-pointer items-start gap-2 rounded-md border border-border bg-background p-2 transition-colors hover:border-foreground/20">
                    <input
                      type="checkbox"
                      checked={onIdsB.includes(c.id)}
                      disabled={c.locked}
                      onChange={() => toggle(c.id, setOnIdsB)}
                      className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${c.locked ? "" : "accent-green-500"}`}
                    />
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[10px] leading-relaxed ${c.locked ? "text-muted-foreground/50" : "text-foreground/80"}`}>
                        {c.label}
                      </span>
                      <span className="mt-0.5 block text-[8px] text-muted-foreground/60">{c.note}</span>
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setCustomisingB(false); setOutcomeB("rejected"); }}
                  className="w-full rounded-md border border-green-600/50 bg-background hover:bg-green-500/10 py-1.5 text-[10px] font-semibold text-green-700 dark:text-green-300 transition-colors cursor-pointer"
                >
                  Reject All
                </button>
                <button
                  onClick={() => { setCustomisingB(false); setOutcomeB("accepted"); }}
                  className="w-full rounded-md bg-green-600 hover:bg-green-700 py-1.5 text-[10px] font-semibold text-white transition-colors cursor-pointer"
                >
                  Save preferences
                </button>
              </div>
            </div>
          )}

          {outcomeB !== "none" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {outcomeB === "accepted" ? "Consent granted (1 click)" : "Tracking rejected (1 click)"}
              </div>
              <p className="mt-0.5 text-muted-foreground">
                {outcomeB === "accepted"
                  ? "Accepting took one click, and Reject All was available beside it on the same screen."
                  : "Rejecting took one click, identical to accepting. Both choices were available from the same screen."}
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {!customisingA ? (
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
                <svg className="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">Manage your cookie choices</h3>
                <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">
                  We and our partners use cookies to improve your experience and serve
                  personalised ads. By clicking “Accept All” you agree to all purposes.
                </p>
              </div>
            </div>
            <button
              onClick={() => { setOutcomeA("accepted"); setAcceptedViaA("layer1"); }}
              className="mt-3 w-full rounded-md bg-red-600 hover:bg-red-700 py-2.5 text-[11px] font-bold text-white shadow-md transition-colors cursor-pointer"
            >
              Accept All
            </button>
            <button
              onClick={() => setCustomisingA(true)}
              className="mt-1.5 w-full py-1 text-[9px] font-medium text-muted-foreground/50 underline underline-offset-2 hover:text-muted-foreground transition-colors cursor-pointer"
            >
              Customise settings
            </button>
          </div>
        ) : (
          <div className="rounded-md border bg-card p-3">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[11px] font-semibold">Customise settings</h3>
              <span className="font-mono text-[8px] tabular-nums text-muted-foreground/50">
                layer 2 of 2
              </span>
            </div>
            <div className="space-y-1.5">
              {CATEGORIES.map((c) => (
                <label key={c.id} className="flex cursor-pointer items-start gap-2 rounded-md border border-border bg-background p-2 transition-colors hover:border-foreground/20">
                  <input
                    type="checkbox"
                    checked={onIdsA.includes(c.id)}
                    disabled={c.locked}
                    onChange={() => toggle(c.id, setOnIdsA)}
                    className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${c.locked ? "" : "accent-red-500"}`}
                  />
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[10px] leading-relaxed ${c.locked ? "text-muted-foreground/50" : "text-foreground/80"}`}>
                      {c.label}
                    </span>
                    <span className="mt-0.5 block text-[8px] text-muted-foreground/60">{c.note}</span>
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <button
                onClick={() => { setCustomisingA(false); setOutcomeA("rejected"); }}
                className="w-full rounded-md border border-border bg-background hover:bg-foreground/5 py-1.5 text-[10px] font-medium text-muted-foreground transition-colors cursor-pointer"
              >
                Reject All
              </button>
              <button
                onClick={() => { setCustomisingA(false); setOutcomeA("accepted"); setAcceptedViaA("custom"); }}
                className="w-full rounded-md bg-red-600 hover:bg-red-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
              >
                Save preferences
              </button>
            </div>
            <p className="mt-2 text-[8px] text-muted-foreground/50">
              Note the “Reject All” button only exists on this nested layer.
            </p>
          </div>
        )}

        {outcomeA !== "none" && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Review privacy settings
            </div>
            <p className="text-muted-foreground">
              {outcomeA === "accepted" && acceptedViaA === "layer1"
                ? `Your settings were saved. You can review or change them from the privacy menu.`
                : outcomeA === "accepted"
                ? "You confirmed your custom selection, but Reject All was available only inside the nested customisation menu."
                : "You found Reject All inside the secondary Customise settings menu after opening an additional layer."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
