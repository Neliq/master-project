"use client";

/**
 * DemoShell — consistent framing for every pattern demo.
 *
 * Supports two view modes:
 * - "user": renders only the dark pattern UI, exactly as a real user would
 *   see it on a real site.
 * - "auditor": renders the same dark pattern UI but adds an audit layer
 *   below (annotation legend, presentation controls, live statistics).
 *   The audit layer is visually isolated with its own background, dashed
 *   top border, and color-coded left borders.
 *
 * The dark-pattern UI is wrapped in a `[data-dp-simulation]` container so
 * the audit layer can count clicks and (later) the CSS can react to speed
 * via `[data-dp-speed]`.
 */

import * as React from "react";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ViewMode = "user" | "auditor";

export interface AnnotationItem {
  /** Short label, e.g. "Continue button" or "Hidden toggle". */
  label: string;
  /** Why this is the dark pattern. */
  description: string;
}

export interface DemoShellProps {
  /** Pattern name, e.g. "Sneak Into Basket". */
  title: string;
  /** Short tagline shown beneath the title. */
  caption?: string;
  /** What the user should pay attention to while interacting. */
  hint?: string;
  /** Optional set of toggles (illuminated by the demo author). */
  controls?: ReactNode;
  /** The actual interactive widget (the dark pattern, Variant A). */
  children: ReactNode;
  /**
   * Optional non-dark counterpart (Variant B) — the same UI with the
   * deceptive heuristic neutralised, per the thesis's Minimal-Variance
   * Principle (Ch. 4). When provided, children and `benign` are rendered
   * side by side as an A/B pair so the difference is immediately visible.
   */
  benign?: ReactNode;
  /** Optional one-liner describing exactly what changed between A and B. */
  deltaNote?: string;
  /** Optional className for the root card. */
  className?: string;
  /** View mode: "user" shows only the dark pattern UI; "auditor" adds audit chrome. */
  mode?: ViewMode;
  /** Auditor-only: descriptions of each dark pattern element. */
  annotations?: AnnotationItem[];
  /** Auditor-only: per-demo controls (skip ahead, fast-forward). */
  auditorControls?: ReactNode;
  /** Auditor-only: per-demo stats (e.g. "Steps to delete: 8"). */
  auditorStats?: ReactNode;
  /** Auditor-only: speed multiplier. */
  speed?: number;
  /** Auditor-only: restart callback. */
  onRestart?: () => void;
  /** Auditor-only: speed change callback. */
  onSpeedChange?: (s: number) => void;
}

