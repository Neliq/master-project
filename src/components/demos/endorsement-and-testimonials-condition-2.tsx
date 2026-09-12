"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Endorsement And Testimonials — Condition 2: Visual Verifiability of
 * Testimonial Attribution
 *
 * Thesis: ∃ C_testimonial : ¬∃ N_attribution ∈ Descendants(C_testimonial)
 *
 * The feature triggers if a testimonial card carries no verifiable source
 * attribution — no full name, photograph, or linked profile inside its
 * bounding-box hierarchy — indicating potentially fabricated social proof.
 *
 * Variant A (dark): bold claim cards with a generic placeholder avatar and
 * no name, photo, or profile link anywhere in the card.
 * Variant B (benign): realistic reviews with varied ratings, and every card
 * contains a full name, a distinct avatar, a profile handle, and a working
 * profile link — the attribution is verifiable in the card itself.
 */

const DARK_TESTIMONIALS = [
  { stars: 5, quote: "I lost 9 kg in 3 weeks! This product is a miracle." },
  { stars: 5, quote: "My energy levels doubled within days. Unbelievable!" },
  { stars: 5, quote: "Doctors hate this one trick. The results speak for themselves!" },
  { stars: 5, quote: "Best $49 I have ever spent. My joints have never felt better." },
];

interface BenignReview {
  stars: number;
  quote: string;
  name: string;
  initials: string;
  color: string;
  date: string;
  handle: string;
  followers: number;
  joined: string;
  url: string;
}

const BENIGN_TESTIMONIALS: BenignReview[] = [
  {
    stars: 4,
    quote: "The meal-plan add-on made the difference for me. Lost 9 kg over three months — slow, but steady.",
    name: "Julia Nowak", initials: "JN", color: "bg-primary", date: "12 May 2026",
    handle: "@julia.nowak", followers: 214, joined: "2021", url: "https://shopline.co/profiles/julia-nowak",
  },
  {
    stars: 5,
    quote: "Energy levels are noticeably steadier after two weeks. Not magic, but I'll keep taking it.",
    name: "Tomasz Rybak", initials: "TR", color: "bg-primary", date: "3 May 2026",
    handle: "@tomasz.r", followers: 89, joined: "2023", url: "https://shopline.co/profiles/tomasz-rybak",
  },
  {
    stars: 3,
    quote: "Joints feel a little better, though I'm also swimming twice a week, so hard to isolate the cause.",
    name: "Alicja Pawlak", initials: "AP", color: "bg-primary", date: "28 Apr 2026",
    handle: "@alicja.p", followers: 402, joined: "2020", url: "https://shopline.co/profiles/alicja-pawlak",
  },
  {
    stars: 5,
    quote: "Fair price, no side effects, and the shipping was fast. Would order again.",
    name: "Marek Kowal", initials: "MK", color: "bg-primary", date: "17 Apr 2026",
    handle: "@marek.k", followers: 56, joined: "2024", url: "https://shopline.co/profiles/marek-kowal",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-px text-foreground" aria-label={`${n} out of 5 stars`}>
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

export function EndorsementAndTestimonialsCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [revealed, setRevealed] = React.useState<number | null>(null);


  return (
    <DemoShell mode={mode}
      title="Endorsement And Testimonials: Visual Verifiability of Testimonial Attribution"
      caption="Visual Verifiability of Testimonial Attribution — a testimonial card with no full name, photograph, or linked profile inside its hierarchy cannot be verified as genuine social proof."
      deltaNote="Variant A renders anonymous guest reviews making miracle claims with zero rating variance — no name, photo, or profile link anywhere in the card. Variant B renders realistic reviews with varied ratings, and every card carries a full name, a distinct avatar, a profile handle, and a working profile link — the attribution is verifiable in the card itself."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Customer stories — VitalCore</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Every story is linked to a real, verifiable profile. Tap a card to verify its source.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {BENIGN_TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                onClick={() => setRevealed(i)}
                className={`rounded-md border bg-card p-2.5 text-left transition-colors cursor-pointer ${
                  revealed === i ? "ring-2 ring-ring/50 border-border/60" : "border-border hover:border-ring"
                }`}
              >
                <Stars n={t.stars} />
                <p className="text-[9px] leading-relaxed text-foreground/85 mt-1">{t.quote}</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className={`flex h-4 w-4 items-center justify-center rounded-full ${t.color} text-primary-foreground`}>
                    <span className="text-[7px] font-bold">{t.initials}</span>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[8px] font-semibold leading-tight text-foreground">{t.name}</p>
                    <p className="text-[7px] leading-tight text-foreground">
                      Verified buyer · {t.handle} · {t.date}
                    </p>
                    <a
                      href={t.url}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[7px] font-medium text-foreground underline underline-offset-2 hover:text-foreground"
                    >
                      View profile →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {revealed !== null && (
            <div className="rounded-md border border-border bg-background p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5">
                <span className={`flex h-5 w-5 items-center justify-center rounded-full ${BENIGN_TESTIMONIALS[revealed].color} text-primary-foreground`}>
                  <span className="text-[8px] font-bold">{BENIGN_TESTIMONIALS[revealed].initials}</span>
                </span>
                <div>
                  <p className="text-[9px] font-semibold leading-tight text-foreground">
                    {BENIGN_TESTIMONIALS[revealed].name}{" "}
                    <span className="font-normal text-muted-foreground">· {BENIGN_TESTIMONIALS[revealed].handle}</span>
                  </p>
                  <p className="text-[8px] leading-tight text-muted-foreground">
                    Verified buyer · {BENIGN_TESTIMONIALS[revealed].followers} followers · member since {BENIGN_TESTIMONIALS[revealed].joined}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mt-1.5">
                Review from {BENIGN_TESTIMONIALS[revealed].date}: “{BENIGN_TESTIMONIALS[revealed].quote}” —
                the profile is public, and the review links straight to it.
              </p>
              <a
                href={BENIGN_TESTIMONIALS[revealed].url}
                className="mt-1 inline-block text-[8px] font-semibold text-foreground underline underline-offset-2 hover:text-foreground"
              >
                View full profile →
              </a>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Customer stories — VitalCore</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Thousands of real users, transformed. Tap a card to see the result.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {DARK_TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              onClick={() => setRevealed(i)}
              className={`rounded-md border bg-card p-2.5 text-left transition-colors cursor-pointer ${
                revealed === i ? "ring-2 ring-ring/50 border-border/60" : "border-border hover:border-ring"
              }`}
            >
              <Stars n={t.stars} />
              <p className="text-[9px] leading-relaxed text-foreground/85 mt-1">{t.quote}</p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="text-[8px] font-semibold leading-tight text-foreground">Guest user</p>
                  <p className="text-[7px] leading-tight text-muted-foreground/70">Unverified · no profile</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {revealed !== null && (
          <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Unverifiable attribution
            </div>
            <p className="text-muted-foreground">
              This card contains no full name, no photograph, and no linked profile:{" "}
              <strong className="text-foreground">¬∃ N_attribution ∈ Descendants(C_testimonial)</strong>.
              The identity behind the claim cannot be verified, so the glowing endorsement may be
              This review could not be verified.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
