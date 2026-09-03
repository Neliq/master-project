#!/usr/bin/env python3
"""Aggregate the two-arm auditor run with uncertainty and cluster sensitivity."""
import json
import os
import pathlib
import random
from collections import Counter, defaultdict
from math import comb

EXP = pathlib.Path(os.environ.get("EXPERIMENT_DIR", pathlib.Path(__file__).resolve().parents[1]))
RAW = EXP / "results" / "raw"

with (EXP / "ground-truth.json").open() as f:
    _gt = json.load(f)
if isinstance(_gt, dict):
    ground = {k: {"instance_id": k, **v} for k, v in _gt.items()}
else:
    ground = {g["instance_id"]: g for g in _gt}
with (EXP / "instances.json").open() as f:
    instances = json.load(f)

raw_rows = []
rows_by_agent = {}
for f in sorted(RAW.glob("agent-*.jsonl")):
    agent_rows = []
    for line_no, line in enumerate(f.read_text().splitlines(), 1):
        if not line.strip():
            continue
        row = json.loads(line)
        row["_agent"] = f.stem
        row["_line"] = line_no
        agent_rows.append(row)
        raw_rows.append(row)
    rows_by_agent[f.stem] = agent_rows

expected = set(ground)
seen_keys = Counter((r.get("instance_id"), r.get("arm")) for r in raw_rows)
unknown = sorted({r.get("instance_id") for r in raw_rows if r.get("instance_id") not in expected})
duplicates = sorted(k for k, n in seen_keys.items() if n != 1)
missing = sorted((iid, arm) for iid in expected for arm in ("c0", "c1") if seen_keys[(iid, arm)] != 1)
if unknown or duplicates or missing or len(raw_rows) != 2 * len(expected):
    print(json.dumps({
        "error": "raw output is incomplete or non-unique",
        "rows": len(raw_rows),
        "expected_rows": 2 * len(expected),
        "unknown_ids": unknown[:10],
        "duplicate_keys": duplicates[:10],
        "missing_keys": missing[:10],
    }, indent=2))
    raise SystemExit(1)

by_id = defaultdict(dict)
for row in raw_rows:
    by_id[row["instance_id"]][row["arm"]] = row


def metric_counts(ids, arm):
    tp = fp = tn = fn = 0
    for iid in ids:
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


def metric_dict(counts):
    tp, fp, tn, fn = counts
    precision = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn) if tp + fn else 0.0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    total = tp + fp + tn + fn
    accuracy = (tp + tn) / total if total else 0.0
    pe = ((tp + fp) * (tp + fn) + (tn + fp) * (tn + fn)) / total**2 if total else 0.0
    kappa = (accuracy - pe) / (1 - pe) if pe != 1 else 0.0
    return {
        "tp": tp, "fp": fp, "tn": tn, "fn": fn,
        "precision": precision, "recall": recall, "f1": f1,
        "accuracy": accuracy, "kappa": kappa,
    }


ids = sorted(expected)
m0 = metric_dict(metric_counts(ids, "c0"))
m1 = metric_dict(metric_counts(ids, "c1"))


def percentile(values, q):
    values = sorted(values)
    if not values:
        return 0.0
    pos = (len(values) - 1) * q
    lo = int(pos)
    hi = min(lo + 1, len(values) - 1)
    return values[lo] + (values[hi] - values[lo]) * (pos - lo)


def bootstrap_metrics(arm, seed=20260903, draws=5000):
    rng = random.Random(seed)
    sampled = {key: [] for key in ("precision", "recall", "f1", "accuracy", "kappa")}
    for _ in range(draws):
        sample_ids = [ids[rng.randrange(len(ids))] for _ in ids]
        values = metric_dict(metric_counts(sample_ids, arm))
        for key in sampled:
            sampled[key].append(values[key])
    return {key: {"lower": percentile(values, 0.025), "upper": percentile(values, 0.975)}
            for key, values in sampled.items()}


m0["bootstrap_ci_95"] = bootstrap_metrics("c0", seed=20260903)
m1["bootstrap_ci_95"] = bootstrap_metrics("c1", seed=20260904)


def bootstrap_paired(seed=20260906, draws=5000):
    rng = random.Random(seed)
    accuracy_delta = []
    f1_delta = []
    for _ in range(draws):
        sample_ids = [ids[rng.randrange(len(ids))] for _ in ids]
        c0 = metric_dict(metric_counts(sample_ids, "c0"))
        c1 = metric_dict(metric_counts(sample_ids, "c1"))
        accuracy_delta.append(c1["accuracy"] - c0["accuracy"])
        f1_delta.append(c1["f1"] - c0["f1"])
    return {
        "accuracy_delta": {"lower": percentile(accuracy_delta, 0.025), "upper": percentile(accuracy_delta, 0.975)},
        "f1_delta": {"lower": percentile(f1_delta, 0.025), "upper": percentile(f1_delta, 0.975)},
    }


