#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const demosDir = join(root, "src/components/demos");
const registryPath = join(root, "src/components/pattern-demo.tsx");
const patternsPath = join(root, "src/lib/patterns.ts");
const globalsPath = join(root, "src/app/globals.css");

const slugs = [
  "bundling",
  "false-hierarchy",
  "visual-prominence",
  "persuasive-language",
  "cuteness",
  "positive-or-negative-framing",
  "choice-overload",
  "confirmshaming",
  "psychological-tricks",
  "pressured-selling",
  "bad-defaults-preselection",
  "trick-questions",
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

if (!globals.includes("choice-manipulation") || !globals.includes("rgb(124 58 237)")) {
  errors.push("Choice-manipulation palette scope or shared purple palette is missing from globals.css");
}

if (errors.length > 0) {
  console.error(`choice-manipulation validation failed (${errors.length} issue${errors.length === 1 ? "" : "s"})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`choice-manipulation validation passed: ${slugs.length} patterns × 3 conditions = ${slugs.length * 3} demos`);
}
