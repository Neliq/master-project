/**
 * Card for a single dark pattern. Used on the homepage grid and on
 * category roll-ups. Clicking a card navigates to the pattern subpage.
 */

import Link from "next/link";
import { ChevronRight, FlaskConical, Layers } from "lucide-react";

import { type Pattern, ICONS, getCategory } from "@/lib/patterns";
import { cn } from "@/lib/utils";

export interface PatternCardProps {
  pattern: Pattern;
  className?: string;
}

export function PatternCard({ pattern, className }: PatternCardProps) {
  const Icon = ICONS[pattern.iconName];
  const category = getCategory(pattern.category);

  return (
    <Link
      href={`/patterns/${pattern.slug}`}
      className={cn(
        "group/pattern-card relative isolate flex h-full flex-col justify-between rounded-xl border bg-card p-5 text-card-foreground ring-1 ring-foreground/10 transition-all",
        "hover:-translate-y-0.5 hover:border-foreground/20 hover:ring-foreground/20 hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-9 items-center justify-center rounded-md bg-muted text-foreground ring-1 ring-foreground/10">
          <Icon className="size-4" aria-hidden />
        </div>
        {pattern.built ? (
          <span
            className="inline-flex items-center gap-1 rounded-full border border-foreground/15 bg-foreground/5 px-1.5 py-0.5 text-[10px] font-medium text-foreground/80"
            title="Interactive demo available"
          >
            <FlaskConical className="size-3" aria-hidden />
            Demo
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <h3 className="text-base leading-snug font-medium font-heading">
          {pattern.name}
        </h3>
        <p className="text-muted-foreground line-clamp-3 text-xs leading-relaxed">
          {pattern.summary}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-muted-foreground inline-flex items-center gap-1">
          <Layers className="size-3" aria-hidden />
          {category.name}
        </span>
        <span className="text-muted-foreground inline-flex items-center gap-0.5 font-medium transition-colors group-hover/pattern-card:text-foreground">
          Read
          <ChevronRight className="size-3.5 transition-transform group-hover/pattern-card:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
