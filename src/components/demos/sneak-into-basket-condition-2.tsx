"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { Headphones, ShieldCheck, Eye } from "lucide-react";

/*
 * Sneak Into Basket — Condition 2: Visual Indistinguishability of Surcharged Items
 *
 * Thesis: V_user is the visual feature vector set of the user's own cart
 * line items; V_injected is the vector of the surreptitiously injected item.
 * Δ_color(i, j) is the Euclidean distance in CIELAB color space. The feature
 * fires if the injected item is rendered with chromatic and typographic
 * properties within a similarity radius of the legitimate items, causing the
 * user to overlook it:
 *
 *   min ||v_injected − v_u||₂ < τ_camouflage
 *    v_u ∈ V_user
 *
 * Variant A (dark): the injected warranty line is rendered with the identical
 * background, typography, and radius as the user's own item (Δ_color = 3.2),
 * so nothing flags it.
 * Variant B (benign): the same line is rendered in a visually distinct
 * "suggested add-on" section (Δ_color = 41.2), impossible to overlook.
 */

const HEADPHONES = { name: "AeroSound X9 Headphones", price: 129.99 };
const WARRANTY = { name: "2-Year Extended Warranty", price: 19.99 };
const TAU_CAMOUFLAGE = 25;
const DELTA_DARK = 3.2;
const DELTA_BENIGN = 41.2;

const fmt = (n: number) => `$${n.toFixed(2)}`;

export function SneakIntoBasketCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Variant B: user declines the suggested add-on
  const [declined, setDeclined] = React.useState(false);
  const [checkedOut, setCheckedOut] = React.useState(false);

  const reset = () => {
    setDeclined(false);
    setCheckedOut(false);
  };

  const totalB = HEADPHONES.price + (declined ? 0 : WARRANTY.price);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δ_color(v_injected, v_user) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{DELTA_DARK} &lt; τ_camouflage ({TAU_CAMOUFLAGE})</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Δ_color — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{DELTA_BENIGN} &gt; τ_camouflage</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Rendered as (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">identical bg · type · radius</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Total charged (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{fmt(HEADPHONES.price + WARRANTY.price)} incl. {fmt(WARRANTY.price)} unrequested</span>
      </div>
    </>
  ) : null;

  const userLine = (name: string, price: number) => (
    <div className="flex items-center justify-between rounded-md border bg-background px-2.5 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-muted">
          <Headphones className="h-3.5 w-3.5 text-muted-foreground" />
        </span>
        <span className="truncate text-[10px] font-medium">{name}</span>
      </div>
      <span className="ml-2 shrink-0 font-mono text-[10px] font-semibold tabular-nums">{fmt(price)}</span>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Sneak Into Basket: Visual Indistinguishability of Surcharged Items"
      caption="Visual Indistinguishability of Surcharged Items — the injected line item is rendered with the same chromatic and typographic properties as your own items, so it falls inside the camouflage radius and escapes notice."
      auditorStats={stats}
      deltaNote={`Both carts contain the same two lines: ${HEADPHONES.name} and ${WARRANTY.name}. In Variant A the warranty reuses the identical card styling (Δ_color = ${DELTA_DARK} < τ_camouflage = ${TAU_CAMOUFLAGE}), so it reads as part of your purchase. In Variant B the same line sits in a tinted, dashed, clearly-badged "suggested add-on" section (Δ_color = ${DELTA_BENIGN}), so nothing can be overlooked.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-background p-2.5">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[11px] font-semibold">Your cart</h3>
              <span className="text-[8px] text-muted-foreground">1 item you added</span>
            </div>
            <div className="space-y-1.5">{userLine(HEADPHONES.name, HEADPHONES.price)}</div>

            {/* Injected item — visually DISTINCT: tinted, dashed, badged */}
            <div className="mt-2 rounded-md border-2 border-dashed border-yellow-400/50 bg-yellow-500/10 p-2">
              <div className="mb-1 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                <span className="rounded-full bg-yellow-500 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-white">
                  Suggested add-on
                </span>
                <span className="ml-auto text-[7px] text-muted-foreground">optional protection</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium">{WARRANTY.name}</span>
                <span className="font-mono text-[10px] font-semibold tabular-nums">{fmt(WARRANTY.price)}</span>
              </div>
              {!declined ? (
                <button
                  onClick={() => setDeclined(true)}
                  className="mt-1.5 w-full rounded border border-yellow-400/60 py-1 text-[8px] font-semibold text-yellow-700 dark:text-yellow-300 transition-colors hover:bg-yellow-500/10 cursor-pointer"
                >
                  Decline — remove from order
                </button>
              ) : (
                <div className="mt-1.5 rounded bg-green-500/10 px-2 py-1 text-[8px] font-medium text-green-700 dark:text-green-300">
                  Declined — excluded from your total ✓
                </div>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between border-t pt-2">
              <span className="text-[9px] font-medium">Total {declined && <span className="text-muted-foreground">(warranty declined)</span>}</span>
              <span className="font-mono text-[11px] font-bold tabular-nums text-green-600 dark:text-green-400">{fmt(totalB)}</span>
            </div>
            <button
              onClick={() => setCheckedOut(true)}
              className="mt-2 w-full rounded-md bg-green-600 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-green-700 cursor-pointer"
            >
              Pay {fmt(totalB)}
            </button>
          </div>

          {mode === "auditor" && checkedOut && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <Eye className="h-3 w-3" /> Nothing camouflaged
              </div>
              <p className="text-muted-foreground">
                min ||v<sub>injected</sub> − v<sub>u</sub>||₂ = {DELTA_BENIGN} &gt; τ<sub>camouflage</sub> ({TAU_CAMOUFLAGE}):
                the tinted background, dashed border, badge, and separate section keep the add-on visually apart from your
                items. You paid {declined ? fmt(totalB) : fmt(HEADPHONES.price + WARRANTY.price)} — every dollar of it
                deliberate.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-background p-2.5">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold">Your cart</h3>
            <span className="text-[8px] text-muted-foreground">2 items</span>
          </div>
          <div className="space-y-1.5">
            {/* Both lines rendered with IDENTICAL styling — Δ_color = 3.2 */}
            {userLine(HEADPHONES.name, HEADPHONES.price)}
            <div className="flex items-center justify-between rounded-md border bg-background px-2.5 py-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-muted">
                  <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
                </span>
                <span className="truncate text-[10px] font-medium">{WARRANTY.name}</span>
              </div>
              <span className="ml-2 shrink-0 font-mono text-[10px] font-semibold tabular-nums">{fmt(WARRANTY.price)}</span>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between border-t pt-2">
            <span className="text-[9px] font-medium">Total</span>
            <span className="font-mono text-[11px] font-bold tabular-nums text-red-600 dark:text-red-400">{fmt(HEADPHONES.price + WARRANTY.price)}</span>
          </div>
          <button
            onClick={() => setCheckedOut(true)}
            className="mt-2 w-full rounded-md bg-red-600 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-red-700 cursor-pointer"
          >
            Pay {fmt(HEADPHONES.price + WARRANTY.price)}
          </button>
        </div>

        {mode === "auditor" && checkedOut && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Surcharge camouflaged into your total
            </div>
            <p className="text-muted-foreground">
              You paid <strong className="text-red-500">{fmt(HEADPHONES.price + WARRANTY.price)}</strong> —{" "}
              {fmt(WARRANTY.price)} of it for the {WARRANTY.name} you never added. Because the line is typographically
              identical to your own item, it never triggered a visual inspection. Status-quo bias does the rest at
              checkout.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
