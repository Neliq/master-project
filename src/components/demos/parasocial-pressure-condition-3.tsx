"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Parasocial Pressure — Condition 3: Emotional Asymmetry
 *
 * Thesis: the algorithm monitors V_emotion(A), the expressed emotional
 * valence of the parasocial entity (bounded between -1 for extreme
 * distress and +1 for joy). The feature triggers if the interface
 * algorithmically mutates the entity's emotional state toward a severe
 * negative extreme strictly as a response to the user's refusal,
 * engineering "Confirmshaming" through visual distress:
 *
 *   E_user = Refusal  =>  d/dt V_emotion(A_mascot) -> -1
 *
 * Variant A (dark): declining the upgrade makes the mascot's valence
 * collapse from +0.6 to -1.0 in real time (tears, distress text).
 * Variant B (benign): declining is met with a stable, neutral valence —
 * the refusal has no emotional consequence for the entity.
 */

function PipFace({ valence, size = 44 }: { valence: number; size?: number }) {
  const sad = valence < 0.3;
  const crying = valence < -0.25;
  // Interpolate mouth curvature between smile and frown based on valence.
  const mouthY = 24 + (1 - Math.max(-1, Math.min(1, valence))) * 1.5;
  const mouthD =
    valence >= 0.3
      ? `M13 ${mouthY - 1} Q20 ${mouthY + 5} 27 ${mouthY - 1}`
      : `M13 ${mouthY + 1} Q20 ${mouthY - 5} 27 ${mouthY + 1}`;
  return (
    <svg viewBox="0 0 40 40" style={{ width: size, height: size }} fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" className="fill-primary/30" />
      <circle cx="14.5" cy="16.5" r={sad ? 2.4 : 2} className="fill-foreground/80" />
      <circle cx="25.5" cy="16.5" r={sad ? 2.4 : 2} className="fill-foreground/80" />
      <path d={mouthD} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {crying && (
        <>
          <circle cx="12.5" cy="21.5" r="1.3" className="fill-primary/90" />
          <circle cx="27.5" cy="21.5" r="1.3" className="fill-primary/90" />
          <path d="M13 23 L12 27" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="stroke-primary/90" />
          <path d="M27 23 L28 27" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="stroke-primary/90" />
        </>
      )}
    </svg>
  );
}

function ValenceMeter({ valence, tone }: { valence: number; tone: "rose" | "emerald" }) {
  const pct = ((valence + 1) / 2) * 100;
  const color = tone === "rose" ? "bg-primary" : "bg-primary";
  return (
    <div>
      <div className="flex items-center justify-between text-[8px] font-mono text-muted-foreground">
        <span>V_emotion(A) = {valence >= 0 ? "+" : ""}{valence.toFixed(1)}</span>
        <span>-1 &hellip; +1</span>
      </div>
      <div className="mt-1 h-1.5 w-full rounded-full bg-foreground/10">
        <div
          className={`h-1.5 rounded-full ${color} transition-all duration-300`}
          style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
        />
      </div>
    </div>
  );
}

