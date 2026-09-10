#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const demosDir = join(root, "src/components/demos");
const registryPath = join(root, "src/components/pattern-demo.tsx");
const patternsPath = join(root, "src/lib/patterns.ts");
const globalsPath = join(root, "src/app/globals.css");

const slugs = [
  "intermediate-currency",
  "disguised-ad",
  "drip-pricing",
  "hidden-information",
  "high-demand",
  "low-stock",
  "activity-messages",
  "countdown-timer",
  "limited-time-message",
  "price-comparison-prevention",
  "reference-pricing",
  "conflicting-information",
  "information-without-context",
  "endorsement-and-testimonials",
  "wrong-language",
  "complex-language",
  "feedforward-ambiguity",
];

const errors = [];
const registry = readFileSync(registryPath, "utf8");
const patterns = readFileSync(patternsPath, "utf8");
const globals = readFileSync(globalsPath, "utf8");

for (const slug of slugs) {
  if (!patterns.includes(`slug: "${slug}"`)) {
    errors.push(`Missing pattern metadata: ${slug}`);
  }
  if (!registry.includes(`"${slug}-condition-1"`) || !registry.includes(`"${slug}-condition-2"`) || !registry.includes(`"${slug}-condition-3"`)) {
    errors.push(`Missing demo registry mapping: ${slug}`);
  }

  for (const condition of [1, 2, 3]) {
    const file = join(demosDir, `${slug}-condition-${condition}.tsx`);
    if (!existsSync(file)) {
      errors.push(`Missing condition file: ${file}`);
      continue;
    }

    const source = readFileSync(file, "utf8");
    for (const required of ["<DemoShell", "benign=", "mode={mode}"]) {
      if (!source.includes(required)) {
        errors.push(`${slug} condition ${condition} is missing ${required}`);
      }
    }
  }
}

const colorSignalExceptions = [
  ["limited-time-message-condition-2.tsx", 2],
  ["low-stock-condition-2.tsx", 2],
  ["conflicting-information-condition-2.tsx", 2],
];

for (const [filename, expectedMarkers] of colorSignalExceptions) {
  const source = readFileSync(join(demosDir, filename), "utf8");
  const markerCount = source.match(/data-dp-color-signal/g)?.length ?? 0;
  if (markerCount !== expectedMarkers) {
    errors.push(`${filename} must preserve ${expectedMarkers} formula color-signal markers (found ${markerCount})`);
  }
}

if (!globals.includes("data-dp-color-signal") || !globals.includes("rgb(124 58 237)")) {
  errors.push("Shared simulation palette mapping or formula color-signal exception is missing from globals.css");
}

if (errors.length > 0) {
  console.error(`information-manipulation validation failed (${errors.length} issue${errors.length === 1 ? "" : "s"})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`information-manipulation validation passed: ${slugs.length} patterns × 3 conditions = ${slugs.length * 3} demos`);
}
