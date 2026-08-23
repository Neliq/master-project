"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

/*
 * Infinite Scrolling — Condition 2: The Unreachable Footer
 *
 * Thesis: the system continuously mutates the DOM to push the semantic <footer>
 * node N_footer further down the Y-axis at a rate equal to or faster than the
 * user's scroll velocity v_scroll, so the terminal node can never be reached:
 *
 *   v_scroll > 0  ⟹  d/dt Pos_y(N_footer, t) ≥ v_scroll
 *   lim_{t→∞} d(Y_viewport, Pos_y(N_footer)) > 0
 *
 * Variant A (dark): every time the user scrolls toward the bottom, another
 * section is appended above the footer, so the footer recedes at least as fast
 * as the user scrolls — utility links stay physically unreachable.
 * Variant B (benign): the identical page and identical sections, but the
 * content is finite — the footer stays put and can actually be reached.
 */

const SECTIONS = [
  "Field notes from the alpine meadow survey",
  "A quiet look at the city's night-shift bakers",
  "Interview: the librarian who memorized 40,000 spines",
  "Why the old harbor wall leans the way it does",
  "The week in slow radio, reviewed",
  "Letters from readers, vol. 14",
];

const FOOTER_LINKS = ["Privacy Policy", "Terms of Use", "Contact", "Imprint"];

