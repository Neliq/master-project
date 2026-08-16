"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { ScanSearch, Users } from "lucide-react";

/*
 * High Demand — Condition 3: Semantic Verifiability of Social-Proof
 * Quantifiers
 *
 * Thesis: the algorithm evaluates whether demand-asserting statements
 * ("X people are viewing," "Y bought this") contain verifiable temporal
 * or geographic qualifiers. The feature triggers if a social-proof claim
 * employs a precise numeric quantifier but lacks any bounding qualifier
 * ("in the last hour," "from your city"), rendering it unfalsifiable:
 *
 *   ∃q ∈ ℤ⁺ ⊂ T(N_demand) ∧ ¬∃ Qualifier_temporal/geographic ∈ T(N_demand)
 *
 * Variant A (dark): "128 people are viewing this" — a precise quantifier
 * with no temporal or geographic bound, so the claim can never be
 * checked.
 * Variant B (benign): "128 people viewed this in the last hour" — the
 * same count, bounded by a temporal qualifier, hence verifiable.
 */

const Q = 128;

export function HighDemandCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [verified, setVerified] = React.useState(false);

  const reset = () => setVerified(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">∃q ∈ ℤ⁺ (quantifier)</span>
        <span className="font-mono font-semibold tabular-nums">{Q}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Qualifier (A)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">¬∃ — none</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Qualifier (B)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">&ldquo;in the last hour&rdquo;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Claim falsifiable (A / B)</span>
        <span className="font-mono font-semibold tabular-nums">
          <span className="text-rose-500">No</span> / <span className="text-emerald-500">Yes</span>
        </span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="High Demand: Semantic Verifiability of Social-Proof Quantifiers"
      caption="Semantic Verifiability of Social-Proof Quantifiers — a precise numeric quantifier with no temporal or geographic bound renders the demand claim semantically unfalsifiable."
      auditorStats={stats}
      deltaNote="Variant A claims “128 people are viewing this” — ∃q = 128 ∈ ℤ⁺ but ¬∃ Qualifier_temporal/geographic, so the assertion can never be checked. Variant B keeps the identical count but bounds it: “128 people viewed this in the last hour,” making the claim verifiable against real analytics."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-[11px] font-semibold">AeroGlide X Wireless Headphones</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">Noise-cancelling over-ear · Graphite</p>
              </div>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                $119
              </span>
            </div>

            {/* Bounded claim — temporal qualifier present */}
            <div className="mt-3 flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-3 py-2">
              <Users className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                  {Q} people viewed this in the last hour
                </div>
                <div className="text-[8px] text-muted-foreground">
                  ∃q = {Q} ∈ ℤ⁺ ∧ Qualifier_temporal = &ldquo;in the last hour&rdquo; — falsifiable
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
              <span className="line-through">$195</span>
              <span className="font-semibold text-foreground">$119</span>
            </div>

            <button
              onClick={() => setVerified(true)}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/5 py-1.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 transition-colors cursor-pointer"
            >
              <ScanSearch className="size-3" />
              Verify claim
            </button>

            {verified && (
              <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Claim verified
                </div>
                <p className="text-muted-foreground mt-0.5">
                  ∃q = {Q} ∈ ℤ⁺ with Qualifier_temporal = &ldquo;in the last hour&rdquo; — the assertion is bounded and
                  checkable against backend analytics. A claim you can audit is a claim you can trust.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-[11px] font-semibold">AeroGlide X Wireless Headphones</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">Noise-cancelling over-ear · Graphite</p>
            </div>
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              $119
            </span>
          </div>

          {/* Unbounded claim — precise number, no qualifier */}
          <div className="mt-3 flex items-center gap-2 rounded-md border border-rose-500/30 bg-rose-500/5 px-3 py-2">
            <Users className="size-3.5 text-rose-600 dark:text-rose-400 shrink-0 animate-pulse" />
            <div>
              <div className="font-mono text-[13px] font-bold tabular-nums text-rose-700 dark:text-rose-300">
                {Q} people are viewing this
              </div>
              <div className="text-[8px] text-muted-foreground">
                ∃q = {Q} ∈ ℤ⁺ but ¬∃ Qualifier_temporal/geographic — unfalsifiable
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
            <span className="line-through">$195</span>
            <span className="font-semibold text-foreground">$119</span>
            <span className="text-[8px] font-semibold uppercase tracking-wider text-rose-500">
              {Q} watching now
            </span>
          </div>

          <button
            onClick={() => setVerified(true)}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md border border-rose-500/30 bg-rose-500/5 py-1.5 text-[10px] font-medium text-rose-700 dark:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <ScanSearch className="size-3" />
            Verify claim
          </button>

          {verified && (
            <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Semantically unfalsifiable
              </div>
              <p className="text-muted-foreground">
                ∃q = {Q} ∈ ℤ⁺ ⊂ T(N_demand), yet <strong className="text-rose-500">¬∃ Qualifier_temporal/geographic</strong> —
                no &ldquo;in the last hour,&rdquo; no &ldquo;from your city.&rdquo; Without a bounding qualifier the claim
                cannot be checked: {Q} viewers could mean anything, anywhere, at any time — or nothing at all.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
