#!/usr/bin/env python3
"""Validate and aggregate the support-only binary aid test."""
from __future__ import annotations

import json
import os
from pathlib import Path

RUN = Path(os.environ.get("BINARY_SUPPORT_OUT") or "/home/neliq/Coding/master-project/experiment-data/binary-aided-support-test-20260906-v8")
SCORE = RUN / "score-only"
ARMS = ("not-aided", "aided")
LABELS = {"DECEPTIVE", "BENIGN"}
SUPPORT = {"DIRECT", "NONE"}
VALID_EVIDENCE = {"SUFFICIENT", "LIMITED"}


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


def validate(row, arm, valid_rules, issues):
    common = {"instance_id", "arm", "model_final", "confidence", "evidence_status", "visual_observation", "dom_observation", "transition_observation", "justification"}
    iid = row.get("instance_id")
    missing = common - set(row)
    if missing:
        issues.append(f"{arm}/{iid}: missing {sorted(missing)}")
        return
    if row.get("arm") != arm or row.get("model_final") not in LABELS:
        issues.append(f"{arm}/{iid}: binary arm/label invalid")
    if not isinstance(row.get("confidence"), (int, float)) or not 0 <= row["confidence"] <= 1:
        issues.append(f"{arm}/{iid}: confidence invalid")
    if row.get("evidence_status") not in VALID_EVIDENCE:
        issues.append(f"{arm}/{iid}: evidence_status invalid")
    for field in ("visual_observation", "dom_observation", "transition_observation", "justification"):
        if not isinstance(row.get(field), str) or not row[field].strip():
            issues.append(f"{arm}/{iid}: empty {field}")
    if "UNKNOWN" in json.dumps(row, ensure_ascii=False):
        issues.append(f"{arm}/{iid}: forbidden third-label token")
    if arm == "not-aided":
        return
    required = {"base_label", "candidate_rule_ids", "formal_support", "formal_support_rule_ids", "formal_contradiction", "missing_or_unobservable"}
    if not required <= set(row):
        issues.append(f"{arm}/{iid}: missing support-only fields")
        return
    if row["base_label"] not in LABELS or row["formal_support"] not in SUPPORT or row["formal_contradiction"] not in SUPPORT or not isinstance(row["missing_or_unobservable"], bool):
        issues.append(f"{arm}/{iid}: support-only field invalid")
    if not isinstance(row["candidate_rule_ids"], list) or len(row["candidate_rule_ids"]) > 3 or any(x not in valid_rules for x in row["candidate_rule_ids"]):
        issues.append(f"{arm}/{iid}: candidate rule shortlist invalid")
    if not isinstance(row["formal_support_rule_ids"], list) or any(x not in row.get("candidate_rule_ids", []) for x in row["formal_support_rule_ids"]):
        issues.append(f"{arm}/{iid}: support rule binding invalid")
    if row["formal_support"] == "DIRECT" and not row["formal_support_rule_ids"]:
        issues.append(f"{arm}/{iid}: direct support without a rule ID")
    if row["formal_support"] == "NONE" and row["formal_support_rule_ids"]:
        issues.append(f"{arm}/{iid}: support rule IDs present with NONE support")
    expected_final = "DECEPTIVE" if row["base_label"] == "DECEPTIVE" or row["formal_support"] == "DIRECT" else "BENIGN"
    if row["model_final"] != expected_final:
        issues.append(f"{arm}/{iid}: final label violates support-only equation")


