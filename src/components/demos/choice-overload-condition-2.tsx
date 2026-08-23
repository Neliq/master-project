"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Choice Overload — Condition 2: Visual Density of Interactive Decision
 * Elements
 *
 * Thesis: the algorithm computes the spatial density rho of interactive
 * elements within the primary decision viewport. With n_interactive
 * clickable nodes and A_viewport the visible area, the feature triggers
 * when density exceeds Miller's cognitive processing capacity:
 *
 *   rho = n_interactive / A_viewport > tau_density
 *
 * Variant A (dark): 30 clickable add-on chips plus two action buttons
 * are crammed into a compact viewport — a saturated grid where rational
 * comparison is infeasible (rho = 0.32 > 0.25).
 * Variant B (benign): the same 30 add-ons, same payload, but staged into
 * three collapsible category sections, so the primary decision viewport
 * only exposes section headers plus the action buttons (rho = 0.05).
 */

const CATEGORIES = [
  {
    name: "Sports",
    items: ["Premier League", "Champions League", "La Liga", "Serie A", "NBA", "NFL", "MLB", "NHL", "Formula 1", "MotoGP"],
  },
  {
    name: "News",
    items: ["CNN+", "BBC World", "Sky News", "Bloomberg TV", "Reuters TV", "Al Jazeera", "Euronews", "France 24", "CNA", "TRT World"],
  },
  {
    name: "Kids",
    items: ["Nick Jr", "Cartoonito", "Boomerang", "PBS Kids", "Disney Junior", "CBeebies", "BabyTV", "Tooncast", "Kix", "Pop"],
  },
];

const TOTAL_ITEMS = CATEGORIES.reduce((n, c) => n + c.items.length, 0); // 30
const N_INTERACTIVE_DARK = TOTAL_ITEMS + 2; // 30 chips + 2 buttons
const N_INTERACTIVE_BENIGN = CATEGORIES.length + 2; // 3 headers + 2 buttons
const AREA_VIEWPORT = 100; // normalized units
const RHO_DARK = N_INTERACTIVE_DARK / AREA_VIEWPORT; // 0.32
const RHO_BENIGN = N_INTERACTIVE_BENIGN / AREA_VIEWPORT; // 0.05
const TAU_DENSITY = 0.25;

export function ChoiceOverloadCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});
  const [added, setAdded] = React.useState(false);

  const reset = () => {
    setSelected({});
    setAdded(false);
  };

  const toggle = (name: string) =>
    setSelected((s) => ({ ...s, [name]: !s[name] }));

  const selectedCount = Object.values(selected).filter(Boolean).length;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">n_interactive (dark viewport)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{N_INTERACTIVE_DARK}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">A_viewport</span>
        <span className="font-mono font-semibold tabular-nums">{AREA_VIEWPORT} u²</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">ρ (dark) = n / A</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">
          {RHO_DARK.toFixed(2)} &gt; {TAU_DENSITY.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">ρ (benign, staged)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{RHO_BENIGN.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Add-ons selected</span>
        <span className="font-mono font-semibold tabular-nums">{selectedCount} / {TOTAL_ITEMS}</span>
      </div>
    </>
  ) : null;

  const chip = (name: string, accent: "rose" | "emerald", dense: boolean) => (
    <button
      key={name}
      onClick={() => toggle(name)}
      className={`rounded-md border px-1.5 py-1 text-[8px] font-medium transition-colors cursor-pointer ${
        selected[name]
          ? accent === "rose"
            ? "border-red-500 bg-red-500/15 text-red-700 dark:text-red-300"
            : "border-green-500 bg-green-500/15 text-green-700 dark:text-green-300"
          : "border-border bg-background text-muted-foreground hover:text-foreground"
      } ${dense ? "truncate" : ""}`}
      title={name}
    >
      {name}
    </button>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Choice Overload: Visual Density of Interactive Decision Elements"
      caption="Visual Density of Interactive Decision Elements — 32 clickable nodes are packed into one compact viewport, so dense that comparing them rationally is impossible before decision fatigue sets in."
      auditorStats={stats}
      deltaNote="Both variants offer the same 30 add-ons with the same prices and the same selection mechanism. Variant A renders all of them as a saturated grid in a small viewport (rho = 0.32 > tau); Variant B stages the same 30 add-ons inside three collapsible categories, so the primary viewport holds just 5 interactive elements (rho = 0.05) and the density heuristic no longer fires."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Personalize your plan</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Pick from {TOTAL_ITEMS} optional add-on channels (each $2/mo). They are grouped
              by category so you can review them one section at a time.
            </p>

            <div className="mt-2 space-y-2">
              {CATEGORIES.map((cat) => (
                <details key={cat.name} className="group rounded-md border bg-background">
                  <summary className="flex cursor-pointer items-center justify-between px-2 py-1.5 text-[9px] font-semibold text-muted-foreground transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
                    <span>{cat.name} — {cat.items.length} add-ons</span>
                    <svg className="h-3 w-3 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="grid grid-cols-3 gap-1.5 border-t p-2 sm:grid-cols-4">
                    {cat.items.map((name) => chip(name, "emerald", false))}
                  </div>
                </details>
              ))}
            </div>

            <button
              onClick={() => setAdded(true)}
              disabled={selectedCount === 0}
              className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                selectedCount > 0
                  ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              {added ? "Added ✓" : `Add ${selectedCount} add-on${selectedCount === 1 ? "" : "s"} to my plan`}
            </button>
          </div>

          {added && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Staged density
              </div>
              <p className="text-muted-foreground mt-0.5">
                The same {TOTAL_ITEMS} add-ons were reviewed in groups, so the primary
                decision viewport never held more than {N_INTERACTIVE_BENIGN} interactive
                elements — below the density threshold. Comparison stayed feasible and your
                choice reflects preference, not fatigue.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Personalize your plan</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Pick from {TOTAL_ITEMS} optional add-on channels (each $2/mo). All options are
            shown below — review them all before choosing.
          </p>

          {/* Dense viewport: all 30 chips + the action button visible at once in a compact grid */}
          <div className="mt-2 grid grid-cols-6 gap-0.5 rounded-md border bg-background p-1">
            {CATEGORIES.flatMap((cat) => cat.items).map((name) => chip(name, "rose", true))}
          </div>

          <button
            onClick={() => setAdded(true)}
            disabled={selectedCount === 0}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              selectedCount > 0
                ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            {added ? "Added ✓" : `Add ${selectedCount} add-on${selectedCount === 1 ? "" : "s"} to my plan`}
          </button>
        </div>

        {added && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              More options
            </div>
            <p className="text-muted-foreground">
              <strong className="font-mono text-red-500">
                ρ = {N_INTERACTIVE_DARK} / {AREA_VIEWPORT} = {RHO_DARK.toFixed(2)} &gt; τ_density = {TAU_DENSITY.toFixed(2)}
              </strong>{" "}
              — {N_INTERACTIVE_DARK} clickable nodes (30 add-on chips + 2 buttons) saturate
              one compact viewport. Miller&rsquo;s cognitive capacity is exceeded long before
              you finish reading the grid.
            </p>
            <p className="text-muted-foreground">
              When every pixel is a decision, rational comparison becomes infeasible; most
              users stop evaluating and click whatever stands out — often the default or the
              first item. It can take a moment to compare all of the available options.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
