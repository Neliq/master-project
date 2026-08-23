"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Low Stock — Condition 2: Visual Alarm Salience of Scarcity Indicators
 *
 * Thesis: h is the hue angle of the dominant color used in the scarcity
 * badge N_stock. The feature triggers if the badge employs colors in the
 * red-orange alarm spectrum (h in [0°, 30°]) — a visual convention
 * associated with danger and immediate action — while the underlying
 * stock level has not verifiably changed:
 *
 *   Hue(N_stock) in [0°, 30°]  ∧  Delta Stock_actual = 0
 *
 * Variant A (dark): the badge burns alarm red-orange (hue 12°) over a
 * manufactured count — the backend actually holds 27 units while only 2 are
 * shown. Variant B (benign): the same stock level is shown as genuine
 * live-feed data with a neutral hue (220°), so no alarm is manufactured.
 */

const ITEM_NAME = "TrailBlazer Hiking Backpack 45L";
const ITEM_PRICE = "$119.00";
const STOCK = 2; // displayed, pinned stock level
const TRUE_STOCK = 27; // actual backend inventory (I_true)
const HUE_DARK = 12; // red-orange alarm spectrum
const HUE_BENIGN = 220; // neutral blue

export function LowStockCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [refreshes, setRefreshes] = React.useState(0);
  const [checkedOut, setCheckedOut] = React.useState(false);

  const reset = () => {
    setRefreshes(0);
    setCheckedOut(false);
  };

  const refreshFeed = () => setRefreshes((n) => n + 1);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Hue(N_stock) — Variant A</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{HUE_DARK}&deg; &isin; [0&deg;, 30&deg;]</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Hue(N_stock) — Variant B</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{HUE_BENIGN}&deg; &notin; [0&deg;, 30&deg;]</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">I_displayed / I_true (Variant A)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{STOCK} / {TRUE_STOCK} — fabricated</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&Delta;Stock_actual (after refresh)</span>
        <span className="font-mono font-semibold tabular-nums">{refreshes} refresh{refreshes === 1 ? "" : "es"}, level {STOCK} &rarr; {STOCK} = 0</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Alarm spectrum condition</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">Hue &isin; range &and; &Delta;Stock = 0</span>
      </div>
    </>
  ) : null;

  const badgeDark = (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider text-white animate-pulse"
      style={{ backgroundColor: `hsl(${HUE_DARK}, 85%, 45%)` }}
    >
      <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 9v4m0 4h.01" />
        <circle cx="12" cy="12" r="10" />
      </svg>
      Only {STOCK} left!
    </span>
  );

  const badgeBenign = (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider text-white"
      style={{ backgroundColor: `hsl(${HUE_BENIGN}, 45%, 45%)` }}
    >
      <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      In stock — {STOCK} remaining
    </span>
  );

  const productCard = (badge: React.ReactNode) => (
    <div className="rounded-md border bg-card p-3">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
          <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[11px] font-semibold">{ITEM_NAME}</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Waterproof, 45L capacity, built-in rain cover. Free returns.
          </p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="text-[11px] font-bold">{ITEM_PRICE}</span>
            {badge}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Low Stock: Visual Alarm Salience of Scarcity Indicators"
      caption="Visual Alarm Salience of Scarcity Indicators — the scarcity badge is painted in the red-orange alarm spectrum even though the stock level behind it never changes."
      auditorStats={stats}
      deltaNote={`Both variants render the same product card. Variant A pins the displayed count at ${STOCK} units (alarm hue ${HUE_DARK}°, pulsing) while the backend actually holds ${TRUE_STOCK} units — the low number is fabricated, and refreshing never changes either value, so the alarm hue is pure color-manipulated urgency. Variant B shows the same ${STOCK} units as genuine live-feed data with a neutral hue ${HUE_BENIGN}°, so no alarm is manufactured.`}
      benign={
        <div className="space-y-3">
          {productCard(badgeBenign)}

          <div className="rounded-md border border-border bg-background p-2.5">
            <div className="flex items-center justify-between text-[9px]">
              <span className="font-mono text-muted-foreground">Live stock feed — backend source</span>
              <span className="font-mono font-semibold tabular-nums text-green-500">{STOCK} units</span>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[9px]">
              <span className="font-mono text-muted-foreground">Badge hue (N_stock)</span>
              <span className="font-mono font-semibold tabular-nums text-green-500">{HUE_BENIGN}&deg; — neutral</span>
            </div>
          </div>

          <button
            onClick={refreshFeed}
            className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Refresh stock feed ({refreshes}×)
          </button>

          {refreshes > 0 && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Stock update
              </div>
              <p className="text-muted-foreground mt-0.5">
                After {refreshes} refresh{refreshes === 1 ? "" : "es"} the stock level is still {STOCK} units (&Delta;Stock_actual = 0),
                and the badge keeps its neutral hue. The scarcity information is conveyed factually, without chromatic urgency coding.
              </p>
            </div>
          )}

          <button
            onClick={() => setCheckedOut(true)}
            className="w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            {checkedOut ? "Checked out ✓" : "Buy now"}
          </button>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {productCard(badgeDark)}

        <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5">
          <div className="flex items-center justify-between text-[9px]">
            <span className="font-mono text-muted-foreground">Displayed to shopper (badge)</span>
            <span className="font-mono font-semibold tabular-nums text-red-500">{STOCK} units — &ldquo;Only 2 left!&rdquo;</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[9px]">
            <span className="font-mono text-muted-foreground">Actual backend inventory (I_true)</span>
            <span className="font-mono font-semibold tabular-nums text-yellow-700 dark:text-yellow-300">{TRUE_STOCK} units</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[9px]">
            <span className="font-mono text-muted-foreground">Badge hue (N_stock)</span>
            <span className="font-mono font-semibold tabular-nums text-red-500">{HUE_DARK}&deg; — alarm spectrum</span>
          </div>
        </div>

        <button
          onClick={refreshFeed}
          className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Refresh stock feed ({refreshes}×)
        </button>

        {refreshes > 0 && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Alarm hue with zero stock change
            </div>
            <p className="text-muted-foreground">
              After {refreshes} refresh{refreshes === 1 ? "" : "es"} the displayed count is still pinned
              at {STOCK} units while the backend holds {TRUE_STOCK} —{" "}
              <span className="font-mono text-foreground">I_displayed ({STOCK}) &ll; I_true ({TRUE_STOCK})</span> — yet
              the badge keeps burning alarm red-orange. Hue(N_stock) = {HUE_DARK}&deg; &isin; [0&deg;, 30&deg;]
              satisfies the red-orange alarm spectrum while the low number is manufactured, not
              pulled from inventory.
            </p>
          </div>
        )}

        <button
          onClick={() => setCheckedOut(true)}
          className="w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
        >
          {checkedOut ? "Checked out ✓" : "Buy now"}
        </button>

        {checkedOut && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <p className="text-muted-foreground">
              The pulsing red badge associates the product with danger and immediate action. Users who skip the
              verification step buy under a manufactured alarm that never corresponds to any real stock movement.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
