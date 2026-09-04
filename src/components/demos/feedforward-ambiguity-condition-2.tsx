"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Feedforward Ambiguity — Condition 2: Iconographic Entropy and Missing Affordances
 *
 * Thesis: N_icon is a graphical interactive node lacking adjacent visible
 * text and accessibility attributes. An icon-classification model yields a
 * probability distribution CV_class over possible meanings; its Shannon
 * entropy H(CV_class) measures contextual ambiguity. The feature triggers
 * if a critical action relies on a highly ambiguous icon without a
 * clarifying tooltip or accessible label:
 *
 *   H(CV_class(N_icon)) > τ_entropy  ∧  T_hover = ∅
 *
 * Variant A (dark): a settings row of bare icon buttons — the data-sharing
 * control is a label-less network glyph with no tooltip and no aria-label.
 * Variant B (benign): the identical settings with explicit, labelled
 * controls that state their outcome and state.
 */

type Pressed = "none" | "2fa" | "push" | "share" | "toggle";

export function FeedforwardAmbiguityCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [sharing, setSharing] = React.useState(false);
  const [pressed, setPressed] = React.useState<Pressed>("none");


  const networkIcon = (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M12 7.5L6.2 17M12 7.5l5.8 9.5" />
    </svg>
  );

  const shieldIcon = (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
    </svg>
  );

  const bellIcon = (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6zM10 19a2 2 0 004 0" />
    </svg>
  );

  return (
    <DemoShell mode={mode}
      title="Feedforward Ambiguity: Iconographic Entropy and Missing Affordances"
      caption="Iconographic Entropy and Missing Affordances — a critical privacy action hangs on a bare icon with no label, no tooltip, and a high-entropy meaning space."
      deltaNote="In Variant A the data-sharing control is a label-less, tooltip-less icon whose classifier entropy (2.31 bits) exceeds τ_entropy. Variant B keeps the identical setting but replaces it with an explicit, labelled switch."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Security settings</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">Every control states exactly what it does.</p>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between gap-2 rounded-md border bg-background p-2.5">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-medium text-foreground/80">Two-factor authentication</div>
                  <div className="text-[8px] text-muted-foreground/50 mt-0.5">Add an extra code at login.</div>
                </div>
                <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                  On
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 rounded-md border bg-background p-2.5">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-medium text-foreground/80">Push notifications</div>
                  <div className="text-[8px] text-muted-foreground/50 mt-0.5">Alerts about your account activity.</div>
                </div>
                <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-muted-foreground rounded-full border border-border px-2 py-0.5 shrink-0">
                  Off
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 rounded-md border bg-background p-2.5">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-medium text-foreground/80">Data sharing with partners</div>
                  <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                    {sharing
                      ? "Your data is shared with 12 marketing partners. Turn this off to revoke."
                      : "Currently off — your data is not shared with any partner."}
                  </div>
                </div>
                <button
                  onClick={() => { setSharing(!sharing); setPressed("toggle"); }}
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold transition-colors cursor-pointer ${
                    sharing
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "border border-border bg-background text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {sharing ? "On — turn off" : "Off — turn on"}
                </button>
              </div>
            </div>
          </div>

          {pressed === "toggle" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Feedforward present
              </div>
              <p className="text-muted-foreground mt-0.5">
                The switch&rsquo;s label and state told you exactly what would happen before you clicked — and the
                outcome (sharing {sharing ? "enabled" : "disabled"}) matches what the control promised.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Security settings</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Manage your account security and sharing preferences.
          </p>

          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between gap-2 rounded-md border bg-background p-2.5">
              <div className="text-[9px] text-muted-foreground/60">Account protection</div>
              <button
                onClick={() => setPressed("2fa")}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-red-500/50 hover:text-red-500 cursor-pointer"
              >
                {shieldIcon}
              </button>
            </div>
            <div className="flex items-center justify-between gap-2 rounded-md border bg-background p-2.5">
              <div className="text-[9px] text-muted-foreground/60">Activity alerts</div>
              <button
                onClick={() => setPressed("push")}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-red-500/50 hover:text-red-500 cursor-pointer"
              >
                {bellIcon}
              </button>
            </div>
            <div className="flex items-center justify-between gap-2 rounded-md border bg-background p-2.5">
              <div className="text-[9px] text-muted-foreground/60">Partner integrations</div>
              <button
                onClick={() => { setSharing(true); setPressed("share"); }}
                className={`flex h-7 w-7 items-center justify-center rounded-md border transition-colors cursor-pointer ${
                  sharing
                    ? "border-red-500/50 text-red-500"
                    : "border-border text-muted-foreground hover:border-red-500/50 hover:text-red-500"
                }`}
              >
                {networkIcon}
              </button>
            </div>
          </div>

          <p className="mt-2 text-[8px] italic text-muted-foreground/50">
            Choose an option to continue.
          </p>
        </div>

        {pressed !== "none" && (
          <div className="rounded-md border bg-background p-2.5 text-[9px]">
            <div className="font-semibold">Settings updated</div>
            <div className="mt-1 text-muted-foreground">
              {pressed === "share" && "Data sharing with marketing partners is enabled."}
              {pressed === "2fa" && "Two-factor authentication is already enabled."}
              {pressed === "push" && "Push notifications are turned off."}
            </div>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
