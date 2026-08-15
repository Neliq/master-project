"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Article card pool — each refresh shows a 2×2 grid of random articles
 * with varying engagement value. Demonstrates Unpredictable Payload Variance.
 */
interface Article {
  category: string;
  categoryColor: string;
  title: string;
  preview: string;
  readTime: string;
  imageLabel: string;
  imageColor: string;
  value: number; // 0–1 engagement value
}

const ARTICLES: Article[] = [
  {
    category: "Tech",
    categoryColor: "text-blue-500",
    title: "AI Startup Raises $2B in Record Round",
    preview: "The company claims its new model outperforms all existing systems on reasoning benchmarks, sparking both excitement and regulatory concern.",
    readTime: "4 min read",
    imageLabel: "AI",
    imageColor: "from-blue-600 to-purple-600",
    value: 0.95,
  },
  {
    category: "Science",
    categoryColor: "text-emerald-500",
    title: "New Study Reveals Memory Reconsolidation Mechanism",
    preview: "Researchers have identified a molecular pathway that could explain how memories are updated during sleep — with implications for PTSD treatment.",
    readTime: "6 min read",
    imageLabel: "🧬",
    imageColor: "from-emerald-600 to-teal-600",
    value: 0.9,
  },
  {
    category: "World",
    categoryColor: "text-amber-500",
    title: "Global Climate Summit Reaches Historic Agreement",
    preview: "Nations have committed to a binding emissions target for the first time, though critics say enforcement mechanisms remain weak.",
    readTime: "5 min read",
    imageLabel: "🌍",
    imageColor: "from-amber-600 to-orange-600",
    value: 0.85,
  },
  {
    category: "Business",
    categoryColor: "text-violet-500",
    title: "The Rise of the Four-Day Work Week",
    preview: "A growing number of major corporations are reporting increased productivity after switching to a compressed schedule. Is this the future of work?",
    readTime: "7 min read",
    imageLabel: "📊",
    imageColor: "from-violet-600 to-indigo-600",
    value: 0.8,
  },
  {
    category: "Health",
    categoryColor: "text-rose-500",
    title: "Breakthrough mRNA Treatment Shows Promise for Autoimmune Disorders",
    preview: "Early clinical trials indicate the technology behind COVID vaccines could be repurposed to treat conditions like lupus and multiple sclerosis.",
    readTime: "5 min read",
    imageLabel: "💉",
    imageColor: "from-rose-600 to-pink-600",
    value: 0.75,
  },
  {
    category: "Culture",
    categoryColor: "text-pink-500",
    title: "Why Gen Z Is Reviving Retro Tech",
    preview: "From flip phones to film cameras, younger generations are embracing analog technology — and companies are taking notes.",
    readTime: "3 min read",
    imageLabel: "📷",
    imageColor: "from-pink-600 to-rose-600",
    value: 0.7,
  },
  {
    category: "Sports",
    categoryColor: "text-green-500",
    title: "Underdog Team Clinches Championship in Overtime Thriller",
    preview: "In one of the biggest upsets in recent history, the wild-card team completed a stunning comeback in the final seconds of overtime.",
    readTime: "4 min read",
    imageLabel: "🏆",
    imageColor: "from-green-600 to-emerald-600",
    value: 0.65,
  },
  {
    category: "Tech",
    categoryColor: "text-blue-500",
    title: "Review: The Best Wireless Earbuds of 2026",
    preview: "We tested 25 pairs of earbuds across every price range. Here are the ones that actually deliver on battery life and sound quality.",
    readTime: "8 min read",
    imageLabel: "🎧",
    imageColor: "from-blue-600 to-cyan-600",
    value: 0.6,
  },
  {
    category: "Lifestyle",
    categoryColor: "text-orange-500",
    title: "10 Minimalist Habits That Changed My Life",
    preview: "One writer's journey to decluttering everything — and finding that less really is more when it comes to possessions, commitments, and screen time.",
    readTime: "6 min read",
    imageLabel: "🧘",
    imageColor: "from-orange-600 to-amber-600",
    value: 0.55,
  },
  {
    category: "Sponsored",
    categoryColor: "text-yellow-500",
    title: "This One Trick Could Save You Thousands",
    preview: "Sponsored — Financial advisors hate this simple method for reducing monthly expenses. Click to learn the secret that banks don't want you to know.",
    readTime: "2 min read",
    imageLabel: "💰",
    imageColor: "from-yellow-600 to-orange-600",
    value: 0.2,
  },
  {
    category: "Sponsored",
    categoryColor: "text-yellow-500",
    title: "You Won't Believe What This Celebrity Looks Like Now",
    preview: "Sponsored — Fans are shocked by the transformation. See the photos that are breaking the internet (you won't recognize them!).",
    readTime: "1 min read",
    imageLabel: "📸",
    imageColor: "from-yellow-600 to-amber-600",
    value: 0.15,
  },
  {
    category: "Advertorial",
    categoryColor: "text-gray-400",
    title: "FDA-Approved Supplement Melts Belly Fat While You Sleep?",
    preview: "Sponsored — Doctors are calling it a miracle. Order now before supplies run out (limited stock available).",
    readTime: "1 min read",
    imageLabel: "💊",
    imageColor: "from-gray-600 to-slate-600",
    value: 0.05,
  },
  {
    category: "",
    categoryColor: "text-muted-foreground",
    title: "No new articles",
    preview: "Your feed is up to date. Check back later for more stories.",
    readTime: "",
    imageLabel: "📭",
    imageColor: "from-gray-500 to-gray-600",
    value: 0,
  },
];

