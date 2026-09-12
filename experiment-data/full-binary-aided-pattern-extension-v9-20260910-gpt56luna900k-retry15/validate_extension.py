#!/usr/bin/env python3
"""Strict validation for the two-pattern extension bundle."""
from __future__ import annotations

import hashlib
import json
from collections import Counter
from pathlib import Path

RUN = Path("/home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-extension-v9-20260910-gpt56luna900k-retry15")
ARMS = ("not-aided", "aided")
LABELS = {"DECEPTIVE", "BENIGN"}
PATTERNS = {
    "nagging": (63, "Nagging"),
    "games-for-other-purposes": (64, "Games For Other Purposes"),
}
COMMON = {"instance_id", "arm", "model_final", "confidence", "evidence_status", "visual_observation", "dom_observation", "transition_observation", "justification"}
AIDED = {"base_label", "mechanism_summary", "candidate_pattern", "candidate_screening", "candidate_rule_ids", "formal_support", "formal_support_rule_ids", "formal_contradiction", "missing_or_unobservable"}

def load(p: Path):
    return json.loads(p.read_text())

def sha(p: Path):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def fail(issues, msg):
    issues.append(msg)

def main():
    issues = []
    manifest = load(RUN / "public-manifest.json")
    runtime = load(RUN / "runtime-config.json")
    instances = load(RUN / "score-only/instances.json")
    truth = load(RUN / "score-only/ground-truth.json")
    routes = load(RUN / "score-only/route-patterns.json")
    rules = load(RUN / "score-only/rules.json")
    rule_map = {r.get("rule_id"): r for r in rules}
    rule_patterns = {r.get("rule_id"): r.get("pattern") for r in rules}
    expected_keys = {(slug, condition, variant) for slug in PATTERNS for condition in (1, 2, 3) for variant in (1, 2)}

    if manifest.get("patterns") != 2 or manifest.get("distinct_interfaces") != 12 or manifest.get("audit_rows_total") != 24:
        fail(issues, f"manifest design counts invalid: {manifest.get('patterns')}/{manifest.get('distinct_interfaces')}/{manifest.get('audit_rows_total')}")
    if runtime.get("raw_rows_written") != 24 or runtime.get("agents_per_arm") != 6 or runtime.get("metrics_emitted") is not False:
        fail(issues, "runtime metadata counts/metrics flag invalid")
    if manifest.get("provenance", {}).get("original_run_untouched") is not True:
        fail(issues, "original_run_untouched provenance flag missing/false")
    if len(routes) != 2 or {(r.get("slug"), r.get("pattern_number"), r.get("name")) for r in routes} != {(s, n, name) for s, (n, name) in PATTERNS.items()}:
        fail(issues, "route-patterns.json is not exactly the two requested patterns")
    if len(rules) != 6 or set(rule_map) != {f"DP-{n:03d}-C{c}" for n in (63, 64) for c in (1, 2, 3)}:
        fail(issues, "rule index is not exactly six DP-063/064 rules")
    if set(instances) != set(truth):
        fail(issues, "instances and ground truth IDs differ")
    if len(instances) != 12:
        fail(issues, f"expected 12 instances, found {len(instances)}")
    instance_keys = set()
    for iid, row in instances.items():
        key = (row.get("slug"), row.get("condition"), row.get("variant"))
        instance_keys.add(key)
        slug = row.get("slug")
        if slug not in PATTERNS or row.get("pattern_number") != PATTERNS[slug][0] or row.get("pattern_name") != PATTERNS[slug][1]:
            fail(issues, f"{iid}: pattern identity mismatch")
        expected_url = f"http://127.0.0.1:3000/{row.get('pattern_number')}/{row.get('condition')}/{row.get('variant')}"
        if row.get("url") != expected_url or truth[iid].get("deceptive") != (row.get("variant") == 1):
            fail(issues, f"{iid}: URL/truth mismatch")
    if instance_keys != expected_keys:
        fail(issues, f"instance grid mismatch: {sorted(instance_keys)}")

    arm_rows = {}
    arm_assignments = {}
    for arm in ARMS:
        apaths = sorted((RUN / "assignments" / arm).glob("agent-*.json"))
        if len(apaths) != 6:
            fail(issues, f"{arm}: expected six assignment files, found {len(apaths)}")
        assignments = {}
        rows = {}
        for ap in apaths:
            agent = ap.stem
            assigned = load(ap)
            assignments[agent] = [x.get("instance_id") for x in assigned]
            if len(assigned) != 2:
                fail(issues, f"{arm}/{agent}: expected two assignments, found {len(assigned)}")
            for x in assigned:
                iid = x.get("instance_id")
                if iid not in instances or x.get("url") != instances[iid].get("url"):
                    fail(issues, f"{arm}/{agent}/{iid}: assignment identity mismatch")
            rp = RUN / "results" / f"raw-{arm}" / f"{agent}.jsonl"
            if not rp.exists():
                fail(issues, f"missing raw file {rp}")
                continue
            parsed = []
            for line_no, line in enumerate(rp.read_text().splitlines(), 1):
                if not line.strip():
                    continue
                try:
                    parsed.append(json.loads(line))
                except Exception as exc:
                    fail(issues, f"invalid JSON {rp}:{line_no}: {exc}")
            if len(parsed) != 2 or [x.get("instance_id") for x in parsed] != assignments[agent]:
                fail(issues, f"{rp}: row count/order mismatch")
            for row in parsed:
                iid = row.get("instance_id")
                if iid in rows:
                    fail(issues, f"{arm}: duplicate row {iid}")
                rows[iid] = row
                missing = COMMON - set(row)
                if missing:
                    fail(issues, f"{arm}/{iid}: missing common fields {sorted(missing)}")
                    continue
                if row.get("arm") != arm or row.get("model_final") not in LABELS or row.get("evidence_status") not in {"SUFFICIENT", "LIMITED"}:
                    fail(issues, f"{arm}/{iid}: invalid arm/label/evidence enum")
                if not isinstance(row.get("confidence"), (int, float)) or not 0 <= row.get("confidence") <= 1:
                    fail(issues, f"{arm}/{iid}: confidence invalid")
                for field in ("visual_observation", "dom_observation", "transition_observation", "justification"):
                    if not isinstance(row.get(field), str) or not row[field].strip():
                        fail(issues, f"{arm}/{iid}: empty {field}")
                if "UNKNOWN" in json.dumps(row, ensure_ascii=False):
                    fail(issues, f"{arm}/{iid}: forbidden third-label token")
                if arm == "aided":
                    missing_aided = AIDED - set(row)
                    if missing_aided:
                        fail(issues, f"aided/{iid}: missing aided fields {sorted(missing_aided)}")
                        continue
                    if row.get("base_label") not in LABELS or row.get("formal_support") not in {"DIRECT", "NONE"} or row.get("formal_contradiction") not in {"DIRECT", "NONE"} or not isinstance(row.get("missing_or_unobservable"), bool):
                        fail(issues, f"aided/{iid}: invalid aided enum/type")
                    candidate_ids = row.get("candidate_rule_ids")
                    support_ids = row.get("formal_support_rule_ids")
                    if not isinstance(candidate_ids, list) or len(candidate_ids) > 3 or any(x not in rule_map for x in candidate_ids):
                        fail(issues, f"aided/{iid}: invalid candidate rules")
                    if not isinstance(support_ids, list) or any(x not in candidate_ids for x in support_ids):
                        fail(issues, f"aided/{iid}: invalid support binding")
                    cp = row.get("candidate_pattern")
                    if cp != "NONE" and cp not in {name for _slug, (_n, name) in PATTERNS.items()}:
                        fail(issues, f"aided/{iid}: invalid candidate pattern {cp!r}")
                    if cp != "NONE" and any(rule_patterns.get(x) != cp for x in candidate_ids):
                        fail(issues, f"aided/{iid}: cross-pattern candidate rule")
                    if row.get("formal_support") == "DIRECT" and not support_ids:
                        fail(issues, f"aided/{iid}: direct support without rule")
                    if row.get("formal_support") == "NONE" and support_ids:
                        fail(issues, f"aided/{iid}: support IDs with NONE")
                    expected_final = "DECEPTIVE" if row.get("base_label") == "DECEPTIVE" or row.get("formal_support") == "DIRECT" else "BENIGN"
                    if row.get("model_final") != expected_final:
                        fail(issues, f"aided/{iid}: support-only equation violated")
            arm_rows[arm] = rows
        arm_assignments[arm] = assignments
    if arm_assignments.get("not-aided") != arm_assignments.get("aided"):
        fail(issues, "arms do not share identical assignment order")
    for arm in ARMS:
        if set(arm_rows.get(arm, {})) != set(instances):
            fail(issues, f"{arm}: coverage {len(arm_rows.get(arm, {}))}/12")

        evidence_path = RUN / "evidence" / f"live-captures-{arm}.json"
        if not evidence_path.exists():
            fail(issues, f"missing evidence file {evidence_path}")
            continue
        evidence = load(evidence_path)
        records = evidence.get("records", [])
        if evidence.get("arm") != arm or len(records) != 12 or {r.get("instance_id") for r in records} != set(instances):
            fail(issues, f"{arm}: evidence coverage/arm mismatch")
        for record in records:
            iid = record.get("instance_id")
            if iid not in instances or record.get("url") != instances[iid].get("url"):
                fail(issues, f"{arm}/{iid}: evidence URL mismatch")
            if not isinstance(record.get("before", {}).get("text"), str) or not record["before"]["text"].strip() or not isinstance(record.get("after", {}).get("text"), str) or not record["after"]["text"].strip():
                fail(issues, f"{arm}/{iid}: empty before/after evidence")
            action = record.get("action", {})
            if not isinstance(action.get("attempted"), bool):
                fail(issues, f"{arm}/{iid}: evidence action missing attempted bool")

    counts = Counter((row["slug"], row["condition"], row["variant"]) for row in instances.values())
    if any(n != 1 for n in counts.values()):
        fail(issues, "duplicate grid cells")
    result = {
        "status": "PASS" if not issues else "FAIL",
        "run": str(RUN),
        "patterns": sorted(PATTERNS),
        "distinct_interfaces": len(instances),
        "raw_rows": {arm: len(arm_rows.get(arm, {})) for arm in ARMS},
        "agent_files": {arm: len(arm_assignments.get(arm, {})) for arm in ARMS},
        "rows_per_agent": {arm: sorted(len(v) for v in arm_assignments.get(arm, {}).values()) for arm in ARMS},
        "evidence_records_per_arm": {arm: len(load(RUN / "evidence" / f"live-captures-{arm}.json").get("records", [])) if (RUN / "evidence" / f"live-captures-{arm}.json").exists() else 0 for arm in ARMS},
        "grid_counts": {f"{slug}:{condition}:{variant}": n for (slug, condition, variant), n in sorted(counts.items())},
        "issues": issues,
        "raw_sha256": {f"results/raw-{arm}/{agent}.jsonl": sha(RUN / "results" / f"raw-{arm}" / f"{agent}.jsonl") for arm, agents in arm_assignments.items() for agent in agents if (RUN / "results" / f"raw-{arm}" / f"{agent}.jsonl").exists()},
    }
    print(json.dumps(result, indent=2, ensure_ascii=False))
    if issues:
        raise SystemExit(1)

if __name__ == "__main__":
    main()
