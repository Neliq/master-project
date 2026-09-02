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
    return { Component: C };
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
    const { Component: DemoComp } = singleDemo;
    return (
      <div data-dp-category={pattern?.category} className="space-y-2">
        {showControls && (
          <div
            className="flex flex-wrap items-center justify-start gap-3 rounded-md border border-foreground/10 bg-muted/20 px-3 py-2"
          >
            <ViewModeToggle mode={mode} onChange={setMode} />
          </div>
        )}
        <DemoComp
          key={restartKey}
          mode={mode}
          annotations={mode === "auditor" ? AUDITOR_ANNOTATIONS[slug] : []}
          onRestart={onRestart}
        />
      </div>
    );
  }

  // --- All-conditions mode (default, legacy) ---
  return (
    <div data-dp-category={pattern?.category} className="space-y-3">
      <div
        className="flex flex-wrap items-center justify-start gap-3 rounded-md border border-foreground/10 bg-muted/20 px-3 py-2"
      >
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
                  annotations={mode === "auditor" ? AUDITOR_ANNOTATIONS[slug] : []}
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
          annotations={mode === "auditor" ? AUDITOR_ANNOTATIONS[slug] : []}
          onRestart={onRestart}
        />
      ) : null}
    </div>
  );
}
