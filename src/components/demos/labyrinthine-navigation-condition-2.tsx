"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Labyrinthine Navigation — Condition 2: Visual Nesting Depth of
 * Navigation Elements
 *
 * Thesis: the algorithm computes the rendered indentation depth
 * D_render(N) of each navigational menu node, measured as the cumulative
 * CSS padding-left / margin-left in viewport-relative units. The feature
 * triggers if the maximum nesting depth of any privacy- or
 * account-relevant menu item exceeds the cognitive-overload threshold
 * tau_nesting:
 *
 *   max_{n in N_nav} D_render(n) > tau_nesting
 *
 * Variant A (dark): the "Data & cookies" entry sits six levels deep with
 * 72px of cumulative indentation, visually lost inside the hierarchy.
 * Variant B (benign): the identical entries are a flat list.
 */

const TAU_NESTING = 48; // px
const INDENT_STEP = 12; // px per level
const DARK_MAX_DEPTH = 6; // levels
const DARK_MAX_INDENT = DARK_MAX_DEPTH * INDENT_STEP; // 72px

interface TreeItem {
  id: string;
  label: string;
  children?: TreeItem[];
}

const DARK_TREE: TreeItem = {
  id: "account",
  label: "Account settings",
  children: [
    {
      id: "general",
      label: "General preferences",
      children: [
        {
          id: "profile",
          label: "Profile & identity",
          children: [
            {
              id: "contact",
              label: "Contact details",
              children: [
                {
                  id: "email",
                  label: "Email & phone",
                  children: [
                    {
                      id: "privacy",
                      label: "Privacy controls",
                      children: [
                        { id: "data-cookies", label: "Data & cookies" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    { id: "billing", label: "Billing" },
    { id: "notifications", label: "Notifications" },
  ],
};

const BENIGN_LIST = [
  "Account settings",
  "General preferences",
  "Profile & identity",
  "Contact details",
  "Email & phone",
  "Privacy controls",
  "Data & cookies",
];

export function LabyrinthineNavigationCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [open, setOpen] = React.useState<Record<string, boolean>>({});
  const [found, setFound] = React.useState(false);


  const toggle = (id: string) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  const renderTree = (node: TreeItem, depth: number) => {
    const isOpen = !!open[node.id];
    const hasChildren = !!node.children?.length;
    const isTarget = node.id === "data-cookies";
    const px = depth * INDENT_STEP;
    return (
      <div key={node.id}>
        <div
          className={`flex items-center gap-1.5 rounded-md border bg-background p-1.5 transition-colors ${
            isTarget ? "border-border/60" : "border-border hover:bg-foreground/5"
          }`}
          style={{ marginLeft: `${px}px` }}
        >
          <button
            onClick={() => (hasChildren ? toggle(node.id) : isTarget ? setFound(true) : undefined)}
            className={`flex min-w-0 flex-1 items-center gap-1.5 text-left cursor-pointer ${hasChildren ? "" : "cursor-pointer"}`}
            aria-expanded={hasChildren ? isOpen : undefined}
          >
            {hasChildren ? (
              <svg
                className={`h-3 w-3 shrink-0 text-muted-foreground/60 transition-transform ${isOpen ? "rotate-90" : ""}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            ) : (
              <span className="h-3 w-3 shrink-0" />
            )}
            <span className={`truncate text-[10px] ${isTarget ? "font-semibold text-foreground" : "text-foreground/80"}`}>
              {node.label}
            </span>
          </button>
          <span className="shrink-0 font-mono text-[8px] tabular-nums text-muted-foreground/40">
            {mode === "auditor" ? `${px}px` : hasChildren ? "Open section" : "Setting"}
          </span>
        </div>
        {hasChildren && isOpen && node.children!.map((c) => renderTree(c, depth + 1))}
      </div>
    );
  };

  return (
    <DemoShell mode={mode}
      title="Labyrinthine Navigation: Visual Nesting Depth of Navigation Elements"
      userTitle="Harbor — Settings"
      caption="Visual Nesting Depth of Navigation Elements — the account-privacy entry is rendered 72px deep inside a six-level visual hierarchy, far beyond the &tau;_nesting = 48px cognitive-overload threshold."
      deltaNote={`In Variant A the privacy-relevant entry is nested six levels down with a cumulative ${DARK_MAX_INDENT}px of indentation (max D_render > τ_nesting = ${TAU_NESTING}px), so the user must traverse an unreasonable visual hierarchy to find it. Variant B renders the identical entries flat at 0px indentation.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[11px] font-semibold">Settings</h3>
              <span className="rounded-full border border-border/60 px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground">
                flat list
              </span>
            </div>
            <div className="space-y-1.5">
              {BENIGN_LIST.map((label, i) => (
                <button
                  key={label}
                  onClick={() => label === "Data & cookies" && setFound(true)}
                  className={`w-full rounded-md border p-1.5 text-left text-[10px] transition-colors cursor-pointer ${
                    label === "Data & cookies"
                      ? "border-border/60 bg-muted/40 font-semibold text-foreground hover:bg-muted/60"
                      : "border-border bg-background text-foreground/80 hover:bg-foreground/5"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span>{label}</span>
                    <span className="font-mono text-[8px] tabular-nums text-muted-foreground/40">{mode === "auditor" ? `${i * 0}px` : "Available here"}</span>
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-[8px] text-muted-foreground/60">
              Every privacy control is available directly from this settings list.
            </p>
          </div>

          {found && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Found immediately
              </div>
              <p className="mt-0.5 text-muted-foreground">
                “Data &amp; cookies” was one visible row in a flat menu, so there were no extra groups
                to open or decode.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold">Settings</h3>
            <span className="font-mono text-[8px] tabular-nums text-muted-foreground/50">
              {mode === "auditor" ? `nesting up to ${DARK_MAX_DEPTH} levels` : "Settings"}
            </span>
          </div>
          {renderTree(DARK_TREE, 0)}
          <p className="mt-2 text-[8px] text-muted-foreground/60">
            Expand each level to reach “Data &amp; cookies” — note the growing indentation.
          </p>
        </div>

        {mode === "auditor" && found && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Account settings
            </div>
            <p className="text-muted-foreground">
              “Data &amp; cookies” — a basic privacy control — sat at level {DARK_MAX_DEPTH} with{" "}
              {DARK_MAX_INDENT}px of cumulative indentation: max D_render = {DARK_MAX_INDENT}px &gt;
              &tau;_nesting = {TAU_NESTING}px. Each 12px step pushed it further out of the visual
              periphery, so the user must consciously excavate the menu tree to reach an
              essential feature that should be one level deep.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
