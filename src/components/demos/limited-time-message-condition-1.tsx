"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Limited Time Message — Condition 1: Perpetual Extension
 *
 * Thesis: T_end(i) is the implied deadline during cycle i. The feature
 * triggers if the backend system algorithmically shifts the expiration
 * threshold forward the moment the real-time system clock reaches it:
 *
 *   t_current >= T_end(i)  =>  T_end(i+1) = t_current + Delta_t_extension
 *
 * The "limited" constraint is rendered infinite — the temporal pressure is
 * a manufactured interface layer and the "sale" price is just the standard
 * baseline price.
 *
 * Variant A (dark): the flash-sale deadline silently resets every time it
 * is reached (T_end keeps shifting forward).
 * Variant B (benign): the same banner, but the deadline is a concrete,
 * absolute date and time that never rebinds — the offer genuinely expires
 * once it passes.
 */

const START_SECONDS = 12;
const EXTENSION_SECONDS = 12;

function fmt(secs: number): string {
  return `0:${String(secs).padStart(2, "0")}`;
}

export function LimitedTimeMessageCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [remaining, setRemaining] = React.useState(START_SECONDS);
  const [cycles, setCycles] = React.useState(1);
  const [benignExpired, setBenignExpired] = React.useState(false);
  const [claimed, setClaimed] = React.useState(false);

  // Shared system clock. Every second the counter ticks down; the moment it
  // reaches the deadline, the dark backend silently extends the offer
  // (T_end(i+1) = t_current + Delta_t_extension) while the benign side
  // honours its fixed deadline and expires for good.
  React.useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setCycles((c) => c + 1);
          setBenignExpired(true);
          return EXTENSION_SECONDS;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const reset = () => {
    setRemaining(START_SECONDS);
    setCycles(1);
    setBenignExpired(false);
    setClaimed(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Offer cycle (i)</span>
        <span className="font-mono font-semibold tabular-nums">{cycles}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">t_current vs T_end(i)</span>
        <span className="font-mono font-semibold tabular-nums">{fmt(remaining)} left</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">T_end(i+1) shift (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">t + {EXTENSION_SECONDS}s</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Deadline honoured (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{benignExpired ? "expired" : "pending"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Limited Time Message: Perpetual Extension"
      caption="Perpetual Extension — the implied deadline T_end(i) is silently shifted forward the instant the clock reaches it, so the “limited” offer never actually ends."
      auditorStats={stats}
      deltaNote="In Variant A the deadline resets the moment it is reached — T_end(i+1) = t_current + Δt — so the “flash sale” never ends and the discounted price is effectively the standard price. In Variant B the same offer carries a concrete, fixed deadline (Tue 18 Aug · 23:59) shown as an absolute date and time — no relative countdown that could rebind — and the offer genuinely expires and the button disables once that deadline passes."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                <svg className="h-3.5 w-3.5 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-semibold">Flash sale — 40% off sitewide</div>
                <div className="text-[9px] text-muted-foreground mt-0.5">This week only, while the deadline lasts.</div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-md border bg-background p-2.5">
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">Sale ends</span>
              <span className="font-mono text-[11px] font-bold tabular-nums text-green-600 dark:text-green-400">
                {benignExpired ? "ended" : "Tue 18 Aug · 23:59"}
              </span>
            </div>

            {benignExpired && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 px-2.5 py-2 text-[9px] leading-relaxed">
                <span className="font-semibold text-green-700 dark:text-green-300">Offer ended.</span>{" "}
                <span className="text-muted-foreground">The deadline was real — T_end was fixed and the sale is over. No extension, no reset.</span>
              </div>
            )}

            <button
              onClick={() => setClaimed(true)}
              disabled={benignExpired}
              className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                benignExpired
                  ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              }`}
            >
              {benignExpired ? "Sale has ended" : "Claim 40% off"}
            </button>
          </div>

          {claimed && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Purchased before the real deadline
              </div>
              <p className="text-muted-foreground mt-0.5">
                You bought at the sale price while the offer was genuinely live. The deadline is
                a concrete date and time — a real constraint, so planning is possible.
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
              <svg className="h-3.5 w-3.5 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold">Flash sale — 40% off sitewide</div>
              <div className="text-[9px] text-muted-foreground mt-0.5">Ends soon — don&rsquo;t miss it!</div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-md border bg-background p-2.5">
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">Ends in</span>
            <span className="font-mono text-[11px] font-bold tabular-nums text-red-600 dark:text-red-400">
              {fmt(remaining)}
            </span>
          </div>

          {cycles > 1 && (
            <div className="mt-2 flex items-center gap-1.5 rounded-md border border-red-500/30 bg-red-500/5 px-2.5 py-2 text-[9px] leading-relaxed">
              <svg className="w-3 h-3 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span className="text-muted-foreground">
                Just extended! The deadline reset at the last second —{" "}
                <strong className="text-foreground">T_end({cycles}) = t_current + {EXTENSION_SECONDS}s</strong>{" "}
                (extension #{cycles - 1}).
              </span>
            </div>
          )}

          <button
            onClick={() => setClaimed(true)}
            className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Claim 40% off — before it ends!
          </button>
        </div>

        {mode === "auditor" && claimed && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Offer updated
            </div>
            <p className="text-muted-foreground">
              You paid the &ldquo;sale&rdquo; price — but the deadline you were chasing never
              arrived. Each time t_current reached T_end(i), the backend shifted it forward:
              T_end(i+1) = t_current + Δt. The constraint is infinite, so this price is just
              the standard baseline dressed up as a temporary offer.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
