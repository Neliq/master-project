# Extension run handoff

Canonical run: `full-binary-aided-pattern-extension-v9-20260910-gpt56luna900k-retry15`

This is an additive retry of `full-binary-aided-pattern-extension-v8-20260910-gpt56luna900k`, based on the original `full-binary-aided-pattern-first-rollback-v7-20260907-gpt54mini`. The original v7 directory was not modified. The initial v8 aided outputs that failed the existing schema are preserved under `v8.../results/rejected/agent-*-schema-v1.jsonl`; the incomplete setup is retained as `v8...failed-setup/`.

## Design and counts

- Patterns: exactly 2 — Nagging (route/pattern 63) and Games For Other Purposes (route/pattern 64).
- Conditions: 3 per pattern.
- Variants: 2 per condition.
- Unique evaluation instances: 12 (2 × 3 × 2), one for every pattern/condition/variant cell.
- Arms: exactly `not-aided` and `aided`.
- Agents: 6 per arm, 12 assignment files total.
- Assignment size: 2 instances per agent.
- Raw rows: 12 not-aided + 12 aided = 24.
- Live evidence records: 12 not-aided + 12 aided = 24.
- Metrics: intentionally not emitted by this extension run. No metric was fabricated.

The strict PASS report records every grid cell and raw SHA-256:

    /home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-extension-v9-20260910-gpt56luna900k-retry15/validation-report.json

## Audit artifact paths

- Public manifest: `.../public-manifest.json`
- Runtime and provenance: `.../runtime-config.json`
- Base-run reference: `.../base-run-reference.json`
- Opaque instances/truth/route map/rules: `.../score-only/instances.json`, `ground-truth.json`, `route-patterns.json`, `rules.json`
- Assignments: `.../assignments/not-aided/agent-01.json` through `agent-06.json`, and the corresponding `aided/` files
- Raw outputs: `.../results/raw-not-aided/agent-XX.jsonl` and `.../results/raw-aided/agent-XX.jsonl`
- Raw live evidence: `.../evidence/live-captures-not-aided.json` and `live-captures-aided.json`
- Aided pattern/rule indexes: `.../arms/aided/pattern-routing-index.jsonl` and `formalization-index.jsonl`
- Exact worker/capture log: `.../execution.log`

Use the full canonical prefix for `...`:

    /home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-extension-v9-20260910-gpt56luna900k-retry15

## Commands actually run

1. Confirm local app server:

    ss -ltnp | grep ':3000'

   Observed a listening Next server on `*:3000` before capture.

2. Extension setup/template generation (initial additive bundle):

    python3 /home/neliq/.hermes/kanban/workspaces/t_2988b4a2/build_extension.py

   This wrote v8 without touching v7. A setup bug was found before evaluation and the partial directory was moved to `v8...failed-setup/`; no v7 artifact was involved.

3. Live capture and raw writing for canonical retry (as recorded in `execution.log`):

    Playwright MCP browser_run_code_unsafe route loop; fresh pass arm=not-aided
    Playwright MCP browser_run_code_unsafe route loop; fresh pass arm=aided
    python3 /home/neliq/.hermes/kanban/workspaces/t_92cc044e/write_rows.py

   Scope was `[data-isolated-demo]`, with title/history masking, one direct in-scope control attempt where available, and assignment-order JSONL output.

4. Strict extension validation:

    python3 /home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-extension-v9-20260910-gpt56luna900k-retry15/validate_extension.py > /home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-extension-v9-20260910-gpt56luna900k-retry15/validation-report.json

   Result: `status: PASS`, zero issues; the saved JSON contains the exact counts and hashes.

5. Verify original v7 metadata remained unchanged:

    sha256sum experiment-data/full-binary-aided-pattern-first-rollback-v7-20260907-gpt54mini/runtime-config.json experiment-data/full-binary-aided-pattern-first-rollback-v7-20260907-gpt54mini/public-manifest.json

   Observed hashes match the v9 base reference: `69605fda14458f6c381f9da2ad927074be5af281cddb2df8490db5b6b91000b5` and `d9816b645679090e8c1f9227961e5cc457eec5e837707d3e8ff12b4d29c3734a`.

## Harness limitation

`experiment-data/tools/aggregate_full_binary_aided_test.py` is hard-coded for the original 372-instance/62-pattern corpus (`expected 372` and six-two-pattern assumptions). Running it directly against this 12-instance extension would reject a valid extension on corpus-size checks, so it was not used to emit misleading metrics. The focused validator above enforces the same raw-field/support-only constraints while explicitly accepting the two-pattern extension. Integration with the original aggregate must therefore be performed by a later integration task using this v9 bundle, without overwriting v7 or inventing missing original observations.

## Source/provenance

- Source commit at setup: `bdf275fdc93d35b27687a0aa303bb4531a788f4e`.
- Runtime model recorded: `gpt-5.6-luna-900k` via `openai-codex`, fast tier, minimal reasoning.
- Source app snapshot hash and copied card hashes are recorded in `runtime-config.json` and `public-manifest.json`.
- The two new semantic cards are copied into `current-ontology/cards/`; the preserved `base-ontology-62.json` is read-only context, not a replacement for the original run.