export function InfiniteScrollingCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Section counts are per-panel: A keeps appending (footer recedes),
  // B is finite (footer reachable). The payload texts are identical.
  const [countA, setCountA] = React.useState(4);
  const [countB, setCountB] = React.useState(4);
  const [gapA, setGapA] = React.useState(0);
  const [gapB, setGapB] = React.useState(0);
  const [autoAppends, setAutoAppends] = React.useState(0);
  const [footerLink, setFooterLink] = React.useState<string | null>(null);

  const appendingRef = React.useRef(false);
  const containerARef = React.useRef<HTMLDivElement>(null);
  const containerBRef = React.useRef<HTMLDivElement>(null);
  const timersRef = React.useRef<number[]>([]);

  React.useEffect(
    () => () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    },
    []
  );

  const jumpToBottom = (el: HTMLDivElement | null) => {
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  // Variant A: nearing the bottom mutates the DOM — a new section lands above
  // the footer, pushing it down at least as fast as the user scrolls.
  const handleScrollA = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const gap = el.scrollHeight - el.scrollTop - el.clientHeight;
    setGapA(gap);
    if (gap <= 400 && !appendingRef.current) {
      appendingRef.current = true;
      timersRef.current.push(
        window.setTimeout(() => {
          setCountA((n) => n + 1);
          setAutoAppends((n) => n + 1);
          appendingRef.current = false;
        }, 350)
      );
    }
  };

  const handleScrollB = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    setGapB(el.scrollHeight - el.scrollTop - el.clientHeight);
  };

  const reset = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    appendingRef.current = false;
    setCountA(4);
    setCountB(4);
    setGapA(0);
    setGapB(0);
    setAutoAppends(0);
    setFooterLink(null);
    if (containerARef.current) containerARef.current.scrollTop = 0;
    if (containerBRef.current) containerBRef.current.scrollTop = 0;
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">v_scroll (user scroll velocity)</span>
        <span className="font-mono font-semibold tabular-nums">≈ 240 px/s</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">d/dt Pos_y(N_footer, t)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">≥ v_scroll (A) / 0 (B)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">d(viewport, footer) — live (A)</span>
        <span className="font-mono font-semibold tabular-nums">{gapA}px</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">lim_{`{t→∞}`} d &gt; 0</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">True (A) / False (B)</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Infinite Scrolling: The Unreachable Footer"
      caption="The Unreachable Footer — the terminal <footer> node with its privacy and contact links is pushed down the Y-axis at least as fast as the user scrolls, so it can never be reached."
      auditorStats={stats}
      deltaNote="Variant A appends a new section above the footer every time the viewport approaches it, so the footer recedes at ≥ the user's scroll velocity and stays out of reach. Variant B renders the identical sections as a finite list — the footer stays static and the utility links are actually clickable."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Field Notes — a slow magazine</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Scroll to the end: the footer with the legal links is waiting right after the last
                  section.
                </p>
              </div>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                {countB} sections
              </span>
            </div>

            <div
              ref={containerBRef}
              onScroll={handleScrollB}
              className="mt-2 h-56 space-y-1.5 overflow-y-auto rounded-md border bg-background p-2"
            >
              {Array.from({ length: countB }, (_, i) => (
                <div key={i} className="rounded border border-border bg-card px-2 py-1.5 text-[9px] leading-snug text-foreground/80">
                  {SECTIONS[i % SECTIONS.length]}
                </div>
              ))}
              <footer className="rounded-md border border-green-500/30 bg-green-500/5 px-2 py-2">
                <div className="text-[9px] font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  Footer — reachable
                </div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {FOOTER_LINKS.map((l) => (
                    <button
                      key={l}
                      onClick={() => setFooterLink(l)}
                      className="rounded border border-green-500/30 bg-background px-1.5 py-0.5 text-[9px] text-foreground/80 hover:text-green-600 dark:hover:text-green-300 transition-colors cursor-pointer"
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </footer>
            </div>

            <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
              <span>Distance to footer: {gapB}px</span>
              <button
                onClick={() => jumpToBottom(containerBRef.current)}
                className="rounded border border-border px-2 py-0.5 font-medium hover:text-foreground transition-colors cursor-pointer"
              >
                Scroll to bottom ▼
              </button>
            </div>

            {footerLink && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <CheckCircle2 className="size-3" />
                  Terminal node reached
                </div>
                <p className="text-muted-foreground mt-0.5">
                  You clicked “{footerLink}” — the footer was physically reachable. In this variant the
                  DOM is never mutated while you scroll, so
                  <span className="font-mono text-foreground"> d/dt Pos_y(N_footer, t) = 0</span> and the
                  limit distance collapses to zero.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Field Notes — a slow magazine</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Try to reach the footer at the bottom. The more you scroll, the further it moves.
              </p>
            </div>
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              {countA} sections
            </span>
          </div>

          <div
            ref={containerARef}
            onScroll={handleScrollA}
            className="mt-2 h-56 space-y-1.5 overflow-y-auto rounded-md border bg-background p-2"
          >
            {Array.from({ length: countA }, (_, i) => (
              <div key={i} className="rounded border border-border bg-card px-2 py-1.5 text-[9px] leading-snug text-foreground/80">
                {SECTIONS[i % SECTIONS.length]}
              </div>
            ))}
            <footer className="rounded-md border border-red-500/30 bg-red-500/5 px-2 py-2">
              <div className="text-[9px] font-semibold text-red-600 dark:text-red-300 uppercase tracking-tight">
                Footer — keeps moving…
              </div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {FOOTER_LINKS.map((l) => (
                  <span key={l} className="rounded border border-border bg-background px-1.5 py-0.5 text-[9px] text-muted-foreground">
                    {l}
                  </span>
                ))}
              </div>
            </footer>
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            {gapA <= 400 ? (
              <span className="inline-flex items-center gap-1 rounded border border-yellow-500/40 bg-yellow-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-yellow-700 dark:text-yellow-300">
                <AlertTriangle className="size-2.5" />
                approaching footer — DOM mutated, footer pushed down…
              </span>
            ) : (
              <span className="text-[9px] text-muted-foreground">Distance to footer: {gapA}px</span>
            )}
            <button
              onClick={() => jumpToBottom(containerARef.current)}
              className="rounded border border-border px-2 py-0.5 text-[9px] font-medium hover:text-foreground transition-colors cursor-pointer"
            >
              Scroll to bottom ▼
            </button>
          </div>

          {autoAppends >= 4 && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <AlertTriangle className="size-3" />
                More stories loading
              </div>
              <p className="text-muted-foreground">
                Each scroll toward the bottom mutated the DOM: a new section landed above the footer,
                satisfying <span className="font-mono text-foreground">v_scroll &gt; 0 ⟹ d/dt Pos_y(N_footer, t) ≥ v_scroll</span>.
                After {autoAppends} append cycles the footer still sits further than one screen away:
                <span className="font-mono text-foreground"> lim_{`{t→∞}`} d &gt; 0</span>.
              </p>
              <p className="text-muted-foreground">
                The privacy, contact, and legal links are physically unreachable through normal
                scrolling — terminal navigational elements are perpetually displaced.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
