# Retry run note: full-binary-aided-pattern-extension-v9-20260910-gpt56luna900k-retry15

Date/time observed: 2026-09-10T23:08:39+02:00

Purpose

This is a unique additive retry of `full-binary-aided-pattern-extension-v8-20260910-gpt56luna900k`. The preserved v8 directory and its raw outputs were not overwritten. The retry retains the exact v8 assignment order and opaque instance IDs, including the four previously missing aided IDs: task-253f9fb5c4ea, task-0ec2ae7ec850, task-ef997d1956a6, and task-c71ab4495b13.

Design and coverage

- Patterns: Nagging (63), Games For Other Purposes (64).
- Conditions: 3 per pattern.
- Variants: 2 per condition.
- Distinct interfaces: 12.
- Arms: not-aided and aided.
- Agents: agent-01 through agent-06 in each arm.
- Rows: exactly 2 per agent, 12 per arm, 24 total.
- Evidence: 12 live rendered records per arm.
- Aggregate metrics: not emitted; `metrics_emitted` is false and no results/results.json or results/report.md exists.

Exact commands and capture procedure

1. Create the unique output bundle without copying old raw judgments:

    python3 /home/neliq/.hermes/kanban/workspaces/t_92cc044e/build_retry.py

2. Fresh not-aided browser pass:

    Playwright MCP tool `mcp__playwright__browser_run_code_unsafe` was run with a route loop over every assignment URL in order. For each route it executed `page.goto(url, {waitUntil: 'domcontentloaded'})`, waited for rendering, set `document.title` to `Isolated audit demo`, replaced history with `/audit-view`, inspected only `[data-isolated-demo]`, collected rendered text, root layout rectangle, visible controls and rectangles, then attempted one direct visible in-scope control (filling the rendered textarea first when present) and collected the settled post-action state.

3. Fresh aided browser pass:

    The same Playwright route loop was run again independently for arm `aided`. The complete copied aid indexes were read before the aided pass: `arms/aided/pattern-routing-index.jsonl` and `arms/aided/formalization-index.jsonl`.

4. Materialize only the prompt-shaped JSONL rows from the two fresh live passes:

    python3 /home/neliq/.hermes/kanban/workspaces/t_92cc044e/write_rows.py

5. Run the focused 12-instance schema/design/provenance validator:

    python3 /home/neliq/.hermes/kanban/workspaces/t_92cc044e/validate_retry.py

Validator result: PASS, issues [], 12 raw rows per arm, 12 live evidence records per arm, six agents per arm, and `metrics_emitted: false`.

Artifacts

- Assignments: `assignments/not-aided/agent-01.json` through `agent-06.json`, and the corresponding six `assignments/aided/` files.
- Raw outputs: `results/raw-not-aided/agent-01.jsonl` through `agent-06.jsonl`, and the corresponding six `results/raw-aided/` files.
- Live evidence: `evidence/live-captures-not-aided.json`, `evidence/live-captures-aided.json`, and `evidence/capture-index.json`.
- Score-only records: `score-only/instances.json`, `ground-truth.json`, `route-patterns.json`, `rules.json`.
- Aided indexes: `arms/aided/pattern-routing-index.jsonl`, `formalization-index.jsonl`, plus JSON and pseudocode copies.
- Provenance/configuration: `runtime-config.json`, `public-manifest.json`, `base-run-reference.json`.
- Execution record: `execution.log`.
- Focused validation record: `retry-validation.json`.

Provenance hashes

Source and copied context:

- source commit: `bdf275fdc93d35b27687a0aa303bb4531a788f4e`
- src/lib/patterns.ts: `e91c06ffea20e4a5b46e10b2e8f0a2e63e281cafb2099fb040bab9d480c3cafd`
- current-ontology/base-ontology-62.json: `ccb1b85e8192103b92eef1853384bf1a13d5a622008965fc58172c25f6e3533c`
- card-063-nagging.md: `441e9ea7c0556fcbc5e08d5c4814c8b737361ce6427ce48653d6c068334c3886`
- card-064-games-for-other-purposes.md: `de9e119b308b12c3801b11027e55bf144044aeaf365b5c62c8c63cd8c83a04c4`
- arms/aided/pattern-routing-index.jsonl: `6b47523ba27b76aaebc623a26edd71f6644e3601293fac11adacc1460ee0fb9b`
- arms/aided/formalization-index.jsonl: `2d95c92dcde029b72e0a92ad23d1a63a825629d0e52df394410e0f7d3bcc843e`
- v7 runtime config referenced by base-run-reference: `69605fda14458f6c381f9da2ad927074be5af281cddb2df8490db5b6b91000b5`
- v7 public manifest referenced by base-run-reference: `d9816b645679090e8c1f9227961e5cc457eec5e837707d3e8ff12b4d29c3734a`
- preserved v8 runtime config referenced by base-run-reference: `be00b9e5d5218196943ab9949a40f00be51f86dec06268371543f6139a54d8a7`
- preserved v8 public manifest referenced by base-run-reference: `ff8de02b36045a34999d37853a013984fd743e7cf445b3b99fb3005a8374dbb0`

Retry top-level files:

- runtime-config.json: `54bbdcf4c2c419449cbc1ad329acc331ee7caae7f51fd215fdbb15790b692a3f`
- public-manifest.json: `7f8d53c255f71bbaab01c58958845799bb42e7462a5306bdc549b7928af9db98`
- base-run-reference.json: `644740c4c018d934e73deacaf560fc1d909f2d571fea3b795e167777c55f4ec7`
- score-only/instances.json: `da2457e8ceefff21e40de9a8a2060a93482acca39a694b511834791f4749b50c`
- score-only/ground-truth.json: `11fe09a2c4f0a9f71f2ff2d88224ed662efdca918a13f0de16a27c96421070ed`
- current-ontology/website-route-map.json: `1b8dc45ce81c5096e6509ec68568a86779820a7347a8b143c6ebf17699923c61`
- arms/aided/pattern-routing-index.jsonl: `6b47523ba27b76aaebc623a26edd71f6644e3601293fac11adacc1460ee0fb9b`
- arms/aided/formalization-index.jsonl: `2d95c92dcde029b72e0a92ad23d1a63a825629d0e52df394410e0f7d3bcc843e`

Raw output hashes are recorded in `runtime-config.json` and `execution.log`; live evidence hashes are recorded in the same files. The focused validator re-computed the relevant hashes and passed.

Known harness limitation

The repository's existing `aggregate_full_binary_aided_test.py` is hard-coded for the 372-interface full run. It is therefore not used for this 12-interface extension because it would reject the intentionally scoped design and would be the wrong aggregate generator. The retry uses the focused validator above and emits no aggregate metrics until the validation lane accepts the bundle.

Final hash inventory is also available at `sha256sums.txt`; `execution.log` was rewritten after finalization so its hashes describe the final raw/evidence inventory.
