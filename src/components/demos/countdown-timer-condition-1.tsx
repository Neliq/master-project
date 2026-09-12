"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Countdown Timer — Condition 1: Stateless Expiration
 *
 * Thesis: t_load is the timestamp of the client session initialization and
 * Delta t_countdown a hardcoded frontend duration. The feature triggers if
 * the expiration time T_expire is functionally tethered to the individual's
 * page load rather than a server-validated deadline:
 *
 *   T_expire = t_load + Delta t_countdown  ⟹  Urgency is functionally synthetic
 *
 * Variant A (dark): "your cart is reserved for 05:00" — every simulated
 * page refresh resets the clock to the full duration, and at zero the
 * offer simply continues. The deadline is an interface illusion.
 * Variant B (benign): the deadline is server-validated — refreshing does
 * not reset it, and when it expires the price actually reverts.
 */

const ITEM_NAME = "Aurora Wireless Earbuds Pro";
const PRICE_NOW = "$89.00";
const PRICE_AFTER = "$129.00";
const DELTA_S = 300; // Δt_countdown: hardcoded frontend duration (5:00)

function fmt(s: number): string {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function CountdownTimerCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [secondsA, setSecondsA] = React.useState(DELTA_S);
  const [resetsA, setResetsA] = React.useState(0);
  const [expiresAtB] = React.useState(() => Date.now() + DELTA_S * 1000);
  const [secondsB, setSecondsB] = React.useState(DELTA_S);
  const [paid, setPaid] = React.useState(false);

  // Variant A: stateless countdown — decrements locally, refresh restarts it.
  React.useEffect(() => {
    const id = window.setInterval(() => setSecondsA((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Variant B: server-validated deadline — remaining time derives from a fixed timestamp.
  React.useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsB(Math.max(0, Math.floor((expiresAtB - Date.now()) / 1000)));
    }, 250);
    return () => window.clearInterval(id);
  }, [expiresAtB]);


  const refreshA = () => {
    // T_expire = t_load + Δt_countdown — reload rebinds the deadline to the new page load.
    setSecondsA(DELTA_S);
    setResetsA((n) => n + 1);
  };

  const expiredA = secondsA === 0;
  const expiredB = secondsB === 0;

  const timerBadge = (label: string, time: string, tone: "rose" | "emerald") => (
    <div className={`flex items-center justify-between rounded-md border px-2.5 py-2 ${
      tone === "rose" ? "border-border/60 bg-muted/40" : "border-border/60 bg-muted/40"
    }`}>
      <span className="text-[9px] font-medium text-muted-foreground">{label}</span>
      <span className={`font-mono text-[12px] font-bold tabular-nums tracking-wider ${
        tone === "rose" ? "text-foreground" : "text-foreground"
      }`}>
        {time}
      </span>
    </div>
  );

  return (
    <DemoShell mode={mode}
      title="Countdown Timer: Stateless Expiration"
      caption="Stateless Expiration — the reservation deadline is reborn on every page load, so the urgency it creates is infinitely repeatable and functionally synthetic."
      deltaNote={`Both panels reserve the cart for ${fmt(DELTA_S)} with the same product and prices. In Variant A “Simulate refresh” restores the full countdown every time (T_expire = t_load + &Delta;t_countdown) and expiry has no consequence. In Variant B the deadline is server-validated: refresh does nothing to it, and when it reaches zero the price genuinely reverts to ${PRICE_AFTER}.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
                <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 7l10-5 10 5M4 10v10a1 1 0 001 1h14a1 1 0 001-1V10M2 7l2 13M22 7l-2 13" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">{ITEM_NAME}</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  <span className="font-bold text-foreground">{expiredB ? PRICE_AFTER : PRICE_NOW}</span>{" "}
                  {!expiredB && <span className="line-through opacity-60">{PRICE_AFTER}</span>}{" "}
                  — price reverts when the server-validated deadline passes.
                </p>
              </div>
            </div>
          </div>

          {timerBadge("Reservation expires (server-validated)", fmt(secondsB), "emerald")}

          <button
            onClick={() => setSecondsB(Math.max(0, Math.floor((expiresAtB - Date.now()) / 1000)))}
            className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Refresh page
          </button>

          <button
            onClick={() => setPaid(true)}
            disabled={expiredB}
            className={`w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              expiredB
                ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                : "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
            }`}
          >
            {expiredB ? "Offer expired" : paid ? "Paid ✓" : `Pay ${PRICE_NOW}`}
          </button>

          {expiredB && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Real consequence
              </div>
              <p className="text-muted-foreground mt-0.5">
                The deadline passed and the price really reverted to {PRICE_AFTER}. T_expire was a server-validated
                deadline — refreshing never extended it, because it was never tethered to your page load.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
              <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 7l10-5 10 5M4 10v10a1 1 0 001 1h14a1 1 0 001-1V10M2 7l2 13M22 7l-2 13" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">{ITEM_NAME}</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                <span className="font-bold text-foreground">{PRICE_NOW}</span>{" "}
                <span className="line-through opacity-60">{PRICE_AFTER}</span> — reserved for you, but only while the clock runs.
              </p>
            </div>
          </div>
        </div>

        {timerBadge("Your cart is reserved for", fmt(secondsA), "rose")}

        <button
          onClick={refreshA}
          className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Refresh page
        </button>

        <button
          onClick={() => setPaid(true)}
          disabled={expiredA}
          className={`w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
            expiredA
              ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
              : "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
          }`}
        >
          {expiredA ? "Clock at zero…" : paid ? "Paid ✓" : `Pay ${PRICE_NOW} before time runs out`}
        </button>

        {resetsA > 0 && (
          <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Offer ends when the timer reaches zero
            </div>
            <p className="text-muted-foreground">
              After {resetsA} refresh{resetsA === 1 ? "" : "es"} the clock is back at {fmt(DELTA_S)}. T_expire = t_load + &Delta;t_countdown:
              the expiration time is rebinding to your new page load every single time, so the deadline is an interface illusion —
              infinitely repeatable upon a DOM refresh, with no server-validated consequence.
            </p>
          </div>
        )}

        {expiredA && (
          <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
            <p className="text-muted-foreground">
              The clock hit zero — and nothing happened: the offer is still there, the price unchanged. The countdown
              produced zero actual consequence, exactly as the stateless design intends. (Refresh to see it reset again.)
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
