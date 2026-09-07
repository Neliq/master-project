#!/usr/bin/env python3
"""Validate and aggregate the quick live isolated-demo ablation."""
from __future__ import annotations

import json
import os
from collections import defaultdict
from pathlib import Path

RUN = Path(os.environ.get("QUICK_LIVE_OUT", "/home/neliq/Coding/master-project/experiment-data/quick-live-test-20260906-v5"))
SCORE = RUN / "score-only"
ARMS = ("c0", "c1", "c2")
LABELS = {"DECEPTIVE", "BENIGN", "UNKNOWN"}
STATUSES = {"TRUE", "FALSE", "UNKNOWN"}
CONDITION_COUNT = 1


def load(path: Path):
    return json.loads(path.read_text())


def metric(values):
    covered = [(prediction, truth) for _iid, prediction, truth in values if prediction != "UNKNOWN"]
    tp = sum(p == "DECEPTIVE" and t for p, t in covered)
    fp = sum(p == "DECEPTIVE" and not t for p, t in covered)
    tn = sum(p == "BENIGN" and not t for p, t in covered)
    fn = sum(p == "BENIGN" and t for p, t in covered)
    precision = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn) if tp + fn else 0.0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    return {
        "n": len(values), "unknown": len(values) - len(covered),
        "coverage": len(covered) / len(values) if values else 0.0,
        "covered_accuracy": (tp + tn) / len(covered) if covered else 0.0,
        "tp": tp, "fp": fp, "tn": tn, "fn": fn,
        "precision": precision, "recall": recall, "f1": f1,
    }


def pattern_key(value, by_name, by_slug):
    return by_name.get(value) or by_slug.get(value)


def screen_map(row, by_name, by_slug):
    out = {}
    for item in row.get("candidate_screen", []):
        if isinstance(item, dict):
            key = pattern_key(item.get("pattern"), by_name, by_slug)
            if key:
                out[key] = item.get("status")
    return out


def ledger_map(row, by_name, by_slug):
    out = defaultdict(list)
    for item in row.get("condition_ledger", []):
        if (isinstance(item, dict)
                and item.get("status") in STATUSES
                and str(item.get("condition_id", "")).endswith("-C1")):
            key = pattern_key(item.get("pattern"), by_name, by_slug)
            if key:
                out[key].append(item)
    return out


def domain_gate_status(record):
    gate = record.get("domain_gate") if isinstance(record, dict) else None
    if not isinstance(gate, dict):
        # Backward-compatible reads of pre-v5 rows; v5 validation rejects these.
        return "TRUE"
    values = [gate.get("context_or_object"), gate.get("mechanism_anchor")]
    if all(value == "TRUE" for value in values):
        return "TRUE"
    if any(value == "FALSE" for value in values):
        return "FALSE"
    return "UNKNOWN"


def pattern_status(records):
    statuses = []
    for record in records:
        condition = record if isinstance(record, str) else record.get("status")
        gate = "TRUE" if isinstance(record, str) else domain_gate_status(record)
        if condition == "TRUE" and gate == "TRUE":
            statuses.append("TRUE")
        elif condition == "FALSE" or gate == "FALSE":
            statuses.append("FALSE")
        else:
            statuses.append("UNKNOWN")
    if "TRUE" in statuses:
        return "TRUE"
    if len(statuses) >= CONDITION_COUNT and all(s == "FALSE" for s in statuses[:CONDITION_COUNT]):
        return "FALSE"
    return "UNKNOWN"


def derive(row, arm, patterns, by_name, by_slug):
    if arm == "c0":
        return row["model_final"]
    screens = screen_map(row, by_name, by_slug)
    ledgers = ledger_map(row, by_name, by_slug)
    states = {}
    for pattern in patterns:
        slug = pattern["slug"]
        if arm == "c1":
            states[slug] = pattern_status(ledgers.get(slug, []))
        else:
            ledger_status = pattern_status(ledgers.get(slug, []))
            if screens.get(slug) == "NO_MATCH":
                # A routing negative that conflicts with a positive ledger is unresolved.
                states[slug] = "UNKNOWN" if ledger_status == "TRUE" else "FALSE"
            else:
                # MATCH/UNKNOWN is diagnostic only because every card is retained.
                states[slug] = ledger_status
    true_count = sum(value == "TRUE" for value in states.values())
    if true_count == 1:
        return "DECEPTIVE"
    if true_count > 1:
        return "UNKNOWN"
    if all(value == "FALSE" for value in states.values()):
        return "BENIGN"
    return "UNKNOWN"


