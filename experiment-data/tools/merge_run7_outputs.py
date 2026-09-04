#!/usr/bin/env python3
"""Strictly merge Run 7 C0/C1 development outputs."""
from __future__ import annotations

import json
import os
import re
from pathlib import Path

RUN = Path(os.environ.get("RUN7_DIR", Path(__file__).resolve().parents[1] / "run7-development-v2"))
ASSIGN = RUN / "agent-lists"
RESULTS = RUN / "results"
RAW0 = RESULTS / "raw-c0"
RAW1 = RESULTS / "raw-c1"
RAW = RESULTS / "raw"
REQUIRED = {
    "instance_id", "arm", "deceptive", "confidence", "evidence_status",
    "justification", "predicate_ledger", "vision_observation",
    "dom_observation", "semantic_observation",
}
REQUIRE_ROUTING = os.environ.get("RUN7_REQUIRE_ROUTING") == "1"

if RAW.exists():
    for path in RAW.glob("agent-*.jsonl"):
        path.unlink()
else:
    RAW.mkdir(parents=True)

issues: list[str] = []
merged: dict[str, list[dict]] = {}
all_ids: set[str] = set()
for assignment in sorted(ASSIGN.glob("agent-*.txt")):
    agent = assignment.stem
    ids = re.findall(r"inst-\d+", assignment.read_text())
    all_ids.update(ids)
    merged[agent] = []
    for arm, source_dir in (("c0", RAW0), ("c1", RAW1)):
        source = source_dir / f"{agent}.jsonl"
        if not source.exists():
            issues.append(f"missing output {source}")
            continue
        rows: list[dict] = []
        for line_no, line in enumerate(source.read_text().splitlines(), 1):
            if not line.strip():
                continue
            try:
                row = json.loads(line)
            except json.JSONDecodeError as exc:
                issues.append(f"invalid JSON {source}:{line_no}: {exc}")
                continue
            row["_agent"] = agent
            rows.append(row)
        if len(rows) != len(ids):
            issues.append(f"{source}: {len(rows)} rows, expected {len(ids)}")
        if [r.get("instance_id") for r in rows] != ids:
            issues.append(f"{source}: ID/order mismatch")
        for row in rows:
            iid = row.get("instance_id")
            if set(row) < REQUIRED:
                issues.append(f"{source}: missing fields for {iid}")
            if row.get("arm") != arm:
                issues.append(f"{source}: wrong arm for {iid}")
            if not isinstance(row.get("deceptive"), bool):
                issues.append(f"{source}: non-boolean verdict for {iid}")
            if row.get("evidence_status") not in {"SUFFICIENT", "UNKNOWN"}:
                issues.append(f"{source}: invalid evidence_status for {iid}")
            confidence = row.get("confidence")
            if not isinstance(confidence, (int, float)) or not 0 <= confidence <= 1:
                issues.append(f"{source}: invalid confidence for {iid}")
            if row.get("evidence_status") == "UNKNOWN" and isinstance(confidence, (int, float)) and confidence > 0.6:
                issues.append(f"{source}: UNKNOWN confidence exceeds 0.60 for {iid}")
            for field in ("justification", "vision_observation", "dom_observation", "semantic_observation"):
                if not isinstance(row.get(field), str) or not row[field].strip():
                    issues.append(f"{source}: empty {field} for {iid}")
            ledger = row.get("predicate_ledger")
            if not ((isinstance(ledger, str) and ledger.strip()) or (isinstance(ledger, list) and ledger)):
                issues.append(f"{source}: empty predicate_ledger for {iid}")
            if REQUIRE_ROUTING and arm == "c1":
                for routing_field in ("candidate_screen", "selected_cards"):
                    if routing_field not in row or not isinstance(row[routing_field], list):
                        issues.append(f"{source}: {routing_field} must be a list for {iid}")
                if not isinstance(row.get("candidate_screen"), list) or not row["candidate_screen"]:
                    issues.append(f"{source}: empty candidate_screen for {iid}")
                if isinstance(row.get("selected_cards"), list) and len(row["selected_cards"]) > 5:
                    issues.append(f"{source}: more than five selected_cards for {iid}")
            elif REQUIRE_ROUTING and arm == "c0" and ("candidate_screen" in row or "selected_cards" in row):
                if row.get("candidate_screen", []) != [] or row.get("selected_cards", []) != []:
                    issues.append(f"{source}: formalization routing fields must be empty for C0 {iid}")
            obs = [row.get(field, "").strip() for field in ("vision_observation", "dom_observation", "semantic_observation")]
            if len(set(obs)) < 3:
                issues.append(f"{source}: modality observations not distinct for {iid}")
        merged[agent].extend(rows)

expected = 2 * len(all_ids)
all_rows = [row for rows in merged.values() for row in rows]
keys = [(row.get("instance_id"), row.get("arm")) for row in all_rows]
if len(keys) != len(set(keys)):
    issues.append("duplicate instance/arm keys")
if len(all_rows) != expected:
    issues.append(f"total rows {len(all_rows)}, expected {expected}")

if issues:
    print(json.dumps({"issues": len(issues), "sample": issues[:20]}, indent=2))
    raise SystemExit(1)

for agent, rows in merged.items():
    (RAW / f"{agent}.jsonl").write_text("\n".join(json.dumps(row, ensure_ascii=False) for row in rows) + "\n")
print(json.dumps({"agents": len(merged), "instances": len(all_ids), "rows": len(all_rows), "issues": 0}, indent=2))
