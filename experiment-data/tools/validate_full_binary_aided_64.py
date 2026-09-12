#!/usr/bin/env python3
"""Validate the additive 64-pattern aggregate and its source provenance."""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path
from typing import Any

ARMS = ("not-aided", "aided")
LABELS = {"DECEPTIVE", "BENIGN"}
SUPPORT = {"DIRECT", "NONE"}
EVIDENCE = {"SUFFICIENT", "LIMITED"}
COMMON = {
    "instance_id",
    "arm",
    "model_final",
    "confidence",
    "evidence_status",
    "visual_observation",
    "dom_observation",
    "transition_observation",
    "justification",
}
AIDED = {
    "base_label",
    "candidate_rule_ids",
    "formal_support",
    "formal_support_rule_ids",
    "formal_contradiction",
    "missing_or_unobservable",
    "candidate_screening",
    "mechanism_summary",
    "candidate_pattern",
}
DEFAULT_OUTPUT = Path("/home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-combined-v10-20260910-gpt56luna900k")


def load(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def parse_raw(path: Path) -> tuple[list[dict[str, Any]], list[bytes]]:
    rows: list[dict[str, Any]] = []
    lines: list[bytes] = []
    for line_no, raw in enumerate(path.read_bytes().splitlines(keepends=True), 1):
        if not raw.strip():
            raise ValueError(f"blank raw line: {path}:{line_no}")
        rows.append(json.loads(raw.decode("utf-8")))
        lines.append(raw)
    return rows, lines


def metric(values: list[tuple[str, str, bool]]) -> dict[str, Any]:
    tp = sum(pred == "DECEPTIVE" and truth for _iid, pred, truth in values)
    fp = sum(pred == "DECEPTIVE" and not truth for _iid, pred, truth in values)
    tn = sum(pred == "BENIGN" and not truth for _iid, pred, truth in values)
    fn = sum(pred == "BENIGN" and truth for _iid, pred, truth in values)
    n = len(values)
    precision = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn) if tp + fn else 0.0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    return {"n": n, "accuracy": (tp + tn) / n if n else 0.0, "precision": precision, "recall": recall, "f1": f1, "tp": tp, "fp": fp, "tn": tn, "fn": fn}


def validate_row(row: dict[str, Any], arm: str, valid_rules: set[str], rule_patterns: dict[str, str]) -> None:
    iid = row.get("instance_id")
    missing = COMMON - set(row)
    if missing:
        raise ValueError(f"{arm}/{iid}: missing common fields {sorted(missing)}")
    if row.get("arm") != arm or row.get("model_final") not in LABELS:
        raise ValueError(f"{arm}/{iid}: invalid arm/label")
    if not isinstance(row.get("confidence"), (int, float)) or not 0 <= row["confidence"] <= 1:
        raise ValueError(f"{arm}/{iid}: invalid confidence")
    if row.get("evidence_status") not in EVIDENCE:
        raise ValueError(f"{arm}/{iid}: invalid evidence status")
    for field in ("visual_observation", "dom_observation", "transition_observation", "justification"):
        if not isinstance(row.get(field), str) or not row[field].strip():
            raise ValueError(f"{arm}/{iid}: empty {field}")
    if "UNKNOWN" in json.dumps(row, ensure_ascii=False):
        raise ValueError(f"{arm}/{iid}: forbidden third-label token")
    if arm != "aided":
        return
    missing = AIDED - set(row)
    if missing:
        raise ValueError(f"aided/{iid}: missing aided fields {sorted(missing)}")
    if row["base_label"] not in LABELS or row["formal_support"] not in SUPPORT or row["formal_contradiction"] not in SUPPORT:
        raise ValueError(f"aided/{iid}: invalid aided enum")
    if not isinstance(row["missing_or_unobservable"], bool):
        raise ValueError(f"aided/{iid}: missing_or_unobservable is not boolean")
    candidate_ids = row["candidate_rule_ids"]
    support_ids = row["formal_support_rule_ids"]
    if not isinstance(candidate_ids, list) or len(candidate_ids) > 3 or any(rule not in valid_rules for rule in candidate_ids):
        raise ValueError(f"aided/{iid}: invalid candidate rules")
    if not isinstance(support_ids, list) or any(rule not in candidate_ids for rule in support_ids):
        raise ValueError(f"aided/{iid}: invalid support binding")
    for field in ("candidate_screening", "mechanism_summary", "candidate_pattern"):
        if not isinstance(row[field], str) or not row[field].strip():
            raise ValueError(f"aided/{iid}: empty {field}")
    if row["candidate_pattern"] != "NONE" and any(rule_patterns.get(rule) != row["candidate_pattern"] for rule in candidate_ids):
        raise ValueError(f"aided/{iid}: candidate rule outside candidate pattern")
    if row["formal_support"] == "DIRECT" and not support_ids:
        raise ValueError(f"aided/{iid}: direct support without rule")
    if row["formal_support"] == "NONE" and support_ids:
        raise ValueError(f"aided/{iid}: support IDs with NONE")
    expected_final = "DECEPTIVE" if row["base_label"] == "DECEPTIVE" or row["formal_support"] == "DIRECT" else "BENIGN"
    if row["model_final"] != expected_final:
        raise ValueError(f"aided/{iid}: support-only equation violated")


