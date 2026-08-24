/**
 * MathBlock — renders a KaTeX formula plus its "given" clause (if any)
 * and an optional note. The block is intended for one logical predicate
 * at a time and is reused by every pattern subpage.
 *
 * The component is a thin wrapper around `katex.renderToString`; the heavy
 * CSS is loaded once globally by `app/layout.tsx`.
 */

import "katex/dist/katex.min.css";
import katex from "katex";

export interface MathBlockProps {
  /** The LaTeX source for the main formula. */
  formula?: string;
  /** Optional LaTeX source for a "given" / "where" clause. */
  given?: string;
  /** Optional explanatory note rendered beneath the formula. */
  note?: string;
  /** Optional title (e.g. "Autonomous Media Execution"). */
  title?: string;
  /** Display mode — `block` (default) centres the formula, `inline` flows it. */
  displayMode?: boolean;
  /** Optional aria-label for screen readers (used as the formula's alt). */
  ariaLabel?: string;
}

function renderKatex(src: string, displayMode: boolean) {
  try {
    return katex.renderToString(src, {
      displayMode,
      throwOnError: false,
      output: "html",
      strict: "ignore",
    });
  } catch (err) {
    // KaTeX should never throw because of throwOnError:false, but if it does
    // we degrade to a code block rather than crashing the page.
    if (process.env.NODE_ENV !== "production") {
      console.error("KaTeX render failed for", src, err);
    }
    return `<code>${src}</code>`;
  }
}

function GivenText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\$[^$]+\$)/g).map((part, index) =>
        part.startsWith("$") && part.endsWith("$") ? (
          <Math key={index}>{part.slice(1, -1)}</Math>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

export function MathBlock({
  formula,
  given,
  note,
  title,
  displayMode = true,
  ariaLabel,
}: MathBlockProps) {
  const main = renderKatex(formula ?? "", displayMode);
  return (
    <div
      className="border border-white bg-white px-4 py-3 text-[#0000f2]"
      style={{ textTransform: "none" }}
    >
      {title ? (
        <div className="mb-2 text-xs font-semibold tracking-wide text-[#0000f2]">
          {title}
        </div>
      ) : null}
      <div
        className="overflow-x-auto"
        style={{ color: "#0000f2" }}
        role="math"
        aria-label={ariaLabel ?? title ?? "Mathematical expression"}
        // The HTML is produced by KaTeX, which sanitises its own output.
        dangerouslySetInnerHTML={{ __html: main }}
      />
      {given ? (
        <div className="mt-3 flex items-start gap-2">
          <span className="shrink-0 font-mono text-xs font-semibold text-[#0000f2]">
            Given
          </span>
          <div className="flex-1 overflow-x-auto leading-relaxed">
            <GivenText text={given} />
          </div>
        </div>
      ) : null}
      {note ? (
        <p className="mt-3 border-t border-[#0000f2]/20 pt-3 text-xs font-medium leading-relaxed text-[#0000f2]/75">
          {note}
        </p>
      ) : null}
    </div>
  );
}

/** Inline math helper for short symbols inside prose. */
export function Math({ children }: { children: string }) {
  const html = renderKatex(children, false);
  return (
    <span
      className="inline-block align-baseline"
      // KaTeX-sanitised HTML.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
