#!/usr/bin/env python3
"""Strictly validate and aggregate the full two-arm live test."""
from __future__ import annotations

import json
import os
from pathlib import Path

RUN = Path(os.environ.get("FULL_BINARY_OUT") or "/home/neliq/Coding/master-project/experiment-data/full-binary-aided-test-20260906-gpt54mini")
SCORE = RUN / "score-only"
ARMS = ("not-aided", "aided")
LABELS = {"DECEPTIVE", "BENIGN"}
SUPPORT = {"DIRECT", "NONE"}
EVIDENCE = {"SUFFICIENT", "LIMITED"}
REQUIRE_AID_SCREENING = os.environ.get("REQUIRE_AID_SCREENING") == "1"


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


def read_rows(arm, issues):
    assignments = {}
    for path in sorted((RUN / "assignments" / arm).glob("agent-*.json")):
        assignments[path.stem] = [row["instance_id"] for row in load(path)]
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
        if [row.get("instance_id") for row in parsed] != expected_ids:
            issues.append(f"{path}: assignment order/IDs mismatch")
        for row in parsed:
            iid = row.get("instance_id")
            if iid in rows:
                issues.append(f"duplicate {arm}/{iid}")
            rows[iid] = row
    return rows, assignments


def validate(row, arm, valid_rules, valid_rule_patterns, issues):
    iid = row.get("instance_id")
    common = {"instance_id", "arm", "model_final", "confidence", "evidence_status", "visual_observation", "dom_observation", "transition_observation", "justification"}
    missing = common - set(row)
    if missing:
        issues.append(f"{arm}/{iid}: missing {sorted(missing)}")
        return
    if row.get("arm") != arm or row.get("model_final") not in LABELS:
        issues.append(f"{arm}/{iid}: invalid arm or final label")
    if not isinstance(row.get("confidence"), (int, float)) or not 0 <= row["confidence"] <= 1:
        issues.append(f"{arm}/{iid}: confidence invalid")
    if row.get("evidence_status") not in EVIDENCE:
        issues.append(f"{arm}/{iid}: evidence_status invalid")
    for field in ("visual_observation", "dom_observation", "transition_observation", "justification"):
        if not isinstance(row.get(field), str) or not row[field].strip():
            issues.append(f"{arm}/{iid}: empty {field}")
    if "UNKNOWN" in json.dumps(row, ensure_ascii=False):
        issues.append(f"{arm}/{iid}: forbidden third-label token")
    if arm == "not-aided":
        return
    required = {"base_label", "candidate_rule_ids", "formal_support", "formal_support_rule_ids", "formal_contradiction", "missing_or_unobservable"}
    if REQUIRE_AID_SCREENING:
        required.update({"candidate_screening", "mechanism_summary", "candidate_pattern"})
    if not required <= set(row):
        issues.append(f"{arm}/{iid}: missing aided fields")
        return
    if REQUIRE_AID_SCREENING and any(not isinstance(row[field], str) or not row[field].strip() for field in ("candidate_screening", "mechanism_summary", "candidate_pattern")):
        issues.append(f"{arm}/{iid}: empty indexed screening field")
    if row["base_label"] not in LABELS or row["formal_support"] not in SUPPORT or row["formal_contradiction"] not in SUPPORT or not isinstance(row["missing_or_unobservable"], bool):
        issues.append(f"{arm}/{iid}: aided field enum/type invalid")
    if not isinstance(row["candidate_rule_ids"], list) or len(row["candidate_rule_ids"]) > 3 or any(rule not in valid_rules for rule in row["candidate_rule_ids"]):
        issues.append(f"{arm}/{iid}: candidate shortlist invalid")
    if REQUIRE_AID_SCREENING and row.get("candidate_pattern") != "NONE" and any(valid_rule_patterns.get(rule) != row.get("candidate_pattern") for rule in row.get("candidate_rule_ids", [])):
        issues.append(f"{arm}/{iid}: candidate rule outside candidate pattern")
    if not isinstance(row["formal_support_rule_ids"], list) or any(rule not in row.get("candidate_rule_ids", []) for rule in row["formal_support_rule_ids"]):
        issues.append(f"{arm}/{iid}: support binding invalid")
    if row["formal_support"] == "DIRECT" and not row["formal_support_rule_ids"]:
        issues.append(f"{arm}/{iid}: direct support without rule")
    if row["formal_support"] == "NONE" and row["formal_support_rule_ids"]:
        issues.append(f"{arm}/{iid}: support IDs present with NONE")
    expected_final = "DECEPTIVE" if row["base_label"] == "DECEPTIVE" or row["formal_support"] == "DIRECT" else "BENIGN"
    if row["model_final"] != expected_final:
        issues.append(f"{arm}/{iid}: final label violates support-only equation")


