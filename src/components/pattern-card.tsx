/**
 * Card for a single dark pattern. Used on the homepage grid and on
 * category roll-ups. Clicking a card navigates to the pattern subpage.
 */

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Layers } from "lucide-react";

import { type Pattern, ICONS, getCategory } from "@/lib/patterns";
import { PATTERN_IMAGES } from "@/lib/pattern-images";
import { cn } from "@/lib/utils";

export interface PatternCardProps {
  pattern: Pattern;
  className?: string;
}

export function PatternCard({ pattern, className }: PatternCardProps) {
  const Icon = ICONS[pattern.iconName];
  const category = getCategory(pattern.category);
  const image = PATTERN_IMAGES[pattern.slug];

  return (
    <Link
      href={`/patterns/${pattern.slug}`}
      className={cn(
        "group/pattern-card relative isolate flex h-full flex-col justify-between border border-white bg-white p-5 text-[#0000f2] transition-all",
        "hover:-translate-y-0.5 hover:border-white hover:bg-white hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0000f2]",
        className
      )}
    >
      {image ? (
        <div className="sandbox-card-image relative -mx-5 -mt-5 mb-5 aspect-[16/9] overflow-hidden border-b border-[#0000f2]/15">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        {image ? null : (
          <div className="flex size-9 items-center justify-center border border-[#0000f2]/25 bg-[#0000f2]/10 text-[#0000f2]">
            <Icon className="size-4" aria-hidden />
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <h3 className="sandbox-card-title text-lg leading-snug font-bold font-heading">
          {pattern.name}
        </h3>
        <p className="sandbox-card-description line-clamp-3 text-xs font-medium leading-relaxed uppercase text-[#0000f2]/75">
          {pattern.summary}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="sandbox-card-meta inline-flex items-center gap-1 font-medium text-[#0000f2]/70">
          <Layers className="size-3" aria-hidden />
          {category.name}
        </span>
        <span className="sandbox-card-meta inline-flex items-center gap-0.5 font-semibold text-[#0000f2]/70 transition-colors group-hover/pattern-card:text-[#0000f2]">
          Read
          <ChevronRight className="size-3.5 transition-transform group-hover/pattern-card:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