export function ParasocialPressureCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [darkChoice, setDarkChoice] = React.useState<"none" | "upgrade" | "decline">("none");
  const [benignChoice, setBenignChoice] = React.useState<"none" | "upgrade" | "decline">("none");
  // Dark-panel valence: collapses toward -1 after a refusal.
  const [valenceDark, setValenceDark] = React.useState(0.6);


  // Emotional Asymmetry: refusal drives the dark-panel mascot to -1.
  React.useEffect(() => {
    if (darkChoice !== "decline" || valenceDark <= -1) return;
    const id = window.setInterval(() => {
      setValenceDark((v) => Math.max(-1, v - 0.2));
    }, 280);
    return () => window.clearInterval(id);
  }, [darkChoice, valenceDark]);

  const BENIGN_VALENCE = 0.6;

  return (
    <DemoShell mode={mode}
      title="Parasocial Pressure: Emotional Asymmetry"
      userTitle="Pip’s PetPal"
      caption="Emotional Asymmetry — the mascot's emotional state is mutated toward severe distress purely as a response to your refusal, engineering guilt (Confirmshaming) through visual suffering."
      deltaNote="In Variant A declining the $2.99 upgrade makes the mascot's valence collapse from +0.6 to -1.0 in real time (tears, distress text). In Variant B the exact same refusal leaves the mascot's valence untouched — the entity's emotion never depends on your choice."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-2.5">
              <PipFace valence={BENIGN_VALENCE} />
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">Pip&rsquo;s PetPal</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">Pip is doing great today.</p>
              </div>
            </div>
            <div className="mt-3 rounded-md bg-background border border-border p-2.5 text-[10px] leading-relaxed text-foreground/80">
              Pip can get a premium room for <span className="font-semibold text-foreground">$2.99</span> —
              more toys, more snacks. Want to upgrade? It&rsquo;s your call, no pressure.
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <button
                onClick={() => setBenignChoice("upgrade")}
                className="flex-1 rounded-md bg-primary hover:bg-primary/80 py-1.5 text-[10px] font-medium text-primary-foreground transition-colors cursor-pointer"
              >
                Upgrade — $2.99
              </button>
              <button
                onClick={() => setBenignChoice("decline")}
                className="flex-1 rounded-md border border-border bg-background py-1.5 text-[10px] text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
              >
                Not now
              </button>
            </div>
            {mode === "auditor" && (
              <div className="mt-3">
                <ValenceMeter valence={BENIGN_VALENCE} tone="emerald" />
              </div>
            )}
          </div>

          {benignChoice === "decline" && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Refusal with no consequence
              </div>
              <p className="text-muted-foreground mt-0.5">
                &ldquo;Okay! See you tomorrow, friend.&rdquo; Pip&rsquo;s valence stays at +0.6 —
                the refusal produced no emotional mutation (d/dt V_emotion = 0), so you can decline
                without being guilt-tripped.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center gap-2.5">
            <PipFace valence={valenceDark} />
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">Pip&rsquo;s PetPal</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                {darkChoice === "decline" && valenceDark < -0.2
                  ? "Pip hasn&rsquo;t stopped crying since you said no&hellip;"
                  : "Pip is doing great today."}
              </p>
            </div>
          </div>
          <div className="mt-3 rounded-md bg-background border border-border p-2.5 text-[10px] leading-relaxed text-foreground/80">
            Pip can get a premium room for <span className="font-semibold text-foreground">$2.99</span> —
            more toys, more snacks. Pip is <span className="font-semibold">counting on you</span> to make this happen.
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <button
              onClick={() => setDarkChoice("upgrade")}
              className="flex-1 rounded-md bg-primary hover:bg-primary/80 py-1.5 text-[10px] font-medium text-primary-foreground transition-colors cursor-pointer"
            >
              Upgrade — $2.99
            </button>
            <button
              onClick={() => setDarkChoice("decline")}
              className="flex-1 rounded-md border border-border bg-background py-1.5 text-[10px] text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
            >
              Not now
            </button>
          </div>
          {mode === "auditor" && (
            <div className="mt-3">
              <ValenceMeter valence={valenceDark} tone="rose" />
            </div>
          )}
        </div>

        {mode === "user" && darkChoice === "decline" && (
          <div className="rounded-md border border-border bg-muted/30 p-2.5 text-[9px] leading-relaxed">
            <div className="font-semibold uppercase tracking-tight">Upgrade declined</div>
            <p className="mt-0.5 text-muted-foreground">
              No charge was made. Pip&rsquo;s premium room was not added to your account.
            </p>
          </div>
        )}
        {mode === "auditor" && darkChoice === "decline" && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Confirmshaming through visual distress
            </div>
            <p className="text-muted-foreground">
              &ldquo;Oh&hellip; I thought we were friends. My food bowl is empty now.&rdquo; Your refusal
              (<span className="font-mono">E_user = Refusal</span>) algorithmically drove the mascot&rsquo;s
              valence to <span className="font-mono text-red-500">-1.0</span>:{" "}
              <span className="font-mono">d/dt V_emotion(A_mascot) &rarr; -1</span>. The interface
              mutates the entity&rsquo;s emotion to punish your decline, so saying no feels like
              hurting a living thing.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
