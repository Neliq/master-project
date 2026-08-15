"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

type Screen =
  | "landing"
  | "subscribed"
  | "cancel-step1"
  | "cancel-step2"
  | "cancel-step3"
  | "cancel-step4"
  | "cancel-step5"
  | "cancelled";

export function ReducedFrictionCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [screen, setScreen] = React.useState<Screen>("landing");
  const [cancelStep, setCancelStep] = React.useState(0);
  const reset = () => { setScreen("landing"); setCancelStep(0); };

  const handleSubscribe = () => setScreen("subscribed");

  const handleCancelClick = () => {
    setCancelStep(1);
    setScreen("cancel-step1");
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Path to subscribe</span>
        <span className="font-mono font-semibold">1 click</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Path to cancel</span>
        <span className="font-mono font-semibold">{cancelStep}/5 clicks</span>
      </div>
    </>
  ) : null;

  // --- SUBSCRIBED SCREEN ---
  if (screen === "subscribed") {
    return (
      <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
        title="Reduced Friction: Asymmetric Action-Reversal Friction"
        caption="Asymmetric Action-Reversal Friction — subscribing is instant, cancelling requires 5 additional steps." auditorStats={stats}>
        <div className="space-y-3">
          <div className="rounded-md border bg-foreground/5 p-3 text-xs">
            <div className="rounded-xl border-2 border-green-500/40 bg-green-500/5 p-4 text-center">
              <div className="text-lg">🎉</div>
              <div className="mt-1 text-sm font-bold text-green-600 dark:text-green-400">You're Subscribed!</div>
              <div className="text-[10px] text-muted-foreground">Premium Plan • $9.99/mo</div>
              <div className="mt-1 text-[8px] text-muted-foreground/50">Charged to Visa •••• 4242</div>
            </div>
            <button onClick={handleCancelClick} className="mt-2 w-full text-center text-[8px] text-muted-foreground/40 underline underline-offset-2 hover:text-muted-foreground/60">
              manage subscription
            </button>
          </div>
        </div>
      </DemoShell>
    );
  }

  // --- CANCEL FLOW ---
  if (screen.startsWith("cancel-step")) {
    return (
      <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
        title="Reduced Friction: Asymmetric Action-Reversal Friction"
        caption="Asymmetric Action-Reversal Friction — cancelling requires navigating 5 screens of friction." auditorStats={stats}>
        <div className="space-y-3">
          <div className="rounded-md border bg-foreground/5 p-3 text-xs">

            {/* Step 1 — Are you sure? */}
            {screen === "cancel-step1" && (
              <div className="space-y-2">
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-center">
                  <div className="text-sm font-bold text-red-600 dark:text-red-400">Are you sure?</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">You'll lose access to all premium features</div>
                </div>
                <button onClick={() => { setCancelStep(2); setScreen("cancel-step2"); }} className="w-full rounded-lg border border-red-500/30 py-2.5 text-[11px] font-medium text-red-600 dark:text-red-400">
                  Yes, I want to cancel
                </button>
                <button onClick={() => setScreen("subscribed")} className="w-full rounded-lg bg-green-600 py-2.5 text-[11px] font-semibold text-white">
                  Keep My Subscription
                </button>
              </div>
            )}

            {/* Step 2 — 50% off offer */}
            {screen === "cancel-step2" && (
              <div className="space-y-2">
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-center">
                  <div className="text-sm font-bold text-amber-600 dark:text-amber-400">Wait! How about 50% off?</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">$4.99/mo for the next 3 months</div>
                </div>
                <button onClick={() => { setCancelStep(3); setScreen("cancel-step3"); }} className="w-full rounded-lg border border-red-500/30 py-2.5 text-[11px] font-medium text-red-600 dark:text-red-400">
                  No thanks, continue cancelling
                </button>
                <button onClick={() => setScreen("subscribed")} className="w-full rounded-lg bg-amber-600 py-2.5 text-[11px] font-semibold text-white">
                  Accept 50% Off
                </button>
              </div>
            )}

            {/* Step 3 — 3 months free */}
            {screen === "cancel-step3" && (
              <div className="space-y-2">
                <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4 text-center">
                  <div className="text-sm font-bold text-purple-600 dark:text-purple-400">Last chance! 3 months free</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">Keep premium at no cost for 3 months</div>
                </div>
                <button onClick={() => { setCancelStep(4); setScreen("cancel-step4"); }} className="w-full rounded-lg border border-red-500/30 py-2.5 text-[11px] font-medium text-red-600 dark:text-red-400">
                  No, cancel anyway
                </button>
                <button onClick={() => setScreen("subscribed")} className="w-full rounded-lg bg-purple-600 py-2.5 text-[11px] font-semibold text-white">
                  Accept 3 Months Free
                </button>
              </div>
            )}

            {/* Step 4 — Survey */}
            {screen === "cancel-step4" && (
              <div className="space-y-2">
                <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-4">
                  <div className="text-sm font-bold">Help us improve</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">Why are you cancelling? (Required)</div>
                  <div className="mt-2 space-y-1">
                    {["Too expensive", "Not using it enough", "Found an alternative", "Missing features"].map(reason => (
                      <button key={reason} onClick={() => { setCancelStep(5); setScreen("cancel-step5"); }}
                        className="w-full rounded border border-foreground/10 px-2 py-1.5 text-left text-[10px] hover:bg-foreground/5">
                        {reason}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5 — Final confirmation */}
            {screen === "cancel-step5" && (
              <div className="space-y-2">
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-center">
                  <div className="text-sm font-bold text-red-600 dark:text-red-400">Final confirmation</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">Your subscription will end immediately. This cannot be undone.</div>
                </div>
                <button onClick={() => setScreen("cancelled")} className="w-full rounded-lg border border-red-500/30 py-2.5 text-[11px] font-medium text-red-600 dark:text-red-400">
                  Confirm cancellation
                </button>
                <button onClick={() => setScreen("subscribed")} className="w-full rounded-lg bg-green-600 py-2.5 text-[11px] font-semibold text-white">
                  Keep My Subscription
                </button>
              </div>
            )}

          </div>
        </div>
      </DemoShell>
    );
  }

  // --- CANCELLED ---
  if (screen === "cancelled") {
    return (
      <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
        title="Reduced Friction: Asymmetric Action-Reversal Friction"
        caption="Asymmetric Action-Reversal Friction — 1 click to subscribe, 5 clicks to cancel." auditorStats={stats}>
        <div className="space-y-3">
          <div className="rounded-md border bg-foreground/5 p-3 text-xs">
            <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-4 text-center">
              <div className="text-sm font-bold">Subscription Cancelled</div>
              <div className="mt-1 text-[10px] text-muted-foreground">You were charged for 5 screens of friction</div>
            </div>
          </div>
        </div>
      </DemoShell>
    );
  }

  // --- LANDING (default) ---
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Reduced Friction: Asymmetric Action-Reversal Friction"
      caption="Asymmetric Action-Reversal Friction — subscribing is instant, cancelling requires 5 additional steps." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="rounded-xl border-2 border-green-500/40 bg-green-500/5 p-5 text-center shadow-lg">
            <div className="text-xs font-bold uppercase tracking-wide text-green-600 dark:text-green-400">Premium Plan</div>
            <div className="mt-1 text-4xl font-extrabold tracking-tight">$9.99<span className="text-sm font-normal">/mo</span></div>
            <div className="mt-1 text-[10px] text-muted-foreground">All features included</div>
            <button onClick={handleSubscribe} className="mt-3 w-full rounded-lg bg-green-600 px-4 py-2.5 text-xs font-semibold text-white">
              Start Free Trial
            </button>
            <div className="mt-1 text-[8px] text-muted-foreground/50">
              Cancel anytime* · No commitment
            </div>
            <div className="mt-1 text-[7px] text-muted-foreground/30">
              *Cancel anytime requires 5 additional steps
            </div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