paired_ci = bootstrap_paired()

# Paired instance-level contrast.
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
chi2 = (b - c) ** 2 / n if n else 0.0
p_exact = min(1.0, 2 * sum(comb(n, k) for k in range(min(b, c) + 1)) / (2 ** n)) if n else 1.0


def group_metrics(key_fn, arm):
    grouped = defaultdict(list)
    for iid in ids:
        grouped[key_fn(iid)].append(iid)
    return {str(key): metric_dict(metric_counts(group_ids, arm))
            for key, group_ids in sorted(grouped.items(), key=lambda item: str(item[0]))}


pat0 = group_metrics(lambda iid: instances[iid]["slug"], "c0")
pat1 = group_metrics(lambda iid: instances[iid]["slug"], "c1")
layer0 = group_metrics(lambda iid: instances[iid]["condition_index"], "c0")
layer1 = group_metrics(lambda iid: instances[iid]["condition_index"], "c1")


def per_agent_metrics():
    result = []
    for agent, agent_rows in sorted(rows_by_agent.items()):
        for arm in ("c0", "c1"):
            agent_ids = [r["instance_id"] for r in agent_rows if r["arm"] == arm]
            result.append({"agent": agent, "arm": arm, "n": len(agent_ids),
                           **metric_dict(metric_counts(agent_ids, arm))})
    return result


per_agent = per_agent_metrics()


def cluster_sensitivity(key_fn):
    grouped = defaultdict(list)
    for iid in ids:
        grouped[str(key_fn(iid))].append(iid)
    cluster_keys = sorted(grouped)
    # Use accuracy differences for the sensitivity estimate; cluster sizes are
    # retained within each sampled cluster.
    observed = []
    for key in cluster_keys:
        group = grouped[key]
        d = sum(
            (bool(by_id[iid]["c1"]["deceptive"]) == bool(ground[iid]["deceptive"])) -
            (bool(by_id[iid]["c0"]["deceptive"]) == bool(ground[iid]["deceptive"]))
            for iid in group
        ) / len(group)
        observed.append(d)
    rng = random.Random(20260905 + len(cluster_keys))
    boot = []
    for _ in range(5000):
        sampled_keys = [cluster_keys[rng.randrange(len(cluster_keys))] for _ in cluster_keys]
        weighted = [observed[cluster_keys.index(key)] for key in sampled_keys]
        boot.append(sum(weighted) / len(weighted))
    return {
        "clusters": len(cluster_keys),
        "positive_delta_clusters": sum(x > 0 for x in observed),
        "negative_delta_clusters": sum(x < 0 for x in observed),
        "unchanged_clusters": sum(x == 0 for x in observed),
        "mean_cluster_accuracy_delta": sum(observed) / len(observed),
        "bootstrap_ci_95": {"lower": percentile(boot, 0.025), "upper": percentile(boot, 0.975)},
    }


sensitivity = {
    "pattern": cluster_sensitivity(lambda iid: instances[iid]["slug"]),
    "auditor_run": cluster_sensitivity(lambda iid: by_id[iid]["c0"]["_agent"]),
}


def fmt(value):
    return f"{value:.4f}"


def ci_text(metric, key):
    ci = metric["bootstrap_ci_95"][key]
    return f"{metric[key]:.4f} [{ci['lower']:.4f}, {ci['upper']:.4f}]"


