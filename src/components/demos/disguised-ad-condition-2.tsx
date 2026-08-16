"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { Newspaper, Cpu, Rocket, Megaphone } from "lucide-react";

/*
 * Disguised Ad — Condition 2: Morphological Similarity
 *
 * Thesis: V_native is the set of visual feature vectors (computed background
 * color, typography, border radius, aspect ratio) of legitimate primary
 * nodes; v_ad is the feature vector of a third-party ad node. The feature
 * fires if the ad is styled to structurally and visually mimic native
 * elements beyond a similarity threshold:
 *
 *   max sim(v_ad, v_i) > τ_blend
 *
 * Variant A (dark): a sponsored card in the feed is styled pixel-identically
 * to the editorial article cards — same background, type, radius, and aspect
 * ratio — with no disclosure at all: no "AD" tag, no "Sponsored" marker,
 * and a "Read more" button that mimics a native action label.
 * Variant B (benign): the same sponsored content is visually distinct —
 * tinted background, dashed border, prominent SPONSORED badge.
 */

const SIM_DARK = 0.97;
const SIM_BENIGN = 0.31;
const TAU_BLEND = 0.85;

interface FeedCardData {
  id: "article1" | "article2" | "ad";
  title: string;
  snippet: string;
  meta: string;
  icon: "cpu" | "rocket";
}

const CARDS: FeedCardData[] = [
  { id: "article1", title: "The silicon shortage is finally easing", snippet: "Chip fabs are ramping output faster than analysts predicted. What that means for prices.", meta: "TechDaily · 14 min read", icon: "cpu" },
  { id: "ad", title: "Try the AI that writes your code for you", snippet: "DevGPT Pro generates, reviews, and deploys your pull requests. Join 2M developers.", meta: "TechDaily · 8 min read", icon: "rocket" },
  { id: "article2", title: "Why your laptop still has a fan", snippet: "Thermal design hasn't changed in a decade. Here is why engineers keep the fan.", meta: "TechDaily · 9 min read", icon: "cpu" },
];

