# Quick live isolated-demo test

Run ID: `quick-live-test-20260906-v4`

- 10 patterns, condition 1, both isolated variants: 20 live URL tasks.
- 3 independent agents per arm: C0, C1, C2.
- The thesis is not edited by this test.
- Ground truth is scorer-only under `score-only/`; agents must not read it.
- All arms may return `UNKNOWN`; `UNKNOWN` is abstention, never silently `BENIGN`.

## Isolated URL evidence

Each assignment contains one URL for one isolated demo variant. Agents must navigate to the URL with a browser, inspect the rendered page and DOM, and interact only with the local demo when useful. The URL path and document title are opaque for the audit: agents must not infer the label from either. Immediately after loading, neutralize the title and address-bar path with browser JavaScript before reading the page.

The page is the actual sandbox route `/<pattern-number>/<condition>/<variant>`, not a copied screenshot or corpus HTML file. Variant 1/2 is hidden from the agent's decision protocol; only the scorer knows the label.

## Arms

### C0 — live evidence-only baseline

No ontology files. Inspect the live demo and report `model_final` as `DECEPTIVE`, `BENIGN`, or `UNKNOWN` from observed evidence only. No candidate routing or condition ledger is required.

### C1 — current cards, no routing exclusion

Use only `current-ontology/selected-index.md` and the ten named current card files under `current-ontology/cards/`. All ten cards are available; do not use candidate routing to exclude any card. Produce a structured ledger for all 10 condition-1 records. Report both `model_final` and the ledger-derived result is computed after the run.

### C2 — current cards plus measurable routing

Screen all ten patterns as `MATCH`, `NO_MATCH`, or `UNKNOWN` using current card anchors. This is recall-first routing: retain all ten card filenames for detailed evaluation, using the screen only as a ranking/diagnostic field. `NO_MATCH` is allowed only when every relevant condition cue is directly contradicted by observed evidence; missing, partial, or ambiguous evidence must be `UNKNOWN`. Produce a structured ledger for condition 1 of every card. The aggregator treats an excluded/unknown plausible candidate as unresolved rather than benign.

## Formal semantics

For condition 1, every required atom has status `TRUE`, `FALSE`, or `UNKNOWN`, with evidence references. The condition is `TRUE` iff all required atoms are `TRUE`; `FALSE` iff direct counterevidence or a required atom is `FALSE`; otherwise `UNKNOWN`. In this quick test, the pattern status is the status of condition 1.

For C1 and C2, the final ledger result is `DECEPTIVE` only when exactly one pattern result is `TRUE`; multiple `TRUE` patterns are ambiguous and produce `UNKNOWN`. It is `BENIGN` only when all ten pattern results are `FALSE`, and `UNKNOWN` otherwise. A routing `NO_MATCH` that conflicts with a `TRUE` ledger is also `UNKNOWN`, never silently false.

## Diagnostic factors

- C0 versus C1: evidence-only versus current ontology + formal condition reasoning.
- C1 versus C2: routing-screen effect; C2 selection recall is reported separately.
- C1/C2 `model_final` versus deterministic ledger result: aggregation/decision-boundary effect.
