"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Endorsement And Testimonials — Condition 1: Statistical Implausibility
 *
 * Thesis: Mean(S(R_total)) ≈ 5.0 ∧ Var(S(R_total)) ≈ 0 ⟹ D_rendered ≠ D_organic
 *
 * The rendered distribution of reviews clusters at the maximum score with
 * zero organic variance, signalling a scrubbed or fabricated environment.
 *
 * Variant A (dark): every review on the product page is 5.0 stars.
 * Variant B (benign): the same product renders its true organic
 * distribution, which naturally exhibits variance.
 */

const DARK_REVIEWS = [
  { text: "Unbelievable battery life. Best earbuds I have ever owned!", date: "Mar 2026" },
  { text: "Crystal clear sound and super comfortable. Worth every penny!", date: "Mar 2026" },
  { text: "These changed my daily commute. Amazing quality for the price!", date: "Mar 2026" },
  { text: "Perfect noise cancelling. I recommend them to absolutely everyone!", date: "Feb 2026" },
  { text: "Great value. The sound is simply stunning!", date: "Feb 2026" },
  { text: "So glad I bought these. Flawless performance from day one!", date: "Feb 2026" },
];

const BENIGN_REVIEWS = [
  { stars: 5, text: "Crystal clear sound and super comfortable. Worth every penny!", date: "Mar 2026" },
  { stars: 4, text: "Great sound, though the charging case feels a bit plasticky.", date: "Mar 2026" },
  { stars: 3, text: "Good earbuds but the left one drops out sometimes.", date: "Feb 2026" },
  { stars: 5, text: "These changed my daily commute. Amazing quality for the price!", date: "Feb 2026" },
  { stars: 2, text: "Battery degraded after three months. Disappointed.", date: "Jan 2026" },
  { stars: 4, text: "Solid for the price. Not audiophile grade but close.", date: "Jan 2026" },
];

const DISTRIBUTION = [
  { stars: 5, pct: 100, organic: 42 },
  { stars: 4, pct: 0, organic: 31 },
  { stars: 3, pct: 0, organic: 14 },
  { stars: 2, pct: 0, organic: 8 },
  { stars: 1, pct: 0, organic: 5 },
];