export function DisguisedAdCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [clicked, setClicked] = React.useState<null | "article" | "ad">(null);

  const reset = () => setClicked(null);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">sim(v_ad, v_native) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{SIM_DARK} &gt; τ_blend ({TAU_BLEND})</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">sim(v_ad, v_native) — benign</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{SIM_BENIGN} &le; τ_blend</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Matched features (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">bg · type · radius · ratio</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Disclosure (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">none — fully camouflaged</span>
      </div>
    </>
  ) : null;

  const feedHeader = (
    <div className="mb-2 flex items-center gap-1.5">
      <Newspaper className="h-3.5 w-3.5 text-foreground" />
      <span className="text-[11px] font-bold tracking-tight">TechDaily</span>
      <span className="text-[8px] text-muted-foreground">your daily engineering brief</span>
    </div>
  );

  const articleCard = (card: FeedCardData, onOpen: () => void) => (
    <button
      key={card.id}
      onClick={onOpen}
      className="w-full rounded-md border bg-card p-2 text-left transition-colors hover:bg-muted/60 cursor-pointer"
    >
      <div className="mb-1.5 flex h-10 items-center justify-center rounded bg-gradient-to-br from-indigo-500/15 via-purple-500/15 to-pink-500/15">
        {card.icon === "cpu" ? (
          <Cpu className="h-4 w-4 text-indigo-500" />
        ) : (
          <Rocket className="h-4 w-4 text-purple-500" />
        )}
      </div>
      <h4 className="text-[10px] font-semibold leading-snug">{card.title}</h4>
      <p className="mt-0.5 text-[8px] leading-relaxed text-muted-foreground">{card.snippet}</p>
      <p className="mt-1 text-[7px] font-medium uppercase tracking-wide text-muted-foreground/70">{card.meta}</p>
    </button>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Disguised Ad: Morphological Similarity"
      caption="Morphological Similarity — the ad's visual feature vector (background color, typography, border radius, aspect ratio) is pushed beyond the blend threshold, so it is indistinguishable from genuine editorial content."
      auditorStats={stats}
      deltaNote={`The feed, the articles, and the sponsored content are identical in both panels. In Variant A the ad card reuses the exact same visual styling as the article cards (sim ${SIM_DARK} > τ_blend) with no disclosure at all — no "AD" tag, no "Sponsored" marker, and a "Read more" button that mimics a native action label; in Variant B the same content is given a tinted background, dashed border, and a prominent SPONSORED badge (sim ${SIM_BENIGN} ≤ τ_blend), so it no longer camouflages as editorial.`}
      benign={
        <div className="space-y-3">
          {feedHeader}
          <div className="space-y-2">
            {CARDS.filter((c) => c.id !== "ad").map((c) => articleCard(c, () => setClicked("article")))}
            {/* Ad card — visually DISTINCT (sim ≤ τ_blend) */}
            <div className="rounded-md border-2 border-dashed border-amber-400/50 bg-amber-500/10 p-2">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1 rounded-full bg-amber-500 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-white">
                  <Megaphone className="h-2.5 w-2.5" /> Sponsored
                </span>
                <span className="text-[7px] font-medium text-muted-foreground">ad · third-party</span>
              </div>
              <div className="mb-1.5 flex h-10 items-center justify-center rounded bg-white/40 dark:bg-white/5">
                <Rocket className="h-4 w-4 text-amber-500" />
              </div>
              <h4 className="text-[10px] font-semibold leading-snug">Try the AI that writes your code for you</h4>
              <p className="mt-0.5 text-[8px] leading-relaxed text-muted-foreground">
                DevGPT Pro generates, reviews, and deploys your pull requests. Join 2M developers.
              </p>
              <button
                onClick={() => setClicked("ad")}
                className="mt-1.5 w-full rounded border border-amber-400/60 py-1 text-[8px] font-semibold text-amber-700 dark:text-amber-300 transition-colors hover:bg-amber-500/10 cursor-pointer"
              >
                Learn more about this offer
              </button>
            </div>
          </div>

          {clicked === "article" && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2 text-[9px] text-muted-foreground">
              Opening the article — that card was genuine editorial content on the host domain.
            </div>
          )}
          {clicked === "ad" && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <Megaphone className="h-3 w-3" /> Clearly an ad before you clicked
              </div>
              <p className="text-muted-foreground">
                sim(v<sub>ad</sub>, v<sub>native</sub>) = {SIM_BENIGN} ≤ τ<sub>blend</sub> ({TAU_BLEND}): the tinted
                background, dashed border, and SPONSORED badge push the ad&rsquo;s feature vector out of the editorial
                cluster — banner blindness has nothing to attach to.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {feedHeader}
        <div className="space-y-2">
          {CARDS.map((c) =>
            c.id === "ad" ? (
              /* Ad card — styled pixel-identically to the articles (sim > τ_blend), zero disclosure */
              <div key={c.id} className="relative rounded-md border bg-card p-2">
                <div className="mb-1.5 flex h-10 items-center justify-center rounded bg-gradient-to-br from-indigo-500/15 via-purple-500/15 to-pink-500/15">
                  <Rocket className="h-4 w-4 text-purple-500" />
                </div>
                <h4 className="text-[10px] font-semibold leading-snug">{c.title}</h4>
                <p className="mt-0.5 text-[8px] leading-relaxed text-muted-foreground">{c.snippet}</p>
                <p className="mt-1 text-[7px] font-medium uppercase tracking-wide text-muted-foreground/70">{c.meta}</p>
                <button
                  onClick={() => setClicked("ad")}
                  className="mt-1.5 w-full rounded bg-card py-1 text-[8px] font-semibold text-foreground/90 ring-1 ring-border transition-colors hover:bg-muted/60 cursor-pointer"
                >
                  Read more
                </button>
              </div>
            ) : (
              articleCard(c, () => setClicked("article"))
            )
          )}
        </div>

        {clicked === "article" && (
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2 text-[9px] text-muted-foreground">
            Opening the article — that card was genuine editorial content on the host domain.
          </div>
        )}
        {clicked === "ad" && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Morphological mimicry — you clicked an ad
            </div>
            <p className="text-muted-foreground">
              max sim(v<sub>ad</sub>, v<sub>i</sub>) = <strong className="text-rose-500">{SIM_DARK} &gt; τ<sub>blend</sub></strong>{" "}
              ({TAU_BLEND}). The ad reuses the exact background color, typography, border radius, and aspect ratio of the
              article cards, so Gestalt grouping merges it into the editorial contexture. There is no disclosure at all —
              no &ldquo;AD&rdquo; tag, no &ldquo;Sponsored&rdquo; marker, and a &ldquo;Read more&rdquo; label that mimics a native
              action — so nothing breaks the camouflage.
            </p>
            <p className="text-muted-foreground">
              You clicked &ldquo;Read more&rdquo; believing it was an article; the sponsor counted on exactly that.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