def main():
    truth = load(SCORE / "ground-truth.json")
    instances = load(SCORE / "instances.json")
    selected = load(SCORE / "selected-patterns.json")
    # Rule IDs come from the selected current ontology, not website route numbers.
    ontology = load(Path("/home/neliq/Coding/Master-Thesis/ontology/ontology.json"))
    by_name = {p["name"]: p for p in ontology["patterns"]}
    valid_rules = {by_name[p["name"]]["conditions"][0]["id"] for p in selected}
    assignments = {p.stem: [x["instance_id"] for x in load(p)] for p in sorted((RUN / "assignments").glob("agent-*.json"))}
    issues = []
    rows = {arm: read_rows(arm, assignments, issues) for arm in ARMS}
    expected = set(truth)
    for arm in ARMS:
        if set(rows[arm]) != expected:
            issues.append(f"{arm}: coverage {len(rows[arm])}/{len(expected)}")
        for row in rows[arm].values():
            validate(row, arm, valid_rules, issues)
    if issues:
        print(json.dumps({"status": "FAIL", "issues": len(issues), "sample": issues[:30]}, indent=2))
        raise SystemExit(1)

    values = {arm: [(iid, rows[arm][iid]["model_final"], bool(truth[iid]["deceptive"])) for iid in sorted(expected)] for arm in ARMS}
    metrics = {arm: metric(values[arm]) for arm in ARMS}
    base_values = [(iid, rows["aided"][iid]["base_label"], bool(truth[iid]["deceptive"])) for iid in sorted(expected)]
    metrics["aided_base"] = metric(base_values)
    truth_label = lambda iid: "DECEPTIVE" if truth[iid]["deceptive"] else "BENIGN"
    help_cases = [iid for iid in sorted(expected) if rows["aided"][iid]["base_label"] != truth_label(iid) and rows["aided"][iid]["model_final"] == truth_label(iid)]
    harm_cases = [iid for iid in sorted(expected) if rows["aided"][iid]["base_label"] == truth_label(iid) and rows["aided"][iid]["model_final"] != rows["aided"][iid]["base_label"]]
    flip_cases = [iid for iid in sorted(expected) if rows["not-aided"][iid]["model_final"] != rows["aided"][iid]["model_final"]]
    harm = len(harm_cases)
    help_count = len(help_cases)
    flips = len(flip_cases)
    per_pattern = {}
    for iid in sorted(expected):
        slug = instances[iid]["slug"]
        per_pattern.setdefault(slug, {arm: [] for arm in ARMS})
        for arm in ARMS:
            per_pattern[slug][arm].append({"truth": "DECEPTIVE" if truth[iid]["deceptive"] else "BENIGN", "prediction": rows[arm][iid]["model_final"]})

    runtime = load(RUN / "runtime-config.json") if (RUN / "runtime-config.json").exists() else {}
    diagnostics = {
        "direct_support_count": sum(rows["aided"][iid]["formal_support"] == "DIRECT" for iid in sorted(expected)),
        "internal_help_cases": [{"instance_id": iid, "slug": instances[iid]["slug"], "base": rows["aided"][iid]["base_label"], "final": rows["aided"][iid]["model_final"], "rule_ids": rows["aided"][iid]["formal_support_rule_ids"]} for iid in help_cases],
        "internal_harm_cases": [{"instance_id": iid, "slug": instances[iid]["slug"]} for iid in harm_cases],
        "cross_arm_flip_cases": [{"instance_id": iid, "slug": instances[iid]["slug"], "not_aided": rows["not-aided"][iid]["model_final"], "aided": rows["aided"][iid]["model_final"]} for iid in flip_cases],
        "non_degrading_on_sample": harm == 0,
    }
    result = {"run_id": RUN.name, "runtime": runtime, "design": {"patterns": len(per_pattern), "instances": len(expected), "agents_per_arm": len(assignments), "arms": list(ARMS), "binary_only": True, "aided_mode": "support-only, context-gated, candidate-shortlisted pseudocode"}, "metrics": metrics, "aided_internal_harm_events": harm, "aided_internal_help_events": help_count, "not_aided_vs_aided_flips": flips, "per_pattern": per_pattern, "diagnostics": diagnostics, "validation": {"issues": 0, "rows": {arm: len(rows[arm]) for arm in ARMS}}}
    (RUN / "results" / "results.json").write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n")
    runtime_note = f"- Runtime: {runtime.get('model', 'unspecified')} / {runtime.get('provider', 'unspecified')} / service tier {runtime.get('service_tier', 'unspecified')} / reasoning {runtime.get('reasoning_effort', 'unspecified')}." if runtime else "- Runtime metadata: not recorded."
    report = [f"# Binary support-only aided-vs-not-aided test — {RUN.name}", "", runtime_note, f"- {len(expected)} live tasks, {len(per_pattern)} patterns, {len(assignments)} agents per arm.", "- Both arms are forced binary.", "- Aided rules are context-gated, candidate-shortlisted, and support-only.", "", "| Output | N | Accuracy | Precision | Recall | F1 | TP | FP | TN | FN |", "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|"]
    for key, m in metrics.items():
        report.append(f"| {key} | {m['n']} | {m['accuracy']:.3f} | {m['precision']:.3f} | {m['recall']:.3f} | {m['f1']:.3f} | {m['tp']} | {m['fp']} | {m['tn']} | {m['fn']} |")
    report += ["", f"- Aided internal harmful changes (correct base → incorrect final): {harm}.", f"- Aided internal helpful changes (incorrect base → correct final): {help_count}.", f"- Direct formal support cases: {diagnostics['direct_support_count']}.", f"- Not-aided versus aided final-label flips: {flips}.", f"- Non-degrading on this sample: {'YES' if diagnostics['non_degrading_on_sample'] else 'NO'}.", ""]
    if help_cases:
        report += ["## Internal helpful corrections", ""]
        report += [f"- `{iid}` ({instances[iid]['slug']}): {rows['aided'][iid]['base_label']} → {rows['aided'][iid]['model_final']} via {', '.join(rows['aided'][iid]['formal_support_rule_ids'])}." for iid in help_cases] + [""]
    report += ["## Per-pattern final accuracy", "", "| Pattern | Not aided | Aided base | Aided final |", "|---|---:|---:|---:|"]
    for slug in sorted(per_pattern):
        ids = [iid for iid in expected if instances[iid]["slug"] == slug]
        scores = []
        for key, getter in (("not-aided", lambda iid: rows["not-aided"][iid]["model_final"]), ("aided base", lambda iid: rows["aided"][iid]["base_label"]), ("aided final", lambda iid: rows["aided"][iid]["model_final"])):
            scores.append(f"{sum(getter(iid) == truth_label(iid) for iid in ids)}/{len(ids)}")
        report.append(f"| {slug} | {' | '.join(scores)} |")
    report.append("")
    (RUN / "results" / "report.md").write_text("\n".join(report))
    print(json.dumps({"status": "PASS", "metrics": metrics, "aided_internal_harm_events": harm, "aided_internal_help_events": help_count, "not_aided_vs_aided_flips": flips}, indent=2))


if __name__ == "__main__":
    main()
