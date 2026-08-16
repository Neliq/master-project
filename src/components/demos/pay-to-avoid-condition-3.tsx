"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Pay To Avoid — Condition 3: Pain-Point Amplification
 *
 * Thesis: the system dynamically scales the severity of the injected
 * friction — frequency of unskippable ads or duration of artificial
 * delays — the longer the user resists paying, until the payment prompt
 * becomes unavoidable:
 *
 *   d/dt λ_friction(t) > 0 ⟹ P(N_prompt | λ_friction) ≈ 1
 *
 * Variant A (dark): three episodes with escalating pre-rolls (5s → 10s →
 * 15s). After the third, a non-dismissible payment modal appears — the
 * only way out is paying.
 * Variant B (benign): the same three episodes, the same $4.99/mo offer,
 * but every ad stays at 5s (λ constant) and the offer is a dismissible
 * banner. Resisting costs nothing.
 */

const EPISODES = ["Episode 1 — Pilot", "Episode 2 — Sparks", "Episode 3 — Embers"];
const PRICE = "$4.99/mo";

export function PayToAvoidCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [videoIndex, setVideoIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<"idle" | "ad" | "done">("idle");
  const [adLeft, setAdLeft] = React.useState(0);
  const [watchedCount, setWatchedCount] = React.useState(0);
  const [variant, setVariant] = React.useState<"dark" | "benign">("dark");
  const [promptVisible, setPromptVisible] = React.useState(false);
  const [paid, setPaid] = React.useState(false);

  const reset = () => {
    setVideoIndex(0);
    setPhase("idle");
    setAdLeft(0);
    setWatchedCount(0);
    setVariant("dark");
    setPromptVisible(false);
    setPaid(false);
  };

  const adDuration = (idx: number) => (variant === "dark" ? 5 * (idx + 1) : 5);

  React.useEffect(() => {
    if (phase !== "ad") return;
    const id = window.setInterval(() => {
      setAdLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  React.useEffect(() => {
    if (phase !== "ad" || adLeft !== 0) return;
    // Deferred so the state transitions are not synchronous setState calls
    // inside the effect body.
    const t = window.setTimeout(() => {
      const next = watchedCount + 1;
      setWatchedCount(next);
      if (next < EPISODES.length) {
        setVideoIndex(next);
        setPhase("idle");
      } else {
        setPhase("done");
      }
    }, 250);
    return () => window.clearTimeout(t);
  }, [phase, adLeft, watchedCount]);

  // After the third completed video the payment prompt fires — forced in
  // the dark variant, dismissible in the benign one.
  React.useEffect(() => {
    if (watchedCount >= 3) {
      const t = window.setTimeout(() => setPromptVisible(true), 250);
      return () => window.clearTimeout(t);
    }
  }, [watchedCount]);

  const playNext = (v: "dark" | "benign") => {
    setVariant(v);
    setPhase("ad");
    setAdLeft(adDuration(videoIndex));
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">λ_friction (ad length per video)</span>
        <span className={`font-mono font-semibold tabular-nums max-w-[55%] truncate text-right ${variant === "dark" ? "text-rose-500" : "text-emerald-500"}`}>
          {variant === "dark" ? "[5s, 10s, 15s]" : "[5s, 5s, 5s]"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">d/dt λ_friction</span>
        <span className={`font-mono font-semibold tabular-nums ${variant === "dark" ? "text-rose-500" : "text-emerald-500"}`}>
          {variant === "dark" ? "&gt; 0 (escalating)" : "= 0 (constant)"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P(N_prompt | λ)</span>
        <span className={`font-mono font-semibold tabular-nums ${variant === "dark" ? "text-rose-500" : "text-emerald-500"}`}>
          {variant === "dark" ? "≈ 1 (forced)" : "= 0 (dismissible)"}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Current ad</span>
        <span className="font-mono font-semibold tabular-nums">{phase === "ad" ? `${adLeft}s left` : "—"}</span>
      </div>
    </>
  ) : null;

  const renderEpisodeList = (isDark: boolean) => {
    const lam = isDark ? [5, 10, 15] : [5, 5, 5];
    return (
      <div className="space-y-1.5">
        {EPISODES.map((ep, i) => {
          const watched = i < watchedCount;
          const current = i === videoIndex && phase !== "done";
          return (
            <div key={ep} className="flex items-center gap-2 rounded-md border border-border bg-background p-2">
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[8px] font-bold ${
                watched ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
              }`}>
                {watched ? "✓" : i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-medium truncate">{ep}</div>
                <div className={`text-[8px] ${isDark ? "text-rose-500/80" : "text-emerald-600 dark:text-emerald-400"}`}>
                  {watched ? "watched" : `pre-roll: ${lam[i]}s ad`}
                </div>
              </div>
              {!watched && current && phase === "idle" && (
                <button
                  onClick={() => playNext(isDark ? "dark" : "benign")}
                  className={`shrink-0 rounded-md px-2.5 py-1 text-[9px] font-medium transition-colors cursor-pointer ${
                    isDark
                      ? "bg-rose-600 hover:bg-rose-700 text-white"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  }`}
                >
                  ▶ Play
                </button>
              )}
              {!watched && current && phase === "ad" && (
                <span className={`shrink-0 rounded-md px-2 py-1 text-[8px] font-mono tabular-nums ${
                  isDark ? "bg-rose-500/15 text-rose-600 dark:text-rose-300" : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                }`}>
                  ad {adLeft}s
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Pay To Avoid: Pain-Point Amplification"
      caption="Pain-Point Amplification — the longer you resist paying, the longer the ads get, until the payment modal becomes unavoidable."
      auditorStats={stats}
      deltaNote="Both variants show the same 3-episode queue with a pre-roll ad per episode and the same $4.99/mo ad-free offer. Variant A escalates friction the longer you resist (5s → 10s → 15s ads) and ends in a non-dismissible payment modal. Variant B keeps every ad at 5 seconds and renders the offer as a dismissible banner — resisting pays no penalty."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Streamly — binge queue</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Free plan: one 5-second ad before each episode. Ad length never changes.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                {watchedCount}/3 watched
              </div>
            </div>
            <div className="mt-3">{renderEpisodeList(false)}</div>

            {phase === "ad" && variant === "benign" && (
              <div className="mt-3 rounded-md border border-border bg-muted p-2.5">
                <div className="flex items-center justify-between text-[8px] font-mono tabular-nums text-muted-foreground">
                  <span>Ad — sponsor of the day</span>
                  <span className="text-emerald-500">{adLeft}s</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${((adDuration(videoIndex) - adLeft) / adDuration(videoIndex)) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {promptVisible && !paid && (
              <div className="mt-3 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[9px] font-semibold text-emerald-700 dark:text-emerald-300">
                      Go ad-free — {PRICE}
                    </div>
                    <div className="text-[8px] text-muted-foreground mt-0.5">
                      Ads stay at 5s either way. This offer is optional and dismissible.
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    <button
                      onClick={() => setPaid(true)}
                      className="rounded-md bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 text-[9px] font-medium transition-colors cursor-pointer"
                    >
                      Subscribe
                    </button>
                    <button
                      onClick={() => setPromptVisible(false)}
                      className="rounded-md border border-border bg-background hover:bg-muted text-foreground/70 px-2 py-1 text-[9px] font-medium transition-colors cursor-pointer"
                    >
                      Not now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {paid && (
              <div className="mt-3 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Ad-free — subscribed
                </div>
                <p className="text-muted-foreground mt-0.5">
                  λ_friction was constant (5s per episode) the whole time, so nothing escalated to
                  pressure this purchase. The offer was a plain choice, not a ransom.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Streamly — binge queue</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Free plan: one ad before each episode. Ad length grows the longer you stay free.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              {watchedCount}/3 watched
            </div>
          </div>
          <div className="mt-3">{renderEpisodeList(true)}</div>

          {phase === "ad" && variant === "dark" && (
            <div className="mt-3 rounded-md border border-rose-500/30 bg-rose-500/5 p-2.5">
              <div className="flex items-center justify-between text-[8px] font-mono tabular-nums text-muted-foreground">
                <span>Ad — duration escalated to {adDuration(videoIndex)}s</span>
                <span className="text-rose-500">{adLeft}s</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-rose-500 transition-all duration-300"
                  style={{ width: `${((adDuration(videoIndex) - adLeft) / adDuration(videoIndex)) * 100}%` }}
                />
              </div>
              <div className="mt-1 text-[8px] text-rose-500/90">
                λ_friction(t) rising: 5s → 10s → 15s as you resist paying.
              </div>
            </div>
          )}

          {promptVisible && !paid && (
            <div className="mt-3 rounded-md border-2 border-rose-500/50 bg-rose-500/5 p-3">
              <div className="text-[11px] font-bold text-foreground">Remove ads — {PRICE}</div>
              <p className="text-[8px] text-muted-foreground mt-1 leading-relaxed">
                Ads are now 15s and will keep growing with every episode you watch free. This screen
                cannot be dismissed without subscribing.
              </p>
              <button
                onClick={() => setPaid(true)}
                className="mt-2 w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-semibold transition-colors cursor-pointer"
              >
                Subscribe now — {PRICE}
              </button>
              <button
                disabled
                className="mt-1.5 w-full rounded-md bg-muted text-muted-foreground/40 py-1.5 text-[10px] font-medium cursor-not-allowed"
                title="Not available — P(N_prompt | λ) ≈ 1"
              >
                Maybe later (unavailable)
              </button>
              <div className="mt-1.5 text-[8px] text-rose-500/90 text-center">
                P(N_prompt | λ_friction) ≈ 1 — the prompt is absolute.
              </div>
            </div>
          )}

          {paid && (
            <div className="mt-3 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                  Subscribed — friction removed
              </div>
              <p className="text-muted-foreground mt-0.5">
                The ads escalated (d/dt λ_friction &gt; 0) precisely because you would not pay, and the
                final modal had no exit. The subscription bought relief from friction the platform
                invented — the pain-point was amplified until capitulation was the only move.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
