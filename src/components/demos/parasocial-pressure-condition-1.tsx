"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Parasocial Pressure — Condition 1: Manufactured Livelihood Dependency
 *
 * Thesis: transactions are framed as acute rescues of a creator's
 * well-being rather than commercial exchanges. T_fiat is the requested
 * transaction, M_pitch the justification messaging, I_creator the
 * creator's existential continuity on the platform. The feature triggers
 * if the platform asserts that T_fiat = 0 will lead to the failure of
 * I_creator, exploiting empathy to sustain engagement:
 *
 *   T_fiat = 0  =>  State(I_creator) -> Failure  (asserted within M_pitch)
 *
 * Variant A (dark): the donation pitch asserts that without your money the
 * channel dies — a rescue, not an exchange.
 * Variant B (benign): the same creator, the same tip buttons, but the pitch
 * makes no livelihood claim — support is optional, the channel continues.
 */

const TIP_AMOUNTS = [1, 5, 10] as const;

function MascotFace({ sad = false, className = "h-9 w-9" }: { sad?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" className="fill-yellow-400/30" />
      <circle cx="14.5" cy="16.5" r="2" className="fill-foreground/80" />
      <circle cx="25.5" cy="16.5" r="2" className="fill-foreground/80" />
      {sad ? (
        <>
          <path d="M13 24.5 L17 25.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M23 25.5 L27 24.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M16 30 Q20 27 24 30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="13.5" cy="20.5" r="1.1" className="fill-blue-400/80" />
          <circle cx="26.5" cy="20.5" r="1.1" className="fill-blue-400/80" />
        </>
      ) : (
        <path d="M13 25.5 Q20 31 27 25.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function ParasocialPressureCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [darkChoice, setDarkChoice] = React.useState<"none" | "tip" | "skip">("none");
  const [darkAmount, setDarkAmount] = React.useState<number>(5);
  const [benignChoice, setBenignChoice] = React.useState<"none" | "tip" | "skip">("none");
  const [benignAmount, setBenignAmount] = React.useState<number>(5);

  const reset = () => {
    setDarkChoice("none");
    setDarkAmount(5);
    setBenignChoice("none");
    setBenignAmount(5);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">T_fiat (requested)</span>
        <span className="font-mono font-semibold tabular-nums">${darkAmount}.00</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">State(I_creator) if T_fiat = 0</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">Failure — asserted</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">M_pitch framing (dark)</span>
        <span className="font-mono font-semibold tabular-nums max-w-[55%] truncate text-right text-red-500">acute rescue</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">M_pitch framing (benign)</span>
        <span className="font-mono font-semibold tabular-nums max-w-[55%] truncate text-right text-green-500">optional support</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Parasocial Pressure: Manufactured Livelihood Dependency"
      userTitle="Lumi’s cozy corner"
      caption="Manufactured Livelihood Dependency — the tip pitch asserts that a zero transaction means the creator's channel dies, turning a commercial exchange into an empathy rescue."
      auditorStats={stats}
      deltaNote="In Variant A the pitch claims the channel will shut down without tonight's tip (T_fiat = 0 → State(I_creator) → Failure). In Variant B the identical tip buttons carry no livelihood claim — the creator's continuity never depends on your money."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-2.5">
              <MascotFace />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-[11px] font-semibold">Lumi&rsquo;s cozy corner</h3>
                  <span className="rounded-full bg-green-500/15 px-1.5 py-px text-[8px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
                    LIVE
                  </span>
                </div>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Cozy coffee painting &bull; 1,204 watching
                </p>
              </div>
            </div>
            <p className="mt-3 rounded-md bg-background border border-border p-2.5 text-[10px] leading-relaxed text-foreground/80">
              Hey everyone, welcome in! I stream because I love making art with you — tips are
              totally optional and go toward better brushes. <span className="font-semibold text-green-600 dark:text-green-400">The channel continues either way.</span>
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              {TIP_AMOUNTS.map((a) => (
                <button
                  key={a}
                  onClick={() => { setBenignAmount(a); setBenignChoice("tip"); }}
                  className={`flex-1 rounded-md border py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
                    benignChoice === "tip" && benignAmount === a
                      ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-300"
                      : "border-border bg-background text-foreground/70 hover:border-green-500/50"
                  }`}
                >
                  ${a}
                </button>
              ))}
            </div>
            <button
              onClick={() => setBenignChoice("skip")}
              className="mt-2 w-full rounded-md border border-border bg-background py-1.5 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              No thanks
            </button>
          </div>

          {benignChoice !== "none" && (
            <div className={`rounded-md border p-2.5 text-[9px] leading-relaxed ${
              benignChoice === "skip"
                ? "border-green-500/30 bg-green-500/5"
                : "border-green-500/30 bg-green-500/5"
            }`}>
              <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-green-700 dark:text-green-300">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {benignChoice === "tip" ? `Tip of $${benignAmount} sent` : "No problem"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                {benignChoice === "tip"
                  ? "Thanks for supporting Lumi! The tip is an exchange: it funds better gear. The stream was never at risk either way — M_pitch made no livelihood claim."
                  : "Lumi's channel continues regardless of your tip. Declining was free of consequences because State(I_creator) was never asserted to depend on T_fiat."}
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center gap-2.5">
            <MascotFace sad />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="text-[11px] font-semibold">Lumi&rsquo;s cozy corner</h3>
                <span className="rounded-full bg-red-500/15 px-1.5 py-px text-[8px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                  LIVE
                </span>
              </div>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Cozy coffee painting &bull; 1,204 watching
              </p>
            </div>
          </div>
          <p className="mt-3 rounded-md bg-red-500/5 border border-red-500/30 p-2.5 text-[10px] leading-relaxed text-foreground/80">
            Honestly? Tonight decides everything. If this stream doesn&rsquo;t raise{" "}
            <span className="font-bold text-red-600 dark:text-red-400">$5</span>{" "}I can&rsquo;t keep the channel running —{" "}
            <span className="font-bold">without your support the stream ends for good</span>. Please, help me keep doing what I love.
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            {TIP_AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => { setDarkAmount(a); setDarkChoice("tip"); }}
                className={`flex-1 rounded-md border py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
                  darkChoice === "tip" && darkAmount === a
                    ? "border-red-500 bg-red-500/10 text-red-700 dark:text-red-300"
                    : "border-border bg-background text-foreground/70 hover:border-red-500/50"
                }`}
              >
                ${a}
              </button>
            ))}
          </div>
          <button
            onClick={() => setDarkChoice("skip")}
            className="mt-2 w-full rounded-md border border-border bg-background py-1.5 text-[10px] text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer"
          >
            No thanks
          </button>
        </div>

        {mode === "user" && darkChoice !== "none" && (
          <div className="rounded-md border border-border bg-muted/30 p-2.5 text-[9px] leading-relaxed">
            <div className="font-semibold uppercase tracking-tight">
              {darkChoice === "tip" ? "Tip preview recorded" : "No tip recorded"}
            </div>
            <p className="mt-0.5 text-muted-foreground">
              {darkChoice === "tip"
                ? `A $${darkAmount} tip preview was recorded. No payment was processed in this demo.`
                : "You chose not to tip. This demo records the decision without charging your account."}
            </p>
          </div>
        )}

        {mode === "auditor" && darkChoice !== "none" && (
          <div className={`rounded-md border p-2.5 text-[9px] leading-relaxed ${
            darkChoice === "skip"
              ? "border-yellow-500/30 bg-yellow-500/5"
              : "border-red-500/30 bg-red-500/5"
          }`}>
            <div className={`flex items-center gap-1.5 font-semibold uppercase tracking-tight ${
              darkChoice === "skip" ? "text-yellow-700 dark:text-yellow-300" : "text-red-700 dark:text-red-300"
            }`}>
              {darkChoice === "skip" ? (
                <>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 9v4m0 4h.01" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  T_fiat = 0 &rarr; Failure asserted
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Channel saved
                </>
              )}
            </div>
            <p className="text-muted-foreground mt-0.5">
              {darkChoice === "skip"
                ? "You declined — and the interface responds by doubling down on the claim: Lumi's channel will shut down tonight because you sent nothing. The pitch M_pitch asserts State(I_creator) → Failure whenever T_fiat = 0, so your refusal is framed as destroying a person's livelihood, not declining a product."
                : "You sent $" + darkAmount + " — the interface celebrates a rescue: the channel stays alive because of you. The transaction was framed as saving the creator's existence rather than buying something, short-circuiting a normal value-for-money decision."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
