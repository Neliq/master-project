"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Pool of content snippets that get randomly injected as the user scrolls.
 * Demonstrates Autonomous Content Injection — content loads without user
 * consent or stopping cue.
 */
const CONTENT_POOL = [
  { emoji: "📢", title: "Trending post", body: "This article is blowing up in your network right now." },
  { emoji: "💬", title: "New reply", body: "Someone responded to your comment on the photography thread." },
  { emoji: "❤️", title: "Like surge", body: "Your photo from last weekend just hit 200 likes." },
  { emoji: "📰", title: "Breaking story", body: "Major policy shift announced — read the full analysis." },
  { emoji: "🎬", title: "Recommended video", body: "You might enjoy this documentary on deep-sea exploration." },
  { emoji: "🛒", title: "Sponsored product", body: "The gadget everyone is talking about — limited offer." },
  { emoji: "📅", title: "Event reminder", body: "The live stream you registered for starts in 30 minutes." },
  { emoji: "🔔", title: "System notification", body: "Your weekly digest is ready. 47 new stories to catch up on." },
  { emoji: "🧵", title: "Trending thread", body: "A fascinating discussion is unfolding in the design community." },
  { emoji: "🎉", title: "Milestone", body: "You've reached 1,000 total interactions this month!" },
  { emoji: "📊", title: "Weekly recap", body: "Here's what you missed while you were away." },
  { emoji: "🏷️", title: "Mention alert", body: "A friend tagged you in a post about weekend plans." },
  { emoji: "🎮", title: "Gaming news", body: "Your most-played game just dropped a massive update." },
  { emoji: "📸", title: "Photo suggestion", body: "Relive your memories from this day last year." },
  { emoji: "🎵", title: "New release", body: "Your favourite artist just dropped a surprise single." },
  { emoji: "📈", title: "Market update", body: "Tech stocks are rallying — here's what changed." },
  { emoji: "☕", title: "Sponsored", body: "This coffee subscription wants you to try their first shipment free." },
  { emoji: "✈️", title: "Travel deal", body: "Flash sale: flights to Tokyo from $399 — book before midnight." },
  { emoji: "💡", title: "Tip of the day", body: "Did you know you can batch-edit photos in the new update?" },
  { emoji: "🔁", title: "Repost", body: "A creator you follow shared something from a new account." },
];

const TITLES = [
  "📢 Trending post", "💬 New reply", "❤️ Like surge",
  "📰 Breaking story", "🎬 Recommended video", "🛒 Sponsored product",
  "📅 Event reminder", "🔔 System notification", "🧵 Trending thread",
  "🎉 Milestone", "📊 Weekly recap", "🏷️ Mention alert",
  "🎮 Gaming news", "📸 Photo suggestion", "🎵 New release",
  "📈 Market update", "☕ Sponsored", "✈️ Travel deal",
  "💡 Tip of the day", "🔁 Repost",
];

function generateRow(id: number) {
  // Deterministic-ish pick so SSR and client match
  const item = CONTENT_POOL[id % CONTENT_POOL.length];
  return { id, ...item };
}

export function InfiniteScrollingCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [rows, setRows] = React.useState(() =>
    Array.from({ length: 8 }, (_, i) => generateRow(i))
  );
  const [loading, setLoading] = React.useState(false);
  const [loadCount, setLoadCount] = React.useState(0);
  const [autoScrollCount, setAutoScrollCount] = React.useState(0);
  const nextIdRef = React.useRef(8);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const loadMore = React.useCallback(() => {
    if (loading) return;
    setLoading(true);
    setLoadCount((c) => c + 1);

    // Fast preload — 300ms so it finishes before the user can scroll down
    setTimeout(() => {
      setRows((prev) => {
        const BATCH = 12;
        const newRows = Array.from({ length: BATCH }, (_, i) =>
          generateRow(nextIdRef.current + i)
        );
        nextIdRef.current += BATCH;
        return [...prev, ...newRows];
      });
      setLoading(false);
    }, 300);
  }, [loading]);

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      if (el.scrollTop + el.clientHeight > el.scrollHeight - 400) {
        setAutoScrollCount((c) => c + 1);
        loadMore();
      }
    },
    [loadMore]
  );

  const reset = () => {
    setRows(Array.from({ length: 8 }, (_, i) => generateRow(i)));
    setLoading(false);
    setLoadCount(0);
    setAutoScrollCount(0);
    nextIdRef.current = 8;
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  // Preload immediately on mount so there's already a buffer
  React.useEffect(() => { loadMore(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Total rows loaded</span>
        <span className="font-mono font-semibold tabular-nums">{rows.length}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Auto-loads triggered</span>
        <span className="font-mono font-semibold tabular-nums">{autoScrollCount}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Has visible end marker</span>
        <span className="font-mono font-semibold tabular-nums">No</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Infinite Scrolling: Autonomous Content Injection"
      caption="Autonomous Content Injection — content loads automatically as you scroll, without consent or a stopping cue. The feed never ends." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-2 font-medium">Autonomous Content Injection</div>

          {/* Scrollable feed */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="bg-muted/40 h-52 space-y-1 overflow-y-auto rounded-md border p-1.5"
          >
            {rows.map((row) => (
              <div
                key={row.id}
                className="rounded bg-foreground/8 px-2.5 py-2 text-[10px] hover:bg-foreground/15 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xs leading-none">{row.emoji}</span>
                  <span className="font-medium">{row.title}</span>
                </div>
                <p className="text-muted-foreground ml-5 mt-0.5 leading-relaxed">{row.body}</p>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex items-center justify-center gap-2 py-2 text-[10px] text-muted-foreground">
                <span className="inline-block w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                Loading more content...
              </div>
            )}

            {/* No end marker — never shown */}
          </div>

          <p className="text-[8px] text-muted-foreground text-center mt-2">
            Scroll to the bottom — more content loads automatically.
            There is no end.
          </p>
        </div>
      </div>
    </DemoShell>
  );
}
