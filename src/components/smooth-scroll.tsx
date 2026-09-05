"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Shared inertial scrolling, matching the Hermes Agent landing page.
 * Lenis owns the wheel animation while native scrolling remains available for
 * touch and keyboard users.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
    });

    const handleAnchorClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      const href = anchor?.getAttribute("href");
      const target = href && href.length > 1
        ? document.getElementById(href.slice(1))
        : null;

      if (!target) return;

      event.preventDefault();
      const scrollMarginTop =
        Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;

      lenis.scrollTo(target, {
        duration: 1.25,
        offset: -scrollMarginTop,
      });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
