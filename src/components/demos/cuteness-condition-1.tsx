"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Cuteness — Condition 1: Structural Conditional Injection of Affective Assets
 *
 * Thesis: the algorithm models the DOM mutation log DeltaDOM(t) during a
 * user session and cross-references it against the application state
 * machine. The feature triggers if image nodes classified as affective
 * (I_affective — anthropomorphic or high-valence imagery) are exclusively
 * injected into the DOM during cancellation or opt-out flows (s = s_cancel)
 * and are structurally absent during onboarding or normal usage
 * (s = s_onboard):
 *
 *   I_affective ∩ DOM(s_onboard) = ∅  AND  I_affective ⊂ DOM(s_cancel)
 *
 * Variant A (dark): the newsletter signup shows no mascot, but the
 * unsubscribe flow suddenly injects a crying mascot into the DOM.
 * Variant B (benign): the identical flow never injects any affective asset.
 */

type Stage = "menu" | "onboard" | "cancel" | "kept" | "gone";

function CryingMascot({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="13" cy="12" r="6" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
      <circle cx="35" cy="12" r="6" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
      <circle cx="24" cy="24" r="20" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
      <path d="M17 21q3-3 6 0" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M25 21q3-3 6 0" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M17 32q7-5 14 0" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M15 24c-2.5 2.5-3.5 5.5-2.5 8" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      <path d="M33 24c2.5 2.5 3.5 5.5 2.5 8" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="15" cy="28" rx="3" ry="1.6" fill="#fda4af" opacity="0.7" />
      <ellipse cx="33" cy="28" rx="3" ry="1.6" fill="#fda4af" opacity="0.7" />
    </svg>
  );
}

export function CutenessCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [darkStage, setDarkStage] = React.useState<Stage>("menu");
  const [benignStage, setBenignStage] = React.useState<Stage>("menu");


  return (
    <DemoShell mode={mode}
      title="Cuteness: Structural Conditional Injection of Affective Assets"
      caption="Structural Conditional Injection of Affective Assets — a crying mascot exists nowhere in the product until the moment you try to leave, then it appears out of thin air."
      deltaNote="Both variants run the same two-state flow (subscribe, then unsubscribe). In Variant A the affective mascot node is injected into the DOM only at s = s_cancel — the unsubscribe step — and is absent at s = s_onboard (I_affective ∩ DOM(s_onboard) = ∅ ∧ I_affective ⊂ DOM(s_cancel)). In Variant B no affective asset is ever injected at any state."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">The Daily Byte newsletter</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  A weekly digest of tech news. One email, every Friday.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                Plain confirmation
              </div>
            </div>

            {benignStage === "menu" && (
              <div className="mt-3">
                <button
                  onClick={() => setBenignStage("onboard")}
                  className="w-full rounded-md bg-green-600 hover:bg-green-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
            )}

            {darkStage === "onboard" && (
              <div className="mt-3 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px]">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Welcome aboard!
                </div>
                <p className="text-muted-foreground mt-0.5">
                  You are subscribed. Your weekly digest will arrive every Friday.
                </p>
                <button
                  onClick={() => setBenignStage("cancel")}
                  className="mt-2 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
                >
                  Manage subscription
                </button>
              </div>
            )}

            {benignStage === "cancel" && (
              <div className="mt-3 space-y-2">
                <div className="rounded-md border border-border bg-background p-2.5 text-[9px] text-muted-foreground">
                  Unsubscribe from The Daily Byte? Your email will be removed from the list.
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setBenignStage("kept")}
                    className="rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
                  >
                    Keep subscription
                  </button>
                  <button
                    onClick={() => setBenignStage("gone")}
                    className="rounded-md bg-green-600 hover:bg-green-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
                  >
                    Yes, unsubscribe
                  </button>
                </div>
              </div>
            )}

            {(benignStage === "kept" || benignStage === "gone") && (
              <div className="mt-3 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {benignStage === "gone" ? "Unsubscribed" : "Subscription kept"}
                </div>
                <p className="text-muted-foreground mt-0.5">
                  {benignStage === "gone"
                    ? "You are unsubscribed. No further issues were reported."
                    : "Your subscription remains active."}
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">The Daily Byte newsletter</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                A weekly digest of tech news. One email, every Friday.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              Membership cancellation
            </div>
          </div>

          {darkStage === "menu" && (
            <div className="mt-3">
              <button
                onClick={() => setDarkStage("onboard")}
                className="w-full rounded-md bg-green-600 hover:bg-green-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </div>
          )}

          {darkStage === "onboard" && (
            <div className="mt-3 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px]">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Welcome aboard!
              </div>
              <p className="text-muted-foreground mt-0.5">
                You are subscribed. Plain confirmation, no mascot — the affective assets are nowhere
                in this state.
              </p>
              <button
                onClick={() => setDarkStage("cancel")}
                className="mt-2 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
              >
                Manage subscription
              </button>
            </div>
          )}

          {darkStage === "cancel" && (
            <div className="mt-3 space-y-2">
              {/* I_affective is injected ONLY here, at s = s_cancel. */}
              <div className="flex flex-col items-center gap-2 rounded-md border border-red-500/30 bg-red-500/5 p-3 text-center">
                <CryingMascot className="h-14 w-14" />
                <p className="text-[9px] font-medium text-red-700 dark:text-red-300">
                  Don&rsquo;t go… we&rsquo;ll really miss you.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDarkStage("kept")}
                  className="rounded-md bg-red-600 hover:bg-red-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
                >
                  Keep my subscription
                </button>
                <button
                  onClick={() => setDarkStage("gone")}
                  className="rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
                >
                  Unsubscribe anyway
                </button>
              </div>
            </div>
          )}

          {(darkStage === "kept" || darkStage === "gone") && (
            <div className="mt-3 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Request received
              </div>
                <p className="text-muted-foreground">
                  {darkStage === "kept"
                    ? "You kept the subscription. Your weekly digest will continue as usual."
                    : "Your unsubscribe request was received. Access will end at the close of this billing period."}
                </p>
              <p className="text-muted-foreground">
                You can return to newsletter settings at any time to update this choice.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
