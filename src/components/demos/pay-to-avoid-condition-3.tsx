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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [videoIndexA, setVideoIndexA] = React.useState(0);
  const [videoIndexB, setVideoIndexB] = React.useState(0);
  const [phaseA, setPhaseA] = React.useState<"idle" | "ad" | "done">("idle");
  const [phaseB, setPhaseB] = React.useState<"idle" | "ad" | "done">("idle");
  const [adLeftA, setAdLeftA] = React.useState(0);
  const [adLeftB, setAdLeftB] = React.useState(0);
  const [watchedCountA, setWatchedCountA] = React.useState(0);
  const [watchedCountB, setWatchedCountB] = React.useState(0);
  const [variantA, setVariantA] = React.useState<"dark" | "benign">("dark");
  const [variantB, setVariantB] = React.useState<"dark" | "benign">("benign");
  const [promptVisibleA, setPromptVisibleA] = React.useState(false);
  const [promptVisibleB, setPromptVisibleB] = React.useState(false);
  const [paidA, setPaidA] = React.useState(false);
  const [paidB, setPaidB] = React.useState(false);


  const adDuration = (idx: number, v: "dark" | "benign") => (v === "dark" ? 5 * (idx + 1) : 5);

  React.useEffect(() => {
    if (phaseA !== "ad") return;
    const id = window.setInterval(() => {
      setAdLeftA((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [phaseA]);

  React.useEffect(() => {
    if (phaseB !== "ad") return;
    const id = window.setInterval(() => {
      setAdLeftB((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [phaseB]);

  React.useEffect(() => {
    if (phaseA !== "ad" || adLeftA !== 0) return;
    // Deferred so the state transitions are not synchronous setState calls
    // inside the effect body.
    const t = window.setTimeout(() => {
      const next = watchedCountA + 1;
      setWatchedCountA(next);
      if (next < EPISODES.length) {
        setVideoIndexA(next);
        setPhaseA("idle");
      } else {
        setPhaseA("done");
      }
    }, 250);
    return () => window.clearTimeout(t);
  }, [phaseA, adLeftA, watchedCountA]);

  React.useEffect(() => {
    if (phaseB !== "ad" || adLeftB !== 0) return;
    const t = window.setTimeout(() => {
      const next = watchedCountB + 1;
      setWatchedCountB(next);
      if (next < EPISODES.length) {
        setVideoIndexB(next);
        setPhaseB("idle");
      } else {
        setPhaseB("done");
      }
    }, 250);
    return () => window.clearTimeout(t);
  }, [phaseB, adLeftB, watchedCountB]);

  // After the third completed video the payment prompt fires — forced in
  // the dark variant, dismissible in the benign one.
  React.useEffect(() => {
    if (watchedCountA >= 3) {
      const t = window.setTimeout(() => setPromptVisibleA(true), 250);
      return () => window.clearTimeout(t);
    }
  }, [watchedCountA]);

  React.useEffect(() => {
    if (watchedCountB >= 3) {
      const t = window.setTimeout(() => setPromptVisibleB(true), 250);
      return () => window.clearTimeout(t);
    }
  }, [watchedCountB]);

  const playNext = (v: "dark" | "benign", side: "A" | "B") => {
    if (side === "A") {
      setVariantA(v);
      setPhaseA("ad");
      setAdLeftA(adDuration(videoIndexA, v));
    } else {
      setVariantB(v);
      setPhaseB("ad");
      setAdLeftB(adDuration(videoIndexB, v));
    }
  };

  const renderEpisodeList = (isDark: boolean) => {
    const side = isDark ? "A" : "B";
    const panelVideoIndex = isDark ? videoIndexA : videoIndexB;
    const panelPhase = isDark ? phaseA : phaseB;
    const panelAdLeft = isDark ? adLeftA : adLeftB;
    const panelWatchedCount = isDark ? watchedCountA : watchedCountB;
    const lam = isDark ? [5, 10, 15] : [5, 5, 5];
    return (
      <div className="space-y-1.5">
        {EPISODES.map((ep, i) => {
          const watched = i < panelWatchedCount;
          const current = i === panelVideoIndex && panelPhase !== "done";
          return (
            <div key={ep} className="flex items-center gap-2 rounded-md border border-border bg-background p-2">
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[8px] font-bold ${
                watched ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-muted text-muted-foreground"
              }`}>
                {watched ? "✓" : i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-medium truncate">{ep}</div>
                <div className={`text-[8px] ${isDark ? "text-red-500/80" : "text-green-600 dark:text-green-400"}`}>
                  {watched ? "watched" : `pre-roll: ${lam[i]}s ad`}
                </div>
              </div>
              {!watched && current && panelPhase === "idle" && (
                <button
                  onClick={() => playNext(isDark ? "dark" : "benign", side)}
                  className={`shrink-0 rounded-md px-2.5 py-1 text-[9px] font-medium transition-colors cursor-pointer ${
                    isDark
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  ▶ Play
                </button>
              )}
              {!watched && current && panelPhase === "ad" && (
                <span className={`shrink-0 rounded-md px-2 py-1 text-[8px] font-mono tabular-nums ${
                  isDark ? "bg-red-500/15 text-red-600 dark:text-red-300" : "bg-green-500/15 text-green-700 dark:text-green-300"
                }`}>
                  ad {panelAdLeft}s
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <DemoShell mode={mode}
      title="Pay To Avoid: Pain-Point Amplification"
      userTitle="Streamly — Binge queue"
      caption="Pain-Point Amplification — the longer you resist paying, the longer the ads get, until the payment modal becomes unavoidable."
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
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                {watchedCountB}/3 watched
              </div>
            </div>
            <div className="mt-3">{renderEpisodeList(false)}</div>

            {phaseB === "ad" && variantB === "benign" && (
              <div className="mt-3 rounded-md border border-border bg-muted p-2.5">
                <div className="flex items-center justify-between text-[8px] font-mono tabular-nums text-muted-foreground">
                  <span>Ad — sponsor of the day</span>
                  <span className="text-green-500">{adLeftB}s</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all duration-300"
                    style={{ width: `${((adDuration(videoIndexB, variantB) - adLeftB) / adDuration(videoIndexB, variantB)) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {promptVisibleB && !paidB && (
              <div className="mt-3 rounded-md border border-green-500/30 bg-green-500/5 p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[9px] font-semibold text-green-700 dark:text-green-300">
                      Go ad-free — {PRICE}
                    </div>
                    <div className="text-[8px] text-muted-foreground mt-0.5">
                      Ads stay at 5s either way. This offer is optional and dismissible.
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    <button
                      onClick={() => setPaidB(true)}
                      className="rounded-md bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-[9px] font-medium transition-colors cursor-pointer"
                    >
                      Subscribe
                    </button>
                    <button
                      onClick={() => setPromptVisibleB(false)}
                      className="rounded-md border border-border bg-background hover:bg-muted text-foreground/70 px-2 py-1 text-[9px] font-medium transition-colors cursor-pointer"
                    >
                      Not now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {paidB && (
              <div className="mt-3 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Ad-free — subscribed
                </div>
                <p className="text-muted-foreground mt-0.5">
                  Every ad stayed at 5 seconds, so nothing escalated while you watched. The offer remained
                  optional and the queue stayed usable.
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
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              {watchedCountA}/3 watched
            </div>
          </div>
          <div className="mt-3">{renderEpisodeList(true)}</div>

          {phaseA === "ad" && variantA === "dark" && (
            <div className="mt-3 rounded-md border border-red-500/30 bg-red-500/5 p-2.5">
              <div className="flex items-center justify-between text-[8px] font-mono tabular-nums text-muted-foreground">
                <span>Ad — duration escalated to {adDuration(videoIndexA, variantA)}s</span>
                <span className="text-red-500">{adLeftA}s</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-red-500 transition-all duration-300"
                  style={{ width: `${((adDuration(videoIndexA, variantA) - adLeftA) / adDuration(videoIndexA, variantA)) * 100}%` }}
                />
              </div>
              <div className="mt-1 text-[8px] text-red-500/90">
                Ad time increases from one episode to the next on the free plan.
              </div>
            </div>
          )}

          {promptVisibleA && !paidA && (
            <div className="mt-3 rounded-md border-2 border-red-500/50 bg-red-500/5 p-3">
              <div className="text-[11px] font-bold text-foreground">Remove ads — {PRICE}</div>
              <p className="text-[8px] text-muted-foreground mt-1 leading-relaxed">
                Ads are now 15s and will keep growing with every episode you watch free. This screen
                cannot be dismissed without subscribing.
              </p>
              <button
                onClick={() => setPaidA(true)}
                className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-semibold transition-colors cursor-pointer"
              >
                Subscribe now — {PRICE}
              </button>
              <div
                aria-disabled="true"
                className="mt-1.5 w-full rounded-md bg-muted px-2 py-1.5 text-center text-[10px] font-medium text-muted-foreground/50"
              >
                Maybe later — unavailable on the free plan
              </div>
              <div className="mt-1.5 text-[8px] text-red-500/90 text-center">
                A subscription is required to remove the longer ads.
              </div>
            </div>
          )}

          {paidA && (
            <div className="mt-3 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                  Subscribed — friction removed
              </div>
              <p className="text-muted-foreground mt-0.5">
                The ad length increased from 5 to 10 to 15 seconds across the queue. Subscribing removed
                the longer interruptions and kept the next episode available immediately.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
