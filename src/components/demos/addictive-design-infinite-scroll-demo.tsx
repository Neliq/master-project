"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Condition demo: Infinite Frictionless Continuation
 *
 * Simulates an infinite feed where new content is always appended
 * just before the user reaches the bottom — they can never stop.
 */

const INITIAL_POSTS = [
  { id: 1, author: "trending_daily", text: "You won't believe what happened next!", likes: 2341 },
  { id: 2, author: "viral_clips", text: "This changes everything about coffee.", likes: 891 },
  { id: 3, author: "news_flash", text: "Breaking: Scientists discover new species", likes: 4512 },
  { id: 4, author: "meme_factory", text: "POV: You're still scrolling at 3am", likes: 7823 },
  { id: 5, author: "life_hacks", text: "10 secrets they don't want you to know", likes: 1245 },
];

function makePost(id: number) {
  const authors = ["discover_feed", "trending_now", "viral_hub", "daily_dose", "top_picks"];
  const texts = [
    "This one trick will change your life forever...",
    "Wait for the ending — you'll be shocked!",
    "Only 0.1% of people can solve this puzzle",
    "Doctors hate this simple morning routine",
    "The truth about your favourite brand revealed",
    "You've been doing this wrong your entire life",
    "New study says everything you know is wrong",
    "This video has 10M views for a reason",
    "The internet is losing its mind over this",
    "Reply to @user: Here's what actually happened",
  ];
  return {
    id,
    author: authors[id % authors.length],
    text: texts[id % texts.length],
    likes: Math.floor(Math.random() * 9000) + 100,
  };
}

export function InfiniteScrollDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  const [posts, setPosts] = React.useState(INITIAL_POSTS);
  const [nextId, setNextId] = React.useState(6);
  const [loadCount, setLoadCount] = React.useState(0);
  const feedRef = React.useRef<HTMLDivElement>(null);

  const isAuditor = mode === "auditor";

  // Simulate infinite scroll — always load more before user reaches bottom
  const loadMore = React.useCallback(() => {
    const newPosts = Array.from({ length: 3 }, (_, i) => makePost(nextId + i));
    setPosts((prev) => [...prev, ...newPosts]);
    setNextId((prev) => prev + 3);
    setLoadCount((c) => c + 1);
  }, [nextId]);

  // Auto-load when scrolled near bottom
  React.useEffect(() => {
    const el = feedRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  const reset = () => {
    setPosts(INITIAL_POSTS);
    setNextId(6);
    setLoadCount(0);
  };

  const auditorControls = isAuditor ? (
    <button
      onClick={loadMore}
      className="bg-purple-500 text-white hover:bg-purple-600 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
    >
      Force load more
    </button>
  ) : null;

  const auditorStats = isAuditor ? (
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">Posts loaded</span>
      <span className="font-mono font-semibold tabular-nums">{posts.length} ({loadCount} auto-loads)</span>
    </div>
  ) : null;

  return (
    <DemoShell
      mode={mode}
      annotations={annotations}
      onRestart={onRestart ?? reset}
      auditorControls={auditorControls}
      auditorStats={auditorStats}
      title="Infinite Frictionless Continuation"
      caption="A feed that never ends — new content appears just before you reach the bottom. There is no 'end of content' signal, so you can scroll forever."
    >
      <div
        ref={feedRef}
        className="h-64 overflow-y-auto space-y-2 rounded-md border bg-foreground/5 p-2"
      >
        {posts.map((post) => (
          <div key={post.id} className="rounded-md bg-background border p-3 text-xs">
            <div className="flex items-center gap-2 mb-1">
              <div className="size-6 rounded-full bg-foreground/10" />
              <span className="font-medium text-[10px]">@{post.author}</span>
            </div>
            <p className="text-[11px] leading-relaxed">{post.text}</p>
            <div className="text-muted-foreground mt-1 text-[9px]">
              ♥ {post.likes.toLocaleString()}
            </div>
          </div>
        ))}
        <div className="text-muted-foreground py-2 text-center text-[10px]">
          Loading more...
        </div>
      </div>
    </DemoShell>
  );
}
