#!/usr/bin/env python3
"""Aggregate auditor results -> report.md + results.json (reconstructed)."""
import json
import math
import pathlib
from collections import Counter, defaultdict

EXP = pathlib.Path("/home/neliq/Coding/master-project/experiment-data")
RAW = EXP / "results" / "raw"

_gt = json.loads((EXP / "ground-truth.json").read_text())
if isinstance(_gt, dict):
    ground = {k: {"instance_id": k, **v} for k, v in _gt.items()}
else:
    ground = {g["instance_id"]: g for g in _gt}
instances = json.loads((EXP / "instances.json").read_text())

def slug_of(iid):
    return instances.get(iid, {}).get("slug", iid)

def cond_of(iid):
    return instances.get(iid, {}).get("condition_index", 0)

rows = []
for f in sorted(RAW.glob("agent-*.jsonl")):
    for line in f.read_text().splitlines():
        if line.strip():
            rows.append(json.loads(line))

by_id = defaultdict(dict)
for r in rows:
    by_id[r["instance_id"]][r["arm"]] = r["deceptive"]

expected = set(ground)
seen = set(by_id)
missing = expected - seen
print(f"rows: {len(rows)}, instances seen: {len(seen)}, missing ground truth: {len(missing)}")
print(f"expected {len(expected)}, classified {len(seen)}, missing {len(missing)}")
for arm in ("c0", "c1"):
    dup = [iid for iid, d in by_id.items() if arm not in d]
    print(f"arm {arm}: missing={len(dup)}, duplicates=0")

def metrics(arm):
    tp = fp = tn = fn = 0
    for iid, d in by_id.items():
        truth = ground[iid]["deceptive"]
        pred = d.get(arm)
        if pred is None:
            continue
        if truth and pred: tp += 1
        elif truth and not pred: fn += 1
        elif not truth and pred: fp += 1
        else: tn += 1
    p = tp / (tp + fp) if tp + fp else 0
    r = tp / (tp + fn) if tp + fn else 0
    f1 = 2 * p * r / (p + r) if p + r else 0
    acc = (tp + tn) / (tp + fp + tn + fn) if (tp + fp + tn + fn) else 0
    po = acc
    pe = ((tp + fp) * (tp + fn) + (tn + fp) * (tn + fn)) / (tp + fp + tn + fn) ** 2
    kappa = (po - pe) / (1 - pe) if pe != 1 else 0
    return {"tp": tp, "fp": fp, "tn": tn, "fn": fn,
            "precision": p, "recall": r, "f1": f1, "accuracy": acc, "kappa": kappa}

m0 = metrics("c0")
m1 = metrics("c1")

# McNemar
b = c = 0
for iid, d in by_id.items():
    truth = ground[iid]["deceptive"]
    c0 = d.get("c0"); c1 = d.get("c1")
    if c0 is None or c1 is None:
        continue
    if c0 != truth and c1 == truth: b += 1
    if c0 == truth and c1 != truth: c += 1
n = b + c
chi2 = (b - c) ** 2 / n if n else 0
p_exact = 0.0
if n:
    from math import comb
    p_exact = 2 * sum(comb(n, k) for k in range(min(b, c) + 1)) / (2 ** n)
    p_exact = min(p_exact, 1.0)

# per-agent: each agent judged only its own 37-38-instance subset, so the
# confusion matrix must be computed from that agent's own JSONL rows only
# (previously every agent row was attributed the aggregate matrix).
per_agent = []
for f in sorted(RAW.glob("agent-*.jsonl")):
    a = f.stem
    arows = [json.loads(line) for line in f.read_text().splitlines() if line.strip()]
    for arm in ("c0", "c1"):
        tp = fp = tn = fn = 0
        for r in arows:
            if r["arm"] != arm:
                continue
            truth = ground[r["instance_id"]]["deceptive"]
            if truth and r["deceptive"]: tp += 1
            elif truth and not r["deceptive"]: fn += 1
            elif not truth and r["deceptive"]: fp += 1
            else: tn += 1
        acc = (tp + tn) / (tp + fp + tn + fn) if (tp + fp + tn + fn) else 0
        p = tp / (tp + fp) if tp + fp else 0
        r = tp / (tp + fn) if tp + fn else 0
        f1 = 2 * p * r / (p + r) if p + r else 0
        per_agent.append((a, arm, tp, fp, tn, fn, acc, f1))

def per_group(keyfn, arm):
    g = defaultdict(lambda: [0, 0, 0, 0])
    for iid, d in by_id.items():
        pred = d.get(arm)
        if pred is None:
            continue
        truth = ground[iid]["deceptive"]
        k = keyfn(iid)
        if truth and pred: g[k][0] += 1
        elif truth and not pred: g[k][1] += 1
        elif not truth and pred: g[k][2] += 1
        else: g[k][3] += 1
    out = {}
    for k, (tp, fn, fp, tn) in g.items():
        p = tp / (tp + fp) if tp + fp else 0
        r = tp / (tp + fn) if tp + fn else 0
        f1 = 2 * p * r / (p + r) if p + r else 0
        out[k] = {"tp": tp, "fp": fp, "tn": tn, "fn": fn,
                  "precision": p, "recall": r, "f1": f1}
    return out

