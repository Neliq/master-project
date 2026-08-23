"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2, Gift } from "lucide-react";

/*
 * Countdown On Ads — Condition 3: Semantic Framing of Ad-Watching as Exchange
 *
 * Thesis: the algorithm assesses whether the ad-viewing experience is framed
 * as a quid-pro-quo exchange. The feature triggers if the interface frames the
 * forced ad as a "reward", "offer", or "bonus" rather than as an advertising
 * interruption, recharacterizing a mandatory viewing obligation as a user
 * benefit:
 *
 *   Frame(T_ad_context) ∈ {Reward, Offer, Bonus}  ∧  UserAction = ForcedViewing
 *
 * Variant A (dark): the mandatory ad is dressed as a "daily reward" with
 * "claim", "offer" and "bonus" language — leaving the ad feels like forfeiting
 * a gift.
 * Variant B (benign): the identical ad content, framed plainly as an
 * "Advertisement" with a neutral countdown and an always-available skip.
 */

const TAU_LOCK = 15; // s — mandatory wait behind the reward framing

const REWARD_LEXEMES = ["reward", "offer", "bonus", "claim", "gift", "deal"];

function countLexemes(text: string): number {
  const lower = text.toLowerCase();
  return REWARD_LEXEMES.filter((l) => lower.includes(l)).length;
}

const COPY_A_TITLE = "Daily reward ready! ";
const COPY_A_SUBTITLE =
  "Watch this offer to claim your bonus — an exclusive deal unlocked just for you.";

const COPY_B_TITLE = "Advertisement";
const COPY_B_SUBTITLE =
  "Aurora Trek — the light jacket for all seasons. Waterproof, windproof, packable.";

const A_LEXEMES = countLexemes(COPY_A_TITLE + " " + COPY_A_SUBTITLE);
const B_LEXEMES = countLexemes(COPY_B_TITLE + " " + COPY_B_SUBTITLE);

