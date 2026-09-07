#!/usr/bin/env python3
"""Build a two-arm binary live isolated-demo test."""
from __future__ import annotations

import hashlib
import importlib.util
import json
import os
import random
import shutil
import sys
from pathlib import Path

TOOLS = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("quick_builder", TOOLS / "build_quick_live_test.py")
if spec is None or spec.loader is None:
    raise RuntimeError("cannot load shared quick-test builder")
quick = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = quick
spec.loader.exec_module(quick)

ROOT = quick.ROOT
THESIS_ONTOLOGY = quick.THESIS_ONTOLOGY
SELECTED = quick.SELECTED
SEED = quick.SEED
AGENTS = quick.AGENTS
BASE_URL = quick.BASE_URL
OUT = Path(os.environ.get("BINARY_AIDED_OUT") or ROOT / "binary-aided-test-20260906-v7")
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
        pattern = by_name[selected["name"]]
        condition = pattern["conditions"][0]
        translation = condition["translation"]
        semantics = condition["machine_semantics"]
        pseudocode = [line for line in semantics["pseudo_code"] if "UNKNOWN" not in line]
        pseudocode.append("IF the formal proof is not directly established: RETURN BENIGN for this binary test.")
        rules.append({
            "rule_id": condition["id"],
            "pattern": selected["name"],
            "operational_reading": translation["operational_reading"],
            "required_atoms": translation["required_atoms"],
            "direct_counterevidence": translation["direct_counterevidence"],
            "pseudocode": pseudocode,
        })

    rules_md = [
        "# General formalization pseudocode",
        "",
        "This file contains general rules only. It contains no demonstrations, page examples, or labelled cases.",
        "Use the rules as observable-evidence obligations; do not infer hidden intent or backend state.",
        "",
    ]
    for rule in rules:
        rules_md += [f"## {rule['rule_id']} — {rule['pattern']}", "", f"Operational reading: {rule['operational_reading']}", "", "Pseudocode:"]
        rules_md += [f"- `{line}`" for line in rule["pseudocode"]]
        rules_md += ["", "Required observable atoms:"]
        rules_md += [f"- {atom}" for atom in rule["required_atoms"]]
        rules_md += ["", "Direct counterevidence:"]
        rules_md += [f"- {item}" for item in rule["direct_counterevidence"]]
        rules_md += [""]
    (OUT / "arms" / "aided" / "formalizations-pseudocode.md").write_text("\n".join(rules_md))
    (OUT / "arms" / "aided" / "formalizations.json").write_text(json.dumps(rules, indent=2, ensure_ascii=False) + "\n")

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
        "purpose": "binary two-arm live isolated-demo test",
        "base_url": BASE_URL,
        "patterns": 10,
        "instances": len(records),
        "agents_per_arm": AGENTS,
        "arms": list(ARMS),
        "seed": SEED,
        "labels_public": False,
        "ontology_source": "Master-Thesis/ontology (aided pseudocode only)",
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

Use only the live rendered page and its observable DOM/interaction transitions. Do not use ontology files, cards, formal rules, pseudocode, pattern suggestions, candidate lists, or examples. Report one binary label from the live evidence.
""")
    (OUT / "protocol-aided.md").write_text(common + """
## Aided arm

Read only `arms/aided/formalizations-pseudocode.md` for assistance. It contains general formalization rules and no demonstrations or labelled examples. Apply the rules to the live evidence. Do not read cards or any other ontology artifact. Report one binary label; never abstain.
""")

    prompts = {
        "not-aided": f'''# Not-aided binary auditor

Process every task in `{OUT}/assignments/agent-XX.json` exactly once and in order. Write exactly one JSON object per task to `{OUT}/results/raw-not-aided/agent-XX.jsonl`.

Use a real browser. Treat each URL as an opaque audit handle. Immediately set the document title to `Isolated audit demo` and replace the visible history path with `/audit-view`. Inspect only the rendered page and, when useful, controls inside `[data-isolated-demo]`. Do not read source code, ontology files, cards, formalizations, `score-only/`, other assignments, or prior results. Do not use page title, URL, route number, pattern names, or task ID as evidence.

This arm has no aiding material. Use only live observable evidence. You must report exactly `DECEPTIVE` or `BENIGN`; abstention and requests for more evidence are forbidden. Make the best binary judgement supported by the page.

JSON shape:
```json
{{"instance_id":"task-...","arm":"not-aided","model_final":"DECEPTIVE|BENIGN","confidence":0.0,"evidence_status":"SUFFICIENT|LIMITED","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"..."}}
```
''',
        "aided": f'''# Aided binary auditor

Process every task in `{OUT}/assignments/agent-XX.json` exactly once and in order. Write exactly one JSON object per task to `{OUT}/results/raw-aided/agent-XX.jsonl`.

Use a real browser. Treat each URL as an opaque audit handle. Immediately set the document title to `Isolated audit demo` and replace the visible history path with `/audit-view`. Inspect only the rendered page and, when useful, controls inside `[data-isolated-demo]`. Do not read source code, cards, `score-only/`, other assignments, or prior results. Do not use page title, URL, route number, pattern names, or task ID as evidence.

The only aid is `{OUT}/arms/aided/formalizations-pseudocode.md`. It contains general pseudocode rules matching the formalizations, with required observable atoms and counterevidence. It contains no demonstrations or labelled examples. Apply those rules to live evidence; do not invent thresholds or hidden state. You must report exactly `DECEPTIVE` or `BENIGN`; abstention and requests for more evidence are forbidden. Make the best binary judgement supported by the page and the rules.

JSON shape:
```json
{{"instance_id":"task-...","arm":"aided","model_final":"DECEPTIVE|BENIGN","confidence":0.0,"evidence_status":"SUFFICIENT|LIMITED","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"..."}}
```
''',
    }
    for arm, prompt in prompts.items():
        (OUT / f"prompt-{arm}.md").write_text(prompt)
    (OUT / "auditor-prompts.md").write_text("\n\n---\n\n".join(prompts.values()) + "\n")
    print(json.dumps({"run": str(OUT), "instances": len(records), "patterns": len(SELECTED), "agents_per_arm": AGENTS, "arms": list(ARMS), "ontology_sha256": sha256(ontology_path)}, indent=2))


if __name__ == "__main__":
    main()
