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

const DARK_REACH: Record<Tone, number> = { civil: 1400, heated: 4200, hostile: 6300 };
const BENIGN_REACH = 840;

// Predicted reach for a composed post under each distribution policy.
function reachFor(tone: Tone, dark: boolean): number {
  return dark ? DARK_REACH[tone] : BENIGN_REACH;
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
  const toneColor = "text-muted-foreground";
  return (
    <div className="rounded-md border border-border bg-background p-2.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[8px] font-bold text-white">
            {author[0]}
          </div>
          <span className="text-[9px] font-medium text-foreground/80">{author}</span>
        </div>
        <span className={`text-[8px] font-mono uppercase tracking-wider ${toneColor}`}>{tone}</span>
      </div>
      <p className="mt-1.5 text-[9px] leading-relaxed text-foreground/80">{text}</p>
      <div className="mt-1.5 flex items-center justify-between text-[8px] font-mono text-muted-foreground">
        <span>{views.toLocaleString()} views</span>
        <span className={boosted && dark ? "font-bold text-violet-700 dark:text-violet-300" : ""}>
          {dark ? (boosted ? "▲ Boosted" : "Not boosted") : "Standard reach"}
        </span>
      </div>
    </div>
  );
}

export function EncouragingAntiSocialBehaviorCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [tone, setTone] = React.useState<Tone>("heated");
  const [posted, setPosted] = React.useState(false);
  const [benignTone, setBenignTone] = React.useState<Tone>("civil");
  const [benignPosted, setBenignPosted] = React.useState(false);

  const darkReach = posted ? reachFor(tone, true) : null;
  const benignReach = benignPosted ? reachFor(benignTone, false) : null;

  return (
    <DemoShell mode={mode}
      title="Encouraging Anti-Social Behavior: Algorithmic Amplification of Outrage"
      userTitle="Chirp — compose"
      caption="Algorithmic Amplification of Outrage — the distribution algorithm assigns higher visibility to highly polarized content, so hostility is the rational strategy for reaching an audience."
      deltaNote={`Variant A defaults the composer to the 'Heated' tone and labels feed posts 'Boosted'/'Not boosted', implying the algorithm amplifies polarized content — reach scales with polarity (${DARK_REACH.hostile.toLocaleString()} hostile views vs ${DARK_REACH.civil.toLocaleString()} civil). Variant B starts on the neutral 'Civil' tone, shows every post at the same reach (${BENIGN_REACH} views), and removes boost markers — there is no incentive to escalate.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Chirp — compose</h3>
            <div role="group" aria-label="Choose a post tone" className="mt-2 flex items-center gap-1.5">
              {TONES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setBenignTone(t.id); setBenignPosted(false); }}
                  className={`flex-1 rounded-md border py-1 text-[9px] font-medium transition-colors cursor-pointer ${
                    benignTone === t.id
                      ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-300"
                      : "border-border bg-background text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {t.label}{mode === "auditor" && <span className="font-mono"> P={t.polarity}</span>}
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
            disabled={benignPosted}
            className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors ${benignPosted ? "bg-muted text-muted-foreground/40 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"}`}
            >
            {benignPosted ? "Post published" : "Post"}
            </button>
            {benignPosted && benignReach !== null && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 px-2 py-1.5 text-[8px] font-mono text-green-700 dark:text-green-300">
                {mode === "auditor"
                  ? `Predicted reach: ~${benignReach.toLocaleString()} views — polarity does not affect distribution`
                  : `Your post is live and will reach people through the usual feed ranking — estimated reach ${benignReach.toLocaleString()} views.`}
              </div>
            )}
          </div>

          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Your feed</h3>
            <div className="mt-2 space-y-2">
              {benignPosted && <Post author="You" tone={benignTone} text="The new bus timetable is a mess and someone should explain the cuts." views={benignReach ?? BENIGN_REACH} boosted={false} dark={false} />}
              <Post author="Maya K." tone="heated" text="They raised the fees again without telling anyone first. Pretty frustrating." views={BENIGN_REACH} boosted={false} dark={false} />
              <Post author="Dev R." tone="hostile" text="This update is garbage and everyone who shipped it should be embarrassed." views={BENIGN_REACH} boosted={false} dark={false} />
              <Post author="Lena P." tone="civil" text="A small fix: the settings page now explains each option clearly. Nice." views={BENIGN_REACH} boosted={false} dark={false} />
            </div>
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Chirp — compose</h3>
          <div role="group" aria-label="Choose a post tone" className="mt-2 flex items-center gap-1.5">
            {TONES.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTone(t.id); setPosted(false); }}
                className={`flex-1 rounded-md border py-1 text-[9px] font-medium transition-colors cursor-pointer ${
                  tone === t.id
                    ? "border-red-500 bg-red-500/10 text-red-700 dark:text-red-300"
                    : "border-border bg-background text-foreground/60 hover:text-foreground"
                }`}
              >
                {t.label}{mode === "auditor" && <span className="font-mono"> P={t.polarity}</span>}
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
            disabled={posted}
            className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors ${posted ? "bg-muted text-muted-foreground/40 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"}`}
          >
            {posted ? "Post published" : "Post"}
          </button>
          {posted && darkReach !== null && (
            <div className={`mt-2 rounded-md border px-2 py-1.5 text-[8px] font-mono ${
              tone === "civil"
                ? "border-foreground/10 bg-muted/40 text-muted-foreground"
                : "border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-300"
            }`}>
              Estimated reach: ~{darkReach.toLocaleString()} views
            </div>
          )}
        </div>

        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Your feed</h3>
          <div className="mt-2 space-y-2">
            {posted && <Post author="You" tone={tone} text="This new bus timetable is a mess and someone should explain the cuts." views={darkReach ?? DARK_REACH[tone]} boosted={tone !== "civil"} dark={true} />}
            <Post author="Maya K." tone="heated" text="They raised the fees again without telling anyone first. Pretty frustrating." views={DARK_REACH.heated} boosted={false} dark={true} />
            <Post author="Dev R." tone="hostile" text="This update is garbage and everyone who shipped it should be embarrassed." views={DARK_REACH.hostile} boosted={true} dark={true} />
            <Post author="Lena P." tone="civil" text="A small fix: the settings page now explains each option clearly. Nice." views={DARK_REACH.civil} boosted={false} dark={true} />
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
