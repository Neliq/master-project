#!/usr/bin/env python3
"""Validate and aggregate the two-arm binary live test."""
from __future__ import annotations

import json
import os
from pathlib import Path

RUN = Path(os.environ.get("BINARY_AIDED_OUT") or "/home/neliq/Coding/master-project/experiment-data/binary-aided-test-20260906-v7")
SCORE = RUN / "score-only"
ARMS = ("not-aided", "aided")
LABELS = {"DECEPTIVE", "BENIGN"}


def load(path: Path):
    return json.loads(path.read_text())


def metric(values):
    tp = sum(pred == "DECEPTIVE" and truth for _iid, pred, truth in values)
    fp = sum(pred == "DECEPTIVE" and not truth for _iid, pred, truth in values)
    tn = sum(pred == "BENIGN" and not truth for _iid, pred, truth in values)
    fn = sum(pred == "BENIGN" and truth for _iid, pred, truth in values)
    n = len(values)
    precision = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn) if tp + fn else 0.0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    return {"n": n, "accuracy": (tp + tn) / n if n else 0.0, "precision": precision, "recall": recall, "f1": f1, "tp": tp, "fp": fp, "tn": tn, "fn": fn}


def read_rows(arm, assignments, issues):
    rows = {}
    for agent, expected_ids in assignments.items():
        path = RUN / "results" / f"raw-{arm}" / f"{agent}.jsonl"
        if not path.exists():
            issues.append(f"missing {path}")
            continue
        parsed = []
        for line_no, line in enumerate(path.read_text().splitlines(), 1):
            if not line.strip():
                continue
            try:
                parsed.append(json.loads(line))
            except json.JSONDecodeError as exc:
                issues.append(f"invalid JSON {path}:{line_no}: {exc}")
        if len(parsed) != len(expected_ids):
            issues.append(f"{path}: {len(parsed)} rows, expected {len(expected_ids)}")
        if [r.get("instance_id") for r in parsed] != expected_ids:
            issues.append(f"{path}: assignment order/IDs mismatch")
        for row in parsed:
            iid = row.get("instance_id")
            if iid in rows:
                issues.append(f"duplicate {arm}/{iid}")
            rows[iid] = row
    return rows


def validate(row, arm, issues):
    required = {"instance_id", "arm", "model_final", "confidence", "evidence_status", "visual_observation", "dom_observation", "transition_observation", "justification"}
    iid = row.get("instance_id")
    missing = required - set(row)
    if missing:
        issues.append(f"{arm}/{iid}: missing {sorted(missing)}")
        return
    if row.get("arm") != arm or row.get("model_final") not in LABELS:
        issues.append(f"{arm}/{iid}: binary arm/label invalid")
    if not isinstance(row.get("confidence"), (int, float)) or not 0 <= row["confidence"] <= 1:
        issues.append(f"{arm}/{iid}: confidence invalid")
    if row.get("evidence_status") not in {"SUFFICIENT", "LIMITED"}:
        issues.append(f"{arm}/{iid}: evidence_status invalid")
    for field in ("visual_observation", "dom_observation", "transition_observation", "justification"):
        if not isinstance(row.get(field), str) or not row[field].strip():
            issues.append(f"{arm}/{iid}: empty {field}")
    if "UNKNOWN" in json.dumps(row, ensure_ascii=False):
        issues.append(f"{arm}/{iid}: UNKNOWN is forbidden")


def main():
    truth = load(SCORE / "ground-truth.json")
    instances = load(SCORE / "instances.json")
    assignments = {p.stem: [x["instance_id"] for x in load(p)] for p in sorted((RUN / "assignments").glob("agent-*.json"))}
    issues = []
    rows = {arm: read_rows(arm, assignments, issues) for arm in ARMS}
    expected = set(truth)
    for arm in ARMS:
        if set(rows[arm]) != expected:
            issues.append(f"{arm}: coverage {len(rows[arm])}/{len(expected)}")
        for row in rows[arm].values():
            validate(row, arm, issues)
    if issues:
        print(json.dumps({"status": "FAIL", "issues": len(issues), "sample": issues[:30]}, indent=2))
        raise SystemExit(1)

    metrics = {arm: metric([(iid, rows[arm][iid]["model_final"], bool(truth[iid]["deceptive"])) for iid in sorted(expected)]) for arm in ARMS}
    flips = sum(rows["not-aided"][iid]["model_final"] != rows["aided"][iid]["model_final"] for iid in sorted(expected))
    per_pattern = {}
    for iid in sorted(expected):
        slug = instances[iid]["slug"]
        per_pattern.setdefault(slug, {arm: [] for arm in ARMS})
        for arm in ARMS:
            per_pattern[slug][arm].append({"truth": "DECEPTIVE" if truth[iid]["deceptive"] else "BENIGN", "prediction": rows[arm][iid]["model_final"]})

    result = {
        "run_id": RUN.name,
        "design": {"patterns": len(per_pattern), "instances": len(expected), "agents_per_arm": len(assignments), "arms": list(ARMS), "binary_only": True, "unknown_forbidden": True, "aided_material": "general pseudocode formalizations without demonstrations"},
        "metrics": metrics,
        "paired_label_flips": flips,
        "per_pattern": per_pattern,
        "validation": {"issues": 0, "rows": {arm: len(rows[arm]) for arm in ARMS}},
    }
    (RUN / "results" / "results.json").write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n")
    report = [f"# Binary aided-vs-not-aided live test — {RUN.name}", "", f"- {len(expected)} live tasks, {len(per_pattern)} patterns, {len(assignments)} agents per arm.", "- Both arms are forced binary: no UNKNOWN or abstention.", "", "| Arm | N | Accuracy | Precision | Recall | F1 | TP | FP | TN | FN |", "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|"]
    for arm, m in metrics.items():
        report.append(f"| {arm} | {m['n']} | {m['accuracy']:.3f} | {m['precision']:.3f} | {m['recall']:.3f} | {m['f1']:.3f} | {m['tp']} | {m['fp']} | {m['tn']} | {m['fn']} |")
    report += ["", f"- Paired prediction flips: {flips}.", "- Not-aided received no cards, formalizations, examples, candidate lists, or suggestive pattern instructions.", "- Aided received only the generated general pseudocode formalization pack; no demonstrations or labelled examples.", ""]
    (RUN / "results" / "report.md").write_text("\n".join(report))
    print(json.dumps({"status": "PASS", "metrics": metrics, "paired_label_flips": flips}, indent=2))


if __name__ == "__main__":
    main()
