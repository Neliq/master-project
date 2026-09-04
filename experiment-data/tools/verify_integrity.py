#!/usr/bin/env python3
"""Data-integrity verification + error inventory (reconstructed)."""
import json
import os
import pathlib
import re
from collections import defaultdict
from leak_policy import find_leaks

EXP = pathlib.Path(os.environ.get("EXPERIMENT_DIR", pathlib.Path(__file__).resolve().parents[1]))
RAW = pathlib.Path(os.environ.get("RAW_DIR", EXP / "results" / "raw"))
AGENT_LIST_DIR = pathlib.Path(os.environ.get("AGENT_LIST_DIR", EXP / "agent-lists-run4"))

_gt = json.loads((EXP / "ground-truth.json").read_text())
if isinstance(_gt, dict):
    ground = {k: {"instance_id": k, **v} for k, v in _gt.items()}
else:
    ground = {g["instance_id"]: g for g in _gt}
instances = json.loads((EXP / "instances.json").read_text())

agents = {}
schema_issues = []
assignment_issues = []
agent_by_instance = defaultdict(set)
for f in sorted(RAW.glob("agent-*.jsonl")):
    rows = []
    for line in f.read_text().splitlines():
        if line.strip():
            rows.append(json.loads(line))
    agents[f.stem] = rows

for name, rows in agents.items():
    assignment_file = AGENT_LIST_DIR / f"{name}.txt"
    assigned = set(re.findall(r"inst-\d+", assignment_file.read_text())) if assignment_file.exists() else set()
    row_ids = {r.get("instance_id") for r in rows}
    if len(rows) != 2 * len(assigned) or row_ids != assigned:
        assignment_issues.append((name, len(rows), len(assigned), len(row_ids)))
    for r in rows:
        agent_by_instance[r.get("instance_id")].add(name)
        if r.get("instance_id") not in assigned:
            assignment_issues.append((name, "unassigned", r.get("instance_id")))
        if r.get("arm") not in ("c0", "c1"):
            schema_issues.append((name, "arm", r.get("arm")))
        if not isinstance(r.get("deceptive"), bool):
            schema_issues.append((name, "deceptive", r.get("instance_id")))
        if not isinstance(r.get("confidence"), (int, float)) or not 0 <= r.get("confidence") <= 1:
            schema_issues.append((name, "confidence", r.get("instance_id")))
        if not isinstance(r.get("justification"), str) or not r.get("justification", "").strip():
            schema_issues.append((name, "justification", r.get("instance_id")))

pair_agents = defaultdict(set)
for iid, meta in instances.items():
    pair = (meta.get("slug"), meta.get("condition_index"), meta.get("variant"))
    pair_agents[pair].update(agent_by_instance.get(iid, set()))
for slug in sorted({meta.get("slug") for meta in instances.values()}):
    for layer in (1, 2, 3):
        a_agents = pair_agents[(slug, layer, "A")]
        b_agents = pair_agents[(slug, layer, "B")]
        overlap = a_agents & b_agents
        if overlap:
            assignment_issues.append((slug, layer, "A/B same auditor", sorted(overlap)))

by_id = defaultdict(dict)
duplicate_rows = []
seen_rows = set()
for name, rows in agents.items():
    for r in rows:
        key = (r["instance_id"], r["arm"])
        if key in seen_rows:
            duplicate_rows.append((name, *key))
            continue
        seen_rows.add(key)
        by_id[r["instance_id"]][r["arm"]] = (name, r)

issues = 0
if schema_issues:
    print(f"SCHEMA ISSUES: {schema_issues[:10]}")
    issues += len(schema_issues)
if assignment_issues:
    print(f"ASSIGNMENT ISSUES: {assignment_issues[:10]}")
    issues += len(assignment_issues)
for iid in sorted(ground):
    d = by_id.get(iid, {})
    for arm in ("c0", "c1"):
        if arm not in d:
            print(f"MISSING {iid} {arm}")
            issues += 1

seen = set()
for iid, d in by_id.items():
    if iid in seen:
        print(f"DUP instance {iid}")
        issues += 1
    seen.add(iid)

unknown = seen - set(ground)
if unknown:
    print(f"UNKNOWN instance ids: {unknown}")
    issues += 1
if duplicate_rows:
    print(f"DUPLICATE instance/arm rows: {duplicate_rows[:10]}")
    issues += len(duplicate_rows)

expected_files = {f"{iid}.html" for iid in ground}
actual_files = {f.name for f in (EXP / "corpus").glob("*.html")}
missing_files = expected_files - actual_files
extra_files = actual_files - expected_files
if missing_files:
    print(f"MISSING corpus files: {sorted(missing_files)[:10]}")
    issues += len(missing_files)
if extra_files:
    print(f"EXTRA corpus files: {sorted(extra_files)[:10]}")
    issues += len(extra_files)

size_mismatches = []
leaks = []
for iid, meta in instances.items():
    fragment = EXP / "corpus" / f"{iid}.html"
    if fragment.exists():
        if meta.get("size_bytes") != fragment.stat().st_size:
            size_mismatches.append((iid, meta.get("size_bytes"), fragment.stat().st_size))
        for leak in find_leaks(fragment.read_text(errors="replace")):
            leaks.append((iid, leak))
if size_mismatches:
    print(f"SIZE MISMATCHES: {len(size_mismatches)} (sample {size_mismatches[:5]})")
    issues += len(size_mismatches)
if leaks:
    print(f"LEAK MARKERS: {len(leaks)} (sample {leaks[:10]})")
    issues += len(leaks)
print(f"INTEGRITY ISSUES: {issues}")

# error inventory
inv = []
for iid, g in sorted(ground.items()):
    truth = g["deceptive"]
    verdicts = {}
    for name, rows in agents.items():
        for r in rows:
            if r["instance_id"] == iid:
                verdicts[r["arm"]] = r
    c0_wrong = verdicts.get("c0", {}).get("deceptive") != truth
    c1_wrong = verdicts.get("c1", {}).get("deceptive") != truth
    if not (c0_wrong or c1_wrong):
        continue
    info = instances.get(iid, {})
    layer = info.get("condition_index", 0)
    slug = info.get("slug", iid)
    who = next((n for n, rows in agents.items() if any(r["instance_id"] == iid for r in rows)), "?")
    for arm in ("c0", "c1"):
        r = verdicts.get(arm)
        if r is None:
            continue
        wrong = r["deceptive"] != truth
        if not wrong:
            continue
        inv.append(f"| {iid} | {info.get('variant', '?')} | {layer} | {truth} | {who} | {arm} | {r['confidence']} | {r['justification'][:120]} |")

M = ["## Error inventory (instances where any arm disagreed with ground truth)", ""]
M.append(f"Total disagreements: **{len(inv)}** across **{len({e.split('|')[1].strip() for e in inv})}** distinct instances")
M.append("| Instance | Variant | Layer | Truth | Agent | Arm | Conf | Justification (first 120 chars) |")
M.append("|---|---|---|---|---|---|---|---|")
M.extend(inv)
(EXP / "results" / "error-inventory.md").write_text("\n".join(M) + "\n")
print(f"error inventory: {len(inv)} rows")
if issues:
    raise SystemExit(1)
