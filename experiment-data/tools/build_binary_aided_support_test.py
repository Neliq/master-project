#!/usr/bin/env python3
"""Build a binary live test with support-only formalization aid."""
from __future__ import annotations

import hashlib
import json
import os
import random
from pathlib import Path

from build_quick_live_test import BASE_URL, ROOT, SELECTED, SEED, THESIS_ONTOLOGY, AGENTS

OUT = Path(os.environ.get("BINARY_SUPPORT_OUT") or ROOT / "binary-aided-support-test-20260906-v8")
SCORE = OUT / "score-only"
ARMS = ("not-aided", "aided")


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def write_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n")


def main() -> None:
    if OUT.exists():
        raise SystemExit(f"refusing to overwrite {OUT}")
    ontology_path = THESIS_ONTOLOGY / "ontology.json"
    ontology = json.loads(ontology_path.read_text())
    by_name = {p["name"]: p for p in ontology["patterns"]}
    for selected in SELECTED:
        if selected["name"] not in by_name:
            raise SystemExit(f"selected pattern missing: {selected['name']}")

    OUT.mkdir(parents=True)
    (OUT / "assignments").mkdir()
    for arm in ARMS:
        (OUT / "results" / f"raw-{arm}").mkdir(parents=True)
        (OUT / "arms" / arm).mkdir(parents=True)
    SCORE.mkdir()

    rules = []
    for selected in SELECTED:
        condition = by_name[selected["name"]]["conditions"][0]
        translation = condition["translation"]
        pseudo = [line for line in condition["machine_semantics"]["pseudo_code"] if "UNKNOWN" not in line]
        gate = [
            "BEFORE evaluating this rule, require its pattern-specific context/object and mechanism anchor.",
            "IF only a generic UI object, generic price, generic CTA, or mere absence is observed: this rule provides no support.",
            "IF the context gate or a required observation is unavailable: record no support and no contradiction; preserve the live-evidence base judgment.",
            "IF a required atom depends on a UI transition, actively perform the most direct in-scope control once, snapshot the scoped DOM before and after, and wait for the rendered state to settle.",
            "IF the settled state exposes a visible next-step control needed by the rule, follow that single standard step and capture the resulting scoped DOM; an unverified or unchanged transition is missing evidence, not direct counterevidence.",
        ]
        if selected["name"] == "Price Comparison Prevention":
            gate.append("A price token alone is not pattern-specific; require explicit comparison/conversion context or a directly attempted conversion interaction.")
        rules.append({
            "rule_id": condition["id"],
            "pattern": selected["name"],
            "operational_reading": translation["operational_reading"],
            "pseudocode": gate + pseudo,
            "required_atoms": translation["required_atoms"],
            "direct_counterevidence": translation["direct_counterevidence"],
        })

    rules_md = [
        "# General formalization pseudocode",
        "",
        "General rules only: no demonstrations, page examples, or labelled cases.",
        "Formalizations are evidence-support checks, not a replacement classifier.",
        "Missing or unobservable evidence is neutral: it cannot support a positive rule and cannot negate the live-evidence base judgment.",
        "",
    ]
    for rule in rules:
        rules_md += [f"## {rule['rule_id']} — {rule['pattern']}", "", f"Operational reading: {rule['operational_reading']}", "", "Pseudocode:"]
        rules_md += [f"- `{line}`" for line in rule["pseudocode"]]
        rules_md += ["", "Required observable atoms:"] + [f"- {x}" for x in rule["required_atoms"]]
        rules_md += ["", "Direct counterevidence:"] + [f"- {x}" for x in rule["direct_counterevidence"]] + [""]
    (OUT / "arms" / "aided" / "formalizations-pseudocode.md").write_text("\n".join(rules_md))
    write_json(OUT / "arms" / "aided" / "formalizations.json", rules)

    records = []
    for selected in SELECTED:
        for variant in (1, 2):
            ordinal = len(records)
            task_id = "task-" + hashlib.sha256(f"{SEED}:{ordinal}".encode()).hexdigest()[:12]
            records.append({
                "instance_id": task_id,
                "slug": selected["slug"],
                "pattern_name": selected["name"],
                "pattern_number": selected["pattern_number"],
                "condition": 1,
                "variant": variant,
                "deceptive": variant == 1,
                "url": f"{BASE_URL}/{selected['pattern_number']}/1/{variant}",
            })
    random.Random(SEED).shuffle(records)
    for index in range(AGENTS):
        chunk = records[index * len(records) // AGENTS : (index + 1) * len(records) // AGENTS]
        write_json(OUT / "assignments" / f"agent-{index + 1:02d}.json", [{"instance_id": r["instance_id"], "url": r["url"]} for r in chunk])

    write_json(OUT / "public-manifest.json", {
        "run_id": OUT.name,
        "purpose": "binary support-only formalization aid test",
        "base_url": BASE_URL,
        "patterns": 10,
        "instances": len(records),
        "agents_per_arm": AGENTS,
        "arms": list(ARMS),
        "seed": SEED,
        "labels_public": False,
        "aided_material": "general pseudocode formalizations with context gates; no demonstrations",
        "ontology_sha256": sha256(ontology_path),
    })
    write_json(SCORE / "instances.json", {r["instance_id"]: r for r in records})
    write_json(SCORE / "ground-truth.json", {r["instance_id"]: {"deceptive": r["deceptive"]} for r in records})
    write_json(SCORE / "selected-patterns.json", SELECTED)

    common = f'''# Binary live isolated-demo audit

Run ID: `{OUT.name}`

- 10 patterns, condition 1, two variants each: 20 live URL tasks.
- Three independent agents per arm.
- Exactly two labels are permitted: `DECEPTIVE` or `BENIGN`.
- Abstention and confidence-based non-decisions are forbidden.
- The URL path and title are opaque; do not infer labels from either.
- Agents must not read `score-only/`, other assignments, or prior results.
- Browser interaction is limited to the rendered isolated demo and its controls.
'''
    (OUT / "protocol-not-aided.md").write_text(common + """
## Not-aided arm

Use only the live rendered page and its observable DOM/interaction transitions. Do not use ontology files, cards, formal rules, pseudocode, pattern suggestions, candidate lists, or examples. Report one binary label from live evidence.
""")
    (OUT / "protocol-aided.md").write_text(common + """
## Aided arm

Read only `arms/aided/formalizations-pseudocode.md`. It contains general pseudocode rules and no demonstrations or labelled cases. First form a binary `base_label` from live evidence before consulting the rules. Then nominate at most three plausible rule IDs from the page and apply formalizations only to those candidates; never combine all ten rules globally.

Formalizations may add support only when the candidate context gate and every required atom are directly observed. Missing or unobservable evidence is neutral: record it separately, but it is not support and it cannot downgrade `base_label`. A direct formal contradiction is diagnostic only. The final label is `DECEPTIVE` if the base judgment is `DECEPTIVE` or a candidate has direct formal support; otherwise it is `BENIGN`.
""")

    prompts = {
        "not-aided": f'''# Not-aided binary auditor

Process every task in `{OUT}/assignments/agent-XX.json` exactly once and in order. Write exactly one JSON object per task to `{OUT}/results/raw-not-aided/agent-XX.jsonl`.

Use a real browser. Treat each URL as an opaque audit handle. Immediately set the document title to `Isolated audit demo` and replace the visible history path with `/audit-view`. Inspect only the rendered page and, when useful, controls inside `[data-isolated-demo]`. Do not read source code, ontology files, cards, formalizations, `score-only/`, other assignments, or prior results. Do not use page title, URL, route number, pattern names, or task ID as evidence.

This arm has no aiding material. Use only live observable evidence. You must report exactly `DECEPTIVE` or `BENIGN`; abstention and requests for more evidence are forbidden.

JSON shape:
```json
{{"instance_id":"task-...","arm":"not-aided","model_final":"DECEPTIVE|BENIGN","confidence":0.0,"evidence_status":"SUFFICIENT|LIMITED","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"..."}}
```
''',
        "aided": f'''# Aided support-only binary auditor

Process every task in `{OUT}/assignments/agent-XX.json` exactly once and in order. Write exactly one JSON object per task to `{OUT}/results/raw-aided/agent-XX.jsonl`.

Use a real browser. Treat each URL as an opaque audit handle. Immediately set the document title to `Isolated audit demo` and replace the visible history path with `/audit-view`. Inspect only the rendered page and, when useful, controls inside `[data-isolated-demo]`. Do not read source code, cards, `score-only/`, other assignments, or prior results. Do not use page title, URL, route number, pattern names, or task ID as evidence.

The only aid is `{OUT}/arms/aided/formalizations-pseudocode.md`. It contains general pseudocode rules with context gates and no demonstrations or labelled cases. First record `base_label` from live evidence alone. Then nominate at most three plausible rule IDs from the page and apply formalizations only to those candidates; do not globally apply or OR all ten rules.

For any candidate whose atoms depend on a state or transition, actively perform the most direct relevant control once inside `[data-isolated-demo]`, snapshot the scoped DOM before and after, wait for the rendered state to settle, and follow one visible standard next-step control if required. Use the actual before/after DOM and text as evidence. An unverified or unchanged transition is missing evidence, not direct counterevidence.

Record `formal_support` as `DIRECT` only when a candidate context gate and every required atom are directly observed; otherwise use `NONE`. Record `formal_contradiction` as `DIRECT` only for explicit counterevidence, otherwise `NONE`. Record whether evidence was missing or unobservable separately. Missing evidence is neutral: it cannot support a rule and cannot downgrade `base_label`. The final `model_final` must be `DECEPTIVE` when `base_label` is `DECEPTIVE` or direct formal support exists; otherwise `BENIGN`. Only `DECEPTIVE` or `BENIGN` are permitted.

JSON shape:
```json
{{"instance_id":"task-...","arm":"aided","base_label":"DECEPTIVE|BENIGN","candidate_rule_ids":["DP-...-C1"],"formal_support":"DIRECT|NONE","formal_support_rule_ids":["DP-...-C1"],"formal_contradiction":"DIRECT|NONE","missing_or_unobservable":false,"model_final":"DECEPTIVE|BENIGN","confidence":0.0,"evidence_status":"SUFFICIENT|LIMITED","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"..."}}
```
''',
    }
    for arm, prompt in prompts.items():
        (OUT / f"prompt-{arm}.md").write_text(prompt)
    (OUT / "auditor-prompts.md").write_text("\n\n---\n\n".join(prompts.values()) + "\n")
    print(json.dumps({"run": str(OUT), "instances": len(records), "patterns": len(SELECTED), "agents_per_arm": AGENTS, "arms": list(ARMS), "ontology_sha256": sha256(ontology_path)}, indent=2))


if __name__ == "__main__":
    main()
