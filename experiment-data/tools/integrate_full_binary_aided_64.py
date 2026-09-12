#!/usr/bin/env python3
"""Create an additive, provenance-preserving 64-pattern aggregate.

The original completed observation run and the validated two-pattern extension
are read-only inputs.  The script refuses to overwrite an existing output
bundle and writes a new aggregate directory containing copied raw rows,
combined score-only metadata, derived metrics, and row-level provenance.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
from collections import Counter
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
DEFAULT_DATA = Path("/home/neliq/Coding/master-project/experiment-data")
DEFAULT_ORIGINAL = DEFAULT_DATA / "full-binary-aided-pattern-first-v4-20260906-gpt54mini"
DEFAULT_DECLARED_BASE = DEFAULT_DATA / "full-binary-aided-pattern-first-rollback-v7-20260907-gpt54mini"
DEFAULT_EXTENSION = DEFAULT_DATA / "full-binary-aided-pattern-extension-v9-20260910-gpt56luna900k-retry15"
DEFAULT_OUTPUT = DEFAULT_DATA / "full-binary-aided-pattern-combined-v10-20260910-gpt56luna900k"


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def source_file_record(path: Path, root: Path) -> dict[str, Any]:
    if not path.is_file():
        raise ValueError(f"missing required source file: {path}")
    return {
        "path": str(path),
        "relative_path": str(path.relative_to(root)),
        "size_bytes": path.stat().st_size,
        "sha256": sha256(path),
    }


def run_file_map(run: Path, relatives: list[str]) -> dict[str, dict[str, Any]]:
    return {relative: source_file_record(run / relative, run) for relative in relatives}


def parse_raw_file(path: Path) -> tuple[list[dict[str, Any]], list[tuple[int, bytes]]]:
    rows: list[dict[str, Any]] = []
    line_records: list[tuple[int, bytes]] = []
    for line_no, raw_line in enumerate(path.read_bytes().splitlines(keepends=True), 1):
        if not raw_line.strip():
            raise ValueError(f"blank line in raw output {path}:{line_no}")
        try:
            row = json.loads(raw_line.decode("utf-8"))
        except json.JSONDecodeError as exc:
            raise ValueError(f"invalid JSON in {path}:{line_no}: {exc}") from exc
        rows.append(row)
        line_records.append((line_no, raw_line))
    return rows, line_records


def validate_row(
    row: dict[str, Any],
    arm: str,
    valid_rules: set[str],
    valid_rule_patterns: dict[str, str],
) -> None:
    iid = row.get("instance_id")
    missing = COMMON - set(row)
    if missing:
        raise ValueError(f"{arm}/{iid}: missing common fields {sorted(missing)}")
    if row.get("arm") != arm or row.get("model_final") not in LABELS:
        raise ValueError(f"{arm}/{iid}: invalid arm or final label")
    if not isinstance(row.get("confidence"), (int, float)) or not 0 <= row["confidence"] <= 1:
        raise ValueError(f"{arm}/{iid}: confidence invalid")
    if row.get("evidence_status") not in EVIDENCE:
        raise ValueError(f"{arm}/{iid}: evidence_status invalid")
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
        raise ValueError(f"aided/{iid}: invalid candidate shortlist")
    if not isinstance(support_ids, list) or any(rule not in candidate_ids for rule in support_ids):
        raise ValueError(f"aided/{iid}: invalid support binding")
    for field in ("candidate_screening", "mechanism_summary", "candidate_pattern"):
        if not isinstance(row[field], str) or not row[field].strip():
            raise ValueError(f"aided/{iid}: empty {field}")
    candidate_pattern = row["candidate_pattern"]
    if candidate_pattern != "NONE" and any(valid_rule_patterns.get(rule) != candidate_pattern for rule in candidate_ids):
        raise ValueError(f"aided/{iid}: candidate rule outside candidate pattern")
    if row["formal_support"] == "DIRECT" and not support_ids:
        raise ValueError(f"aided/{iid}: direct support without rule")
    if row["formal_support"] == "NONE" and support_ids:
        raise ValueError(f"aided/{iid}: support IDs present with NONE")
    expected_final = "DECEPTIVE" if row["base_label"] == "DECEPTIVE" or row["formal_support"] == "DIRECT" else "BENIGN"
    if row["model_final"] != expected_final:
        raise ValueError(f"aided/{iid}: support-only equation violated")


def read_run_rows(
    run: Path,
    instances: dict[str, Any],
    rules: list[dict[str, Any]],
) -> tuple[dict[str, dict[str, dict[str, Any]]], dict[str, dict[str, list[dict[str, Any]]]], dict[str, dict[str, list[tuple[int, bytes]]]]]:
    valid_rules = {rule["rule_id"] for rule in rules}
    valid_rule_patterns = {rule["rule_id"]: rule["pattern"] for rule in rules}
    all_rows: dict[str, dict[str, dict[str, Any]]] = {}
    all_assignments: dict[str, dict[str, list[dict[str, Any]]]] = {}
    all_line_records: dict[str, dict[str, list[tuple[int, bytes]]]] = {}
    for arm in ARMS:
        assignment_paths = sorted((run / "assignments" / arm).glob("agent-*.json"))
        if len(assignment_paths) != 6:
            raise ValueError(f"{run.name}/{arm}: expected 6 assignment files, found {len(assignment_paths)}")
        rows: dict[str, dict[str, Any]] = {}
        assignments: dict[str, list[dict[str, Any]]] = {}
        line_records: dict[str, list[tuple[int, bytes]]] = {}
        for assignment_path in assignment_paths:
            agent = assignment_path.stem
            assigned = load_json(assignment_path)
            assignments[agent] = assigned
            expected_ids = [item.get("instance_id") for item in assigned]
            if any(iid not in instances for iid in expected_ids):
                raise ValueError(f"{run.name}/{arm}/{agent}: assignment references unknown instance")
            raw_path = run / "results" / f"raw-{arm}" / f"{agent}.jsonl"
            raw_rows, raw_line_records = parse_raw_file(raw_path)
            if [row.get("instance_id") for row in raw_rows] != expected_ids:
                raise ValueError(f"{run.name}/{arm}/{agent}: raw output order does not match assignment")
            if len(raw_rows) != len(assigned):
                raise ValueError(f"{run.name}/{arm}/{agent}: raw/assignment row count mismatch")
            for row in raw_rows:
                iid_value = row.get("instance_id")
                if not isinstance(iid_value, str):
                    raise ValueError(f"{run.name}/{arm}/{agent}: instance_id must be a string")
                iid = iid_value
                if iid in rows:
                    raise ValueError(f"{run.name}/{arm}: duplicate raw row {iid}")
                validate_row(row, arm, valid_rules, valid_rule_patterns)
                rows[iid] = row
            line_records[agent] = raw_line_records
        if set(rows) != set(instances):
            raise ValueError(f"{run.name}/{arm}: coverage {len(rows)}/{len(instances)}")
        all_rows[arm] = rows
        all_assignments[arm] = assignments
        all_line_records[arm] = line_records
    if set(all_rows[ARMS[0]]) != set(all_rows[ARMS[1]]):
        raise ValueError(f"{run.name}: arms are not paired on the same instance IDs")
    if all_assignments[ARMS[0]] != all_assignments[ARMS[1]]:
        raise ValueError(f"{run.name}: arm assignment order differs")
    return all_rows, all_assignments, all_line_records


def validate_design(run: Path, instances: dict[str, Any], routes: list[dict[str, Any]], rules: list[dict[str, Any]], expected_patterns: int) -> None:
    if len(instances) != expected_patterns * 3 * 2:
        raise ValueError(f"{run.name}: expected {expected_patterns * 6} instances, found {len(instances)}")
    grid = Counter((row.get("slug"), row.get("condition"), row.get("variant")) for row in instances.values())
    if len(grid) != len(instances) or any(count != 1 for count in grid.values()):
        raise ValueError(f"{run.name}: duplicate or incomplete instance grid")
    pattern_numbers = {row.get("pattern_number") for row in instances.values()}
    if expected_patterns == 62 and pattern_numbers != set(range(1, 63)):
        raise ValueError(f"{run.name}: original pattern numbers are not 1..62")
    if len(routes) != expected_patterns or {row.get("pattern_number") for row in routes} != pattern_numbers:
        raise ValueError(f"{run.name}: route-pattern index does not match instances")
    if len(rules) != expected_patterns * 3:
        raise ValueError(f"{run.name}: expected {expected_patterns * 3} rules, found {len(rules)}")
    rule_ids = {rule.get("rule_id") for rule in rules}
    if len(rule_ids) != len(rules):
        raise ValueError(f"{run.name}: duplicate rule IDs")


def validate_extension_gate(extension: Path) -> dict[str, Any]:
    report_path = extension / "validation-report.json"
    report = load_json(report_path)
    if report.get("status") != "PASS" or report.get("issues") != []:
        raise ValueError(f"extension validation gate is not PASS: {report_path}")
    if report.get("distinct_interfaces") != 12 or report.get("raw_rows") != {"aided": 12, "not-aided": 12}:
        raise ValueError("extension validation gate has unexpected counts")
    if report.get("agent_files") != {"aided": 6, "not-aided": 6}:
        raise ValueError("extension validation gate has unexpected agent counts")
    manifest = load_json(extension / "public-manifest.json")
    runtime = load_json(extension / "runtime-config.json")
    if manifest.get("metrics_emitted") is not False or runtime.get("metrics_emitted") is not False:
        raise ValueError("extension must not contain precomputed metrics")
    if manifest.get("provenance", {}).get("original_run_untouched") is not True:
        raise ValueError("extension provenance does not declare original run untouched")
    return report


def metric(values: list[tuple[str, str, bool]]) -> dict[str, Any]:
    tp = sum(pred == "DECEPTIVE" and truth for _iid, pred, truth in values)
    fp = sum(pred == "DECEPTIVE" and not truth for _iid, pred, truth in values)
    tn = sum(pred == "BENIGN" and not truth for _iid, pred, truth in values)
    fn = sum(pred == "BENIGN" and truth for _iid, pred, truth in values)
    n = len(values)
    precision = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn) if tp + fn else 0.0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    return {
        "n": n,
        "accuracy": (tp + tn) / n if n else 0.0,
        "precision": precision,
        "recall": recall,
        "f1": f1,
        "tp": tp,
        "fp": fp,
        "tn": tn,
        "fn": fn,
    }


def concatenate_bytes(first: bytes, second: bytes) -> bytes:
    if first and not first.endswith(b"\n"):
        return first + b"\n" + second
    return first + second


def concat_index(first: Path, second: Path) -> bytes:
    return concatenate_bytes(first.read_bytes(), second.read_bytes())


def copy_extension_evidence(extension: Path, stage: Path) -> None:
    destination = stage / "evidence" / "extension"
    destination.mkdir(parents=True, exist_ok=True)
    for relative in ("capture-index.json", "live-captures-not-aided.json", "live-captures-aided.json"):
        shutil.copy2(extension / "evidence" / relative, destination / relative)


def combined_provenance(
    original: Path,
    extension: Path,
    output_name: str,
    original_assignments: dict[str, dict[str, list[dict[str, Any]]]],
    extension_assignments: dict[str, dict[str, list[dict[str, Any]]]],
    original_line_records: dict[str, dict[str, list[tuple[int, bytes]]]],
    extension_line_records: dict[str, dict[str, list[tuple[int, bytes]]]],
) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for arm in ARMS:
        for agent in sorted(original_assignments[arm]):
            original_records = original_line_records[arm][agent]
            extension_records = extension_line_records[arm][agent]
            original_source = original / "results" / f"raw-{arm}" / f"{agent}.jsonl"
            extension_source = extension / "results" / f"raw-{arm}" / f"{agent}.jsonl"
            original_line_count = len(original_source.read_bytes().splitlines())
            aggregate_file = f"results/raw-{arm}/{agent}.jsonl"
            for line_no, raw_line in original_records:
                row = json.loads(raw_line.decode("utf-8"))
                rows.append({
                    "arm": arm,
                    "instance_id": row["instance_id"],
                    "source_run_id": original.name,
                    "source_file": str(original_source),
                    "source_line": line_no,
                    "source_sha256": sha256(original_source),
                    "aggregate_run_id": output_name,
                    "aggregate_file": aggregate_file,
                    "aggregate_line": line_no,
                    "extension_row": False,
                })
            for line_no, raw_line in extension_records:
                row = json.loads(raw_line.decode("utf-8"))
                rows.append({
                    "arm": arm,
                    "instance_id": row["instance_id"],
                    "source_run_id": extension.name,
                    "source_file": str(extension_source),
                    "source_line": line_no,
                    "source_sha256": sha256(extension_source),
                    "aggregate_run_id": output_name,
                    "aggregate_file": aggregate_file,
                    "aggregate_line": original_line_count + line_no,
                    "extension_row": True,
                })
    return rows


def all_source_relatives(run: Path, include_evidence: bool, include_observations: bool = True) -> list[str]:
    relatives = [
        "runtime-config.json",
        "public-manifest.json",
        "score-only/instances.json",
        "score-only/ground-truth.json",
        "score-only/route-patterns.json",
        "score-only/rules.json",
    ]
    if include_observations:
        for arm in ARMS:
            for agent in range(1, 7):
                relatives.append(f"assignments/{arm}/agent-{agent:02d}.json")
                relatives.append(f"results/raw-{arm}/agent-{agent:02d}.jsonl")
    for relative in (
        "arms/aided/pattern-routing-index.jsonl",
        "arms/aided/formalization-index.jsonl",
        "arms/aided/formalization-index.json",
    ):
        if (run / relative).exists():
            relatives.append(relative)
    if include_evidence:
        for relative in ("evidence/capture-index.json", "evidence/live-captures-not-aided.json", "evidence/live-captures-aided.json"):
            if (run / relative).exists():
                relatives.append(relative)
    if include_observations and (run / "results/results.json").exists():
        relatives.append("results/results.json")
    if include_observations and (run / "results/report.md").exists():
        relatives.append("results/report.md")
    if (run / "base-run-reference.json").exists():
        relatives.append("base-run-reference.json")
    return relatives


def validate_declared_base(original: Path, declared_base: Path, extension: Path) -> None:
    base_reference = load_json(extension / "base-run-reference.json")
    referenced_path = Path(base_reference["path"])
    if referenced_path.resolve() != declared_base.resolve():
        raise ValueError("extension base-run-reference path does not match declared base input")
    if base_reference.get("run_id") != declared_base.name:
        raise ValueError("extension base-run-reference run ID does not match directory")
    if sha256(declared_base / "runtime-config.json") != base_reference.get("runtime_config_sha256"):
        raise ValueError("declared base runtime-config hash mismatch")
    if sha256(declared_base / "public-manifest.json") != base_reference.get("public_manifest_sha256"):
        raise ValueError("declared base public-manifest hash mismatch")
    for relative in ("runtime-config.json", "score-only/instances.json", "score-only/ground-truth.json", "score-only/rules.json", "score-only/route-patterns.json"):
        if sha256(original / relative) != sha256(declared_base / relative):
            raise ValueError(f"completed original and declared base differ in {relative}")


def format_metric_row(name: str, values: dict[str, Any]) -> str:
    return f"| {name} | {values['n']} | {values['accuracy']:.3f} | {values['precision']:.3f} | {values['recall']:.3f} | {values['f1']:.3f} | {values['tp']} | {values['fp']} | {values['tn']} | {values['fn']} |"


def derive_results(
    output_name: str,
    runtime: dict[str, Any],
    instances: dict[str, Any],
    truth: dict[str, Any],
    rows: dict[str, dict[str, dict[str, Any]]],
    assignments: dict[str, dict[str, list[dict[str, Any]]]],
    source_manifest_path: str,
) -> tuple[dict[str, Any], str]:
    expected = set(instances)
    truth_label = lambda iid: "DECEPTIVE" if truth[iid]["deceptive"] else "BENIGN"
    values = {
        arm: [(iid, rows[arm][iid]["model_final"], bool(truth[iid]["deceptive"])) for iid in sorted(expected)]
        for arm in ARMS
    }
    metrics = {arm: metric(values[arm]) for arm in ARMS}
    metrics["aided_base"] = metric([
        (iid, rows["aided"][iid]["base_label"], bool(truth[iid]["deceptive"]))
        for iid in sorted(expected)
    ])
    help_cases = [
        iid for iid in sorted(expected)
        if rows["aided"][iid]["base_label"] != truth_label(iid)
        and rows["aided"][iid]["model_final"] == truth_label(iid)
    ]
    harm_cases = [
        iid for iid in sorted(expected)
        if rows["aided"][iid]["base_label"] == truth_label(iid)
        and rows["aided"][iid]["model_final"] != rows["aided"][iid]["base_label"]
    ]
    flip_cases = [
        iid for iid in sorted(expected)
        if rows["not-aided"][iid]["model_final"] != rows["aided"][iid]["model_final"]
    ]
    corrections = [
        iid for iid in flip_cases
        if rows["not-aided"][iid]["model_final"] != truth_label(iid)
        and rows["aided"][iid]["model_final"] == truth_label(iid)
    ]
    regressions = [
        iid for iid in flip_cases
        if rows["not-aided"][iid]["model_final"] == truth_label(iid)
        and rows["aided"][iid]["model_final"] != truth_label(iid)
    ]
    per_pattern: dict[str, dict[str, list[dict[str, str]]]] = {}
    per_condition: dict[str, dict[str, list[dict[str, str]]]] = {}
    for iid in sorted(expected):
        pattern = instances[iid]["slug"]
        condition = str(instances[iid]["condition"])
        per_pattern.setdefault(pattern, {arm: [] for arm in ARMS})
        per_condition.setdefault(condition, {arm: [] for arm in ARMS})
        for arm in ARMS:
            item = {"truth": truth_label(iid), "prediction": rows[arm][iid]["model_final"]}
            per_pattern[pattern][arm].append(item)
            per_condition[condition][arm].append(item)
    diagnostics = {
        "direct_support_count": sum(rows["aided"][iid]["formal_support"] == "DIRECT" for iid in sorted(expected)),
        "internal_help_cases": [
            {"instance_id": iid, "slug": instances[iid]["slug"], "base": rows["aided"][iid]["base_label"], "final": rows["aided"][iid]["model_final"], "rule_ids": rows["aided"][iid]["formal_support_rule_ids"]}
            for iid in help_cases
        ],
        "internal_harm_cases": [{"instance_id": iid, "slug": instances[iid]["slug"]} for iid in harm_cases],
        "cross_arm_flip_cases": [
            {"instance_id": iid, "slug": instances[iid]["slug"], "not_aided": rows["not-aided"][iid]["model_final"], "aided": rows["aided"][iid]["model_final"]}
            for iid in flip_cases
        ],
        "formal_layer_non_degrading_vs_aided_base": not harm_cases,
        "aided_correct_changes_vs_not_aided": len(corrections),
        "aided_regressions_vs_not_aided": len(regressions),
    }
    result = {
        "run_id": output_name,
        "runtime": runtime,
        "design": {
            "distinct_interfaces": len(expected),
            "audit_rows_total": len(expected) * len(ARMS),
            "patterns": len({row["slug"] for row in instances.values()}),
            "conditions_per_pattern": 3,
            "variants_per_condition": 2,
            "agents_total": sum(len(assignments[arm]) for arm in ARMS),
            "agents_per_arm": {arm: len(assignments[arm]) for arm in ARMS},
            "arms": list(ARMS),
            "binary_only": True,
            "aided_mode": "support-only, context-gated, candidate-shortlisted pseudocode",
        },
        "metrics": metrics,
        "aided_internal_harm_events": len(harm_cases),
        "aided_internal_help_events": len(help_cases),
        "not_aided_vs_aided_flips": len(flip_cases),
        "per_pattern": per_pattern,
        "per_condition": per_condition,
        "diagnostics": diagnostics,
        "provenance": {"integration_manifest": source_manifest_path},
        "validation": {"issues": 0, "rows": {arm: len(rows[arm]) for arm in ARMS}},
    }
    report_lines = [
        f"# Full binary aided-vs-not-aided combined aggregate — {output_name}",
        "",
        "This additive aggregate copies the original completed raw observations and appends the validated extension raw observations; all reported metrics are derived from those copied rows and construction-defined truth.",
        f"- {len(expected)} distinct interfaces: 64 patterns × 3 conditions × 2 variants.",
        f"- {len(expected) * len(ARMS)} total audit rows across exactly two arms.",
        "- Both arms are binary-only; aided rules are context-gated, candidate-shortlisted, and support-only.",
        "- Original source observations: 372 interfaces / 744 audit rows; extension source observations: 12 interfaces / 24 audit rows.",
        "",
        "| Output | N | Accuracy | Precision | Recall | F1 | TP | FP | TN | FN |",
        "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|",
    ]
    for name in ("not-aided", "aided", "aided_base"):
        report_lines.append(format_metric_row(name, metrics[name]))
    report_lines += [
        "",
        f"- Aided internal harmful changes (formal layer: correct base → incorrect final): {len(harm_cases)}.",
        f"- Aided internal helpful changes (formal layer: incorrect base → correct final): {len(help_cases)}.",
        f"- Direct formal support cases: {diagnostics['direct_support_count']}.",
        f"- Final aided correct changes versus not-aided: {len(corrections)}.",
        f"- Final aided regressions versus not-aided: {len(regressions)}.",
        f"- Formal layer non-degrading versus aided base: {'YES' if not harm_cases else 'NO'}.",
        f"- Not-aided versus aided final-label flips: {len(flip_cases)}.",
        "",
        "## Accuracy by condition",
        "",
        "| Condition | Not aided | Aided base | Aided final |",
        "|---:|---:|---:|---:|",
    ]
    for condition in sorted(per_condition, key=int):
        ids = [iid for iid in expected if str(instances[iid]["condition"]) == condition]
        scores = []
        for getter in (
            lambda iid: rows["not-aided"][iid]["model_final"],
            lambda iid: rows["aided"][iid]["base_label"],
            lambda iid: rows["aided"][iid]["model_final"],
        ):
            scores.append(f"{sum(getter(iid) == truth_label(iid) for iid in ids)}/{len(ids)}")
        report_lines.append(f"| {condition} | {' | '.join(scores)} |")
    report_lines += [
        "",
        "## Accuracy by pattern",
        "",
        "| Pattern | Not aided | Aided base | Aided final |",
        "|---|---:|---:|---:|",
    ]
    for pattern in sorted(per_pattern):
        ids = [iid for iid in expected if instances[iid]["slug"] == pattern]
        scores = []
        for getter in (
            lambda iid: rows["not-aided"][iid]["model_final"],
            lambda iid: rows["aided"][iid]["base_label"],
            lambda iid: rows["aided"][iid]["model_final"],
        ):
            scores.append(f"{sum(getter(iid) == truth_label(iid) for iid in ids)}/{len(ids)}")
        report_lines.append(f"| {pattern} | {' | '.join(scores)} |")
    return result, "\n".join(report_lines) + "\n"


def build(args: argparse.Namespace) -> dict[str, Any]:
    original = args.original.resolve()
    declared_base = args.declared_base.resolve()
    extension = args.extension.resolve()
    output = args.output.resolve()
    if output.exists():
        raise ValueError(f"refusing to overwrite existing output: {output}")
    staging = output.with_name(output.name + ".staging")
    if staging.exists():
        raise ValueError(f"refusing to reuse existing staging directory: {staging}")
    validate_extension_gate(extension)
    validate_declared_base(original, declared_base, extension)

    original_instances = load_json(original / "score-only/instances.json")
    original_truth = load_json(original / "score-only/ground-truth.json")
    original_routes = load_json(original / "score-only/route-patterns.json")
    original_rules = load_json(original / "score-only/rules.json")
    extension_instances = load_json(extension / "score-only/instances.json")
    extension_truth = load_json(extension / "score-only/ground-truth.json")
    extension_routes = load_json(extension / "score-only/route-patterns.json")
    extension_rules = load_json(extension / "score-only/rules.json")
    validate_design(original, original_instances, original_routes, original_rules, 62)
    validate_design(extension, extension_instances, extension_routes, extension_rules, 2)
    if set(original_instances) & set(extension_instances):
        raise ValueError("original and extension instance IDs collide")
    if set(original_truth) != set(original_instances) or set(extension_truth) != set(extension_instances):
        raise ValueError("ground-truth IDs do not match instance IDs")
    if {row["pattern_number"] for row in extension_instances.values()} != {63, 64}:
        raise ValueError("extension is not exactly patterns 63 and 64")
    if {rule["rule_id"] for rule in original_rules} & {rule["rule_id"] for rule in extension_rules}:
        raise ValueError("original and extension rule records collide")

    original_rows, original_assignments, original_line_records = read_run_rows(original, original_instances, original_rules)
    extension_rows, extension_assignments, extension_line_records = read_run_rows(extension, extension_instances, extension_rules)
    combined_instances = dict(original_instances)
    combined_instances.update(extension_instances)
    combined_truth = dict(original_truth)
    combined_truth.update(extension_truth)
    combined_routes = sorted(original_routes + extension_routes, key=lambda row: row["pattern_number"])
    combined_rules = original_rules + extension_rules
    if len(combined_instances) != 384 or len(combined_routes) != 64 or len(combined_rules) != 192:
        raise ValueError("combined design counts are not 384 interfaces / 64 routes / 192 rules")
    combined_rows = {arm: dict(original_rows[arm]) for arm in ARMS}
    for arm in ARMS:
        combined_rows[arm].update(extension_rows[arm])
    combined_assignments = {
        arm: {
            agent: original_assignments[arm][agent] + extension_assignments[arm][agent]
            for agent in sorted(original_assignments[arm])
        }
        for arm in ARMS
    }
    for arm in ARMS:
        if any(len(items) != 64 for items in combined_assignments[arm].values()):
            raise ValueError(f"combined {arm} assignment does not have 64 rows per agent")

    staging.mkdir(parents=True)
    stage = staging
    try:
        for arm in ARMS:
            assignment_dir = stage / "assignments" / arm
            raw_dir = stage / "results" / f"raw-{arm}"
            assignment_dir.mkdir(parents=True, exist_ok=True)
            raw_dir.mkdir(parents=True, exist_ok=True)
            for agent in sorted(combined_assignments[arm]):
                write_json(assignment_dir / f"{agent}.json", combined_assignments[arm][agent])
                original_raw = original / "results" / f"raw-{arm}" / f"{agent}.jsonl"
                extension_raw = extension / "results" / f"raw-{arm}" / f"{agent}.jsonl"
                (raw_dir / f"{agent}.jsonl").write_bytes(concatenate_bytes(original_raw.read_bytes(), extension_raw.read_bytes()))
        write_json(stage / "score-only" / "instances.json", combined_instances)
        write_json(stage / "score-only" / "ground-truth.json", combined_truth)
        write_json(stage / "score-only" / "route-patterns.json", combined_routes)
        write_json(stage / "score-only" / "rules.json", combined_rules)
        (stage / "arms" / "aided").mkdir(parents=True, exist_ok=True)
        (stage / "arms" / "aided" / "pattern-routing-index.jsonl").write_bytes(
            concat_index(original / "arms/aided/pattern-routing-index.jsonl", extension / "arms/aided/pattern-routing-index.jsonl")
        )
        (stage / "arms" / "aided" / "formalization-index.jsonl").write_bytes(
            concat_index(original / "arms/aided/formalization-index.jsonl", extension / "arms/aided/formalization-index.jsonl")
        )
        original_formalization = load_json(original / "arms/aided/formalization-index.json")
        extension_formalization = load_json(extension / "arms/aided/formalization-index.json")
        write_json(stage / "arms" / "aided" / "formalization-index.json", original_formalization + extension_formalization)
        if (original / "arms/aided/formalization-index.md").exists():
            formalization_markdown = (original / "arms/aided/formalization-index.md").read_text(encoding="utf-8")
            formalization_markdown += "\n\n---\n\n# Extension formalization rules\n\n"
            formalization_markdown += (extension / "arms/aided/formalizations-pseudocode.md").read_text(encoding="utf-8")
            (stage / "arms" / "aided" / "formalization-index.md").write_text(formalization_markdown, encoding="utf-8")
        copy_extension_evidence(extension, stage)

        original_runtime = load_json(original / "runtime-config.json")
        extension_runtime = load_json(extension / "runtime-config.json")
        runtime = {
            "run_id": output.name,
            "model": "derived aggregate",
            "provider": "derived from read-only source runs",
            "arms": list(ARMS),
            "patterns": 64,
            "conditions_per_pattern": 3,
            "variants_per_condition": 2,
            "distinct_interfaces": 384,
            "audit_rows_total": 768,
            "agents_total": 12,
            "agents_per_arm": 6,
            "source_runs": {
                "authoritative_completed_observations": original.name,
                "declared_extension_base": declared_base.name,
                "validated_extension": extension.name,
            },
            "source_runtime": {
                "original": original_runtime,
                "extension": extension_runtime,
            },
            "metrics_derived_from_combined_raw": True,
            "original_records_copied_unchanged": True,
            "extension_records_copied_unchanged": True,
        }
        write_json(stage / "runtime-config.json", runtime)
        public_manifest = {
            "run_id": output.name,
            "purpose": "additive 64-pattern aggregate of the completed original run and validated two-pattern extension",
            "patterns": 64,
            "pattern_numbers": list(range(1, 65)),
            "pattern_names": [row["name"] for row in combined_routes],
            "conditions_per_pattern": 3,
            "variants_per_condition": 2,
            "distinct_interfaces": 384,
            "audit_rows_total": 768,
            "agents_total": 12,
            "agents_per_arm": 6,
            "arms": list(ARMS),
            "labels_public": False,
            "evidence_mode": "copied source rows; extension live evidence retained under evidence/extension",
            "source_runs": {
                "authoritative_completed_observations": original.name,
                "declared_extension_base": declared_base.name,
                "validated_extension": extension.name,
            },
            "provenance": {
                "original_run_untouched": True,
                "extension_gate": "validated extension validation-report.json PASS",
                "row_provenance": "row-provenance.json",
                "source_manifest": "integration-manifest.json",
            },
        }
        write_json(stage / "public-manifest.json", public_manifest)
        row_provenance = combined_provenance(
            original,
            extension,
            output.name,
            original_assignments,
            extension_assignments,
            original_line_records,
            extension_line_records,
        )
        write_json(stage / "row-provenance.json", {
            "run_id": output.name,
            "rows": row_provenance,
            "counts": {
                "total": len(row_provenance),
                "original": sum(not row["extension_row"] for row in row_provenance),
                "extension": sum(row["extension_row"] for row in row_provenance),
                "per_arm": {arm: sum(row["arm"] == arm for row in row_provenance) for arm in ARMS},
            },
        })
        result, report = derive_results(output.name, runtime, combined_instances, combined_truth, combined_rows, combined_assignments, "integration-manifest.json")
        write_json(stage / "results" / "results.json", result)
        (stage / "results" / "report.md").write_text(report, encoding="utf-8")
        integration_manifest = {
            "status": "PASS",
            "run_id": output.name,
            "created_by": "integrate_full_binary_aided_64.py",
            "source_runs": {
                "authoritative_completed_observations": {
                    "run_id": original.name,
                    "path": str(original),
                    "role": "only source with completed 62-pattern raw observations and prior aggregate",
                    "patterns": 62,
                    "distinct_interfaces": 372,
                    "audit_rows_total": 744,
                },
                "declared_extension_base": {
                    "run_id": declared_base.name,
                    "path": str(declared_base),
                    "role": "extension-declared immutable base metadata/score-only run",
                    "patterns": 62,
                    "distinct_interfaces": 372,
                    "audit_rows_total": 744,
                    "raw_observations_present": False,
                },
                "validated_extension": {
                    "run_id": extension.name,
                    "path": str(extension),
                    "role": "validated additive 2-pattern raw/live-evidence source",
                    "patterns": 2,
                    "distinct_interfaces": 12,
                    "audit_rows_total": 24,
                },
            },
            "final_counts": {
                "patterns": 64,
                "distinct_interfaces_per_arm": 384,
                "raw_rows_per_arm": 384,
                "combined_audit_rows": 768,
                "agents_per_arm": 6,
                "rows_per_agent_per_arm": 64,
                "route_records": 64,
                "formalization_rules": 192,
            },
            "source_artifacts": {
                "authoritative_completed_observations": run_file_map(original, all_source_relatives(original, False)),
                "declared_extension_base": run_file_map(declared_base, all_source_relatives(declared_base, False, include_observations=False)),
                "validated_extension": run_file_map(extension, all_source_relatives(extension, True)),
            },
            "row_provenance": {
                "path": "row-provenance.json",
                "total_rows": len(row_provenance),
                "original_rows": sum(not row["extension_row"] for row in row_provenance),
                "extension_rows": sum(row["extension_row"] for row in row_provenance),
            },
            "limitations": [
                "The extension handoff names the rollback-v7 directory as its base, but that directory has no raw result files or prior results aggregate. Its runtime and score-only hashes match the completed v4 source used for original observations; both source identities are retained here instead of silently relabelling either run.",
                "The extension intentionally emitted no standalone metrics; all combined metrics in results/results.json are derived here from copied original and extension raw rows plus combined ground truth.",
                "The original run has no live-evidence bundle in its directory; extension live evidence is retained under evidence/extension and linked by source hashes.",
            ],
        }
        (stage / "HANDOFF.md").write_text(
            "# Combined 64-pattern aggregate handoff\n\n"
            f"Canonical aggregate: `{output.name}`\n\n"
            "This bundle is additive: original raw observations remain in their original run, extension raw observations remain in their validated run, and this directory contains exact copied rows plus row-level source/line/hash provenance. No original observation was fabricated, replaced, or edited.\n\n"
            "## Counts\n\n"
            "- Original completed observations: 62 patterns, 372 interfaces, 744 rows (372 per arm).\n"
            "- Validated extension: 2 patterns (Nagging 63 and Games For Other Purposes 64), 12 interfaces, 24 rows (12 per arm).\n"
            "- Combined: 64 patterns, 384 interfaces, 768 rows (384 per arm), 6 agents per arm, 64 rows per agent.\n\n"
            "## Handles\n\n"
            f"- Integration manifest: `{output / 'integration-manifest.json'}`\n"
            f"- Row provenance: `{output / 'row-provenance.json'}`\n"
            f"- Combined metrics: `{output / 'results/results.json'}`\n"
            f"- Combined report: `{output / 'results/report.md'}`\n"
            f"- Public manifest: `{output / 'public-manifest.json'}`\n"
            "- Extension evidence copy: `evidence/extension/`; source hashes and absolute paths are in `integration-manifest.json`.\n\n"
            "## Commands\n\n"
            f"- Extension gate: `python3 {extension / 'validate_extension.py'}`\n"
            f"- Original aggregate/schema gate: `FULL_BINARY_OUT={original} REQUIRE_AID_SCREENING=1 python3 /home/neliq/Coding/master-project/experiment-data/tools/aggregate_full_binary_aided_test.py`\n"
            f"- Integration: `python3 /home/neliq/Coding/master-project/experiment-data/tools/integrate_full_binary_aided_64.py --original {original} --declared-base {declared_base} --extension {extension} --output {output}`\n"
            f"- Final aggregate validator: `FULL_BINARY_64_OUT={output} python3 /home/neliq/Coding/master-project/experiment-data/tools/validate_full_binary_aided_64.py`\n\n"
            "## Limitation\n\n"
            "The extension handoff declares rollback-v7 as its base, but rollback-v7 is metadata/score-only and has no raw results aggregate. The completed v4 directory supplies the untouched original raw observations; v4 and v7 runtime plus score-only hashes match. This distinction is explicit in the integration manifest.\n",
            encoding="utf-8",
        )
        build_report = {
            "status": "PASS",
            "run": str(output),
            "source_runs": integration_manifest["source_runs"],
            "final_counts": integration_manifest["final_counts"],
            "metrics": result["metrics"],
            "row_provenance": integration_manifest["row_provenance"],
        }
        write_json(stage / "integration-build-report.json", build_report)
        # The manifest is written after every other aggregate file so its output hash inventory is deterministic.
        output_files = {}
        for path in sorted(stage.rglob("*")):
            if path.is_file():
                output_files[str(path.relative_to(stage))] = sha256(path)
        integration_manifest["output_files_sha256"] = output_files
        write_json(stage / "integration-manifest.json", integration_manifest)
        checksum_lines = []
        for path in sorted(stage.rglob("*")):
            if path.is_file() and path.name != "sha256sums.txt":
                checksum_lines.append(f"{sha256(path)}  {path.relative_to(stage)}")
        (stage / "sha256sums.txt").write_text("\n".join(checksum_lines) + "\n", encoding="utf-8")
        staging.rename(output)
        return {
            "status": "PASS",
            "run": str(output),
            "integration_manifest": str(output / "integration-manifest.json"),
            "results": str(output / "results/results.json"),
            "report": str(output / "results/report.md"),
            "counts": integration_manifest["final_counts"],
            "metrics": result["metrics"],
        }
    except Exception:
        # Keep the staging directory for controlled inspection; never delete source data.
        raise


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--original", type=Path, default=DEFAULT_ORIGINAL)
    parser.add_argument("--declared-base", type=Path, default=DEFAULT_DECLARED_BASE)
    parser.add_argument("--extension", type=Path, default=DEFAULT_EXTENSION)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    return parser.parse_args()


if __name__ == "__main__":
    try:
        result = build(parse_args())
    except (OSError, ValueError, KeyError, json.JSONDecodeError) as exc:
        print(json.dumps({"status": "FAIL", "error": str(exc)}, indent=2, ensure_ascii=False))
        raise SystemExit(1)
    print(json.dumps(result, indent=2, ensure_ascii=False))