export function DemoShell({
  title,
  caption,
  hint,
  controls,
  children,
  benign,
  deltaNote,
  className,
  mode = "user",
  speed = 1,
}: DemoShellProps) {
  const isAuditor = mode === "auditor";
  const simulationRef = React.useRef<HTMLDivElement>(null);

  // Keep evaluator vocabulary out of the simulated product surface. The
  // auditor layer is the deliberate home for formulas and mechanism labels.
  React.useEffect(() => {
    if (isAuditor) return;
    const metaText = /\b(thesis|heuristic|threshold|classifier|entropy|camouflage|coercion|feedforward|auditor|dark pattern|variant [ab]|what changed|you clicked|added by you|can you tell|quick check)\b|τ_|DOM\(|V_forced|v_prev|N_close|T_\w+\s*[=∈≠]/i;
    const scrub = (root: HTMLElement) => {
      root.querySelectorAll<HTMLElement>("[data-dp-content] *").forEach((element) => {
        const directText = Array.from(element.childNodes)
          .filter((node) => node.nodeType === Node.TEXT_NODE)
          .map((node) => node.textContent ?? "")
          .join(" ");
        if (directText && metaText.test(directText)) element.hidden = true;
      });
    };
    const root = simulationRef.current;
    if (!root) return;
    scrub(root);
    const observer = new MutationObserver(() => scrub(root));
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [isAuditor]);

  return (
    <Card
      className={cn(
        "demo-shell-frame overflow-hidden rounded-none border border-white/40 py-0 ring-1 ring-white/20",
        className
      )}
    >
      <CardHeader
        className={cn(
          "rounded-none border-b !py-3",
          "bg-transparent"
        )}
      >
        <div className="flex items-center gap-2">
          <CardTitle className="text-white text-sm font-medium tracking-wide uppercase">
            {isAuditor ? `${title} — auditor view` : title}
          </CardTitle>
          {isAuditor && (
            <span className="bg-yellow-500 text-white ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide">
              Audit
            </span>
          )}
        </div>
        {caption && isAuditor ? (
          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
            {caption}
          </p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4 pt-5 pb-5">
        {hint && isAuditor ? (
          <div className="border-foreground/10 bg-muted/40 flex items-start gap-2 rounded-md border px-3 py-2 text-xs leading-relaxed">
            <Info className="text-muted-foreground mt-0.5 size-3.5 shrink-0" />
            <span className="text-muted-foreground">{hint}</span>
          </div>
        ) : null}
        {controls && !isAuditor ? (
          <div className="flex flex-wrap items-center gap-2">{controls}</div>
        ) : null}

        {/* ============================================================ */}
        {/* USER-FACING UI — visually isolated from the auditor chrome.  */}
        {/* Single demos render one dark-pattern fragment; demos that    */}
        {/* ship a benign counterpart render an A/B pair (Variant A =    */}
        {/* dark pattern, Variant B = non-dark pattern), so the delta    */}
        {/* between the two states is immediately visible.               */}
        {/* ============================================================ */}
        <div
          ref={simulationRef}
          data-dp-simulation
          data-dp-speed={speed}
          className="relative border border-white bg-white p-4 ring-1 ring-white/20"
        >
          {benign && isAuditor ? (
            <>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* ── Variant A: the dark pattern ── */}
                <div
                  className={cn(
                    "rounded-md border p-3",
                    isAuditor
                      ? "ring-2 ring-foreground/20 border-foreground/20"
                      : "ring-1 ring-foreground/15"
                  )}
                >
                  <div className="bg-muted/60 border-foreground/15 text-foreground mb-3 flex items-center gap-1.5 rounded border px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                    <AlertTriangle className="size-3" />
                    {isAuditor ? "Variant A — Dark pattern" : "Option A"}
                  </div>
                  <div data-dp-content>{children}</div>
                </div>
                {/* ── Variant B: the non-dark counterpart ── */}
                <div
                  className={cn(
                    "rounded-md border p-3",
                    isAuditor
                      ? "ring-2 ring-foreground/20 border-foreground/20"
                      : "ring-1 ring-foreground/15"
                  )}
                >
                  <div className="bg-muted/60 border-foreground/15 text-foreground mb-3 flex items-center gap-1.5 rounded border px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle2 className="size-3" />
                    {isAuditor ? "Variant B — Non-dark pattern" : "Option B"}
                  </div>
                  <div data-dp-content>{benign}</div>
                </div>
              </div>
              {deltaNote && isAuditor ? (
                <div className="border-foreground/10 bg-muted/40 mt-3 flex items-start gap-2 rounded-md border px-3 py-2 text-xs leading-relaxed">
                  <Info className="text-muted-foreground mt-0.5 size-3.5 shrink-0" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">What changed:</strong>{" "}
                    {deltaNote}
                  </span>
                </div>
              ) : null}
            </>
          ) : (
            <div
              className={cn(
                "relative",
                isAuditor
                  ? "ring-2 ring-foreground/20 border-foreground/20 rounded-md border p-3"
                  : ""
              )}
            >
              {isAuditor ? (
                <div className="bg-muted/60 border-foreground/15 text-foreground -mx-1 -mt-1 mb-3 flex items-center gap-1.5 rounded border px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                  <AlertTriangle className="size-3" />
                  Dark pattern fragment
                </div>
              ) : null}
              <div data-dp-content>{children}</div>
            </div>
          )}
        </div>

      </CardContent>
    </Card>
  );
}
