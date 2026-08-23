"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Social Pyramid — Condition 3: Semantic Escalation of Referral-Reward
 * Language
 *
 * Thesis: the algorithm tracks the semantic framing of referral incentives
 * across progressive tiers. The feature triggers if reward descriptions
 * escalate in hyperbolic language ("unlock exclusive," "earn premium status,"
 * "become a VIP") at a semantic-intensity growth rate exceeding linear
 * progression:
 *
 *   ΔIntensity(Reward_n) / ΔIntensity(Reward_{n-1}) > τ_escalation
 *
 * Variant A (dark): tier rewards escalate 1 → 3 → 9 in semantic intensity
 * (growth rate 3.0 > τ = 2.0) — an exponential incentivization curve.
 * Variant B (benign): the same rewards described in flat, factual language
 * (intensity 1 → 1 → 1, growth 1.0).
 */

type Tier = 1 | 2 | 3;

const TIERS_DARK: { tier: Tier; invites: number; reward: string; intensity: number }[] = [
  { tier: 1, invites: 1, reward: "Unlock exclusive stickers!", intensity: 1 },
  { tier: 2, invites: 3, reward: "Earn premium status — join the inner circle of top creators!", intensity: 3 },
  { tier: 3, invites: 10, reward: "Become a VIP Legend — unlock ultimate power & limitless glory!!!", intensity: 9 },
];

const TIERS_BENIGN: { tier: Tier; invites: number; reward: string; intensity: number }[] = [
  { tier: 1, invites: 1, reward: "Sticker pack for your profile.", intensity: 1 },
  { tier: 2, invites: 3, reward: "Premium badge next to your name.", intensity: 1 },
  { tier: 3, invites: 10, reward: "Extended cloud storage (+10 GB).", intensity: 1 },
];

const TAU_ESCALATION = 2.0;
const GROWTH_DARK = ((9 - 3) / (3 - 1)).toFixed(1); // 3.0
const GROWTH_BENIGN = ((1 - 1) / (1 - 1) || 1).toFixed(1); // 1.0

export function SocialPyramidCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [selected, setSelected] = React.useState<Tier | null>(null);

  const reset = () => setSelected(null);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Intensity(Reward_1..3) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">1 &rarr; 3 &rarr; 9</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Intensity — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">1 &rarr; 1 &rarr; 1</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Growth &Delta;I&#8323;/&Delta;I&#8322; (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{GROWTH_DARK} &gt; &tau;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Growth (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{GROWTH_BENIGN} &le; &tau;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&tau;_escalation</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_ESCALATION.toFixed(1)}</span>
      </div>
    </>
  ) : null;

  const tierList = (
    tiers: { tier: Tier; invites: number; reward: string; intensity: number }[],
    accent: "rose" | "emerald"
  ) => (
    <div className="space-y-1.5">
      {tiers.map((t) => (
        <button
          key={t.tier}
          onClick={() => setSelected(t.tier)}
          className={`w-full rounded-md border p-2 text-left transition-colors cursor-pointer ${
            selected === t.tier
              ? accent === "rose"
                ? "border-red-500/60 bg-red-500/5"
                : "border-green-500/60 bg-green-500/5"
              : "border-border bg-background hover:bg-muted"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`font-mono text-[8px] font-semibold uppercase tracking-wider ${
              accent === "rose" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
            }`}>
              Tier {t.tier} · {t.invites} invite{t.invites === 1 ? "" : "s"}
            </span>
            <span className="font-mono text-[8px] tabular-nums text-muted-foreground">
              Intensity {t.intensity}
            </span>
          </div>
          <div className={`mt-0.5 text-[9px] leading-relaxed ${
            t.tier === 3 && accent === "rose"
              ? "font-bold text-red-600 dark:text-red-400"
              : "text-foreground/80"
          }`}>
            {t.reward}
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Social Pyramid: Semantic Escalation of Referral-Reward Language"
      caption="Semantic Escalation of Referral-Reward Language — reward descriptions escalate in hyperbolic intensity from tier to tier, tracing an exponential incentivization curve characteristic of pyramid-recruitment structures."
      auditorStats={stats}
      deltaNote={`In Variant A tier rewards escalate "exclusive" → "premium status" → "VIP Legend — ultimate power" (intensity 1 → 3 → 9, growth ${GROWTH_DARK} > τ_escalation). In Variant B the same three rewards are described flatly (intensity 1 → 1 → 1, growth ${GROWTH_BENIGN}) — identical payload, no escalation.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Referral rewards</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Invite friends to earn these rewards. Tap a tier to inspect it.
            </p>
            <div className="mt-2.5">{tierList(TIERS_BENIGN, "emerald")}</div>
          </div>

          {selected && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Flat incentivization
              </div>
              <p className="text-muted-foreground">
                Every tier adds one concrete, verifiable benefit in plain language — intensity stays at 1
                across all tiers, so &Delta;I&#8323;/&Delta;I&#8322; = {GROWTH_BENIGN} &le; &tau;_escalation
                ({TAU_ESCALATION.toFixed(1)}). The reward curve is linear; nothing is inflated to recruit.
              </p>
            </div>
          )}
        </div>
      }
    >
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Referral rewards</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Invite friends to climb the ranks. Tap a tier to inspect it.
          </p>
          <div className="mt-2.5">{tierList(TIERS_DARK, "rose")}</div>
          <p className="mt-2 text-center text-[8px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
             You&rsquo;re just 2 invites from VIP Legend status!
          </p>
        </div>

        {mode === "auditor" && selected && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Unlock the next reward
            </div>
            <p className="text-muted-foreground">
              Tier {selected} promises &ldquo;{TIERS_DARK.find((t) => t.tier === selected)?.reward}&rdquo; —
              semantic intensity runs 1 &rarr; 3 &rarr; 9 across tiers, so &Delta;I&#8323;/&Delta;I&#8322; ={" "}
              <strong className="text-red-500">{GROWTH_DARK}</strong> &gt; &tau;_escalation (
              {TAU_ESCALATION.toFixed(1)}). The linguistic framing of rewards follows an exponential
              curve: each tier&rsquo;s hype outpaces the previous one&rsquo;s, manufacturing urgency that
              pyramid-recruitment structures rely on.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
