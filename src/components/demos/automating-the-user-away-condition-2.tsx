"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Automating The User Away — Condition 2: Omission of the Interrupt Vector
 *
 * Thesis: the interface's hostility is defined by the window of
 * opportunity it grants the user to intervene. Δt_warning is the time
 * between intent signaling and execution, B_cancel is the UI node that
 * aborts the action, and τ_reaction ≈ 2.0s is the human biological
 * reaction baseline. The feature triggers if the cancellation affordance
 * is omitted or the warning window shrinks below the biological
 * threshold:
 *
 *   B_cancel ∉ DOM(t)  ∨  Δt_warning < τ_reaction
 *
 * Variant A (dark): a 3-tick countdown at 500ms per tick — a total
 * 1.5s window below the ~2.0s reaction baseline — and no cancel button
 * anywhere on screen.
 * Variant B (benign): the same renewal notice with a 5-second window
 * (1s per tick) and a prominent Cancel button.
 */

const DARK_WINDOW = 1.5;
const BENIGN_WINDOW = 5.0;

export function AutomatingTheUserAwayCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [sequenceActive, setSequenceActive] = React.useState(false);
  const [remaining, setRemaining] = React.useState(0);
  const [variant, setVariant] = React.useState<"dark" | "benign">("dark");
  const [renewed, setRenewed] = React.useState(false);
  const [cancelled, setCancelled] = React.useState(false);


  const dark = variant === "dark";
  const windowSeconds = dark ? DARK_WINDOW : BENIGN_WINDOW;
  const tickMs = dark ? 500 : 1000;

  React.useEffect(() => {
    if (!sequenceActive) return;
    const id = window.setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          setSequenceActive(false);
          setRenewed(true);
          return 0;
        }
        return s - 1;
      });
    }, tickMs);
    return () => window.clearInterval(id);
  }, [sequenceActive, tickMs]);

  const startSequence = (v: "dark" | "benign") => {
    setVariant(v);
    setRenewed(false);
    setCancelled(false);
    setRemaining(v === "dark" ? 3 : 5);
    setSequenceActive(true);
  };

  const renderNotice = (isDark: boolean) => {
    const activeHere = sequenceActive && dark === isDark;
    const showRenewed = renewed && dark === isDark;
    const showCancelled = cancelled && dark === isDark;
    return (
      <div className="rounded-md border bg-card p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[11px] font-semibold">StreamPlus — account</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Your 30-day free trial has ended. Premium (€9.99/mo) renews automatically.
            </p>
          </div>
          <div className={`text-[8px] font-mono font-semibold uppercase tracking-wider rounded-full border px-2 py-0.5 shrink-0 ${
            isDark ? "text-foreground border-border/60" : "text-foreground border-border/60"
          }`}>
            {isDark ? "Renewal options" : "Cancel available"}
          </div>
        </div>

        <div className="mt-3 rounded-md border border-border bg-background p-2.5">
          <div className="flex items-center justify-between">
            <div className="text-[9px] leading-relaxed text-foreground/80">
              {isDark ? (
                <>Premium <strong>renews automatically in</strong></>
              ) : (
                <>Premium will renew in <strong>5 seconds</strong> unless you cancel.</>
              )}
            </div>
            <div className="font-mono text-[18px] font-bold tabular-nums leading-none ml-2 shrink-0">
              <span className={isDark ? "text-foreground" : "text-foreground"}>
                {activeHere ? remaining : "—"}
              </span>
            </div>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${isDark ? "bg-primary" : "bg-primary"}`}
              style={{ width: activeHere ? `${((dark ? 3 : 5) - remaining) / (dark ? 3 : 5) * 100}%` : "0%" }}
            />
          </div>
          <div className="mt-1.5 text-[8px] font-mono tabular-nums text-muted-foreground">
            Renewal window: {windowSeconds.toFixed(1)}s
          </div>
        </div>

        {!sequenceActive && !renewed && !cancelled && (
          <button
            onClick={() => startSequence(isDark ? "dark" : "benign")}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
              isDark
                ? "bg-primary hover:bg-primary/80 text-primary-foreground"
                : "bg-primary hover:bg-primary/80 text-primary-foreground"
            }`}
          >
            Start renewal sequence
          </button>
        )}

        {activeHere && (
          <div className="mt-3 space-y-1.5">
            {isDark ? (
              <>
                <button
                  onClick={() => {
                    setSequenceActive(false);
                    setRenewed(true);
                  }}
                  className="w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  Proceed with renewal
                </button>
                <div className="rounded-md border border-border/60 bg-muted/40 px-2 py-1.5 text-[8px] text-foreground/90 leading-relaxed">
                  Renewal options are shown above.
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setSequenceActive(false);
                    setCancelled(true);
                  }}
                  className="w-full rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 text-[10px] font-semibold transition-colors cursor-pointer"
                >
                  Cancel auto-renewal
                </button>
                <div className="rounded-md border border-border/60 bg-muted/40 px-2 py-1.5 text-[8px] text-foreground leading-relaxed">
                  B_cancel ∈ DOM(t) — the abort node is present and the 5s window is comfortably above
                  the ~2.0s reaction baseline.
                </div>
              </>
            )}
          </div>
        )}

        {showRenewed && (
          <div className={`mt-3 rounded-md border p-2.5 text-[9px] leading-relaxed ${
            isDark ? "border-border/60 bg-muted/40" : "border-muted bg-muted/40"
          }`}>
            <div className={`flex items-center gap-1.5 font-semibold uppercase tracking-tight ${
              isDark ? "text-foreground" : "text-muted-foreground"
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
              {isDark ? "Premium renewed automatically" : "Premium renewed (window elapsed)"}
            </div>
            <p className="text-muted-foreground mt-0.5">
              {isDark
                ? "The 1.5s countdown ran below the ~2.0s biological reaction baseline and no cancel button existed, so interception was mathematically improbable — the renewal executed by omission of an interrupt vector."
                : "You had a full 5-second window and a Cancel button; the renewal only executed because no cancellation was issued."}
            </p>
          </div>
        )}

        {showCancelled && (
          <div className="mt-3 rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Auto-renewal cancelled
            </div>
            <p className="text-muted-foreground mt-0.5">
              The interrupt vector existed, so you could abort before execution. No charge was made.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <DemoShell mode={mode}
      title="Automating The User Away: Omission of the Interrupt Vector"
      userTitle="Streamly — Membership renewal"
      caption="Omission of the Interrupt Vector — the renewal countdown is faster than human reaction time and there is no cancel button to intercept it."
      deltaNote="Both variants present the same renewal notice for the same €9.99/mo plan. Variant A gives a 1.5-second countdown — below the ~2.0s human reaction baseline — and no cancel button anywhere on the screen (B_cancel ∉ DOM). Variant B offers a 5-second window and a prominent Cancel button."
      benign={
        <div className="space-y-3">{renderNotice(false)}</div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">{renderNotice(true)}</div>
    </DemoShell>
  );
}