L = [
    "# Deceptive Design Sandbox — updated-Sandbox auditor rerun (run 5)",
    "",
    "## Setup",
    "- Corpus: 62 patterns x 3 condition layers x 2 variants = 372 interface instances",
    "- Reference labels: construction-based Variant A = deceptive, Variant B = benign",
    "- Auditor: ten fresh replicated runs, blind to variant identity and corpus mapping",
    "- Condition 0: unaided baseline prompt",
    "- Condition 1: formal specification plus application protocol",
    "- Model: gpt-5.6-luna-900k via openai-codex (not the historical DeepSeek Run 4 model)",
    "- Primary unit: paired instance; sensitivity clusters: pattern and auditor run",
    "",
    "## Aggregate metrics (deceptive = positive; bootstrap 95% CI in brackets)",
    "",
    "| Metric | Condition 0 | Condition 1 |",
    "|---|---:|---:|",
    f"| True Positives | {m0['tp']} | {m1['tp']} |",
    f"| False Positives | {m0['fp']} | {m1['fp']} |",
    f"| True Negatives | {m0['tn']} | {m1['tn']} |",
    f"| False Negatives | {m0['fn']} | {m1['fn']} |",
    f"| Precision | {ci_text(m0, 'precision')} | {ci_text(m1, 'precision')} |",
    f"| Recall | {ci_text(m0, 'recall')} | {ci_text(m1, 'recall')} |",
    f"| F1 | {ci_text(m0, 'f1')} | {ci_text(m1, 'f1')} |",
    f"| Accuracy | {ci_text(m0, 'accuracy')} | {ci_text(m1, 'accuracy')} |",
    f"| Cohen's Kappa | {ci_text(m0, 'kappa')} | {ci_text(m1, 'kappa')} |",
    "",
    "## McNemar's test (paired nominal data)",
    "",
    f"- b (C0 wrong, C1 right): {b}",
    f"- c (C0 right, C1 wrong): {c}",
    f"- n = b + c: {n}",
    f"- chi^2 without continuity correction: {chi2:.4f}",
    f"- exact two-tailed binomial p: {p_exact:.6f}",
    f"- paired bootstrap 95% CI for accuracy delta (C1-C0): [{paired_ci['accuracy_delta']['lower']:.4f}, {paired_ci['accuracy_delta']['upper']:.4f}]",
    f"- paired bootstrap 95% CI for F1 delta (C1-C0): [{paired_ci['f1_delta']['lower']:.4f}, {paired_ci['f1_delta']['upper']:.4f}]",
    "- Interpretation: this is an instance-level nominal test of the complete intervention package; it is not an ontology-only causal estimate.",
    "",
    "## Cluster sensitivity",
    "",
    "| Cluster | Clusters with positive C1-C0 accuracy | Negative | Unchanged | Mean cluster delta | Bootstrap 95% CI |",
    "|---|---:|---:|---:|---:|---:|",
]
for key in ("pattern", "auditor_run"):
    s = sensitivity[key]
    ci = s["bootstrap_ci_95"]
    L.append(f"| {key} | {s['positive_delta_clusters']} | {s['negative_delta_clusters']} | {s['unchanged_clusters']} | {s['mean_cluster_accuracy_delta']:.4f} | [{ci['lower']:.4f}, {ci['upper']:.4f}] |")
L.extend([
    "",
    "The instance bootstrap treats the paired instance as the primary unit. The cluster bootstrap resamples complete patterns or auditor runs and is reported as a sensitivity analysis because observations are repeated within both structures.",
    "",
    "## Per-agent performance",
    "",
    "| Agent | Arm | N | TP | FP | TN | FN | Accuracy | F1 |",
    "|---|---|---:|---:|---:|---:|---:|---:|---:|",
])
for row in per_agent:
    L.append(f"| {row['agent']} | {row['arm']} | {row['n']} | {row['tp']} | {row['fp']} | {row['tn']} | {row['fn']} | {row['accuracy']:.3f} | {row['f1']:.3f} |")
L.extend(["", "## By condition layer", "", "| Layer | F1 (C0) | F1 (C1) | Precision (C0) | Precision (C1) | Recall (C0) | Recall (C1) |", "|---:|---:|---:|---:|---:|---:|---:|"])
for layer in ("1", "2", "3"):
    a, d = layer0.get(layer, {}), layer1.get(layer, {})
    L.append(f"| {layer} | {a.get('f1', 0):.4f} | {d.get('f1', 0):.4f} | {a.get('precision', 0):.4f} | {d.get('precision', 0):.4f} | {a.get('recall', 0):.4f} | {d.get('recall', 0):.4f} |")
L.extend(["", "## Per-pattern F1", "", "| Pattern | F1 (C0) | F1 (C1) |", "|---|---:|---:|"])
for slug in sorted(pat0):
    L.append(f"| {slug} | {pat0[slug]['f1']:.4f} | {pat1[slug]['f1']:.4f} |")
L.append("")
report = "\n".join(L)
(EXP / "results" / "report.md").write_text(report + "\n")

metadata_path = EXP / "results" / "run5-metadata.json"
run_metadata = json.loads(metadata_path.read_text()) if metadata_path.exists() else {}
results = {
    "run_id": run_metadata.get("run_id", "run5-updated-sandbox-20260903"),
    "n_instances": len(ids),
    "n_raw_rows": len(raw_rows),
    "condition_0": m0,
    "condition_1": m1,
    "mcnemar": {"b": b, "c": c, "n": n, "chi2": chi2, "p_exact_binomial": p_exact},
    "paired_bootstrap_ci_95": paired_ci,
    "layers": {"c0": layer0, "c1": layer1},
    "per_pattern": {"c0": pat0, "c1": pat1},
    "per_agent": per_agent,
    "cluster_sensitivity": sensitivity,
    "run_metadata": run_metadata,
}
(EXP / "results" / "results.json").write_text(json.dumps(results, indent=1) + "\n")
print(json.dumps({"rows": len(raw_rows), "instances": len(ids), "mcnemar": results["mcnemar"]}, indent=2))
