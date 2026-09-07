# Quick live isolated-demo test

Run ID: `quick-live-test-20260906`

- 10 patterns, all 3 conditions, both isolated variants: 60 live URL tasks.
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

Use only `current-ontology/selected-index.md` and the ten named current card files. All ten cards are available; do not use candidate routing to exclude any card. Produce a structured ledger for all 10 x 3 conditions. Report both `model_final` and the ledger-derived result is computed after the run.

### C2 — current cards plus measurable routing

Screen all ten patterns as `MATCH`, `NO_MATCH`, or `UNKNOWN` using current card anchors. Select at most five cards for detailed evaluation. Routing is efficiency only: an ambiguous or incompletely observed candidate must be `UNKNOWN`, not `NO_MATCH`. Produce a structured ledger for every selected card's three conditions. The aggregator treats an excluded/unknown plausible candidate as unresolved rather than benign.

## Formal semantics

For each condition, every required atom has status `TRUE`, `FALSE`, or `UNKNOWN`, with evidence references. A condition is `TRUE` iff all required atoms are `TRUE`; `FALSE` iff direct counterevidence or a required atom is `FALSE`; otherwise `UNKNOWN`. A pattern is `TRUE` iff any of its three conditions is `TRUE`, `FALSE` iff all three are `FALSE`, otherwise `UNKNOWN`.

For C1, the final ledger result is `DECEPTIVE` if any of the ten pattern results is `TRUE`, `BENIGN` if all ten are `FALSE`, and `UNKNOWN` otherwise. For C2, `NO_MATCH` is false only for that screened pattern; a `MATCH` card without a complete ledger, or an `UNKNOWN` candidate, keeps the global result `UNKNOWN` unless another evaluated pattern is `TRUE`.

## Diagnostic factors

- C0 versus C1: evidence-only versus current ontology + formal condition reasoning.
- C1 versus C2: all-card availability versus routed-card availability; target-card recall is measured.
- C1/C2 `model_final` versus deterministic ledger result: aggregation/decision-boundary effect.
