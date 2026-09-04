"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Psychological Tricks — Condition 3: Reference Point Obfuscation
 *
 * Thesis: P_anchor ≫ P_actual ⟹ WTP(U_anchored) > WTP(U_baseline)
 *
 * An inflated numerical anchor (e.g. a fabricated “MSRP”) is positioned
 * with high visual salience so the user processes it first, contaminating
 * their Willingness To Pay threshold — the baseline cost then appears as a
 * compelling discount regardless of its actual market value.
 *
 * Variant A (dark): a $299 struck-through anchor towers over the $149
 * price, advertised as a 50% discount.
 * Variant B (benign): the same lamp at $149 with no fabricated anchor.
 *
 * Each WTP slider is independent so the two variants can be compared without
 * one panel changing the other's valuation.
 */

const PRICE = 149;
const ANCHOR = 299;

function PriceRow({ label, value, tone }: { label: string; value: string; tone?: "rose" | "emerald" }) {
  return (
    <div className="flex items-center justify-between text-[9px]">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-mono font-semibold tabular-nums ${tone === "rose" ? "text-red-500" : tone === "emerald" ? "text-green-500" : ""}`}>
        {value}
      </span>
    </div>
  );
}

export function PsychologicalTricksCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [wtpBenign, setWtpBenign] = React.useState(PRICE);
  const [wtpDark, setWtpDark] = React.useState(PRICE);
  const [boughtDark, setBoughtDark] = React.useState(false);
  const [boughtBenign, setBoughtBenign] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Psychological Tricks: Reference Point Obfuscation"
      caption="Reference Point Obfuscation — a fabricated, high-salience anchor is processed before the real price, contaminating the user's Willingness To Pay and making the baseline cost look like a bargain."
      deltaNote="In Variant A the $299 struck-through MSRP anchor (P_anchor ≫ P_actual = $149) reframes the price as a 50% discount and inflates your WTP reference point. Variant B presents the same lamp at $149 with no anchor, so your valuation forms against the actual value."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md   text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18" />
                  <path d="M9 3v18" />
                  <path d="M14 3v18" />
                  <path d="M12 3l6 9-6 9" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">Nordic Desk Lamp</h3>
                <p className="text-[9px] text-muted-foreground">Matte aluminium · warm dimmable LED</p>
              </div>
            </div>

            <div className="mt-2.5 flex items-baseline gap-1.5">
              <span className="text-[14px] font-bold">$149</span>
              <span className="text-[9px] text-muted-foreground">everyday price</span>
            </div>

            <div className="mt-3 rounded-md border border-border/60 bg-background p-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-medium text-muted-foreground">
                  What would you pay for this lamp?
                </span>
                <span className="font-mono text-[10px] font-bold tabular-nums">${wtpBenign}</span>
              </div>
              <input
                type="range"
                min={50}
                max={300}
                step={5}
                value={wtpBenign}
                onChange={(e) => setWtpBenign(Number(e.target.value))}
                className="mt-1.5 w-full accent-green-500 cursor-pointer"
                aria-label="What would you pay for this lamp"
              />
              <div className="mt-0.5 flex justify-between text-[8px] text-muted-foreground/70 font-mono">
                <span>$50</span>
                <span>$300</span>
              </div>
            </div>

            <button
              onClick={() => setBoughtBenign(true)}
              className="mt-2 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Buy now
            </button>
          </div>

          {boughtBenign && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                No anchor — clean reference point
              </div>
              <p className="text-muted-foreground mt-0.5">
                You set your WTP at <strong className="text-foreground">${wtpBenign}</strong> against the
                actual price of $149 with no fabricated anchor — WTP(U_baseline) formed on the
                product&rsquo;s real market value.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md   text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18" />
                <path d="M9 3v18" />
                <path d="M14 3v18" />
                <path d="M12 3l6 9-6 9" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">Nordic Desk Lamp</h3>
              <p className="text-[9px] text-muted-foreground">Matte aluminium · warm dimmable LED</p>
            </div>
          </div>

          {/* The inflated anchor is presented FIRST, with maximum visual
              salience, so the user processes it before the actual price. */}
          <div className="mt-2.5 flex items-end gap-2">
            <div>
              <span className="text-[10px] font-mono text-muted-foreground/70 line-through">$299</span>
              <span className="ml-1.5 rounded-full bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/30 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider">
                MSRP
              </span>
            </div>
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-[14px] font-bold">$149</span>
            <span className="rounded-full bg-red-600 text-white px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider">
              Save 50% — today only
            </span>
          </div>

          <div className="mt-3 rounded-md border border-border/60 bg-background p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-medium text-muted-foreground">
                What would you pay for this lamp?
              </span>
              <span className="font-mono text-[10px] font-bold tabular-nums">${wtpDark}</span>
            </div>
            <input
              type="range"
              min={50}
              max={300}
              step={5}
              value={wtpDark}
              onChange={(e) => setWtpDark(Number(e.target.value))}
              className="mt-1.5 w-full accent-red-500 cursor-pointer"
              aria-label="What would you pay for this lamp"
            />
            <div className="mt-0.5 flex justify-between text-[8px] text-muted-foreground/70 font-mono">
              <span>$50</span>
              <span>$300</span>
            </div>
          </div>

          <button
            onClick={() => setBoughtDark(true)}
            className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Buy now
          </button>
        </div>

        {boughtDark && mode !== "auditor" && (
          <div className="rounded-md border border-border bg-muted/30 p-2.5 text-[9px] leading-relaxed">
            <div className="font-semibold uppercase tracking-tight">Added to cart</div>
            <p className="text-muted-foreground mt-0.5">Nordic Desk Lamp — $149. Your cart is ready for checkout.</p>
          </div>
        )}

        {boughtDark && mode === "auditor" && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Reference point contaminated
            </div>
            <PriceRow label="P_anchor (fabricated MSRP)" value={`$${ANCHOR}`} tone="rose" />
            <PriceRow label="P_actual (real market value)" value={`$${PRICE}`} tone="emerald" />
            <PriceRow label="Anchor ratio P_anchor / P_actual" value="2.01" tone="rose" />
            <p className="text-muted-foreground mt-0.5">
              The original price is shown for comparison with today&rsquo;s price of $149.
              The lamp is currently available for <strong className="text-foreground">${wtpDark}</strong>.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
