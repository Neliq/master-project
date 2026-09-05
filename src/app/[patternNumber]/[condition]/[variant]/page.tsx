import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IsolatedDemo } from "@/components/isolated-demo";
import { PATTERNS } from "@/lib/patterns";

const VARIANTS = ["1", "2"] as const;

type IsolatedPageProps = {
  params: Promise<{
    patternNumber: string;
    condition: string;
    variant: string;
  }>;
};

function resolveDemoPath(
  patternNumberParam: string,
  conditionParam: string,
  variantParam: string
) {
  if (
    !/^\d+$/.test(patternNumberParam) ||
    !/^\d+$/.test(conditionParam) ||
    !VARIANTS.includes(variantParam as (typeof VARIANTS)[number])
  ) {
    return null;
  }

  const patternNumber = Number(patternNumberParam);
  const conditionNumber = Number(conditionParam);
  const pattern = PATTERNS[patternNumber - 1];
  const conditionDemo = pattern?.conditionDemos?.find(
    (demo) => demo.conditionIndex === conditionNumber - 1
  );

  if (
    !pattern ||
    !pattern.built ||
    !conditionDemo ||
    pattern.conditions?.[conditionNumber - 1] === undefined
  ) {
    return null;
  }

  return {
    pattern,
    condition: pattern.conditions[conditionNumber - 1],
    conditionNumber,
    variant: variantParam === "1" ? ("dark" as const) : ("benign" as const),
    demoSlug: conditionDemo.demoSlug,
  };
}

export function generateStaticParams() {
  return PATTERNS.flatMap((pattern, patternIndex) =>
    (pattern.conditionDemos ?? []).flatMap((demo) =>
      VARIANTS.map((variant) => ({
        patternNumber: String(patternIndex + 1),
        condition: String(demo.conditionIndex + 1),
        variant,
      }))
    )
  );
}

export async function generateMetadata({
  params,
}: IsolatedPageProps): Promise<Metadata> {
  const { patternNumber, condition, variant } = await params;
  const demo = resolveDemoPath(patternNumber, condition, variant);
  if (!demo) return { title: "Demo not found" };

  const variantName = demo.variant === "dark" ? "Dark pattern" : "Non-dark pattern";
  return {
    title: `${demo.pattern.name} — Condition ${demo.conditionNumber} — ${variantName}`,
    description: demo.condition.title,
  };
}

export default async function IsolatedDemoPage({
  params,
}: IsolatedPageProps) {
  const { patternNumber, condition, variant } = await params;
  const demo = resolveDemoPath(patternNumber, condition, variant);
  if (!demo) notFound();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <IsolatedDemo
          demoSlug={demo.demoSlug}
          category={demo.pattern.category}
          variant={demo.variant}
        />
      </div>
    </div>
  );
}
