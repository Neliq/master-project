"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Automating The User Away — Condition 3:
 * Semantic Speed of Consent-Timing Language
 *
 * Thesis: a time-limited consent prompt ("This action will proceed in
 * 5 seconds") whose countdown falls below the human visual-reaction-time
 * baseline (~2.0s) semantically manufactures consent through temporal
 * coercion:
 *
 *   t_window < 2.0 ∧ SemanticType(T_prompt) = TimedConsent
 *
 * Variant A (dark): the dialog says "consent will be registered in 2
 * seconds" but ticks at 500ms — a 1.0s total window. The "I agree" box
 * is pre-checked and consent is registered automatically when the timer
 * ends, even with zero clicks.
 * Variant B (benign): the same timed-consent wording with a real 5-second
 * window (1s ticks), an unchecked box, and explicit I agree / Decline
 * buttons. If the timer expires, nothing is registered.
 */

const TAU_REACTION = 2.0;

export function AutomatingTheUserAwayCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [remaining, setRemaining] = React.useState(0);
  const [variant, setVariant] = React.useState<"dark" | "benign">("dark");
  const [consented, setConsented] = React.useState(false);
  const [declined, setDeclined] = React.useState(false);
  const [autoRegistered, setAutoRegistered] = React.useState(false);

  const reset = () => {
    setDialogOpen(false);
    setRemaining(0);
    setVariant("dark");
    setConsented(false);
    setDeclined(false);
    setAutoRegistered(false);
  };

  const dark = variant === "dark";
  const windowSeconds = dark ? 1.0 : 5.0;
  const ticksTotal = dark ? 2 : 5;
  const tickMs = dark ? 500 : 1000;

  React.useEffect(() => {
    if (!dialogOpen) return;
    const id = window.setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          setDialogOpen(false);
          if (dark) {
            // Consent is registered automatically — the countdown itself
            // is treated as consent, with no explicit interaction.
            setAutoRegistered(true);
            setConsented(true);
          }
          return 0;
        }
        return s - 1;
      });
    }, tickMs);
    return () => window.clearInterval(id);
  }, [dialogOpen, tickMs, dark]);

  const openDialog = (v: "dark" | "benign") => {
    setVariant(v);
    setConsented(false);
    setDeclined(false);
    setAutoRegistered(false);
    setRemaining(v === "dark" ? 2 : 5);
    setDialogOpen(true);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">t_window (total)</span>
        <span className={`font-mono font-semibold tabular-nums ${dark ? "text-rose-500" : "text-emerald-500"}`}>
          {windowSeconds.toFixed(1)}s
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ baseline (reaction)</span>
        <span className="font-mono font-semibold tabular-nums">≈ {TAU_REACTION.toFixed(1)}s</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">SemanticType(T_prompt)</span>
        <span className="font-mono font-semibold tabular-nums">TimedConsent</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Verdict</span>
        <span className={`font-mono font-semibold tabular-nums ${dark ? "text-rose-500" : "text-emerald-500"}`}>
          {dark ? "1.0 &lt; 2.0 → manufactured" : "5.0 ≥ 2.0 → adequate"}
        </span>
      </div>
    </>
  ) : null;

  const renderDialog = (isDark: boolean) => {
    const activeHere = dialogOpen && dark === isDark;
    const showConsented = consented && dark === isDark;
    const showDeclined = declined && dark === isDark;
    return (
      <div className="rounded-md border bg-card p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[11px] font-semibold">CityGuide — location consent</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              The app wants to share your location with 14 advertising partners.
            </p>
          </div>
          <div className={`text-[8px] font-mono font-semibold uppercase tracking-wider rounded-full border px-2 py-0.5 shrink-0 ${
            isDark ? "text-rose-500 border-rose-500/30" : "text-emerald-500 border-emerald-500/30"
          }`}>
            {isDark ? "t_window 1.0s" : "t_window 5.0s"}
          </div>
        </div>

        {!dialogOpen && !consented && !declined && (
          <button
            onClick={() => openDialog(isDark ? "dark" : "benign")}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
              isDark
                ? "bg-rose-600 hover:bg-rose-700 text-white"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            Show consent prompt
          </button>
        )}

        {activeHere && (
          <div className={`mt-3 rounded-md border-2 p-3 ${isDark ? "border-rose-500/50 bg-rose-500/5" : "border-emerald-500/50 bg-emerald-500/5"}`}>
            <div className="text-[10px] font-semibold text-foreground">
              Share location with 14 partners?
            </div>
            <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">
              By continuing you agree to share location data with 14 advertising partners.
              {isDark ? (
                <> <strong className="text-rose-500">Consent will be registered in 2 seconds.</strong></>
              ) : (
                <> Nothing is shared unless you tick the box and click <strong className="text-emerald-600 dark:text-emerald-400">I agree</strong> below — the timer never registers consent.</>
              )}
            </p>

            <label className="mt-2.5 flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                defaultChecked={isDark}
                disabled={isDark}
                className={`h-3.5 w-3.5 ${isDark ? "accent-rose-500" : "accent-emerald-500"}`}
              />
              <span className="text-[9px] text-foreground/80">I agree to share my location</span>
              {isDark && (
                <span className="text-[8px] text-rose-500/80">(pre-checked — consent assumed)</span>
              )}
            </label>

            <div className="mt-2.5 flex items-center justify-between">
              <div className="font-mono text-[16px] font-bold tabular-nums leading-none">
                <span className={isDark ? "text-rose-500" : "text-emerald-500"}>{remaining}</span>
              </div>
              <div className="text-[8px] font-mono tabular-nums text-muted-foreground">
                t_window = {windowSeconds.toFixed(1)}s · ticks {tickMs}ms
              </div>
            </div>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${isDark ? "bg-rose-500" : "bg-emerald-500"}`}
                style={{ width: `${((ticksTotal - remaining) / ticksTotal) * 100}%` }}
              />
            </div>

            {isDark ? (
              <div className="mt-2.5 space-y-1.5">
                <button
                  onClick={() => {
                    setDialogOpen(false);
                    setConsented(true);
                  }}
                  className="w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-semibold transition-colors cursor-pointer"
                >
                  Confirm
                </button>
                <div className="text-center text-[8px] text-muted-foreground">
                  Customize <span className="text-muted-foreground/50">(coming soon)</span>
                </div>
                <div className="rounded-md border border-rose-500/30 bg-rose-500/5 px-2 py-1.5 text-[8px] text-rose-500/90 leading-relaxed">
                  2 ticks × 500ms = a 1.0s window — below the ~2.0s reaction baseline. Even if you do
                  nothing, consent registers automatically when the timer ends.
                </div>
              </div>
            ) : (
              <div className="mt-2.5 flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setDialogOpen(false);
                    setConsented(true);
                  }}
                  className="flex-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 text-[10px] font-semibold transition-colors cursor-pointer"
                >
                  I agree
                </button>
                <button
                  onClick={() => {
                    setDialogOpen(false);
                    setDeclined(true);
                  }}
                  className="flex-1 rounded-md border border-border bg-background hover:bg-muted text-foreground/70 py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        )}

        {showConsented && (
          <div className={`mt-3 rounded-md border p-2.5 text-[9px] leading-relaxed ${
            isDark ? "border-amber-500/30 bg-amber-500/5" : "border-emerald-500/30 bg-emerald-500/5"
          }`}>
            <div className={`flex items-center gap-1.5 font-semibold uppercase tracking-tight ${
              isDark ? "text-amber-700 dark:text-amber-300" : "text-emerald-700 dark:text-emerald-300"
            }`}>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {isDark ? (
                  <>
                    <path d="M12 9v4m0 4h.01" />
                    <circle cx="12" cy="12" r="10" />
                  </>
                ) : (
                  <path d="M20 6L9 17l-5-5" />
                )}
              </svg>
              {autoRegistered && isDark ? "Consent auto-registered — no click received" : "Consent registered"}
            </div>
            <p className="text-muted-foreground mt-0.5">
              {isDark
                ? "The countdown itself was treated as consent: with t_window = 1.0s < 2.0s and SemanticType(T_prompt) = TimedConsent, the interface manufactured consent through temporal coercion — location sharing with 14 partners is now ON even though you never affirmatively chose it."
                : "Your explicit click registered the consent. The 5.0s window was semantically adequate: t_window ≥ 2.0s, so the decision was not coerced by time."}
            </p>
          </div>
        )}

        {showDeclined && (
          <div className="mt-3 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Consent declined — nothing shared
            </div>
            <p className="text-muted-foreground mt-0.5">
              The Decline affordance was present and the timer never auto-registered anything, so your
              location stays private. No consent was manufactured.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Automating The User Away: Semantic Speed of Consent-Timing Language"
      caption="Semantic Speed of Consent-Timing Language — a timed consent prompt whose countdown is faster than human reaction time registers consent by default."
      auditorStats={stats}
      deltaNote="Both dialogs share the same location-sharing decision and a visible countdown. Variant A says 'Consent will be registered in 2 seconds' and counts down in half-second ticks — a 1.0s total window under the 2.0s reaction baseline — with a pre-checked, disabled box, and registers consent automatically when the timer ends. Variant B counts down from 5 at normal speed but states plainly that nothing is shared unless you tick the box and click I agree; the timer never registers consent."
      benign={
        <div className="space-y-3">{renderDialog(false)}</div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">{renderDialog(true)}</div>
    </DemoShell>
  );
}
