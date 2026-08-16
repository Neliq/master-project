"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Customisation (Interface Nesting) — Condition 2: Visual Indentation
 * Depth of Privacy Controls
 *
 * Thesis: the algorithm traverses the rendered privacy-settings subtree
 * and measures the cumulative horizontal offset of each toggle from the
 * root settings container. The feature triggers if the mean indentation
 * depth — computed from CSS box-model offsets — exceeds tau_indent,
 * indicating privacy-preserving options are visually obfuscated beneath
 * layers of hierarchical nesting:
 *
 *   (1/|N_privacy|) * sum_{n in N_privacy} offsetX(n) > tau_indent
 *
 * Variant A (dark): every privacy toggle is pushed 16-64px to the right
 * inside collapsed nested groups; the mean offset exceeds the threshold.
 * Variant B (benign): the identical toggles sit flat at the root.
 */

const INDENT_STEP = 16; // px per level
const TAU_INDENT = 24; // px

interface ToggleDef {
  id: string;
  label: string;
  depth: number; // nesting level
  on: boolean;
  group?: string;
}

const DARK_TOGGLES: ToggleDef[] = [
  { id: "t1", label: "Interest-based advertising", depth: 2, on: true, group: "Personalised advertising" },
  { id: "t2", label: "Behavioural profiling", depth: 2, on: true, group: "Personalised advertising" },
  { id: "t3", label: "Cross-device personalisation", depth: 3, on: true, group: "Personalised advertising" },
  { id: "t4", label: "Cross-device graph linkage", depth: 4, on: true, group: "Cross-device personalisation" },
  { id: "t5", label: "Share data with business partners", depth: 1, on: false, group: "Data sharing" },
  { id: "t6", label: "Sell anonymised usage data", depth: 2, on: false, group: "Data sharing" },
  { id: "t7", label: "Ad performance measurement", depth: 1, on: true, group: "Measurement" },
  { id: "t8", label: "Cross-site tracking for attribution", depth: 2, on: true, group: "Measurement" },
];

const meanOffsetDark =
  DARK_TOGGLES.reduce((sum, t) => sum + t.depth * INDENT_STEP, 0) / DARK_TOGGLES.length;
const maxOffsetDark = Math.max(...DARK_TOGGLES.map((t) => t.depth * INDENT_STEP));

