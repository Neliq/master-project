/**
 * Card for a single dark pattern. Used on the homepage grid and on
 * category roll-ups. Clicking a card navigates to the pattern subpage.
 */

import Link from "next/link";
import Image from "next/image";

import { type Pattern, ICONS } from "@/lib/patterns";
import { PATTERN_IMAGES } from "@/lib/pattern-images";
import { cn } from "@/lib/utils";

export interface PatternCardProps {
  pattern: Pattern;
  className?: string;
}

export function PatternCard({ pattern, className }: PatternCardProps) {
  const Icon = ICONS[pattern.iconName];
  const image = PATTERN_IMAGES[pattern.slug];
  const titleWords = pattern.name.split(/\s+/);
  const titleMidpoint = Math.ceil(titleWords.length / 2);
  const titleLines =
    titleWords.length > 1
      ? [titleWords.slice(0, titleMidpoint).join(" "), titleWords.slice(titleMidpoint).join(" ")]
      : [pattern.name, ""];

  return (
    <Link
      href={`/patterns/${pattern.slug}`}
      className={cn(
        "group/pattern-card relative isolate flex h-full flex-col justify-between border border-white bg-white p-5 text-[#0000f2] transition-all",
        "hover:-translate-y-0.5 hover:border-white hover:bg-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0000f2]",
        className
      )}
    >
      <div className="mb-3 flex flex-col gap-1">
        <h3 className="sandbox-card-title -mx-5 text-left text-2xl leading-snug font-bold">
          {titleLines.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h3>
      </div>

      {image ? (
        <div className="sandbox-card-image relative -mx-5 mb-3 aspect-square overflow-hidden border-y border-[#0000f2]/15">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
          <div className="mb-3 flex size-9 items-center justify-center border border-[#0000f2]/25 bg-[#0000f2]/10 text-[#0000f2]">
            <Icon className="size-4" aria-hidden />
          </div>
      )}

      <div className="flex flex-col gap-1">
        <p className="sandbox-card-description -mx-5 line-clamp-3 text-xs font-medium leading-relaxed uppercase text-[#0000f2]/75">
          {pattern.summary}
        </p>
      </div>
    </Link>
  );
}
