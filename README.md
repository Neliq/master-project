# Dark Pattern Lab

Dark Pattern Lab is an interactive catalogue and research sandbox for studying deceptive user-interface design. It turns 64 dark-pattern heuristics into inspectable, machine-oriented conditions and demonstrates each condition with a matched pair of interfaces:

- **Variant 1 — dark:** the target condition is present.
- **Variant 2 — non-dark:** the same interaction is kept as similar as possible while the target condition is neutralised.

The project accompanies a Master's thesis on formalising dark-pattern heuristics for automated auditing. It is intended for education, interface comparison, and controlled auditor experiments—not as a production compliance detector or proof of user harm, intent, or legal infringement.

**Live sandbox:** [koszyka.com](https://www.koszyka.com/)

## What the application does

- Browses 64 patterns grouped into six categories.
- Shows each pattern's summary, related patterns, references, and formal conditions.
- Renders mathematical conditions with KaTeX-compatible expressions.
- Provides three interactive demonstrations per pattern: predominantly structural, visual, and semantic.
- Supports user-facing and auditor-facing views of the same simulated interface.
- Exposes isolated routes that render only one condition and one A/B variant for browser capture and evaluation.

The isolated route format is:

```text
/<pattern-number>/<condition-number>/<variant>
```

For example, `/1/2/1` selects pattern 1, condition 2, and the target-condition-present variant. Variant `2` selects the non-dark control.

## Codebase

```text
src/
├── app/
│   ├── page.tsx                          # Catalogue homepage
│   ├── patterns/[slug]/page.tsx          # Pattern detail pages
│   ├── [patternNumber]/[condition]/[variant]/page.tsx
│   │                                        # Isolated experimental routes
│   └── globals.css                        # Global and simulation styling
├── components/
│   ├── demos/                            # 192 condition demos (64 × 3)
│   │   ├── demo-shell.tsx                # Shared demo framing and A/B logic
│   │   └── ...condition-*.tsx             # Pattern-specific simulations
│   ├── pattern-card.tsx                   # Catalogue cards
│   ├── pattern-demo.tsx                   # Demo component registry
│   ├── isolated-demo.tsx                  # Isolated-route renderer
│   ├── math-block.tsx                     # Formula and condition rendering
│   ├── site-chrome.tsx                    # Header/footer and route isolation
│   └── ui/                                # Shared UI primitives
└── lib/
    ├── patterns.ts                        # Categories, metadata, formulas, mappings
    ├── pattern-images.ts                  # Pattern artwork registry
    └── utils.ts                           # Shared helpers

public/                                    # Static images, icons, and artwork
scripts/                                   # Category-level structural validators
experiment-data/                           # Preserved corpus and auditor artifacts
```

### Source of truth

`src/lib/patterns.ts` is the application registry. Each pattern entry contains its category, description, icon, formal conditions, condition-to-demo mapping, and related metadata. The individual demo files implement the corresponding interaction states; `src/components/pattern-demo.tsx` maps demo slugs to React components.

`DemoShell` keeps the simulated product surface separate from auditor context. The normal user view shows the interface as a product interaction, while the auditor view adds comparison and explanation context. Isolated routes deliberately omit the surrounding catalogue chrome so screenshots, DOM serialisations, and semantic text can be captured from the selected user-facing fragment only.

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- KaTeX for rendered formulae
- Base UI, shadcn/ui primitives, and Lucide icons
- Puppeteer Core for browser-based capture workflows
- Bun lockfile and scripts compatible with npm/pnpm as well

## Run locally

Requirements: Node.js and Bun (or another package manager that understands `package.json`).

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
bun run lint
bun run build
bun run start
```

The equivalent `npm run ...`, `pnpm run ...`, or `yarn ...` commands work when dependencies are installed with that package manager.

## Validate the catalogue

The validation scripts are small structural checks for the six thesis categories. They verify that pattern metadata, the demo registry, the three condition demos, and category-specific styling conventions stay aligned.

```bash
bun run validate:information-manipulation
bun run validate:choice-manipulation
bun run validate:agency-manipulation
bun run validate:engagement-exploitation
bun run validate:social-exploitation
bun run validate:compound-adversarial-architecture
```

## Research and experiment artifacts

`experiment-data/` contains preserved corpus, ontology, prompt, routing, and auditor-result artifacts used during the thesis work. These files document completed evaluation runs; they are not required to start the web application.

The benchmark uses construction-defined labels on a controlled synthetic corpus. A `DECEPTIVE` result means that the target condition was present in the constructed instance, and `BENIGN` means that it was absent. Those labels should not be read as independent judgments of intent, harm, legality, or real-world deception. The experiment also evaluates a complete formalization-guided protocol, so its results do not isolate the causal contribution of the formulas from routing, prompts, or other protocol components.

## Relationship to the thesis

The thesis is the authoritative source for the catalogue's formal definitions and research methodology. This repository is the executable companion: it turns those definitions into live A/B interfaces and isolated, repeatable evidence units that can be inspected by people or supplied to an automated auditor.
