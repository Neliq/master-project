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
  Clock,
  Eye,
  Gauge,
  Info,
  MousePointerClick,
  RotateCcw,
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
  /** Natural product title shown in the simulated User view. */
  userTitle?: string;
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

const SPEED_OPTIONS = [1, 2, 4] as const;

export function DemoShell({
  title,
  userTitle,
  caption,
  hint,
  controls,
  children,
  benign,
  deltaNote,
  className,
  mode = "user",
  annotations = [],
  auditorControls,
  auditorStats,
  speed = 1,
  onRestart,
  onSpeedChange,
}: DemoShellProps) {
  const isAuditor = mode === "auditor";
  const [clickCount, setClickCount] = React.useState(0);
  const [elapsed, setElapsed] = React.useState(0);
  const simulationRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isAuditor) return;
    const startedAt = Date.now();
    let firstTick = true;
    const intervalId = window.setInterval(() => {
      if (firstTick) {
        setClickCount(0);
        setElapsed(0);
        firstTick = false;
      }
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 500);
    return () => window.clearInterval(intervalId);
  }, [isAuditor]);

  // Keep evaluator vocabulary out of the simulated product surface. The
  // auditor layer is the deliberate home for formulas and mechanism labels.
  React.useEffect(() => {
    if (isAuditor) return;
    const metaText = /\b(thesis|heuristic|threshold|classifier|entropy|camouflage|coercion|feedforward|auditor|dark pattern|variant [ab]|what changed|you clicked|added by you|can you tell|quick check|pseudo-random|backend truth|falsifiable|unfalsifiable|scan DOM|locate the .* clause|verify (?:claim|against backend)|FKGL|expect|resolve|specificity|provenance|qualifiers stripped|metric fabricated|actual backend|typographical camouflage|automated scan|reading fatigue|stock-level|\b(?:[A-Z](?:_[A-Za-z]+)+|[A-Z]_[A-Za-z]+\([^)]*\)|τ_[A-Za-z_]+|[A-Z]\([^)]*\))\b|[∅∈≠⇒⟹⊂∧∨])/i;
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

  const handleClickCapture = React.useCallback(() => {
    if (isAuditor) setClickCount((count) => count + 1);
  }, [isAuditor]);

  return (
    <Card
      className={cn(
        "demo-shell-frame overflow-hidden rounded-none border border-white/40 py-0 ring-1 ring-white/20",
        isAuditor && "ring-2 ring-yellow-500/40 border-yellow-500/40",
        className
      )}
    >
      <CardHeader
        className={cn(
          "rounded-none border-b !py-3",
          isAuditor ? "bg-yellow-500/10" : "bg-transparent"
        )}
      >
        <div className="flex items-center gap-2">
          <CardTitle className="text-white text-sm font-medium tracking-wide uppercase">
            {isAuditor ? `${title} — auditor view` : userTitle ?? title}
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
          data-dp-mode={mode}
          data-dp-speed={speed}
          onClickCapture={isAuditor ? handleClickCapture : undefined}
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

        {isAuditor ? (
          <div className="space-y-3 border-t-2 border-dashed border-yellow-500/40 pt-4">
            <div className="text-yellow-700 dark:text-yellow-300 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
              <Eye className="size-3" />
              Auditor view (hidden from users)
            </div>

            {annotations.length > 0 ? (
              <div className="border-l-4 border-yellow-500 bg-yellow-500/5 space-y-2 rounded-r-md p-3">
                <div className="text-yellow-700 dark:text-yellow-300 text-[10px] font-bold uppercase tracking-wider">
                  Dark pattern elements
                </div>
                <ul className="space-y-1.5 text-xs">
                  {annotations.map((annotation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="bg-yellow-500 text-white shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[9px] font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <span className="font-medium">{annotation.label}</span>
                        <span className="text-muted-foreground"> — {annotation.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="border-l-4 border-blue-500 bg-blue-500/5 space-y-2 rounded-r-md p-3">
                <div className="text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                  Presentation controls
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {onRestart ? (
                    <button
                      type="button"
                      onClick={onRestart}
                      className="bg-blue-500 text-white hover:bg-blue-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
                    >
                      <RotateCcw className="size-3" />
                      Restart
                    </button>
                  ) : null}
                  {onSpeedChange ? (
                    <div className="flex items-center gap-0.5 rounded-md border bg-background px-1 py-1 text-xs">
                      <Gauge className="text-muted-foreground mx-0.5 size-3" />
                      {SPEED_OPTIONS.map((option) => (
                        <button
                          type="button"
                          key={option}
                          onClick={() => onSpeedChange(option)}
                          className={cn(
                            "rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold",
                            speed === option
                              ? "bg-blue-500 text-white"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {option}x
                        </button>
                      ))}
                    </div>
                  ) : null}
                  {auditorControls}
                </div>
              </div>
              <div className="border-l-4 border-blue-500 bg-blue-500/5 space-y-2 rounded-r-md p-3">
                <div className="text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                  Live statistics
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <MousePointerClick className="size-3" /> Clicks on UI
                    </span>
                    <span className="font-mono font-semibold tabular-nums">{clickCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="size-3" /> Time in view
                    </span>
                    <span className="font-mono font-semibold tabular-nums">{elapsed}s</span>
                  </div>
                  {auditorStats}
                </div>
              </div>
            </div>
          </div>
        ) : null}

      </CardContent>
    </Card>
  );
}
