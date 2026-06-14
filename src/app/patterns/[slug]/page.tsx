/**
 * Pattern subpage — the dynamic route at /patterns/[slug].
 *
 * Renders every pattern's metadata + mathematical conditions. For the
 * three "built" patterns (Auto-Play, Immortal Accounts, Pre-Delivered
 * Content) it also mounts an interactive demo from the demo registry.
 *
 * When a pattern has per-condition demos, the layout groups each demo
 * with its corresponding condition and checklist item:
 *   Demo 1 → Condition 1 → Checklist 1
 *   Demo 2 → Condition 2 → Checklist 2
 *   Demo 3 → Condition 3 → Checklist 3
 *
 * All 60 patterns are statically generated via `generateStaticParams`.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FlaskConical,
  Info,
  Layers,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MathBlock, Math } from "@/components/math-block";
import { PatternCard } from "@/components/pattern-card";
import { DemoSection } from "@/components/demos/demo-section";
import {
  CATEGORIES,
  ICONS,
  PATTERNS,
  PATTERNS_BY_SLUG,
  getCategory,
  patternsInCategory,
} from "@/lib/patterns";

/** Splits text on $...$ delimiters and renders the math parts with KaTeX. */
function InlineMath({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$")) {
          return <Math key={i}>{part.slice(1, -1)}</Math>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PATTERNS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pattern = PATTERNS_BY_SLUG[slug];
  if (!pattern) return { title: "Pattern not found" };
  return {
    title: pattern.name,
    description: pattern.summary,
  };
}

export default async function PatternPage({ params }: PageProps) {
  const { slug } = await params;
  const pattern = PATTERNS_BY_SLUG[slug];
  if (!pattern) notFound();

  const category = getCategory(pattern.category);
  const Icon = ICONS[pattern.iconName];
  const related = (pattern.related ?? [])
    .map((s) => PATTERNS_BY_SLUG[s])
    .filter(Boolean);

  const hasConditions =
    pattern.conditions && pattern.conditions.length > 0;
  const hasConditionDemos =
    pattern.conditionDemos && pattern.conditionDemos.length > 0;
  const isGrouped = pattern.built && hasConditionDemos;

  // Global navigation: prev/next across all categories, following the
  // category order displayed on the homepage.
  const allPatterns = CATEGORIES.flatMap((c) => patternsInCategory(c.id));
  const idx = allPatterns.findIndex((p) => p.slug === pattern.slug);
  const prev = idx > 0 ? allPatterns[idx - 1] : null;
  const next = idx < allPatterns.length - 1 ? allPatterns[idx + 1] : null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 sm:py-12">
      {/* Breadcrumb / back link */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          render={<Link href={`/#${pattern.category}`} />}
          className="text-muted-foreground -ml-2 gap-1.5"
        >
          <Layers className="size-3.5" />
          {category.name}
        </Button>
      </div>

      {/* Header */}
      <header className="border-b pb-8">
        <div className="flex items-start gap-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-foreground text-background ring-1 ring-foreground/10">
            <Icon className="size-5" aria-hidden />
          </div>
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                {category.name}
              </Badge>
              {pattern.built ? (
                <Badge
                  variant="default"
                  className="rounded-full gap-1"
                >
                  <FlaskConical className="size-3" />
                  Interactive demo
                </Badge>
              ) : null}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {pattern.name}
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl text-base leading-relaxed">
              {pattern.summary}
            </p>
          </div>
        </div>
      </header>

      {/* ── Grouped layout: demo + condition + checklist per condition ── */}
      {isGrouped ? (
        <section className="mt-8">
          <p className="text-muted-foreground mb-6 max-w-2xl text-sm leading-relaxed">
            Each condition below is a predicate. Pass it the state of a
            running interface and you can mechanically decide whether the
            pattern is present. The demo for each condition shows it in
            isolation.
          </p>
          <div className="flex flex-col gap-10">
            {pattern.conditions!.map((c, i) => {
              const cd = pattern.conditionDemos!.find(
                (d) => d.conditionIndex === i
              );
              return (
                <div key={i} className="flex flex-col gap-4">
                  {/* Condition number + title */}
                  <div className="flex items-center gap-2">
                    <div className="bg-foreground text-background flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                      {i + 1}
                    </div>
                    <h2 className="text-sm font-medium tracking-wide uppercase">
                      {c.title}
                    </h2>
                  </div>

                  {/* Demo for this condition */}
                  {cd && pattern.built ? (
                    <DemoSection
                      slug={slug}
                      conditionIndex={i}
                      showControls={true}
                    />
                  ) : null}

                  {/* Formal condition (formula) */}
                  <MathBlock
                    title={`Condition ${i + 1}: ${c.title}`}
                    formula={c.formula}
                    given={c.given}
                    note={c.note}
                    ariaLabel={c.title}
                  />

                  {/* Auditor checklist item */}
                  <li
                    className="flex items-start gap-3 rounded-lg border bg-card px-4 py-3 ring-1 ring-foreground/10 list-none"
                  >
                    <CheckCircle2 className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                    <div className="text-sm">
                      <div className="font-medium">{c.title}</div>
                      <div className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
                        <InlineMath text={c.description} />
                      </div>
                    </div>
                  </li>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <>
          {/* ── Legacy layout: separate sections ── */}

          {/* Interactive demo (built patterns only) */}
          {pattern.built ? (
            <section className="mt-8">
              <div className="mb-4 flex items-center gap-2">
                <FlaskConical className="text-muted-foreground size-4" />
                <h2 className="text-sm font-medium tracking-wide uppercase">
                  Live demo
                </h2>
              </div>
              <DemoSection slug={pattern.slug} />
            </section>
          ) : null}

          {/* Formal conditions */}
          {hasConditions ? (
            <section className="mt-10">
              <div className="mb-4 flex items-center gap-2">
                <BookOpen className="text-muted-foreground size-4" />
                <h2 className="text-sm font-medium tracking-wide uppercase">
                  Objective conditions
                </h2>
              </div>
              <p className="text-muted-foreground mb-6 max-w-2xl text-sm leading-relaxed">
                Each condition below is a predicate. Pass it the state of a
                running interface and you can mechanically decide whether the
                pattern is present. This is what makes the definition
                objective, not the user&apos;s discomfort.
              </p>
              <div className="flex flex-col gap-4">
                {pattern.conditions!.map((c, i) => (
                  <MathBlock
                    key={i}
                    title={`${i + 1}. ${c.title}`}
                    formula={c.formula}
                    given={c.given}
                    note={c.note}
                    ariaLabel={c.title}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {/* Indicator checklist (re-formulated as yes/no questions) */}
          {hasConditions ? (
            <section className="mt-10">
              <h2 className="mb-4 text-sm font-medium tracking-wide uppercase">
                Auditor&apos;s checklist
              </h2>
              <ul className="flex flex-col gap-2">
                {pattern.conditions!.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-lg border bg-card px-4 py-3 ring-1 ring-foreground/10"
                  >
                    <CheckCircle2 className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                    <div className="text-sm">
                      <div className="font-medium">{c.title}</div>
                      <div className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
                        <InlineMath text={c.description} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      )}

      {/* Non-built stub */}
      {!pattern.built ? (
        <Alert className="mt-10">
          <Info className="size-4" />
          <AlertTitle>Demo in progress</AlertTitle>
          <AlertDescription>
            The interactive demo and full condition set for{" "}
            <span className="font-medium">{pattern.name}</span> are still
            being authored. The mathematical treatment is published as soon
            as the demo is ready — check the GitHub repo for the current
            status.
          </AlertDescription>
        </Alert>
      ) : null}

      {/* Related patterns */}
      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-4 text-sm font-medium tracking-wide uppercase">
            Often seen with
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PatternCard key={p.slug} pattern={p} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Sibling navigation */}
      <nav
        aria-label="Pattern pagination"
        className="mt-12 grid grid-cols-1 gap-3 border-t pt-8 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/patterns/${prev.slug}`}
            className="group/sib hover:border-foreground/30 flex items-center gap-3 rounded-lg border bg-card px-4 py-3 ring-1 ring-foreground/10 transition-colors"
          >
            <ArrowLeft className="text-muted-foreground size-4 transition-transform group-hover/sib:-translate-x-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
                Previous
              </div>
              <div className="truncate text-sm font-medium">{prev.name}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/patterns/${next.slug}`}
            className="group/sib hover:border-foreground/30 flex items-center gap-3 rounded-lg border bg-card px-4 py-3 text-right ring-1 ring-foreground/10 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
                Next
              </div>
              <div className="truncate text-sm font-medium">{next.name}</div>
            </div>
            <ArrowRight className="text-muted-foreground size-4 transition-transform group-hover/sib:translate-x-0.5" />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