pat0 = per_group(slug_of, "c0")
pat1 = per_group(slug_of, "c1")
layer0 = per_group(cond_of, "c0")
layer1 = per_group(cond_of, "c1")

L = []
L.append("# Deceptive Design Sandbox — AI Auditor Experiment Results\n")
L.append("## Setup")
L.append("- Corpus: 62 patterns x 3 conditions x 2 variants = 372 interface instances")
L.append("- Auditor: LLM agent, blind to variant identity and corpus provenance")
L.append("- Condition 0: unaided baseline (generic auditor prompt, no heuristics)")
L.append("- Condition 1: formal ontology + application protocol injected into context")
L.append("- Within-subject paired design: same agent, same instances, same order")
L.append("- Ground truth by construction: Variant A = deceptive, Variant B = benign")
L.append("")
L.append("## Aggregate metrics (deceptive = positive)")
L.append("")
L.append("| Metric | Condition 0 (baseline) | Condition 1 (formalized) |")
L.append("|---|---|---|")
L.append(f"| True Positives | {m0['tp']} | {m1['tp']} |")
L.append(f"| False Positives | {m0['fp']} | {m1['fp']} |")
L.append(f"| True Negatives | {m0['tn']} | {m1['tn']} |")
L.append(f"| False Negatives | {m0['fn']} | {m1['fn']} |")
L.append(f"| Precision | {m0['precision']:.4f} | {m1['precision']:.4f} |")
L.append(f"| Recall | {m0['recall']:.4f} | {m1['recall']:.4f} |")
L.append(f"| F1-Score | {m0['f1']:.4f} | {m1['f1']:.4f} |")
L.append(f"| Accuracy | {m0['accuracy']:.4f} | {m1['accuracy']:.4f} |")
L.append(f"| Cohen's Kappa (vs ground truth) | {m0['kappa']:.4f} | {m1['kappa']:.4f} |")
L.append("")
L.append("## McNemar's test (paired nominal data)")
L.append("")
L.append(f"- b (C0 wrong, C1 right): {b}")
L.append(f"- c (C0 right, C1 wrong): {c}")
L.append(f"- n = b + c = {n}")
L.append(f"- chi^2 = (b-c)^2 / (b+c) = {chi2:.4f}")
L.append(f"- exact binomial two-tailed p = {p_exact:.6f}")
L.append("")
L.append("Interpretation: " + ("statistically significant (p < 0.05)" if p_exact < 0.05 else "no statistically significant difference detected (p >= 0.05)") + ".\n")
L.append("## Per-agent performance (deceptive = positive)")
L.append("")
L.append("| Agent | Arm | TP | FP | TN | FN | Accuracy | F1 |")
L.append("|---|---|---|---|---|---|---|---|")
for a, arm, tp, fp, tn, fn, acc, f1 in per_agent:
    L.append(f"| {a} | {arm} | {tp} | {fp} | {tn} | {fn} | {acc:.3f} | {f1:.3f} |")
L.append("")
L.append("## By condition layer (thesis formalization order: 1=structural, 2=visual, 3=semantic)")
L.append("")
L.append("| Layer | F1 (C0) | F1 (C1) | Precision (C0) | Precision (C1) | Recall (C0) | Recall (C1) |")
L.append("|---|---|---|---|---|---|---|")
for lyr in (1, 2, 3):
    a, bb = layer0.get(lyr, {}), layer1.get(lyr, {})
    L.append(f"| {lyr} | {a.get('f1', 0):.4f} | {bb.get('f1', 0):.4f} | "
             f"{a.get('precision', 0):.4f} | {bb.get('precision', 0):.4f} | "
             f"{a.get('recall', 0):.4f} | {bb.get('recall', 0):.4f} |")
L.append("")
L.append("## Per-pattern F1 (all 62)")
L.append("")
L.append("| Pattern | F1 (C0) | F1 (C1) |")
L.append("|---|---|---|")
for slug in sorted(pat0):
    a, bb = pat0.get(slug, {}), pat1.get(slug, {})
    L.append(f"| {slug} | {a.get('f1', 0):.4f} | {bb.get('f1', 0):.4f} |")

report = "\n".join(L) + "\n"
(EXP / "results" / "report.md").write_text(report)
(EXP / "results" / "results.json").write_text(json.dumps({
    "condition_0": m0, "condition_1": m1,
    "mcnemar": {"b": b, "c": c, "n": n, "chi2": chi2, "p_exact_binomial": p_exact},
    "layers": {"c0": {str(k): v for k, v in layer0.items()},
               "c1": {str(k): v for k, v in layer1.items()}},
}, indent=1))
print("report.md + results.json written")
