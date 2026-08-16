"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Persuasive Language — Condition 1: Structural Density of Event Listeners
 * on Coercive Text Nodes
 *
 * Thesis: the algorithm examines the DOM event-registration map for nodes
 * classified as containing manipulative or coercive text. N_coercive is the
 * set of text-bearing nodes with an NLP coercion score above threshold, and
 * E(n) is the count of registered event listeners on node n. The feature
 * triggers if coercive text nodes carry a disproportionately high listener
 * density — onclick, onmouseover, or delegated handlers — relative to
 * neutral text nodes, indicating that manipulative language is structurally
 * weaponized as a conversion trap:
 *
 *   |E(N_coercive)| / |E(N_neutral)| > tau_listener_skew
 *
 * Variant A (dark): the scare-copy headline itself is a clickable, hoverable
 * trap with 6 registered listeners; hovering it fires events, clicking it
 * adds the item to the cart.
 * Variant B (benign): the same headline is static text with 0 listeners —
 * only the real button acts.
 */

const E_COERCIVE = 6; // registered listeners on the coercive text node (dark)
const E_NEUTRAL = 0; // registered listeners on neutral text nodes
const TAU_LISTENER = 3.0;

export function PersuasiveLanguageCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [cart, setCart] = React.useState<null | "added">(null);
  const [hoverFires, setHoverFires] = React.useState(0);
  const [coerciveHovered, setCoerciveHovered] = React.useState(false);

  const reset = () => {
    setCart(null);
    setHoverFires(0);
    setCoerciveHovered(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|E(N_coercive)| (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{E_COERCIVE} listeners</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|E(N_neutral)|</span>
        <span className="font-mono font-semibold tabular-nums">{E_NEUTRAL}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Listener skew (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{E_COERCIVE}/{E_NEUTRAL} &gt; {TAU_LISTENER}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Hover events fired</span>
        <span className="font-mono font-semibold tabular-nums">{hoverFires}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Persuasive Language: Structural Density of Event Listeners on Coercive Text Nodes"
      caption="Structural Density of Event Listeners on Coercive Text Nodes — emotionally loaded text is wired up as an interactive conversion trap, not just displayed."
      auditorStats={stats}
      deltaNote="In Variant A the coercive headline node registers 6 event listeners (onclick, onmouseenter, onmouseleave, onfocus, ontouchstart, delegated keydown) while neutral text nodes register 0 — a skew far above tau_listener_skew = 3.0. Hover it and watch events fire; click it and it adds the item to your cart. In Variant B the same headline is static text with zero listeners."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Midnight Flash Sale</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Limited-time price on wireless earbuds.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                {E_NEUTRAL} listeners
              </div>
            </div>

            {/* Static headline: plain text, no handlers, no trap. */}
            <p className="mt-3 text-[10px] font-medium text-foreground">
              Limited-time price on wireless earbuds — ends tonight.
            </p>
            <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">
              Wireless earbuds with 24h battery and noise cancelling. $29.99, was $59.99.
            </p>

            <button
              onClick={() => setCart("added")}
              className="mt-3 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
            >
              Add to cart
            </button>
          </div>

          {cart && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Added to cart
              </div>
              <p className="text-muted-foreground mt-0.5">
                The persuasive headline is plain text: |E(N_coercive)| = {E_NEUTRAL} listeners. Hovering
                or reading it fires nothing, and clicking it does nothing — only the actual button
                performs the action. The wording may still persuade, but it is not structurally
                weaponized as a click target.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Midnight Flash Sale</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Limited-time price on wireless earbuds.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              {E_COERCIVE} listeners
            </div>
          </div>

          {/* The coercive text node: 6 registered listeners, hoverable + clickable. */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setCart("added")}
            onMouseEnter={() => { setHoverFires((n) => n + 1); setCoerciveHovered(true); }}
            onMouseLeave={() => setCoerciveHovered(false)}
            onFocus={() => setHoverFires((n) => n + 1)}
            onTouchStart={() => setHoverFires((n) => n + 1)}
            onKeyDown={() => { if (hoverFires > -1) setHoverFires((n) => n + 1); }}
            className={`mt-3 rounded-md border p-2.5 transition-all cursor-pointer select-none ${
              coerciveHovered
                ? "border-rose-500 bg-rose-500/10 ring-2 ring-rose-500/40"
                : "border-rose-500/40 bg-rose-500/5"
            }`}
          >
            <p className={`text-[10px] font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400 transition-transform ${coerciveHovered ? "scale-[1.02]" : ""}`}>
              ⏰ Act now — Don&rsquo;t miss out on this price!
            </p>
            {coerciveHovered && (
              <p className="mt-1 text-[8px] font-mono text-rose-500/80">
                mouseenter fired — listener activity: {hoverFires} events
              </p>
            )}
          </div>
          <p className="mt-2 text-[9px] leading-relaxed text-muted-foreground">
            Wireless earbuds with 24h battery and noise cancelling. $29.99, was $59.99.
          </p>

          <button
            onClick={() => setCart("added")}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium text-white transition-all cursor-pointer ${
              coerciveHovered
                ? "bg-rose-500 ring-2 ring-rose-300 scale-[1.02]"
                : "bg-rose-600 hover:bg-rose-700"
            }`}
          >
            Add to cart
          </button>
        </div>

        {cart && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Listener skew detected
            </div>
            <p className="text-muted-foreground">
              {hoverFires > 0
                ? `You hovered the scare-copy ${hoverFires} time(s) — every hover fired registered events on the text node itself. `
                : "You interacted with the scare-copy. "}
              The coercive text node registers <strong className="text-foreground">{E_COERCIVE} event listeners</strong>{" "}
              (onclick, onmouseenter, onmouseleave, onfocus, ontouchstart, delegated keydown) while
              neutral text nodes register <strong className="text-foreground">{E_NEUTRAL}</strong> — a
              skew of {E_COERCIVE}/{E_NEUTRAL}, far above tau_listener_skew = {TAU_LISTENER}.
            </p>
            <p className="text-muted-foreground">
              The persuasive language is structurally weaponized: the headline itself is a conversion
              trap. Clicking it added the earbuds to your cart — no button needed.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
