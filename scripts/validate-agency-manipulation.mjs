#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const demosDir = join(root, "src/components/demos");
const registryPath = join(root, "src/components/pattern-demo.tsx");
const patternsPath = join(root, "src/lib/patterns.ts");
const globalsPath = join(root, "src/app/globals.css");

const slugs = [
  "immortal-accounts",
  "dead-end",
  "forced-grace-period",
  "privacy-maze",
  "labyrinthine-navigation",
  "customisation",
  "sneak-into-basket",
  "reduced-friction",
  "forced-continuity",
  "privacy-zuckering",
  "automatic-accept-third-party-term",
  "pre-delivered-content",
  "small-or-moving-close-button",
  "forced-registration",
  "granting-and-interaction",
  "automating-the-user-away",
  "auto-play",
];

const errors = [];
const registry = readFileSync(registryPath, "utf8");
const patterns = readFileSync(patternsPath, "utf8");
const globals = readFileSync(globalsPath, "utf8");

for (const slug of slugs) {
  const metadata = new RegExp(`slug: "${slug}"[\\s\\S]*?category: "([^"]+)"`).exec(patterns);
  if (!metadata) {
    errors.push(`Missing pattern metadata: ${slug}`);
  } else if (metadata[1] !== "agency-manipulation") {
    errors.push(`Wrong category for ${slug}: ${metadata[1]}`);
  }

  for (const condition of [1, 2, 3]) {
    const demoSlug = `${slug}-condition-${condition}`;
    const file = join(demosDir, `${demoSlug}.tsx`);
    if (!registry.includes(`"${demoSlug}"`)) errors.push(`Missing demo registry mapping: ${demoSlug}`);
    if (!existsSync(file)) {
      errors.push(`Missing condition file: ${file}`);
      continue;
    }
    const source = readFileSync(file, "utf8");
    for (const required of ["<DemoShell", "benign=", "mode={mode}", "onRestart=", "userTitle="]) {
      if (!source.includes(required)) errors.push(`${demoSlug} is missing ${required}`);
    }
  }
}

if (!globals.includes("agency-manipulation") || !globals.includes("rgb(124 58 237)")) {
  errors.push("Agency-manipulation palette scope or shared purple palette is missing from globals.css");
}

if (errors.length > 0) {
  console.error(`agency-manipulation validation failed (${errors.length} issue${errors.length === 1 ? "" : "s"})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`agency-manipulation validation passed: ${slugs.length} patterns × 3 conditions = ${slugs.length * 3} demos`);
}
