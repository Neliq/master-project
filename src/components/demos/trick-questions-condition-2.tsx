"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Trick Questions — Condition 2: Shifting Semantic Polarity in Node Arrays
 *
 * A visually grouped list of checkboxes where some items use positive polarity
 * (check = opt in) and others use negative polarity (check = opt out).
 * The inconsistency is deliberately hidden behind similar phrasing, so users
 * who skim assume all checkboxes behave the same way.
 */

interface CheckItem {
  id: string;
  label: string;
  /** true = checking the box means you opt IN / accept */
  positivePolarity: boolean;
  defaultChecked: boolean;
}

const ITEMS: CheckItem[] = [
  {
    id: "offers",
    label: "Send me exclusive offers and promotional discounts",
    positivePolarity: true,
    defaultChecked: false,
  },
  {
    id: "no-share",
    label: "Protect my privacy — do not share my personal information with third parties",
    positivePolarity: false,
    defaultChecked: false,
  },
  {
    id: "recommend",
    label: "Receive personalised product recommendations based on my browsing history",
    positivePolarity: true,
    defaultChecked: false,
  },
  {
    id: "unsubscribe",
    label: "Opt me out of partner newsletters and third-party communications",
    positivePolarity: false,
    defaultChecked: false,
  },
  {
    id: "early",
    label: "Get early access to new features and beta programs",
    positivePolarity: true,
    defaultChecked: false,
  },
  {
    id: "analytics",
    label: "Help improve our service — share anonymous usage analytics",
    positivePolarity: true,
    defaultChecked: false,
  },
];

function describe(id: string, checked: boolean, positive: boolean): string {
  const affirmative = positive ? "opted IN" : "opted OUT";
  const action = positive
    ? checked
      ? "will receive"
      : "will NOT receive"
    : checked
      ? "will NOT have data shared / will be unsubscribed"
      : "WILL have data shared / will receive communications";

  switch (id) {
    case "offers":
      return checked
        ? (positive ? "You WILL receive promotional offers" : "You will NOT receive promotional offers")
        : (positive ? "You will NOT receive promotional offers" : "You WILL receive promotional offers");
    case "no-share":
      return checked
        ? (positive ? "Your data WILL be shared" : "Your data will NOT be shared")
        : (positive ? "Your data will NOT be shared" : "Your data WILL be shared");
    case "recommend":
      return checked
        ? (positive ? "You WILL get personalised recommendations" : "You will NOT get personalised recommendations")
        : (positive ? "You will NOT get personalised recommendations" : "You WILL get personalised recommendations");
    case "unsubscribe":
      return checked
        ? (positive ? "You will receive partner newsletters" : "You will NOT receive partner newsletters")
        : (positive ? "You will NOT receive partner newsletters" : "You WILL receive partner newsletters");
    case "early":
      return checked
        ? (positive ? "You WILL get early access" : "You will NOT get early access")
        : (positive ? "You will NOT get early access" : "You WILL get early access");
    case "analytics":
      return checked
        ? (positive ? "Anonymous analytics WILL be collected" : "Anonymous analytics will NOT be collected")
        : (positive ? "Anonymous analytics will NOT be collected" : "Anonymous analytics WILL be collected");
    default:
      return "";
  }
}

export function TrickQuestionsCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [states, setStates] = React.useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const item of ITEMS) init[item.id] = item.defaultChecked;
    return init;
  });
  const [saved, setSaved] = React.useState(false);

  const reset = () => {
    const init: Record<string, boolean> = {};
    for (const item of ITEMS) init[item.id] = item.defaultChecked;
    setStates(init);
    setSaved(false);
  };

  const toggle = (id: string) => {
    setStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const invertedIds = ITEMS.filter(i => !i.positivePolarity).map(i => i.id);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Total checkboxes</span>
        <span className="font-mono font-semibold tabular-nums">{ITEMS.length}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Inverted polarity (check = opt out)</span>
        <span className="font-mono font-semibold tabular-nums">{invertedIds.length} / {ITEMS.length}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Polarity-flipped items</span>
        <span className="font-mono font-semibold tabular-nums">{invertedIds.join(", ")}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Trick Questions: Shifting Semantic Polarity in Node Arrays"
      caption="Shifting Semantic Polarity in Node Arrays — a visually grouped list where the meaning of a checkmark flips between items." auditorStats={stats}>
      <div className="space-y-3">
        {/* ── Header ── */}
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Marketing &amp; Privacy Preferences</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Manage how we communicate with you. Check the boxes you agree to.
          </p>
        </div>

        {/* ── Checkbox list ── */}
        <div className="rounded-md border divide-y divide-border">
          {ITEMS.map(item => {
            const checked = states[item.id];
            const polarityLabel = item.positivePolarity
              ? "check = opt in"
              : "check = opt out";
            return (
              <label
                key={item.id}
                className={`flex items-start gap-2.5 p-2.5 cursor-pointer group transition-colors ${
                  !item.positivePolarity && checked
                    ? "bg-rose-500/5"
                    : item.positivePolarity && checked
                      ? "bg-emerald-500/5"
                      : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(item.id)}
                  className="mt-0.5 flex-shrink-0 accent-rose-500"
                />
                <div className="min-w-0 flex-1">
                  <div className={`text-[10px] leading-relaxed ${
                    checked ? "text-foreground font-medium" : "text-foreground/70"
                  }`}>
                    {item.label}
                  </div>
                  {mode === "auditor" && (
                    <div className={`text-[7px] mt-0.5 font-mono uppercase tracking-wider ${
                      item.positivePolarity ? "text-emerald-500/60" : "text-rose-500/60"
                    }`}>
                      {polarityLabel}
                    </div>
                  )}
                </div>
                <div className={`text-[8px] font-mono flex-shrink-0 self-center px-1.5 py-0.5 rounded ${
                  checked
                    ? "bg-foreground/10 text-foreground/70"
                    : "bg-muted text-muted-foreground/50"
                }`}>
                  {checked ? "ON" : "OFF"}
                </div>
              </label>
            );
          })}
        </div>

        {/* ── Save button ── */}
        <button
          onClick={() => setSaved(true)}
          className="w-full rounded-md bg-foreground text-background py-1.5 text-[10px] font-medium hover:opacity-90 transition-opacity cursor-pointer"
        >
          Save preferences
        </button>

        {/* ── Saved reveal ── */}
        {saved && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Polarity trap — your checkmarks mean different things
            </div>
            <p className="text-muted-foreground">
              In this list, <strong className="text-rose-500">2 out of 6</strong> checkboxes have
              <strong> inverted polarity</strong>: checking them means you are opting OUT,
              not opting IN. The phrasing makes them look like the others, so you cannot tell
              at a glance whether a checkmark protects you or surrenders your data.
            </p>
            <div className="divide-y divide-border/50 rounded border text-[8px]">
              {ITEMS.map(item => {
                const checked = states[item.id];
                return (
                  <div key={item.id} className="flex items-start gap-2 p-1.5">
                    <span className={`flex-shrink-0 w-3 h-3 rounded flex items-center justify-center text-[6px] font-bold ${
                      checked ? "bg-foreground text-background" : "border border-muted-foreground/30"
                    }`}>
                      {checked ? "✓" : ""}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-muted-foreground">{item.label}</div>
                      <div className={`font-medium ${
                        (!item.positivePolarity && checked) || (item.positivePolarity && !checked)
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}>
                        → {describe(item.id, checked, item.positivePolarity)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-muted-foreground mt-1">
              A user who skims and checks every box expecting to opt in will
              inadvertently opt out of privacy protections.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
