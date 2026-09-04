"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2, Cookie } from "lucide-react";

/*
 * False Hierarchy — Condition 1: Structural Element Downgrading
 *
 * Thesis: the business action is rendered as a primary interactive component
 * (a <button>), while its semantic opposite is structurally downgraded to a
 * bare textual link (<a>) whose clickable surface padding approaches zero —
 * camouflaging the user's escape route:
 *
 *   Tag(B_business) = <button> ∧ Tag(B_user) = <a> ∧ S_padding(B_user) ≈ 0
 *
 * Variant A (dark): "Accept all cookies" is a real padded button, "Reject
 * all" a bare text link with zero padding.
 * Variant B (benign): both actions are real buttons with equal clickable
 * surface.
 */

export function FalseHierarchyCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [darkChoice, setDarkChoice] = React.useState<null | "accept" | "reject">(null);
  const [benignChoice, setBenignChoice] = React.useState<null | "accept" | "reject">(null);
  // Variant A only: rejecting opens a nested settings screen (extra step).
  const [settingsOpen, setSettingsOpen] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="False Hierarchy: Structural Element Downgrading"
      caption="Structural Element Downgrading — the user-favorable “Reject all” is stripped of its interaction signifiers: a bare text link with ~0px padding that only opens a nested settings screen, while “Accept all cookies” is a one-click full button."
      deltaNote="In Variant A Tag(B_business) = <button> while Tag(B_user) = <a> with S_padding ≈ 0 — the escape route is camouflaged as secondary text, and rejecting costs an extra click: d(start → reject_all) = 2 &gt; d(start → accept_all) = 1 because “Reject all” only opens a nested cookie-settings screen. In Variant B both actions are real buttons with equal padding on the first screen, so the tag mismatch, the padding collapse, and the path-depth asymmetry vanish."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                <Cookie className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-[11px] font-semibold">Cookie consent</h3>
                <p className="text-[9px] text-muted-foreground">Your privacy on this site</p>
              </div>
            </div>

            <p className="mt-3 text-[10px] leading-relaxed text-foreground/80">
              We use cookies to personalise content and analyse traffic. You can choose how we
              process your data.
            </p>

            {/* both actions are <button>s with equal padding */}
            <div className="mt-3 grid grid-cols-1 gap-1.5">
              <button
                onClick={() => setBenignChoice("accept")}
                className="w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Accept all cookies
              </button>
              <button
                onClick={() => setBenignChoice("reject")}
                className="w-full rounded-md border border-green-600/50 bg-background text-green-700 dark:text-green-300 hover:bg-green-500/5 py-1.5 px-3 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Reject all
              </button>
            </div>
          </div>

          {benignChoice && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <CheckCircle2 className="w-3 h-3" />
                {benignChoice === "accept" ? "Cookies accepted" : "All cookies rejected"} — as chosen
              </div>
              <p className="text-muted-foreground mt-0.5">
                Tag(B_business) = Tag(B_user) = &lt;button&gt; with equal padding: both options
                carry full interaction signifiers, so neither action is camouflaged.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
              <Cookie className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-[11px] font-semibold">Cookie consent</h3>
              <p className="text-[9px] text-muted-foreground">Your privacy on this site</p>
            </div>
          </div>

          <p className="mt-3 text-[10px] leading-relaxed text-foreground/80">
            We use cookies to personalise content and analyse traffic. You can choose how we
            process your data.
          </p>

          <div className="mt-3 grid grid-cols-1 gap-1.5">
            {/* B_business: primary interactive component — one click to accept */}
            <button
              onClick={() => setDarkChoice("accept")}
              className="w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-2 px-3 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              Accept all cookies
            </button>
            {/* B_user: structurally downgraded to a bare text link that only opens a nested screen */}
            {!settingsOpen ? (
              <a
                href="#reject"
                onClick={(e) => {
                  e.preventDefault();
                  setSettingsOpen(true);
                }}
                className="mx-auto text-center text-[9px] text-muted-foreground/60 hover:text-muted-foreground underline underline-offset-2 transition-colors cursor-pointer py-0 px-0"
                style={{ padding: 0 }}
              >
                Reject all
              </a>
            ) : (
              <div className="rounded-md border border-border bg-background p-2.5">
                <div className="text-[9px] font-semibold text-foreground">Cookie settings</div>
                <p className="text-[8px] text-muted-foreground mt-1 leading-relaxed">
                  We use cookies for essential functions, personalisation, and advertising. Choose
                  what you allow:
                </p>
                <div className="mt-1.5 space-y-1">
                  {[
                    ["Essential cookies", true],
                    ["Personalised advertising", false],
                    ["Analytics", false],
                    ["Advertising partners", false],
                  ].map(([label, on]) => (
                    <label key={label as string} className="flex items-center justify-between text-[8px]">
                      <span className="text-foreground/80">{label}</span>
                      <input
                        type="checkbox"
                        defaultChecked={on as boolean}
                        disabled={label === "Essential cookies"}
                        className="h-3 w-3 accent-red-500"
                      />
                    </label>
                  ))}
                </div>
                <div className="mt-2 flex gap-1.5">
                  <button
                    onClick={() => setDarkChoice("reject")}
                    className="flex-1 rounded-md border border-border bg-background py-1.5 text-[9px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Reject all non-essential
                  </button>
                  <button
                    onClick={() => setDarkChoice("accept")}
                    className="flex-1 rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[9px] font-semibold transition-colors cursor-pointer"
                  >
                    Save preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {mode === "auditor" && darkChoice && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <AlertTriangle className="w-3 h-3" />
              Cookie preferences saved
            </div>
            <p className="text-muted-foreground">
              {darkChoice === "accept"
                ? "You clicked the big button — 43 partner networks now set tracking cookies, in one click."
                : "You found the tiny link and rejected everything — but only after a detour through the nested cookie-settings screen."}{" "}
              The math behind the banner:{" "}
              <strong className="text-red-500">
                Tag(B_business) = &lt;button&gt; ∧ Tag(B_user) = &lt;a&gt; ∧ S_padding(B_user) ≈ 0 ∧ d(start → reject_all) = 2 &gt; d(start → accept_all) = 1
              </strong>
              .
            </p>
            <p className="text-muted-foreground">
              The user-favorable action was stripped of its interaction signifiers and its
              clickable surface — a bare 9px text link whose padding collapses to zero, while the
              business action dominates as a padded, full-width button. Rejecting does not even
              live on the first screen: “Reject all” only opens a nested settings panel, so the
              path to declining is strictly deeper than the path to accepting.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
