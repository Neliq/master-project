"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Condition demo: Eradication of Natural Stopping Cues
 *
 * Simulates an interface that deliberately removes all signals
 * that tell the user they've reached the end — no pagination,
 * no "end of results", no progress indicator, no time display.
 */

const ITEMS = [
  { id: 1, title: "Getting started with productivity", category: "Guide", readTime: "5 min" },
  { id: 2, title: "10 habits of successful people", category: "Lifestyle", readTime: "8 min" },
  { id: 3, title: "The future of AI technology", category: "Tech", readTime: "12 min" },
  { id: 4, title: "How to build better habits", category: "Self-help", readTime: "6 min" },
  { id: 5, title: "Understanding machine learning", category: "Education", readTime: "15 min" },
  { id: 6, title: "The art of mindful living", category: "Wellness", readTime: "4 min" },
  { id: 7, title: "Cryptocurrency explained simply", category: "Finance", readTime: "10 min" },
  { id: 8, title: "Travel secrets nobody tells you", category: "Travel", readTime: "7 min" },
  { id: 9, title: "Cooking for beginners", category: "Food", readTime: "9 min" },
  { id: 10, title: "The psychology of colour", category: "Design", readTime: "11 min" },
];

export function HiddenStoppingCuesDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  const [items, setItems] = React.useState(ITEMS.slice(0, 5));
  const [showEndMarker, setShowEndMarker] = React.useState(false);
  const [showPagination, setShowPagination] = React.useState(true);
  const [showProgress, setShowProgress] = React.useState(true);
  const [showTimeEstimate, setShowTimeEstimate] = React.useState(true);
  const [sessionTime, setSessionTime] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const isAuditor = mode === "auditor";

  // Session timer
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load more when scrolling
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      // Always load more — never show end
      setItems((prev) => {
        const nextBatch = ITEMS.map((item, i) => ({
          ...item,
          id: prev.length + i + 1,
          title: `${item.title} (continued)`,
        }));
        return [...prev, ...nextBatch];
      });
    }
  };

  const reset = () => {
    setItems(ITEMS.slice(0, 5));
    setShowEndMarker(false);
    setShowPagination(true);
    setShowProgress(true);
    setShowTimeEstimate(true);
    setSessionTime(0);
  };

  const auditorControls = (
    <>
      <button
        onClick={() => setShowEndMarker((v) => !v)}
        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${
          showEndMarker
            ? "bg-green-500 text-white"
            : "bg-purple-500 text-white hover:bg-purple-600"
        }`}
      >
        {showEndMarker ? "✓ End marker" : "× End marker"}
      </button>
      <button
        onClick={() => setShowPagination((v) => !v)}
        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${
          showPagination
            ? "bg-green-500 text-white"
            : "bg-purple-500 text-white hover:bg-purple-600"
        }`}
      >
        {showPagination ? "✓ Pagination" : "× Pagination"}
      </button>
      <button
        onClick={() => setShowProgress((v) => !v)}
        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${
          showProgress
            ? "bg-green-500 text-white"
            : "bg-purple-500 text-white hover:bg-purple-600"
        }`}
      >
        {showProgress ? "✓ Progress bar" : "× Progress bar"}
      </button>
      <button
        onClick={() => setShowTimeEstimate((v) => !v)}
        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${
          showTimeEstimate
            ? "bg-green-500 text-white"
            : "bg-purple-500 text-white hover:bg-purple-600"
        }`}
      >
        {showTimeEstimate ? "✓ Time estimate" : "× Time estimate"}
      </button>
    </>
  );

  const auditorStats = (
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">Session time</span>
      <span className="font-mono font-semibold tabular-nums">{sessionTime}s</span>
    </div>
  );

  return (
    <DemoShell
      mode={mode}
      annotations={annotations}
      onRestart={onRestart ?? reset}
      auditorControls={isAuditor ? auditorControls : undefined}
      auditorStats={isAuditor ? auditorStats : undefined}
      title="Eradication of Natural Stopping Cues"
      caption="An interface that hides all signals telling you to stop — no end-of-content marker, no pagination, no progress bar, no time estimate. You can scroll forever without knowing when to quit."
    >
      <div className="space-y-2">
        {/* Hidden progress bar — auditor can toggle */}
        {showProgress && (
          <div className="h-1 rounded-full bg-foreground/10 overflow-hidden">
            <div
              className="h-full bg-foreground/30 transition-all duration-500"
              style={{ width: `${Math.min((items.length / 50) * 100, 100)}%` }}
            />
          </div>
        )}

        {/* Hidden time estimate — auditor can toggle */}
        {showTimeEstimate && (
          <div className="text-muted-foreground text-[9px] text-right">
            {Math.ceil(items.length * 0.5)} min remaining
          </div>
        )}

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-52 overflow-y-auto space-y-1 rounded-md border bg-foreground/5 p-2"
        >
          {items.map((item) => (
            <div key={item.id} className="rounded-md bg-background border p-2 text-[10px]">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-foreground/10" />
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-muted-foreground text-[9px]">
                    {item.category} · {item.readTime}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hidden end marker — auditor can toggle */}
        {showEndMarker && (
          <div className="text-muted-foreground py-2 text-center text-[10px] border-t border-dashed">
            — End of results —
          </div>
        )}

        {/* Hidden pagination — auditor can toggle */}
        {showPagination && (
          <div className="flex items-center justify-center gap-2 text-[10px]">
            <button className="rounded border px-2 py-1 bg-foreground text-background">1</button>
            <button className="rounded border px-2 py-1 hover:bg-foreground/5">2</button>
            <button className="rounded border px-2 py-1 hover:bg-foreground/5">3</button>
            <span className="text-muted-foreground">...</span>
            <button className="rounded border px-2 py-1 hover:bg-foreground/5">10</button>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
