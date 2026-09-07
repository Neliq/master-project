#!/usr/bin/env python3
"""Build the full two-arm 62 x 3 x 2 live isolated-demo test."""
from __future__ import annotations

import hashlib
import json
import os
import random
import re
import shutil
from pathlib import Path
from typing import cast

ROOT = Path("/home/neliq/Coding/master-project/experiment-data")
SOURCE_ROOT = Path("/home/neliq/Coding/master-project/src")
THESIS_ONTOLOGY = Path("/home/neliq/Coding/Master-Thesis/ontology")
OUT = Path(os.environ.get("FULL_BINARY_OUT") or ROOT / "full-binary-aided-test-20260906-gpt54mini")
BASE_URL = "http://127.0.0.1:3000"
SEED = 20260906
ARMS = ("not-aided", "aided")
CONDITIONS = (1, 2, 3)
VARIANTS = (1, 2)
AGENTS_PER_ARM = 6


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def write_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n")


def route_patterns() -> list[dict[str, object]]:
    source = (SOURCE_ROOT / "lib/patterns.ts").read_text()
    pairs = re.findall(r'\bslug:\s*"([^"]+)"\s*,\s*\n\s*name:\s*"([^"]+)"', source)
    if len(pairs) != 62 or len({slug for slug, _name in pairs}) != 62:
        raise SystemExit(f"expected 62 unique website patterns, found {len(pairs)}")
    return [
        {"pattern_number": index, "slug": slug, "name": name}
        for index, (slug, name) in enumerate(pairs, 1)
    ]


