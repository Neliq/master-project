#!/usr/bin/env python3
"""Data-integrity verification + error inventory (reconstructed)."""
import json
import pathlib
from collections import defaultdict

EXP = pathlib.Path("/home/neliq/Coding/master-project/experiment-data")
RAW = EXP / "results" / "raw"

_gt = json.loads((EXP / "ground-truth.json").read_text())
if isinstance(_gt, dict):
    ground = {k: {"instance_id": k, **v} for k, v in _gt.items()}
else:
    ground = {g["instance_id"]: g for g in _gt}
instances = json.loads((EXP / "instances.json").read_text())

agents = {}
for f in sorted(RAW.glob("agent-*.jsonl")):
    rows = []
    for line in f.read_text().splitlines():
        if line.strip():
            rows.append(json.loads(line))
    agents[f.stem] = rows

by_id = defaultdict(dict)
for name, rows in agents.items():
    for r in rows:
        by_id[r["instance_id"]][r["arm"]] = (name, r)

issues = 0
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
