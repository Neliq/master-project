#!/usr/bin/env python3
"""Aggregate the verified single full-corpus evaluation without p-hacking."""
from __future__ import annotations

import json
import os
import random
from collections import defaultdict
from math import comb
from pathlib import Path

RUN = Path(os.environ.get("RUN7_DIR", Path(__file__).resolve().parents[1] / "run7-development-v2"))
SCORE = Path(os.environ.get("RUN7_SCORE_DIR", RUN))
RAW = RUN / "results" / "raw"
ground = json.loads((SCORE / "ground-truth.json").read_text())
instances = json.loads((SCORE / "instances.json").read_text())
rows = [json.loads(line) for path in sorted(RAW.glob("agent-*.jsonl")) for line in path.read_text().splitlines() if line.strip()]
ids = sorted(ground)
by_id: dict[str, dict[str, dict]] = defaultdict(dict)
for row in rows:
    by_id[row["instance_id"]][row["arm"]] = row
if len(rows) != 2 * len(ids) or any(set(by_id[i]) != {"c0", "c1"} for i in ids):
    raise SystemExit("raw rows are incomplete")


def counts(sample_ids: list[str], arm: str) -> tuple[int, int, int, int]:
    tp = fp = tn = fn = 0
    for iid in sample_ids:
        truth = bool(ground[iid]["deceptive"])
        pred = bool(by_id[iid][arm]["deceptive"])
        if truth and pred:
            tp += 1
        elif truth and not pred:
            fn += 1
        elif not truth and pred:
            fp += 1
        else:
            tn += 1
    return tp, fp, tn, fn


def metric_dict(c: tuple[int, int, int, int]) -> dict:
    tp, fp, tn, fn = c
    precision = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn) if tp + fn else 0.0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    n = tp + fp + tn + fn
    accuracy = (tp + tn) / n if n else 0.0
    pe = ((tp + fp) * (tp + fn) + (tn + fp) * (tn + fn)) / n**2 if n else 0.0
    kappa = (accuracy - pe) / (1 - pe) if pe != 1 else 0.0
    return {"tp": tp, "fp": fp, "tn": tn, "fn": fn, "precision": precision, "recall": recall, "f1": f1, "accuracy": accuracy, "kappa": kappa}


def percentile(values: list[float], q: float) -> float:
    values = sorted(values)
    pos = (len(values) - 1) * q
    lo = int(pos)
    hi = min(lo + 1, len(values) - 1)
    return values[lo] + (values[hi] - values[lo]) * (pos - lo)


def bootstrap_arm(arm: str, seed: int, draws: int = 5000) -> dict[str, dict[str, float]]:
    rng = random.Random(seed)
    values = {key: [] for key in ("precision", "recall", "f1", "accuracy", "kappa")}
    for _ in range(draws):
        sample = [ids[rng.randrange(len(ids))] for _ in ids]
        m = metric_dict(counts(sample, arm))
        for key in values:
            values[key].append(float(m[key]))
    return {key: {"lower": percentile(vals, 0.025), "upper": percentile(vals, 0.975)} for key, vals in values.items()}


def bootstrap_paired(seed: int, draws: int = 5000) -> dict[str, dict[str, float]]:
    rng = random.Random(seed)
    acc = []
    f1 = []
    for _ in range(draws):
        sample = [ids[rng.randrange(len(ids))] for _ in ids]
        acc.append(float(metric_dict(counts(sample, "c1"))["accuracy"]) - float(metric_dict(counts(sample, "c0"))["accuracy"]))
        f1.append(float(metric_dict(counts(sample, "c1"))["f1"]) - float(metric_dict(counts(sample, "c0"))["f1"]))
    return {"accuracy_delta": {"lower": percentile(acc, 0.025), "upper": percentile(acc, 0.975)}, "f1_delta": {"lower": percentile(f1, 0.025), "upper": percentile(f1, 0.975)}}


def grouped_metrics(key_fn, arm: str) -> dict[str, dict]:
    groups: dict[str, list[str]] = defaultdict(list)
    for iid in ids:
        groups[str(key_fn(iid))].append(iid)
    return {key: metric_dict(counts(group, arm)) for key, group in sorted(groups.items())}

