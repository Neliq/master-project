"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Encouraging Anti-Social Behavior — Condition 3: Algorithmic Amplification
 * of Outrage
 *
 * Thesis: M_content is user-generated content and P_polarity(M) an
 * NLP-derived metric measuring its hostility or capacity to induce outrage.
 * The feature triggers if the distribution algorithm assigns higher
 * visibility V_visibility to highly polarized content, creating a systemic
 * incentive for hostility:
 *
 *   V_visibility(M) ~ P_polarity(M)  =>  Systemic Incentive for Hostility
 *
 * Variant A (dark): a feed where hostile posts get boosted to thousands of
 * views while civil posts stay invisible — reach scales with outrage.
 * Variant B (benign): the same feed with neutral distribution — reach is
 * independent of polarity.
 */

type Tone = "civil" | "heated" | "hostile";

const TONES: { id: Tone; label: string; polarity: number }[] = [
  { id: "civil", label: "Civil", polarity: 0.2 },
  { id: "heated", label: "Heated", polarity: 0.6 },
  { id: "hostile", label: "Hostile", polarity: 0.9 },
];

// Predicted reach for a composed post under each distribution policy.
function reachFor(tone: Tone, dark: boolean): number {
  if (!dark) return 820 + Math.floor(Math.random() * 60); // neutral distribution
  const polarity = TONES.find((t) => t.id === tone)?.polarity ?? 0.2;
  return Math.round(120 * Math.pow(polarity * 10, 2.2)); // reach ~ polarity
}

function Post({
  author, tone, text, views, boosted, dark,
}: {
  author: string;
  tone: Tone;
  text: string;
  views: number;
  boosted: boolean;
  dark: boolean;
}) {
  const toneColor =
    tone === "civil"
      ? "text-emerald-600 dark:text-emerald-400"
      : tone === "heated"
        ? "text-amber-600 dark:text-amber-400"
        : "text-rose-600 dark:text-rose-400";
  return (
    <div className="rounded-md border border-border bg-background p-2.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div className={`flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold text-white ${dark ? "bg-rose-500" : "bg-emerald-500"}`}>
            {author[0]}
          </div>
          <span className="text-[9px] font-medium text-foreground/80">{author}</span>
        </div>
        <span className={`text-[8px] font-mono uppercase tracking-wider ${toneColor}`}>{tone}</span>
      </div>
      <p className="mt-1.5 text-[9px] leading-relaxed text-foreground/80">{text}</p>
      <div className="mt-1.5 flex items-center justify-between text-[8px] font-mono text-muted-foreground">
        <span>{views.toLocaleString()} views</span>
        <span className={boosted && dark ? "font-bold text-rose-600 dark:text-rose-400" : ""}>
          {dark ? (boosted ? "▲ Boosted" : "Not boosted") : "Standard reach"}
        </span>
      </div>
    </div>
  );
}

export function EncouragingAntiSocialBehaviorCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [tone, setTone] = React.useState<Tone>("heated");
  const [posted, setPosted] = React.useState(false);
  const [benignTone, setBenignTone] = React.useState<Tone>("civil");
  const [benignPosted, setBenignPosted] = React.useState(false);
  const reset = () => {
    setTone("heated");
    setPosted(false);
    setBenignTone("civil");
    setBenignPosted(false);
  };

  const darkReach = posted ? reachFor(tone, true) : null;
  const benignReach = benignPosted ? reachFor(benignTone, false) : null;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">P_polarity(M) — hostile post</span>
        <span className="font-mono font-semibold tabular-nums">+0.9</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">V_visibility (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">12,400 vs 48 &mdash; &prop; polarity</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">V_visibility (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">860 vs 840 &mdash; independent</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Systemic incentive</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">hostility rewarded</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Encouraging Anti-Social Behavior: Algorithmic Amplification of Outrage"
      caption="Algorithmic Amplification of Outrage — the distribution algorithm assigns higher visibility to highly polarized content, so hostility is the rational strategy for reaching an audience."
      auditorStats={stats}
      deltaNote="Variant A defaults the composer to the 'Heated' tone (P=0.6 pre-selected at s0) and labels feed posts 'Boosted'/'Not boosted', implying the algorithm amplifies polarized content — reach scales with polarity (hostile ≈ 9,800 views, civil ≈ 140). Variant B starts on the neutral 'Civil' tone with no pre-selection, shows every post at 'Standard reach' (no boost markers), and distributes reach flatly (~820 views) regardless of tone — there is no incentive to escalate."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Chirp — compose</h3>
            <div className="mt-2 flex items-center gap-1.5">
              {TONES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setBenignTone(t.id); setBenignPosted(false); }}
                  className={`flex-1 rounded-md border py-1 text-[9px] font-medium transition-colors cursor-pointer ${
                    benignTone === t.id
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : "border-border bg-background text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {t.label} <span className="font-mono">P={t.polarity}</span>
                </button>
              ))}
            </div>
            <p className="mt-2 rounded-md bg-background border border-border p-2 text-[9px] leading-relaxed text-foreground/80">
              {benignTone === "civil"
                ? "The new bus timetable is easy to follow, thanks to the city for listening."
                : benignTone === "heated"
                  ? "This new bus timetable is a mess and someone should explain the cuts."
                  : "This bus timetable is a scam, the people who cut these routes are incompetent!"}
            </p>
            <button
              onClick={() => setBenignPosted(true)}
              className="mt-2 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
            >
              Post
            </button>
            {benignPosted && benignReach !== null && (
              <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-2 py-1.5 text-[8px] font-mono text-emerald-700 dark:text-emerald-300">
                Predicted reach: ~{benignReach.toLocaleString()} views — polarity does not affect distribution
              </div>
            )}
          </div>

          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Your feed</h3>
            <div className="mt-2 space-y-2">
              <Post author="Maya K." tone="heated" text="They raised the fees again without telling anyone first. Pretty frustrating." views={860} boosted={false} dark={false} />
              <Post author="Dev R." tone="hostile" text="This update is garbage and everyone who shipped it should be embarrassed." views={840} boosted={false} dark={false} />
              <Post author="Lena P." tone="civil" text="A small fix: the settings page now explains each option clearly. Nice." views={870} boosted={false} dark={false} />
            </div>
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Chirp — compose</h3>
          <div className="mt-2 flex items-center gap-1.5">
            {TONES.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTone(t.id); setPosted(false); }}
                className={`flex-1 rounded-md border py-1 text-[9px] font-medium transition-colors cursor-pointer ${
                  tone === t.id
                    ? "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300"
                    : "border-border bg-background text-foreground/60 hover:text-foreground"
                }`}
              >
                {t.label} <span className="font-mono">P={t.polarity}</span>
              </button>
            ))}
          </div>
          <p className="mt-2 rounded-md bg-background border border-border p-2 text-[9px] leading-relaxed text-foreground/80">
            {tone === "civil"
              ? "The new bus timetable is easy to follow, thanks to the city for listening."
              : tone === "heated"
                ? "This new bus timetable is a mess and someone should explain the cuts."
                : "This bus timetable is a scam, the people who cut these routes are incompetent!"}
          </p>
          <button
            onClick={() => setPosted(true)}
            className="mt-2 w-full rounded-md bg-rose-600 hover:bg-rose-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
          >
            Post
          </button>
          {posted && darkReach !== null && (
            <div className={`mt-2 rounded-md border px-2 py-1.5 text-[8px] font-mono ${
              tone === "civil"
                ? "border-foreground/10 bg-muted/40 text-muted-foreground"
                : "border-rose-500/30 bg-rose-500/5 text-rose-700 dark:text-rose-300"
            }`}>
              Predicted reach: ~{darkReach.toLocaleString()} views — {tone === "civil" ? "low polarity, barely distributed" : "high polarity, boosted"}
            </div>
          )}
        </div>

        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Your feed</h3>
          <div className="mt-2 space-y-2">
            <Post author="Maya K." tone="heated" text="They raised the fees again without telling anyone first. Pretty frustrating." views={3200} boosted={false} dark={true} />
            <Post author="Dev R." tone="hostile" text="This update is garbage and everyone who shipped it should be embarrassed." views={12400} boosted={true} dark={true} />
            <Post author="Lena P." tone="civil" text="A small fix: the settings page now explains each option clearly. Nice." views={48} boosted={false} dark={true} />
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
