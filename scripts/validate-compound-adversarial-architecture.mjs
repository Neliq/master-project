#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const demosDir = join(root, "src/components/demos");
const registryPath = join(root, "src/components/pattern-demo.tsx");
const patternsPath = join(root, "src/lib/patterns.ts");
const globalsPath = join(root, "src/app/globals.css");

const slug = "plain-evil";
const errors = [];
const registry = readFileSync(registryPath, "utf8");
const patterns = readFileSync(patternsPath, "utf8");
const globals = readFileSync(globalsPath, "utf8");

const metadata = new RegExp(`slug: "${slug}"[\\s\\S]*?category: "([^"]+)"`).exec(patterns);
if (!metadata) {
  errors.push(`Missing pattern metadata: ${slug}`);
} else if (metadata[1] !== "compound-adversarial-architecture") {
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
  for (const required of ["<DemoShell", "benign=", "mode={mode}", "userTitle="]) {
    if (!source.includes(required)) errors.push(`${demoSlug} is missing ${required}`);
  }
}

if (!globals.includes("compound-adversarial-architecture") || !globals.includes("rgb(124 58 237)")) {
  errors.push("Compound-adversarial palette scope or shared purple palette is missing from globals.css");
}

if (errors.length > 0) {
  console.error(`compound-adversarial-architecture validation failed (${errors.length} issue${errors.length === 1 ? "" : "s"})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("compound-adversarial-architecture validation passed: 1 pattern × 3 conditions = 3 demos");
}
