#!/usr/bin/env python3
"""Verify Run 6 multimodal bundles before model dispatch."""
import hashlib
import json
import re
from pathlib import Path
from leak_policy import find_leaks

RUN = Path(__file__).resolve().parents[1] / "run6-multimodal"
EVIDENCE = RUN / "evidence"
CORPUS = RUN / "corpus"
index = json.loads((EVIDENCE / "bundle-index.json").read_text())
records = index["records"]
issues = []
if len(records) != 372:
    issues.append(f"bundle records {len(records)} != 372")
if len({r.get("instance_id") for r in records}) != 372:
    issues.append("bundle IDs are not unique")

for record in records:
    iid = record.get("instance_id")
    d = EVIDENCE / iid
    dom = d / record.get("dom", "dom.html")
    semantic = d / record.get("semantic_text", "semantic.txt")
    sheet = d / record.get("visual_sheet", "visual-sheet.png")
    source = CORPUS / f"{iid}.html"
    for path in (dom, semantic, sheet, source):
        if not path.exists():
            issues.append(f"missing {path}")
    if not dom.exists() or not source.exists():
        continue
    if hashlib.sha256(dom.read_bytes()).digest() != hashlib.sha256(source.read_bytes()).digest():
        issues.append(f"DOM hash mismatch {iid}")
    text = dom.read_text(errors="replace") + "\n" + semantic.read_text(errors="replace")
    if re.search(r"Variant\s+[AB]|dark pattern|non-dark pattern|What changed", text, re.I):
        issues.append(f"variant/audit label leak {iid}")
    leaks = find_leaks(text)
    if leaks:
        issues.append(f"policy leaks {iid}: {leaks[:3]}")
    pngs = sorted(d.glob("s*.png"), key=lambda p: int(p.stem[1:])) if d.exists() else []
    expected = int(record.get("captured_live_states", 0))
    if len(pngs) != expected:
        issues.append(f"screenshot count {iid}: {len(pngs)} != {expected}")

print(json.dumps({
    "bundles": len(records),
    "screenshots": sum(int(r.get("captured_live_states", 0)) for r in records),
    "issues": len(issues),
    "sample_issues": issues[:10],
}, indent=2))
if issues:
    raise SystemExit(1)
