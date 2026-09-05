"use client";

/**
 * DemoSection — client wrapper that mounts a pattern's interactive demo
 * with a view-mode toggle and links to isolated A/B variants.
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
import { ExternalLink } from "lucide-react";

import { ViewModeToggle } from "@/components/demos/view-mode-toggle";
import { getPatternNumber, PATTERNS_BY_SLUG } from "@/lib/patterns";
import type { ViewMode } from "@/components/demos/demo-shell";

function IsolatedDemoLinks({
  slug,
  conditionIndex,
}: {
  slug: string;
  conditionIndex: number;
}) {
  const patternNumber = getPatternNumber(slug);
  if (patternNumber === undefined) return null;

  const path = (variant: 1 | 2) =>
    `/${patternNumber}/${conditionIndex + 1}/${variant}`;

  return (
    <div className="ml-auto flex flex-wrap items-center gap-1.5">
      <span className="text-[10px] font-semibold tracking-wide text-[#0000f2]/60 uppercase">
        Isolate
      </span>
      <a
        href={path(1)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open dark pattern demo ${patternNumber}/${conditionIndex + 1}/1 in a new card`}
        className="inline-flex items-center gap-1 border border-[#0000f2]/35 bg-white px-2 py-1 text-[10px] font-semibold text-[#0000f2] transition-colors hover:bg-[#0000f2] hover:text-white"
      >
        <ExternalLink className="size-3" aria-hidden />
        1 · Dark
      </a>
      <a
        href={path(2)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open non-dark pattern demo ${patternNumber}/${conditionIndex + 1}/2 in a new card`}
        className="inline-flex items-center gap-1 border border-[#0000f2]/35 bg-white px-2 py-1 text-[10px] font-semibold text-[#0000f2] transition-colors hover:bg-[#0000f2] hover:text-white"
      >
        <ExternalLink className="size-3" aria-hidden />
        2 · Non-dark
      </a>
    </div>
  );
}

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

  const pattern = PATTERNS_BY_SLUG[slug];
  const conditionDemos = pattern?.conditionDemos;
  const conditions = pattern?.conditions;


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
      return {
        condition,
        Component: C,
        demoSlug: cd.demoSlug,
        conditionIndex: cd.conditionIndex,
      };
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
            <IsolatedDemoLinks slug={slug} conditionIndex={conditionIndex} />
          </div>
        )}
        <DemoComp
          mode={mode}
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
                <div className="flex items-center gap-3 border-l-2 border-foreground/20 pl-3">
                  <h3 className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                    Condition {i + 1}: {entry.condition.title}
                  </h3>
                  <IsolatedDemoLinks
                    slug={slug}
                    conditionIndex={entry.conditionIndex}
                  />
                </div>
              )}
              {entry.Component ? (
                <entry.Component
                  mode={mode}
                />
              ) : null}
            </div>
          ))}
        </div>
      ) : legacyDemo ? (
        <legacyDemo.Component
          mode={mode}
        />
      ) : null}
    </div>
  );
}
