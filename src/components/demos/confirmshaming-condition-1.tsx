"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Confirmshaming — Condition 1: Structural Asymmetry in Decline-Option
 * Accessibility
 *
 * Thesis: Tag(N_decline) ∉ {<button>, [role="button"]} ∧ Tag(N_accept) = <button>
 *
 * The decline option is structurally demoted — rendered as a plain node
 * without a <button> wrapper or role="button" — while the acceptance
 * option receives full structural affordance.
 *
 * Variant A (dark): the accept action is a real <button>; the decline
 * option is a plain clickable <span> with no role="button".
 * Variant B (benign): both options are real <button> elements.
 */

export function ConfirmshamingCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [choice, setChoice] = React.useState<null | "accept" | "decline">(null);

  const reset = () => setChoice(null);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Tag(N_accept)</span>
        <span className="font-mono font-semibold tabular-nums">&lt;button&gt;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Tag(N_decline)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">&lt;span&gt;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">role=&quot;button&quot; on decline</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">absent</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Keyboard-focusable exit</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">no</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Confirmshaming: Structural Asymmetry in Decline-Option Accessibility"
      caption="Structural Asymmetry in Decline-Option Accessibility — the decline option is structurally demoted (no &lt;button&gt; wrapper, no role=&quot;button&quot;) while the acceptance option receives full structural affordance."
      auditorStats={stats}
      deltaNote="In Variant A the exit is a plain clickable &lt;span&gt; with no role=&quot;button&quot;, so it is invisible to keyboard navigation and screen readers, while the accept action is a full &lt;button&gt;. In Variant B both options are real &lt;button&gt; elements with equal structural affordance."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Newsletter signup
            </div>
            <h3 className="text-[11px] font-semibold">Get 10% off your first order</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Join 40,000 subscribers and receive weekly tips plus a one-time discount code.
            </p>

            <div className="mt-3 space-y-2">
              <button
                onClick={() => setChoice("accept")}
                className="w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-2 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                Yes, claim my 10% discount
              </button>
              <button
                onClick={() => setChoice("decline")}
                className="w-full rounded-md border border-border bg-background hover:bg-muted py-2 text-[11px] font-medium text-foreground transition-colors cursor-pointer"
              >
                No, thanks
              </button>
            </div>
          </div>

          {mode === "auditor" && choice && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {choice === "accept" ? "Opted in" : "Opted out"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                {choice === "accept"
                  ? "You accepted the offer through a real <button> element."
                  : "You declined through a real <button> element — Tag(N_decline) ∈ {<button>}, so the exit has the same structural affordance as the accept action."}
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Newsletter signup
          </div>
          <h3 className="text-[11px] font-semibold">Get 10% off your first order</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Join 40,000 subscribers and receive weekly tips plus a one-time discount code.
          </p>

          <div className="mt-3 space-y-2">
            <button
              onClick={() => setChoice("accept")}
              className="w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-2 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              Yes, claim my 10% discount
            </button>
            {/* The decline option is deliberately NOT a <button> and carries no
                role="button" — it is a plain clickable <span>, so it is
                invisible to keyboard navigation and assistive technology. */}
            <span
              onClick={() => setChoice("decline")}
              className="block w-full cursor-pointer py-1.5 text-center text-[9px] text-muted-foreground underline decoration-dotted hover:text-foreground transition-colors select-none"
            >
              No, thanks — I&rsquo;ll pay full price
            </span>
          </div>
        </div>

        {mode === "auditor" && choice && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Preferences updated
            </div>
            <p className="text-muted-foreground">
              Tag(N_accept) = <strong className="text-foreground">&lt;button&gt;</strong> but{" "}
              <strong className="text-foreground">Tag(N_decline) = &lt;span&gt;</strong> — the
              decline option is not a button and carries no{" "}
              <code className="font-mono">role=“button”</code>, so it cannot be reached with the
              keyboard and is not announced as interactive by screen readers.
            </p>
            <p className="text-muted-foreground">
              {choice === "decline"
                ? "You managed to click it — but only because you found it with a mouse. The structure still pushed you toward the accept path."
                : "You accepted through the only fully interactive element — the path of least structural resistance."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