def check_source_hashes(manifest: dict[str, Any]) -> None:
    for source_name, source in manifest["source_artifacts"].items():
        for relative, record in source.items():
            path = Path(record["path"])
            if not path.is_file():
                raise ValueError(f"source artifact missing: {source_name}/{relative}: {path}")
            if path.stat().st_size != record["size_bytes"] or sha256(path) != record["sha256"]:
                raise ValueError(f"source artifact changed: {source_name}/{relative}: {path}")


def validate_output() -> dict[str, Any]:
    output = Path(os.environ.get("FULL_BINARY_64_OUT", str(DEFAULT_OUTPUT))).resolve()
    manifest = load(output / "integration-manifest.json")
    if manifest.get("status") != "PASS":
        raise ValueError("integration manifest status is not PASS")
    if manifest.get("run_id") != output.name:
        raise ValueError("integration manifest run ID does not match output directory")
    check_source_hashes(manifest)
    final = manifest.get("final_counts", {})
    expected_counts = {
        "patterns": 64,
        "distinct_interfaces_per_arm": 384,
        "raw_rows_per_arm": 384,
        "combined_audit_rows": 768,
        "agents_per_arm": 6,
        "rows_per_agent_per_arm": 64,
        "route_records": 64,
        "formalization_rules": 192,
    }
    if final != expected_counts:
        raise ValueError(f"final count manifest mismatch: {final}")
    source_runs = manifest["source_runs"]
    original = source_runs["authoritative_completed_observations"]
    extension = source_runs["validated_extension"]
    declared_base = source_runs["declared_extension_base"]
    if original["patterns"] != 62 or original["distinct_interfaces"] != 372 or original["audit_rows_total"] != 744:
        raise ValueError("original source count metadata mismatch")
    if extension["patterns"] != 2 or extension["distinct_interfaces"] != 12 or extension["audit_rows_total"] != 24:
        raise ValueError("extension source count metadata mismatch")
    if declared_base.get("raw_observations_present") is not False:
        raise ValueError("declared base raw-observation limitation missing")

    instances = load(output / "score-only/instances.json")
    truth = load(output / "score-only/ground-truth.json")
    routes = load(output / "score-only/route-patterns.json")
    rules = load(output / "score-only/rules.json")
    if len(instances) != 384 or set(instances) != set(truth):
        raise ValueError("combined instances/truth count or IDs mismatch")
    grid = {(row.get("pattern_number"), row.get("condition"), row.get("variant")) for row in instances.values()}
    if len(grid) != 384 or {number for number, _condition, _variant in grid} != set(range(1, 65)):
        raise ValueError("combined instance grid is not 64 × 3 × 2")
    if any(sum(1 for row in instances.values() if row["pattern_number"] == number) != 6 for number in range(1, 65)):
        raise ValueError("combined pattern cell counts are not six each")
    if len(routes) != 64 or {row.get("pattern_number") for row in routes} != set(range(1, 65)):
        raise ValueError("combined route index is not exactly 1..64")
    if len({row.get("slug") for row in routes}) != 64:
        raise ValueError("combined route slugs are not unique")
    valid_rules = {row.get("rule_id") for row in rules}
    rule_patterns = {row.get("rule_id"): row.get("pattern") for row in rules}
    if len(rules) != 192 or len(valid_rules) != 192 or not {f"DP-{n:03d}-C{c}" for n in (63, 64) for c in (1, 2, 3)} <= valid_rules:
        raise ValueError("combined formalization rule index is incomplete")

    combined_rows: dict[str, dict[str, dict[str, Any]]] = {}
    combined_raw_lines: dict[str, dict[str, list[bytes]]] = {}
    for arm in ARMS:
        assignment_paths = sorted((output / "assignments" / arm).glob("agent-*.json"))
        if len(assignment_paths) != 6:
            raise ValueError(f"{arm}: expected six combined assignment files")
        rows: dict[str, dict[str, Any]] = {}
        raw_lines_by_agent: dict[str, list[bytes]] = {}
        for assignment_path in assignment_paths:
            agent = assignment_path.stem
            assignments = load(assignment_path)
            if len(assignments) != 64:
                raise ValueError(f"{arm}/{agent}: expected 64 assignments")
            ids = [item.get("instance_id") for item in assignments]
            raw_path = output / "results" / f"raw-{arm}" / f"{agent}.jsonl"
            raw_rows, raw_lines = parse_raw(raw_path)
            if len(raw_rows) != 64 or [row.get("instance_id") for row in raw_rows] != ids:
                raise ValueError(f"{arm}/{agent}: combined raw output does not match assignments")
            for assignment in assignments:
                iid = assignment.get("instance_id")
                if iid not in instances or assignment.get("url") != instances[iid].get("url"):
                    raise ValueError(f"{arm}/{agent}/{iid}: assignment identity mismatch")
            for row in raw_rows:
                iid_value = row.get("instance_id")
                if not isinstance(iid_value, str):
                    raise ValueError(f"{arm}/{agent}: instance_id must be a string")
                iid = iid_value
                if iid in rows:
                    raise ValueError(f"{arm}: duplicate row {iid}")
                validate_row(row, arm, valid_rules, rule_patterns)
                rows[iid] = row
            raw_lines_by_agent[agent] = raw_lines
        if set(rows) != set(instances):
            raise ValueError(f"{arm}: row coverage {len(rows)}/384")
        combined_rows[arm] = rows
        combined_raw_lines[arm] = raw_lines_by_agent
    if set(combined_rows[ARMS[0]]) != set(combined_rows[ARMS[1]]):
        raise ValueError("combined arms are not paired")

    provenance = load(output / "row-provenance.json")
    provenance_rows = provenance.get("rows", [])
    if len(provenance_rows) != 768 or provenance.get("counts") != {"total": 768, "original": 744, "extension": 24, "per_arm": {"not-aided": 384, "aided": 384}}:
        raise ValueError("row provenance counts are incomplete")
    provenance_map = {}
    for item in provenance_rows:
        key = (item.get("arm"), item.get("instance_id"))
        if key in provenance_map:
            raise ValueError(f"duplicate row provenance {key}")
        provenance_map[key] = item
    extension_rows = [item for item in provenance_rows if item.get("extension_row") is True]
    if len(extension_rows) != 24 or {item.get("source_run_id") for item in extension_rows} != {extension["run_id"]}:
        raise ValueError("extension row provenance is not exactly 24 rows")
    for arm in ARMS:
        for agent, raw_lines in combined_raw_lines[arm].items():
            for aggregate_line, raw_line in enumerate(raw_lines, 1):
                row = json.loads(raw_line.decode("utf-8"))
                item = provenance_map.get((arm, row["instance_id"]))
                if item is None or item.get("aggregate_file") != f"results/raw-{arm}/{agent}.jsonl" or item.get("aggregate_line") != aggregate_line:
                    raise ValueError(f"missing or incorrect provenance for {arm}/{agent}:{aggregate_line}")
                source_path = Path(item["source_file"])
                source_lines = source_path.read_bytes().splitlines(keepends=True)
                source_line = item["source_line"]
                if not isinstance(source_line, int) or source_line < 1 or source_line > len(source_lines):
                    raise ValueError(f"invalid source line provenance for {row['instance_id']}")
                source_row = json.loads(source_lines[source_line - 1].decode("utf-8"))
                if source_row != row or item.get("source_sha256") != sha256(source_path):
                    raise ValueError(f"row content/source hash mismatch for {row['instance_id']}")

    # A byte-level concatenation check proves that no source raw line was rewritten.
    source_paths = {}
    for source_name in ("authoritative_completed_observations", "validated_extension"):
        source = manifest["source_artifacts"][source_name]
        for relative, record in source.items():
            if relative.startswith("results/raw-"):
                source_paths[(source_name, relative)] = Path(record["path"])
    for arm in ARMS:
        for agent in (f"agent-{number:02d}" for number in range(1, 7)):
            relative = f"results/raw-{arm}/{agent}.jsonl"
            first = source_paths[("authoritative_completed_observations", relative)]
            second = source_paths[("validated_extension", relative)]
            expected_bytes = first.read_bytes()
            extension_bytes = second.read_bytes()
            if expected_bytes and not expected_bytes.endswith(b"\n"):
                expected_bytes += b"\n"
            expected_bytes += extension_bytes
            actual = (output / relative).read_bytes()
            if actual != expected_bytes:
                raise ValueError(f"raw byte preservation failed: {relative}")

    result = load(output / "results/results.json")
    truth_label = lambda iid: "DECEPTIVE" if truth[iid]["deceptive"] else "BENIGN"
    expected_metrics = {
        arm: metric([(iid, combined_rows[arm][iid]["model_final"], bool(truth[iid]["deceptive"])) for iid in sorted(instances)])
        for arm in ARMS
    }
    expected_metrics["aided_base"] = metric([(iid, combined_rows["aided"][iid]["base_label"], bool(truth[iid]["deceptive"])) for iid in sorted(instances)])
    if result.get("metrics") != expected_metrics:
        raise ValueError("combined results metrics do not match raw rows")
    design = result.get("design", {})
    if design.get("distinct_interfaces") != 384 or design.get("audit_rows_total") != 768 or design.get("patterns") != 64 or design.get("agents_per_arm") != {"not-aided": 6, "aided": 6}:
        raise ValueError("combined results design metadata mismatch")
    if result.get("validation") != {"issues": 0, "rows": {"not-aided": 384, "aided": 384}}:
        raise ValueError("combined results validation metadata mismatch")
    if len(result.get("per_pattern", {})) != 64 or len(result.get("per_condition", {})) != 3:
        raise ValueError("combined derived breakdowns are incomplete")

    # Verify the manifest's hash inventory and the detached checksum file.
    for relative, expected_hash in manifest.get("output_files_sha256", {}).items():
        path = output / relative
        if not path.is_file() or sha256(path) != expected_hash:
            raise ValueError(f"output hash inventory mismatch: {relative}")
    checksum_entries = {}
    for line in (output / "sha256sums.txt").read_text(encoding="utf-8").splitlines():
        digest, relative = line.split("  ", 1)
        checksum_entries[relative] = digest
    actual_files = {str(path.relative_to(output)) for path in output.rglob("*") if path.is_file() and path.name != "sha256sums.txt"}
    if set(checksum_entries) != actual_files:
        raise ValueError("sha256sums.txt file set does not match aggregate")
    if any(sha256(output / relative) != digest for relative, digest in checksum_entries.items()):
        raise ValueError("sha256sums.txt digest mismatch")

    extension_evidence = manifest["source_artifacts"]["validated_extension"]
    for relative in ("evidence/capture-index.json", "evidence/live-captures-not-aided.json", "evidence/live-captures-aided.json"):
        copied = output / "evidence" / "extension" / Path(relative).name
        if not copied.is_file() or sha256(copied) != extension_evidence[relative]["sha256"]:
            raise ValueError(f"extension evidence copy mismatch: {relative}")
    return {
        "status": "PASS",
        "run": str(output),
        "patterns": 64,
        "distinct_interfaces_per_arm": 384,
        "raw_rows_per_arm": 384,
        "combined_audit_rows": 768,
        "agents_per_arm": 6,
        "extension_rows_provenance_checked": len(extension_rows),
        "metrics": expected_metrics,
        "source_runs": {key: value["run_id"] for key, value in source_runs.items()},
    }


if __name__ == "__main__":
    try:
        result = validate_output()
    except (OSError, ValueError, KeyError, json.JSONDecodeError) as exc:
        print(json.dumps({"status": "FAIL", "error": str(exc)}, indent=2, ensure_ascii=False))
        raise SystemExit(1)
    print(json.dumps(result, indent=2, ensure_ascii=False))