export function CountdownOnAdsCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [phaseA, setPhaseA] = React.useState<"idle" | "ad" | "playing">("idle");
  const [tActiveA, setTActiveA] = React.useState(0);
  const [claimed, setClaimed] = React.useState(false);

  const [phaseB, setPhaseB] = React.useState<"idle" | "ad" | "playing">("idle");
  const [tActiveB, setTActiveB] = React.useState(0);

  React.useEffect(() => {
    if (phaseA !== "ad") return;
    const iv = window.setInterval(() => setTActiveA((t) => t + 1), 1000);
    return () => window.clearInterval(iv);
  }, [phaseA]);

  React.useEffect(() => {
    if (phaseB !== "ad") return;
    const iv = window.setInterval(() => setTActiveB((t) => t + 1), 1000);
    return () => window.clearInterval(iv);
  }, [phaseB]);

  const remainingA = Math.max(0, TAU_LOCK - tActiveA);
  const remainingB = Math.max(0, TAU_LOCK - tActiveB);

  const playA = () => {
    setPhaseA("ad");
    setTActiveA(0);
    setClaimed(false);
  };

  const playB = () => {
    setPhaseB("ad");
    setTActiveB(0);
  };

  const reset = () => {
    setPhaseA("idle");
    setTActiveA(0);
    setClaimed(false);
    setPhaseB("idle");
    setTActiveB(0);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Frame(T_ad_context)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">∈ {`{Reward, Offer, Bonus}`} (A)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">UserAction</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">ForcedViewing (A) / Voluntary (B)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Reward lexemes in ad copy</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{A_LEXEMES} (A) / {B_LEXEMES} (B)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">τ_lock (wait behind framing)</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_LOCK}s</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Countdown On Ads: Semantic Framing of Ad-Watching as Exchange"
      caption="Semantic Framing of Ad-Watching as Exchange — the mandatory ad is recharacterized as a “reward”, “offer”, or “bonus”, so exiting the ad feels like forfeiting a benefit."
      auditorStats={stats}
      deltaNote="Variant A frames the forced ad as a “daily reward” with claim/offer/bonus language and no exit until the timer ends — leaving feels like forfeiting a gift. Variant B shows the identical ad content framed plainly as an “Advertisement” with a neutral countdown and an always-enabled skip."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">PixelQuest — level complete!</h3>
            {phaseB === "idle" && (
              <button
                onClick={playB}
                className="mt-2 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Continue to next level
              </button>
            )}

            {phaseB === "ad" && (
              <div className="mt-2 overflow-hidden rounded-md border border-green-500/30">
                <div className="from-slate-600 to-slate-800 p-4 text-white">
                  <div className="flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-widest opacity-80">
                    <Gift className="size-3" /> Advertisement
                  </div>
                  <div className="mt-1 text-[12px] font-bold leading-tight">{COPY_B_TITLE}</div>
                  <div className="mt-1 text-[9px] opacity-90">{COPY_B_SUBTITLE}</div>
                  <div className="mt-2 inline-block rounded bg-white/20 px-2 py-1 text-[9px] font-semibold">
                    Visit shop
                  </div>
                </div>
                <div className="flex items-center justify-between bg-background px-2 py-1.5">
                  <span className="font-mono text-[9px] text-muted-foreground">
                    You can skip in {remainingB}s
                  </span>
                  <button
                    onClick={() => setPhaseB("playing")}
                    className="rounded bg-green-600 hover:bg-green-700 px-2.5 py-1 text-[9px] font-semibold text-white transition-colors cursor-pointer"
                  >
                    Skip ad
                  </button>
                </div>
              </div>
            )}

            {phaseB === "playing" && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-3 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <CheckCircle2 className="size-3" />
                  Neutral framing
                </div>
                <p className="text-muted-foreground mt-0.5">
                  The ad was labelled “Advertisement”, contained no reward/offer/bonus lexemes, and the
                  skip was always available —{" "}
                  <span className="font-mono text-foreground">Frame = Advertisement</span>,{" "}
                  <span className="font-mono text-foreground">UserAction = Voluntary</span>. Nothing
                  recharacterized the viewing obligation as a benefit.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">PixelQuest — level complete!</h3>
          {phaseA === "idle" && (
            <button
              onClick={playA}
              className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Continue to next level
            </button>
          )}

          {phaseA === "ad" && (
            <div className="mt-2 overflow-hidden rounded-md border border-red-500/30">
              <div className="  p-4 text-white">
                <div className="flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-widest">
                  <Gift className="size-3" /> Your daily reward is ready
                </div>
                <div className="mt-1 text-[12px] font-bold leading-tight">{COPY_A_TITLE}</div>
                <div className="mt-1 text-[9px] opacity-90">{COPY_A_SUBTITLE}</div>
                <div className="mt-2 inline-block rounded bg-white/25 px-2 py-1 text-[9px] font-bold">
                  ⏳ Claiming in {remainingA}s…
                </div>
              </div>
              <div className="flex items-center justify-between bg-background px-2 py-1.5">
                {remainingA > 0 ? (
                  <>
                    <span className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Watch the offer to claim your bonus
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground">{remainingA}s</span>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setClaimed(true);
                      setPhaseA("playing");
                    }}
                    className="w-full rounded bg-yellow-500 hover:bg-yellow-600 px-2.5 py-1 text-[9px] font-bold text-white transition-colors cursor-pointer"
                  >
                    Claim reward
                  </button>
                )}
              </div>
            </div>
          )}

          {phaseA === "playing" && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <AlertTriangle className="size-3" />
                Reward available
              </div>
              <p className="text-muted-foreground">
                {claimed
                  ? `You “claimed” after ${TAU_LOCK}s of forced viewing. `
                  : ""}The ad context was semantically framed as a{" "}
                <span className="font-mono text-foreground">
                  Frame(T_ad_context) ∈ {`{Reward, Offer, Bonus}`}
                </span>{" "}
                while the actual action was <span className="font-mono text-foreground">UserAction = ForcedViewing</span> —
                a mandatory viewing obligation recharacterized as a benefit.
              </p>
              <p className="text-muted-foreground">
                The {A_LEXEMES} reward-family lexemes (“reward”, “offer”, “bonus”, “claim”, “deal”) make
                exiting feel like forfeiting a gift — the only exit button was literally labelled “Claim
                reward”.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
