#!/usr/bin/env python3
"""Build a small live-URL dark-pattern ablation bundle.

This intentionally creates experiment artifacts only. It never edits the thesis.
"""
from __future__ import annotations

import hashlib
import json
import os
import random
import shutil
from pathlib import Path

ROOT = Path("/home/neliq/Coding/master-project/experiment-data")
THESIS_ONTOLOGY = Path("/home/neliq/Coding/Master-Thesis/ontology")
OUT = Path(os.environ.get("QUICK_LIVE_OUT", ROOT / "quick-live-test-20260906-v5"))
SCORE = OUT / "score-only"
BASE_URL = "http://127.0.0.1:3000"
SEED = 20260906
AGENTS = 3
CONDITIONS = (1,)

# Website route numbers are the order in src/lib/patterns.ts, not ontology ordinals.
SELECTED = [
    {"pattern_number": 1, "slug": "immortal-accounts", "name": "Immortal Accounts", "card": "card-001-immortal-accounts.md"},
    {"pattern_number": 26, "slug": "price-comparison-prevention", "name": "Price Comparison Prevention", "card": "card-026-price-comparison-prevention.md"},
    {"pattern_number": 9, "slug": "sneak-into-basket", "name": "Sneak Into Basket", "card": "card-009-sneak-into-basket.md"},
    {"pattern_number": 28, "slug": "conflicting-information", "name": "Conflicting Information", "card": "card-028-conflicting-information.md"},
    {"pattern_number": 32, "slug": "persuasive-language", "name": "Persuasive Language", "card": "card-032-persuasive-language.md"},
    {"pattern_number": 33, "slug": "cuteness", "name": "Cuteness", "card": "card-033-cuteness.md"},
    {"pattern_number": 58, "slug": "addictive-design", "name": "Addictive Design", "card": "card-058-addictive-design.md"},
    {"pattern_number": 16, "slug": "friend-spam", "name": "Friend Spam", "card": "card-016-friend-spam.md"},
    {"pattern_number": 54, "slug": "pay-to-avoid", "name": "Pay To Avoid", "card": "card-054-pay-to-avoid.md"},
    {"pattern_number": 38, "slug": "confirmshaming", "name": "Confirmshaming", "card": "card-038-confirmshaming.md"},
]


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def write_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n")


