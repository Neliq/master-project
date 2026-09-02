"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Psychological Tricks — Condition 1: Asymmetric Dominance
 *
 * Thesis: V(O_target) ≫ V(O_decoy) ∧ Cost(O_target) ≈ Cost(O_decoy)
 *         ⟹ P_select(O_target) → Max
 *
 * A decoy option, engineered to be inferior to the target tier in every
 * metric while remaining structurally similar in price, artificially
 * inflates the target's perceived value and shifts preference toward it.
 *
 * Variant A (dark): three tiers — the $12 “Deluxe” decoy is worse than the
 * $12 “Pro” target on every metric, existing only to make Pro look dominant.
 * Variant B (benign): the decoy is removed; the same two real tiers remain.
 */

type Tier = { id: string; name: string; price: string; storage: string; sync: string; devices: string; featured?: boolean };

const DARK_TIERS: Tier[] = [
  { id: "basic", name: "Basic", price: "$4", storage: "5 GB", sync: "No sync", devices: "1 device" },
  { id: "pro", name: "Pro", price: "$12", storage: "100 GB", sync: "Real-time sync", devices: "3 devices", featured: true },
  { id: "deluxe", name: "Deluxe", price: "$12", storage: "10 GB", sync: "No sync", devices: "1 device" },
];

const BENIGN_TIERS: Tier[] = [
  { id: "basic", name: "Basic", price: "$4", storage: "5 GB", sync: "No sync", devices: "1 device" },
  { id: "pro", name: "Pro", price: "$12", storage: "100 GB", sync: "Real-time sync", devices: "3 devices" },
];

function TierCard({
  tier, selected, onSelect, accent,
}: {
  tier: Tier;
  selected: boolean;
  onSelect: () => void;
  accent: "rose" | "emerald";
}) {
  const ring = accent === "rose" ? "ring-red-500/50 border-red-500/40" : "ring-green-500/50 border-green-500/40";
  return (
    <button
      onClick={onSelect}
      className={`rounded-md border bg-card p-2.5 text-left transition-all cursor-pointer ${
        selected ? `ring-2 ${ring}` : "border-border hover:border-foreground/20"
      }`}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="text-[10px] font-semibold">{tier.name}</span>
        {tier.featured && (
          <span className="rounded-full bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border border-yellow-500/30 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider">
            Most popular
          </span>
        )}
      </div>
      <div className="mt-1 flex items-baseline gap-0.5">
        <span className="text-[13px] font-bold">{tier.price}</span>
        <span className="text-[8px] text-muted-foreground">/month</span>
      </div>
      <ul className="mt-1.5 space-y-0.5 text-[8px] text-muted-foreground">
        <li>{tier.storage} cloud storage</li>
        <li>{tier.sync}</li>
        <li>{tier.devices}</li>
      </ul>
    </button>
  );
}

export function PsychologicalTricksCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [darkSelected, setDarkSelected] = React.useState<string | null>(null);
  const [benignSelected, setBenignSelected] = React.useState<string | null>(null);

  const reset = () => {
    setDarkSelected(null);
    setBenignSelected(null);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Cost(O_target) vs Cost(O_decoy)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">$12 &asymp; $12</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Metrics where V(O_decoy) &lt; V(O_target)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">3 / 3</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P_select(O_target)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">&rarr; Max</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Decoy present</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">yes (O_decoy)</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Psychological Tricks: Asymmetric Dominance"
      caption="Asymmetric Dominance — a decoy option that is inferior to the target tier in every metric while costing about the same artificially inflates the target's perceived value."
      auditorStats={stats}
      deltaNote="In Variant A the $12 “Deluxe” decoy is dominated by the $12 “Pro” target on all three metrics, steering choice toward Pro. Variant B removes the decoy entirely, leaving the same two genuine tiers."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">CloudStore backup plans</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Two honest plans. Pick the one that fits your storage needs.
            </p>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {BENIGN_TIERS.map((t) => (
                <TierCard key={t.id} tier={t} selected={benignSelected === t.id} onSelect={() => setBenignSelected(t.id)} accent="emerald" />
              ))}
            </div>
          </div>

          {benignSelected && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Fair choice matrix
              </div>
              <p className="text-muted-foreground mt-0.5">
                No decoy exists, so no option artificially inflates another&rsquo;s value. Your
                preference reflects the real trade-off between storage, sync, and price.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">CloudStore backup plans</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Compare plans and pick the one that fits your storage needs.
          </p>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5">
            {DARK_TIERS.map((t) => (
              <TierCard key={t.id} tier={t} selected={darkSelected === t.id} onSelect={() => setDarkSelected(t.id)} accent="rose" />
            ))}
          </div>
        </div>

        {mode === "auditor" && darkSelected && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Plan selected
            </div>
            <p className="text-muted-foreground">
              <strong className="text-foreground">V(O_target) &gg; V(O_decoy)</strong> and{" "}
              <strong className="text-foreground">Cost(O_target) &asymp; Cost(O_decoy)</strong>:
              the $12 Deluxe decoy is worse than the $12 Pro on every metric — less storage, no
              sync, fewer devices. It exists only to make Pro look dominant, pushing{" "}
              <strong className="text-foreground">P_select(O_target) &rarr; Max</strong>.
            </p>
            <p className="text-muted-foreground">
              {darkSelected === "pro"
                ? "You selected Pro. It includes more storage and additional features."
                : "Even when choosing elsewhere, the decoy re-frames Pro as the rational pick in every comparison."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