def main() -> None:
    if OUT.exists():
        raise SystemExit(f"refusing to overwrite {OUT}")
    ontology_path = THESIS_ONTOLOGY / "ontology.json"
    ontology = json.loads(ontology_path.read_text())
    by_name = {pattern["name"]: pattern for pattern in ontology["patterns"]}
    routes = route_patterns()
    if len(by_name) != 62:
        raise SystemExit(f"expected 62 ontology patterns, found {len(by_name)}")
    missing = [route["name"] for route in routes if route["name"] not in by_name]
    if missing:
        raise SystemExit(f"website patterns missing from current ontology: {missing}")
    if any(len(by_name[route["name"]].get("conditions", [])) != 3 for route in routes):
        raise SystemExit("current ontology does not provide exactly three conditions per pattern")

    OUT.mkdir(parents=True)
    (OUT / "assignments").mkdir()
    (OUT / "current-ontology" / "cards").mkdir(parents=True)
    (OUT / "score-only").mkdir()
    for arm in ARMS:
        (OUT / "assignments" / arm).mkdir(parents=True)
        (OUT / "results" / f"raw-{arm}").mkdir(parents=True)

    for name in ("ontology.json", "ontology.schema.json", "README.md"):
        shutil.copy2(THESIS_ONTOLOGY / name, OUT / "current-ontology" / name)
    for card in (THESIS_ONTOLOGY / "cards").glob("card-*.md"):
        shutil.copy2(card, OUT / "current-ontology" / "cards" / card.name)
    write_json(OUT / "current-ontology" / "website-route-map.json", routes)

    rules: list[dict[str, object]] = []
    rules_md = [
        "# Full formalization pseudocode",
        "",
        "General rules only: no demonstrations, page examples, or labelled cases.",
        "Formalizations are candidate-specific evidence support, not a replacement classifier.",
        "Missing or unobservable evidence is neutral: it gives no support and cannot negate the live-evidence base judgment.",
        "Apply at most three plausible candidate rules to one page; never combine all rules globally.",
        "",
    ]
    for route in routes:
        pattern = by_name[route["name"]]
        for condition in pattern["conditions"]:
            translation = condition["translation"]
            pseudo = [line for line in condition["machine_semantics"]["pseudo_code"] if "UNKNOWN" not in line]
            pseudocode = [
                "CONTEXT GATE: identify the rule's specific object/context and mechanism anchor before evaluation.",
                "IF only a generic UI object, generic price, generic CTA, or mere absence is observed: provide no support.",
                "IF a required atom is unavailable: provide no support, preserve the base judgment, and record the evidence as missing.",
                "IF a required atom depends on a UI transition: snapshot the scoped DOM, activate the most direct in-scope control once, wait for rendered settlement, and snapshot again.",
                "IF a visible standard next step is required by the rule: follow one such step and capture the resulting scoped DOM; an unverified click is missing evidence, not a negative.",
            ] + pseudo
            rule = {
                "rule_id": condition["id"],
                "pattern": route["name"],
                "slug": route["slug"],
                "condition": condition["ordinal"],
                "condition_name": condition["name"],
                "operational_reading": translation["operational_reading"],
                "pseudocode": pseudocode,
                "required_atoms": translation["required_atoms"],
                "direct_counterevidence": translation["direct_counterevidence"],
            }
            rules.append(rule)
            rules_md += [
                f"## {condition['id']} — {route['name']} — {condition['name']}",
                "",
                f"Operational reading: {translation['operational_reading']}",
                "",
                "Pseudocode:",
                *[f"- `{line}`" for line in pseudocode],
                "",
                "Required observable atoms:",
                *[f"- {atom}" for atom in translation["required_atoms"]],
                "",
                "Direct counterevidence:",
                *[f"- {atom}" for atom in translation["direct_counterevidence"]],
                "",
            ]
    aid_text = "\n".join(rules_md)
    if "UNKNOWN" in aid_text:
        raise SystemExit("generated aid package contains a forbidden third-label token")
    (OUT / "arms").mkdir()
    (OUT / "arms" / "aided").mkdir()
    (OUT / "arms" / "aided" / "formalizations-pseudocode.md").write_text(aid_text)
    write_json(OUT / "arms" / "aided" / "formalizations.json", rules)
    index_rules = [
        {
            "rule_id": rule["rule_id"],
            "pattern": rule["pattern"],
            "slug": rule["slug"],
            "condition": rule["condition"],
            "condition_name": rule["condition_name"],
            "operational_reading": rule["operational_reading"],
            "required_atoms": rule["required_atoms"],
            "direct_counterevidence": rule["direct_counterevidence"],
        }
        for rule in rules
    ]
    write_json(OUT / "arms" / "aided" / "formalization-index.json", index_rules)
    index_jsonl = "".join(
        json.dumps(
            {
                "id": rule["rule_id"],
                "pattern": rule["pattern"],
                "condition": rule["condition"],
                "name": rule["condition_name"],
                "reading": rule["operational_reading"],
                "atoms": rule["required_atoms"],
                "counter": rule["direct_counterevidence"],
            },
            ensure_ascii=False,
            separators=(",", ":"),
        ) + "\n"
        for rule in rules
    )
    (OUT / "arms" / "aided" / "formalization-index.jsonl").write_text(index_jsonl)
    pattern_index = []
    for route in routes:
        pattern_index.append({
            "pattern": route["name"],
            "slug": route["slug"],
            "conditions": [
                {
                    "id": rule["rule_id"],
                    "condition": rule["condition"],
                    "name": rule["condition_name"],
                    "reading": rule["operational_reading"],
                }
                for rule in rules
                if rule["slug"] == route["slug"]
            ],
        })
    pattern_jsonl = "".join(json.dumps(item, ensure_ascii=False, separators=(",", ":")) + "\n" for item in pattern_index)
    (OUT / "arms" / "aided" / "pattern-routing-index.jsonl").write_text(pattern_jsonl)
    index_md = [
        "# Indexed formalization rules", "",
        "General pseudocode rules only; no demonstrations or labelled cases.",
        "Use this index for high-recall candidate screening. Select exact rule IDs only.",
        "Evaluate required atoms from live evidence; missing evidence gives no support.",
        "A rule is DIRECT only when its context gate and every required atom are directly observed.", "",
    ]
    for rule in index_rules:
        atoms = cast(list[str], rule["required_atoms"])
        counterevidence = cast(list[str], rule["direct_counterevidence"])
        index_md += [
            f"## {rule['rule_id']} — {rule['pattern']} — condition {rule['condition']}: {rule['condition_name']}", "",
            f"Operational reading: {rule['operational_reading']}", "",
            "Pseudocode:",
            "- CHECK the pattern-specific context and mechanism gate.",
            "- EVALUATE every required atom only from directly observed evidence.",
            "- RETURN DIRECT only when all required atoms are observed and no counterevidence is observed.", "",
            "Required observable atoms:", *[f"- {atom}" for atom in atoms], "",
            "Direct counterevidence:", *[f"- {atom}" for atom in counterevidence], "",
        ]
    (OUT / "arms" / "aided" / "formalization-index.md").write_text("\n".join(index_md))

    records: list[dict[str, object]] = []
    for route in routes:
        for condition in CONDITIONS:
            for variant in VARIANTS:
                ordinal = len(records)
                instance_id = "task-" + hashlib.sha256(f"{SEED}:{ordinal}".encode()).hexdigest()[:12]
                records.append({
                    "instance_id": instance_id,
                    "slug": route["slug"],
                    "pattern_name": route["name"],
                    "pattern_number": route["pattern_number"],
                    "condition": condition,
                    "variant": variant,
                    "deceptive": variant == 1,
                    "url": f"{BASE_URL}/{route['pattern_number']}/{condition}/{variant}",
                })
    random.Random(SEED).shuffle(records)
    if len(records) != 372 or len({row["url"] for row in records}) != 372:
        raise SystemExit(f"expected 372 distinct interfaces, found {len(records)}")

    for arm in ARMS:
        chunks = [records[i * len(records) // AGENTS_PER_ARM : (i + 1) * len(records) // AGENTS_PER_ARM] for i in range(AGENTS_PER_ARM)]
        for index, chunk in enumerate(chunks, 1):
            write_json(
                OUT / "assignments" / arm / f"agent-{index:02d}.json",
                [{"instance_id": row["instance_id"], "url": row["url"]} for row in chunk],
            )

    runtime = {
        "model": "gpt-5.4-mini",
        "provider": "openai-codex",
        "service_tier": "fast",
        "reasoning_effort": "minimal",
        "arms": list(ARMS),
        "agents_total": AGENTS_PER_ARM * len(ARMS),
        "agents_per_arm": AGENTS_PER_ARM,
        "distinct_interfaces": len(records),
        "audit_rows_total": len(records) * len(ARMS),
        "seed": SEED,
        "ontology_sha256": sha256(ontology_path),
        "aid_package": "pattern-first-indexed-formalization-screening",
        "pattern_index_sha256": sha256(OUT / "arms" / "aided" / "pattern-routing-index.jsonl"),
        "aid_index_sha256": sha256(OUT / "arms" / "aided" / "formalization-index.jsonl"),
    }
    write_json(OUT / "runtime-config.json", runtime)
    write_json(OUT / "public-manifest.json", {
        "run_id": OUT.name,
        "purpose": "full two-arm binary aided versus not-aided live isolated-demo test",
        "base_url": BASE_URL,
        "patterns": len(routes),
        "conditions_per_pattern": len(CONDITIONS),
        "variants_per_condition": len(VARIANTS),
        "distinct_interfaces": len(records),
        "audit_rows_total": len(records) * len(ARMS),
        "agents_total": AGENTS_PER_ARM * len(ARMS),
        "agents_per_arm": AGENTS_PER_ARM,
        "arms": list(ARMS),
        "seed": SEED,
        "labels_public": False,
        "evidence_mode": "live isolated URL; scoped data-isolated-demo DOM and transitions",
        "ontology_source": "Master-Thesis/ontology",
        "ontology_sha256": sha256(ontology_path),
    })
    write_json(OUT / "score-only" / "instances.json", {row["instance_id"]: row for row in records})
    write_json(OUT / "score-only" / "ground-truth.json", {row["instance_id"]: {"deceptive": row["deceptive"]} for row in records})
    write_json(OUT / "score-only" / "route-patterns.json", routes)
    write_json(OUT / "score-only" / "rules.json", rules)

    common = f'''# Full binary live isolated-demo audit

Run ID: `{OUT.name}`

- 62 patterns × 3 conditions × 2 variants = 372 distinct live interfaces.
- The same 372 interfaces are audited in both arms: 744 audit rows total.
- Exactly two arms exist: `not-aided` and `aided`.
- Six workers are assigned to each arm; workers are replication units, not extra arms.
- Exactly two final labels are permitted: `DECEPTIVE` or `BENIGN`.
- The URL path, title, route number, pattern name, and task ID are not evidence.
- Agents must not read `score-only/`, other assignments, or prior results.
- Browser interaction is limited to the rendered isolated demo and controls inside `[data-isolated-demo]`.
'''
    (OUT / "protocol-not-aided.md").write_text(common + """
## Not-aided arm

Use only the live rendered page and observable DOM/interaction transitions. Do not use ontology files, cards, formal rules, pseudocode, pattern suggestions, candidate lists, or examples. Report one binary label.
""")
    (OUT / "protocol-aided.md").write_text(common + """
## Aided arm

The only aid is `arms/aided/pattern-routing-index.jsonl` plus `arms/aided/formalization-index.jsonl`; both contain general rules without demonstrations or labelled cases. Read the complete 62-line pattern index first. First form `base_label` from live evidence, then write a neutral `mechanism_summary`. Select one plausible pattern from the pattern index before selecting up to three exact condition-rule IDs belonging to that pattern. Never guess IDs from numbers or mix rules from different patterns. Record the screening result and apply only selected candidates.

For a candidate requiring a state or transition atom, snapshot the scoped DOM before and after the most direct in-scope control, wait for rendered settlement, and follow one visible standard next step if required. Use direct observed atoms only. Missing or unobservable evidence is neutral and cannot downgrade the base label. The final label is `DECEPTIVE` when the base label is `DECEPTIVE` or direct formal support exists; otherwise it is `BENIGN`.
""")
    prompts = {
        "not-aided": f'''# Not-aided full-test auditor

Process every task in `{OUT}/assignments/not-aided/agent-XX.json` exactly once and in order. Write exactly one JSON object per task to `{OUT}/results/raw-not-aided/agent-XX.jsonl`.

Use a real browser. For each URL, set the document title to `Isolated audit demo` and replace the visible history path with `/audit-view`. Inspect only the rendered page and controls inside `[data-isolated-demo]`. Do not read source code, `score-only/`, other assignments, or prior results. Do not use page title, URL, route number, pattern name, or task ID as evidence.

This is the not-aided arm. Use only live observable evidence and output exactly `DECEPTIVE` or `BENIGN`.

JSON shape:
```json
{{"instance_id":"task-...","arm":"not-aided","model_final":"DECEPTIVE|BENIGN","confidence":0.0,"evidence_status":"SUFFICIENT|LIMITED","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"..."}}
```
''',
        "aided": f'''# Aided full-test auditor

Process every task in `{OUT}/assignments/aided/agent-XX.json` exactly once and in order. Write exactly one JSON object per task to `{OUT}/results/raw-aided/agent-XX.jsonl`.

Use a real browser. For each URL, set the document title to `Isolated audit demo` and replace the visible history path with `/audit-view`. Inspect only the rendered page and controls inside `[data-isolated-demo]`. Do not read source code, `score-only/`, other assignments, or prior results. Do not use page title, URL, route number, pattern name, or task ID as evidence.

The only aid is `{OUT}/arms/aided/pattern-routing-index.jsonl` plus `{OUT}/arms/aided/formalization-index.jsonl`; both contain general rules without demonstrations or labelled cases. Read the complete 62-line pattern index first. First make `base_label` from live evidence, then write a neutral `mechanism_summary`. Select one plausible pattern from the pattern index before selecting up to three exact condition-rule IDs belonging to that pattern. After selecting IDs, look up every selected ID in the rule index and discard any ID whose `pattern` field is not exactly equal to `candidate_pattern`; never output a cross-pattern ID. Before writing each row, assert that every `candidate_rule_ids` and `formal_support_rule_ids` entry belongs to `candidate_pattern`. Never guess IDs from numbers or mix rules from different patterns. Record a non-empty `candidate_screening` note stating the selected pattern and mechanism match, or why no pattern matched. Apply only selected candidates.

For a candidate requiring a state or transition atom, snapshot the scoped DOM before and after the most direct in-scope control, wait for rendered settlement, and follow one visible standard next step if required. Record formal support as `DIRECT` only when the context gate and every required atom are directly observed. Missing or unobservable evidence is neutral and cannot downgrade `base_label`. Final label equation: `DECEPTIVE` if `base_label` is `DECEPTIVE` or formal support is `DIRECT`; otherwise `BENIGN`.

JSON shape:
```json
{{"instance_id":"task-...","arm":"aided","base_label":"DECEPTIVE|BENIGN","mechanism_summary":"...","candidate_pattern":"...","candidate_screening":"...","candidate_rule_ids":["DP-...-C1"],"formal_support":"DIRECT|NONE","formal_support_rule_ids":["DP-...-C1"],"formal_contradiction":"DIRECT|NONE","missing_or_unobservable":false,"model_final":"DECEPTIVE|BENIGN","confidence":0.0,"evidence_status":"SUFFICIENT|LIMITED","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"..."}}
```
''',
    }
    for arm, prompt in prompts.items():
        (OUT / f"prompt-{arm}.md").write_text(prompt)
    (OUT / "auditor-prompts.md").write_text("\n\n---\n\n".join(prompts.values()) + "\n")
    print(json.dumps({"run": str(OUT), "distinct_interfaces": len(records), "audit_rows_total": len(records) * len(ARMS), "patterns": len(routes), "conditions": len(CONDITIONS), "agents_total": AGENTS_PER_ARM * len(ARMS), "agents_per_arm": AGENTS_PER_ARM, "arms": list(ARMS), "ontology_sha256": sha256(ontology_path)}, indent=2))


if __name__ == "__main__":
    main()
