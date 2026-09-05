"use client";

import { getDemo } from "@/components/pattern-demo";
import { createElement } from "react";
import {
  DemoIsolationProvider,
  type IsolatedVariant,
} from "@/components/demos/demo-shell";

export function IsolatedDemo({
  demoSlug,
  category,
  variant,
}: {
  demoSlug: string;
  category: string;
  variant: IsolatedVariant;
}) {
  const DemoComponent = getDemo(demoSlug);
  if (!DemoComponent) return null;

  return (
    <div className="pattern-page" data-dp-category={category}>
      <DemoIsolationProvider variant={variant}>
        {createElement(DemoComponent, { mode: "user" })}
      </DemoIsolationProvider>
    </div>
  );
}