m0 = metric_dict(counts(ids, "c0")); m1 = metric_dict(counts(ids, "c1"))
m0["bootstrap_ci_95"] = bootstrap_arm("c0", 20260912)
m1["bootstrap_ci_95"] = bootstrap_arm("c1", 20260913)
paired = bootstrap_paired(20260914)
b = c = 0
for iid in ids:
    truth = bool(ground[iid]["deceptive"])
    p0 = bool(by_id[iid]["c0"]["deceptive"])
    p1 = bool(by_id[iid]["c1"]["deceptive"])
    if p0 != truth and p1 == truth:
        b += 1
    elif p0 == truth and p1 != truth:
        c += 1
n = b + c
p_exact = min(1.0, 2 * sum(comb(n, k) for k in range(min(b, c) + 1)) / 2**n) if n else 1.0
unknown = {arm: sum(by_id[iid][arm].get("evidence_status") == "UNKNOWN" for iid in ids) for arm in ("c0", "c1")}
pattern0 = grouped_metrics(lambda iid: instances[iid]["slug"], "c0")
pattern1 = grouped_metrics(lambda iid: instances[iid]["slug"], "c1")
agent0 = grouped_metrics(lambda iid: by_id[iid]["c0"].get("_agent", "unknown"), "c0")
agent1 = grouped_metrics(lambda iid: by_id[iid]["c0"].get("_agent", "unknown"), "c1")
metadata_path = RUN / "results" / "run7-metadata.json"
if not metadata_path.exists():
    metadata_path = RUN / "public-manifest.json"
results = {
    "run_id": RUN.name,
    "purpose": "single full-corpus paired evaluation",
    "n_instances": len(ids),
    "condition_0": m0,
    "condition_1": m1,
    "unknown_count": unknown,
    "unknown_rate": {arm: unknown[arm] / len(ids) for arm in unknown},
    "mcnemar": {"b": b, "c": c, "n": n, "p_exact_binomial": p_exact},
    "paired_bootstrap_ci_95": paired,
    "per_pattern": {"c0": pattern0, "c1": pattern1},
    "per_agent": {"c0": agent0, "c1": agent1},
    "run_metadata": json.loads(metadata_path.read_text()),
}
(RUN / "results" / "results.json").write_text(json.dumps(results, indent=2) + "\n")
report = [
    "# Single full-corpus evaluation",
    "",
    "This is the verified full-corpus paired evaluation of the formalization-guided auditing package.",
    f"- Instances: {len(ids)}; patterns: {len({instances[i]['slug'] for i in ids})}",
    "- Both arms: aligned vision + DOM + semantic text; C1 adds compact formula cards.",
    "- No counterexamples were added.",
    "",
    "## Aggregate metrics",
    "",
    "| Metric | C0 | C1 |",
    "|---|---:|---:|",
]
for key in ("tp", "fp", "tn", "fn", "precision", "recall", "f1", "accuracy", "kappa"):
    report.append(f"| {key} | {m0[key]:.4f} | {m1[key]:.4f} |" if isinstance(m0[key], float) else f"| {key} | {m0[key]} | {m1[key]} |")
report += [
    "",
    f"UNKNOWN records: C0 {unknown['c0']}/{len(ids)}; C1 {unknown['c1']}/{len(ids)}.",
    "",
    "## Paired analysis",
    "",
    f"- McNemar b={b}, c={c}, n={n}, exact two-sided p={p_exact:.6f}.",
    f"- Paired bootstrap F1 delta (C1-C0): [{paired['f1_delta']['lower']:.4f}, {paired['f1_delta']['upper']:.4f}].",
    f"- Paired bootstrap accuracy delta (C1-C0): [{paired['accuracy_delta']['lower']:.4f}, {paired['accuracy_delta']['upper']:.4f}].",
    "- The paired analysis is bounded to this model, corpus, evidence package, and protocol.",
    "",
    "## Per-pattern F1",
    "",
    "| Pattern | C0 | C1 |",
    "|---|---:|---:|",
]
for slug in sorted(pattern0):
    report.append(f"| {slug} | {pattern0[slug]['f1']:.4f} | {pattern1[slug]['f1']:.4f} |")
(RUN / "results" / "report.md").write_text("\n".join(report) + "\n")
print(json.dumps({"instances": len(ids), "rows": len(rows), "unknown": unknown, "c0": m0, "c1": m1, "mcnemar": {"b": b, "c": c, "p": p_exact}}, indent=2))
