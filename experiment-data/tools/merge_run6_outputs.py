#!/usr/bin/env python3
"""Merge and strictly validate independent Run 6 C0/C1 auditor outputs."""
import json
import re
from pathlib import Path

RUN = Path(__file__).resolve().parents[1] / "run6-multimodal"
ASSIGN = RUN / "agent-lists"
RESULTS = RUN / "results"
RAW0 = RESULTS / "raw-c0"
RAW1 = RESULTS / "raw-c1"
RAW = RESULTS / "raw"
REQUIRED = {"instance_id", "arm", "deceptive", "confidence", "justification",
            "vision_observation", "dom_observation", "semantic_observation"}

if RAW.exists():
    for p in RAW.glob("agent-*.jsonl"):
        p.unlink()
else:
    RAW.mkdir(parents=True)
issues = []
merged = {}
for assignment in sorted(ASSIGN.glob("agent-*.txt")):
    agent = assignment.stem
    ids = re.findall(r"inst-\d+", assignment.read_text())
    merged[agent] = []
    for arm, source_dir in (("c0", RAW0), ("c1", RAW1)):
        source = source_dir / f"{agent}.jsonl"
        if not source.exists():
            issues.append(f"missing output {source}")
            continue
        rows = []
        for line_no, line in enumerate(source.read_text().splitlines(), 1):
            if not line.strip():
                continue
            try:
                row = json.loads(line)
            except json.JSONDecodeError as exc:
                issues.append(f"invalid JSON {source}:{line_no}: {exc}")
                continue
            rows.append(row)
        if len(rows) != len(ids):
            issues.append(f"{source}: {len(rows)} rows, expected {len(ids)}")
        row_ids = [r.get("instance_id") for r in rows]
        if row_ids != ids:
            issues.append(f"{source}: ID/order mismatch")
        for row in rows:
            if set(row) < REQUIRED:
                issues.append(f"{source}: missing fields for {row.get('instance_id')}")
            if row.get("arm") != arm:
                issues.append(f"{source}: wrong arm for {row.get('instance_id')}")
            if not isinstance(row.get("deceptive"), bool):
                issues.append(f"{source}: non-boolean verdict for {row.get('instance_id')}")
            if not isinstance(row.get("confidence"), (int, float)) or not 0 <= row.get("confidence") <= 1:
                issues.append(f"{source}: invalid confidence for {row.get('instance_id')}")
            for field in ("justification", "vision_observation", "dom_observation", "semantic_observation"):
                if not isinstance(row.get(field), str) or not row[field].strip():
                    issues.append(f"{source}: empty {field} for {row.get('instance_id')}")
            observations = [row.get(f, "").strip() for f in ("vision_observation", "dom_observation", "semantic_observation")]
            if len(set(observations)) < 3:
                issues.append(f"{source}: modality observations not distinct for {row.get('instance_id')}")
        merged[agent].extend(rows)

if issues:
    print(json.dumps({"issues": len(issues), "sample": issues[:20]}, indent=2))
    raise SystemExit(1)

for agent, rows in merged.items():
    (RAW / f"{agent}.jsonl").write_text("\n".join(json.dumps(r, ensure_ascii=False) for r in rows) + "\n")
all_rows = [r for rows in merged.values() for r in rows]
print(json.dumps({"agents": len(merged), "rows": len(all_rows), "expected": 744, "issues": 0}, indent=2))
if len(all_rows) != 744:
    raise SystemExit(1)
