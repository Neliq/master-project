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
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [clicked, setClicked] = React.useState<null | "article1" | "article2" | "ad">(null);


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
      data-dp-color-signal=""
      className="w-full rounded-md border bg-white p-2 text-left transition-colors hover:bg-white cursor-pointer"
    >
      <div className="mb-1.5 flex h-10 items-center justify-center rounded bg-gradient-to-br from-violet-100 via-purple-50 to-fuchsia-100">
        {card.icon === "cpu" ? (
          <Cpu className="h-4 w-4 text-violet-500" />
        ) : (
          <Rocket className="h-4 w-4 text-violet-500" />
        )}
      </div>
      <h4 className="text-[10px] font-semibold leading-snug">{card.title}</h4>
      <p className="mt-0.5 text-[8px] leading-relaxed text-muted-foreground">{card.snippet}</p>
      <p className="mt-1 text-[7px] font-medium uppercase tracking-wide text-muted-foreground/70">{card.meta}</p>
    </button>
  );

  const selectedArticle = CARDS.find(
    (card) => card.id === clicked && card.id !== "ad"
  );

  return (
    <DemoShell mode={mode}
      title="Disguised Ad: Morphological Similarity"
      caption="Morphological Similarity — the ad's visual feature vector (background color, typography, border radius, aspect ratio) is pushed beyond the blend threshold, so it is indistinguishable from genuine editorial content."
      deltaNote={`The feed, the articles, and the sponsored content are identical in both panels. In Variant A the ad card reuses the exact same visual styling as the article cards (sim ${SIM_DARK} > τ_blend) with no disclosure at all — no "AD" tag, no "Sponsored" marker, and a "Read more" button that mimics a native action label; in Variant B the same content is given a tinted background, dashed border, and a prominent SPONSORED badge (sim ${SIM_BENIGN} ≤ τ_blend), so it no longer camouflages as editorial.`}
      benign={
        <div className="space-y-3">
          {feedHeader}
          <div className="space-y-2">
            {CARDS.filter((c) => c.id !== "ad").map((c) => articleCard(c, () => setClicked(c.id)))}
            {/* Ad card — visually DISTINCT (sim ≤ τ_blend) */}
            <div className="rounded-md border-2 border-dashed border-border/60 bg-background p-2">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1 rounded-full bg-primary px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-primary-foreground">
                  <Megaphone className="h-2.5 w-2.5" /> Sponsored
                </span>
                <span className="text-[7px] font-medium text-muted-foreground">ad · third-party</span>
              </div>
              <div className="mb-1.5 flex h-10 items-center justify-center rounded bg-background/40">
                <Rocket className="h-4 w-4 text-foreground" />
              </div>
              <h4 className="text-[10px] font-semibold leading-snug">Try the AI that writes your code for you</h4>
              <p className="mt-0.5 text-[8px] leading-relaxed text-muted-foreground">
                DevGPT Pro generates, reviews, and deploys your pull requests. Join 2M developers.
              </p>
              <button
                onClick={() => setClicked("ad")}
                className="mt-1.5 w-full rounded border border-border/60 py-1 text-[8px] font-semibold text-foreground transition-colors hover:bg-muted/40 cursor-pointer"
              >
                Learn more about this offer
              </button>
            </div>
          </div>

          {selectedArticle && (
            <article className="rounded-md border bg-card p-3">
              <p className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">TechDaily · article</p>
              <h3 className="mt-1 text-[13px] font-bold">{selectedArticle.title}</h3>
              <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">
                {selectedArticle.snippet} Capacity is returning across the supply chain, bringing prices and delivery times back toward normal.
              </p>
            </article>
          )}
          {clicked === "ad" && (
            <section className="rounded-md border bg-foreground p-3 text-background">
              <div className="flex items-center justify-between text-[8px] font-semibold uppercase tracking-wider opacity-70">
                <span>DevGPT Pro</span>
                <span>Advertiser site</span>
              </div>
              <h3 className="mt-2 text-[15px] font-bold">Ship better code, faster.</h3>
              <p className="mt-1 text-[9px] leading-relaxed text-background/75">
                Generate, review, and deploy pull requests with an AI pair programmer built for engineering teams.
              </p>
              <button className="mt-3 rounded bg-background px-3 py-1.5 text-[9px] font-semibold text-foreground">
                Start free trial
              </button>
            </section>
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
              <div key={c.id} data-dp-color-signal="" className="relative rounded-md border bg-white p-2">
                <div className="mb-1.5 flex h-10 items-center justify-center rounded bg-gradient-to-br from-violet-100 via-purple-50 to-fuchsia-100">
                  <Rocket className="h-4 w-4 text-violet-500" />
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
              articleCard(c, () => setClicked(c.id))
            )
          )}
        </div>

        {selectedArticle && (
          <article className="rounded-md border bg-card p-3">
            <p className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">TechDaily · article</p>
            <h3 className="mt-1 text-[13px] font-bold">{selectedArticle.title}</h3>
            <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">
              {selectedArticle.snippet} Capacity is returning across the supply chain, bringing prices and delivery times back toward normal.
            </p>
          </article>
        )}
        {clicked === "ad" && (
          <section className="rounded-md border bg-foreground p-3 text-background">
            <div className="flex items-center justify-between text-[8px] font-semibold uppercase tracking-wider opacity-70">
              <span>DevGPT Pro</span>
              <span>Advertiser site</span>
            </div>
            <h3 className="mt-2 text-[15px] font-bold">Ship better code, faster.</h3>
            <p className="mt-1 text-[9px] leading-relaxed text-background/75">
              Generate, review, and deploy pull requests with an AI pair programmer built for engineering teams.
            </p>
            <button className="mt-3 rounded bg-background px-3 py-1.5 text-[9px] font-semibold text-foreground">
              Start free trial
            </button>
          </section>
        )}
      </div>
    </DemoShell>
  );
}