export function CustomisationCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [onIds, setOnIds] = React.useState<string[]>(
    DARK_TOGGLES.filter((t) => t.on).map((t) => t.id)
  );
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({
    "Personalised advertising": true,
    "Data sharing": false,
    "Measurement": false,
  });
  const [saved, setSaved] = React.useState(false);

  const reset = () => {
    setOnIds(DARK_TOGGLES.filter((t) => t.on).map((t) => t.id));
    setOpenGroups({ "Personalised advertising": true, "Data sharing": false, "Measurement": false });
    setSaved(false);
  };

  const toggle = (id: string) =>
    setOnIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Mean offsetX — dark</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{meanOffsetDark.toFixed(1)}px</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Max offsetX — dark</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{maxOffsetDark}px</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Threshold &tau;_indent</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_INDENT}px</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Trigger: {meanOffsetDark.toFixed(1)} &gt; {TAU_INDENT}</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">TRUE</span>
      </div>
    </>
  ) : null;

  const renderToggle = (t: ToggleDef, accent: "rose" | "emerald", offsetPx: number) => (
    <label
      key={t.id}
      className={`flex cursor-pointer items-start gap-2 rounded-md border p-1.5 transition-colors ${
        t.depth * INDENT_STEP > TAU_INDENT
          ? "border-amber-500/40 bg-amber-500/5"
          : "border-border bg-background hover:border-foreground/20"
      }`}
      style={{ marginLeft: `${offsetPx}px` }}
    >
      <input
        type="checkbox"
        checked={onIds.includes(t.id)}
        onChange={() => toggle(t.id)}
        className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${accent === "rose" ? "accent-rose-500" : "accent-emerald-500"}`}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] leading-relaxed text-foreground/80">{t.label}</span>
        <span className="mt-0.5 block font-mono text-[8px] tabular-nums text-muted-foreground/50">
          offsetX = {offsetPx}px
        </span>
      </span>
    </label>
  );

  const renderGroup = (
    name: string,
    toggles: ToggleDef[],
    accent: "rose" | "emerald",
    groupDepth: number
  ) => {
    const isOpen = openGroups[name];
    return (
      <div key={name} style={{ marginLeft: `${groupDepth * INDENT_STEP}px` }}>
        <button
          onClick={() => setOpenGroups((prev) => ({ ...prev, [name]: !prev[name] }))}
          className="flex w-full items-center gap-1.5 rounded-md border border-border bg-background p-1.5 text-left text-[10px] font-semibold text-foreground/80 transition-colors hover:bg-foreground/5 cursor-pointer"
          aria-expanded={isOpen}
        >
          <svg
            className={`h-3 w-3 shrink-0 text-muted-foreground/60 transition-transform ${isOpen ? "rotate-90" : ""}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="truncate">{name}</span>
        </button>
        {isOpen && (
          <div className="mt-1.5 space-y-1.5">
            {toggles.map((t) => renderToggle(t, accent, (t.depth - groupDepth) * INDENT_STEP))}
          </div>
        )}
      </div>
    );
  };

  const groups = [
    { name: "Personalised advertising", toggles: DARK_TOGGLES.filter((t) => t.group === "Personalised advertising" && t.depth <= 2), depth: 0 },
    { name: "Cross-device personalisation", toggles: DARK_TOGGLES.filter((t) => t.group === "Cross-device personalisation" || t.id === "t3"), depth: 1 },
    { name: "Cross-device graph linkage", toggles: DARK_TOGGLES.filter((t) => t.id === "t4"), depth: 2 },
    { name: "Data sharing", toggles: DARK_TOGGLES.filter((t) => t.group === "Data sharing"), depth: 0 },
    { name: "Measurement", toggles: DARK_TOGGLES.filter((t) => t.group === "Measurement"), depth: 0 },
  ];

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Customisation (Interface Nesting): Visual Indentation Depth of Privacy Controls"
      caption="Visual Indentation Depth of Privacy Controls — privacy toggles are pushed deeper and deeper into nested groups until their mean horizontal offset exceeds the &tau;_indent threshold."
      auditorStats={stats}
      deltaNote={`In Variant A the privacy controls are buried in nested groups with a mean offsetX of ${meanOffsetDark.toFixed(1)}px (> τ_indent = ${TAU_INDENT}px) and a maximum of ${maxOffsetDark}px. Variant B renders the identical toggles flat at the root container — mean offsetX = 0px.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[11px] font-semibold">Privacy settings</h3>
              <span className="rounded-full border border-emerald-500/30 px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                flat list
              </span>
            </div>
            <div className="space-y-1.5">
              {DARK_TOGGLES.map((t) => renderToggle({ ...t, depth: 0 }, "emerald", 0))}
            </div>
            <button
              onClick={() => setSaved(true)}
              className="mt-2.5 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
            >
              Save preferences
            </button>
            <p className="mt-2 text-[8px] text-muted-foreground/60">
              All toggles at offsetX = 0px — mean indentation {0}px.
            </p>
          </div>

          {saved && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Preferences saved
              </div>
              <p className="mt-0.5 text-muted-foreground">
                Every control sat on the root settings container. Mean offsetX = 0px &le;
                &tau;_indent = {TAU_INDENT}px — nothing was visually obfuscated by nesting.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold">Privacy settings</h3>
            <span className="font-mono text-[8px] tabular-nums text-muted-foreground/50">
              mean offsetX {meanOffsetDark.toFixed(1)}px
            </span>
          </div>
          <div className="space-y-1.5">
            {groups.map((g) => renderGroup(g.name, g.toggles, "rose", g.depth))}
          </div>
          <button
            onClick={() => setSaved(true)}
            className="mt-2.5 w-full rounded-md bg-rose-600 hover:bg-rose-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
          >
            Save preferences
          </button>
        </div>

        {saved && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Visual indentation depth triggered
            </div>
            <p className="text-muted-foreground">
              Mean offsetX = {meanOffsetDark.toFixed(1)}px &gt; &tau;_indent = {TAU_INDENT}px over all{" "}
              {DARK_TOGGLES.length} privacy controls (max {maxOffsetDark}px, for “Cross-device graph
              linkage” nested three groups deep). The toggles that protect your privacy are
              visually buried beneath layers of hierarchical nesting, so you have to excavate
              them one group at a time.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