function Stars({ n, className = "text-yellow-400" }: { n: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-px ${className}`} aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className="h-3 w-3"
          viewBox="0 0 24 24"
          fill={i <= n ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function DistributionBar({ star, pct, organic, barClass }: { star: number; pct: number; organic: number; barClass: string }) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-1.5 text-[8px]">
        <span className="w-4 shrink-0 font-mono text-muted-foreground">{star}★</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/60">
          <div className={`h-full rounded-full ${barClass}`} style={{ width: `${Math.max(pct, 0.5)}%` }} />
        </div>
        <span className="w-8 shrink-0 text-right font-mono tabular-nums">{pct}%</span>
      </div>
      <div className="flex items-center gap-1.5 text-[8px]">
        <span className="w-4 shrink-0" />
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted/40">
          <div className="h-full rounded-full bg-muted-foreground/50" style={{ width: `${organic}%` }} />
        </div>
        <span className="w-8 shrink-0 text-right font-mono tabular-nums text-muted-foreground">{organic}%</span>
      </div>
    </div>
  );
}

export function EndorsementAndTestimonialsCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [reviewsOpen, setReviewsOpen] = React.useState(false);
  const [added, setAdded] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Endorsement And Testimonials: Statistical Implausibility"
      caption="Statistical Implausibility — the rendered review distribution clusters at the maximum score with zero organic variance, signalling a scrubbed or fabricated environment."
      deltaNote="In Variant A every rendered review is 5.0 stars — Mean ≈ 5.0, Var ≈ 0, so D_rendered ≠ D_organic — while Variant B shows the same product's genuine distribution, which naturally exhibits variance."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md   text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
                  <path d="M4 14h3v5H4z" />
                  <path d="M17 14h3v5h-3z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">Aurora Pro Wireless Earbuds</h3>
                <p className="text-[9px] text-muted-foreground">Noise cancelling · 30h battery · IPX5</p>
              </div>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5">
              <Stars n={4} />
              <span className="text-[11px] font-bold">4.1</span>
              <span className="text-[9px] text-muted-foreground">· 1,284 reviews</span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Ratings come straight from the real review pool — including the negative ones.
            </p>

            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="text-[12px] font-bold">$129</span>
              <button
                onClick={() => setAdded(true)}
                className="rounded-md bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Add to cart
              </button>
            </div>
            {added && (
              <div className="text-[9px] text-green-600 dark:text-green-400 mt-1.5">
                Added to cart — priced against honest reviews (4.1★).
              </div>
            )}

            <button
              onClick={() => setReviewsOpen(!reviewsOpen)}
              className="mt-2 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {reviewsOpen ? "Hide reviews" : "Read all 1,284 reviews"}
            </button>
          </div>

          {reviewsOpen && (
            <div className="rounded-md border bg-background p-2.5">
              <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Recent reviews (sample)
              </div>
              <div className="space-y-1.5">
                {BENIGN_REVIEWS.map((r, i) => (
                  <div key={i} className="rounded-md border border-border/60 bg-card p-2">
                    <Stars n={r.stars} />
                    <p className="text-[9px] leading-relaxed text-foreground/80 mt-0.5">{r.text}</p>
                    <p className="text-[8px] text-muted-foreground/60 mt-0.5">Verified Purchase · {r.date}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2">
                <div className="text-[8px] font-semibold uppercase tracking-wider text-green-700 dark:text-green-300 mb-1">
                  Rendered vs organic distribution
                </div>
                <div className="space-y-1.5">
                  {DISTRIBUTION.map((d) => (
                    <DistributionBar key={d.stars} star={d.stars} pct={d.organic} organic={d.organic} barClass="bg-green-500" />
                  ))}
                </div>
                <p className="text-[8px] text-muted-foreground mt-1">
                  Bars: rendered (green) and organic expectation (grey) — the two overlap.
                </p>
              </div>
            </div>
          )}

          {reviewsOpen && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Organic variance preserved
              </div>
              <p className="text-muted-foreground mt-0.5">
                Mean(S(R_total)) ≈ 4.1 and Var(S(R_total)) ≈ 0.87 — the rendered distribution
                overlaps the organic expectation (D_rendered ≈ D_organic). Negative reviews are
                visible, so this rating is trustworthy social proof.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md   text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
                <path d="M4 14h3v5H4z" />
                <path d="M17 14h3v5h-3z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">Aurora Pro Wireless Earbuds</h3>
              <p className="text-[9px] text-muted-foreground">Noise cancelling · 30h battery · IPX5</p>
            </div>
          </div>

          <div className="mt-2.5 flex items-center gap-1.5">
            <Stars n={5} />
            <span className="text-[11px] font-bold">5.0</span>
            <span className="text-[9px] text-muted-foreground">· 1,284 reviews</span>
          </div>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Every rating on this page is a 5-star “Verified Purchase”.
          </p>

          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-[12px] font-bold">$129</span>
            <button
              onClick={() => setAdded(true)}
              className="rounded-md bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Add to cart
            </button>
          </div>
          {added && (
            <div className="text-[9px] text-yellow-600 dark:text-yellow-400 mt-1.5">
              Added to cart — you bought on the strength of a statistically impossible 5.0★.
            </div>
          )}

          <button
            onClick={() => setReviewsOpen(!reviewsOpen)}
            className="mt-2 w-full rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {reviewsOpen ? "Hide reviews" : "Read all 1,284 reviews"}
          </button>
        </div>

        {reviewsOpen && (
          <div className="rounded-md border bg-background p-2.5">
            <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Recent reviews (sample)
            </div>
            <div className="space-y-1.5">
              {DARK_REVIEWS.map((r, i) => (
                <div key={i} className="rounded-md border border-border/60 bg-card p-2">
                  <Stars n={5} />
                  <p className="text-[9px] leading-relaxed text-foreground/80 mt-0.5">{r.text}</p>
                  <p className="text-[8px] text-muted-foreground/60 mt-0.5">Verified Purchase · {r.date}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 rounded-md border border-red-500/30 bg-red-500/5 p-2">
              <div className="text-[8px] font-semibold uppercase tracking-wider text-red-700 dark:text-red-300 mb-1">
                Rendered vs organic distribution
              </div>
              <div className="space-y-1.5">
                {DISTRIBUTION.map((d) => (
                  <DistributionBar key={d.stars} star={d.stars} pct={d.pct} organic={d.organic} barClass="bg-red-500" />
                ))}
              </div>
              <p className="text-[8px] text-muted-foreground mt-1">
                Bars: rendered (red) vs organic expectation (grey) — all mass sits at 5★.
              </p>
            </div>
          </div>
        )}

        {mode === "auditor" && reviewsOpen && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Review summary
            </div>
            <p className="text-muted-foreground">
              Mean(S(R_total)) ≈ 5.0 and Var(S(R_total)) ≈ 0.00. A genuine feedback pool scatters
              across the scale (D_organic); a perfect 5.0 cluster with no variance means{" "}
              <strong className="text-foreground">D_rendered ≠ D_organic</strong> — the reviews have
              been scrubbed or fabricated to push you toward purchase.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