def conservative_aggregate(row, arm, patterns, by_name, by_slug):
    """Keep a ledger label only when the agent independently agrees.

    This is deliberately abstention-heavy: disagreement is safer than a
    cross-card false positive on this small, overlapping ontology.
    """
    ledger = derive(row, arm, patterns, by_name, by_slug)
    model = row["model_final"]
    return ledger if model != "UNKNOWN" and model == ledger else "UNKNOWN"


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
        if [row.get("instance_id") for row in parsed] != expected_ids:
            issues.append(f"{path}: order/IDs mismatch")
        for row in parsed:
            iid = row.get("instance_id")
            if iid in rows:
                issues.append(f"duplicate {arm}/{iid}")
            rows[iid] = row
    return rows


def validate(row, arm, patterns, by_name, by_slug, issues):
    required = {"instance_id", "arm", "model_final", "confidence", "evidence_status", "visual_observation", "dom_observation", "transition_observation", "justification", "candidate_screen", "selected_cards", "condition_ledger"}
    iid = row.get("instance_id")
    missing = required - set(row)
    if missing:
        issues.append(f"{arm}/{iid}: missing {sorted(missing)}")
        return
    if row.get("arm") != arm or row.get("model_final") not in LABELS:
        issues.append(f"{arm}/{iid}: arm or model_final invalid")
    if not isinstance(row.get("confidence"), (int, float)) or not 0 <= row["confidence"] <= 1:
        issues.append(f"{arm}/{iid}: confidence invalid")
    if row.get("evidence_status") not in {"SUFFICIENT", "UNKNOWN"}:
        issues.append(f"{arm}/{iid}: evidence_status invalid")
    for field in ("visual_observation", "dom_observation", "transition_observation", "justification"):
        if not isinstance(row.get(field), str) or not row[field].strip():
            issues.append(f"{arm}/{iid}: empty {field}")
    if not all(isinstance(row[field], list) for field in ("candidate_screen", "selected_cards", "condition_ledger")):
        issues.append(f"{arm}/{iid}: list field invalid")
        return
    if arm == "c0":
        return
    valid_cards = {p["card"] for p in patterns}
    if any(card not in valid_cards for card in row["selected_cards"]):
        issues.append(f"{arm}/{iid}: invalid selected card")

    if len(row["candidate_screen"]) != len(patterns):
        issues.append(f"{arm}/{iid}: candidate screen is not complete")
    allowed = {"AVAILABLE"} if arm == "c1" else {"MATCH", "NO_MATCH", "UNKNOWN"}
    seen = set()
    for item in row["candidate_screen"]:
        key = pattern_key(item.get("pattern"), by_name, by_slug) if isinstance(item, dict) else None
        if not key or item.get("status") not in allowed or key in seen:
            issues.append(f"{arm}/{iid}: invalid/duplicate candidate screen")
        if key:
            seen.add(key)
    if arm == "c1" and len(row["selected_cards"]) > len(patterns):
        issues.append(f"{arm}/{iid}: too many selected cards")
    if arm == "c2" and len(row["selected_cards"]) != len(patterns):
        issues.append(f"{arm}/{iid}: recall-first routing must retain all cards")
    condition1_records = [item for item in row["condition_ledger"]
                          if isinstance(item, dict)
                          and str(item.get("condition_id", "")).endswith("-C1")]
    if arm in {"c1", "c2"} and len(condition1_records) != len(patterns) * CONDITION_COUNT:
        issues.append(f"{arm}/{iid}: ledger must contain {len(patterns) * CONDITION_COUNT} conditions")
    for item in row["condition_ledger"]:
        if not isinstance(item, dict) or item.get("status") not in STATUSES or not pattern_key(item.get("pattern"), by_name, by_slug):
            issues.append(f"{arm}/{iid}: malformed condition record")
            continue
        gate = item.get("domain_gate")
        if (not isinstance(gate, dict)
                or gate.get("context_or_object") not in STATUSES
                or gate.get("mechanism_anchor") not in STATUSES
                or not isinstance(gate.get("evidence_refs"), list)
                or not gate["evidence_refs"]):
            issues.append(f"{arm}/{iid}: malformed domain gate")
        if not isinstance(item.get("atoms"), list) or not item["atoms"]:
            issues.append(f"{arm}/{iid}: condition atoms missing")
        for atom in item.get("atoms", []):
            if not isinstance(atom, dict) or atom.get("status") not in STATUSES or not isinstance(atom.get("evidence_refs"), list) or not atom["evidence_refs"]:
                issues.append(f"{arm}/{iid}: malformed condition atom")


