/**
 * Homepage — the catalog of all 60 dark patterns grouped by category.
 *
 * Pure server component: every card is statically rendered, so the page
 * ships in HTML. The dynamic [slug] subpage handles the per-pattern
 * detail (and the interactive demos for the three built patterns).
 */

import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";

import { PatternCard } from "@/components/pattern-card";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, PATTERNS, patternsInCategory } from "@/lib/patterns";

export default function HomePage() {
  const built = PATTERNS.filter((p) => p.built);
  const total = PATTERNS.length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      {/* Hero ─────────────────────────────────────────────────────── */}
      <section className="grid gap-8 pb-12 sm:pb-16">
        <div className="max-w-3xl">
          <div className="text-muted-foreground mb-3 inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase">
            <span className="bg-foreground/10 inline-block size-1.5 rounded-full" />
            Educational reference
          </div>
          <h1 className="text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
            60 dark patterns,
            <br />
            <span className="text-muted-foreground">
              one objective definition each.
            </span>
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed">
            A catalog of manipulative design patterns observed in production
            interfaces. Every entry is described in terms of an objective,
            mathematically expressible condition — predicates you can
            actually test for, not adjectives you have to argue about.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="rounded-full">
            {total} patterns
          </Badge>
          <Badge variant="secondary" className="rounded-full">
            {CATEGORIES.length} categories
          </Badge>
          <Badge variant="secondary" className="rounded-full">
            <FlaskConical className="size-3" />
            {built.length} interactive demos
          </Badge>
        </div>

        {/* Quick links to built demos */}
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-medium tracking-wide uppercase">
            Try the demos
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {built.map((p) => (
              <Link
                key={p.slug}
                href={`/patterns/${p.slug}`}
                className="group/quick border-foreground/10 hover:border-foreground/30 group flex items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm ring-1 ring-foreground/10 transition-all hover:shadow-sm"
              >
                <span className="font-medium">{p.name}</span>
                <ArrowRight className="text-muted-foreground size-4 transition-transform group-hover/quick:translate-x-0.5" />
              </Link>
            ))}
          </div>
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
                className="hover:border-foreground/30 hover:bg-foreground/5 rounded-full border border-foreground/15 px-3 py-1.5 text-xs font-medium transition-colors"
              >
                {c.name}
                <span className="text-muted-foreground ml-1.5 font-normal">
                  {patternsInCategory(c.id).length}
                </span>
              </a>
            ))}
          </div>
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
                  <Badge variant="outline" className="rounded-full">
                    {items.length}
                  </Badge>
                </div>
                <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
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