/** Pick 4 random articles (allows repeats so every refresh always has 4). */
function pickRandomArticles(): Article[] {
  return Array.from({ length: 4 }, () =>
    ARTICLES[Math.floor(Math.random() * ARTICLES.length)]
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden shadow-sm">
      {/* Article image placeholder */}
      <div
        className={`h-16 bg-gradient-to-br ${article.imageColor} flex items-center justify-center`}
      >
        <span className="text-xl opacity-80">{article.imageLabel}</span>
      </div>

      {/* Article body */}
      <div className="p-2.5 space-y-1">
        <div className="flex items-center gap-2">
          {article.category && (
            <span className={`text-[8px] font-semibold uppercase tracking-wider ${article.categoryColor}`}>
              {article.category}
            </span>
          )}
          {article.readTime && (
            <span className="text-[8px] text-muted-foreground">{article.readTime}</span>
          )}
        </div>
        <h3 className="text-[11px] font-semibold leading-snug line-clamp-2">{article.title}</h3>
        <p className="text-[9px] text-muted-foreground leading-relaxed line-clamp-2">{article.preview}</p>
      </div>
    </div>
  );
}

export function PullToRefreshCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [articles, setArticles] = React.useState<Article[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [history, setHistory] = React.useState<{ batchAvg: number; titles: string[] }[]>([]);
  const [progress, setProgress] = React.useState(0);
  const rafRef = React.useRef<number | null>(null);

  const refresh = () => {
    setIsLoading(true);
    setArticles(null);
    setProgress(0);

    const startTime = performance.now();
    const DURATION = 1200;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
        const items = pickRandomArticles();
        setArticles(items);
        const avg = items.reduce((s, a) => s + a.value, 0) / items.length;
        setHistory((h) => [{ batchAvg: avg, titles: items.map((a) => a.title) }, ...h].slice(0, 20));
        setIsLoading(false);
        setProgress(1);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const reset = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setArticles(null);
    setIsLoading(false);
    setHistory([]);
    setProgress(0);
  };

  React.useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Auditor stats
  const pulls = history.length;
  const overallAvg = pulls > 0
    ? (history.reduce((s, h) => s + h.batchAvg, 0) / pulls * 100).toFixed(1)
    : "—";
  const variance = pulls > 1
    ? (() => {
        const mean = history.reduce((s, h) => s + h.batchAvg, 0) / pulls;
        const sqDiffs = history.map((h) => Math.pow(h.batchAvg - mean, 2));
        const v = sqDiffs.reduce((s, d) => s + d, 0) / pulls;
        return v.toFixed(3);
      })()
    : "—";

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Total pulls</span>
        <span className="font-mono font-semibold tabular-nums">{pulls}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Avg batch value</span>
        <span className="font-mono font-semibold tabular-nums">{overallAvg}%</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Batch variance</span>
        <span className="font-mono font-semibold tabular-nums">{variance}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pull To Refresh (Variable-Reward Trap): Unpredictable Payload Variance"
      caption="Unpredictable Payload Variance — each pull serves a 2×2 grid of random articles with varying engagement value. The slot-machine effect keeps you pulling, hoping the next batch is better." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">
          <div className="mb-2 font-medium">Unpredictable Payload Variance</div>

          {/* Idle state */}
          {!isLoading && !articles && (
            <div className="text-center">
              <p className="text-muted-foreground text-[10px] mb-3 leading-relaxed">
                Each pull serves a random grid of 4 articles — sometimes high-quality stories,
                sometimes clickbait or ads. The unpredictability trains you to
                keep refreshing, chasing the next dopamine hit.
              </p>
              <button
                onClick={refresh}
                className="bg-foreground text-background hover:opacity-90 w-full rounded-md py-2 text-xs font-medium transition-opacity"
              >
                Pull to refresh
              </button>
            </div>
          )}

          {/* Loading state */}
          {isLoading && (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-foreground/10" />
                  <circle
                    cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    className="text-violet-500"
                    strokeDasharray={`${2 * Math.PI * 15.5}`}
                    strokeDashoffset={`${2 * Math.PI * 15.5 * (1 - progress)}`}
                    style={{ transition: "none" }}
                  />
                </svg>
              </div>
              <div className="w-full h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress * 100}%`,
                    background: "linear-gradient(90deg, rgb(168,85,247), rgb(59,130,246))",
                    transition: "none",
                  }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground font-mono tabular-nums">
                Fetching your feed...
              </span>
            </div>
          )}

          {/* Article grid */}
          {articles && !isLoading && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {articles.map((article, i) => (
                  <ArticleCard key={i} article={article} />
                ))}
              </div>

              <button
                onClick={refresh}
                className="bg-foreground text-background hover:opacity-90 w-full rounded-md py-1.5 text-[10px] font-medium transition-opacity"
              >
                Pull to refresh again
              </button>

              {/* Pull history dots */}
              {history.length > 1 && (
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] text-muted-foreground uppercase tracking-wider">History</span>
                    <div className="flex flex-wrap gap-1">
                      {history.slice(0, 15).map((h, i) => (
                        <span
                          key={i}
                          className={`inline-block w-2 h-2 rounded-full ${
                            h.batchAvg >= 0.6
                              ? "bg-emerald-500"
                              : h.batchAvg >= 0.3
                                ? "bg-amber-500"
                                : "bg-rose-500"
                          }`}
                          title={`Batch #${i + 1}: avg ${Math.round(h.batchAvg * 100)}% (${h.titles.join(", ")})`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