def main() -> None:
    if OUT.exists():
        raise SystemExit(f"refusing to overwrite {OUT}")
    if not THESIS_ONTOLOGY.exists():
        raise SystemExit(f"missing current ontology package: {THESIS_ONTOLOGY}")

    ontology = json.loads((THESIS_ONTOLOGY / "ontology.json").read_text())
    by_name = {p["name"]: p for p in ontology["patterns"]}
    for selected in SELECTED:
        if selected["name"] not in by_name:
            raise SystemExit(f"selected pattern missing from current ontology: {selected['name']}")
        source_card = THESIS_ONTOLOGY / "cards" / selected["card"]
        if not source_card.exists():
            raise SystemExit(f"selected current card missing: {source_card}")

    OUT.mkdir(parents=True)
    (OUT / "assignments").mkdir()
    for arm in ("c0", "c1", "c2"):
        (OUT / "results" / f"raw-{arm}").mkdir(parents=True)
    (OUT / "current-ontology" / "cards").mkdir(parents=True)
    SCORE.mkdir()

    # Preserve the exact current ontology package used by the quick test.
    for name in ("ontology.json", "ontology.schema.json", "README.md"):
        shutil.copy2(THESIS_ONTOLOGY / name, OUT / "current-ontology" / name)
    for card in (THESIS_ONTOLOGY / "cards").glob("card-*.md"):
        shutil.copy2(card, OUT / "current-ontology" / "cards" / card.name)

    index_lines = [
        "# Quick-test current ontology cards",
        "",
        "This index contains only the ten cards used by the quick live-URL test.",
        "The cards are copied byte-for-byte from Master-Thesis/ontology/cards.",
        "",
        "| Website route | Pattern | Current card |",
        "|---:|---|---|",
    ]
    for selected in SELECTED:
        index_lines.append(f"| {selected['pattern_number']} | {selected['name']} | `{selected['card']}` |")
        pattern = by_name[selected["name"]]
        index_lines.extend(["", f"## {selected['name']}", ""])
        for condition in pattern["conditions"]:
            translation = condition["translation"]
            index_lines.append(f"### {condition['id']}: {condition['name']}")
            index_lines.append(f"- Operational reading: {translation['operational_reading']}")
            index_lines.append(f"- Required atoms: {json.dumps(translation['required_atoms'], ensure_ascii=False)}")
            index_lines.append(f"- UNKNOWN when: {json.dumps(translation['unknown_when'], ensure_ascii=False)}")
            index_lines.append(f"- Direct counterevidence: {json.dumps(translation['direct_counterevidence'], ensure_ascii=False)}")
            index_lines.append("")
    (OUT / "current-ontology" / "selected-index.md").write_text("\n".join(index_lines) + "\n")

    records = []
    for selected in SELECTED:
        for condition in CONDITIONS:
            for variant in (1, 2):
                ordinal = len(records)
                task_id = "task-" + hashlib.sha256(f"{SEED}:{ordinal}".encode()).hexdigest()[:12]
                records.append({
                    "instance_id": task_id,
                    "slug": selected["slug"],
                    "pattern_name": selected["name"],
                    "pattern_number": selected["pattern_number"],
                    "condition": condition,
                    "variant": variant,
                    "deceptive": variant == 1,
                    "url": f"{BASE_URL}/{selected['pattern_number']}/{condition}/{variant}",
                    "card": selected["card"],
                })
    random.Random(SEED).shuffle(records)

    chunks = [records[i * len(records) // AGENTS : (i + 1) * len(records) // AGENTS] for i in range(AGENTS)]
    for index, chunk in enumerate(chunks, 1):
        assignment = [{"instance_id": row["instance_id"], "url": row["url"]} for row in chunk]
        write_json(OUT / "assignments" / f"agent-{index:02d}.json", assignment)

    # Public manifest contains no labels or pattern/condition mapping for task IDs.
    write_json(OUT / "public-manifest.json", {
        "run_id": OUT.name,
        "purpose": "quick live isolated-demo ablation",
        "base_url": BASE_URL,
        "patterns": 10,
        "conditions_per_pattern": len(CONDITIONS),
        "instances": len(records),
        "agents_per_arm": AGENTS,
        "arms": ["c0", "c1", "c2"],
        "seed": SEED,
        "evidence_mode": "live isolated URL; no static evidence bundle",
        "labels_public": False,
        "ontology_source": "Master-Thesis/ontology",
        "ontology_sha256": sha256(OUT / "current-ontology" / "ontology.json"),
        "card_source_sha256": {s["card"]: sha256(OUT / "current-ontology" / "cards" / s["card"]) for s in SELECTED},
    })
    write_json(SCORE / "instances.json", {row["instance_id"]: row for row in records})
    write_json(SCORE / "ground-truth.json", {row["instance_id"]: {"deceptive": row["deceptive"]} for row in records})
    write_json(SCORE / "selected-patterns.json", SELECTED)

    protocol = f'''# Quick live isolated-demo test

Run ID: `{OUT.name}`

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
'''
    (OUT / "protocol.md").write_text(protocol)

    prompts = {
        "c0": f'''# C0 live evidence-only auditor

You are an independent multimodal auditor. Process every task in the assigned JSON file exactly once and in order. Assigned file: `{OUT}/assignments/agent-XX.json`.

Use a real browser for every task URL. The URL is an opaque audit handle. Do not infer the label from the URL path, document title, route number, page name, colors, order, or task ID. Immediately after loading each URL, run browser JavaScript that sets `document.title = "Isolated audit demo"` and replaces the visible history path with `/audit-view`; then inspect the rendered demo. Do not read source code, scorer files, `score-only/`, other assignments, or prior results.

For every task: use the task-local browser DOM and scoped interaction transitions, keep DOM and transition observations distinct, and write exactly one JSON object per task to `{OUT}/results/raw-c0/agent-XX.jsonl` with:

```json
{{"instance_id":"task-...","arm":"c0","model_final":"DECEPTIVE|BENIGN|UNKNOWN","confidence":0.0,"evidence_status":"SUFFICIENT|UNKNOWN","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"...","candidate_screen":[],"selected_cards":[],"condition_ledger":[]}}
```

`UNKNOWN` is a valid final answer when required evidence is unavailable or unresolved. Do not convert it to `BENIGN`. Do not include labels or guesses based on the route.
''',
        "c1": f'''# C1 current-ontology all-card auditor

You are an independent multimodal auditor. Process every task in the assigned JSON file exactly once and in order. Assigned file: `{OUT}/assignments/agent-XX.json`.

Use a real browser for every task URL. The URL is an opaque audit handle. Do not infer the label from the URL path, document title, route number, page name, colors, order, or task ID. Immediately after loading each URL, set `document.title = "Isolated audit demo"` and replace the visible history path with `/audit-view` using browser JavaScript before inspecting the rendered demo. Do not read source code, scorer files, `score-only/`, other assignments, or prior results.

Use only the current ontology package at `{OUT}/current-ontology/selected-index.md` and the ten card files under `{OUT}/current-ontology/cards/` named there. This is the no-routing arm: all ten cards are available and none may be excluded. Evaluate condition 1 for each of the ten patterns. Do not make a provisional binary judgment before formal evaluation.

For every task, inspect the live demo with the task-local browser DOM and scoped interaction transitions, then emit a structured ledger containing exactly 10 condition-1 records (one for each pattern). Each record must contain `pattern`, `condition_id`, `status` (`TRUE|FALSE|UNKNOWN`), `domain_gate` (an object with `context_or_object`, `mechanism_anchor`, and `evidence_refs`, each status `TRUE|FALSE|UNKNOWN`), `atoms` (list of objects with `name`, `status`, `evidence_refs`), and `evidence_refs`. The domain gate is mandatory: a generic resemblance or generic UI object is not enough for `TRUE`. For Price Comparison Prevention specifically, a bare price plus absent conversion is not a pattern-specific context; require explicit comparison/conversion context or a directly attempted conversion interaction. Evidence references must point to observed page text, DOM selectors, or visible transitions—not ontology prose alone. If multiple cards become `TRUE`, report `UNKNOWN` rather than forcing a global `DECEPTIVE` label.

Return exactly one JSON object per task to `{OUT}/results/raw-c1/agent-XX.jsonl`:

```json
{{"instance_id":"task-...","arm":"c1","model_final":"DECEPTIVE|BENIGN|UNKNOWN","confidence":0.0,"evidence_status":"SUFFICIENT|UNKNOWN","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"...","candidate_screen":[{{"pattern":"...","status":"AVAILABLE","reason":"all ten current cards supplied"}}],"selected_cards":["card-...md"],"condition_ledger":[{{"pattern":"...","condition_id":"DP-...-C1","status":"TRUE|FALSE|UNKNOWN","domain_gate":{{"context_or_object":"TRUE|FALSE|UNKNOWN","mechanism_anchor":"TRUE|FALSE|UNKNOWN","evidence_refs":["..."]}},"atoms":[{{"name":"...","status":"TRUE|FALSE|UNKNOWN","evidence_refs":["..."]}}],"evidence_refs":["..."]}}]}}
```

`model_final` may be `UNKNOWN`. The post-run aggregator independently derives the final ledger label; do not treat a missing atom as false.
''',
        "c2": f'''# C2 current-ontology routed auditor

You are an independent multimodal auditor. Process every task in the assigned JSON file exactly once and in order. Assigned file: `{OUT}/assignments/agent-XX.json`.

Use a real browser for every task URL. The URL is an opaque audit handle. Do not infer the label from the URL path, document title, route number, page name, colors, order, or task ID. Immediately after loading each URL, set `document.title = "Isolated audit demo"` and replace the visible history path with `/audit-view` using browser JavaScript before inspecting the rendered demo. Do not read source code, scorer files, `score-only/`, other assignments, or prior results.

Use only the current ontology package at `{OUT}/current-ontology/selected-index.md` and the ten card files under `{OUT}/current-ontology/cards/` named there. First screen all ten patterns as `MATCH`, `NO_MATCH`, or `UNKNOWN` using observable mechanism anchors. This routing is measurable, not a label source. Retain all ten card filenames for detailed evaluation; screening ranks and diagnoses candidates but never drops a card. When evidence is partial, missing, or ambiguous, use `UNKNOWN`; use `NO_MATCH` only when every relevant condition cue is directly contradicted. Evaluate condition 1 for every card. Do not make a provisional binary judgment before formal evaluation.

For every task, inspect the live demo with the task-local browser DOM and scoped interaction transitions, and emit a ledger for condition 1 of every card. Each ledger record must contain `pattern`, `condition_id`, `status` (`TRUE|FALSE|UNKNOWN`), `domain_gate` (an object with `context_or_object`, `mechanism_anchor`, and `evidence_refs`, each status `TRUE|FALSE|UNKNOWN`), `atoms` (list of objects with `name`, `status`, `evidence_refs`), and `evidence_refs`. Require the domain gate and mechanism-specific atoms for `TRUE`; for Price Comparison Prevention, a bare price plus absent conversion is insufficient without explicit comparison/conversion context or a directly attempted conversion interaction. Multiple `TRUE` cards make the global result ambiguous and therefore `UNKNOWN`.

Return exactly one JSON object per task to `{OUT}/results/raw-c2/agent-XX.jsonl`:

```json
{{"instance_id":"task-...","arm":"c2","model_final":"DECEPTIVE|BENIGN|UNKNOWN","confidence":0.0,"evidence_status":"SUFFICIENT|UNKNOWN","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"...","candidate_screen":[{{"pattern":"...","status":"MATCH|NO_MATCH|UNKNOWN","reason":"..."}}],"selected_cards":["all-ten-current-card-filenames"],"condition_ledger":[{{"pattern":"...","condition_id":"DP-...-C1","status":"TRUE|FALSE|UNKNOWN","domain_gate":{{"context_or_object":"TRUE|FALSE|UNKNOWN","mechanism_anchor":"TRUE|FALSE|UNKNOWN","evidence_refs":["..."]}},"atoms":[{{"name":"...","status":"TRUE|FALSE|UNKNOWN","evidence_refs":["..."]}}],"evidence_refs":["..."]}}]}}
```

`model_final` may be `UNKNOWN`. The post-run aggregator independently derives the final ledger label; an unresolved candidate or missing required atom remains `UNKNOWN`, not `BENIGN`.
''',
    }
    for arm, prompt in prompts.items():
        (OUT / f"prompt-{arm}.md").write_text(prompt)
    (OUT / "auditor-prompts.md").write_text("\n\n---\n\n".join(prompts.values()) + "\n")

    print(json.dumps({
        "run": str(OUT),
        "instances": len(records),
        "patterns": len(SELECTED),
        "agents_per_arm": AGENTS,
        "arms": ["c0", "c1", "c2"],
        "ontology_sha256": sha256(OUT / "current-ontology" / "ontology.json"),
        "selected_cards": [s["card"] for s in SELECTED],
    }, indent=2))


if __name__ == "__main__":
    main()
