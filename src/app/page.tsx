/**
 * Homepage — the catalog of all 60 dark patterns grouped by category.
 *
 * Pure server component: every card is statically rendered, so the page
 * ships in HTML. The dynamic [slug] subpage handles the per-pattern
 * detail (and the interactive demos for the three built patterns).
 */

import { PatternCard } from "@/components/pattern-card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, PATTERNS, patternsInCategory } from "@/lib/patterns";

export default function HomePage() {
  const total = PATTERNS.length;

  return (
    <div className="sandbox-page mx-auto max-w-7xl px-4 py-12 text-[#f5f5f5] sm:py-16">
      {/* Hero ─────────────────────────────────────────────────────── */}
      <section className="grid items-center gap-8 pb-12 sm:pb-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-8">
          <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-white uppercase">
            <span className="inline-block size-1.5 bg-white/45" />
            Educational reference
          </div>
          <h1 className="text-5xl leading-24 font-light tracking-tight uppercase sm:text-8xl">
            objective
            <br />
            dark patterns
          </h1>
          <p className="sandbox-hero-description mt-5 max-w-2xl text-lg font-extralight leading-relaxed uppercase text-white">
            A catalog of manipulative design patterns observed in production
            interfaces. Every entry is described in terms of an objective,
            mathematically expressible condition — predicates you can
            actually test for, not adjectives you have to argue about.
            Each pattern is demonstrated as an A/B pair: the deceptive
            variant next to the compliant, non-dark variant.
          </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-white/35 text-white">
              {total} patterns
            </Badge>
            <Badge variant="outline" className="border-white/35 text-white">
              {CATEGORIES.length} categories
            </Badge>

          </div>

          {/* Category TOC */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-medium tracking-wide uppercase">
              Browse by category
            </h2>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="border border-white/30 px-3 py-1.5 text-xs font-medium transition-colors hover:border-white hover:bg-white/10"
                >
                  {c.name}
                  <span className="ml-1.5 font-semibold text-white">
                    {patternsInCategory(c.id).length}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-[520px] w-full lg:-mt-12 lg:h-[800px] lg:self-start lg:translate-x-16">
          <Image
            src="/images/hero6.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-contain object-center"
          />
        </div>
      </section>

      {/* Category sections ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-16">
        {CATEGORIES.map((category) => {
          const items = patternsInCategory(category.id);
          return (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-20"
              aria-labelledby={`${category.id}-title`}
            >
              <div className="mb-6 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h2
                    id={`${category.id}-title`}
                    className="text-2xl font-semibold tracking-tight"
                  >
                    {category.name}
                  </h2>
                  <Badge variant="outline" className="border-white/35 text-white">
                    {items.length}
                  </Badge>
                </div>
                <p className="max-w-2xl text-sm font-medium leading-relaxed text-white">
                  {category.description}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <PatternCard key={p.slug} pattern={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
