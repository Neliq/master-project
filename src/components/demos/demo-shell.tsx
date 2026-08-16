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
  Beaker,
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

  // Time tracker (auditor mode only). Resets on every mode flip so the
  // "time in view" matches what the auditor is actually looking at.
  React.useEffect(() => {
    if (!isAuditor) return;
    const start = Date.now();
    let first = true;
    const id = window.setInterval(() => {
      if (first) {
        // Reset counters on the first tick after the mode flip (avoids a
        // synchronous setState inside the effect body).
        setElapsed(0);
        setClickCount(0);
        first = false;
      }
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 500);
    return () => window.clearInterval(id);
  }, [isAuditor]);

  const handleClickCapture = React.useCallback(() => {
    if (isAuditor) setClickCount((c) => c + 1);
  }, [isAuditor]);

  return (
    <Card
      className={cn(
        "border-foreground/10 ring-1 ring-foreground/5 overflow-hidden",
        isAuditor && "ring-2 ring-amber-500/40 border-amber-500/40",
        className
      )}
    >
      <CardHeader
        className={cn(
          "border-b py-3",
          isAuditor ? "bg-amber-500/10" : "bg-muted/30"
        )}
      >
        <div className="flex items-center gap-2">
          {isAuditor ? (
            <Eye className="text-amber-700 dark:text-amber-300 size-3.5" />
          ) : (
            <Beaker className="text-muted-foreground size-3.5" />
          )}
          <CardTitle className="text-sm font-medium tracking-wide uppercase">
            {isAuditor ? `${title} — auditor view` : title}
          </CardTitle>
          {isAuditor && (
            <span className="bg-amber-500 text-white ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide">
              Audit
            </span>
          )}
        </div>
        {caption ? (
          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
            {caption}
          </p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        {hint && !isAuditor ? (
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
          data-dp-simulation
          data-dp-speed={speed}
          onClickCapture={isAuditor ? handleClickCapture : undefined}
          className="bg-background relative rounded-md border p-4 ring-1 ring-foreground/5"
        >
          {benign ? (
            <>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* ── Variant A: the dark pattern ── */}
                <div
                  className={cn(
                    "rounded-md border p-3",
                    isAuditor
                      ? "ring-2 ring-red-500/40 border-red-500/40"
                      : "ring-1 ring-red-500/30"
                  )}
                >
                  <div className="bg-red-500/10 border-red-500/40 text-red-800 dark:text-red-200 mb-3 flex items-center gap-1.5 rounded border px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                    <AlertTriangle className="size-3" />
                    Variant A — Dark pattern
                  </div>
                  {children}
                </div>
                {/* ── Variant B: the non-dark counterpart ── */}
                <div
                  className={cn(
                    "rounded-md border p-3",
                    isAuditor
                      ? "ring-2 ring-emerald-500/40 border-emerald-500/40"
                      : "ring-1 ring-emerald-500/30"
                  )}
                >
                  <div className="bg-emerald-500/10 border-emerald-500/40 text-emerald-800 dark:text-emerald-200 mb-3 flex items-center gap-1.5 rounded border px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle2 className="size-3" />
                    Variant B — Non-dark pattern
                  </div>
                  {benign}
                </div>
              </div>
              {deltaNote ? (
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
                  ? "ring-2 ring-red-500/40 border-red-500/40 rounded-md border p-3"
                  : ""
              )}
            >
              {isAuditor ? (
                <div className="bg-red-500/10 border-red-500/40 text-red-800 dark:text-red-200 -mx-1 -mt-1 mb-3 flex items-center gap-1.5 rounded border px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                  <AlertTriangle className="size-3" />
                  Dark pattern fragment
                </div>
              ) : null}
              {children}
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* AUDITOR-ONLY CHROME — strongly separated from the user UI.  */}
        {/* All presentation controls, statistics, and explanations are  */}
        {/* rendered here in user mode they do not exist at all.       */}
        {/* ============================================================ */}
        {isAuditor ? (
          <div className="space-y-3 border-t-2 border-dashed border-amber-500/40 pt-4">
            <div className="text-amber-700 dark:text-amber-300 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
              <Eye className="size-3" />
              Auditor view (hidden from users)
            </div>

            {annotations.length > 0 ? (
              <div className="border-l-4 border-amber-500 bg-amber-500/5 space-y-2 rounded-r-md p-3">
                <div className="text-amber-700 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  Dark pattern elements
                </div>
                <ul className="space-y-1.5 text-xs">
                  {annotations.map((a, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="bg-amber-500 text-white shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[9px] font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <span className="font-medium">{a.label}</span>
                        <span className="text-muted-foreground">
                          {" "}
                          — {a.description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="border-l-4 border-purple-500 bg-purple-500/5 space-y-2 rounded-r-md p-3">
                <div className="text-purple-700 dark:text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                  Presentation controls
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {onRestart ? (
                    <button
                      onClick={onRestart}
                      className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
                    >
                      <RotateCcw className="size-3" />
                      Restart
                    </button>
                  ) : null}
                  {onSpeedChange ? (
                    <div className="flex items-center gap-0.5 rounded-md border bg-background px-1 py-1 text-xs">
                      <Gauge className="text-muted-foreground mx-0.5 size-3" />
                      {SPEED_OPTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => onSpeedChange(s)}
                          className={cn(
                            "rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold",
                            speed === s
                              ? "bg-purple-500 text-white"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {s}x
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
                    <span className="font-mono font-semibold tabular-nums">
                      {clickCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="size-3" /> Time in view
                    </span>
                    <span className="font-mono font-semibold tabular-nums">
                      {elapsed}s
                    </span>
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