def main():
    truth = load(SCORE / "ground-truth.json")
    instances = load(SCORE / "instances.json")
    rule_records = load(SCORE / "rules.json")
    valid_rules = {rule["rule_id"] for rule in rule_records}
    valid_rule_patterns = {rule["rule_id"]: rule["pattern"] for rule in rule_records}
    issues = []
    rows = {}
    assignment_maps = {}
    for arm in ARMS:
        rows[arm], assignment_maps[arm] = read_rows(arm, issues)
    expected = set(truth)
    if len(expected) != 372:
        issues.append(f"expected 372 distinct interface instances, found {len(expected)}")
    if any(set(rows[arm]) != expected for arm in ARMS):
        for arm in ARMS:
            if set(rows[arm]) != expected:
                issues.append(f"{arm}: coverage {len(rows[arm])}/{len(expected)}")
    for arm in ARMS:
        for row in rows[arm].values():
            validate(row, arm, valid_rules, valid_rule_patterns, issues)
    if issues:
        print(json.dumps({"status": "FAIL", "issues": len(issues), "sample": issues[:40]}, indent=2))
        raise SystemExit(1)

    values = {arm: [(iid, rows[arm][iid]["model_final"], bool(truth[iid]["deceptive"])) for iid in sorted(expected)] for arm in ARMS}
    metrics = {arm: metric(values[arm]) for arm in ARMS}
    base_values = [(iid, rows["aided"][iid]["base_label"], bool(truth[iid]["deceptive"])) for iid in sorted(expected)]
    metrics["aided_base"] = metric(base_values)
    truth_label = lambda iid: "DECEPTIVE" if truth[iid]["deceptive"] else "BENIGN"
    help_cases = [iid for iid in sorted(expected) if rows["aided"][iid]["base_label"] != truth_label(iid) and rows["aided"][iid]["model_final"] == truth_label(iid)]
    harm_cases = [iid for iid in sorted(expected) if rows["aided"][iid]["base_label"] == truth_label(iid) and rows["aided"][iid]["model_final"] != rows["aided"][iid]["base_label"]]
    flip_cases = [iid for iid in sorted(expected) if rows["not-aided"][iid]["model_final"] != rows["aided"][iid]["model_final"]]
    arm_corrections = [iid for iid in flip_cases if rows["not-aided"][iid]["model_final"] != truth_label(iid) and rows["aided"][iid]["model_final"] == truth_label(iid)]
    arm_regressions = [iid for iid in flip_cases if rows["not-aided"][iid]["model_final"] == truth_label(iid) and rows["aided"][iid]["model_final"] != truth_label(iid)]

    per_pattern = {}
    per_condition = {}
    for iid in sorted(expected):
        pattern = instances[iid]["slug"]
        condition = str(instances[iid]["condition"])
        per_pattern.setdefault(pattern, {arm: [] for arm in ARMS})
        per_condition.setdefault(condition, {arm: [] for arm in ARMS})
        for arm in ARMS:
            entry = {"truth": truth_label(iid), "prediction": rows[arm][iid]["model_final"]}
            per_pattern[pattern][arm].append(entry)
            per_condition[condition][arm].append(entry)

    runtime = load(RUN / "runtime-config.json") if (RUN / "runtime-config.json").exists() else {}
    diagnostics = {
        "direct_support_count": sum(rows["aided"][iid]["formal_support"] == "DIRECT" for iid in sorted(expected)),
        "internal_help_cases": [{"instance_id": iid, "slug": instances[iid]["slug"], "base": rows["aided"][iid]["base_label"], "final": rows["aided"][iid]["model_final"], "rule_ids": rows["aided"][iid]["formal_support_rule_ids"]} for iid in help_cases],
        "internal_harm_cases": [{"instance_id": iid, "slug": instances[iid]["slug"]} for iid in harm_cases],
        "cross_arm_flip_cases": [{"instance_id": iid, "slug": instances[iid]["slug"], "not_aided": rows["not-aided"][iid]["model_final"], "aided": rows["aided"][iid]["model_final"]} for iid in flip_cases],
        "formal_layer_non_degrading_vs_aided_base": not harm_cases,
        "aided_correct_changes_vs_not_aided": len(arm_corrections),
        "aided_regressions_vs_not_aided": len(arm_regressions),
    }
    result = {"run_id": RUN.name, "runtime": runtime, "design": {"distinct_interfaces": len(expected), "audit_rows_total": len(expected) * len(ARMS), "patterns": len(per_pattern), "conditions_per_pattern": 3, "agents_total": sum(len(assignment_maps[arm]) for arm in ARMS), "agents_per_arm": {arm: len(assignment_maps[arm]) for arm in ARMS}, "arms": list(ARMS), "binary_only": True, "aided_mode": "support-only, context-gated, candidate-shortlisted pseudocode"}, "metrics": metrics, "aided_internal_harm_events": len(harm_cases), "aided_internal_help_events": len(help_cases), "not_aided_vs_aided_flips": len(flip_cases), "per_pattern": per_pattern, "per_condition": per_condition, "diagnostics": diagnostics, "validation": {"issues": 0, "rows": {arm: len(rows[arm]) for arm in ARMS}}}
    (RUN / "results").mkdir(exist_ok=True)
    (RUN / "results" / "results.json").write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n")

    runtime_note = f"- Runtime: {runtime.get('model', 'unspecified')} / {runtime.get('provider', 'unspecified')} / service tier {runtime.get('service_tier', 'unspecified')} / reasoning {runtime.get('reasoning_effort', 'unspecified')}." if runtime else "- Runtime metadata: not recorded."
    report = [f"# Full binary aided-vs-not-aided test — {RUN.name}", "", runtime_note, f"- {len(expected)} distinct interfaces: 62 patterns × 3 conditions × 2 variants.", f"- {len(expected) * len(ARMS)} total audit rows across exactly two arms.", "- Both arms are binary-only; aided rules are context-gated, candidate-shortlisted, and support-only.", "", "| Output | N | Accuracy | Precision | Recall | F1 | TP | FP | TN | FN |", "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|"]
    for key, m in metrics.items():
        report.append(f"| {key} | {m['n']} | {m['accuracy']:.3f} | {m['precision']:.3f} | {m['recall']:.3f} | {m['f1']:.3f} | {m['tp']} | {m['fp']} | {m['tn']} | {m['fn']} |")
    report += ["", f"- Aided internal harmful changes (formal layer: correct base → incorrect final): {len(harm_cases)}.", f"- Aided internal helpful changes (formal layer: incorrect base → correct final): {len(help_cases)}.", f"- Direct formal support cases: {diagnostics['direct_support_count']}.", f"- Final aided correct changes versus not-aided: {len(arm_corrections)}.", f"- Final aided regressions versus not-aided: {len(arm_regressions)}.", f"- Formal layer non-degrading versus aided base: {'YES' if not harm_cases else 'NO'}.", f"- Not-aided versus aided final-label flips: {len(flip_cases)}.", "", "## Accuracy by condition", "", "| Condition | Not aided | Aided base | Aided final |", "|---:|---:|---:|---:|"]
    for condition in sorted(per_condition):
        ids = [iid for iid in expected if str(instances[iid]["condition"]) == condition]
        scores = []
        for getter in (lambda iid: rows["not-aided"][iid]["model_final"], lambda iid: rows["aided"][iid]["base_label"], lambda iid: rows["aided"][iid]["model_final"]):
            scores.append(f"{sum(getter(iid) == truth_label(iid) for iid in ids)}/{len(ids)}")
        report.append(f"| {condition} | {' | '.join(scores)} |")
    report += ["", "## Accuracy by pattern", "", "| Pattern | Not aided | Aided base | Aided final |", "|---|---:|---:|---:|"]
    for pattern in sorted(per_pattern):
        ids = [iid for iid in expected if instances[iid]["slug"] == pattern]
        scores = []
        for getter in (lambda iid: rows["not-aided"][iid]["model_final"], lambda iid: rows["aided"][iid]["base_label"], lambda iid: rows["aided"][iid]["model_final"]):
            scores.append(f"{sum(getter(iid) == truth_label(iid) for iid in ids)}/{len(ids)}")
        report.append(f"| {pattern} | {' | '.join(scores)} |")
    (RUN / "results" / "report.md").write_text("\n".join(report) + "\n")
    print(json.dumps({"status": "PASS", "runtime": runtime, "metrics": metrics, "aided_internal_harm_events": len(harm_cases), "aided_internal_help_events": len(help_cases), "not_aided_vs_aided_flips": len(flip_cases)}, indent=2))


if __name__ == "__main__":
    main()
