"use client";

/**
 * DemoSection — client wrapper that mounts a pattern's interactive demo
 * with a view-mode toggle (user / auditor) and restart handling.
 *
 * The demo itself is mounted under a `key` derived from a restart counter;
 * flipping the key re-creates the demo subtree and wipes its internal
 * state, which is the simplest way to implement "Restart presentation"
 * for 62 different demos that each manage their own state.
 *
 * When a pattern has `conditionDemos`, this component renders one demo per
 * condition instead of the single legacy demo. Each condition demo is
 * labelled with its condition title and shown under its corresponding
 * formal condition section.
 *
 * When `conditionIndex` is provided, only the demo for that specific
 * condition is rendered (used for the grouped layout in page.tsx).
 */

import * as React from "react";

import { getDemo } from "@/components/pattern-demo";
import { ViewModeToggle } from "@/components/demos/view-mode-toggle";
import { AUDITOR_ANNOTATIONS } from "@/lib/auditor-annotations";
import { PATTERNS_BY_SLUG } from "@/lib/patterns";
import { cn } from "@/lib/utils";
import type { ViewMode } from "@/components/demos/demo-shell";

export function DemoSection({
  slug,
  conditionIndex,
  showControls = true,
}: {
  slug: string;
  /** When provided, render only the demo for this specific condition index. */
  conditionIndex?: number;
  /** Whether to show the user/auditor toggle bar. Default true. */
  showControls?: boolean;
}) {
  const [mode, setMode] = React.useState<ViewMode>("user");
  const [restartKey, setRestartKey] = React.useState(0);

  const pattern = PATTERNS_BY_SLUG[slug];
  const conditionDemos = pattern?.conditionDemos;
  const conditions = pattern?.conditions;

  const onRestart = () => setRestartKey((k) => k + 1);

  // Resolve the demo component(s) outside JSX to satisfy lint rules.
  const singleDemo = React.useMemo(() => {
    if (conditionIndex === undefined) return null;
    const cd = conditionDemos?.find((d) => d.conditionIndex === conditionIndex);
    if (!cd) return null;
    const C = getDemo(cd.demoSlug);
    if (!C) return null;
    return { Component: C, demoSlug: cd.demoSlug };
  }, [conditionIndex, conditionDemos]);

  const legacyDemo = React.useMemo(() => {
    if (conditionIndex !== undefined) return null;
    const C = getDemo(slug);
    if (!C) return null;
    return { Component: C, demoSlug: slug };
  }, [conditionIndex, slug]);

  const allConditionEntries = React.useMemo(() => {
    if (!conditionDemos || conditionIndex !== undefined) return [];
    return conditionDemos.map((cd) => {
      const condition = conditions?.[cd.conditionIndex];
      const C = getDemo(cd.demoSlug);
      return { condition, Component: C, demoSlug: cd.demoSlug };
    });
  }, [conditionDemos, conditions, conditionIndex]);

  // --- Single condition mode (used by grouped layout) ---
  if (conditionIndex !== undefined) {
    if (!singleDemo) return null;
    const { Component: DemoComp, demoSlug } = singleDemo;
    return (
      <div className="space-y-2">
        {showControls && (
          <div
            className={cn(
              "flex flex-wrap items-center justify-between gap-3 rounded-md border px-3 py-2",
              mode === "auditor"
                ? "border-yellow-500/40 bg-yellow-500/5"
                : "border-foreground/10 bg-muted/20"
            )}
          >
            {mode === "auditor" ? <p className="text-muted-foreground max-w-2xl text-xs leading-relaxed">
              Each example shows the pattern as an <strong className="text-foreground">A/B pair</strong>{" "}
              (thesis Ch. 4–5): <strong className="text-red-700 dark:text-red-300">Variant A</strong>{" "}
              executes the deceptive heuristic, <strong className="text-green-700 dark:text-green-300">Variant B</strong>{" "}
              is the same interface with it neutralised.{" "}
              <strong className="text-yellow-700 dark:text-yellow-300">Auditor view</strong> adds annotations
              and live statistics.
            </p> : null}
            <ViewModeToggle mode={mode} onChange={setMode} />
          </div>
        )}
        <DemoComp
          key={restartKey}
          mode={mode}
          annotations={mode === "auditor" ? AUDITOR_ANNOTATIONS[demoSlug] : []}
          onRestart={onRestart}
        />
      </div>
    );
  }

  // --- All-conditions mode (default, legacy) ---
  return (
    <div className="space-y-3">
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-3 rounded-md border px-3 py-2",
          mode === "auditor"
            ? "border-yellow-500/40 bg-yellow-500/5"
            : "border-foreground/10 bg-muted/20"
        )}
      >
        {mode === "auditor" ? <p className="text-muted-foreground max-w-2xl text-xs leading-relaxed">
          Each example shows the pattern as an <strong className="text-foreground">A/B pair</strong>{" "}
          (thesis Ch. 4–5): <strong className="text-red-700 dark:text-red-300">Variant A</strong>{" "}
          executes the deceptive heuristic, <strong className="text-green-700 dark:text-green-300">Variant B</strong>{" "}
          is the same interface with it neutralised. Auditor view adds annotations,
          presentation controls (restart), and live statistics — all visually separated
          from the dark pattern itself.
        </p> : null}
        <ViewModeToggle mode={mode} onChange={setMode} />
      </div>

      {allConditionEntries.length > 0 ? (
        <div className="space-y-6">
          {allConditionEntries.map((entry, i) => (
            <div key={i} className="space-y-2">
              {entry.condition && (
                <div className="border-l-2 border-foreground/20 pl-3">
                  <h3 className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                    Condition {i + 1}: {entry.condition.title}
                  </h3>
                </div>
              )}
              {entry.Component ? (
                <entry.Component
                  key={restartKey}
                  mode={mode}
                  annotations={mode === "auditor" ? AUDITOR_ANNOTATIONS[entry.demoSlug] : []}
                  onRestart={onRestart}
                />
              ) : null}
            </div>
          ))}
        </div>
      ) : legacyDemo ? (
        <legacyDemo.Component
          key={restartKey}
          mode={mode}
          annotations={mode === "auditor" ? AUDITOR_ANNOTATIONS[legacyDemo.demoSlug] : []}
          onRestart={onRestart}
        />
      ) : null}
    </div>
  );
}
