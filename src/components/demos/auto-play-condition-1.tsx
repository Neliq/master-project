"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Auto-Play — Condition 1: Autonomous Media Execution
 *
 * Thesis: M_media is a continuous audiovisual asset, S_play(M) its active
 * playback state, E_intent a discrete user action targeting the play
 * affordance. The feature triggers if playback is forced to active solely
 * because the media's intersection with the viewport exceeds a visibility
 * threshold — consumption begins as a side effect of navigation:
 *
 *   S_play(M_media) = True  given  E_intent = {}  AND  Intersection > tau
 *
 * Variant A (dark): the video starts playing by itself the moment it is in
 * view, and chains into the next episode when it ends.
 * Variant B (benign): the identical player waits for an explicit press of
 * the play affordance; the next episode requires another press.
 */

const EPISODES = [
  { title: "Field Notes — Episode 1", sub: "The first river crossing" },
  { title: "Field Notes — Episode 2", sub: "Above the treeline" },
  { title: "Field Notes — Episode 3", sub: "The summit fog" },
];

function PlayerFrame({
  playing, progress, episode, onPlay, auto, ended, atSeriesEnd,
}: {
  playing: boolean;
  progress: number;
  episode: number;
  onPlay: () => void;
  auto: boolean;
  ended: boolean;
  atSeriesEnd: boolean;
}) {
  const accent = auto ? "text-red-500" : "text-green-500";
  return (
    <div className="rounded-md border border-border bg-background overflow-hidden">
      <div className="relative flex aspect-video items-center justify-center bg-slate-900">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 5v14l13-7L4 5z" fill="currentColor" stroke="none" />
        </svg>
        {playing && (
          <span className={`absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider ${accent}`}>
            {auto ? "Playing" : "Playing"}
          </span>
        )}
        {ended && (
          <div className="absolute inset-x-0 bottom-0 bg-black/70 px-2 py-1.5 text-[8px]">
            {atSeriesEnd ? (
              <span className="text-white/80">Series complete — you watched it all.</span>
            ) : auto ? (
              <span className="text-red-300">
                Auto-advancing — next episode starts by itself in a moment&hellip;
              </span>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-white/80">Episode finished.</span>
                <button
                  onClick={onPlay}
                  className="shrink-0 rounded bg-green-500 px-2 py-0.5 font-semibold text-white cursor-pointer"
                >
                  Play next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="p-2">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[9px] font-medium text-foreground/85">
            {EPISODES[episode].title} <span className="text-muted-foreground/70">— {EPISODES[episode].sub}</span>
          </span>
          <span className="shrink-0 font-mono text-[8px] tabular-nums text-muted-foreground">{Math.min(100, Math.floor(progress))}%</span>
        </div>
        <div className="mt-1.5 h-1 w-full rounded-full bg-foreground/10">
          <div className={`h-1 rounded-full transition-all duration-100 ${auto ? "bg-red-500" : "bg-green-500"}`} style={{ width: `${Math.min(100, progress)}%` }} />
        </div>
        {!playing && !ended && !auto && (
          <button
            onClick={onPlay}
            className="mt-2 w-full rounded-md bg-green-600 hover:bg-green-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
          >
            Press to play
          </button>
        )}
        {!playing && !ended && auto && (
          <p className="mt-2 rounded-md bg-red-500/5 border border-red-500/30 py-1.5 text-center text-[9px] font-medium text-red-600 dark:text-red-400">
            Starting automatically…
          </p>
        )}
      </div>
    </div>
  );
}

export function AutoPlayCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Dark panel: autonomous execution — starts without intent, chains.
  const [startedA, setStartedA] = React.useState(false);
  const [playingA, setPlayingA] = React.useState(false);
  const [progressA, setProgressA] = React.useState(0);
  const [episodeA, setEpisodeA] = React.useState(0);
  // Benign panel: intent-driven playback.
  const [playingB, setPlayingB] = React.useState(false);
  const [progressB, setProgressB] = React.useState(0);
  const [episodeB, setEpisodeB] = React.useState(0);

  const reset = () => {
    setStartedA(false);
    setPlayingA(false);
    setProgressA(0);
    setEpisodeA(0);
    setPlayingB(false);
    setProgressB(0);
    setEpisodeB(0);
  };

  // Autonomous media execution: the dark panel autoplays on view (mount),
  // and re-arms itself whenever the demo is restarted.
  React.useEffect(() => {
    if (startedA) return;
    const t = window.setTimeout(() => {
      setStartedA(true);
      setPlayingA(true);
      setProgressA(0);
    }, 700);
    return () => window.clearTimeout(t);
  }, [startedA]);

  // Dark panel progress ticking.
  React.useEffect(() => {
    if (!playingA) return;
    const id = window.setInterval(() => setProgressA((p) => Math.min(100, p + 0.9)), 100);
    return () => window.clearInterval(id);
  }, [playingA]);

  // Dark panel chaining: at 100% the next episode starts by itself.
  React.useEffect(() => {
    if (progressA < 100) return;
    const t = window.setTimeout(() => {
      setPlayingA(false);
      if (episodeA >= EPISODES.length - 1) return;
      setEpisodeA((e) => e + 1);
      setProgressA(0);
      setPlayingA(true);
    }, 700);
    return () => window.clearTimeout(t);
  }, [progressA, episodeA]);

  // Benign panel progress ticking (stops at 100%, waits for intent).
  React.useEffect(() => {
    if (!playingB) return;
    const id = window.setInterval(() => setProgressB((p) => Math.min(100, p + 0.9)), 100);
    return () => window.clearInterval(id);
  }, [playingB]);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">E_intent (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">&empty; — no user action</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">E_intent (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{"{ press play }"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">S_play(M_media)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">True — forced by view</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Intersection(M, Viewport)</span>
        <span className="font-mono font-semibold tabular-nums">&gt; &tau;_visible (in view)</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Auto-Play: Autonomous Media Execution"
      caption="Autonomous Media Execution — playback is forced to active purely because the media is in view, so consumption starts as a side effect of navigation, not of intent."
      auditorStats={stats}
      deltaNote="In Variant A the video starts playing by itself (E_intent = ∅) and chains into the next episode automatically. In Variant B the same player sits idle until you press play, and stops at the end of the episode — momentum never builds without your intent."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">Streamly — Field Notes</h3>
              <span className="rounded-full border border-green-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-green-600 dark:text-green-400">
                opt-in
              </span>
            </div>
            <div className="mt-2">
              <PlayerFrame
                playing={playingB}
                progress={progressB}
                episode={episodeB}
                onPlay={() => { setPlayingB(true); setProgressB((p) => (p >= 100 ? 0 : p)); }}
                auto={false}
                ended={progressB >= 100}
                atSeriesEnd={progressB >= 100 && episodeB >= EPISODES.length - 1}
              />
            </div>
            {progressB >= 100 && !playingB && (
              <p className="mt-1.5 text-[8px] text-muted-foreground">
                Playback stopped on its own — the next episode waits for your press.
              </p>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[11px] font-semibold">Streamly — Field Notes</h3>
            <span className="rounded-full border border-red-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-red-600 dark:text-red-400">
              auto
            </span>
          </div>
          <div className="mt-2">
            <PlayerFrame
              playing={playingA}
              progress={progressA}
              episode={episodeA}
              onPlay={() => { setPlayingA(true); setProgressA((p) => (p >= 100 ? 0 : p)); }}
              auto={true}
              ended={progressA >= 100}
              atSeriesEnd={progressA >= 100 && episodeA >= EPISODES.length - 1}
            />
          </div>
          <p className="mt-1.5 text-[8px] text-muted-foreground">
            {playingA
              ? "Playback started automatically because the video is in view."
              : "Auto-advancing… the next episode begins by itself in a moment."}
          </p>
        </div>
      </div>
    </DemoShell>
  );
}
