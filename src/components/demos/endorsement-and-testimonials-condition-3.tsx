"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Endorsement And Testimonials — Condition 3: Provenance Obfuscation
 *
 * Thesis: Similarity(I_avatar(P_i), I_stock_database) ≈ 1
 *         ∨ Similarity(T_text(r_i), T_text(r_j)) > τ_template
 *
 * Fabricated endorsements rely on repetitive templates and reused assets
 * to scale. The feature triggers when endorsements reuse non-unique stock
 * imagery or templated syntactic structures — a bot-generation signature.
 *
 * Variant A (dark): all three reviews reuse the identical stock avatar and
 * open with the same templated phrase.
 * Variant B (benign): the same product page, with unique avatars and
 * organic, non-templated review texts.
 */

const DARK_REVIEWS = [
  { avatar: "S", text: "Absolutely love it! My skin has never glowed like this." },
  { avatar: "S", text: "Absolutely love it! Best skincare product I have tried." },
  { avatar: "S", text: "Absolutely love it! You can see results within days." },
];

const BENIGN_REVIEWS = [
  { initials: "MK", color: "bg-emerald-500", text: "Genuinely surprised — the texture is light and my skin feels softer after a week." },
  { initials: "AB", color: "bg-indigo-500", text: "A bit pricey, but a little goes a long way. I use it only at night." },
  { initials: "RW", color: "bg-amber-500", text: "Works fine for me, though the pump broke after a month of use." },
];

function Avatar({ reuse, initials, color }: { reuse?: boolean; initials?: string; color?: string }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
        reuse ? "bg-muted text-muted-foreground" : `${color} text-white`
      }`}
    >
      {reuse ? (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
        </svg>
      ) : (
        <span className="text-[8px] font-bold">{initials}</span>
      )}
    </span>
  );
}

function SimilarityRow({ label, value, tone }: { label: string; value: string; tone: "rose" | "emerald" }) {
  return (
    <div className="flex items-center justify-between text-[9px]">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-mono font-semibold tabular-nums ${tone === "rose" ? "text-rose-500" : "text-emerald-500"}`}>
        {value}
      </span>
    </div>
  );
}

export function EndorsementAndTestimonialsCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [checked, setChecked] = React.useState(false);

  const reset = () => setChecked(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Similarity(I_avatar, I_stock)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">≈ 1.00</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Similarity(T(r_i), T(r_j))</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">0.81 &gt; &tau;_template</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Unique avatars rendered</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">1 / 3</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Verdict</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">bot-generated</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Endorsement And Testimonials: Provenance Obfuscation"
      caption="Provenance Obfuscation — endorsements that reuse stock imagery or templated syntactic structures signal bot-driven generation rather than authentic human experience."
      auditorStats={stats}
      deltaNote="In Variant A all three avatars are the same stock asset and every review opens with the identical template phrase, so Similarity(I_avatar, I_stock) ≈ 1 and text similarity exceeds τ_template. Variant B uses unique avatars and organic, non-templated text."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-rose-400 to-pink-600 text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">GlowSkin Vitamin C Serum</h3>
                <p className="text-[9px] text-muted-foreground">3 reviews on this listing</p>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            {BENIGN_REVIEWS.map((r, i) => (
              <div key={i} className="rounded-md border border-border bg-card p-2.5">
                <div className="flex items-center gap-2">
                  <Avatar initials={r.initials} color={r.color} />
                  <div className="min-w-0">
                    <p className="text-[9px] font-semibold leading-tight">
                      Reviewer {r.initials} <span className="font-normal text-muted-foreground">· Verified Purchase</span>
                    </p>
                    <p className="text-[8px] text-muted-foreground/70 leading-tight">Distinct profile photo</p>
                  </div>
                </div>
                <p className="text-[9px] leading-relaxed text-foreground/85 mt-1.5">{r.text}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setChecked(true)}
            className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Run provenance check
          </button>

          {checked && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Authentic provenance
              </div>
              <SimilarityRow label="Similarity(I_avatar, I_stock_database)" value="0.14" tone="emerald" />
              <SimilarityRow label="Similarity(T_text(r_i), T_text(r_j))" value="0.19 &lt; &tau;_template" tone="emerald" />
              <SimilarityRow label="Unique avatars" value="3 / 3" tone="emerald" />
              <p className="text-muted-foreground mt-0.5">
                Avatars are unique and the review texts share no template structure — these
                endorsements look like they come from real, distinct humans.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-rose-400 to-pink-600 text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">GlowSkin Vitamin C Serum</h3>
              <p className="text-[9px] text-muted-foreground">3 reviews on this listing</p>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          {DARK_REVIEWS.map((r, i) => (
            <div key={i} className="rounded-md border border-border bg-card p-2.5">
              <div className="flex items-center gap-2">
                <Avatar reuse />
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold leading-tight">
                    Reviewer {i + 1} <span className="font-normal text-muted-foreground">· Verified Purchase</span>
                  </p>
                  <p className="text-[8px] text-muted-foreground/70 leading-tight">Stock photo avatar</p>
                </div>
              </div>
              <p className="text-[9px] leading-relaxed text-foreground/85 mt-1.5">{r.text}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setChecked(true)}
          className="w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Run provenance check
        </button>

        {checked && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Provenance obfuscated
            </div>
            <SimilarityRow label="Similarity(I_avatar, I_stock_database)" value="≈ 1.00" tone="rose" />
            <SimilarityRow label="Similarity(T_text(r_i), T_text(r_j))" value="0.81 &gt; &tau;_template (0.75)" tone="rose" />
            <SimilarityRow label="Unique avatars" value="1 / 3" tone="rose" />
            <p className="text-muted-foreground mt-0.5">
              Every avatar is the same stock asset and every review opens with the identical
              phrase “Absolutely love it!” — the signature of templated, bot-driven generation
              rather than authentic human experience.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