def main():
    patterns = load(SCORE / "selected-patterns.json")
    truth = load(SCORE / "ground-truth.json")
    instances = load(SCORE / "instances.json")
    assignments = {path.stem: [item["instance_id"] for item in load(path)] for path in sorted((RUN / "assignments").glob("agent-*.json"))}
    by_name = {p["name"]: p["slug"] for p in patterns}
    by_name.update({p["card"]: p["slug"] for p in patterns})
    by_slug = {p["slug"]: p["slug"] for p in patterns}
    issues = []
    rows = {arm: read_rows(arm, assignments, issues) for arm in ARMS}
    expected = set(truth)
    for arm in ARMS:
        if set(rows[arm]) != expected:
            issues.append(f"{arm}: coverage {len(rows[arm])}/{len(expected)}")
        for row in rows[arm].values():
            validate(row, arm, patterns, by_name, by_slug, issues)
    if issues:
        print(json.dumps({"status": "FAIL", "issues": len(issues), "sample": issues[:30]}, indent=2))
        raise SystemExit(1)

    ledger_decisions = {arm: {iid: (rows[arm][iid]["model_final"] if arm == "c0" else derive(rows[arm][iid], arm, patterns, by_name, by_slug)) for iid in sorted(expected)} for arm in ARMS}
    decisions = {arm: {iid: (rows[arm][iid]["model_final"] if arm == "c0" else conservative_aggregate(rows[arm][iid], arm, patterns, by_name, by_slug)) for iid in sorted(expected)} for arm in ARMS}
    metrics = {}
    for arm in ARMS:
        metrics[f"{arm}_model"] = metric([(iid, rows[arm][iid]["model_final"], bool(truth[iid]["deceptive"])) for iid in sorted(expected)])
        if arm != "c0":
            metrics[f"{arm}_ledger"] = metric([(iid, ledger_decisions[arm][iid], bool(truth[iid]["deceptive"])) for iid in sorted(expected)])
            metrics[f"{arm}_aggregate"] = metric([(iid, decisions[arm][iid], bool(truth[iid]["deceptive"])) for iid in sorted(expected)])

    routing = {"c1_target_available": len(expected), "c2_target_screen": defaultdict(int), "c2_target_selected": 0}
    for iid in sorted(expected):
        target = instances[iid]["slug"]
        row = rows["c2"][iid]
        status = "NOT_SCREENED"
        for item in row["candidate_screen"]:
            if pattern_key(item.get("pattern"), by_name, by_slug) == target:
                status = item["status"]
                break
        routing["c2_target_screen"][status] += 1
        target_card = next(p["card"] for p in patterns if p["slug"] == target)
        routing["c2_target_selected"] += target_card in row["selected_cards"]
    routing["c2_target_screen"] = dict(routing["c2_target_screen"])
    routing["c2_target_match_or_unknown"] = routing["c2_target_screen"].get("MATCH", 0) + routing["c2_target_screen"].get("UNKNOWN", 0)
    routing["c2_target_screen_recall"] = routing["c2_target_match_or_unknown"] / len(expected)
    routing["c2_target_card_recall"] = routing["c2_target_selected"] / len(expected)
    routing["c2_target_recall_match_or_unknown"] = routing["c2_target_screen_recall"]
    routing["c2_target_selection_rate"] = routing["c2_target_card_recall"]

    result = {"run_id": RUN.name, "design": {"patterns": len(patterns), "instances": len(expected), "agents_per_arm": len(assignments), "arms": list(ARMS), "live_urls": True, "unknown_is_abstention": True, "factors": {"formal_reasoning": "C0 vs C1 ledger", "routing": "C1 ledger vs C2 ledger; screen and selection recall", "aggregation": "ledger-only vs agreement-gated final"}}, "metrics": metrics, "routing": routing, "validation": {"issues": 0, "rows": {arm: len(rows[arm]) for arm in ARMS}}}
    (RUN / "results" / "results.json").write_text(json.dumps(result, indent=2) + "\n")
    report = [f"# Quick live isolated-demo ablation — {RUN.name}", "", f"- {len(expected)} live tasks, {len(patterns)} patterns, {len(assignments)} agents per arm.", "- UNKNOWN is abstention; covered metrics exclude UNKNOWN.", "", "| Output | N | UNKNOWN | Coverage | Accuracy | Precision | Recall | F1 |", "|---|---:|---:|---:|---:|---:|---:|---:|"]
    for key, m in metrics.items():
        report.append(f"| {key} | {m['n']} | {m['unknown']} | {m['coverage']:.3f} | {m['covered_accuracy']:.3f} | {m['precision']:.3f} | {m['recall']:.3f} | {m['f1']:.3f} |")
    report += ["", "## Routing", "", f"- C1 all-card availability: {routing['c1_target_available']}/{len(expected)}.", f"- C2 target screen: {routing['c2_target_screen']}.", f"- C2 target screen recall (`MATCH` or `UNKNOWN`): {routing['c2_target_screen_recall']:.3f}.", f"- C2 target card-selection recall: {routing['c2_target_card_recall']:.3f}.", "", "## Factor interpretation", "", "- C0→C1 ledger: formal reasoning with all ten current cards.", "- C1→C2 ledger: routing-screen effect; selection is recall-first.", "- C1/C2 ledger→aggregate: agreement-gated aggregation; disagreement abstains.", ""]
    (RUN / "results" / "report.md").write_text("\n".join(report))
    print(json.dumps({"status": "PASS", "metrics": metrics, "routing": routing}, indent=2))


if __name__ == "__main__":
    main()
